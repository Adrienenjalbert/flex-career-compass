import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
}

const CTASection = ({ 
  title = "Ready to Find Your Next Shift?",
  subtitle = "Download the Indeed Flex app and start earning today. Flexible work, on your schedule.",
  primaryCTA = "Get the App",
  secondaryCTA = "Learn More"
}: CTASectionProps) => {
  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {title}
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 rounded-xl"
            asChild
          >
            <a href="https://indeedflex.onelink.me/4jvh/x7l4jms3" target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-5 w-5" />
              {primaryCTA}
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 font-semibold text-lg px-8 rounded-xl"
          >
            {secondaryCTA} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
