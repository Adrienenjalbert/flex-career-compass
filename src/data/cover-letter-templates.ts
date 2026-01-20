export interface CoverLetterTemplate {
  slug: string;
  name: string;
  description: string;
  bestFor: string[];
  notRecommendedFor: string[];
  icon: string;
  sections: CoverLetterSection[];
  variables: CoverLetterVariable[];
  tips: string[];
  industryFit: {
    industrial: number;
    hospitality: number;
    retail: number;
    facilities: number;
  };
  exampleData: Record<string, string>;
}

export interface CoverLetterSection {
  id: string;
  name: string;
  content: string;
  order: number;
  required: boolean;
}

export interface CoverLetterVariable {
  id: string;
  label: string;
  placeholder: string;
  defaultValue: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[];
}

export const coverLetterTemplates: Record<string, CoverLetterTemplate> = {
  'standard': {
    slug: 'standard',
    name: 'Standard Cover Letter',
    description: 'The classic three-paragraph format that works for most situations. Professional, straightforward, and easy to customize for any role.',
    bestFor: [
      'Traditional employers and staffing agencies',
      'Permanent or temp-to-perm positions',
      'When applying through formal channels',
      'Roles that specifically request a cover letter'
    ],
    notRecommendedFor: [
      'Quick-apply gig work',
      'Same-day shift bookings',
      'Casual job fairs or walk-in applications'
    ],
    icon: '📝',
    industryFit: { industrial: 90, hospitality: 85, retail: 85, facilities: 90 },
    variables: [
      { id: 'your_name', label: 'Your Full Name', placeholder: 'John Smith', defaultValue: '', type: 'text' },
      { id: 'your_phone', label: 'Your Phone', placeholder: '(555) 123-4567', defaultValue: '', type: 'text' },
      { id: 'your_email', label: 'Your Email', placeholder: 'john.smith@email.com', defaultValue: '', type: 'text' },
      { id: 'your_city', label: 'Your City, State', placeholder: 'Austin, TX', defaultValue: '', type: 'text' },
      { id: 'date', label: 'Date', placeholder: 'January 20, 2026', defaultValue: '', type: 'text' },
      { id: 'hiring_manager', label: 'Hiring Manager Name', placeholder: 'Hiring Manager', defaultValue: 'Hiring Manager', type: 'text' },
      { id: 'company_name', label: 'Company Name', placeholder: 'Amazon Fulfillment Center', defaultValue: '', type: 'text' },
      { id: 'job_title', label: 'Job Title', placeholder: 'Warehouse Associate', defaultValue: '', type: 'text' },
      { id: 'how_found', label: 'How You Found the Job', placeholder: 'Indeed Flex app', defaultValue: '', type: 'text' },
      { id: 'why_interested', label: 'Why You\'re Interested', placeholder: 'Describe what attracts you to this role and company...', defaultValue: '', type: 'textarea' },
      { id: 'key_skill_1', label: 'Key Skill/Achievement 1', placeholder: 'Processed 150+ orders daily with 99.5% accuracy at previous warehouse', defaultValue: '', type: 'textarea' },
      { id: 'key_skill_2', label: 'Key Skill/Achievement 2', placeholder: 'Trained 8 new team members on RF scanner operations', defaultValue: '', type: 'textarea' },
      { id: 'closing_statement', label: 'Closing Statement', placeholder: 'I am available for immediate start and flexible scheduling...', defaultValue: '', type: 'textarea' }
    ],
    sections: [
      { id: 'header', name: 'Your Contact Info', order: 1, required: true, content: '{your_name}\n{your_phone} | {your_email}\n{your_city}\n\n{date}' },
      { id: 'recipient', name: 'Recipient', order: 2, required: true, content: 'Dear {hiring_manager},' },
      { id: 'opening', name: 'Opening Paragraph', order: 3, required: true, content: 'I am writing to express my interest in the {job_title} position at {company_name}, which I found through {how_found}. {why_interested}' },
      { id: 'body', name: 'Body Paragraph', order: 4, required: true, content: 'In my previous roles, I have developed skills directly applicable to this position:\n\n• {key_skill_1}\n• {key_skill_2}' },
      { id: 'closing', name: 'Closing Paragraph', order: 5, required: true, content: '{closing_statement}\n\nThank you for considering my application. I look forward to the opportunity to discuss how I can contribute to {company_name}.\n\nSincerely,\n{your_name}' }
    ],
    tips: [
      'Keep it to one page (3-4 paragraphs maximum)',
      'Address the hiring manager by name if possible',
      'Match keywords from the job posting',
      'Quantify achievements with numbers when possible',
      'Proofread carefully for spelling and grammar errors'
    ],
    exampleData: {
      your_name: 'John Smith',
      your_phone: '(555) 123-4567',
      your_email: 'john.smith@email.com',
      your_city: 'Austin, TX',
      date: 'January 20, 2026',
      hiring_manager: 'Ms. Sarah Johnson',
      company_name: 'Amazon Fulfillment Center',
      job_title: 'Warehouse Associate',
      how_found: 'Indeed Flex app',
      why_interested: 'I am drawn to Amazon\'s reputation for operational excellence and opportunities for growth. The fast-paced fulfillment environment aligns perfectly with my experience and work style.',
      key_skill_1: 'Processed 150+ orders daily with 99.5% accuracy at FedEx Ground, consistently exceeding productivity targets',
      key_skill_2: 'Trained 8 new team members on RF scanner operations and safety protocols, reducing onboarding time by 20%',
      closing_statement: 'I am available for immediate start and flexible scheduling including nights, weekends, and overtime. I am forklift certified and ready to contribute from day one.'
    }
  },
  'temp-flex': {
    slug: 'temp-flex',
    name: 'Temp/Flex Worker Cover Letter',
    description: 'Tailored for flexible work applications. Emphasizes availability, reliability, and adaptability—the key traits staffing agencies and Indeed Flex clients value most.',
    bestFor: [
      'Indeed Flex shift applications',
      'Staffing agency registrations',
      'Multiple short-term assignments',
      'Workers who value flexibility over permanence'
    ],
    notRecommendedFor: [
      'Permanent positions seeking long-term commitment',
      'Executive or senior management roles',
      'Highly specialized technical positions'
    ],
    icon: '⚡',
    industryFit: { industrial: 95, hospitality: 95, retail: 90, facilities: 90 },
    variables: [
      { id: 'your_name', label: 'Your Full Name', placeholder: 'Maria Garcia', defaultValue: '', type: 'text' },
      { id: 'your_phone', label: 'Your Phone', placeholder: '(555) 234-5678', defaultValue: '', type: 'text' },
      { id: 'your_email', label: 'Your Email', placeholder: 'maria.garcia@email.com', defaultValue: '', type: 'text' },
      { id: 'your_city', label: 'Your City, State', placeholder: 'Houston, TX', defaultValue: '', type: 'text' },
      { id: 'date', label: 'Date', placeholder: 'January 20, 2026', defaultValue: '', type: 'text' },
      { id: 'company_name', label: 'Company/Agency Name', placeholder: 'Indeed Flex', defaultValue: '', type: 'text' },
      { id: 'role_types', label: 'Types of Roles Interested In', placeholder: 'warehouse, event staffing, and hospitality', defaultValue: '', type: 'text' },
      { id: 'availability', label: 'Your Availability', placeholder: 'days, evenings, and weekends with same-day booking flexibility', defaultValue: '', type: 'text' },
      { id: 'total_shifts', label: 'Total Shifts/Experience', placeholder: '200+ shifts across multiple industries', defaultValue: '', type: 'text' },
      { id: 'rating', label: 'Your Rating (if applicable)', placeholder: '4.9-star rating', defaultValue: '', type: 'text' },
      { id: 'top_skills', label: 'Top 3 Skills', placeholder: 'RF scanner operation, forklift certification, and customer service', defaultValue: '', type: 'textarea' },
      { id: 'reliability_proof', label: 'Reliability Proof', placeholder: '98% attendance rate and zero no-shows', defaultValue: '', type: 'text' },
      { id: 'industries', label: 'Industries Experienced In', placeholder: 'warehousing, hospitality, and retail', defaultValue: '', type: 'text' }
    ],
    sections: [
      { id: 'header', name: 'Your Contact Info', order: 1, required: true, content: '{your_name}\n{your_phone} | {your_email}\n{your_city}\n\n{date}' },
      { id: 'recipient', name: 'Recipient', order: 2, required: true, content: 'To the {company_name} Team,' },
      { id: 'opening', name: 'Opening', order: 3, required: true, content: 'I am a reliable and adaptable flex worker seeking {role_types} opportunities through {company_name}. I am available {availability} and ready to start immediately.' },
      { id: 'experience', name: 'Experience & Stats', order: 4, required: true, content: 'With {total_shifts} and a {rating}, I bring proven reliability to every assignment. My key skills include {top_skills}. Clients consistently praise my {reliability_proof}.' },
      { id: 'versatility', name: 'Versatility', order: 5, required: true, content: 'I have experience across {industries}, making me versatile for various assignment types. I adapt quickly to new environments and consistently receive positive feedback from clients.' },
      { id: 'closing', name: 'Closing', order: 6, required: true, content: 'I look forward to contributing to your team and building a strong track record with {company_name}.\n\nBest regards,\n{your_name}' }
    ],
    tips: [
      'Lead with your availability and flexibility',
      'Include your Indeed Flex rating if 4.5+ stars',
      'Mention total shifts completed to show experience',
      'Highlight same-day availability if applicable',
      'List multiple industries to show versatility',
      'Emphasize attendance record and punctuality'
    ],
    exampleData: {
      your_name: 'Maria Garcia',
      your_phone: '(555) 234-5678',
      your_email: 'maria.garcia@email.com',
      your_city: 'Houston, TX',
      date: 'January 20, 2026',
      company_name: 'Indeed Flex',
      role_types: 'warehouse, event staffing, and hospitality',
      availability: 'days, evenings, and weekends with same-day booking flexibility',
      total_shifts: '200+ shifts across multiple industries',
      rating: '4.9-star rating',
      top_skills: 'RF scanner operation, forklift certification, and customer service excellence',
      reliability_proof: '98% attendance rate and zero no-shows',
      industries: 'warehousing, hospitality, and retail'
    }
  },
  'career-change': {
    slug: 'career-change',
    name: 'Career Changer Cover Letter',
    description: 'Designed for those transitioning into temp/flex work from another career. Focuses on transferable skills and explains why you\'re making the switch.',
    bestFor: [
      'Professionals entering gig/temp work',
      'Those leaving corporate for flexibility',
      'Career changers with relevant transferable skills',
      'Workers seeking work-life balance through flex work'
    ],
    notRecommendedFor: [
      'Those with direct industry experience',
      'Entry-level candidates without prior work',
      'When your background is directly relevant'
    ],
    icon: '🔄',
    industryFit: { industrial: 80, hospitality: 85, retail: 90, facilities: 75 },
    variables: [
      { id: 'your_name', label: 'Your Full Name', placeholder: 'David Chen', defaultValue: '', type: 'text' },
      { id: 'your_phone', label: 'Your Phone', placeholder: '(555) 345-6789', defaultValue: '', type: 'text' },
      { id: 'your_email', label: 'Your Email', placeholder: 'david.chen@email.com', defaultValue: '', type: 'text' },
      { id: 'your_city', label: 'Your City, State', placeholder: 'Chicago, IL', defaultValue: '', type: 'text' },
      { id: 'date', label: 'Date', placeholder: 'January 20, 2026', defaultValue: '', type: 'text' },
      { id: 'hiring_manager', label: 'Hiring Manager Name', placeholder: 'Hiring Manager', defaultValue: 'Hiring Manager', type: 'text' },
      { id: 'company_name', label: 'Company Name', placeholder: 'Target Distribution Center', defaultValue: '', type: 'text' },
      { id: 'job_title', label: 'Job Title', placeholder: 'Warehouse Associate', defaultValue: '', type: 'text' },
      { id: 'previous_career', label: 'Previous Career/Industry', placeholder: 'office administration', defaultValue: '', type: 'text' },
      { id: 'why_change', label: 'Why You\'re Making This Change', placeholder: 'seeking more active work with flexible scheduling that fits my lifestyle', defaultValue: '', type: 'textarea' },
      { id: 'transferable_skill_1', label: 'Transferable Skill 1', placeholder: 'Organizational skills: Managed complex filing systems and inventory tracking', defaultValue: '', type: 'textarea' },
      { id: 'transferable_skill_2', label: 'Transferable Skill 2', placeholder: 'Attention to detail: Processed 500+ documents monthly with 99% accuracy', defaultValue: '', type: 'textarea' },
      { id: 'transferable_skill_3', label: 'Transferable Skill 3', placeholder: 'Team collaboration: Coordinated with 20+ colleagues on daily workflows', defaultValue: '', type: 'textarea' },
      { id: 'enthusiasm', label: 'Enthusiasm Statement', placeholder: 'I am eager to apply my strong work ethic and proven reliability to this new path', defaultValue: '', type: 'textarea' }
    ],
    sections: [
      { id: 'header', name: 'Your Contact Info', order: 1, required: true, content: '{your_name}\n{your_phone} | {your_email}\n{your_city}\n\n{date}' },
      { id: 'recipient', name: 'Recipient', order: 2, required: true, content: 'Dear {hiring_manager},' },
      { id: 'opening', name: 'Opening', order: 3, required: true, content: 'I am excited to apply for the {job_title} position at {company_name}. While my background is in {previous_career}, I am {why_change}.' },
      { id: 'transferable', name: 'Transferable Skills', order: 4, required: true, content: 'My previous experience has equipped me with valuable transferable skills:\n\n• {transferable_skill_1}\n• {transferable_skill_2}\n• {transferable_skill_3}' },
      { id: 'enthusiasm', name: 'Enthusiasm & Commitment', order: 5, required: true, content: '{enthusiasm}. I am a quick learner, physically fit, and committed to exceeding expectations in every shift.' },
      { id: 'closing', name: 'Closing', order: 6, required: true, content: 'I would welcome the opportunity to discuss how my diverse background and strong work ethic make me an asset to your team.\n\nSincerely,\n{your_name}' }
    ],
    tips: [
      'Frame your career change positively—focus on what you\'re moving toward',
      'Identify 3-5 transferable skills from your previous work',
      'Use action verbs and quantify achievements from past roles',
      'Show enthusiasm for the new direction',
      'Address the transition directly rather than avoiding it',
      'Highlight soft skills like reliability, adaptability, and work ethic'
    ],
    exampleData: {
      your_name: 'David Chen',
      your_phone: '(555) 345-6789',
      your_email: 'david.chen@email.com',
      your_city: 'Chicago, IL',
      date: 'January 20, 2026',
      hiring_manager: 'Hiring Manager',
      company_name: 'Target Distribution Center',
      job_title: 'Warehouse Associate',
      previous_career: 'office administration',
      why_change: 'seeking more active work with flexible scheduling that fits my lifestyle. After 5 years in an office environment, I am excited to transition into hands-on warehouse operations',
      transferable_skill_1: 'Organizational skills: Managed complex filing systems and inventory tracking for office supplies with zero discrepancies',
      transferable_skill_2: 'Attention to detail: Processed 500+ documents monthly with 99% accuracy and caught errors before they impacted operations',
      transferable_skill_3: 'Team collaboration: Coordinated with 20+ colleagues daily on workflow management and deadline compliance',
      enthusiasm: 'I am eager to apply my strong work ethic, proven reliability, and organizational skills to this new path'
    }
  },
  'entry-level': {
    slug: 'entry-level',
    name: 'Entry-Level Cover Letter',
    description: 'Perfect for first-time job seekers, students, and recent graduates. Highlights education, volunteer work, and eagerness to learn.',
    bestFor: [
      'First job seekers with no work experience',
      'Students seeking part-time flex work',
      'Recent high school or college graduates',
      'Those re-entering the workforce'
    ],
    notRecommendedFor: [
      'Experienced workers with solid work history',
      'Senior or supervisory positions',
      'Roles requiring specific certifications you don\'t have'
    ],
    icon: '🎓',
    industryFit: { industrial: 75, hospitality: 95, retail: 95, facilities: 70 },
    variables: [
      { id: 'your_name', label: 'Your Full Name', placeholder: 'Emily Rodriguez', defaultValue: '', type: 'text' },
      { id: 'your_phone', label: 'Your Phone', placeholder: '(555) 456-7890', defaultValue: '', type: 'text' },
      { id: 'your_email', label: 'Your Email', placeholder: 'emily.rodriguez@email.com', defaultValue: '', type: 'text' },
      { id: 'your_city', label: 'Your City, State', placeholder: 'Nashville, TN', defaultValue: '', type: 'text' },
      { id: 'date', label: 'Date', placeholder: 'January 20, 2026', defaultValue: '', type: 'text' },
      { id: 'hiring_manager', label: 'Hiring Manager Name', placeholder: 'Hiring Manager', defaultValue: 'Hiring Manager', type: 'text' },
      { id: 'company_name', label: 'Company Name', placeholder: 'Marriott Hotels', defaultValue: '', type: 'text' },
      { id: 'job_title', label: 'Job Title', placeholder: 'Event Staff', defaultValue: '', type: 'text' },
      { id: 'education', label: 'Education/Current Status', placeholder: 'a sophomore at Nashville State Community College studying Hospitality Management', defaultValue: '', type: 'text' },
      { id: 'availability', label: 'Your Availability', placeholder: 'evenings and weekends, with full-time availability during school breaks', defaultValue: '', type: 'text' },
      { id: 'relevant_activity_1', label: 'Relevant Activity/Skill 1', placeholder: 'Volunteered at 10+ community events, handling setup, guest services, and cleanup', defaultValue: '', type: 'textarea' },
      { id: 'relevant_activity_2', label: 'Relevant Activity/Skill 2', placeholder: 'Completed customer service training course with distinction', defaultValue: '', type: 'textarea' },
      { id: 'personal_qualities', label: 'Personal Qualities', placeholder: 'I am punctual, eager to learn, and committed to providing excellent service', defaultValue: '', type: 'textarea' }
    ],
    sections: [
      { id: 'header', name: 'Your Contact Info', order: 1, required: true, content: '{your_name}\n{your_phone} | {your_email}\n{your_city}\n\n{date}' },
      { id: 'recipient', name: 'Recipient', order: 2, required: true, content: 'Dear {hiring_manager},' },
      { id: 'opening', name: 'Opening', order: 3, required: true, content: 'I am writing to apply for the {job_title} position at {company_name}. As {education}, I am excited to gain hands-on experience in the industry while contributing my enthusiasm and strong work ethic to your team.' },
      { id: 'experience', name: 'Relevant Experience', order: 4, required: true, content: 'While I am new to the workforce, I have developed relevant skills through education and activities:\n\n• {relevant_activity_1}\n• {relevant_activity_2}' },
      { id: 'qualities', name: 'Personal Qualities', order: 5, required: true, content: '{personal_qualities}. I am available {availability} and can start immediately.' },
      { id: 'closing', name: 'Closing', order: 6, required: true, content: 'I would appreciate the opportunity to prove myself as a valuable team member. Thank you for considering my application.\n\nSincerely,\n{your_name}' }
    ],
    tips: [
      'Focus on what you CAN offer, not what you lack',
      'Include volunteer work, school projects, and extracurriculars',
      'Emphasize soft skills: punctuality, reliability, eagerness to learn',
      'Mention relevant coursework if applicable',
      'Show enthusiasm—employers value attitude over experience for entry roles',
      'Be specific about your availability'
    ],
    exampleData: {
      your_name: 'Emily Rodriguez',
      your_phone: '(555) 456-7890',
      your_email: 'emily.rodriguez@email.com',
      your_city: 'Nashville, TN',
      date: 'January 20, 2026',
      hiring_manager: 'Hiring Manager',
      company_name: 'Marriott Hotels',
      job_title: 'Event Staff',
      education: 'a sophomore at Nashville State Community College studying Hospitality Management',
      availability: 'evenings and weekends, with full-time availability during school breaks',
      relevant_activity_1: 'Volunteered at 10+ community events, handling setup, guest services, and cleanup for groups of 200+ attendees',
      relevant_activity_2: 'Completed customer service training course with distinction and earned a Food Handler certification',
      personal_qualities: 'I am punctual, eager to learn, and committed to providing excellent service. My professors describe me as reliable and detail-oriented'
    }
  },
  'hospitality': {
    slug: 'hospitality',
    name: 'Hospitality Industry Cover Letter',
    description: 'Tailored for hotels, restaurants, events, and food service. Emphasizes customer service excellence, teamwork, and the ability to thrive in fast-paced environments.',
    bestFor: [
      'Servers, bartenders, and kitchen staff',
      'Hotel front desk and housekeeping',
      'Event and banquet staff',
      'Any customer-facing hospitality role'
    ],
    notRecommendedFor: [
      'Warehouse or industrial positions',
      'Roles with no customer interaction',
      'Technical or administrative positions'
    ],
    icon: '🏨',
    industryFit: { industrial: 40, hospitality: 100, retail: 80, facilities: 60 },
    variables: [
      { id: 'your_name', label: 'Your Full Name', placeholder: 'Alex Johnson', defaultValue: '', type: 'text' },
      { id: 'your_phone', label: 'Your Phone', placeholder: '(555) 567-8901', defaultValue: '', type: 'text' },
      { id: 'your_email', label: 'Your Email', placeholder: 'alex.johnson@email.com', defaultValue: '', type: 'text' },
      { id: 'your_city', label: 'Your City, State', placeholder: 'Las Vegas, NV', defaultValue: '', type: 'text' },
      { id: 'date', label: 'Date', placeholder: 'January 20, 2026', defaultValue: '', type: 'text' },
      { id: 'hiring_manager', label: 'Hiring Manager Name', placeholder: 'Hiring Manager', defaultValue: 'Hiring Manager', type: 'text' },
      { id: 'company_name', label: 'Restaurant/Hotel/Venue Name', placeholder: 'The Venetian Resort', defaultValue: '', type: 'text' },
      { id: 'job_title', label: 'Job Title', placeholder: 'Banquet Server', defaultValue: '', type: 'text' },
      { id: 'years_experience', label: 'Years in Hospitality', placeholder: '3 years', defaultValue: '', type: 'text' },
      { id: 'guest_achievement', label: 'Guest Service Achievement', placeholder: 'Maintained 98% positive guest feedback scores across 500+ interactions', defaultValue: '', type: 'textarea' },
      { id: 'team_achievement', label: 'Teamwork Achievement', placeholder: 'Collaborated with 20-person teams during events serving 1,000+ guests', defaultValue: '', type: 'textarea' },
      { id: 'pace_example', label: 'Fast-Paced Environment Example', placeholder: 'Thrived during peak dining hours, turning 15+ tables per shift while maintaining quality', defaultValue: '', type: 'textarea' },
      { id: 'certifications', label: 'Relevant Certifications', placeholder: 'Food Handler Card, TIPS Alcohol Certification, ServSafe', defaultValue: '', type: 'text' }
    ],
    sections: [
      { id: 'header', name: 'Your Contact Info', order: 1, required: true, content: '{your_name}\n{your_phone} | {your_email}\n{your_city}\n\n{date}' },
      { id: 'recipient', name: 'Recipient', order: 2, required: true, content: 'Dear {hiring_manager},' },
      { id: 'opening', name: 'Opening', order: 3, required: true, content: 'I am thrilled to apply for the {job_title} position at {company_name}. With {years_experience} of experience in hospitality, I am passionate about creating exceptional guest experiences and contributing to your team\'s success.' },
      { id: 'achievements', name: 'Key Achievements', order: 4, required: true, content: 'My hospitality experience has prepared me to excel in this role:\n\n• {guest_achievement}\n• {team_achievement}\n• {pace_example}' },
      { id: 'certifications', name: 'Certifications', order: 5, required: false, content: 'I hold current certifications including: {certifications}.' },
      { id: 'closing', name: 'Closing', order: 6, required: true, content: 'I am excited about the opportunity to bring my dedication to guest satisfaction and my proven teamwork skills to {company_name}. I am available for flexible scheduling including evenings, weekends, and holidays.\n\nWarmly,\n{your_name}' }
    ],
    tips: [
      'Emphasize guest satisfaction scores or positive feedback',
      'Mention ability to work under pressure during busy periods',
      'Include relevant certifications (Food Handler, TIPS, etc.)',
      'Show flexibility with scheduling—hospitality demands it',
      'Use hospitality-specific language: "guest experience," "service excellence"',
      'Highlight teamwork and collaboration skills'
    ],
    exampleData: {
      your_name: 'Alex Johnson',
      your_phone: '(555) 567-8901',
      your_email: 'alex.johnson@email.com',
      your_city: 'Las Vegas, NV',
      date: 'January 20, 2026',
      hiring_manager: 'Ms. Patricia Williams',
      company_name: 'The Venetian Resort',
      job_title: 'Banquet Server',
      years_experience: '3 years',
      guest_achievement: 'Maintained 98% positive guest feedback scores across 500+ interactions, receiving multiple commendations for exceptional service',
      team_achievement: 'Collaborated seamlessly with 20-person teams during events serving 1,000+ guests, ensuring smooth service flow',
      pace_example: 'Thrived during peak dining hours at busy restaurants, turning 15+ tables per shift while maintaining quality service standards',
      certifications: 'Food Handler Card, TIPS Alcohol Certification, ServSafe Manager'
    }
  },
  'warehouse': {
    slug: 'warehouse',
    name: 'Warehouse & Industrial Cover Letter',
    description: 'Built for warehouse, distribution, manufacturing, and logistics roles. Emphasizes safety, efficiency, physical capability, and experience with industrial equipment.',
    bestFor: [
      'Picker/packers and warehouse associates',
      'Forklift operators and machine operators',
      'Distribution and fulfillment center roles',
      'Manufacturing and assembly positions'
    ],
    notRecommendedFor: [
      'Customer-facing positions',
      'Office or administrative roles',
      'Roles without physical requirements'
    ],
    icon: '📦',
    industryFit: { industrial: 100, hospitality: 40, retail: 65, facilities: 80 },
    variables: [
      { id: 'your_name', label: 'Your Full Name', placeholder: 'Michael Thompson', defaultValue: '', type: 'text' },
      { id: 'your_phone', label: 'Your Phone', placeholder: '(555) 678-9012', defaultValue: '', type: 'text' },
      { id: 'your_email', label: 'Your Email', placeholder: 'michael.thompson@email.com', defaultValue: '', type: 'text' },
      { id: 'your_city', label: 'Your City, State', placeholder: 'Columbus, OH', defaultValue: '', type: 'text' },
      { id: 'date', label: 'Date', placeholder: 'January 20, 2026', defaultValue: '', type: 'text' },
      { id: 'hiring_manager', label: 'Hiring Manager Name', placeholder: 'Hiring Manager', defaultValue: 'Hiring Manager', type: 'text' },
      { id: 'company_name', label: 'Company Name', placeholder: 'Amazon Fulfillment Center', defaultValue: '', type: 'text' },
      { id: 'job_title', label: 'Job Title', placeholder: 'Warehouse Associate', defaultValue: '', type: 'text' },
      { id: 'years_experience', label: 'Years of Warehouse Experience', placeholder: '4 years', defaultValue: '', type: 'text' },
      { id: 'productivity_achievement', label: 'Productivity Achievement', placeholder: 'Consistently exceeded daily pick rate targets by 20%, processing 175+ orders per shift', defaultValue: '', type: 'textarea' },
      { id: 'accuracy_achievement', label: 'Accuracy Achievement', placeholder: 'Maintained 99.7% order accuracy over 18-month period', defaultValue: '', type: 'textarea' },
      { id: 'safety_achievement', label: 'Safety Achievement', placeholder: 'Zero safety incidents in 4 years while operating heavy machinery', defaultValue: '', type: 'textarea' },
      { id: 'equipment_skills', label: 'Equipment & Skills', placeholder: 'Certified forklift operator (sit-down, stand-up, reach), RF scanner proficient, WMS experienced', defaultValue: '', type: 'text' },
      { id: 'physical_statement', label: 'Physical Capability', placeholder: 'Comfortable lifting 50+ lbs repeatedly and standing for 10-hour shifts', defaultValue: '', type: 'text' }
    ],
    sections: [
      { id: 'header', name: 'Your Contact Info', order: 1, required: true, content: '{your_name}\n{your_phone} | {your_email}\n{your_city}\n\n{date}' },
      { id: 'recipient', name: 'Recipient', order: 2, required: true, content: 'Dear {hiring_manager},' },
      { id: 'opening', name: 'Opening', order: 3, required: true, content: 'I am applying for the {job_title} position at {company_name}. With {years_experience} of warehouse experience and a proven track record of exceeding performance metrics, I am confident in my ability to contribute to your operations.' },
      { id: 'achievements', name: 'Key Achievements', order: 4, required: true, content: 'My warehouse experience includes:\n\n• {productivity_achievement}\n• {accuracy_achievement}\n• {safety_achievement}' },
      { id: 'skills', name: 'Skills & Certifications', order: 5, required: true, content: 'Skills & Certifications: {equipment_skills}\n\nPhysical Capability: {physical_statement}' },
      { id: 'closing', name: 'Closing', order: 6, required: true, content: 'I am available for all shifts including nights and weekends, and can start immediately. I look forward to bringing my productivity and safety-focused approach to {company_name}.\n\nSincerely,\n{your_name}' }
    ],
    tips: [
      'Lead with productivity metrics (pick rates, orders processed)',
      'Emphasize safety record—this is critical for industrial roles',
      'List specific equipment certifications (forklift types, etc.)',
      'Mention physical capability for lifting and standing',
      'Include experience with WMS, RF scanners, and other systems',
      'Show availability for various shifts'
    ],
    exampleData: {
      your_name: 'Michael Thompson',
      your_phone: '(555) 678-9012',
      your_email: 'michael.thompson@email.com',
      your_city: 'Columbus, OH',
      date: 'January 20, 2026',
      hiring_manager: 'Hiring Manager',
      company_name: 'Amazon Fulfillment Center',
      job_title: 'Warehouse Associate',
      years_experience: '4 years',
      productivity_achievement: 'Consistently exceeded daily pick rate targets by 20%, processing 175+ orders per shift while maintaining quality standards',
      accuracy_achievement: 'Maintained 99.7% order accuracy over 18-month period, contributing to team recognition for quality excellence',
      safety_achievement: 'Zero safety incidents in 4 years while operating heavy machinery including forklifts and pallet jacks',
      equipment_skills: 'Certified forklift operator (sit-down, stand-up, reach), RF scanner proficient, experienced with Manhattan WMS',
      physical_statement: 'Comfortable lifting 50+ lbs repeatedly and standing for 10-hour shifts in fast-paced environment'
    }
  }
};

export const coverLetterCategories = [
  {
    name: 'General Formats',
    description: 'Classic cover letter structures that work across industries',
    templates: ['standard', 'temp-flex', 'entry-level']
  },
  {
    name: 'Career Situation',
    description: 'Templates for specific career circumstances',
    templates: ['career-change', 'entry-level']
  },
  {
    name: 'Industry-Specific',
    description: 'Tailored for specific Indeed Flex industries',
    templates: ['hospitality', 'warehouse']
  }
];
