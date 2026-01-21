/**
 * Article Taxonomy Mappings
 * Pre-defined taxonomy metadata for all guides and job application articles
 * Used for cross-linking, filtering, and SEO
 */

import type { Industry, ExperienceLevel, UserSituation, ContentIntent, Language } from "@/data/taxonomy";

export interface ArticleTaxonomyData {
  userSituations: UserSituation[];
  industries: Industry[];
  experienceLevels: ExperienceLevel[];
  contentIntent: ContentIntent;
  language: Language;
  primaryKeyword?: string;
  searchVolume?: number;
  relatedRoles?: string[];
  relatedTools?: string[];
  relatedTemplates?: string[];
}

// ============================================
// GETTING STARTED GUIDES
// ============================================

export const GUIDE_TAXONOMY: Record<string, ArticleTaxonomyData> = {
  // Getting Started
  "first-flex-job": {
    userSituations: ['fresher', 'student', 'career-returner', 'side-gig'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'first flex job',
    searchVolume: 1200,
    relatedRoles: ['picker-packer', 'event-staff', 'dishwasher', 'general-labor'],
    relatedTools: ['pay-calculator', 'shift-planner'],
    relatedTemplates: ['first-job', 'entry-level']
  },
  "complete-guide": {
    userSituations: ['fresher', 'student', 'career-changer', 'side-gig', 'parent'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'indeed flex guide',
    searchVolume: 2400,
    relatedRoles: ['forklift-driver', 'bartender', 'warehouse-operative'],
    relatedTools: ['pay-calculator', 'shift-planner', 'tax-calculator'],
    relatedTemplates: ['chronological', 'temp-worker']
  },
  "same-day-pay-explained": {
    userSituations: ['student', 'fresher', 'side-gig', 'parent', 'seasonal'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'same day pay jobs',
    searchVolume: 6600,
    relatedRoles: ['picker-packer', 'server', 'event-staff', 'warehouse-operative'],
    relatedTools: ['pay-calculator', 'shift-planner'],
    relatedTemplates: ['temp-worker', 'first-job']
  },
  "first-shift": {
    userSituations: ['fresher', 'student', 'career-returner'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'first shift tips',
    searchVolume: 880,
    relatedRoles: ['picker-packer', 'event-staff', 'warehouse-operative'],
    relatedTools: ['shift-planner'],
    relatedTemplates: []
  },
  "worker-profile": {
    userSituations: ['fresher', 'student', 'career-changer', 'career-returner'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'create',
    language: 'english',
    primaryKeyword: 'indeed flex profile',
    searchVolume: 720,
    relatedRoles: [],
    relatedTools: ['skills-analyzer'],
    relatedTemplates: ['chronological', 'functional']
  },

  // Career Growth
  "career-paths": {
    userSituations: ['fresher', 'career-changer', 'experienced'],
    industries: ['hospitality', 'industrial', 'retail'],
    experienceLevels: ['entry-level', 'some-experience', 'experienced'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'temp worker career path',
    searchVolume: 1600,
    relatedRoles: ['warehouse-supervisor', 'restaurant-manager', 'shift-lead'],
    relatedTools: ['career-path', 'pay-calculator'],
    relatedTemplates: ['combination', 'chronological']
  },
  "skill-boost": {
    userSituations: ['fresher', 'career-changer', 'experienced', 'side-gig'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'skills for higher pay',
    searchVolume: 1300,
    relatedRoles: ['forklift-driver', 'bartender', 'machine-operator'],
    relatedTools: ['skills-analyzer', 'pay-calculator'],
    relatedTemplates: ['skills-based']
  },
  "certifications": {
    userSituations: ['fresher', 'student', 'career-changer', 'experienced'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'warehouse certifications 2026',
    searchVolume: 2900,
    relatedRoles: ['forklift-driver', 'bartender', 'food-handler'],
    relatedTools: ['pay-calculator', 'career-path'],
    relatedTemplates: ['chronological', 'skills-based']
  },
  "more-shifts": {
    userSituations: ['fresher', 'student', 'side-gig', 'parent'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'get more gig shifts',
    searchVolume: 1100,
    relatedRoles: ['picker-packer', 'event-staff'],
    relatedTools: ['shift-planner', 'pay-calculator'],
    relatedTemplates: []
  },
  "temp-to-perm-guide": {
    userSituations: ['fresher', 'career-changer', 'career-returner'],
    industries: ['hospitality', 'industrial', 'retail'],
    experienceLevels: ['entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'temp to permanent job',
    searchVolume: 1800,
    relatedRoles: ['warehouse-operative', 'server', 'retail-associate'],
    relatedTools: ['career-path'],
    relatedTemplates: ['chronological', 'combination']
  },

  // Industry Guides
  "hospitality-guide": {
    userSituations: ['fresher', 'student', 'career-changer', 'side-gig'],
    industries: ['hospitality'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'hospitality jobs guide',
    searchVolume: 2200,
    relatedRoles: ['server', 'bartender', 'event-staff', 'dishwasher', 'banquet-server'],
    relatedTools: ['cocktail-quiz', 'menu-master', 'pay-calculator'],
    relatedTemplates: ['hospitality', 'chronological']
  },
  "warehouse-guide": {
    userSituations: ['fresher', 'career-changer', 'career-returner'],
    industries: ['industrial'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'warehouse jobs guide',
    searchVolume: 3200,
    relatedRoles: ['picker-packer', 'forklift-driver', 'warehouse-operative', 'machine-operator'],
    relatedTools: ['safety-first', 'pay-calculator', 'shift-planner'],
    relatedTemplates: ['warehouse', 'chronological']
  },
  "retail-guide": {
    userSituations: ['fresher', 'student', 'side-gig'],
    industries: ['retail'],
    experienceLevels: ['no-experience', 'entry-level'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'retail jobs guide',
    searchVolume: 1900,
    relatedRoles: ['retail-associate', 'cashier', 'stocker'],
    relatedTools: ['pay-calculator'],
    relatedTemplates: ['retail', 'chronological']
  },
  "facilities-guide": {
    userSituations: ['career-changer', 'career-returner', 'senior'],
    industries: ['facilities'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'facilities cleaning jobs',
    searchVolume: 1400,
    relatedRoles: ['cleaner', 'custodian', 'janitor'],
    relatedTools: ['pay-calculator'],
    relatedTemplates: ['functional', 'chronological']
  },

  // Professional Development
  "networking": {
    userSituations: ['fresher', 'career-changer', 'experienced'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['entry-level', 'some-experience', 'experienced'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'professional networking tips',
    searchVolume: 1500,
    relatedRoles: [],
    relatedTools: ['career-path'],
    relatedTemplates: []
  },
  "resume-tips": {
    userSituations: ['fresher', 'student', 'career-changer'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'resume tips hourly workers',
    searchVolume: 2100,
    relatedRoles: ['picker-packer', 'server', 'retail-associate'],
    relatedTools: ['skills-analyzer', 'action-verbs'],
    relatedTemplates: ['chronological', 'functional', 'combination']
  },
  "interview-skills": {
    userSituations: ['fresher', 'student', 'career-changer', 'career-returner'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'interview tips flex work',
    searchVolume: 1700,
    relatedRoles: [],
    relatedTools: [],
    relatedTemplates: []
  },
  "multiple-gigs": {
    userSituations: ['side-gig', 'parent', 'student'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'multiple gig jobs',
    searchVolume: 1200,
    relatedRoles: [],
    relatedTools: ['shift-planner', 'tax-calculator'],
    relatedTemplates: []
  },

  // Financial & Taxes
  "tax-guide-gig-workers": {
    userSituations: ['side-gig', 'parent', 'student', 'fresher', 'seasonal'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience', 'experienced'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'gig worker taxes 1099',
    searchVolume: 8100,
    relatedRoles: [],
    relatedTools: ['tax-calculator', 'pay-calculator'],
    relatedTemplates: []
  },

  // Working Parents
  "working-parent-guide": {
    userSituations: ['parent', 'career-returner', 'side-gig'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience', 'experienced'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'working parent flexible jobs',
    searchVolume: 4800,
    relatedRoles: ['picker-packer', 'cleaner', 'warehouse-clerk', 'retail-assistant'],
    relatedTools: ['childcare-calculator', 'shift-planner', 'pay-calculator', 'tax-calculator'],
    relatedTemplates: ['career-break', 'parent-resume']
  },

  // Workplace Success
  "workplace-success": {
    userSituations: ['fresher', 'career-changer', 'career-returner'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'first 90 days new job',
    searchVolume: 1400,
    relatedRoles: [],
    relatedTools: ['career-path'],
    relatedTemplates: []
  },
  "shift-rating-tips": {
    userSituations: ['fresher', 'student', 'side-gig'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'get 5 star rating gig',
    searchVolume: 980,
    relatedRoles: ['picker-packer', 'server', 'event-staff'],
    relatedTools: ['shift-planner'],
    relatedTemplates: []
  },

  // Seasonal & Event Hiring
  "holiday-warehouse-guide": {
    userSituations: ['fresher', 'student', 'side-gig', 'seasonal'],
    industries: ['industrial'],
    experienceLevels: ['no-experience', 'entry-level'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'holiday warehouse jobs 2026',
    searchVolume: 4800,
    relatedRoles: ['picker-packer', 'forklift-driver', 'warehouse-operative'],
    relatedTools: ['pay-calculator', 'shift-planner'],
    relatedTemplates: ['warehouse', 'chronological']
  },
  "black-friday-hiring": {
    userSituations: ['fresher', 'student', 'side-gig', 'seasonal'],
    industries: ['retail', 'industrial'],
    experienceLevels: ['no-experience', 'entry-level'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'black friday hiring 2026',
    searchVolume: 5400,
    relatedRoles: ['retail-associate', 'picker-packer', 'stocker'],
    relatedTools: ['pay-calculator'],
    relatedTemplates: ['retail', 'one-page']
  },
  "summer-hospitality-guide": {
    userSituations: ['student', 'fresher', 'seasonal'],
    industries: ['hospitality'],
    experienceLevels: ['no-experience', 'entry-level'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'summer hospitality jobs',
    searchVolume: 3600,
    relatedRoles: ['server', 'bartender', 'event-staff', 'banquet-server'],
    relatedTools: ['cocktail-quiz', 'pay-calculator'],
    relatedTemplates: ['hospitality', 'chronological']
  },
  "student-jobs-fall": {
    userSituations: ['student', 'fresher'],
    industries: ['hospitality', 'retail', 'industrial'],
    experienceLevels: ['no-experience', 'entry-level'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'student jobs fall 2026',
    searchVolume: 2800,
    relatedRoles: ['retail-associate', 'server', 'picker-packer'],
    relatedTools: ['shift-planner', 'pay-calculator'],
    relatedTemplates: ['student', 'one-page']
  },
  "event-staffing-guide": {
    userSituations: ['fresher', 'student', 'side-gig', 'seasonal'],
    industries: ['hospitality'],
    experienceLevels: ['no-experience', 'entry-level'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'event staffing jobs',
    searchVolume: 2100,
    relatedRoles: ['event-staff', 'banquet-server', 'bartender'],
    relatedTools: ['pay-calculator', 'shift-planner'],
    relatedTemplates: ['hospitality', 'functional']
  },
  "tax-season-jobs": {
    userSituations: ['side-gig', 'seasonal', 'student'],
    industries: ['retail', 'industrial'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'tax season jobs 2026',
    searchVolume: 1500,
    relatedRoles: ['retail-associate', 'warehouse-operative'],
    relatedTools: ['tax-calculator', 'pay-calculator'],
    relatedTemplates: ['chronological']
  },

  // Employment Eligibility
  "i9-complete-guide": {
    userSituations: ['fresher', 'immigrant', 'visa-holder'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'I-9 form guide',
    searchVolume: 8100,
    relatedRoles: [],
    relatedTools: [],
    relatedTemplates: []
  },
  "i9-documents-list": {
    userSituations: ['fresher', 'immigrant', 'visa-holder'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'I-9 acceptable documents',
    searchVolume: 6700,
    relatedRoles: [],
    relatedTools: [],
    relatedTemplates: []
  },
  "first-job-america-guide": {
    userSituations: ['immigrant', 'visa-holder', 'fresher'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'first job in america',
    searchVolume: 4200,
    relatedRoles: ['picker-packer', 'dishwasher', 'cleaner'],
    relatedTools: ['pay-calculator'],
    relatedTemplates: ['functional', 'one-page']
  },
  "work-authorization-types": {
    userSituations: ['immigrant', 'visa-holder'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'work authorization types usa',
    searchVolume: 3800,
    relatedRoles: [],
    relatedTools: [],
    relatedTemplates: []
  },
  "work-without-ssn": {
    userSituations: ['immigrant', 'visa-holder', 'fresher'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'work without social security number',
    searchVolume: 5100,
    relatedRoles: [],
    relatedTools: [],
    relatedTemplates: []
  },
  "e-verify-explained": {
    userSituations: ['immigrant', 'visa-holder', 'fresher'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'E-Verify explained',
    searchVolume: 2900,
    relatedRoles: [],
    relatedTools: [],
    relatedTemplates: []
  },

  // Resume & Profile Guides
  "temp-work-resume-guide": {
    userSituations: ['fresher', 'career-changer', 'side-gig', 'career-returner'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'create',
    language: 'english',
    primaryKeyword: 'temp work resume 2026',
    searchVolume: 3400,
    relatedRoles: ['picker-packer', 'server', 'event-staff', 'warehouse-operative'],
    relatedTools: ['skills-analyzer', 'action-verbs'],
    relatedTemplates: ['temp-worker', 'chronological', 'functional']
  },
  "indeed-flex-profile-guide": {
    userSituations: ['fresher', 'student', 'career-changer', 'side-gig'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'create',
    language: 'english',
    primaryKeyword: 'indeed flex profile tips',
    searchVolume: 1800,
    relatedRoles: ['picker-packer', 'server', 'forklift-driver', 'event-staff'],
    relatedTools: ['skills-analyzer', 'pay-calculator'],
    relatedTemplates: ['chronological', 'functional']
  },
  "temp-job-cover-letter": {
    userSituations: ['fresher', 'career-changer', 'career-returner', 'side-gig'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'create',
    language: 'english',
    primaryKeyword: 'cover letter temp job 2026',
    searchVolume: 2600,
    relatedRoles: ['picker-packer', 'server', 'retail-associate', 'warehouse-operative'],
    relatedTools: ['action-verbs'],
    relatedTemplates: ['entry-level-cover', 'general-cover', 'hospitality-cover']
  }
};

// ============================================
// JOB APPLICATION ARTICLES
// ============================================

export const JOB_APPLICATION_TAXONOMY: Record<string, ArticleTaxonomyData> = {
  "fresher-resume-guide": {
    userSituations: ['fresher', 'student', 'career-returner'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level'],
    contentIntent: 'create',
    language: 'english',
    primaryKeyword: 'resume for freshers 2026',
    searchVolume: 12100,
    relatedRoles: ['picker-packer', 'server', 'retail-associate', 'dishwasher'],
    relatedTools: ['skills-analyzer', 'action-verbs'],
    relatedTemplates: ['functional', 'first-job', 'one-page']
  },
  "student-resume-template": {
    userSituations: ['student', 'fresher'],
    industries: ['hospitality', 'retail', 'industrial'],
    experienceLevels: ['no-experience', 'entry-level'],
    contentIntent: 'create',
    language: 'english',
    primaryKeyword: 'student resume template 2026',
    searchVolume: 8900,
    relatedRoles: ['retail-associate', 'server', 'picker-packer'],
    relatedTools: ['shift-planner', 'pay-calculator'],
    relatedTemplates: ['student', 'one-page', 'chronological']
  },
  "zero-experience-jobs": {
    userSituations: ['fresher', 'student', 'career-returner'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience'],
    contentIntent: 'find-work',
    language: 'english',
    primaryKeyword: 'jobs with no experience 2026',
    searchVolume: 14800,
    relatedRoles: ['picker-packer', 'dishwasher', 'cleaner', 'event-staff'],
    relatedTools: ['pay-calculator'],
    relatedTemplates: ['functional', 'first-job']
  },
  "transferable-skills-guide": {
    userSituations: ['fresher', 'career-changer', 'career-returner', 'parent'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level', 'career-change'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'transferable skills examples',
    searchVolume: 6200,
    relatedRoles: [],
    relatedTools: ['skills-analyzer'],
    relatedTemplates: ['functional', 'skills-based', 'combination']
  },
  "ats-resume-tips": {
    userSituations: ['fresher', 'career-changer', 'experienced'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['entry-level', 'some-experience', 'experienced'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'ATS resume tips 2026',
    searchVolume: 9700,
    relatedRoles: [],
    relatedTools: ['action-verbs'],
    relatedTemplates: ['ats-optimized', 'chronological']
  },
  "best-resume-builders-2026": {
    userSituations: ['fresher', 'student', 'career-changer'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'compare',
    language: 'english',
    primaryKeyword: 'best resume builders 2026',
    searchVolume: 7400,
    relatedRoles: [],
    relatedTools: [],
    relatedTemplates: ['chronological', 'functional', 'combination']
  },
  "best-job-boards-2026": {
    userSituations: ['fresher', 'career-changer', 'side-gig'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'compare',
    language: 'english',
    primaryKeyword: 'best job boards 2026',
    searchVolume: 11200,
    relatedRoles: ['picker-packer', 'server', 'retail-associate'],
    relatedTools: [],
    relatedTemplates: []
  },
  "indeed-flex-vs-staffing-agencies": {
    userSituations: ['fresher', 'career-changer', 'side-gig'],
    industries: ['hospitality', 'industrial', 'retail'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'compare',
    language: 'english',
    primaryKeyword: 'indeed flex vs staffing agency',
    searchVolume: 3200,
    relatedRoles: ['picker-packer', 'server', 'event-staff'],
    relatedTools: ['pay-calculator'],
    relatedTemplates: []
  },
  "warehouse-interview-questions": {
    userSituations: ['fresher', 'career-changer'],
    industries: ['industrial'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'warehouse interview questions 2026',
    searchVolume: 5800,
    relatedRoles: ['picker-packer', 'forklift-driver', 'warehouse-operative'],
    relatedTools: ['safety-first'],
    relatedTemplates: ['warehouse', 'chronological']
  },
  "hospitality-interview-questions": {
    userSituations: ['fresher', 'student', 'career-changer'],
    industries: ['hospitality'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'hospitality interview questions 2026',
    searchVolume: 4600,
    relatedRoles: ['server', 'bartender', 'event-staff', 'dishwasher'],
    relatedTools: ['cocktail-quiz', 'menu-master'],
    relatedTemplates: ['hospitality', 'chronological']
  },
  "temp-to-permanent-guide": {
    userSituations: ['fresher', 'career-changer', 'career-returner'],
    industries: ['hospitality', 'industrial', 'retail'],
    experienceLevels: ['entry-level', 'some-experience'],
    contentIntent: 'learn',
    language: 'english',
    primaryKeyword: 'temp to perm conversion',
    searchVolume: 2400,
    relatedRoles: ['warehouse-operative', 'server', 'retail-associate'],
    relatedTools: ['career-path'],
    relatedTemplates: ['combination', 'chronological']
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get taxonomy data for a guide article
 */
export function getGuideTaxonomy(slug: string): ArticleTaxonomyData | undefined {
  return GUIDE_TAXONOMY[slug] || JOB_APPLICATION_TAXONOMY[slug];
}

/**
 * Get all articles matching a user situation
 */
export function getArticlesForSituation(situation: UserSituation): string[] {
  const matching: string[] = [];
  
  for (const [slug, data] of Object.entries(GUIDE_TAXONOMY)) {
    if (data.userSituations.includes(situation)) {
      matching.push(slug);
    }
  }
  
  for (const [slug, data] of Object.entries(JOB_APPLICATION_TAXONOMY)) {
    if (data.userSituations.includes(situation)) {
      matching.push(slug);
    }
  }
  
  return matching;
}

/**
 * Get all articles for an industry
 */
export function getArticlesForIndustry(industry: Industry): string[] {
  const matching: string[] = [];
  
  for (const [slug, data] of Object.entries(GUIDE_TAXONOMY)) {
    if (data.industries.includes(industry)) {
      matching.push(slug);
    }
  }
  
  for (const [slug, data] of Object.entries(JOB_APPLICATION_TAXONOMY)) {
    if (data.industries.includes(industry)) {
      matching.push(slug);
    }
  }
  
  return matching;
}

/**
 * Get related articles based on shared taxonomy
 */
export function getRelatedArticlesBySituation(slug: string, limit = 5): string[] {
  const taxonomy = getGuideTaxonomy(slug);
  if (!taxonomy) return [];
  
  const allArticles = { ...GUIDE_TAXONOMY, ...JOB_APPLICATION_TAXONOMY };
  const scores: { slug: string; score: number }[] = [];
  
  for (const [articleSlug, data] of Object.entries(allArticles)) {
    if (articleSlug === slug) continue;
    
    let score = 0;
    
    // Score by shared user situations
    for (const situation of taxonomy.userSituations) {
      if (data.userSituations.includes(situation)) score += 2;
    }
    
    // Score by shared industries
    for (const industry of taxonomy.industries) {
      if (data.industries.includes(industry)) score += 1;
    }
    
    // Score by shared experience levels
    for (const level of taxonomy.experienceLevels) {
      if (data.experienceLevels.includes(level)) score += 1;
    }
    
    if (score > 0) {
      scores.push({ slug: articleSlug, score });
    }
  }
  
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.slug);
}

/**
 * Get articles by content intent
 */
export function getArticlesByIntent(intent: ContentIntent): string[] {
  const matching: string[] = [];
  
  for (const [slug, data] of Object.entries(GUIDE_TAXONOMY)) {
    if (data.contentIntent === intent) {
      matching.push(slug);
    }
  }
  
  for (const [slug, data] of Object.entries(JOB_APPLICATION_TAXONOMY)) {
    if (data.contentIntent === intent) {
      matching.push(slug);
    }
  }
  
  return matching;
}
