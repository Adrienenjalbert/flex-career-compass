export interface CertificationProvider {
  name: string;
  url: string;
  cost: string;
  duration: string;
  accredited: boolean;
  description?: string;
}

export interface Certification {
  name: string;
  slug: string;
  category: 'hospitality' | 'warehouse' | 'universal';
  description: string;
  requirements: string[];
  validityPeriod: string;
  payIncrease: string;
  providers: CertificationProvider[];
  stateSpecific?: boolean;
}

export const certifications: Certification[] = [
  // Hospitality Certifications
  {
    name: "Food Handler's Permit",
    slug: "food-handler",
    category: "hospitality",
    description: "Required certification for anyone handling food in a commercial setting. Covers food safety, proper storage, and contamination prevention.",
    requirements: [
      "Must be 18 years or older (some states allow 16+)",
      "Complete online or in-person training",
      "Pass a proctored exam"
    ],
    validityPeriod: "2-5 years (varies by state)",
    payIncrease: "Required for food roles - unlocks $15+/hr positions",
    stateSpecific: true,
    providers: [
      {
        name: "ServSafe Food Handler",
        url: "https://www.servsafe.com/ServSafe-Food-Handler",
        cost: "$15-18",
        duration: "1.5-2 hours",
        accredited: true,
        description: "Industry-standard certification accepted nationwide"
      },
      {
        name: "StateFoodSafety",
        url: "https://www.statefoodsafety.com/food-handler",
        cost: "$10-15",
        duration: "2-4 hours",
        accredited: true,
        description: "State-specific training with fast certification"
      },
      {
        name: "eFoodHandlers",
        url: "https://www.efoodhandlers.com/",
        cost: "$10-15",
        duration: "2 hours",
        accredited: true,
        description: "ANSI-accredited online training"
      }
    ]
  },
  {
    name: "TIPS Alcohol Certification",
    slug: "tips-alcohol",
    category: "hospitality",
    description: "Training for Intervention ProcedureS (TIPS) - the gold standard for responsible alcohol service training.",
    requirements: [
      "Must be 18 years or older",
      "Complete online training",
      "Pass certification exam with 70%+"
    ],
    validityPeriod: "3 years",
    payIncrease: "+$5-10/hr by unlocking bartending roles",
    providers: [
      {
        name: "TIPS Online Training",
        url: "https://www.gettips.com/",
        cost: "$38-55",
        duration: "3-4 hours",
        accredited: true,
        description: "Original TIPS certification, recognized worldwide"
      },
      {
        name: "ServSafe Alcohol",
        url: "https://www.servsafe.com/servsafe-alcohol",
        cost: "$22-35",
        duration: "2-4 hours",
        accredited: true,
        description: "National Restaurant Association certified program"
      },
      {
        name: "TABC Certification (Texas)",
        url: "https://www.tabc.texas.gov/certificates-permits/",
        cost: "$10-15",
        duration: "2 hours",
        accredited: true,
        description: "Texas-specific alcohol certification"
      }
    ]
  },
  {
    name: "Food Manager Certification",
    slug: "food-manager",
    category: "hospitality",
    description: "Advanced food safety certification for supervisory roles in food service establishments.",
    requirements: [
      "Recommended: Prior food handling experience",
      "Complete 8-16 hour training course",
      "Pass proctored exam"
    ],
    validityPeriod: "5 years",
    payIncrease: "Opens supervisor roles ($45K+ annually)",
    providers: [
      {
        name: "ServSafe Manager",
        url: "https://www.servsafe.com/ServSafe-Manager",
        cost: "$170-190",
        duration: "8-16 hours",
        accredited: true,
        description: "Industry-leading certification for food safety managers"
      },
      {
        name: "Prometric Food Protection Manager",
        url: "https://www.prometric.com/food-protection-manager",
        cost: "$100-150",
        duration: "8 hours",
        accredited: true,
        description: "ANSI-CFP accredited certification"
      }
    ]
  },
  // Warehouse Certifications
  {
    name: "Forklift Operator Certification",
    slug: "forklift",
    category: "warehouse",
    description: "OSHA-required certification for operating powered industrial trucks. One of the best ROI certifications for warehouse workers.",
    requirements: [
      "Must be 18 years or older",
      "Complete classroom training",
      "Pass hands-on evaluation",
      "Employer must verify competency"
    ],
    validityPeriod: "3 years (employer-dependent)",
    payIncrease: "+$3-5/hr over general labor",
    providers: [
      {
        name: "OSHA Education Center",
        url: "https://www.oshaeducationcenter.com/forklift-training/",
        cost: "$60-100",
        duration: "4-8 hours",
        accredited: true,
        description: "Classroom + hands-on forklift certification"
      },
      {
        name: "ForkliftCertification.com",
        url: "https://www.forkliftcertification.com/",
        cost: "$59-299",
        duration: "1-2 hours online + hands-on",
        accredited: true,
        description: "OSHA-compliant online training with on-site evaluation"
      },
      {
        name: "Local Community College",
        url: "https://www.careeronestop.org/LocalHelp/local-help.aspx",
        cost: "$50-200",
        duration: "1 day",
        accredited: true,
        description: "In-person training with hands-on experience"
      }
    ]
  },
  {
    name: "OSHA 10-Hour General Industry",
    slug: "osha-10",
    category: "warehouse",
    description: "Entry-level safety certification covering workplace hazards, rights, and employer responsibilities.",
    requirements: [
      "No prerequisites",
      "Complete 10 hours of training",
      "Can be done online at your own pace"
    ],
    validityPeriod: "No expiration (but refresher recommended every 5 years)",
    payIncrease: "+$1-2/hr, significantly more job access",
    providers: [
      {
        name: "OSHA Education Center",
        url: "https://www.oshaeducationcenter.com/",
        cost: "$25-89",
        duration: "10 hours",
        accredited: true,
        description: "Official DOL OSHA Outreach Training"
      },
      {
        name: "360training",
        url: "https://www.360training.com/osha-training",
        cost: "$25-59",
        duration: "10 hours",
        accredited: true,
        description: "Online self-paced OSHA training"
      },
      {
        name: "CareerSafe",
        url: "https://www.careersafeonline.com/",
        cost: "$25-50",
        duration: "10 hours",
        accredited: true,
        description: "Student-focused OSHA training programs"
      }
    ]
  },
  {
    name: "Reach Truck/Order Picker Certification",
    slug: "reach-truck",
    category: "warehouse",
    description: "Specialized certification for high-reach warehouse equipment including reach trucks, order pickers, and cherry pickers.",
    requirements: [
      "Must be 18 years or older",
      "Basic forklift knowledge recommended",
      "Complete classroom and hands-on training"
    ],
    validityPeriod: "3 years",
    payIncrease: "+$2-4/hr over standard forklift",
    providers: [
      {
        name: "OSHA Education Center",
        url: "https://www.oshaeducationcenter.com/forklift-training/",
        cost: "$75-150",
        duration: "4-8 hours",
        accredited: true,
        description: "Specialized equipment certification"
      },
      {
        name: "Your Local Forklift Dealer",
        url: "https://www.forkliftamerica.com/training",
        cost: "$100-200",
        duration: "4-8 hours",
        accredited: true,
        description: "Equipment-specific training from dealers"
      }
    ]
  },
  // Universal Certifications
  {
    name: "CPR/First Aid/AED Certification",
    slug: "cpr-first-aid",
    category: "universal",
    description: "Life-saving skills certification covering CPR, basic first aid, and automated external defibrillator (AED) use.",
    requirements: [
      "No prerequisites",
      "Complete training course",
      "Demonstrate practical skills",
      "Pass written exam"
    ],
    validityPeriod: "2 years",
    payIncrease: "Modest, but increases job access significantly",
    providers: [
      {
        name: "American Red Cross",
        url: "https://www.redcross.org/take-a-class/cpr",
        cost: "$90-110",
        duration: "4-6 hours",
        accredited: true,
        description: "Gold standard certification recognized everywhere"
      },
      {
        name: "American Heart Association",
        url: "https://cpr.heart.org/",
        cost: "$50-100",
        duration: "3-4 hours",
        accredited: true,
        description: "Medical-grade CPR certification"
      },
      {
        name: "National Safety Council",
        url: "https://www.nsc.org/safety-training/first-aid",
        cost: "$60-90",
        duration: "4-6 hours",
        accredited: true,
        description: "Workplace-focused first aid training"
      }
    ]
  },
  {
    name: "Customer Service Certification",
    slug: "customer-service",
    category: "universal",
    description: "Professional certification demonstrating customer service skills, communication, and conflict resolution abilities.",
    requirements: [
      "No prerequisites",
      "Complete online coursework",
      "Pass certification exam"
    ],
    validityPeriod: "No expiration",
    payIncrease: "Demonstrates professionalism, opens more opportunities",
    providers: [
      {
        name: "HDI Customer Service Representative",
        url: "https://www.thinkhdi.com/education/courses/hdi-customer-service-representative",
        cost: "$195-295",
        duration: "1-2 days",
        accredited: true,
        description: "Industry-recognized customer service certification"
      },
      {
        name: "LinkedIn Learning",
        url: "https://www.linkedin.com/learning/topics/customer-service",
        cost: "$29.99/month",
        duration: "Self-paced",
        accredited: false,
        description: "Various customer service courses with certificates"
      },
      {
        name: "Coursera Customer Service Fundamentals",
        url: "https://www.coursera.org/professional-certificates/customer-service",
        cost: "$39/month",
        duration: "1-2 months",
        accredited: false,
        description: "University-backed customer service training"
      }
    ]
  }
];

// Helper functions
export const getCertificationsByCategory = (category: Certification['category']) => {
  return certifications.filter(cert => cert.category === category);
};

export const getCertificationBySlug = (slug: string) => {
  return certifications.find(cert => cert.slug === slug);
};

export const getHospitalityCertifications = () => getCertificationsByCategory('hospitality');
export const getWarehouseCertifications = () => getCertificationsByCategory('warehouse');
export const getUniversalCertifications = () => getCertificationsByCategory('universal');
