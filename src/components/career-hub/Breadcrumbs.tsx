import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const allItems = [{ label: "Career Hub", href: "/career-hub" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        <li>
          <Link 
            to="/career-hub" 
            className="text-muted-foreground hover:text-primary transition-colors flex items-center"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {allItems.slice(1).map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            {item.href ? (
              <Link 
                to={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": allItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": item.href ? `https://indeedflex.com${item.href}` : undefined
          }))
        })
      }} />
    </nav>
  );
};

export default Breadcrumbs;
