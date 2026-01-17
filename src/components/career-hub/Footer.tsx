import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <img src={logo} alt="Indeed Flex" className="h-8 w-auto mb-4 brightness-0 invert" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
              Find flexible work that fits your life.
            </p>
            <a 
              href="https://indeedflex.onelink.me/4jvh/x7l4jms3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Download App →
            </a>
          </div>

          {/* Column 1: Find Work */}
          <div>
            <h4 className="font-semibold mb-4">Find Work</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              <li><Link to="/career-hub/locations/austin" className="hover:text-accent transition-colors">Austin, TX</Link></li>
              <li><Link to="/career-hub/locations/dallas" className="hover:text-accent transition-colors">Dallas, TX</Link></li>
              <li><Link to="/career-hub/locations/chicago" className="hover:text-accent transition-colors">Chicago, IL</Link></li>
              <li><Link to="/career-hub/locations/atlanta" className="hover:text-accent transition-colors">Atlanta, GA</Link></li>
              <li><Link to="/career-hub/active-markets" className="text-accent font-medium hover:underline">All 19 Markets →</Link></li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              <li><Link to="/career-hub/tools/pay-calculator" className="hover:text-accent transition-colors">Pay Calculator</Link></li>
              <li><Link to="/career-hub/job-application-toolkit" className="hover:text-accent transition-colors">Job Application Toolkit</Link></li>
              <li><Link to="/career-hub/guides" className="hover:text-accent transition-colors">Career Guides</Link></li>
              <li><Link to="/career-hub/financial-tips" className="hover:text-accent transition-colors">Financial Tips</Link></li>
              <li><Link to="/career-hub/tools" className="text-accent font-medium hover:underline">All Tools →</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              <li><a href="https://indeedflex.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">About Indeed Flex</a></li>
              <li><a href="https://indeedflex.com/how-the-app-works" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">How It Works</a></li>
              <li><a href="https://indeedflex.com/benefits-pay" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Benefits & Pay</a></li>
              <li><a href="https://indeedflex.com/job-seeker-help" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Help Center</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Indeed Flex. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/60">
            <a href="https://indeedflex.com/privacy" className="hover:text-accent transition-colors">Privacy</a>
            <a href="https://indeedflex.com/terms" className="hover:text-accent transition-colors">Terms</a>
            <a href="https://indeedflex.com/cookies" className="hover:text-accent transition-colors">Cookies</a>
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
