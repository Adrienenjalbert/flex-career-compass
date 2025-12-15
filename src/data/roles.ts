export interface Role {
  id: string;
  title: string;
  slug: string;
  industry: 'hospitality' | 'industrial' | 'retail' | 'facilities';
  description: string;
  shortDescription: string;
  avgHourlyRate: { min: number; max: number };
  skills: string[];
  responsibilities: string[];
  requirements: string[];
  careerPath: { role: string; years: string }[];
  faqs: { question: string; answer: string }[];
}

export const industries = [
  { id: 'hospitality', name: 'Hospitality', icon: 'UtensilsCrossed', color: 'bg-amber-500' },
  { id: 'industrial', name: 'Industrial & Warehouse', icon: 'Warehouse', color: 'bg-blue-600' },
  { id: 'retail', name: 'Retail', icon: 'ShoppingBag', color: 'bg-emerald-500' },
  { id: 'facilities', name: 'Facilities Management', icon: 'Building2', color: 'bg-purple-500' },
] as const;

export const roles: Role[] = [
  // Hospitality
  {
    id: 'barback',
    title: 'Barback',
    slug: 'barback',
    industry: 'hospitality',
    description: 'Barbacks are essential support staff in bars and restaurants, assisting bartenders by stocking supplies, cleaning glasses, and ensuring the bar runs smoothly during busy service periods.',
    shortDescription: 'Support bartenders and keep the bar running smoothly',
    avgHourlyRate: { min: 12, max: 18 },
    skills: ['Speed & efficiency', 'Physical stamina', 'Attention to detail', 'Team communication', 'Organization'],
    responsibilities: [
      'Restock bar supplies including glassware, ice, and garnishes',
      'Clean and sanitize bar equipment and glassware',
      'Assist bartenders during rush periods',
      'Maintain cleanliness of bar area',
      'Receive and store deliveries'
    ],
    requirements: [
      'Must be 18+ (21+ in some states)',
      'Ability to lift 30+ lbs',
      'Comfortable standing for long periods',
      'Weekend and evening availability'
    ],
    careerPath: [
      { role: 'Barback', years: '0-1 years' },
      { role: 'Bartender', years: '1-3 years' },
      { role: 'Head Bartender', years: '3-5 years' },
      { role: 'Bar Manager', years: '5+ years' }
    ],
    faqs: [
      { question: 'Do I need experience to become a barback?', answer: 'No prior experience is required. Most bars provide on-the-job training for barbacks.' },
      { question: 'Do barbacks receive tips?', answer: 'Yes, barbacks typically receive tip-outs from bartenders, usually 10-20% of bartender tips.' },
      { question: 'What are typical barback hours?', answer: 'Barbacks usually work evening and weekend shifts, typically 6-10 hours per shift.' }
    ]
  },
  {
    id: 'barista',
    title: 'Barista',
    slug: 'barista',
    industry: 'hospitality',
    description: 'Baristas are skilled coffee professionals who prepare and serve espresso-based drinks, brewed coffee, and other beverages while providing excellent customer service in cafes and coffee shops.',
    shortDescription: 'Craft specialty coffee drinks and serve customers',
    avgHourlyRate: { min: 13, max: 19 },
    skills: ['Coffee brewing techniques', 'Latte art', 'Customer service', 'Multitasking', 'Cash handling'],
    responsibilities: [
      'Prepare espresso drinks, brewed coffee, and specialty beverages',
      'Greet customers and take orders',
      'Operate espresso machines and other equipment',
      'Maintain cleanliness standards',
      'Manage cash register and process payments'
    ],
    requirements: [
      'Strong customer service skills',
      'Ability to work in fast-paced environment',
      'Basic math skills for cash handling',
      'Food handler certification (in some locations)'
    ],
    careerPath: [
      { role: 'Barista', years: '0-2 years' },
      { role: 'Shift Supervisor', years: '2-3 years' },
      { role: 'Assistant Manager', years: '3-5 years' },
      { role: 'Store Manager', years: '5+ years' }
    ],
    faqs: [
      { question: 'How long does it take to learn barista skills?', answer: 'Basic barista skills can be learned in 2-4 weeks. Mastering latte art and advanced techniques takes 3-6 months.' },
      { question: 'Do baristas get tips?', answer: 'Yes, baristas typically receive tips, which can add $2-5 per hour to their base pay.' },
      { question: 'What certifications help baristas?', answer: 'SCA (Specialty Coffee Association) certifications can boost your career and earning potential.' }
    ]
  },
  {
    id: 'bartender',
    title: 'Bartender',
    slug: 'bartender',
    industry: 'hospitality',
    description: 'Bartenders mix and serve alcoholic and non-alcoholic beverages, create cocktails, engage with customers, and manage the bar area in restaurants, bars, hotels, and event venues.',
    shortDescription: 'Mix drinks, serve customers, and manage bar operations',
    avgHourlyRate: { min: 15, max: 25 },
    skills: ['Mixology', 'Customer service', 'Memory & recall', 'Cash handling', 'Speed & multitasking'],
    responsibilities: [
      'Mix and serve cocktails, beer, wine, and other beverages',
      'Check IDs and ensure responsible alcohol service',
      'Build rapport with customers and provide recommendations',
      'Maintain accurate tabs and process payments',
      'Keep bar area clean and stocked'
    ],
    requirements: [
      'Must be 21+ years old',
      'TIPS or ServSafe Alcohol certification',
      'Knowledge of drink recipes and techniques',
      'Excellent customer service skills'
    ],
    careerPath: [
      { role: 'Bartender', years: '0-3 years' },
      { role: 'Head Bartender', years: '3-5 years' },
      { role: 'Bar Manager', years: '5-7 years' },
      { role: 'Beverage Director', years: '7+ years' }
    ],
    faqs: [
      { question: 'How much do bartenders make with tips?', answer: 'With tips, bartenders can earn $25-50+ per hour in busy establishments. Total annual income often reaches $40,000-70,000.' },
      { question: 'Do I need bartending school?', answer: 'While not required, bartending courses can help you learn faster and may be preferred by some employers.' },
      { question: 'What is TIPS certification?', answer: 'TIPS (Training for Intervention ProcedureS) is a responsible alcohol service certification required or preferred in most states.' }
    ]
  },
  {
    id: 'waiting-staff',
    title: 'Waiting Staff',
    slug: 'waiting-staff',
    industry: 'hospitality',
    description: 'Waiting staff (servers/waiters) take orders, serve food and beverages, and ensure guests have an excellent dining experience in restaurants, hotels, and catering events.',
    shortDescription: 'Serve guests and deliver exceptional dining experiences',
    avgHourlyRate: { min: 12, max: 20 },
    skills: ['Customer service', 'Memory & attention', 'Communication', 'Time management', 'Teamwork'],
    responsibilities: [
      'Greet guests and present menus',
      'Take accurate food and beverage orders',
      'Serve food and drinks promptly',
      'Handle payments and process transactions',
      'Address customer concerns professionally'
    ],
    requirements: [
      'Excellent communication skills',
      'Ability to stand and walk for extended periods',
      'Weekend and evening availability',
      'Food handler certification (varies by location)'
    ],
    careerPath: [
      { role: 'Server', years: '0-2 years' },
      { role: 'Head Server', years: '2-4 years' },
      { role: 'Restaurant Supervisor', years: '4-6 years' },
      { role: 'Restaurant Manager', years: '6+ years' }
    ],
    faqs: [
      { question: 'How much do servers make in tips?', answer: 'Tips typically add $10-30 per hour depending on the restaurant type and location. Fine dining servers often earn more.' },
      { question: 'What should I wear as a server?', answer: 'Most restaurants provide dress code guidelines. Common requirements include black pants, non-slip shoes, and a collared shirt.' },
      { question: 'Is experience required?', answer: 'Many restaurants hire entry-level servers and provide training. Prior customer service experience is helpful.' }
    ]
  },
  {
    id: 'chef-de-partie',
    title: 'Chef de Partie',
    slug: 'chef-de-partie',
    industry: 'hospitality',
    description: 'A Chef de Partie (Station Chef or Line Cook) manages a specific section of the kitchen, preparing dishes according to recipes and maintaining high culinary standards.',
    shortDescription: 'Lead a kitchen station and prepare quality dishes',
    avgHourlyRate: { min: 17, max: 26 },
    skills: ['Culinary expertise', 'Station management', 'Time management', 'Food safety', 'Leadership'],
    responsibilities: [
      'Manage and operate assigned kitchen station',
      'Prepare dishes according to specifications',
      'Train and supervise commis chefs',
      'Maintain cleanliness and organization',
      'Ensure food safety standards'
    ],
    requirements: [
      'Culinary training or equivalent experience',
      '2+ years kitchen experience',
      'Food handler certification',
      'Strong knowledge of cooking techniques'
    ],
    careerPath: [
      { role: 'Commis Chef', years: '0-2 years' },
      { role: 'Chef de Partie', years: '2-4 years' },
      { role: 'Sous Chef', years: '4-7 years' },
      { role: 'Head Chef', years: '7+ years' }
    ],
    faqs: [
      { question: 'What kitchen stations can a Chef de Partie manage?', answer: 'Common stations include sauté, grill, pastry, garde manger (cold dishes), and fish.' },
      { question: 'Is culinary school necessary?', answer: 'While helpful, many chefs advance through experience. Culinary training can accelerate career growth.' },
      { question: 'What hours do Chefs de Partie work?', answer: 'Expect long hours, including evenings, weekends, and holidays. 10-12 hour shifts are common.' }
    ]
  },
  {
    id: 'commis-chef',
    title: 'Commis Chef',
    slug: 'commis-chef',
    industry: 'hospitality',
    description: 'A Commis Chef is an entry-level kitchen position where you learn fundamental cooking skills, assist senior chefs, and perform basic food preparation tasks.',
    shortDescription: 'Learn culinary skills while assisting experienced chefs',
    avgHourlyRate: { min: 14, max: 19 },
    skills: ['Basic cooking', 'Knife skills', 'Food prep', 'Following recipes', 'Kitchen safety'],
    responsibilities: [
      'Prepare ingredients (chopping, measuring, etc.)',
      'Assist senior chefs with cooking tasks',
      'Maintain clean and organized workstation',
      'Receive and store food deliveries',
      'Follow food safety protocols'
    ],
    requirements: [
      'Passion for cooking',
      'Basic knife skills (trainable)',
      'Physical stamina',
      'Food handler certification preferred'
    ],
    careerPath: [
      { role: 'Commis Chef', years: '0-2 years' },
      { role: 'Chef de Partie', years: '2-4 years' },
      { role: 'Sous Chef', years: '4-7 years' },
      { role: 'Head Chef', years: '7+ years' }
    ],
    faqs: [
      { question: 'Is this a good entry-level culinary job?', answer: 'Yes! Commis Chef is the traditional starting point for a professional culinary career.' },
      { question: 'What will I learn as a Commis Chef?', answer: 'You\'ll learn knife skills, cooking techniques, food safety, kitchen organization, and how professional kitchens operate.' },
      { question: 'Do I need cooking experience?', answer: 'Not always. Many restaurants train passionate beginners. Home cooking experience is helpful.' }
    ]
  },
  {
    id: 'kitchen-porter',
    title: 'Kitchen Porter',
    slug: 'kitchen-porter',
    industry: 'hospitality',
    description: 'Kitchen Porters keep commercial kitchens running smoothly by washing dishes, cleaning equipment, maintaining kitchen hygiene, and assisting with basic food prep tasks.',
    shortDescription: 'Maintain kitchen cleanliness and support the team',
    avgHourlyRate: { min: 12, max: 16 },
    skills: ['Cleaning efficiency', 'Physical stamina', 'Time management', 'Attention to detail', 'Teamwork'],
    responsibilities: [
      'Wash and sanitize dishes, pots, and utensils',
      'Deep clean kitchen equipment and surfaces',
      'Dispose of waste and manage recycling',
      'Assist with basic food preparation',
      'Receive and organize deliveries'
    ],
    requirements: [
      'Physical fitness and stamina',
      'Ability to work in hot, fast-paced environment',
      'Attention to hygiene standards',
      'Flexible schedule availability'
    ],
    careerPath: [
      { role: 'Kitchen Porter', years: '0-1 years' },
      { role: 'Commis Chef', years: '1-3 years' },
      { role: 'Chef de Partie', years: '3-5 years' },
      { role: 'Sous Chef', years: '5+ years' }
    ],
    faqs: [
      { question: 'Can Kitchen Porter lead to a chef career?', answer: 'Absolutely! Many successful chefs started as kitchen porters and learned by observing and assisting.' },
      { question: 'What are the physical demands?', answer: 'Expect standing for long periods, lifting heavy pots, and working in hot/humid conditions.' },
      { question: 'Is this role available as flexible work?', answer: 'Yes, kitchen porter is one of the most in-demand flexible hospitality roles.' }
    ]
  },
  // Industrial
  {
    id: 'delivery-driver',
    title: 'Delivery Driver',
    slug: 'delivery-driver',
    industry: 'industrial',
    description: 'Delivery Drivers transport goods and packages to customers, businesses, or distribution centers, ensuring timely and safe delivery while providing excellent customer service.',
    shortDescription: 'Deliver packages and goods to customers on time',
    avgHourlyRate: { min: 16, max: 24 },
    skills: ['Safe driving', 'Navigation', 'Time management', 'Customer service', 'Physical fitness'],
    responsibilities: [
      'Load and unload packages safely',
      'Follow delivery routes efficiently',
      'Obtain signatures and delivery confirmations',
      'Maintain delivery vehicle',
      'Communicate with dispatch and customers'
    ],
    requirements: [
      'Valid driver\'s license',
      'Clean driving record',
      'Ability to lift 50+ lbs',
      'Smartphone for navigation and tracking'
    ],
    careerPath: [
      { role: 'Delivery Driver', years: '0-2 years' },
      { role: 'Route Driver', years: '2-4 years' },
      { role: 'Delivery Supervisor', years: '4-6 years' },
      { role: 'Logistics Coordinator', years: '6+ years' }
    ],
    faqs: [
      { question: 'Do I need a CDL to be a delivery driver?', answer: 'Most local delivery jobs require only a standard driver\'s license. CDL is needed for larger commercial vehicles.' },
      { question: 'Are there delivery driving shifts available?', answer: 'Yes, delivery driving is available in various shifts including morning, afternoon, evening, and weekend options.' },
      { question: 'How many deliveries per day?', answer: 'Drivers typically complete 80-150+ stops per day depending on the type of delivery and route.' }
    ]
  },
  {
    id: 'picker-packer',
    title: 'Picker Packer',
    slug: 'picker-packer',
    industry: 'industrial',
    description: 'Picker Packers work in warehouses and fulfillment centers, selecting items from inventory and packaging them for shipment to customers.',
    shortDescription: 'Pick and pack orders in warehouse environments',
    avgHourlyRate: { min: 15, max: 21 },
    skills: ['Attention to detail', 'Speed & efficiency', 'Physical stamina', 'Organization', 'Technology use'],
    responsibilities: [
      'Locate and retrieve items from warehouse shelves',
      'Verify item accuracy and quality',
      'Pack items securely for shipping',
      'Use handheld scanners and warehouse systems',
      'Meet daily productivity targets'
    ],
    requirements: [
      'Ability to stand and walk for long shifts',
      'Lift up to 50 lbs regularly',
      'Basic reading and math skills',
      'Comfortable with technology'
    ],
    careerPath: [
      { role: 'Picker Packer', years: '0-1 years' },
      { role: 'Lead Picker', years: '1-2 years' },
      { role: 'Warehouse Associate II', years: '2-4 years' },
      { role: 'Warehouse Supervisor', years: '4+ years' }
    ],
    faqs: [
      { question: 'What is the pace like?', answer: 'Picker packer roles are fast-paced with productivity targets. Most workers adapt within the first few weeks.' },
      { question: 'What shifts are available?', answer: 'Warehouses typically offer day, night, and weekend shifts. Peak seasons have the most availability.' },
      { question: 'Do I need warehouse experience?', answer: 'No prior experience required. Training is provided for scanners, systems, and processes.' }
    ]
  },
  {
    id: 'warehouse-operative',
    title: 'Warehouse Operative',
    slug: 'warehouse-operative',
    industry: 'industrial',
    description: 'Warehouse Operatives perform various tasks in distribution centers including receiving shipments, organizing inventory, operating equipment, and preparing orders for dispatch.',
    shortDescription: 'Handle inventory and operations in warehouse settings',
    avgHourlyRate: { min: 15, max: 22 },
    skills: ['Physical fitness', 'Organization', 'Attention to detail', 'Teamwork', 'Equipment operation'],
    responsibilities: [
      'Receive, check, and store incoming goods',
      'Move inventory using pallet jacks and forklifts',
      'Maintain accurate inventory records',
      'Prepare orders for shipping',
      'Follow health and safety procedures'
    ],
    requirements: [
      'Physical ability to lift heavy items',
      'Basic literacy and numeracy',
      'Safety awareness',
      'Forklift certification (for some roles)'
    ],
    careerPath: [
      { role: 'Warehouse Operative', years: '0-2 years' },
      { role: 'Senior Warehouse Operative', years: '2-4 years' },
      { role: 'Team Leader', years: '4-6 years' },
      { role: 'Warehouse Manager', years: '6+ years' }
    ],
    faqs: [
      { question: 'What equipment will I use?', answer: 'Common equipment includes pallet jacks, forklifts, hand scanners, and conveyor systems.' },
      { question: 'Is training provided?', answer: 'Yes, most warehouses provide comprehensive training on safety, equipment, and procedures.' },
      { question: 'What are typical warehouse temperatures?', answer: 'Standard warehouses are ambient temperature. Some facilities (food storage) are refrigerated or frozen.' }
    ]
  },
  {
    id: 'forklift-driver',
    title: 'Forklift Driver',
    slug: 'forklift-driver',
    industry: 'industrial',
    description: 'Forklift Drivers operate powered industrial trucks to move, stack, and retrieve materials in warehouses, distribution centers, and manufacturing facilities.',
    shortDescription: 'Operate forklifts to move warehouse inventory',
    avgHourlyRate: { min: 17, max: 25 },
    skills: ['Forklift operation', 'Safety awareness', 'Spatial awareness', 'Attention to detail', 'Communication'],
    responsibilities: [
      'Operate forklift to move pallets and materials',
      'Load and unload trucks safely',
      'Stack and organize inventory',
      'Perform daily equipment safety checks',
      'Maintain accurate movement records'
    ],
    requirements: [
      'Valid forklift certification',
      'Clean safety record',
      'Good spatial awareness',
      'Previous warehouse experience preferred'
    ],
    careerPath: [
      { role: 'Forklift Driver', years: '0-2 years' },
      { role: 'Senior Forklift Operator', years: '2-4 years' },
      { role: 'Shipping/Receiving Lead', years: '4-6 years' },
      { role: 'Warehouse Supervisor', years: '6+ years' }
    ],
    faqs: [
      { question: 'How do I get forklift certified?', answer: 'Forklift certification can be obtained through employers or certified training providers. Training typically takes 1-2 days.' },
      { question: 'Do certified forklift drivers earn more?', answer: 'Yes, forklift certification typically adds $2-5 per hour to base warehouse wages.' },
      { question: 'What types of forklifts are there?', answer: 'Common types include sit-down counterbalance, stand-up reach trucks, order pickers, and pallet jacks.' }
    ]
  },
  {
    id: 'food-production-operative',
    title: 'Food Production Operative',
    slug: 'food-production-operative',
    industry: 'industrial',
    description: 'Food Production Operatives work in food manufacturing facilities, operating machinery, packaging products, and ensuring food safety standards are met.',
    shortDescription: 'Work in food manufacturing and production lines',
    avgHourlyRate: { min: 14, max: 20 },
    skills: ['Attention to detail', 'Food safety', 'Machine operation', 'Quality control', 'Teamwork'],
    responsibilities: [
      'Operate food production machinery',
      'Monitor product quality on production lines',
      'Package and label food products',
      'Maintain hygiene and cleanliness standards',
      'Follow food safety regulations'
    ],
    requirements: [
      'Food safety awareness',
      'Ability to stand for extended periods',
      'Attention to detail and quality',
      'Flexible schedule availability'
    ],
    careerPath: [
      { role: 'Food Production Operative', years: '0-2 years' },
      { role: 'Line Leader', years: '2-4 years' },
      { role: 'Production Supervisor', years: '4-6 years' },
      { role: 'Production Manager', years: '6+ years' }
    ],
    faqs: [
      { question: 'What training is provided?', answer: 'Training covers food safety, HACCP principles, equipment operation, and quality standards.' },
      { question: 'What are working conditions like?', answer: 'Food production facilities are temperature-controlled and follow strict hygiene protocols. Hairnets and protective clothing required.' },
      { question: 'Are there opportunities for advancement?', answer: 'Yes, food production offers clear advancement paths to supervisory and management roles.' }
    ]
  },
  // Retail
  {
    id: 'retail-assistant',
    title: 'Retail Assistant',
    slug: 'retail-assistant',
    industry: 'retail',
    description: 'Retail Assistants help customers find products, process sales transactions, maintain store displays, and ensure a positive shopping experience.',
    shortDescription: 'Assist customers and manage store operations',
    avgHourlyRate: { min: 13, max: 18 },
    skills: ['Customer service', 'Communication', 'Sales', 'Cash handling', 'Product knowledge'],
    responsibilities: [
      'Greet and assist customers',
      'Process sales and returns',
      'Stock shelves and organize displays',
      'Maintain store cleanliness',
      'Answer customer questions about products'
    ],
    requirements: [
      'Strong customer service skills',
      'Basic math abilities',
      'Flexible schedule including weekends',
      'Retail or customer service experience preferred'
    ],
    careerPath: [
      { role: 'Retail Assistant', years: '0-1 years' },
      { role: 'Senior Sales Associate', years: '1-3 years' },
      { role: 'Department Supervisor', years: '3-5 years' },
      { role: 'Store Manager', years: '5+ years' }
    ],
    faqs: [
      { question: 'What stores hire retail assistants?', answer: 'All types—department stores, grocery stores, fashion retailers, electronics stores, and specialty shops.' },
      { question: 'Do retail assistants work holidays?', answer: 'Retail is busiest during holidays, so availability during peak seasons is often required.' },
      { question: 'Can this lead to management?', answer: 'Yes, many store managers started as retail assistants and advanced through consistent performance.' }
    ]
  },
  {
    id: 'merchandiser',
    title: 'Merchandiser',
    slug: 'merchandiser',
    industry: 'retail',
    description: 'Merchandisers set up product displays, arrange inventory, implement promotional materials, and ensure products are presented attractively in retail environments.',
    shortDescription: 'Create attractive product displays and arrangements',
    avgHourlyRate: { min: 14, max: 20 },
    skills: ['Visual merchandising', 'Attention to detail', 'Creativity', 'Physical stamina', 'Organization'],
    responsibilities: [
      'Set up and maintain product displays',
      'Implement planograms and promotional setups',
      'Rotate stock and check expiration dates',
      'Place signage and pricing materials',
      'Report on inventory and display status'
    ],
    requirements: [
      'Eye for visual presentation',
      'Physical ability to lift and move products',
      'Attention to detail',
      'Own transportation (for some roles)'
    ],
    careerPath: [
      { role: 'Merchandiser', years: '0-2 years' },
      { role: 'Senior Merchandiser', years: '2-4 years' },
      { role: 'Merchandising Manager', years: '4-6 years' },
      { role: 'Visual Merchandising Director', years: '6+ years' }
    ],
    faqs: [
      { question: 'What is a planogram?', answer: 'A planogram is a diagram showing where products should be placed on shelves and displays to maximize sales.' },
      { question: 'Do I need transportation?', answer: 'Many merchandiser roles require traveling between store locations, so reliable transportation is often necessary.' },
      { question: 'Is merchandising a good flexible job?', answer: 'Yes, merchandisers often have flexible schedules and work independently at various locations.' }
    ]
  },
  // Facilities Management
  {
    id: 'cleaner',
    title: 'Cleaner',
    slug: 'cleaner',
    industry: 'facilities',
    description: 'Cleaners maintain cleanliness and hygiene in commercial buildings, offices, retail spaces, and other facilities, ensuring safe and pleasant environments.',
    shortDescription: 'Maintain cleanliness in commercial spaces',
    avgHourlyRate: { min: 13, max: 18 },
    skills: ['Attention to detail', 'Time management', 'Physical stamina', 'Reliability', 'Safety awareness'],
    responsibilities: [
      'Clean and sanitize offices, restrooms, and common areas',
      'Vacuum, mop, and polish floors',
      'Empty trash and recycling bins',
      'Restock supplies (soap, paper towels, etc.)',
      'Report maintenance issues'
    ],
    requirements: [
      'Physical ability to clean for extended periods',
      'Reliability and punctuality',
      'Attention to detail',
      'Flexible scheduling'
    ],
    careerPath: [
      { role: 'Cleaner', years: '0-2 years' },
      { role: 'Senior Cleaner', years: '2-4 years' },
      { role: 'Cleaning Supervisor', years: '4-6 years' },
      { role: 'Facilities Manager', years: '6+ years' }
    ],
    faqs: [
      { question: 'What shifts are available?', answer: 'Cleaning roles often have early morning, evening, or overnight shifts when buildings are less occupied.' },
      { question: 'Do I need my own cleaning supplies?', answer: 'Most employers provide all cleaning supplies, equipment, and protective gear.' },
      { question: 'Is cleaning a stable career?', answer: 'Yes, cleaning services are always in demand, making it a reliable source of work.' }
    ]
  },
  {
    id: 'housekeeper',
    title: 'Housekeeper',
    slug: 'housekeeper',
    industry: 'facilities',
    description: 'Housekeepers clean and maintain guest rooms and public areas in hotels, resorts, and hospitality venues, ensuring guests have comfortable stays.',
    shortDescription: 'Clean and prepare rooms in hotels and hospitality venues',
    avgHourlyRate: { min: 14, max: 19 },
    skills: ['Attention to detail', 'Time management', 'Physical stamina', 'Guest service', 'Organization'],
    responsibilities: [
      'Clean and prepare guest rooms to brand standards',
      'Change linens and make beds',
      'Replenish amenities and supplies',
      'Report maintenance issues and lost items',
      'Maintain cleanliness of public areas'
    ],
    requirements: [
      'Physical stamina for active work',
      'Attention to detail',
      'Time management skills',
      'Weekend and holiday availability'
    ],
    careerPath: [
      { role: 'Room Attendant', years: '0-2 years' },
      { role: 'Senior Housekeeper', years: '2-4 years' },
      { role: 'Housekeeping Supervisor', years: '4-6 years' },
      { role: 'Executive Housekeeper', years: '6+ years' }
    ],
    faqs: [
      { question: 'How many rooms do housekeepers clean?', answer: 'Hotel housekeepers typically clean 12-16 rooms per shift, depending on the property and room type.' },
      { question: 'Do housekeepers receive tips?', answer: 'Yes, hotel guests often leave tips for housekeepers. Amounts vary but typically range from $1-5 per night.' },
      { question: 'What are typical housekeeping hours?', answer: 'Most hotel housekeeping shifts run from 8am-4pm, though schedules vary by property.' }
    ]
  }
];

export const getRolesByIndustry = (industry: string) => 
  roles.filter(role => role.industry === industry);

export const getRoleBySlug = (slug: string) => 
  roles.find(role => role.slug === slug);
