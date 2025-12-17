import { useParams, Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import RoleCard from "@/components/career-hub/RoleCard";
import LocationCard from "@/components/career-hub/LocationCard";
import { 
  SEOMetaTags, 
  generateKeywords,
  JobPostingSchema, 
  OccupationSchema, 
  FAQSchema,
  WebPageSchema 
} from "@/components/career-hub/seo";
import { getLocationRoleData, getPopularRolesForLocation, getPopularLocationsForRole } from "@/data/location-role-data";
import { 
  MapPin, DollarSign, Briefcase, TrendingUp, Award, Calendar, Building2, 
  Lightbulb, CheckCircle, ArrowRight, Star, Clock, Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const LocationRolePage = () => {
  const { locationSlug, roleSlug } = useParams();
  const data = getLocationRoleData(locationSlug || '', roleSlug || '');
  
  if (!data) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't find job information for this location and role combination.
          </p>
          <Link to="/career-hub" className="text-primary hover:underline">
            Return to Career Hub
          </Link>
        </div>
      </Layout>
    );
  }

  const { location, role, localSalary, tipsRange, demandLevel, certifications, peakSeasons, topEmployers, localInsights, jobCount } = data;
  
  const otherRoles = getPopularRolesForLocation(location.slug).filter(r => r.slug !== role.slug).slice(0, 3);
  const otherLocations = getPopularLocationsForRole(role.slug).filter(l => l.slug !== location.slug).slice(0, 3);

  const pageUrl = `https://indeedflex.com/career-hub/locations/${location.slug}/${role.slug}`;
  const pageTitle = `${role.title} Jobs in ${location.city}, ${location.stateCode}`;
  const pageDescription = `Find ${role.title} jobs in ${location.city}, ${location.stateCode}. Earn $${localSalary.min}-$${localSalary.max}/hr${tipsRange ? ` plus $${tipsRange.min}-$${tipsRange.max}/hr in tips` : ''}. ${jobCount}+ positions available with Indeed Flex.`;

  // FAQ data for schema
  const faqData = [
    {
      question: `How much do ${role.title}s make in ${location.city}?`,
      answer: `${role.title}s in ${location.city}, ${location.stateCode} earn $${localSalary.min}-$${localSalary.max} per hour${tipsRange ? `, plus an additional $${tipsRange.min}-$${tipsRange.max} per hour in tips` : ''}. Annual earnings can range from $${(localSalary.min * 2080).toLocaleString()} to $${(localSalary.max * 2080).toLocaleString()} for full-time work.`
    },
    {
      question: `What certifications do I need to work as a ${role.title} in ${location.state}?`,
      answer: certifications.length > 0 
        ? `In ${location.state}, ${role.title}s typically need: ${certifications.join(', ')}. Indeed Flex can help you obtain these certifications.`
        : `No specific certifications are required to work as a ${role.title} in ${location.state}, though food handler or safety certifications may be preferred by some employers.`
    },
    {
      question: `When is the best time to find ${role.title} work in ${location.city}?`,
      answer: `Peak hiring seasons for ${role.title}s in ${location.city} include: ${peakSeasons.join(', ')}. During these periods, demand increases significantly and you may find higher-paying shifts available.`
    }
  ];

  const demandBadgeColor = demandLevel === 'high' ? 'bg-success text-success-foreground' : demandLevel === 'medium' ? 'bg-warning text-warning-foreground' : 'bg-muted text-muted-foreground';

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOMetaTags
        title={pageTitle}
        description={pageDescription}
        canonical={pageUrl}
        keywords={generateKeywords(
          ["temp work", "flexible jobs", "hourly work"],
          location.city,
          role.title,
          role.industry
        )}
        geoRegion={`US-${location.stateCode}`}
        geoPlacename={location.city}
      />

      {/* Structured Data */}
      <JobPostingSchema
        title={`${role.title} - Flexible Shifts`}
        description={`${role.description} Work flexible shifts in ${location.city}, ${location.state}.`}
        employmentType={["TEMPORARY", "PART_TIME", "FULL_TIME"]}
        hiringOrganization={{
          name: "Indeed Flex",
          url: "https://indeedflex.com"
        }}
        jobLocation={{
          city: location.city,
          state: location.state,
          stateCode: location.stateCode,
          country: location.country
        }}
        baseSalary={{
          currency: location.country === 'US' ? 'USD' : 'GBP',
          minValue: localSalary.min,
          maxValue: localSalary.max,
          unitText: "HOUR"
        }}
        skills={role.skills}
        qualifications={role.requirements}
        responsibilities={role.responsibilities}
        industry={role.industry}
        directApply={true}
      />

      <OccupationSchema
        name={role.title}
        description={role.description}
        estimatedSalary={{
          currency: location.country === 'US' ? 'USD' : 'GBP',
          minValue: localSalary.min,
          maxValue: localSalary.max,
          unitText: "HOUR"
        }}
        occupationLocation={{ type: "City", name: location.city }}
        skills={role.skills}
        responsibilities={role.responsibilities}
        qualifications={role.requirements}
      />

      <FAQSchema questions={faqData} />

      <WebPageSchema
        name={pageTitle}
        description={pageDescription}
        url={pageUrl}
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: location.city, url: `https://indeedflex.com/career-hub/locations/${location.slug}` },
          { name: role.title }
        ]}
      />

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Locations", href: "/career-hub" },
            { label: location.city, href: `/career-hub/locations/${location.slug}` },
            { label: role.title }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className={demandBadgeColor}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {demandLevel.charAt(0).toUpperCase() + demandLevel.slice(1)} Demand
                </Badge>
                <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
                  <Briefcase className="h-3 w-3 mr-1" />
                  {jobCount}+ Open Positions
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {role.title} Jobs in {location.city}, {location.stateCode}
              </h1>
              
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl">
                {role.shortDescription}. Find flexible {role.title.toLowerCase()} shifts in {location.city} with competitive pay and immediate start dates.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-1">
                    <DollarSign className="h-4 w-4" />
                    Hourly Rate
                  </div>
                  <div className="text-2xl font-bold">
                    ${localSalary.min}-${localSalary.max}
                  </div>
                </div>
                
                {tipsRange && (
                  <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4">
                    <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-1">
                      <Star className="h-4 w-4" />
                      Tips
                    </div>
                    <div className="text-2xl font-bold">
                      +${tipsRange.min}-${tipsRange.max}/hr
                    </div>
                  </div>
                )}
                
                <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-1">
                    <MapPin className="h-4 w-4" />
                    Location
                  </div>
                  <div className="text-2xl font-bold">
                    {location.city}
                  </div>
                </div>
                
                <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-1">
                    <Clock className="h-4 w-4" />
                    Timezone
                  </div>
                  <div className="text-2xl font-bold">
                    {location.timezone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Key Facts Block - GEO Optimized */}
                <Card className="border-accent/50 bg-accent/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-accent" />
                      Key Facts: {role.title} in {location.city}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span><strong>Average hourly rate:</strong> ${localSalary.min}-${localSalary.max}/hr{tipsRange ? ` (excluding tips of $${tipsRange.min}-${tipsRange.max}/hr)` : ''}</span>
                      </li>
                      {certifications.length > 0 && (
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                          <span><strong>Required certification:</strong> {certifications[0]}</span>
                        </li>
                      )}
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span><strong>Peak hiring seasons:</strong> {peakSeasons.slice(0, 2).join(', ')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span><strong>Job availability:</strong> {jobCount}+ flexible shifts currently available</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* About This Role */}
                <Card>
                  <CardHeader>
                    <CardTitle>About {role.title} Jobs in {location.city}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {role.description}
                    </p>
                    <p className="text-muted-foreground">
                      In {location.city}, {location.state}, {role.title.toLowerCase()}s are in {demandLevel} demand. 
                      {location.country === 'US' && location.stateCode === 'TX' && ' Texas has no state income tax, meaning you keep more of your earnings.'}
                      {location.country === 'US' && location.stateCode === 'TN' && ' Tennessee has no state income tax on wages, maximizing your take-home pay.'}
                    </p>
                  </CardContent>
                </Card>

                {/* Responsibilities */}
                <Card>
                  <CardHeader>
                    <CardTitle>What You'll Do</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {role.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Skills & Requirements */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Skills Needed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {role.requirements.slice(0, 4).map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Certifications */}
                {certifications.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-accent" />
                        Certifications for {location.state}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {certifications.map((cert, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                            <span>{cert}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-sm text-muted-foreground">
                        Indeed Flex can help you obtain these certifications. Many shifts are available while you complete the requirements.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Local Insights */}
                {localInsights.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Why Work in {location.city}?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {localInsights.map((insight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Lightbulb className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* CTA Card */}
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Start Working Today</h3>
                    <p className="text-primary-foreground/90 mb-4">
                      Download Indeed Flex and find {role.title.toLowerCase()} shifts in {location.city}.
                    </p>
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                      <a href="https://indeedflex.onelink.me/4jvh/x7l4jms3" target="_blank" rel="noopener noreferrer">
                        Get the App
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Peak Seasons */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Peak Seasons
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {peakSeasons.map((season, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <TrendingUp className="h-4 w-4 text-success" />
                          {season}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Top Employers */}
                {topEmployers.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Top Employers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {topEmployers.slice(0, 5).map((employer, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {employer}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Links */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Explore More</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Link 
                      to={`/career-hub/roles/${role.slug}`}
                      className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors"
                    >
                      <span className="text-sm">All {role.title} Jobs</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link 
                      to={`/career-hub/locations/${location.slug}`}
                      className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors"
                    >
                      <span className="text-sm">All Jobs in {location.city}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link 
                      to="/career-hub/tools/pay-calculator"
                      className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors"
                    >
                      <span className="text-sm">Pay Calculator</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <FAQSection 
              title={`${role.title} Jobs in ${location.city}: FAQ`}
              faqs={[
                {
                  question: `How much do ${role.title}s make in ${location.city}?`,
                  answer: `${role.title}s in ${location.city}, ${location.stateCode} earn $${localSalary.min}-$${localSalary.max} per hour${tipsRange ? `, plus an additional $${tipsRange.min}-$${tipsRange.max} per hour in tips` : ''}. With Indeed Flex, you can pick up shifts that fit your schedule and start earning immediately.`
                },
                {
                  question: `What certifications do I need to work as a ${role.title} in ${location.state}?`,
                  answer: certifications.length > 0 
                    ? `In ${location.state}, ${role.title}s typically need: ${certifications.join(', ')}. Indeed Flex partners can help you obtain these certifications, and many shifts are available while you complete requirements.`
                    : `No specific certifications are required to work as a ${role.title} in ${location.state}. Some employers may prefer food handler or safety certifications, but training is often provided on the job.`
                },
                {
                  question: `When is the best time to find ${role.title} work in ${location.city}?`,
                  answer: `Peak hiring seasons for ${role.title}s in ${location.city} include: ${peakSeasons.join(', ')}. During these periods, more shifts are available and pay rates may be higher due to increased demand.`
                },
                {
                  question: `How quickly can I start working as a ${role.title} in ${location.city}?`,
                  answer: `With Indeed Flex, you can start working within days of signing up. Download the app, complete your profile, and browse available ${role.title.toLowerCase()} shifts in ${location.city}. Many employers offer same-day or next-day start dates.`
                },
                ...role.faqs.slice(0, 2)
              ]}
            />
          </div>
        </section>

        {/* Related Roles in This Location */}
        {otherRoles.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Other Jobs in {location.city}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {otherRoles.map(r => (
                  <RoleCard key={r.id} role={r} linkPrefix={`/career-hub/locations/${location.slug}`} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Same Role in Other Locations */}
        {otherLocations.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">{role.title} Jobs in Other Cities</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {otherLocations.map(loc => (
                  <Link key={loc.id} to={`/career-hub/locations/${loc.slug}/${role.slug}`}>
                    <Card className="hover:shadow-lg transition-shadow h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">{loc.city}, {loc.stateCode}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {role.title} positions available
                        </p>
                        <div className="flex items-center text-sm text-primary">
                          View Jobs <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection />
      </Layout>
    </>
  );
};

export default LocationRolePage;
