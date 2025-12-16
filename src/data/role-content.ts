// Day in the Life content for each role
export interface DayInTheLifeContent {
  roleSlug: string;
  schedule: { time: string; activity: string }[];
  tips: string[];
  challenges: { challenge: string; solution: string }[];
  whatToBring: string[];
  dressCode: string;
}

export const dayInTheLifeContent: Record<string, DayInTheLifeContent> = {
  "barback": {
    roleSlug: "barback",
    schedule: [
      { time: "5:00 PM", activity: "Arrive and clock in, check with bartender on special prep needed" },
      { time: "5:30 PM", activity: "Stock ice wells, restock glassware, cut garnishes (limes, lemons, oranges)" },
      { time: "6:00 PM", activity: "Final prep before doors open - ensure all stations are ready" },
      { time: "6:30 PM", activity: "Service begins - stay alert for empty ice wells and dirty glasses" },
      { time: "8:00 PM", activity: "Rush hour - constant restocking, clearing empties, supporting bartenders" },
      { time: "10:00 PM", activity: "Mid-shift restock - replenish everything for late-night rush" },
      { time: "12:00 AM", activity: "Final push - keep energy up, maintain bar cleanliness" },
      { time: "2:00 AM", activity: "Close out - deep clean bar area, restock for next day, breakdown" },
    ],
    tips: [
      "Always stay one step ahead - if ice is at 50%, start refilling",
      "Learn the bartenders' habits and preferences for smoother teamwork",
      "Keep moving - standing still means you're missing something",
      "Build relationships with bartenders for better tip-outs"
    ],
    challenges: [
      { challenge: "Rush periods can be overwhelming", solution: "Prioritize: ice first, then glasses, then garnishes. Communicate with bartenders." },
      { challenge: "Heavy lifting throughout the shift", solution: "Use proper lifting technique, stay hydrated, wear comfortable shoes with support." },
      { challenge: "Late night hours affecting sleep schedule", solution: "Establish a consistent sleep routine, avoid caffeine after your shift ends." }
    ],
    whatToBring: ["Non-slip shoes", "Comfortable dark clothing", "Hair tie (if applicable)", "Small towel or rag"],
    dressCode: "All black is standard - black shirt, black pants, black non-slip shoes. No open-toed shoes."
  },
  "bartender": {
    roleSlug: "bartender",
    schedule: [
      { time: "4:00 PM", activity: "Arrive early to set up your station and check inventory" },
      { time: "4:30 PM", activity: "Cut garnishes, prep mixers, check that POS system is ready" },
      { time: "5:00 PM", activity: "Review any special cocktails or promotions for the night" },
      { time: "5:30 PM", activity: "First guests arrive - focus on building rapport and upselling" },
      { time: "7:00 PM", activity: "Dinner rush begins - balance speed with quality" },
      { time: "9:00 PM", activity: "Peak hours - manage multiple orders, keep the bar clean" },
      { time: "11:00 PM", activity: "Late night crowd - watch for over-service, maintain energy" },
      { time: "1:30 AM", activity: "Last call - process final orders, start pre-closing tasks" },
      { time: "2:00 AM", activity: "Close out tabs, clean station, count tips, complete checkout" },
    ],
    tips: [
      "Learn names and drink preferences of regulars - they'll tip better",
      "Master 3-5 signature cocktails that impress guests",
      "Keep your well organized - speed comes from muscle memory",
      "Be the entertainer when it's slow, the machine when it's busy"
    ],
    challenges: [
      { challenge: "Managing difficult or intoxicated customers", solution: "Stay calm, be firm but friendly, know when to involve management or cut someone off." },
      { challenge: "Remembering multiple complex orders", solution: "Develop a system - work left to right, make similar drinks together, repeat orders back." },
      { challenge: "Staying energetic during long shifts", solution: "Eat a solid meal before your shift, stay hydrated, take micro-breaks when possible." }
    ],
    whatToBring: ["Bar key/wine key", "Lighter", "Pen for tabs", "Non-slip shoes", "Hair tie"],
    dressCode: "Typically all black or venue-specific uniform. Professional appearance, minimal jewelry that could get in the way."
  },
  "server": {
    roleSlug: "server",
    schedule: [
      { time: "10:30 AM", activity: "Arrive for lunch shift, review specials and 86'd items" },
      { time: "10:45 AM", activity: "Set up station - roll silverware, check condiments, polish glasses" },
      { time: "11:00 AM", activity: "Doors open - greet first tables, focus on suggestive selling" },
      { time: "12:00 PM", activity: "Lunch rush - manage multiple tables efficiently" },
      { time: "1:30 PM", activity: "Rush slows - catch up on side work, prebusfinish tables" },
      { time: "2:30 PM", activity: "Transition period - reset for dinner or end lunch shift" },
    ],
    tips: [
      "Greet every table within 60 seconds of being seated",
      "Learn the menu inside out - including allergens and modifications",
      "Check back at the 'two-bite' mark to catch problems early",
      "Pre-bus tables constantly to turn them faster"
    ],
    challenges: [
      { challenge: "Getting 'stiffed' on tips", solution: "Focus on service quality, don't take it personally, volume makes up for bad tippers." },
      { challenge: "Kitchen delays affecting service", solution: "Communicate proactively with guests, offer a free appetizer or drink if appropriate." },
      { challenge: "Handling multiple demanding tables", solution: "Prioritize by urgency, communicate wait times honestly, ask for help when needed." }
    ],
    whatToBring: ["Wine key", "Pen (bring 3!)", "Small notepad", "Non-slip shoes", "Crumber"],
    dressCode: "Usually black pants, non-slip shoes, venue-specific shirt. Clean, professional appearance."
  },
  "warehouse-operative": {
    roleSlug: "warehouse-operative",
    schedule: [
      { time: "6:00 AM", activity: "Clock in, attend daily standup meeting for priorities" },
      { time: "6:15 AM", activity: "Equipment check - scanner, pallet jack, safety gear" },
      { time: "6:30 AM", activity: "Begin picking orders from assigned zones" },
      { time: "9:00 AM", activity: "First break - 15 minutes" },
      { time: "9:15 AM", activity: "Continue picking or switch to packing station" },
      { time: "12:00 PM", activity: "Lunch break - 30 minutes" },
      { time: "12:30 PM", activity: "Afternoon shift - receiving, stocking, or order fulfillment" },
      { time: "2:30 PM", activity: "End of shift - return equipment, update logs, clock out" },
    ],
    tips: [
      "Wear layers - warehouses can be hot in summer, cold in winter",
      "Learn the warehouse layout quickly to improve pick times",
      "Double-check orders before packing to avoid errors",
      "Stay hydrated - keep water bottle with you"
    ],
    challenges: [
      { challenge: "Physical demands and fatigue", solution: "Stretch before shifts, wear supportive shoes, pace yourself early in the shift." },
      { challenge: "Meeting rate/productivity targets", solution: "Focus on accuracy first, speed will come with familiarity. Learn optimal pick paths." },
      { challenge: "Repetitive tasks becoming monotonous", solution: "Set personal goals, listen to music/podcasts if allowed, vary tasks when possible." }
    ],
    whatToBring: ["Steel-toe boots", "Water bottle", "Comfortable layers", "Back support belt (optional)"],
    dressCode: "Closed-toe shoes (often steel-toe required), comfortable pants, t-shirt or company shirt. No loose clothing or jewelry."
  },
  "forklift-driver": {
    roleSlug: "forklift-driver",
    schedule: [
      { time: "6:00 AM", activity: "Clock in, complete forklift pre-operation inspection" },
      { time: "6:15 AM", activity: "Attend safety briefing and get assignments" },
      { time: "6:30 AM", activity: "Begin loading/unloading trucks at dock" },
      { time: "9:00 AM", activity: "Break - 15 minutes" },
      { time: "9:15 AM", activity: "Move pallets to storage locations, stock shelves" },
      { time: "12:00 PM", activity: "Lunch - 30 minutes" },
      { time: "12:30 PM", activity: "Afternoon receiving - unload incoming shipments" },
      { time: "2:30 PM", activity: "End of shift - park forklift, complete inspection log" },
    ],
    tips: [
      "Complete your pre-operation inspection thoroughly every time",
      "Always honk at corners and intersections",
      "Keep your forks low when traveling",
      "Communicate with pedestrians and other operators constantly"
    ],
    challenges: [
      { challenge: "Navigating tight spaces safely", solution: "Go slow, use spotters, know your turning radius. Never rush." },
      { challenge: "Maintaining certification", solution: "Stay current with recertification requirements, practice safe habits daily." },
      { challenge: "Working in all weather (outdoor operations)", solution: "Dress appropriately, extra caution in rain/ice, know when conditions are too dangerous." }
    ],
    whatToBring: ["Steel-toe boots", "Safety vest", "Forklift certification card", "Water bottle"],
    dressCode: "High-visibility vest required, steel-toe boots, comfortable work clothes. Hard hat in some facilities."
  },
  "retail-assistant": {
    roleSlug: "retail-assistant",
    schedule: [
      { time: "9:30 AM", activity: "Arrive, clock in, attend morning huddle" },
      { time: "9:45 AM", activity: "Zone recovery - straighten displays and restock" },
      { time: "10:00 AM", activity: "Store opens - greet customers, assist with questions" },
      { time: "12:00 PM", activity: "Lunch break" },
      { time: "1:00 PM", activity: "Afternoon floor coverage and register backup" },
      { time: "3:00 PM", activity: "Fitting room duty or price changes" },
      { time: "5:00 PM", activity: "Evening recovery, restock, prepare for close" },
      { time: "6:00 PM", activity: "End shift or transition to closing duties" },
    ],
    tips: [
      "Learn the store layout to help customers quickly",
      "Greet every customer within 10 feet",
      "Stay busy with tasks even when customer traffic is low",
      "Learn about promotions and loyalty programs to mention at register"
    ],
    challenges: [
      { challenge: "Dealing with difficult customers", solution: "Stay calm, empathize, offer solutions. Get a manager for escalated situations." },
      { challenge: "Standing for entire shift", solution: "Invest in good shoes with insoles, shift weight between feet, stretch on breaks." },
      { challenge: "Meeting sales goals", solution: "Focus on genuine helpfulness - sales follow. Suggest complementary items naturally." }
    ],
    whatToBring: ["Comfortable shoes", "Small snacks for break", "Water bottle"],
    dressCode: "Business casual or store uniform. Closed-toe shoes, neat appearance."
  },
  "cleaner": {
    roleSlug: "cleaner",
    schedule: [
      { time: "6:00 PM", activity: "Clock in at office building after regular business hours" },
      { time: "6:15 PM", activity: "Collect supplies and cart, review any special requests" },
      { time: "6:30 PM", activity: "Begin floor assignment - empty trash, dust surfaces" },
      { time: "7:30 PM", activity: "Vacuum/mop floors, clean glass partitions" },
      { time: "8:30 PM", activity: "Restroom deep clean - restock, sanitize, mop" },
      { time: "9:30 PM", activity: "Kitchen/break room - appliances, counters, floors" },
      { time: "10:30 PM", activity: "Final walkthrough, restock supply closet, clock out" },
    ],
    tips: [
      "Develop a consistent routine to work efficiently",
      "Start with the task you like least to get it done",
      "Use the right products for the right surfaces",
      "Report any maintenance issues immediately"
    ],
    challenges: [
      { challenge: "Working alone for long periods", solution: "Bring headphones for music/podcasts (if allowed), set mini-goals to stay motivated." },
      { challenge: "Physical demands of repetitive tasks", solution: "Use ergonomic techniques, take stretching micro-breaks, rotate tasks." },
      { challenge: "Unappreciated or invisible work", solution: "Take pride in transformation - the before/after. Good cleaners get recognized." }
    ],
    whatToBring: ["Comfortable non-slip shoes", "Rubber gloves", "Music/podcast player"],
    dressCode: "Company uniform or comfortable clothes you don't mind getting dirty. Closed-toe non-slip shoes."
  },
  "housekeeper": {
    roleSlug: "housekeeper",
    schedule: [
      { time: "8:00 AM", activity: "Clock in, get room assignment sheet from supervisor" },
      { time: "8:15 AM", activity: "Stock housekeeping cart with fresh linens and supplies" },
      { time: "8:30 AM", activity: "Begin checkout rooms - full clean and reset" },
      { time: "10:00 AM", activity: "Break - 15 minutes" },
      { time: "10:15 AM", activity: "Continue room cleaning - aim for 2-3 rooms per hour" },
      { time: "12:30 PM", activity: "Lunch break" },
      { time: "1:00 PM", activity: "Stayover rooms - lighter cleaning, refresh supplies" },
      { time: "3:00 PM", activity: "Final rooms, restock cart, complete paperwork" },
      { time: "4:00 PM", activity: "End shift, report any issues or maintenance needs" },
    ],
    tips: [
      "Develop a room-cleaning routine for consistency and speed",
      "Make beds first - it transforms the room immediately",
      "Check under beds and in drawers for guest items",
      "Report maintenance issues right away - it reflects on your work"
    ],
    challenges: [
      { challenge: "Physical demands of making beds and bending", solution: "Use proper body mechanics, kneel rather than bend, stretch regularly." },
      { challenge: "Time pressure to clean multiple rooms", solution: "Stick to your routine, don't cut corners on hygiene, communicate if running behind." },
      { challenge: "Handling guest complaints about cleanliness", solution: "Apologize, fix immediately, report to supervisor. Don't take it personally." }
    ],
    whatToBring: ["Comfortable non-slip shoes", "Hair tie", "Small notepad for notes"],
    dressCode: "Hotel uniform provided. Clean, neat appearance. Comfortable closed-toe shoes."
  }
};

// Role comparison data
export interface RoleComparison {
  role1Slug: string;
  role2Slug: string;
  comparisonPoints: {
    category: string;
    role1: string;
    role2: string;
  }[];
  bestFor: {
    role1: string[];
    role2: string[];
  };
}

export const roleComparisons: RoleComparison[] = [
  {
    role1Slug: "bartender",
    role2Slug: "server",
    comparisonPoints: [
      { category: "Average Pay", role1: "$15-28/hr + tips", role2: "$12-22/hr + tips" },
      { category: "Tip Potential", role1: "Higher per-hour tips", role2: "More consistent tips" },
      { category: "Physical Demand", role1: "Standing, lifting kegs", role2: "Walking, carrying trays" },
      { category: "Skills Required", role1: "Drink knowledge, speed", role2: "Multitasking, menu knowledge" },
      { category: "Customer Interaction", role1: "Casual, entertainment-focused", role2: "Service-focused, formal" },
      { category: "Peak Hours", role1: "Late night heavy", role2: "Meal times" },
    ],
    bestFor: {
      role1: ["Night owls", "Those who enjoy mixing drinks", "People who like casual conversation", "High-energy personalities"],
      role2: ["Those who prefer daytime hours", "People who enjoy meal service", "Those comfortable with formal service", "Team players"]
    }
  },
  {
    role1Slug: "warehouse-operative",
    role2Slug: "forklift-driver",
    comparisonPoints: [
      { category: "Average Pay", role1: "$15-22/hr", role2: "$17-25/hr" },
      { category: "Certification", role1: "None required", role2: "Forklift license required" },
      { category: "Physical Demand", role1: "High - walking, lifting", role2: "Moderate - mostly seated" },
      { category: "Responsibility", role1: "Order accuracy", role2: "Safety, equipment" },
      { category: "Advancement", role1: "Can become driver", role2: "Lead, supervisor roles" },
      { category: "Shift Types", role1: "All shifts available", role2: "Usually day shifts" },
    ],
    bestFor: {
      role1: ["Those starting in logistics", "People who like staying active", "Flexible schedule seekers", "Quick entry to workforce"],
      role2: ["Those with certification", "People who prefer operating equipment", "Those seeking higher base pay", "Career logistics workers"]
    }
  },
  {
    role1Slug: "barback",
    role2Slug: "bartender",
    comparisonPoints: [
      { category: "Average Pay", role1: "$12-18/hr + tip-out", role2: "$15-28/hr + tips" },
      { category: "Experience Required", role1: "None", role2: "1-2 years preferred" },
      { category: "Responsibility", role1: "Support role", role2: "Primary customer service" },
      { category: "Drink Knowledge", role1: "Basic", role2: "Extensive" },
      { category: "Career Path", role1: "Stepping stone role", role2: "Can advance to management" },
      { category: "Stress Level", role1: "Physical but lower stress", role2: "High-pressure service" },
    ],
    bestFor: {
      role1: ["Newcomers to hospitality", "Those building experience", "People learning the industry", "Part-time workers"],
      role2: ["Experienced hospitality workers", "Those with drink knowledge", "People seeking higher tips", "Career bartenders"]
    }
  },
  {
    role1Slug: "cleaner",
    role2Slug: "housekeeper",
    comparisonPoints: [
      { category: "Average Pay", role1: "$13-19/hr", role2: "$14-20/hr" },
      { category: "Work Environment", role1: "Offices, commercial spaces", role2: "Hotels, residential" },
      { category: "Typical Hours", role1: "Often evening/night", role2: "Usually daytime" },
      { category: "Guest Interaction", role1: "Minimal to none", role2: "Occasional guest contact" },
      { category: "Variety", role1: "Same spaces regularly", role2: "Different rooms daily" },
      { category: "Tips", role1: "Rare", role2: "Common in hotels" },
    ],
    bestFor: {
      role1: ["Those preferring solo work", "Night shift preference", "Consistent routine seekers", "Those avoiding customer interaction"],
      role2: ["Those comfortable with guests", "Daytime workers", "Hotel industry interest", "Those who like variety"]
    }
  }
];

export const getComparisonsForRole = (roleSlug: string): RoleComparison[] => {
  return roleComparisons.filter(
    c => c.role1Slug === roleSlug || c.role2Slug === roleSlug
  );
};

export const getDayInTheLife = (roleSlug: string): DayInTheLifeContent | undefined => {
  return dayInTheLifeContent[roleSlug];
};
