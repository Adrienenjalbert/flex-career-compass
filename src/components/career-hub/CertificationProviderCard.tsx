import { ExternalLink, Clock, DollarSign, Award, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface CertificationProvider {
  name: string;
  url: string;
  cost: string;
  duration: string;
  accredited: boolean;
  description?: string;
}

interface CertificationProviderCardProps {
  provider: CertificationProvider;
  certificationName: string;
}

const CertificationProviderCard = ({ provider, certificationName }: CertificationProviderCardProps) => {
  return (
    <Card className="group hover:border-primary/30 transition-colors h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            {provider.name}
          </CardTitle>
          {provider.accredited && (
            <Badge variant="secondary" className="flex items-center gap-1 bg-primary/10 text-primary">
              <CheckCircle2 className="h-3 w-3" />
              Accredited
            </Badge>
          )}
        </div>
        {provider.description && (
          <p className="text-sm text-muted-foreground mt-1">{provider.description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4 text-primary" />
            <span>{provider.cost}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{provider.duration}</span>
          </div>
        </div>
        
        <a
          href={provider.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors group-hover:underline"
        >
          <Award className="h-4 w-4" />
          Get {certificationName}
          <ExternalLink className="h-3 w-3" />
        </a>
      </CardContent>
    </Card>
  );
};

export default CertificationProviderCard;
