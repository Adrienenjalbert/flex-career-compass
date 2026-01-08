export interface Cocktail {
  id: string;
  name: string;
  baseSpirit: 'vodka' | 'gin' | 'rum' | 'tequila' | 'whiskey' | 'brandy' | 'champagne';
  ingredients: { name: string; amount: string }[];
  glass: string;
  garnish: string;
  technique: 'shaken' | 'stirred' | 'built' | 'blended';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  pronunciation?: string;
  tips?: string;
}

export const cocktails: Cocktail[] = [
  // VODKA COCKTAILS
  {
    id: 'vodka-martini',
    name: 'Vodka Martini',
    baseSpirit: 'vodka',
    ingredients: [
      { name: 'Vodka', amount: '2.5 oz' },
      { name: 'Dry vermouth', amount: '0.5 oz' }
    ],
    glass: 'Martini glass',
    garnish: 'Olive or lemon twist',
    technique: 'stirred',
    difficulty: 'beginner',
    tips: 'Stir with ice for 30 seconds, strain into chilled glass'
  },
  {
    id: 'cosmopolitan',
    name: 'Cosmopolitan',
    baseSpirit: 'vodka',
    ingredients: [
      { name: 'Citrus vodka', amount: '1.5 oz' },
      { name: 'Triple sec', amount: '0.75 oz' },
      { name: 'Cranberry juice', amount: '0.75 oz' },
      { name: 'Fresh lime juice', amount: '0.5 oz' }
    ],
    glass: 'Martini glass',
    garnish: 'Lime wheel or orange twist',
    technique: 'shaken',
    difficulty: 'beginner',
    pronunciation: 'koz-moh-POL-ih-tan'
  },
  {
    id: 'moscow-mule',
    name: 'Moscow Mule',
    baseSpirit: 'vodka',
    ingredients: [
      { name: 'Vodka', amount: '2 oz' },
      { name: 'Ginger beer', amount: '4 oz' },
      { name: 'Fresh lime juice', amount: '0.5 oz' }
    ],
    glass: 'Copper mug',
    garnish: 'Lime wedge and mint sprig',
    technique: 'built',
    difficulty: 'beginner'
  },
  {
    id: 'white-russian',
    name: 'White Russian',
    baseSpirit: 'vodka',
    ingredients: [
      { name: 'Vodka', amount: '2 oz' },
      { name: 'Coffee liqueur', amount: '1 oz' },
      { name: 'Heavy cream', amount: '1 oz' }
    ],
    glass: 'Old fashioned glass',
    garnish: 'None',
    technique: 'built',
    difficulty: 'beginner'
  },
  {
    id: 'bloody-mary',
    name: 'Bloody Mary',
    baseSpirit: 'vodka',
    ingredients: [
      { name: 'Vodka', amount: '1.5 oz' },
      { name: 'Tomato juice', amount: '3 oz' },
      { name: 'Lemon juice', amount: '0.5 oz' },
      { name: 'Worcestershire sauce', amount: '2 dashes' },
      { name: 'Hot sauce', amount: 'To taste' },
      { name: 'Salt & pepper', amount: 'To taste' }
    ],
    glass: 'Highball glass',
    garnish: 'Celery stalk, olive, lemon wedge',
    technique: 'built',
    difficulty: 'intermediate'
  },
  {
    id: 'espresso-martini',
    name: 'Espresso Martini',
    baseSpirit: 'vodka',
    ingredients: [
      { name: 'Vodka', amount: '2 oz' },
      { name: 'Coffee liqueur', amount: '0.5 oz' },
      { name: 'Fresh espresso', amount: '1 oz' },
      { name: 'Simple syrup', amount: '0.25 oz' }
    ],
    glass: 'Martini glass',
    garnish: '3 coffee beans',
    technique: 'shaken',
    difficulty: 'intermediate',
    tips: 'Shake hard to create the signature foam'
  },
  {
    id: 'screwdriver',
    name: 'Screwdriver',
    baseSpirit: 'vodka',
    ingredients: [
      { name: 'Vodka', amount: '2 oz' },
      { name: 'Orange juice', amount: '4 oz' }
    ],
    glass: 'Highball glass',
    garnish: 'Orange slice',
    technique: 'built',
    difficulty: 'beginner'
  },
  {
    id: 'sex-on-the-beach',
    name: 'Sex on the Beach',
    baseSpirit: 'vodka',
    ingredients: [
      { name: 'Vodka', amount: '1.5 oz' },
      { name: 'Peach schnapps', amount: '0.5 oz' },
      { name: 'Orange juice', amount: '2 oz' },
      { name: 'Cranberry juice', amount: '2 oz' }
    ],
    glass: 'Highball glass',
    garnish: 'Orange slice and cherry',
    technique: 'built',
    difficulty: 'beginner'
  },

  // GIN COCKTAILS
  {
    id: 'gin-tonic',
    name: 'Gin & Tonic',
    baseSpirit: 'gin',
    ingredients: [
      { name: 'Gin', amount: '2 oz' },
      { name: 'Tonic water', amount: '4 oz' }
    ],
    glass: 'Highball glass',
    garnish: 'Lime wedge',
    technique: 'built',
    difficulty: 'beginner'
  },
  {
    id: 'negroni',
    name: 'Negroni',
    baseSpirit: 'gin',
    ingredients: [
      { name: 'Gin', amount: '1 oz' },
      { name: 'Campari', amount: '1 oz' },
      { name: 'Sweet vermouth', amount: '1 oz' }
    ],
    glass: 'Old fashioned glass',
    garnish: 'Orange peel',
    technique: 'stirred',
    difficulty: 'beginner',
    pronunciation: 'neh-GROH-nee'
  },
  {
    id: 'tom-collins',
    name: 'Tom Collins',
    baseSpirit: 'gin',
    ingredients: [
      { name: 'Gin', amount: '2 oz' },
      { name: 'Fresh lemon juice', amount: '1 oz' },
      { name: 'Simple syrup', amount: '0.5 oz' },
      { name: 'Club soda', amount: 'Top' }
    ],
    glass: 'Collins glass',
    garnish: 'Lemon wheel and cherry',
    technique: 'shaken',
    difficulty: 'beginner'
  },
  {
    id: 'french-75',
    name: 'French 75',
    baseSpirit: 'gin',
    ingredients: [
      { name: 'Gin', amount: '1.5 oz' },
      { name: 'Fresh lemon juice', amount: '0.75 oz' },
      { name: 'Simple syrup', amount: '0.5 oz' },
      { name: 'Champagne', amount: 'Top' }
    ],
    glass: 'Champagne flute',
    garnish: 'Lemon twist',
    technique: 'shaken',
    difficulty: 'intermediate'
  },
  {
    id: 'gimlet',
    name: 'Gimlet',
    baseSpirit: 'gin',
    ingredients: [
      { name: 'Gin', amount: '2.5 oz' },
      { name: 'Fresh lime juice', amount: '0.75 oz' },
      { name: 'Simple syrup', amount: '0.5 oz' }
    ],
    glass: 'Coupe glass',
    garnish: 'Lime wheel',
    technique: 'shaken',
    difficulty: 'beginner',
    pronunciation: 'GIM-let'
  },
  {
    id: 'martini',
    name: 'Classic Martini',
    baseSpirit: 'gin',
    ingredients: [
      { name: 'Gin', amount: '2.5 oz' },
      { name: 'Dry vermouth', amount: '0.5 oz' }
    ],
    glass: 'Martini glass',
    garnish: 'Olive or lemon twist',
    technique: 'stirred',
    difficulty: 'beginner',
    tips: 'Always stir, never shake - keeps it silky smooth'
  },
  {
    id: 'aviation',
    name: 'Aviation',
    baseSpirit: 'gin',
    ingredients: [
      { name: 'Gin', amount: '2 oz' },
      { name: 'Maraschino liqueur', amount: '0.5 oz' },
      { name: 'Crème de violette', amount: '0.25 oz' },
      { name: 'Fresh lemon juice', amount: '0.75 oz' }
    ],
    glass: 'Coupe glass',
    garnish: 'Brandied cherry',
    technique: 'shaken',
    difficulty: 'advanced',
    pronunciation: 'ay-vee-AY-shun'
  },

  // RUM COCKTAILS
  {
    id: 'mojito',
    name: 'Mojito',
    baseSpirit: 'rum',
    ingredients: [
      { name: 'White rum', amount: '2 oz' },
      { name: 'Fresh lime juice', amount: '1 oz' },
      { name: 'Simple syrup', amount: '0.75 oz' },
      { name: 'Fresh mint leaves', amount: '6-8 leaves' },
      { name: 'Club soda', amount: 'Top' }
    ],
    glass: 'Highball glass',
    garnish: 'Mint sprig and lime wheel',
    technique: 'built',
    difficulty: 'intermediate',
    pronunciation: 'moh-HEE-toh',
    tips: 'Gently muddle mint - bruise, don\'t shred'
  },
  {
    id: 'daiquiri',
    name: 'Daiquiri',
    baseSpirit: 'rum',
    ingredients: [
      { name: 'White rum', amount: '2 oz' },
      { name: 'Fresh lime juice', amount: '1 oz' },
      { name: 'Simple syrup', amount: '0.75 oz' }
    ],
    glass: 'Coupe glass',
    garnish: 'Lime wheel',
    technique: 'shaken',
    difficulty: 'beginner',
    pronunciation: 'DAK-uh-ree'
  },
  {
    id: 'pina-colada',
    name: 'Piña Colada',
    baseSpirit: 'rum',
    ingredients: [
      { name: 'White rum', amount: '2 oz' },
      { name: 'Coconut cream', amount: '2 oz' },
      { name: 'Pineapple juice', amount: '2 oz' },
      { name: 'Ice', amount: '1 cup' }
    ],
    glass: 'Hurricane glass',
    garnish: 'Pineapple wedge and cherry',
    technique: 'blended',
    difficulty: 'beginner',
    pronunciation: 'PEEN-ya koh-LAH-da'
  },
  {
    id: 'dark-n-stormy',
    name: 'Dark \'n\' Stormy',
    baseSpirit: 'rum',
    ingredients: [
      { name: 'Dark rum', amount: '2 oz' },
      { name: 'Ginger beer', amount: '4 oz' },
      { name: 'Fresh lime juice', amount: '0.5 oz' }
    ],
    glass: 'Highball glass',
    garnish: 'Lime wedge',
    technique: 'built',
    difficulty: 'beginner'
  },
  {
    id: 'mai-tai',
    name: 'Mai Tai',
    baseSpirit: 'rum',
    ingredients: [
      { name: 'White rum', amount: '1 oz' },
      { name: 'Dark rum', amount: '1 oz' },
      { name: 'Orange curaçao', amount: '0.5 oz' },
      { name: 'Orgeat syrup', amount: '0.5 oz' },
      { name: 'Fresh lime juice', amount: '1 oz' }
    ],
    glass: 'Old fashioned glass',
    garnish: 'Mint sprig and lime shell',
    technique: 'shaken',
    difficulty: 'intermediate',
    pronunciation: 'MY-tie'
  },
  {
    id: 'cuba-libre',
    name: 'Cuba Libre',
    baseSpirit: 'rum',
    ingredients: [
      { name: 'White rum', amount: '2 oz' },
      { name: 'Cola', amount: '4 oz' },
      { name: 'Fresh lime juice', amount: '0.5 oz' }
    ],
    glass: 'Highball glass',
    garnish: 'Lime wedge',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'KOO-ba LEE-bray'
  },
  {
    id: 'hurricane',
    name: 'Hurricane',
    baseSpirit: 'rum',
    ingredients: [
      { name: 'Light rum', amount: '2 oz' },
      { name: 'Dark rum', amount: '2 oz' },
      { name: 'Passion fruit juice', amount: '2 oz' },
      { name: 'Orange juice', amount: '1 oz' },
      { name: 'Fresh lime juice', amount: '1 oz' },
      { name: 'Simple syrup', amount: '1 oz' },
      { name: 'Grenadine', amount: '1 tbsp' }
    ],
    glass: 'Hurricane glass',
    garnish: 'Orange slice and cherry',
    technique: 'shaken',
    difficulty: 'intermediate'
  },

  // TEQUILA COCKTAILS
  {
    id: 'margarita',
    name: 'Margarita',
    baseSpirit: 'tequila',
    ingredients: [
      { name: 'Tequila blanco', amount: '2 oz' },
      { name: 'Fresh lime juice', amount: '1 oz' },
      { name: 'Triple sec', amount: '0.75 oz' },
      { name: 'Agave syrup', amount: '0.5 oz' }
    ],
    glass: 'Margarita glass or rocks',
    garnish: 'Lime wheel and salt rim',
    technique: 'shaken',
    difficulty: 'beginner',
    pronunciation: 'mar-gah-REE-ta'
  },
  {
    id: 'paloma',
    name: 'Paloma',
    baseSpirit: 'tequila',
    ingredients: [
      { name: 'Tequila blanco', amount: '2 oz' },
      { name: 'Grapefruit soda', amount: '4 oz' },
      { name: 'Fresh lime juice', amount: '0.5 oz' },
      { name: 'Pinch of salt', amount: 'To taste' }
    ],
    glass: 'Highball glass',
    garnish: 'Grapefruit wedge and salt rim',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'pah-LOH-mah'
  },
  {
    id: 'tequila-sunrise',
    name: 'Tequila Sunrise',
    baseSpirit: 'tequila',
    ingredients: [
      { name: 'Tequila blanco', amount: '2 oz' },
      { name: 'Orange juice', amount: '4 oz' },
      { name: 'Grenadine', amount: '0.5 oz' }
    ],
    glass: 'Highball glass',
    garnish: 'Orange slice and cherry',
    technique: 'built',
    difficulty: 'beginner',
    tips: 'Pour grenadine last - it sinks for the sunrise effect'
  },
  {
    id: 'mexican-mule',
    name: 'Mexican Mule',
    baseSpirit: 'tequila',
    ingredients: [
      { name: 'Tequila', amount: '2 oz' },
      { name: 'Ginger beer', amount: '4 oz' },
      { name: 'Fresh lime juice', amount: '0.5 oz' }
    ],
    glass: 'Copper mug',
    garnish: 'Lime wedge',
    technique: 'built',
    difficulty: 'beginner'
  },
  {
    id: 'tommy-margarita',
    name: "Tommy's Margarita",
    baseSpirit: 'tequila',
    ingredients: [
      { name: 'Tequila blanco', amount: '2 oz' },
      { name: 'Fresh lime juice', amount: '1 oz' },
      { name: 'Agave nectar', amount: '0.5 oz' }
    ],
    glass: 'Old fashioned glass',
    garnish: 'Lime wheel',
    technique: 'shaken',
    difficulty: 'beginner',
    tips: 'No triple sec - simpler and more tequila-forward'
  },

  // WHISKEY COCKTAILS
  {
    id: 'old-fashioned',
    name: 'Old Fashioned',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Bourbon or rye whiskey', amount: '2 oz' },
      { name: 'Sugar cube', amount: '1' },
      { name: 'Angostura bitters', amount: '2-3 dashes' },
      { name: 'Water', amount: 'Splash' }
    ],
    glass: 'Old fashioned glass',
    garnish: 'Orange peel and cherry',
    technique: 'built',
    difficulty: 'intermediate',
    tips: 'Muddle sugar with bitters, add whiskey, then ice'
  },
  {
    id: 'manhattan',
    name: 'Manhattan',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Rye whiskey', amount: '2 oz' },
      { name: 'Sweet vermouth', amount: '1 oz' },
      { name: 'Angostura bitters', amount: '2 dashes' }
    ],
    glass: 'Coupe or martini glass',
    garnish: 'Brandied cherry',
    technique: 'stirred',
    difficulty: 'beginner'
  },
  {
    id: 'whiskey-sour',
    name: 'Whiskey Sour',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Bourbon', amount: '2 oz' },
      { name: 'Fresh lemon juice', amount: '0.75 oz' },
      { name: 'Simple syrup', amount: '0.5 oz' },
      { name: 'Egg white', amount: '0.5 oz (optional)' }
    ],
    glass: 'Old fashioned glass',
    garnish: 'Cherry and orange slice',
    technique: 'shaken',
    difficulty: 'intermediate',
    tips: 'Dry shake first (no ice) if using egg white for foam'
  },
  {
    id: 'irish-coffee',
    name: 'Irish Coffee',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Irish whiskey', amount: '1.5 oz' },
      { name: 'Hot coffee', amount: '4 oz' },
      { name: 'Brown sugar', amount: '1 tsp' },
      { name: 'Fresh cream', amount: 'Float' }
    ],
    glass: 'Irish coffee glass',
    garnish: 'None',
    technique: 'built',
    difficulty: 'intermediate',
    tips: 'Float cream over the back of a spoon'
  },
  {
    id: 'mint-julep',
    name: 'Mint Julep',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Bourbon', amount: '2.5 oz' },
      { name: 'Fresh mint leaves', amount: '8-10 leaves' },
      { name: 'Simple syrup', amount: '0.5 oz' },
      { name: 'Crushed ice', amount: 'Plenty' }
    ],
    glass: 'Julep cup',
    garnish: 'Mint bouquet',
    technique: 'built',
    difficulty: 'intermediate',
    pronunciation: 'mint JOO-lep'
  },
  {
    id: 'sazerac',
    name: 'Sazerac',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Rye whiskey', amount: '2 oz' },
      { name: 'Absinthe', amount: 'Rinse' },
      { name: 'Sugar cube', amount: '1' },
      { name: 'Peychaud\'s bitters', amount: '3 dashes' }
    ],
    glass: 'Old fashioned glass',
    garnish: 'Lemon peel (expressed, not dropped)',
    technique: 'stirred',
    difficulty: 'advanced',
    pronunciation: 'SAZ-uh-rak'
  },
  {
    id: 'boulevardier',
    name: 'Boulevardier',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Bourbon', amount: '1.5 oz' },
      { name: 'Sweet vermouth', amount: '1 oz' },
      { name: 'Campari', amount: '1 oz' }
    ],
    glass: 'Old fashioned glass',
    garnish: 'Orange peel',
    technique: 'stirred',
    difficulty: 'beginner',
    pronunciation: 'BOO-luh-var-dee-ay'
  },

  // BRANDY COCKTAILS
  {
    id: 'sidecar',
    name: 'Sidecar',
    baseSpirit: 'brandy',
    ingredients: [
      { name: 'Cognac', amount: '2 oz' },
      { name: 'Triple sec', amount: '0.75 oz' },
      { name: 'Fresh lemon juice', amount: '0.75 oz' }
    ],
    glass: 'Coupe glass',
    garnish: 'Sugar rim and lemon twist',
    technique: 'shaken',
    difficulty: 'beginner'
  },
  {
    id: 'brandy-alexander',
    name: 'Brandy Alexander',
    baseSpirit: 'brandy',
    ingredients: [
      { name: 'Cognac', amount: '1.5 oz' },
      { name: 'Crème de cacao (dark)', amount: '1 oz' },
      { name: 'Heavy cream', amount: '1 oz' }
    ],
    glass: 'Coupe glass',
    garnish: 'Nutmeg',
    technique: 'shaken',
    difficulty: 'beginner'
  },

  // CHAMPAGNE COCKTAILS
  {
    id: 'mimosa',
    name: 'Mimosa',
    baseSpirit: 'champagne',
    ingredients: [
      { name: 'Champagne', amount: '3 oz' },
      { name: 'Orange juice', amount: '3 oz' }
    ],
    glass: 'Champagne flute',
    garnish: 'Orange slice',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'mih-MOH-suh'
  },
  {
    id: 'bellini',
    name: 'Bellini',
    baseSpirit: 'champagne',
    ingredients: [
      { name: 'Prosecco', amount: '4 oz' },
      { name: 'White peach purée', amount: '2 oz' }
    ],
    glass: 'Champagne flute',
    garnish: 'None',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'beh-LEE-nee'
  },
  {
    id: 'kir-royale',
    name: 'Kir Royale',
    baseSpirit: 'champagne',
    ingredients: [
      { name: 'Champagne', amount: '5 oz' },
      { name: 'Crème de cassis', amount: '0.5 oz' }
    ],
    glass: 'Champagne flute',
    garnish: 'None',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'keer roy-AHL'
  }
];

export const spiritColors: Record<string, string> = {
  vodka: 'bg-slate-100 text-slate-700 border-slate-200',
  gin: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rum: 'bg-amber-50 text-amber-700 border-amber-200',
  tequila: 'bg-lime-50 text-lime-700 border-lime-200',
  whiskey: 'bg-orange-50 text-orange-700 border-orange-200',
  brandy: 'bg-rose-50 text-rose-700 border-rose-200',
  champagne: 'bg-yellow-50 text-yellow-700 border-yellow-200'
};

export const spiritIcons: Record<string, string> = {
  vodka: '🍸',
  gin: '🌿',
  rum: '🏝️',
  tequila: '🌵',
  whiskey: '🥃',
  brandy: '🍷',
  champagne: '🥂'
};

export const techniqueDescriptions: Record<string, string> = {
  shaken: 'Combine ingredients with ice in a shaker, shake vigorously for 10-15 seconds, strain into glass',
  stirred: 'Combine ingredients with ice in a mixing glass, stir for 30 seconds, strain into glass',
  built: 'Build directly in the serving glass over ice',
  blended: 'Combine ingredients with ice in a blender until smooth'
};

export const glassDescriptions: Record<string, string> = {
  'Martini glass': 'V-shaped stemmed glass, typically 4-6 oz',
  'Old fashioned glass': 'Short tumbler, also called rocks glass, 6-10 oz',
  'Highball glass': 'Tall straight glass, 8-12 oz',
  'Collins glass': 'Tall narrow glass, 10-14 oz',
  'Coupe glass': 'Shallow bowl-shaped stemmed glass, 5-7 oz',
  'Champagne flute': 'Tall narrow stemmed glass, 6-8 oz',
  'Hurricane glass': 'Tall curved glass resembling hurricane lamp, 15-20 oz',
  'Copper mug': 'Traditional copper vessel for Moscow Mule, 12-16 oz',
  'Margarita glass': 'Wide shallow bowl on stem, 12-16 oz',
  'Julep cup': 'Silver or pewter cup, 10-12 oz',
  'Irish coffee glass': 'Footed glass mug with handle, 8-10 oz'
};
