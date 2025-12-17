import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, MapPin, TrendingUp, Download, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-gradient text-primary-foreground py-20 md:py-28 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/15 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20">
            <BadgeCheck className="h-4 w-4" />
            Your Complete Hub for Temp & Flexible Work
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Your Career Growth Starts Here
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-primary-foreground/90 leading-relaxed">
            Resources, guides, and tools to help you earn more, grow faster, and manage your money as a flexible worker.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 rounded-xl shadow-lg hover:shadow-xl transition-all group"
              asChild
            >
              <a href="https://indeedflex.onelink.me/4jvh/x7l4jms3" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-5 w-5" />
                Get the App
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 font-semibold text-lg px-8 rounded-xl group"
              asChild
            >
              <Link to="/career-hub/tools">
                Explore Career Tools <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 font-semibold text-lg px-8 rounded-xl"
              asChild
            >
              <Link to="/career-hub/guides">
                Read Career Guides
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-primary-foreground/15 transition-colors">
            <Briefcase className="h-12 w-12 text-accent" />
            <div>
              <div className="text-4xl font-bold">20+</div>
              <div className="text-primary-foreground/80">Role Guides</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-primary-foreground/15 transition-colors">
            <MapPin className="h-12 w-12 text-accent" />
            <div>
              <div className="text-4xl font-bold">19</div>
              <div className="text-primary-foreground/80">Active Markets</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-primary-foreground/15 transition-colors">
            <TrendingUp className="h-12 w-12 text-accent" />
            <div>
              <div className="text-4xl font-bold">6+</div>
              <div className="text-primary-foreground/80">Free Tools</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
