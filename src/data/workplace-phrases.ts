export interface WorkplacePhrase {
  id: string;
  english: string;
  spanish: string;
  phonetic: string;
  category: 'warehouse' | 'hospitality' | 'retail' | 'cleaning' | 'general';
  situation: 'first-day' | 'safety' | 'break-time' | 'supervisor' | 'coworkers' | 'customers' | 'tasks';
}

export const workplacePhrases: WorkplacePhrase[] = [
  // GENERAL - First Day
  { id: 'g1', english: "Hello, my name is...", spanish: "Hola, me llamo...", phonetic: "OH-lah, meh YAH-moh...", category: 'general', situation: 'first-day' },
  { id: 'g2', english: "Nice to meet you", spanish: "Mucho gusto", phonetic: "MOO-cho GOO-stoh", category: 'general', situation: 'first-day' },
  { id: 'g3', english: "This is my first day", spanish: "Es mi primer día", phonetic: "ehs mee pree-MEHR DEE-ah", category: 'general', situation: 'first-day' },
  { id: 'g4', english: "Where do I clock in?", spanish: "¿Dónde marco entrada?", phonetic: "DOHN-deh MAR-koh ehn-TRAH-dah?", category: 'general', situation: 'first-day' },
  { id: 'g5', english: "What time does my shift start?", spanish: "¿A qué hora empieza mi turno?", phonetic: "ah keh OH-rah ehm-PYEH-sah mee TOOR-noh?", category: 'general', situation: 'first-day' },
  { id: 'g6', english: "Where is the break room?", spanish: "¿Dónde está el cuarto de descanso?", phonetic: "DOHN-deh ehs-TAH ehl KWAHR-toh deh dehs-KAHN-soh?", category: 'general', situation: 'first-day' },
  { id: 'g7', english: "Where is the bathroom?", spanish: "¿Dónde está el baño?", phonetic: "DOHN-deh ehs-TAH ehl BAH-nyoh?", category: 'general', situation: 'first-day' },
  { id: 'g8', english: "Who is my supervisor?", spanish: "¿Quién es mi supervisor?", phonetic: "kee-EHN ehs mee soo-pehr-vee-SOHR?", category: 'general', situation: 'first-day' },
  
  // GENERAL - Safety
  { id: 'g9', english: "Be careful", spanish: "Ten cuidado", phonetic: "tehn kwee-DAH-doh", category: 'general', situation: 'safety' },
  { id: 'g10', english: "Watch out!", spanish: "¡Cuidado!", phonetic: "kwee-DAH-doh!", category: 'general', situation: 'safety' },
  { id: 'g11', english: "It's dangerous", spanish: "Es peligroso", phonetic: "ehs peh-lee-GROH-soh", category: 'general', situation: 'safety' },
  { id: 'g12', english: "I need help", spanish: "Necesito ayuda", phonetic: "neh-seh-SEE-toh ah-YOO-dah", category: 'general', situation: 'safety' },
  { id: 'g13', english: "Call the supervisor", spanish: "Llama al supervisor", phonetic: "YAH-mah ahl soo-pehr-vee-SOHR", category: 'general', situation: 'safety' },
  { id: 'g14', english: "Where is the first aid kit?", spanish: "¿Dónde está el botiquín?", phonetic: "DOHN-deh ehs-TAH ehl boh-tee-KEEN?", category: 'general', situation: 'safety' },
  { id: 'g15', english: "Emergency exit", spanish: "Salida de emergencia", phonetic: "sah-LEE-dah deh eh-mehr-HEHN-syah", category: 'general', situation: 'safety' },
  { id: 'g16', english: "Fire extinguisher", spanish: "Extintor de incendios", phonetic: "ehks-teen-TOHR deh een-SEHN-dyohs", category: 'general', situation: 'safety' },
  
  // GENERAL - Break Time
  { id: 'g17', english: "I'm going on break", spanish: "Voy a tomar mi descanso", phonetic: "voy ah toh-MAHR mee dehs-KAHN-soh", category: 'general', situation: 'break-time' },
  { id: 'g18', english: "How long is the break?", spanish: "¿Cuánto dura el descanso?", phonetic: "KWAHN-toh DOO-rah ehl dehs-KAHN-soh?", category: 'general', situation: 'break-time' },
  { id: 'g19', english: "When is lunch?", spanish: "¿Cuándo es el almuerzo?", phonetic: "KWAHN-doh ehs ehl ahl-MWEHR-soh?", category: 'general', situation: 'break-time' },
  { id: 'g20', english: "I'll be right back", spanish: "Ya regreso", phonetic: "yah reh-GREH-soh", category: 'general', situation: 'break-time' },
  { id: 'g21', english: "Do you want coffee?", spanish: "¿Quieres café?", phonetic: "kee-EH-rehs kah-FEH?", category: 'general', situation: 'break-time' },
  
  // GENERAL - Supervisor
  { id: 'g22', english: "I have a question", spanish: "Tengo una pregunta", phonetic: "TEHN-goh OO-nah preh-GOON-tah", category: 'general', situation: 'supervisor' },
  { id: 'g23', english: "Can you show me how?", spanish: "¿Me puede mostrar cómo?", phonetic: "meh PWEH-deh mohs-TRAHR KOH-moh?", category: 'general', situation: 'supervisor' },
  { id: 'g24', english: "I don't understand", spanish: "No entiendo", phonetic: "noh ehn-TYEHN-doh", category: 'general', situation: 'supervisor' },
  { id: 'g25', english: "Can you repeat that?", spanish: "¿Puede repetir?", phonetic: "PWEH-deh reh-peh-TEER?", category: 'general', situation: 'supervisor' },
  { id: 'g26', english: "I finished the task", spanish: "Terminé la tarea", phonetic: "tehr-mee-NEH lah tah-REH-ah", category: 'general', situation: 'supervisor' },
  { id: 'g27', english: "What should I do next?", spanish: "¿Qué debo hacer ahora?", phonetic: "keh DEH-boh ah-SEHR ah-OH-rah?", category: 'general', situation: 'supervisor' },
  { id: 'g28', english: "I need more supplies", spanish: "Necesito más materiales", phonetic: "neh-seh-SEE-toh mahs mah-teh-ree-AH-lehs", category: 'general', situation: 'supervisor' },
  
  // GENERAL - Coworkers
  { id: 'g29', english: "Can you help me?", spanish: "¿Me puedes ayudar?", phonetic: "meh PWEH-dehs ah-yoo-DAHR?", category: 'general', situation: 'coworkers' },
  { id: 'g30', english: "Thank you very much", spanish: "Muchas gracias", phonetic: "MOO-chahs GRAH-syahs", category: 'general', situation: 'coworkers' },
  { id: 'g31', english: "You're welcome", spanish: "De nada", phonetic: "deh NAH-dah", category: 'general', situation: 'coworkers' },
  { id: 'g32', english: "See you tomorrow", spanish: "Nos vemos mañana", phonetic: "nohs VEH-mohs mah-NYAH-nah", category: 'general', situation: 'coworkers' },
  { id: 'g33', english: "Have a good day", spanish: "Que tengas buen día", phonetic: "keh TEHN-gahs bwehn DEE-ah", category: 'general', situation: 'coworkers' },
  { id: 'g34', english: "Good job!", spanish: "¡Buen trabajo!", phonetic: "bwehn trah-BAH-hoh!", category: 'general', situation: 'coworkers' },
  
  // WAREHOUSE - Tasks
  { id: 'w1', english: "Where is this item?", spanish: "¿Dónde está este artículo?", phonetic: "DOHN-deh ehs-TAH EHS-teh ahr-TEE-koo-loh?", category: 'warehouse', situation: 'tasks' },
  { id: 'w2', english: "This box is heavy", spanish: "Esta caja está pesada", phonetic: "EHS-tah KAH-hah ehs-TAH peh-SAH-dah", category: 'warehouse', situation: 'tasks' },
  { id: 'w3', english: "I need the forklift", spanish: "Necesito el montacargas", phonetic: "neh-seh-SEE-toh ehl mohn-tah-KAR-gahs", category: 'warehouse', situation: 'tasks' },
  { id: 'w4', english: "Where does this go?", spanish: "¿Dónde va esto?", phonetic: "DOHN-deh vah EHS-toh?", category: 'warehouse', situation: 'tasks' },
  { id: 'w5', english: "Scanner", spanish: "Escáner", phonetic: "ehs-KAH-nehr", category: 'warehouse', situation: 'tasks' },
  { id: 'w6', english: "Pallet", spanish: "Tarima / Paleta", phonetic: "tah-REE-mah / pah-LEH-tah", category: 'warehouse', situation: 'tasks' },
  { id: 'w7', english: "Conveyor belt", spanish: "Banda transportadora", phonetic: "BAHN-dah trahns-pohr-tah-DOH-rah", category: 'warehouse', situation: 'tasks' },
  { id: 'w8', english: "Loading dock", spanish: "Muelle de carga", phonetic: "MWEH-yeh deh KAR-gah", category: 'warehouse', situation: 'tasks' },
  { id: 'w9', english: "Pack this carefully", spanish: "Empaca esto con cuidado", phonetic: "ehm-PAH-kah EHS-toh kohn kwee-DAH-doh", category: 'warehouse', situation: 'tasks' },
  { id: 'w10', english: "Which aisle?", spanish: "¿Cuál pasillo?", phonetic: "kwahl pah-SEE-yoh?", category: 'warehouse', situation: 'tasks' },
  { id: 'w11', english: "Stack the boxes", spanish: "Apila las cajas", phonetic: "ah-PEE-lah lahs KAH-hahs", category: 'warehouse', situation: 'tasks' },
  { id: 'w12', english: "The order is complete", spanish: "El pedido está completo", phonetic: "ehl peh-DEE-doh ehs-TAH kohm-PLEH-toh", category: 'warehouse', situation: 'tasks' },
  
  // WAREHOUSE - Safety
  { id: 'w13', english: "Wear your safety vest", spanish: "Usa tu chaleco de seguridad", phonetic: "OO-sah too chah-LEH-koh deh seh-goo-ree-DAHD", category: 'warehouse', situation: 'safety' },
  { id: 'w14', english: "Forklift coming through!", spanish: "¡Pasa el montacargas!", phonetic: "PAH-sah ehl mohn-tah-KAR-gahs!", category: 'warehouse', situation: 'safety' },
  { id: 'w15', english: "Lift with your legs", spanish: "Levanta con las piernas", phonetic: "leh-VAHN-tah kohn lahs pee-EHR-nahs", category: 'warehouse', situation: 'safety' },
  { id: 'w16', english: "Safety glasses required", spanish: "Se requieren lentes de seguridad", phonetic: "seh reh-kee-EH-rehn LEHN-tehs deh seh-goo-ree-DAHD", category: 'warehouse', situation: 'safety' },
  
  // HOSPITALITY - Tasks
  { id: 'h1', english: "Table for two", spanish: "Mesa para dos", phonetic: "MEH-sah PAH-rah dohs", category: 'hospitality', situation: 'tasks' },
  { id: 'h2', english: "The food is ready", spanish: "La comida está lista", phonetic: "lah koh-MEE-dah ehs-TAH LEES-tah", category: 'hospitality', situation: 'tasks' },
  { id: 'h3', english: "Clear the table", spanish: "Limpia la mesa", phonetic: "LEEM-pyah lah MEH-sah", category: 'hospitality', situation: 'tasks' },
  { id: 'h4', english: "More napkins, please", spanish: "Más servilletas, por favor", phonetic: "mahs sehr-vee-YEH-tahs, pohr fah-VOHR", category: 'hospitality', situation: 'tasks' },
  { id: 'h5', english: "We're out of...", spanish: "Se nos acabó...", phonetic: "seh nohs ah-kah-BOH...", category: 'hospitality', situation: 'tasks' },
  { id: 'h6', english: "Dish pit", spanish: "Área de platos", phonetic: "AH-reh-ah deh PLAH-tohs", category: 'hospitality', situation: 'tasks' },
  { id: 'h7', english: "Prep cook", spanish: "Cocinero de preparación", phonetic: "koh-see-NEH-roh deh preh-pah-rah-SYOHN", category: 'hospitality', situation: 'tasks' },
  { id: 'h8', english: "Behind you!", spanish: "¡Atrás!", phonetic: "ah-TRAHS!", category: 'hospitality', situation: 'safety' },
  { id: 'h9', english: "Hot! Coming through!", spanish: "¡Caliente! ¡Permiso!", phonetic: "kah-LYEHN-teh! pehr-MEE-soh!", category: 'hospitality', situation: 'safety' },
  { id: 'h10', english: "Sharp knife", spanish: "Cuchillo filoso", phonetic: "koo-CHEE-yoh fee-LOH-soh", category: 'hospitality', situation: 'safety' },
  
  // HOSPITALITY - Customers
  { id: 'h11', english: "Welcome!", spanish: "¡Bienvenido!", phonetic: "byehn-veh-NEE-doh!", category: 'hospitality', situation: 'customers' },
  { id: 'h12', english: "How can I help you?", spanish: "¿En qué puedo ayudarle?", phonetic: "ehn keh PWEH-doh ah-yoo-DAHR-leh?", category: 'hospitality', situation: 'customers' },
  { id: 'h13', english: "One moment, please", spanish: "Un momento, por favor", phonetic: "oon moh-MEHN-toh, pohr fah-VOHR", category: 'hospitality', situation: 'customers' },
  { id: 'h14', english: "Enjoy your meal", spanish: "Buen provecho", phonetic: "bwehn proh-VEH-choh", category: 'hospitality', situation: 'customers' },
  { id: 'h15', english: "Is everything okay?", spanish: "¿Todo está bien?", phonetic: "TOH-doh ehs-TAH byehn?", category: 'hospitality', situation: 'customers' },
  { id: 'h16', english: "The check, please", spanish: "La cuenta, por favor", phonetic: "lah KWEHN-tah, pohr fah-VOHR", category: 'hospitality', situation: 'customers' },
  
  // RETAIL - Tasks
  { id: 'r1', english: "We need to restock", spanish: "Necesitamos reabastecer", phonetic: "neh-seh-see-TAH-mohs reh-ah-bahs-teh-SEHR", category: 'retail', situation: 'tasks' },
  { id: 'r2', english: "Price check", spanish: "Verificación de precio", phonetic: "veh-ree-fee-kah-SYOHN deh PREH-syoh", category: 'retail', situation: 'tasks' },
  { id: 'r3', english: "Cash register", spanish: "Caja registradora", phonetic: "KAH-hah reh-hees-trah-DOH-rah", category: 'retail', situation: 'tasks' },
  { id: 'r4', english: "Change the sign", spanish: "Cambia el letrero", phonetic: "KAHM-byah ehl leh-TREH-roh", category: 'retail', situation: 'tasks' },
  { id: 'r5', english: "Backroom / Storage", spanish: "Bodega / Almacén", phonetic: "boh-DEH-gah / ahl-mah-SEHN", category: 'retail', situation: 'tasks' },
  { id: 'r6', english: "Fitting room", spanish: "Probador", phonetic: "proh-bah-DOHR", category: 'retail', situation: 'tasks' },
  { id: 'r7', english: "Front of store", spanish: "Frente de la tienda", phonetic: "FREHN-teh deh lah TYEHN-dah", category: 'retail', situation: 'tasks' },
  { id: 'r8', english: "End of aisle display", spanish: "Exhibidor de pasillo", phonetic: "ehk-see-bee-DOHR deh pah-SEE-yoh", category: 'retail', situation: 'tasks' },
  
  // RETAIL - Customers
  { id: 'r9', english: "Can I help you find something?", spanish: "¿Le puedo ayudar a encontrar algo?", phonetic: "leh PWEH-doh ah-yoo-DAHR ah ehn-kohn-TRAHR AHL-goh?", category: 'retail', situation: 'customers' },
  { id: 'r10', english: "It's on sale", spanish: "Está en oferta", phonetic: "ehs-TAH ehn oh-FEHR-tah", category: 'retail', situation: 'customers' },
  { id: 'r11', english: "Would you like a bag?", spanish: "¿Quiere una bolsa?", phonetic: "kee-EH-reh OO-nah BOHL-sah?", category: 'retail', situation: 'customers' },
  { id: 'r12', english: "Cash or card?", spanish: "¿Efectivo o tarjeta?", phonetic: "eh-fehk-TEE-voh oh tahr-HEH-tah?", category: 'retail', situation: 'customers' },
  { id: 'r13', english: "Your total is...", spanish: "Su total es...", phonetic: "soo toh-TAHL ehs...", category: 'retail', situation: 'customers' },
  { id: 'r14', english: "Have a nice day!", spanish: "¡Que tenga buen día!", phonetic: "keh TEHN-gah bwehn DEE-ah!", category: 'retail', situation: 'customers' },
  
  // CLEANING / FACILITIES - Tasks
  { id: 'c1', english: "Mop the floor", spanish: "Trapea el piso", phonetic: "trah-PEH-ah ehl PEE-soh", category: 'cleaning', situation: 'tasks' },
  { id: 'c2', english: "Sweep first", spanish: "Barre primero", phonetic: "BAH-rreh pree-MEH-roh", category: 'cleaning', situation: 'tasks' },
  { id: 'c3', english: "Empty the trash", spanish: "Vacía la basura", phonetic: "vah-SEE-ah lah bah-SOO-rah", category: 'cleaning', situation: 'tasks' },
  { id: 'c4', english: "Cleaning supplies", spanish: "Artículos de limpieza", phonetic: "ahr-TEE-koo-lohs deh leem-PYEH-sah", category: 'cleaning', situation: 'tasks' },
  { id: 'c5', english: "Bleach", spanish: "Blanqueador / Cloro", phonetic: "blahn-keh-ah-DOHR / KLOH-roh", category: 'cleaning', situation: 'tasks' },
  { id: 'c6', english: "Disinfectant", spanish: "Desinfectante", phonetic: "dehs-een-fehk-TAHN-teh", category: 'cleaning', situation: 'tasks' },
  { id: 'c7', english: "Paper towels", spanish: "Toallas de papel", phonetic: "toh-AH-yahs deh pah-PEHL", category: 'cleaning', situation: 'tasks' },
  { id: 'c8', english: "Vacuum cleaner", spanish: "Aspiradora", phonetic: "ahs-pee-rah-DOH-rah", category: 'cleaning', situation: 'tasks' },
  { id: 'c9', english: "Supply closet", spanish: "Armario de suministros", phonetic: "ahr-MAH-ryoh deh soo-mee-NEES-trohs", category: 'cleaning', situation: 'tasks' },
  { id: 'c10', english: "Bathroom needs attention", spanish: "El baño necesita atención", phonetic: "ehl BAH-nyoh neh-seh-SEE-tah ah-tehn-SYOHN", category: 'cleaning', situation: 'tasks' },
  
  // CLEANING - Safety
  { id: 'c11', english: "Wet floor", spanish: "Piso mojado", phonetic: "PEE-soh moh-HAH-doh", category: 'cleaning', situation: 'safety' },
  { id: 'c12', english: "Caution sign", spanish: "Letrero de precaución", phonetic: "leh-TREH-roh deh preh-kow-SYOHN", category: 'cleaning', situation: 'safety' },
  { id: 'c13', english: "Wear gloves", spanish: "Usa guantes", phonetic: "OO-sah GWAHN-tehs", category: 'cleaning', situation: 'safety' },
  { id: 'c14', english: "Don't mix chemicals", spanish: "No mezcles químicos", phonetic: "noh MEHS-klehs KEE-mee-kohs", category: 'cleaning', situation: 'safety' },
];

export const categoryLabels: Record<string, { english: string; spanish: string; icon: string }> = {
  warehouse: { english: 'Warehouse', spanish: 'Almacén', icon: '📦' },
  hospitality: { english: 'Hospitality', spanish: 'Hospitalidad', icon: '🍽️' },
  retail: { english: 'Retail', spanish: 'Comercio', icon: '🛍️' },
  cleaning: { english: 'Cleaning/Facilities', spanish: 'Limpieza', icon: '🧹' },
  general: { english: 'General', spanish: 'General', icon: '💬' },
};

export const situationLabels: Record<string, { english: string; spanish: string; icon: string }> = {
  'first-day': { english: 'First Day', spanish: 'Primer Día', icon: '🌟' },
  'safety': { english: 'Safety', spanish: 'Seguridad', icon: '⚠️' },
  'break-time': { english: 'Break Time', spanish: 'Descanso', icon: '☕' },
  'supervisor': { english: 'Talk to Supervisor', spanish: 'Hablar con Supervisor', icon: '👔' },
  'coworkers': { english: 'With Coworkers', spanish: 'Con Compañeros', icon: '🤝' },
  'customers': { english: 'With Customers', spanish: 'Con Clientes', icon: '🙋' },
  'tasks': { english: 'Work Tasks', spanish: 'Tareas', icon: '📋' },
};
