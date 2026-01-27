import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { SITUATION_LABELS, UserSituation } from "@/data/taxonomy";

const personaPages: Array<{ slug: string; situation: UserSituation; description: string }> = [
  { 
    slug: 'for-students', 
    situation: 'student',
    description: 'Flexible shifts that work around your class schedule'
  },
  { 
    slug: 'for-freshers', 
    situation: 'fresher',
    description: 'No experience needed—land your first job with confidence'
  },
  { 
    slug: 'for-immigrants', 
    situation: 'immigrant',
    description: 'Navigate US work requirements and I-9 documentation'
  },
  { 
    slug: 'for-career-changers', 
    situation: 'career-changer',
    description: 'Leverage your transferable skills in a new industry'
  },
  { 
    slug: 'for-parents', 
    situation: 'parent',
    description: 'Find shifts that fit around school hours and childcare'
  },
  { 
    slug: 'for-seasonal-workers', 
    situation: 'seasonal',
    description: 'Maximize earnings during peak holiday and summer seasons'
  },
  { 
    slug: 'for-side-gig', 
    situation: 'side-gig',
    description: 'Boost your income with flexible extra shifts'
  },
];

const PersonaSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Resources for Your Situation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find tailored advice and opportunities based on where you are in your career journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {personaPages.map(({ slug, situation, description }) => {
            const { label, icon } = SITUATION_LABELS[situation];
            return (
              <Link
                key={slug}
                to={`/career-hub/${slug}`}
                className="group relative bg-card rounded-2xl p-5 border border-border/50 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Icon and Label */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" role="img" aria-label={label}>
                    {icon}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {label}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground flex-1 mb-3">
                  {description}
                </p>
                
                {/* CTA */}
                <div className="flex items-center text-sm font-medium text-primary">
                  <span>Explore resources</span>
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-muted-foreground text-sm">
            Don't see your situation? Check out our{" "}
            <Link to="/career-hub/guides" className="text-primary hover:underline font-medium">
              full career guides
            </Link>{" "}
            for more resources.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PersonaSection;
