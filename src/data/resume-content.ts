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
  }
];
