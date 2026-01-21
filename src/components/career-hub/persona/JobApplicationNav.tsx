import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  FileText, 
  PenTool, 
  LayoutTemplate,
  Briefcase,
  Sparkles
} from "lucide-react";

interface JobApplicationNavProps {
  personaSlug: string;
  personaName: string;
}

export function JobApplicationNav({ personaSlug, personaName }: JobApplicationNavProps) {
  const navItems = [
    {
      title: "Resume Examples",
      description: `Role-specific resumes for ${personaName.toLowerCase()}`,
      path: `/career-hub/resume-examples?situation=${personaSlug}`,
      icon: FileText,
      badge: "23+ roles",
      color: "from-blue-500/20 to-blue-500/5"
    },
    {
      title: "Resume Templates",
      description: "ATS-friendly templates with formatting tips",
      path: `/career-hub/templates?situation=${personaSlug}`,
      icon: LayoutTemplate,
      badge: "8 templates",
      color: "from-purple-500/20 to-purple-500/5"
    },
    {
      title: "Cover Letters",
      description: "Industry-specific cover letter templates",
      path: `/career-hub/cover-letters?situation=${personaSlug}`,
      icon: PenTool,
      badge: "6 templates",
      color: "from-green-500/20 to-green-500/5"
    },
    {
      title: "Job Application Hub",
      description: "Complete toolkit for job seekers",
      path: "/career-hub/job-application-toolkit",
      icon: Briefcase,
      badge: "All resources",
      color: "from-orange-500/20 to-orange-500/5"
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Job Application Toolkit
          </Badge>
          <h2 className="text-3xl font-bold mb-3">
            Everything You Need to Apply
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional templates, real examples, and expert tips—all tailored for {personaName.toLowerCase()}.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 overflow-hidden">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3">
                    {item.description}
                  </p>
                  
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link to="/career-hub/job-application-toolkit">
              Explore Full Toolkit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
