/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, Heart, Sparkles, MapPin, Phone, Mail, Clock, ShieldAlert,
  ArrowRight, Search, SlidersHorizontal, Check, RefreshCw
} from 'lucide-react';

import { Cake, Testimonial, Announcement, CommissionInquiry, CakeSize } from './types';
import { 
  INITIAL_CAKES, INITIAL_TESTIMONIALS, INITIAL_ANNOUNCEMENTS, 
  GOURMET_FLAVORS, CAKE_SIZES 
} from './data';

import HeaderAnnounce from './components/HeaderAnnounce';
import Hero from './components/Hero';
import CollectionsGrid, { EXQUISITE_CATEGORIES } from './components/CollectionsGrid';
import BestsellersSlider from './components/BestsellersSlider';
import AboutBrand from './components/AboutBrand';
import WhyChooseUs from './components/WhyChooseUs';
import InstagramGallery from './components/InstagramGallery';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import AdminCMS from './components/AdminCMS';
import ProductPageModal from './components/ProductPageModal';

export default function App() {
  // --- 1. STATE INITIALIZATION ---
  const [activeView, setActiveView] = useState<string>('home'); // home, collections, contact, cms
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);
  const [prefilledInquiryParams, setPrefilledInquiryParams] = useState<{
    cakeName: string;
    cakeType: string;
    portions: string;
    flavor: string;
    budget: string;
  } | null>(null);

  // Core Persistent Registries - Loaded from LocalStorage or Default Seeders
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [inquiries, setInquiries] = useState<CommissionInquiry[]>([]);

  // Load from LocalStorage
  useEffect(() => {
    const cachedCakes = localStorage.getItem('ld_cakes');
    const cachedTests = localStorage.getItem('ld_testimonials');
    const cachedAnns = localStorage.getItem('ld_announcements');
    const cachedInqs = localStorage.getItem('ld_inquiries');

    if (cachedCakes) {
      setCakes(JSON.parse(cachedCakes));
    } else {
      setCakes(INITIAL_CAKES);
      localStorage.setItem('ld_cakes', JSON.stringify(INITIAL_CAKES));
    }

    if (cachedTests) {
      setTestimonials(JSON.parse(cachedTests));
    } else {
      setTestimonials(INITIAL_TESTIMONIALS);
      localStorage.setItem('ld_testimonials', JSON.stringify(INITIAL_TESTIMONIALS));
    }

    if (cachedAnns) {
      setAnnouncements(JSON.parse(cachedAnns));
    } else {
      setAnnouncements(INITIAL_ANNOUNCEMENTS);
      localStorage.setItem('ld_announcements', JSON.stringify(INITIAL_ANNOUNCEMENTS));
    }

    if (cachedInqs) {
      setInquiries(JSON.parse(cachedInqs));
    } else {
      setInquiries([]);
      localStorage.setItem('ld_inquiries', JSON.stringify([]));
    }
  }, []);

  // Sync to LocalStorage wrappers
  const saveCakes = (updated: Cake[]) => {
    setCakes(updated);
    localStorage.setItem('ld_cakes', JSON.stringify(updated));
  };

  const saveTestimonials = (updated: Testimonial[]) => {
    setTestimonials(updated);
    localStorage.setItem('ld_testimonials', JSON.stringify(updated));
  };

  const saveAnnouncements = (updated: Announcement[]) => {
    setAnnouncements(updated);
    localStorage.setItem('ld_announcements', JSON.stringify(updated));
  };

  const saveInquiries = (updated: CommissionInquiry[]) => {
    setInquiries(updated);
    localStorage.setItem('ld_inquiries', JSON.stringify(updated));
  };

  // --- 2. THE ATELIER BUSINESS LOGIC HANDLERS ---
  
  // Custom WhatsApp message templates compiler for explicit bookings
  const handleDirectWhatsAppOrder = (
    cake: Cake, 
    selectedSize?: CakeSize, 
    selectedFlavor?: string, 
    customNotes?: string
  ) => {
    const sizeName = selectedSize ? selectedSize.name : cake.sizes[0]?.name || "Classic 8\"";
    const servings = selectedSize ? selectedSize.servings : cake.sizes[0]?.servings || "15-18 guests";
    const basePrice = cake.startingPrice;
    const pricePremium = selectedSize ? selectedSize.priceAdded : 0;
    const estimatedTot = basePrice + pricePremium;
    const chosenFlavor = selectedFlavor || cake.flavors[0];

    const template = `Hello L&D Home Bakery! 🌸
I would love to inquire about commissioning your premium cake creation:

• Cake Selection: ${cake.name}
• Style Collection: ${cake.category.toUpperCase()}
• Chosen Size: ${sizeName} (${servings})
• Gourmet Flavor: ${chosenFlavor}
${customNotes ? `• Personalization: ${customNotes}` : ''}
• Estimated Quote: $${estimatedTot} (calculated via design console)

Please let me know if you have calendar availability for my custom celebration! Thank you. ✨`;

    const encoded = encodeURIComponent(template);
    const waUrl = `https://wa.me/19735550199?text=${encoded}`;
    window.open(waUrl, '_blank', 'noreferrerPolicy=no-referrer');
  };

  // Catalog item managers
  const handleAddCake = (newCake: Cake) => {
    const nextCakes = [newCake, ...cakes];
    saveCakes(nextCakes);
  };

  const handleUpdateCakePrice = (id: string, newPrice: number) => {
    const nextCakes = cakes.map(c => c.id === id ? { ...c, startingPrice: newPrice } : c);
    saveCakes(nextCakes);
  };

  const handleDeleteCake = (id: string) => {
    const nextCakes = cakes.filter(c => c.id !== id);
    saveCakes(nextCakes);
  };

  // Testimonial managers
  const handleAddTestimonial = (test: Testimonial) => {
    const next = [test, ...testimonials];
    saveTestimonials(next);
  };

  const handleDeleteTestimonial = (id: string) => {
    const next = testimonials.filter(t => t.id !== id);
    saveTestimonials(next);
  };

  // Ribbon Banner managers
  const handleToggleAnnouncement = (id: string) => {
    const next = announcements.map(a => a.id === id ? { ...a, active: !a.active } : a);
    saveAnnouncements(next);
  };

  const handleAddAnnouncement = (ann: Announcement) => {
    const next = [ann, ...announcements];
    saveAnnouncements(next);
  };

  const handleDeleteAnnouncement = (id: string) => {
    const next = announcements.filter(a => a.id !== id);
    saveAnnouncements(next);
  };

  // Commission Ledger managers
  const handleAddInquiry = (inq: CommissionInquiry) => {
    const next = [inq, ...inquiries];
    saveInquiries(next);
  };

  const handleUpdateInquiryStatus = (id: string, status: 'pending' | 'reviewed' | 'accepted') => {
    const next = inquiries.map(i => i.id === id ? { ...i, status } : i);
    saveInquiries(next);
  };

  const handleDeleteInquiry = (id: string) => {
    const next = inquiries.filter(i => i.id !== id);
    saveInquiries(next);
  };

  // Interactive prefilled commissioning router
  const handlePrefilledInquiryActivation = (params: {
    cakeName: string;
    cakeType: string;
    portions: string;
    flavor: string;
    budget: string;
  }) => {
    setPrefilledInquiryParams(params);
    setActiveView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- 3. RENDERING ENGINE ---
  const filteredCakes = selectedCategory === 'all'
    ? cakes
    : cakes.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] overflow-x-hidden selection:bg-[#E8D5C4]">
      
      {/* Dynamic Header & Promos Container */}
      <HeaderAnnounce
        activeView={activeView}
        setActiveView={setActiveView}
        announcements={announcements}
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveView('collections'); // Navigating from head triggers collections filter view
        }}
      />

      {/* Main View Router Context */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* VIEW A: HOME ATELIER landing */}
          {activeView === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-0"
            >
              {/* 1. Cinematic Hero */}
              <Hero
                onOrderClick={() => {
                  setActiveView('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onExploreClick={() => {
                  setSelectedCategory('all');
                  setActiveView('collections');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* 2. Featured collections quick selectors */}
              <CollectionsGrid
                activeCategory={selectedCategory}
                onSelectCategory={(catSlug) => {
                  setSelectedCategory(catSlug);
                  setActiveView('collections');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* 3. Bestselling horizontal sliding wheel */}
              <BestsellersSlider
                cakes={cakes}
                onSelectCake={setSelectedCake}
                onOrderWhatsApp={(cake) => handleDirectWhatsAppOrder(cake)}
              />

              {/* 4. Editorial brand story */}
              <AboutBrand />

              {/* 5. Philosophical traits */}
              <WhyChooseUs />

              {/* 6. Social Pinterest grid */}
              <InstagramGallery />

              {/* 7. Client Reviews sliding element */}
              <Testimonials testimonials={testimonials} />

              {/* 8. Large Emotional Footer CTA */}
              <section id="emotional-cta-section" className="py-24 bg-[#3D342F] text-[#E8D5C4] px-6 text-center relative overflow-hidden select-none">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10 bg-no-repeat pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D342F] via-transparent to-transparent pointer-events-none" />
                
                <div className="max-w-xl mx-auto space-y-6 relative z-10">
                  <div className="flex items-center gap-1.5 justify-center">
                    <span className="w-5 h-[1.5px] bg-[#B89B72]/50"></span>
                    <Sparkles className="w-4.5 h-4.5 text-[#B89B72]" />
                    <span className="w-5 h-[1.5px] bg-[#B89B72]/50"></span>
                  </div>
                  
                  <h2 className="font-serif text-35px sm:text-4xl md:text-5xl leading-tight font-light text-white">
                    Let's Create Your <br />
                    <span className="italic text-[#B89B72]">Dream Design Cake</span>
                  </h2>

                  <p className="text-stone-300 font-sans font-light tracking-wide text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                    Based in Summit, NJ. Book highly customizable watercolor structures and premium flavors designed for weddings, luxury birthdays, and parties.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xs sm:max-w-md mx-auto">
                    <button
                      id="home-cta-contact-btn"
                      onClick={() => {
                        setPrefilledInquiryParams(null);
                        setActiveView('contact');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="py-4 px-6 bg-[#FDFBF7] hover:bg-[#B89B72] text-[#3D342F] hover:text-white font-semibold text-xs tracking-widest uppercase rounded-full transition-transform hover:translate-y-[-1px] duration-300 shadow-lg"
                    >
                      Bespoke Inquiry Sketch
                    </button>

                    <button
                      id="home-cta-wa-btn"
                      onClick={() => {
                        window.open("https://wa.me/19735550199", '_blank', 'noreferrerPolicy=no-referrer');
                      }}
                      className="py-4 px-6 border border-[#B89B72]/40 text-[#FDFBF7] font-semibold text-xs tracking-widest uppercase rounded-full hover:border-white hover:bg-white/5 transition-all"
                    >
                      WhatsApp Direct
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* VIEW B: COLLECTIONS FILTER REGISTRY */}
          {activeView === 'collections' && (
            <motion.div
              key="collections-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-16 md:py-24 max-w-7xl mx-auto px-6"
            >
              {/* Editorial Header Banner */}
              <div className="flex flex-col items-center text-center space-y-4 mb-16 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-[1px] bg-[#B89B72]/45" />
                  <span className="text-[10px] tracking-[0.25em] font-semibold uppercase text-[#B89B72]">The Registry</span>
                  <span className="w-5 h-[1px] bg-[#B89B72]/45" />
                </div>
                
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-[#3D342F] font-light">
                  Browse the <br className="sm:hidden" />
                  <span className="italic text-[#B89B72]">Atelier Creations</span>
                </h1>

                {/* Categories filtering bar */}
                <div id="collections-filter-track" className="flex flex-wrap justify-center items-center gap-2 pt-6 w-full max-w-3xl">
                  {EXQUISITE_CATEGORIES.map((cat) => (
                    <button
                      id={`filter-btn-${cat.slug}`}
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`py-2 px-4 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider transition-all uppercase border ${
                        selectedCategory === cat.slug
                          ? 'bg-[#3D342F] text-[#FDFBF7] border-[#3D342F] shadow-sm'
                          : 'bg-white text-[#3D342F] border-[#B89B72]/20 hover:border-[#3D342F]'
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                  <button
                    id="filter-btn-all"
                    onClick={() => setSelectedCategory('all')}
                    className={`py-2 px-4 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider transition-all uppercase border ${
                      selectedCategory === 'all'
                        ? 'bg-[#3D342F] text-[#FDFBF7] border-[#3D342F] shadow-sm'
                        : 'bg-white text-[#3D342F] border-[#B89B72]/20 hover:border-[#3D342F]'
                    }`}
                  >
                    All Creations
                  </button>
                </div>
              </div>

              {/* Cards Grid */}
              {filteredCakes.length === 0 ? (
                <div className="text-center py-20 bg-white border border-[#B89B72]/15 rounded-[2.5rem] p-8 max-w-lg mx-auto select-none">
                  <SlidersHorizontal className="w-10 h-10 text-[#B89B72]/40 mx-auto mb-4" />
                  <p className="font-serif text-lg text-[#3D342F]">No creations registered under this filter.</p>
                  <p className="text-xs text-stone-400 font-sans mt-1">Check back later or enter the CMS Dashboard to register custom items.</p>
                  <button
                    id="reset-filter-btn"
                    onClick={() => setSelectedCategory('all')}
                    className="mt-6 py-2.5 px-5 bg-[#3D342F] text-white rounded-full text-[10px] font-semibold tracking-widest uppercase hover:bg-[#B89B72] transition-colors"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div id="collections-portfolio-deck" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredCakes.map((cake) => (
                    <div
                      id={`portfolio-card-${cake.id}`}
                      key={cake.id}
                      onClick={() => setSelectedCake(cake)}
                      className="bg-white border border-[#B89B72]/15 rounded-[2.1rem] overflow-hidden shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition-all duration-500 flex flex-col h-[460px] relative group cursor-pointer select-none"
                    >
                      <div className="h-[250px] overflow-hidden relative">
                        <img
                          src={cake.imageUrl || null}
                          alt={cake.name}
                          className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-104"
                          referrerPolicy="no-referrer"
                        />
                        
                        <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full border border-[#B89B72]/15">
                          <span className="text-[8px] tracking-widest font-semibold uppercase text-stone-600 font-sans">
                            {cake.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-grow">
                        <div className="space-y-1">
                          <div className="flex justify-between items-baseline gap-2">
                            <h3 className="font-serif text-[17px] leading-snug font-semibold text-[#3D342F] group-hover:text-[#B89B72] transition-colors line-clamp-1">
                              {cake.name}
                            </h3>
                            <span className="text-stone-400 text-xs font-semibold tracking-wider font-sans shrink-0">
                              ${cake.startingPrice}+
                            </span>
                          </div>
                          
                          <p className="text-stone-400 text-[11px] font-light leading-relaxed tracking-wide line-clamp-2">
                            {cake.shortDescription}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#B89B72]/10 flex items-center justify-between">
                          <span className="text-[10px] tracking-widest uppercase font-semibold text-[#3D342F]/80 group-hover:text-[#B89B72] transition-colors flex items-center gap-1">
                            <span>Inspect Design</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                          
                          <span className="text-[9px] text-[#B89B72] py-0.5 px-2 rounded bg-[#E8D5C4]/50 border border-[#B89B72]/10 uppercase tracking-wider font-bold">
                            {cake.flavors ? `${cake.flavors.length} Gourmet Flavors` : '6 Flavors'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* VIEW C: CUSTOM CAKE COMMISSION FORM */}
          {activeView === 'contact' && (
            <motion.div
              key="contact-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <ContactSection
                prefilledParams={prefilledInquiryParams}
                onAddInquiry={handleAddInquiry}
              />
            </motion.div>
          )}

          {/* VIEW D: SECURE OWNER CMS DASHBOARD */}
          {activeView === 'cms' && (
            <motion.div
              key="cms-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <AdminCMS
                cakes={cakes}
                onAddCake={handleAddCake}
                onUpdateCakePrice={handleUpdateCakePrice}
                onDeleteCake={handleDeleteCake}
                testimonials={testimonials}
                onAddTestimonial={handleAddTestimonial}
                onDeleteTestimonial={handleDeleteTestimonial}
                announcements={announcements}
                onToggleAnnouncement={handleToggleAnnouncement}
                onAddAnnouncement={handleAddAnnouncement}
                onDeleteAnnouncement={handleDeleteAnnouncement}
                inquiries={inquiries}
                onUpdateInquiryStatus={handleUpdateInquiryStatus}
                onDeleteInquiry={handleDeleteInquiry}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Elegant Editorial Footer */}
      <footer id="atelier-footer" className="bg-[#3D342F] text-[#E8D5C4]/90 pt-16 pb-12 border-t border-[#3e3530] select-none">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 items-start mb-12">
          
          <div className="col-span-1 md:col-span-4 space-y-4">
            <h3 className="font-serif text-2xl tracking-[0.2em] font-light text-white">L&D HOME BAKERY</h3>
            <p className="text-stone-400 font-sans font-light text-xs sm:text-[13px] tracking-wide leading-relaxed max-w-xs">
              Handcrafting luxury custom cakes, delicate macarons, and boutique catering for Jersey's prestigious gatherings. Envisioned statewide since 2024.
            </p>
            <div className="flex gap-4 pt-2 text-[#B89B72]">
              <a href="https://instagram.com" target="_blank" className="hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a href="https://pinterest.com" target="_blank" className="hover:text-white transition-colors" aria-label="Pinterest">
                <Sparkles className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 space-y-3 font-sans text-xs sm:text-[13px] font-light">
            <h4 className="font-serif text-sm tracking-[0.15em] font-semibold text-[#B89B72] uppercase">The Atelier hours</h4>
            <div className="space-y-2 text-stone-400">
              <p className="flex justify-between"><span>Mon - Thu</span> <span className="text-stone-500">Sketching & Design</span></p>
              <p className="flex justify-between"><span>Fri - Sat</span> <span className="text-white">Baking & Wedding drop</span></p>
              <p className="flex justify-between"><span>Sunday</span> <span className="text-stone-500">Rest & Tea</span></p>
            </div>
            <p className="text-[10px] text-amber-500 font-semibold tracking-wider uppercase pt-1">
              Currently Booking: Summer & Autumn 2026
            </p>
          </div>

          <div className="col-span-1 md:col-span-3 space-y-3 font-sans text-xs sm:text-[13px] font-light">
            <h4 className="font-serif text-sm tracking-[0.15em] font-semibold text-[#B89B72] uppercase">Statewide delivery</h4>
            <div className="space-y-2 text-stone-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B89B72]" />
                <span>Northern & Central New Jersey</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#B89B72]" />
                <span>Delivered directly via cooled transport</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B89B72]" />
                <span>+1 (973) 555-0199</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B89B72]" />
                <span>atelier@ldhomebakery.com</span>
              </p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-3 font-sans text-xs">
            <h4 className="font-serif text-sm tracking-[0.15em] font-semibold text-[#B89B72] uppercase">Explore</h4>
            <div className="flex flex-col space-y-2.5 text-stone-400 justify-start items-start">
              <button onClick={() => { setActiveView('home'); setSelectedCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer text-left">The Studio</button>
              <button onClick={() => { setActiveView('collections'); setSelectedCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer text-left">Active Catalog</button>
              <button onClick={() => { setActiveView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer text-left">Bespoke Inquiry</button>
              <button onClick={() => { setActiveView('cms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer text-left font-semibold text-[#B89B72]">Owner Dashboard</button>
            </div>
          </div>

        </div>

        {/* Lower row */}
        <div className="max-w-7xl mx-auto px-6 border-t border-[#3e3530] pt-6 flex flex-col sm:flex-row sm:justify-between items-center text-stone-500 font-sans text-[10px] sm:text-xs select-none">
          <p>© 2026 L&D Home Bakery. Summit, New Jersey, USA. Handcrafted with fine-art devotion.</p>
          <div className="flex gap-4 mt-2 sm:mt-0 uppercase tracking-widest text-[9px] font-semibold text-[#B89B72]">
            <span>Luxury artisan grade</span>
            <span>•</span>
            <span>Food licensed partners</span>
          </div>
        </div>
      </footer>

      {/* --- 4. IMMERSIVE PRODUCT PAGE MODAL (Slide-Over Panel) --- */}
      <AnimatePresence>
        {selectedCake && (
          <ProductPageModal
            cake={selectedCake}
            allCakes={cakes}
            onClose={() => setSelectedCake(null)}
            onOpenInquiryForm={handlePrefilledInquiryActivation}
            onOrderWhatsApp={handleDirectWhatsAppOrder}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
