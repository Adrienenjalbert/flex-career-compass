import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { financialTips } from "@/data/articles/financial-tips";

const FinancialTipsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Financial Tips for Flexible Workers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master your finances with practical advice designed for irregular income and gig work lifestyles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {financialTips.map((tip) => {
            const Icon = tip.icon;
            return (
              <Link
                key={tip.slug}
                to={`/career-hub/financial-tips/${tip.slug}`}
                className="group relative bg-card rounded-2xl p-6 border border-border/50 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Icon and Read Time */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {tip.readTime}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {tip.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground flex-1 mb-4">
                  {tip.description}
                </p>
                
                {/* CTA */}
                <div className="flex items-center text-sm font-medium text-primary">
                  <span>Read guide</span>
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="text-center mt-8">
          <Link
            to="/career-hub/financial-tips"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg"
          >
            View all financial guides
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinancialTipsSection;
