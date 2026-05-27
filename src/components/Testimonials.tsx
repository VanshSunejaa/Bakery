/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const prevTestimonial = () => {
    setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (testimonials.length === 0) return null;

  const activeTest = testimonials[activeIdx];

  return (
    <section 
      id="testimonials-section" 
      className="py-24 bg-[#FDFBF7] px-6 border-b border-[#B89B72]/15 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="flex items-center gap-1.5 justify-center">
            <span className="w-5 h-[1px] bg-[#B89B72]/40"></span>
            <span className="text-[10px] tracking-[0.25em] font-medium uppercase text-[#B89B72]">Client Diaries</span>
            <span className="w-5 h-[1px] bg-[#B89B72]/40"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl leading-tight text-[#3D342F] font-light">
            Loved by New Jersey <span className="italic text-[#B89B72]">Hosts & Couples</span>
          </h2>
        </div>

        {/* Testimonial Active Display Area */}
        <div className="relative min-h-[340px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              id={`testimonial-display-card-${activeIdx}`}
              key={activeIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full bg-white border border-[#B89B72]/15 rounded-[2.5rem] p-8 md:p-12 shadow-md relative overflow-hidden flex flex-col justify-between select-none"
            >
              {/* Soft decorative golden blur behind card */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#E8D5C4]/30 blur-3xl pointer-events-none" />

              <div>
                {/* Gold Quote and Rating Header */}
                <div className="flex justify-between items-start mb-6">
                  <Quote className="w-10 h-10 text-[#B89B72]/20 shrink-0" />
                  
                  {/* Star rating rendering */}
                  <div className="flex gap-0.5" id={`testimonial-rating-${activeIdx}`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < activeTest.rating 
                            ? 'text-[#B89B72] fill-[#B89B72]' 
                            : 'text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="font-serif text-[18px] sm:text-[21px] md:text-[23px] text-[#3D342F] italic leading-relaxed tracking-wide font-light">
                  "{activeTest.text}"
                </p>
              </div>

              {/* Author & Event Detail Footer */}
              <div className="pt-8 border-t border-[#B89B72]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
                <div>
                  <h4 className="font-sans text-sm font-semibold tracking-wide text-[#3D342F]">
                    {activeTest.authorName}
                  </h4>
                  <p className="text-[11px] tracking-widest text-[#B89B72] uppercase mt-0.5">
                    {activeTest.roll}
                  </p>
                </div>

                {/* City Location Identifier */}
                <div className="flex items-center gap-2 bg-[#E8D5C4]/50 border border-[#B89B72]/20 px-3.5 py-1.5 rounded-full w-fit">
                  <MapPin className="w-3.5 h-3.5 text-[#B89B72]" />
                  <span className="text-[10px] uppercase tracking-wide text-[#3D342F] font-medium">
                    {activeTest.location}
                  </span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Controls - Positioned Overlay (prev/next) */}
          <div className="absolute -left-[4%] sm:-left-[6%] md:-left-[10%] top-1/2 -translate-y-1/2 z-20">
            <button
              id="testimonial-prev"
              onClick={prevTestimonial}
              className="w-11 h-11 rounded-full bg-white border border-[#B89B72]/20 shadow-md hover:border-[#3D342F] hover:bg-[#3D342F] hover:text-[#FDFBF7] flex items-center justify-center transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute -right-[4%] sm:-right-[6%] md:-right-[10%] top-1/2 -translate-y-1/2 z-20">
            <button
              id="testimonial-next"
              onClick={nextTestimonial}
              className="w-11 h-11 rounded-full bg-white border border-[#B89B72]/20 shadow-md hover:border-[#3D342F] hover:bg-[#3D342F] hover:text-[#FDFBF7] flex items-center justify-center transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Carousel indicators */}
        <div id="testimonial-indicators" className="flex justify-center items-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === activeIdx ? 'w-8 bg-[#3D342F]' : 'w-2.5 bg-stone-200'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
