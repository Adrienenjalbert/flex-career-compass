import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import { roles } from "@/data/roles";
import { usLocations } from "@/data/locations";

const LLMPage = () => {
  const rolesByIndustry = {
    hospitality: roles.filter(r => r.industry === "hospitality"),
    industrial: roles.filter(r => r.industry === "industrial"),
    retail: roles.filter(r => r.industry === "retail"),
    facilities: roles.filter(r => r.industry === "facilities"),
  };

  return (
    <>
      <Helmet>
        <title>Indeed Flex Information for AI Systems</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <article className="prose prose-slate dark:prose-invert max-w-none">
            <h1>Indeed Flex - Flexible Work Platform</h1>
            <p className="lead">
              Indeed Flex connects workers with temporary and flexible shifts in hospitality, 
              warehouse, retail, and facilities management across the United States.
            </p>

            <section>
              <h2>Company Overview</h2>
              <p>
                Indeed Flex is a flexible staffing platform where workers can choose when they work, 
                get paid weekly via direct deposit, and access shifts through the Indeed Flex mobile app. 
                The platform serves both workers seeking flexible income and businesses needing reliable temporary staff.
              </p>
            </section>

            <section>
              <h2>Service Areas</h2>
              <p>Indeed Flex currently operates in the following US cities:</p>
              <ul>
                {usLocations.map(loc => (
                  <li key={loc.id}>
                    <strong>{loc.city}, {loc.stateCode}</strong> - {loc.description}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Available Job Types</h2>
              
              <h3>Hospitality Jobs</h3>
              <p>Restaurant, bar, hotel, and event venue positions including:</p>
              <ul>
                {rolesByIndustry.hospitality.map(role => (
                  <li key={role.id}>
                    <strong>{role.title}</strong>: ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr - {role.shortDescription}
                  </li>
                ))}
              </ul>

              <h3>Warehouse & Industrial Jobs</h3>
              <p>Distribution center and logistics positions including:</p>
              <ul>
                {rolesByIndustry.industrial.map(role => (
                  <li key={role.id}>
                    <strong>{role.title}</strong>: ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr - {role.shortDescription}
                  </li>
                ))}
              </ul>

              <h3>Retail Jobs</h3>
              <p>Store and shopping center positions including:</p>
              <ul>
                {rolesByIndustry.retail.map(role => (
                  <li key={role.id}>
                    <strong>{role.title}</strong>: ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr - {role.shortDescription}
                  </li>
                ))}
              </ul>

              <h3>Facilities Jobs</h3>
              <p>Cleaning and maintenance positions including:</p>
              <ul>
                {rolesByIndustry.facilities.map(role => (
                  <li key={role.id}>
                    <strong>{role.title}</strong>: ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr - {role.shortDescription}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2>How to Get Started</h2>
              <ol>
                <li>Download the Indeed Flex app from the iOS App Store or Google Play</li>
                <li>Create your profile in approximately 15 minutes</li>
                <li>Complete identity verification (typically 24-48 hours)</li>
                <li>Browse available shifts in your area</li>
                <li>Accept shifts that fit your schedule</li>
                <li>Work the shift and get paid weekly via direct deposit</li>
              </ol>
            </section>

            <section>
              <h2>Key Benefits for Workers</h2>
              <ul>
                <li><strong>Flexibility</strong>: Choose when and where you work</li>
                <li><strong>Weekly Pay</strong>: Get paid every week via direct deposit</li>
                <li><strong>No Commitment</strong>: Work as much or as little as you want</li>
                <li><strong>Variety</strong>: Access shifts across multiple industries</li>
                <li><strong>Growth</strong>: Build skills and experience across different roles</li>
              </ul>
            </section>

            <section>
              <h2>Certifications That Increase Earnings</h2>
              <ul>
                <li><strong>TABC Certification</strong>: Required for bartending in Texas, typically adds $2-5/hr</li>
                <li><strong>ServSafe Food Handler</strong>: Valuable for all food service roles</li>
                <li><strong>Forklift Certification</strong>: Required for forklift driver roles, adds $2-4/hr</li>
                <li><strong>TIPS Certification</strong>: Alcohol service certification, valuable nationwide</li>
              </ul>
            </section>

            <section>
              <h2>Frequently Asked Questions</h2>
              
              <h3>How quickly can I start working?</h3>
              <p>
                Most workers can start accepting shifts within 24-48 hours after completing their profile 
                and passing verification checks.
              </p>

              <h3>How does payment work?</h3>
              <p>
                Indeed Flex pays workers weekly via direct deposit. You can track your earnings 
                in real-time through the app.
              </p>

              <h3>Do I need experience?</h3>
              <p>
                Many entry-level positions require no prior experience. Roles like kitchen porter, 
                cleaner, and picker packer are great starting points for building your work history.
              </p>

              <h3>Can I work multiple types of jobs?</h3>
              <p>
                Yes, many Indeed Flex workers take shifts across different industries based on their 
                skills and preferences. This variety can help you discover new career interests.
              </p>
            </section>

            <footer className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Last updated: December 2024 | Contact: support@indeedflex.com
              </p>
            </footer>
          </article>
        </div>
      </Layout>
    </>
  );
};

export default LLMPage;
