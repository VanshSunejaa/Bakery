/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChefHat, Flame, Leaf, HelpCircle, Heart } from 'lucide-react';

export default function AboutBrand() {
  return (
    <section 
      id="about-section" 
      className="py-24 bg-white px-6 border-b border-[#B89B72]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        
        {/* Left Column - Portrait & Floating Elements */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          
          {/* Framed Master Backdrop */}
          <div className="relative w-full max-w-[420px] aspect-[4/5] sm:aspect-[3/4]">
            
            {/* Elegant Background Card Shadow */}
            <div className="absolute inset-x-[-15px] top-[-15px] h-full border border-[#B89B72]/10 rounded-[3rem] bg-[#E8D5C4]/20 -rotate-3 pointer-events-none" />
            <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-lg border border-[#B89B72]/10">
              <img
                src="https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=800"
                alt="Finishing cake decoration in atelier"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              
              {/* Dark subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
            </div>

            {/* Floating Decorative Stamp Circle */}
            <motion.div
              className="absolute -bottom-8 -left-8 bg-[#FDFBF7] border border-[#B89B72]/20 p-5 rounded-full shadow-2xl flex flex-col items-center justify-center w-36 h-36 hidden sm:flex select-none"
              animate={{ rotate: 15 }}
              whileInView={{ rotate: [15, -15, 15] }}
              viewport={{ once: true }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-full border border-dashed border-[#B89B72]/40 rounded-full flex flex-col items-center justify-center text-center">
                <ChefHat className="w-5 h-5 text-[#B89B72] mb-1" />
                <span className="font-serif text-[10px] tracking-widest text-[#3D342F] uppercase">Artisan</span>
                <span className="text-[7px] font-sans tracking-[0.2em] text-[#B89B72] uppercase mt-0.5">Est. 2024</span>
              </div>
            </motion.div>

            {/* Overlapping small landscape card */}
            <motion.div
              id="nj-delivery-pill"
              className="absolute -top-6 -right-6 bg-[#3D342F] text-[#FDFBF7] p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 border border-white/5 select-none"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-3 h-3 rounded-full bg-[#B89B72] animate-ping" />
              <div className="text-left">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-[#FDFBF7]">Delivering statewide</p>
                <p className="text-[8px] font-sans text-stone-300 tracking-wide mt-0.5">Summit • Princeton • Hoboken • Short Hills</p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Right Column - Text & Editorial Revelations */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8 select-none">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-[1px] bg-[#B89B72]/40"></span>
              <span className="text-[10px] tracking-[0.25em] font-medium uppercase text-[#B89B72]">The Atelier Legacy</span>
              <span className="w-6 h-[1px] bg-[#B89B72]/40"></span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-[#3D342F] font-light">
              Crafted in New Jersey, <br />
              <span className="italic text-[#B89B72]">Envisioned in Fine Art</span>
            </h2>
            
            <p className="text-stone-500 font-sans font-light text-sm tracking-wide leading-relaxed">
              At L&D Home Bakery, we do not bake cakes to simply satisfy a sweet tooth. We design
              ephemeral, luxury centerpieces designed to crown life's most unforgettable, sentimental moments. 
              Our recipe is a patient, highly meticulous blend of artistic sugar-sculpture and culinary perfection.
            </p>
            <p className="text-stone-500 font-sans font-light text-sm tracking-wide leading-relaxed">
              Every sponge cake is individually baked to order from scratch inside our private, license-pending home atelier.
              We source organic unbleached heirloom flours, fine pasture-raised local eggs, and rare flavor infusions like 
              distilled orange blossom and premium gourmet tea botanicals.
            </p>
          </div>

          {/* Micro value rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#B89B72]/15">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E8D5C4]/60 flex items-center justify-center shrink-0 border border-[#B89B72]/20">
                <Leaf className="w-4 h-4 text-[#B89B72]" />
              </div>
              <div>
                <h4 className="font-serif text-base text-[#3D342F] font-semibold tracking-wide">Pure Organic Standard</h4>
                <p className="text-stone-400 font-sans text-xs font-light mt-1 leading-relaxed">
                  Zero preservatives, zero cheap artificial flavorings. True gourmet real butter, local berries, and pure vanilla pods.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E8D5C4]/60 flex items-center justify-center shrink-0 border border-[#B89B72]/20">
                <Heart className="w-4 h-4 text-[#B89B72]" />
              </div>
              <div>
                <h4 className="font-serif text-base text-[#3D342F] font-semibold tracking-wide">Bespoke Design Story</h4>
                <p className="text-stone-400 font-sans text-xs font-light mt-1 leading-relaxed">
                  We paint watercolor mockups and collaborate with your event color scheme, ensuring your cake is completely unique.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
