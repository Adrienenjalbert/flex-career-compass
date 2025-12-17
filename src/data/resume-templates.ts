// Resume template data for hourly workers

export interface ResumeTemplate {
  industry: string;
  industryLabel: string;
  icon: string;
  skills: { category: string; items: string[] }[];
  summaryTemplates: { experienceLevel: 'none' | 'some' | 'experienced'; template: string }[];
  actionVerbs: string[];
  responsibilityPhrases: string[];
}

export const resumeTemplates: Record<string, ResumeTemplate> = {
  warehouse: {
    industry: 'warehouse',
    industryLabel: 'Warehouse & Industrial',
    icon: '📦',
    skills: [
      {
        category: 'Core Skills',
        items: [
          'Order picking and packing',
          'Inventory management',
          'Barcode scanning',
          'Forklift operation',
          'Pallet jack operation',
          'Loading/unloading trucks',
          'Quality control checks',
          'RF scanner proficiency',
        ],
      },
      {
        category: 'Physical Capabilities',
        items: [
          'Lift up to 50 lbs repeatedly',
          'Stand for 8+ hour shifts',
          'Fast-paced work environment',
          'Work in temperature-controlled environments',
        ],
      },
      {
        category: 'Soft Skills',
        items: [
          'Attention to detail',
          'Time management',
          'Team collaboration',
          'Following safety protocols',
          'Meeting productivity targets',
        ],
      },
    ],
    summaryTemplates: [
      {
        experienceLevel: 'none',
        template: 'Motivated and reliable individual seeking warehouse position. Quick learner with strong attention to detail, excellent physical stamina, and commitment to meeting productivity goals. Available for flexible shifts including nights and weekends.',
      },
      {
        experienceLevel: 'some',
        template: 'Dependable warehouse worker with [X] months of experience in fast-paced fulfillment environments. Skilled in order picking, packing, and inventory management. Consistently meets or exceeds daily productivity targets while maintaining quality standards.',
      },
      {
        experienceLevel: 'experienced',
        template: 'Experienced warehouse professional with [X]+ years in distribution and fulfillment operations. Expertise in inventory management, equipment operation, and team leadership. Track record of improving efficiency and maintaining safety compliance.',
      },
    ],
    actionVerbs: ['Picked', 'Packed', 'Loaded', 'Unloaded', 'Organized', 'Sorted', 'Verified', 'Processed', 'Maintained', 'Operated', 'Assembled', 'Inspected'],
    responsibilityPhrases: [
      'Picked and packed [X]+ orders per shift with 99%+ accuracy',
      'Operated pallet jack and other material handling equipment safely',
      'Maintained organized work area and followed safety protocols',
      'Met or exceeded daily productivity targets consistently',
      'Assisted with inventory counts and cycle counting',
      'Loaded and unloaded delivery trucks efficiently',
    ],
  },
  hospitality: {
    industry: 'hospitality',
    industryLabel: 'Hospitality & Food Service',
    icon: '🍽️',
    skills: [
      {
        category: 'Core Skills',
        items: [
          'Customer service excellence',
          'Food handling and safety',
          'Point of sale (POS) systems',
          'Cash handling',
          'Order taking',
          'Food preparation',
          'Beverage service',
          'Table service',
        ],
      },
      {
        category: 'Certifications',
        items: [
          'Food Handler\'s Card',
          'ServSafe Certification',
          'TIPS Alcohol Certification',
          'CPR/First Aid',
        ],
      },
      {
        category: 'Soft Skills',
        items: [
          'Friendly personality',
          'Multitasking ability',
          'Working under pressure',
          'Team collaboration',
          'Clear communication',
          'Problem resolution',
        ],
      },
    ],
    summaryTemplates: [
      {
        experienceLevel: 'none',
        template: 'Enthusiastic and personable individual seeking hospitality position. Strong customer service orientation, quick learner, and team player. Flexible availability including evenings, weekends, and holidays.',
      },
      {
        experienceLevel: 'some',
        template: 'Customer-focused hospitality professional with [X] months of experience delivering excellent guest experiences. Skilled in food service, cash handling, and maintaining clean work environments. Known for positive attitude and reliability.',
      },
      {
        experienceLevel: 'experienced',
        template: 'Dedicated hospitality professional with [X]+ years creating exceptional guest experiences. Expertise in food service operations, team training, and customer satisfaction. Proven ability to thrive in fast-paced environments.',
      },
    ],
    actionVerbs: ['Served', 'Prepared', 'Greeted', 'Assisted', 'Processed', 'Maintained', 'Coordinated', 'Resolved', 'Trained', 'Managed'],
    responsibilityPhrases: [
      'Provided friendly, efficient service to [X]+ guests per shift',
      'Maintained food safety and cleanliness standards',
      'Accurately processed cash and card transactions',
      'Resolved customer concerns promptly and professionally',
      'Collaborated with kitchen and service team during rush periods',
      'Trained new team members on procedures and standards',
    ],
  },
  retail: {
    industry: 'retail',
    industryLabel: 'Retail & Customer Service',
    icon: '🛍️',
    skills: [
      {
        category: 'Core Skills',
        items: [
          'Customer service',
          'Sales techniques',
          'Cash register operation',
          'Inventory stocking',
          'Visual merchandising',
          'Product knowledge',
          'Loss prevention awareness',
          'Returns processing',
        ],
      },
      {
        category: 'Technical Skills',
        items: [
          'Point of sale systems',
          'Inventory management software',
          'Mobile payment processing',
          'Barcode scanning',
        ],
      },
      {
        category: 'Soft Skills',
        items: [
          'Sales ability',
          'Active listening',
          'Product recommendations',
          'Upselling',
          'Conflict resolution',
          'Time management',
        ],
      },
    ],
    summaryTemplates: [
      {
        experienceLevel: 'none',
        template: 'Friendly and motivated individual seeking retail position. Natural people person with strong communication skills and eagerness to learn product knowledge. Available for flexible scheduling including weekends and holidays.',
      },
      {
        experienceLevel: 'some',
        template: 'Customer-focused retail associate with [X] months of experience in sales and service. Skilled in cash handling, inventory management, and creating positive shopping experiences. Consistently meets sales goals.',
      },
      {
        experienceLevel: 'experienced',
        template: 'Results-driven retail professional with [X]+ years of experience in sales and customer service. Proven track record of exceeding sales targets, building customer loyalty, and training team members.',
      },
    ],
    actionVerbs: ['Sold', 'Assisted', 'Processed', 'Merchandised', 'Stocked', 'Organized', 'Resolved', 'Recommended', 'Trained', 'Achieved'],
    responsibilityPhrases: [
      'Assisted [X]+ customers daily with product selection and purchases',
      'Processed sales transactions accurately and efficiently',
      'Maintained organized and visually appealing store displays',
      'Exceeded monthly sales targets by [X]%',
      'Stocked shelves and managed inventory levels',
      'Resolved customer complaints to ensure satisfaction',
    ],
  },
  facilities: {
    industry: 'facilities',
    industryLabel: 'Facilities & Cleaning',
    icon: '🧹',
    skills: [
      {
        category: 'Core Skills',
        items: [
          'Deep cleaning techniques',
          'Sanitization procedures',
          'Floor care (vacuuming, mopping, waxing)',
          'Window cleaning',
          'Restroom maintenance',
          'Trash removal',
          'Equipment operation',
          'Chemical handling',
        ],
      },
      {
        category: 'Safety & Compliance',
        items: [
          'OSHA safety awareness',
          'Chemical safety (SDS knowledge)',
          'PPE usage',
          'Biohazard cleanup',
        ],
      },
      {
        category: 'Soft Skills',
        items: [
          'Attention to detail',
          'Time management',
          'Self-motivation',
          'Reliability',
          'Physical stamina',
          'Following protocols',
        ],
      },
    ],
    summaryTemplates: [
      {
        experienceLevel: 'none',
        template: 'Reliable and detail-oriented individual seeking facilities/cleaning position. Strong work ethic, thorough approach to tasks, and commitment to maintaining clean, safe environments. Available for various shifts.',
      },
      {
        experienceLevel: 'some',
        template: 'Conscientious cleaning professional with [X] months of experience maintaining commercial and residential spaces. Skilled in deep cleaning, sanitization, and following safety protocols. Known for thoroughness and reliability.',
      },
      {
        experienceLevel: 'experienced',
        template: 'Experienced facilities professional with [X]+ years maintaining clean, safe environments. Expertise in commercial cleaning operations, equipment maintenance, and team coordination. Track record of exceeding cleanliness standards.',
      },
    ],
    actionVerbs: ['Cleaned', 'Sanitized', 'Maintained', 'Inspected', 'Organized', 'Operated', 'Restocked', 'Coordinated', 'Trained', 'Improved'],
    responsibilityPhrases: [
      'Cleaned and sanitized [X] sq ft of commercial space daily',
      'Maintained restrooms to exceed cleanliness standards',
      'Operated floor cleaning equipment (buffers, scrubbers)',
      'Followed all safety protocols and used PPE correctly',
      'Restocked supplies and reported maintenance issues',
      'Completed cleaning checklists with 100% accuracy',
    ],
  },
};

export const softSkillsLibrary = [
  'Punctual and reliable',
  'Strong work ethic',
  'Quick learner',
  'Team player',
  'Positive attitude',
  'Adaptable to change',
  'Works well under pressure',
  'Self-motivated',
  'Follows instructions accurately',
  'Safety-conscious',
  'Detail-oriented',
  'Good communication',
  'Problem-solving ability',
  'Bilingual (English/Spanish)',
  'Customer-focused',
  'Organized and efficient',
];

export const availabilityPhrases = [
  'Available immediately',
  'Flexible schedule - all shifts',
  'Weekend availability',
  'Night shift available',
  'Can work overtime',
  'Open to varied schedules',
  'Available for holiday shifts',
  'Reliable transportation',
];

export const noExperienceHighlights = [
  'Dependable with perfect attendance record',
  'Physically fit - can lift 50+ lbs',
  'Comfortable standing for extended periods',
  'Fast learner - picks up new skills quickly',
  'Strong attention to detail',
  'Excellent time management',
  'Works well independently and in teams',
  'Committed to safety protocols',
  'Positive attitude and eagerness to learn',
  'Reliable personal transportation',
];

export const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];
