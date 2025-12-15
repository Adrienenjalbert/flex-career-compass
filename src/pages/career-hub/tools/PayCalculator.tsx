import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Calculator, Info } from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";

// Simplified state tax rates for 2025
const stateTaxRates: Record<string, { rate: number; name: string }> = {
  TX: { rate: 0, name: "Texas" },
  TN: { rate: 0, name: "Tennessee" },
  GA: { rate: 0.055, name: "Georgia" },
  OH: { rate: 0.04, name: "Ohio" },
  CA: { rate: 0.093, name: "California" },
};

const federalTaxBrackets = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
];

const faqs = [
  {
    question: "How accurate is this pay calculator?",
    answer: "This calculator provides estimates based on 2025 federal and state tax rates. Actual take-home pay may vary based on deductions, credits, local taxes, and individual circumstances."
  },
  {
    question: "Does this include tips?",
    answer: "Yes, you can add your expected hourly tips to the calculation. Remember that tips are taxable income."
  },
  {
    question: "What about overtime pay?",
    answer: "This calculator assumes regular hourly pay. Overtime (time and a half) for hours over 40 per week is not automatically calculated but you can adjust your effective hourly rate."
  },
  {
    question: "Are FICA taxes included?",
    answer: "Yes, the calculator includes Social Security (6.2%) and Medicare (1.45%) taxes, totaling 7.65% of gross income."
  }
];

const PayCalculator = () => {
  const [hourlyRate, setHourlyRate] = useState<string>("15");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("40");
  const [tipsPerHour, setTipsPerHour] = useState<string>("0");
  const [state, setState] = useState<string>("TX");

  const calculations = useMemo(() => {
    const rate = parseFloat(hourlyRate) || 0;
    const hours = parseFloat(hoursPerWeek) || 0;
    const tips = parseFloat(tipsPerHour) || 0;
    
    const weeklyGross = (rate + tips) * hours;
    const monthlyGross = weeklyGross * 4.33;
    const yearlyGross = weeklyGross * 52;

    // FICA taxes (7.65%)
    const ficaRate = 0.0765;
    const yearlyFica = yearlyGross * ficaRate;

    // Federal tax calculation (simplified progressive)
    let yearlyFederalTax = 0;
    let remainingIncome = yearlyGross;
    for (const bracket of federalTaxBrackets) {
      if (remainingIncome <= 0) break;
      const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
      yearlyFederalTax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
    }

    // State tax
    const stateRate = stateTaxRates[state]?.rate || 0;
    const yearlyStateTax = yearlyGross * stateRate;

    // Total taxes
    const yearlyTotalTax = yearlyFica + yearlyFederalTax + yearlyStateTax;
    const yearlyNet = yearlyGross - yearlyTotalTax;
    const monthlyNet = yearlyNet / 12;
    const weeklyNet = yearlyNet / 52;

    const effectiveTaxRate = yearlyGross > 0 ? (yearlyTotalTax / yearlyGross) * 100 : 0;

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
    };
  }, [hourlyRate, hoursPerWeek, tipsPerHour, state]);

  return (
    <>
      <Helmet>
        <title>Hourly Pay Calculator | Indeed Flex Career Hub</title>
        <meta name="description" content="Calculate your weekly and monthly take-home pay after taxes. Free pay calculator for hourly workers in Texas, Georgia, Ohio, California, and Tennessee." />
        <link rel="canonical" href="https://indeedflex.com/career-hub/tools/pay-calculator" />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Pay Calculator" }
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
              Hourly Pay Calculator
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Calculate your weekly, monthly, and yearly take-home pay after federal and state taxes.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Enter Your Details</CardTitle>
                  <CardDescription>
                    Input your hourly rate, hours, and location to calculate take-home pay.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
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
                        placeholder="15.00"
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
                      placeholder="40"
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
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(stateTaxRates).map(([code, { name }]) => (
                          <SelectItem key={code} value={code}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Results Card */}
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">Your Take-Home Pay</CardTitle>
                  <CardDescription className="text-primary-foreground/70">
                    Estimated after federal and state taxes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary-foreground/10 rounded-lg p-4">
                      <div className="text-sm text-primary-foreground/70">Weekly (Net)</div>
                      <div className="text-2xl font-bold">${calculations.weeklyNet}</div>
                    </div>
                    <div className="bg-primary-foreground/10 rounded-lg p-4">
                      <div className="text-sm text-primary-foreground/70">Monthly (Net)</div>
                      <div className="text-2xl font-bold">${calculations.monthlyNet}</div>
                    </div>
                  </div>

                  <div className="bg-accent/20 rounded-lg p-4">
                    <div className="text-sm text-primary-foreground/70">Yearly Take-Home</div>
                    <div className="text-3xl font-bold text-accent">${calculations.yearlyNet}</div>
                  </div>

                  <div className="border-t border-primary-foreground/20 pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-foreground/70">Gross Yearly</span>
                      <span>${calculations.yearlyGross}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-foreground/70">FICA (SS + Medicare)</span>
                      <span>-${calculations.yearlyFica}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-foreground/70">Federal Tax</span>
                      <span>-${calculations.yearlyFederalTax}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-foreground/70">State Tax ({stateTaxRates[state]?.name})</span>
                      <span>-${calculations.yearlyStateTax}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-primary-foreground/20">
                      <span className="text-primary-foreground/70">Effective Tax Rate</span>
                      <span className="font-medium">{calculations.effectiveTaxRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Disclaimer */}
            <div className="max-w-4xl mx-auto mt-8">
              <div className="flex items-start gap-3 bg-secondary rounded-lg p-4">
                <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  This calculator provides estimates for educational purposes. Actual take-home pay may vary based on 
                  pre-tax deductions (401k, health insurance), tax credits, local taxes, and individual tax situations. 
                  Consult a tax professional for personalized advice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4 max-w-3xl">
            <FAQSection faqs={faqs} title="Calculator FAQs" />
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
