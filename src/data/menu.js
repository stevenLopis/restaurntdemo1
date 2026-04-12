/* ─── DATA ───────────────────────────────────────────────── */
export const MENU_ITEMS = [
  /* Street Food */
  { id:1, cat:"Street Food", name:"Neon Ramen", desc:"Glowing broth infused with synthetic umami, chrome noodles, hover-pork, bio-egg, neon bamboo shoots", price:480, img:"https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80", badge:"BESTSELLER" },
  { id:2, cat:"Street Food", name:"Plasma Dumplings", desc:"Translucent steamed parcels filled with lab-grown shrimp, chili oil matrix, quantum vinegar dip", price:320, img:"https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80", badge:"SPICY" },
  { id:3, cat:"Street Food", name:"Circuit Skewers", desc:"Charred synth-meat on titanium skewers, teriyaki voltage glaze, micro-green garnish, side chili chip", price:280, img:"https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80", badge:null },
  { id:4, cat:"Street Food", name:"Flux Tacos", desc:"Three crispy shell vessels with slow-cooked jackal protein, plasma salsa, holographic guac", price:360, img:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80", badge:"NEW" },

  /* Cyber Meals */
  { id:5, cat:"Cyber Meals", name:"Cyber Burger", desc:"2cm thick synth-beef patty, chrome bun baked in UV oven, glitch cheese, binary onion rings", price:620, img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80", badge:"LOADED" },
  { id:6, cat:"Cyber Meals", name:"Holo-Bowl", desc:"Steamed chrome rice, grade-A protein, neon broccoli, miso-tech sauce, sesame laser crunch", price:540, img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80", badge:"HEALTHY" },
  { id:7, cat:"Cyber Meals", name:"Grid Pizza", desc:"Octagonal crust, synthetic mozz, 404 sauce, lab-pepperoni, basil-bot garnish, UV-char crust", price:700, img:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80", badge:null },
  { id:8, cat:"Cyber Meals", name:"Noodle Core XL", desc:"Extra-wide chrome flat noodles, black garlic broth, flash-fried protein cubes, chili thread topping", price:580, img:"https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&q=80", badge:"XL" },

  /* Drinks */
  { id:9,  cat:"Drinks", name:"Quantum Shake",  desc:"Luminescent milk base, synthetic vanilla matrix, hyper-berry swirl, edible neon sprinkle top", price:380, img:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80", badge:"GLOW" },
  { id:10, cat:"Drinks", name:"Plasma Punch",   desc:"Electrolyte-charged citrus blend, ion burst fizz, floating cyan spheres, UV-reactive garnish",  price:320, img:"https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80", badge:null },
  { id:11, cat:"Drinks", name:"Dark Matter Espresso", desc:"Triple-extracted dark bean, zero-gravity foam, temporal sugar crystals, micro black aura",   price:240, img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80", badge:"STRONG" },
  { id:12, cat:"Drinks", name:"Glitch Tea",     desc:"Fermented bio-tea, reactive pigment bloom on ice, nano-mint, electrolyte pearl drops, smoke lid",  price:280, img:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80", badge:"HOT/ICE" },

  /* Desserts */
  { id:13, cat:"Desserts", name:"Neon Sundae",    desc:"Three-scoop synthetic ice cream, chromatic fudge rivers, UV wafer sticks, holographic sprinkles", price:420, img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80", badge:"SWEET" },
  { id:14, cat:"Desserts", name:"Glitch Cake",    desc:"Dark matter sponge layers, voltage buttercream, edible circuit board topping, neon candles",       price:480, img:"https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80", badge:"SHARE" },
  { id:15, cat:"Desserts", name:"Cryo Mochi",     desc:"Six neon-dyed mochi filled with liquid-nitrogen ice cream cores, dusted in shimmer powder",         price:360, img:"https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80", badge:"COLD" },
  { id:16, cat:"Desserts", name:"Data Donut Stack",desc:"Tower of glazed synth-dough, flavors: Magenta Berry, Cyan Custard, Yellow Yuzu, Purple Taro",      price:340, img:"https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80", badge:"STACK" },
];

export const CATS = ["All", "Street Food", "Cyber Meals", "Drinks", "Desserts"];

export const FEATURED = MENU_ITEMS.filter(i => [1,5,9,13].includes(i.id));

export const NAV_PAGES = ["Home","Menu","About","Contact","Help"];