import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { SITUATION_LABELS } from "@/data/taxonomy";

const Footer = () => {
  // Persona pages based on taxonomy
  const personaPages = [
    { slug: 'for-students', situation: 'student' },
    { slug: 'for-freshers', situation: 'fresher' },
    { slug: 'for-immigrants', situation: 'immigrant' },
    { slug: 'for-parents', situation: 'parent' },
    { slug: 'for-seasonal-workers', situation: 'seasonal' },
    { slug: 'for-side-gig', situation: 'side-gig' },
  ] as const;

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={logo} alt="Indeed Flex" className="h-8 w-auto mb-4 brightness-0 invert" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Find flexible work that fits your life. Hospitality, warehouse, retail, and more.
            </p>
          </div>

          {/* For You (Persona Pages) */}
          <div>
            <h4 className="font-semibold mb-5">For You</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              {personaPages.map(({ slug, situation }) => (
                <li key={slug}>
                  <Link 
                    to={`/career-hub/${slug}`} 
                    className="hover:text-accent transition-colors flex items-center gap-2"
                  >
                    <span>{SITUATION_LABELS[situation].icon}</span>
                    {SITUATION_LABELS[situation].label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-semibold mb-5">Industries</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/career-hub/industries/hospitality" className="hover:text-accent transition-colors">Hospitality Jobs</Link></li>
              <li><Link to="/career-hub/industries/industrial" className="hover:text-accent transition-colors">Warehouse & Industrial</Link></li>
              <li><Link to="/career-hub/industries/retail" className="hover:text-accent transition-colors">Retail Jobs</Link></li>
              <li><Link to="/career-hub/industries/facilities" className="hover:text-accent transition-colors">Facilities Management</Link></li>
              <li><Link to="/career-hub" className="hover:text-accent transition-colors font-medium text-accent">All Roles →</Link></li>
            </ul>
          </div>

          {/* Top Tools */}
          <div>
            <h4 className="font-semibold mb-5">Career Tools</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/career-hub/tools/pay-calculator" className="hover:text-accent transition-colors">Pay Calculator</Link></li>
              <li><Link to="/career-hub/tools/tax-calculator" className="hover:text-accent transition-colors">Tax Estimator</Link></li>
              <li><Link to="/career-hub/tools/childcare-calculator" className="hover:text-accent transition-colors">Childcare Calculator</Link></li>
              <li><Link to="/career-hub/tools/commute-calculator" className="hover:text-accent transition-colors">Commute Calculator</Link></li>
              <li><Link to="/career-hub/tools/worktalk" className="hover:text-accent transition-colors">WorkTalk (Job English)</Link></li>
              <li><Link to="/career-hub/tools" className="hover:text-accent transition-colors font-medium text-accent">All Tools →</Link></li>
            </ul>
          </div>

          {/* Indeed Flex Markets */}
          <div>
            <h4 className="font-semibold mb-5">Active Markets</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/career-hub/locations/austin" className="hover:text-accent transition-colors">Austin, TX</Link></li>
              <li><Link to="/career-hub/locations/dallas" className="hover:text-accent transition-colors">Dallas, TX</Link></li>
              <li><Link to="/career-hub/locations/chicago" className="hover:text-accent transition-colors">Chicago, IL</Link></li>
              <li><Link to="/career-hub/locations/atlanta" className="hover:text-accent transition-colors">Atlanta, GA</Link></li>
              <li><Link to="/career-hub/locations/las-vegas" className="hover:text-accent transition-colors">Las Vegas, NV</Link></li>
              <li><Link to="/career-hub/active-markets" className="hover:text-accent transition-colors font-medium text-accent">All 19 Markets →</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-5">Resources</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/career-hub/guides" className="hover:text-accent transition-colors">Career Guides</Link></li>
              <li><Link to="/career-hub/financial-tips" className="hover:text-accent transition-colors">Financial Tips</Link></li>
              <li><Link to="/career-hub/guides/complete-guide" className="hover:text-accent transition-colors">Getting Started</Link></li>
              <li><Link to="/career-hub/guides/certifications" className="hover:text-accent transition-colors">Certifications</Link></li>
              <li><Link to="/career-hub/cities" className="hover:text-accent transition-colors">All US Cities</Link></li>
              <li><a href="https://indeedflex.onelink.me/4jvh/x7l4jms3" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors font-medium text-accent">Download the App →</a></li>
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
