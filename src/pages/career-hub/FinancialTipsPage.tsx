import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { SEOMetaTags } from "@/components/career-hub/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Wallet, PiggyBank, Receipt, TrendingUp, Shield, Calculator } from "lucide-react";

const tips = [
  {
    icon: Wallet,
    title: "Budgeting for Irregular Income",
    description: "Learn how to create a flexible budget that works when your income changes week to week.",
    slug: "irregular-income-budget",
    readTime: "7 min"
  },
  {
    icon: PiggyBank,
    title: "Building an Emergency Fund on Gig Income",
    description: "Practical strategies for saving 3-6 months of expenses when your income varies.",
    slug: "emergency-fund-guide",
    readTime: "8 min"
  },
  {
    icon: Receipt,
    title: "Tax Tips for Flexible Workers",
    description: "Understand your tax obligations and discover deductions available to gig workers.",
    slug: "tax-tips",
    readTime: "10 min"
  },
  {
    icon: TrendingUp,
    title: "Managing Money Between Shifts",
    description: "How to stretch your earnings and stay financially stable during slow periods.",
    slug: "between-shifts",
    readTime: "6 min"
  },
  {
    icon: Shield,
    title: "Benefits and Insurance Options",
    description: "Explore health insurance, retirement, and other benefits available to gig workers.",
    slug: "gig-benefits",
    readTime: "9 min"
  },
  {
    icon: Calculator,
    title: "Retirement Saving for Gig Workers",
    description: "How to save for retirement when you don't have an employer-sponsored 401(k).",
    slug: "retirement-saving",
    readTime: "8 min"
  },
];

const quickTips = [
  "Set aside 25-30% of each paycheck for taxes if you're an independent contractor",
  "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
  "Track your mileage if you drive for work—it's a valuable tax deduction",
  "Pay yourself first: set up automatic transfers to savings on paydays",
  "Keep a separate bank account for taxes and business expenses",
  "Review your expenses monthly to find areas to cut",
];

const FinancialTipsPage = () => {
  return (
    <>
      <SEOMetaTags
        title="Financial Tips for Flexible Workers | Indeed Flex Career Hub"
        description="Master your finances as a flexible worker. Learn budgeting, saving, tax tips, and money management strategies for irregular income."
        canonical="https://indeedflex.com/career-hub/financial-tips"
        keywords={[
          'financial tips gig workers',
          'budgeting irregular income',
          'flexible work finances',
          'tax tips contractors',
          'emergency fund gig economy',
          'retirement saving freelancers'
        ]}
      />

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Financial Tips" }]} />
        </div>

        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/20 rounded-full">
                <Wallet className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Financial Tips for Flexible Workers
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Practical money management advice designed for gig workers and people with variable income.
            </p>
          </div>
        </section>

        {/* Quick Tips Banner */}
        <section className="bg-accent/10 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="bg-accent text-accent-foreground p-1 rounded text-sm">Quick Tips</span>
                Money Rules for Flexible Workers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              In-Depth Guides
            </h2>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip) => (
                <Card key={tip.slug} className="group hover:border-primary/30 hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                      <tip.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      <Link to={`/career-hub/financial-tips/${tip.slug}`}>
                        {tip.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      {tip.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{tip.readTime} read</span>
                      <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tools CTA */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Use Our Free Financial Tools
              </h2>
              <p className="text-muted-foreground mb-8">
                Calculate your take-home pay, plan your shifts, and compare cost of living between cities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/career-hub/tools/pay-calculator"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                >
                  <Calculator className="h-5 w-5" />
                  Pay Calculator
                </Link>
                <Link 
                  to="/career-hub/tools/shift-planner"
                  className="bg-card border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:border-primary/30 transition-colors inline-flex items-center gap-2"
                >
                  <TrendingUp className="h-5 w-5" />
                  Shift Planner
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Link Hub for SEO */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <InternalLinkHub variant="footer" currentPage={{ type: 'guide' }} />
          </div>
        </section>

        <CTASection 
          title="Start Earning More Today"
          subtitle="Find flexible shifts that fit your financial goals."
        />
      </Layout>
    </>
  );
};

export default FinancialTipsPage;
