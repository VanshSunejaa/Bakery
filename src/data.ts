/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cake, Testimonial, Announcement } from './types';

export const GOURMET_FLAVORS = [
  {
    name: "Rose Water Champagne",
    description: "Light champagne-infused chiffon layered with organic raspberry rose compote and white chocolate whipped ganache."
  },
  {
    name: "Madagascan Bourbon Vanilla & Fig",
    description: "Premium heirloom Madagascan vanilla bean cake filled with roasted mission fig jam and salted velvet buttercream."
  },
  {
    name: "Sicilian Pistachio & Cardamom",
    description: "Ground pistachio cake layered with a delicate orange blossom cardamom curd and crushed caramelized pistachios."
  },
  {
    name: "Earl Grey Lavender Infusion",
    description: "Fine Earl Grey tea-steeped sponge layered with lavender honey lemon curd and light-as-air whipped fresh cream."
  },
  {
    name: "Valrhona Dark Chocolate & Salted Toffee",
    description: "Decadent Dutch cocoa sponge filled with rich dark chocolate fudge, home-spun fleur de sel toffee bits, and espresso mousse."
  },
  {
    name: "Meyer Lemon & Elderflower",
    description: "Zesty Meyer lemon buttermilk cake, soaked in St-Germain elderflower syrup, filled with house-made lemon cream."
  }
];

export const CAKE_SIZES = [
  { name: "6\" Petite", servings: "8-10 guests", dimensions: "6\" diameter × 5\" height", priceAdded: 0 },
  { name: "8\" Classic", servings: "15-18 guests", dimensions: "8\" diameter × 5\" height", priceAdded: 45 },
  { name: "10\" Grand", servings: "25-30 guests", dimensions: "10\" diameter × 5\" height", priceAdded: 110 },
  { name: "Double-Tier Signature", servings: "40-45 guests", dimensions: "6\" on 9\" tiers", priceAdded: 240 },
  { name: "Triple-Tier Grand Heirloom", servings: "75-90 guests", dimensions: "6\" on 8\" on 10\" tiers", priceAdded: 480 }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    text: " ✨ Currently booking bespoke cakes for Summer & Autumn 2026. Handcrafted in New Jersey. ✨",
    active: true
  },
  {
    id: "ann-2",
    text: "🌙 Order by June 15 for a complimentary gourmet taster box on wedding cake commissions. 🌸",
    active: false
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    authorName: "Elizabeth Vance",
    roll: "Bride",
    location: "Short Hills, NJ",
    text: "L&D Home Bakery created a stunning triple-tiered floral masterpiece for our wedding. The Elderflower and Raspberry Champagne flavors were otherworldly. Our guests are still raving about how it was the most beautiful and delicious cake they've ever experienced.",
    rating: 5,
    date: "May 12, 2026"
  },
  {
    id: "test-2",
    authorName: "Marcus Sterling",
    roll: "Sponsor & Host",
    location: "Princeton, NJ",
    text: "For our gala, the minimalist gold-foil custom cake was the absolute center of attention. Elegant, sophisticated, and with an incredibly balanced taste. It is rare to find a bakery that marries high-end Parisian design with such impeccable, organic taste.",
    rating: 5,
    date: "April 29, 2026"
  },
  {
    id: "test-3",
    authorName: "Alessandra Rossi",
    roll: "Mother",
    location: "Hoboken, NJ",
    text: "The whimsical teddy bear double-tier cake made my daughter's first birthday absolutely magical. L&D worked closely with me on every sketch. It was a Pinterest dream come to life, and the pistachio cardamom flavor was supreme!",
    rating: 5,
    date: "April 02, 2026"
  },
  {
    id: "test-4",
    authorName: "Vivianna Thorne",
    roll: "Client",
    location: "Summit, NJ",
    text: "A truly luxurious experience. From the sleek custom inquiry form to the personal consultations, L&D Home Bakery treats cake design like fine art. Simply spectacular.",
    rating: 5,
    date: "March 18, 2026"
  }
];

export const INITIAL_CAKES: Cake[] = [
  {
    id: "cake-1",
    name: "The Grand Rose Wedding Masterpiece",
    shortDescription: "Delicated multi-tiered Parisian bridal cake adorned with intricate sugar rosettes, genuine gold luster and champagne cream.",
    fullDescription: "Designed for the ultimate romantic statement, this grand multi-tiered cake features organic textured buttercream, hand-sculpted sugar cream roses that look completely lifelike, and dynamic splashes of edible 24k gold leaf. Filled with our gourmet Champagne infused fillings and baked with premium organic unbleached flour, it is as unforgettable in taste as it is majestic in presentation.",
    startingPrice: 380,
    category: "wedding",
    imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=1200",
    flavors: ["Rose Water Champagne", "Madagascan Bourbon Vanilla & Fig", "Meyer Lemon & Elderflower"],
    sizes: CAKE_SIZES,
    isBestseller: true,
    rating: 5,
    ingredients: ["Organic wheat flour", "Organic pasture eggs", "Madagascar vanilla pods", "French Valrhona chocolate", "Elderflower liqueur syrup", "24K edible gold gold-leaf"]
  },
  {
    id: "cake-2",
    name: "Victorian Bow & Ribbon Silk",
    shortDescription: "Stunning vintage piped cake adorned with hand-tied satin look sugar icing bows, delicate lace ruffles and pearls.",
    fullDescription: "Our signature Pinterest-aesthetic masterpiece. This single or double-tier cake features hand-piped Royal Velvet buttercream ruffles, delicate star lattices, beautiful handmade icing ribbons that elegantly drape over the edges, and petite sugar pearls. Perfect for birthdays, modern bridal showers, and stylish intimate celebrations that demand high-fashion aesthetic.",
    startingPrice: 165,
    category: "vintage",
    imageUrl: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&q=80&w=1200",
    flavors: ["Madagascan Bourbon Vanilla & Fig", "Earl Grey Lavender Infusion", "Rose Water Champagne"],
    sizes: CAKE_SIZES.slice(0, 3), // Petite, Classic, Grand
    isBestseller: true,
    rating: 4.9,
    ingredients: ["European style salted butter", "Cane sugar", "Egg whites", "Madagascan vanilla bean paste", "Organic raspberries"]
  },
  {
    id: "cake-3",
    name: "Minimalist Sandstone & Orchid",
    shortDescription: "An elegant textured art-piece styled after organic sandstone with 24k gold dust and a live heirloom orchid garnish.",
    fullDescription: "For the lover of contemporary luxury and architectural minimalism. The cake boasts a plaster-like texturized exterior with rough natural stone-like edges. Adorned with delicate flecks of pure 24 karat gold leaf and decorated with a single, structural white moth orchid. It holds a subtle, gorgeous sculptural presence that stands out at high-end gallery events or sleek modern dinner parties.",
    startingPrice: 195,
    category: "minimal",
    imageUrl: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?auto=format&fit=crop&q=80&w=1200",
    flavors: ["Sicilian Pistachio & Cardamom", "Valrhona Dark Chocolate & Salted Toffee", "Earl Grey Lavender Infusion"],
    sizes: CAKE_SIZES.slice(0, 4),
    isBestseller: false,
    rating: 4.8,
    ingredients: ["Sicilian pistachio flour", "Cardamom infusion", "Cold-pressed orange blossom water", "Organic butter", "Almond extract"]
  },
  {
    id: "cake-4",
    name: "Summer Meadow Floral Symphony",
    shortDescription: "Artistic luxury cake decorated with edible pressed spring flowers, lavender stems, chamomile, and fresh field herbs.",
    fullDescription: "A rustic yet ultra-refined creation inspired by a summer morning walk through Somerset countryside. This cake is coated in a flawless semi-naked white chocolate Swiss meringue cover, beautifully decorated with hand-pressed organic edible violets, lavender petals, elderflowers, and cornflowers. Infused wonderfully with our citrus or lavender liquors for a refreshing and deeply sensory experience.",
    startingPrice: 180,
    category: "floral",
    imageUrl: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=1200",
    flavors: ["Earl Grey Lavender Infusion", "Meyer Lemon & Elderflower", "Rose Water Champagne"],
    sizes: CAKE_SIZES.slice(0, 3),
    isBestseller: true,
    rating: 5,
    ingredients: ["Edible organic pressed flowers", "Organic lavender buds", "Swiss meringue buttercream", "Lemon curd", "Elderflower syrup"]
  },
  {
    id: "cake-5",
    name: "Dreamy Celestial Whimsy Bed",
    shortDescription: "A magical double-tier children's or baby shower cake with hand-painted watercolor skies, cloud peaks, and a sleeping bear.",
    fullDescription: "Elegant and whimsical without looking cluttered. Featuring hand-blended pastel watercolor blue and blush-toned buttercream cloudscapes, dainty silver stars, fluffy marshmallows representing cumulus clouds, and an adorable handcrafted clay sculpture of a sleeping teddy bear tucked under a sugar blanket on a crescent moon. Sweetness redefined with a premium touch for your little one's special day.",
    startingPrice: 220,
    category: "kids",
    imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=1200",
    flavors: ["Valrhona Dark Chocolate & Salted Toffee", "Madagascan Bourbon Vanilla & Fig"],
    sizes: CAKE_SIZES.slice(0, 4),
    isBestseller: false,
    rating: 4.9,
    ingredients: ["Madagascar cocoa liquor", "House-salted toffee bits", "Fleur de sel", "Condensed organic milk", "Egg whites"]
  },
  {
    id: "cake-6",
    name: "The Golden Empress Celebration",
    shortDescription: "A striking royal gold-brushed luxurious cake featuring concrete textures and a bold Crown-like design with sugar diamonds.",
    fullDescription: "An absolute showstopper designed for milestones, anniversaries, or luxury gala celebrations. Features charcoal black and royal deep navy textured buttercream, with broad, artistic gold-powder strokes brushing the base and crowning with absolute brilliance at the peak. Enhanced with sugar-spun glass gems to mimic royal diamonds, this cake commands absolute admiration.",
    startingPrice: 250,
    category: "luxury",
    imageUrl: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&q=80&w=1200",
    flavors: ["Valrhona Dark Chocolate & Salted Toffee", "Sicilian Pistachio & Cardamom"],
    sizes: CAKE_SIZES.slice(1, 5), // starts with Classic
    isBestseller: false,
    rating: 5,
    ingredients: ["Valrhona organic cocoa powder", "Charcoal element powder", "Gold flake luster pigment", "Espresso shot", "Brown butter fudge"]
  },
  {
    id: "cake-7",
    name: "Modern Berry Cascade Gateau",
    shortDescription: "Artfully layered and overflowing with fresh winter strawberries, ripe blackberries, raspberries, and white ganache.",
    fullDescription: "The ultimate representation of organic decadence. A multi-layered, tall chocolate or vanilla sponge cake with generous helpings of handmade woodland berry jams, cascading fresh, ripe strawberries dusted with shimmering powdered sugar, and a spectacular cream collar that drips delightfully over the side. Earthy yet highly photogenic of Pinterest cake perfection.",
    startingPrice: 155,
    category: "minimal",
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=1200",
    flavors: ["Rose Water Champagne", "Valrhona Dark Chocolate & Salted Toffee"],
    sizes: CAKE_SIZES.slice(0, 3),
    isBestseller: false,
    rating: 4.7,
    ingredients: ["Organic strawberries", "Handcrafted raspberry compote", "Whipped Madagascan white chocolate ganache", "Cake flour"]
  },
  {
    id: "cake-8",
    name: "Petite Bow Pearl Tier",
    shortDescription: "A delicate double-layered pastel rose-water cake topped with hand-piped frosting bows and miniature sugar pearls.",
    fullDescription: "Perfect for high-tea assemblies, classy bachelorette weekend mornings in Summit or Hoboken, or intimate birthdays. Coated in a lovely light blushing-rose-tea natural glaze, adorned with sweet small pearls along the borders and tiny bows. Light, soft, feminine, and utterly exquisite.",
    startingPrice: 130,
    category: "vintage",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200",
    flavors: ["Rose Water Champagne", "Earl Grey Lavender Infusion", "Meyer Lemon & Elderflower"],
    sizes: CAKE_SIZES.slice(0, 2), // Petite and Classic
    isBestseller: true,
    rating: 5,
    ingredients: ["Blush rose petal tea syrup", "Organic cane sugar", "Fresh pastured eggs", "Salted cream butter"]
  }
];

export const CATEGORIES_CONFIG = [
  { slug: "all", label: "All Creations", count: 8 },
  { slug: "wedding", label: "Wedding", count: 1 },
  { slug: "vintage", label: "Vintage Bow", count: 2 },
  { slug: "minimal", label: "Minimalist Art", count: 2 },
  { slug: "floral", label: "Pressed Floral", count: 1 },
  { slug: "kids", label: "Kids Whimsy", count: 1 },
  { slug: "luxury", label: "Luxury Celebration", count: 1 }
];

export const INSTAGRAM_POSTS = [
  { id: 1, url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600", likes: "1,248" },
  { id: 2, url: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=600", likes: "912" },
  { id: 3, url: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=600", likes: "2,044" },
  { id: 4, url: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&q=80&w=600", likes: "1,556" },
  { id: 5, url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600", likes: "840" },
  { id: 6, url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600", likes: "1,118" }
];
