export const BREWING_METHODS = [
  {
    id: "v60",
    name: "Hario V60 Pour Over",
    tagline: "Clarity, vibrant acidity & origin terroir",
    iconName: "Droplets",
    defaultDose: 15,
    defaultRatio: 16,
    defaultWater: 240,
    minRatio: 14,
    maxRatio: 18,
    grindSize: "Medium-Fine (like sea salt)",
    waterTemp: "92°C – 94°C (198°F – 201°F)",
    totalTimeSec: 195, // 3:15
    steps: [
      {
        title: "Bloom & Degas",
        durationSec: 45,
        targetWater: 45,
        instruction: "Gently pour 45g of water in spirals. Let grounds expand, bubble, and release trapped CO2."
      },
      {
        title: "First Main Pour",
        durationSec: 45,
        targetWater: 140,
        instruction: "Pour steadily in outward spirals up to 140g. Keep water level consistent and avoid pouring on filter paper."
      },
      {
        title: "Second Main Pour",
        durationSec: 45,
        targetWater: 240,
        instruction: "Pour steadily in gentle circular motion up to total water target (240g). Give a gentle swirl."
      },
      {
        title: "Final Drawdown",
        durationSec: 60,
        targetWater: 240,
        instruction: "Allow the water bed to drain smoothly. The spent coffee bed should finish flat and uniform."
      }
    ],
    tips: [
      "Rinse your paper filter with hot water before adding grounds to remove papery taste and preheat the dripper.",
      "Pour with a continuous, controlled gooseneck kettle stream to prevent channeling."
    ]
  },
  {
    id: "french-press",
    name: "French Press (Cafetière)",
    tagline: "Rich, full body, oils & heavy mouthfeel",
    iconName: "Coffee",
    defaultDose: 20,
    defaultRatio: 15,
    defaultWater: 300,
    minRatio: 12,
    maxRatio: 16,
    grindSize: "Coarse (like kosher salt or breadcrumbs)",
    waterTemp: "94°C – 96°C (201°F – 205°F)",
    totalTimeSec: 240, // 4:00
    steps: [
      {
        title: "Initial Immersion Pour",
        durationSec: 45,
        targetWater: 300,
        instruction: "Pour all brew water vigorously over coffee grounds, saturating all particles evenly."
      },
      {
        title: "Steep & Crust Formation",
        durationSec: 135,
        targetWater: 300,
        instruction: "Place plunger lid gently on top (do not push down). Let coffee steep for full oil extraction."
      },
      {
        title: "Crust Break & Skim",
        durationSec: 30,
        targetWater: 300,
        instruction: "Break the floating coffee crust with a spoon. Skim off white foam/crema for cleaner body."
      },
      {
        title: "Slow Plunge & Pour",
        durationSec: 30,
        targetWater: 300,
        instruction: "Press plunger down very gently with minimal pressure. Decant immediately into cups to avoid over-extraction."
      }
    ],
    tips: [
      "Do not plunge with force; if stuck, pull plunger up slightly before resuming.",
      "Decant the brewed coffee immediately into a server so it doesn't continue brewing on the bottom."
    ]
  },
  {
    id: "aeropress",
    name: "AeroPress (Inverted Method)",
    tagline: "Sweet, versatile, smooth & travel-friendly",
    iconName: "Sliders",
    defaultDose: 14,
    defaultRatio: 14,
    defaultWater: 200,
    minRatio: 10,
    maxRatio: 16,
    grindSize: "Medium-Fine (finer than pour over, coarser than espresso)",
    waterTemp: "85°C – 88°C (185°F – 190°F)",
    totalTimeSec: 120, // 2:00
    steps: [
      {
        title: "Inverted Setup & Fill",
        durationSec: 30,
        targetWater: 200,
        instruction: "Set AeroPress inverted. Add coffee, then pour 200g water at 85°C quickly."
      },
      {
        title: "Agitate & Stir",
        durationSec: 30,
        targetWater: 200,
        instruction: "Stir back and forth 3 times with paddle to ensure complete saturation."
      },
      {
        title: "Cap & Steep",
        durationSec: 30,
        targetWater: 200,
        instruction: "Rinse filter in cap and screw tightly. Let steep undisturbed until 1:30 mark."
      },
      {
        title: "Flip & Press",
        durationSec: 30,
        targetWater: 200,
        instruction: "Carefully flip onto mug and press down smoothly for 30 seconds until you hear a gentle hiss."
      }
    ],
    tips: [
      "Lower water temperatures (85°C) reduce bitterness and enhance clean sweetness.",
      "Stop pressing when you hear the initial air hiss to leave astringent bitter fines behind."
    ]
  },
  {
    id: "cold-brew",
    name: "Cold Brew Steep",
    tagline: "Low acidity, smooth chocolate sweetness & refreshing",
    iconName: "Droplets",
    defaultDose: 60,
    defaultRatio: 10,
    defaultWater: 600,
    minRatio: 8,
    maxRatio: 12,
    grindSize: "Extra Coarse (rough cracked peppercorns)",
    waterTemp: "Cold or Room Temperature Filtered Water (18°C – 22°C)",
    totalTimeSec: 300, // interactive demo timer, realistic steep is 12-18 hours
    steps: [
      {
        title: "Saturate Grounds",
        durationSec: 60,
        targetWater: 600,
        instruction: "Add coarsely ground coffee into brewing vessel, pour cold filtered water in circular motion."
      },
      {
        title: "Gentle Stir & Submerge",
        durationSec: 60,
        targetWater: 600,
        instruction: "Stir gently to ensure all dry pockets are wet. Cover vessel."
      },
      {
        title: "Long Cold Extraction",
        durationSec: 120,
        targetWater: 600,
        instruction: "In actual brewing, steep in refrigerator or room temp for 14-18 hours to extract sweet solubles without bitter acids."
      },
      {
        title: "Fine Paper Filter Strain",
        durationSec: 60,
        targetWater: 600,
        instruction: "Strain through stainless mesh and then paper filter to remove sediment. Serve chilled over ice!"
      }
    ],
    tips: [
      "Cold water extracts compounds slowly, leaving behind harsh chlorogenic acids.",
      "Store concentrated cold brew in an airtight glass bottle in the fridge for up to 10 days."
    ]
  },
  {
    id: "moka-pot",
    name: "Moka Pot (Stovetop Espresso)",
    tagline: "Bold, intense, syrupy & thick base",
    iconName: "Flame",
    defaultDose: 18,
    defaultRatio: 10,
    defaultWater: 180,
    minRatio: 8,
    maxRatio: 11,
    grindSize: "Fine (slightly coarser than commercial espresso)",
    waterTemp: "Pre-boiled hot water in lower chamber (95°C)",
    totalTimeSec: 150, // 2:30
    steps: [
      {
        title: "Pre-heated Water in Base",
        durationSec: 30,
        targetWater: 180,
        instruction: "Fill base chamber with pre-heated water up to just below the safety valve."
      },
      {
        title: "Fill Basket & Assemble",
        durationSec: 30,
        targetWater: 180,
        instruction: "Fill basket level with fine grounds (do NOT tamp or compress tightly). Screw top chamber firmly."
      },
      {
        title: "Low Heat Extraction",
        durationSec: 60,
        targetWater: 180,
        instruction: "Place on low-medium heat with lid open. Watch for rich amber espresso streaming smoothly into upper column."
      },
      {
        title: "Cool Base & Pour",
        durationSec: 30,
        targetWater: 180,
        instruction: "When coffee turns honey-pale and gurgles, immediately remove from heat and quench bottom in cold towel or sink."
      }
    ],
    tips: [
      "Using pre-heated water prevents roasting the dry coffee grounds before the water boils up.",
      "Quenching the lower chamber with cold water instantly stops extraction and avoids burnt flavors."
    ]
  },
  {
    id: "kape-kaldero",
    name: "Kape Kaldero (Traditional Pot Brew)",
    tagline: "Philippine heritage brewing for Barako & Robusta",
    iconName: "Sparkles",
    defaultDose: 25,
    defaultRatio: 12,
    defaultWater: 300,
    minRatio: 10,
    maxRatio: 14,
    grindSize: "Medium-Coarse to Coarse",
    waterTemp: "95°C (Simmering off-boil)",
    totalTimeSec: 180, // 3:00
    steps: [
      {
        title: "Boil Fresh Water in Pot",
        durationSec: 45,
        targetWater: 300,
        instruction: "Bring fresh water to a rolling boil in a small pot or kaldero, then take off heat for 20 seconds."
      },
      {
        title: "Add Grounds & Muscovado",
        durationSec: 45,
        targetWater: 300,
        instruction: "Add ground Kapeng Barako or Robusta. Optionally stir in 1 tsp raw muscovado sugar or panutsa."
      },
      {
        title: "Cover & Steep",
        durationSec: 60,
        targetWater: 300,
        instruction: "Cover pot with lid. Allow the rich oils and spices of the coffee to infuse."
      },
      {
        title: "Settle Grounds & Strain",
        durationSec: 30,
        targetWater: 300,
        instruction: "Pour through a traditional cloth strainer ('katsa') or fine sieve into enamel cups."
      }
    ],
    tips: [
      "A pinch of raw brown muscovado sugar complements the bold jackfruit profile of Barako.",
      "Allow grounds 1 minute to settle naturally before pouring to minimize sediment."
    ]
  }
];

export const SPECIALTY_DRINKS = [
  {
    id: "espresso",
    name: "Single Espresso",
    description: "A concentrated 1:2 shot of coffee extracted under 9 bars of pressure.",
    volumeOz: "1 oz (30 ml)",
    caffeineMg: "63 mg",
    layers: [
      { name: "Crema", color: "bg-amber-600", percent: 20 },
      { name: "Espresso Body", color: "bg-espresso", percent: 80 }
    ]
  },
  {
    id: "macchiato",
    name: "Espresso Macchiato",
    description: "Espresso 'stained' or marked with a dollop of velvety steamed microfoam.",
    volumeOz: "1.5 oz (45 ml)",
    caffeineMg: "63 mg",
    layers: [
      { name: "Microfoam Dollop", color: "bg-cream", percent: 25 },
      { name: "Espresso", color: "bg-espresso", percent: 75 }
    ]
  },
  {
    id: "cortado",
    name: "Cortado",
    description: "Equal parts espresso and warm steamed milk to cut the acidity.",
    volumeOz: "4 oz (120 ml)",
    caffeineMg: "126 mg (Double)",
    layers: [
      { name: "Silky Microfoam", color: "bg-oat", percent: 15 },
      { name: "Steamed Milk", color: "bg-cream", percent: 35 },
      { name: "Double Espresso", color: "bg-espresso", percent: 50 }
    ]
  },
  {
    id: "flat-white",
    name: "Flat White",
    description: "A double ristretto shot with glossy, integrated microfoam.",
    volumeOz: "5 oz (150 ml)",
    caffeineMg: "130 mg",
    layers: [
      { name: "Thin Microfoam", color: "bg-cream", percent: 15 },
      { name: "Steamed Whole Milk", color: "bg-amber-100", percent: 45 },
      { name: "Double Ristretto", color: "bg-espresso", percent: 40 }
    ]
  },
  {
    id: "cappuccino",
    name: "Traditional Cappuccino",
    description: "The classic harmony: 1/3 espresso, 1/3 steamed milk, 1/3 airy foam.",
    volumeOz: "6 oz (180 ml)",
    caffeineMg: "63 - 126 mg",
    layers: [
      { name: "Airy Milk Foam", color: "bg-cream", percent: 33 },
      { name: "Steamed Milk", color: "bg-amber-100", percent: 33 },
      { name: "Espresso Shot", color: "bg-espresso", percent: 34 }
    ]
  },
  {
    id: "latte",
    name: "Caffè Latte",
    description: "A creamy canvas of espresso, sweet steamed milk, and light foam.",
    volumeOz: "8 - 12 oz (240 - 360 ml)",
    caffeineMg: "63 - 126 mg",
    layers: [
      { name: "Velvety Microfoam", color: "bg-cream", percent: 15 },
      { name: "Steamed Milk", color: "bg-amber-100", percent: 65 },
      { name: "Espresso", color: "bg-espresso", percent: 20 }
    ]
  },
  {
    id: "americano",
    name: "Caffè Americano",
    description: "Espresso diluted with hot water, preserving the sweetness and aromatic crema.",
    volumeOz: "8 - 10 oz (240 - 300 ml)",
    caffeineMg: "126 mg (Double)",
    layers: [
      { name: "Crema Ring", color: "bg-amber-600", percent: 10 },
      { name: "Hot Water & Diluted Espresso", color: "bg-roast", percent: 90 }
    ]
  },
  {
    id: "mocha",
    name: "Caffè Mocha (Tablea Infused)",
    description: "Espresso combined with local Davao single-origin chocolate tablea and steamed milk.",
    volumeOz: "8 oz (240 ml)",
    caffeineMg: "95 mg",
    layers: [
      { name: "Microfoam / Cream", color: "bg-cream", percent: 15 },
      { name: "Steamed Milk", color: "bg-amber-100", percent: 45 },
      { name: "Espresso Shot", color: "bg-espresso", percent: 20 },
      { name: "Davao Tablea Cacao", color: "bg-stone-900", percent: 20 }
    ]
  }
];

