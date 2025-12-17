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
import { DollarSign, Calculator, Info, Moon, Calendar, Briefcase, TrendingUp } from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import { 
  stateTaxData, 
  roleTemplates, 
  shiftDifferentials, 
  calculateFederalTax, 
  getSortedStates,
  getNoIncomeTaxStates,
  type RoleTemplate 
} from "@/data/state-taxes";

const FICA_RATE = 0.0765; // Social Security 6.2% + Medicare 1.45%
const SELF_EMPLOYMENT_TAX_RATE = 0.153; // 15.3% for 1099 workers

const faqs = [
  {
    question: "How accurate is this pay calculator?",
    answer: "This calculator provides estimates based on 2025 federal and state tax rates. Actual take-home pay may vary based on deductions, credits, local taxes, and individual circumstances."
  },
  {
    question: "What's the difference between W-2 and 1099 income?",
    answer: "W-2 employees have taxes withheld by their employer and split FICA taxes (7.65% each). 1099 contractors pay the full 15.3% self-employment tax themselves and must make quarterly estimated payments."
  },
  {
    question: "How do shift differentials work?",
    answer: "Many employers pay extra for less desirable shifts. Night shifts typically pay $1-3 more per hour, weekends may add $1-2/hour, and holidays often pay time-and-a-half (1.5x your regular rate)."
  },
  {
    question: "Are tips included in the calculation?",
    answer: "Yes, you can add your expected hourly tips. Remember that all tips are taxable income. The calculator includes them in your gross pay and tax calculations."
  },
  {
    question: "What about overtime pay?",
    answer: "This calculator shows regular hours. For overtime (over 40 hrs/week federally, or over 8 hrs/day in California), you'd earn 1.5x your rate. Double-time applies for some situations."
  },
  {
    question: "Which states have no income tax?",
    answer: "Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming have no state income tax, meaning more take-home pay."
  }
];

const PayCalculator = () => {
  // Basic inputs
  const [hourlyRate, setHourlyRate] = useState<string>("17");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("40");
  const [tipsPerHour, setTipsPerHour] = useState<string>("0");
  const [state, setState] = useState<string>("TX");
  
  // Employment type
  const [employmentType, setEmploymentType] = useState<'w2' | '1099'>('w2');
  
  // Shift differentials
  const [nightShiftHours, setNightShiftHours] = useState<string>("0");
  const [weekendHours, setWeekendHours] = useState<string>("0");
  const [includeHolidayPay, setIncludeHolidayPay] = useState(false);
  
  // Role template
  const [selectedRole, setSelectedRole] = useState<string>("");

  const sortedStates = useMemo(() => getSortedStates(), []);
  const noTaxStates = useMemo(() => getNoIncomeTaxStates(), []);

  // Apply role template
  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    const role = roleTemplates.find(r => r.id === roleId);
    if (role) {
      setHourlyRate(role.defaultHourlyRate.toString());
      setHoursPerWeek(role.typicalHoursPerWeek.toString());
      if (role.hasTips && role.avgTipsPerHour) {
        setTipsPerHour(role.avgTipsPerHour.toString());
      } else {
        setTipsPerHour("0");
      }
      if (role.hasNightShift) {
        setNightShiftHours("8");
      }
      if (role.hasWeekendPremium) {
        setWeekendHours("8");
      }
    }
  };

  const calculations = useMemo(() => {
    const rate = parseFloat(hourlyRate) || 0;
    const hours = parseFloat(hoursPerWeek) || 0;
    const tips = parseFloat(tipsPerHour) || 0;
    const nightHours = parseFloat(nightShiftHours) || 0;
    const weekendHrs = parseFloat(weekendHours) || 0;
    
    // Calculate shift differential pay
    const nightDiff = shiftDifferentials.find(d => d.id === 'night');
    const weekendDiff = shiftDifferentials.find(d => d.id === 'weekend');
    
    const nightPremium = nightHours * (nightDiff?.premiumAmount || 1.50);
    const weekendPremium = weekendHrs * (weekendDiff?.premiumAmount || 2.00);
    const weeklyDifferentials = nightPremium + weekendPremium;
    
    // Holiday pay (assume 1 shift per month = ~2.3 hours/week average)
    const holidayPremium = includeHolidayPay ? (rate * 0.5 * 2.3) : 0;
    
    // Weekly calculations
    const baseWeeklyPay = rate * hours;
    const weeklyTips = tips * hours;
    const weeklyGross = baseWeeklyPay + weeklyTips + weeklyDifferentials + holidayPremium;
    const monthlyGross = weeklyGross * 4.33;
    const yearlyGross = weeklyGross * 52;

    // Tax calculations based on employment type
    let yearlyFica = 0;
    let selfEmploymentTax = 0;
    
    if (employmentType === 'w2') {
      // W-2: Employee pays 7.65% FICA
      yearlyFica = yearlyGross * FICA_RATE;
    } else {
      // 1099: Self-employed pays full 15.3% self-employment tax
      selfEmploymentTax = yearlyGross * SELF_EMPLOYMENT_TAX_RATE;
      // SE tax deduction (half of SE tax is deductible)
      yearlyFica = selfEmploymentTax; // Show as FICA equivalent for display
    }

    // Federal tax (after SE tax deduction for 1099)
    const seDeduction = employmentType === '1099' ? selfEmploymentTax / 2 : 0;
    const federalTaxableIncome = Math.max(0, yearlyGross - seDeduction);
    const yearlyFederalTax = calculateFederalTax(federalTaxableIncome);

    // State tax
    const stateInfo = stateTaxData[state];
    const stateRate = stateInfo?.incomeTaxRate || 0;
    const yearlyStateTax = yearlyGross * stateRate;

    // Total taxes
    const yearlyTotalTax = yearlyFica + yearlyFederalTax + yearlyStateTax;
    const yearlyNet = yearlyGross - yearlyTotalTax;
    const monthlyNet = yearlyNet / 12;
    const weeklyNet = yearlyNet / 52;

    const effectiveTaxRate = yearlyGross > 0 ? (yearlyTotalTax / yearlyGross) * 100 : 0;
    const effectiveHourlyRate = hours > 0 ? weeklyNet / hours : 0;

    // Compare W-2 vs 1099
    let w2Comparison = null;
    if (employmentType === '1099') {
      const w2Fica = yearlyGross * FICA_RATE;
      const w2FederalTax = calculateFederalTax(yearlyGross);
      const w2TotalTax = w2Fica + w2FederalTax + yearlyStateTax;
      const w2Net = yearlyGross - w2TotalTax;
      w2Comparison = {
        yearlyNet: w2Net.toFixed(2),
        difference: (w2Net - yearlyNet).toFixed(2),
      };
    } else {
      const _1099SE = yearlyGross * SELF_EMPLOYMENT_TAX_RATE;
      const _1099Deduction = _1099SE / 2;
      const _1099FederalTax = calculateFederalTax(yearlyGross - _1099Deduction);
      const _1099TotalTax = _1099SE + _1099FederalTax + yearlyStateTax;
      const _1099Net = yearlyGross - _1099TotalTax;
      w2Comparison = {
        yearlyNet: _1099Net.toFixed(2),
        difference: (yearlyNet - _1099Net).toFixed(2),
      };
    }

    return {
      weeklyGross: weeklyGross.toFixed(2),
      monthlyGross: monthlyGross.toFixed(2),
      yearlyGross: yearlyGross.toFixed(2),
      weeklyNet: weeklyNet.toFixed(2),
      monthlyNet: monthlyNet.toFixed(2),
      yearlyNet: yearlyNet.toFixed(2),
      yearlyFica: yearlyFica.toFixed(2),
      yearlyFederalTax: yearlyFederalTax.toFixed(2),
      yearlyStateTax: yearlyStateTax.toFixed(2),
      effectiveTaxRate: effectiveTaxRate.toFixed(1),
      effectiveHourlyRate: effectiveHourlyRate.toFixed(2),
      weeklyDifferentials: weeklyDifferentials.toFixed(2),
      w2Comparison,
      isNoTaxState: noTaxStates.includes(state),
    };
  }, [hourlyRate, hoursPerWeek, tipsPerHour, state, employmentType, nightShiftHours, weekendHours, includeHolidayPay, noTaxStates]);

  const selectedRoleData = roleTemplates.find(r => r.id === selectedRole);
  const stateInfo = stateTaxData[state];

  return (
    <>
      <Helmet>
        <title>State-by-State Paycheck Calculator 2025 | Indeed Flex Career Hub</title>
        <meta name="description" content="Calculate your take-home pay in all 50 states. Free paycheck calculator for hourly workers with W-2 vs 1099 comparison, shift differentials, and role templates." />
        <link rel="canonical" href="https://indeedflex.com/career-hub/tools/pay-calculator" />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Paycheck Calculator" }
          ]} />
        </div>

        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/20 rounded-full">
                <Calculator className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              State-by-State Paycheck Calculator
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Calculate your take-home pay in all 50 states. Compare W-2 vs 1099, add shift differentials, and see your true earnings.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Input Section */}
              <div className="lg:col-span-3 space-y-6">
                {/* Role Templates */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Quick Start: Select Your Role
                    </CardTitle>
                    <CardDescription>
                      Choose a role to auto-fill typical pay rates and hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="industrial" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="industrial">Industrial</TabsTrigger>
                        <TabsTrigger value="hospitality">Hospitality</TabsTrigger>
                        <TabsTrigger value="retail">Retail</TabsTrigger>
                        <TabsTrigger value="facilities">Facilities</TabsTrigger>
                      </TabsList>
                      {(['industrial', 'hospitality', 'retail', 'facilities'] as const).map(category => (
                        <TabsContent key={category} value={category} className="mt-4">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {roleTemplates
                              .filter(r => r.category === category)
                              .map(role => (
                                <button
                                  key={role.id}
                                  onClick={() => handleRoleSelect(role.id)}
                                  className={`p-3 rounded-lg border text-left transition-all hover:border-primary ${
                                    selectedRole === role.id 
                                      ? 'border-primary bg-primary/5' 
                                      : 'border-border'
                                  }`}
                                >
                                  <div className="font-medium text-sm">{role.name}</div>
                                  <div className="text-xs text-muted-foreground">${role.minRate}-${role.maxRate}/hr</div>
                                  {role.hasTips && (
                                    <Badge variant="secondary" className="mt-1 text-xs">+ Tips</Badge>
                                  )}
                                </button>
                              ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                    {selectedRoleData && (
                      <div className="mt-4 p-3 bg-secondary rounded-lg text-sm text-muted-foreground">
                        <strong>{selectedRoleData.name}:</strong> {selectedRoleData.description}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Pay Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pay Details</CardTitle>
                    <CardDescription>Enter your hourly rate and hours</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hourlyRate">Base Hourly Rate ($)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="hourlyRate"
                            type="number"
                            min="0"
                            step="0.25"
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(e.target.value)}
                            className="pl-9"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hoursPerWeek">Hours Per Week</Label>
                        <Input
                          id="hoursPerWeek"
                          type="number"
                          min="0"
                          max="80"
                          value={hoursPerWeek}
                          onChange={(e) => setHoursPerWeek(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tipsPerHour">Average Tips Per Hour ($)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="tipsPerHour"
                            type="number"
                            min="0"
                            step="0.50"
                            value={tipsPerHour}
                            onChange={(e) => setTipsPerHour(e.target.value)}
                            className="pl-9"
                          />
                        </div>
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
                            Min wage: ${stateInfo.minWage}/hr • 
                            {stateInfo.hasNoIncomeTax ? ' No state income tax' : ` State tax: ${(stateInfo.incomeTaxRate * 100).toFixed(1)}%`}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Employment Type Toggle */}
                    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                      <div>
                        <Label className="text-base">Employment Type</Label>
                        <p className="text-sm text-muted-foreground">
                          {employmentType === 'w2' 
                            ? 'Employer withholds taxes (7.65% FICA)' 
                            : 'Self-employed (15.3% SE tax)'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={employmentType === 'w2' ? 'font-medium' : 'text-muted-foreground'}>W-2</span>
                        <Switch
                          checked={employmentType === '1099'}
                          onCheckedChange={(checked) => setEmploymentType(checked ? '1099' : 'w2')}
                        />
                        <span className={employmentType === '1099' ? 'font-medium' : 'text-muted-foreground'}>1099</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shift Differentials */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Moon className="h-5 w-5" />
                      Shift Differentials
                    </CardTitle>
                    <CardDescription>
                      Add premium pay for nights, weekends, and holidays
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nightShiftHours">Night Shift Hours/Week (+$1.50/hr)</Label>
                        <Input
                          id="nightShiftHours"
                          type="number"
                          min="0"
                          max="40"
                          value={nightShiftHours}
                          onChange={(e) => setNightShiftHours(e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weekendHours">Weekend Hours/Week (+$2.00/hr)</Label>
                        <Input
                          id="weekendHours"
                          type="number"
                          min="0"
                          max="32"
                          value={weekendHours}
                          onChange={(e) => setWeekendHours(e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="holidayPay"
                        checked={includeHolidayPay}
                        onCheckedChange={setIncludeHolidayPay}
                      />
                      <Label htmlFor="holidayPay">Include holiday pay (avg 1 shift/month at 1.5x)</Label>
                    </div>

                    {parseFloat(calculations.weeklyDifferentials) > 0 && (
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <div className="text-sm font-medium text-accent">
                          +${calculations.weeklyDifferentials}/week from shift differentials
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Results Section */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-primary text-primary-foreground sticky top-20">
                  <CardHeader>
                    <CardTitle className="text-primary-foreground">Your Take-Home Pay</CardTitle>
                    <CardDescription className="text-primary-foreground/70">
                      Estimated after {employmentType === 'w2' ? 'federal & state' : 'self-employment'} taxes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-primary-foreground/10 rounded-lg p-4">
                        <div className="text-sm text-primary-foreground/70">Weekly Net</div>
                        <div className="text-2xl font-bold">${calculations.weeklyNet}</div>
                      </div>
                      <div className="bg-primary-foreground/10 rounded-lg p-4">
                        <div className="text-sm text-primary-foreground/70">Monthly Net</div>
                        <div className="text-2xl font-bold">${calculations.monthlyNet}</div>
                      </div>
                    </div>

                    <div className="bg-accent/20 rounded-lg p-4">
                      <div className="text-sm text-primary-foreground/70">Yearly Take-Home</div>
                      <div className="text-3xl font-bold text-accent">${calculations.yearlyNet}</div>
                      <div className="text-sm text-primary-foreground/70 mt-1">
                        Effective hourly: ${calculations.effectiveHourlyRate}/hr after taxes
                      </div>
                    </div>

                    <div className="border-t border-primary-foreground/20 pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/70">Gross Yearly</span>
                        <span>${parseFloat(calculations.yearlyGross).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/70">
                          {employmentType === 'w2' ? 'FICA (SS + Medicare)' : 'Self-Employment Tax'}
                        </span>
                        <span>-${parseFloat(calculations.yearlyFica).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/70">Federal Tax</span>
                        <span>-${parseFloat(calculations.yearlyFederalTax).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/70">
                          State Tax ({stateTaxData[state]?.name})
                          {calculations.isNoTaxState && ' ✓'}
                        </span>
                        <span>
                          {calculations.isNoTaxState 
                            ? <span className="text-accent">$0 (No state tax!)</span>
                            : `-$${parseFloat(calculations.yearlyStateTax).toLocaleString()}`
                          }
                        </span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t border-primary-foreground/20">
                        <span className="text-primary-foreground/70">Effective Tax Rate</span>
                        <span className="font-medium">{calculations.effectiveTaxRate}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* W-2 vs 1099 Comparison */}
                {calculations.w2Comparison && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        {employmentType === 'w2' ? '1099' : 'W-2'} Comparison
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            As {employmentType === 'w2' ? '1099 contractor' : 'W-2 employee'}:
                          </span>
                          <span>${parseFloat(calculations.w2Comparison.yearlyNet).toLocaleString()}/yr</span>
                        </div>
                        <div className={`flex justify-between text-sm font-medium ${
                          parseFloat(calculations.w2Comparison.difference) > 0 
                            ? 'text-success' 
                            : 'text-destructive'
                        }`}>
                          <span>Difference:</span>
                          <span>
                            {parseFloat(calculations.w2Comparison.difference) > 0 ? '+' : ''}
                            ${parseFloat(calculations.w2Comparison.difference).toLocaleString()}/yr
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {employmentType === 'w2' 
                            ? 'As 1099, you pay more in taxes but may have more deductions available.'
                            : 'As W-2, employer pays half of FICA, resulting in lower tax burden.'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* State Info Card */}
                {stateInfo && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {stateInfo.name} Quick Facts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Minimum Wage</span>
                        <span>${stateInfo.minWage}/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">State Income Tax</span>
                        <span>{stateInfo.hasNoIncomeTax ? 'None' : `${(stateInfo.incomeTaxRate * 100).toFixed(2)}%`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Overtime Rules</span>
                        <span>{stateInfo.overtimeRules === 'daily' ? 'Daily (8+ hrs)' : 'Weekly (40+ hrs)'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Max Unemployment</span>
                        <span>${stateInfo.unemploymentMaxWeekly}/wk</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="max-w-6xl mx-auto mt-8">
              <div className="flex items-start gap-3 bg-secondary rounded-lg p-4">
                <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  This calculator provides estimates for educational purposes. Actual take-home pay may vary based on 
                  pre-tax deductions (401k, health insurance), tax credits, local taxes, filing status, and individual circumstances. 
                  Tax rates are simplified averages for 2025. Consult a tax professional for personalized advice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4 max-w-3xl">
            <FAQSection faqs={faqs} title="Paycheck Calculator FAQs" />
          </div>
        </section>

        <CTASection 
          title="Start Earning Today"
          subtitle="Find flexible shifts that match your income goals with Indeed Flex."
        />
      </Layout>
    </>
  );
};

export default PayCalculator;
