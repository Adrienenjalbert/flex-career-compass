import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { resumeTemplates, ResumeTemplate } from '@/data/resume-templates';
import { ArrowRight, Columns3, Eye } from 'lucide-react';

const templateList = Object.values(resumeTemplates);

// Build resume preview from example data
const buildExamplePreview = (template: ResumeTemplate): string => {
  let content = '';
  template.sections.forEach(section => {
    let sectionContent = section.content;
    template.variables.forEach(v => {
      const value = template.exampleData[v.id] || v.placeholder || `[${v.label}]`;
      sectionContent = sectionContent.replace(new RegExp(`\\{${v.id}\\}`, 'g'), value);
    });
    content += sectionContent + '\n\n';
  });
  return content.trim();
};

export const TemplateComparison = () => {
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>(['chronological', 'functional', 'temp-worker']);

  const toggleTemplate = (slug: string) => {
    setSelectedTemplates(prev => {
      if (prev.includes(slug)) {
        return prev.filter(s => s !== slug);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), slug];
      }
      return [...prev, slug];
    });
  };

  const selectedTemplateData = selectedTemplates
    .map(slug => resumeTemplates[slug])
    .filter(Boolean);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <Columns3 className="w-5 h-5 text-primary" />
            Compare Templates
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select up to 3 templates to compare formats with example content
          </p>
        </div>
      </div>

      {/* Template Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {templateList.map(template => (
          <label
            key={template.slug}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all text-sm ${
              selectedTemplates.includes(template.slug)
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border hover:border-primary/50 bg-card'
            }`}
          >
            <Checkbox
              checked={selectedTemplates.includes(template.slug)}
              onCheckedChange={() => toggleTemplate(template.slug)}
              className="data-[state=checked]:bg-primary h-3.5 w-3.5"
            />
            <span className="text-base">{template.icon}</span>
            <span className="font-medium text-xs">{template.name.replace(' Resume', '')}</span>
          </label>
        ))}
      </div>

      {/* Comparison Grid */}
      {selectedTemplateData.length > 0 && (
        <div className={`grid gap-4 ${
          selectedTemplateData.length === 1 ? 'md:grid-cols-1 max-w-2xl' :
          selectedTemplateData.length === 2 ? 'md:grid-cols-2' :
          'md:grid-cols-3'
        }`}>
          {selectedTemplateData.map(template => (
            <Card key={template.slug} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{template.icon}</span>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                  </div>
                  <Link to={`/career-hub/templates/${template.slug}`}>
                    <Button size="sm" variant="ghost" className="h-8 px-2">
                      <Eye className="w-4 h-4 mr-1" />
                      Full
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    Industrial: {template.industryFit.industrial}%
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Hospitality: {template.industryFit.hospitality}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Best For */}
                <div className="text-xs text-primary mb-3">
                  <span className="font-medium">Best for:</span> {template.bestFor[0]}
                </div>

                {/* Resume Preview */}
                <div className="flex-1 bg-card border rounded-lg p-3 font-mono text-[9px] leading-relaxed whitespace-pre-wrap overflow-hidden max-h-[280px] relative text-foreground">
                  {buildExamplePreview(template)}
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                </div>

                {/* CTA */}
                <Link to={`/career-hub/templates/${template.slug}`} className="mt-4">
                  <Button size="sm" className="w-full">
                    Use This Template <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTemplateData.length === 0 && (
        <div className="text-center py-10 bg-card rounded-lg border border-border">
          <Columns3 className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Select templates above to compare</p>
        </div>
      )}
    </div>
  );
};

export default TemplateComparison;
