export interface CulinaryTerm {
  id: string;
  term: string;
  termSpanish?: string;
  pronunciation: string;
  definition: string;
  definitionSpanish?: string;
  category: 'technique' | 'cut' | 'term' | 'temperature' | 'cuisine';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface FoodSafetyQuestion {
  id: string;
  question: string;
  questionSpanish?: string;
  correctAnswer: string;
  options: string[];
  optionsSpanish?: string[];
  explanation: string;
  explanationSpanish?: string;
  category: 'temperature' | 'storage' | 'contamination' | 'hygiene';
}

export interface KnifeCut {
  id: string;
  name: string;
  nameSpanish?: string;
  pronunciation: string;
  description: string;
  descriptionSpanish?: string;
  size: string;
  usedFor: string[];
}

export const culinaryTerms: CulinaryTerm[] = [
  // Techniques - Beginner
  {
    id: 'saute',
    term: 'Sauté',
    termSpanish: 'Saltear',
    pronunciation: 'soh-TAY',
    definition: 'To cook food quickly in a small amount of fat over high heat while stirring',
    definitionSpanish: 'Cocinar rápidamente en poca grasa a fuego alto mientras se revuelve',
    category: 'technique',
    difficulty: 'beginner'
  },
  {
    id: 'blanch',
    term: 'Blanch',
    termSpanish: 'Blanquear',
    pronunciation: 'BLANCH',
    definition: 'To briefly cook in boiling water, then plunge into ice water to stop cooking',
    definitionSpanish: 'Cocinar brevemente en agua hirviendo, luego sumergir en agua helada',
    category: 'technique',
    difficulty: 'beginner'
  },
  {
    id: 'deglaze',
    term: 'Deglaze',
    termSpanish: 'Desglasar',
    pronunciation: 'dee-GLAYZ',
    definition: 'To add liquid to a hot pan to loosen browned bits from the bottom',
    definitionSpanish: 'Añadir líquido a una sartén caliente para soltar los trozos dorados del fondo',
    category: 'technique',
    difficulty: 'beginner'
  },
  {
    id: 'fold',
    term: 'Fold',
    termSpanish: 'Incorporar',
    pronunciation: 'FOLD',
    definition: 'To gently combine a light mixture into a heavier one without deflating',
    definitionSpanish: 'Combinar suavemente una mezcla ligera con una más pesada sin desinflar',
    category: 'technique',
    difficulty: 'beginner'
  },
  {
    id: 'simmer',
    term: 'Simmer',
    termSpanish: 'Hervir a fuego lento',
    pronunciation: 'SIM-er',
    definition: 'To cook in liquid just below boiling point with small bubbles',
    definitionSpanish: 'Cocinar en líquido justo por debajo del punto de ebullición con pequeñas burbujas',
    category: 'technique',
    difficulty: 'beginner'
  },
  // Techniques - Intermediate
  {
    id: 'braise',
    term: 'Braise',
    termSpanish: 'Estofar',
    pronunciation: 'BRAYZ',
    definition: 'To brown meat then cook slowly in a covered pot with liquid',
    definitionSpanish: 'Dorar la carne y luego cocinar lentamente en una olla tapada con líquido',
    category: 'technique',
    difficulty: 'intermediate'
  },
  {
    id: 'poach',
    term: 'Poach',
    termSpanish: 'Escalfar',
    pronunciation: 'POCH',
    definition: 'To cook gently in liquid at 160-180°F, below simmering',
    definitionSpanish: 'Cocinar suavemente en líquido a 71-82°C, por debajo de hervir',
    category: 'technique',
    difficulty: 'intermediate'
  },
  {
    id: 'reduce',
    term: 'Reduce',
    termSpanish: 'Reducir',
    pronunciation: 'ree-DOOS',
    definition: 'To boil a liquid to decrease volume and concentrate flavor',
    definitionSpanish: 'Hervir un líquido para disminuir el volumen y concentrar el sabor',
    category: 'technique',
    difficulty: 'intermediate'
  },
  {
    id: 'temper',
    term: 'Temper',
    termSpanish: 'Temperar',
    pronunciation: 'TEM-per',
    definition: 'To slowly bring up temperature of cold ingredient to prevent curdling',
    definitionSpanish: 'Elevar lentamente la temperatura de un ingrediente frío para evitar que se corte',
    category: 'technique',
    difficulty: 'intermediate'
  },
  {
    id: 'baste',
    term: 'Baste',
    termSpanish: 'Rociar',
    pronunciation: 'BAYST',
    definition: 'To spoon or brush liquid over food during cooking to keep it moist',
    definitionSpanish: 'Verter o cepillar líquido sobre la comida durante la cocción para mantenerla húmeda',
    category: 'technique',
    difficulty: 'intermediate'
  },
  // Techniques - Advanced
  {
    id: 'flambe',
    term: 'Flambé',
    termSpanish: 'Flamear',
    pronunciation: 'flahm-BAY',
    definition: 'To ignite alcohol in a dish for flavor and presentation',
    definitionSpanish: 'Encender el alcohol en un plato para sabor y presentación',
    category: 'technique',
    difficulty: 'advanced'
  },
  {
    id: 'confit',
    term: 'Confit',
    termSpanish: 'Confitar',
    pronunciation: 'con-FEE',
    definition: 'To cook slowly in fat at low temperature, often for preservation',
    definitionSpanish: 'Cocinar lentamente en grasa a baja temperatura, a menudo para conservar',
    category: 'technique',
    difficulty: 'advanced'
  },
  {
    id: 'sous-vide',
    term: 'Sous Vide',
    termSpanish: 'Sous Vide',
    pronunciation: 'soo-VEED',
    definition: 'To cook vacuum-sealed food in precisely controlled water bath',
    definitionSpanish: 'Cocinar alimentos al vacío en un baño de agua controlado con precisión',
    category: 'technique',
    difficulty: 'advanced'
  },
  // Terms - Beginner
  {
    id: 'mise-en-place',
    term: 'Mise en Place',
    termSpanish: 'Mise en Place',
    pronunciation: 'MEEZ-ahn-plahs',
    definition: '"Everything in its place" - prepping and organizing all ingredients before cooking',
    definitionSpanish: '"Todo en su lugar" - preparar y organizar todos los ingredientes antes de cocinar',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'al-dente',
    term: 'Al Dente',
    termSpanish: 'Al Dente',
    pronunciation: 'al-DEN-tay',
    definition: 'Pasta or vegetables cooked to be firm to the bite, not soft',
    definitionSpanish: 'Pasta o vegetales cocidos para que estén firmes al morderlos, no blandos',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'au-jus',
    term: 'Au Jus',
    termSpanish: 'Con su jugo',
    pronunciation: 'oh-ZHOO',
    definition: 'Served with its own cooking juices',
    definitionSpanish: 'Servido con sus propios jugos de cocción',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'garnish',
    term: 'Garnish',
    termSpanish: 'Guarnición',
    pronunciation: 'GAR-nish',
    definition: 'Decorative or flavor-enhancing addition to a finished dish',
    definitionSpanish: 'Adición decorativa o que mejora el sabor de un plato terminado',
    category: 'term',
    difficulty: 'beginner'
  },
  // Terms - Intermediate
  {
    id: 'roux',
    term: 'Roux',
    termSpanish: 'Roux',
    pronunciation: 'ROO',
    definition: 'Equal parts fat and flour cooked together as sauce thickener',
    definitionSpanish: 'Partes iguales de grasa y harina cocidas juntas como espesante de salsas',
    category: 'term',
    difficulty: 'intermediate'
  },
  {
    id: 'bouquet-garni',
    term: 'Bouquet Garni',
    termSpanish: 'Ramillete de hierbas',
    pronunciation: 'boo-KAY gar-NEE',
    definition: 'Bundle of herbs tied together for flavoring stocks and stews',
    definitionSpanish: 'Manojo de hierbas atadas para dar sabor a caldos y guisos',
    category: 'term',
    difficulty: 'intermediate'
  },
  {
    id: 'bain-marie',
    term: 'Bain-Marie',
    termSpanish: 'Baño María',
    pronunciation: 'ban-mah-REE',
    definition: 'Water bath for gentle, even cooking or keeping food warm',
    definitionSpanish: 'Baño de agua para cocción suave y uniforme o mantener la comida caliente',
    category: 'term',
    difficulty: 'intermediate'
  },
  {
    id: 'mother-sauce',
    term: 'Mother Sauce',
    termSpanish: 'Salsa Madre',
    pronunciation: 'MUH-ther SAWS',
    definition: 'One of five base sauces from which other sauces derive (béchamel, velouté, espagnole, hollandaise, tomato)',
    definitionSpanish: 'Una de las cinco salsas base de las cuales derivan otras salsas',
    category: 'term',
    difficulty: 'intermediate'
  },
  // Terms - Advanced
  {
    id: 'demi-glace',
    term: 'Demi-Glace',
    termSpanish: 'Demi-Glace',
    pronunciation: 'DEM-ee-glahs',
    definition: 'Rich brown sauce made by reducing espagnole sauce with brown stock',
    definitionSpanish: 'Salsa marrón rica hecha reduciendo salsa española con caldo oscuro',
    category: 'term',
    difficulty: 'advanced'
  },
  {
    id: 'emulsify',
    term: 'Emulsify',
    termSpanish: 'Emulsionar',
    pronunciation: 'ee-MUL-sih-fy',
    definition: 'To combine two liquids that normally don\'t mix (oil and water)',
    definitionSpanish: 'Combinar dos líquidos que normalmente no se mezclan (aceite y agua)',
    category: 'term',
    difficulty: 'advanced'
  },
  // Cuisine Terms
  {
    id: 'umami',
    term: 'Umami',
    termSpanish: 'Umami',
    pronunciation: 'oo-MAH-mee',
    definition: 'The fifth taste - savory, meaty flavor found in aged cheeses, mushrooms, soy sauce',
    definitionSpanish: 'El quinto sabor - sabroso, carnoso, encontrado en quesos añejos, champiñones, salsa de soja',
    category: 'cuisine',
    difficulty: 'beginner'
  },
  {
    id: 'mirepoix',
    term: 'Mirepoix',
    termSpanish: 'Mirepoix',
    pronunciation: 'meer-PWAH',
    definition: 'Aromatic base of 2 parts onion, 1 part carrot, 1 part celery',
    definitionSpanish: 'Base aromática de 2 partes de cebolla, 1 parte de zanahoria, 1 parte de apio',
    category: 'cuisine',
    difficulty: 'beginner'
  },
  {
    id: 'trinity',
    term: 'Trinity',
    termSpanish: 'Trinidad',
    pronunciation: 'TRIN-ih-tee',
    definition: 'Cajun/Creole base of onion, celery, and bell pepper',
    definitionSpanish: 'Base Cajún/Criolla de cebolla, apio y pimiento',
    category: 'cuisine',
    difficulty: 'intermediate'
  },
  {
    id: 'sofrito',
    term: 'Sofrito',
    termSpanish: 'Sofrito',
    pronunciation: 'soh-FREE-toh',
    definition: 'Latin base of sautéed onion, garlic, peppers, and tomatoes',
    definitionSpanish: 'Base latina de cebolla, ajo, pimientos y tomates salteados',
    category: 'cuisine',
    difficulty: 'intermediate'
  }
];

export const knifeCuts: KnifeCut[] = [
  {
    id: 'brunoise',
    name: 'Brunoise',
    nameSpanish: 'Brunoise',
    pronunciation: 'broon-WAHZ',
    description: 'Very fine dice, 1/8 inch (3mm) cubes',
    descriptionSpanish: 'Dados muy finos, cubos de 3mm',
    size: '1/8" (3mm)',
    usedFor: ['garnishes', 'soups', 'sauces']
  },
  {
    id: 'small-dice',
    name: 'Small Dice',
    nameSpanish: 'Dados Pequeños',
    pronunciation: 'SMAWL DYCE',
    description: 'Small cubes, 1/4 inch (6mm)',
    descriptionSpanish: 'Cubos pequeños de 6mm',
    size: '1/4" (6mm)',
    usedFor: ['salsas', 'relishes', 'stuffings']
  },
  {
    id: 'medium-dice',
    name: 'Medium Dice',
    nameSpanish: 'Dados Medianos',
    pronunciation: 'MEE-dee-um DYCE',
    description: 'Standard cubes, 1/2 inch (12mm)',
    descriptionSpanish: 'Cubos estándar de 12mm',
    size: '1/2" (12mm)',
    usedFor: ['stews', 'soups', 'roasted vegetables']
  },
  {
    id: 'large-dice',
    name: 'Large Dice',
    nameSpanish: 'Dados Grandes',
    pronunciation: 'LARJ DYCE',
    description: 'Large cubes, 3/4 inch (2cm)',
    descriptionSpanish: 'Cubos grandes de 2cm',
    size: '3/4" (2cm)',
    usedFor: ['stocks', 'hearty stews', 'roasting']
  },
  {
    id: 'julienne',
    name: 'Julienne',
    nameSpanish: 'Juliana',
    pronunciation: 'joo-lee-EN',
    description: 'Thin matchstick strips, 1/8 x 1/8 x 2 inches',
    descriptionSpanish: 'Tiras finas como cerillas, 3mm x 3mm x 5cm',
    size: '1/8" x 1/8" x 2"',
    usedFor: ['stir-fry', 'salads', 'garnishes']
  },
  {
    id: 'chiffonade',
    name: 'Chiffonade',
    nameSpanish: 'Chiffonade',
    pronunciation: 'shif-oh-NAHD',
    description: 'Thin ribbons of leafy herbs or greens',
    descriptionSpanish: 'Cintas finas de hierbas o verduras de hoja',
    size: 'Thin ribbons',
    usedFor: ['basil', 'lettuce', 'spinach garnish']
  },
  {
    id: 'batonnet',
    name: 'Bâtonnet',
    nameSpanish: 'Bastones',
    pronunciation: 'bah-toh-NAY',
    description: 'Stick cut, 1/4 x 1/4 x 2-3 inches',
    descriptionSpanish: 'Corte en bastones, 6mm x 6mm x 5-7cm',
    size: '1/4" x 1/4" x 2-3"',
    usedFor: ['french fries', 'crudités', 'vegetable sides']
  },
  {
    id: 'mince',
    name: 'Mince',
    nameSpanish: 'Picar finamente',
    pronunciation: 'MINS',
    description: 'Very finely chopped, smaller than brunoise',
    descriptionSpanish: 'Picado muy finamente, más pequeño que brunoise',
    size: '<1/8" (2mm)',
    usedFor: ['garlic', 'ginger', 'shallots']
  },
  {
    id: 'paysanne',
    name: 'Paysanne',
    nameSpanish: 'Campesina',
    pronunciation: 'pay-ee-ZAHN',
    description: 'Thin flat pieces, 1/2 x 1/2 x 1/8 inch',
    descriptionSpanish: 'Piezas planas y finas, 12mm x 12mm x 3mm',
    size: '1/2" x 1/2" x 1/8"',
    usedFor: ['soups', 'rustic dishes']
  },
  {
    id: 'tourner',
    name: 'Tournée',
    nameSpanish: 'Torneado',
    pronunciation: 'toor-NAY',
    description: 'Football-shaped cut with 7 sides, 2 inches long',
    descriptionSpanish: 'Corte en forma de balón con 7 lados, 5cm de largo',
    size: '2" (5cm) long',
    usedFor: ['potatoes', 'carrots', 'fine dining presentation']
  }
];

export const foodSafetyQuestions: FoodSafetyQuestion[] = [
  // Temperature
  {
    id: 'temp-danger-zone',
    question: 'What is the "Temperature Danger Zone" where bacteria grow rapidly?',
    questionSpanish: '¿Cuál es la "Zona de Peligro de Temperatura" donde las bacterias crecen rápidamente?',
    correctAnswer: '41°F - 135°F (5°C - 57°C)',
    options: ['32°F - 100°F', '41°F - 135°F (5°C - 57°C)', '50°F - 150°F', '35°F - 140°F'],
    optionsSpanish: ['0°C - 38°C', '5°C - 57°C', '10°C - 66°C', '2°C - 60°C'],
    explanation: 'Bacteria multiply rapidly between 41°F and 135°F. Food should not stay in this zone for more than 4 hours total.',
    explanationSpanish: 'Las bacterias se multiplican rápidamente entre 5°C y 57°C. La comida no debe permanecer en esta zona por más de 4 horas en total.',
    category: 'temperature'
  },
  {
    id: 'temp-poultry',
    question: 'What is the minimum internal temperature for cooked poultry?',
    questionSpanish: '¿Cuál es la temperatura interna mínima para aves cocidas?',
    correctAnswer: '165°F (74°C)',
    options: ['145°F (63°C)', '155°F (68°C)', '165°F (74°C)', '180°F (82°C)'],
    optionsSpanish: ['63°C', '68°C', '74°C', '82°C'],
    explanation: 'All poultry must reach 165°F (74°C) for 15 seconds to be safe.',
    explanationSpanish: 'Todas las aves deben alcanzar 74°C durante 15 segundos para ser seguras.',
    category: 'temperature'
  },
  {
    id: 'temp-ground-beef',
    question: 'What is the minimum internal temperature for ground beef?',
    questionSpanish: '¿Cuál es la temperatura interna mínima para carne molida?',
    correctAnswer: '155°F (68°C)',
    options: ['145°F (63°C)', '155°F (68°C)', '165°F (74°C)', '135°F (57°C)'],
    optionsSpanish: ['63°C', '68°C', '74°C', '57°C'],
    explanation: 'Ground beef must reach 155°F (68°C) for 15 seconds. Grinding spreads bacteria throughout the meat.',
    explanationSpanish: 'La carne molida debe alcanzar 68°C durante 15 segundos. Moler esparce las bacterias por toda la carne.',
    category: 'temperature'
  },
  {
    id: 'temp-fish',
    question: 'What is the minimum internal temperature for fish?',
    questionSpanish: '¿Cuál es la temperatura interna mínima para el pescado?',
    correctAnswer: '145°F (63°C)',
    options: ['135°F (57°C)', '145°F (63°C)', '155°F (68°C)', '165°F (74°C)'],
    optionsSpanish: ['57°C', '63°C', '68°C', '74°C'],
    explanation: 'Fish and seafood must reach 145°F (63°C) for 15 seconds.',
    explanationSpanish: 'El pescado y los mariscos deben alcanzar 63°C durante 15 segundos.',
    category: 'temperature'
  },
  {
    id: 'temp-holding-hot',
    question: 'What is the minimum holding temperature for hot food on a buffet?',
    questionSpanish: '¿Cuál es la temperatura mínima de mantenimiento para comida caliente en un buffet?',
    correctAnswer: '135°F (57°C)',
    options: ['120°F (49°C)', '135°F (57°C)', '145°F (63°C)', '150°F (66°C)'],
    optionsSpanish: ['49°C', '57°C', '63°C', '66°C'],
    explanation: 'Hot food must be held at 135°F (57°C) or above to prevent bacterial growth.',
    explanationSpanish: 'La comida caliente debe mantenerse a 57°C o más para prevenir el crecimiento bacteriano.',
    category: 'temperature'
  },
  // Storage
  {
    id: 'storage-order',
    question: 'In a refrigerator, which item should be stored on the lowest shelf?',
    questionSpanish: 'En un refrigerador, ¿qué artículo debe almacenarse en el estante más bajo?',
    correctAnswer: 'Raw chicken',
    options: ['Ready-to-eat salads', 'Dairy products', 'Raw chicken', 'Cooked foods'],
    optionsSpanish: ['Ensaladas listas para comer', 'Productos lácteos', 'Pollo crudo', 'Alimentos cocidos'],
    explanation: 'Raw poultry goes on the bottom to prevent drips from contaminating other foods. Order from top to bottom: ready-to-eat, seafood, whole cuts of beef/pork, ground meat, poultry.',
    explanationSpanish: 'Las aves crudas van en la parte inferior para evitar que los goteos contaminen otros alimentos.',
    category: 'storage'
  },
  {
    id: 'storage-cooling',
    question: 'How quickly must hot food be cooled from 135°F to 70°F?',
    questionSpanish: '¿Qué tan rápido se debe enfriar la comida caliente de 57°C a 21°C?',
    correctAnswer: '2 hours',
    options: ['1 hour', '2 hours', '4 hours', '6 hours'],
    optionsSpanish: ['1 hora', '2 horas', '4 horas', '6 horas'],
    explanation: 'The two-stage cooling method: 135°F to 70°F within 2 hours, then 70°F to 41°F within 4 more hours (6 hours total).',
    explanationSpanish: 'Método de enfriamiento de dos etapas: de 57°C a 21°C en 2 horas, luego de 21°C a 5°C en 4 horas más.',
    category: 'storage'
  },
  {
    id: 'storage-thawing',
    question: 'Which is NOT an approved method for thawing frozen food?',
    questionSpanish: '¿Cuál NO es un método aprobado para descongelar alimentos congelados?',
    correctAnswer: 'On the counter at room temperature',
    options: ['Under cold running water', 'In the refrigerator', 'On the counter at room temperature', 'In the microwave (cook immediately)'],
    optionsSpanish: ['Bajo agua fría corriente', 'En el refrigerador', 'En el mostrador a temperatura ambiente', 'En el microondas (cocinar inmediatamente)'],
    explanation: 'Never thaw at room temperature. Approved methods: refrigerator, cold running water, microwave (cook immediately), or as part of cooking.',
    explanationSpanish: 'Nunca descongele a temperatura ambiente. Métodos aprobados: refrigerador, agua fría corriente, microondas (cocinar inmediatamente), o como parte de la cocción.',
    category: 'storage'
  },
  // Contamination
  {
    id: 'contam-allergens',
    question: 'Which is one of the "Big 8" major food allergens?',
    questionSpanish: '¿Cuál es uno de los "8 Grandes" alérgenos alimentarios principales?',
    correctAnswer: 'All of these',
    options: ['Peanuts', 'Shellfish', 'Wheat', 'All of these'],
    optionsSpanish: ['Cacahuates', 'Mariscos', 'Trigo', 'Todos estos'],
    explanation: 'The Big 8 allergens: milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, and soybeans. (Now 9 with sesame)',
    explanationSpanish: 'Los 8 grandes alérgenos: leche, huevos, pescado, mariscos, nueces de árbol, cacahuates, trigo y soja.',
    category: 'contamination'
  },
  {
    id: 'contam-cross',
    question: 'What color cutting board should be used for raw poultry?',
    questionSpanish: '¿De qué color debe ser la tabla de cortar para aves crudas?',
    correctAnswer: 'Yellow',
    options: ['Red', 'Yellow', 'Green', 'White'],
    optionsSpanish: ['Rojo', 'Amarillo', 'Verde', 'Blanco'],
    explanation: 'Color-coded cutting boards: Yellow=poultry, Red=raw meat, Green=vegetables, White=dairy/bread, Blue=fish, Brown=cooked meat.',
    explanationSpanish: 'Tablas de cortar codificadas por color: Amarillo=aves, Rojo=carne cruda, Verde=vegetales, Blanco=lácteos/pan, Azul=pescado.',
    category: 'contamination'
  },
  {
    id: 'contam-physical',
    question: 'Which is an example of physical contamination?',
    questionSpanish: '¿Cuál es un ejemplo de contaminación física?',
    correctAnswer: 'A piece of glass in food',
    options: ['Bacteria on hands', 'Cleaning chemicals', 'A piece of glass in food', 'Mold on bread'],
    optionsSpanish: ['Bacterias en las manos', 'Productos químicos de limpieza', 'Un pedazo de vidrio en la comida', 'Moho en el pan'],
    explanation: 'Physical contamination: foreign objects like glass, metal, hair, bandages. Biological: bacteria, viruses. Chemical: cleaning products, pesticides.',
    explanationSpanish: 'Contaminación física: objetos extraños como vidrio, metal, cabello, vendajes.',
    category: 'contamination'
  },
  // Hygiene
  {
    id: 'hygiene-handwash',
    question: 'How long should you wash your hands?',
    questionSpanish: '¿Cuánto tiempo debe lavarse las manos?',
    correctAnswer: 'At least 20 seconds',
    options: ['5 seconds', '10 seconds', 'At least 20 seconds', '1 minute'],
    optionsSpanish: ['5 segundos', '10 segundos', 'Al menos 20 segundos', '1 minuto'],
    explanation: 'Wash hands for at least 20 seconds with soap and warm water (100°F/38°C). Sing "Happy Birthday" twice.',
    explanationSpanish: 'Lávese las manos durante al menos 20 segundos con jabón y agua tibia (38°C).',
    category: 'hygiene'
  },
  {
    id: 'hygiene-when-wash',
    question: 'When must food handlers wash their hands?',
    questionSpanish: '¿Cuándo deben lavarse las manos los manipuladores de alimentos?',
    correctAnswer: 'All of these',
    options: ['Before starting work', 'After touching raw meat', 'After using the restroom', 'All of these'],
    optionsSpanish: ['Antes de comenzar a trabajar', 'Después de tocar carne cruda', 'Después de usar el baño', 'Todos estos'],
    explanation: 'Wash hands: before work, after restroom, after handling raw meat, after touching face/hair, after sneezing, after taking out trash, when switching tasks.',
    explanationSpanish: 'Lavarse las manos: antes de trabajar, después del baño, después de manipular carne cruda, después de tocar cara/cabello.',
    category: 'hygiene'
  },
  {
    id: 'hygiene-gloves',
    question: 'When must you change gloves?',
    questionSpanish: '¿Cuándo debe cambiar los guantes?',
    correctAnswer: 'All of these',
    options: ['After handling raw meat before touching ready-to-eat food', 'Every 4 hours during continuous use', 'After touching your face', 'All of these'],
    optionsSpanish: ['Después de manipular carne cruda antes de tocar alimentos listos', 'Cada 4 horas de uso continuo', 'Después de tocarse la cara', 'Todos estos'],
    explanation: 'Change gloves: when switching tasks, after touching raw proteins, every 4 hours, when torn/dirty, after touching non-food surfaces.',
    explanationSpanish: 'Cambiar guantes: al cambiar de tarea, después de tocar proteínas crudas, cada 4 horas, cuando estén rotos/sucios.',
    category: 'hygiene'
  },
  {
    id: 'hygiene-illness',
    question: 'A food handler with which symptom must NOT work with food?',
    questionSpanish: '¿Un manipulador de alimentos con cuál síntoma NO debe trabajar con comida?',
    correctAnswer: 'Vomiting or diarrhea',
    options: ['Headache', 'Sore throat only', 'Vomiting or diarrhea', 'Minor cut on finger (bandaged)'],
    optionsSpanish: ['Dolor de cabeza', 'Solo dolor de garganta', 'Vómitos o diarrea', 'Corte menor en el dedo (vendado)'],
    explanation: 'Food handlers with vomiting, diarrhea, jaundice, or diagnosed with certain illnesses (Norovirus, Salmonella, Hepatitis A, E. coli, Shigella) must be excluded from work.',
    explanationSpanish: 'Los manipuladores de alimentos con vómitos, diarrea, ictericia o diagnosticados con ciertas enfermedades deben ser excluidos del trabajo.',
    category: 'hygiene'
  }
];

export const categoryLabels: Record<string, { en: string; es: string }> = {
  technique: { en: 'Cooking Techniques', es: 'Técnicas de Cocina' },
  cut: { en: 'Knife Cuts', es: 'Cortes de Cuchillo' },
  term: { en: 'Culinary Terms', es: 'Términos Culinarios' },
  temperature: { en: 'Temperature', es: 'Temperatura' },
  cuisine: { en: 'Cuisine Basics', es: 'Bases de Cocina' }
};

export const difficultyLabels: Record<string, { en: string; es: string }> = {
  beginner: { en: 'Beginner', es: 'Principiante' },
  intermediate: { en: 'Intermediate', es: 'Intermedio' },
  advanced: { en: 'Advanced', es: 'Avanzado' }
};

export const safetyCategoryLabels: Record<string, { en: string; es: string }> = {
  temperature: { en: 'Temperature Safety', es: 'Seguridad de Temperatura' },
  storage: { en: 'Food Storage', es: 'Almacenamiento de Alimentos' },
  contamination: { en: 'Contamination Prevention', es: 'Prevención de Contaminación' },
  hygiene: { en: 'Personal Hygiene', es: 'Higiene Personal' }
};
