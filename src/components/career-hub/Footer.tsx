import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="font-bold text-xl mb-4">
              indeed<span className="text-accent">flex</span>
            </div>
            <p className="text-background/70 text-sm">
              Find flexible work that fits your life. Hospitality, warehouse, retail, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Explore Roles</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/career-hub/industries/hospitality" className="hover:text-accent transition-colors">Hospitality Jobs</Link></li>
              <li><Link to="/career-hub/industries/industrial" className="hover:text-accent transition-colors">Warehouse Jobs</Link></li>
              <li><Link to="/career-hub/industries/retail" className="hover:text-accent transition-colors">Retail Jobs</Link></li>
              <li><Link to="/career-hub/industries/facilities" className="hover:text-accent transition-colors">Facilities Jobs</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-semibold mb-4">US Locations</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/career-hub/locations/austin" className="hover:text-accent transition-colors">Austin, TX</Link></li>
              <li><Link to="/career-hub/locations/dallas" className="hover:text-accent transition-colors">Dallas, TX</Link></li>
              <li><Link to="/career-hub/locations/houston" className="hover:text-accent transition-colors">Houston, TX</Link></li>
              <li><Link to="/career-hub/locations/nashville" className="hover:text-accent transition-colors">Nashville, TN</Link></li>
              <li><Link to="/career-hub/locations/atlanta" className="hover:text-accent transition-colors">Atlanta, GA</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/career-hub/tools" className="hover:text-accent transition-colors">Career Tools</Link></li>
              <li><Link to="/career-hub/guides" className="hover:text-accent transition-colors">Career Guides</Link></li>
              <li><Link to="/career-hub/financial-tips" className="hover:text-accent transition-colors">Financial Tips</Link></li>
              <li><Link to="/career-hub/tools/pay-calculator" className="hover:text-accent transition-colors">Pay Calculator</Link></li>
              <li><a href="https://indeedflex.onelink.me/4jvh/x7l4jms3" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Download the App</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Indeed Flex. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/60">
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
