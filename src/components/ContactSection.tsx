/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, MessageSquareShare, Send, HelpCircle, FileImage, Trash2, Instagram, MessageCircleCode } from 'lucide-react';
import { CommissionInquiry } from '../types';

interface ContactSectionProps {
  onAddInquiry: (inquiry: CommissionInquiry) => void;
  prefilledParams?: {
    cakeName: string;
    cakeType: string;
    portions: string;
    flavor: string;
    budget: string;
  } | null;
}

export default function ContactSection({ onAddInquiry, prefilledParams }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [cakeType, setCakeType] = useState(prefilledParams?.cakeType || 'wedding');
  const [portions, setPortions] = useState(prefilledParams?.portions || 'Classic (15-18 guests)');
  const [flavor, setFlavor] = useState(prefilledParams?.flavor || 'Madagascan Bourbon Vanilla & Fig');
  const [budget, setBudget] = useState(prefilledParams?.budget || '$165-$250');
  const [message, setMessage] = useState(prefilledParams ? `Inquiring about: ${prefilledParams.cakeName}. Notes: ` : '');
  
  // Reference File Attachment uploader state
  const [refFileName, setRefFileName] = useState('');
  const [refFileBase64, setRefFileBase64] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSuccess, setIsSuccess] = useState(false);

  // File Upload Helpers
  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setRefFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setRefFileBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeAttachment = () => {
    setRefFileName('');
    setRefFileBase64('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !eventDate) {
      alert("Please complete the required contact details (Name, Phone, Email, and Event Date).");
      return;
    }

    const newInquiry: CommissionInquiry = {
      id: `inq-${Date.now()}`,
      name,
      phone,
      email,
      eventDate,
      cakeType,
      portions,
      flavor,
      budget,
      referenceImageName: refFileName || undefined,
      referenceImageBase64: refFileBase64 || undefined,
      message,
      dateCreated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'pending'
    };

    // 1. Add to local state (Reviewable in Owner Dashboard!)
    onAddInquiry(newInquiry);

    // 2. Formulate gorgeous WhatsApp text template to draft high-end client message
    const formattedText = `Hello L&D Home Bakery! 🌸
I would love to check availability for a custom luxury cake commission. Here are my event details:

• Name: ${name}
• Email: ${email}
• Event Date: ${eventDate}
• Collection Style: ${cakeType.toUpperCase()}
• Portions/Tiers: ${portions}
• Choice Flavor: ${flavor}
• Planned Budget: ${budget}
${message ? `• Design Details: ${message}` : ''}
${refFileName ? `• Attached Design Reference Sketch: ${refFileName}` : ''}

Looking forward to collaborating with you! ✨`;

    const encodedText = encodeURIComponent(formattedText);
    const waUrl = `https://wa.me/19735550199?text=${encodedText}`;

    // Show beautiful success screen and offer links
    setIsSuccess(true);

    // Delay redirect to allow user to see success
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noreferrerPolicy=no-referrer');
    }, 1500);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setEventDate('');
    setMessage('');
    removeAttachment();
    setIsSuccess(false);
  };

  return (
    <section 
      id="bespoke-inquiry-section" 
      className="py-24 bg-[#FDFBF7] px-6 border-b border-[#B89B72]/15 relative overflow-hidden"
    >
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 rounded-full bg-[#E8D5C4]/45 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[-5%] w-80 h-80 rounded-full bg-[#F5E6E0]/15 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 select-none">
          <div className="flex items-center gap-1.5 justify-center">
            <span className="w-5 h-[1px] bg-[#B89B72]/40"></span>
            <span className="text-[10px] tracking-[0.25em] font-medium uppercase text-[#B89B72]">The Order Atelier</span>
            <span className="w-5 h-[1px] bg-[#B89B72]/40"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-[#3D342F] font-light">
            Bespoke <span className="italic text-[#B89B72]">Cake Commissions</span>
          </h2>
          <p className="text-stone-400 font-sans tracking-wide text-xs sm:text-sm max-w-xl font-light">
            Fill out our refined inquiry form to check receipt and draft a design schedule. 
            Once submitted, your sketch will be filed into our system and automatically compiled to WhatsApp.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              id="custom-cake-inquiry-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white border border-[#B89B72]/15 rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-md gap-8 grid grid-cols-1 md:grid-cols-2"
            >
              
              {/* Left Column - User Coordinates */}
              <div className="space-y-6">
                <h3 className="font-serif text-lg tracking-wide text-[#3D342F] border-b border-[#B89B72]/15 pb-2.5 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B89B72]" />
                  <span>1. Contact Channels</span>
                </h3>

                <div className="space-y-4">
                  {/* Name field */}
                  <div className="flex flex-col space-y-1.5">
                    <label id="lbl-contact-name" className="text-[10px] tracking-widest font-semibold uppercase text-stone-500">
                      Primary Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="inq-contact-name"
                      type="text"
                      required
                      placeholder="E.g., Charlotte Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="p-3.5 border border-[#B89B72]/20 bg-[#FDFBF7]/40 rounded-xl text-xs font-sans tracking-wide text-stone-700 outline-none focus:border-[#3D342F] focus:bg-white transition-all placeholder:text-stone-300"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label id="lbl-contact-phone" className="text-[10px] tracking-widest font-semibold uppercase text-stone-500">
                        Phone (WhatsApp) <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="inq-contact-phone"
                        type="tel"
                        required
                        placeholder="E.g., (973) 555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="p-3.5 border border-[#B89B72]/20 bg-[#FDFBF7]/40 rounded-xl text-xs font-sans tracking-wide text-stone-700 outline-none focus:border-[#3D342F] focus:bg-white transition-all placeholder:text-stone-300"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label id="lbl-contact-email" className="text-[10px] tracking-widest font-semibold uppercase text-stone-500">
                        Email Coordinates <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="inq-contact-email"
                        type="email"
                        required
                        placeholder="E.g., vance@princeton.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3.5 border border-[#B89B72]/20 bg-[#FDFBF7]/40 rounded-xl text-xs font-sans tracking-wide text-stone-700 outline-none focus:border-[#3D342F] focus:bg-white transition-all placeholder:text-stone-300"
                      />
                    </div>
                  </div>

                  {/* Event scheduling date */}
                  <div className="flex flex-col space-y-1.5">
                    <label id="lbl-contact-date" className="text-[10px] tracking-widest font-semibold uppercase text-stone-500 flex items-center justify-between">
                      <span>Event Calendar Date <span className="text-rose-400">*</span></span>
                      <span className="text-[9px] text-amber-500 font-semibold uppercase tracking-widest">NJ and surrounds only</span>
                    </label>
                    <div className="relative">
                      <input
                        id="inq-event-date"
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full p-3.5 border border-[#B89B72]/20 bg-[#FDFBF7]/40 rounded-xl text-xs font-sans tracking-wide text-stone-700 outline-none focus:border-[#3D342F] focus:bg-white transition-all placeholder:text-stone-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Cake Reference Drag-Drop */}
                <div className="space-y-2">
                  <label id="lbl-ref-upload" className="text-[10px] tracking-widest font-semibold uppercase text-stone-500">
                    Moodboard / Cake Reference Attachment (Optional)
                  </label>
                  
                  <div
                    id="dropzone-area"
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer flex flex-col items-center justify-center transition-all ${
                      dragActive 
                        ? 'border-[#3D342F] bg-[#E8D5C4]/30' 
                        : 'border-[#B89B72]/25 hover:border-[#B89B72] bg-[#FDFBF7]/30'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={onFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    {refFileBase64 ? (
                      <div className="space-y-3 w-full flex flex-col items-center relative">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#B89B72]/30 shadow-sm relative">
                          <img src={refFileBase64 || null} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-[10px] font-sans text-stone-500 font-semibold max-w-[200px] truncate">{refFileName}</p>
                        <button
                          id="clear-attachment"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeAttachment();
                          }}
                          className="py-1 px-2.5 rounded-lg bg-rose-50 text-rose-500 text-[10px] tracking-[0.12em] uppercase font-semibold flex items-center gap-1 border border-rose-100 hover:bg-rose-100 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <FileImage className="w-8 h-8 text-[#B89B72]/60 mx-auto" />
                        <p className="text-[10px] font-sans text-stone-500 font-semibold tracking-wide">
                          Drag and drop event moodboard sketch, <br />
                          or <span className="text-[#B89B72] select-none cursor-pointer underline">browse local files</span>
                        </p>
                        <p className="text-[8px] font-sans text-stone-400 uppercase tracking-widest">PNG, JPEG up to 5MB</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column - Cake Commission Configurations */}
              <div className="space-y-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg tracking-wide text-[#3D342F] border-b border-[#B89B72]/15 pb-2.5 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B89B72]" />
                    <span>2. Sweet Custom Specifications</span>
                  </h3>

                  <div className="space-y-4 pt-1">
                    {/* Collection drop */}
                    <div className="flex flex-col space-y-1.5">
                      <label id="lbl-commission-style" className="text-[10px] tracking-widest font-semibold uppercase text-stone-500">
                        Design Theme Aesthetic
                      </label>
                      <select
                        id="inq-cake-style"
                        value={cakeType}
                        onChange={(e) => setCakeType(e.target.value)}
                        className="p-3.5 border border-[#B89B72]/20 bg-[#FDFBF7]/40 rounded-xl text-xs font-sans tracking-wide text-stone-700 outline-none focus:border-[#3D342F] focus:bg-white transition-all appearance-none"
                      >
                        <option value="wedding">Wedding / Bridal Couture</option>
                        <option value="vintage">Vintage Ruffled Ribbon</option>
                        <option value="minimal">Minimalist Architectural</option>
                        <option value="floral">Pressed Meadow Wildflower</option>
                        <option value="kids">Magical Whimsy Kids Party</option>
                        <option value="luxury">High-End Custom Milestone</option>
                      </select>
                    </div>

                    {/* Portions Needed */}
                    <div className="flex flex-col space-y-1.5">
                      <label id="lbl-commission-portions" className="text-[10px] tracking-widest font-semibold uppercase text-stone-500">
                        Portions & Tiers (Guests size)
                      </label>
                      <select
                        id="inq-portions"
                        value={portions}
                        onChange={(e) => setPortions(e.target.value)}
                        className="p-3.5 border border-[#B89B72]/20 bg-[#FDFBF7]/40 rounded-xl text-xs font-sans tracking-wide text-stone-700 outline-none focus:border-[#3D342F] focus:bg-white transition-all appearance-none"
                      >
                        <option value="6&quot; Petite (8-10 guests)">6" Petite (8-10 guests)</option>
                        <option value="8&quot; Classic (15-18 guests)">8" Classic (15-18 guests)</option>
                        <option value="10&quot; Grand (25-30 guests)">10" Grand (25-30 guests)</option>
                        <option value="Double-Tier Signature (40-45 guests)">Double-Tier Signature (40-45 guests)</option>
                        <option value="Triple-Tier Grand Heirloom (75-90 guests)">Triple-Tier Grand Heirloom (75-90 guests)</option>
                      </select>
                    </div>

                    {/* Gourmet flavor list */}
                    <div className="flex flex-col space-y-1.5">
                      <label id="lbl-commission-flavor" className="text-[10px] tracking-widest font-semibold uppercase text-stone-500">
                        Artisanal Sponge Flavor Infusion
                      </label>
                      <select
                        id="inq-flavor"
                        value={flavor}
                        onChange={(e) => setFlavor(e.target.value)}
                        className="p-3.5 border border-[#B89B72]/20 bg-[#FDFBF7]/40 rounded-xl text-xs font-sans tracking-wide text-stone-700 outline-none focus:border-[#3D342F] focus:bg-white transition-all appearance-none"
                      >
                        <option value="Rose Water Champagne">Rose Water Champagne & Organic Raspberry</option>
                        <option value="Madagascan Bourbon Vanilla & Fig">Madagascan Bourbon Vanilla & Fig</option>
                        <option value="Sicilian Pistachio & Cardamom">Sicilian Pistachio & Orange Blossom Cardamom</option>
                        <option value="Earl Grey Lavender Infusion">Earl Grey Lavender & Lemon Curd</option>
                        <option value="Valrhona Dark Chocolate & Salted Toffee">Valrhona Dark Chocolate & Fleur de Sel Toffee</option>
                        <option value="Meyer Lemon & Elderflower">Meyer Lemon & St-Germain Elderflower</option>
                      </select>
                    </div>

                    {/* Budget slider/selection */}
                    <div className="flex flex-col space-y-1.5">
                      <label id="lbl-commission-budget" className="text-[10px] tracking-widest font-semibold uppercase text-stone-500">
                        Target Commission Budget
                      </label>
                      <select
                        id="inq-budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="p-3.5 border border-[#B89B72]/20 bg-[#FDFBF7]/40 rounded-xl text-xs font-sans tracking-wide text-stone-700 outline-none focus:border-[#3D342F] focus:bg-white transition-all appearance-none"
                      >
                        <option value="$130-$165">$130 - $165 (Petite intimate assemblies)</option>
                        <option value="$165-$250">$165 - $250 (Bestselling Classic lines)</option>
                        <option value="$250-$400">$250 - $400 (Custom double-tier designs)</option>
                        <option value="$400-$700">$400 - $700 (Lavish triple-tier wedding plans)</option>
                        <option value="$700+">$700+ (Extreme monumental floral sculptures)</option>
                      </select>
                    </div>

                    {/* Custom messages */}
                    <div className="flex flex-col space-y-1.5">
                      <label id="lbl-commission-notes" className="text-[10px] tracking-widest font-semibold uppercase text-stone-500">
                        Design Details & Personalization Sketch notes
                      </label>
                      <textarea
                        id="inq-message"
                        placeholder="Describe your vision, frosting colors, flowers, custom toppers, allergen restrictions, etc."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="p-3.5 border border-[#B89B72]/20 bg-[#FDFBF7]/40 rounded-xl text-xs font-sans tracking-wide text-stone-700 outline-none focus:border-[#3D342F] focus:bg-white transition-all h-24 resize-none placeholder:text-stone-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action Block */}
                <div className="pt-4 flex flex-col space-y-3 mt-4">
                  <button
                    id="submit-inquiry-btn"
                    type="submit"
                    className="w-full bg-[#3D342F] text-[#FDFBF7] hover:bg-[#B89B72] py-4 px-6 rounded-full text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all shadow-md hover:translate-y-[-2px] hover:shadow-lg duration-300"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit & Compile to WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-center gap-6 text-[10px] tracking-wide text-stone-400 mt-1 select-none">
                    <span className="flex items-center gap-1">
                      <MessageSquareShare className="w-3.5 h-3.5 text-[#B89B72]" />
                      Direct WhatsApp Drafting
                    </span>
                    <span className="flex items-center gap-1">
                      <Instagram className="w-3.5 h-3.5 text-[#B89B72]" />
                      Instagram DM Support
                    </span>
                  </div>
                </div>

              </div>

            </motion.form>
          ) : (
            <motion.div
              id="commission-success-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#B89B72]/20 rounded-[2.5rem] p-12 text-center shadow-xl max-w-lg mx-auto flex flex-col items-center select-none"
            >
              <div className="w-16 h-16 rounded-full bg-[#E8D5C4] border border-[#B89B72]/20 flex items-center justify-center text-emerald-600 mb-6 relative">
                <Sparkles className="w-7 h-7 text-[#B89B72] animate-pulse" />
              </div>

              <h3 className="font-serif text-2xl text-[#3D342F] font-semibold tracking-wide">
                Commission Compiled!
              </h3>
              
              <p className="text-xs sm:text-[13px] font-sans font-light text-stone-500 mt-3 leading-relaxed tracking-wide">
                Thank you, <strong className="text-[#3D342F]">{name}</strong>. Your sketch details have been recorded in our local database, and we are now triggering your direct messaging platform.
              </p>

              <div className="w-full bg-[#FDFBF7] border border-[#B89B72]/15 rounded-2xl p-4 mt-6 text-left space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-stone-400 font-semibold block">Commission ID</span>
                <span className="text-xs font-mono font-medium text-stone-700">LD-INQ-{Math.floor(Math.random() * 90000) + 10000}</span>
                <span className="text-[10px] text-stone-400 font-light block pt-1 border-t border-[#B89B72]/10 mt-1">
                  Owner will review details from Summit dashboard.
                </span>
              </div>

              <div className="flex flex-col gap-2.5 w-full mt-8">
                <button
                  id="success-direct-wa-trigger"
                  onClick={() => {
                    const waUrl = `https://wa.me/19735550199`;
                    window.open(waUrl, '_blank', 'noreferrerPolicy=no-referrer');
                  }}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircleCode className="w-4 h-4" />
                  <span>Open WhatsApp Directly</span>
                </button>

                <button
                  id="success-reset-form-btn"
                  onClick={resetForm}
                  className="w-full py-3 border border-[#B89B72]/30 hover:border-[#3D342F] text-[#3D342F] rounded-full text-[10px] tracking-[0.18em] uppercase font-semibold transition-all"
                >
                  Commission Another Cake
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
