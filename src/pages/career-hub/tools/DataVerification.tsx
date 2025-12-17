import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
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
  Shield
} from "lucide-react";
import { firecrawlApi, verificationSources } from "@/lib/api/firecrawl";
import { stateTaxData } from "@/data/state-taxes";
import { stateUnemploymentData } from "@/data/unemployment-benefits";

interface VerificationResult {
  source: string;
  category: string;
  field: string;
  currentValue: string | number;
  scrapedValue?: string | number;
  status: 'verified' | 'mismatch' | 'unable-to-verify' | 'pending';
  notes?: string;
}

interface ScrapeResult {
  success: boolean;
  content?: string;
  error?: string;
}

// Sample states to verify (top 10 by population)
const statesToVerify = ['CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI'];

const DataVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [scrapeResults, setScrapeResults] = useState<Record<string, ScrapeResult>>({});
  const [verificationResults, setVerificationResults] = useState<VerificationResult[]>([]);
  const [lastVerified, setLastVerified] = useState<string | null>(null);

  // Parse minimum wage from scraped content
  const parseMinWageFromContent = (content: string, stateCode: string): number | null => {
    const stateName = stateTaxData[stateCode]?.name;
    if (!stateName) return null;

    // Look for patterns like "$16.50" near the state name
    const patterns = [
      new RegExp(`${stateName}[^$]*\\$([\\d.]+)`, 'i'),
      new RegExp(`\\$([\\d.]+)[^$]*${stateName}`, 'i'),
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        const value = parseFloat(match[1]);
        if (value >= 7 && value <= 25) { // Reasonable min wage range
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

    // Look for dollar amounts near the state name
    const patterns = [
      new RegExp(`${stateName}[^$]*\\$([\\d,]+)`, 'i'),
      new RegExp(`\\$([\\d,]+)[^$]*${stateName}`, 'i'),
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        const value = parseInt(match[1].replace(',', ''));
        if (value >= 200 && value <= 1500) { // Reasonable unemployment range
          return value;
        }
      }
    }
    return null;
  };

  const runVerification = async () => {
    setIsLoading(true);
    setProgress(0);
    setVerificationResults([]);
    setScrapeResults({});

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

          results.push({
            source: 'DOL Minimum Wage',
            category: 'Minimum Wage',
            field: `${stateData.name} Min Wage`,
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
          });
        }
        updateProgress();

        // Verify unemployment max benefit
        if (unemploymentData && unemploymentResult.success) {
          const scrapedUnemployment = parseUnemploymentFromContent(
            unemploymentResult.data?.markdown || '', 
            stateCode
          );

          results.push({
            source: 'DOL Unemployment',
            category: 'Unemployment Benefits',
            field: `${unemploymentData.name} Max Weekly`,
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
          });
        }
        updateProgress();
      }

      setVerificationResults(results);
      setLastVerified(new Date().toLocaleString());
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setIsLoading(false);
      setCurrentStep("");
      setProgress(100);
    }
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

  const getStatusBadge = (status: VerificationResult['status']) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Verified</Badge>;
      case 'mismatch':
        return <Badge variant="destructive">Mismatch</Badge>;
      case 'unable-to-verify':
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Unable to Verify</Badge>;
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
                  Internal admin tool for verifying data accuracy
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
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Info Alert */}
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  This tool uses Firecrawl to scrape official government sources and compare the data with what's stored in our data files. 
                  Discrepancies are highlighted for manual review.
                </AlertDescription>
              </Alert>

              {/* Data Sources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    Official Data Sources
                  </CardTitle>
                  <CardDescription>
                    Sources that will be scraped for verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(verificationSources).map(([key, url]) => (
                      <div key={key} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <a 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline truncate block"
                          >
                            {url}
                          </a>
                        </div>
                        {scrapeResults[key] && (
                          scrapeResults[key].success 
                            ? <CheckCircle className="h-4 w-4 text-green-500" />
                            : <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Run Verification */}
              <Card>
                <CardHeader>
                  <CardTitle>Run Verification</CardTitle>
                  <CardDescription>
                    Scrape sources and compare with local data files
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={runVerification} 
                      disabled={isLoading}
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
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
                      Comparison between local data and scraped values
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all">
                      <TabsList>
                        <TabsTrigger value="all">All ({summary.total})</TabsTrigger>
                        <TabsTrigger value="mismatches" className="text-red-600">
                          Mismatches ({summary.mismatches})
                        </TabsTrigger>
                        <TabsTrigger value="verified">Verified ({summary.verified})</TabsTrigger>
                        <TabsTrigger value="unverified">Unverified ({summary.unverified})</TabsTrigger>
                      </TabsList>

                      {['all', 'mismatches', 'verified', 'unverified'].map(tab => (
                        <TabsContent key={tab} value={tab} className="mt-4">
                          <div className="space-y-3">
                            {verificationResults
                              .filter(r => {
                                if (tab === 'all') return true;
                                if (tab === 'mismatches') return r.status === 'mismatch';
                                if (tab === 'verified') return r.status === 'verified';
                                if (tab === 'unverified') return r.status === 'unable-to-verify';
                                return true;
                              })
                              .map((result, idx) => (
                                <div 
                                  key={idx} 
                                  className={`p-4 rounded-lg border ${
                                    result.status === 'mismatch' 
                                      ? 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20' 
                                      : result.status === 'verified'
                                      ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20'
                                      : 'border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/20'
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    {getStatusIcon(result.status)}
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium">{result.field}</span>
                                        {getStatusBadge(result.status)}
                                      </div>
                                      <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                                        <div>
                                          <span className="text-muted-foreground">Local Data:</span>
                                          <span className="ml-2 font-mono">{result.currentValue}</span>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Scraped:</span>
                                          <span className="ml-2 font-mono">
                                            {result.scrapedValue || '—'}
                                          </span>
                                        </div>
                                      </div>
                                      {result.notes && (
                                        <p className="text-sm text-muted-foreground mt-2">
                                          {result.notes}
                                        </p>
                                      )}
                                      <div className="text-xs text-muted-foreground mt-1">
                                        Source: {result.source}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}

                            {verificationResults.filter(r => {
                              if (tab === 'all') return true;
                              if (tab === 'mismatches') return r.status === 'mismatch';
                              if (tab === 'verified') return r.status === 'verified';
                              if (tab === 'unverified') return r.status === 'unable-to-verify';
                              return true;
                            }).length === 0 && (
                              <div className="text-center py-8 text-muted-foreground">
                                No results in this category
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              )}

              {/* Local Data Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Local Data Summary</CardTitle>
                  <CardDescription>
                    Overview of data currently stored in data files
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">State Tax Data (state-taxes.ts)</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Total States:</span>
                          <span>{Object.keys(stateTaxData).length}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">No Income Tax States:</span>
                          <span>
                            {Object.values(stateTaxData).filter(s => s.hasNoIncomeTax).length}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Min Wage Range:</span>
                          <span>
                            ${Math.min(...Object.values(stateTaxData).map(s => s.minWage))} - 
                            ${Math.max(...Object.values(stateTaxData).map(s => s.minWage))}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Unemployment Data (unemployment-benefits.ts)</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Total States:</span>
                          <span>{Object.keys(stateUnemploymentData).length}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Max Weekly Range:</span>
                          <span>
                            ${Math.min(...Object.values(stateUnemploymentData).map(s => s.maxWeeklyBenefit))} - 
                            ${Math.max(...Object.values(stateUnemploymentData).map(s => s.maxWeeklyBenefit))}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Duration Range:</span>
                          <span>
                            {Math.min(...Object.values(stateUnemploymentData).map(s => s.maxWeeks))} - 
                            {Math.max(...Object.values(stateUnemploymentData).map(s => s.maxWeeks))} weeks
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default DataVerification;
