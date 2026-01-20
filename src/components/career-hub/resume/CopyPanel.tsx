import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Check, Download, RefreshCw, Eye, EyeOff, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Variable {
  key: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  type?: 'text' | 'number' | 'textarea';
}

interface Section {
  id: string;
  title: string;
  content: string;
  variables?: string[];
}

interface CopyPanelProps {
  sections: Section[];
  variables: Variable[];
  roleTitle?: string;
  className?: string;
  onVariableChange?: (key: string, value: string) => void;
}

export const CopyPanel: React.FC<CopyPanelProps> = ({
  sections,
  variables,
  roleTitle = 'Resume',
  className = '',
  onVariableChange
}) => {
  const [variableValues, setVariableValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    variables.forEach(v => {
      initial[v.key] = v.defaultValue || '';
    });
    return initial;
  });
  
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [activeTab, setActiveTab] = useState('variables');

  const handleVariableChange = useCallback((key: string, value: string) => {
    setVariableValues(prev => ({ ...prev, [key]: value }));
    onVariableChange?.(key, value);
  }, [onVariableChange]);

  const replaceVariables = useCallback((content: string): string => {
    let result = content;
    Object.entries(variableValues).forEach(([key, value]) => {
      const placeholder = value || `{${key}}`;
      result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), placeholder);
    });
    return result;
  }, [variableValues]);

  const processedSections = useMemo(() => {
    return sections.map(section => ({
      ...section,
      processedContent: replaceVariables(section.content)
    }));
  }, [sections, replaceVariables]);

  const fullContent = useMemo(() => {
    return processedSections.map(s => `${s.title}\n${s.processedContent}`).join('\n\n');
  }, [processedSections]);

  const copyToClipboard = useCallback(async (text: string, sectionId?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (sectionId) {
        setCopiedSection(sectionId);
        setTimeout(() => setCopiedSection(null), 2000);
      }
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  }, []);

  const downloadAsText = useCallback(() => {
    const blob = new Blob([fullContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${roleTitle.toLowerCase().replace(/\s+/g, '-')}-resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Resume downloaded!');
  }, [fullContent, roleTitle]);

  const resetVariables = useCallback(() => {
    const reset: Record<string, string> = {};
    variables.forEach(v => {
      reset[v.key] = v.defaultValue || '';
    });
    setVariableValues(reset);
    toast.info('Variables reset to defaults');
  }, [variables]);

  const filledCount = useMemo(() => {
    return Object.values(variableValues).filter(v => v.trim() !== '').length;
  }, [variableValues]);

  return (
    <Card className={`sticky top-4 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Resume Builder
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {filledCount}/{variables.length} filled
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="variables">Your Info</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="variables" className="mt-4">
            <ScrollArea className="h-[350px] pr-4">
              <div className="space-y-4">
                {variables.map((variable) => (
                  <div key={variable.key} className="space-y-1.5">
                    <Label htmlFor={variable.key} className="text-sm font-medium">
                      {variable.label}
                    </Label>
                    {variable.type === 'textarea' ? (
                      <Textarea
                        id={variable.key}
                        placeholder={variable.placeholder}
                        value={variableValues[variable.key]}
                        onChange={(e) => handleVariableChange(variable.key, e.target.value)}
                        className="min-h-[80px] text-sm"
                      />
                    ) : (
                      <Input
                        id={variable.key}
                        type={variable.type || 'text'}
                        placeholder={variable.placeholder}
                        value={variableValues[variable.key]}
                        onChange={(e) => handleVariableChange(variable.key, e.target.value)}
                        className="text-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="flex gap-2 pt-4 border-t mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={resetVariables}
                className="flex-1"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="flex-1"
              >
                {showPreview ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-4">
            <ScrollArea className="h-[350px] pr-4">
              <div className="space-y-4">
                {processedSections.map((section) => (
                  <div key={section.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground">
                        {section.title}
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(section.processedContent, section.id)}
                        className="h-7 px-2"
                      >
                        {copiedSection === section.id ? (
                          <Check className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                    <pre className="text-xs bg-muted p-3 rounded-md whitespace-pre-wrap font-mono">
                      {section.processedContent}
                    </pre>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <Button
            onClick={() => copyToClipboard(fullContent)}
            className="flex-1"
            size="sm"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy All
          </Button>
          <Button
            variant="secondary"
            onClick={downloadAsText}
            size="sm"
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Simpler copy button component for inline use
interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label,
  className = '',
  size = 'sm',
  variant = 'outline'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={className}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-600" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {label && <span className="ml-1">{label}</span>}
    </Button>
  );
};

// Keyword chip with copy functionality
interface KeywordChipProps {
  keyword: string;
  score?: number;
  category?: string;
}

export const KeywordChip: React.FC<KeywordChipProps> = ({
  keyword,
  score,
  category
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(keyword);
      setCopied(true);
      toast.success(`Copied: ${keyword}`);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <Badge
      variant={copied ? 'default' : 'secondary'}
      className={`cursor-pointer transition-all hover:scale-105 ${
        copied ? 'bg-green-600' : ''
      }`}
      onClick={handleCopy}
    >
      {keyword}
      {score && <span className="ml-1 opacity-60">({score})</span>}
    </Badge>
  );
};

export default CopyPanel;
