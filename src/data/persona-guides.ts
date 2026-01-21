// Maps persona page guide references to existing article slugs
// Centralizes guide link mappings to prevent broken links

export const PERSONA_GUIDE_MAPPINGS: Record<string, Record<string, string>> = {
  student: {
    'student-resume-template': 'student-resume-template', // exists in job-application-articles
    'zero-experience-jobs': 'zero-experience-jobs', // exists in job-application-articles
    'first-flex-job': 'first-flex-job', // exists in guides
    'same-day-pay': 'same-day-pay-explained', // dedicated article
    'same-day-pay-explained': 'same-day-pay-explained', // direct link
    'skill-boost': 'skill-boost', // exists
  },
  fresher: {
    'fresher-resume-guide': 'fresher-resume-guide', // exists
    'zero-experience-jobs': 'zero-experience-jobs', // exists
    'first-flex-job': 'first-flex-job', // exists
    'transferable-skills-guide': 'transferable-skills-guide', // exists
  },
  immigrant: {
    'i9-complete-guide': 'i9-complete-guide', // exists
    'i9-documents-list': 'i9-documents-list', // exists
    'first-job-america-guide': 'first-job-america-guide', // exists
    'work-authorization-types': 'work-authorization-types', // exists
    'e-verify-explained': 'e-verify-explained', // exists
    'workplace-success': 'workplace-success', // exists
  },
  'career-changer': {
    'career-transition': 'temp-to-perm-guide', // maps to existing temp-to-perm
    'transferable-skills': 'transferable-skills-guide', // maps to job-application version
    'temp-to-perm-success': 'temp-to-perm-guide', // exists
    'career-paths': 'career-paths', // exists
    'skill-boost': 'skill-boost', // exists
  },
  parent: {
    'working-parent-guide': 'first-flex-job', // maps to getting started
    'same-day-pay': 'same-day-pay-explained', // dedicated article
    'same-day-pay-explained': 'same-day-pay-explained', // direct link
    'medical-benefits': 'complete-guide', // redirect to complete guide (benefits section)
    'multiple-gigs': 'multiple-gigs', // exists
  },
  seasonal: {
    'holiday-warehouse-guide': 'holiday-warehouse-guide', // exists
    'black-friday-hiring': 'black-friday-hiring', // exists
    'summer-hospitality-guide': 'summer-hospitality-guide', // exists
    'event-staffing-guide': 'event-staffing-guide', // exists
    'temp-to-perm-guide': 'temp-to-perm-guide', // exists
  },
  'side-gig': {
    'side-gig-guide': 'multiple-gigs', // maps to multiple gigs
    'same-day-pay': 'same-day-pay-explained', // dedicated article
    'same-day-pay-explained': 'same-day-pay-explained', // direct link
    'tax-guide-gig-workers': 'tax-guide-gig-workers', // now exists!
    'more-shifts': 'more-shifts', // exists
  },
};

// Guide data for each persona with verified slugs
export const PERSONA_GUIDES: Record<string, Array<{ slug: string; title: string; description: string }>> = {
  student: [
    { slug: 'student-resume-template', title: 'Student Resume Template 2026', description: 'Balance academics and work experience' },
    { slug: 'zero-experience-jobs', title: 'Jobs With No Experience Required', description: 'Start earning with no prior work history' },
    { slug: 'same-day-pay-explained', title: 'Same Day Pay: Get Paid Within 1 Hour', description: 'Access 50% of earnings instantly' },
    { slug: 'first-flex-job', title: 'Your First Flexible Job Guide', description: 'Step-by-step getting started' },
  ],
  fresher: [
    { slug: 'fresher-resume-guide', title: 'Fresher Resume Guide 2026', description: 'Create your first resume with no experience' },
    { slug: 'zero-experience-jobs', title: 'Get Hired With Zero Experience', description: 'Entry-level roles that hire first-timers' },
    { slug: 'transferable-skills-guide', title: 'Transferable Skills Guide', description: 'Highlight skills from any background' },
  ],
  immigrant: [
    { slug: 'i9-complete-guide', title: 'Form I-9 Explained', description: 'Complete guide to employment verification' },
    { slug: 'first-job-america-guide', title: 'Working in America Guide', description: 'Navigate your first US job' },
    { slug: 'work-authorization-types', title: 'Work Authorization Types', description: 'EAD, work permits, and visa status' },
  ],
  'career-changer': [
    { slug: 'temp-to-perm-guide', title: 'Temp-to-Perm Success Guide', description: 'Turn flexible work into permanent offers' },
    { slug: 'transferable-skills-guide', title: 'Transferable Skills Guide', description: 'Translate experience to new roles' },
    { slug: 'career-paths', title: 'Career Progression Paths', description: 'From entry-level to management' },
  ],
  parent: [
    { slug: 'first-flex-job', title: 'Getting Started with Flex Work', description: 'Find family-friendly opportunities' },
    { slug: 'same-day-pay-explained', title: 'Same Day Pay Explained', description: 'Access earnings when you need them' },
    { slug: 'complete-guide', title: 'Complete Indeed Flex Guide', description: 'Benefits, pay, and scheduling' },
    { slug: 'multiple-gigs', title: 'Balancing Multiple Gigs', description: 'Manage work and family time' },
  ],
  seasonal: [
    { slug: 'holiday-warehouse-guide', title: 'Holiday Warehouse Jobs 2026', description: 'Peak season hiring guide' },
    { slug: 'black-friday-hiring', title: 'Black Friday Hiring Guide', description: 'Get hired for the busiest retail week' },
    { slug: 'summer-hospitality-guide', title: 'Summer Hospitality Guide', description: 'Peak season hospitality work' },
  ],
  'side-gig': [
    { slug: 'multiple-gigs', title: 'Managing Multiple Gigs', description: 'Balance your side hustle with your main job' },
    { slug: 'same-day-pay-explained', title: 'Same Day Pay Explained', description: 'Get paid within 1 hour of completing shifts' },
    { slug: 'tax-guide-gig-workers', title: 'Gig Worker Tax Guide 2026', description: '1099 vs W-2, quarterly taxes & deductions' },
    { slug: 'more-shifts', title: 'Getting More Shifts', description: 'Maximize your earning opportunities' },
  ],
};

// Get validated guide link for persona
export function getPersonaGuideLink(personaSlug: string, guideSlug: string): string {
  const mapping = PERSONA_GUIDE_MAPPINGS[personaSlug];
  const validSlug = mapping?.[guideSlug] || guideSlug;
  return `/career-hub/guides/${validSlug}`;
}

// Get guides for a persona
export function getPersonaGuides(personaSlug: string) {
  return PERSONA_GUIDES[personaSlug] || [];
}
