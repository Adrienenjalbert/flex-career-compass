import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  DollarSign, 
  Info, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Clock,
  Briefcase
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import {
  stateUnemploymentData,
  gigWorkGuidanceGeneral,
  calculateWeeklyBenefit,
  calculatePartialBenefit,
  getSortedStatesByBenefit,
} from "@/data/unemployment-benefits";

const faqs = [
  {
    question: "Can I work gig jobs while receiving unemployment benefits?",
    answer: "Yes, but you MUST report all earnings when certifying for benefits each week. Any income you earn will typically reduce your unemployment benefit. Most states have an 'earnings disregard' - a small amount you can earn before benefits are reduced. Check your state's specific rules."
  },
  {
    question: "How are unemployment benefits calculated?",
    answer: "Most states calculate your Weekly Benefit Amount (WBA) based on your highest-earning quarter during the 'base period' (typically the first 4 of the last 5 completed quarters). The formula is usually your highest quarter wages divided by a number like 25 or 26, up to the state's maximum."
  },
  {
    question: "What is the 'base period' for unemployment?",
    answer: "The base period is the time used to determine your eligibility and benefit amount. It's typically the first 4 of the last 5 completed calendar quarters before you filed. Some states offer an 'alternate base period' using more recent wages if you don't qualify with the standard period."
  },
  {
    question: "What happens if I don't report my gig work income?",
    answer: "Failing to report income is unemployment fraud - a serious offense that can result in loss of all benefits, repayment requirements, fines, and even criminal charges. Always report all earnings, even small amounts."
  },
  {
    question: "How much can I earn before my benefits are reduced?",
    answer: "This varies by state. Many states have an 'earnings disregard' - typically $25-100 or 20-50% of your weekly benefit - that you can earn before any reduction. After that, benefits usually reduce dollar-for-dollar for each dollar earned."
  },
  {
    question: "Do I need to look for full-time work while on unemployment?",
    answer: "Most states require you to actively seek and be available for full-time work. However, some states (CA, NY, OR, WA) allow part-time job search if that was your normal work pattern. Indeed Flex work can count toward your job search requirements in many states."
  },
  {
    question: "What's the waiting week?",
    answer: "Most states have a 1-week unpaid 'waiting week' at the start of your claim. You must file for this week but won't receive payment. Some states (CA, CT, IA, MD, MN, NJ, NY, OR, TX) have eliminated the waiting week."
  }
];

const UnemploymentCalculator = () => {
  // Income inputs
  const [highestQuarterWages, setHighestQuarterWages] = useState<string>("10000");
  const [secondHighestQuarterWages, setSecondHighestQuarterWages] = useState<string>("9000");
  const [state, setState] = useState<string>("TX");
  const [numDependents, setNumDependents] = useState<string>("0");
  
  // Partial employment
  const [hasPartTimeWork, setHasPartTimeWork] = useState(false);
  const [weeklyEarnings, setWeeklyEarnings] = useState<string>("200");
  
  // View mode
  const [activeTab, setActiveTab] = useState("calculator");

  const sortedStates = useMemo(() => {
    return Object.entries(stateUnemploymentData)
      .map(([code, data]) => ({ code, name: data.name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const topBenefitStates = useMemo(() => getSortedStatesByBenefit().slice(0, 10), []);

  const calculations = useMemo(() => {
    const stateInfo = stateUnemploymentData[state];
    if (!stateInfo) return null;

    const hqWages = parseFloat(highestQuarterWages) || 0;
    const shqWages = parseFloat(secondHighestQuarterWages) || 0;
    const deps = parseInt(numDependents) || 0;
    const earnings = parseFloat(weeklyEarnings) || 0;

    // Calculate base weekly benefit
    let weeklyBenefit = calculateWeeklyBenefit(state, hqWages, shqWages);
    
    // Add dependent allowance if applicable
    const dependentBonus = Math.min(deps, stateInfo.maxDependents) * stateInfo.dependentAllowance;
    const totalWeeklyBenefit = Math.min(stateInfo.maxWeeklyBenefit, weeklyBenefit + dependentBonus);

    // Calculate partial benefit if working
    let partialResult = { benefit: totalWeeklyBenefit, earningsDisregard: 0, netReduction: 0 };
    if (hasPartTimeWork && earnings > 0) {
      partialResult = calculatePartialBenefit(state, totalWeeklyBenefit, earnings);
    }

    // Calculate totals
    const effectiveWeeklyBenefit = hasPartTimeWork ? partialResult.benefit : totalWeeklyBenefit;
    const totalWeeklyIncome = effectiveWeeklyBenefit + (hasPartTimeWork ? earnings : 0);
    const totalBenefits = effectiveWeeklyBenefit * stateInfo.maxWeeks;
    const waitingWeekLoss = stateInfo.waitingWeek ? effectiveWeeklyBenefit : 0;
    const netTotalBenefits = totalBenefits - waitingWeekLoss;

    // Is it worth working?
    const worthWorking = hasPartTimeWork ? (totalWeeklyIncome > totalWeeklyBenefit) : null;

    return {
      stateInfo,
      weeklyBenefit: totalWeeklyBenefit,
      dependentBonus,
      partialBenefit: partialResult.benefit,
      earningsDisregard: partialResult.earningsDisregard,
      benefitReduction: partialResult.netReduction,
      effectiveWeeklyBenefit,
      totalWeeklyIncome,
      monthlyBenefit: effectiveWeeklyBenefit * 4.33,
      totalBenefits: netTotalBenefits,
      maxWeeks: stateInfo.maxWeeks,
      waitingWeek: stateInfo.waitingWeek,
      worthWorking,
      atMaxBenefit: totalWeeklyBenefit >= stateInfo.maxWeeklyBenefit,
    };
  }, [state, highestQuarterWages, secondHighestQuarterWages, numDependents, hasPartTimeWork, weeklyEarnings]);

  const stateInfo = stateUnemploymentData[state];

  return (
    <>
      <Helmet>
        <title>Unemployment Benefits Calculator by State 2025 | Indeed Flex Career Hub</title>
        <meta name="description" content="Calculate your unemployment benefits for all 50 states. See weekly benefit amounts, partial unemployment rules, and how gig work affects your benefits. Free 2025 calculator." />
        <link rel="canonical" href="https://indeedflex.com/career-hub/tools/unemployment-calculator" />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Unemployment Calculator" }
          ]} />
        </div>

        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/20 rounded-full">
                <ShieldCheck className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Unemployment Benefits Calculator
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Estimate your unemployment benefits in all 50 states. See how part-time work affects your benefits and get guidance on working while receiving unemployment.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-8">
                <TabsTrigger value="calculator">Calculator</TabsTrigger>
                <TabsTrigger value="gig-work">Gig Work Rules</TabsTrigger>
                <TabsTrigger value="compare">Compare States</TabsTrigger>
              </TabsList>

              {/* Calculator Tab */}
              <TabsContent value="calculator">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Input Section */}
                  <div className="lg:col-span-3 space-y-6">
                    {/* State & Wages */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          Your Employment History
                        </CardTitle>
                        <CardDescription>
                          Enter your wages from the base period (typically last 4-5 quarters)
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="state">State Where You Worked</Label>
                          <Select value={state} onValueChange={setState}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                              {sortedStates.map(({ code, name }) => (
                                <SelectItem key={code} value={code}>
                                  {name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {stateInfo && (
                            <p className="text-xs text-muted-foreground">
                              Max weekly benefit: ${stateInfo.maxWeeklyBenefit} • 
                              Duration: {stateInfo.maxWeeks} weeks • 
                              {stateInfo.waitingWeek ? '1-week wait' : 'No waiting week'}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="highestQuarter">
                              Highest Quarter Wages ($)
                              <HelpCircle className="inline h-3 w-3 ml-1 text-muted-foreground" />
                            </Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="highestQuarter"
                                type="number"
                                min="0"
                                value={highestQuarterWages}
                                onChange={(e) => setHighestQuarterWages(e.target.value)}
                                className="pl-9"
                                placeholder="10000"
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Your best-earning 3-month period
                            </p>
                          </div>

                          {stateInfo?.calculationMethod === 'two-highest-quarters' && (
                            <div className="space-y-2">
                              <Label htmlFor="secondHighestQuarter">
                                2nd Highest Quarter Wages ($)
                              </Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="secondHighestQuarter"
                                  type="number"
                                  min="0"
                                  value={secondHighestQuarterWages}
                                  onChange={(e) => setSecondHighestQuarterWages(e.target.value)}
                                  className="pl-9"
                                  placeholder="9000"
                                />
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {state} uses two highest quarters
                              </p>
                            </div>
                          )}
                        </div>

                        {stateInfo && stateInfo.dependentAllowance > 0 && (
                          <div className="space-y-2">
                            <Label htmlFor="dependents">
                              Number of Dependents (up to {stateInfo.maxDependents})
                            </Label>
                            <Select value={numDependents} onValueChange={setNumDependents}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: stateInfo.maxDependents + 1 }, (_, i) => (
                                  <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                              {state} adds ${stateInfo.dependentAllowance}/week per dependent
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Partial Employment */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Briefcase className="h-5 w-5" />
                          Part-Time Work While on Unemployment
                        </CardTitle>
                        <CardDescription>
                          See how earning income affects your benefit amount
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                          <div>
                            <Label className="text-base">Are you working part-time?</Label>
                            <p className="text-sm text-muted-foreground">
                              Calculate your reduced benefit with earnings
                            </p>
                          </div>
                          <Switch
                            checked={hasPartTimeWork}
                            onCheckedChange={setHasPartTimeWork}
                          />
                        </div>

                        {hasPartTimeWork && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="weeklyEarnings">Weekly Part-Time Earnings ($)</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="weeklyEarnings"
                                  type="number"
                                  min="0"
                                  value={weeklyEarnings}
                                  onChange={(e) => setWeeklyEarnings(e.target.value)}
                                  className="pl-9"
                                  placeholder="200"
                                />
                              </div>
                            </div>

                            {stateInfo && (
                              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                                <div className="font-medium mb-2">{state} Partial Unemployment Rules:</div>
                                <ul className="text-sm space-y-1 text-muted-foreground">
                                  <li>
                                    • Earnings disregard: {stateInfo.partialEarningsDisregardType === 'flat' 
                                      ? `$${stateInfo.partialEarningsDisregard}` 
                                      : stateInfo.partialEarningsDisregardType === 'percentage'
                                      ? `${stateInfo.partialEarningsDisregardPercent}% of WBA`
                                      : `$${stateInfo.partialEarningsDisregard} or ${stateInfo.partialEarningsDisregardPercent}% (whichever greater)`}
                                  </li>
                                  <li>
                                    • Benefit reduction: {stateInfo.benefitReductionRate === 1 
                                      ? '$1 for every $1 earned above disregard' 
                                      : `$${stateInfo.benefitReductionRate} for every $1 earned`}
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Results Section */}
                  <div className="lg:col-span-2 space-y-6">
                    {calculations && (
                      <>
                        <Card className="bg-primary text-primary-foreground sticky top-20">
                          <CardHeader>
                            <CardTitle className="text-primary-foreground">
                              Estimated Benefits
                            </CardTitle>
                            <CardDescription className="text-primary-foreground/70">
                              Based on {calculations.stateInfo.name} rules
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {/* Weekly Benefit */}
                            <div className="bg-accent/20 rounded-lg p-4 text-center">
                              <div className="text-sm text-primary-foreground/70 mb-1">
                                {hasPartTimeWork ? 'Reduced Weekly Benefit' : 'Weekly Benefit Amount'}
                              </div>
                              <div className="text-4xl font-bold text-accent">
                                ${calculations.effectiveWeeklyBenefit.toFixed(0)}
                              </div>
                              {calculations.atMaxBenefit && (
                                <Badge variant="secondary" className="mt-2">
                                  At state maximum
                                </Badge>
                              )}
                            </div>

                            {/* Part-time work breakdown */}
                            {hasPartTimeWork && (
                              <div className="space-y-3 p-4 bg-primary-foreground/10 rounded-lg">
                                <div className="flex justify-between text-sm">
                                  <span className="text-primary-foreground/70">Full Weekly Benefit</span>
                                  <span>${calculations.weeklyBenefit.toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-primary-foreground/70">Earnings Disregard</span>
                                  <span className="text-accent">
                                    ${calculations.earningsDisregard.toFixed(0)}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-primary-foreground/70">Benefit Reduction</span>
                                  <span>-${calculations.benefitReduction.toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between text-sm pt-2 border-t border-primary-foreground/20">
                                  <span className="font-medium">Your Weekly Earnings</span>
                                  <span>+${parseFloat(weeklyEarnings || '0').toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between font-medium pt-2 border-t border-primary-foreground/20">
                                  <span>Total Weekly Income</span>
                                  <span className="text-accent">${calculations.totalWeeklyIncome.toFixed(0)}</span>
                                </div>
                              </div>
                            )}

                            {/* Worth working indicator */}
                            {calculations.worthWorking !== null && (
                              <div className={`p-3 rounded-lg flex items-center gap-2 ${
                                calculations.worthWorking 
                                  ? 'bg-success/20 text-success' 
                                  : 'bg-destructive/20 text-destructive'
                              }`}>
                                {calculations.worthWorking ? (
                                  <>
                                    <CheckCircle className="h-5 w-5" />
                                    <span className="text-sm">
                                      Working adds ${(calculations.totalWeeklyIncome - calculations.weeklyBenefit).toFixed(0)}/week to your income
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <AlertTriangle className="h-5 w-5" />
                                    <span className="text-sm">
                                      Working reduces your total income this week
                                    </span>
                                  </>
                                )}
                              </div>
                            )}

                            {/* Summary stats */}
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-primary-foreground/70">Monthly Benefit</span>
                                <span>${calculations.monthlyBenefit.toFixed(0)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-primary-foreground/70">Maximum Duration</span>
                                <span>{calculations.maxWeeks} weeks</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-primary-foreground/70">Waiting Week</span>
                                <span>{calculations.waitingWeek ? 'Yes (1 week unpaid)' : 'None'}</span>
                              </div>
                              {calculations.dependentBonus > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span className="text-primary-foreground/70">Dependent Bonus</span>
                                  <span className="text-accent">+${calculations.dependentBonus}/week</span>
                                </div>
                              )}
                              <div className="flex justify-between pt-2 border-t border-primary-foreground/20">
                                <span className="font-medium">Total Potential Benefits</span>
                                <span className="font-bold">${calculations.totalBenefits.toLocaleString()}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* State Notes */}
                        {calculations.stateInfo.notes && (
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Info className="h-4 w-4" />
                                {calculations.stateInfo.name} Notes
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground">
                                {calculations.stateInfo.notes}
                              </p>
                            </CardContent>
                          </Card>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Gig Work Tab */}
              <TabsContent value="gig-work">
                <div className="max-w-4xl mx-auto space-y-8">
                  {/* Critical Alert */}
                  <Card className="border-destructive">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        Critical: You Must Report All Income
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        <strong>Failure to report income from gig work, freelance, or any other source is unemployment fraud.</strong> This can result in:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                        <li>Immediate loss of all benefits</li>
                        <li>Requirement to repay all benefits received</li>
                        <li>Additional fines and penalties</li>
                        <li>Potential criminal prosecution</li>
                        <li>Disqualification from future benefits</li>
                      </ul>
                      <p className="font-medium">
                        Always report ALL earnings when certifying for benefits each week, even if you think the amount is small.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Can You Work? */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Can You Do Gig Work While on Unemployment?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        <strong>Yes, in most cases.</strong> You can work part-time, do gig work, or take temporary shifts while receiving unemployment benefits. However:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                          <div className="font-medium text-success mb-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            You CAN
                          </div>
                          <ul className="text-sm space-y-1">
                            <li>• Work part-time and receive partial benefits</li>
                            <li>• Take gig/freelance work</li>
                            <li>• Use Indeed Flex for temporary shifts</li>
                            <li>• Earn up to your state's disregard without reduction</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                          <div className="font-medium text-destructive mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            You MUST
                          </div>
                          <ul className="text-sm space-y-1">
                            <li>• Report ALL earnings every week</li>
                            <li>• Continue looking for full-time work (most states)</li>
                            <li>• Be available for full-time work if offered</li>
                            <li>• Keep records of work search activities</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* How Benefits Are Reduced */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        How Earnings Affect Your Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>When you earn money while on unemployment, your benefits are typically reduced. Here's how it works:</p>
                      
                      <div className="p-4 bg-secondary rounded-lg">
                        <div className="font-medium mb-3">Example: Texas ($250/week benefit, 25% disregard)</div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Weekly Benefit Amount:</span>
                            <span>$250</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Earnings Disregard (25%):</span>
                            <span className="text-accent">$62.50</span>
                          </div>
                          <div className="flex justify-between">
                            <span>If you earn $150:</span>
                            <span></span>
                          </div>
                          <div className="flex justify-between pl-4 text-muted-foreground">
                            <span>• Amount above disregard:</span>
                            <span>$150 - $62.50 = $87.50</span>
                          </div>
                          <div className="flex justify-between pl-4 text-muted-foreground">
                            <span>• Benefit reduction:</span>
                            <span>-$87.50</span>
                          </div>
                          <div className="flex justify-between font-medium pt-2 border-t">
                            <span>Reduced Benefit:</span>
                            <span>$162.50</span>
                          </div>
                          <div className="flex justify-between font-medium text-accent">
                            <span>Total Weekly Income:</span>
                            <span>$312.50 ($150 + $162.50)</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        In this example, working and earning $150 results in $62.50 more than just taking unemployment ($312.50 vs $250). Use the calculator above to see your specific situation.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Indeed Flex Advantage */}
                  <Card className="border-primary">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        Why Indeed Flex Works Well With Unemployment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex gap-3">
                          <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">Flexible Scheduling</div>
                            <p className="text-sm text-muted-foreground">
                              Pick shifts that fit your schedule and job search requirements
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <DollarSign className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">Clear Earnings Records</div>
                            <p className="text-sm text-muted-foreground">
                              All earnings are documented, making reporting easy
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">Top Up Benefits</div>
                            <p className="text-sm text-muted-foreground">
                              Work just enough to maximize total income without losing all benefits
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Briefcase className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">Path to Permanent Work</div>
                            <p className="text-sm text-muted-foreground">
                              Many temp positions convert to full-time opportunities
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Compare States Tab */}
              <TabsContent value="compare">
                <div className="max-w-4xl mx-auto space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>States with Highest Maximum Benefits</CardTitle>
                      <CardDescription>
                        Maximum weekly benefit amounts vary significantly by state
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {topBenefitStates.map((state, index) => {
                          const info = stateUnemploymentData[state.code];
                          const widthPercent = (state.maxBenefit / 1033) * 100; // MA has highest at 1033
                          
                          return (
                            <div key={state.code} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>
                                  {index + 1}. {state.name}
                                  {info.waitingWeek === false && (
                                    <Badge variant="outline" className="ml-2 text-xs">No wait</Badge>
                                  )}
                                </span>
                                <span className="font-medium">${state.maxBenefit}/week</span>
                              </div>
                              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full transition-all"
                                  style={{ width: `${widthPercent}%` }}
                                />
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {info.maxWeeks} weeks max • {info.partialEarningsDisregardType === 'percentage' 
                                  ? `${info.partialEarningsDisregardPercent}%` 
                                  : `$${info.partialEarningsDisregard}`} disregard
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lowest Benefits States */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        States with Lowest Benefits / Shortest Duration
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="font-medium mb-3">Lowest Maximum Benefits</div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between p-2 bg-secondary rounded">
                              <span>Mississippi</span>
                              <span className="text-destructive">$235/week</span>
                            </div>
                            <div className="flex justify-between p-2 bg-secondary rounded">
                              <span>Alabama, Florida, Tennessee, Louisiana</span>
                              <span className="text-destructive">$275/week</span>
                            </div>
                            <div className="flex justify-between p-2 bg-secondary rounded">
                              <span>Arizona, Missouri</span>
                              <span className="text-destructive">$320/week</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="font-medium mb-3">Shortest Duration</div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between p-2 bg-secondary rounded">
                              <span>Florida, North Carolina</span>
                              <span className="text-destructive">12 weeks</span>
                            </div>
                            <div className="flex justify-between p-2 bg-secondary rounded">
                              <span>Alabama, Georgia</span>
                              <span className="text-destructive">14 weeks</span>
                            </div>
                            <div className="flex justify-between p-2 bg-secondary rounded">
                              <span>Arkansas, Kansas</span>
                              <span className="text-destructive">16 weeks</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* States friendly to part-time work */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-success" />
                        Most Favorable for Part-Time Work
                      </CardTitle>
                      <CardDescription>
                        These states have generous disregards or reduced benefit reduction rates
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                          <div className="font-medium">Michigan & Illinois</div>
                          <p className="text-muted-foreground">50% disregard AND only 50% reduction rate</p>
                        </div>
                        <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                          <div className="font-medium">Minnesota</div>
                          <p className="text-muted-foreground">50% disregard, 50% reduction, no waiting week</p>
                        </div>
                        <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                          <div className="font-medium">Hawaii</div>
                          <p className="text-muted-foreground">$150 flat disregard - very generous</p>
                        </div>
                        <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                          <div className="font-medium">Oklahoma</div>
                          <p className="text-muted-foreground">$100 flat disregard</p>
                        </div>
                        <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                          <div className="font-medium">Oregon, California, Washington</div>
                          <p className="text-muted-foreground">Can seek part-time work if that's your normal</p>
                        </div>
                        <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                          <div className="font-medium">Wyoming, Delaware</div>
                          <p className="text-muted-foreground">50% earnings disregard</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Disclaimer */}
            <div className="max-w-6xl mx-auto mt-8">
              <div className="flex items-start gap-3 bg-secondary rounded-lg p-4">
                <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">
                    <strong>Disclaimer:</strong> This calculator provides estimates for educational purposes only. 
                    Actual benefits depend on your complete work history, reason for unemployment, and other factors. 
                    Rules and benefit amounts change periodically.
                  </p>
                  <p>
                    Always verify with your state's unemployment office for official eligibility and benefit amounts. 
                    This tool is not a substitute for official guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4 max-w-3xl">
            <FAQSection faqs={faqs} title="Unemployment Benefits FAQs" />
          </div>
        </section>

        <CTASection 
          title="Supplement Your Income with Indeed Flex"
          subtitle="Find flexible shifts that work with your schedule and unemployment requirements."
        />
      </Layout>
    </>
  );
};

export default UnemploymentCalculator;
