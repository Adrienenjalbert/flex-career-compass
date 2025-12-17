import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PiggyBank, DollarSign, Info, Calculator, CheckCircle, Calendar, AlertCircle, TrendingUp } from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";
import { 
  stateTaxData, 
  commonDeductions, 
  calculateFederalTax, 
  getSortedStates,
  getNoIncomeTaxStates,
  quarterlyDeadlines2025,
  type Deduction
} from "@/data/state-taxes";

const SELF_EMPLOYMENT_TAX_RATE = 0.153;
const FICA_RATE = 0.0765;

const faqs = [
  {
    question: "Do I need to pay quarterly estimated taxes?",
    answer: "If you expect to owe $1,000 or more in taxes for the year as a 1099 contractor or self-employed worker, the IRS requires quarterly estimated tax payments. Missing these can result in penalties."
  },
  {
    question: "What's the self-employment tax rate?",
    answer: "Self-employment tax is 15.3% of net self-employment income (12.4% for Social Security + 2.9% for Medicare). You can deduct half of this amount on your tax return, reducing your taxable income."
  },
  {
    question: "Can I work both W-2 and 1099 jobs?",
    answer: "Yes! Many flexible workers have a combination of W-2 employment and 1099 gig work. This calculator helps you estimate taxes for both income types combined."
  },
  {
    question: "What deductions can gig workers claim?",
    answer: "Common deductions include vehicle mileage (70¢/mile in 2025), phone expenses, work uniforms, tools and equipment, home office space, and professional services like tax preparation."
  },
  {
    question: "How do I track mileage for taxes?",
    answer: "Keep a log of work-related miles (not including regular commuting). Use apps or a simple spreadsheet to track date, destination, purpose, and miles. The 2025 IRS rate is 70 cents per mile."
  },
  {
    question: "What's the difference between W-2 and 1099 taxes?",
    answer: "W-2 employees have taxes withheld automatically and split FICA taxes with their employer. 1099 contractors must pay the full 15.3% self-employment tax and make quarterly estimated payments."
  }
];

const TaxCalculator = () => {
  // Income inputs
  const [w2Income, setW2Income] = useState<string>("0");
  const [_1099Income, set1099Income] = useState<string>("35000");
  const [state, setState] = useState<string>("TX");
  
  // Combined income mode
  const [hasBothIncomeTypes, setHasBothIncomeTypes] = useState(false);
  
  // Deductions
  const [milesPerYear, setMilesPerYear] = useState<string>("5000");
  const [selectedDeductions, setSelectedDeductions] = useState<string[]>(["mileage"]);
  const [customDeductionAmounts, setCustomDeductionAmounts] = useState<Record<string, string>>({});

  const sortedStates = useMemo(() => getSortedStates(), []);
  const noTaxStates = useMemo(() => getNoIncomeTaxStates(), []);

  // Get next quarterly deadline
  const nextDeadline = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    for (const deadline of quarterlyDeadlines2025) {
      const dueDate = new Date(deadline.dueDate);
      if (dueDate > today) {
        return deadline;
      }
    }
    return quarterlyDeadlines2025[0]; // Return Q1 if all passed
  }, []);

  const calculations = useMemo(() => {
    const w2 = parseFloat(w2Income) || 0;
    const _1099 = parseFloat(_1099Income) || 0;
    const totalIncome = hasBothIncomeTypes ? w2 + _1099 : _1099;
    const miles = parseFloat(milesPerYear) || 0;
    
    // Calculate deductions (only apply to 1099 income)
    let totalDeductions = 0;
    
    selectedDeductions.forEach(deductionId => {
      const deduction = commonDeductions.find(d => d.id === deductionId);
      if (!deduction) return;
      
      if (deduction.id === 'mileage') {
        totalDeductions += miles * 0.70; // 2025 rate
      } else if (deduction.calculationType === 'annual') {
        const customAmount = parseFloat(customDeductionAmounts[deductionId] || '');
        totalDeductions += isNaN(customAmount) ? deduction.defaultValue : customAmount;
      } else if (deduction.calculationType === 'monthly') {
        const customAmount = parseFloat(customDeductionAmounts[deductionId] || '');
        const monthlyValue = isNaN(customAmount) ? deduction.defaultValue : customAmount;
        totalDeductions += monthlyValue * 12;
      }
    });

    // 1099 taxable income after deductions
    const _1099TaxableIncome = Math.max(0, _1099 - totalDeductions);
    
    // Self-employment tax (only on 1099 income)
    const selfEmploymentTax = _1099TaxableIncome * SELF_EMPLOYMENT_TAX_RATE;
    const selfEmploymentDeduction = selfEmploymentTax / 2; // Half is deductible
    
    // W-2 FICA (if applicable)
    const w2Fica = hasBothIncomeTypes ? w2 * FICA_RATE : 0;
    
    // Combined federal taxable income
    const federalTaxableIncome = (hasBothIncomeTypes ? w2 : 0) + _1099TaxableIncome - selfEmploymentDeduction;
    const federalTax = calculateFederalTax(Math.max(0, federalTaxableIncome));
    
    // State tax
    const stateInfo = stateTaxData[state];
    const stateRate = stateInfo?.incomeTaxRate || 0;
    const stateTax = totalIncome * stateRate;
    
    // Total taxes
    const totalTax = selfEmploymentTax + w2Fica + federalTax + stateTax;
    const quarterlyPayment = totalTax / 4;
    const monthlySetAside = totalTax / 12;
    
    const effectiveRate = totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0;
    
    // Calculate savings from deductions
    const savingsFromDeductions = totalDeductions > 0 
      ? totalDeductions * (stateRate + 0.22) // Approximate marginal rate savings
      : 0;

    // What percentage to set aside
    const setAsidePercentage = totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0;

    return {
      totalIncome: totalIncome.toFixed(0),
      totalDeductions: totalDeductions.toFixed(0),
      _1099TaxableIncome: _1099TaxableIncome.toFixed(0),
      selfEmploymentTax: selfEmploymentTax.toFixed(0),
      w2Fica: w2Fica.toFixed(0),
      federalTax: federalTax.toFixed(0),
      stateTax: stateTax.toFixed(0),
      totalTax: totalTax.toFixed(0),
      quarterlyPayment: quarterlyPayment.toFixed(0),
      monthlySetAside: monthlySetAside.toFixed(0),
      effectiveRate: effectiveRate.toFixed(1),
      savingsFromDeductions: savingsFromDeductions.toFixed(0),
      setAsidePercentage: setAsidePercentage.toFixed(0),
      isNoTaxState: noTaxStates.includes(state),
    };
  }, [w2Income, _1099Income, state, hasBothIncomeTypes, milesPerYear, selectedDeductions, customDeductionAmounts, noTaxStates]);

  const toggleDeduction = (id: string) => {
    setSelectedDeductions(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const stateInfo = stateTaxData[state];

  // Group deductions by category
  const groupedDeductions = useMemo(() => {
    const groups: Record<string, Deduction[]> = {
      vehicle: [],
      equipment: [],
      business: [],
      home: [],
    };
    commonDeductions.forEach(d => {
      groups[d.category].push(d);
    });
    return groups;
  }, []);

  return (
    <>
      <Helmet>
        <title>1099 & Quarterly Tax Calculator 2025 | Indeed Flex Career Hub</title>
        <meta name="description" content="Estimate your self-employment taxes and quarterly payments. Free tax calculator for gig workers with W-2 + 1099 combined income, deductions tracker, and deadline reminders." />
        <link rel="canonical" href="https://indeedflex.com/career-hub/tools/tax-calculator" />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Tax Calculator" }
          ]} />
        </div>

        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/20 rounded-full">
                <PiggyBank className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              1099 & Quarterly Tax Estimator
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Estimate your self-employment taxes, track deductions, and know exactly what to set aside for quarterly payments.
            </p>
          </div>
        </section>

        {/* Quarterly Deadline Alert */}
        <section className="bg-accent/10 border-y border-accent/20">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-accent" />
                <span className="font-medium">Next Quarterly Tax Deadline:</span>
                <Badge variant="outline" className="bg-accent/10 border-accent">
                  {nextDeadline.dueDate}
                </Badge>
                <span className="text-muted-foreground text-sm">
                  for {nextDeadline.period} income
                </span>
              </div>
              <div className="flex gap-2">
                {quarterlyDeadlines2025.map((deadline, i) => (
                  <Badge 
                    key={deadline.quarter}
                    variant={deadline === nextDeadline ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {deadline.quarter}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Input Section */}
              <div className="lg:col-span-3 space-y-6">
                {/* Income Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Income Details
                    </CardTitle>
                    <CardDescription>Enter your annual earnings from all sources</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Combined income toggle */}
                    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                      <div>
                        <Label className="text-base">Do you have both W-2 and 1099 income?</Label>
                        <p className="text-sm text-muted-foreground">
                          Many flexible workers have income from multiple sources
                        </p>
                      </div>
                      <Switch
                        checked={hasBothIncomeTypes}
                        onCheckedChange={setHasBothIncomeTypes}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {hasBothIncomeTypes && (
                        <div className="space-y-2">
                          <Label htmlFor="w2Income">W-2 Income (Annual)</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="w2Income"
                              type="number"
                              min="0"
                              value={w2Income}
                              onChange={(e) => setW2Income(e.target.value)}
                              className="pl-9"
                              placeholder="0"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">Employer withholds taxes</p>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="_1099Income">1099 / Self-Employment Income (Annual)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="_1099Income"
                            type="number"
                            min="0"
                            value={_1099Income}
                            onChange={(e) => set1099Income(e.target.value)}
                            className="pl-9"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Gig work, freelance, contractor</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select value={state} onValueChange={setState}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            {sortedStates.map(({ code, name }) => (
                              <SelectItem key={code} value={code}>
                                {name} {noTaxStates.includes(code) && '(No income tax)'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {stateInfo && (
                          <p className="text-xs text-muted-foreground">
                            {stateInfo.hasNoIncomeTax 
                              ? '✓ No state income tax!' 
                              : `State tax rate: ${(stateInfo.incomeTaxRate * 100).toFixed(2)}%`}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Deductions Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Tax Deductions
                    </CardTitle>
                    <CardDescription>
                      Select deductions that apply to your 1099 work to reduce taxable income
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Mileage - special handling */}
                    {selectedDeductions.includes("mileage") && (
                      <div className="space-y-2 pb-4 border-b">
                        <Label htmlFor="miles">Work Miles Per Year</Label>
                        <Input
                          id="miles"
                          type="number"
                          min="0"
                          value={milesPerYear}
                          onChange={(e) => setMilesPerYear(e.target.value)}
                          placeholder="5000"
                        />
                        <p className="text-xs text-muted-foreground">
                          Track miles driven for work (not regular commuting). 2025 IRS rate: <strong>$0.70/mile</strong>
                        </p>
                        <div className="text-sm font-medium text-accent">
                          = ${(parseFloat(milesPerYear || '0') * 0.70).toLocaleString()} deduction
                        </div>
                      </div>
                    )}

                    <Tabs defaultValue="vehicle" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="vehicle">🚗 Vehicle</TabsTrigger>
                        <TabsTrigger value="equipment">🔧 Equipment</TabsTrigger>
                        <TabsTrigger value="business">💼 Business</TabsTrigger>
                        <TabsTrigger value="home">🏠 Home</TabsTrigger>
                      </TabsList>

                      {Object.entries(groupedDeductions).map(([category, deductions]) => (
                        <TabsContent key={category} value={category} className="mt-4 space-y-3">
                          {deductions.map((deduction) => (
                            <div key={deduction.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                              <Checkbox 
                                id={deduction.id}
                                checked={selectedDeductions.includes(deduction.id)}
                                onCheckedChange={() => toggleDeduction(deduction.id)}
                              />
                              <div className="flex-1">
                                <Label htmlFor={deduction.id} className="text-sm font-medium cursor-pointer">
                                  {deduction.label}
                                </Label>
                                <p className="text-xs text-muted-foreground">{deduction.description}</p>
                                
                                {/* Show input for customizable deductions when selected */}
                                {selectedDeductions.includes(deduction.id) && 
                                 deduction.id !== 'mileage' && 
                                 (deduction.calculationType === 'annual' || deduction.calculationType === 'monthly') && (
                                  <div className="mt-2 flex items-center gap-2">
                                    <div className="relative w-32">
                                      <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                                      <Input
                                        type="number"
                                        min="0"
                                        value={customDeductionAmounts[deduction.id] || ''}
                                        onChange={(e) => setCustomDeductionAmounts(prev => ({
                                          ...prev,
                                          [deduction.id]: e.target.value
                                        }))}
                                        placeholder={deduction.defaultValue.toString()}
                                        className="pl-6 h-8 text-sm"
                                      />
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      {deduction.calculationType === 'monthly' ? '/month' : '/year'}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </TabsContent>
                      ))}
                    </Tabs>

                    {parseInt(calculations.totalDeductions) > 0 && (
                      <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Total Deductions:</span>
                          <span className="text-lg font-bold text-accent">
                            ${parseInt(calculations.totalDeductions).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Estimated tax savings: ~${parseInt(calculations.savingsFromDeductions).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quarterly Deadlines Card - Moved to left column */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      2025 Quarterly Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {quarterlyDeadlines2025.map((deadline) => (
                        <div 
                          key={deadline.quarter}
                          className={`flex items-center justify-between p-2 rounded-lg ${
                            deadline === nextDeadline 
                              ? 'bg-accent/10 border border-accent/20' 
                              : ''
                          }`}
                        >
                          <div>
                            <span className="font-medium">{deadline.quarter}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {deadline.period}
                            </span>
                          </div>
                          <span className={`text-sm ${
                            deadline === nextDeadline ? 'font-medium text-accent' : 'text-muted-foreground'
                          }`}>
                            {deadline.dueDate.replace(', 2025', '').replace(', 2026', ' \'26')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Pro Tips - Moved to left column */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">💡 Tax Tips for Gig Workers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Open a separate savings account for taxes</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Track ALL work miles—they add up fast!</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Keep receipts for work-related purchases</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Consider a SEP-IRA for additional deductions</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results Section - Only sticky card */}
              <div className="lg:col-span-2">
                <Card className="bg-primary text-primary-foreground sticky top-20">
                  <CardHeader>
                    <CardTitle className="text-primary-foreground">Tax Estimate 2025</CardTitle>
                    <CardDescription className="text-primary-foreground/70">
                      Based on your income and deductions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Quarterly Payment - Hero */}
                    <div className="bg-accent/20 rounded-lg p-4 text-center">
                      <div className="text-sm text-primary-foreground/70 mb-1">Quarterly Payment Due</div>
                      <div className="text-4xl font-bold text-accent">${parseInt(calculations.quarterlyPayment).toLocaleString()}</div>
                      <div className="text-sm text-primary-foreground/70 mt-1">
                        Next due: {nextDeadline.dueDate}
                      </div>
                    </div>

                    {/* Set aside guidance */}
                    <div className="bg-primary-foreground/10 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-medium">Set Aside Each Month</span>
                      </div>
                      <div className="text-2xl font-bold">${parseInt(calculations.monthlySetAside).toLocaleString()}</div>
                      <p className="text-sm text-primary-foreground/70 mt-1">
                        (~{calculations.setAsidePercentage}% of gross income)
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/70">Total Income</span>
                        <span>${parseInt(calculations.totalIncome).toLocaleString()}</span>
                      </div>
                      {parseInt(calculations.totalDeductions) > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-primary-foreground/70">Deductions</span>
                          <span className="text-accent">-${parseInt(calculations.totalDeductions).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm pt-2 border-t border-primary-foreground/20">
                        <span className="text-primary-foreground/70">Taxable Income</span>
                        <span>${parseInt(calculations._1099TaxableIncome).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-primary-foreground/20">
                      {hasBothIncomeTypes && parseInt(calculations.w2Fica) > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-primary-foreground/70">W-2 FICA</span>
                          <span>${parseInt(calculations.w2Fica).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/70">Self-Employment Tax</span>
                        <span>${parseInt(calculations.selfEmploymentTax).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/70">Federal Tax</span>
                        <span>${parseInt(calculations.federalTax).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/70">
                          State Tax ({stateInfo?.name})
                        </span>
                        <span>
                          {calculations.isNoTaxState 
                            ? <span className="text-accent">$0</span>
                            : `$${parseInt(calculations.stateTax).toLocaleString()}`
                          }
                        </span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t border-primary-foreground/20">
                        <span className="font-medium">Total Annual Tax</span>
                        <span className="font-bold">${parseInt(calculations.totalTax).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/70">Effective Tax Rate</span>
                        <span>{calculations.effectiveRate}%</span>
                      </div>
                    </div>

                    {parseInt(calculations.savingsFromDeductions) > 0 && (
                      <div className="bg-success/20 rounded-lg p-3 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="text-sm">
                          Saving ~<strong>${parseInt(calculations.savingsFromDeductions).toLocaleString()}</strong> with deductions!
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="max-w-6xl mx-auto mt-8">
              <ToolDisclaimer 
                type="calculator"
                sources={["IRS Self-Employment Tax Guidelines", "Tax Foundation State Tax Rates", "IRS 2025 Quarterly Due Dates"]}
                lastUpdated="December 2024"
                customText="This calculator provides estimates for educational purposes only. Tax situations vary based on filing status, dependents, other income sources, credits, and deductions not included here. Self-employment tax rates and brackets are simplified. Consult a qualified tax professional for personalized advice."
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4 max-w-3xl">
            <FAQSection faqs={faqs} title="Tax FAQs for Gig Workers" />
          </div>
        </section>

        <CTASection 
          title="Maximize Your Earnings"
          subtitle="Find flexible shifts and keep more of what you earn with Indeed Flex."
        />
      </Layout>
    </>
  );
};

export default TaxCalculator;
