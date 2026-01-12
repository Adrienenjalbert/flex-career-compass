import { Calendar, Snowflake, Sun, GraduationCap, Receipt, PartyPopper, ShoppingBag, Zap, Trophy, Music } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface Season {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
  months: string[];
  peakMonths: number[]; // 1-12
  industries: string[];
  searchKeywords: string[];
  description: string;
  shortDescription: string;
  hiringTimeline: string;
  tips: string[];
  avgPayIncrease: string; // e.g., "+10-20%"
  demandLevel: 'high' | 'very-high' | 'medium';
}

export interface SeasonalEvent {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
  date: string; // e.g., "November 29, 2026" or "Late July 2026"
  industries: string[];
  cities?: string[]; // for location-specific events like Super Bowl
  searchKeywords: string[];
  description: string;
  shortDescription: string;
  hiringTimeline: string;
  tips: string[];
  avgPayIncrease: string;
}

// ============================================
// SEASONAL HIRING DATA - 2026
// ============================================

export const seasons: Season[] = [
  {
    id: "holiday-2026",
    name: "Holiday Season 2026",
    slug: "holiday-2026",
    icon: Snowflake,
    months: ["October", "November", "December"],
    peakMonths: [10, 11, 12],
    industries: ["warehouse", "retail", "hospitality"],
    searchKeywords: [
      "holiday warehouse jobs 2026",
      "christmas temp work",
      "seasonal warehouse jobs",
      "holiday retail jobs",
      "winter seasonal employment",
      "peak season warehouse work"
    ],
    description: "The holiday season (October-December) represents the biggest hiring surge of the year. Retailers, warehouses, and logistics companies dramatically increase staff to handle Black Friday, Cyber Monday, and Christmas shopping volumes. Many seasonal workers earn premium pay rates and overtime opportunities during this period.",
    shortDescription: "The biggest hiring surge of the year. Warehouses, retail, and hospitality need thousands of extra workers.",
    hiringTimeline: "Start applying in August-September. Major employers begin posting positions 8-10 weeks before peak season.",
    tips: [
      "Apply early - top positions fill by early October",
      "Be flexible with schedules, including nights and weekends",
      "Holiday shifts often pay 1.5x-2x regular rates",
      "Many seasonal roles convert to permanent after the holidays",
      "Get forklift certified for $3-5/hr higher pay in warehouses"
    ],
    avgPayIncrease: "+15-25%",
    demandLevel: "very-high"
  },
  {
    id: "summer-2026",
    name: "Summer Season 2026",
    slug: "summer-2026",
    icon: Sun,
    months: ["June", "July", "August"],
    peakMonths: [6, 7, 8],
    industries: ["hospitality", "events", "retail"],
    searchKeywords: [
      "summer hospitality jobs 2026",
      "pool jobs summer",
      "resort seasonal work",
      "summer temp jobs",
      "outdoor event staffing",
      "summer catering jobs"
    ],
    description: "Summer brings peak demand for hospitality, events, and outdoor venues. Hotels, resorts, pools, and event spaces need additional staff for weddings, festivals, concerts, and tourism. Many positions offer flexible schedules ideal for students or those seeking warm-weather work.",
    shortDescription: "Peak season for hospitality, events, and outdoor venues. Great for students and flexible schedules.",
    hiringTimeline: "Apply in April-May for best selection. Hiring continues throughout summer as demand fluctuates.",
    tips: [
      "Get food handler certification for hospitality roles",
      "Event staffing often includes festival and concert perks",
      "Pool and resort jobs may include employee discounts",
      "Night and weekend shifts are essential for event work",
      "Build relationships for repeat summer work year after year"
    ],
    avgPayIncrease: "+10-15%",
    demandLevel: "high"
  },
  {
    id: "back-to-school-2026",
    name: "Back to School 2026",
    slug: "back-to-school-2026",
    icon: GraduationCap,
    months: ["August", "September"],
    peakMonths: [8, 9],
    industries: ["retail", "warehouse"],
    searchKeywords: [
      "part-time jobs for students fall 2026",
      "back to school retail jobs",
      "fall semester jobs",
      "college student part-time work",
      "flexible student employment"
    ],
    description: "The back-to-school season drives retail and warehouse hiring as stores stock up on school supplies, electronics, and dorm essentials. This period is ideal for students seeking part-time work that fits around class schedules, with many employers offering evening and weekend shifts.",
    shortDescription: "Retail and warehouse surge for school supplies and electronics. Perfect for students seeking flexible work.",
    hiringTimeline: "Apply in July for best selection. Hiring peaks in mid-August through early September.",
    tips: [
      "Emphasize schedule flexibility in your application",
      "Retail experience translates well to customer service roles",
      "Ask about tuition reimbursement programs",
      "Many employers offer shift-swapping for exam schedules",
      "Fall seasonal can lead to holiday season extensions"
    ],
    avgPayIncrease: "+5-10%",
    demandLevel: "medium"
  },
  {
    id: "tax-season-2026",
    name: "Tax Season 2026",
    slug: "tax-season-2026",
    icon: Receipt,
    months: ["January", "February", "March", "April"],
    peakMonths: [1, 2, 3, 4],
    industries: ["clerical", "administrative"],
    searchKeywords: [
      "seasonal tax preparer jobs 2026",
      "1099 work opportunities",
      "tax season temp jobs",
      "administrative seasonal work",
      "data entry tax season"
    ],
    description: "Tax season (January-April) creates demand for administrative, data entry, and customer service roles at accounting firms, tax preparation companies, and financial services. While some positions require tax preparation training, many support roles need only basic office skills.",
    shortDescription: "Administrative and clerical roles surge at accounting and tax prep firms. Training often provided.",
    hiringTimeline: "Apply in November-December for positions starting in January. Training typically provided in January.",
    tips: [
      "Many tax prep companies provide free training and certification",
      "Data entry and receptionist roles don't require tax knowledge",
      "Hours are intense but concentrated (great for savings goals)",
      "Experience can lead to year-round accounting firm work",
      "Use our Tax Calculator tool to understand 1099 implications"
    ],
    avgPayIncrease: "+10-20%",
    demandLevel: "medium"
  },
  {
    id: "spring-2026",
    name: "Spring Hiring 2026",
    slug: "spring-2026",
    icon: PartyPopper,
    months: ["March", "April", "May"],
    peakMonths: [3, 4, 5],
    industries: ["hospitality", "events", "facilities"],
    searchKeywords: [
      "spring hiring 2026",
      "st patricks day jobs",
      "easter hospitality work",
      "spring cleaning jobs",
      "graduation event staffing"
    ],
    description: "Spring brings renewed hiring for hospitality and events as the weather warms. St. Patrick's Day, Easter, Cinco de Mayo, and graduation season drive demand for servers, bartenders, and event staff. Facilities and cleaning roles also increase as businesses do spring maintenance.",
    shortDescription: "Hospitality picks up for spring holidays and graduations. Facilities roles for spring cleaning season.",
    hiringTimeline: "Apply in February for March events. Hiring continues through May for graduation season.",
    tips: [
      "St. Patrick's Day bar and restaurant shifts pay premium rates",
      "Graduation season means catering and event opportunities",
      "Spring cleaning drives demand for facilities workers",
      "Build relationships now for summer opportunities",
      "Outdoor event skills become valuable as weather improves"
    ],
    avgPayIncrease: "+5-15%",
    demandLevel: "medium"
  }
];

// ============================================
// EVENT-BASED HIRING DATA - 2026
// ============================================

export const seasonalEvents: SeasonalEvent[] = [
  {
    id: "black-friday-2026",
    name: "Black Friday 2026",
    slug: "black-friday-2026",
    icon: ShoppingBag,
    date: "November 27, 2026",
    industries: ["retail", "warehouse", "logistics"],
    searchKeywords: [
      "black friday jobs 2026",
      "black friday warehouse hiring",
      "cyber monday temp work",
      "thanksgiving retail jobs"
    ],
    description: "Black Friday (November 27, 2026) and Cyber Monday (November 30, 2026) represent the single biggest shopping weekend of the year. Retailers, fulfillment centers, and logistics companies hire 500,000+ temporary workers combined. Premium pay rates of 1.5x-2x and overtime are common.",
    shortDescription: "November 27, 2026 – The biggest shopping weekend needs massive staffing. Premium pay rates available.",
    hiringTimeline: "Apply by early October. Training typically begins 2-3 weeks before Thanksgiving.",
    tips: [
      "Apply by October 15 for best shift selection",
      "Expect to work Thanksgiving evening through the weekend",
      "Warehouse night shifts often pay the highest premiums ($2-5/hr extra)",
      "Reliability is crucial—call-offs hurt future opportunities",
      "Many workers earn 1.5x-2x normal rates on Black Friday itself"
    ],
    avgPayIncrease: "+20-40%"
  },
  {
    id: "prime-day-2026",
    name: "Prime Day 2026",
    slug: "prime-day-2026",
    icon: Zap,
    date: "July 15-16, 2026 (Expected)",
    industries: ["warehouse", "logistics"],
    searchKeywords: [
      "prime day hiring 2026",
      "amazon prime day jobs",
      "summer warehouse surge",
      "fulfillment center temp work"
    ],
    description: "Amazon Prime Day (expected July 15-16, 2026) drives a mid-summer hiring surge at fulfillment centers and logistics companies nationwide. Based on previous years, Amazon hires 50,000+ temporary workers for this 48-hour event. Competitors like Target, Walmart, and Best Buy also run major sales.",
    shortDescription: "July 15-16, 2026 (expected) – Mid-summer warehouse hiring surge across all major retailers.",
    hiringTimeline: "Apply in May-June. Hiring typically peaks 4-6 weeks before the event.",
    tips: [
      "Amazon begins hiring for Prime Day in late May",
      "Fulfillment center experience is highly valuable",
      "Night shifts and weekend availability increase chances",
      "Many positions extend through the summer season",
      "Use as practice run for the larger holiday hiring surge"
    ],
    avgPayIncrease: "+10-20%"
  },
  {
    id: "super-bowl-2026",
    name: "Super Bowl LX 2026",
    slug: "super-bowl-2026",
    icon: Trophy,
    date: "February 8, 2026",
    industries: ["hospitality", "events", "facilities"],
    cities: ["san-francisco"],
    searchKeywords: [
      "super bowl jobs 2026",
      "super bowl lx event staffing",
      "levi's stadium jobs",
      "super bowl hospitality work",
      "santa clara super bowl jobs"
    ],
    description: "Super Bowl LX takes place February 8, 2026 at Levi's Stadium in Santa Clara, California. This creates 10,000+ temporary positions in the San Francisco Bay Area including event staffing, hospitality, security, and facilities. Hotels, restaurants, and entertainment venues throughout the region need extra staff.",
    shortDescription: "February 8, 2026 at Levi's Stadium, Santa Clara – 10,000+ event jobs in the Bay Area.",
    hiringTimeline: "Apply in November-December 2025. Major hiring occurs 6-8 weeks before the event.",
    tips: [
      "Legends Hospitality and Aramark are major stadium vendors",
      "Be prepared for background checks and credential verification",
      "Stadium and event experience is highly valued",
      "Hotels hire heavily for the week leading up to the game",
      "Transportation to Santa Clara is critical—plan ahead"
    ],
    avgPayIncrease: "+25-50%"
  },
  {
    id: "concert-season-2026",
    name: "Concert & Festival Season 2026",
    slug: "concert-season-2026",
    icon: Music,
    date: "May - September 2026",
    industries: ["events", "hospitality", "facilities"],
    searchKeywords: [
      "concert venue jobs 2026",
      "music festival staffing",
      "summer concert work",
      "amphitheater seasonal jobs",
      "festival event staff"
    ],
    description: "Summer 2026 concert and festival season creates consistent demand for event staff at venues, amphitheaters, and festivals. Live Nation, AEG, and major venues hire thousands for positions from concessions to VIP service. Major tours and festivals (Coachella, Lollapalooza, Bonnaroo) drive regional hiring spikes.",
    shortDescription: "May-September 2026 – Venues and festivals need staff all summer. Perks often include show access.",
    hiringTimeline: "Apply in March-April for main season. Venues hire throughout summer as tours are announced.",
    tips: [
      "Live Nation and AEG are the largest concert promoters",
      "Many positions include access to watch shows during breaks",
      "TIPS alcohol certification opens bartending roles (+$5-10/hr)",
      "Festival multi-day events often pay premium daily rates",
      "Build venue relationships for premium concert assignments"
    ],
    avgPayIncrease: "+10-25%"
  },
  {
    id: "new-years-2026",
    name: "New Year's Eve 2026",
    slug: "new-years-2026",
    icon: PartyPopper,
    date: "December 31, 2026",
    industries: ["hospitality", "events"],
    searchKeywords: [
      "new years eve jobs 2026",
      "nye event staffing",
      "new years hospitality work",
      "nye catering jobs"
    ],
    description: "New Year's Eve 2026 creates premium-pay opportunities in hospitality and events. Hotels, restaurants, bars, and event venues need extra staff for the busiest night of the year. Premium rates and tips make this one of the highest-earning single nights possible—experienced bartenders can earn $300-500+.",
    shortDescription: "December 31, 2026 – Premium pay night. One of the highest-earning shifts of the year.",
    hiringTimeline: "Apply in early December. Experienced hospitality workers are prioritized.",
    tips: [
      "Often the highest-tipping night of the year for servers/bartenders",
      "Premium hourly rates plus tips can exceed $40-60/hr",
      "Transportation planning is essential—public transit may be limited",
      "Book this shift early—it fills fast",
      "Many venues require formal attire for staff"
    ],
    avgPayIncrease: "+30-60%"
  }
];

// ============================================
// SEASONAL LOCATION COMBINATIONS
// ============================================

export const seasonalLocationPatterns = [
  "christmas-temp-jobs",
  "holiday-warehouse-jobs",
  "summer-hospitality-jobs",
  "fall-retail-jobs",
  "black-friday-jobs"
];

// ============================================
// CONTENT CALENDAR
// ============================================

export interface ContentCalendarMonth {
  month: string;
  monthNum: number;
  focus: string;
  trafficPotential: 'low' | 'medium' | 'high' | 'very-high';
  relevantSeasons: string[];
  relevantEvents: string[];
}

export const contentCalendar: ContentCalendarMonth[] = [
  {
    month: "January",
    monthNum: 1,
    focus: "Tax season, New Year resolutions",
    trafficPotential: "medium",
    relevantSeasons: ["tax-season-2026"],
    relevantEvents: []
  },
  {
    month: "February",
    monthNum: 2,
    focus: "Super Bowl, tax season peak",
    trafficPotential: "medium",
    relevantSeasons: ["tax-season-2026", "spring-2026"],
    relevantEvents: ["super-bowl-2026"]
  },
  {
    month: "March",
    monthNum: 3,
    focus: "Spring hiring, St Patrick's hospitality",
    trafficPotential: "low",
    relevantSeasons: ["tax-season-2026", "spring-2026"],
    relevantEvents: []
  },
  {
    month: "April",
    monthNum: 4,
    focus: "Tax deadline, spring events",
    trafficPotential: "medium",
    relevantSeasons: ["tax-season-2026", "spring-2026"],
    relevantEvents: []
  },
  {
    month: "May",
    monthNum: 5,
    focus: "Summer job prep, graduation season",
    trafficPotential: "medium",
    relevantSeasons: ["spring-2026", "summer-2026"],
    relevantEvents: ["concert-season-2026"]
  },
  {
    month: "June",
    monthNum: 6,
    focus: "Summer peak begins",
    trafficPotential: "high",
    relevantSeasons: ["summer-2026"],
    relevantEvents: ["concert-season-2026"]
  },
  {
    month: "July",
    monthNum: 7,
    focus: "Prime Day, summer hospitality peak",
    trafficPotential: "high",
    relevantSeasons: ["summer-2026"],
    relevantEvents: ["prime-day-2026", "concert-season-2026"]
  },
  {
    month: "August",
    monthNum: 8,
    focus: "Back to school prep, holiday hiring starts",
    trafficPotential: "high",
    relevantSeasons: ["summer-2026", "back-to-school-2026"],
    relevantEvents: ["concert-season-2026"]
  },
  {
    month: "September",
    monthNum: 9,
    focus: "Holiday hiring announcements, back to school",
    trafficPotential: "high",
    relevantSeasons: ["back-to-school-2026", "holiday-2026"],
    relevantEvents: []
  },
  {
    month: "October",
    monthNum: 10,
    focus: "Holiday hiring peak",
    trafficPotential: "very-high",
    relevantSeasons: ["holiday-2026"],
    relevantEvents: []
  },
  {
    month: "November",
    monthNum: 11,
    focus: "Black Friday, Thanksgiving",
    trafficPotential: "very-high",
    relevantSeasons: ["holiday-2026"],
    relevantEvents: ["black-friday-2026"]
  },
  {
    month: "December",
    monthNum: 12,
    focus: "Holiday peak, New Year's Eve",
    trafficPotential: "very-high",
    relevantSeasons: ["holiday-2026"],
    relevantEvents: ["new-years-2026"]
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getCurrentSeason = (): Season | undefined => {
  const currentMonth = new Date().getMonth() + 1; // 1-12
  return seasons.find(season => season.peakMonths.includes(currentMonth));
};

export const getUpcomingSeasons = (limit: number = 3): Season[] => {
  const currentMonth = new Date().getMonth() + 1;
  
  // Sort seasons by their first peak month relative to current month
  return seasons
    .map(season => {
      const firstPeakMonth = Math.min(...season.peakMonths);
      const monthsAway = firstPeakMonth >= currentMonth 
        ? firstPeakMonth - currentMonth 
        : (12 - currentMonth) + firstPeakMonth;
      return { season, monthsAway };
    })
    .sort((a, b) => a.monthsAway - b.monthsAway)
    .slice(0, limit)
    .map(item => item.season);
};

export const getUpcomingEvents = (limit: number = 3): SeasonalEvent[] => {
  // For simplicity, return first N events (in a real app, parse dates)
  return seasonalEvents.slice(0, limit);
};

export const getSeasonBySlug = (slug: string): Season | undefined => {
  return seasons.find(season => season.slug === slug);
};

export const getEventBySlug = (slug: string): SeasonalEvent | undefined => {
  return seasonalEvents.find(event => event.slug === slug);
};

export const getCurrentCalendarMonth = (): ContentCalendarMonth | undefined => {
  const currentMonth = new Date().getMonth() + 1;
  return contentCalendar.find(month => month.monthNum === currentMonth);
};
