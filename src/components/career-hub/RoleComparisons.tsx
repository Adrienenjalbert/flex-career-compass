import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Scale, CheckCircle } from "lucide-react";
import { RoleComparison as RoleComparisonType } from "@/data/role-content";
import { getRoleBySlug } from "@/data/roles";

interface RoleComparisonProps {
  comparison: RoleComparisonType;
  currentRoleSlug: string;
}

const RoleComparison = ({ comparison, currentRoleSlug }: RoleComparisonProps) => {
  const role1 = getRoleBySlug(comparison.role1Slug);
  const role2 = getRoleBySlug(comparison.role2Slug);

  if (!role1 || !role2) return null;

  const otherRoleSlug = comparison.role1Slug === currentRoleSlug ? comparison.role2Slug : comparison.role1Slug;
  const otherRole = getRoleBySlug(otherRoleSlug);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-lg flex items-center gap-2">
          <Scale className="h-5 w-5 text-primary" />
          {role1.title} vs {role2.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Comparison Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Category</th>
                <th className="text-left py-2 px-3 font-medium text-primary">{role1.title}</th>
                <th className="text-left py-2 px-3 font-medium text-primary">{role2.title}</th>
              </tr>
            </thead>
            <tbody>
              {comparison.comparisonPoints.map((point, index) => (
                <tr key={index} className="border-b border-border last:border-0">
                  <td className="py-3 px-3 font-medium text-foreground">{point.category}</td>
                  <td className="py-3 px-3 text-muted-foreground">{point.role1}</td>
                  <td className="py-3 px-3 text-muted-foreground">{point.role2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Best For */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              {role1.title} is Best For:
            </h4>
            <ul className="space-y-1">
              {comparison.bestFor.role1.map((item, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              {role2.title} is Best For:
            </h4>
            <ul className="space-y-1">
              {comparison.bestFor.role2.map((item, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Link to other role */}
        {otherRole && (
          <Link
            to={`/career-hub/roles/${otherRoleSlug}`}
            className="mt-6 inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Learn more about {otherRole.title}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

interface RoleComparisonsProps {
  comparisons: RoleComparisonType[];
  currentRoleSlug: string;
}

const RoleComparisons = ({ comparisons, currentRoleSlug }: RoleComparisonsProps) => {
  if (comparisons.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            How Does This Role Compare?
          </h2>
          <div className="space-y-6">
            {comparisons.map((comparison, index) => (
              <RoleComparison
                key={index}
                comparison={comparison}
                currentRoleSlug={currentRoleSlug}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleComparisons;
