import { ExternalLink, Building2, FileText, GraduationCap, Briefcase, Heart, DollarSign, LucideIcon } from "lucide-react";

export interface ExternalResource {
  name: string;
  url: string;
  description: string;
  icon?: LucideIcon;
}

export interface ResourceCategory {
  title: string;
  icon: LucideIcon;
  resources: ExternalResource[];
}

// Government assistance resources
export const governmentResources: ExternalResource[] = [
  {
    name: "211 Helpline",
    url: "https://211.org",
    description: "Free, confidential help with bills, food, housing, and more. Call or text 211 anytime.",
    icon: Heart
  },
  {
    name: "USA.gov Benefits Finder",
    url: "https://www.usa.gov/benefit-finder",
    description: "Answer a few questions to find government programs you may qualify for.",
    icon: Building2
  },
  {
    name: "SNAP Food Assistance",
    url: "https://www.fns.usda.gov/snap/recipient/eligibility",
    description: "Supplemental Nutrition Assistance Program helps eligible people buy food.",
    icon: Heart
  },
  {
    name: "CareerOneStop",
    url: "https://www.careeronestop.org",
    description: "Free career exploration, training, and job search resources from the U.S. Department of Labor.",
    icon: Briefcase
  },
  {
    name: "Benefits.gov",
    url: "https://www.benefits.gov",
    description: "Official benefits website to find government benefits you may be eligible to receive.",
    icon: Building2
  }
];

// Tax resources
export const taxResources: ExternalResource[] = [
  {
    name: "IRS VITA Program",
    url: "https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers",
    description: "Free tax preparation for those earning $67,000 or less. Call 800-906-9887 for locations.",
    icon: FileText
  },
  {
    name: "IRS Free File",
    url: "https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free",
    description: "Free online tax filing for incomes under $84,000 through IRS partner companies.",
    icon: FileText
  },
  {
    name: "IRS Direct Pay",
    url: "https://www.irs.gov/payments",
    description: "Pay federal taxes directly from your bank account. No fees, secure, and instant confirmation.",
    icon: DollarSign
  },
  {
    name: "Estimated Tax Payments (Form 1040-ES)",
    url: "https://www.irs.gov/forms-pubs/about-form-1040-es",
    description: "Calculate and pay quarterly estimated taxes for self-employment income.",
    icon: FileText
  }
];

// Healthcare resources
export const healthcareResources: ExternalResource[] = [
  {
    name: "Healthcare.gov",
    url: "https://www.healthcare.gov",
    description: "Find ACA marketplace plans with subsidies based on income. Open enrollment Nov-Jan.",
    icon: Heart
  },
  {
    name: "Medicaid Eligibility",
    url: "https://www.medicaid.gov/medicaid/eligibility/index.html",
    description: "Check if you qualify for free or low-cost health coverage through Medicaid.",
    icon: Heart
  },
  {
    name: "Community Health Centers",
    url: "https://findahealthcenter.hrsa.gov",
    description: "Find affordable healthcare services near you, regardless of ability to pay.",
    icon: Heart
  }
];

// Certification providers (verified)
export const certificationResources: ExternalResource[] = [
  {
    name: "ServSafe Food Handler",
    url: "https://www.servsafe.com",
    description: "Industry-standard food safety certification. $15-18 for Food Handler, unlocks hospitality roles.",
    icon: GraduationCap
  },
  {
    name: "TIPS Alcohol Training",
    url: "https://www.gettips.com",
    description: "Alcohol service certification. $38-55, often required for bartending. Can increase pay $5-10/hr.",
    icon: GraduationCap
  },
  {
    name: "OSHA Education Center",
    url: "https://www.oshaeducationcenter.com",
    description: "OSHA 10 & 30 hour certifications. $25-89, adds $1-3/hr for warehouse and industrial roles.",
    icon: GraduationCap
  },
  {
    name: "National Forklift Training",
    url: "https://www.osha.gov/training/outreach",
    description: "Forklift certification typically $60-150, increases pay by $3-5/hr in warehouse roles.",
    icon: GraduationCap
  },
  {
    name: "American Red Cross",
    url: "https://www.redcross.org/take-a-class",
    description: "First Aid/CPR certification. $25-90, valuable across industries and for personal safety.",
    icon: GraduationCap
  }
];

// Financial tools and apps
export const financialToolResources: ExternalResource[] = [
  {
    name: "Stride (Mileage Tracking)",
    url: "https://www.stridehealth.com",
    description: "Free mileage and expense tracking app designed for gig workers. Also helps find health insurance.",
    icon: DollarSign
  },
  {
    name: "YNAB (Budgeting)",
    url: "https://www.ynab.com",
    description: "Zero-based budgeting app great for irregular income. 34-day free trial.",
    icon: DollarSign
  },
  {
    name: "NerdWallet (Financial Advice)",
    url: "https://www.nerdwallet.com",
    description: "Compare financial products, calculators, and educational content on personal finance.",
    icon: DollarSign
  },
  {
    name: "Fidelity (Retirement)",
    url: "https://www.fidelity.com",
    description: "No-minimum IRAs with excellent low-cost index funds. Easy to open and manage.",
    icon: DollarSign
  }
];

// Indeed Flex specific links
export const indeedFlexLinks = {
  download: {
    name: "Download Indeed Flex",
    url: "https://indeedflex.com/download-app/",
    description: "Get the Indeed Flex app to find flexible shifts that fit your schedule."
  },
  benefits: {
    name: "Indeed Flex Benefits",
    url: "https://indeedflex.com/benefits-pay/",
    description: "Learn about medical benefits, rewards, and perks available to Flexers."
  },
  sameDayPay: {
    name: "Same Day Pay",
    url: "https://indeedflex.com/benefits-pay/same-day-pay/",
    description: "Access up to 50% of your earnings within 1 hour of completing a shift."
  },
  howItWorks: {
    name: "How Indeed Flex Works",
    url: "https://indeedflex.com/how-the-app-works/",
    description: "See how to find shifts, get verified, and start earning with Indeed Flex."
  },
  roles: {
    name: "Available Roles",
    url: "https://indeedflex.com/roles-and-industries/",
    description: "Explore industrial, hospitality, retail, and clerical roles available on Indeed Flex."
  }
};

// Grouped resources by category for display
export const resourceCategories: ResourceCategory[] = [
  {
    title: "Government Assistance",
    icon: Building2,
    resources: governmentResources
  },
  {
    title: "Tax Help",
    icon: FileText,
    resources: taxResources
  },
  {
    title: "Healthcare",
    icon: Heart,
    resources: healthcareResources
  },
  {
    title: "Certifications",
    icon: GraduationCap,
    resources: certificationResources
  },
  {
    title: "Financial Tools",
    icon: DollarSign,
    resources: financialToolResources
  }
];

// Helper function to get resources by category
export const getResourcesByCategory = (category: 'government' | 'tax' | 'healthcare' | 'certifications' | 'financial'): ExternalResource[] => {
  switch (category) {
    case 'government':
      return governmentResources;
    case 'tax':
      return taxResources;
    case 'healthcare':
      return healthcareResources;
    case 'certifications':
      return certificationResources;
    case 'financial':
      return financialToolResources;
    default:
      return [];
  }
};
