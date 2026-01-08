import { useParams } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import RoleCard from "@/components/career-hub/RoleCard";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { SEOMetaTags } from "@/components/career-hub/seo";
import { roles, industries, getRolesByIndustry } from "@/data/roles";
import { UtensilsCrossed, Warehouse, ShoppingBag, Building2 } from "lucide-react";

const iconMap = {
  hospitality: UtensilsCrossed,
  industrial: Warehouse,
  retail: ShoppingBag,
  facilities: Building2,
};

const industryContent: Record<string, {
  title: string;
  description: string;
  heroDescription: string;
  faqs: { question: string; answer: string }[];
}> = {
  hospitality: {
    title: "Hospitality Jobs",
    description: "Bartending, serving, kitchen work, and more in restaurants, bars, and hotels.",
    heroDescription: "Explore flexible hospitality careers in bars, restaurants, hotels, and event venues. From bartending to kitchen work, find roles that match your skills and schedule.",
    faqs: [
      { question: "What hospitality jobs are available through Indeed Flex?", answer: "Indeed Flex offers roles including bartender, barista, barback, waiting staff, chef de partie, commis chef, kitchen porter, and general event staff." },
      { question: "Do I need experience for hospitality work?", answer: "Many entry-level roles like barback and kitchen porter require no prior experience. Customer service experience is helpful for front-of-house positions." },
      { question: "What certifications help in hospitality?", answer: "TIPS or ServSafe certification for bartending, food handler permits, and barista training can help you access more roles and higher pay." },
    ]
  },
  industrial: {
    title: "Industrial & Warehouse Jobs",
    description: "Picking, packing, forklift operation, and delivery across distribution centers.",
    heroDescription: "Find warehouse and logistics work in distribution centers across the US. From picker/packer roles to forklift operation, access flexible shifts that fit your schedule.",
    faqs: [
      { question: "What warehouse jobs are available?", answer: "Indeed Flex offers picker/packer, warehouse operative, forklift driver, delivery driver, food production operative, and loader/crew positions." },
      { question: "Do I need a forklift license?", answer: "Forklift driver roles require certification, but many general warehouse roles don't. Forklift training is available and can increase your earning potential." },
      { question: "What are typical warehouse shift times?", answer: "Warehouses typically offer day shifts (6am-2pm), evening shifts (2pm-10pm), and overnight shifts (10pm-6am), with flexibility based on the facility." },
    ]
  },
  retail: {
    title: "Retail Jobs",
    description: "Customer service, merchandising, and sales in stores and shopping centers.",
    heroDescription: "Discover flexible retail opportunities in stores, shopping centers, and supermarkets. From sales associate to merchandiser, find work that fits your lifestyle.",
    faqs: [
      { question: "What retail positions are available?", answer: "Indeed Flex offers retail assistant, merchandiser, home delivery driver, and replenishment assistant roles across various retail environments." },
      { question: "Do retail roles require experience?", answer: "Many entry-level retail positions require no prior experience, though customer service experience is valued for sales-focused roles." },
      { question: "What are typical retail hours?", answer: "Retail shifts typically run during store hours, with morning, afternoon, and evening availability. Weekends and holidays are often busy periods." },
    ]
  },
  facilities: {
    title: "Facilities Management Jobs",
    description: "Cleaning, housekeeping, and maintenance in commercial and hospitality venues.",
    heroDescription: "Find cleaning and housekeeping work in hotels, offices, and commercial facilities. Flexible shifts available for cleaners and housekeepers across multiple locations.",
    faqs: [
      { question: "What facilities jobs are available?", answer: "Indeed Flex offers cleaner and housekeeper positions in hotels, offices, commercial buildings, and event venues." },
      { question: "What equipment do I need?", answer: "Most employers provide all cleaning supplies, equipment, and protective gear. You typically just need appropriate clothing and footwear." },
      { question: "Are there day and evening shifts?", answer: "Yes, facilities work is available in various shifts. Office cleaning often happens in evenings, while hotel housekeeping is typically during daytime hours." },
    ]
  },
};

const IndustryPage = () => {
  const { industryId } = useParams<{ industryId: string }>();
  const industry = industries.find(i => i.id === industryId);
  const industryRoles = getRolesByIndustry(industryId || "");
  const content = industryContent[industryId || ""];
  const Icon = iconMap[industryId as keyof typeof iconMap] || Warehouse;

  if (!industry || !content) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Industry not found</h1>
        </div>
      </Layout>
    );
  }

  // Generate comprehensive schema
  const industrySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": content.title,
    "description": content.heroDescription,
    "numberOfItems": industryRoles.length,
    "itemListElement": industryRoles.map((role, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Occupation",
        "name": role.title,
        "description": role.description,
        "occupationLocation": {
          "@type": "Country",
          "name": "United States"
        }
      }
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <SEOMetaTags
        title={`${content.title} | Indeed Flex Career Hub`}
        description={content.heroDescription}
        canonical={`https://indeedflex.com/career-hub/industries/${industryId}`}
        keywords={[
          content.title.toLowerCase(),
          `${industryId} jobs`,
          'flexible work',
          'temp jobs',
          'indeed flex',
          ...industryRoles.slice(0, 5).map(r => r.title.toLowerCase())
        ]}
      />
      <script type="application/ld+json">
        {JSON.stringify(industrySchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Industries", href: "/career-hub" },
            { label: content.title }
          ]} />
        </div>

        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary-foreground/10 rounded-full">
                  <Icon className="h-10 w-10 text-accent" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {content.title}
              </h1>
              <p className="text-xl text-primary-foreground/90">
                {content.heroDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Roles Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Available Roles in {content.title.replace(" Jobs", "")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {industryRoles.map((role) => (
                <RoleCard key={role.id} role={role} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4 max-w-3xl">
            <FAQSection faqs={content.faqs} title={`${content.title} FAQs`} />
          </div>
        </section>

        {/* Internal Link Hub for SEO */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <InternalLinkHub variant="footer" currentPage={{ type: 'industry', industry: industryId }} />
          </div>
        </section>

        <CTASection 
          title={`Find ${content.title.replace(" Jobs", "")} Shifts Today`}
          subtitle="Download Indeed Flex and start picking up shifts in your area."
        />
      </Layout>
    </>
  );
};

export default IndustryPage;
