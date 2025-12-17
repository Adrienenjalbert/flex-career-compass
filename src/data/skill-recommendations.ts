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
  },

  // Kitchen Skills
  "knife-skills": {
    skillId: "knife-skills",
    skillName: "Basic Knife Skills",
    category: "technical",
    whyItMatters: "Prep cooks need safe, efficient cutting skills. Proper technique prevents injuries and increases speed.",
    howToAchieve: [
      "Learn the 'claw grip' to protect your fingers",
      "Master basic cuts: dice, julienne, mince, chiffonade",
      "Practice on inexpensive vegetables at home",
      "Invest in a good chef's knife and keep it sharp",
      "Watch and learn from experienced line cooks"
    ],
    resources: [
      { name: "Knife Skills Basics", url: "https://www.youtube.com/results?search_query=professional+knife+skills+basics", cost: "Free", duration: "Videos", highlight: "Free" },
      { name: "Culinary Institute Videos", url: "https://www.youtube.com/results?search_query=CIA+knife+skills", cost: "Free", duration: "Videos" },
      { name: "The Professional Chef (Book)", url: "https://www.amazon.com/Professional-Chef-Culinary-Institute-America/dp/0470421355", cost: "$50-70", duration: "Reference book" }
    ],
    timeEstimate: "2-4 weeks of practice",
    costRange: "Free - $70",
    quickWin: true,
    roi: "Essential skill for any kitchen role advancement"
  },
  "kitchen-stations": {
    skillId: "kitchen-stations",
    skillName: "Station Knowledge",
    category: "technical",
    whyItMatters: "Understanding how the kitchen flows helps you support line cooks and shows you're ready for more responsibility.",
    howToAchieve: [
      "Learn what each station produces (grill, sauté, garde manger, etc.)",
      "Observe how tickets flow through the kitchen",
      "Understand timing between stations",
      "Ask to shadow different stations during slow periods",
      "Learn the menu inside and out"
    ],
    resources: [
      { name: "Kitchen Station Guide", url: "https://www.youtube.com/results?search_query=professional+kitchen+stations+explained", cost: "Free", duration: "Videos" },
      { name: "Kitchen Confidential (Book)", url: "https://www.amazon.com/Kitchen-Confidential-Adventures-Culinary-Underbelly/dp/0060899220", cost: "$15", duration: "Fun read" }
    ],
    timeEstimate: "1-2 months on the job",
    costRange: "Free - $15",
    roi: "Kitchen awareness shows you're ready to move up from dishwasher"
  },
  "time-management": {
    skillId: "time-management",
    skillName: "Time Management",
    category: "soft",
    whyItMatters: "Prep lists must be completed before service. Managing your time efficiently keeps the kitchen running smoothly.",
    howToAchieve: [
      "Prioritize tasks by service time urgency",
      "Batch similar tasks together (all chopping, then all cooking)",
      "Set time targets for each prep item",
      "Communicate early if you're falling behind",
      "Arrive ready to work – no wasted time at start of shift"
    ],
    resources: [
      { name: "Time Management (LinkedIn)", url: "https://www.linkedin.com/learning/topics/time-management", cost: "Free trial", duration: "2-3 hours" },
      { name: "Getting Things Done (Book)", url: "https://www.amazon.com/Getting-Things-Done-Stress-Free-Productivity/dp/0143126563", cost: "$15", duration: "Self-paced" }
    ],
    timeEstimate: "Ongoing development",
    costRange: "Free - $15",
    roi: "Reliable prep cooks get more hours and advance faster"
  },
  "recipe-following": {
    skillId: "recipe-following",
    skillName: "Recipe Accuracy",
    category: "technical",
    whyItMatters: "Consistency is key in food service. Following recipes exactly ensures every dish tastes the same.",
    howToAchieve: [
      "Read recipes completely before starting",
      "Measure ingredients precisely",
      "Learn standard kitchen measurements and conversions",
      "Taste as you go to verify flavor profiles",
      "Ask questions if anything is unclear"
    ],
    resources: [
      { name: "Kitchen Math Guide", url: "https://www.youtube.com/results?search_query=kitchen+measurements+conversions", cost: "Free", duration: "Videos" },
      { name: "Ratio (Book)", url: "https://www.amazon.com/Ratio-Simple-Behind-Everyday-Cooking/dp/1416571728", cost: "$15", duration: "Reference" }
    ],
    timeEstimate: "1-2 weeks",
    costRange: "Free - $15",
    quickWin: true,
    roi: "Accurate prep work prevents food waste and customer complaints"
  },
  "cooking-techniques": {
    skillId: "cooking-techniques",
    skillName: "Cooking Techniques",
    category: "technical",
    whyItMatters: "Line cooks must master multiple cooking methods. Sautéing, grilling, and frying are fundamental skills.",
    howToAchieve: [
      "Practice each technique at home before attempting at work",
      "Learn temperature control for different methods",
      "Understand the Maillard reaction and why it matters",
      "Master timing – knowing when food is done by sight and touch",
      "Ask experienced cooks to critique your technique"
    ],
    resources: [
      { name: "Serious Eats Techniques", url: "https://www.seriouseats.com/techniques", cost: "Free", duration: "Articles/Videos", highlight: "Excellent resource" },
      { name: "America's Test Kitchen", url: "https://www.youtube.com/c/AmericasTestKitchen", cost: "Free", duration: "Videos" },
      { name: "Salt Fat Acid Heat (Book/Netflix)", url: "https://www.amazon.com/Salt-Fat-Acid-Heat-Mastering/dp/1476753830", cost: "$20", duration: "Self-paced" }
    ],
    timeEstimate: "3-6 months",
    costRange: "Free - $20",
    roi: "Cooking mastery opens $3-5/hr higher paying line cook positions"
  },
  "station-management": {
    skillId: "station-management",
    skillName: "Station Management",
    category: "technical",
    whyItMatters: "Running your own station during service is the core line cook skill. You must manage timing, quality, and communication simultaneously.",
    howToAchieve: [
      "Master mise en place – everything in its place before service",
      "Learn to read tickets and anticipate orders",
      "Develop a mental queue of orders in progress",
      "Communicate clearly with expeditor and other stations",
      "Stay calm when tickets pile up"
    ],
    resources: [
      { name: "Working the Line", url: "https://www.youtube.com/results?search_query=working+the+line+restaurant", cost: "Free", duration: "Videos" },
      { name: "Line Cook Tips", url: "https://www.youtube.com/results?search_query=line+cook+tips+tricks", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "2-4 months on the job",
    costRange: "Free",
    roi: "Station ownership is the defining skill of a line cook"
  },
  "pressure-handling": {
    skillId: "pressure-handling",
    skillName: "Handle Pressure",
    category: "soft",
    whyItMatters: "Kitchen rushes are intense. Staying calm under pressure separates good cooks from great ones.",
    howToAchieve: [
      "Focus on one ticket at a time, not the whole pile",
      "Breathe and stay methodical when stressed",
      "Pre-prep extensively to reduce rush stress",
      "Communicate when you're falling behind – don't hide it",
      "Develop routines that work automatically under pressure"
    ],
    resources: [
      { name: "Stress Management (LinkedIn)", url: "https://www.linkedin.com/learning/topics/stress-management", cost: "Free trial", duration: "2-3 hours" },
      { name: "Kitchen Rush Tips", url: "https://www.youtube.com/results?search_query=handling+kitchen+rush", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "Develops with experience",
    costRange: "Free",
    roi: "Reliable under pressure = more shifts and faster advancement"
  },
  "plating": {
    skillId: "plating",
    skillName: "Plating & Presentation",
    category: "technical",
    whyItMatters: "People eat with their eyes first. Consistent, attractive plating shows professionalism and attention to detail.",
    howToAchieve: [
      "Study your restaurant's plating standards carefully",
      "Practice plating speed without sacrificing quality",
      "Keep plates clean – wipe edges before sending",
      "Learn color, height, and composition basics",
      "Take photos of perfect plates as reference"
    ],
    resources: [
      { name: "Plating Techniques", url: "https://www.youtube.com/results?search_query=professional+food+plating+techniques", cost: "Free", duration: "Videos" },
      { name: "Food Plating Basics", url: "https://www.seriouseats.com/food-plating-tips", cost: "Free", duration: "Article" }
    ],
    timeEstimate: "2-4 weeks",
    costRange: "Free",
    quickWin: true,
    roi: "Professional plating impresses chefs and speeds promotion"
  },
  "kitchen-communication": {
    skillId: "kitchen-communication",
    skillName: "Kitchen Communication",
    category: "soft",
    whyItMatters: "Kitchens run on clear communication. Call backs, timing calls, and ticket management require specific protocols.",
    howToAchieve: [
      "Learn your kitchen's call-back system ('Heard!', 'Yes chef!')",
      "Call out times clearly ('Two minutes on the steak!')",
      "Announce movements ('Behind!', 'Hot pan!')",
      "Ask for help before you're overwhelmed",
      "Communicate dietary restrictions clearly to all stations"
    ],
    resources: [
      { name: "Kitchen Communication", url: "https://www.youtube.com/results?search_query=professional+kitchen+communication", cost: "Free", duration: "Videos" },
      { name: "Kitchen Lingo Guide", url: "https://www.youtube.com/results?search_query=kitchen+terminology", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "1-2 weeks",
    costRange: "Free",
    quickWin: true,
    roi: "Good communicators are trusted with more responsibility"
  },

  // Retail Skills
  "pos-mastery": {
    skillId: "pos-mastery",
    skillName: "POS Mastery",
    category: "technical",
    whyItMatters: "Shift leads handle returns, manager overrides, and end-of-day reports. Deep POS knowledge is essential.",
    howToAchieve: [
      "Learn every function beyond basic checkout",
      "Practice returns, exchanges, and price adjustments",
      "Understand how to void transactions and apply discounts",
      "Learn to run sales reports and inventory lookups",
      "Know troubleshooting for common POS errors"
    ],
    resources: [
      { name: "Square POS Training", url: "https://squareup.com/help/us/en/article/5087-square-training", cost: "Free", duration: "Self-paced" },
      { name: "Shopify POS Guide", url: "https://help.shopify.com/en/manual/sell-in-person", cost: "Free", duration: "Self-paced" },
      { name: "Retail POS Training", url: "https://www.youtube.com/results?search_query=retail+POS+system+training", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "1-2 weeks",
    costRange: "Free",
    quickWin: true,
    roi: "POS expertise is required for any supervisory role"
  },
  "customer-service": {
    skillId: "customer-service",
    skillName: "Customer Service Excellence",
    category: "soft",
    whyItMatters: "Handling difficult customers professionally is a key leadership skill. Your ability to create positive experiences drives repeat business.",
    howToAchieve: [
      "Listen actively and acknowledge customer concerns",
      "Stay calm and professional, even with angry customers",
      "Know when to offer solutions vs when to escalate",
      "Turn complaints into opportunities to exceed expectations",
      "Follow up to ensure resolution satisfaction"
    ],
    resources: [
      { name: "Customer Service (LinkedIn)", url: "https://www.linkedin.com/learning/topics/customer-service", cost: "Free trial", duration: "3-4 hours", highlight: "Comprehensive" },
      { name: "NRF Customer Service", url: "https://nrf.com/resources/retail-library/customer-service", cost: "Free", duration: "Articles" },
      { name: "The Service Culture Handbook", url: "https://www.amazon.com/Service-Culture-Handbook-Step-Step/dp/0692842004", cost: "$20", duration: "Self-paced" }
    ],
    timeEstimate: "Ongoing development",
    costRange: "Free - $20",
    roi: "Excellent service skills lead directly to supervisor promotion"
  },
  "inventory-basics": {
    skillId: "inventory-basics",
    skillName: "Inventory Basics",
    category: "technical",
    whyItMatters: "Shift leads help with receiving, stock counts, and loss prevention. Understanding inventory protects the business.",
    howToAchieve: [
      "Learn the receiving process and paperwork",
      "Understand how to conduct accurate stock counts",
      "Know loss prevention procedures and red flags",
      "Learn to organize backstock efficiently",
      "Understand FIFO (First In, First Out) rotation"
    ],
    resources: [
      { name: "Retail Inventory Management", url: "https://www.youtube.com/results?search_query=retail+inventory+management+basics", cost: "Free", duration: "Videos" },
      { name: "NRF Loss Prevention", url: "https://nrf.com/resources/retail-library/loss-prevention", cost: "Free", duration: "Articles" }
    ],
    timeEstimate: "2-4 weeks",
    costRange: "Free",
    roi: "Inventory skills show you can handle store operations"
  },
  "opening-closing": {
    skillId: "opening-closing",
    skillName: "Opening/Closing",
    category: "technical",
    whyItMatters: "Shift leads handle store open and close. This includes cash handling, security, and ensuring the store is ready for business.",
    howToAchieve: [
      "Learn the complete opening checklist",
      "Master the closing cash count and deposit procedures",
      "Know security procedures (alarms, safes, etc.)",
      "Understand pre-opening and post-close tasks",
      "Practice under supervision before doing solo"
    ],
    resources: [
      { name: "Retail Opening/Closing Guides", url: "https://www.youtube.com/results?search_query=retail+opening+closing+procedures", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "1-2 weeks supervised",
    costRange: "Free",
    quickWin: true,
    roi: "Opening/closing capability is required for shift lead roles"
  },
  "coaching": {
    skillId: "coaching",
    skillName: "Peer Coaching",
    category: "soft",
    whyItMatters: "Shift leads train and support team members. Your ability to develop others shows leadership potential.",
    howToAchieve: [
      "Volunteer to help train new hires",
      "Give constructive feedback positively",
      "Share tips and tricks with teammates",
      "Be patient with different learning styles",
      "Celebrate others' successes"
    ],
    resources: [
      { name: "Coaching Skills (LinkedIn)", url: "https://www.linkedin.com/learning/topics/coaching-and-mentoring", cost: "Free trial", duration: "3-4 hours" },
      { name: "Peer Coaching Guide", url: "https://www.youtube.com/results?search_query=peer+coaching+workplace", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "Ongoing development",
    costRange: "Free",
    roi: "Coaching ability is the #1 skill for promotion to management"
  },
  "p-and-l": {
    skillId: "p-and-l",
    skillName: "P&L Understanding",
    category: "technical",
    whyItMatters: "Store managers are responsible for profitability. Understanding P&L statements is essential for the role.",
    howToAchieve: [
      "Learn what impacts sales, costs, and margins",
      "Understand labor cost percentages and targets",
      "Know how shrinkage affects the bottom line",
      "Study your store's P&L with your manager",
      "Learn to identify problems in the numbers"
    ],
    resources: [
      { name: "Retail P&L Basics", url: "https://www.youtube.com/results?search_query=retail+profit+loss+statement+basics", cost: "Free", duration: "Videos" },
      { name: "Financial Basics (Coursera)", url: "https://www.coursera.org/courses?query=financial%20statements", cost: "Free audit", duration: "4-6 weeks" }
    ],
    timeEstimate: "2-4 weeks",
    costRange: "Free",
    roi: "P&L literacy is required for store manager positions"
  },
  "hiring": {
    skillId: "hiring",
    skillName: "Hiring & Onboarding",
    category: "soft",
    whyItMatters: "Store managers build their teams. Good hiring reduces turnover and creates a positive work environment.",
    howToAchieve: [
      "Learn behavioral interview techniques",
      "Understand legal do's and don'ts in interviews",
      "Develop a structured onboarding process",
      "Practice identifying red flags in candidates",
      "Focus on culture fit as well as skills"
    ],
    resources: [
      { name: "Interviewing Skills (LinkedIn)", url: "https://www.linkedin.com/learning/topics/interviewing", cost: "Free trial", duration: "2-3 hours" },
      { name: "Hiring Best Practices", url: "https://www.youtube.com/results?search_query=retail+hiring+best+practices", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "Ongoing development",
    costRange: "Free",
    roi: "Good hiring builds strong teams that drive sales"
  },
  "merchandising": {
    skillId: "merchandising",
    skillName: "Visual Merchandising",
    category: "technical",
    whyItMatters: "Product presentation drives sales. Effective merchandising increases revenue per square foot.",
    howToAchieve: [
      "Study your brand's visual standards",
      "Learn color blocking and focal point techniques",
      "Understand planograms and why they matter",
      "Practice creating eye-catching displays",
      "Stay current on seasonal trends"
    ],
    resources: [
      { name: "Visual Merchandising Basics", url: "https://www.youtube.com/results?search_query=visual+merchandising+basics", cost: "Free", duration: "Videos" },
      { name: "NRF Merchandising", url: "https://nrf.com/resources/retail-library", cost: "Free", duration: "Articles" }
    ],
    timeEstimate: "2-4 weeks",
    costRange: "Free",
    quickWin: true,
    roi: "Good merchandising directly increases store sales"
  },
  "loss-prevention": {
    skillId: "loss-prevention",
    skillName: "Loss Prevention",
    category: "technical",
    whyItMatters: "Shrinkage directly impacts profitability. Understanding LP protects the store and your job.",
    howToAchieve: [
      "Learn common theft methods and warning signs",
      "Understand internal theft prevention",
      "Know proper cash handling to prevent errors",
      "Learn inventory accuracy procedures",
      "Understand security systems and protocols"
    ],
    resources: [
      { name: "Loss Prevention Training", url: "https://www.youtube.com/results?search_query=retail+loss+prevention+training", cost: "Free", duration: "Videos" },
      { name: "NRF Loss Prevention", url: "https://nrf.com/resources/retail-library/loss-prevention", cost: "Free", duration: "Articles" }
    ],
    timeEstimate: "1-2 weeks",
    costRange: "Free",
    roi: "LP knowledge protects the store and shows management potential"
  },
  "nrf-cert": {
    skillId: "nrf-cert",
    skillName: "NRF Certification",
    category: "certification",
    whyItMatters: "National Retail Federation credentials validate your retail expertise and show commitment to the profession.",
    howToAchieve: [
      "Choose a certification path (Customer Service, Management, etc.)",
      "Complete the online training program",
      "Pass the certification exam",
      "Add credential to your resume and Indeed Flex profile"
    ],
    resources: [
      { name: "NRF Credentials", url: "https://nrf.com/career-center/credentials", cost: "$150-300", duration: "20-40 hours", highlight: "Industry recognized" },
      { name: "NRF RISE Up", url: "https://nrf.com/career-center/rise-up", cost: "Varies", duration: "Self-paced" }
    ],
    timeEstimate: "20-40 hours",
    costRange: "$150-300",
    roi: "NRF credentials differentiate you from other candidates"
  },

  // Event Staff Skills
  "event-setup": {
    skillId: "event-setup",
    skillName: "Setup Expertise",
    category: "technical",
    whyItMatters: "Efficient setup and breakdown keeps events on schedule. Knowing how to organize and lead setup shows leadership potential.",
    howToAchieve: [
      "Learn different event layouts (banquet, reception, theater)",
      "Practice efficient table and chair arrangements",
      "Understand audio/visual setup basics",
      "Know how to read event layouts and floor plans",
      "Master safe lifting and moving techniques"
    ],
    resources: [
      { name: "Event Setup Basics", url: "https://www.youtube.com/results?search_query=event+setup+training", cost: "Free", duration: "Videos" },
      { name: "Banquet Setup Guide", url: "https://www.youtube.com/results?search_query=banquet+setup+breakdown", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "2-4 weeks on the job",
    costRange: "Free",
    roi: "Setup expertise leads to event lead positions"
  },
  "guest-management": {
    skillId: "guest-management",
    skillName: "Guest Management",
    category: "soft",
    whyItMatters: "Events feature VIPs and special requests. Handling guests professionally creates memorable experiences.",
    howToAchieve: [
      "Learn to anticipate guest needs before they ask",
      "Handle special requests gracefully",
      "Know VIP protocols and preferences",
      "Stay calm with demanding guests",
      "Be discreet with confidential information"
    ],
    resources: [
      { name: "VIP Guest Service", url: "https://www.youtube.com/results?search_query=VIP+guest+service+hospitality", cost: "Free", duration: "Videos" },
      { name: "Hospitality Excellence (LinkedIn)", url: "https://www.linkedin.com/learning/topics/hospitality", cost: "Free trial", duration: "3-4 hours" }
    ],
    timeEstimate: "Ongoing development",
    costRange: "Free",
    roi: "VIP handling skills lead to premium event assignments"
  },
  "problem-solving": {
    skillId: "problem-solving",
    skillName: "Quick Problem Solving",
    category: "soft",
    whyItMatters: "Events have no room for delays. Solving problems quickly during live events is essential for leads.",
    howToAchieve: [
      "Stay calm when issues arise",
      "Think of 2-3 solutions before escalating",
      "Build a mental playbook of common issues and fixes",
      "Communicate issues discreetly to avoid guest awareness",
      "Debrief after events to improve future responses"
    ],
    resources: [
      { name: "Problem Solving (LinkedIn)", url: "https://www.linkedin.com/learning/topics/problem-solving", cost: "Free trial", duration: "2-3 hours" },
      { name: "Event Crisis Management", url: "https://www.youtube.com/results?search_query=event+crisis+management", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "Develops with experience",
    costRange: "Free",
    roi: "Reliable problem solvers become event leads"
  },
  "team-coordination": {
    skillId: "team-coordination",
    skillName: "Team Coordination",
    category: "soft",
    whyItMatters: "Event leads direct multiple staff members during setup and service. Coordination keeps everything running smoothly.",
    howToAchieve: [
      "Learn each team member's strengths",
      "Assign tasks clearly with specific expectations",
      "Check in regularly during events",
      "Handle issues quickly without disrupting service",
      "Give credit to the team for successes"
    ],
    resources: [
      { name: "Team Leadership (LinkedIn)", url: "https://www.linkedin.com/learning/topics/team-management", cost: "Free trial", duration: "3-4 hours" },
      { name: "Event Team Management", url: "https://www.youtube.com/results?search_query=managing+event+staff", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "Ongoing development",
    costRange: "Free",
    roi: "Team leadership is the core skill for event lead roles"
  },

  // Facilities Skills
  "basic-maintenance": {
    skillId: "basic-maintenance",
    skillName: "Basic Maintenance",
    category: "technical",
    whyItMatters: "Facilities technicians handle minor repairs. Basic maintenance skills reduce downtime and service calls.",
    howToAchieve: [
      "Learn basic plumbing fixes (toilet, faucet, drain)",
      "Understand electrical safety and basic repairs",
      "Practice drywall patching and painting",
      "Learn to replace common fixtures (lights, handles)",
      "Build a toolkit and know how to use each tool"
    ],
    resources: [
      { name: "Home Repair Basics (YouTube)", url: "https://www.youtube.com/results?search_query=basic+building+maintenance+repairs", cost: "Free", duration: "Videos" },
      { name: "This Old House", url: "https://www.youtube.com/c/thisoldhouse", cost: "Free", duration: "Videos", highlight: "Excellent resource" }
    ],
    timeEstimate: "3-6 months",
    costRange: "Free",
    roi: "Maintenance skills qualify you for higher-paying technician roles"
  },
  "hvac-basics": {
    skillId: "hvac-basics",
    skillName: "HVAC Basics",
    category: "technical",
    whyItMatters: "Understanding heating and cooling systems helps diagnose issues and communicate with HVAC contractors.",
    howToAchieve: [
      "Learn how HVAC systems work conceptually",
      "Understand filter changes and basic maintenance",
      "Know how to read thermostats and controls",
      "Recognize signs of HVAC problems",
      "Learn when to call professionals vs handle yourself"
    ],
    resources: [
      { name: "HVAC Basics", url: "https://www.youtube.com/results?search_query=HVAC+basics+for+facility+maintenance", cost: "Free", duration: "Videos" },
      { name: "EPA 608 Overview", url: "https://www.epa.gov/section608", cost: "Free info", duration: "Reference" }
    ],
    timeEstimate: "2-4 weeks",
    costRange: "Free",
    roi: "HVAC knowledge is valuable for facilities positions"
  },
  "electrical-safety": {
    skillId: "electrical-safety",
    skillName: "Electrical Safety",
    category: "certification",
    whyItMatters: "Electrical work is dangerous. Proper safety training protects you and ensures compliance.",
    howToAchieve: [
      "Take an electrical safety course",
      "Learn lockout/tagout procedures",
      "Understand when to call licensed electricians",
      "Know the limits of what you can legally do",
      "Always follow safety protocols"
    ],
    resources: [
      { name: "OSHA Electrical Safety", url: "https://www.osha.gov/electrical", cost: "Free", duration: "Reference", highlight: "Official" },
      { name: "Electrical Safety Training", url: "https://www.360training.com/osha-safety-training", cost: "$25-50", duration: "2-4 hours" }
    ],
    timeEstimate: "4-8 hours",
    costRange: "$25-50",
    roi: "Electrical safety certification is often required for facilities roles"
  },
  "work-orders": {
    skillId: "work-orders",
    skillName: "Work Order Systems",
    category: "technical",
    whyItMatters: "Facilities teams use software to track maintenance requests. Proficiency shows organization and technical aptitude.",
    howToAchieve: [
      "Learn your organization's work order system",
      "Practice creating, updating, and closing work orders",
      "Understand priority levels and SLAs",
      "Document work thoroughly with notes and photos",
      "Learn to run reports on your work history"
    ],
    resources: [
      { name: "CMMS Overview", url: "https://www.youtube.com/results?search_query=CMMS+work+order+system+training", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "1-2 weeks",
    costRange: "Free",
    quickWin: true,
    roi: "Work order proficiency is required for facilities positions"
  },
  "vendor-coordination": {
    skillId: "vendor-coordination",
    skillName: "Vendor Coordination",
    category: "soft",
    whyItMatters: "Facilities technicians work with contractors and suppliers. Good coordination keeps projects on track and on budget.",
    howToAchieve: [
      "Communicate project requirements clearly",
      "Get multiple quotes for comparison",
      "Monitor work quality and timeline",
      "Handle issues professionally",
      "Maintain good relationships for future projects"
    ],
    resources: [
      { name: "Vendor Management (LinkedIn)", url: "https://www.linkedin.com/learning/topics/vendor-management", cost: "Free trial", duration: "2-3 hours" }
    ],
    timeEstimate: "Develops with experience",
    costRange: "Free",
    roi: "Vendor management skills lead to facilities supervisor roles"
  },

  // Industrial Skills
  "multi-machine": {
    skillId: "multi-machine",
    skillName: "Multi-Machine Operation",
    category: "technical",
    whyItMatters: "Lead operators oversee multiple machines. Versatility makes you invaluable and increases your earning potential.",
    howToAchieve: [
      "Volunteer to cross-train on different machines",
      "Learn the similarities and differences between machines",
      "Practice switching between machines efficiently",
      "Understand changeover procedures for each",
      "Document tips for each machine type"
    ],
    resources: [
      { name: "Machine Operator Training", url: "https://www.youtube.com/results?search_query=machine+operator+training", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "3-6 months",
    costRange: "Free (on-the-job training)",
    roi: "Multi-machine operators are first choice for lead positions"
  },
  "troubleshooting": {
    skillId: "troubleshooting",
    skillName: "Basic Troubleshooting",
    category: "technical",
    whyItMatters: "Lead operators diagnose and fix minor issues. Reducing downtime saves money and impresses supervisors.",
    howToAchieve: [
      "Learn common error codes and their causes",
      "Understand the basic mechanics of your machines",
      "Practice systematic diagnosis approaches",
      "Know when to fix yourself vs call maintenance",
      "Document solutions for future reference"
    ],
    resources: [
      { name: "Troubleshooting Techniques", url: "https://www.youtube.com/results?search_query=machine+troubleshooting+basics", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "Develops with experience",
    costRange: "Free",
    roi: "Troubleshooting skills reduce downtime and show initiative"
  },
  "quality-standards": {
    skillId: "quality-standards",
    skillName: "Quality Standards",
    category: "technical",
    whyItMatters: "Understanding quality specifications ensures output meets requirements. Essential for both lead operators and inspectors.",
    howToAchieve: [
      "Learn your company's quality specifications",
      "Understand tolerance ranges and acceptance criteria",
      "Know how to use measurement tools accurately",
      "Document quality issues thoroughly",
      "Learn root cause analysis basics"
    ],
    resources: [
      { name: "Quality Control Basics", url: "https://www.youtube.com/results?search_query=quality+control+manufacturing", cost: "Free", duration: "Videos" },
      { name: "ISO Quality Standards", url: "https://www.iso.org/standards.html", cost: "Free info", duration: "Reference" }
    ],
    timeEstimate: "2-4 weeks",
    costRange: "Free",
    roi: "Quality knowledge is essential for advancement in manufacturing"
  },
  "training-others": {
    skillId: "training-others",
    skillName: "Training New Operators",
    category: "soft",
    whyItMatters: "Lead operators train new hires. The ability to teach others is the key skill for advancement.",
    howToAchieve: [
      "Break down complex tasks into simple steps",
      "Be patient with different learning speeds",
      "Use demonstrations plus hands-on practice",
      "Create cheat sheets and reference guides",
      "Give constructive feedback positively"
    ],
    resources: [
      { name: "Training Skills (LinkedIn)", url: "https://www.linkedin.com/learning/how-to-train-employees", cost: "Free trial", duration: "2-3 hours" },
      { name: "On-the-Job Training Guide", url: "https://www.youtube.com/results?search_query=on+the+job+training+tips", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "Ongoing development",
    costRange: "Free",
    roi: "Training ability is the #1 skill for promotion to lead"
  },
  "osha-10": {
    skillId: "osha-10",
    skillName: "OSHA 10 Certification",
    category: "certification",
    whyItMatters: "OSHA 10 is the industry standard safety certification. Many employers require it for lead and supervisor roles.",
    howToAchieve: [
      "Take the OSHA 10-hour course (online or in-person)",
      "Complete all modules and assessments",
      "Pass the final exam",
      "Receive your OSHA 10 card"
    ],
    resources: [
      { name: "OSHA 10 Online", url: "https://www.osha.gov/training/outreach", cost: "$25-90", duration: "10 hours", highlight: "Official" },
      { name: "360Training OSHA 10", url: "https://www.360training.com/osha-safety-training", cost: "$25-50", duration: "10 hours" }
    ],
    timeEstimate: "10 hours",
    costRange: "$25-90",
    quickWin: true,
    roi: "OSHA 10 is required or preferred for lead and supervisor roles"
  },
  "osha-30": {
    skillId: "osha-30",
    skillName: "OSHA 30 Certification",
    category: "certification",
    whyItMatters: "OSHA 30 is the advanced safety certification for supervisors. Shows comprehensive safety knowledge.",
    howToAchieve: [
      "Complete OSHA 10 first (recommended)",
      "Take the OSHA 30-hour course",
      "Complete all required modules",
      "Pass the final assessment"
    ],
    resources: [
      { name: "OSHA 30 Online", url: "https://www.osha.gov/training/outreach", cost: "$150-200", duration: "30 hours", highlight: "Supervisor level" },
      { name: "360Training OSHA 30", url: "https://www.360training.com/osha-safety-training", cost: "$150-180", duration: "30 hours" }
    ],
    timeEstimate: "30 hours",
    costRange: "$150-200",
    roi: "OSHA 30 is often required for supervisor and management roles"
  },
  "team-leadership": {
    skillId: "team-leadership",
    skillName: "Team Leadership",
    category: "soft",
    whyItMatters: "Warehouse supervisors manage teams of 5-15+ workers. Strong leadership creates productive, safe work environments.",
    howToAchieve: [
      "Lead by example in your current role",
      "Learn each team member's strengths and goals",
      "Communicate expectations clearly",
      "Provide regular feedback and recognition",
      "Handle conflicts fairly and promptly"
    ],
    resources: [
      { name: "Leadership (LinkedIn)", url: "https://www.linkedin.com/learning/topics/leadership", cost: "Free trial", duration: "4-6 hours" },
      { name: "First-Time Supervisor (Coursera)", url: "https://www.coursera.org/courses?query=first%20time%20supervisor", cost: "Free audit", duration: "4-6 weeks" }
    ],
    timeEstimate: "Ongoing development",
    costRange: "Free",
    roi: "Team leadership is the core skill for supervisor roles"
  },
  "inventory-systems": {
    skillId: "inventory-systems",
    skillName: "Inventory Management",
    category: "technical",
    whyItMatters: "Supervisors track stock levels, monitor shrinkage, and ensure accurate inventory. Critical for warehouse operations.",
    howToAchieve: [
      "Learn your warehouse's inventory system deeply",
      "Understand cycle counting procedures",
      "Know how to investigate discrepancies",
      "Practice generating and analyzing reports",
      "Learn to identify shrinkage patterns"
    ],
    resources: [
      { name: "Inventory Management (LinkedIn)", url: "https://www.linkedin.com/learning/topics/inventory-management", cost: "Free trial", duration: "3-4 hours" },
      { name: "WMS Advanced Training", url: "https://www.youtube.com/results?search_query=warehouse+inventory+management+system", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "2-4 weeks",
    costRange: "Free",
    roi: "Inventory expertise is essential for supervisor roles"
  },
  "reporting": {
    skillId: "reporting",
    skillName: "KPI Reporting",
    category: "technical",
    whyItMatters: "Supervisors track and report on team productivity, quality, and safety metrics. Data-driven management gets results.",
    howToAchieve: [
      "Learn what KPIs your warehouse tracks",
      "Practice pulling and analyzing reports",
      "Understand targets and how to impact them",
      "Learn to present data clearly to management",
      "Use data to drive team improvement"
    ],
    resources: [
      { name: "KPI Fundamentals", url: "https://www.youtube.com/results?search_query=warehouse+KPI+reporting", cost: "Free", duration: "Videos" },
      { name: "Excel for Business (LinkedIn)", url: "https://www.linkedin.com/learning/topics/excel", cost: "Free trial", duration: "2-4 hours" }
    ],
    timeEstimate: "2-4 weeks",
    costRange: "Free",
    roi: "KPI knowledge shows you can manage by results"
  },
  "attention-detail": {
    skillId: "attention-detail",
    skillName: "Attention to Detail",
    category: "soft",
    whyItMatters: "Quality inspectors must spot defects others miss. Consistent attention to detail prevents costly errors.",
    howToAchieve: [
      "Develop systematic inspection routines",
      "Take your time - speed comes with accuracy",
      "Know what defects look like for each product",
      "Take breaks to maintain focus",
      "Double-check your work before signing off"
    ],
    resources: [
      { name: "Quality Inspection Skills", url: "https://www.youtube.com/results?search_query=quality+inspector+training", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "Develops with practice",
    costRange: "Free",
    roi: "Attention to detail is the core skill for quality roles"
  },
  "measurement-tools": {
    skillId: "measurement-tools",
    skillName: "Measurement Tools",
    category: "technical",
    whyItMatters: "Quality inspectors use calipers, gauges, and testing equipment daily. Accuracy is essential.",
    howToAchieve: [
      "Learn to read and use calipers accurately",
      "Understand different gauge types and uses",
      "Practice measurement techniques",
      "Know calibration requirements",
      "Document measurements correctly"
    ],
    resources: [
      { name: "Caliper Training", url: "https://www.youtube.com/results?search_query=how+to+use+calipers+quality+control", cost: "Free", duration: "Videos" },
      { name: "Measurement Tools Guide", url: "https://www.youtube.com/results?search_query=quality+control+measurement+tools", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "1-2 weeks",
    costRange: "Free",
    quickWin: true,
    roi: "Measurement proficiency is required for quality inspector roles"
  },
  "documentation": {
    skillId: "documentation",
    skillName: "Documentation Skills",
    category: "technical",
    whyItMatters: "Quality inspectors must record findings accurately. Good documentation protects the company and supports process improvement.",
    howToAchieve: [
      "Learn documentation requirements and standards",
      "Be thorough and accurate in all records",
      "Use standard terminology and formats",
      "Include all required information",
      "Keep documentation organized and accessible"
    ],
    resources: [
      { name: "Quality Documentation", url: "https://www.youtube.com/results?search_query=quality+control+documentation", cost: "Free", duration: "Videos" }
    ],
    timeEstimate: "1-2 weeks",
    costRange: "Free",
    roi: "Good documentation is essential for compliance and quality"
  },
  "six-sigma": {
    skillId: "six-sigma",
    skillName: "Six Sigma Yellow Belt",
    category: "certification",
    whyItMatters: "Six Sigma is a quality improvement methodology used worldwide. Yellow Belt shows understanding of quality principles.",
    howToAchieve: [
      "Take a Six Sigma Yellow Belt course",
      "Learn DMAIC methodology basics",
      "Understand quality tools and techniques",
      "Pass the certification exam",
      "Apply concepts to your work"
    ],
    resources: [
      { name: "Six Sigma Yellow Belt (Coursera)", url: "https://www.coursera.org/courses?query=six%20sigma%20yellow%20belt", cost: "Free audit", duration: "4-6 weeks", highlight: "Respected certification" },
      { name: "ASQ Six Sigma", url: "https://asq.org/cert/six-sigma-yellow-belt", cost: "$200-400", duration: "Variable", highlight: "Industry standard" }
    ],
    timeEstimate: "20-40 hours",
    costRange: "Free (audit) - $400",
    roi: "Six Sigma certification differentiates you for quality roles"
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
