/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CollectionsGridProps {
  onSelectCategory: (categorySlug: string) => void;
  activeCategory: string;
}

export const EXQUISITE_CATEGORIES = [
  {
    slug: "wedding",
    title: "Bridal & Wedding",
    tagline: "The Grand Romance",
    description: "Multi-tiered sugar-sculpted works of absolute beauty for your special heirloom day.",
    imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=600",
    size: "lg:col-span-8 md:col-span-6"
  },
  {
    slug: "vintage",
    title: "Vintage Bow & Ribbon",
    tagline: "Parisian Elegance",
    description: "Delicate royal buttercream ruffles, pearl drapes, and elegant hand-tied ribbons.",
    imageUrl: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&q=80&w=600",
    size: "lg:col-span-4 md:col-span-6"
  },
  {
    slug: "minimal",
    title: "Minimalist Art",
    tagline: "Architectural Lines",
    description: "Sleek plaster-like stone textures, clean lines, orchids and delicate metal leaves.",
    imageUrl: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?auto=format&fit=crop&q=80&w=600",
    size: "lg:col-span-4 md:col-span-6"
  },
  {
    slug: "floral",
    title: "Pressed Organic Floral",
    tagline: "Botanical Poetry",
    description: "Enchanting celebration cakes decorated with handpressed organic fields of edible blossoms.",
    imageUrl: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=600",
    size: "lg:col-span-4 md:col-span-6"
  },
  {
    slug: "kids",
    title: "Kids Whimsical Fantasy",
    tagline: "Childhood Reverie",
    description: "Soft watercolor skies, sleep-styled bears and magical elements with luxury details.",
    imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=600",
    size: "lg:col-span-4 md:col-span-6"
  },
  {
    slug: "luxury",
    title: "Luxury Celebrations",
    tagline: "The Crown Jewels",
    description: "Bold gold-brushed marvels, concrete black textures, and gemstone details for milestones.",
    imageUrl: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&q=80&w=600",
    size: "lg:col-span-12 md:col-span-12"
  }
];

export default function CollectionsGrid({ onSelectCategory }: CollectionsGridProps) {
  return (
    <section 
      id="collections-grid-section" 
      className="py-24 bg-white px-6 border-b border-[#B89B72]/10 select-none"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Title */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="flex items-center gap-1.5 justify-center">
            <span className="w-6 h-[1px] bg-[#B89B72]/40"></span>
            <span className="text-[10px] tracking-[0.25em] font-medium uppercase text-[#B89B72]">The Collections</span>
            <span className="w-6 h-[1px] bg-[#B89B72]/40"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-[#3D342F] font-light">
            Sought-After <span className="italic text-[#B89B72]">Artisanal Categories</span>
          </h2>
          <p className="text-stone-400 font-sans tracking-wide text-xs sm:text-sm max-w-xl font-light">
            Every creation is individually conceptualized and baked fresh in our atelier. 
            Filtered below to match your aesthetic mood. Click to explore.
          </p>
        </div>

        {/* Bento Grid */}
        <div id="collections-grid-container" className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {EXQUISITE_CATEGORIES.map((cat, idx) => (
            <motion.div
              id={`collection-card-${cat.slug}`}
              key={cat.slug}
              className={`group overflow-hidden rounded-[2rem] bg-[#FDFBF7] border border-[#B89B72]/10 h-[380px] sm:h-[420px] relative cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:translate-y-[-4px] ${cat.size}`}
              onClick={() => onSelectCategory(cat.slug)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
            >
              {/* Background cover image with lazy load + ref checking */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={cat.imageUrl}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out scale-100 group-hover:scale-106 blur-[0.5px] group-hover:blur-0"
                  referrerPolicy="no-referrer"
                />
                
                {/* Luxury overlay dark gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D342F]/90 via-[#3D342F]/40 to-[#3D342F]/20 group-hover:via-[#3D342F]/35 group-hover:from-[#3D342F]/95 transition-all duration-300" />
              </div>

              {/* Decorative ambient border glow on hover */}
              <div className="absolute inset-0 border border-[#FDFBF7]/0 group-hover:border-[#FDFBF7]/15 rounded-[2rem] transition-all duration-500 pointer-events-none" />

              {/* Text Context - Placed elegantly at the bottom */}
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end text-neutral-100 z-10 select-none">
                
                {/* Visual Accent */}
                <div className="flex items-center gap-2 mb-1.5 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <Sparkles className="w-3.5 h-3.5 text-[#B89B72]" />
                  <span className="text-[9px] tracking-[0.25em] font-medium uppercase text-[#FDFBF7]/80">
                    {cat.tagline}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-white group-hover:text-[#E8D5C4] transition-colors">
                  {cat.title}
                </h3>

                <p className="text-neutral-300 font-sans font-light text-xs sm:text-sm tracking-wide leading-relaxed mt-2.5 max-w-md line-clamp-2 md:opacity-0 md:group-hover:opacity-100 transform translate-y-3 md:group-hover:translate-y-0 transition-all duration-500">
                  {cat.description}
                </p>

                {/* Footer Action Tag */}
                <div className="flex items-center gap-1 text-[#E8D5C4]/95 text-[10px] tracking-[0.2em] uppercase font-semibold mt-4 pt-1.5 border-t border-[#FDFBF7]/10 w-fit">
                  <span>Explore Atelier</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
