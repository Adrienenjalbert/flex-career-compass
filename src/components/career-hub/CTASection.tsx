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
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8"
          >
            <Download className="mr-2 h-5 w-5" />
            {primaryCTA}
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-lg px-8"
          >
            {secondaryCTA} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
