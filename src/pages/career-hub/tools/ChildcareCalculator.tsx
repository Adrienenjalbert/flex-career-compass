import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { 
  Baby, 
  DollarSign, 
  Calculator, 
  TrendingUp, 
  Info, 
  Calendar,
  Building2,
  Home,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
  Lightbulb
} from "lucide-react";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  stateChildcareCosts, 
  getStateChildcareCosts,
  calculateCDCTC,
  CDCTC_LIMITS,
  DCFSA_LIMIT,
  NATIONAL_AVERAGES,
  AGE_CATEGORIES,
  CARE_TYPES,
  type ChildAgeCategory,
  type CareType
} from "@/data/childcare-costs";

interface ChildEntry {
  id: string;
  age: ChildAgeCategory;
}

const faqs = [
  {
    question: "What is the Child and Dependent Care Tax Credit (CDCTC)?",
    answer: "The CDCTC is a federal tax credit that allows you to claim 20-35% of qualifying childcare expenses (up to $3,000 for one child or $6,000 for two or more) depending on your income. This directly reduces your tax bill, not just your taxable income."
  },
  {
    question: "Can I use both an FSA and the tax credit?",
    answer: "Yes, but they work together. If you contribute to a Dependent Care FSA ($5,000 max), that amount reduces your eligible expenses for the tax credit. For example, if you have $8,000 in childcare costs and use $5,000 in FSA, only $1,000 ($6,000 limit minus $5,000 FSA) can qualify for the credit."
  },
  {
    question: "Does flexible/gig work qualify for childcare credits?",
    answer: "Yes! The CDCTC requires that care be provided so you can work or look for work. This includes part-time work, gig work, and freelance work. You must have earned income to claim the credit."
  },
  {
    question: "What childcare expenses are tax-deductible?",
    answer: "Qualifying expenses include daycare centers, home-based childcare, nannies, au pairs, and before/after school programs for children under 13. Summer camps (not overnight) also qualify. You'll need your provider's name, address, and tax ID."
  },
  {
    question: "How do I find childcare subsidies in my state?",
    answer: "Each state has a Child Care Assistance Program (CCAP) or similar program. Income limits vary from 65% to 350% of the Federal Poverty Level. Use the subsidy link provided in your state's results to check eligibility and apply."
  },
  {
    question: "Is part-time work worth it after childcare costs?",
    answer: "Often yes! Part-time work typically means proportionally less childcare needed (3 days = 60% of full-time childcare cost). You still build work experience, maintain professional skills, and may qualify for tax credits. Our calculator shows the 'sweet spot' hours."
  }
];

const ChildcareCalculator = () => {
  // State selection
  const [selectedState, setSelectedState] = useState<string>("TX");
  
  // Children configuration
  const [children, setChildren] = useState<ChildEntry[]>([
    { id: "1", age: "preschool" }
  ]);
  
  // Care preferences
  const [careType, setCareType] = useState<CareType>("center");
  
  // Work details
  const [hourlyWage, setHourlyWage] = useState<number>(18);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  
  // Tax benefits
  const [useFSA, setUseFSA] = useState<boolean>(false);
  
  // Get state data
  const stateData = useMemo(() => getStateChildcareCosts(selectedState), [selectedState]);
  
  // Sort states for dropdown
  const sortedStates = useMemo(() => 
    [...stateChildcareCosts].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );
  
  // Calculate childcare costs
  const calculations = useMemo(() => {
    if (!stateData) return null;
    
    // Calculate annual childcare cost for all children
    let totalAnnualChildcare = 0;
    children.forEach(child => {
      const prefix = careType === 'center' ? 'center' : 'family';
      const key = `${prefix}${child.age.charAt(0).toUpperCase()}${child.age.slice(1)}` as keyof typeof stateData;
      const annualCost = stateData[key] as number;
      // Adjust for days per week (assuming 5 days is full-time)
      const adjustedCost = annualCost * (daysPerWeek / 5);
      totalAnnualChildcare += adjustedCost;
    });
    
    // Calculate gross income
    const weeksWorked = 52;
    const grossAnnual = hourlyWage * hoursPerWeek * weeksWorked;
    const grossMonthly = grossAnnual / 12;
    
    // Calculate tax benefits
    const fsaSavings = useFSA ? Math.min(DCFSA_LIMIT, totalAnnualChildcare) * 0.25 : 0; // Assume ~25% tax bracket savings
    const remainingForCredit = useFSA 
      ? Math.max(0, totalAnnualChildcare - DCFSA_LIMIT)
      : totalAnnualChildcare;
    
    const cdctcAmount = calculateCDCTC(
      grossAnnual, 
      remainingForCredit, 
      children.length
    );
    
    const totalTaxBenefits = fsaSavings + cdctcAmount;
    
    // Net calculations
    const netAnnual = grossAnnual - totalAnnualChildcare + totalTaxBenefits;
    const netMonthly = netAnnual / 12;
    const effectiveHourlyRate = netAnnual / (hoursPerWeek * weeksWorked);
    
    // Break-even rate (hourly wage needed to just cover childcare)
    const breakEvenRate = totalAnnualChildcare / (hoursPerWeek * weeksWorked);
    
    // Is it worth working?
    const worthWorking = netAnnual > 0;
    
    // Flexible schedule comparison
    const scheduleComparisons = [5, 4, 3, 2].map(days => {
      const dayChildcare = totalAnnualChildcare * (days / daysPerWeek);
      const dayGross = grossAnnual * (days / daysPerWeek);
      const dayFSA = useFSA ? Math.min(DCFSA_LIMIT, dayChildcare) * 0.25 : 0;
      const dayCredit = calculateCDCTC(dayGross, useFSA ? Math.max(0, dayChildcare - DCFSA_LIMIT) : dayChildcare, children.length);
      const dayNet = dayGross - dayChildcare + dayFSA + dayCredit;
      return {
        days,
        childcare: dayChildcare,
        gross: dayGross,
        net: dayNet,
        effectiveRate: dayNet / ((hoursPerWeek * (days / 5)) * weeksWorked)
      };
    });
    
    // Compare to national average
    const nationalAverageCost = children.reduce((sum, child) => {
      const key = `${careType}${child.age.charAt(0).toUpperCase()}${child.age.slice(1)}` as keyof typeof NATIONAL_AVERAGES;
      return sum + (NATIONAL_AVERAGES[key] || 0);
    }, 0) * (daysPerWeek / 5);
    
    const costVsNational = ((totalAnnualChildcare - nationalAverageCost) / nationalAverageCost) * 100;
    
    return {
      totalAnnualChildcare,
      monthlyChildcare: totalAnnualChildcare / 12,
      grossAnnual,
      grossMonthly,
      fsaSavings,
      cdctcAmount,
      totalTaxBenefits,
      netAnnual,
      netMonthly,
      effectiveHourlyRate,
      breakEvenRate,
      worthWorking,
      scheduleComparisons,
      costVsNational,
      subsidyEligible: stateData.subsidyIncomeLimit > 0
    };
  }, [stateData, children, careType, hourlyWage, hoursPerWeek, daysPerWeek, useFSA]);
  
  // Add/remove children
  const addChild = () => {
    if (children.length < 4) {
      setChildren([...children, { id: Date.now().toString(), age: "preschool" }]);
    }
  };
  
  const removeChild = (id: string) => {
    if (children.length > 1) {
      setChildren(children.filter(c => c.id !== id));
    }
  };
  
  const updateChildAge = (id: string, age: ChildAgeCategory) => {
    setChildren(children.map(c => c.id === id ? { ...c, age } : c));
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <>
      <Helmet>
        <title>Childcare Break-Even Calculator | Is Working Worth It After Daycare Costs?</title>
        <meta 
          name="description" 
          content="Calculate if returning to work is financially worth it after childcare costs. Free calculator with 2026 state-by-state daycare costs, tax credit calculations, and flexible schedule comparisons." 
        />
        <link rel="canonical" href="https://flex-career-compass.lovable.app/career-hub/tools/childcare-calculator" />
        <meta property="og:title" content="Childcare Break-Even Calculator | Is Working Worth It?" />
        <meta property="og:description" content="Calculate your true take-home pay after childcare costs with our free calculator. Includes 2026 state data, tax credits, and flexible schedule scenarios." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Breadcrumbs 
            items={[
              { label: "Career Hub", href: "/career-hub" },
              { label: "Tools", href: "/career-hub/tools" },
              { label: "Childcare Calculator" }
            ]} 
          />

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <Baby className="h-5 w-5" />
              <span className="font-medium">Childcare Break-Even Calculator</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Is Working Worth It After Childcare Costs?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Calculate your true take-home pay after daycare expenses. See if returning to work makes financial sense, 
              and discover how flexible scheduling can maximize your net income.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    Enter Your Details
                  </CardTitle>
                  <CardDescription>
                    Add your children, work details, and location for personalized results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* State Selection */}
                  <div className="space-y-2">
                    <Label>Your State</Label>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortedStates.map(state => (
                          <SelectItem key={state.abbreviation} value={state.abbreviation}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Children Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Children Needing Care</Label>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={addChild}
                        disabled={children.length >= 4}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Child
                      </Button>
                    </div>
                    
                    {children.map((child, index) => (
                      <div key={child.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium text-muted-foreground w-16">
                          Child {index + 1}
                        </span>
                        <Select 
                          value={child.age} 
                          onValueChange={(value: ChildAgeCategory) => updateChildAge(child.id, value)}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(AGE_CATEGORIES).map(([key, { label, description }]) => (
                              <SelectItem key={key} value={key}>
                                {label} ({description})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {children.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeChild(child.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Care Type */}
                  <div className="space-y-3">
                    <Label>Childcare Type</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setCareType("center")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          careType === "center" 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Building2 className={`h-6 w-6 mx-auto mb-2 ${careType === "center" ? "text-primary" : "text-muted-foreground"}`} />
                        <div className="font-medium">{CARE_TYPES.center.label}</div>
                        <div className="text-xs text-muted-foreground">{CARE_TYPES.center.description}</div>
                      </button>
                      <button
                        onClick={() => setCareType("family")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          careType === "family" 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Home className={`h-6 w-6 mx-auto mb-2 ${careType === "family" ? "text-primary" : "text-muted-foreground"}`} />
                        <div className="font-medium">{CARE_TYPES.family.label}</div>
                        <div className="text-xs text-muted-foreground">{CARE_TYPES.family.description}</div>
                      </button>
                    </div>
                  </div>

                  {/* Work Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hourlyWage">Hourly Wage ($)</Label>
                      <Input
                        id="hourlyWage"
                        type="number"
                        min={7.25}
                        max={100}
                        step={0.5}
                        value={hourlyWage}
                        onChange={(e) => setHourlyWage(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hoursPerWeek">Hours Per Week</Label>
                      <Input
                        id="hoursPerWeek"
                        type="number"
                        min={10}
                        max={60}
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  {/* Days Per Week Slider */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Days Per Week Working</Label>
                      <span className="text-lg font-semibold text-primary">{daysPerWeek} days</span>
                    </div>
                    <Slider
                      value={[daysPerWeek]}
                      onValueChange={(v) => setDaysPerWeek(v[0])}
                      min={1}
                      max={5}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 day</span>
                      <span>5 days (full-time)</span>
                    </div>
                  </div>

                  {/* FSA Option */}
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">Use Dependent Care FSA?</div>
                      <div className="text-sm text-muted-foreground">
                        Pre-tax savings up to ${DCFSA_LIMIT.toLocaleString()}/year
                      </div>
                    </div>
                    <Button
                      variant={useFSA ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUseFSA(!useFSA)}
                    >
                      {useFSA ? "Yes" : "No"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Flexible Schedule Comparison */}
              {calculations && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Flexible Schedule Advantage
                    </CardTitle>
                    <CardDescription>
                      See how working fewer days can increase your net income per hour worked
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 font-medium">Schedule</th>
                            <th className="text-right py-3 font-medium">Childcare Cost</th>
                            <th className="text-right py-3 font-medium">Gross Income</th>
                            <th className="text-right py-3 font-medium">Net Income</th>
                            <th className="text-right py-3 font-medium">$/Hour Net</th>
                          </tr>
                        </thead>
                        <tbody>
                          {calculations.scheduleComparisons.map((row) => (
                            <tr 
                              key={row.days} 
                              className={`border-b ${row.days === daysPerWeek ? "bg-primary/5" : ""}`}
                            >
                              <td className="py-3">
                                {row.days} days/week
                                {row.days === daysPerWeek && (
                                  <Badge variant="secondary" className="ml-2 text-xs">Current</Badge>
                                )}
                              </td>
                              <td className="text-right py-3 text-muted-foreground">
                                {formatCurrency(row.childcare)}
                              </td>
                              <td className="text-right py-3">
                                {formatCurrency(row.gross)}
                              </td>
                              <td className={`text-right py-3 font-medium ${row.net >= 0 ? "text-green-600" : "text-red-600"}`}>
                                {formatCurrency(row.net)}
                              </td>
                              <td className={`text-right py-3 ${row.effectiveRate >= 0 ? "text-green-600" : "text-red-600"}`}>
                                {formatCurrency(row.effectiveRate)}/hr
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <Alert className="mt-4 bg-primary/5 border-primary/20">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      <AlertDescription className="text-sm">
                        <strong>Indeed Flex Insight:</strong> With Indeed Flex, you choose which days to work. 
                        Working 3 days instead of 5 could save you {formatCurrency(calculations.scheduleComparisons[0].childcare - calculations.scheduleComparisons[2].childcare)}/year in childcare!
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {calculations && (
                <>
                  {/* Main Result Card */}
                  <Card className={`border-2 ${calculations.worthWorking ? "border-green-500/50 bg-green-50/50 dark:bg-green-950/20" : "border-red-500/50 bg-red-50/50 dark:bg-red-950/20"}`}>
                    <CardContent className="pt-6">
                      <div className="text-center mb-6">
                        {calculations.worthWorking ? (
                          <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-2" />
                        ) : (
                          <XCircle className="h-12 w-12 text-red-600 mx-auto mb-2" />
                        )}
                        <h3 className="text-2xl font-bold">
                          {calculations.worthWorking ? "Yes, It's Worth Working!" : "Consider Part-Time"}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {calculations.worthWorking 
                            ? "You'll come out ahead after childcare costs"
                            : "Full-time may not cover your childcare costs"}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                          <span className="text-sm text-muted-foreground">Annual Net Income</span>
                          <span className={`text-xl font-bold ${calculations.netAnnual >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {formatCurrency(calculations.netAnnual)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                          <span className="text-sm text-muted-foreground">Monthly Net</span>
                          <span className={`font-semibold ${calculations.netMonthly >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {formatCurrency(calculations.netMonthly)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                          <span className="text-sm text-muted-foreground">Effective Hourly Rate</span>
                          <span className={`font-semibold ${calculations.effectiveHourlyRate >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {formatCurrency(calculations.effectiveHourlyRate)}/hr
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cost Breakdown */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Cost Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Gross Annual Income</span>
                        <span className="font-medium">{formatCurrency(calculations.grossAnnual)}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span className="text-sm">- Annual Childcare</span>
                        <span className="font-medium">-{formatCurrency(calculations.totalAnnualChildcare)}</span>
                      </div>
                      {calculations.cdctcAmount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span className="text-sm">+ Tax Credit (CDCTC)</span>
                          <span className="font-medium">+{formatCurrency(calculations.cdctcAmount)}</span>
                        </div>
                      )}
                      {calculations.fsaSavings > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span className="text-sm">+ FSA Tax Savings</span>
                          <span className="font-medium">+{formatCurrency(calculations.fsaSavings)}</span>
                        </div>
                      )}
                      <div className="border-t pt-3 flex justify-between font-bold">
                        <span>Net Annual Income</span>
                        <span className={calculations.netAnnual >= 0 ? "text-green-600" : "text-red-600"}>
                          {formatCurrency(calculations.netAnnual)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Break-Even Info */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Break-Even Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg text-center">
                        <div className="text-sm text-muted-foreground mb-1">
                          Minimum Hourly Wage to Break Even
                        </div>
                        <div className="text-3xl font-bold text-primary">
                          {formatCurrency(calculations.breakEvenRate)}/hr
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Just to cover childcare costs
                        </div>
                      </div>

                      {stateData && (
                        <div className="text-sm">
                          <div className="flex justify-between mb-2">
                            <span className="text-muted-foreground">Your State vs National Avg</span>
                            <span className={calculations.costVsNational > 0 ? "text-red-600" : "text-green-600"}>
                              {calculations.costVsNational > 0 ? "+" : ""}{calculations.costVsNational.toFixed(0)}%
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {stateData.name} childcare is {calculations.costVsNational > 0 ? "above" : "below"} the national average
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* State Subsidy Info */}
                  {stateData && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Info className="h-4 w-4 text-primary" />
                          {stateData.name} Assistance
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Subsidy Income Limit:</span>
                          <span className="ml-2 font-medium">{stateData.subsidyIncomeLimit}% of FPL</span>
                        </div>
                        <a
                          href={stateData.subsidyAgencyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                          {stateData.subsidyAgencyName}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        <p className="text-xs text-muted-foreground">
                          Check if you qualify for state childcare assistance
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8">
            <ToolDisclaimer
              type="calculator"
              customText="Childcare costs shown are 2024 state averages from Child Care Aware of America. Actual costs vary significantly by provider, location within state, care quality, and child's age. Tax credit calculations are estimates based on 2024 IRS guidelines. Consult a tax professional for personalized advice."
              sources={["Child Care Aware of America 2024", "IRS Publication 503", "State workforce agency data"]}
              lastUpdated="December 2024"
            />
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <FAQSection 
              faqs={faqs} 
              title="Frequently Asked Questions"
            />
          </div>

          {/* CTA Section */}
          <CTASection />
        </div>
      </Layout>
    </>
  );
};

export default ChildcareCalculator;
