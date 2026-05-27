/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, ArrowRight, MessageSquare } from 'lucide-react';
import { Cake } from '../types';

interface BestsellersSliderProps {
  cakes: Cake[];
  onSelectCake: (cake: Cake) => void;
  onOrderWhatsApp: (cake: Cake) => void;
}

export default function BestsellersSlider({ cakes, onSelectCake, onOrderWhatsApp }: BestsellersSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const bestsellers = cakes.filter(c => c.isBestseller);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      // Run once for initialization
      checkScroll();
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [bestsellers]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="bestsellers-section" 
      className="py-24 bg-[#FDFBF7] px-6 border-b border-[#B89B72]/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between items-start mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-[1px] bg-[#B89B72]/40"></span>
              <span className="text-[10px] tracking-[0.25em] font-medium uppercase text-[#B89B72]">The Couture Line</span>
              <span className="w-6 h-[1px] bg-[#B89B72]/40"></span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-[#3D342F] font-light">
              Bestselling <span className="italic text-[#B89B72]">Atelier Creations</span>
            </h2>
            <p className="text-stone-500 font-sans tracking-wide text-xs sm:text-sm max-w-xl font-light">
              Highly requested across New Jersey's prestigious celebrations. Handcrafted with meticulous details 
              and signature gourmet crusts.
            </p>
          </div>

          {/* Nav Controls */}
          {bestsellers.length > 3 && (
            <div className="flex items-center gap-3">
              <button
                id="btn-scroll-bestsellers-left"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                  canScrollLeft 
                    ? 'border-[#3D342F] text-[#3D342F] hover:bg-[#3D342F] hover:text-[#FDFBF7]' 
                    : 'border-[#B89B72]/20 text-stone-300 cursor-not-allowed'
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                id="btn-scroll-bestsellers-right"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                  canScrollRight 
                    ? 'border-[#3D342F] text-[#3D342F] hover:bg-[#3D342F] hover:text-[#FDFBF7]' 
                    : 'border-[#B89B72]/20 text-stone-300 cursor-not-allowed'
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Container with custom padding to ensure shadow doesn't get clipped */}
        <div 
          id="bestsellers-wheel"
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory pt-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestsellers.map((cake, idx) => (
            <motion.div
              id={`bestseller-card-${cake.id}`}
              key={cake.id}
              className="flex-shrink-0 w-full sm:w-[360px] md:w-[385px] snap-start bg-white border border-[#B89B72]/15 rounded-[2.1rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-[540px] relative group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              {/* Product Visual */}
              <div 
                className="h-[310px] w-full overflow-hidden relative"
                onClick={() => onSelectCake(cake)}
              >
                <img
                  src={cake.imageUrl || null}
                  alt={cake.name}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Micro Category Bubble Tag */}
                <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#B89B72]/15">
                  <span className="text-[9px] tracking-widest font-semibold uppercase text-[#3D342F]">
                    {cake.category}
                  </span>
                </div>

                {/* Star rating overlay */}
                <div className="absolute bottom-4 right-4 bg-[#3D342F]/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-[#FDFBF7] border border-white/5">
                  <Star className="w-3 h-3 text-[#B89B72] fill-[#B89B72]" />
                  <span className="text-[10px] font-medium">{cake.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6 flex flex-col flex-grow select-none">
                
                {/* Headline and rating */}
                <div 
                  className="space-y-1.5 flex-grow"
                  onClick={() => onSelectCake(cake)}
                >
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-serif text-[19px] leading-snug text-[#3D342F] group-hover:text-[#B89B72] transition-colors line-clamp-1 font-medium">
                      {cake.name}
                    </h3>
                    <span className="text-xs font-semibold tracking-wider text-[#3D342F] font-sans shrink-0">
                      ${cake.startingPrice}+
                    </span>
                  </div>

                  <p className="text-stone-400 text-xs font-light leading-relaxed tracking-wide line-clamp-2">
                    {cake.shortDescription}
                  </p>
                </div>

                {/* Master Details footer */}
                <div className="pt-4 border-t border-[#B89B72]/15 flex items-center justify-between gap-3 mt-4">
                  
                  {/* Info Selector Action */}
                  <button
                    id={`view-details-${cake.id}`}
                    onClick={() => onSelectCake(cake)}
                    className="flex items-center gap-1.5 text-[#3D342F]/80 hover:text-[#B89B72] font-sans text-[11px] tracking-[0.15em] uppercase font-semibold transition-colors duration-300"
                  >
                    <span>View Recipe Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Standard commission inquiry via WhatsApp */}
                  <button
                    id={`wa-bestseller-btn-${cake.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOrderWhatsApp(cake);
                    }}
                    className="w-10 h-10 rounded-full bg-[#E8D5C4]/65 text-[#3D342F] hover:bg-[#3D342F] hover:text-white flex items-center justify-center transition-all duration-300 border border-[#B89B72]/15"
                    title="Direct WhatsApp Inquiry"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                  
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
