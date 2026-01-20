/**
 * Master Taxonomy System
 * Central source of truth for all content classification across the Career Hub
 * Used for filtering, cross-linking, and personalized content discovery
 */

import { 
  Briefcase, Building2, GraduationCap, Users, FileText, 
  Calculator, BookOpen, Target, Globe, Clock,
  Baby, Wallet, ArrowRightLeft, School, Sparkles
} from 'lucide-react';
import React from 'react';

// ============================================
// CORE TAXONOMY CONSTANTS
// ============================================

export const INDUSTRIES = ['hospitality', 'industrial', 'retail', 'facilities'] as const;
export type Industry = typeof INDUSTRIES[number];

export const EXPERIENCE_LEVELS = [
  'no-experience',      // Never worked before
  'entry-level',        // 0-1 years
  'some-experience',    // 1-3 years  
  'experienced',        // 3+ years
  'career-change'       // Switching industries
] as const;
export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number];

export const USER_SITUATIONS = [
  'student',            // Part-time while studying
  'fresher',            // First job ever (high school/college grad)
  'immigrant',          // New to US workforce (I-9, work auth needs)
  'parent',             // Balancing work + childcare
  'senior',             // 50+ returning to work
  'career-returner',    // After employment gap
  'side-gig',           // Supplemental income
  'teen',               // 14-17 years old (legal restrictions)
  'bilingual',          // Spanish-English speakers
  'career-changer',     // Switching industries
  'seasonal',           // Holiday/summer workers
  'visa-holder',        // Work authorization questions
  'experienced'         // 3+ years in current field
] as const;
export type UserSituation = typeof USER_SITUATIONS[number];

export const CONTENT_INTENTS = [
  'learn',              // Educational articles (guides)
  'create',             // Interactive builders (templates)
  'calculate',          // Financial tools
  'compare',            // Comparison articles/tools
  'find-work'           // Job discovery (markets, roles)
] as const;
export type ContentIntent = typeof CONTENT_INTENTS[number];

export const DOCUMENT_TYPES = [
  'resume-example',
  'resume-template', 
  'cover-letter',
  'guide',
  'tool',
  'checklist',
  'quiz',
  'calculator'
] as const;
export type DocumentType = typeof DOCUMENT_TYPES[number];

export const RESUME_FORMATS = [
  'chronological',
  'functional',
  'combination',
  'skills-based',
  'one-page',
  'ats-optimized',
  'temp-worker'
] as const;
export type ResumeFormat = typeof RESUME_FORMATS[number];

export const LANGUAGES = ['english', 'spanish', 'bilingual'] as const;
export type Language = typeof LANGUAGES[number];

// ============================================
// DISPLAY LABELS & METADATA
// ============================================

export const INDUSTRY_LABELS: Record<Industry, { label: string; icon: string; color: string }> = {
  hospitality: { label: 'Hospitality', icon: '🍽️', color: 'bg-orange-100 text-orange-800' },
  industrial: { label: 'Industrial & Warehouse', icon: '🏭', color: 'bg-blue-100 text-blue-800' },
  retail: { label: 'Retail', icon: '🛒', color: 'bg-purple-100 text-purple-800' },
  facilities: { label: 'Facilities', icon: '🧹', color: 'bg-green-100 text-green-800' }
};

export const EXPERIENCE_LABELS: Record<ExperienceLevel, { label: string; description: string }> = {
  'no-experience': { label: 'No Experience', description: 'First time working' },
  'entry-level': { label: 'Entry Level', description: '0-1 years experience' },
  'some-experience': { label: 'Some Experience', description: '1-3 years experience' },
  'experienced': { label: 'Experienced', description: '3+ years experience' },
  'career-change': { label: 'Career Change', description: 'Switching industries' }
};

export const SITUATION_LABELS: Record<UserSituation, { 
  label: string; 
  description: string; 
  icon: string;
  keywords: string[];
}> = {
  student: { 
    label: 'Student', 
    description: 'Balancing work and school',
    icon: '🎓',
    keywords: ['student jobs', 'part-time jobs for students', 'college jobs']
  },
  fresher: { 
    label: 'First Job', 
    description: 'Landing your first ever job',
    icon: '🌟',
    keywords: ['first job', 'resume for freshers', 'no experience jobs']
  },
  immigrant: { 
    label: 'New to US', 
    description: 'Navigating US work requirements',
    icon: '🌍',
    keywords: ['work in america', 'i9 form', 'work authorization']
  },
  parent: { 
    label: 'Working Parent', 
    description: 'Balancing work and family',
    icon: '👨‍👩‍👧',
    keywords: ['jobs for parents', 'flexible hours', 'work from home']
  },
  senior: { 
    label: 'Experienced Worker', 
    description: '50+ returning to work',
    icon: '👴',
    keywords: ['jobs for seniors', 'part time jobs 50+', 'second career']
  },
  'career-returner': { 
    label: 'Career Gap', 
    description: 'Returning after time away',
    icon: '🔄',
    keywords: ['employment gap', 'return to work', 'career gap resume']
  },
  'side-gig': { 
    label: 'Side Gig', 
    description: 'Supplemental income',
    icon: '💰',
    keywords: ['side hustle', 'extra income', 'weekend jobs']
  },
  teen: { 
    label: 'Teen Worker', 
    description: '14-17 years old',
    icon: '🧑',
    keywords: ['jobs for 14 year olds', 'teen jobs', 'jobs at 15']
  },
  bilingual: { 
    label: 'Spanish Speaker', 
    description: 'Bilingual opportunities',
    icon: '🗣️',
    keywords: ['trabajos', 'bilingual jobs', 'spanish speaking jobs']
  },
  'career-changer': { 
    label: 'Career Change', 
    description: 'Switching to a new field',
    icon: '🔀',
    keywords: ['career change', 'switching careers', 'transferable skills']
  },
  seasonal: { 
    label: 'Seasonal Worker', 
    description: 'Holiday or summer work',
    icon: '📅',
    keywords: ['holiday jobs', 'summer jobs', 'seasonal hiring']
  },
  'visa-holder': { 
    label: 'Visa Holder', 
    description: 'Work authorization questions',
    icon: '📋',
    keywords: ['work permit', 'ead card', 'visa work authorization']
  },
  experienced: { 
    label: 'Experienced Pro', 
    description: '3+ years in current field',
    icon: '⭐',
    keywords: ['experienced worker', 'senior roles', 'advanced positions']
  }
};

export const INTENT_LABELS: Record<ContentIntent, { label: string; icon: string }> = {
  learn: { label: 'Learn & Research', icon: '📚' },
  create: { label: 'Build & Create', icon: '✏️' },
  calculate: { label: 'Calculate', icon: '🧮' },
  compare: { label: 'Compare Options', icon: '⚖️' },
  'find-work': { label: 'Find Work', icon: '🔍' }
};

export const FORMAT_LABELS: Record<ResumeFormat, { 
  label: string; 
  description: string;
  bestFor: UserSituation[];
}> = {
  chronological: { 
    label: 'Chronological', 
    description: 'Traditional reverse-chronological work history',
    bestFor: ['experienced', 'career-returner']
  },
  functional: { 
    label: 'Functional', 
    description: 'Skills-focused, minimizes work history',
    bestFor: ['fresher', 'career-changer', 'career-returner']
  },
  combination: { 
    label: 'Combination', 
    description: 'Best of both: skills + work history',
    bestFor: ['career-changer', 'experienced']
  },
  'skills-based': { 
    label: 'Skills-Based', 
    description: 'Emphasizes transferable skills',
    bestFor: ['fresher', 'career-changer', 'student']
  },
  'one-page': { 
    label: 'One-Page', 
    description: 'Concise single-page format',
    bestFor: ['student', 'fresher', 'teen']
  },
  'ats-optimized': { 
    label: 'ATS-Optimized', 
    description: 'Formatted for applicant tracking systems',
    bestFor: ['experienced', 'career-changer']
  },
  'temp-worker': { 
    label: 'Temp/Flex Worker', 
    description: 'Designed for gig and temp work',
    bestFor: ['side-gig', 'seasonal', 'student']
  }
};

// ============================================
// CONTENT METADATA INTERFACE
// ============================================

export interface ContentMetadata {
  // Core identifiers
  slug: string;
  title: string;
  type: DocumentType;
  
  // Taxonomy tags (arrays for multi-selection)
  industries: Industry[];
  experienceLevels: ExperienceLevel[];
  userSituations: UserSituation[];
  contentIntent: ContentIntent;
  language: Language[];
  formats?: ResumeFormat[];
  
  // SEO metadata
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  searchVolume?: 'high' | 'medium' | 'low';
  
  // Related content (hub-and-spoke)
  relatedRoles?: string[];
  relatedArticles?: string[];
  relatedTools?: string[];
  relatedTemplates?: string[];
}

// ============================================
// TOOL TAXONOMY MAPPING
// ============================================

export interface ToolTaxonomy {
  slug: string;
  title: string;
  userSituations: UserSituation[];
  contentIntent: ContentIntent;
  industries: Industry[];
  relatedGuides: string[];
  relatedRoles: string[];
}

export const TOOL_TAXONOMY: ToolTaxonomy[] = [
  {
    slug: 'pay-calculator',
    title: 'Pay Calculator',
    userSituations: ['fresher', 'student', 'side-gig', 'career-changer', 'seasonal'],
    contentIntent: 'calculate',
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    relatedGuides: ['first-flex-job', 'more-shifts', 'skill-boost'],
    relatedRoles: ['warehouse-operative', 'bartender', 'picker-packer']
  },
  {
    slug: 'tax-calculator',
    title: 'Tax Calculator',
    userSituations: ['side-gig', 'seasonal', 'experienced'],
    contentIntent: 'calculate',
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    relatedGuides: ['tax-tips', 'tax-season-jobs'],
    relatedRoles: []
  },
  {
    slug: 'childcare-calculator',
    title: 'Childcare Calculator',
    userSituations: ['parent'],
    contentIntent: 'calculate',
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    relatedGuides: ['multiple-gigs'],
    relatedRoles: []
  },
  {
    slug: 'commute-calculator',
    title: 'Commute Calculator',
    userSituations: ['fresher', 'student', 'parent', 'career-changer'],
    contentIntent: 'calculate',
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    relatedGuides: ['first-flex-job', 'first-shift'],
    relatedRoles: ['warehouse-operative', 'picker-packer']
  },
  {
    slug: 'unemployment-calculator',
    title: 'Unemployment Calculator',
    userSituations: ['career-returner', 'career-changer', 'seasonal'],
    contentIntent: 'calculate',
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    relatedGuides: ['temp-to-perm-guide'],
    relatedRoles: []
  },
  {
    slug: 'skills-analyzer',
    title: 'Skills Analyzer',
    userSituations: ['fresher', 'career-changer', 'career-returner'],
    contentIntent: 'compare',
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    relatedGuides: ['skill-boost', 'certifications', 'career-paths'],
    relatedRoles: ['warehouse-operative', 'bartender', 'forklift-driver']
  },
  {
    slug: 'career-path',
    title: 'Career Path Explorer',
    userSituations: ['fresher', 'student', 'career-changer'],
    contentIntent: 'learn',
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    relatedGuides: ['career-paths', 'skill-boost', 'certifications'],
    relatedRoles: ['bartender', 'line-cook', 'warehouse-operative']
  },
  {
    slug: 'worktalk',
    title: 'WorkTalk: Job English',
    userSituations: ['immigrant', 'bilingual', 'visa-holder'],
    contentIntent: 'learn',
    industries: ['hospitality', 'industrial'],
    relatedGuides: ['first-job-america-guide', 'i9-complete-guide'],
    relatedRoles: ['picker-packer', 'dishwasher', 'custodian']
  },
  {
    slug: 'cocktail-quiz',
    title: 'Cocktail Quiz',
    userSituations: ['career-changer', 'fresher'],
    contentIntent: 'learn',
    industries: ['hospitality'],
    relatedGuides: ['hospitality-guide', 'certifications'],
    relatedRoles: ['bartender', 'banquet-server']
  },
  {
    slug: 'safety-first',
    title: 'Safety First OSHA Trainer',
    userSituations: ['fresher', 'immigrant', 'career-changer'],
    contentIntent: 'learn',
    industries: ['industrial', 'facilities'],
    relatedGuides: ['warehouse-guide', 'certifications'],
    relatedRoles: ['warehouse-operative', 'forklift-driver', 'custodian']
  },
  {
    slug: 'menu-master',
    title: 'Menu Master: Culinary Terms',
    userSituations: ['career-changer', 'fresher', 'bilingual'],
    contentIntent: 'learn',
    industries: ['hospitality'],
    relatedGuides: ['hospitality-guide', 'certifications'],
    relatedRoles: ['line-cook', 'prep-cook', 'dishwasher']
  },
  {
    slug: 'shift-planner',
    title: 'Shift Planner',
    userSituations: ['student', 'parent', 'side-gig'],
    contentIntent: 'calculate',
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    relatedGuides: ['multiple-gigs', 'more-shifts'],
    relatedRoles: []
  },
  {
    slug: 'cost-of-living',
    title: 'Cost of Living Comparison',
    userSituations: ['career-changer', 'fresher', 'immigrant'],
    contentIntent: 'compare',
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    relatedGuides: ['first-flex-job'],
    relatedRoles: []
  }
];

// ============================================
// GUIDE TAXONOMY MAPPING  
// ============================================

export interface GuideTaxonomy {
  slug: string;
  userSituations: UserSituation[];
  experienceLevels: ExperienceLevel[];
  industries: Industry[];
  contentIntent: ContentIntent;
  relatedRoles: string[];
  relatedTools: string[];
  relatedTemplates: string[];
}

export const GUIDE_TAXONOMY: Record<string, GuideTaxonomy> = {
  // Getting Started
  'first-flex-job': {
    slug: 'first-flex-job',
    userSituations: ['fresher', 'student', 'career-returner', 'immigrant'],
    experienceLevels: ['no-experience', 'entry-level'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    contentIntent: 'learn',
    relatedRoles: ['warehouse-operative', 'picker-packer', 'event-staff', 'dishwasher'],
    relatedTools: ['pay-calculator', 'shift-planner'],
    relatedTemplates: ['functional', 'one-page', 'temp-worker']
  },
  'complete-guide': {
    slug: 'complete-guide',
    userSituations: ['fresher', 'career-changer', 'side-gig'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    contentIntent: 'learn',
    relatedRoles: ['warehouse-operative', 'bartender', 'event-staff'],
    relatedTools: ['pay-calculator', 'career-path'],
    relatedTemplates: ['temp-worker', 'chronological']
  },
  'first-shift': {
    slug: 'first-shift',
    userSituations: ['fresher', 'student', 'teen', 'immigrant'],
    experienceLevels: ['no-experience', 'entry-level'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    contentIntent: 'learn',
    relatedRoles: ['picker-packer', 'dishwasher', 'retail-associate'],
    relatedTools: ['commute-calculator'],
    relatedTemplates: ['one-page']
  },
  'worker-profile': {
    slug: 'worker-profile',
    userSituations: ['fresher', 'career-changer', 'career-returner'],
    experienceLevels: ['no-experience', 'entry-level', 'career-change'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    contentIntent: 'create',
    relatedRoles: [],
    relatedTools: ['skills-analyzer'],
    relatedTemplates: ['functional', 'combination']
  },
  
  // Career Growth
  'career-paths': {
    slug: 'career-paths',
    userSituations: ['fresher', 'career-changer', 'student'],
    experienceLevels: ['entry-level', 'some-experience'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    contentIntent: 'learn',
    relatedRoles: ['bartender', 'warehouse-operative', 'line-cook', 'forklift-driver'],
    relatedTools: ['career-path', 'skills-analyzer'],
    relatedTemplates: ['combination', 'chronological']
  },
  'skill-boost': {
    slug: 'skill-boost',
    userSituations: ['fresher', 'career-changer', 'side-gig'],
    experienceLevels: ['entry-level', 'some-experience'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    contentIntent: 'learn',
    relatedRoles: ['forklift-driver', 'bartender', 'line-cook'],
    relatedTools: ['pay-calculator', 'skills-analyzer'],
    relatedTemplates: ['skills-based']
  },
  'certifications': {
    slug: 'certifications',
    userSituations: ['career-changer', 'fresher', 'career-returner'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    industries: ['hospitality', 'industrial'],
    contentIntent: 'learn',
    relatedRoles: ['forklift-driver', 'bartender', 'line-cook'],
    relatedTools: ['cocktail-quiz', 'safety-first', 'menu-master'],
    relatedTemplates: ['combination', 'skills-based']
  },
  'more-shifts': {
    slug: 'more-shifts',
    userSituations: ['side-gig', 'student', 'parent'],
    experienceLevels: ['entry-level', 'some-experience'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    contentIntent: 'learn',
    relatedRoles: [],
    relatedTools: ['shift-planner', 'pay-calculator'],
    relatedTemplates: ['temp-worker']
  },
  'temp-to-perm-guide': {
    slug: 'temp-to-perm-guide',
    userSituations: ['fresher', 'career-changer', 'career-returner'],
    experienceLevels: ['entry-level', 'some-experience', 'experienced'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    contentIntent: 'learn',
    relatedRoles: ['warehouse-operative', 'bartender'],
    relatedTools: ['career-path'],
    relatedTemplates: ['chronological', 'combination']
  },
  
  // Industry Guides
  'hospitality-guide': {
    slug: 'hospitality-guide',
    userSituations: ['career-changer', 'fresher', 'student'],
    experienceLevels: ['no-experience', 'entry-level'],
    industries: ['hospitality'],
    contentIntent: 'learn',
    relatedRoles: ['bartender', 'banquet-server', 'event-staff', 'line-cook', 'dishwasher'],
    relatedTools: ['cocktail-quiz', 'menu-master', 'pay-calculator'],
    relatedTemplates: ['functional', 'temp-worker']
  },
  'warehouse-guide': {
    slug: 'warehouse-guide',
    userSituations: ['fresher', 'immigrant', 'career-changer', 'career-returner'],
    experienceLevels: ['no-experience', 'entry-level'],
    industries: ['industrial'],
    contentIntent: 'learn',
    relatedRoles: ['warehouse-operative', 'picker-packer', 'forklift-driver', 'machine-operator'],
    relatedTools: ['safety-first', 'pay-calculator', 'commute-calculator'],
    relatedTemplates: ['chronological', 'functional']
  },
  'retail-guide': {
    slug: 'retail-guide',
    userSituations: ['student', 'teen', 'fresher', 'side-gig'],
    experienceLevels: ['no-experience', 'entry-level'],
    industries: ['retail'],
    contentIntent: 'learn',
    relatedRoles: ['retail-associate', 'cashier'],
    relatedTools: ['pay-calculator', 'shift-planner'],
    relatedTemplates: ['chronological', 'one-page']
  },
  'facilities-guide': {
    slug: 'facilities-guide',
    userSituations: ['career-changer', 'immigrant', 'career-returner'],
    experienceLevels: ['no-experience', 'entry-level'],
    industries: ['facilities'],
    contentIntent: 'learn',
    relatedRoles: ['cleaner', 'custodian'],
    relatedTools: ['pay-calculator'],
    relatedTemplates: ['functional', 'chronological']
  },
  
  // Employment Eligibility
  'i9-complete-guide': {
    slug: 'i9-complete-guide',
    userSituations: ['immigrant', 'visa-holder', 'fresher'],
    experienceLevels: ['no-experience', 'entry-level'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    contentIntent: 'learn',
    relatedRoles: [],
    relatedTools: ['worktalk'],
    relatedTemplates: []
  },
  'first-job-america-guide': {
    slug: 'first-job-america-guide',
    userSituations: ['immigrant', 'visa-holder'],
    experienceLevels: ['no-experience', 'entry-level', 'career-change'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    contentIntent: 'learn',
    relatedRoles: ['picker-packer', 'dishwasher', 'custodian'],
    relatedTools: ['worktalk', 'pay-calculator'],
    relatedTemplates: ['functional']
  },
  'e-verify-explained': {
    slug: 'e-verify-explained',
    userSituations: ['immigrant', 'visa-holder', 'fresher'],
    experienceLevels: ['no-experience', 'entry-level'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    contentIntent: 'learn',
    relatedRoles: [],
    relatedTools: [],
    relatedTemplates: []
  },
  
  // Seasonal Hiring
  'holiday-warehouse-guide': {
    slug: 'holiday-warehouse-guide',
    userSituations: ['seasonal', 'student', 'side-gig'],
    experienceLevels: ['no-experience', 'entry-level'],
    industries: ['industrial'],
    contentIntent: 'find-work',
    relatedRoles: ['warehouse-operative', 'picker-packer'],
    relatedTools: ['pay-calculator', 'shift-planner'],
    relatedTemplates: ['temp-worker']
  },
  'summer-hospitality-guide': {
    slug: 'summer-hospitality-guide',
    userSituations: ['seasonal', 'student', 'teen'],
    experienceLevels: ['no-experience', 'entry-level'],
    industries: ['hospitality'],
    contentIntent: 'find-work',
    relatedRoles: ['event-staff', 'banquet-server', 'bartender'],
    relatedTools: ['pay-calculator', 'cocktail-quiz'],
    relatedTemplates: ['temp-worker', 'one-page']
  },
  'student-jobs-fall': {
    slug: 'student-jobs-fall',
    userSituations: ['student', 'teen'],
    experienceLevels: ['no-experience', 'entry-level'],
    industries: ['hospitality', 'industrial', 'retail'],
    contentIntent: 'find-work',
    relatedRoles: ['retail-associate', 'event-staff', 'picker-packer'],
    relatedTools: ['shift-planner', 'pay-calculator'],
    relatedTemplates: ['one-page', 'functional']
  }
};

// ============================================
// JOB APPLICATION ARTICLE TAXONOMY
// ============================================

export const JOB_APPLICATION_TAXONOMY: Record<string, GuideTaxonomy> = {
  'fresher-resume-guide': {
    slug: 'fresher-resume-guide',
    userSituations: ['fresher', 'student', 'teen'],
    experienceLevels: ['no-experience'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    contentIntent: 'learn',
    relatedRoles: ['picker-packer', 'dishwasher', 'retail-associate'],
    relatedTools: ['skills-analyzer'],
    relatedTemplates: ['functional', 'one-page', 'skills-based']
  },
  'student-resume-template': {
    slug: 'student-resume-template',
    userSituations: ['student', 'teen'],
    experienceLevels: ['no-experience', 'entry-level'],
    industries: ['hospitality', 'retail'],
    contentIntent: 'create',
    relatedRoles: ['retail-associate', 'event-staff'],
    relatedTools: ['shift-planner'],
    relatedTemplates: ['one-page', 'functional']
  },
  'zero-experience-jobs': {
    slug: 'zero-experience-jobs',
    userSituations: ['fresher', 'career-returner', 'teen'],
    experienceLevels: ['no-experience'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    contentIntent: 'find-work',
    relatedRoles: ['picker-packer', 'dishwasher', 'custodian', 'retail-associate'],
    relatedTools: ['pay-calculator'],
    relatedTemplates: ['functional']
  },
  'transferable-skills-guide': {
    slug: 'transferable-skills-guide',
    userSituations: ['career-changer', 'career-returner', 'student'],
    experienceLevels: ['no-experience', 'entry-level', 'career-change'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    contentIntent: 'learn',
    relatedRoles: [],
    relatedTools: ['skills-analyzer'],
    relatedTemplates: ['functional', 'skills-based', 'combination']
  },
  'ats-resume-tips': {
    slug: 'ats-resume-tips',
    userSituations: ['fresher', 'career-changer', 'career-returner'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    industries: ['hospitality', 'industrial', 'retail', 'facilities'],
    contentIntent: 'learn',
    relatedRoles: [],
    relatedTools: [],
    relatedTemplates: ['chronological', 'ats-optimized']
  },
  'warehouse-interview-questions': {
    slug: 'warehouse-interview-questions',
    userSituations: ['fresher', 'career-changer', 'immigrant'],
    experienceLevels: ['no-experience', 'entry-level'],
    industries: ['industrial'],
    contentIntent: 'learn',
    relatedRoles: ['warehouse-operative', 'picker-packer', 'forklift-driver'],
    relatedTools: ['safety-first'],
    relatedTemplates: ['chronological', 'functional']
  },
  'hospitality-interview-questions': {
    slug: 'hospitality-interview-questions',
    userSituations: ['fresher', 'career-changer', 'student'],
    experienceLevels: ['no-experience', 'entry-level'],
    industries: ['hospitality'],
    contentIntent: 'learn',
    relatedRoles: ['bartender', 'banquet-server', 'event-staff', 'line-cook'],
    relatedTools: ['cocktail-quiz', 'menu-master'],
    relatedTemplates: ['functional', 'temp-worker']
  }
};

// ============================================
// ROLE TAXONOMY MAPPING
// ============================================

export interface RoleTaxonomy {
  slug: string;
  industry: Industry;
  userSituations: UserSituation[];
  experienceLevels: ExperienceLevel[];
  relatedGuides: string[];
  relatedTools: string[];
  recommendedFormats: ResumeFormat[];
}

export const ROLE_TAXONOMY: Record<string, RoleTaxonomy> = {
  'warehouse-operative': {
    slug: 'warehouse-operative',
    industry: 'industrial',
    userSituations: ['fresher', 'immigrant', 'career-returner', 'side-gig', 'seasonal'],
    experienceLevels: ['no-experience', 'entry-level'],
    relatedGuides: ['warehouse-guide', 'first-flex-job', 'warehouse-interview-questions'],
    relatedTools: ['safety-first', 'pay-calculator', 'commute-calculator'],
    recommendedFormats: ['chronological', 'functional', 'temp-worker']
  },
  'picker-packer': {
    slug: 'picker-packer',
    industry: 'industrial',
    userSituations: ['fresher', 'immigrant', 'teen', 'student', 'seasonal'],
    experienceLevels: ['no-experience', 'entry-level'],
    relatedGuides: ['warehouse-guide', 'zero-experience-jobs', 'holiday-warehouse-guide'],
    relatedTools: ['safety-first', 'pay-calculator'],
    recommendedFormats: ['functional', 'one-page', 'temp-worker']
  },
  'forklift-driver': {
    slug: 'forklift-driver',
    industry: 'industrial',
    userSituations: ['career-changer', 'experienced'],
    experienceLevels: ['entry-level', 'some-experience', 'experienced'],
    relatedGuides: ['warehouse-guide', 'certifications', 'skill-boost'],
    relatedTools: ['safety-first', 'pay-calculator', 'career-path'],
    recommendedFormats: ['chronological', 'combination']
  },
  'bartender': {
    slug: 'bartender',
    industry: 'hospitality',
    userSituations: ['career-changer', 'student', 'side-gig'],
    experienceLevels: ['entry-level', 'some-experience'],
    relatedGuides: ['hospitality-guide', 'certifications', 'hospitality-interview-questions'],
    relatedTools: ['cocktail-quiz', 'pay-calculator', 'career-path'],
    recommendedFormats: ['chronological', 'temp-worker', 'combination']
  },
  'banquet-server': {
    slug: 'banquet-server',
    industry: 'hospitality',
    userSituations: ['student', 'side-gig', 'seasonal'],
    experienceLevels: ['no-experience', 'entry-level'],
    relatedGuides: ['hospitality-guide', 'summer-hospitality-guide', 'event-staffing-guide'],
    relatedTools: ['pay-calculator', 'shift-planner'],
    recommendedFormats: ['functional', 'temp-worker', 'one-page']
  },
  'event-staff': {
    slug: 'event-staff',
    industry: 'hospitality',
    userSituations: ['student', 'seasonal', 'side-gig', 'teen'],
    experienceLevels: ['no-experience', 'entry-level'],
    relatedGuides: ['event-staffing-guide', 'summer-hospitality-guide', 'first-flex-job'],
    relatedTools: ['pay-calculator', 'shift-planner'],
    recommendedFormats: ['temp-worker', 'one-page', 'functional']
  },
  'line-cook': {
    slug: 'line-cook',
    industry: 'hospitality',
    userSituations: ['career-changer', 'experienced'],
    experienceLevels: ['entry-level', 'some-experience'],
    relatedGuides: ['hospitality-guide', 'certifications', 'career-paths'],
    relatedTools: ['menu-master', 'career-path', 'pay-calculator'],
    recommendedFormats: ['chronological', 'combination']
  },
  'dishwasher': {
    slug: 'dishwasher',
    industry: 'hospitality',
    userSituations: ['fresher', 'immigrant', 'teen', 'student'],
    experienceLevels: ['no-experience', 'entry-level'],
    relatedGuides: ['hospitality-guide', 'zero-experience-jobs', 'first-flex-job'],
    relatedTools: ['pay-calculator'],
    recommendedFormats: ['functional', 'one-page']
  },
  'retail-associate': {
    slug: 'retail-associate',
    industry: 'retail',
    userSituations: ['student', 'teen', 'fresher', 'side-gig'],
    experienceLevels: ['no-experience', 'entry-level'],
    relatedGuides: ['retail-guide', 'student-jobs-fall', 'zero-experience-jobs'],
    relatedTools: ['pay-calculator', 'shift-planner'],
    recommendedFormats: ['chronological', 'one-page']
  },
  'cleaner': {
    slug: 'cleaner',
    industry: 'facilities',
    userSituations: ['immigrant', 'career-returner', 'parent'],
    experienceLevels: ['no-experience', 'entry-level'],
    relatedGuides: ['facilities-guide', 'first-flex-job'],
    relatedTools: ['pay-calculator', 'commute-calculator'],
    recommendedFormats: ['functional', 'chronological']
  },
  'custodian': {
    slug: 'custodian',
    industry: 'facilities',
    userSituations: ['career-returner', 'senior', 'immigrant'],
    experienceLevels: ['no-experience', 'entry-level', 'some-experience'],
    relatedGuides: ['facilities-guide', 'zero-experience-jobs'],
    relatedTools: ['pay-calculator'],
    recommendedFormats: ['chronological', 'functional']
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get content relevant to a specific user situation
 */
export const getContentForSituation = (situation: UserSituation) => {
  const guides = Object.values(GUIDE_TAXONOMY).filter(g => 
    g.userSituations.includes(situation)
  );
  
  const tools = TOOL_TAXONOMY.filter(t => 
    t.userSituations.includes(situation)
  );
  
  const jobAppArticles = Object.values(JOB_APPLICATION_TAXONOMY).filter(a => 
    a.userSituations.includes(situation)
  );
  
  const roles = Object.values(ROLE_TAXONOMY).filter(r => 
    r.userSituations.includes(situation)
  );
  
  const formats = Object.entries(FORMAT_LABELS)
    .filter(([_, meta]) => meta.bestFor.includes(situation as any))
    .map(([format]) => format as ResumeFormat);
  
  return { guides, tools, jobAppArticles, roles, formats };
};

/**
 * Get content relevant to a specific industry
 */
export const getContentForIndustry = (industry: Industry) => {
  const guides = Object.values(GUIDE_TAXONOMY).filter(g => 
    g.industries.includes(industry)
  );
  
  const tools = TOOL_TAXONOMY.filter(t => 
    t.industries.includes(industry)
  );
  
  const roles = Object.values(ROLE_TAXONOMY).filter(r => 
    r.industry === industry
  );
  
  return { guides, tools, roles };
};

/**
 * Get related content for a role
 */
export const getRelatedContentForRole = (roleSlug: string) => {
  const roleTaxonomy = ROLE_TAXONOMY[roleSlug];
  if (!roleTaxonomy) return null;
  
  return {
    guides: roleTaxonomy.relatedGuides,
    tools: roleTaxonomy.relatedTools,
    formats: roleTaxonomy.recommendedFormats,
    situations: roleTaxonomy.userSituations
  };
};

/**
 * Get related content for a guide
 */
export const getRelatedContentForGuide = (guideSlug: string) => {
  const guideTaxonomy = GUIDE_TAXONOMY[guideSlug] || JOB_APPLICATION_TAXONOMY[guideSlug];
  if (!guideTaxonomy) return null;
  
  return {
    roles: guideTaxonomy.relatedRoles,
    tools: guideTaxonomy.relatedTools,
    templates: guideTaxonomy.relatedTemplates,
    situations: guideTaxonomy.userSituations
  };
};

/**
 * Get recommended templates for a user based on their situation
 */
export const getRecommendedTemplates = (situations: UserSituation[]): ResumeFormat[] => {
  const formatScores: Record<ResumeFormat, number> = {
    chronological: 0,
    functional: 0,
    combination: 0,
    'skills-based': 0,
    'one-page': 0,
    'ats-optimized': 0,
    'temp-worker': 0
  };
  
  situations.forEach(situation => {
    Object.entries(FORMAT_LABELS).forEach(([format, meta]) => {
      if (meta.bestFor.includes(situation as any)) {
        formatScores[format as ResumeFormat] += 1;
      }
    });
  });
  
  return Object.entries(formatScores)
    .sort(([, a], [, b]) => b - a)
    .filter(([, score]) => score > 0)
    .slice(0, 3)
    .map(([format]) => format as ResumeFormat);
};

/**
 * Filter content by multiple taxonomy criteria
 */
export interface TaxonomyFilters {
  industries?: Industry[];
  experienceLevels?: ExperienceLevel[];
  userSituations?: UserSituation[];
  contentIntent?: ContentIntent;
  formats?: ResumeFormat[];
}

export const filterContentByTaxonomy = (
  content: ContentMetadata[],
  filters: TaxonomyFilters
): ContentMetadata[] => {
  return content.filter(item => {
    // Industry filter
    if (filters.industries?.length) {
      if (!item.industries.some(i => filters.industries!.includes(i))) {
        return false;
      }
    }
    
    // Experience level filter
    if (filters.experienceLevels?.length) {
      if (!item.experienceLevels.some(e => filters.experienceLevels!.includes(e))) {
        return false;
      }
    }
    
    // User situation filter
    if (filters.userSituations?.length) {
      if (!item.userSituations.some(s => filters.userSituations!.includes(s))) {
        return false;
      }
    }
    
    // Content intent filter
    if (filters.contentIntent) {
      if (item.contentIntent !== filters.contentIntent) {
        return false;
      }
    }
    
    // Format filter
    if (filters.formats?.length && item.formats) {
      if (!item.formats.some(f => filters.formats!.includes(f))) {
        return false;
      }
    }
    
    return true;
  });
};
