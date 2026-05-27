/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onOrderClick, onExploreClick }: HeroProps) {
  return (
    <section 
      id="hero-section"
      className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-[#FDFBF7] px-6 py-12 md:py-24"
    >
      {/* Soft Ambient Background Elements */}
      <div className="absolute top-[10%] left-[5%] w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#E8D5C4]/70 blur-[80px] pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-[10%] right-[5%] w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-[#F5E6E0]/20 blur-[100px] pointer-events-none animate-pulse duration-[6s]" />

      {/* Floating Organic Particles */}
      <motion.div 
        className="absolute top-1/4 right-[15%] w-3 h-3 rounded-full bg-[#B89B72]/30 hidden md:block"
        animate={{ y: [0, -25, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-[12%] w-2.5 h-2.5 rounded-full bg-[#F5E6E0]/40 hidden md:block"
        animate={{ y: [0, 20, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left text column */}
        <div id="hero-text-container" className="lg:col-span-6 flex flex-col space-y-8 text-center lg:text-left items-center lg:items-start select-none">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-[#E8D5C4] border border-[#B89B72]/20 px-4 py-1.5 rounded-full"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B89B72]" />
            <span className="text-[10px] tracking-[0.25em] font-medium uppercase text-[#3D342F]">
              New Jersey's Premier Custom Cake Studio
            </span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-[#3D342F] tracking-[0.02em] font-light"
            >
              Crafted <br className="hidden md:inline" />
              <span className="italic font-normal text-[#B89B72]">Sweet Moments</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-stone-500 font-sans font-light text-sm sm:text-base md:text-lg tracking-wide max-w-lg leading-relaxed"
            >
              Exquisite, custom handcrafted cakes that marry haute-couture Parisian design 
              with premium premium ingredients. Sculpted for weddings, birthdays, baby showers, 
              and Jersey's finest moments.
            </motion.p>
          </div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              id="hero-order-btn"
              onClick={onOrderClick}
              className="w-full sm:w-auto group relative overflow-hidden bg-[#3D342F] text-white px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#B89B72] shadow-sm flex items-center justify-center gap-2"
            >
              Order Your Cake
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 duration-300" />
            </button>

            <button
              id="hero-explore-btn"
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#3D342F] border border-[#B89B72]/40 hover:border-[#3D342F] hover:bg-[#FDFBF7] bg-transparent transition-all duration-300"
            >
              Explore Collections
            </button>
          </motion.div>

          {/* Next Available Date (Geometric Balance Design Layout) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center gap-4 py-2 text-left"
          >
            <button
              onClick={onOrderClick}
              className="h-12 w-12 rounded-full border border-[#B89B72] flex items-center justify-center hover:bg-[#B89B72] hover:text-white transition-all group duration-300 cursor-pointer"
              title="Book next design reservation"
            >
              <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
            </button>
            <div className="flex flex-col">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#B89B72] font-semibold">Next Available Slot</span>
              <span className="text-lg font-serif font-light italic text-[#3D342F]">July 20th, 2026</span>
            </div>
          </motion.div>

          {/* Micro stats banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-6 grid grid-cols-3 gap-6 md:gap-8 border-t border-[#B89B72]/15 w-full max-w-md"
          >
            <div>
              <p className="font-serif text-lg md:text-2xl text-[#B89B72]">100%</p>
              <p className="text-[9px] uppercase tracking-widest text-[#3D342F]/60 mt-1 font-sans">Bespoke Design</p>
            </div>
            <div>
              <p className="font-serif text-lg md:text-2xl text-[#B89B72]">Gourmet</p>
              <p className="text-[9px] uppercase tracking-widest text-[#3D342F]/60 mt-1 font-sans">Organic Blends</p>
            </div>
            <div>
              <p className="font-serif text-lg md:text-2xl text-[#B89B72]">Local NJ</p>
              <p className="text-[9px] uppercase tracking-widest text-[#3D342F]/60 mt-1 font-sans">White-Glove Delivery</p>
            </div>
          </motion.div>
        </div>

        {/* Right graphic column */}
        <div className="lg:col-span-6 relative flex justify-center items-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative w-full aspect-[4/5] sm:aspect-square md:w-[480px] md:h-[540px]"
          >
            {/* Elegant Main Card frame with overlapping geometric shapes */}
            <div className="absolute inset-0 border border-[#B89B72]/10 bg-[#E8D5C4]/30 -rotate-2 scale-[1.02]" />
            <div className="absolute inset-0 border border-[#3D342F]/5 bg-white translate-x-2 translate-y-2" />

            {/* Geometric floating circular elements */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full border border-[#B89B72]/20 pointer-events-none z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-[#F5E6E0]/60 pointer-events-none" />

            {/* Main image container */}
            <div className="absolute inset-2 overflow-hidden">
              <motion.img
                src="https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=1200"
                alt="Luxury Masterpiece Cake"
                className="w-full h-full object-cover"
                style={{ imageRendering: '-webkit-auto' }}
                referrerPolicy="no-referrer"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />

              {/* White Inner Geometric Border overlay */}
              <div className="absolute inset-4 border border-white/50 pointer-events-none z-10 flex flex-col items-center justify-between p-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/90">L&D Fine Art Studio</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-light text-white/80 bg-[#3D342F]/65 px-3 py-1.5 border border-white/20 backdrop-blur-sm">
                  The Signature 2026 Collection
                </span>
              </div>
            </div>

            {/* Overlapping Pinterest Floating Card */}
            <motion.div
              initial={{ x: 30, y: 30, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute bottom-[3%] right-[-5%] sm:right-[2%] bg-[#FDFBF7]/95 backdrop-blur-sm border border-[#B89B72]/20 p-4 shadow-xl w-[210px] hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#E8D5C4] flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&q=80&w=200"
                    alt="Detail"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-[13px] font-medium leading-tight text-[#3D342F]">Royal Satin Ribbon</h4>
                  <p className="text-[9px] text-[#B89B72] tracking-wider uppercase mt-1">Starting $165</p>
                </div>
              </div>
              <p className="text-[10px] text-stone-500 italic mt-2 leading-relaxed">
                "It looked like a dream and tasted even better..."
              </p>
            </motion.div>

            {/* Soft decorative floating frame tag */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute top-[8%] left-[-8%] bg-[#3D342F] text-[#FDFBF7] py-2.5 px-5 text-[9px] tracking-[0.25em] font-medium uppercase shadow-lg select-none"
            >
              100% Handcrafted Artisan
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
