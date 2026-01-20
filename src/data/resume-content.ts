// Resume Content Data Structure
// This file defines the types and initial data for programmatic resume pages

export type ExperienceLevel = 'entry-level' | 'experienced' | 'career-change' | 'no-experience';
export type Industry = 'hospitality' | 'industrial' | 'retail' | 'facilities';

export interface ProfessionalSummary {
  level: ExperienceLevel;
  text: string;
  variables: string[]; // Variables like {years}, {industry}, {company}
}

export interface ATSKeyword {
  keyword: string;
  atsScore: number; // 1-100 importance score
  category: 'hard-skill' | 'soft-skill' | 'certification' | 'action-verb' | 'industry-term';
  usage: string; // Example usage in a sentence
}

export interface AchievementBullet {
  action: string;
  metric: string;
  result: string;
  fullBullet: string;
  variables: string[]; // Placeholders for customization
  category: string;
}

export interface ResumeCertification {
  name: string;
  provider: string;
  cost: string;
  duration: string;
  payBoost: string;
  description: string;
}

export interface ResumeTemplateSection {
  section: string;
  content: string;
  tips: string[];
  variables: string[];
}

export interface ResumeExample {
  roleSlug: string;
  roleTitle: string;
  industry: Industry;
  blsData: {
    medianHourly: number;
    annualMean: number;
    employment: number;
    growthRate: string;
    sourceYear: number;
  };
  experienceLevels: ExperienceLevel[];
  professionalSummaries: ProfessionalSummary[];
  atsKeywords: ATSKeyword[];
  achievementBullets: AchievementBullet[];
  certifications: ResumeCertification[];
  templateSections: ResumeTemplateSection[];
  skillsCategories: {
    category: string;
    skills: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedRoles: string[];
  careerProgression: {
    current: string;
    next: string[];
    timeline: string;
  };
}

export interface TemplateType {
  slug: string;
  name: string;
  description: string;
  bestFor: string[];
  sections: string[];
  preview: string; // Template preview content
  tips: string[];
}

export interface ActionVerb {
  verb: string;
  category: string;
  strength: 'strong' | 'medium' | 'basic';
  examples: string[];
  industries: Industry[];
}

export interface CoverLetterTemplate {
  roleSlug: string;
  roleTitle: string;
  industry: Industry;
  situations: ('applying' | 'networking' | 'follow-up' | 'no-experience' | 'career-change')[];
  openingParagraphs: { situation: string; text: string }[];
  bodyParagraphs: { focus: string; text: string }[];
  closingParagraphs: { situation: string; text: string }[];
  emailTemplates: { purpose: string; subject: string; body: string }[];
  faqs: { question: string; answer: string }[];
}

// Initial roles for resume examples (matching Indeed Flex roles)
export const resumeRoles: { slug: string; title: string; industry: Industry }[] = [
  // Hospitality
  { slug: 'barback', title: 'Barback', industry: 'hospitality' },
  { slug: 'barista', title: 'Barista', industry: 'hospitality' },
  { slug: 'bartender', title: 'Bartender', industry: 'hospitality' },
  { slug: 'waiting-staff', title: 'Waiting Staff / Server', industry: 'hospitality' },
  { slug: 'chef-de-partie', title: 'Chef de Partie', industry: 'hospitality' },
  { slug: 'commis-chef', title: 'Commis Chef', industry: 'hospitality' },
  { slug: 'kitchen-porter', title: 'Kitchen Porter', industry: 'hospitality' },
  { slug: 'banquet-server', title: 'Banquet Server', industry: 'hospitality' },
  { slug: 'prep-cook', title: 'Prep Cook', industry: 'hospitality' },
  { slug: 'dishwasher', title: 'Dishwasher', industry: 'hospitality' },
  { slug: 'event-staff', title: 'Event Staff', industry: 'hospitality' },
  
  // Industrial
  { slug: 'warehouse-operative', title: 'Warehouse Operative', industry: 'industrial' },
  { slug: 'picker-packer', title: 'Picker Packer', industry: 'industrial' },
  { slug: 'forklift-driver', title: 'Forklift Driver', industry: 'industrial' },
  { slug: 'delivery-driver', title: 'Delivery Driver', industry: 'industrial' },
  { slug: 'machine-operator', title: 'Machine Operator', industry: 'industrial' },
  { slug: 'loader-crew', title: 'Loader / Crew', industry: 'industrial' },
  { slug: 'assembler', title: 'Assembler', industry: 'industrial' },
  
  // Retail
  { slug: 'retail-assistant', title: 'Retail Assistant', industry: 'retail' },
  { slug: 'sales-associate', title: 'Sales Associate', industry: 'retail' },
  { slug: 'cashier', title: 'Cashier', industry: 'retail' },
  
  // Facilities
  { slug: 'cleaner', title: 'Cleaner', industry: 'facilities' },
  { slug: 'custodian', title: 'Custodian', industry: 'facilities' },
];

// Template types for the template library
export const templateTypes: TemplateType[] = [
  {
    slug: 'chronological',
    name: 'Chronological Resume',
    description: 'Lists work experience in reverse chronological order. Best for those with consistent work history.',
    bestFor: ['Consistent work history', 'Same industry progression', 'Recent relevant experience'],
    sections: ['Contact Info', 'Professional Summary', 'Work Experience', 'Education', 'Skills'],
    preview: `[YOUR NAME]
[City, State] | [Phone] | [Email]

PROFESSIONAL SUMMARY
{summary}

WORK EXPERIENCE

{Job Title} | {Company Name}
{Start Date} - {End Date}
• {Achievement bullet with metrics}
• {Achievement bullet with metrics}
• {Achievement bullet with metrics}

{Previous Job Title} | {Company Name}
{Start Date} - {End Date}
• {Achievement bullet}
• {Achievement bullet}

EDUCATION
{Degree/Diploma} | {School Name} | {Year}

SKILLS
{Skill 1} • {Skill 2} • {Skill 3} • {Skill 4}`,
    tips: [
      'Keep to 1 page for entry-level, 2 pages max for experienced',
      'Focus on achievements, not just duties',
      'Use strong action verbs to start each bullet',
      'Quantify results whenever possible'
    ]
  },
  {
    slug: 'functional',
    name: 'Functional Resume',
    description: 'Emphasizes skills over work history. Best for career changers or those with employment gaps.',
    bestFor: ['Career changers', 'Employment gaps', 'Limited work experience', 'Returning to workforce'],
    sections: ['Contact Info', 'Professional Summary', 'Skills Summary', 'Work History', 'Education'],
    preview: `[YOUR NAME]
[City, State] | [Phone] | [Email]

PROFESSIONAL SUMMARY
{summary}

KEY SKILLS

Customer Service & Communication
• {Skill example with context}
• {Skill example with context}

Organization & Efficiency
• {Skill example with context}
• {Skill example with context}

Technical Skills
• {Skill example with context}
• {Skill example with context}

WORK HISTORY
{Job Title} | {Company Name} | {Dates}
{Job Title} | {Company Name} | {Dates}

EDUCATION
{Degree/Diploma} | {School Name} | {Year}`,
    tips: [
      'Group skills by category relevant to target job',
      'Include specific examples for each skill',
      'Keep work history section brief',
      'Some employers prefer chronological - research the company'
    ]
  },
  {
    slug: 'combination',
    name: 'Combination Resume',
    description: 'Blends skills-focused and chronological formats. Best for experienced workers with diverse skills.',
    bestFor: ['Experienced professionals', 'Diverse skill sets', 'Career advancement', 'Leadership roles'],
    sections: ['Contact Info', 'Professional Summary', 'Core Competencies', 'Work Experience', 'Education'],
    preview: `[YOUR NAME]
[City, State] | [Phone] | [Email]

PROFESSIONAL SUMMARY
{summary}

CORE COMPETENCIES
{Skill 1} | {Skill 2} | {Skill 3}
{Skill 4} | {Skill 5} | {Skill 6}

PROFESSIONAL EXPERIENCE

{Job Title} | {Company Name}
{Start Date} - {End Date}
• {Achievement bullet with metrics}
• {Achievement bullet with metrics}

{Previous Job Title} | {Company Name}
{Start Date} - {End Date}
• {Achievement bullet}
• {Achievement bullet}

EDUCATION & CERTIFICATIONS
{Degree} | {School} | {Year}
{Certification} | {Year}`,
    tips: [
      'Lead with skills most relevant to the job',
      'Still include detailed work experience',
      'Great for ATS optimization',
      'Works well for supervisor/manager roles'
    ]
  },
  {
    slug: 'one-page',
    name: 'One-Page Resume',
    description: 'Concise format that fits everything on a single page. Essential for entry-level and early career.',
    bestFor: ['Entry-level positions', '0-5 years experience', 'Fast-paced hiring', 'High-volume applications'],
    sections: ['Contact Info', 'Summary', 'Experience', 'Skills', 'Education'],
    preview: `[YOUR NAME]
[City, State] | [Phone] | [Email] | [LinkedIn]

SUMMARY
{2-3 sentence professional summary}

EXPERIENCE
{Job Title} | {Company} | {Dates}
• {Key achievement}  • {Key achievement}

{Job Title} | {Company} | {Dates}
• {Key achievement}  • {Key achievement}

SKILLS
{Skill} • {Skill} • {Skill} • {Skill} • {Skill}

EDUCATION
{Degree} | {School} | {Year}`,
    tips: [
      'Use 10-11pt font, narrow margins',
      'Every word must earn its place',
      'Combine bullets using semicolons when needed',
      'Most recruiters prefer one page for entry-level'
    ]
  },
  {
    slug: 'student',
    name: 'Student Resume',
    description: 'Designed for students with limited work experience. Highlights education, projects, and transferable skills.',
    bestFor: ['Current students', 'Recent graduates', 'First job seekers', 'Internship applications'],
    sections: ['Contact Info', 'Objective', 'Education', 'Relevant Coursework', 'Experience', 'Skills'],
    preview: `[YOUR NAME]
[City, State] | [Phone] | [Email]

OBJECTIVE
{Career objective tailored to position}

EDUCATION
{Degree Program} | {University/College}
Expected Graduation: {Month Year}
Relevant Coursework: {Course 1}, {Course 2}, {Course 3}

EXPERIENCE
{Job/Volunteer Title} | {Organization}
{Dates}
• {Transferable skill demonstrated}
• {Achievement or responsibility}

SKILLS
{Skill 1} • {Skill 2} • {Skill 3}

ACTIVITIES & INTERESTS
{Club/Organization} | {Role}`,
    tips: [
      'Put education first since it\'s your strongest section',
      'Include volunteer work, internships, and part-time jobs',
      'Highlight transferable skills from any experience',
      'Include relevant coursework that relates to the job'
    ]
  },
  {
    slug: 'career-gap',
    name: 'Career Gap Resume',
    description: 'Addresses employment gaps positively. Focuses on skills and recent activities over dates.',
    bestFor: ['Employment gaps', 'Return to workforce', 'Caregiving breaks', 'Health-related gaps'],
    sections: ['Contact Info', 'Summary', 'Skills', 'Experience', 'Recent Activities', 'Education'],
    preview: `[YOUR NAME]
[City, State] | [Phone] | [Email]

PROFESSIONAL SUMMARY
{Focus on skills and what you bring, mention brief reason for gap if appropriate}

KEY QUALIFICATIONS
• {Relevant skill with proof}
• {Relevant skill with proof}
• {Relevant skill with proof}

PROFESSIONAL EXPERIENCE
{Most Recent Job Title} | {Company}
{Dates}
• {Achievement}

RECENT ACTIVITIES ({Year} - Present)
• {Volunteer work, courses, certifications, or relevant activities}
• {Skills maintained or developed}

EDUCATION
{Degree} | {School}`,
    tips: [
      'Use a functional or combination format',
      'Be honest but brief about gaps',
      'Highlight any activities during the gap',
      'Focus on current skills and enthusiasm to work'
    ]
  }
];

// Action verbs organized by category
export const actionVerbs: ActionVerb[] = [
  // Leadership
  { verb: 'Led', category: 'Leadership', strength: 'strong', examples: ['Led team of 5 associates', 'Led training sessions'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  { verb: 'Managed', category: 'Leadership', strength: 'strong', examples: ['Managed daily operations', 'Managed inventory worth $50K'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  { verb: 'Supervised', category: 'Leadership', strength: 'strong', examples: ['Supervised 10+ staff members'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  { verb: 'Coordinated', category: 'Leadership', strength: 'medium', examples: ['Coordinated schedules for 20 workers'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  { verb: 'Directed', category: 'Leadership', strength: 'strong', examples: ['Directed daily workflow'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  { verb: 'Mentored', category: 'Leadership', strength: 'medium', examples: ['Mentored 5 new hires'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  { verb: 'Trained', category: 'Leadership', strength: 'medium', examples: ['Trained 15+ employees on procedures'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  
  // Achievement
  { verb: 'Achieved', category: 'Achievement', strength: 'strong', examples: ['Achieved 120% of sales target'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  { verb: 'Exceeded', category: 'Achievement', strength: 'strong', examples: ['Exceeded productivity goals by 25%'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  { verb: 'Improved', category: 'Achievement', strength: 'strong', examples: ['Improved efficiency by 30%'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  { verb: 'Increased', category: 'Achievement', strength: 'strong', examples: ['Increased customer satisfaction scores'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  { verb: 'Reduced', category: 'Achievement', strength: 'strong', examples: ['Reduced errors by 40%'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  { verb: 'Generated', category: 'Achievement', strength: 'strong', examples: ['Generated $10K in additional sales'], industries: ['hospitality', 'retail'] },
  { verb: 'Saved', category: 'Achievement', strength: 'strong', examples: ['Saved 5 hours weekly through process improvement'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  
  // Operations
  { verb: 'Operated', category: 'Operations', strength: 'medium', examples: ['Operated forklift and pallet jack'], industries: ['industrial'] },
  { verb: 'Processed', category: 'Operations', strength: 'medium', examples: ['Processed 200+ orders daily'], industries: ['industrial', 'retail'] },
  { verb: 'Maintained', category: 'Operations', strength: 'medium', examples: ['Maintained equipment and work area'], industries: ['hospitality', 'industrial', 'facilities'] },
  { verb: 'Assembled', category: 'Operations', strength: 'medium', examples: ['Assembled 50+ units per hour'], industries: ['industrial'] },
  { verb: 'Loaded', category: 'Operations', strength: 'basic', examples: ['Loaded/unloaded 40+ pallets per shift'], industries: ['industrial'] },
  { verb: 'Sorted', category: 'Operations', strength: 'basic', examples: ['Sorted and organized 500+ items'], industries: ['industrial', 'retail'] },
  { verb: 'Packed', category: 'Operations', strength: 'basic', examples: ['Packed orders with 99.5% accuracy'], industries: ['industrial'] },
  
  // Customer Service
  { verb: 'Served', category: 'Customer Service', strength: 'medium', examples: ['Served 100+ customers per shift'], industries: ['hospitality', 'retail'] },
  { verb: 'Assisted', category: 'Customer Service', strength: 'medium', examples: ['Assisted customers with product selection'], industries: ['hospitality', 'retail'] },
  { verb: 'Resolved', category: 'Customer Service', strength: 'strong', examples: ['Resolved customer complaints within 5 minutes'], industries: ['hospitality', 'retail'] },
  { verb: 'Greeted', category: 'Customer Service', strength: 'basic', examples: ['Greeted and seated 50+ parties nightly'], industries: ['hospitality'] },
  { verb: 'Recommended', category: 'Customer Service', strength: 'medium', examples: ['Recommended products resulting in upsells'], industries: ['hospitality', 'retail'] },
  
  // Hospitality Specific
  { verb: 'Prepared', category: 'Hospitality', strength: 'medium', examples: ['Prepared 80+ cocktails per shift'], industries: ['hospitality'] },
  { verb: 'Mixed', category: 'Hospitality', strength: 'medium', examples: ['Mixed specialty drinks and classic cocktails'], industries: ['hospitality'] },
  { verb: 'Plated', category: 'Hospitality', strength: 'medium', examples: ['Plated 100+ dishes during service'], industries: ['hospitality'] },
  { verb: 'Stocked', category: 'Hospitality', strength: 'basic', examples: ['Stocked bar with $2K inventory nightly'], industries: ['hospitality'] },
  { verb: 'Sanitized', category: 'Hospitality', strength: 'basic', examples: ['Sanitized all surfaces following health codes'], industries: ['hospitality', 'facilities'] },
  
  // Communication
  { verb: 'Communicated', category: 'Communication', strength: 'medium', examples: ['Communicated effectively with diverse teams'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  { verb: 'Collaborated', category: 'Communication', strength: 'medium', examples: ['Collaborated with kitchen and front-of-house'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  { verb: 'Reported', category: 'Communication', strength: 'basic', examples: ['Reported daily metrics to management'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  { verb: 'Documented', category: 'Communication', strength: 'basic', examples: ['Documented procedures and inventory'], industries: ['hospitality', 'industrial', 'retail', 'facilities'] },
  
  // Safety & Compliance
  { verb: 'Ensured', category: 'Safety', strength: 'medium', examples: ['Ensured compliance with safety protocols'], industries: ['hospitality', 'industrial', 'facilities'] },
  { verb: 'Enforced', category: 'Safety', strength: 'medium', examples: ['Enforced health and safety regulations'], industries: ['hospitality', 'industrial', 'facilities'] },
  { verb: 'Inspected', category: 'Safety', strength: 'medium', examples: ['Inspected equipment before each shift'], industries: ['industrial', 'facilities'] },
  { verb: 'Verified', category: 'Safety', strength: 'medium', examples: ['Verified ID compliance for alcohol service'], industries: ['hospitality'] },
];

// Default achievement bullets by industry
export const defaultAchievementBullets: AchievementBullet[] = [
  // Hospitality
  {
    action: 'Served',
    metric: '150+ customers',
    result: 'per shift while maintaining 98% satisfaction rating',
    fullBullet: 'Served {count}+ customers per shift while maintaining {percent}% satisfaction rating',
    variables: ['count', 'percent'],
    category: 'hospitality'
  },
  {
    action: 'Generated',
    metric: '$500+',
    result: 'in daily tips through upselling and exceptional service',
    fullBullet: 'Generated ${amount}+ in daily tips through upselling and exceptional service',
    variables: ['amount'],
    category: 'hospitality'
  },
  {
    action: 'Prepared',
    metric: '80+ specialty cocktails',
    result: 'per shift with consistent quality and presentation',
    fullBullet: 'Prepared {count}+ specialty cocktails per shift with consistent quality and presentation',
    variables: ['count'],
    category: 'hospitality'
  },
  
  // Industrial
  {
    action: 'Processed',
    metric: '250+ orders',
    result: 'daily with 99.8% accuracy rate',
    fullBullet: 'Processed {count}+ orders daily with {percent}% accuracy rate',
    variables: ['count', 'percent'],
    category: 'industrial'
  },
  {
    action: 'Operated',
    metric: 'forklift',
    result: 'for 500+ hours without safety incidents',
    fullBullet: 'Operated forklift for {hours}+ hours without safety incidents',
    variables: ['hours'],
    category: 'industrial'
  },
  {
    action: 'Exceeded',
    metric: 'productivity targets',
    result: 'by 25% while maintaining quality standards',
    fullBullet: 'Exceeded productivity targets by {percent}% while maintaining quality standards',
    variables: ['percent'],
    category: 'industrial'
  },
  
  // Retail
  {
    action: 'Achieved',
    metric: '120%',
    result: 'of sales goals through effective customer engagement',
    fullBullet: 'Achieved {percent}% of sales goals through effective customer engagement',
    variables: ['percent'],
    category: 'retail'
  },
  {
    action: 'Processed',
    metric: '100+ transactions',
    result: 'daily with zero cash handling discrepancies',
    fullBullet: 'Processed {count}+ transactions daily with zero cash handling discrepancies',
    variables: ['count'],
    category: 'retail'
  },
  
  // Facilities
  {
    action: 'Maintained',
    metric: '50,000 sq ft',
    result: 'of commercial space to exceeding cleanliness standards',
    fullBullet: 'Maintained {sqft} sq ft of commercial space to exceeding cleanliness standards',
    variables: ['sqft'],
    category: 'facilities'
  },
  {
    action: 'Completed',
    metric: 'deep cleaning tasks',
    result: '30% faster than standard time while maintaining quality',
    fullBullet: 'Completed deep cleaning tasks {percent}% faster than standard time while maintaining quality',
    variables: ['percent'],
    category: 'facilities'
  },
];

// Experience level descriptions
export const experienceLevelDescriptions: Record<ExperienceLevel, { title: string; description: string; tips: string[] }> = {
  'entry-level': {
    title: 'Entry-Level',
    description: 'Perfect for those with 0-2 years of experience in the role or industry.',
    tips: [
      'Focus on transferable skills from any experience',
      'Highlight education and relevant coursework',
      'Include volunteer work and internships',
      'Emphasize eagerness to learn and work ethic'
    ]
  },
  'experienced': {
    title: 'Experienced',
    description: 'For professionals with 2+ years of relevant work experience.',
    tips: [
      'Lead with strongest achievements',
      'Quantify results with specific metrics',
      'Show career progression',
      'Include certifications and advanced skills'
    ]
  },
  'career-change': {
    title: 'Career Change',
    description: 'Transitioning from another industry or role type.',
    tips: [
      'Identify and highlight transferable skills',
      'Use a functional or combination format',
      'Explain your motivation for the change',
      'Show relevant training or certifications'
    ]
  },
  'no-experience': {
    title: 'No Experience',
    description: 'First job or no prior work experience in any field.',
    tips: [
      'Focus on soft skills and personal qualities',
      'Include any volunteer, school, or community work',
      'Highlight relevant classes or training',
      'Show enthusiasm and willingness to learn'
    ]
  }
};

// Types for pages
export interface SkillKeyword {
  keyword: string;
  atsScore: number;
  category: string;
}

export interface BulletExample {
  action: string;
  metric: string;
  result: string;
  category: string;
}

export interface TemplateSection {
  id: string;
  title: string;
  content: string;
}

export interface ResumeCertificationDisplay {
  name: string;
  description: string;
  cost: string;
  payBoost: string;
  timeToComplete: string;
  required?: boolean;
}

export interface ProfessionalSummaryDisplay {
  level: ExperienceLevel;
  text: string;
}

export interface TemplateSectionDisplay {
  level: ExperienceLevel;
  sections: TemplateSection[];
}

export interface ResumeExampleDisplay {
  roleSlug: string;
  roleTitle: string;
  industry: string;
  metaDescription: string;
  experienceLevels: ExperienceLevel[];
  blsData?: {
    medianHourly: string;
    jobGrowth: string;
    totalJobs: string;
    outlook: string;
    source: string;
    lastUpdated: string;
  };
  skillsKeywords: SkillKeyword[];
  professionalSummaries: ProfessionalSummaryDisplay[];
  bulletExamples: BulletExample[];
  certifications: ResumeCertificationDisplay[];
  templateSections: TemplateSectionDisplay[];
  faqs: { question: string; answer: string }[];
}

// Sample resume examples (populated for key roles)
export const resumeExamples: ResumeExampleDisplay[] = [
  {
    roleSlug: 'warehouse-operative',
    roleTitle: 'Warehouse Operative',
    industry: 'Industrial',
    metaDescription: 'Complete warehouse operative resume example with ATS keywords, achievements, and templates for all experience levels.',
    experienceLevels: ['entry-level', 'experienced', 'no-experience', 'career-change'],
    blsData: {
      medianHourly: '$18.50',
      jobGrowth: '+8%',
      totalJobs: '1.2M',
      outlook: 'Growing',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Forklift Operation', atsScore: 95, category: 'hard-skill' },
      { keyword: 'RF Scanner', atsScore: 92, category: 'hard-skill' },
      { keyword: 'Inventory Management', atsScore: 90, category: 'hard-skill' },
      { keyword: 'Order Picking', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Pallet Jack', atsScore: 85, category: 'hard-skill' },
      { keyword: 'WMS', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Safety Compliance', atsScore: 82, category: 'hard-skill' },
      { keyword: 'Quality Control', atsScore: 80, category: 'hard-skill' },
      { keyword: 'Loading/Unloading', atsScore: 78, category: 'hard-skill' },
      { keyword: 'Shipping/Receiving', atsScore: 78, category: 'hard-skill' },
      { keyword: 'Attention to Detail', atsScore: 75, category: 'soft-skill' },
      { keyword: 'Team Player', atsScore: 72, category: 'soft-skill' },
      { keyword: 'Time Management', atsScore: 70, category: 'soft-skill' },
      { keyword: 'Physical Stamina', atsScore: 68, category: 'soft-skill' },
      { keyword: 'OSHA Certified', atsScore: 88, category: 'certification' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Motivated warehouse professional with 1 year of experience in order fulfillment and inventory management. Proficient in RF scanner operation and forklift certified. Maintained 99.5% picking accuracy while consistently exceeding productivity targets by 15%.'
      },
      {
        level: 'experienced',
        text: 'Results-driven warehouse operative with 5+ years of experience in high-volume distribution centers. Expert in WMS systems, forklift operation, and team leadership. Increased department efficiency by 25% through process improvements and trained 20+ new hires on safety protocols.'
      },
      {
        level: 'no-experience',
        text: 'Reliable and physically fit individual seeking entry-level warehouse position. Quick learner with strong attention to detail and ability to lift 50+ lbs consistently. Eager to develop skills in inventory management and logistics operations.'
      },
      {
        level: 'career-change',
        text: 'Detail-oriented professional transitioning to warehouse operations with transferable skills in inventory tracking, team coordination, and process optimization. Forklift certified with strong work ethic and commitment to safety excellence.'
      }
    ],
    bulletExamples: [
      { action: 'Processed', metric: '250+ orders daily', result: 'with 99.8% accuracy rate, exceeding team average by 20%', category: 'Productivity' },
      { action: 'Operated', metric: 'forklift and pallet jack', result: 'for 1,500+ hours without safety incidents', category: 'Safety' },
      { action: 'Reduced', metric: 'picking errors by 35%', result: 'through implementation of double-check system', category: 'Quality' },
      { action: 'Trained', metric: '15+ new team members', result: 'on warehouse procedures and safety protocols', category: 'Leadership' },
      { action: 'Maintained', metric: 'inventory accuracy of 99.9%', result: 'across 10,000+ SKU warehouse', category: 'Inventory' },
      { action: 'Exceeded', metric: 'productivity targets by 25%', result: 'while maintaining quality standards', category: 'Performance' }
    ],
    certifications: [
      { name: 'Forklift Certification', description: 'OSHA-compliant forklift operator certification', cost: '$50-150', payBoost: '+$1-2/hr', timeToComplete: '1-2 days', required: false },
      { name: 'OSHA 10-Hour', description: 'General industry safety training', cost: 'Free-$25', payBoost: '+$0.50-1/hr', timeToComplete: '10 hours' },
      { name: 'Hazmat Awareness', description: 'Handling hazardous materials safely', cost: '$50-100', payBoost: '+$1-3/hr', timeToComplete: '4-8 hours' }
    ],
    templateSections: [
      {
        level: 'entry-level',
        sections: [
          { id: 'contact', title: 'Contact Information', content: '{YOUR NAME}\n{City, State} | {Phone} | {Email}' },
          { id: 'summary', title: 'Professional Summary', content: 'Motivated warehouse professional with {X} year(s) of experience in order fulfillment and inventory management. Proficient in RF scanner operation and {certification}. Maintained {X}% picking accuracy while consistently exceeding productivity targets.' },
          { id: 'experience', title: 'Work Experience', content: 'Warehouse Associate | {Company Name}\n{Start Date} - {End Date}\n• Processed {X}+ orders daily with {X}% accuracy rate\n• Operated {equipment} safely for {X}+ hours\n• Collaborated with team of {X} to meet daily shipping deadlines' },
          { id: 'skills', title: 'Skills', content: 'Forklift Operation • RF Scanner • Order Picking • Inventory Management • WMS • Safety Compliance' }
        ]
      },
      {
        level: 'experienced',
        sections: [
          { id: 'contact', title: 'Contact Information', content: '{YOUR NAME}\n{City, State} | {Phone} | {Email} | {LinkedIn}' },
          { id: 'summary', title: 'Professional Summary', content: 'Results-driven warehouse operative with {X}+ years of experience in high-volume distribution centers. Expert in WMS systems, forklift operation, and team leadership. Increased department efficiency by {X}% through process improvements and trained {X}+ new hires.' },
          { id: 'experience', title: 'Work Experience', content: 'Senior Warehouse Associate | {Company Name}\n{Start Date} - Present\n• Led team of {X} associates in daily operations\n• Improved picking efficiency by {X}% through process optimization\n• Trained {X}+ new employees on procedures and safety\n• Maintained {X}% inventory accuracy across {X}+ SKUs' },
          { id: 'skills', title: 'Core Competencies', content: 'Team Leadership • WMS Administration • Process Improvement • Forklift/Reach Truck • Quality Control • OSHA Compliance • Inventory Management' }
        ]
      }
    ],
    faqs: [
      { question: 'Do I need forklift certification for a warehouse job?', answer: 'Not always required for entry-level positions, but having certification can increase your pay by $1-2/hr and open more opportunities. Many employers provide free training.' },
      { question: 'What should I put on my warehouse resume with no experience?', answer: 'Focus on transferable skills like reliability, physical fitness, attention to detail, and any relevant experience (volunteer work, school projects, sports). Highlight your ability to follow instructions and work in teams.' },
      { question: 'How do I pass warehouse ATS systems?', answer: 'Include keywords from the job posting like "RF scanner," "order picking," "inventory management," and "safety compliance." Use a simple format without tables or graphics.' }
    ]
  },
  {
    roleSlug: 'bartender',
    roleTitle: 'Bartender',
    industry: 'Hospitality',
    metaDescription: 'Professional bartender resume example with cocktail expertise, customer service achievements, and certifications for 2026.',
    experienceLevels: ['entry-level', 'experienced', 'no-experience', 'career-change'],
    blsData: {
      medianHourly: '$14.20',
      jobGrowth: '+10%',
      totalJobs: '654K',
      outlook: 'Strong',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Mixology', atsScore: 95, category: 'hard-skill' },
      { keyword: 'POS Systems', atsScore: 90, category: 'hard-skill' },
      { keyword: 'Customer Service', atsScore: 92, category: 'soft-skill' },
      { keyword: 'Cash Handling', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Wine Knowledge', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Craft Cocktails', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Speed & Efficiency', atsScore: 82, category: 'soft-skill' },
      { keyword: 'Upselling', atsScore: 80, category: 'hard-skill' },
      { keyword: 'Inventory Control', atsScore: 78, category: 'hard-skill' },
      { keyword: 'TIPS Certified', atsScore: 95, category: 'certification' },
      { keyword: 'ServSafe', atsScore: 90, category: 'certification' },
      { keyword: 'Multitasking', atsScore: 75, category: 'soft-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'TIPS-certified bartender with 1 year of experience in high-volume bar service. Skilled in classic cocktails and craft beverages with a passion for guest satisfaction. Consistently achieved $400+ in daily tips through personalized service and efficient drink preparation.'
      },
      {
        level: 'experienced',
        text: 'Dynamic bartender with 5+ years of experience in upscale establishments and high-volume nightlife venues. Expert in craft cocktails, wine pairings, and bar management. Increased beverage sales by 30% through menu development and staff training.'
      },
      {
        level: 'no-experience',
        text: 'Enthusiastic and personable individual seeking bartending opportunity. Strong customer service background with excellent communication skills and ability to work in fast-paced environments. TIPS certified and eager to learn mixology.'
      },
      {
        level: 'career-change',
        text: 'Customer-focused professional transitioning to bartending with proven sales and hospitality skills. TIPS certified with extensive knowledge of spirits and craft cocktails. Known for creating memorable guest experiences and building repeat clientele.'
      }
    ],
    bulletExamples: [
      { action: 'Prepared', metric: '100+ cocktails per shift', result: 'maintaining consistent quality and presentation', category: 'Productivity' },
      { action: 'Generated', metric: '$500+ in daily tips', result: 'through exceptional service and upselling techniques', category: 'Revenue' },
      { action: 'Managed', metric: '$3,000+ in nightly sales', result: 'with zero cash handling discrepancies', category: 'Operations' },
      { action: 'Created', metric: '5 signature cocktails', result: 'that became top sellers on the menu', category: 'Creativity' },
      { action: 'Maintained', metric: '100% compliance', result: 'with alcohol service laws and ID verification', category: 'Compliance' },
      { action: 'Trained', metric: '8 new bartenders', result: 'on drink recipes and service standards', category: 'Leadership' }
    ],
    certifications: [
      { name: 'TIPS Certification', description: 'Training for Intervention Procedures', cost: '$35-45', payBoost: '+$1-2/hr', timeToComplete: '3-4 hours', required: true },
      { name: 'ServSafe Alcohol', description: 'Responsible alcohol service certification', cost: '$15-35', payBoost: '+$0.50-1/hr', timeToComplete: '2-3 hours' },
      { name: 'Cicerone Certified', description: 'Beer server certification', cost: '$69', payBoost: '+$1-2/hr', timeToComplete: 'Self-study' }
    ],
    templateSections: [
      {
        level: 'entry-level',
        sections: [
          { id: 'contact', title: 'Contact Information', content: '{YOUR NAME}\n{City, State} | {Phone} | {Email}' },
          { id: 'summary', title: 'Professional Summary', content: 'TIPS-certified bartender with {X} year(s) of experience in high-volume bar service. Skilled in classic cocktails and craft beverages with a passion for guest satisfaction. Consistently achieved ${X}+ in daily tips.' },
          { id: 'experience', title: 'Work Experience', content: 'Bartender | {Venue Name}\n{Start Date} - {End Date}\n• Prepared {X}+ cocktails per shift with consistent quality\n• Generated ${X}+ in daily tips through upselling\n• Maintained 100% compliance with alcohol service laws' },
          { id: 'skills', title: 'Skills', content: 'Mixology • POS Systems • Customer Service • Cash Handling • Wine Knowledge • Craft Cocktails' }
        ]
      }
    ],
    faqs: [
      { question: 'Do I need TIPS certification to be a bartender?', answer: 'Required in many states and by most employers. It costs $35-45 and takes 3-4 hours online. Having it before applying gives you a competitive edge.' },
      { question: 'How do I list bartending skills on a resume?', answer: 'Include specific skills like "craft cocktails," "POS systems," "upselling," and "high-volume service." Mention certifications and any specialty knowledge (wine, craft beer, etc.).' }
    ]
  },
  {
    roleSlug: 'picker-packer',
    roleTitle: 'Picker Packer',
    industry: 'Industrial',
    metaDescription: 'Picker packer resume template with productivity metrics, accuracy achievements, and warehouse skills for Amazon, FedEx, and fulfillment centers.',
    experienceLevels: ['entry-level', 'experienced', 'no-experience'],
    blsData: {
      medianHourly: '$17.00',
      jobGrowth: '+6%',
      totalJobs: '850K',
      outlook: 'Stable',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Order Picking', atsScore: 95, category: 'hard-skill' },
      { keyword: 'RF Scanner', atsScore: 92, category: 'hard-skill' },
      { keyword: 'Packing', atsScore: 90, category: 'hard-skill' },
      { keyword: 'Quality Control', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Inventory Management', atsScore: 82, category: 'hard-skill' },
      { keyword: 'Attention to Detail', atsScore: 88, category: 'soft-skill' },
      { keyword: 'Speed & Accuracy', atsScore: 85, category: 'soft-skill' },
      { keyword: 'Physical Stamina', atsScore: 78, category: 'soft-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Efficient picker packer with 6 months experience in e-commerce fulfillment. Consistently exceed pick rates by 20% while maintaining 99.9% accuracy. Skilled in RF scanner operation and quality control procedures.'
      },
      {
        level: 'experienced',
        text: 'High-performing picker packer with 3+ years in Amazon-style fulfillment centers. Expert in multi-zone picking and pack optimization. Ranked in top 10% for productivity and accuracy, processing 400+ items per shift.'
      },
      {
        level: 'no-experience',
        text: 'Hardworking and detail-oriented individual ready to excel in picker packer role. Strong physical fitness with ability to stand 8+ hours and lift 50 lbs repeatedly. Fast learner committed to meeting productivity targets.'
      }
    ],
    bulletExamples: [
      { action: 'Picked', metric: '300+ items per shift', result: 'exceeding target rate by 25%', category: 'Productivity' },
      { action: 'Maintained', metric: '99.9% accuracy', result: 'across 10,000+ orders processed', category: 'Quality' },
      { action: 'Packed', metric: '150+ packages daily', result: 'using correct materials and methods', category: 'Operations' },
      { action: 'Reduced', metric: 'packing time by 15%', result: 'through workflow optimization', category: 'Efficiency' }
    ],
    certifications: [
      { name: 'Forklift Certification', description: 'Enables operation of warehouse equipment', cost: '$50-150', payBoost: '+$1-2/hr', timeToComplete: '1-2 days' }
    ],
    templateSections: [
      {
        level: 'entry-level',
        sections: [
          { id: 'contact', title: 'Contact Information', content: '{YOUR NAME}\n{City, State} | {Phone} | {Email}' },
          { id: 'summary', title: 'Professional Summary', content: 'Efficient picker packer with experience in e-commerce fulfillment. Consistently exceed pick rates by {X}% while maintaining {X}% accuracy.' },
          { id: 'experience', title: 'Work Experience', content: 'Picker Packer | {Company Name}\n{Dates}\n• Picked {X}+ items per shift, exceeding target by {X}%\n• Maintained {X}% accuracy across {X}+ orders\n• Operated RF scanner for inventory tracking' },
          { id: 'skills', title: 'Skills', content: 'Order Picking • RF Scanner • Packing • Quality Control • Physical Stamina • Attention to Detail' }
        ]
      }
    ],
    faqs: [
      { question: 'What is the average picker packer rate?', answer: 'Most fulfillment centers expect 100-200 items per hour depending on the facility type. Top performers often hit 150-250+ items per hour.' },
      { question: 'How do I describe picker packer experience on a resume?', answer: 'Focus on your pick rate, accuracy percentage, and any productivity metrics. Mention specific equipment used (RF scanners, conveyor systems) and types of products handled.' }
    ]
  },
  {
    roleSlug: 'banquet-server',
    roleTitle: 'Banquet Server',
    industry: 'Hospitality',
    metaDescription: 'Banquet server resume with event experience, plate service skills, and high-volume catering achievements.',
    experienceLevels: ['entry-level', 'experienced', 'no-experience'],
    blsData: {
      medianHourly: '$15.50',
      jobGrowth: '+12%',
      totalJobs: '420K',
      outlook: 'Growing',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Plate Service', atsScore: 95, category: 'hard-skill' },
      { keyword: 'Event Setup', atsScore: 90, category: 'hard-skill' },
      { keyword: 'Customer Service', atsScore: 92, category: 'soft-skill' },
      { keyword: 'Food Safety', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Wine Service', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Team Coordination', atsScore: 82, category: 'soft-skill' },
      { keyword: 'ServSafe', atsScore: 90, category: 'certification' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'ServSafe certified banquet server with 1 year of experience serving at weddings, corporate events, and galas. Skilled in synchronized plate service and wine presentation for groups of 200+.'
      },
      {
        level: 'experienced',
        text: 'Seasoned banquet professional with 4+ years serving at luxury hotels and convention centers. Expert in high-end plate service, wine pairing, and VIP guest relations. Lead server for events up to 500 guests.'
      },
      {
        level: 'no-experience',
        text: 'Polished and personable individual seeking banquet server position. Strong attention to detail and ability to work professionally in formal settings. Quick learner with excellent communication skills.'
      }
    ],
    bulletExamples: [
      { action: 'Served', metric: '200+ guests', result: 'at formal seated dinners with synchronized plate service', category: 'Service' },
      { action: 'Set up', metric: '15+ events monthly', result: 'including table settings, linens, and centerpieces', category: 'Setup' },
      { action: 'Maintained', metric: '100% guest satisfaction', result: 'for VIP corporate accounts', category: 'Quality' },
      { action: 'Coordinated', metric: 'with team of 12 servers', result: 'for seamless service execution', category: 'Teamwork' }
    ],
    certifications: [
      { name: 'ServSafe Food Handler', description: 'Food safety and handling certification', cost: '$15-20', payBoost: '+$0.50-1/hr', timeToComplete: '2-4 hours', required: true },
      { name: 'TIPS Certification', description: 'Alcohol service certification', cost: '$35-45', payBoost: '+$1/hr', timeToComplete: '3-4 hours' }
    ],
    templateSections: [],
    faqs: [
      { question: 'What should a banquet server wear?', answer: 'Typically black pants, white button-down shirt, black non-slip shoes. Some venues require tuxedo shirts or vests. Always check with the catering manager.' }
    ]
  },
  {
    roleSlug: 'event-staff',
    roleTitle: 'Event Staff',
    industry: 'Hospitality',
    metaDescription: 'Event staff resume template for concerts, festivals, and sporting events with crowd management and guest service skills.',
    experienceLevels: ['entry-level', 'no-experience', 'career-change'],
    blsData: {
      medianHourly: '$16.00',
      jobGrowth: '+15%',
      totalJobs: '380K',
      outlook: 'Strong',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Crowd Management', atsScore: 92, category: 'hard-skill' },
      { keyword: 'Guest Services', atsScore: 90, category: 'soft-skill' },
      { keyword: 'Ticket Scanning', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Venue Setup', atsScore: 82, category: 'hard-skill' },
      { keyword: 'Communication', atsScore: 88, category: 'soft-skill' },
      { keyword: 'Problem Solving', atsScore: 85, category: 'soft-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Energetic event staff member with experience at concerts, festivals, and sporting events. Skilled in ticket scanning, guest assistance, and crowd flow management. Comfortable working long shifts in fast-paced environments.'
      },
      {
        level: 'no-experience',
        text: 'Enthusiastic team player seeking event staff position. Strong communication skills with ability to remain calm under pressure. Flexible availability for nights, weekends, and holidays.'
      },
      {
        level: 'career-change',
        text: 'Customer service professional transitioning to event staffing with proven crowd management and problem-solving skills. Experience handling high-stress situations with professionalism.'
      }
    ],
    bulletExamples: [
      { action: 'Processed', metric: '1,000+ attendees', result: 'through entry gates during peak arrival times', category: 'Operations' },
      { action: 'Assisted', metric: '50+ guests per event', result: 'with seating, directions, and special requests', category: 'Service' },
      { action: 'Managed', metric: 'crowd flow', result: 'for events with 10,000+ attendees', category: 'Crowd Control' },
      { action: 'Resolved', metric: 'guest issues', result: 'quickly and professionally, maintaining event atmosphere', category: 'Problem Solving' }
    ],
    certifications: [
      { name: 'Crowd Management Training', description: 'Professional crowd control certification', cost: '$50-100', payBoost: '+$1/hr', timeToComplete: '4-8 hours' }
    ],
    templateSections: [],
    faqs: [
      { question: 'What do event staff do?', answer: 'Duties include ticket scanning, ushering guests, answering questions, monitoring sections, assisting with emergencies, and maintaining venue cleanliness.' }
    ]
  },
  {
    roleSlug: 'retail-assistant',
    roleTitle: 'Retail Assistant',
    industry: 'Retail',
    metaDescription: 'Retail assistant resume example with sales achievements, customer service skills, and visual merchandising experience.',
    experienceLevels: ['entry-level', 'experienced', 'no-experience', 'career-change'],
    blsData: {
      medianHourly: '$15.00',
      jobGrowth: '+2%',
      totalJobs: '4.3M',
      outlook: 'Stable',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Customer Service', atsScore: 95, category: 'soft-skill' },
      { keyword: 'POS Systems', atsScore: 90, category: 'hard-skill' },
      { keyword: 'Sales', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Visual Merchandising', atsScore: 82, category: 'hard-skill' },
      { keyword: 'Inventory Management', atsScore: 80, category: 'hard-skill' },
      { keyword: 'Cash Handling', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Product Knowledge', atsScore: 78, category: 'hard-skill' },
      { keyword: 'Upselling', atsScore: 75, category: 'hard-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Friendly retail assistant with 1 year of experience in fast-paced retail environments. Skilled in POS systems, visual merchandising, and achieving sales targets. Consistently recognized for exceptional customer service.'
      },
      {
        level: 'experienced',
        text: 'Results-driven retail professional with 4+ years experience in high-volume stores. Expert in visual merchandising, inventory management, and team training. Exceeded sales targets by 20% and promoted to senior associate.'
      },
      {
        level: 'no-experience',
        text: 'Personable and eager individual seeking retail position. Strong communication skills with genuine interest in helping customers find what they need. Reliable, punctual, and quick to learn new systems.'
      },
      {
        level: 'career-change',
        text: 'Customer-focused professional transitioning to retail with proven sales and relationship-building skills. Experience handling transactions and providing personalized service in fast-paced settings.'
      }
    ],
    bulletExamples: [
      { action: 'Achieved', metric: '125% of monthly sales target', result: 'through effective upselling and product recommendations', category: 'Sales' },
      { action: 'Processed', metric: '100+ transactions daily', result: 'with zero cash handling discrepancies', category: 'Operations' },
      { action: 'Maintained', metric: 'store appearance', result: 'through consistent visual merchandising and restocking', category: 'Merchandising' },
      { action: 'Resolved', metric: 'customer complaints', result: 'resulting in positive feedback and repeat business', category: 'Service' }
    ],
    certifications: [],
    templateSections: [],
    faqs: [
      { question: 'What skills are most important for retail?', answer: 'Customer service, communication, sales ability, POS proficiency, and product knowledge. Highlighting any experience with specific brands or product categories helps.' }
    ]
  },
  {
    roleSlug: 'cleaner',
    roleTitle: 'Cleaner',
    industry: 'Facilities',
    metaDescription: 'Professional cleaner resume with commercial cleaning experience, equipment knowledge, and safety certifications.',
    experienceLevels: ['entry-level', 'experienced', 'no-experience'],
    blsData: {
      medianHourly: '$15.50',
      jobGrowth: '+6%',
      totalJobs: '2.4M',
      outlook: 'Stable',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Commercial Cleaning', atsScore: 92, category: 'hard-skill' },
      { keyword: 'Sanitization', atsScore: 90, category: 'hard-skill' },
      { keyword: 'Floor Care', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Equipment Operation', atsScore: 82, category: 'hard-skill' },
      { keyword: 'Chemical Safety', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Attention to Detail', atsScore: 85, category: 'soft-skill' },
      { keyword: 'Time Management', atsScore: 80, category: 'soft-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Reliable cleaner with 1 year of experience in commercial facility maintenance. Proficient in floor care equipment, sanitization protocols, and chemical safety. Consistently complete assigned areas ahead of schedule.'
      },
      {
        level: 'experienced',
        text: 'Experienced cleaning professional with 5+ years maintaining commercial and industrial facilities. Expert in deep cleaning, floor restoration, and compliance with health standards. Supervised team of 4 cleaners across 100,000 sq ft facility.'
      },
      {
        level: 'no-experience',
        text: 'Hardworking individual seeking cleaning position. Strong attention to detail and commitment to maintaining clean, safe environments. Reliable and able to work independently or as part of a team.'
      }
    ],
    bulletExamples: [
      { action: 'Maintained', metric: '75,000 sq ft', result: 'of commercial office space to exceeding cleanliness standards', category: 'Operations' },
      { action: 'Completed', metric: 'daily cleaning tasks', result: '20% faster than standard time while maintaining quality', category: 'Efficiency' },
      { action: 'Operated', metric: 'industrial floor equipment', result: 'including buffers, scrubbers, and extractors', category: 'Equipment' },
      { action: 'Ensured', metric: '100% compliance', result: 'with health and safety regulations', category: 'Compliance' }
    ],
    certifications: [
      { name: 'OSHA 10-Hour', description: 'Workplace safety certification', cost: 'Free-$25', payBoost: '+$0.50-1/hr', timeToComplete: '10 hours' },
      { name: 'Bloodborne Pathogens', description: 'Medical facility cleaning certification', cost: '$25-50', payBoost: '+$1-2/hr', timeToComplete: '2-4 hours' }
    ],
    templateSections: [],
    faqs: [
      { question: 'What equipment should I list on a cleaner resume?', answer: 'Include floor buffers, carpet extractors, pressure washers, industrial vacuums, and any specialized equipment. Mention chemical handling experience and safety training.' }
    ]
  },
  // New roles populated via Perplexity research
  {
    roleSlug: 'barback',
    roleTitle: 'Barback',
    industry: 'Hospitality',
    metaDescription: 'Barback resume example with bar support skills, inventory management achievements, and high-volume service experience for 2026.',
    experienceLevels: ['entry-level', 'experienced', 'no-experience'],
    blsData: {
      medianHourly: '$13.50',
      jobGrowth: '+9%',
      totalJobs: '280K',
      outlook: 'Growing',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Restocking', atsScore: 95, category: 'hard-skill' },
      { keyword: 'Inventory Management', atsScore: 92, category: 'hard-skill' },
      { keyword: 'Customer Service', atsScore: 90, category: 'soft-skill' },
      { keyword: 'Bar Equipment', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Glassware Handling', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Speed & Efficiency', atsScore: 82, category: 'soft-skill' },
      { keyword: 'Ice Management', atsScore: 80, category: 'hard-skill' },
      { keyword: 'Garnish Preparation', atsScore: 78, category: 'hard-skill' },
      { keyword: 'Sanitation', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Team Communication', atsScore: 75, category: 'soft-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Energetic barback with 6 months experience supporting high-volume bar operations. Skilled in restocking supplies, maintaining glassware, and assisting bartenders during peak hours. Consistently praised for speed and attention to detail.'
      },
      {
        level: 'experienced',
        text: 'Efficient barback with 2+ years experience in fast-paced nightlife and restaurant bars. Expert in inventory management, garnish prep, and bar equipment maintenance. Known for reducing bartender wait times by 25% through proactive restocking.'
      },
      {
        level: 'no-experience',
        text: 'Motivated individual seeking barback position. Strong work ethic with ability to work in fast-paced environments. Quick learner committed to supporting bartenders and maintaining clean, organized bar areas.'
      }
    ],
    bulletExamples: [
      { action: 'Streamlined', metric: 'bar restocking processes', result: 'reducing downtime by 20% and enabling service to 300+ patrons per night', category: 'Efficiency' },
      { action: 'Managed', metric: '$2,000+ in inventory', result: 'cutting waste by 20% through precise tracking and rotation', category: 'Inventory' },
      { action: 'Assisted', metric: 'bartenders with 500+ drinks', result: 'per shift, boosting service speed by 15%', category: 'Productivity' },
      { action: 'Maintained', metric: '150+ pieces of barware', result: 'nightly with perfect health inspection scores', category: 'Quality' }
    ],
    certifications: [
      { name: 'TIPS Certification', description: 'Alcohol awareness for bar staff', cost: '$35-45', payBoost: '+$1/hr', timeToComplete: '3-4 hours' },
      { name: 'Food Handler Card', description: 'Basic food safety certification', cost: '$10-15', payBoost: '+$0.50/hr', timeToComplete: '2-4 hours' }
    ],
    templateSections: [],
    faqs: [
      { question: 'Can barbacks become bartenders?', answer: 'Yes, barback is a common pathway to bartending. Many establishments promote from within after 6-12 months of excellent barback performance.' }
    ]
  },
  {
    roleSlug: 'barista',
    roleTitle: 'Barista',
    industry: 'Hospitality',
    metaDescription: 'Barista resume template with coffee expertise, customer service achievements, and specialty drink skills for 2026.',
    experienceLevels: ['entry-level', 'experienced', 'no-experience', 'career-change'],
    blsData: {
      medianHourly: '$14.00',
      jobGrowth: '+8%',
      totalJobs: '420K',
      outlook: 'Stable',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Espresso Preparation', atsScore: 95, category: 'hard-skill' },
      { keyword: 'Customer Service', atsScore: 92, category: 'soft-skill' },
      { keyword: 'Latte Art', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Cash Handling', atsScore: 90, category: 'hard-skill' },
      { keyword: 'POS Systems', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Beverage Preparation', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Inventory Management', atsScore: 80, category: 'hard-skill' },
      { keyword: 'Multitasking', atsScore: 78, category: 'soft-skill' },
      { keyword: 'Food Safety', atsScore: 82, category: 'hard-skill' },
      { keyword: 'Upselling', atsScore: 75, category: 'hard-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Friendly barista with 1 year of experience crafting specialty coffee drinks. Skilled in espresso preparation, latte art, and providing exceptional customer service. Consistently upsold beverages, increasing daily sales by 15%.'
      },
      {
        level: 'experienced',
        text: 'Skilled barista with 3+ years experience in high-volume specialty coffee shops. Expert in espresso techniques, inventory management, and team training. Led initiatives that boosted year-over-year sales by 30% and improved employee retention by 80%.'
      },
      {
        level: 'no-experience',
        text: 'Enthusiastic coffee lover seeking barista position. Strong customer service skills with genuine passion for creating great beverages. Quick learner ready to master espresso techniques and build customer relationships.'
      },
      {
        level: 'career-change',
        text: 'Customer-focused professional transitioning to specialty coffee. Strong communication and cash handling skills from previous retail experience. Passionate about coffee culture and creating memorable guest experiences.'
      }
    ],
    bulletExamples: [
      { action: 'Led', metric: 'team of 12 baristas', result: 'boosting year-over-year sales by 30%', category: 'Leadership' },
      { action: 'Served', metric: '150+ customers daily', result: 'with 98% satisfaction rate, increasing sales by 15%', category: 'Service' },
      { action: 'Trained', metric: '5 new baristas', result: 'cutting training time by 20% and enhancing team performance', category: 'Training' },
      { action: 'Managed', metric: 'inventory effectively', result: 'reducing waste by 15% and ensuring peak-hour supply', category: 'Operations' }
    ],
    certifications: [
      { name: 'SCA Barista Skills', description: 'Specialty Coffee Association certification', cost: '$200-400', payBoost: '+$1-2/hr', timeToComplete: '2-3 days' },
      { name: 'Food Handler Card', description: 'Required in most states', cost: '$10-20', payBoost: 'Required', timeToComplete: '2-4 hours' }
    ],
    templateSections: [],
    faqs: [
      { question: 'How long to become a skilled barista?', answer: 'Basic skills take 2-4 weeks. Mastering latte art and advanced techniques requires 3-6 months of practice.' }
    ]
  },
  {
    roleSlug: 'waiting-staff',
    roleTitle: 'Waiting Staff / Server',
    industry: 'Hospitality',
    metaDescription: 'Server and waiting staff resume example with upselling achievements, customer service skills, and dining experience for 2026.',
    experienceLevels: ['entry-level', 'experienced', 'no-experience', 'career-change'],
    blsData: {
      medianHourly: '$14.50',
      jobGrowth: '+6%',
      totalJobs: '2.5M',
      outlook: 'Stable',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Customer Service', atsScore: 95, category: 'soft-skill' },
      { keyword: 'Food Service', atsScore: 92, category: 'hard-skill' },
      { keyword: 'POS Systems', atsScore: 90, category: 'hard-skill' },
      { keyword: 'Upselling', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Menu Knowledge', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Order Accuracy', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Wine Service', atsScore: 80, category: 'hard-skill' },
      { keyword: 'Team Coordination', atsScore: 78, category: 'soft-skill' },
      { keyword: 'ServSafe', atsScore: 85, category: 'certification' },
      { keyword: 'Cash Handling', atsScore: 82, category: 'hard-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Personable server with 1 year of experience in casual dining. Skilled in POS systems, menu recommendations, and maintaining high guest satisfaction. Increased check averages by 15% through strategic upselling.'
      },
      {
        level: 'experienced',
        text: 'Dynamic server with 4+ years in upscale dining environments. Expert in wine pairings, tableside service, and team leadership. Consistently achieved 95%+ customer satisfaction while managing sections of 20+ tables.'
      },
      {
        level: 'no-experience',
        text: 'Friendly and motivated individual seeking server position. Excellent communication skills with natural ability to make guests feel welcome. Quick learner eager to master restaurant service standards.'
      },
      {
        level: 'career-change',
        text: 'Customer service professional transitioning to hospitality. Proven track record in client relations and sales. Passionate about creating exceptional dining experiences and building repeat clientele.'
      }
    ],
    bulletExamples: [
      { action: 'Implemented', metric: 'upselling techniques on 50+ tables', result: 'increasing average check size by 25%', category: 'Sales' },
      { action: 'Achieved', metric: '95%+ customer satisfaction', result: 'resulting in 20% increase in repeat customers', category: 'Service' },
      { action: 'Managed', metric: 'multiple tables during peak hours', result: 'serving 150+ customers per shift', category: 'Productivity' },
      { action: 'Trained', metric: '5 new servers', result: 'improving team productivity and 10% faster turnover', category: 'Leadership' }
    ],
    certifications: [
      { name: 'ServSafe Food Handler', description: 'Required for food service', cost: '$15-20', payBoost: 'Required', timeToComplete: '2-4 hours' },
      { name: 'TIPS Certification', description: 'Alcohol service training', cost: '$35-45', payBoost: '+$1/hr', timeToComplete: '3-4 hours' }
    ],
    templateSections: [],
    faqs: [
      { question: 'How much do servers make with tips?', answer: 'Total earnings typically range from $15-35/hr including tips. Fine dining servers often earn $25-50+/hr.' }
    ]
  },
  {
    roleSlug: 'chef-de-partie',
    roleTitle: 'Chef de Partie',
    industry: 'Hospitality',
    metaDescription: 'Chef de Partie resume example with station management, culinary achievements, and kitchen leadership for 2026.',
    experienceLevels: ['entry-level', 'experienced', 'career-change'],
    blsData: {
      medianHourly: '$18.50',
      jobGrowth: '+5%',
      totalJobs: '1.4M',
      outlook: 'Stable',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Food Preparation', atsScore: 95, category: 'hard-skill' },
      { keyword: 'Station Management', atsScore: 92, category: 'hard-skill' },
      { keyword: 'HACCP', atsScore: 90, category: 'certification' },
      { keyword: 'Inventory Control', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Menu Development', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Kitchen Leadership', atsScore: 88, category: 'soft-skill' },
      { keyword: 'Plating & Presentation', atsScore: 82, category: 'hard-skill' },
      { keyword: 'Food Safety', atsScore: 90, category: 'hard-skill' },
      { keyword: 'Time Management', atsScore: 78, category: 'soft-skill' },
      { keyword: 'Quality Control', atsScore: 85, category: 'hard-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Passionate Chef de Partie with 2 years of line cook experience. Skilled in station management, plating, and maintaining food safety standards. Achieved zero health inspection violations while handling 65+ covers per hour.'
      },
      {
        level: 'experienced',
        text: 'Accomplished Chef de Partie with 5+ years managing sauce and grill stations in fine dining establishments. Expert in menu development, team training, and inventory management. Reduced food waste by 20% through portion control and stock rotation.'
      },
      {
        level: 'career-change',
        text: 'Culinary enthusiast transitioning to professional kitchen work. Strong organizational and leadership skills with formal culinary training. Passionate about quality and committed to mastering classic techniques.'
      }
    ],
    bulletExamples: [
      { action: 'Reduced', metric: 'food waste by 20%', result: 'through portion control and stock rotation', category: 'Cost Control' },
      { action: 'Managed', metric: 'kitchen team of 8', result: 'during peak hours maintaining 65+ covers per hour', category: 'Leadership' },
      { action: 'Increased', metric: 'customer satisfaction by 25%', result: 'through innovative menu items and consistent quality', category: 'Quality' },
      { action: 'Trained', metric: '4 junior staff', result: 'on cooking techniques and safety, improving efficiency by 25%', category: 'Training' }
    ],
    certifications: [
      { name: 'ServSafe Manager', description: 'Advanced food safety certification', cost: '$150-200', payBoost: '+$1-2/hr', timeToComplete: '1-2 days' },
      { name: 'HACCP Certification', description: 'Hazard analysis food safety', cost: '$150-300', payBoost: '+$1-2/hr', timeToComplete: '1-3 days' }
    ],
    templateSections: [],
    faqs: [
      { question: 'What kitchen stations can a Chef de Partie manage?', answer: 'Common stations include sauté, grill, pastry, garde manger (cold dishes), and fish. Specializing in one builds expertise.' }
    ]
  },
  {
    roleSlug: 'commis-chef',
    roleTitle: 'Commis Chef',
    industry: 'Hospitality',
    metaDescription: 'Commis Chef resume template with culinary skills, food prep experience, and kitchen support achievements for 2026.',
    experienceLevels: ['entry-level', 'no-experience'],
    blsData: {
      medianHourly: '$16.00',
      jobGrowth: '+6%',
      totalJobs: '900K',
      outlook: 'Growing',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Food Preparation', atsScore: 95, category: 'hard-skill' },
      { keyword: 'Food Safety', atsScore: 92, category: 'hard-skill' },
      { keyword: 'Kitchen Hygiene', atsScore: 90, category: 'hard-skill' },
      { keyword: 'Inventory Management', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Knife Skills', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Recipe Following', atsScore: 82, category: 'hard-skill' },
      { keyword: 'Station Setup', atsScore: 80, category: 'hard-skill' },
      { keyword: 'Team Collaboration', atsScore: 78, category: 'soft-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Dedicated Commis Chef with 1 year of kitchen experience. Proficient in food prep, station setup, and maintaining hygiene standards. Prepared 60+ dishes daily while achieving 100% quality consistency during peak hours.'
      },
      {
        level: 'no-experience',
        text: 'Passionate culinary student seeking Commis Chef position. Strong knife skills from home cooking and culinary classes. Eager to learn professional techniques and contribute to a high-performing kitchen team.'
      }
    ],
    bulletExamples: [
      { action: 'Prepared', metric: '60+ dishes daily', result: 'maintaining 100% quality consistency during peak hours', category: 'Productivity' },
      { action: 'Reduced', metric: 'kitchen waste by 20%', result: 'through optimized prep techniques and portion control', category: 'Efficiency' },
      { action: 'Trained', metric: '4 junior staff', result: 'on cooking techniques, increasing team efficiency by 25%', category: 'Training' },
      { action: 'Executed', metric: 'precise plating for 200+ covers', result: 'contributing to zero health inspection violations', category: 'Quality' }
    ],
    certifications: [
      { name: 'Food Handler Card', description: 'Basic food safety certification', cost: '$10-20', payBoost: 'Required', timeToComplete: '2-4 hours' },
      { name: 'ServSafe Food Handler', description: 'Industry-standard food safety', cost: '$15-20', payBoost: '+$0.50/hr', timeToComplete: '2-4 hours' }
    ],
    templateSections: [],
    faqs: [
      { question: 'Is Commis Chef a good starting position?', answer: 'Yes, Commis Chef is the traditional entry point for professional culinary careers. Most head chefs started in this role.' }
    ]
  },
  {
    roleSlug: 'kitchen-porter',
    roleTitle: 'Kitchen Porter',
    industry: 'Hospitality',
    metaDescription: 'Kitchen Porter resume with dishwashing efficiency, hygiene standards, and kitchen support experience for 2026.',
    experienceLevels: ['entry-level', 'no-experience'],
    blsData: {
      medianHourly: '$14.00',
      jobGrowth: '+8%',
      totalJobs: '550K',
      outlook: 'Growing',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Dishwashing', atsScore: 95, category: 'hard-skill' },
      { keyword: 'Sanitation', atsScore: 92, category: 'hard-skill' },
      { keyword: 'Kitchen Equipment', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Food Safety', atsScore: 90, category: 'hard-skill' },
      { keyword: 'Stock Rotation', atsScore: 82, category: 'hard-skill' },
      { keyword: 'Deep Cleaning', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Physical Stamina', atsScore: 80, category: 'soft-skill' },
      { keyword: 'Team Support', atsScore: 78, category: 'soft-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Reliable Kitchen Porter with 6 months experience in fast-paced restaurant kitchens. Expert in dishwashing, sanitation, and supporting food prep. Maintained 100% food safety compliance across 50+ inspections.'
      },
      {
        level: 'no-experience',
        text: 'Hardworking individual seeking Kitchen Porter position. Strong physical stamina with excellent attention to hygiene. Eager to support kitchen operations and learn culinary industry basics.'
      }
    ],
    bulletExamples: [
      { action: 'Optimized', metric: 'dishwashing processes', result: 'handling 500+ pieces per shift, reducing time by 25%', category: 'Efficiency' },
      { action: 'Implemented', metric: 'waste reduction program', result: 'minimizing food wastage by 20%', category: 'Cost Savings' },
      { action: 'Maintained', metric: '100% food safety compliance', result: 'passing all audits without violations', category: 'Compliance' },
      { action: 'Supported', metric: 'prep team efficiency', result: 'peeling and slicing for 100+ meals daily', category: 'Productivity' }
    ],
    certifications: [
      { name: 'Food Handler Card', description: 'Basic food safety', cost: '$10-20', payBoost: '+$0.50/hr', timeToComplete: '2-4 hours' }
    ],
    templateSections: [],
    faqs: [
      { question: 'Can Kitchen Porter lead to a chef career?', answer: 'Absolutely! Many successful chefs started as kitchen porters and learned by observing and assisting senior staff.' }
    ]
  },
  {
    roleSlug: 'prep-cook',
    roleTitle: 'Prep Cook',
    industry: 'Hospitality',
    metaDescription: 'Prep Cook resume example with food preparation skills, efficiency achievements, and kitchen experience for 2026.',
    experienceLevels: ['entry-level', 'experienced', 'no-experience'],
    blsData: {
      medianHourly: '$15.50',
      jobGrowth: '+7%',
      totalJobs: '800K',
      outlook: 'Growing',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Food Preparation', atsScore: 95, category: 'hard-skill' },
      { keyword: 'Knife Skills', atsScore: 92, category: 'hard-skill' },
      { keyword: 'Sanitation Standards', atsScore: 90, category: 'hard-skill' },
      { keyword: 'Inventory Control', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Recipe Following', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Food Safety', atsScore: 90, category: 'hard-skill' },
      { keyword: 'Portion Control', atsScore: 82, category: 'hard-skill' },
      { keyword: 'Time Management', atsScore: 78, category: 'soft-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Efficient Prep Cook with 1 year of experience in high-volume restaurants. Skilled in knife techniques, portion control, and maintaining sanitation standards. Reduced food spoilage by 32% through proper stock rotation.'
      },
      {
        level: 'experienced',
        text: 'Seasoned Prep Cook with 3+ years supporting busy restaurant kitchens. Expert in high-volume prep, inventory management, and training junior staff. Increased prep efficiency by 64% through workflow optimization.'
      },
      {
        level: 'no-experience',
        text: 'Detail-oriented individual seeking Prep Cook position. Strong home cooking skills with passion for food service. Quick learner ready to master professional prep techniques and food safety standards.'
      }
    ],
    bulletExamples: [
      { action: 'Rotated', metric: 'inventory stock', result: 'reducing food spoilage by 32% and saving $5,000 annually', category: 'Cost Control' },
      { action: 'Prepared', metric: 'ingredients for 250+ diners', result: 'per night with zero delays', category: 'Productivity' },
      { action: 'Trained', metric: '8 junior prep cooks', result: 'boosting team productivity by 20%', category: 'Training' },
      { action: 'Sanitized', metric: 'kitchen surfaces daily', result: 'maintaining grade-A health inspection scores for 3 years', category: 'Compliance' }
    ],
    certifications: [
      { name: 'Food Handler Card', description: 'Required for food preparation', cost: '$10-20', payBoost: 'Required', timeToComplete: '2-4 hours' },
      { name: 'ServSafe Food Handler', description: 'Industry standard certification', cost: '$15-20', payBoost: '+$0.50/hr', timeToComplete: '2-4 hours' }
    ],
    templateSections: [],
    faqs: [
      { question: 'What skills do prep cooks need?', answer: 'Essential skills include knife techniques, food safety knowledge, ability to follow recipes, time management, and physical stamina for standing and lifting.' }
    ]
  },
  {
    roleSlug: 'dishwasher',
    roleTitle: 'Dishwasher',
    industry: 'Hospitality',
    metaDescription: 'Dishwasher resume template with efficiency achievements, sanitation skills, and kitchen support experience for 2026.',
    experienceLevels: ['entry-level', 'no-experience'],
    blsData: {
      medianHourly: '$14.00',
      jobGrowth: '+9%',
      totalJobs: '520K',
      outlook: 'Growing',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Dishwashing', atsScore: 95, category: 'hard-skill' },
      { keyword: 'Sanitation', atsScore: 92, category: 'hard-skill' },
      { keyword: 'Industrial Equipment', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Food Safety', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Time Management', atsScore: 80, category: 'soft-skill' },
      { keyword: 'Physical Stamina', atsScore: 82, category: 'soft-skill' },
      { keyword: 'Team Support', atsScore: 78, category: 'soft-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Efficient dishwasher with 6 months experience in fast-paced restaurant environments. Skilled in operating industrial dishwashing equipment and maintaining sanitation standards. Processed 150+ plates per shift while reducing turnaround time by 20%.'
      },
      {
        level: 'no-experience',
        text: 'Reliable and hardworking individual seeking dishwasher position. Strong attention to detail and ability to work in fast-paced environments. Committed to maintaining clean, organized kitchen spaces.'
      }
    ],
    bulletExamples: [
      { action: 'Optimized', metric: 'dishwashing workflow', result: 'processing 150 plates per shift and reducing turnaround by 20%', category: 'Efficiency' },
      { action: 'Developed', metric: 'post-event dish system', result: 'boosting cleanup speed by 30%', category: 'Process Improvement' },
      { action: 'Monitored', metric: 'chemical levels daily', result: 'achieving 98% cleanliness rating', category: 'Quality' },
      { action: 'Trained', metric: '6 new dishwashers', result: 'enhancing team efficiency by 20%', category: 'Training' }
    ],
    certifications: [
      { name: 'Food Handler Card', description: 'Basic food safety', cost: '$10-20', payBoost: '+$0.50/hr', timeToComplete: '2-4 hours' }
    ],
    templateSections: [],
    faqs: [
      { question: 'Is dishwasher a good entry-level job?', answer: 'Yes, dishwasher positions offer flexible schedules, no experience requirements, and can lead to prep cook and line cook roles.' }
    ]
  },
  {
    roleSlug: 'forklift-driver',
    roleTitle: 'Forklift Driver',
    industry: 'Industrial',
    metaDescription: 'Forklift Driver resume example with OSHA certification, safety record, and warehouse operations experience for 2026.',
    experienceLevels: ['entry-level', 'experienced', 'career-change'],
    blsData: {
      medianHourly: '$20.00',
      jobGrowth: '+5%',
      totalJobs: '900K',
      outlook: 'Stable',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Forklift Operation', atsScore: 95, category: 'hard-skill' },
      { keyword: 'OSHA Certified', atsScore: 92, category: 'certification' },
      { keyword: 'Safety Awareness', atsScore: 90, category: 'soft-skill' },
      { keyword: 'Inventory Management', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Loading/Unloading', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Pallet Jack', atsScore: 82, category: 'hard-skill' },
      { keyword: 'Reach Truck', atsScore: 85, category: 'hard-skill' },
      { keyword: 'RF Scanner', atsScore: 80, category: 'hard-skill' },
      { keyword: 'Shipping/Receiving', atsScore: 78, category: 'hard-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'OSHA-certified Forklift Driver with 1 year of experience in warehouse operations. Skilled in loading/unloading, inventory placement, and safety compliance. Maintained 100% safety record while processing 50+ pallets daily.'
      },
      {
        level: 'experienced',
        text: 'Expert Forklift Operator with 5+ years in high-volume distribution centers. Certified in multiple forklift types including reach trucks and order pickers. Improved stock accuracy to 98% while reducing retrieval time by 40%.'
      },
      {
        level: 'career-change',
        text: 'Detail-oriented professional transitioning to forklift operation with recent OSHA certification. Strong safety awareness and mechanical aptitude. Committed to efficient, incident-free warehouse operations.'
      }
    ],
    bulletExamples: [
      { action: 'Operated', metric: 'forklifts to load 50+ pallets daily', result: 'boosting warehouse throughput by 25%', category: 'Productivity' },
      { action: 'Conducted', metric: 'daily safety inspections', result: 'reducing malfunctions and downtime by 15%', category: 'Safety' },
      { action: 'Managed', metric: 'inventory placement for 200+ items', result: 'improving stock accuracy to 98%', category: 'Accuracy' },
      { action: 'Trained', metric: '10+ new hires', result: 'on forklift techniques, halving onboarding time', category: 'Training' }
    ],
    certifications: [
      { name: 'Forklift Certification', description: 'OSHA-compliant operator certification', cost: '$50-150', payBoost: '+$1-3/hr', timeToComplete: '1-2 days', required: true },
      { name: 'OSHA 10-Hour', description: 'General industry safety', cost: 'Free-$25', payBoost: '+$0.50-1/hr', timeToComplete: '10 hours' }
    ],
    templateSections: [],
    faqs: [
      { question: 'Is forklift certification required?', answer: 'Yes, OSHA requires employers to certify all forklift operators. Many companies provide free training for new hires.' }
    ]
  },
  {
    roleSlug: 'delivery-driver',
    roleTitle: 'Delivery Driver',
    industry: 'Industrial',
    metaDescription: 'Delivery Driver resume example with route optimization, safety record, and on-time delivery achievements for 2026.',
    experienceLevels: ['entry-level', 'experienced', 'career-change'],
    blsData: {
      medianHourly: '$18.50',
      jobGrowth: '+12%',
      totalJobs: '1.5M',
      outlook: 'Strong',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Route Optimization', atsScore: 95, category: 'hard-skill' },
      { keyword: 'Safe Driving', atsScore: 92, category: 'hard-skill' },
      { keyword: 'CDL', atsScore: 90, category: 'certification' },
      { keyword: 'GPS Navigation', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Customer Service', atsScore: 85, category: 'soft-skill' },
      { keyword: 'Time Management', atsScore: 82, category: 'soft-skill' },
      { keyword: 'Vehicle Maintenance', atsScore: 80, category: 'hard-skill' },
      { keyword: 'Loading/Unloading', atsScore: 78, category: 'hard-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Reliable Delivery Driver with clean driving record and 1 year of local delivery experience. Skilled in route navigation, customer service, and safe vehicle operation. Achieved 99%+ on-time delivery rate.'
      },
      {
        level: 'experienced',
        text: 'Professional Delivery Driver with 4+ years transporting goods across regional routes. Expert in route optimization, vehicle maintenance, and DOT compliance. Reduced fuel costs by 15% through efficient route planning.'
      },
      {
        level: 'career-change',
        text: 'Customer service professional transitioning to delivery driving. Clean driving record with strong navigation skills. Reliable, punctual, and committed to safe, on-time deliveries.'
      }
    ],
    bulletExamples: [
      { action: 'Optimized', metric: 'delivery routes', result: 'reducing fuel costs by 15% and saving $7,000 annually', category: 'Efficiency' },
      { action: 'Managed', metric: '15+ daily routes', result: 'achieving 99.6% on-time delivery rate', category: 'Productivity' },
      { action: 'Conducted', metric: '500+ deliveries', result: 'maintaining zero accidents for 3 years', category: 'Safety' },
      { action: 'Performed', metric: 'vehicle maintenance', result: 'reducing downtime by 20%', category: 'Operations' }
    ],
    certifications: [
      { name: 'CDL', description: 'Commercial Driver\'s License', cost: '$50-200', payBoost: '+$3-5/hr', timeToComplete: '2-6 weeks' },
      { name: 'DOT Medical Card', description: 'Required for commercial driving', cost: '$50-150', payBoost: 'Required', timeToComplete: '1 day' }
    ],
    templateSections: [],
    faqs: [
      { question: 'Do I need a CDL for delivery driving?', answer: 'Most local delivery jobs require only a standard license. CDL is needed for vehicles over 26,000 lbs.' }
    ]
  },
  {
    roleSlug: 'machine-operator',
    roleTitle: 'Machine Operator',
    industry: 'Industrial',
    metaDescription: 'Machine Operator resume example with CNC experience, preventive maintenance skills, and production achievements for 2026.',
    experienceLevels: ['entry-level', 'experienced', 'career-change'],
    blsData: {
      medianHourly: '$19.00',
      jobGrowth: '+4%',
      totalJobs: '1.1M',
      outlook: 'Stable',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Machine Operation', atsScore: 95, category: 'hard-skill' },
      { keyword: 'CNC', atsScore: 92, category: 'hard-skill' },
      { keyword: 'Preventive Maintenance', atsScore: 90, category: 'hard-skill' },
      { keyword: 'Quality Control', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Safety Compliance', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Blueprint Reading', atsScore: 82, category: 'hard-skill' },
      { keyword: 'Troubleshooting', atsScore: 80, category: 'hard-skill' },
      { keyword: 'Production Targets', atsScore: 78, category: 'hard-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Detail-oriented Machine Operator with 1 year of manufacturing experience. Skilled in machine setup, quality control, and safety compliance. Achieved 95% quality rate while maintaining production targets.'
      },
      {
        level: 'experienced',
        text: 'Experienced CNC Machine Operator with 5+ years in high-volume production environments. Expert in setup, calibration, and preventive maintenance. Reduced downtime by 30% through proactive equipment care.'
      },
      {
        level: 'career-change',
        text: 'Mechanically inclined professional transitioning to machine operation. Strong troubleshooting abilities and safety awareness. Eager to apply technical skills in manufacturing environment.'
      }
    ],
    bulletExamples: [
      { action: 'Operated', metric: 'CNC machines', result: 'achieving 98% uptime and producing 500+ components weekly', category: 'Productivity' },
      { action: 'Conducted', metric: 'preventative maintenance', result: 'reducing downtime by 30%', category: 'Maintenance' },
      { action: 'Implemented', metric: 'process improvements', result: 'cutting waste by 30% and boosting efficiency', category: 'Efficiency' },
      { action: 'Trained', metric: '8 new operators', result: 'enhancing team productivity by 15%', category: 'Training' }
    ],
    certifications: [
      { name: 'OSHA 10-Hour', description: 'Manufacturing safety training', cost: 'Free-$25', payBoost: '+$0.50-1/hr', timeToComplete: '10 hours' },
      { name: 'CNC Certification', description: 'Computer numerical control operation', cost: '$500-2000', payBoost: '+$2-4/hr', timeToComplete: '1-3 months' }
    ],
    templateSections: [],
    faqs: [
      { question: 'Do machine operators need certifications?', answer: 'Entry-level positions often train on-the-job. CNC or specialized equipment certifications can increase pay by $2-4/hr.' }
    ]
  },
  {
    roleSlug: 'loader-crew',
    roleTitle: 'Loader / Crew',
    industry: 'Industrial',
    metaDescription: 'Loader and Crew resume example with material handling skills, safety compliance, and loading efficiency for 2026.',
    experienceLevels: ['entry-level', 'experienced', 'no-experience'],
    blsData: {
      medianHourly: '$17.50',
      jobGrowth: '+6%',
      totalJobs: '750K',
      outlook: 'Stable',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Loading/Unloading', atsScore: 95, category: 'hard-skill' },
      { keyword: 'Forklift Operation', atsScore: 92, category: 'hard-skill' },
      { keyword: 'Material Handling', atsScore: 90, category: 'hard-skill' },
      { keyword: 'Safety Compliance', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Physical Stamina', atsScore: 85, category: 'soft-skill' },
      { keyword: 'Team Coordination', atsScore: 82, category: 'soft-skill' },
      { keyword: 'Pallet Jack', atsScore: 80, category: 'hard-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Dependable Loader with 1 year of experience in fast-paced warehouse environments. Skilled in loading trucks, operating pallet jacks, and maintaining safety standards. Processed 500+ pallets weekly with zero shipment delays.'
      },
      {
        level: 'experienced',
        text: 'Efficient Loader with 3+ years handling high-volume freight operations. Expert in forklift operation, hazardous materials handling, and team coordination. Reduced damage incidents by 30% through meticulous handling.'
      },
      {
        level: 'no-experience',
        text: 'Physically fit individual seeking Loader position. Strong work ethic with ability to lift 50+ lbs consistently. Eager to learn proper loading techniques and contribute to team efficiency.'
      }
    ],
    bulletExamples: [
      { action: 'Loaded', metric: '500+ pallets weekly', result: 'ensuring 100% on-time departures', category: 'Productivity' },
      { action: 'Trained', metric: '10 new team members', result: 'on forklift and safety protocols, reducing onboarding time by 25%', category: 'Training' },
      { action: 'Streamlined', metric: 'unloading procedures', result: 'improving efficiency by 25%', category: 'Efficiency' },
      { action: 'Reduced', metric: 'damage incidents by 30%', result: 'through meticulous handling and quality checks', category: 'Quality' }
    ],
    certifications: [
      { name: 'Forklift Certification', description: 'OSHA-compliant operator certification', cost: '$50-150', payBoost: '+$1-2/hr', timeToComplete: '1-2 days' }
    ],
    templateSections: [],
    faqs: [
      { question: 'What physical requirements do loaders have?', answer: 'Most positions require lifting 50+ lbs, standing for 8+ hours, and working in varying temperatures. Physical stamina is essential.' }
    ]
  },
  {
    roleSlug: 'assembler',
    roleTitle: 'Assembler',
    industry: 'Industrial',
    metaDescription: 'Assembler resume example with production line experience, quality control achievements, and manufacturing skills for 2026.',
    experienceLevels: ['entry-level', 'experienced', 'no-experience'],
    blsData: {
      medianHourly: '$17.00',
      jobGrowth: '+3%',
      totalJobs: '1.8M',
      outlook: 'Stable',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Assembly', atsScore: 95, category: 'hard-skill' },
      { keyword: 'Quality Control', atsScore: 92, category: 'hard-skill' },
      { keyword: 'Blueprint Reading', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Hand Tools', atsScore: 90, category: 'hard-skill' },
      { keyword: 'Precision Measurement', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Safety Compliance', atsScore: 82, category: 'hard-skill' },
      { keyword: 'Production Targets', atsScore: 80, category: 'hard-skill' },
      { keyword: 'Lean Manufacturing', atsScore: 78, category: 'hard-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Detail-oriented Assembler with 1 year of production line experience. Skilled in blueprint reading, hand tools, and quality control. Achieved 98% accuracy while exceeding production quotas by 15%.'
      },
      {
        level: 'experienced',
        text: 'Skilled Assembler with 4+ years in precision manufacturing. Expert in complex assemblies, quality inspection, and lean principles. Led initiatives that cut setup times by 40% and reduced defects by 15%.'
      },
      {
        level: 'no-experience',
        text: 'Mechanically inclined individual seeking Assembler position. Strong attention to detail with good hand dexterity. Quick learner ready to master assembly techniques and quality standards.'
      }
    ],
    bulletExamples: [
      { action: 'Assembled', metric: '100+ precision units daily', result: 'achieving 98% accuracy and exceeding quotas by 15%', category: 'Productivity' },
      { action: 'Implemented', metric: 'quality control checks', result: 'reducing defects by 15% and saving $10K annually', category: 'Quality' },
      { action: 'Trained', metric: '5 new assemblers', result: 'boosting team efficiency by 20%', category: 'Training' },
      { action: 'Optimized', metric: 'assembly processes', result: 'increasing output by 25%', category: 'Efficiency' }
    ],
    certifications: [
      { name: 'IPC-A-610', description: 'Electronics assembly standard', cost: '$200-400', payBoost: '+$1-2/hr', timeToComplete: '2-3 days' },
      { name: 'OSHA 10-Hour', description: 'Manufacturing safety', cost: 'Free-$25', payBoost: '+$0.50/hr', timeToComplete: '10 hours' }
    ],
    templateSections: [],
    faqs: [
      { question: 'Do assemblers need experience?', answer: 'Many entry-level positions provide on-the-job training. Basic mechanical aptitude and hand dexterity are the main requirements.' }
    ]
  },
  {
    roleSlug: 'sales-associate',
    roleTitle: 'Sales Associate',
    industry: 'Retail',
    metaDescription: 'Sales Associate resume example with sales achievements, customer service skills, and retail experience for 2026.',
    experienceLevels: ['entry-level', 'experienced', 'no-experience', 'career-change'],
    blsData: {
      medianHourly: '$15.50',
      jobGrowth: '+2%',
      totalJobs: '4.0M',
      outlook: 'Stable',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Sales', atsScore: 95, category: 'hard-skill' },
      { keyword: 'Customer Service', atsScore: 92, category: 'soft-skill' },
      { keyword: 'Upselling', atsScore: 90, category: 'hard-skill' },
      { keyword: 'POS Systems', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Product Knowledge', atsScore: 85, category: 'hard-skill' },
      { keyword: 'Visual Merchandising', atsScore: 80, category: 'hard-skill' },
      { keyword: 'Inventory Management', atsScore: 78, category: 'hard-skill' },
      { keyword: 'CRM', atsScore: 75, category: 'hard-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Enthusiastic Sales Associate with 1 year of retail experience. Skilled in customer engagement, POS systems, and visual merchandising. Exceeded monthly sales targets by 15% through effective upselling.'
      },
      {
        level: 'experienced',
        text: 'Top-performing Sales Associate with 4+ years in high-volume retail. Expert in customer relations, inventory management, and team leadership. Consistently achieved 120-135% of annual sales quota.'
      },
      {
        level: 'no-experience',
        text: 'Personable individual seeking Sales Associate position. Natural ability to connect with people and identify their needs. Eager to learn retail operations and build customer relationships.'
      },
      {
        level: 'career-change',
        text: 'Customer-focused professional transitioning to retail sales. Strong communication and relationship-building skills from previous client-facing roles. Passionate about delivering exceptional shopping experiences.'
      }
    ],
    bulletExamples: [
      { action: 'Exceeded', metric: 'monthly sales targets by 15%', result: 'through targeted upselling and cross-selling', category: 'Sales' },
      { action: 'Boosted', metric: 'store sales by 20%', result: 'by building customer rapport and recommending products', category: 'Revenue' },
      { action: 'Increased', metric: 'repeat business by 25%', result: 'through CRM implementation and follow-ups', category: 'Customer Retention' },
      { action: 'Reduced', metric: 'stock shortages by 20%', result: 'through accurate forecasting and reordering', category: 'Inventory' }
    ],
    certifications: [],
    templateSections: [],
    faqs: [
      { question: 'What makes a good sales associate?', answer: 'Key traits include excellent communication, product knowledge, ability to read customer needs, positive attitude, and persistence without being pushy.' }
    ]
  },
  {
    roleSlug: 'cashier',
    roleTitle: 'Cashier',
    industry: 'Retail',
    metaDescription: 'Cashier resume example with transaction accuracy, customer service skills, and retail experience for 2026.',
    experienceLevels: ['entry-level', 'experienced', 'no-experience'],
    blsData: {
      medianHourly: '$14.50',
      jobGrowth: '-1%',
      totalJobs: '3.3M',
      outlook: 'Declining',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Cash Handling', atsScore: 95, category: 'hard-skill' },
      { keyword: 'POS Systems', atsScore: 92, category: 'hard-skill' },
      { keyword: 'Customer Service', atsScore: 90, category: 'soft-skill' },
      { keyword: 'Transaction Processing', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Accuracy', atsScore: 85, category: 'soft-skill' },
      { keyword: 'Problem Resolution', atsScore: 80, category: 'soft-skill' },
      { keyword: 'Upselling', atsScore: 78, category: 'hard-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Accurate Cashier with 1 year of retail experience. Skilled in POS systems, cash handling, and customer service. Processed 250+ transactions daily with 98% accuracy and zero discrepancies.'
      },
      {
        level: 'experienced',
        text: 'Efficient Cashier with 3+ years in high-volume retail environments. Expert in cash management, team training, and customer issue resolution. Managed drawers with 99.9% accuracy while leading checkout teams.'
      },
      {
        level: 'no-experience',
        text: 'Detail-oriented individual seeking Cashier position. Strong math skills and friendly demeanor. Quick learner ready to master POS systems and provide excellent customer service.'
      }
    ],
    bulletExamples: [
      { action: 'Processed', metric: '250+ transactions daily', result: 'with 98% accuracy and zero cash discrepancies', category: 'Accuracy' },
      { action: 'Trained', metric: '5 new cashiers', result: 'boosting team efficiency by 25%', category: 'Training' },
      { action: 'Upsold', metric: 'promotions and loyalty programs', result: 'increasing sign-ups by 15%', category: 'Sales' },
      { action: 'Resolved', metric: '90% of complaints on first contact', result: 'improving satisfaction ratings by 20%', category: 'Service' }
    ],
    certifications: [],
    templateSections: [],
    faqs: [
      { question: 'What skills do cashiers need?', answer: 'Essential skills include accurate cash handling, basic math, customer service, POS proficiency, and ability to work efficiently during busy periods.' }
    ]
  },
  {
    roleSlug: 'custodian',
    roleTitle: 'Custodian',
    industry: 'Facilities',
    metaDescription: 'Custodian resume example with facility maintenance experience, cleaning expertise, and safety compliance for 2026.',
    experienceLevels: ['entry-level', 'experienced', 'no-experience'],
    blsData: {
      medianHourly: '$16.00',
      jobGrowth: '+5%',
      totalJobs: '2.2M',
      outlook: 'Stable',
      source: 'BLS',
      lastUpdated: '2025'
    },
    skillsKeywords: [
      { keyword: 'Facility Maintenance', atsScore: 95, category: 'hard-skill' },
      { keyword: 'Floor Care', atsScore: 92, category: 'hard-skill' },
      { keyword: 'Sanitation', atsScore: 90, category: 'hard-skill' },
      { keyword: 'Equipment Operation', atsScore: 88, category: 'hard-skill' },
      { keyword: 'Chemical Safety', atsScore: 85, category: 'hard-skill' },
      { keyword: 'OSHA Compliance', atsScore: 82, category: 'certification' },
      { keyword: 'Time Management', atsScore: 80, category: 'soft-skill' },
      { keyword: 'Inventory Control', atsScore: 78, category: 'hard-skill' },
    ],
    professionalSummaries: [
      {
        level: 'entry-level',
        text: 'Dependable Custodian with 1 year of commercial cleaning experience. Skilled in floor care equipment, sanitation protocols, and supply management. Maintained 100,000+ sq ft to exceeding cleanliness standards.'
      },
      {
        level: 'experienced',
        text: 'Experienced Custodian with 5+ years maintaining large commercial and institutional facilities. Expert in sustainable cleaning practices, team supervision, and equipment maintenance. Reduced workplace injuries by 40% through safety training.'
      },
      {
        level: 'no-experience',
        text: 'Reliable individual seeking Custodian position. Strong work ethic with attention to cleanliness and detail. Committed to maintaining safe, hygienic environments for building occupants.'
      }
    ],
    bulletExamples: [
      { action: 'Maintained', metric: '1.4 million sq ft', result: 'of office space daily, reducing cleaning time by 25%', category: 'Operations' },
      { action: 'Implemented', metric: 'color-coded cleaning system', result: 'minimizing cross-contamination risks by 30%', category: 'Safety' },
      { action: 'Developed', metric: 'sustainable cleaning protocols', result: 'cutting chemical usage by 40%', category: 'Sustainability' },
      { action: 'Supervised', metric: 'team of 50 custodians', result: 'reducing workplace injuries by 40%', category: 'Leadership' }
    ],
    certifications: [
      { name: 'OSHA 10-Hour', description: 'Workplace safety certification', cost: 'Free-$25', payBoost: '+$0.50-1/hr', timeToComplete: '10 hours' },
      { name: 'Bloodborne Pathogens', description: 'Healthcare facility cleaning', cost: '$25-50', payBoost: '+$1-2/hr', timeToComplete: '2-4 hours' },
      { name: 'Green Cleaning', description: 'Sustainable cleaning practices', cost: '$50-100', payBoost: '+$0.50-1/hr', timeToComplete: '4-8 hours' }
    ],
    templateSections: [],
    faqs: [
      { question: 'What equipment should custodians know?', answer: 'Common equipment includes floor buffers, scrubbers, extractors, pressure washers, and industrial vacuums. Knowledge of chemical safety is also essential.' }
    ]
  }
];
