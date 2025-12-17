export interface JobPhrase {
  id: string;
  english: string;
  spanish: string;
  phonetic: string;
  category: 'safety' | 'tasks' | 'questions' | 'breaks' | 'equipment' | 'greetings' | 'numbers';
  context: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface IndustryVocabulary {
  id: string;
  name: string;
  nameSpanish: string;
  icon: string;
  description: string;
  descriptionSpanish: string;
  phrases: JobPhrase[];
}

export const industries: IndustryVocabulary[] = [
  {
    id: 'warehouse',
    name: 'Warehouse',
    nameSpanish: 'Almacén',
    icon: '📦',
    description: 'Essential phrases for warehouse and logistics work',
    descriptionSpanish: 'Frases esenciales para trabajo en almacén y logística',
    phrases: [
      // Safety - Critical First
      { id: 'w1', english: 'Watch out!', spanish: '¡Cuidado!', phonetic: 'wach aut', category: 'safety', context: 'Warning someone of danger', difficulty: 'beginner' },
      { id: 'w2', english: 'Stop the machine', spanish: 'Para la máquina', phonetic: 'stop de mah-sheen', category: 'safety', context: 'Emergency stop command', difficulty: 'beginner' },
      { id: 'w3', english: 'Wear your safety vest', spanish: 'Ponte el chaleco de seguridad', phonetic: 'wer yor sef-ti vest', category: 'safety', context: 'Safety equipment reminder', difficulty: 'beginner' },
      { id: 'w4', english: 'Put on your hard hat', spanish: 'Ponte el casco', phonetic: 'put on yor hard hat', category: 'safety', context: 'Head protection required', difficulty: 'beginner' },
      { id: 'w5', english: 'Forklift coming through', spanish: 'Montacargas pasando', phonetic: 'fork-lift kom-ing thru', category: 'safety', context: 'Warning of forklift movement', difficulty: 'intermediate' },
      { id: 'w6', english: 'This area is restricted', spanish: 'Esta área está restringida', phonetic: 'dis eh-ree-ah iz ree-strikt-ed', category: 'safety', context: 'No entry zone', difficulty: 'intermediate' },
      
      // Tasks
      { id: 'w7', english: 'Stack the boxes here', spanish: 'Apila las cajas aquí', phonetic: 'stak de boks-es hir', category: 'tasks', context: 'Instruction for organizing', difficulty: 'beginner' },
      { id: 'w8', english: 'Take this to aisle five', spanish: 'Lleva esto al pasillo cinco', phonetic: 'teik dis tu ail faiv', category: 'tasks', context: 'Moving items', difficulty: 'beginner' },
      { id: 'w9', english: 'Scan the barcode', spanish: 'Escanea el código de barras', phonetic: 'skan de bar-kohd', category: 'tasks', context: 'Inventory tracking', difficulty: 'beginner' },
      { id: 'w10', english: 'Load the truck', spanish: 'Carga el camión', phonetic: 'lohd de trok', category: 'tasks', context: 'Shipping preparation', difficulty: 'beginner' },
      { id: 'w11', english: 'Unload the pallet', spanish: 'Descarga la tarima', phonetic: 'un-lohd de pal-et', category: 'tasks', context: 'Receiving goods', difficulty: 'beginner' },
      { id: 'w12', english: 'Check the inventory', spanish: 'Revisa el inventario', phonetic: 'chek de in-ven-tor-ee', category: 'tasks', context: 'Stock counting', difficulty: 'intermediate' },
      { id: 'w13', english: 'Wrap the pallet', spanish: 'Envuelve la tarima', phonetic: 'rap de pal-et', category: 'tasks', context: 'Securing shipments', difficulty: 'intermediate' },
      
      // Questions
      { id: 'w14', english: 'Where is the bathroom?', spanish: '¿Dónde está el baño?', phonetic: 'wer iz de bath-room', category: 'questions', context: 'Finding facilities', difficulty: 'beginner' },
      { id: 'w15', english: 'What time is break?', spanish: '¿A qué hora es el descanso?', phonetic: 'wat taim iz breik', category: 'questions', context: 'Schedule inquiry', difficulty: 'beginner' },
      { id: 'w16', english: 'Can you help me?', spanish: '¿Puedes ayudarme?', phonetic: 'kan yu help mi', category: 'questions', context: 'Asking for assistance', difficulty: 'beginner' },
      { id: 'w17', english: 'Where does this go?', spanish: '¿Dónde va esto?', phonetic: 'wer doz dis goh', category: 'questions', context: 'Asking about placement', difficulty: 'beginner' },
      { id: 'w18', english: 'How many do you need?', spanish: '¿Cuántos necesitas?', phonetic: 'hau men-ee du yu nid', category: 'questions', context: 'Quantity confirmation', difficulty: 'intermediate' },
      
      // Breaks
      { id: 'w19', english: "I'm going on break", spanish: 'Voy a descanso', phonetic: 'aim goh-ing on breik', category: 'breaks', context: 'Informing supervisor', difficulty: 'beginner' },
      { id: 'w20', english: "Break time is over", spanish: 'Se acabó el descanso', phonetic: 'breik taim iz oh-ver', category: 'breaks', context: 'Return to work signal', difficulty: 'beginner' },
      { id: 'w21', english: 'Lunch is at noon', spanish: 'El almuerzo es al mediodía', phonetic: 'lonch iz at noon', category: 'breaks', context: 'Schedule information', difficulty: 'beginner' },
      
      // Equipment
      { id: 'w22', english: 'The scanner is broken', spanish: 'El escáner está roto', phonetic: 'de skan-er iz broh-ken', category: 'equipment', context: 'Reporting equipment issues', difficulty: 'intermediate' },
      { id: 'w23', english: 'I need a pallet jack', spanish: 'Necesito un patín', phonetic: 'ai nid ah pal-et jak', category: 'equipment', context: 'Requesting equipment', difficulty: 'intermediate' },
      { id: 'w24', english: 'The conveyor belt stopped', spanish: 'La banda transportadora se detuvo', phonetic: 'de kon-vey-or belt stopt', category: 'equipment', context: 'Reporting malfunction', difficulty: 'advanced' },
    ]
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    nameSpanish: 'Hospitalidad',
    icon: '🍽️',
    description: 'Phrases for kitchen, service, and event work',
    descriptionSpanish: 'Frases para cocina, servicio y eventos',
    phrases: [
      // Safety
      { id: 'h1', english: 'Hot plate, be careful!', spanish: '¡Plato caliente, cuidado!', phonetic: 'hot pleit, bi ker-ful', category: 'safety', context: 'Warning about hot items', difficulty: 'beginner' },
      { id: 'h2', english: 'Wet floor, watch your step', spanish: 'Piso mojado, cuidado al caminar', phonetic: 'wet flor, wach yor step', category: 'safety', context: 'Slip hazard warning', difficulty: 'beginner' },
      { id: 'h3', english: 'Wash your hands', spanish: 'Lávate las manos', phonetic: 'wash yor hands', category: 'safety', context: 'Hygiene reminder', difficulty: 'beginner' },
      { id: 'h4', english: 'Sharp knife, be careful', spanish: 'Cuchillo afilado, ten cuidado', phonetic: 'sharp naif, bi ker-ful', category: 'safety', context: 'Kitchen safety', difficulty: 'beginner' },
      
      // Tasks
      { id: 'h5', english: 'Clear table twelve', spanish: 'Limpia la mesa doce', phonetic: 'klir tei-bul twelv', category: 'tasks', context: 'Service instruction', difficulty: 'beginner' },
      { id: 'h6', english: 'Take this to the customer', spanish: 'Lleva esto al cliente', phonetic: 'teik dis tu de kos-to-mer', category: 'tasks', context: 'Serving order', difficulty: 'beginner' },
      { id: 'h7', english: 'Refill the water glasses', spanish: 'Rellena los vasos de agua', phonetic: 're-fil de wah-ter glas-es', category: 'tasks', context: 'Table service', difficulty: 'beginner' },
      { id: 'h8', english: 'Set up the tables', spanish: 'Prepara las mesas', phonetic: 'set op de tei-buls', category: 'tasks', context: 'Opening preparation', difficulty: 'beginner' },
      { id: 'h9', english: 'Chop the vegetables', spanish: 'Corta las verduras', phonetic: 'chop de vej-ta-buls', category: 'tasks', context: 'Kitchen prep', difficulty: 'beginner' },
      { id: 'h10', english: 'Season the meat', spanish: 'Sazona la carne', phonetic: 'si-zon de mit', category: 'tasks', context: 'Cooking instruction', difficulty: 'intermediate' },
      { id: 'h11', english: 'Plate the food nicely', spanish: 'Emplata bien la comida', phonetic: 'pleit de fud nais-li', category: 'tasks', context: 'Presentation', difficulty: 'intermediate' },
      
      // Questions
      { id: 'h12', english: 'Is this order ready?', spanish: '¿Está listo este pedido?', phonetic: 'iz dis or-der red-i', category: 'questions', context: 'Kitchen to server', difficulty: 'beginner' },
      { id: 'h13', english: 'What table is this for?', spanish: '¿Para qué mesa es esto?', phonetic: 'wat tei-bul iz dis for', category: 'questions', context: 'Order clarification', difficulty: 'beginner' },
      { id: 'h14', english: 'Do you need anything else?', spanish: '¿Necesita algo más?', phonetic: 'du yu nid eni-thing els', category: 'questions', context: 'Customer service', difficulty: 'intermediate' },
      { id: 'h15', english: 'How would you like it cooked?', spanish: '¿Cómo lo quiere cocido?', phonetic: 'hau wud yu laik it kukt', category: 'questions', context: 'Taking orders', difficulty: 'intermediate' },
      
      // Greetings
      { id: 'h16', english: 'Welcome, how many guests?', spanish: 'Bienvenido, ¿cuántas personas?', phonetic: 'wel-kom, hau men-i guests', category: 'greetings', context: 'Host greeting', difficulty: 'beginner' },
      { id: 'h17', english: 'Your table is ready', spanish: 'Su mesa está lista', phonetic: 'yor tei-bul iz red-i', category: 'greetings', context: 'Seating guests', difficulty: 'beginner' },
      { id: 'h18', english: 'Have a nice day', spanish: 'Que tenga un buen día', phonetic: 'hav ah nais dei', category: 'greetings', context: 'Farewell', difficulty: 'beginner' },
      
      // Equipment
      { id: 'h19', english: 'The oven is not working', spanish: 'El horno no funciona', phonetic: 'de ov-en iz not werk-ing', category: 'equipment', context: 'Reporting issues', difficulty: 'intermediate' },
      { id: 'h20', english: 'I need a tray', spanish: 'Necesito una bandeja', phonetic: 'ai nid ah trei', category: 'equipment', context: 'Requesting supplies', difficulty: 'beginner' },
    ]
  },
  {
    id: 'retail',
    name: 'Retail',
    nameSpanish: 'Tienda',
    icon: '🛒',
    description: 'Customer service and store operations',
    descriptionSpanish: 'Servicio al cliente y operaciones de tienda',
    phrases: [
      // Greetings
      { id: 'r1', english: 'Hi, can I help you find something?', spanish: 'Hola, ¿puedo ayudarle a encontrar algo?', phonetic: 'hai, kan ai help yu faind som-thing', category: 'greetings', context: 'Approaching customers', difficulty: 'beginner' },
      { id: 'r2', english: 'Welcome to the store', spanish: 'Bienvenido a la tienda', phonetic: 'wel-kom tu de stor', category: 'greetings', context: 'Store entrance', difficulty: 'beginner' },
      { id: 'r3', english: 'Thank you for shopping with us', spanish: 'Gracias por comprar con nosotros', phonetic: 'thank yu for shop-ing with os', category: 'greetings', context: 'Checkout farewell', difficulty: 'beginner' },
      
      // Tasks
      { id: 'r4', english: 'Stock the shelves', spanish: 'Llena los estantes', phonetic: 'stok de shelvs', category: 'tasks', context: 'Inventory work', difficulty: 'beginner' },
      { id: 'r5', english: 'Price these items', spanish: 'Pon precio a estos artículos', phonetic: 'prais diz ai-tems', category: 'tasks', context: 'Tagging products', difficulty: 'beginner' },
      { id: 'r6', english: 'Clean up aisle three', spanish: 'Limpia el pasillo tres', phonetic: 'klin op ail thri', category: 'tasks', context: 'Store maintenance', difficulty: 'beginner' },
      { id: 'r7', english: 'Face the products', spanish: 'Acomoda los productos al frente', phonetic: 'feis de prod-ukts', category: 'tasks', context: 'Shelf organization', difficulty: 'intermediate' },
      { id: 'r8', english: 'Process the return', spanish: 'Procesa la devolución', phonetic: 'pro-ses de re-tern', category: 'tasks', context: 'Customer returns', difficulty: 'intermediate' },
      
      // Questions
      { id: 'r9', english: "It's in aisle four", spanish: 'Está en el pasillo cuatro', phonetic: 'its in ail for', category: 'questions', context: 'Directing customers', difficulty: 'beginner' },
      { id: 'r10', english: "We're out of stock", spanish: 'No tenemos en existencia', phonetic: 'wir aut of stok', category: 'questions', context: 'Product availability', difficulty: 'intermediate' },
      { id: 'r11', english: 'Let me check in the back', spanish: 'Déjame revisar en el almacén', phonetic: 'let mi chek in de bak', category: 'questions', context: 'Inventory check', difficulty: 'intermediate' },
      { id: 'r12', english: 'Would you like a bag?', spanish: '¿Quiere una bolsa?', phonetic: 'wud yu laik ah bag', category: 'questions', context: 'Checkout service', difficulty: 'beginner' },
      
      // Numbers (for checkout)
      { id: 'r13', english: 'Your total is twenty dollars', spanish: 'Su total es veinte dólares', phonetic: 'yor toh-tal iz twen-ti dol-ars', category: 'numbers', context: 'Payment total', difficulty: 'beginner' },
      { id: 'r14', english: 'Cash or card?', spanish: '¿Efectivo o tarjeta?', phonetic: 'kash or kard', category: 'numbers', context: 'Payment method', difficulty: 'beginner' },
      { id: 'r15', english: "Here's your change", spanish: 'Aquí está su cambio', phonetic: 'hirs yor cheinj', category: 'numbers', context: 'Giving change', difficulty: 'beginner' },
      
      // Safety
      { id: 'r16', english: 'Spill in aisle two', spanish: 'Derrame en el pasillo dos', phonetic: 'spil in ail tu', category: 'safety', context: 'Reporting hazards', difficulty: 'intermediate' },
    ]
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    nameSpanish: 'Limpieza',
    icon: '🧹',
    description: 'Facilities and custodial work vocabulary',
    descriptionSpanish: 'Vocabulario para mantenimiento e instalaciones',
    phrases: [
      // Safety
      { id: 'c1', english: 'Caution, wet floor', spanish: 'Precaución, piso mojado', phonetic: 'kaw-shun, wet flor', category: 'safety', context: 'Warning sign language', difficulty: 'beginner' },
      { id: 'c2', english: "Don't mix the chemicals", spanish: 'No mezcles los químicos', phonetic: 'dohnt miks de kem-i-kals', category: 'safety', context: 'Chemical safety', difficulty: 'intermediate' },
      { id: 'c3', english: 'Wear gloves', spanish: 'Usa guantes', phonetic: 'wer glovs', category: 'safety', context: 'Protection reminder', difficulty: 'beginner' },
      
      // Tasks
      { id: 'c4', english: 'Mop the floor', spanish: 'Trapea el piso', phonetic: 'mop de flor', category: 'tasks', context: 'Floor cleaning', difficulty: 'beginner' },
      { id: 'c5', english: 'Empty the trash', spanish: 'Vacía la basura', phonetic: 'emp-ti de trash', category: 'tasks', context: 'Waste disposal', difficulty: 'beginner' },
      { id: 'c6', english: 'Clean the bathrooms', spanish: 'Limpia los baños', phonetic: 'klin de bath-rooms', category: 'tasks', context: 'Restroom duty', difficulty: 'beginner' },
      { id: 'c7', english: 'Wipe down the surfaces', spanish: 'Limpia las superficies', phonetic: 'waip daun de ser-fa-ses', category: 'tasks', context: 'Surface cleaning', difficulty: 'beginner' },
      { id: 'c8', english: 'Vacuum the carpet', spanish: 'Aspira la alfombra', phonetic: 'vak-yum de kar-pet', category: 'tasks', context: 'Floor care', difficulty: 'beginner' },
      { id: 'c9', english: 'Restock the paper towels', spanish: 'Repón las toallas de papel', phonetic: 're-stok de pei-per tau-els', category: 'tasks', context: 'Supply restocking', difficulty: 'intermediate' },
      { id: 'c10', english: 'Dust the furniture', spanish: 'Quita el polvo a los muebles', phonetic: 'dost de fer-ni-cher', category: 'tasks', context: 'Dusting', difficulty: 'beginner' },
      
      // Equipment
      { id: 'c11', english: 'Where is the supply closet?', spanish: '¿Dónde está el armario de suministros?', phonetic: 'wer iz de suh-plai klo-zet', category: 'equipment', context: 'Finding supplies', difficulty: 'intermediate' },
      { id: 'c12', english: 'I need more cleaning solution', spanish: 'Necesito más solución limpiadora', phonetic: 'ai nid mor klin-ing soh-lu-shun', category: 'equipment', context: 'Requesting supplies', difficulty: 'intermediate' },
      { id: 'c13', english: 'The vacuum is not working', spanish: 'La aspiradora no funciona', phonetic: 'de vak-yum iz not werk-ing', category: 'equipment', context: 'Equipment issues', difficulty: 'intermediate' },
      
      // Questions
      { id: 'c14', english: 'Which area should I clean first?', spanish: '¿Qué área debo limpiar primero?', phonetic: 'wich eh-ree-ah shud ai klin ferst', category: 'questions', context: 'Task prioritization', difficulty: 'intermediate' },
      { id: 'c15', english: "I'm finished with this floor", spanish: 'Terminé con este piso', phonetic: 'aim fin-isht with dis flor', category: 'questions', context: 'Progress update', difficulty: 'beginner' },
    ]
  },
  {
    id: 'industrial',
    name: 'Industrial',
    nameSpanish: 'Industrial',
    icon: '🏭',
    description: 'Factory and manufacturing terminology',
    descriptionSpanish: 'Terminología de fábrica y manufactura',
    phrases: [
      // Safety - Critical
      { id: 'i1', english: 'Emergency stop!', spanish: '¡Parada de emergencia!', phonetic: 'ee-mer-jen-si stop', category: 'safety', context: 'Critical safety action', difficulty: 'beginner' },
      { id: 'i2', english: 'Lockout the machine', spanish: 'Bloquea la máquina', phonetic: 'lok-aut de mah-sheen', category: 'safety', context: 'Safety procedure', difficulty: 'intermediate' },
      { id: 'i3', english: 'Wear safety glasses', spanish: 'Usa lentes de seguridad', phonetic: 'wer sef-ti gla-ses', category: 'safety', context: 'Eye protection', difficulty: 'beginner' },
      { id: 'i4', english: 'Wear ear protection', spanish: 'Usa protección para los oídos', phonetic: 'wer ir proh-tek-shun', category: 'safety', context: 'Hearing protection', difficulty: 'beginner' },
      { id: 'i5', english: 'Report the accident', spanish: 'Reporta el accidente', phonetic: 'ree-port de ak-si-dent', category: 'safety', context: 'Incident reporting', difficulty: 'intermediate' },
      { id: 'i6', english: 'Keep hands away from machine', spanish: 'Mantén las manos lejos de la máquina', phonetic: 'kip hands ah-wei from mah-sheen', category: 'safety', context: 'Machine safety', difficulty: 'intermediate' },
      
      // Tasks
      { id: 'i7', english: 'Start the production line', spanish: 'Inicia la línea de producción', phonetic: 'start de proh-dok-shun lain', category: 'tasks', context: 'Beginning work', difficulty: 'intermediate' },
      { id: 'i8', english: 'Check the quality', spanish: 'Revisa la calidad', phonetic: 'chek de kwol-i-ti', category: 'tasks', context: 'Quality control', difficulty: 'beginner' },
      { id: 'i9', english: 'This part is defective', spanish: 'Esta pieza está defectuosa', phonetic: 'dis part iz dee-fek-tiv', category: 'tasks', context: 'Quality issue', difficulty: 'intermediate' },
      { id: 'i10', english: 'Assemble the components', spanish: 'Ensambla los componentes', phonetic: 'ah-sem-bul de kom-poh-nents', category: 'tasks', context: 'Assembly work', difficulty: 'intermediate' },
      { id: 'i11', english: 'Package the product', spanish: 'Empaca el producto', phonetic: 'pak-ij de prod-ukt', category: 'tasks', context: 'Packaging duty', difficulty: 'beginner' },
      { id: 'i12', english: 'Label the box', spanish: 'Etiqueta la caja', phonetic: 'lei-bul de boks', category: 'tasks', context: 'Labeling task', difficulty: 'beginner' },
      
      // Equipment
      { id: 'i13', english: 'The machine needs maintenance', spanish: 'La máquina necesita mantenimiento', phonetic: 'de mah-sheen nids mein-ten-ans', category: 'equipment', context: 'Maintenance request', difficulty: 'advanced' },
      { id: 'i14', english: 'Replace the parts', spanish: 'Reemplaza las piezas', phonetic: 'ree-pleis de parts', category: 'equipment', context: 'Repair instruction', difficulty: 'intermediate' },
      { id: 'i15', english: 'Calibrate the equipment', spanish: 'Calibra el equipo', phonetic: 'kal-i-breit de ee-kwip-ment', category: 'equipment', context: 'Equipment setup', difficulty: 'advanced' },
      
      // Questions
      { id: 'i16', english: 'What is the production target?', spanish: '¿Cuál es la meta de producción?', phonetic: 'wat iz de proh-dok-shun tar-get', category: 'questions', context: 'Goal inquiry', difficulty: 'intermediate' },
      { id: 'i17', english: 'How do I operate this machine?', spanish: '¿Cómo opero esta máquina?', phonetic: 'hau du ai op-er-eit dis mah-sheen', category: 'questions', context: 'Training question', difficulty: 'intermediate' },
    ]
  }
];

export const categoryInfo: Record<JobPhrase['category'], { name: string; nameSpanish: string; icon: string; color: string }> = {
  safety: { name: 'Safety', nameSpanish: 'Seguridad', icon: '🔴', color: 'text-red-600 bg-red-50 border-red-200' },
  tasks: { name: 'Tasks', nameSpanish: 'Tareas', icon: '📋', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  questions: { name: 'Questions', nameSpanish: 'Preguntas', icon: '❓', color: 'text-purple-600 bg-purple-50 border-purple-200' },
  breaks: { name: 'Breaks', nameSpanish: 'Descansos', icon: '☕', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  equipment: { name: 'Equipment', nameSpanish: 'Equipo', icon: '🔧', color: 'text-slate-600 bg-slate-50 border-slate-200' },
  greetings: { name: 'Greetings', nameSpanish: 'Saludos', icon: '👋', color: 'text-green-600 bg-green-50 border-green-200' },
  numbers: { name: 'Numbers', nameSpanish: 'Números', icon: '🔢', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
};

export const getAllPhrases = (): JobPhrase[] => {
  return industries.flatMap(industry => industry.phrases);
};

export const getPhrasesByIndustry = (industryId: string): JobPhrase[] => {
  const industry = industries.find(i => i.id === industryId);
  return industry?.phrases || [];
};

export const getPhrasesByCategory = (industryId: string, category: JobPhrase['category']): JobPhrase[] => {
  return getPhrasesByIndustry(industryId).filter(p => p.category === category);
};
