import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, MapPin, TrendingUp, Download } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-gradient text-primary-foreground py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Your Career Growth Starts Here
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-primary-foreground/90 leading-relaxed">
            Resources, guides, and tools to help you earn more, grow faster, and manage your money as a flexible worker.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 rounded-xl"
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
              className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 font-semibold text-lg px-8 rounded-xl"
              asChild
            >
              <Link to="/career-hub/tools">
                Explore Career Tools <ArrowRight className="ml-2 h-5 w-5" />
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
          <div className="flex items-center justify-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8">
            <Briefcase className="h-12 w-12 text-accent" />
            <div>
              <div className="text-4xl font-bold">20+</div>
              <div className="text-primary-foreground/80">Role Guides</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8">
            <MapPin className="h-12 w-12 text-accent" />
            <div>
              <div className="text-4xl font-bold">8</div>
              <div className="text-primary-foreground/80">US Cities</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8">
            <TrendingUp className="h-12 w-12 text-accent" />
            <div>
              <div className="text-4xl font-bold">6</div>
              <div className="text-primary-foreground/80">Free Tools</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
