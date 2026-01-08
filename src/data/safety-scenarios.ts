export interface SafetyScenario {
  id: string;
  industry: 'warehouse' | 'hospitality' | 'general';
  scenario: string;
  scenarioSpanish: string;
  question: string;
  questionSpanish: string;
  options: {
    text: string;
    textSpanish: string;
    correct: boolean;
    explanation: string;
    explanationSpanish: string;
  }[];
  category: 'hazard' | 'ppe' | 'emergency' | 'procedure';
  oshaReference?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface PPEItem {
  id: string;
  name: string;
  nameSpanish: string;
  description: string;
  descriptionSpanish: string;
  industries: ('warehouse' | 'hospitality' | 'general')[];
  hazards: string[];
  hazardsSpanish: string[];
  icon: string;
}

export const ppeItems: PPEItem[] = [
  {
    id: 'safety-glasses',
    name: 'Safety Glasses',
    nameSpanish: 'Gafas de Seguridad',
    description: 'Protect eyes from flying debris, chemicals, and dust',
    descriptionSpanish: 'Protegen los ojos de escombros, químicos y polvo',
    industries: ['warehouse', 'hospitality', 'general'],
    hazards: ['Flying particles', 'Chemical splashes', 'Dust'],
    hazardsSpanish: ['Partículas volantes', 'Salpicaduras químicas', 'Polvo'],
    icon: '🥽'
  },
  {
    id: 'hard-hat',
    name: 'Hard Hat',
    nameSpanish: 'Casco de Seguridad',
    description: 'Protects head from falling objects and impact hazards',
    descriptionSpanish: 'Protege la cabeza de objetos que caen e impactos',
    industries: ['warehouse', 'general'],
    hazards: ['Falling objects', 'Low clearance', 'Overhead work'],
    hazardsSpanish: ['Objetos que caen', 'Espacios bajos', 'Trabajo aéreo'],
    icon: '⛑️'
  },
  {
    id: 'steel-toe-boots',
    name: 'Steel Toe Boots',
    nameSpanish: 'Botas con Punta de Acero',
    description: 'Protect feet from heavy objects and compression',
    descriptionSpanish: 'Protegen los pies de objetos pesados y compresión',
    industries: ['warehouse', 'general'],
    hazards: ['Heavy objects', 'Crushing hazards', 'Punctures'],
    hazardsSpanish: ['Objetos pesados', 'Riesgo de aplastamiento', 'Perforaciones'],
    icon: '👢'
  },
  {
    id: 'high-vis-vest',
    name: 'High-Visibility Vest',
    nameSpanish: 'Chaleco de Alta Visibilidad',
    description: 'Makes workers visible in low-light or busy areas',
    descriptionSpanish: 'Hace visible a los trabajadores en áreas oscuras o transitadas',
    industries: ['warehouse', 'general'],
    hazards: ['Vehicle traffic', 'Low visibility', 'Forklift areas'],
    hazardsSpanish: ['Tráfico vehicular', 'Baja visibilidad', 'Áreas de montacargas'],
    icon: '🦺'
  },
  {
    id: 'gloves-cut',
    name: 'Cut-Resistant Gloves',
    nameSpanish: 'Guantes Resistentes a Cortes',
    description: 'Protect hands from sharp edges and blades',
    descriptionSpanish: 'Protegen las manos de bordes afilados y cuchillas',
    industries: ['warehouse', 'hospitality', 'general'],
    hazards: ['Sharp edges', 'Box cutters', 'Knives'],
    hazardsSpanish: ['Bordes afilados', 'Cortadores', 'Cuchillos'],
    icon: '🧤'
  },
  {
    id: 'gloves-heat',
    name: 'Heat-Resistant Gloves',
    nameSpanish: 'Guantes Resistentes al Calor',
    description: 'Protect hands from hot surfaces and liquids',
    descriptionSpanish: 'Protegen las manos de superficies y líquidos calientes',
    industries: ['hospitality'],
    hazards: ['Hot pans', 'Ovens', 'Steam', 'Hot liquids'],
    hazardsSpanish: ['Sartenes calientes', 'Hornos', 'Vapor', 'Líquidos calientes'],
    icon: '🧤'
  },
  {
    id: 'non-slip-shoes',
    name: 'Non-Slip Shoes',
    nameSpanish: 'Zapatos Antideslizantes',
    description: 'Prevent slips on wet or greasy floors',
    descriptionSpanish: 'Previenen resbalones en pisos mojados o grasosos',
    industries: ['hospitality', 'general'],
    hazards: ['Wet floors', 'Grease', 'Spills'],
    hazardsSpanish: ['Pisos mojados', 'Grasa', 'Derrames'],
    icon: '👟'
  },
  {
    id: 'ear-protection',
    name: 'Ear Protection',
    nameSpanish: 'Protección Auditiva',
    description: 'Protects hearing from loud machinery and noise',
    descriptionSpanish: 'Protege la audición de maquinaria ruidosa',
    industries: ['warehouse', 'general'],
    hazards: ['Loud machinery', 'Continuous noise', 'Equipment sounds'],
    hazardsSpanish: ['Maquinaria ruidosa', 'Ruido continuo', 'Sonidos de equipo'],
    icon: '🎧'
  },
  {
    id: 'apron',
    name: 'Kitchen Apron',
    nameSpanish: 'Delantal de Cocina',
    description: 'Protects clothing and skin from spills and heat',
    descriptionSpanish: 'Protege la ropa y piel de derrames y calor',
    industries: ['hospitality'],
    hazards: ['Hot liquids', 'Grease splatter', 'Chemical cleaners'],
    hazardsSpanish: ['Líquidos calientes', 'Salpicaduras de grasa', 'Limpiadores químicos'],
    icon: '🧑‍🍳'
  },
  {
    id: 'back-brace',
    name: 'Back Support Belt',
    nameSpanish: 'Cinturón de Soporte Lumbar',
    description: 'Supports lower back during heavy lifting',
    descriptionSpanish: 'Apoya la espalda baja durante levantamiento pesado',
    industries: ['warehouse', 'general'],
    hazards: ['Heavy lifting', 'Repetitive motion', 'Strain'],
    hazardsSpanish: ['Levantamiento pesado', 'Movimiento repetitivo', 'Tensión'],
    icon: '🏋️'
  }
];

export const safetyScenarios: SafetyScenario[] = [
  // WAREHOUSE - HAZARD IDENTIFICATION
  {
    id: 'wh-hazard-1',
    industry: 'warehouse',
    category: 'hazard',
    difficulty: 'beginner',
    scenario: 'You notice a liquid spill in the main aisle where forklifts operate.',
    scenarioSpanish: 'Notas un derrame de líquido en el pasillo principal donde operan los montacargas.',
    question: 'What should you do FIRST?',
    questionSpanish: '¿Qué debes hacer PRIMERO?',
    options: [
      {
        text: 'Continue working and let someone else handle it',
        textSpanish: 'Continuar trabajando y dejar que otro lo maneje',
        correct: false,
        explanation: 'Ignoring hazards puts everyone at risk. You have a responsibility to act.',
        explanationSpanish: 'Ignorar peligros pone a todos en riesgo. Tienes la responsabilidad de actuar.'
      },
      {
        text: 'Block the area and report it immediately',
        textSpanish: 'Bloquear el área y reportarlo inmediatamente',
        correct: true,
        explanation: 'Correct! Block the hazard to prevent accidents, then report so it can be cleaned properly.',
        explanationSpanish: '¡Correcto! Bloquea el peligro para prevenir accidentes, luego reporta para que se limpie apropiadamente.'
      },
      {
        text: 'Clean it up yourself without telling anyone',
        textSpanish: 'Limpiarlo tú mismo sin decirle a nadie',
        correct: false,
        explanation: 'You should report all spills. You may not know if it\'s a hazardous substance.',
        explanationSpanish: 'Debes reportar todos los derrames. Puede que no sepas si es una sustancia peligrosa.'
      },
      {
        text: 'Walk around it and keep working',
        textSpanish: 'Caminar alrededor y seguir trabajando',
        correct: false,
        explanation: 'This leaves the hazard for others. Someone could slip or a forklift could lose control.',
        explanationSpanish: 'Esto deja el peligro para otros. Alguien podría resbalarse o un montacargas perder control.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.22'
  },
  {
    id: 'wh-hazard-2',
    industry: 'warehouse',
    category: 'hazard',
    difficulty: 'intermediate',
    scenario: 'You see a coworker stacking boxes higher than 6 feet without securing them.',
    scenarioSpanish: 'Ves a un compañero apilando cajas más alto de 6 pies sin asegurarlas.',
    question: 'What is the main hazard here?',
    questionSpanish: '¿Cuál es el peligro principal aquí?',
    options: [
      {
        text: 'The boxes might get dirty',
        textSpanish: 'Las cajas podrían ensuciarse',
        correct: false,
        explanation: 'Product damage isn\'t the safety concern here.',
        explanationSpanish: 'El daño al producto no es la preocupación de seguridad aquí.'
      },
      {
        text: 'Unstable stacks can fall and injure workers',
        textSpanish: 'Las pilas inestables pueden caer y lesionar trabajadores',
        correct: true,
        explanation: 'Correct! Falling objects are a leading cause of warehouse injuries. Stacks must be stable and secured.',
        explanationSpanish: '¡Correcto! Los objetos que caen son una causa principal de lesiones en almacenes. Las pilas deben ser estables y aseguradas.'
      },
      {
        text: 'It takes longer to stack high',
        textSpanish: 'Toma más tiempo apilar alto',
        correct: false,
        explanation: 'Efficiency isn\'t the safety issue being addressed.',
        explanationSpanish: 'La eficiencia no es el problema de seguridad que se aborda.'
      },
      {
        text: 'The forklift can\'t reach that high',
        textSpanish: 'El montacargas no puede alcanzar tan alto',
        correct: false,
        explanation: 'The concern is about stability, not equipment reach.',
        explanationSpanish: 'La preocupación es sobre estabilidad, no el alcance del equipo.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.176'
  },
  {
    id: 'wh-hazard-3',
    industry: 'warehouse',
    category: 'hazard',
    difficulty: 'beginner',
    scenario: 'A forklift is approaching while you\'re walking in the warehouse.',
    scenarioSpanish: 'Un montacargas se acerca mientras caminas en el almacén.',
    question: 'What is the safest action?',
    questionSpanish: '¿Cuál es la acción más segura?',
    options: [
      {
        text: 'Make eye contact with the driver and wait for them to stop',
        textSpanish: 'Hacer contacto visual con el conductor y esperar a que se detenga',
        correct: true,
        explanation: 'Correct! Eye contact confirms the driver sees you. Always yield to forklifts and stay in designated walkways.',
        explanationSpanish: '¡Correcto! El contacto visual confirma que el conductor te ve. Siempre cede el paso a montacargas y permanece en pasillos designados.'
      },
      {
        text: 'Run across the aisle before it gets closer',
        textSpanish: 'Correr a través del pasillo antes de que se acerque',
        correct: false,
        explanation: 'Running creates unpredictable movement. The driver may not anticipate your action.',
        explanationSpanish: 'Correr crea movimiento impredecible. El conductor puede no anticipar tu acción.'
      },
      {
        text: 'Assume the driver will stop for you',
        textSpanish: 'Asumir que el conductor se detendrá por ti',
        correct: false,
        explanation: 'Never assume! Forklifts have limited visibility and long stopping distances.',
        explanationSpanish: '¡Nunca asumas! Los montacargas tienen visibilidad limitada y largas distancias de frenado.'
      },
      {
        text: 'Keep walking because you have the right of way',
        textSpanish: 'Seguir caminando porque tienes el derecho de paso',
        correct: false,
        explanation: 'Pedestrians should always yield to forklifts regardless of right-of-way.',
        explanationSpanish: 'Los peatones siempre deben ceder el paso a los montacargas sin importar el derecho de paso.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.178'
  },
  // WAREHOUSE - PPE
  {
    id: 'wh-ppe-1',
    industry: 'warehouse',
    category: 'ppe',
    difficulty: 'beginner',
    scenario: 'You\'re assigned to unload heavy boxes from a truck.',
    scenarioSpanish: 'Te asignan descargar cajas pesadas de un camión.',
    question: 'What PPE is required for this task?',
    questionSpanish: '¿Qué equipo de protección se requiere para esta tarea?',
    options: [
      {
        text: 'Safety glasses only',
        textSpanish: 'Solo gafas de seguridad',
        correct: false,
        explanation: 'Safety glasses are important but not sufficient for handling heavy loads.',
        explanationSpanish: 'Las gafas de seguridad son importantes pero no suficientes para manejar cargas pesadas.'
      },
      {
        text: 'Steel-toe boots, gloves, and high-vis vest',
        textSpanish: 'Botas con punta de acero, guantes y chaleco de alta visibilidad',
        correct: true,
        explanation: 'Correct! Steel-toe boots protect from dropped boxes, gloves from cuts, and high-vis keeps you visible to forklift operators.',
        explanationSpanish: '¡Correcto! Las botas protegen de cajas caídas, guantes de cortes, y el chaleco te mantiene visible a operadores de montacargas.'
      },
      {
        text: 'Hard hat and ear protection',
        textSpanish: 'Casco y protección auditiva',
        correct: false,
        explanation: 'These may be needed in some areas but aren\'t the primary PPE for unloading.',
        explanationSpanish: 'Estos pueden necesitarse en algunas áreas pero no son el PPE principal para descargar.'
      },
      {
        text: 'No PPE needed for simple unloading',
        textSpanish: 'No se necesita PPE para descarga simple',
        correct: false,
        explanation: 'PPE is always required when handling materials. Heavy boxes pose multiple hazards.',
        explanationSpanish: 'El PPE siempre se requiere al manejar materiales. Las cajas pesadas presentan múltiples peligros.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.132'
  },
  {
    id: 'wh-ppe-2',
    industry: 'warehouse',
    category: 'ppe',
    difficulty: 'intermediate',
    scenario: 'You\'re entering an area with machinery noise above 85 decibels.',
    scenarioSpanish: 'Entras a un área con ruido de maquinaria arriba de 85 decibeles.',
    question: 'What protection is required?',
    questionSpanish: '¿Qué protección se requiere?',
    options: [
      {
        text: 'Ear protection (earplugs or earmuffs)',
        textSpanish: 'Protección auditiva (tapones o orejeras)',
        correct: true,
        explanation: 'Correct! OSHA requires hearing protection when noise exceeds 85 dB over an 8-hour period. Hearing loss is permanent.',
        explanationSpanish: '¡Correcto! OSHA requiere protección auditiva cuando el ruido excede 85 dB durante un período de 8 horas. La pérdida auditiva es permanente.'
      },
      {
        text: 'No protection needed for short exposure',
        textSpanish: 'No se necesita protección para exposición corta',
        correct: false,
        explanation: 'Even brief exposure to high noise levels can cause damage. Always wear protection.',
        explanationSpanish: 'Incluso la exposición breve a altos niveles de ruido puede causar daño. Siempre usa protección.'
      },
      {
        text: 'Safety glasses',
        textSpanish: 'Gafas de seguridad',
        correct: false,
        explanation: 'Safety glasses protect eyes, not ears. Different hazards require different PPE.',
        explanationSpanish: 'Las gafas protegen los ojos, no los oídos. Diferentes peligros requieren diferente PPE.'
      },
      {
        text: 'Hard hat',
        textSpanish: 'Casco de seguridad',
        correct: false,
        explanation: 'Hard hats protect from falling objects, not noise exposure.',
        explanationSpanish: 'Los cascos protegen de objetos que caen, no de exposición al ruido.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.95'
  },
  // WAREHOUSE - EMERGENCY
  {
    id: 'wh-emergency-1',
    industry: 'warehouse',
    category: 'emergency',
    difficulty: 'beginner',
    scenario: 'The fire alarm sounds while you\'re working in the back of the warehouse.',
    scenarioSpanish: 'La alarma de incendio suena mientras trabajas en la parte trasera del almacén.',
    question: 'What should you do?',
    questionSpanish: '¿Qué debes hacer?',
    options: [
      {
        text: 'Finish your current task first',
        textSpanish: 'Terminar tu tarea actual primero',
        correct: false,
        explanation: 'Never delay evacuation. Every second counts in an emergency.',
        explanationSpanish: 'Nunca demores la evacuación. Cada segundo cuenta en una emergencia.'
      },
      {
        text: 'Stop work and evacuate using the nearest exit',
        textSpanish: 'Detener el trabajo y evacuar usando la salida más cercana',
        correct: true,
        explanation: 'Correct! Leave immediately via the nearest safe exit and meet at the designated assembly point.',
        explanationSpanish: '¡Correcto! Sal inmediatamente por la salida segura más cercana y reúnete en el punto de reunión designado.'
      },
      {
        text: 'Go check if there\'s really a fire',
        textSpanish: 'Ir a verificar si realmente hay fuego',
        correct: false,
        explanation: 'Never investigate! Treat every alarm as real and evacuate immediately.',
        explanationSpanish: '¡Nunca investigues! Trata cada alarma como real y evacua inmediatamente.'
      },
      {
        text: 'Call 911 from your work station',
        textSpanish: 'Llamar al 911 desde tu estación de trabajo',
        correct: false,
        explanation: 'Evacuate first. Call emergency services from outside if needed.',
        explanationSpanish: 'Evacua primero. Llama a servicios de emergencia desde afuera si es necesario.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.38'
  },
  // WAREHOUSE - PROCEDURE
  {
    id: 'wh-procedure-1',
    industry: 'warehouse',
    category: 'procedure',
    difficulty: 'intermediate',
    scenario: 'You need to lift a 40-pound box from the floor to a shelf at waist height.',
    scenarioSpanish: 'Necesitas levantar una caja de 40 libras del piso a un estante a la altura de la cintura.',
    question: 'What is the correct lifting technique?',
    questionSpanish: '¿Cuál es la técnica correcta de levantamiento?',
    options: [
      {
        text: 'Bend at the waist and lift with your back',
        textSpanish: 'Doblarse por la cintura y levantar con la espalda',
        correct: false,
        explanation: 'This puts extreme strain on your back and can cause serious injury.',
        explanationSpanish: 'Esto pone tensión extrema en tu espalda y puede causar lesiones graves.'
      },
      {
        text: 'Bend knees, keep back straight, lift with legs',
        textSpanish: 'Doblar las rodillas, mantener la espalda recta, levantar con las piernas',
        correct: true,
        explanation: 'Correct! Use your leg muscles, keep the load close to your body, and avoid twisting while lifting.',
        explanationSpanish: '¡Correcto! Usa los músculos de las piernas, mantén la carga cerca de tu cuerpo y evita girar mientras levantas.'
      },
      {
        text: 'Lift quickly to get it over with',
        textSpanish: 'Levantar rápidamente para terminar pronto',
        correct: false,
        explanation: 'Quick jerky movements increase injury risk. Lift slowly and smoothly.',
        explanationSpanish: 'Los movimientos rápidos y bruscos aumentan el riesgo de lesión. Levanta lenta y suavemente.'
      },
      {
        text: 'Twist your body to reach the shelf',
        textSpanish: 'Girar tu cuerpo para alcanzar el estante',
        correct: false,
        explanation: 'Twisting while holding weight is a major cause of back injuries. Move your feet instead.',
        explanationSpanish: 'Girar mientras sostienes peso es una causa principal de lesiones de espalda. Mueve tus pies en su lugar.'
      }
    ],
    oshaReference: 'OSHA Guidelines for Safe Lifting'
  },
  // HOSPITALITY - HAZARD
  {
    id: 'hosp-hazard-1',
    industry: 'hospitality',
    category: 'hazard',
    difficulty: 'beginner',
    scenario: 'You see water on the kitchen floor near the dishwashing station.',
    scenarioSpanish: 'Ves agua en el piso de la cocina cerca de la estación de lavado.',
    question: 'What should you do?',
    questionSpanish: '¿Qué debes hacer?',
    options: [
      {
        text: 'Step over it carefully',
        textSpanish: 'Pasarla cuidadosamente',
        correct: false,
        explanation: 'This leaves the hazard for others and yourself later.',
        explanationSpanish: 'Esto deja el peligro para otros y para ti después.'
      },
      {
        text: 'Wipe it up immediately or place a wet floor sign',
        textSpanish: 'Limpiarla inmediatamente o colocar un letrero de piso mojado',
        correct: true,
        explanation: 'Correct! Slips and falls are the #1 cause of restaurant injuries. Act immediately.',
        explanationSpanish: '¡Correcto! Los resbalones y caídas son la causa #1 de lesiones en restaurantes. Actúa inmediatamente.'
      },
      {
        text: 'Tell a coworker to clean it later',
        textSpanish: 'Decirle a un compañero que lo limpie después',
        correct: false,
        explanation: 'Later could mean an injury. Handle hazards immediately.',
        explanationSpanish: 'Después podría significar una lesión. Maneja los peligros inmediatamente.'
      },
      {
        text: 'Only worry about it if someone slips',
        textSpanish: 'Solo preocuparse si alguien se resbala',
        correct: false,
        explanation: 'Prevention is key. Don\'t wait for an accident to happen.',
        explanationSpanish: 'La prevención es clave. No esperes a que ocurra un accidente.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.22'
  },
  {
    id: 'hosp-hazard-2',
    industry: 'hospitality',
    category: 'hazard',
    difficulty: 'intermediate',
    scenario: 'A knife is left on the counter with the blade facing outward toward the walkway.',
    scenarioSpanish: 'Un cuchillo está en el mostrador con la hoja hacia afuera, hacia el pasillo.',
    question: 'Why is this dangerous?',
    questionSpanish: '¿Por qué es esto peligroso?',
    options: [
      {
        text: 'Someone walking by could cut themselves',
        textSpanish: 'Alguien caminando podría cortarse',
        correct: true,
        explanation: 'Correct! Knives should always be placed with blades facing away from walkways or stored properly. A passing worker could suffer a serious cut.',
        explanationSpanish: '¡Correcto! Los cuchillos siempre deben colocarse con las hojas alejadas de pasillos o guardarse apropiadamente. Un trabajador pasando podría sufrir un corte serio.'
      },
      {
        text: 'The knife might get dirty',
        textSpanish: 'El cuchillo podría ensuciarse',
        correct: false,
        explanation: 'Sanitation is important but the immediate hazard is injury risk.',
        explanationSpanish: 'La sanidad es importante pero el peligro inmediato es el riesgo de lesión.'
      },
      {
        text: 'It\'s only dangerous if someone touches it',
        textSpanish: 'Solo es peligroso si alguien lo toca',
        correct: false,
        explanation: 'Accidental contact happens in busy kitchens. Prevention is essential.',
        explanationSpanish: 'El contacto accidental ocurre en cocinas ocupadas. La prevención es esencial.'
      },
      {
        text: 'The knife might fall',
        textSpanish: 'El cuchillo podría caerse',
        correct: false,
        explanation: 'While falling is also a risk, the outward-facing blade is the primary hazard here.',
        explanationSpanish: 'Aunque caerse también es un riesgo, la hoja hacia afuera es el peligro principal aquí.'
      }
    ]
  },
  // HOSPITALITY - PPE
  {
    id: 'hosp-ppe-1',
    industry: 'hospitality',
    category: 'ppe',
    difficulty: 'beginner',
    scenario: 'You\'re assigned to work the grill and fryer station.',
    scenarioSpanish: 'Te asignan trabajar en la estación de parrilla y freidora.',
    question: 'What footwear should you wear?',
    questionSpanish: '¿Qué calzado debes usar?',
    options: [
      {
        text: 'Regular sneakers',
        textSpanish: 'Tenis regulares',
        correct: false,
        explanation: 'Regular sneakers don\'t provide slip resistance or heat protection needed in kitchens.',
        explanationSpanish: 'Los tenis regulares no proporcionan resistencia al deslizamiento ni protección contra el calor necesaria en cocinas.'
      },
      {
        text: 'Non-slip, closed-toe shoes',
        textSpanish: 'Zapatos cerrados antideslizantes',
        correct: true,
        explanation: 'Correct! Non-slip soles prevent falls on greasy floors, and closed toes protect from hot spills and dropped items.',
        explanationSpanish: '¡Correcto! Las suelas antideslizantes previenen caídas en pisos grasosos, y la punta cerrada protege de derrames calientes y objetos caídos.'
      },
      {
        text: 'Sandals are fine in hot kitchens',
        textSpanish: 'Las sandalias están bien en cocinas calientes',
        correct: false,
        explanation: 'Open-toe shoes expose feet to burns, cuts, and crushing injuries.',
        explanationSpanish: 'Los zapatos abiertos exponen los pies a quemaduras, cortes y lesiones por aplastamiento.'
      },
      {
        text: 'Any comfortable shoes',
        textSpanish: 'Cualquier zapato cómodo',
        correct: false,
        explanation: 'Comfort matters but safety features are essential in kitchen environments.',
        explanationSpanish: 'La comodidad importa pero las características de seguridad son esenciales en ambientes de cocina.'
      }
    ]
  },
  {
    id: 'hosp-ppe-2',
    industry: 'hospitality',
    category: 'ppe',
    difficulty: 'intermediate',
    scenario: 'You need to remove a hot pan from a 400°F oven.',
    scenarioSpanish: 'Necesitas sacar una sartén caliente de un horno a 400°F.',
    question: 'What should you use?',
    questionSpanish: '¿Qué debes usar?',
    options: [
      {
        text: 'Dry oven mitts or heat-resistant gloves',
        textSpanish: 'Guantes de horno secos o guantes resistentes al calor',
        correct: true,
        explanation: 'Correct! Dry oven mitts provide the best heat protection. NEVER use wet towels - water conducts heat and causes steam burns.',
        explanationSpanish: '¡Correcto! Los guantes de horno secos proporcionan la mejor protección contra el calor. NUNCA uses toallas mojadas - el agua conduce calor y causa quemaduras de vapor.'
      },
      {
        text: 'A damp towel - it won\'t burn',
        textSpanish: 'Una toalla húmeda - no se quemará',
        correct: false,
        explanation: 'DANGEROUS! Wet fabric conducts heat rapidly and can cause severe steam burns.',
        explanationSpanish: '¡PELIGROSO! La tela mojada conduce calor rápidamente y puede causar quemaduras severas de vapor.'
      },
      {
        text: 'Bare hands if you\'re quick',
        textSpanish: 'Manos desnudas si eres rápido',
        correct: false,
        explanation: 'Never touch hot items with bare hands. Even brief contact causes burns.',
        explanationSpanish: 'Nunca toques objetos calientes con las manos desnudas. Incluso el contacto breve causa quemaduras.'
      },
      {
        text: 'Any towel nearby',
        textSpanish: 'Cualquier toalla cercana',
        correct: false,
        explanation: 'Not all towels provide adequate protection. Use proper oven mitts.',
        explanationSpanish: 'No todas las toallas proporcionan protección adecuada. Usa guantes de horno apropiados.'
      }
    ]
  },
  // HOSPITALITY - EMERGENCY
  {
    id: 'hosp-emergency-1',
    industry: 'hospitality',
    category: 'emergency',
    difficulty: 'intermediate',
    scenario: 'A grease fire starts in a pan on the stove.',
    scenarioSpanish: 'Un fuego de grasa comienza en una sartén en la estufa.',
    question: 'What should you do?',
    questionSpanish: '¿Qué debes hacer?',
    options: [
      {
        text: 'Throw water on it',
        textSpanish: 'Echarle agua',
        correct: false,
        explanation: 'NEVER use water on a grease fire! It causes the fire to explode and spread.',
        explanationSpanish: '¡NUNCA uses agua en un fuego de grasa! Causa que el fuego explote y se esparza.'
      },
      {
        text: 'Turn off heat, cover with a lid or use Class K fire extinguisher',
        textSpanish: 'Apagar el calor, cubrir con una tapa o usar extintor Clase K',
        correct: true,
        explanation: 'Correct! Turn off the heat source, smother with a metal lid, or use a Class K (kitchen) fire extinguisher. Never use water.',
        explanationSpanish: '¡Correcto! Apaga la fuente de calor, sofoca con una tapa de metal, o usa un extintor Clase K (cocina). Nunca uses agua.'
      },
      {
        text: 'Carry the pan to the sink',
        textSpanish: 'Llevar la sartén al fregadero',
        correct: false,
        explanation: 'Moving a burning pan can spread the fire and cause burns. Leave it in place.',
        explanationSpanish: 'Mover una sartén en llamas puede esparcir el fuego y causar quemaduras. Déjala en su lugar.'
      },
      {
        text: 'Fan the flames to put them out',
        textSpanish: 'Abanicar las llamas para apagarlas',
        correct: false,
        explanation: 'Fanning adds oxygen and makes the fire worse.',
        explanationSpanish: 'Abanicar añade oxígeno y empeora el fuego.'
      }
    ]
  },
  // HOSPITALITY - PROCEDURE
  {
    id: 'hosp-procedure-1',
    industry: 'hospitality',
    category: 'procedure',
    difficulty: 'beginner',
    scenario: 'You\'re carrying a sharp knife through the kitchen.',
    scenarioSpanish: 'Estás cargando un cuchillo afilado a través de la cocina.',
    question: 'What is the safe way to carry it?',
    questionSpanish: '¿Cuál es la forma segura de cargarlo?',
    options: [
      {
        text: 'Hold it out in front of you',
        textSpanish: 'Sostenerlo frente a ti',
        correct: false,
        explanation: 'This puts others at risk and increases your chance of falling on it.',
        explanationSpanish: 'Esto pone a otros en riesgo y aumenta tu probabilidad de caer sobre él.'
      },
      {
        text: 'Hold at your side with blade pointing down, announce "knife" or "behind"',
        textSpanish: 'Sostener a tu lado con la hoja hacia abajo, anunciar "cuchillo" o "atrás"',
        correct: true,
        explanation: 'Correct! Keep the blade down at your side and verbally alert others. This is standard kitchen safety protocol.',
        explanationSpanish: '¡Correcto! Mantén la hoja hacia abajo a tu lado y alerta verbalmente a otros. Este es el protocolo estándar de seguridad en cocina.'
      },
      {
        text: 'Tuck it under your arm',
        textSpanish: 'Meterlo bajo tu brazo',
        correct: false,
        explanation: 'This is extremely dangerous and can cause serious injury.',
        explanationSpanish: 'Esto es extremadamente peligroso y puede causar lesiones graves.'
      },
      {
        text: 'Walk quickly so you\'re done faster',
        textSpanish: 'Caminar rápido para terminar más pronto',
        correct: false,
        explanation: 'Moving quickly with sharp objects increases accident risk.',
        explanationSpanish: 'Moverse rápido con objetos afilados aumenta el riesgo de accidentes.'
      }
    ]
  },
  {
    id: 'hosp-procedure-2',
    industry: 'hospitality',
    category: 'procedure',
    difficulty: 'intermediate',
    scenario: 'Raw chicken juice spilled on the cutting board where you need to cut vegetables.',
    scenarioSpanish: 'Jugo de pollo crudo se derramó en la tabla de cortar donde necesitas cortar vegetales.',
    question: 'What must you do?',
    questionSpanish: '¿Qué debes hacer?',
    options: [
      {
        text: 'Wipe it with a paper towel and continue',
        textSpanish: 'Limpiarla con una toalla de papel y continuar',
        correct: false,
        explanation: 'Wiping doesn\'t eliminate bacteria. Proper sanitization is required.',
        explanationSpanish: 'Limpiar no elimina las bacterias. Se requiere sanitización apropiada.'
      },
      {
        text: 'Wash, rinse, and sanitize the board before cutting vegetables',
        textSpanish: 'Lavar, enjuagar y sanitizar la tabla antes de cortar vegetales',
        correct: true,
        explanation: 'Correct! Raw poultry can contain Salmonella. You must wash, rinse, and sanitize any surface it touches before preparing other foods.',
        explanationSpanish: '¡Correcto! El pollo crudo puede contener Salmonella. Debes lavar, enjuagar y sanitizar cualquier superficie que toque antes de preparar otros alimentos.'
      },
      {
        text: 'Flip the board over and use the other side',
        textSpanish: 'Voltear la tabla y usar el otro lado',
        correct: false,
        explanation: 'Contamination can spread. Both sides need proper cleaning.',
        explanationSpanish: 'La contaminación puede esparcirse. Ambos lados necesitan limpieza apropiada.'
      },
      {
        text: 'It\'s fine if you cut quickly',
        textSpanish: 'Está bien si cortas rápido',
        correct: false,
        explanation: 'Speed doesn\'t prevent cross-contamination. This can cause foodborne illness.',
        explanationSpanish: 'La velocidad no previene la contaminación cruzada. Esto puede causar enfermedades transmitidas por alimentos.'
      }
    ],
    oshaReference: 'FDA Food Code'
  },
  // GENERAL - EMERGENCY
  {
    id: 'gen-emergency-1',
    industry: 'general',
    category: 'emergency',
    difficulty: 'beginner',
    scenario: 'A coworker is injured and bleeding from a cut on their arm.',
    scenarioSpanish: 'Un compañero está herido y sangrando por un corte en su brazo.',
    question: 'What is your first step?',
    questionSpanish: '¿Cuál es tu primer paso?',
    options: [
      {
        text: 'Apply direct pressure with a clean cloth and call for help',
        textSpanish: 'Aplicar presión directa con un trapo limpio y pedir ayuda',
        correct: true,
        explanation: 'Correct! Apply direct pressure to stop bleeding and alert a supervisor or call for medical help. Use gloves if available.',
        explanationSpanish: '¡Correcto! Aplica presión directa para detener el sangrado y alerta a un supervisor o pide ayuda médica. Usa guantes si están disponibles.'
      },
      {
        text: 'Leave them alone and get a manager',
        textSpanish: 'Dejarlos solos e ir por un gerente',
        correct: false,
        explanation: 'Don\'t leave an injured person alone if you can safely provide first aid.',
        explanationSpanish: 'No dejes a una persona herida sola si puedes proporcionar primeros auxilios de manera segura.'
      },
      {
        text: 'Tell them to go to the bathroom to clean it',
        textSpanish: 'Decirles que vayan al baño a limpiarlo',
        correct: false,
        explanation: 'Walking with an injury can worsen it. Provide immediate first aid.',
        explanationSpanish: 'Caminar con una lesión puede empeorarla. Proporciona primeros auxilios inmediatos.'
      },
      {
        text: 'Put a bandage on without cleaning',
        textSpanish: 'Poner una vendita sin limpiar',
        correct: false,
        explanation: 'Stop the bleeding first, then clean and properly bandage the wound.',
        explanationSpanish: 'Detén el sangrado primero, luego limpia y venda la herida apropiadamente.'
      }
    ]
  },
  // GENERAL - PROCEDURE
  {
    id: 'gen-procedure-1',
    industry: 'general',
    category: 'procedure',
    difficulty: 'beginner',
    scenario: 'You notice a coworker not wearing required safety gear in a hazardous area.',
    scenarioSpanish: 'Notas que un compañero no usa el equipo de seguridad requerido en un área peligrosa.',
    question: 'What should you do?',
    questionSpanish: '¿Qué debes hacer?',
    options: [
      {
        text: 'Mind your own business',
        textSpanish: 'No meterse',
        correct: false,
        explanation: 'Safety is everyone\'s responsibility. Speaking up can prevent injuries.',
        explanationSpanish: 'La seguridad es responsabilidad de todos. Hablar puede prevenir lesiones.'
      },
      {
        text: 'Politely remind them or report to a supervisor',
        textSpanish: 'Recordarles amablemente o reportar a un supervisor',
        correct: true,
        explanation: 'Correct! Either approach helps. A friendly reminder first is often effective. If the behavior continues, report it.',
        explanationSpanish: '¡Correcto! Cualquier enfoque ayuda. Un recordatorio amigable primero suele ser efectivo. Si el comportamiento continúa, repórtalo.'
      },
      {
        text: 'Yell at them for being unsafe',
        textSpanish: 'Gritarles por ser inseguros',
        correct: false,
        explanation: 'Aggressive confrontation creates conflict. A respectful approach is more effective.',
        explanationSpanish: 'La confrontación agresiva crea conflicto. Un enfoque respetuoso es más efectivo.'
      },
      {
        text: 'Wait to see if they get hurt',
        textSpanish: 'Esperar a ver si se lastiman',
        correct: false,
        explanation: 'Prevention is always better than reaction. Speak up before an injury occurs.',
        explanationSpanish: 'La prevención siempre es mejor que la reacción. Habla antes de que ocurra una lesión.'
      }
    ]
  },
  {
    id: 'gen-procedure-2',
    industry: 'general',
    category: 'procedure',
    difficulty: 'intermediate',
    scenario: 'Your employer asks you to do a task you haven\'t been trained for that could be dangerous.',
    scenarioSpanish: 'Tu empleador te pide hacer una tarea para la que no has sido entrenado y que podría ser peligrosa.',
    question: 'What is your right?',
    questionSpanish: '¿Cuál es tu derecho?',
    options: [
      {
        text: 'You must do whatever your employer says',
        textSpanish: 'Debes hacer lo que tu empleador diga',
        correct: false,
        explanation: 'OSHA gives workers the right to refuse dangerous work without proper training.',
        explanationSpanish: 'OSHA da a los trabajadores el derecho de rechazar trabajo peligroso sin entrenamiento apropiado.'
      },
      {
        text: 'You can refuse until you receive proper training',
        textSpanish: 'Puedes rechazar hasta recibir entrenamiento apropiado',
        correct: true,
        explanation: 'Correct! Under OSHA, you have the right to proper training before performing hazardous tasks. You can refuse unsafe work.',
        explanationSpanish: '¡Correcto! Bajo OSHA, tienes el derecho a entrenamiento apropiado antes de realizar tareas peligrosas. Puedes rechazar trabajo inseguro.'
      },
      {
        text: 'Try it and hope for the best',
        textSpanish: 'Intentarlo y esperar lo mejor',
        correct: false,
        explanation: 'This puts you and others at risk. Training exists for a reason.',
        explanationSpanish: 'Esto te pone a ti y a otros en riesgo. El entrenamiento existe por una razón.'
      },
      {
        text: 'Only supervisors can refuse work',
        textSpanish: 'Solo los supervisores pueden rechazar trabajo',
        correct: false,
        explanation: 'All workers have the right to a safe workplace and proper training.',
        explanationSpanish: 'Todos los trabajadores tienen derecho a un lugar de trabajo seguro y entrenamiento apropiado.'
      }
    ],
    oshaReference: 'OSHA Act Section 11(c)'
  }
];

export const categoryLabels: Record<string, { en: string; es: string; icon: string; color: string }> = {
  hazard: { 
    en: 'Hazard Identification', 
    es: 'Identificación de Peligros',
    icon: '⚠️',
    color: 'bg-amber-500'
  },
  ppe: { 
    en: 'PPE Requirements', 
    es: 'Requisitos de EPP',
    icon: '🦺',
    color: 'bg-blue-500'
  },
  emergency: { 
    en: 'Emergency Response', 
    es: 'Respuesta de Emergencia',
    icon: '🚨',
    color: 'bg-red-500'
  },
  procedure: { 
    en: 'Safe Procedures', 
    es: 'Procedimientos Seguros',
    icon: '📋',
    color: 'bg-green-500'
  }
};

export const industryLabels: Record<string, { en: string; es: string; icon: string }> = {
  warehouse: { en: 'Warehouse', es: 'Almacén', icon: '📦' },
  hospitality: { en: 'Hospitality', es: 'Hospitalidad', icon: '🍽️' },
  general: { en: 'General', es: 'General', icon: '🏢' }
};
