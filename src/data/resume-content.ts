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
