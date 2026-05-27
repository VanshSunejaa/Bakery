/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { PencilLine, Sparkles, FlameKindling, MessagesSquare, ShieldCheck } from 'lucide-react';

export const PHILOSOPHY_CARDS = [
  {
    id: "philosophy-custom",
    icon: PencilLine,
    title: "100% Custom Designs",
    description: "Every commission begins with sketching. We sync with your florist, linen choices, color scheme, and invitations to ensure an integrated event visual."
  },
  {
    id: "philosophy-premium",
    icon: Sparkles,
    title: "Premium Luxury Ingredients",
    description: "French Valrhona chocolate, organic farm-raised eggs, authentic Bourbon vanilla pods, and real summer fruits compose our gourmet recipe pantry."
  },
  {
    id: "philosophy-fresh",
    icon: FlameKindling,
    title: "Baked Fresh to Order",
    description: "We do not believe in freezing sponges. Your cake is mixed, baked, cooled, piped, and delivered fresh within an precise 18-hour window of your party."
  },
  {
    id: "philosophy-response",
    icon: MessagesSquare,
    title: "Personalized fast response",
    description: "Inquire easily online or via WhatsApp. The owner handles all consultations directly, offering white-glove, premium customer service from plan to delivery."
  }
];

export default function WhyChooseUs() {
  return (
    <section 
      id="philosophy-section" 
      className="py-24 bg-[#FDFBF7] px-6 border-b border-[#B89B72]/15"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="flex items-center gap-1.5 justify-center">
            <span className="w-5 h-[1px] bg-[#B89B72]/40"></span>
            <span className="text-[10px] tracking-[0.25em] font-medium uppercase text-[#B89B72]">The Standard</span>
            <span className="w-5 h-[1px] bg-[#B89B72]/40"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-[#3D342F] font-light">
            The Atelier <span className="italic text-[#B89B72]">Signature Philosophy</span>
          </h2>
          <p className="text-stone-400 font-sans tracking-wide text-xs sm:text-sm max-w-xl font-light">
            From Jersey's private drawing rooms to your reception tables — safety, luxury, 
            and breathtaking artistry represent our absolute promise to you.
          </p>
        </div>

        {/* Philosophy Card Grid */}
        <div id="why-choose-us-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PHILOSOPHY_CARDS.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                id={`philosophy-card-${card.id}`}
                key={card.id}
                className="bg-white border border-[#B89B72]/15 rounded-[2rem] p-8 flex flex-col justify-between hover:border-[#3D342F] hover:shadow-lg transition-all duration-500 hover:translate-y-[-4px] group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Icon wrapper with soft ambient background */}
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8D5C4]/60 flex items-center justify-center border border-[#B89B72]/20 group-hover:bg-[#3D342F] group-hover:border-[#3D342F] transition-colors duration-500">
                    <IconComponent className="w-5 h-5 text-[#B89B72] group-hover:text-[#FDFBF7] transition-colors duration-500" />
                  </div>

                  <h3 className="font-serif text-lg text-[#3D342F] font-semibold tracking-wide">
                    {card.title}
                  </h3>

                  <p className="text-stone-400 font-sans text-xs sm:text-[13px] font-light leading-relaxed tracking-wide">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#B89B72]/10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ShieldCheck className="w-4 h-4 text-[#B89B72]" />
                  <span className="text-[10px] font-semibold tracking-[0.15em] text-[#B89B72] uppercase">Exclusive Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
