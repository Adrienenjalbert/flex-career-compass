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
}

const TableOfContents = ({ items, className }: TableOfContentsProps) => {
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
    <nav className={cn("bg-secondary/50 rounded-lg p-4", className)}>
      <div className="flex items-center gap-2 mb-3 text-foreground font-semibold">
        <List className="h-4 w-4" />
        <span>Table of Contents</span>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "text-sm text-left w-full hover:text-primary transition-colors",
                item.level > 1 && "pl-4",
                activeId === item.id 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground"
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
