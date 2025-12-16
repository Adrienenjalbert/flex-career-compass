import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Lightbulb, AlertTriangle, Briefcase, Shirt } from "lucide-react";
import { DayInTheLifeContent } from "@/data/role-content";

interface DayInTheLifeProps {
  content: DayInTheLifeContent;
  roleTitle: string;
}

const DayInTheLife = ({ content, roleTitle }: DayInTheLifeProps) => {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Clock className="h-7 w-7 text-primary" />
            A Day in the Life of a {roleTitle}
          </h2>

          {/* Schedule Timeline */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Typical Shift Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {content.schedule.map((item, index) => (
                  <div key={index} className="flex gap-4 mb-4 last:mb-0">
                    <div className="flex-shrink-0 w-20 text-sm font-medium text-primary">
                      {item.time}
                    </div>
                    <div className="relative flex-1 pb-4">
                      <div className="absolute left-0 top-2 w-2 h-2 bg-primary rounded-full -ml-1" />
                      {index < content.schedule.length - 1 && (
                        <div className="absolute left-0 top-4 w-0.5 h-full bg-border -ml-[1px]" />
                      )}
                      <p className="text-foreground pl-4">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Pro Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  Pro Tips from Experienced Workers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {content.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* What to Bring */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  What to Bring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {content.whatToBring.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shirt className="h-4 w-4" />
                    <span className="font-medium">Dress Code:</span>
                  </div>
                  <p className="text-sm text-foreground mt-1">{content.dressCode}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Common Challenges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Common Challenges & How to Handle Them
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content.challenges.map((item, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <div className="font-medium text-foreground mb-1">
                      {item.challenge}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="text-primary font-medium">Solution: </span>
                      {item.solution}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DayInTheLife;
