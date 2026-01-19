import { Link } from "react-router-dom";
import { ArrowRight, DollarSign, Calculator, Baby, Car, Wallet, PiggyBank, Receipt, Shield } from "lucide-react";
import Layout from "@/components/career-hub/Layout";
import { SEOMetaTags } from "@/components/career-hub/seo";
import CTASection from "@/components/career-hub/CTASection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CalculateHub = () => {
  const payTaxTools = [
    { title: 'Pay Calculator', slug: 'pay-calculator', icon: DollarSign, description: 'Estimate earnings with Same Day Pay' },
    { title: 'Tax Calculator', slug: 'tax-calculator', icon: Calculator, description: 'Calculate take-home pay after taxes' },
    { title: 'Shift Planner', slug: 'shift-planner', icon: Calculator, description: 'Plan your weekly schedule' },
  ];

  const lifeDecisionTools = [
    { title: 'Childcare Calculator', slug: 'childcare-calculator', icon: Baby, description: 'Is work worth it after childcare?' },
    { title: 'Commute Calculator', slug: 'commute-calculator', icon: Car, description: 'Factor in travel costs' },
    { title: 'Cost of Living', slug: 'cost-of-living', icon: Calculator, description: 'Compare cities' },
    { title: 'Unemployment Calculator', slug: 'unemployment-calculator', icon: Calculator, description: 'Estimate benefits' },
  ];

  const financialGuides = [
    { title: 'Budgeting for Irregular Income', slug: 'irregular-income-budget', icon: Wallet },
    { title: 'Building an Emergency Fund', slug: 'emergency-fund-guide', icon: PiggyBank },
    { title: 'Tax Tips for Flexible Workers', slug: 'tax-tips', icon: Receipt },
    { title: 'Benefits & Insurance Options', slug: 'gig-benefits', icon: Shield },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Calculate - Indeed Flex Career Hub",
    "description": "Free calculators and financial guides for flexible workers. Estimate pay, plan taxes, and make smart life decisions.",
    "url": "https://indeedflex.com/career-hub/calculate"
  };

  return (
    <>
      <SEOMetaTags
        title="Calculators & Financial Tools | Indeed Flex Career Hub"
        description="Free pay calculator, tax estimator, childcare calculator & more. Make smart financial decisions as a flexible worker. Plan your earnings today."
        canonical="/career-hub/calculate"
        keywords={["pay calculator", "tax calculator", "gig worker tools", "income calculator", "childcare calculator"]}
      />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <Layout>
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                <Calculator className="h-3 w-3 mr-1" />
                Calculate
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Make Smart Money Decisions
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Free calculators to estimate pay, plan taxes, and figure out if that job is worth it after childcare, commute, and other costs.
              </p>
              <Link
                to="/career-hub/tools/pay-calculator"
                className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-green-700 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                <DollarSign className="h-5 w-5" />
                Try Pay Calculator
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Pay & Taxes Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-2">Pay & Taxes</h2>
            <p className="text-muted-foreground mb-8">Estimate your earnings and plan for taxes</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {payTaxTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link key={tool.slug} to={`/career-hub/tools/${tool.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow group">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                            <Icon className="h-6 w-6 text-green-700" />
                          </div>
                          <CardTitle className="group-hover:text-green-700 transition-colors">
                            {tool.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{tool.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Life Decisions Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-2">Life Decision Tools</h2>
            <p className="text-muted-foreground mb-8">Factor in real-life costs before taking a job</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {lifeDecisionTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link key={tool.slug} to={`/career-hub/tools/${tool.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow group">
                      <CardHeader>
                        <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors w-fit">
                          <Icon className="h-6 w-6 text-green-700" />
                        </div>
                        <CardTitle className="text-lg group-hover:text-green-700 transition-colors">
                          {tool.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Financial Guides Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Financial Guides</h2>
                <p className="text-muted-foreground">Money management for flexible workers</p>
              </div>
              <Link to="/career-hub/financial-tips" className="text-primary font-medium hover:underline hidden md:block">
                View all guides →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {financialGuides.map((guide) => {
                const Icon = guide.icon;
                return (
                  <Link 
                    key={guide.slug} 
                    to={`/career-hub/financial-tips/${guide.slug}`}
                    className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-sm transition-all group"
                  >
                    <Icon className="h-5 w-5 text-primary mb-3" />
                    <h3 className="font-medium group-hover:text-primary transition-colors">{guide.title}</h3>
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-6 text-center md:hidden">
              <Link to="/career-hub/financial-tips" className="text-primary font-medium hover:underline">
                View all guides →
              </Link>
            </div>
          </div>
        </section>

        <CTASection />
      </Layout>
    </>
  );
};

export default CalculateHub;
