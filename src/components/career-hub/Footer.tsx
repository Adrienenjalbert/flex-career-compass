import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <img src={logo} alt="Indeed Flex" className="h-8 w-auto mb-4 brightness-0 invert" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Find flexible work that fits your life. Hospitality, warehouse, retail, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-5">Explore Roles</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/career-hub/industries/hospitality" className="hover:text-accent transition-colors">Hospitality Jobs</Link></li>
              <li><Link to="/career-hub/industries/industrial" className="hover:text-accent transition-colors">Warehouse Jobs</Link></li>
              <li><Link to="/career-hub/industries/retail" className="hover:text-accent transition-colors">Retail Jobs</Link></li>
              <li><Link to="/career-hub/industries/facilities" className="hover:text-accent transition-colors">Facilities Jobs</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-semibold mb-5">US Locations</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/career-hub/locations/austin" className="hover:text-accent transition-colors">Austin, TX</Link></li>
              <li><Link to="/career-hub/locations/dallas" className="hover:text-accent transition-colors">Dallas, TX</Link></li>
              <li><Link to="/career-hub/locations/atlanta" className="hover:text-accent transition-colors">Atlanta, GA</Link></li>
              <li><Link to="/career-hub/locations/las-vegas" className="hover:text-accent transition-colors">Las Vegas, NV</Link></li>
              <li><Link to="/career-hub/locations/charlotte" className="hover:text-accent transition-colors">Charlotte, NC</Link></li>
              <li><Link to="/career-hub/locations/chicago" className="hover:text-accent transition-colors">Chicago, IL</Link></li>
              <li><Link to="/career-hub/locations/orlando" className="hover:text-accent transition-colors">Orlando, FL</Link></li>
              <li><Link to="/career-hub/locations/phoenix" className="hover:text-accent transition-colors">Phoenix, AZ</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-5">Resources</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/career-hub/tools" className="hover:text-accent transition-colors">Career Tools</Link></li>
              <li><Link to="/career-hub/guides" className="hover:text-accent transition-colors">Career Guides</Link></li>
              <li><Link to="/career-hub/financial-tips" className="hover:text-accent transition-colors">Financial Tips</Link></li>
              <li><Link to="/career-hub/tools/pay-calculator" className="hover:text-accent transition-colors">Pay Calculator</Link></li>
              <li><a href="https://indeedflex.onelink.me/4jvh/x7l4jms3" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Download the App</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Indeed Flex. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/60">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Cookie Policy</a>
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
