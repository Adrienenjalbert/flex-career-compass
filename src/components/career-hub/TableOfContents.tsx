import { useState, useEffect } from 'react';
import { List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
  sticky?: boolean;
}

const TableOfContents = ({ items, className, sticky = false }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (items.length < 3) return null;

  return (
    <nav 
      className={cn(
        "bg-card border border-border rounded-lg p-4 shadow-sm",
        sticky && "lg:sticky lg:top-24",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3 text-foreground font-semibold">
        <List className="h-4 w-4 text-primary" />
        <span>On This Page</span>
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "text-sm text-left w-full py-1.5 px-2 rounded-md hover:bg-secondary transition-all",
                item.level > 1 && "pl-5",
                activeId === item.id 
                  ? "text-primary font-medium bg-primary/10 border-l-2 border-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Helper function to generate TOC items from sections
export const generateTOCFromSections = (sections: { heading: string }[]): TOCItem[] => {
  return sections.map((section, index) => ({
    id: `section-${index}`,
    title: section.heading,
    level: 1
  }));
};

export default TableOfContents;
