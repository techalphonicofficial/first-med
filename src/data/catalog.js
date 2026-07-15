export const categories = [
  "Health Resource Center",
  "Personal Care",
  "Hair Care",
  "Fitness & Health",
  "Sexual Wellness",
  "Homeopathy",
  "Vitamins & Nutrition",
  "Supports & Braces",
  "Immunity Boosters"
];

const categoryHandles = {
  "Health Resource Center": "health-resource-center",
  "Personal Care": "personal-care",
  "Hair Care": "hair-care",
  "Fitness & Health": "fitness-and-health",
  "Sexual Wellness": "sexual-wellness",
  Homeopathy: "homeopathy",
  "Vitamins & Nutrition": "vitamins-and-nutrition",
  "Supports & Braces": "supports-and-braces",
  "Immunity Boosters": "immunity-boosters"
};

const fallbackImages = [
  "/product-images/paracetamol-tablets.svg",
  "/product-images/cough-syrup.svg",
  "/product-images/antacid-gel.svg",
  "/product-images/ors-sachet.svg",
  "/product-images/vitamin-c-tablets.svg",
  "/product-images/first-aid-kit.svg",
  "/product-images/tablets.svg",
  "/product-images/syrup.svg",
  "/product-images/cardio-tablets.svg",
  "/product-images/body-lotion.svg",
  "/product-images/self-care.svg",
  "/product-images/omega-softgels.svg",
  "/product-images/protein-powder.svg",
  "/product-images/wellness.svg",
  "/product-images/demo-blue-pack.svg",
  "/product-images/demo-yellow-box.svg",
  "/product-images/demo-mint-bottle.svg",
  "/product-images/demo-navy-tube.svg"
];

const demoScrollImages = [
  "/product-images/demo-blue-pack.svg",
  "/product-images/demo-yellow-box.svg",
  "/product-images/demo-mint-bottle.svg",
  "/product-images/demo-navy-tube.svg"
];

const categoryImages = {
  "Health Resource Center": ["/product-images/paracetamol-tablets.svg", "/product-images/cough-syrup.svg", "/product-images/antacid-gel.svg", "/product-images/ors-sachet.svg", "/product-images/first-aid-kit.svg"],
  "Personal Care": ["/product-images/body-lotion.svg", "/product-images/self-care.svg", "/product-images/wellness.svg"],
  "Hair Care": ["/product-images/self-care.svg", "/product-images/body-lotion.svg", "/product-images/wellness.svg"],
  "Fitness & Health": ["/product-images/protein-powder.svg", "/product-images/omega-softgels.svg", "/product-images/wellness.svg"],
  "Sexual Wellness": ["/product-images/self-care.svg", "/product-images/body-lotion.svg", "/product-images/wellness.svg"],
  Homeopathy: ["/product-images/cough-syrup.svg", "/product-images/tablets.svg", "/product-images/wellness.svg"],
  "Vitamins & Nutrition": ["/product-images/vitamin-c-tablets.svg", "/product-images/wellness.svg", "/product-images/omega-softgels.svg"],
  "Supports & Braces": ["/product-images/self-care.svg", "/product-images/body-lotion.svg", "/product-images/cardio-tablets.svg"],
  "Immunity Boosters": ["/product-images/wellness.svg", "/product-images/tablets.svg", "/product-images/omega-softgels.svg"]
};

const categoryProducts = categories.flatMap((category) =>
  Array.from({ length: 7 }).map((_, innerIndex) => ({ category, innerIndex }))
);

const generatedProducts = [
  ...Array.from({ length: 5 }).map((_, index) => ({ category: "Health Resource Center", innerIndex: index, forcedSlug: `otc-${index + 1}`, forcedRx: false })),
  ...Array.from({ length: 2 }).map((_, index) => ({ category: "Health Resource Center", innerIndex: index + 5, forcedSlug: `rx-${index + 1}`, forcedRx: true })),
  { category: "Personal Care", innerIndex: 0, forcedSlug: "care-1", forcedRx: false },
  ...categoryProducts
].map((entry, index) => {
  const category = entry.category;
  const rxRequired = typeof entry.forcedRx === "boolean" ? entry.forcedRx : index % 9 === 0 || category === "Health Resource Center";
  const names = {
    "Health Resource Center": ["Paracetamol 500mg Tablets", "Cough Relief Syrup", "Antacid Gel Sachets"],
    "Personal Care": ["Hydra Soft Face Wash", "Daily Moisture Lotion", "Gentle Care Cleanser"],
    "Hair Care": ["Root Boost Hair Serum", "Keratin Repair Conditioner", "Scalp Cooling Shampoo"],
    "Fitness & Health": ["Whey Protein Classic", "Electrolyte Hydration Pack", "Omega Recovery Softgels"],
    "Sexual Wellness": ["Ultra Thin Condoms", "Intimate Wash Sensitive", "Wellness Delay Spray"],
    Homeopathy: ["Arnica Montana Drops", "Nux Vomica 30", "Calendula Ointment"],
    "Vitamins & Nutrition": ["Vitamin D3 Tablets", "Vitamin B12 Spray", "Calcium Magnesium Zinc"],
    "Supports & Braces": ["Knee Support Sleeve", "Ankle Binder", "Lumbar Support Belt"],
    "Immunity Boosters": ["Vitamin C Zinc Tablets", "Tulsi Capsules", "Elderberry Gummies"]
  };
  const title = names[category][entry.innerIndex % 3];
  const slug = entry.forcedSlug || `${categoryHandles[category]}-${entry.innerIndex + 1}`;
  const imageSet = categoryImages[category] || fallbackImages;
  const image = imageSet[entry.innerIndex % imageSet.length];
  return {
    id: `fm-${index + 1}`,
    slug,
    name: title,
    category,
    brand: ["FirstMED", "CuraLife", "Medora", "NutriCore"][index % 4],
    image,
    imageAlt: `${title} product pack image`,
    gallery: [image, ...demoScrollImages, ...imageSet.filter((item) => item !== image)].slice(0, 5),
    price: 89 + index * 13,
    mrp: 139 + index * 18,
    rating: (4.1 + (index % 8) / 10).toFixed(1),
    delivery: index % 3 === 0 ? "90 min" : "Today",
    inStock: index % 11 !== 0,
    rxRequired,
    packSize: ["10 tablets", "100 ml bottle", "10 sachets", "30 tablets"][index % 4],
    usage: [
      "Commonly used for fever and mild pain relief.",
      "Used for cough and throat irritation support.",
      "Used for acidity, bloating and indigestion support.",
      "Used to support hydration after fluid loss."
    ][index % 4],
    dosageNote: rxRequired
      ? "Use only as directed by a registered doctor."
      : "Follow the product label or pharmacist guidance. Demo information only.",
    warning: rxRequired
      ? "Prescription medicine. Do not self-medicate."
      : "Check allergies, age suitability and existing conditions before use.",
    manufacturer: ["FirstMED Labs", "CuraLife Healthcare", "Medora Wellness", "NutriCore Pharma"][index % 4],
    description:
      "A quality-tested healthcare product prepared for fast delivery, clear dosage guidance, and dependable shelf availability.",
    specs: ["Authentic product", "Temperature-safe dispatch", "Easy returns on eligible items"]
  };
});

export const products = [
  {
    id: "fm-1mg-1",
    slug: "dolo-650-tablet",
    name: "Dolo 650 Tablet",
    category: "Health Resource Center",
    brand: "Micro Labs Ltd",
    image: "/generated/dolo.png",
    imageAlt: "Dolo 650 Tablet pack",
    gallery: ["/generated/dolo.png"],
    price: 33,
    mrp: 33,
    rating: "4.8",
    delivery: "Today",
    inStock: true,
    rxRequired: false,
    packSize: "15 tablets",
    usage: "Highly effective for the symptomatic treatment of mild to moderate pain (including headache, migraine, toothache, musculoskeletal pain, and dysmenorrhea) and the reduction of fever associated with common cold, influenza, and other viral or bacterial infections.",
    dosageNote: "Adults and children over 12 years: Take 1 tablet every 4 to 6 hours as needed for pain or fever. Do not take more than 4 tablets (2600 mg) in 24 hours. Swallow the tablet whole with a glass of water. Do not crush or chew. If a dose is missed, take it as soon as you remember, unless it is almost time for your next dose. In case of suspected overdose, seek immediate medical attention even if there are no immediate symptoms.",
    warning: "CRITICAL WARNING: Contains Paracetamol. Taking more than the daily recommended dose may cause severe liver damage or allergic reactions (e.g., swelling of the face, mouth, and throat, difficulty breathing, itching, or rash). Do not use this medication simultaneously with any other paracetamol-containing products (such as cold and flu remedies). Consult your doctor before use if you suffer from severe kidney or liver disease, are severely malnourished, or consume more than 3 alcoholic beverages a day. Pregnant and breastfeeding women should seek medical advice before consumption. Keep strictly out of reach of children.",
    manufacturer: "Micro Labs Ltd, 31, Race Course Road, Bangalore - 560001, India",
    description: "Dolo 650 Tablet is a universally trusted and widely prescribed analgesic (pain reliever) and antipyretic (fever reducer). Formulated with 650 mg of high-grade Paracetamol, it acts centrally in the brain by elevating the pain threshold and acting on the hypothalamic heat-regulating center to reduce fever. Unlike NSAIDs, it is exceptionally gentle on the stomach lining and does not cause gastric irritation, making it suitable for patients with a history of stomach ulcers or acidity. It is considered the first line of defense for a wide spectrum of acute pain conditions including tension headaches, severe migraines, dental extractions, osteoarthritis flare-ups, and debilitating body aches caused by viral illnesses like Dengue or COVID-19. The rapid-release formulation ensures that the active ingredient is quickly absorbed into the bloodstream, providing noticeable relief within 30 to 45 minutes of ingestion. Its predictable safety profile makes it one of the most reliable over-the-counter medications available globally when used as directed. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, nisi. Aenean diam dictum eros, at aliquet mauris metus non diam. Suspendisse potenti. In hac habitasse platea dictumst. Ut tempor, lacus vehicula rutrum tincidunt, dui nisi tempus erat, in rhoncus eros diam interdum diam. Vestibulum scelerisque, purus et commodo porta, risus quam ullamcorper turpis, id viverra magna odio in sem. Proin vehicula, magna quis malesuada pulvinar, orci tortor ornare purus, eu rutrum diam est sit amet lacus. In hac habitasse platea dictumst. Quisque facilisis. Nunc tempus, libero ac interdum rhoncus, ipsum leo vehicula dolor, sit amet lobortis ligula mauris bibendum purus. Nunc facilisis est nec risus. Phasellus magna.",
    specs: [
      "Active Ingredient: Paracetamol IP 650mg",
      "Action Mechanism: Cyclooxygenase (COX) pathway inhibition in the CNS",
      "Onset of action: 30-45 minutes",
      "Duration of effect: 4-6 hours",
      "Gastric tolerance: High (Stomach-friendly)",
      "Form: Uncoated rapid-release tablet",
      "Color: White",
      "Shape: Capsule-shaped, biconvex",
      "Shelf Life: 36 months from manufacture",
      "Storage: Store below 30°C, protected from direct sunlight and moisture",
      "Dietary Preference: 100% Vegetarian",
      "Prescription Status: Over The Counter (OTC)",
      "Approvals: FDA & CDSCO Approved"
    ]
  },
  {
    id: "fm-1mg-2",
    slug: "shelcal-500-tablet",
    name: "Shelcal 500 Calcium + Vitamin D3 Tablet",
    category: "Vitamins & Nutrition",
    brand: "Torrent Pharmaceuticals Ltd",
    image: "/generated/shelcal.png",
    imageAlt: "Shelcal 500 Tablet box",
    gallery: ["/generated/shelcal.png"],
    price: 119.5,
    mrp: 144,
    rating: "4.7",
    delivery: "90 min",
    inStock: true,
    rxRequired: false,
    packSize: "15 tablets",
    usage: "Used for the treatment and prevention of calcium and vitamin D3 deficiency.",
    dosageNote: "Take 1 tablet daily with a main meal or as directed by your physician.",
    warning: "Consult your doctor if you have a history of kidney stones before use.",
    manufacturer: "Torrent Pharmaceuticals Ltd",
    description: "Shelcal 500 Tablet is a premium dietary supplement formulated with high-quality calcium and vitamin D3 that promotes strong bone and joint health. It ensures maximum absorption of calcium in the body. Calcium is essential for the normal functioning of nerves, cells, muscle, and bone.",
    specs: ["Vegetarian", "FSSAI approved", "Enhanced absorption"]
  },
  {
    id: "fm-1mg-3",
    slug: "volini-pain-relief-spray",
    name: "Volini Pain Relief Spray",
    category: "Personal Care",
    brand: "Sun Pharmaceutical Industries Ltd",
    image: "/generated/volini.png",
    imageAlt: "Volini Spray can",
    gallery: ["/generated/volini.png"],
    price: 148,
    mrp: 165,
    rating: "4.6",
    delivery: "Today",
    inStock: true,
    rxRequired: false,
    packSize: "60 g",
    usage: "Provides instant and long-lasting relief from acute musculoskeletal pain including lower backache, cervical neck pain, frozen shoulder, wrist sprains, ankle twists, muscle stiffness, and minor sports injuries. Also beneficial for arthritic joint pain flare-ups.",
    dosageNote: "Shake the can vigorously before each use. Hold the aerosol canister approximately 5 to 8 centimeters (2 to 3 inches) away from the affected area. Spray evenly in a sweeping motion for 2 to 3 seconds. Do not massage or rub the area immediately after application; let the micro-particles absorb naturally into the skin. Apply 3 to 4 times a day or as recommended by your physiotherapist. Wash your hands thoroughly with soap after application to prevent accidental transfer to sensitive areas.",
    warning: "HIGHLY FLAMMABLE: The canister is pressurized. Do not expose to temperatures exceeding 50°C. Keep away from naked flames, incandescent materials, and direct sunlight. Do not pierce or burn the can even when empty. STRICTLY FOR EXTERNAL USE ONLY. Never apply to open wounds, cuts, abraded skin, or mucosal membranes (eyes, nose, mouth). Discontinue use immediately if skin irritation, severe rash, or excessive burning occurs. Not recommended for children under 12 years of age unless prescribed by a doctor. Avoid inhaling the spray mist.",
    manufacturer: "Sun Pharmaceutical Industries Ltd, SUN HOUSE, CTS No. 201 B/1, Western Express Highway, Goregaon (E), Mumbai 400063",
    description: "Volini Pain Relief Spray is India’s most trusted, scientifically advanced topical analgesic designed to tackle acute body pain instantly. Powered by an advanced micro-particle aerosol technology, it delivers active ingredients (Diclofenac Diethylamine, Methyl Salicylate, Menthol, and Linseed Oil) deep through the dermal layers directly to the site of inflammation. Diclofenac acts as a potent non-steroidal anti-inflammatory drug (NSAID) that blocks the synthesis of pain-causing prostaglandins. Methyl Salicylate and Menthol work synergistically as counter-irritants; they initially create a deep cooling sensation followed by a soothing warmth that distracts the brain from pain signals and relaxes stiff muscles. Linseed oil aids in the reduction of inflammation and enhances the transdermal penetration of the other active compounds. The spray format is particularly advantageous for hard-to-reach areas like the mid-back and ensures a hygienic, touch-free application—making it an essential component of any home first-aid kit or athlete's gym bag.",
    specs: [
      "Key Ingredients: Diclofenac Diethylamine 1.16% w/w, Methyl Salicylate 10% w/w, Menthol 5% w/w, Linseed Oil 3% w/w",
      "Delivery System: Advanced pressurized aerosol with 360-degree spray valve",
      "Absorption: Ultra-fast transdermal penetration via micro-particle technology",
      "Action: Dual Action (Cooling followed by Deep Heat)",
      "Application Type: Touch-free (No rubbing required)",
      "Net Weight: 60 grams",
      "Propellant: Ozone-friendly CFC-free propellant",
      "Recommended For: Sports injuries, Sprains, Backache, Joint pain",
      "Shelf Life: 24 months from manufacture",
      "Packaging: Durable metallic canister with protective cap",
      "Brand Heritage: #1 Doctor Recommended Pain Relief Brand in India",
      "Safety: Clinically tested for dermatological safety"
    ]
  },
  ...generatedProducts
];

export const vendors = [
  { name: "FirstMED Plus", area: "Sector 21", eta: "18 min", score: "4.9" },
  { name: "Cura Quick", area: "Green Park", eta: "25 min", score: "4.7" },
  { name: "Wellnest Pharmacy", area: "City Center", eta: "30 min", score: "4.8" }
];

export const orders = [
  { id: "FM-2049", status: "Out for delivery", total: 856, eta: "18 min" },
  { id: "FM-1988", status: "Delivered", total: 432, eta: "Completed" }
];
