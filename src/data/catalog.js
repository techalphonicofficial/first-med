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

export const products = [
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

export const vendors = [
  { name: "FirstMED Plus", area: "Sector 21", eta: "18 min", score: "4.9" },
  { name: "Cura Quick", area: "Green Park", eta: "25 min", score: "4.7" },
  { name: "Wellnest Pharmacy", area: "City Center", eta: "30 min", score: "4.8" }
];

export const orders = [
  { id: "FM-2049", status: "Out for delivery", total: 856, eta: "18 min" },
  { id: "FM-1988", status: "Delivered", total: 432, eta: "Completed" }
];
