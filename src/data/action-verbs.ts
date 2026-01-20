export interface ActionVerb {
  verb: string;
  category: string;
  strength: 'strong' | 'moderate' | 'basic';
  industries: string[];
  example: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  skills: string[];
}

export interface BulletTemplate {
  id: string;
  category: string;
  template: string;
  variables: { id: string; label: string; placeholder: string; type: 'text' | 'number' }[];
  industries: string[];
}

export const actionVerbCategories = [
  { id: 'leadership', name: 'Leadership & Management', icon: '👑', color: 'bg-purple-100 text-purple-800' },
  { id: 'achievement', name: 'Achievement & Results', icon: '🏆', color: 'bg-amber-100 text-amber-800' },
  { id: 'communication', name: 'Communication', icon: '💬', color: 'bg-blue-100 text-blue-800' },
  { id: 'technical', name: 'Technical & Operations', icon: '⚙️', color: 'bg-slate-100 text-slate-800' },
  { id: 'problem-solving', name: 'Problem Solving', icon: '🧩', color: 'bg-green-100 text-green-800' },
  { id: 'customer-service', name: 'Customer Service', icon: '🤝', color: 'bg-rose-100 text-rose-800' },
  { id: 'efficiency', name: 'Efficiency & Process', icon: '⚡', color: 'bg-orange-100 text-orange-800' },
  { id: 'safety', name: 'Safety & Compliance', icon: '🛡️', color: 'bg-teal-100 text-teal-800' }
];

export const actionVerbs: ActionVerb[] = [
  // Leadership & Management (30+)
  { verb: 'Led', category: 'leadership', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Led team of 12 warehouse associates to achieve 105% of daily targets' },
  { verb: 'Managed', category: 'leadership', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Managed inventory control for 5,000+ SKU warehouse facility' },
  { verb: 'Supervised', category: 'leadership', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Supervised shift operations for 15-person night crew' },
  { verb: 'Directed', category: 'leadership', strength: 'strong', industries: ['industrial', 'hospitality'], example: 'Directed loading dock operations during peak holiday season' },
  { verb: 'Coordinated', category: 'leadership', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Coordinated with 5 departments to ensure seamless order fulfillment' },
  { verb: 'Delegated', category: 'leadership', strength: 'moderate', industries: ['industrial', 'hospitality', 'retail'], example: 'Delegated daily tasks to optimize team productivity by 20%' },
  { verb: 'Mentored', category: 'leadership', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Mentored 8 new hires, reducing onboarding time by 25%' },
  { verb: 'Trained', category: 'leadership', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Trained 25+ associates on RF scanner and WMS systems' },
  { verb: 'Coached', category: 'leadership', strength: 'moderate', industries: ['hospitality', 'retail'], example: 'Coached team members to improve customer satisfaction scores by 15%' },
  { verb: 'Motivated', category: 'leadership', strength: 'moderate', industries: ['industrial', 'hospitality', 'retail'], example: 'Motivated team to exceed monthly targets for 6 consecutive months' },
  { verb: 'Oversaw', category: 'leadership', strength: 'strong', industries: ['industrial', 'hospitality'], example: 'Oversaw daily operations of 50,000 sq ft distribution center' },
  { verb: 'Spearheaded', category: 'leadership', strength: 'strong', industries: ['industrial', 'hospitality'], example: 'Spearheaded safety initiative reducing workplace incidents by 40%' },
  { verb: 'Championed', category: 'leadership', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Championed new inventory system, saving 10 hours weekly' },
  { verb: 'Guided', category: 'leadership', strength: 'moderate', industries: ['hospitality', 'retail'], example: 'Guided guests through venue with 100% positive feedback' },
  { verb: 'Organized', category: 'leadership', strength: 'moderate', industries: ['industrial', 'hospitality', 'retail'], example: 'Organized workflow schedules for 20-person team' },

  // Achievement & Results (35+)
  { verb: 'Achieved', category: 'achievement', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Achieved 99.8% order accuracy over 12-month period' },
  { verb: 'Exceeded', category: 'achievement', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Exceeded daily pick rate targets by 30% consistently' },
  { verb: 'Surpassed', category: 'achievement', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Surpassed sales goals by $15,000 in Q4' },
  { verb: 'Increased', category: 'achievement', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Increased throughput by 25% through process improvements' },
  { verb: 'Improved', category: 'achievement', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Improved customer satisfaction ratings from 3.8 to 4.7 stars' },
  { verb: 'Boosted', category: 'achievement', strength: 'strong', industries: ['hospitality', 'retail'], example: 'Boosted repeat customer rate by 35% through exceptional service' },
  { verb: 'Generated', category: 'achievement', strength: 'strong', industries: ['hospitality', 'retail'], example: 'Generated $50,000+ in monthly beverage sales' },
  { verb: 'Delivered', category: 'achievement', strength: 'strong', industries: ['industrial', 'hospitality'], example: 'Delivered 200+ packages daily with zero damage claims' },
  { verb: 'Completed', category: 'achievement', strength: 'moderate', industries: ['industrial', 'hospitality', 'retail'], example: 'Completed 150+ orders per shift with 99.5% accuracy' },
  { verb: 'Accomplished', category: 'achievement', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Accomplished record-breaking sales during holiday season' },
  { verb: 'Earned', category: 'achievement', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Earned Employee of the Month 3 times in 12 months' },
  { verb: 'Attained', category: 'achievement', strength: 'moderate', industries: ['industrial', 'hospitality', 'retail'], example: 'Attained forklift certification within first month' },
  { verb: 'Won', category: 'achievement', strength: 'strong', industries: ['hospitality', 'retail'], example: 'Won quarterly sales competition against 50+ associates' },
  { verb: 'Outperformed', category: 'achievement', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Outperformed peers by 40% in units processed per hour' },
  { verb: 'Maximized', category: 'achievement', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Maximized storage capacity, adding 500+ pallet positions' },
  { verb: 'Doubled', category: 'achievement', strength: 'strong', industries: ['hospitality', 'retail'], example: 'Doubled average check size through strategic upselling' },
  { verb: 'Tripled', category: 'achievement', strength: 'strong', industries: ['hospitality', 'retail'], example: 'Tripled wine sales through staff education program' },

  // Communication (25+)
  { verb: 'Communicated', category: 'communication', strength: 'moderate', industries: ['industrial', 'hospitality', 'retail'], example: 'Communicated shift updates to 30+ team members daily' },
  { verb: 'Presented', category: 'communication', strength: 'strong', industries: ['hospitality', 'retail'], example: 'Presented daily specials to 100+ guests per shift' },
  { verb: 'Collaborated', category: 'communication', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Collaborated with cross-functional teams on inventory projects' },
  { verb: 'Negotiated', category: 'communication', strength: 'strong', industries: ['retail'], example: 'Negotiated vendor pricing, saving 15% on supplies' },
  { verb: 'Explained', category: 'communication', strength: 'moderate', industries: ['hospitality', 'retail'], example: 'Explained menu items and allergen information to guests' },
  { verb: 'Reported', category: 'communication', strength: 'moderate', industries: ['industrial', 'hospitality'], example: 'Reported daily metrics and safety concerns to management' },
  { verb: 'Documented', category: 'communication', strength: 'moderate', industries: ['industrial', 'hospitality'], example: 'Documented inventory discrepancies and resolved within 24 hours' },
  { verb: 'Translated', category: 'communication', strength: 'strong', industries: ['hospitality', 'retail'], example: 'Translated for Spanish-speaking customers, improving service access' },
  { verb: 'Briefed', category: 'communication', strength: 'moderate', industries: ['industrial', 'hospitality'], example: 'Briefed incoming shift on pending orders and priorities' },
  { verb: 'Addressed', category: 'communication', strength: 'moderate', industries: ['hospitality', 'retail'], example: 'Addressed customer concerns with 95% first-contact resolution' },
  { verb: 'Liaised', category: 'communication', strength: 'strong', industries: ['industrial', 'hospitality'], example: 'Liaised between kitchen and front-of-house during peak hours' },
  { verb: 'Informed', category: 'communication', strength: 'basic', industries: ['industrial', 'hospitality', 'retail'], example: 'Informed guests of wait times and menu changes' },
  { verb: 'Advised', category: 'communication', strength: 'moderate', industries: ['hospitality', 'retail'], example: 'Advised customers on product selection, increasing basket size' },

  // Technical & Operations (35+)
  { verb: 'Operated', category: 'technical', strength: 'strong', industries: ['industrial'], example: 'Operated sit-down and stand-up forklifts for 8-hour shifts' },
  { verb: 'Processed', category: 'technical', strength: 'strong', industries: ['industrial', 'retail'], example: 'Processed 200+ orders daily using RF scanning technology' },
  { verb: 'Maintained', category: 'technical', strength: 'strong', industries: ['industrial', 'facilities'], example: 'Maintained equipment uptime of 99% through preventive checks' },
  { verb: 'Assembled', category: 'technical', strength: 'moderate', industries: ['industrial'], example: 'Assembled 75+ units per hour meeting quality standards' },
  { verb: 'Loaded', category: 'technical', strength: 'moderate', industries: ['industrial'], example: 'Loaded 15+ trucks daily with zero damage incidents' },
  { verb: 'Unloaded', category: 'technical', strength: 'moderate', industries: ['industrial'], example: 'Unloaded 40-foot containers within 2-hour window' },
  { verb: 'Sorted', category: 'technical', strength: 'moderate', industries: ['industrial'], example: 'Sorted 1,000+ packages per hour with 99.9% accuracy' },
  { verb: 'Packed', category: 'technical', strength: 'moderate', industries: ['industrial'], example: 'Packed fragile items with zero damage claims over 6 months' },
  { verb: 'Picked', category: 'technical', strength: 'moderate', industries: ['industrial'], example: 'Picked 180+ units per hour, exceeding target by 20%' },
  { verb: 'Scanned', category: 'technical', strength: 'basic', industries: ['industrial', 'retail'], example: 'Scanned and verified shipments for inventory accuracy' },
  { verb: 'Stocked', category: 'technical', strength: 'moderate', industries: ['retail'], example: 'Stocked 500+ items nightly maintaining planogram standards' },
  { verb: 'Prepared', category: 'technical', strength: 'moderate', industries: ['hospitality'], example: 'Prepared 300+ food items during high-volume brunch service' },
  { verb: 'Executed', category: 'technical', strength: 'strong', industries: ['industrial', 'hospitality'], example: 'Executed complex multi-course service for VIP events' },
  { verb: 'Calibrated', category: 'technical', strength: 'strong', industries: ['industrial'], example: 'Calibrated production equipment to maintain quality standards' },
  { verb: 'Configured', category: 'technical', strength: 'moderate', industries: ['industrial'], example: 'Configured warehouse management system for new product lines' },
  { verb: 'Installed', category: 'technical', strength: 'moderate', industries: ['industrial', 'facilities'], example: 'Installed shelving systems increasing storage by 30%' },
  { verb: 'Repaired', category: 'technical', strength: 'moderate', industries: ['industrial', 'facilities'], example: 'Repaired conveyor systems minimizing downtime to 15 minutes' },
  { verb: 'Inventoried', category: 'technical', strength: 'moderate', industries: ['industrial', 'retail'], example: 'Inventoried 10,000+ SKUs during quarterly cycle count' },
  { verb: 'Dispatched', category: 'technical', strength: 'moderate', industries: ['industrial'], example: 'Dispatched 50+ shipments daily meeting carrier deadlines' },

  // Problem Solving (25+)
  { verb: 'Resolved', category: 'problem-solving', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Resolved inventory discrepancies saving $10,000 in losses' },
  { verb: 'Troubleshot', category: 'problem-solving', strength: 'strong', industries: ['industrial'], example: 'Troubleshot equipment malfunctions reducing downtime by 50%' },
  { verb: 'Identified', category: 'problem-solving', strength: 'moderate', industries: ['industrial', 'hospitality', 'retail'], example: 'Identified bottleneck in picking process, improving flow by 25%' },
  { verb: 'Analyzed', category: 'problem-solving', strength: 'strong', industries: ['industrial', 'retail'], example: 'Analyzed sales data to optimize inventory levels' },
  { verb: 'Diagnosed', category: 'problem-solving', strength: 'strong', industries: ['industrial'], example: 'Diagnosed recurring equipment issues, preventing costly repairs' },
  { verb: 'Investigated', category: 'problem-solving', strength: 'moderate', industries: ['industrial', 'retail'], example: 'Investigated shrinkage causes, reducing loss by 40%' },
  { verb: 'Solved', category: 'problem-solving', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Solved scheduling conflicts ensuring 100% shift coverage' },
  { verb: 'Adapted', category: 'problem-solving', strength: 'moderate', industries: ['industrial', 'hospitality', 'retail'], example: 'Adapted quickly to new WMS system within 2 days' },
  { verb: 'Overcame', category: 'problem-solving', strength: 'strong', industries: ['industrial', 'hospitality'], example: 'Overcame language barriers to train diverse team effectively' },
  { verb: 'Prevented', category: 'problem-solving', strength: 'strong', industries: ['industrial', 'facilities'], example: 'Prevented equipment failures through proactive maintenance' },
  { verb: 'Corrected', category: 'problem-solving', strength: 'moderate', industries: ['industrial', 'hospitality'], example: 'Corrected order errors before shipment, maintaining accuracy' },
  { verb: 'Mitigated', category: 'problem-solving', strength: 'strong', industries: ['industrial'], example: 'Mitigated supply chain disruptions through vendor diversification' },

  // Customer Service (25+)
  { verb: 'Assisted', category: 'customer-service', strength: 'moderate', industries: ['hospitality', 'retail'], example: 'Assisted 100+ customers daily with product inquiries' },
  { verb: 'Served', category: 'customer-service', strength: 'moderate', industries: ['hospitality'], example: 'Served 80+ covers per shift in fine dining environment' },
  { verb: 'Greeted', category: 'customer-service', strength: 'basic', industries: ['hospitality', 'retail'], example: 'Greeted and seated guests within 60 seconds of arrival' },
  { verb: 'Welcomed', category: 'customer-service', strength: 'basic', industries: ['hospitality', 'retail'], example: 'Welcomed guests creating positive first impressions' },
  { verb: 'Recommended', category: 'customer-service', strength: 'moderate', industries: ['hospitality', 'retail'], example: 'Recommended wine pairings increasing average ticket by $25' },
  { verb: 'Upsold', category: 'customer-service', strength: 'strong', industries: ['hospitality', 'retail'], example: 'Upsold premium products, increasing revenue by 15%' },
  { verb: 'Satisfied', category: 'customer-service', strength: 'moderate', industries: ['hospitality', 'retail'], example: 'Satisfied guest requests with 98% positive feedback' },
  { verb: 'Delighted', category: 'customer-service', strength: 'strong', industries: ['hospitality'], example: 'Delighted guests with personalized service and attention' },
  { verb: 'Retained', category: 'customer-service', strength: 'strong', industries: ['hospitality', 'retail'], example: 'Retained upset customers through conflict resolution' },
  { verb: 'Supported', category: 'customer-service', strength: 'moderate', industries: ['hospitality', 'retail'], example: 'Supported team members during high-volume periods' },
  { verb: 'Accommodated', category: 'customer-service', strength: 'moderate', industries: ['hospitality'], example: 'Accommodated dietary restrictions and special requests' },
  { verb: 'Anticipated', category: 'customer-service', strength: 'strong', industries: ['hospitality'], example: 'Anticipated guest needs, refilling drinks proactively' },

  // Efficiency & Process (25+)
  { verb: 'Streamlined', category: 'efficiency', strength: 'strong', industries: ['industrial', 'hospitality'], example: 'Streamlined picking routes, reducing travel time by 30%' },
  { verb: 'Optimized', category: 'efficiency', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Optimized inventory layout increasing picks per hour by 25%' },
  { verb: 'Accelerated', category: 'efficiency', strength: 'strong', industries: ['industrial'], example: 'Accelerated order fulfillment from 24 to 12 hours' },
  { verb: 'Reduced', category: 'efficiency', strength: 'strong', industries: ['industrial', 'hospitality', 'retail'], example: 'Reduced order processing time by 40% through batch picking' },
  { verb: 'Eliminated', category: 'efficiency', strength: 'strong', industries: ['industrial'], example: 'Eliminated redundant steps saving 2 hours per shift' },
  { verb: 'Minimized', category: 'efficiency', strength: 'strong', industries: ['industrial', 'facilities'], example: 'Minimized waste by 20% through improved prep techniques' },
  { verb: 'Consolidated', category: 'efficiency', strength: 'moderate', industries: ['industrial'], example: 'Consolidated shipments reducing freight costs by 15%' },
  { verb: 'Standardized', category: 'efficiency', strength: 'moderate', industries: ['industrial', 'hospitality'], example: 'Standardized procedures for consistent quality output' },
  { verb: 'Automated', category: 'efficiency', strength: 'strong', industries: ['industrial'], example: 'Automated inventory tracking reducing manual counts by 80%' },
  { verb: 'Simplified', category: 'efficiency', strength: 'moderate', industries: ['industrial', 'hospitality'], example: 'Simplified training process, reducing onboarding to 3 days' },
  { verb: 'Expedited', category: 'efficiency', strength: 'strong', industries: ['industrial', 'hospitality'], example: 'Expedited rush orders meeting 100% of urgent deadlines' },
  { verb: 'Prioritized', category: 'efficiency', strength: 'moderate', industries: ['industrial', 'hospitality', 'retail'], example: 'Prioritized high-value orders ensuring VIP satisfaction' },

  // Safety & Compliance (20+)
  { verb: 'Ensured', category: 'safety', strength: 'strong', industries: ['industrial', 'hospitality', 'facilities'], example: 'Ensured 100% compliance with OSHA safety standards' },
  { verb: 'Enforced', category: 'safety', strength: 'strong', industries: ['industrial', 'hospitality'], example: 'Enforced food safety protocols maintaining A health rating' },
  { verb: 'Inspected', category: 'safety', strength: 'moderate', industries: ['industrial', 'facilities'], example: 'Inspected equipment daily preventing safety incidents' },
  { verb: 'Verified', category: 'safety', strength: 'moderate', industries: ['industrial', 'hospitality'], example: 'Verified temperature logs ensuring food safety compliance' },
  { verb: 'Implemented', category: 'safety', strength: 'strong', industries: ['industrial', 'hospitality', 'facilities'], example: 'Implemented new safety protocols reducing incidents by 50%' },
  { verb: 'Monitored', category: 'safety', strength: 'moderate', industries: ['industrial', 'hospitality', 'facilities'], example: 'Monitored workplace for hazards throughout shift' },
  { verb: 'Audited', category: 'safety', strength: 'strong', industries: ['industrial', 'hospitality'], example: 'Audited safety procedures identifying 12 improvement areas' },
  { verb: 'Certified', category: 'safety', strength: 'moderate', industries: ['industrial', 'hospitality'], example: 'Certified in forklift operation and safety procedures' },
  { verb: 'Secured', category: 'safety', strength: 'moderate', industries: ['industrial', 'retail'], example: 'Secured facility at shift end following all protocols' },
  { verb: 'Sanitized', category: 'safety', strength: 'moderate', industries: ['hospitality', 'facilities'], example: 'Sanitized work stations meeting health department standards' },
  { verb: 'Complied', category: 'safety', strength: 'moderate', industries: ['industrial', 'hospitality', 'facilities'], example: 'Complied with all company and regulatory safety requirements' },
  { verb: 'Protected', category: 'safety', strength: 'moderate', industries: ['industrial', 'facilities'], example: 'Protected inventory from damage through proper handling' }
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'warehouse',
    name: 'Warehouse & Logistics',
    icon: '📦',
    description: 'Essential skills for warehouse, distribution, and logistics roles',
    skills: [
      'RF Scanner/Gun Operation', 'Forklift Certified (Sit-down)', 'Forklift Certified (Stand-up)', 
      'Forklift Certified (Reach Truck)', 'Pallet Jack Operation', 'Order Picking', 'Packing & Shipping',
      'Inventory Management', 'Cycle Counting', 'WMS (Warehouse Management System)', 'Receiving & Put-away',
      'Loading/Unloading', 'Quality Control Inspection', 'Cross-docking', 'Batch Picking', 'Wave Picking',
      'Zone Picking', 'FIFO/LIFO Inventory', 'Barcode Scanning', 'Shipping Label Creation', 'Freight Handling',
      'Pallet Building', 'Shrink Wrapping', 'Heavy Lifting (50+ lbs)', 'Hand Truck Operation'
    ]
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Food Service',
    icon: '🍽️',
    description: 'Skills for restaurant, catering, and event service positions',
    skills: [
      'Food Handler Certified', 'ServSafe Certified', 'TIPS Certified', 'Fine Dining Service',
      'Casual Dining Service', 'Banquet Service', 'Buffet Setup', 'Table Setting', 'Wine Service',
      'Cocktail Preparation', 'Beer/Draft Service', 'POS Systems (Toast, Aloha, Micros)', 'Cash Handling',
      'Credit Card Processing', 'Menu Knowledge', 'Allergen Awareness', 'Upselling Techniques',
      'Guest Relations', 'Reservation Management', 'Event Setup/Breakdown', 'Food Running',
      'Bussing Tables', 'Bartending', 'Barista Skills', 'Food Preparation', 'Line Cooking',
      'Prep Cooking', 'Dishwashing', 'Kitchen Sanitation', 'Plate Presentation'
    ]
  },
  {
    id: 'retail',
    name: 'Retail & Sales',
    icon: '🛒',
    description: 'Customer-facing and operational retail skills',
    skills: [
      'POS Operation', 'Cash Handling', 'Credit Card Processing', 'Customer Service Excellence',
      'Product Knowledge', 'Merchandising', 'Planogram Compliance', 'Inventory Replenishment',
      'Stock Room Organization', 'Loss Prevention Awareness', 'Visual Displays', 'Price Tagging',
      'Returns Processing', 'Gift Wrapping', 'Loyalty Programs', 'Upselling/Cross-selling',
      'Fitting Room Assistance', 'Product Demonstrations', 'Sales Floor Recovery', 'Opening/Closing Procedures',
      'Inventory Receiving', 'Shipment Processing', 'Customer Complaint Resolution', 'Multilingual Service'
    ]
  },
  {
    id: 'facilities',
    name: 'Facilities & Cleaning',
    icon: '🧹',
    description: 'Commercial cleaning and facilities maintenance skills',
    skills: [
      'Commercial Cleaning', 'Floor Care (Mopping, Sweeping)', 'Floor Machine Operation',
      'Carpet Cleaning', 'Window Cleaning', 'Restroom Sanitation', 'Trash/Recycling Management',
      'Biohazard Cleanup', 'Chemical Safety (MSDS/SDS)', 'Disinfection Protocols', 'Pressure Washing',
      'Supply Inventory', 'Preventive Maintenance', 'Minor Repairs', 'HVAC Filter Changes',
      'Light Bulb Replacement', 'Furniture Moving', 'Event Setup/Breakdown', 'Snow Removal',
      'Landscaping Basics', 'Safety Inspection', 'Lock-up Procedures'
    ]
  },
  {
    id: 'soft-skills',
    name: 'Soft Skills',
    icon: '🤝',
    description: 'Transferable interpersonal and professional skills',
    skills: [
      'Time Management', 'Punctuality', 'Reliability', 'Teamwork', 'Communication', 'Problem Solving',
      'Adaptability', 'Attention to Detail', 'Work Ethic', 'Self-Motivation', 'Stress Management',
      'Conflict Resolution', 'Multitasking', 'Organization', 'Leadership', 'Following Instructions',
      'Taking Initiative', 'Physical Stamina', 'Flexibility', 'Positive Attitude', 'Quick Learning',
      'Cultural Sensitivity', 'Professional Demeanor', 'Safety Consciousness', 'Dependability'
    ]
  },
  {
    id: 'certifications',
    name: 'Certifications & Training',
    icon: '📜',
    description: 'Industry certifications that boost your resume',
    skills: [
      'Forklift Certification', 'OSHA 10-Hour', 'OSHA 30-Hour', 'ServSafe Food Handler',
      'ServSafe Manager', 'TIPS Alcohol Training', 'CPR/First Aid', 'AED Certification',
      'Hazmat Training', 'Bloodborne Pathogens', 'Lock-out/Tag-out (LOTO)', 'Confined Space Entry',
      'Fall Protection', 'Fire Safety', 'Food Allergen Awareness', 'Responsible Beverage Service',
      'Customer Service Certification', 'Lean/Six Sigma Basics', 'Quality Control Training'
    ]
  }
];

export const bulletTemplates: BulletTemplate[] = [
  // Warehouse/Industrial
  {
    id: 'pick-rate',
    category: 'warehouse',
    template: 'Processed {units} orders daily with {accuracy}% accuracy, exceeding target by {percent}%',
    variables: [
      { id: 'units', label: 'Orders per day', placeholder: '150', type: 'number' },
      { id: 'accuracy', label: 'Accuracy %', placeholder: '99.5', type: 'number' },
      { id: 'percent', label: '% above target', placeholder: '20', type: 'number' }
    ],
    industries: ['industrial']
  },
  {
    id: 'forklift-safety',
    category: 'warehouse',
    template: 'Operated {type} forklift for {hours}+ hours with zero safety incidents over {months} months',
    variables: [
      { id: 'type', label: 'Forklift type', placeholder: 'sit-down', type: 'text' },
      { id: 'hours', label: 'Total hours', placeholder: '1,000', type: 'text' },
      { id: 'months', label: 'Months', placeholder: '12', type: 'number' }
    ],
    industries: ['industrial']
  },
  {
    id: 'team-training',
    category: 'warehouse',
    template: 'Trained {count} new team members on {skill}, reducing onboarding time by {percent}%',
    variables: [
      { id: 'count', label: 'People trained', placeholder: '8', type: 'number' },
      { id: 'skill', label: 'Skill/system', placeholder: 'RF scanner operations', type: 'text' },
      { id: 'percent', label: '% time saved', placeholder: '25', type: 'number' }
    ],
    industries: ['industrial', 'hospitality', 'retail']
  },
  {
    id: 'inventory-accuracy',
    category: 'warehouse',
    template: 'Maintained {accuracy}% inventory accuracy across {sku}+ SKUs through meticulous cycle counting',
    variables: [
      { id: 'accuracy', label: 'Accuracy %', placeholder: '99.8', type: 'number' },
      { id: 'sku', label: 'Number of SKUs', placeholder: '5,000', type: 'text' }
    ],
    industries: ['industrial', 'retail']
  },
  {
    id: 'loading-efficiency',
    category: 'warehouse',
    template: 'Loaded {trucks} trucks daily, processing {pallets}+ pallets with zero damage claims',
    variables: [
      { id: 'trucks', label: 'Trucks per day', placeholder: '15', type: 'number' },
      { id: 'pallets', label: 'Pallets handled', placeholder: '200', type: 'number' }
    ],
    industries: ['industrial']
  },

  // Hospitality
  {
    id: 'guest-service',
    category: 'hospitality',
    template: 'Served {covers} covers per shift in {type} environment with {rating} customer satisfaction',
    variables: [
      { id: 'covers', label: 'Covers per shift', placeholder: '80', type: 'number' },
      { id: 'type', label: 'Restaurant type', placeholder: 'fine dining', type: 'text' },
      { id: 'rating', label: 'Satisfaction rating', placeholder: '4.9/5', type: 'text' }
    ],
    industries: ['hospitality']
  },
  {
    id: 'upselling',
    category: 'hospitality',
    template: 'Increased average check by ${amount} through strategic {technique} techniques',
    variables: [
      { id: 'amount', label: 'Dollar increase', placeholder: '25', type: 'number' },
      { id: 'technique', label: 'Technique used', placeholder: 'wine pairing and dessert', type: 'text' }
    ],
    industries: ['hospitality', 'retail']
  },
  {
    id: 'event-service',
    category: 'hospitality',
    template: 'Executed service for {guests}+ guest events including {type}, receiving {feedback} feedback',
    variables: [
      { id: 'guests', label: 'Guest count', placeholder: '500', type: 'number' },
      { id: 'type', label: 'Event types', placeholder: 'weddings and corporate galas', type: 'text' },
      { id: 'feedback', label: 'Feedback quality', placeholder: '100% positive', type: 'text' }
    ],
    industries: ['hospitality']
  },
  {
    id: 'bar-sales',
    category: 'hospitality',
    template: 'Generated ${amount}+ in monthly beverage sales while maintaining {pour} pour accuracy',
    variables: [
      { id: 'amount', label: 'Monthly sales', placeholder: '50,000', type: 'text' },
      { id: 'pour', label: 'Pour accuracy %', placeholder: '98', type: 'number' }
    ],
    industries: ['hospitality']
  },
  {
    id: 'food-prep',
    category: 'hospitality',
    template: 'Prepared {items}+ menu items during {period} service with consistent quality and timing',
    variables: [
      { id: 'items', label: 'Items prepared', placeholder: '300', type: 'number' },
      { id: 'period', label: 'Service period', placeholder: 'high-volume brunch', type: 'text' }
    ],
    industries: ['hospitality']
  },

  // Retail
  {
    id: 'sales-target',
    category: 'retail',
    template: 'Exceeded sales targets by {percent}% generating ${amount}+ in monthly revenue',
    variables: [
      { id: 'percent', label: '% above target', placeholder: '25', type: 'number' },
      { id: 'amount', label: 'Monthly revenue', placeholder: '15,000', type: 'text' }
    ],
    industries: ['retail']
  },
  {
    id: 'customer-assist',
    category: 'retail',
    template: 'Assisted {count}+ customers daily with {focus}, achieving {rating} satisfaction scores',
    variables: [
      { id: 'count', label: 'Customers per day', placeholder: '100', type: 'number' },
      { id: 'focus', label: 'Service focus', placeholder: 'product selection and sizing', type: 'text' },
      { id: 'rating', label: 'Satisfaction score', placeholder: '95%', type: 'text' }
    ],
    industries: ['retail']
  },
  {
    id: 'inventory-restock',
    category: 'retail',
    template: 'Restocked {items}+ items nightly maintaining {compliance}% planogram compliance',
    variables: [
      { id: 'items', label: 'Items restocked', placeholder: '500', type: 'number' },
      { id: 'compliance', label: 'Compliance %', placeholder: '100', type: 'number' }
    ],
    industries: ['retail']
  },

  // Facilities
  {
    id: 'cleaning-area',
    category: 'facilities',
    template: 'Maintained {sqft} sq ft facility to {standard} standards with {rating} inspection scores',
    variables: [
      { id: 'sqft', label: 'Square footage', placeholder: '50,000', type: 'text' },
      { id: 'standard', label: 'Standard level', placeholder: 'hospital-grade', type: 'text' },
      { id: 'rating', label: 'Inspection rating', placeholder: '100%', type: 'text' }
    ],
    industries: ['facilities']
  },
  {
    id: 'safety-record',
    category: 'facilities',
    template: 'Maintained {days}+ days without safety incidents while handling {chemicals} chemicals daily',
    variables: [
      { id: 'days', label: 'Incident-free days', placeholder: '365', type: 'number' },
      { id: 'chemicals', label: 'Chemical types', placeholder: 'industrial cleaning', type: 'text' }
    ],
    industries: ['facilities', 'industrial']
  },

  // General/Transferable
  {
    id: 'attendance',
    category: 'general',
    template: 'Maintained {percent}% attendance record over {months} months with {ontime}% on-time arrival',
    variables: [
      { id: 'percent', label: 'Attendance %', placeholder: '98', type: 'number' },
      { id: 'months', label: 'Months', placeholder: '12', type: 'number' },
      { id: 'ontime', label: 'On-time %', placeholder: '100', type: 'number' }
    ],
    industries: ['industrial', 'hospitality', 'retail', 'facilities']
  },
  {
    id: 'flex-rating',
    category: 'general',
    template: 'Earned {rating} Indeed Flex rating across {shifts}+ completed shifts with {invite}+ talent pool invitations',
    variables: [
      { id: 'rating', label: 'Star rating', placeholder: '4.9', type: 'text' },
      { id: 'shifts', label: 'Shifts completed', placeholder: '200', type: 'number' },
      { id: 'invite', label: 'Pool invitations', placeholder: '12', type: 'number' }
    ],
    industries: ['industrial', 'hospitality', 'retail', 'facilities']
  },
  {
    id: 'employee-award',
    category: 'general',
    template: 'Recognized as Employee of the {period} {count} times for {reason}',
    variables: [
      { id: 'period', label: 'Award period', placeholder: 'Month', type: 'text' },
      { id: 'count', label: 'Times awarded', placeholder: '3', type: 'number' },
      { id: 'reason', label: 'Recognition reason', placeholder: 'exceeding performance metrics', type: 'text' }
    ],
    industries: ['industrial', 'hospitality', 'retail', 'facilities']
  }
];
