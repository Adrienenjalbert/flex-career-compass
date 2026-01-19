import { Link } from "react-router-dom";
import { Briefcase, Calculator, GraduationCap } from "lucide-react";
import logo from "@/assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <img src={logo} alt="Indeed Flex" className="h-8 w-auto mb-4 brightness-0 invert" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
              Find flexible work that fits your life. Hospitality, warehouse, retail, and more.
            </p>
            <a 
              href="https://indeedflex.onelink.me/4jvh/x7l4jms3" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl px-4 py-2 text-sm transition-colors"
            >
              Download the App →
            </a>
          </div>

          {/* FIND WORK Pillar */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Briefcase className="h-4 w-4 opacity-80" />
              <h4 className="font-semibold">Find Work</h4>
            </div>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/career-hub/job-application-toolkit" className="hover:text-accent transition-colors">Job Application Toolkit</Link></li>
              <li><Link to="/career-hub/active-markets" className="hover:text-accent transition-colors">Active Markets (19 cities)</Link></li>
              <li><Link to="/career-hub/seasonal-hiring" className="hover:text-accent transition-colors">Seasonal Hiring</Link></li>
              <li><Link to="/career-hub/industries/hospitality" className="hover:text-accent transition-colors">Hospitality Jobs</Link></li>
              <li><Link to="/career-hub/industries/industrial" className="hover:text-accent transition-colors">Warehouse Jobs</Link></li>
              <li><Link to="/career-hub" className="hover:text-accent transition-colors font-medium text-accent">Browse All Jobs →</Link></li>
            </ul>
          </div>

          {/* CALCULATE Pillar */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Calculator className="h-4 w-4 opacity-80" />
              <h4 className="font-semibold">Calculate</h4>
            </div>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/career-hub/tools/pay-calculator" className="hover:text-accent transition-colors">Pay Calculator</Link></li>
              <li><Link to="/career-hub/tools/tax-calculator" className="hover:text-accent transition-colors">Tax Calculator</Link></li>
              <li><Link to="/career-hub/tools/childcare-calculator" className="hover:text-accent transition-colors">Childcare Calculator</Link></li>
              <li><Link to="/career-hub/tools/commute-calculator" className="hover:text-accent transition-colors">Commute Calculator</Link></li>
              <li><Link to="/career-hub/financial-tips" className="hover:text-accent transition-colors">Financial Guides</Link></li>
              <li><Link to="/career-hub/tools" className="hover:text-accent transition-colors font-medium text-accent">All Tools →</Link></li>
            </ul>
          </div>

          {/* GROW Pillar */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <GraduationCap className="h-4 w-4 opacity-80" />
              <h4 className="font-semibold">Grow</h4>
            </div>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/career-hub/guides/complete-guide" className="hover:text-accent transition-colors">Getting Started Guide</Link></li>
              <li><Link to="/career-hub/guides/certifications" className="hover:text-accent transition-colors">Certifications</Link></li>
              <li><Link to="/career-hub/tools/worktalk" className="hover:text-accent transition-colors">WorkTalk (Job English)</Link></li>
              <li><Link to="/career-hub/tools/career-path" className="hover:text-accent transition-colors">Career Path Explorer</Link></li>
              <li><Link to="/career-hub/guides/i9-complete-guide" className="hover:text-accent transition-colors">I-9 Guide</Link></li>
              <li><Link to="/career-hub/guides" className="hover:text-accent transition-colors font-medium text-accent">All Guides →</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Indeed Flex. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/60">
            <a href="https://indeedflex.com/privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="https://indeedflex.com/terms" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="https://indeedflex.com/cookies" className="hover:text-accent transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Schema.org WebSite structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Indeed Flex Career Hub",
          "url": "https://indeedflex.com/career-hub",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://indeedflex.com/career-hub/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })
      }} />
    </footer>
  );
};

export default Footer;
