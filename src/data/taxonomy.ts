import { 
  Briefcase, Calculator, GraduationCap, MapPin, Calendar, FileText, 
  DollarSign, Wallet, Baby, Car, Building2, TrendingUp, BookOpen, 
  Award, Wrench, Globe, Users, Warehouse, UtensilsCrossed, ShoppingBag,
  LucideIcon
} from "lucide-react";

// ============ PILLAR DEFINITIONS ============
export type PillarId = 'find-work' | 'calculate' | 'grow';

export interface Pillar {
  id: PillarId;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string; // Tailwind class
}

export const pillars: Record<PillarId, Pillar> = {
  'find-work': {
    id: 'find-work',
    name: 'Find Work',
    description: 'Discover jobs, apply, and get hired',
    icon: Briefcase,
    color: 'text-blue-600'
  },
  'calculate': {
    id: 'calculate',
    name: 'Calculate',
    description: 'Plan finances and make smart decisions',
    icon: Calculator,
    color: 'text-green-600'
  },
  'grow': {
    id: 'grow',
    name: 'Grow',
    description: 'Learn skills and advance your career',
    icon: GraduationCap,
    color: 'text-purple-600'
  }
};

// ============ HUB DEFINITIONS ============
export type HubId = 
  // Find Work hubs
  | 'job-application' | 'active-markets' | 'industries' | 'seasonal-hiring'
  // Calculate hubs
  | 'pay-taxes' | 'life-decisions' | 'financial-guides'
  // Grow hubs
  | 'getting-started' | 'skills-training' | 'career-advancement' | 'work-authorization';

export interface Hub {
  id: HubId;
  pillar: PillarId;
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export const hubs: Record<HubId, Hub> = {
  // FIND WORK HUBS
  'job-application': {
    id: 'job-application',
    pillar: 'find-work',
    name: 'Job Application Toolkit',
    description: 'Resumes, cover letters & profile optimization',
    icon: FileText,
    href: '/career-hub/job-application-toolkit'
  },
  'active-markets': {
    id: 'active-markets',
    pillar: 'find-work',
    name: 'Active Markets',
    description: '19 US cities with Indeed Flex opportunities',
    icon: MapPin,
    href: '/career-hub/active-markets'
  },
  'industries': {
    id: 'industries',
    pillar: 'find-work',
    name: 'Industries',
    description: 'Hospitality, warehouse, retail & facilities',
    icon: Building2,
    href: '/career-hub'
  },
  'seasonal-hiring': {
    id: 'seasonal-hiring',
    pillar: 'find-work',
    name: 'Seasonal Hiring',
    description: 'Holiday, summer & event job opportunities',
    icon: Calendar,
    href: '/career-hub/seasonal-hiring'
  },
  
  // CALCULATE HUBS
  'pay-taxes': {
    id: 'pay-taxes',
    pillar: 'calculate',
    name: 'Pay & Taxes',
    description: 'Estimate earnings, plan shifts, calculate taxes',
    icon: DollarSign,
    href: '/career-hub/tools'
  },
  'life-decisions': {
    id: 'life-decisions',
    pillar: 'calculate',
    name: 'Life Decisions',
    description: 'Childcare, commute & cost of living tools',
    icon: Baby,
    href: '/career-hub/tools'
  },
  'financial-guides': {
    id: 'financial-guides',
    pillar: 'calculate',
    name: 'Financial Guides',
    description: 'Budgeting, saving & benefits articles',
    icon: Wallet,
    href: '/career-hub/financial-tips'
  },
  
  // GROW HUBS
  'getting-started': {
    id: 'getting-started',
    pillar: 'grow',
    name: 'Getting Started',
    description: 'First job, first shift & Indeed Flex basics',
    icon: BookOpen,
    href: '/career-hub/guides'
  },
  'skills-training': {
    id: 'skills-training',
    pillar: 'grow',
    name: 'Skills & Training',
    description: 'WorkTalk, certifications & quizzes',
    icon: Award,
    href: '/career-hub/tools'
  },
  'career-advancement': {
    id: 'career-advancement',
    pillar: 'grow',
    name: 'Career Advancement',
    description: 'Career paths, getting more shifts & temp-to-perm',
    icon: TrendingUp,
    href: '/career-hub/guides'
  },
  'work-authorization': {
    id: 'work-authorization',
    pillar: 'grow',
    name: 'Work Authorization',
    description: 'I-9, E-Verify & eligibility guides',
    icon: Globe,
    href: '/career-hub/guides'
  }
};

// ============ TAG DEFINITIONS ============
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type IndustryTag = 'warehouse' | 'hospitality' | 'retail' | 'facilities' | 'general';
export type ContentType = 'guide' | 'tool' | 'template' | 'checklist' | 'article';
export type UserSituation = 'first-job' | 'side-gig' | 'career-change' | 'student' | 'parent' | 'immigrant' | 'returning-worker';
export type TimelinessTag = '2026' | 'seasonal' | 'evergreen';

export interface ContentTags {
  experienceLevel: ExperienceLevel[];
  industries: IndustryTag[];
  situations: UserSituation[];
  timeliness: TimelinessTag[];
}

export const tagLabels: Record<string, Record<string, string>> = {
  experienceLevel: {
    'beginner': 'No Experience Needed',
    'intermediate': 'Some Experience',
    'advanced': 'Experienced Workers'
  },
  industries: {
    'warehouse': 'Warehouse & Industrial',
    'hospitality': 'Hospitality',
    'retail': 'Retail',
    'facilities': 'Facilities',
    'general': 'All Industries'
  },
  situations: {
    'first-job': 'First Job',
    'side-gig': 'Side Gig',
    'career-change': 'Career Change',
    'student': 'Students',
    'parent': 'Working Parents',
    'immigrant': 'New to US',
    'returning-worker': 'Returning to Work'
  },
  timeliness: {
    '2026': 'Updated 2026',
    'seasonal': 'Seasonal',
    'evergreen': 'Always Relevant'
  }
};

// ============ CONTENT ITEM INTERFACE ============
export interface ContentItem {
  slug: string;
  title: string;
  description: string;
  pillar: PillarId;
  hub: HubId;
  contentType: ContentType;
  tags: ContentTags;
  readTime?: string;
  answersQuestion?: string; // For SEO "People Also Ask" targeting
  icon?: LucideIcon;
  href: string;
}

// ============ NAVIGATION STRUCTURE ============
export interface NavPillar {
  pillar: Pillar;
  featured: {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
  };
  sections: {
    title: string;
    links: { title: string; href: string; description?: string }[];
  }[];
  viewAllLink: {
    title: string;
    href: string;
  };
}

export const navigationStructure: NavPillar[] = [
  {
    pillar: pillars['find-work'],
    featured: {
      title: 'Job Application Toolkit',
      description: 'Resume guides, cover letters & profile tips',
      href: '/career-hub/job-application-toolkit',
      icon: FileText
    },
    sections: [
      {
        title: 'By Location',
        links: [
          { title: 'Active Markets', href: '/career-hub/active-markets', description: '19 US cities' },
          { title: 'All US Cities', href: '/career-hub/cities', description: '300+ metros' },
          { title: 'Seasonal Hiring', href: '/career-hub/seasonal-hiring', description: 'Holiday & events' },
        ]
      },
      {
        title: 'By Industry',
        links: [
          { title: 'Hospitality', href: '/career-hub/industries/hospitality' },
          { title: 'Warehouse', href: '/career-hub/industries/industrial' },
          { title: 'Retail', href: '/career-hub/industries/retail' },
          { title: 'Facilities', href: '/career-hub/industries/facilities' },
        ]
      }
    ],
    viewAllLink: {
      title: 'Browse All Jobs',
      href: '/career-hub'
    }
  },
  {
    pillar: pillars['calculate'],
    featured: {
      title: 'Pay Calculator',
      description: 'Estimate earnings with Same Day Pay',
      href: '/career-hub/tools/pay-calculator',
      icon: DollarSign
    },
    sections: [
      {
        title: 'Pay & Taxes',
        links: [
          { title: 'Pay Calculator', href: '/career-hub/tools/pay-calculator' },
          { title: 'Tax Calculator', href: '/career-hub/tools/tax-calculator' },
          { title: 'Shift Planner', href: '/career-hub/tools/shift-planner' },
        ]
      },
      {
        title: 'Life Decisions',
        links: [
          { title: 'Childcare Calculator', href: '/career-hub/tools/childcare-calculator' },
          { title: 'Commute Calculator', href: '/career-hub/tools/commute-calculator' },
          { title: 'Cost of Living', href: '/career-hub/tools/cost-of-living' },
        ]
      },
      {
        title: 'Financial Guides',
        links: [
          { title: 'Budgeting Tips', href: '/career-hub/financial-tips/irregular-income-budget' },
          { title: 'Emergency Fund', href: '/career-hub/financial-tips/emergency-fund-guide' },
          { title: 'Tax Tips', href: '/career-hub/financial-tips/tax-tips' },
        ]
      }
    ],
    viewAllLink: {
      title: 'All Tools & Guides',
      href: '/career-hub/tools'
    }
  },
  {
    pillar: pillars['grow'],
    featured: {
      title: 'Getting Started Guide',
      description: 'Your complete Indeed Flex onboarding',
      href: '/career-hub/guides/complete-guide',
      icon: BookOpen
    },
    sections: [
      {
        title: 'Getting Started',
        links: [
          { title: 'First Flexible Job', href: '/career-hub/guides/first-flex-job' },
          { title: 'First Shift Tips', href: '/career-hub/guides/first-shift' },
          { title: 'Build Your Profile', href: '/career-hub/guides/worker-profile' },
        ]
      },
      {
        title: 'Skills & Training',
        links: [
          { title: 'WorkTalk (Job English)', href: '/career-hub/tools/worktalk' },
          { title: 'Certifications', href: '/career-hub/guides/certifications' },
          { title: 'Career Path Explorer', href: '/career-hub/tools/career-path' },
        ]
      },
      {
        title: 'Work Authorization',
        links: [
          { title: 'I-9 Complete Guide', href: '/career-hub/guides/i9-complete-guide' },
          { title: 'E-Verify Explained', href: '/career-hub/guides/e-verify-explained' },
          { title: 'Work in America Guide', href: '/career-hub/guides/first-job-america-guide' },
        ]
      }
    ],
    viewAllLink: {
      title: 'All Guides',
      href: '/career-hub/guides'
    }
  }
];

// ============ HELPER FUNCTIONS ============
export function getHubsByPillar(pillarId: PillarId): Hub[] {
  return Object.values(hubs).filter(hub => hub.pillar === pillarId);
}

export function getTagLabel(category: keyof typeof tagLabels, tag: string): string {
  return tagLabels[category]?.[tag] || tag;
}

export function filterContentByTags(
  items: ContentItem[],
  filters: Partial<ContentTags>
): ContentItem[] {
  return items.filter(item => {
    if (filters.experienceLevel?.length && 
        !filters.experienceLevel.some(level => item.tags.experienceLevel.includes(level))) {
      return false;
    }
    if (filters.industries?.length && 
        !filters.industries.some(ind => item.tags.industries.includes(ind))) {
      return false;
    }
    if (filters.situations?.length && 
        !filters.situations.some(sit => item.tags.situations.includes(sit))) {
      return false;
    }
    if (filters.timeliness?.length && 
        !filters.timeliness.some(time => item.tags.timeliness.includes(time))) {
      return false;
    }
    return true;
  });
}
