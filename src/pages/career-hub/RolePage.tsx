import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import KeyFacts from "@/components/career-hub/KeyFacts";
import RelatedContent from "@/components/career-hub/RelatedContent";
import DayInTheLife from "@/components/career-hub/DayInTheLife";
import RoleComparisons from "@/components/career-hub/RoleComparisons";
import { getRoleBySlug, roles } from "@/data/roles";
import { usLocations } from "@/data/locations";
import { getDayInTheLife, getComparisonsForRole } from "@/data/role-content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CheckCircle, TrendingUp, ArrowRight, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const RolePage = () => {
  const { roleSlug } = useParams<{ roleSlug: string }>();
  const role = getRoleBySlug(roleSlug || "");

  if (!role) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Role not found</h1>
        </div>
      </Layout>
    );
  }

  const relatedRoles = roles
    .filter(r => r.industry === role.industry && r.id !== role.id)
    .slice(0, 3);

  // Get Day in the Life and comparison content
  const dayInTheLife = getDayInTheLife(role.slug);
  const comparisons = getComparisonsForRole(role.slug);

  return (
    <>
      <Helmet>
        <title>{role.title} Career Guide | Indeed Flex</title>
        <meta name="description" content={`Learn how to become a ${role.title}. ${role.shortDescription}. Average pay: $${role.avgHourlyRate.min}-$${role.avgHourlyRate.max}/hr.`} />
        <link rel="canonical" href={`https://indeedflex.com/career-hub/roles/${role.slug}`} />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Industries", href: "/career-hub" },
            { label: role.industry.charAt(0).toUpperCase() + role.industry.slice(1), href: `/career-hub/industries/${role.industry}` },
            { label: role.title }
          ]} />
        </div>

        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {role.industry}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {role.title} Career Guide
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-6">
                {role.description}
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-accent" />
                  <div>
                    <div className="text-2xl font-bold">${role.avgHourlyRate.min}-${role.avgHourlyRate.max}</div>
                    <div className="text-sm text-primary-foreground/70">per hour</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Facts - GEO Optimized */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <KeyFacts
              title={`Key Facts: ${role.title}`}
              facts={[
                { label: "Hourly Rate", value: `$${role.avgHourlyRate.min}-$${role.avgHourlyRate.max} per hour` },
                { label: "Industry", value: role.industry.charAt(0).toUpperCase() + role.industry.slice(1) },
                { label: "Experience", value: role.requirements.find(r => r.toLowerCase().includes('experience')) || "Entry-level positions available" },
                { label: "Key Skills", value: role.skills.slice(0, 3).join(", ") },
              ]}
              summary={`Indeed Flex offers ${role.title.toLowerCase()} positions paying $${role.avgHourlyRate.min}-$${role.avgHourlyRate.max}/hr with flexible scheduling. ${role.shortDescription}. Apply through the Indeed Flex app and start working within 48 hours.`}
            />
          </div>
        </section>

        {/* Content Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Responsibilities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      What You'll Do
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {role.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills Required</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {role.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {role.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Career Path */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Career Path
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {role.careerPath.map((step, index) => (
                        <div key={index} className="flex items-center gap-4 mb-4 last:mb-0">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{step.role}</div>
                            <div className="text-sm text-muted-foreground">{step.years}</div>
                          </div>
                          {index < role.careerPath.length - 1 && (
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card className="bg-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle className="text-primary-foreground">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-primary-foreground/70">Average Pay</div>
                      <div className="text-xl font-bold">${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr</div>
                    </div>
                    <div>
                      <div className="text-sm text-primary-foreground/70">Industry</div>
                      <div className="text-lg font-medium capitalize">{role.industry}</div>
                    </div>
                    <div>
                      <div className="text-sm text-primary-foreground/70">Career Growth</div>
                      <div className="text-lg font-medium">{role.careerPath.length} advancement levels</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Roles */}
                {relatedRoles.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Related Roles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {relatedRoles.map((related) => (
                          <li key={related.id}>
                            <Link 
                              to={`/career-hub/roles/${related.slug}`}
                              className="flex items-center justify-between hover:text-primary transition-colors"
                            >
                              <span>{related.title}</span>
                              <span className="text-sm text-muted-foreground">
                                ${related.avgHourlyRate.min}-${related.avgHourlyRate.max}/hr
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Day in the Life */}
        {dayInTheLife && (
          <DayInTheLife content={dayInTheLife} roleTitle={role.title} />
        )}

        {/* Role Comparisons */}
        {comparisons.length > 0 && (
          <RoleComparisons comparisons={comparisons} currentRoleSlug={role.slug} />
        )}

        {/* FAQ */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4 max-w-3xl">
            <FAQSection faqs={role.faqs} title={`${role.title} FAQs`} />
          </div>
        </section>

        {/* Schema Markup - JobPosting */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": role.title,
            "description": role.description,
            "industry": role.industry,
            "baseSalary": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": {
                "@type": "QuantitativeValue",
                "minValue": role.avgHourlyRate.min,
                "maxValue": role.avgHourlyRate.max,
                "unitText": "HOUR"
              }
            },
            "skills": role.skills.join(", "),
            "hiringOrganization": {
              "@type": "Organization",
              "name": "Indeed Flex",
              "sameAs": "https://indeedflex.com"
            },
            "employmentType": ["TEMPORARY", "PART_TIME", "CONTRACTOR"],
            "jobLocationType": "TELECOMMUTE"
          })
        }} />

        {/* Schema Markup - Occupation */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Occupation",
            "name": role.title,
            "description": role.description,
            "estimatedSalary": {
              "@type": "MonetaryAmountDistribution",
              "currency": "USD",
              "percentile25": `$${role.avgHourlyRate.min}`,
              "median": `$${Math.round((role.avgHourlyRate.min + role.avgHourlyRate.max) / 2)}`,
              "percentile75": `$${role.avgHourlyRate.max}`,
              "unitText": "HOUR"
            },
            "occupationLocation": {
              "@type": "Country",
              "name": "United States"
            },
            "skills": role.skills.join(", "),
            "responsibilities": role.responsibilities.join(". "),
            "qualifications": role.requirements.join(". ")
          })
        }} />

        {/* Cross-Linking Section */}
        <RelatedContent
          currentRole={role.title}
          roles={relatedRoles.map(r => ({ title: r.title, slug: r.slug, pay: `$${r.avgHourlyRate.min}-${r.avgHourlyRate.max}/hr` }))}
          locations={usLocations.slice(0, 5).map(l => ({ name: `${l.city}, ${l.stateCode}`, slug: l.slug }))}
          tools={[
            { title: "Pay Calculator", slug: "pay-calculator", description: `Calculate your ${role.title} earnings` },
            { title: "Shift Planner", slug: "shift-planner", description: "Plan your work schedule" },
          ]}
          guides={[
            { title: "How to Get Your First Flexible Job", slug: "first-flex-job", readTime: "5 min" },
            { title: "Skills That Boost Your Hourly Rate", slug: "skill-boost", readTime: "7 min" },
          ]}
          variant="full"
        />

        <CTASection 
          title={`Ready to Start as a ${role.title}?`}
          subtitle="Download Indeed Flex and find your first shift today."
        />
      </Layout>
    </>
  );
};

export default RolePage;
