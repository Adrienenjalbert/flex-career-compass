import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Database, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ExternalLink,
  Loader2,
  Info,
  FileText,
  Shield,
  ArrowRight,
  Table,
  FileCode,
  Globe,
  ClipboardCopy,
  Check,
  X,
  Clock,
  Download
} from "lucide-react";
import { firecrawlApi, verificationSources } from "@/lib/api/firecrawl";
import { stateTaxData } from "@/data/state-taxes";
import { stateUnemploymentData } from "@/data/unemployment-benefits";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface VerificationResult {
  source: string;
  sourceUrl: string;
  localFile: string;
  category: string;
  field: string;
  stateCode: string;
  fieldName: string;
  currentValue: string | number;
  scrapedValue?: string | number;
  status: 'verified' | 'mismatch' | 'unable-to-verify' | 'pending';
  notes?: string;
}

interface ScrapeResult {
  success: boolean;
  content?: string;
  error?: string;
  data?: {
    markdown?: string;
  };
}

interface DataCorrection {
  id: string;
  created_at: string;
  source_name: string;
  source_url: string;
  local_file: string;
  state_code: string;
  field_name: string;
  category: string;
  current_value: string;
  suggested_value: string;
  status: 'pending' | 'approved' | 'rejected' | 'applied';
  reviewed_at: string | null;
  reviewer_notes: string | null;
}

interface DataFileInfo {
  name: string;
  path: string;
  description: string;
  recordCount: number;
  fields: string[];
  officialSource: {
    name: string;
    url: string;
  };
}

// Data files we're verifying
const dataFilesToVerify: DataFileInfo[] = [
  {
    name: "State Tax Data",
    path: "src/data/state-taxes.ts",
    description: "State income tax rates, minimum wages, and unemployment caps for all 50 states + DC",
    recordCount: Object.keys(stateTaxData).length,
    fields: ["minWage", "incomeTaxRate", "unemploymentMaxWeekly", "unemploymentMaxWeeks"],
    officialSource: {
      name: "DOL Minimum Wage",
      url: verificationSources.minimumWage
    }
  },
  {
    name: "Unemployment Benefits Data",
    path: "src/data/unemployment-benefits.ts",
    description: "Comprehensive unemployment benefit calculations, eligibility requirements, and partial work rules",
    recordCount: Object.keys(stateUnemploymentData).length,
    fields: ["maxWeeklyBenefit", "minWeeklyBenefit", "maxWeeks", "replacementRate", "partialEarningsDisregard"],
    officialSource: {
      name: "DOL OUI Data",
      url: verificationSources.unemployment
    }
  }
];

// Sample states to verify (top 10 by population)
const statesToVerify = ['CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI'];

const DataVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [scrapeResults, setScrapeResults] = useState<Record<string, ScrapeResult>>({});
  const [verificationResults, setVerificationResults] = useState<VerificationResult[]>([]);
  const [lastVerified, setLastVerified] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Correction workflow state
  const [pendingCorrections, setPendingCorrections] = useState<DataCorrection[]>([]);
  const [loadingCorrections, setLoadingCorrections] = useState(true);
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load pending corrections on mount
  useEffect(() => {
    loadCorrections();
  }, []);

  const loadCorrections = async () => {
    setLoadingCorrections(true);
    try {
      const { data, error } = await supabase
        .from('data_corrections')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPendingCorrections((data as DataCorrection[]) || []);
    } catch (error) {
      console.error('Error loading corrections:', error);
    } finally {
      setLoadingCorrections(false);
    }
  };

  // Parse minimum wage from scraped content
  const parseMinWageFromContent = (content: string, stateCode: string): number | null => {
    const stateName = stateTaxData[stateCode]?.name;
    if (!stateName) return null;

    const patterns = [
      new RegExp(`${stateName}[^$]*\\$([\\d.]+)`, 'i'),
      new RegExp(`\\$([\\d.]+)[^$]*${stateName}`, 'i'),
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        const value = parseFloat(match[1]);
        if (value >= 7 && value <= 25) {
          return value;
        }
      }
    }
    return null;
  };

  // Parse unemployment benefit from scraped content
  const parseUnemploymentFromContent = (content: string, stateCode: string): number | null => {
    const stateName = stateUnemploymentData[stateCode]?.name;
    if (!stateName) return null;

    const patterns = [
      new RegExp(`${stateName}[^$]*\\$([\\d,]+)`, 'i'),
      new RegExp(`\\$([\\d,]+)[^$]*${stateName}`, 'i'),
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        const value = parseInt(match[1].replace(',', ''));
        if (value >= 200 && value <= 1500) {
          return value;
        }
      }
    }
    return null;
  };

  // Save mismatch as a correction
  const saveCorrection = async (result: VerificationResult) => {
    if (result.status !== 'mismatch' || !result.scrapedValue) return;

    try {
      const { error } = await supabase
        .from('data_corrections')
        .upsert({
          source_name: result.source,
          source_url: result.sourceUrl,
          local_file: result.localFile,
          state_code: result.stateCode,
          field_name: result.fieldName,
          category: result.category,
          current_value: String(result.currentValue),
          suggested_value: String(result.scrapedValue),
          status: 'pending'
        }, {
          onConflict: 'local_file,state_code,field_name'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving correction:', error);
    }
  };

  const runVerification = async () => {
    setIsLoading(true);
    setProgress(0);
    setVerificationResults([]);
    setScrapeResults({});
    setErrorMessage(null);

    const results: VerificationResult[] = [];
    const totalSteps = 3 + statesToVerify.length * 2;
    let completedSteps = 0;

    const updateProgress = () => {
      completedSteps++;
      setProgress((completedSteps / totalSteps) * 100);
    };

    try {
      // Step 1: Scrape DOL Minimum Wage page
      setCurrentStep("Scraping DOL Minimum Wage data...");
      const minWageResult = await firecrawlApi.scrape(verificationSources.minimumWage);
      setScrapeResults(prev => ({ ...prev, minimumWage: minWageResult }));
      
      if (!minWageResult.success && minWageResult.error) {
        setErrorMessage(minWageResult.error);
        setIsLoading(false);
        return;
      }
      updateProgress();

      // Step 2: Scrape Tax Foundation
      setCurrentStep("Scraping Tax Foundation state tax data...");
      const taxResult = await firecrawlApi.scrape(verificationSources.stateTaxes);
      setScrapeResults(prev => ({ ...prev, stateTaxes: taxResult }));
      updateProgress();

      // Step 3: Scrape DOL Unemployment
      setCurrentStep("Scraping DOL Unemployment data...");
      const unemploymentResult = await firecrawlApi.scrape(verificationSources.unemployment);
      setScrapeResults(prev => ({ ...prev, unemployment: unemploymentResult }));
      updateProgress();

      // Step 4: Verify each state
      for (const stateCode of statesToVerify) {
        setCurrentStep(`Verifying ${stateTaxData[stateCode]?.name || stateCode}...`);
        
        const stateData = stateTaxData[stateCode];
        const unemploymentData = stateUnemploymentData[stateCode];

        // Verify minimum wage
        if (stateData && minWageResult.success) {
          const scrapedMinWage = parseMinWageFromContent(
            minWageResult.data?.markdown || '', 
            stateCode
          );

          const result: VerificationResult = {
            source: 'DOL Minimum Wage',
            sourceUrl: verificationSources.minimumWage,
            localFile: 'src/data/state-taxes.ts',
            category: 'Minimum Wage',
            field: `${stateData.name} (${stateCode}) - minWage`,
            stateCode,
            fieldName: 'minWage',
            currentValue: `$${stateData.minWage}`,
            scrapedValue: scrapedMinWage ? `$${scrapedMinWage}` : undefined,
            status: scrapedMinWage 
              ? (Math.abs(scrapedMinWage - stateData.minWage) < 0.5 ? 'verified' : 'mismatch')
              : 'unable-to-verify',
            notes: scrapedMinWage 
              ? (Math.abs(scrapedMinWage - stateData.minWage) < 0.5 
                ? 'Values match within tolerance' 
                : `Discrepancy: Local shows $${stateData.minWage}, scraped shows $${scrapedMinWage}`)
              : 'Could not extract value from scraped content'
          };
          results.push(result);
          
          // Save mismatch as correction
          if (result.status === 'mismatch') {
            await saveCorrection(result);
          }
        }
        updateProgress();

        // Verify unemployment max benefit
        if (unemploymentData && unemploymentResult.success) {
          const scrapedUnemployment = parseUnemploymentFromContent(
            unemploymentResult.data?.markdown || '', 
            stateCode
          );

          const result: VerificationResult = {
            source: 'DOL Unemployment',
            sourceUrl: verificationSources.unemployment,
            localFile: 'src/data/unemployment-benefits.ts',
            category: 'Unemployment Benefits',
            field: `${unemploymentData.name} (${stateCode}) - maxWeeklyBenefit`,
            stateCode,
            fieldName: 'maxWeeklyBenefit',
            currentValue: `$${unemploymentData.maxWeeklyBenefit}`,
            scrapedValue: scrapedUnemployment ? `$${scrapedUnemployment}` : undefined,
            status: scrapedUnemployment 
              ? (Math.abs(scrapedUnemployment - unemploymentData.maxWeeklyBenefit) < 50 ? 'verified' : 'mismatch')
              : 'unable-to-verify',
            notes: scrapedUnemployment 
              ? (Math.abs(scrapedUnemployment - unemploymentData.maxWeeklyBenefit) < 50 
                ? 'Values match within tolerance' 
                : `Discrepancy: Local shows $${unemploymentData.maxWeeklyBenefit}, scraped shows $${scrapedUnemployment}`)
              : 'Could not extract value from scraped content'
          };
          results.push(result);
          
          // Save mismatch as correction
          if (result.status === 'mismatch') {
            await saveCorrection(result);
          }
        }
        updateProgress();
      }

      setVerificationResults(results);
      setLastVerified(new Date().toLocaleString());
      
      // Reload corrections to show new ones
      await loadCorrections();
      
      const mismatches = results.filter(r => r.status === 'mismatch').length;
      if (mismatches > 0) {
        toast.info(`Found ${mismatches} data mismatches. Review them in the Corrections tab.`);
      }
    } catch (error) {
      console.error('Verification error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Verification failed');
    } finally {
      setIsLoading(false);
      setCurrentStep("");
      setProgress(100);
    }
  };

  const updateCorrectionStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('data_corrections')
        .update({
          status,
          reviewed_at: new Date().toISOString(),
          reviewer_notes: reviewNotes[id] || null
        })
        .eq('id', id);

      if (error) throw error;
      
      toast.success(`Correction ${status}`);
      await loadCorrections();
    } catch (error) {
      console.error('Error updating correction:', error);
      toast.error('Failed to update correction');
    }
  };

  const generateCodeSnippet = (correction: DataCorrection): string => {
    const value = correction.suggested_value.replace('$', '');
    
    if (correction.local_file.includes('state-taxes.ts')) {
      return `// In ${correction.local_file}
// Find the ${correction.state_code} entry and update:
${correction.state_code}: { 
  ...
  ${correction.field_name}: ${value},
  ...
}`;
    } else if (correction.local_file.includes('unemployment-benefits.ts')) {
      return `// In ${correction.local_file}
// Find the ${correction.state_code} entry and update:
${correction.state_code}: {
  ...
  ${correction.field_name}: ${value},
  ...
}`;
    }
    
    return `// Update ${correction.field_name} for ${correction.state_code} in ${correction.local_file}
// Change from: ${correction.current_value}
// Change to: ${correction.suggested_value}`;
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportApprovedCorrections = () => {
    const approved = pendingCorrections.filter(c => c.status === 'approved');
    if (approved.length === 0) {
      toast.error('No approved corrections to export');
      return;
    }

    const content = approved.map(c => generateCodeSnippet(c)).join('\n\n---\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data-corrections-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported approved corrections');
  };

  const getStatusIcon = (status: VerificationResult['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'mismatch':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'unable-to-verify':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: VerificationResult['status'] | DataCorrection['status']) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Verified</Badge>;
      case 'mismatch':
        return <Badge variant="destructive">Mismatch</Badge>;
      case 'unable-to-verify':
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Unable to Verify</Badge>;
      case 'pending':
        return <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20"><Clock className="h-3 w-3 mr-1" />Pending Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20"><Check className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20"><X className="h-3 w-3 mr-1" />Rejected</Badge>;
      case 'applied':
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20"><CheckCircle className="h-3 w-3 mr-1" />Applied</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const summary = {
    total: verificationResults.length,
    verified: verificationResults.filter(r => r.status === 'verified').length,
    mismatches: verificationResults.filter(r => r.status === 'mismatch').length,
    unverified: verificationResults.filter(r => r.status === 'unable-to-verify').length,
  };

  const correctionsSummary = {
    pending: pendingCorrections.filter(c => c.status === 'pending').length,
    approved: pendingCorrections.filter(c => c.status === 'approved').length,
    rejected: pendingCorrections.filter(c => c.status === 'rejected').length,
    applied: pendingCorrections.filter(c => c.status === 'applied').length,
  };

  return (
    <>
      <Helmet>
        <title>Data Verification Tool (Admin) | Indeed Flex Career Hub</title>
        <meta name="description" content="Internal admin tool for verifying data accuracy against official government sources." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Data Verification (Admin)" }
          ]} />
        </div>

        {/* Hero */}
        <section className="bg-muted/50 border-b py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Data Verification Tool</h1>
                <p className="text-muted-foreground">
                  Verify local data files against official government sources
                </p>
              </div>
              <Badge variant="outline" className="ml-auto">
                <Shield className="h-3 w-3 mr-1" />
                Admin Only
              </Badge>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Error Alert */}
              {errorMessage && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Verification Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              {/* Main Tabs */}
              <Tabs defaultValue="verify" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="verify">Verification</TabsTrigger>
                  <TabsTrigger value="corrections" className="relative">
                    Corrections
                    {correctionsSummary.pending > 0 && (
                      <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
                        {correctionsSummary.pending}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="sources">Data Sources</TabsTrigger>
                </TabsList>

                {/* Verification Tab */}
                <TabsContent value="verify" className="space-y-6">
                  {/* Info Alert */}
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      This tool uses Firecrawl to scrape official government sources and compare the data with our local data files. 
                      Mismatches are automatically saved for review in the <strong>Corrections</strong> tab.
                    </AlertDescription>
                  </Alert>

                  {/* Run Verification */}
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle>Run Verification</CardTitle>
                      <CardDescription>
                        Scrape sources and compare with local data files (top 10 states)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Button 
                          onClick={runVerification} 
                          disabled={isLoading}
                          size="lg"
                          className="gap-2"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Verifying...
                            </>
                          ) : (
                            <>
                              <RefreshCw className="h-4 w-4" />
                              Run Verification
                            </>
                          )}
                        </Button>
                        {lastVerified && (
                          <span className="text-sm text-muted-foreground">
                            Last run: {lastVerified}
                          </span>
                        )}
                      </div>

                      {isLoading && (
                        <div className="space-y-2">
                          <Progress value={progress} className="h-2" />
                          <p className="text-sm text-muted-foreground">{currentStep}</p>
                        </div>
                      )}

                      {/* Summary */}
                      {verificationResults.length > 0 && (
                        <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-2xl font-bold">{summary.total}</div>
                            <div className="text-sm text-muted-foreground">Total Checks</div>
                          </div>
                          <div className="text-center p-3 bg-green-500/10 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{summary.verified}</div>
                            <div className="text-sm text-green-600">Verified</div>
                          </div>
                          <div className="text-center p-3 bg-red-500/10 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">{summary.mismatches}</div>
                            <div className="text-sm text-red-600">Mismatches</div>
                          </div>
                          <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
                            <div className="text-2xl font-bold text-yellow-600">{summary.unverified}</div>
                            <div className="text-sm text-yellow-600">Unable to Verify</div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Results */}
                  {verificationResults.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Verification Results</CardTitle>
                        <CardDescription>
                          Detailed comparison between local data and scraped values
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Tabs defaultValue="all">
                          <TabsList>
                            <TabsTrigger value="all">All ({summary.total})</TabsTrigger>
                            <TabsTrigger value="verified">Verified ({summary.verified})</TabsTrigger>
                            <TabsTrigger value="mismatch">Mismatches ({summary.mismatches})</TabsTrigger>
                            <TabsTrigger value="unverified">Unable ({summary.unverified})</TabsTrigger>
                          </TabsList>

                          {['all', 'verified', 'mismatch', 'unverified'].map((tab) => (
                            <TabsContent key={tab} value={tab} className="mt-4">
                              <div className="space-y-3">
                                {verificationResults
                                  .filter(r => tab === 'all' || 
                                    (tab === 'verified' && r.status === 'verified') ||
                                    (tab === 'mismatch' && r.status === 'mismatch') ||
                                    (tab === 'unverified' && r.status === 'unable-to-verify'))
                                  .map((result, index) => (
                                    <div 
                                      key={index}
                                      className={`p-4 rounded-lg border ${
                                        result.status === 'mismatch' ? 'border-red-500/50 bg-red-500/5' :
                                        result.status === 'verified' ? 'border-green-500/50 bg-green-500/5' :
                                        'border-yellow-500/50 bg-yellow-500/5'
                                      }`}
                                    >
                                      <div className="flex items-start gap-3">
                                        {getStatusIcon(result.status)}
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold">{result.field}</span>
                                            {getStatusBadge(result.status)}
                                          </div>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                            <div>
                                              <span className="text-muted-foreground">Local:</span>{" "}
                                              <span className="font-mono font-medium">{result.currentValue}</span>
                                            </div>
                                            <div>
                                              <span className="text-muted-foreground">Scraped:</span>{" "}
                                              <span className="font-mono font-medium">{result.scrapedValue || "N/A"}</span>
                                            </div>
                                          </div>
                                          {result.notes && (
                                            <p className="text-sm text-muted-foreground mt-2 italic">{result.notes}</p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </TabsContent>
                          ))}
                        </Tabs>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* Corrections Tab */}
                <TabsContent value="corrections" className="space-y-6">
                  {/* Corrections Summary */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <div className="text-2xl font-bold text-orange-600">{correctionsSummary.pending}</div>
                      <div className="text-sm text-orange-600">Pending</div>
                    </div>
                    <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="text-2xl font-bold text-green-600">{correctionsSummary.approved}</div>
                      <div className="text-sm text-green-600">Approved</div>
                    </div>
                    <div className="text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                      <div className="text-2xl font-bold text-red-600">{correctionsSummary.rejected}</div>
                      <div className="text-sm text-red-600">Rejected</div>
                    </div>
                    <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="text-2xl font-bold text-blue-600">{correctionsSummary.applied}</div>
                      <div className="text-sm text-blue-600">Applied</div>
                    </div>
                  </div>

                  {/* Export Button */}
                  {correctionsSummary.approved > 0 && (
                    <div className="flex justify-end">
                      <Button onClick={exportApprovedCorrections} variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export Approved Corrections
                      </Button>
                    </div>
                  )}

                  {/* Corrections List */}
                  {loadingCorrections ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : pendingCorrections.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center text-muted-foreground">
                        <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No corrections found. Run verification to detect mismatches.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {pendingCorrections.map((correction) => (
                        <Card key={correction.id} className={
                          correction.status === 'pending' ? 'border-orange-500/50' :
                          correction.status === 'approved' ? 'border-green-500/50' :
                          correction.status === 'rejected' ? 'border-red-500/50' :
                          ''
                        }>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-lg">
                                  {stateTaxData[correction.state_code]?.name || correction.state_code} - {correction.field_name}
                                </CardTitle>
                                <CardDescription>
                                  {correction.category} • {correction.local_file}
                                </CardDescription>
                              </div>
                              {getStatusBadge(correction.status)}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Values Comparison */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-3 bg-red-500/10 rounded-lg">
                                <div className="text-xs text-red-600 mb-1">Current Value (Local)</div>
                                <div className="font-mono font-bold text-lg">{correction.current_value}</div>
                              </div>
                              <div className="p-3 bg-green-500/10 rounded-lg">
                                <div className="text-xs text-green-600 mb-1">Suggested Value (Scraped)</div>
                                <div className="font-mono font-bold text-lg">{correction.suggested_value}</div>
                              </div>
                            </div>

                            {/* Source Info */}
                            <div className="text-sm">
                              <span className="text-muted-foreground">Source: </span>
                              <a href={correction.source_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                                {correction.source_name}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>

                            {/* Code Snippet */}
                            <div className="relative">
                              <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                                {generateCodeSnippet(correction)}
                              </pre>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="absolute top-2 right-2"
                                onClick={() => copyToClipboard(generateCodeSnippet(correction), correction.id)}
                              >
                                {copiedId === correction.id ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <ClipboardCopy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>

                            {/* Review Actions */}
                            {correction.status === 'pending' && (
                              <div className="space-y-3 pt-3 border-t">
                                <Textarea
                                  placeholder="Add review notes (optional)..."
                                  value={reviewNotes[correction.id] || ''}
                                  onChange={(e) => setReviewNotes(prev => ({ ...prev, [correction.id]: e.target.value }))}
                                  className="h-20"
                                />
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => updateCorrectionStatus(correction.id, 'approved')}
                                    className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                                  >
                                    <Check className="h-4 w-4" />
                                    Approve
                                  </Button>
                                  <Button
                                    onClick={() => updateCorrectionStatus(correction.id, 'rejected')}
                                    variant="destructive"
                                    className="flex-1 gap-2"
                                  >
                                    <X className="h-4 w-4" />
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            )}

                            {/* Review Info */}
                            {correction.reviewed_at && (
                              <div className="text-sm text-muted-foreground pt-3 border-t">
                                Reviewed: {new Date(correction.reviewed_at).toLocaleString()}
                                {correction.reviewer_notes && (
                                  <p className="mt-1 italic">Notes: {correction.reviewer_notes}</p>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Data Sources Tab */}
                <TabsContent value="sources" className="space-y-6">
                  {/* Local Data Files */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileCode className="h-5 w-5" />
                        Local Data Files
                      </CardTitle>
                      <CardDescription>Source files in our codebase being verified</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {dataFilesToVerify.map((file) => (
                        <div key={file.path} className="border rounded-lg p-4 bg-muted/30">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold flex items-center gap-2">
                                <FileText className="h-4 w-4 text-primary" />
                                {file.name}
                              </h4>
                              <code className="text-xs text-muted-foreground">{file.path}</code>
                            </div>
                            <Badge variant="secondary">{file.recordCount} states</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{file.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="text-xs text-muted-foreground">Fields:</span>
                            {file.fields.map((field) => (
                              <Badge key={field} variant="outline" className="text-xs">{field}</Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Official Sources */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Official Sources
                      </CardTitle>
                      <CardDescription>Government sources providing ground truth</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(verificationSources).map(([key, url]) => (
                          <div key={key} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border">
                            <FileText className="h-4 w-4 text-primary mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                              <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline truncate block">
                                {url}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* States Being Verified */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Table className="h-5 w-5" />
                        States Verified
                      </CardTitle>
                      <CardDescription>Top 10 states by population</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {statesToVerify.map((code) => (
                          <div key={code} className="p-2 bg-muted/50 rounded-lg border text-center min-w-[80px]">
                            <div className="font-bold text-lg">{code}</div>
                            <div className="text-xs text-muted-foreground">{stateTaxData[code]?.name}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default DataVerification;
