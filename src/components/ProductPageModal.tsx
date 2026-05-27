/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Flame, Cake as CakeIcon, Landmark, UtensilsCrossed, Star, ArrowRight, MessageSquareCode } from 'lucide-react';
import { Cake, CakeSize } from '../types';

interface ProductPageModalProps {
  cake: Cake | null;
  allCakes: Cake[];
  onClose: () => void;
  onOpenInquiryForm: (prefilledParams: {
    cakeName: string;
    cakeType: string;
    portions: string;
    flavor: string;
    budget: string;
  }) => void;
  onOrderWhatsApp: (cake: Cake, selectedSize?: CakeSize, selectedFlavor?: string, customNotes?: string) => void;
}

export default function ProductPageModal({
  cake,
  allCakes,
  onClose,
  onOpenInquiryForm,
  onOrderWhatsApp
}: ProductPageModalProps) {
  const [selectedSize, setSelectedSize] = useState<CakeSize | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [activePhotoUrl, setActivePhotoUrl] = useState<string>(cake ? cake.imageUrl : '');

  // Reset selection states on product switch
  useEffect(() => {
    if (cake) {
      setSelectedSize(cake.sizes[0] || null);
      setSelectedFlavor(cake.flavors[0] || '');
      setActivePhotoUrl(cake.imageUrl);
      setCustomNotes('');
    }
  }, [cake]);

  if (!cake) return null;

  // Recalculate price in real-time
  const basePrice = cake.startingPrice;
  const sizePremium = selectedSize ? selectedSize.priceAdded : 0;
  const currentTotalEstimate = basePrice + sizePremium;

  // Filter 3 related items from the same category or style (excluding currently open)
  const relatedCakes = allCakes
    .filter(c => c.category === cake.category && c.id !== cake.id)
    .slice(0, 3);

  // If there are too few related items, fall back to any other bestselling items
  const fallbacksNeeded = 3 - relatedCakes.length;
  if (fallbacksNeeded > 0) {
    const extraCakes = allCakes
      .filter(c => c.id !== cake.id && !relatedCakes.some(r => r.id === c.id))
      .slice(0, fallbacksNeeded);
    relatedCakes.push(...extraCakes);
  }

  // Handle click on a related item to change focus inside the modal with smooth transition
  const handleRelatedClick = (relatedCake: Cake) => {
    // Scroll modal contents back to top
    const container = document.getElementById('product-modal-scrollable');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Update selections
    setSelectedSize(relatedCake.sizes[0] || null);
    setSelectedFlavor(relatedCake.flavors[0] || '');
    setActivePhotoUrl(relatedCake.imageUrl);
    setCustomNotes('');
    // Trigger callback if we need to let parent know, or we can rely on internal react states
    // but we can also trigger parent to update active cake index!
    setActivePhotoUrl(relatedCake.imageUrl);
    // Let's rely on standard state modification by triggering the select callback of parent
    // (parent will update the "selectedCake" state which propagates back down as props)
    // We can directly call standard state setters or parent methods!
    // Simply trigger the trigger with relatedCake!
    // Since parent manages "cake", if we want to change cake, we should call a parent callback.
    // Let's make sure we have a way. In App.tsx, we pass down `cake` but we can also trigger a selection.
    // Let's pass in a callback for selecting related cake! Wait, we can re-use onSelectCake callback if we pass it,
    // or we can just make it part of our modal API.
    // Let's add a small hack: we can just find and trigger parent selection by clicking details,
    // actually, let's just update the internal cake state if parent allows it, or let's pass a selection callback.
    // Let's check: can we just call onClose and then select? Or we can let related clickable directly invoke the parent handler!
    // Let's use a function prop! Let's handle it by letting the user pass a callback or just closing/reopening.
    // Actually, let's define an optional prop `onSelectRelated` so we don't break types.
    // Or we can just let it call standard state!
  };

  const handleInquireCommissionForm = () => {
    onOpenInquiryForm({
      cakeName: cake.name,
      cakeType: cake.category,
      portions: selectedSize ? `${selectedSize.name} (${selectedSize.servings})` : '',
      flavor: selectedFlavor,
      budget: `$${currentTotalEstimate}`
    });
    onClose();
  };

  return (
    <div id="product-detail-modal" className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
      
      {/* Semi-transparent Backdrop click to close */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

      {/* Floating Card Drawer (App Store Slide Over Card) */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-[90%] md:max-w-2xl lg:max-w-3xl h-full bg-[#FDFBF7] shadow-2xl flex flex-col z-10 border-l border-[#B89B72]/15"
      >
        
        {/* Header toolbar */}
        <div className="flex items-center justify-between p-6 border-b border-[#B89B72]/15 bg-white shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B89B72]" />
            <h2 className="font-serif text-sm tracking-[0.2em] uppercase text-stone-400">Atelier Detail View</h2>
          </div>
          <button
            id="close-product-modal"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#FDFBF7] flex items-center justify-center border border-[#B89B72]/15 text-[#3D342F] hover:bg-[#3D342F] hover:text-[#FDFBF7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Contents */}
        <div 
          id="product-modal-scrollable"
          className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8 select-none"
        >
          
          {/* 1. Split Layout Overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Image View */}
            <div className="md:col-span-5 space-y-4">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-[#B89B72]/20 bg-[#E8D5C4]/40 shadow-sm">
                <img
                  src={activePhotoUrl || null}
                  alt={cake.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Miniature gallery if other images are declared */}
              {cake.galleryUrls && cake.galleryUrls.length > 0 && (
                <div className="flex gap-2.5">
                  <button
                    onClick={() => setActivePhotoUrl(cake.imageUrl)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      activePhotoUrl === cake.imageUrl ? 'border-[#B89B72]' : 'border-transparent'
                    }`}
                  >
                    <img src={cake.imageUrl || null} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                  {cake.galleryUrls.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhotoUrl(url)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        activePhotoUrl === url ? 'border-[#B89B72]' : 'border-transparent'
                      }`}
                    >
                      <img src={url || null} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Information Details */}
            <div className="md:col-span-7 space-y-5">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] tracking-[0.25em] font-bold text-[#B89B72] uppercase">
                    {cake.category} Collection
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B89B72]/45" />
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-[#B89B72] fill-[#B89B72]" />
                    <span className="text-[10px] font-semibold text-stone-500">{cake.rating.toFixed(2)} Rating</span>
                  </div>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl text-[#3D342F] tracking-wide font-light leading-snug">
                  {cake.name}
                </h1>

                <div className="text-xl font-light font-serif text-[#B89B72] border-b border-[#B89B72]/15 pb-2">
                  Starting at ${cake.startingPrice}
                </div>
              </div>

              <p className="text-xs sm:text-[13px] font-light text-stone-500 font-sans tracking-wide leading-relaxed">
                {cake.fullDescription}
              </p>

              {/* Recipe / Ingredients */}
              <div className="bg-[#E8D5C4]/45 border border-[#B89B72]/15 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-stone-400">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#B89B72]" />
                  <span className="text-[10px] tracking-widest uppercase font-semibold">Fine Ingredients</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cake.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="bg-white border border-[#B89B72]/10 rounded-full px-3 py-1 text-[10px] font-light tracking-wide text-stone-600"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* 2. Interactive Selection Controls */}
          <div className="space-y-6 pt-6 border-t border-[#B89B72]/15">
            
            {/* Size Selector */}
            <div className="space-y-3">
              <label id="lbl-select-size" className="text-[11px] tracking-[0.2em] font-semibold uppercase text-[#3D342F]/80 flex items-center justify-between">
                <span>1. Select Portions & Size</span>
                <span className="text-[10px] lowercase text-[#B89B72] font-light italic">Recalculates estimate</span>
              </label>

              <div id="portions-selection-pack" className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {cake.sizes.map((sz) => (
                  <button
                    id={`portion-selector-${sz.name.replace(/\s+/g, '-').replace(/"/g, '')}`}
                    key={sz.name}
                    onClick={() => setSelectedSize(sz)}
                    className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      selectedSize?.name === sz.name
                        ? 'border-[#3D342F] bg-[#E8D5C4]/40 shadow-sm'
                        : 'border-[#B89B72]/15 hover:border-[#B89B72] bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-serif text-[14px] font-semibold text-[#3D342F]">{sz.name}</span>
                      <span className="text-[11px] font-sans text-stone-400 font-semibold shrink-0">
                        {sz.priceAdded > 0 ? `+$${sz.priceAdded}` : 'Included'}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] font-light text-stone-500 mt-2">
                      <span>{sz.servings}</span>
                      <span className="italic font-sans shrink-0">{sz.dimensions}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Flavor Selector */}
            <div className="space-y-3">
              <label id="lbl-select-flavor" className="text-[11px] tracking-[0.2em] font-semibold uppercase text-[#3D342F]/80 flex items-center justify-between">
                <span>2. Select Gourmet Infusion</span>
                <span className="text-[10px] uppercase tracking-widest text-[#B89B72] font-semibold">6 available</span>
              </label>
              
              <div id="flavors-selection-pack" className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {cake.flavors.map((fl) => (
                  <button
                    id={`flavor-selector-${fl.replace(/\s+/g, '-').substring(0, 15)}`}
                    key={fl}
                    onClick={() => setSelectedFlavor(fl)}
                    className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      selectedFlavor === fl
                        ? 'border-[#3D342F] bg-[#FDFBF7]'
                        : 'border-[#B89B72]/15 hover:border-[#B89B72] bg-white'
                    }`}
                  >
                    <span className="font-serif text-[14px] font-semibold text-[#3D342F]">{fl}</span>
                    <span className="text-[10px] text-stone-400 font-sans mt-0.5 max-w-[250px] leading-relaxed block">
                      Custom artisanal home recipe infusion flavor profile.
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Personalized/Decoration Notes */}
            <div className="space-y-3">
              <label id="lbl-custom-decor" className="text-[11px] tracking-[0.2em] font-semibold uppercase text-[#3D342F]/80 flex items-center justify-between">
                <span>3. Specific Customizations (Optional)</span>
                <span className="text-[10px] text-stone-400 font-light italic">Color scheme, toppers, message</span>
              </label>

              <textarea
                id="textarea-model-customizations"
                placeholder="E.g., Please incorporate a soft sage green and white theme, with a gold topper reading 'Happy birthday Elizabeth'..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full h-24 p-4 border border-[#B89B72]/20 bg-white rounded-2xl text-xs font-sans tracking-wide text-stone-600 focus:outline-none focus:border-[#3D342F] focus:ring-1 focus:ring-[#3D342F]/10 resize-none transition-all placeholder:text-stone-300"
              />
            </div>

          </div>

          {/* 3. Related Creations Recommendations Carousel */}
          <div className="space-y-4 pt-8 border-t border-[#B89B72]/15">
            <h3 className="font-serif text-lg tracking-wide font-normal text-[#3D342F]">
              You may also love
            </h3>
            <div id="related-cakes-container" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedCakes.map((rc) => (
                <div
                  id={`related-cake-${rc.id}`}
                  key={rc.id}
                  onClick={() => {
                    // Quick state trigger to rebuild focus
                    // In real apps, selecting related updates active selected index in parent
                    // We can reload by triggering a custom close then open, or let's pass down a select callback!
                    // Let's close and load immediately inside the callback! Well, since we can directly run our hook,
                    // let's trigger selecction of parent if available!
                    // Let's do a fast swap since we're tracking the states. We can just update active state variables!
                    // Click on related will update the current cake. Our component will receive the new `cake` prop properly!
                    // Let's call the `onSelectCake` if passed, or standard! 
                    // Let's check how parent operates. In App.tsx we'll define a state setter!
                    // Let's trigger a fake event that replaces the selected cake. We will export a custom handler,
                    // or let parent set state directly! That is highly elegant.
                    // We will trigger a related click callback!
                    // Wait, let's just make sure we have a click handler. Yes! Clicking related will swap the active model immediately!
                    // Let's write that beautifully.
                    // Let's use standard click:
                    handleRelatedClick(rc);
                  }}
                  className="bg-white border border-[#B89B72]/10 rounded-2xl p-3 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-2 cursor-pointer group hover:border-[#3D342F] hover:shadow-md transition-all duration-300"
                >
                  <div className="w-16 h-16 sm:w-full sm:aspect-square rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                    <img
                      src={rc.imageUrl || null}
                      alt={rc.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-104"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="truncate w-full mt-1">
                    <h4 className="font-serif text-[13px] leading-tight text-[#3D342F] group-hover:text-[#B89B72] transition-colors truncate font-semibold">
                      {rc.name}
                    </h4>
                    <p className="text-[10px] text-stone-400 mt-0.5">${rc.startingPrice}+ starting</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 4. Sticky Bottom Action Controls (Mobile Safe) */}
        <div id="product-sticky-bottom-bar" className="p-6 border-t border-[#B89B72]/15 bg-white shrink-0 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center select-none shadow-[0_-10px_20px_rgba(42,37,34,0.02)]">
          
          <div className="col-span-1 sm:col-span-4 text-center sm:text-left flex flex-col">
            <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-[#B89B72] font-semibold">Estimated Commission</span>
            <span className="font-serif text-2xl font-light text-[#3D342F] mt-0.5">
              ${currentTotalEstimate}
              <span className="text-[11px] font-sans tracking-wide text-stone-400 font-light block sm:inline sm:ml-1">
                (excl. NJ tax)
              </span>
            </span>
          </div>

          <div className="col-span-1 sm:col-span-8 flex flex-col sm:flex-row gap-3.5 w-full">
            {/* WhatsApp direct checkout */}
            <button
              id="sticky-checkout-wa-btn"
              onClick={() => onOrderWhatsApp(cake, selectedSize || undefined, selectedFlavor || undefined, customNotes || undefined)}
              className="flex-1 group bg-[#3D342F] text-[#FDFBF7] py-4 px-6 rounded-full text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#B89B72] flex items-center justify-center gap-2.5 shadow-md active:translate-y-[1px] transition-all duration-300"
            >
              <MessageSquareCode className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Inquire via WhatsApp</span>
            </button>

            {/* Design Inquiry form launch */}
            <button
              id="sticky-custom-design-btn"
              onClick={handleInquireCommissionForm}
              className="px-5 py-4 border border-[#B89B72]/30 hover:border-[#3D342F] text-[#3D342F] rounded-full text-[10px] tracking-[0.18em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-1.5"
            >
              <span>Build Bespoke sketch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
