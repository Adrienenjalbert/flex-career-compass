import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  Shield,
  ArrowRight,
  Table,
  FileCode,
  Globe
} from "lucide-react";
import { firecrawlApi, verificationSources } from "@/lib/api/firecrawl";
import { stateTaxData } from "@/data/state-taxes";
import { stateUnemploymentData } from "@/data/unemployment-benefits";

interface VerificationResult {
  source: string;
  sourceUrl: string;
  localFile: string;
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
  data?: {
    markdown?: string;
  };
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

          results.push({
            source: 'DOL Minimum Wage',
            sourceUrl: verificationSources.minimumWage,
            localFile: 'src/data/state-taxes.ts',
            category: 'Minimum Wage',
            field: `${stateData.name} (${stateCode}) - minWage`,
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
            sourceUrl: verificationSources.unemployment,
            localFile: 'src/data/unemployment-benefits.ts',
            category: 'Unemployment Benefits',
            field: `${unemploymentData.name} (${stateCode}) - maxWeeklyBenefit`,
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
      setErrorMessage(error instanceof Error ? error.message : 'Verification failed');
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

              {/* Info Alert */}
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  This tool uses Firecrawl to scrape official government sources and compare the data with our local data files. 
                  Only the <strong>top 10 states by population</strong> are checked to conserve API calls.
                </AlertDescription>
              </Alert>

              {/* Local Data Files Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCode className="h-5 w-5" />
                    Local Data Files Being Verified
                  </CardTitle>
                  <CardDescription>
                    These are the source files in our codebase that contain the data
                  </CardDescription>
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
                        <span className="text-xs text-muted-foreground">Fields checked:</span>
                        {file.fields.map((field) => (
                          <Badge key={field} variant="outline" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Verified against:</span>
                        <a 
                          href={file.officialSource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          {file.officialSource.name}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Official Sources Being Scraped */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Official Sources Being Scraped
                  </CardTitle>
                  <CardDescription>
                    Government and authoritative sources that provide the ground truth
                  </CardDescription>
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
                          <div className="flex-shrink-0">
                            {scrapeResults[key].success 
                              ? <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Scraped</Badge>
                              : <Badge variant="destructive">Failed</Badge>
                            }
                          </div>
                        )}
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
                    States Being Verified
                  </CardTitle>
                  <CardDescription>
                    Top 10 states by population - checking 2 data points per state
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {statesToVerify.map((code) => (
                      <div key={code} className="p-2 bg-muted/50 rounded-lg border text-center min-w-[80px]">
                        <div className="font-bold text-lg">{code}</div>
                        <div className="text-xs text-muted-foreground">
                          {stateTaxData[code]?.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                      <Info className="h-4 w-4" />
                      <span>
                        <strong>{statesToVerify.length * 2} total checks:</strong> {statesToVerify.length} minimum wage + {statesToVerify.length} unemployment benefit verifications
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Run Verification */}
              <Card className="border-primary/20">
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
                        <TabsTrigger value="all">
                          All ({summary.total})
                        </TabsTrigger>
                        <TabsTrigger value="verified">
                          Verified ({summary.verified})
                        </TabsTrigger>
                        <TabsTrigger value="mismatch">
                          Mismatches ({summary.mismatches})
                        </TabsTrigger>
                        <TabsTrigger value="unverified">
                          Unable to Verify ({summary.unverified})
                        </TabsTrigger>
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
                                          <span className="text-muted-foreground">Local Value:</span>{" "}
                                          <span className="font-mono font-medium">{result.currentValue}</span>
                                          <div className="text-xs text-muted-foreground">
                                            from <code>{result.localFile}</code>
                                          </div>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Scraped Value:</span>{" "}
                                          <span className="font-mono font-medium">
                                            {result.scrapedValue || "N/A"}
                                          </span>
                                          <div className="text-xs text-muted-foreground">
                                            from {result.source}
                                          </div>
                                        </div>
                                      </div>
                                      {result.notes && (
                                        <p className="text-sm text-muted-foreground mt-2 italic">
                                          {result.notes}
                                        </p>
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

              {/* Scraped Content Preview */}
              {Object.keys(scrapeResults).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Scraped Content Preview</CardTitle>
                    <CardDescription>
                      Raw markdown from each source (first 500 characters)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue={Object.keys(scrapeResults)[0]}>
                      <TabsList className="flex-wrap h-auto gap-1">
                        {Object.keys(scrapeResults).map((key) => (
                          <TabsTrigger key={key} value={key} className="text-xs">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                            {scrapeResults[key].success 
                              ? <CheckCircle className="h-3 w-3 ml-1 text-green-500" />
                              : <XCircle className="h-3 w-3 ml-1 text-red-500" />
                            }
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {Object.entries(scrapeResults).map(([key, result]) => (
                        <TabsContent key={key} value={key}>
                          {result.success ? (
                            <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto max-h-60 whitespace-pre-wrap">
                              {(result.content || result.data?.markdown || "No content").slice(0, 500)}...
                            </pre>
                          ) : (
                            <Alert variant="destructive">
                              <AlertDescription>
                                Failed to scrape: {result.error}
                              </AlertDescription>
                            </Alert>
                          )}
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default DataVerification;
