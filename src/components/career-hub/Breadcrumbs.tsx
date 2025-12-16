import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useMemo } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Include schema.org structured data */
  includeSchema?: boolean;
  /** Custom base URL for schema */
  baseUrl?: string;
}

const Breadcrumbs = ({ 
  items, 
  includeSchema = true,
  baseUrl = "https://indeedflex.com"
}: BreadcrumbsProps) => {
  const allItems = useMemo(() => [
    { label: "Career Hub", href: "/career-hub" }, 
    ...items
  ], [items]);

  // Generate schema with proper item URLs
  const breadcrumbSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((item, index) => {
      const listItem: Record<string, unknown> = {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label
      };
      
      // Only add item URL if href exists (not for current page)
      if (item.href) {
        listItem["item"] = `${baseUrl}${item.href}`;
      }
      
      return listItem;
    })
  }), [allItems, baseUrl]);

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="py-4"
      itemScope 
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        <li 
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem"
        >
          <Link 
            to="/career-hub" 
            className="text-muted-foreground hover:text-primary transition-colors flex items-center"
            itemProp="item"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only" itemProp="name">Career Hub</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        {allItems.slice(1).map((item, index) => (
          <li 
            key={index} 
            className="flex items-center gap-2"
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            {item.href ? (
              <Link 
                to={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span 
                className="text-foreground font-medium"
                itemProp="name"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(index + 2)} />
          </li>
        ))}
      </ol>

      {/* BreadcrumbList JSON-LD Schema */}
      {includeSchema && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} 
        />
      )}
    </nav>
  );
};

export default Breadcrumbs;
