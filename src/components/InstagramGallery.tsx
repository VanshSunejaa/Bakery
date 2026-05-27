/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Instagram, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data';

export default function InstagramGallery() {
  return (
    <section 
      id="instagram-section" 
      className="py-24 bg-white px-6 border-b border-[#B89B72]/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="flex items-center gap-1.5 justify-center">
            <Instagram className="w-4 h-4 text-[#B89B72]" />
            <span className="text-[10px] tracking-[0.25em] font-medium uppercase text-[#B89B72]">The Social Gallery</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-[#3D342F] font-light">
            Follow Our <span className="italic text-[#B89B72]">Live Creations</span>
          </h2>
          <p className="text-stone-400 font-sans tracking-wide text-xs sm:text-sm max-w-xl font-light">
            We capture daily progress from inside the Summit atelier on Instagram and Pinterest. 
            Join our private community of luxury designers and wedding planners.
          </p>
          <a
            id="instagram-follow-btn"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#3D342F] hover:text-[#B89B72] border-b border-[#B89B72]/40 hover:border-[#B89B72] pb-1 pt-2 transition-all"
          >
            @LD_HomeBakery_NJ
          </a>
        </div>

        {/* Masonry Design */}
        <div id="instagram-pinterest-masonry" className="columns-1 sm:columns-2 lg:columns-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {INSTAGRAM_POSTS.map((post) => (
            <motion.div
              id={`insta-post-${post.id}`}
              key={post.id}
              className="relative overflow-hidden rounded-[2rem] border border-[#B89B72]/15 bg-[#FDFBF7] group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 masonry-brick"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              {/* Image Rendering */}
              <img
                src={post.url}
                alt={`Instagram Cake Inspiration ${post.id}`}
                className="w-full h-auto object-cover rounded-[2rem] transition-transform duration-700 ease-out group-hover:scale-104 select-none"
                referrerPolicy="no-referrer"
              />

              {/* Hover Luxury Overlay with Heart / Engagement Counters */}
              <div className="absolute inset-0 bg-[#3D342F]/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-[#FDFBF7]">
                <Instagram className="w-8 h-8 text-[#B89B72] mb-4 animate-bounce" />
                
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
                    <span className="text-xs font-medium tracking-wide">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-amber-100" />
                    <span className="text-xs font-medium tracking-wide">Comment</span>
                  </div>
                </div>

                <div className="absolute bottom-6 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B89B72]" />
                  <span className="text-[9px] tracking-widest uppercase font-sans text-neutral-300">Pinterest Aesthetic</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
