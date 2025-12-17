// Comprehensive skill-to-resource mapping for coaching experience

export interface ResourceLink {
  name: string;
  url: string;
  cost: string;
  duration: string;
  highlight?: string; // e.g., "Most recognized", "Free", "Quick"
}

export interface SkillRecommendation {
  skillId: string;
  skillName: string;
  category: "soft" | "technical" | "certification";
  whyItMatters: string;
  howToAchieve: string[];
  resources: ResourceLink[];
  timeEstimate: string;
  costRange: string;
  quickWin?: boolean;
  roi?: string; // Return on investment explanation
  youtubeSearch?: string; // Search term for YouTube tutorials
}

export const skillRecommendations: Record<string, SkillRecommendation> = {
  // Bartending / Hospitality Skills
  "mixology": {
    skillId: "mixology",
    skillName: "Mixology Basics",
    category: "technical",
    whyItMatters: "Knowing classic cocktails is essential for any bartending role. Employers expect bartenders to make 20+ drinks from memory without recipes.",
    howToAchieve: [
      "Start with the 20 most popular cocktails (Margarita, Old Fashioned, Mojito, etc.)",
      "Practice making drinks at home with proper techniques",
      "Learn the base spirits and their flavor profiles",
      "Memorize standard pour ratios (2:1:1 for sours, etc.)",
      "Watch bartenders work and ask questions during slow times"
    ],
    resources: [
      { name: "BarSmarts Online", url: "https://www.barsmarts.com/", cost: "Free", duration: "Self-paced", highlight: "Free" },
      { name: "Difford's Guide", url: "https://www.diffordsguide.com/", cost: "Free", duration: "Ongoing reference", highlight: "Industry standard" },
      { name: "Cocktail Codex Book", url: "https://www.amazon.com/Cocktail-Codex-Fundamentals-Formulas-Evolutions/dp/160774970X", cost: "$25-35", duration: "Reference book" },
      { name: "Educated Barfly YouTube", url: "https://www.youtube.com/@EducatedBarfly", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "2-4 weeks of practice",
    costRange: "Free - $35",
    quickWin: true,
    roi: "Opens up bartending roles paying $5-15/hr more than barback",
    youtubeSearch: "bartending basics cocktail recipes"
  },
  "tips-cert": {
    skillId: "tips-cert",
    skillName: "TIPS Certification",
    category: "certification",
    whyItMatters: "Required by most bars and restaurants. Shows you understand responsible alcohol service and legal liability. Many states require this certification.",
    howToAchieve: [
      "Choose an accredited online program (TIPS is most recognized)",
      "Complete the 3-4 hour training course at your own pace",
      "Pass the certification exam (minimum 70% to pass)",
      "Download your certificate immediately upon passing",
      "Add certification to your Indeed Flex profile"
    ],
    resources: [
      { name: "TIPS Online Training", url: "https://www.gettips.com/", cost: "$38-55", duration: "3-4 hours", highlight: "Most recognized" },
      { name: "ServSafe Alcohol", url: "https://www.servsafe.com/ServSafe-Alcohol", cost: "$22-35", duration: "2-4 hours" },
      { name: "TABC (Texas)", url: "https://www.tabc.texas.gov/", cost: "$10-15", duration: "2 hours", highlight: "Texas required" },
      { name: "RBS (California)", url: "https://www.abc.ca.gov/education/rbs/", cost: "$10-15", duration: "3-4 hours", highlight: "California required" }
    ],
    timeEstimate: "3-4 hours",
    costRange: "$10-55",
    quickWin: true,
    roi: "Unlocks bartending roles paying $5-10/hr more than non-certified positions"
  },
  "speed": {
    skillId: "speed",
    skillName: "Speed & Efficiency",
    category: "soft",
    whyItMatters: "Busy bars need bartenders who can handle rush periods without getting overwhelmed. Speed directly impacts tips and customer satisfaction.",
    howToAchieve: [
      "Practice your movements until they're muscle memory",
      "Set up your station efficiently before each shift",
      "Learn to batch similar drinks together",
      "Develop a rhythm for high-volume service",
      "Track your drinks per hour and try to improve each shift"
    ],
    resources: [
      { name: "Speed Bartending Tips", url: "https://www.youtube.com/results?search_query=speed+bartending+techniques", cost: "Free", duration: "Videos" },
      { name: "Bar Rescue Tips", url: "https://www.youtube.com/results?search_query=bar+rescue+bartending", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "1-3 months on the job",
    costRange: "Free",
    roi: "Faster service = more customers = higher tips"
  },
  "customer": {
    skillId: "customer",
    skillName: "Customer Rapport",
    category: "soft",
    whyItMatters: "Regulars drive bar revenue. Building relationships increases tips by 20-50% and makes you invaluable to employers.",
    howToAchieve: [
      "Remember names and drink preferences of regular customers",
      "Make genuine conversation during slower moments",
      "Remember details about their lives (job, family, interests)",
      "Greet returning customers by name",
      "Handle complaints gracefully and make things right"
    ],
    resources: [
      { name: "Dale Carnegie Course", url: "https://www.dalecarnegie.com/", cost: "$1,000-2,000", duration: "8-12 weeks" },
      { name: "How to Win Friends (Book)", url: "https://www.amazon.com/How-Win-Friends-Influence-People/dp/0671027034", cost: "$15", duration: "Self-paced", highlight: "Classic" },
      { name: "Customer Service Skills (LinkedIn Learning)", url: "https://www.linkedin.com/learning/topics/customer-service", cost: "Free trial", duration: "2-4 hours" }
    ],
    timeEstimate: "Ongoing development",
    costRange: "Free - $15",
    quickWin: true,
    roi: "Regular customers tip 20-50% more than new customers"
  },
  "memory": {
    skillId: "memory",
    skillName: "Order Memory",
    category: "technical",
    whyItMatters: "Taking multiple orders without writing them down speeds up service and impresses customers. Essential for high-volume environments.",
    howToAchieve: [
      "Use memory techniques like grouping drinks by type",
      "Create mental images associating drinks with customers",
      "Practice with friends giving you increasingly complex orders",
      "Start with 3-4 drinks and work up to 8-10",
      "Review orders in your head before making them"
    ],
    resources: [
      { name: "Memory Techniques", url: "https://www.youtube.com/results?search_query=memory+palace+technique", cost: "Free", duration: "Self-paced" },
      { name: "Moonwalking with Einstein (Book)", url: "https://www.amazon.com/Moonwalking-Einstein-Science-Remembering-Everything/dp/0143120530", cost: "$12-15", duration: "Self-paced" }
    ],
    timeEstimate: "2-4 weeks of practice",
    costRange: "Free - $15",
    quickWin: true,
    roi: "Faster service and better customer experience"
  },

  // Warehouse / Industrial Skills
  "productivity": {
    skillId: "productivity",
    skillName: "High Productivity",
    category: "technical",
    whyItMatters: "Warehouses track pick rates closely. Top performers get promoted first and are chosen for overtime. Consistently exceeding targets shows leadership potential.",
    howToAchieve: [
      "Learn the warehouse layout and fastest routes",
      "Minimize unnecessary movements and backtracking",
      "Stay organized with your equipment and cart",
      "Pace yourself - start strong but maintain consistency",
      "Track your own numbers and set personal goals"
    ],
    resources: [
      { name: "Warehouse Efficiency Tips", url: "https://www.youtube.com/results?search_query=warehouse+picker+tips", cost: "Free", duration: "Videos" },
      { name: "OSHA Ergonomics Guide", url: "https://www.osha.gov/ergonomics", cost: "Free", duration: "Self-paced", highlight: "Official" }
    ],
    timeEstimate: "1-2 months on the job",
    costRange: "Free",
    roi: "Top performers are first choice for lead positions"
  },
  "quality": {
    skillId: "quality",
    skillName: "Quality Accuracy",
    category: "technical",
    whyItMatters: "Mistakes cost warehouses money and slow down operations. 99%+ accuracy shows you're reliable and ready for more responsibility.",
    howToAchieve: [
      "Double-check every pick before placing in cart",
      "Verify quantities match the order exactly",
      "Report damaged items instead of shipping them",
      "Learn the most common error patterns and avoid them",
      "Take pride in zero-error shifts"
    ],
    resources: [
      { name: "Quality Control Basics", url: "https://www.youtube.com/results?search_query=warehouse+quality+control", cost: "Free", duration: "Videos" },
      { name: "Six Sigma Overview", url: "https://www.coursera.org/courses?query=six%20sigma", cost: "Free audit", duration: "4-6 weeks" }
    ],
    timeEstimate: "1-2 months to establish track record",
    costRange: "Free",
    roi: "High accuracy workers are trusted with valuable inventory"
  },
  "training": {
    skillId: "training",
    skillName: "Training Others",
    category: "soft",
    whyItMatters: "Leaders need to train new team members. Demonstrating you can teach others shows you're ready for a supervisor role.",
    howToAchieve: [
      "Volunteer to help onboard new hires",
      "Break down complex tasks into simple steps",
      "Be patient and answer questions thoroughly",
      "Give constructive feedback positively",
      "Document best practices to share"
    ],
    resources: [
      { name: "How to Train New Employees", url: "https://www.linkedin.com/learning/how-to-train-employees", cost: "Free trial", duration: "1-2 hours" },
      { name: "Training Skills (Coursera)", url: "https://www.coursera.org/courses?query=training%20skills", cost: "Free audit", duration: "2-4 weeks" }
    ],
    timeEstimate: "Ongoing development",
    costRange: "Free",
    roi: "Training ability is the #1 skill for promotion to lead"
  },
  "problem": {
    skillId: "problem",
    skillName: "Problem Solving",
    category: "soft",
    whyItMatters: "Supervisors deal with issues independently. Showing you can solve problems without escalating shows you're ready to lead.",
    howToAchieve: [
      "When issues arise, think of 2-3 solutions before asking for help",
      "Learn who to contact for different types of problems",
      "Document solutions for common issues",
      "Stay calm under pressure",
      "Follow up to ensure problems are fully resolved"
    ],
    resources: [
      { name: "Problem Solving Skills (Coursera)", url: "https://www.coursera.org/courses?query=problem%20solving", cost: "Free audit", duration: "2-4 weeks" },
      { name: "Critical Thinking (LinkedIn)", url: "https://www.linkedin.com/learning/topics/critical-thinking", cost: "Free trial", duration: "2-3 hours" }
    ],
    timeEstimate: "Ongoing development",
    costRange: "Free",
    roi: "Problem solvers get promoted to leadership roles faster"
  },
  "wms": {
    skillId: "wms",
    skillName: "WMS Proficiency",
    category: "technical",
    whyItMatters: "Every warehouse uses management software. Mastering the WMS makes you faster and shows technical aptitude for lead roles.",
    howToAchieve: [
      "Learn all features, not just the basics you use daily",
      "Ask supervisors about advanced functions",
      "Practice running reports and inventory lookups",
      "Understand how to troubleshoot common errors",
      "Learn keyboard shortcuts to speed up data entry"
    ],
    resources: [
      { name: "WMS Training Videos", url: "https://www.youtube.com/results?search_query=warehouse+management+system+training", cost: "Free", duration: "Videos" },
      { name: "SAP WMS Basics", url: "https://www.coursera.org/courses?query=SAP%20warehouse", cost: "Free audit", duration: "4-6 weeks" }
    ],
    timeEstimate: "2-4 weeks",
    costRange: "Free",
    roi: "WMS experts are essential for operations - high job security"
  },
  "forklift-cert": {
    skillId: "forklift-cert",
    skillName: "Forklift Certification",
    category: "certification",
    whyItMatters: "Forklift operators earn $3-5/hr more than general warehouse workers. OSHA requires certification before operating any forklift.",
    howToAchieve: [
      "Ask your employer if they offer free forklift training",
      "If not, find a local forklift training school",
      "Complete classroom instruction (usually 4-8 hours)",
      "Pass the hands-on driving evaluation",
      "Get employer-specific certification for their equipment"
    ],
    resources: [
      { name: "OSHA Forklift Requirements", url: "https://www.osha.gov/powered-industrial-trucks", cost: "Free info", duration: "Reference", highlight: "Official requirements" },
      { name: "Local Training Schools", url: "https://www.google.com/search?q=forklift+certification+training+near+me", cost: "$150-300", duration: "1-2 days" },
      { name: "Employer-Provided Training", url: "#", cost: "Often free", duration: "1-2 days", highlight: "Ask your employer first" }
    ],
    timeEstimate: "1-2 days",
    costRange: "Free (employer) - $300",
    quickWin: true,
    roi: "Immediately qualifies you for $3-5/hr higher-paying forklift positions"
  },
  "spatial": {
    skillId: "spatial",
    skillName: "Spatial Awareness",
    category: "technical",
    whyItMatters: "Forklift operators work in tight spaces with limited visibility. Spatial awareness prevents accidents and damage.",
    howToAchieve: [
      "Practice judging distances in everyday situations",
      "Always check mirrors and surroundings before moving",
      "Learn the dimensions of your forklift and loads",
      "Practice in open areas before tight spaces",
      "Use spotters when visibility is limited"
    ],
    resources: [
      { name: "Forklift Safety Videos", url: "https://www.youtube.com/results?search_query=forklift+safety+training", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "Develops with practice",
    costRange: "Free",
    roi: "Zero accidents = job security and promotion potential"
  },
  "safety": {
    skillId: "safety",
    skillName: "Safety Record",
    category: "soft",
    whyItMatters: "Warehouses track safety incidents. A clean record shows you're responsible and trustworthy with expensive equipment.",
    howToAchieve: [
      "Always follow safety protocols, even when rushed",
      "Report hazards immediately",
      "Wear required PPE at all times",
      "Never take shortcuts that risk safety",
      "Complete all safety training thoroughly"
    ],
    resources: [
      { name: "OSHA 10 Certification", url: "https://www.osha.gov/training/outreach", cost: "$25-90", duration: "10 hours", highlight: "Industry standard" },
      { name: "Warehouse Safety Course", url: "https://www.360training.com/osha-safety-training/general-industry", cost: "$25-50", duration: "2-4 hours" }
    ],
    timeEstimate: "Ongoing",
    costRange: "$25-90 for OSHA 10",
    roi: "Clean safety record is required for forklift and lead positions"
  },
  "loading": {
    skillId: "loading",
    skillName: "Load Assessment",
    category: "technical",
    whyItMatters: "Improperly loaded forklifts tip over. Understanding load weight and balance prevents accidents and product damage.",
    howToAchieve: [
      "Learn to estimate weights visually",
      "Always check load capacity charts",
      "Understand center of gravity principles",
      "Never exceed rated capacity",
      "Know how to handle unbalanced loads"
    ],
    resources: [
      { name: "Forklift Load Handling", url: "https://www.youtube.com/results?search_query=forklift+load+handling+training", cost: "Free", duration: "Videos" },
      { name: "OSHA Load Guidelines", url: "https://www.osha.gov/powered-industrial-trucks", cost: "Free", duration: "Reference" }
    ],
    timeEstimate: "Part of forklift certification",
    costRange: "Included in certification",
    roi: "Proper load handling prevents costly accidents"
  },
  "communication": {
    skillId: "communication",
    skillName: "Radio Communication",
    category: "soft",
    whyItMatters: "Warehouses use radios for coordination. Clear communication prevents collisions and improves efficiency.",
    howToAchieve: [
      "Learn standard radio protocols at your warehouse",
      "Speak clearly and concisely",
      "Always announce movements in blind spots",
      "Confirm receipt of instructions",
      "Keep radio chatter professional"
    ],
    resources: [
      { name: "Radio Etiquette Guide", url: "https://www.youtube.com/results?search_query=warehouse+radio+communication", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "1-2 weeks on the job",
    costRange: "Free",
    roi: "Good communication prevents accidents and delays"
  },

  // Restaurant / Server Skills
  "leadership": {
    skillId: "leadership",
    skillName: "Leadership Skills",
    category: "soft",
    whyItMatters: "Supervisors guide teams through busy shifts. Leadership ability is the most important skill for promotion.",
    howToAchieve: [
      "Lead by example in your current role",
      "Help struggling coworkers without being asked",
      "Stay calm and positive during rush periods",
      "Take initiative when you see problems",
      "Give credit to others for team successes"
    ],
    resources: [
      { name: "Leadership Foundations (LinkedIn)", url: "https://www.linkedin.com/learning/topics/leadership", cost: "Free trial", duration: "3-4 hours" },
      { name: "First-Time Manager (Coursera)", url: "https://www.coursera.org/courses?query=first%20time%20manager", cost: "Free audit", duration: "4-6 weeks" },
      { name: "The New One Minute Manager (Book)", url: "https://www.amazon.com/New-One-Minute-Manager/dp/0062367544", cost: "$15", duration: "1-2 hours read", highlight: "Quick read" }
    ],
    timeEstimate: "Ongoing development",
    costRange: "Free - $15",
    roi: "Leadership is the #1 requirement for supervisor roles"
  },
  "conflict": {
    skillId: "conflict",
    skillName: "Conflict Resolution",
    category: "soft",
    whyItMatters: "Supervisors handle customer complaints and team disagreements. Resolving conflicts professionally is essential.",
    howToAchieve: [
      "Listen actively without interrupting",
      "Acknowledge the person's feelings",
      "Focus on solutions, not blame",
      "Know when to escalate to management",
      "Follow up to ensure resolution"
    ],
    resources: [
      { name: "Conflict Resolution (LinkedIn)", url: "https://www.linkedin.com/learning/topics/conflict-management", cost: "Free trial", duration: "2-3 hours" },
      { name: "De-escalation Training", url: "https://www.coursera.org/courses?query=conflict%20resolution", cost: "Free audit", duration: "2-4 weeks" },
      { name: "Crucial Conversations (Book)", url: "https://www.amazon.com/Crucial-Conversations-Tools-Talking-Stakes/dp/1260474186", cost: "$18", duration: "Self-paced" }
    ],
    timeEstimate: "Ongoing development",
    costRange: "Free - $18",
    roi: "Handling complaints well turns angry customers into loyal ones"
  },
  "pos": {
    skillId: "pos",
    skillName: "POS System Mastery",
    category: "technical",
    whyItMatters: "Supervisors handle voids, comps, refunds, and run reports. Deep POS knowledge is essential for the role.",
    howToAchieve: [
      "Learn every function on your restaurant's POS",
      "Ask managers to show you supervisor-level functions",
      "Practice running reports during slow times",
      "Understand how voids and comps affect inventory",
      "Learn troubleshooting for common errors"
    ],
    resources: [
      { name: "Toast POS Training", url: "https://central.toasttab.com/s/article/Toast-101-Training-Videos", cost: "Free", duration: "Self-paced", highlight: "If using Toast" },
      { name: "Square POS Training", url: "https://squareup.com/help/us/en/article/5087-square-training", cost: "Free", duration: "Self-paced", highlight: "If using Square" },
      { name: "General POS Skills", url: "https://www.youtube.com/results?search_query=restaurant+POS+system+training", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "1-2 weeks",
    costRange: "Free",
    quickWin: true,
    roi: "POS expertise makes you indispensable to management"
  },
  "scheduling": {
    skillId: "scheduling",
    skillName: "Scheduling Basics",
    category: "technical",
    whyItMatters: "Supervisors help create schedules and manage shift coverage. Understanding scheduling shows you're ready for responsibility.",
    howToAchieve: [
      "Learn your restaurant's scheduling software",
      "Understand labor cost targets and how they work",
      "Know peak times and staffing requirements",
      "Help coordinate shift swaps among coworkers",
      "Understand overtime rules and compliance"
    ],
    resources: [
      { name: "Restaurant Scheduling Guide", url: "https://www.youtube.com/results?search_query=restaurant+scheduling+tips", cost: "Free", duration: "Videos" },
      { name: "7shifts Training", url: "https://www.7shifts.com/blog/restaurant-scheduling/", cost: "Free", duration: "Article" }
    ],
    timeEstimate: "2-4 weeks",
    costRange: "Free",
    roi: "Scheduling knowledge opens doors to assistant manager roles"
  },
  "food-safety": {
    skillId: "food-safety",
    skillName: "Food Safety Certification",
    category: "certification",
    whyItMatters: "Required for supervisor roles in most states. Shows you understand safe food handling to protect customers.",
    howToAchieve: [
      "Check your state's requirements (ServSafe Manager is most common)",
      "Take the online course (typically 8-16 hours)",
      "Pass the proctored exam (minimum 70-75% to pass)",
      "Renew every 3-5 years depending on state"
    ],
    resources: [
      { name: "ServSafe Manager", url: "https://www.servsafe.com/ServSafe-Manager", cost: "$100-180", duration: "8-16 hours", highlight: "Most recognized" },
      { name: "State Food Handler Card", url: "https://www.statefoodsafety.com/", cost: "$10-25", duration: "1-2 hours", highlight: "Basic requirement" },
      { name: "ServSafe Food Handler", url: "https://www.servsafe.com/ServSafe-Food-Handler", cost: "$15-25", duration: "2 hours", highlight: "Entry level" }
    ],
    timeEstimate: "8-16 hours",
    costRange: "$15-180",
    roi: "Required for any supervisor or management position in food service"
  },

  // Cleaning / Facilities Skills
  "quality-control": {
    skillId: "quality-control",
    skillName: "Quality Inspection",
    category: "technical",
    whyItMatters: "Supervisors ensure cleaning meets standards. Being able to spot and correct issues is essential.",
    howToAchieve: [
      "Learn your company's quality standards thoroughly",
      "Develop a systematic inspection routine",
      "Know the difference between good and excellent work",
      "Document issues clearly for follow-up",
      "Provide constructive feedback to cleaners"
    ],
    resources: [
      { name: "ISSA Cleaning Standards", url: "https://www.issa.com/certification", cost: "$100-500", duration: "Self-paced" },
      { name: "Quality Inspection Guide", url: "https://www.youtube.com/results?search_query=cleaning+quality+inspection", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "2-4 weeks on the job",
    costRange: "Free - $500",
    roi: "Quality standards knowledge qualifies you for supervisor roles"
  },
  "team-management": {
    skillId: "team-management",
    skillName: "Team Coordination",
    category: "soft",
    whyItMatters: "Supervisors assign tasks, manage schedules, and ensure work gets done efficiently.",
    howToAchieve: [
      "Learn each team member's strengths",
      "Assign tasks based on ability and workload",
      "Communicate clearly and check for understanding",
      "Handle performance issues promptly and fairly",
      "Celebrate team successes"
    ],
    resources: [
      { name: "Team Management (LinkedIn)", url: "https://www.linkedin.com/learning/topics/team-management", cost: "Free trial", duration: "3-4 hours" },
      { name: "Managing Teams (Coursera)", url: "https://www.coursera.org/courses?query=team%20management", cost: "Free audit", duration: "4-6 weeks" }
    ],
    timeEstimate: "Ongoing development",
    costRange: "Free",
    roi: "Team leadership is the core skill for any supervisor role"
  },
  "inventory-mgmt": {
    skillId: "inventory-mgmt",
    skillName: "Supply Management",
    category: "technical",
    whyItMatters: "Supervisors track supplies, place orders, and manage budgets. Running out of supplies disrupts operations.",
    howToAchieve: [
      "Learn your company's ordering system",
      "Track usage patterns to anticipate needs",
      "Maintain minimum stock levels",
      "Compare vendor prices for best value",
      "Reduce waste through better planning"
    ],
    resources: [
      { name: "Inventory Management Basics", url: "https://www.coursera.org/courses?query=inventory%20management", cost: "Free audit", duration: "2-4 weeks" },
      { name: "Supply Chain Fundamentals", url: "https://www.linkedin.com/learning/topics/supply-chain-management", cost: "Free trial", duration: "3-4 hours" }
    ],
    timeEstimate: "1-2 months on the job",
    costRange: "Free",
    roi: "Cost savings through better supply management impresses employers"
  },
  "client-relations": {
    skillId: "client-relations",
    skillName: "Client Communication",
    category: "soft",
    whyItMatters: "Supervisors are the main point of contact for clients. Professional communication builds trust and secures contracts.",
    howToAchieve: [
      "Respond to requests promptly and professionally",
      "Set clear expectations about what's possible",
      "Handle complaints calmly and find solutions",
      "Provide regular status updates",
      "Anticipate client needs before they ask"
    ],
    resources: [
      { name: "Client Communication Skills", url: "https://www.linkedin.com/learning/topics/customer-service", cost: "Free trial", duration: "2-3 hours" },
      { name: "Professional Communication", url: "https://www.coursera.org/courses?query=business%20communication", cost: "Free audit", duration: "4-6 weeks" }
    ],
    timeEstimate: "Ongoing development",
    costRange: "Free",
    roi: "Good client relationships lead to contract renewals and referrals"
  },
  "safety-protocols": {
    skillId: "safety-protocols",
    skillName: "Safety Compliance",
    category: "certification",
    whyItMatters: "Cleaning involves chemicals and safety hazards. OSHA knowledge protects you and your team from injuries.",
    howToAchieve: [
      "Take OSHA 10 General Industry training",
      "Learn proper handling of cleaning chemicals",
      "Understand bloodborne pathogens protocols",
      "Know emergency procedures",
      "Conduct regular safety briefings"
    ],
    resources: [
      { name: "OSHA 10 General Industry", url: "https://www.osha.gov/training/outreach", cost: "$25-90", duration: "10 hours", highlight: "Industry standard" },
      { name: "Chemical Safety Training", url: "https://www.360training.com/osha-safety-training/general-industry", cost: "$25-50", duration: "2-4 hours" },
      { name: "OSHA Cleaning Safety", url: "https://www.osha.gov/cleaning-industry", cost: "Free", duration: "Reference" }
    ],
    timeEstimate: "10-15 hours",
    costRange: "$25-90",
    roi: "OSHA certification is required or preferred for supervisor roles"
  }
};

// Helper function to get recommendations for missing skills
export const getRecommendationsForSkills = (skillIds: string[]): SkillRecommendation[] => {
  return skillIds
    .map(id => skillRecommendations[id])
    .filter((rec): rec is SkillRecommendation => rec !== undefined);
};

// Get quick wins (fast/cheap skills to acquire)
export const getQuickWins = (skillIds: string[]): SkillRecommendation[] => {
  return getRecommendationsForSkills(skillIds).filter(rec => rec.quickWin);
};

// Sort recommendations by priority (certifications first, then technical, then soft)
export const sortByPriority = (recommendations: SkillRecommendation[]): SkillRecommendation[] => {
  const priority = { certification: 0, technical: 1, soft: 2 };
  return [...recommendations].sort((a, b) => priority[a.category] - priority[b.category]);
};
