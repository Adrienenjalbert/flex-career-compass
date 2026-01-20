export interface ResumeTemplate {
  slug: string;
  name: string;
  description: string;
  bestFor: string[];
  notRecommendedFor: string[];
  icon: string;
  sections: TemplateSection[];
  variables: TemplateVariable[];
  tips: string[];
  industryFit: {
    industrial: number;
    hospitality: number;
    retail: number;
    facilities: number;
  };
}

export interface TemplateSection {
  id: string;
  name: string;
  content: string;
  order: number;
  required: boolean;
}

export interface TemplateVariable {
  id: string;
  label: string;
  placeholder: string;
  defaultValue: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[];
}

export const resumeTemplates: Record<string, ResumeTemplate> = {
  'chronological': {
    slug: 'chronological',
    name: 'Chronological Resume',
    description: 'The most traditional format that lists work experience in reverse chronological order. Preferred by 76% of hiring managers and highly ATS-compatible.',
    bestFor: [
      'Steady work history with no major gaps',
      'Career progression in the same industry',
      'Traditional employers (warehouses, hotels, retail chains)',
      'Roles where tenure matters (forklift operators, supervisors)'
    ],
    notRecommendedFor: [
      'Frequent job changes or employment gaps',
      'Career changers entering a new industry',
      'Limited work experience'
    ],
    icon: '📋',
    industryFit: { industrial: 95, hospitality: 85, retail: 90, facilities: 90 },
    variables: [
      { id: 'name', label: 'Full Name', placeholder: 'John Smith', defaultValue: '', type: 'text' },
      { id: 'phone', label: 'Phone', placeholder: '(555) 123-4567', defaultValue: '', type: 'text' },
      { id: 'email', label: 'Email', placeholder: 'john.smith@email.com', defaultValue: '', type: 'text' },
      { id: 'city', label: 'City, State', placeholder: 'Austin, TX', defaultValue: '', type: 'text' },
      { id: 'objective', label: 'Career Objective', placeholder: 'Brief 2-3 sentence career goal...', defaultValue: '', type: 'textarea' },
      { id: 'job1_title', label: 'Most Recent Job Title', placeholder: 'Warehouse Associate', defaultValue: '', type: 'text' },
      { id: 'job1_company', label: 'Company Name', placeholder: 'Amazon Fulfillment Center', defaultValue: '', type: 'text' },
      { id: 'job1_dates', label: 'Employment Dates', placeholder: 'Jan 2022 - Present', defaultValue: '', type: 'text' },
      { id: 'job1_bullets', label: 'Key Achievements (one per line)', placeholder: 'Processed 150+ orders daily with 99.5% accuracy\nTrained 8 new team members on RF scanner operations', defaultValue: '', type: 'textarea' },
      { id: 'job2_title', label: 'Previous Job Title', placeholder: 'Picker/Packer', defaultValue: '', type: 'text' },
      { id: 'job2_company', label: 'Company Name', placeholder: 'FedEx Ground', defaultValue: '', type: 'text' },
      { id: 'job2_dates', label: 'Employment Dates', placeholder: 'Mar 2020 - Dec 2021', defaultValue: '', type: 'text' },
      { id: 'job2_bullets', label: 'Key Achievements (one per line)', placeholder: 'Maintained zero safety incidents over 22 months\nExceeded daily pick rate targets by 15%', defaultValue: '', type: 'textarea' },
      { id: 'skills', label: 'Core Skills', placeholder: 'RF Scanner, Forklift Certified, Inventory Management, Team Leadership', defaultValue: '', type: 'textarea' },
      { id: 'education', label: 'Education', placeholder: 'High School Diploma, Austin High School, 2019', defaultValue: '', type: 'text' }
    ],
    sections: [
      { id: 'header', name: 'Contact Header', order: 1, required: true, content: '{name}\n{phone} | {email} | {city}' },
      { id: 'objective', name: 'Career Objective', order: 2, required: false, content: 'CAREER OBJECTIVE\n{objective}' },
      { id: 'experience', name: 'Work Experience', order: 3, required: true, content: 'WORK EXPERIENCE\n\n{job1_title}\n{job1_company} | {job1_dates}\n{job1_bullets}\n\n{job2_title}\n{job2_company} | {job2_dates}\n{job2_bullets}' },
      { id: 'skills', name: 'Skills', order: 4, required: true, content: 'SKILLS\n{skills}' },
      { id: 'education', name: 'Education', order: 5, required: false, content: 'EDUCATION\n{education}' }
    ],
    tips: [
      'Start each bullet with a strong action verb (Processed, Trained, Maintained)',
      'Include quantifiable achievements with numbers and percentages',
      'Keep to 1 page for less than 10 years of experience',
      'Use consistent date formatting throughout',
      'List certifications like forklift license prominently in skills section'
    ]
  },
  'functional': {
    slug: 'functional',
    name: 'Functional (Skills-Based) Resume',
    description: 'Emphasizes skills and abilities over chronological work history. Groups achievements by skill category rather than by employer.',
    bestFor: [
      'Career changers entering temp/flex work',
      'Workers with employment gaps',
      'Those with diverse experience across industries',
      'Returning to workforce after extended absence'
    ],
    notRecommendedFor: [
      'Traditional employers who prefer chronological format',
      'Roles requiring specific tenure or progression',
      'Some ATS systems that parse by job history'
    ],
    icon: '🎯',
    industryFit: { industrial: 65, hospitality: 80, retail: 75, facilities: 70 },
    variables: [
      { id: 'name', label: 'Full Name', placeholder: 'Maria Garcia', defaultValue: '', type: 'text' },
      { id: 'phone', label: 'Phone', placeholder: '(555) 234-5678', defaultValue: '', type: 'text' },
      { id: 'email', label: 'Email', placeholder: 'maria.garcia@email.com', defaultValue: '', type: 'text' },
      { id: 'city', label: 'City, State', placeholder: 'Houston, TX', defaultValue: '', type: 'text' },
      { id: 'summary', label: 'Professional Summary', placeholder: 'Describe your core strengths and career focus...', defaultValue: '', type: 'textarea' },
      { id: 'skill1_name', label: 'Skill Category 1', placeholder: 'Customer Service Excellence', defaultValue: '', type: 'text' },
      { id: 'skill1_bullets', label: 'Achievements (one per line)', placeholder: 'Resolved 50+ customer inquiries daily with 95% satisfaction rating\nTrained new staff on POS systems and customer interaction protocols', defaultValue: '', type: 'textarea' },
      { id: 'skill2_name', label: 'Skill Category 2', placeholder: 'Operations & Logistics', defaultValue: '', type: 'text' },
      { id: 'skill2_bullets', label: 'Achievements (one per line)', placeholder: 'Managed inventory tracking for 5,000+ SKUs\nReduced order processing time by 20% through workflow optimization', defaultValue: '', type: 'textarea' },
      { id: 'skill3_name', label: 'Skill Category 3', placeholder: 'Team Collaboration', defaultValue: '', type: 'text' },
      { id: 'skill3_bullets', label: 'Achievements (one per line)', placeholder: 'Coordinated with 15-person team during peak season operations\nMentored 6 new hires, improving retention by 30%', defaultValue: '', type: 'textarea' },
      { id: 'work_history', label: 'Brief Work History', placeholder: 'Retail Associate, Target (2021-2023)\nWarehouse Worker, UPS (2019-2021)\nFood Service, Various (2017-2019)', defaultValue: '', type: 'textarea' },
      { id: 'education', label: 'Education & Certifications', placeholder: 'Food Handler Certification, 2023\nHigh School Diploma, 2017', defaultValue: '', type: 'textarea' }
    ],
    sections: [
      { id: 'header', name: 'Contact Header', order: 1, required: true, content: '{name}\n{phone} | {email} | {city}' },
      { id: 'summary', name: 'Professional Summary', order: 2, required: true, content: 'PROFESSIONAL SUMMARY\n{summary}' },
      { id: 'skills1', name: 'Skill Category 1', order: 3, required: true, content: '{skill1_name}\n{skill1_bullets}' },
      { id: 'skills2', name: 'Skill Category 2', order: 4, required: true, content: '{skill2_name}\n{skill2_bullets}' },
      { id: 'skills3', name: 'Skill Category 3', order: 5, required: false, content: '{skill3_name}\n{skill3_bullets}' },
      { id: 'history', name: 'Work History', order: 6, required: true, content: 'WORK HISTORY\n{work_history}' },
      { id: 'education', name: 'Education', order: 7, required: false, content: 'EDUCATION & CERTIFICATIONS\n{education}' }
    ],
    tips: [
      'Group achievements by transferable skills relevant to your target role',
      'Keep work history section brief - just job titles, companies, and dates',
      'Lead with your strongest, most relevant skill category',
      'Use industry-specific keywords in skill category headers',
      'Ideal when your skills matter more than where you developed them'
    ]
  },
  'temp-worker': {
    slug: 'temp-worker',
    name: 'Temp/Flex Worker Resume',
    description: 'Specifically designed for gig economy and temporary staffing roles. Highlights flexibility, reliability, and diverse experience across multiple assignments.',
    bestFor: [
      'Indeed Flex workers with multiple short assignments',
      'Gig economy professionals',
      'Workers who prefer variety over permanent roles',
      'Those building experience across industries'
    ],
    notRecommendedFor: [
      'Seeking permanent positions at traditional employers',
      'Roles requiring long-term commitment proof',
      'Senior or management positions'
    ],
    icon: '⚡',
    industryFit: { industrial: 90, hospitality: 95, retail: 85, facilities: 85 },
    variables: [
      { id: 'name', label: 'Full Name', placeholder: 'Alex Johnson', defaultValue: '', type: 'text' },
      { id: 'phone', label: 'Phone', placeholder: '(555) 345-6789', defaultValue: '', type: 'text' },
      { id: 'email', label: 'Email', placeholder: 'alex.johnson@email.com', defaultValue: '', type: 'text' },
      { id: 'city', label: 'City, State', placeholder: 'Nashville, TN', defaultValue: '', type: 'text' },
      { id: 'flexer_rating', label: 'Indeed Flex Rating (if applicable)', placeholder: '4.9 stars', defaultValue: '', type: 'text' },
      { id: 'summary', label: 'Flexer Summary', placeholder: 'Describe your flexibility, reliability, and top skills...', defaultValue: '', type: 'textarea' },
      { id: 'stats', label: 'Key Stats', placeholder: '200+ shifts completed | 98% attendance | 4.9★ rating | Same-day available', defaultValue: '', type: 'text' },
      { id: 'industries', label: 'Industries Worked', placeholder: 'Industrial, Hospitality, Retail', defaultValue: '', type: 'text' },
      { id: 'assignment1', label: 'Recent Assignment Type', placeholder: 'Warehouse Operations', defaultValue: '', type: 'text' },
      { id: 'assignment1_clients', label: 'Notable Clients', placeholder: 'Amazon, FedEx, Target Distribution', defaultValue: '', type: 'text' },
      { id: 'assignment1_bullets', label: 'Key Achievements', placeholder: 'Consistently exceeded pick rate targets by 25%\nInvited to 12 client talent pools for repeat work', defaultValue: '', type: 'textarea' },
      { id: 'assignment2', label: 'Assignment Type 2', placeholder: 'Event Staffing', defaultValue: '', type: 'text' },
      { id: 'assignment2_clients', label: 'Notable Clients', placeholder: 'Marriott, Hilton, Convention Centers', defaultValue: '', type: 'text' },
      { id: 'assignment2_bullets', label: 'Key Achievements', placeholder: 'Served 500+ guests at high-profile corporate events\nReceived 15 five-star client reviews', defaultValue: '', type: 'textarea' },
      { id: 'certifications', label: 'Certifications & Training', placeholder: 'Forklift Certified, Food Handler Card, OSHA 10', defaultValue: '', type: 'textarea' },
      { id: 'availability', label: 'Availability', placeholder: 'Flexible schedule | Days, nights, weekends | Same-day bookings', defaultValue: '', type: 'text' }
    ],
    sections: [
      { id: 'header', name: 'Contact Header', order: 1, required: true, content: '{name}\n{phone} | {email} | {city}\n{flexer_rating}' },
      { id: 'summary', name: 'Flexer Summary', order: 2, required: true, content: 'FLEXIBLE WORK PROFESSIONAL\n{summary}\n\n{stats}' },
      { id: 'industries', name: 'Industries', order: 3, required: true, content: 'INDUSTRIES: {industries}' },
      { id: 'assignment1', name: 'Assignment Experience 1', order: 4, required: true, content: '{assignment1}\nClients: {assignment1_clients}\n{assignment1_bullets}' },
      { id: 'assignment2', name: 'Assignment Experience 2', order: 5, required: false, content: '{assignment2}\nClients: {assignment2_clients}\n{assignment2_bullets}' },
      { id: 'certifications', name: 'Certifications', order: 6, required: true, content: 'CERTIFICATIONS & TRAINING\n{certifications}' },
      { id: 'availability', name: 'Availability', order: 7, required: true, content: 'AVAILABILITY\n{availability}' }
    ],
    tips: [
      'Lead with your Indeed Flex rating and total shifts completed',
      'Group assignments by type rather than individual clients',
      'Highlight repeat bookings and talent pool invitations',
      'Emphasize reliability metrics (attendance, punctuality)',
      'Include your availability to show flexibility',
      'List industry-specific certifications prominently'
    ]
  },
  'combination': {
    slug: 'combination',
    name: 'Combination (Hybrid) Resume',
    description: 'Blends chronological and functional formats. Features a skills section followed by chronological work history. Offers the best of both approaches.',
    bestFor: [
      'Experienced workers with strong, relevant skills',
      'Career advancers seeking promotions',
      'Those with both skills and solid work history',
      'Workers transitioning within the same industry'
    ],
    notRecommendedFor: [
      'Entry-level workers with limited experience',
      'Those with significant employment gaps',
      'Simple roles where chronological suffices'
    ],
    icon: '🔄',
    industryFit: { industrial: 85, hospitality: 90, retail: 85, facilities: 80 },
    variables: [
      { id: 'name', label: 'Full Name', placeholder: 'David Chen', defaultValue: '', type: 'text' },
      { id: 'phone', label: 'Phone', placeholder: '(555) 456-7890', defaultValue: '', type: 'text' },
      { id: 'email', label: 'Email', placeholder: 'david.chen@email.com', defaultValue: '', type: 'text' },
      { id: 'city', label: 'City, State', placeholder: 'Chicago, IL', defaultValue: '', type: 'text' },
      { id: 'summary', label: 'Professional Summary', placeholder: 'Summarize your experience and key qualifications...', defaultValue: '', type: 'textarea' },
      { id: 'core_skills', label: 'Core Competencies', placeholder: 'Inventory Management | Team Leadership | Safety Compliance | Forklift Operation | RF Scanning | Quality Control', defaultValue: '', type: 'textarea' },
      { id: 'job1_title', label: 'Current/Recent Job Title', placeholder: 'Warehouse Lead', defaultValue: '', type: 'text' },
      { id: 'job1_company', label: 'Company Name', placeholder: 'Amazon Fulfillment', defaultValue: '', type: 'text' },
      { id: 'job1_dates', label: 'Employment Dates', placeholder: 'Mar 2022 - Present', defaultValue: '', type: 'text' },
      { id: 'job1_bullets', label: 'Key Achievements', placeholder: 'Led team of 12 associates achieving 105% of daily targets\nReduced error rate from 2.5% to 0.8% through process improvements', defaultValue: '', type: 'textarea' },
      { id: 'job2_title', label: 'Previous Job Title', placeholder: 'Warehouse Associate', defaultValue: '', type: 'text' },
      { id: 'job2_company', label: 'Company Name', placeholder: 'Target Distribution', defaultValue: '', type: 'text' },
      { id: 'job2_dates', label: 'Employment Dates', placeholder: 'Jun 2020 - Feb 2022', defaultValue: '', type: 'text' },
      { id: 'job2_bullets', label: 'Key Achievements', placeholder: 'Processed 200+ orders daily with 99.7% accuracy\nEarned Employee of the Month twice for exceeding metrics', defaultValue: '', type: 'textarea' },
      { id: 'certifications', label: 'Certifications', placeholder: 'Forklift Certified (Sit-down, Stand-up, Reach)\nOSHA 30-Hour Safety\nFirst Aid/CPR Certified', defaultValue: '', type: 'textarea' },
      { id: 'education', label: 'Education', placeholder: "Associate's Degree, Logistics Management, 2020", defaultValue: '', type: 'text' }
    ],
    sections: [
      { id: 'header', name: 'Contact Header', order: 1, required: true, content: '{name}\n{phone} | {email} | {city}' },
      { id: 'summary', name: 'Professional Summary', order: 2, required: true, content: 'PROFESSIONAL SUMMARY\n{summary}' },
      { id: 'skills', name: 'Core Competencies', order: 3, required: true, content: 'CORE COMPETENCIES\n{core_skills}' },
      { id: 'experience', name: 'Professional Experience', order: 4, required: true, content: 'PROFESSIONAL EXPERIENCE\n\n{job1_title}\n{job1_company} | {job1_dates}\n{job1_bullets}\n\n{job2_title}\n{job2_company} | {job2_dates}\n{job2_bullets}' },
      { id: 'certifications', name: 'Certifications', order: 5, required: true, content: 'CERTIFICATIONS\n{certifications}' },
      { id: 'education', name: 'Education', order: 6, required: false, content: 'EDUCATION\n{education}' }
    ],
    tips: [
      'Use a skills grid or columns for visual appeal',
      'Limit core competencies to 6-9 most relevant skills',
      'Keep work history focused on achievements, not duties',
      'Perfect for when you need to showcase both skills and progression',
      'ATS-friendly when properly formatted'
    ]
  },
  'student': {
    slug: 'student',
    name: 'Student/Recent Graduate Resume',
    description: 'Designed for students and recent graduates with limited work experience. Emphasizes education, coursework, volunteer work, and transferable skills.',
    bestFor: [
      'Current students seeking part-time flex work',
      'Recent high school or college graduates',
      'Those entering the workforce for the first time',
      'Students building experience during school'
    ],
    notRecommendedFor: [
      'Experienced workers with significant work history',
      'Career changers with professional background',
      'Senior or supervisory positions'
    ],
    icon: '🎓',
    industryFit: { industrial: 75, hospitality: 90, retail: 95, facilities: 70 },
    variables: [
      { id: 'name', label: 'Full Name', placeholder: 'Emily Rodriguez', defaultValue: '', type: 'text' },
      { id: 'phone', label: 'Phone', placeholder: '(555) 567-8901', defaultValue: '', type: 'text' },
      { id: 'email', label: 'Email', placeholder: 'emily.rodriguez@email.com', defaultValue: '', type: 'text' },
      { id: 'city', label: 'City, State', placeholder: 'Orlando, FL', defaultValue: '', type: 'text' },
      { id: 'objective', label: 'Career Objective', placeholder: 'State your goal and what you bring to the role...', defaultValue: '', type: 'textarea' },
      { id: 'school', label: 'School Name', placeholder: 'University of Central Florida', defaultValue: '', type: 'text' },
      { id: 'degree', label: 'Degree/Program', placeholder: 'Bachelor of Science in Business Administration', defaultValue: '', type: 'text' },
      { id: 'grad_date', label: 'Expected Graduation', placeholder: 'Expected May 2025', defaultValue: '', type: 'text' },
      { id: 'gpa', label: 'GPA (if 3.0+)', placeholder: 'GPA: 3.5/4.0', defaultValue: '', type: 'text' },
      { id: 'relevant_coursework', label: 'Relevant Coursework', placeholder: 'Operations Management, Supply Chain Logistics, Business Communication', defaultValue: '', type: 'textarea' },
      { id: 'work_experience', label: 'Part-Time/Summer Work', placeholder: 'Describe any work experience, even informal jobs...', defaultValue: '', type: 'textarea' },
      { id: 'volunteer', label: 'Volunteer Experience', placeholder: 'Food bank volunteer, campus orientation leader, etc.', defaultValue: '', type: 'textarea' },
      { id: 'activities', label: 'Activities & Leadership', placeholder: 'Club memberships, sports, student government...', defaultValue: '', type: 'textarea' },
      { id: 'skills', label: 'Skills', placeholder: 'Microsoft Office, Spanish (Conversational), Customer Service, Cash Handling', defaultValue: '', type: 'textarea' },
      { id: 'availability', label: 'Availability', placeholder: 'Available 20-30 hours/week, flexible schedule', defaultValue: '', type: 'text' }
    ],
    sections: [
      { id: 'header', name: 'Contact Header', order: 1, required: true, content: '{name}\n{phone} | {email} | {city}' },
      { id: 'objective', name: 'Career Objective', order: 2, required: true, content: 'OBJECTIVE\n{objective}' },
      { id: 'education', name: 'Education', order: 3, required: true, content: 'EDUCATION\n{school}\n{degree}\n{grad_date}\n{gpa}\n\nRelevant Coursework: {relevant_coursework}' },
      { id: 'experience', name: 'Experience', order: 4, required: false, content: 'WORK EXPERIENCE\n{work_experience}' },
      { id: 'volunteer', name: 'Volunteer', order: 5, required: false, content: 'VOLUNTEER EXPERIENCE\n{volunteer}' },
      { id: 'activities', name: 'Activities', order: 6, required: false, content: 'ACTIVITIES & LEADERSHIP\n{activities}' },
      { id: 'skills', name: 'Skills', order: 7, required: true, content: 'SKILLS\n{skills}' },
      { id: 'availability', name: 'Availability', order: 8, required: true, content: 'AVAILABILITY\n{availability}' }
    ],
    tips: [
      'Put education first since it\'s your strongest section',
      'Include relevant coursework that relates to target roles',
      'Don\'t overlook informal work (babysitting, tutoring, lawn care)',
      'Highlight transferable skills from school projects and activities',
      'Include your availability - employers want to know your schedule',
      'Volunteer work demonstrates reliability and work ethic'
    ]
  },
  'career-gap': {
    slug: 'career-gap',
    name: 'Career Gap Resume',
    description: 'Strategically addresses employment gaps while highlighting relevant skills and any activities during the gap period. Uses honest framing without over-explaining.',
    bestFor: [
      'Workers returning after caregiving responsibilities',
      'Those recovering from illness or injury',
      'Workers after incarceration seeking fresh start',
      'Anyone with 6+ months employment gap'
    ],
    notRecommendedFor: [
      'Those without significant gaps',
      'Recent graduates (use student template)',
      'Workers with continuous employment'
    ],
    icon: '🌱',
    industryFit: { industrial: 80, hospitality: 85, retail: 85, facilities: 90 },
    variables: [
      { id: 'name', label: 'Full Name', placeholder: 'Sarah Thompson', defaultValue: '', type: 'text' },
      { id: 'phone', label: 'Phone', placeholder: '(555) 678-9012', defaultValue: '', type: 'text' },
      { id: 'email', label: 'Email', placeholder: 'sarah.thompson@email.com', defaultValue: '', type: 'text' },
      { id: 'city', label: 'City, State', placeholder: 'Atlanta, GA', defaultValue: '', type: 'text' },
      { id: 'summary', label: 'Professional Summary', placeholder: 'Focus on your strengths and readiness to return to work...', defaultValue: '', type: 'textarea' },
      { id: 'skills', label: 'Core Skills', placeholder: 'List your strongest, most relevant skills...', defaultValue: '', type: 'textarea' },
      { id: 'recent_training', label: 'Recent Training/Preparation', placeholder: 'Certifications, courses, or skills refreshed during gap...', defaultValue: '', type: 'textarea' },
      { id: 'gap_activity', label: 'Gap Period Activity (Optional)', placeholder: 'Family caregiving, health recovery, professional development, etc.', defaultValue: '', type: 'text' },
      { id: 'gap_dates', label: 'Gap Period', placeholder: '2022 - 2024', defaultValue: '', type: 'text' },
      { id: 'previous_job1_title', label: 'Previous Job Title', placeholder: 'Retail Supervisor', defaultValue: '', type: 'text' },
      { id: 'previous_job1_company', label: 'Company', placeholder: 'Walmart', defaultValue: '', type: 'text' },
      { id: 'previous_job1_dates', label: 'Dates', placeholder: '2018 - 2022', defaultValue: '', type: 'text' },
      { id: 'previous_job1_bullets', label: 'Key Achievements', placeholder: 'Managed team of 8 associates in high-volume department\nAchieved 95% customer satisfaction scores consistently', defaultValue: '', type: 'textarea' },
      { id: 'previous_job2_title', label: 'Earlier Job Title', placeholder: 'Sales Associate', defaultValue: '', type: 'text' },
      { id: 'previous_job2_company', label: 'Company', placeholder: 'Target', defaultValue: '', type: 'text' },
      { id: 'previous_job2_dates', label: 'Dates', placeholder: '2015 - 2018', defaultValue: '', type: 'text' },
      { id: 'previous_job2_bullets', label: 'Key Achievements', placeholder: 'Exceeded sales goals by 20% for 8 consecutive quarters\nTrained new hires on POS systems and customer service protocols', defaultValue: '', type: 'textarea' },
      { id: 'education', label: 'Education', placeholder: 'High School Diploma, 2014', defaultValue: '', type: 'text' }
    ],
    sections: [
      { id: 'header', name: 'Contact Header', order: 1, required: true, content: '{name}\n{phone} | {email} | {city}' },
      { id: 'summary', name: 'Professional Summary', order: 2, required: true, content: 'PROFESSIONAL SUMMARY\n{summary}' },
      { id: 'skills', name: 'Core Skills', order: 3, required: true, content: 'CORE SKILLS\n{skills}' },
      { id: 'training', name: 'Recent Training', order: 4, required: false, content: 'RECENT TRAINING & CERTIFICATIONS\n{recent_training}' },
      { id: 'gap', name: 'Career Break', order: 5, required: false, content: 'CAREER BREAK\n{gap_activity} ({gap_dates})' },
      { id: 'experience', name: 'Professional Experience', order: 6, required: true, content: 'PROFESSIONAL EXPERIENCE\n\n{previous_job1_title}\n{previous_job1_company} | {previous_job1_dates}\n{previous_job1_bullets}\n\n{previous_job2_title}\n{previous_job2_company} | {previous_job2_dates}\n{previous_job2_bullets}' },
      { id: 'education', name: 'Education', order: 7, required: false, content: 'EDUCATION\n{education}' }
    ],
    tips: [
      'Lead with skills section to establish competence immediately',
      'Be honest but brief about the gap - one line is enough',
      'Highlight any training, certifications, or volunteer work during the gap',
      'Focus on achievements from previous roles, not the gap itself',
      'Consider omitting months and using only years for older jobs',
      'Emphasize eagerness and readiness to return to work in summary',
      'Temp work is ideal for rebuilding work history - mention this'
    ]
  }
};

export const templateCategories = [
  { id: 'traditional', name: 'Traditional Formats', templates: ['chronological', 'functional', 'combination'] },
  { id: 'specialized', name: 'Specialized Formats', templates: ['temp-worker', 'student', 'career-gap'] }
];
