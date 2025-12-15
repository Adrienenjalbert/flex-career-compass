import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { PiggyBank, DollarSign, Info, Calculator, CheckCircle } from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";

const stateTaxRates: Record<string, { rate: number; name: string }> = {
  TX: { rate: 0, name: "Texas" },
  TN: { rate: 0, name: "Tennessee" },
  GA: { rate: 0.055, name: "Georgia" },
  OH: { rate: 0.04, name: "Ohio" },
  CA: { rate: 0.093, name: "California" },
};

const commonDeductions = [
  { id: "mileage", label: "Vehicle Mileage", description: "67¢ per mile (2024)", perMile: 0.67 },
  { id: "phone", label: "Phone Bill (work %)", description: "Business portion deductible", monthly: 50 },
  { id: "uniform", label: "Work Uniforms", description: "Required work clothing", annual: 200 },
  { id: "tools", label: "Tools & Equipment", description: "Work-related purchases", annual: 150 },
  { id: "meals", label: "Work Meals", description: "50% of business meals", annual: 300 },
];

const faqs = [
  {
    question: "Do I need to pay quarterly taxes?",
    answer: "If you expect to owe $1,000 or more in taxes for the year, the IRS requires quarterly estimated tax payments. This is common for gig workers and independent contractors."
  },
  {
    question: "What's the self-employment tax rate?",
    answer: "Self-employment tax is 15.3% of net self-employment income (12.4% for Social Security + 2.9% for Medicare). You can deduct half of this on your tax return."
  },
  {
    question: "What deductions can gig workers claim?",
    answer: "Common deductions include vehicle mileage, phone expenses, work uniforms, tools, and a portion of home office expenses if applicable."
  },
  {
    question: "Should I keep receipts?",
    answer: "Yes! Keep receipts for all work-related expenses. Use apps to track mileage and photograph receipts for easy record-keeping."
  }
];

const TaxCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState<string>("35000");
  const [state, setState] = useState<string>("TX");
  const [isW2, setIsW2] = useState<boolean>(false);
  const [milesPerYear, setMilesPerYear] = useState<string>("5000");
  const [selectedDeductions, setSelectedDeductions] = useState<string[]>(["mileage"]);

  const calculations = useMemo(() => {
    const income = parseFloat(annualIncome) || 0;
    const miles = parseFloat(milesPerYear) || 0;
    
    // Calculate deductions
    let totalDeductions = 0;
    if (selectedDeductions.includes("mileage")) {
      totalDeductions += miles * 0.67;
    }
    commonDeductions.forEach(d => {
      if (selectedDeductions.includes(d.id) && d.id !== "mileage") {
        totalDeductions += d.annual || (d.monthly ? d.monthly * 12 : 0);
      }
    });

    const taxableIncome = Math.max(0, income - totalDeductions);
    
    // Self-employment tax (only for 1099)
    const selfEmploymentTax = isW2 ? 0 : taxableIncome * 0.153;
    const selfEmploymentDeduction = selfEmploymentTax / 2;
    
    // Federal tax (simplified progressive)
    const federalTaxableIncome = taxableIncome - selfEmploymentDeduction;
    let federalTax = 0;
    if (federalTaxableIncome > 0) {
      if (federalTaxableIncome <= 11600) {
        federalTax = federalTaxableIncome * 0.10;
      } else if (federalTaxableIncome <= 47150) {
        federalTax = 1160 + (federalTaxableIncome - 11600) * 0.12;
      } else {
        federalTax = 5426 + (federalTaxableIncome - 47150) * 0.22;
      }
    }
    
    // State tax
    const stateRate = stateTaxRates[state]?.rate || 0;
    const stateTax = taxableIncome * stateRate;
    
    // Total and quarterly
    const totalTax = federalTax + stateTax + selfEmploymentTax;
    const quarterlyPayment = totalTax / 4;
    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;
    const savings = income - taxableIncome;

    return {
      taxableIncome: taxableIncome.toFixed(0),
      totalDeductions: totalDeductions.toFixed(0),
      selfEmploymentTax: selfEmploymentTax.toFixed(0),
      federalTax: federalTax.toFixed(0),
      stateTax: stateTax.toFixed(0),
      totalTax: totalTax.toFixed(0),
      quarterlyPayment: quarterlyPayment.toFixed(0),
      effectiveRate: effectiveRate.toFixed(1),
      savings: savings.toFixed(0),
    };
  }, [annualIncome, state, isW2, milesPerYear, selectedDeductions]);

  const toggleDeduction = (id: string) => {
    setSelectedDeductions(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Helmet>
        <title>Tax Savings Calculator for Gig Workers | Indeed Flex Career Hub</title>
        <meta name="description" content="Estimate your quarterly tax payments and discover deductions for gig and flexible workers. Free tax calculator for 1099 and W-2 workers." />
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
              Tax Savings Calculator
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Estimate your tax liability and discover deductions to keep more of your hard-earned money.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Input Card */}
              <div className="lg:col-span-3 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Income Details</CardTitle>
                    <CardDescription>Enter your annual earnings and work status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="annualIncome">Annual Income ($)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="annualIncome"
                            type="number"
                            min="0"
                            value={annualIncome}
                            onChange={(e) => setAnnualIncome(e.target.value)}
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
                          <SelectContent>
                            {Object.entries(stateTaxRates).map(([code, { name }]) => (
                              <SelectItem key={code} value={code}>
                                {name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="isW2" 
                        checked={isW2}
                        onCheckedChange={(checked) => setIsW2(checked as boolean)}
                      />
                      <Label htmlFor="isW2" className="text-sm">
                        I'm a W-2 employee (employer withholds taxes)
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Deductions</CardTitle>
                    <CardDescription>Select deductions that apply to you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                          Track miles driven for work (not commuting). Current rate: $0.67/mile
                        </p>
                      </div>
                    )}

                    <div className="space-y-3">
                      {commonDeductions.map((deduction) => (
                        <div key={deduction.id} className="flex items-start space-x-3">
                          <Checkbox 
                            id={deduction.id}
                            checked={selectedDeductions.includes(deduction.id)}
                            onCheckedChange={() => toggleDeduction(deduction.id)}
                          />
                          <div className="flex-1">
                            <Label htmlFor={deduction.id} className="text-sm font-medium">
                              {deduction.label}
                            </Label>
                            <p className="text-xs text-muted-foreground">{deduction.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results Card */}
              <div className="lg:col-span-2">
                <Card className="bg-primary text-primary-foreground sticky top-20">
                  <CardHeader>
                    <CardTitle className="text-primary-foreground">Tax Estimate</CardTitle>
                    <CardDescription className="text-primary-foreground/70">
                      2024/2025 tax year
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Quarterly Payment */}
                    <div className="bg-accent/20 rounded-lg p-4 text-center">
                      <div className="text-sm text-primary-foreground/70 mb-1">Quarterly Payment</div>
                      <div className="text-4xl font-bold text-accent">${calculations.quarterlyPayment}</div>
                      <div className="text-sm text-primary-foreground/70 mt-1">Due: Apr 15, Jun 15, Sep 15, Jan 15</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/70">Gross Income</span>
                        <span>${parseInt(annualIncome || "0").toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/70">Deductions</span>
                        <span className="text-success">-${parseInt(calculations.totalDeductions).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t border-primary-foreground/20">
                        <span className="text-primary-foreground/70">Taxable Income</span>
                        <span>${parseInt(calculations.taxableIncome).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-primary-foreground/20">
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/70">Federal Tax</span>
                        <span>${parseInt(calculations.federalTax).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/70">State Tax ({stateTaxRates[state]?.name})</span>
                        <span>${parseInt(calculations.stateTax).toLocaleString()}</span>
                      </div>
                      {!isW2 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-primary-foreground/70">Self-Employment Tax</span>
                          <span>${parseInt(calculations.selfEmploymentTax).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm pt-2 border-t border-primary-foreground/20">
                        <span className="font-medium">Total Annual Tax</span>
                        <span className="font-bold">${parseInt(calculations.totalTax).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/70">Effective Tax Rate</span>
                        <span>{calculations.effectiveRate}%</span>
                      </div>
                    </div>

                    {parseInt(calculations.savings) > 0 && (
                      <div className="bg-success/20 rounded-lg p-3 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="text-sm">
                          You're saving <strong>${parseInt(calculations.savings).toLocaleString()}</strong> with deductions!
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="max-w-5xl mx-auto mt-8">
              <div className="flex items-start gap-3 bg-secondary rounded-lg p-4">
                <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  This calculator provides estimates for educational purposes only. Tax situations vary based on 
                  filing status, other income, credits, and deductions not included here. Consult a tax professional 
                  for personalized advice.
                </p>
              </div>
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
          subtitle="Find flexible shifts and keep more of what you earn."
        />
      </Layout>
    </>
  );
};

export default TaxCalculator;
