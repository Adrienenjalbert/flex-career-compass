import { Info } from "lucide-react";

interface KeyFact {
  label: string;
  value: string;
}

interface KeyFactsProps {
  title: string;
  facts: KeyFact[];
  summary?: string;
}

const KeyFacts = ({ title, facts, summary }: KeyFactsProps) => {
  return (
    <div 
      className="bg-accent/10 border border-accent/20 rounded-lg p-6 my-8"
      itemScope 
      itemType="https://schema.org/Thing"
    >
      <div className="flex items-center gap-2 mb-4">
        <Info className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground" itemProp="name">
          {title}
        </h3>
      </div>
      
      <ul className="space-y-2 mb-4">
        {facts.map((fact, index) => (
          <li key={index} className="flex items-start gap-2 text-foreground">
            <span className="font-medium min-w-[140px]">{fact.label}:</span>
            <span itemProp="description">{fact.value}</span>
          </li>
        ))}
      </ul>

      {summary && (
        <p className="text-muted-foreground text-sm border-t border-accent/20 pt-4 mt-4" itemProp="description">
          {summary}
        </p>
      )}
    </div>
  );
};

export default KeyFacts;
