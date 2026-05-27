/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, CheckCircle2, ChevronRight, Cake as CakeIcon, FileText, 
  Megaphone, Plus, Trash2, Edit3, Image as ImageIcon, MessageCircle, Star 
} from 'lucide-react';
import { Cake, Testimonial, Announcement, CommissionInquiry, CakeSize } from '../types';
import { GOURMET_FLAVORS, CAKE_SIZES } from '../data';

interface AdminCMSProps {
  cakes: Cake[];
  onAddCake: (cake: Cake) => void;
  onUpdateCakePrice: (id: string, price: number) => void;
  onDeleteCake: (id: string) => void;
  testimonials: Testimonial[];
  onAddTestimonial: (test: Testimonial) => void;
  onDeleteTestimonial: (id: string) => void;
  announcements: Announcement[];
  onToggleAnnouncement: (id: string) => void;
  onAddAnnouncement: (ann: Announcement) => void;
  onDeleteAnnouncement: (id: string) => void;
  inquiries: CommissionInquiry[];
  onUpdateInquiryStatus: (id: string, status: 'pending' | 'reviewed' | 'accepted') => void;
  onDeleteInquiry: (id: string) => void;
}

export default function AdminCMS({
  cakes,
  onAddCake,
  onUpdateCakePrice,
  onDeleteCake,
  testimonials,
  onAddTestimonial,
  onDeleteTestimonial,
  announcements,
  onToggleAnnouncement,
  onAddAnnouncement,
  onDeleteAnnouncement,
  inquiries,
  onUpdateInquiryStatus,
  onDeleteInquiry
}: AdminCMSProps) {
  const [activeTab, setActiveTab] = useState<'creations' | 'announcements' | 'inquiries' | 'testimonials'>('creations');

  // Form states for adding a Cake
  const [newCakeName, setNewCakeName] = useState('');
  const [newCakeCategory, setNewCakeCategory] = useState('birthday');
  const [newCakePrice, setNewCakePrice] = useState(150);
  const [newCakeDesc, setNewCakeDesc] = useState('');
  const [newCakeImage, setNewCakeImage] = useState('');
  const [newCakeIngredients, setNewCakeIngredients] = useState('Organic flour, pasture egg whites, fresh butter, vanilla cane sugar');
  const [newCakeFlavors, setNewCakeFlavors] = useState<string[]>([GOURMET_FLAVORS[0].name, GOURMET_FLAVORS[1].name]);

  // Form states for Ticker Announcement
  const [newAnnText, setNewAnnText] = useState('');

  // Form states for Testimonial
  const [newTestAuthor, setNewTestAuthor] = useState('');
  const [newTestRole, setNewTestRole] = useState('Bride');
  const [newTestLoc, setNewTestLoc] = useState('Summit, NJ');
  const [newTestText, setNewTestText] = useState('');
  const [newTestRating, setNewTestRating] = useState(5);

  const handleAddCakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCakeName || !newCakeImage) {
      alert("Please provide at least a name and a photo link for your creation!");
      return;
    }

    const ingArray = newCakeIngredients.split(',').map(s => s.trim()).filter(Boolean);

    const freshCake: Cake = {
      id: `cake-${Date.now()}`,
      name: newCakeName,
      shortDescription: newCakeDesc.substring(0, 100) + "...",
      fullDescription: newCakeDesc,
      startingPrice: Number(newCakePrice),
      category: newCakeCategory,
      imageUrl: newCakeImage,
      flavors: newCakeFlavors.length > 0 ? newCakeFlavors : [GOURMET_FLAVORS[0].name],
      sizes: CAKE_SIZES.slice(0, newCakeCategory === 'wedding' ? 5 : 3),
      isBestseller: false,
      rating: 5.0,
      ingredients: ingArray
    };

    onAddCake(freshCake);
    
    // Reset Form
    setNewCakeName('');
    setNewCakeDesc('');
    setNewCakeImage('');
    setNewCakePrice(150);
    alert("✨ Creation added to L&D Home Bakery's catalog! Look at the frontend tab to see it live!");
  };

  const handleAddAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnText) return;

    const freshAnn: Announcement = {
      id: `ann-${Date.now()}`,
      text: newAnnText,
      active: true
    };

    onAddAnnouncement(freshAnn);
    setNewAnnText('');
  };

  const handleAddTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestAuthor || !newTestText) return;

    const freshTest: Testimonial = {
      id: `test-${Date.now()}`,
      authorName: newTestAuthor,
      roll: newTestRole,
      location: newTestLoc,
      text: newTestText,
      rating: newTestRating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    onAddTestimonial(freshTest);
    setNewTestAuthor('');
    setNewTestText('');
  };

  return (
    <section id="cms-dashboard-section" className="py-24 bg-white px-6 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12 select-none">
        
        {/* Decorative CMS Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#B89B72]/15 pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B89B72] animate-ping" />
              <span className="text-[10px] tracking-[0.25em] font-semibold uppercase text-[#B89B72]">Atelier Back-office</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-[#3D342F] font-light">
              Management <span className="italic text-[#B89B72]">CMS Board</span>
            </h1>
            <p className="text-stone-400 font-sans tracking-wide text-xs sm:text-sm max-w-xl font-light">
              Revise catalogs, configure promo ribbon tickers, review custom client commissions, and organize reviews. 
              All data updates instantly.
            </p>
          </div>

          {/* Tab controllers */}
          <div id="cms-tab-switches" className="flex flex-wrap gap-2.5 bg-[#FDFBF7] border border-[#B89B72]/15 p-1 rounded-2xl w-fit">
            <button
              id="switch-cms-creations"
              onClick={() => setActiveTab('creations')}
              className={`py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider transition-all uppercase flex items-center gap-2 ${
                activeTab === 'creations'
                  ? 'bg-[#3D342F] text-[#FDFBF7] shadow-sm'
                  : 'text-stone-500 hover:text-[#3D342F] hover:bg-stone-50'
              }`}
            >
              <CakeIcon className="w-3.5 h-3.5" />
              <span>Catalog Portfolio</span>
            </button>

            <button
              id="switch-cms-inquiries"
              onClick={() => setActiveTab('inquiries')}
              className={`py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider transition-all uppercase flex items-center gap-2 relative ${
                activeTab === 'inquiries'
                  ? 'bg-[#3D342F] text-[#FDFBF7] shadow-sm'
                  : 'text-stone-500 hover:text-[#3D342F] hover:bg-stone-50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Commission Logs</span>
              {inquiries.filter(i => i.status === 'pending').length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
                  {inquiries.filter(i => i.status === 'pending').length}
                </span>
              )}
            </button>

            <button
              id="switch-cms-announcements"
              onClick={() => setActiveTab('announcements')}
              className={`py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider transition-all uppercase flex items-center gap-2 ${
                activeTab === 'announcements'
                  ? 'bg-[#3D342F] text-[#FDFBF7] shadow-sm'
                  : 'text-stone-500 hover:text-[#3D342F] hover:bg-stone-50'
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Ribbons & Offers</span>
            </button>

            <button
              id="switch-cms-testimonials"
              onClick={() => setActiveTab('testimonials')}
              className={`py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider transition-all uppercase flex items-center gap-2 ${
                activeTab === 'testimonials'
                  ? 'bg-[#3D342F] text-[#FDFBF7] shadow-sm'
                  : 'text-stone-500 hover:text-[#3D342F] hover:bg-stone-50'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Reviews</span>
            </button>
          </div>
        </div>

        {/* CMS Tab Body */}
        <div id="cms-tab-contents" className="bg-white">

          {/* TAB 1: Catalog Portfolio Builder */}
          {activeTab === 'creations' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column - Add Cake Form */}
              <form 
                id="cms-add-cake-form"
                onSubmit={handleAddCakeSubmit} 
                className="lg:col-span-5 bg-[#FDFBF7]/85 border border-[#B89B72]/15 p-6 sm:p-8 rounded-[2rem] space-y-5"
              >
                <div className="flex items-center gap-1.5 border-b border-[#B89B72]/15 pb-3">
                  <Plus className="w-4.5 h-4.5 text-[#B89B72]" />
                  <h3 className="font-serif text-lg text-[#3D342F] font-semibold">Publish New Design</h3>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#3D342F]/80 font-bold">Creation Name</label>
                    <input
                      required
                      type="text"
                      placeholder="E.g., Sweet Lavender Teahouse"
                      value={newCakeName}
                      onChange={(e) => setNewCakeName(e.target.value)}
                      className="p-3 border border-[#B89B72]/20 bg-white rounded-xl text-xs outline-none focus:border-[#3D342F]"
                    />
                  </div>

                  {/* Price & Cat */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-[#3D342F]/80 font-bold">Starting Price ($)</label>
                      <input
                        required
                        type="number"
                        min="50"
                        value={newCakePrice}
                        onChange={(e) => setNewCakePrice(Number(e.target.value))}
                        className="p-3 border border-[#B89B72]/20 bg-white rounded-xl text-xs outline-none focus:border-[#3D342F]"
                      />
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-[#3D342F]/80 font-bold">Category</label>
                      <select
                        value={newCakeCategory}
                        onChange={(e) => setNewCakeCategory(e.target.value)}
                        className="p-3 border border-[#B89B72]/20 bg-white rounded-xl text-xs outline-none focus:border-[#3D342F]"
                      >
                        <option value="wedding">Wedding</option>
                        <option value="vintage">Vintage Bow</option>
                        <option value="minimal">Minimalist Art</option>
                        <option value="floral">Pressed Floral</option>
                        <option value="kids">Kids Whimsy</option>
                        <option value="luxury">Luxury Celebration</option>
                      </select>
                    </div>
                  </div>

                  {/* Image URL link */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#3D342F]/80 font-bold flex items-center justify-between">
                      <span>High-Res Photo Link (Unsplash recommended)</span>
                      <ImageIcon className="w-3.5 h-3.5 text-[#B89B72]" />
                    </label>
                    <input
                      required
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={newCakeImage}
                      onChange={(e) => setNewCakeImage(e.target.value)}
                      className="p-3 border border-[#B89B72]/20 bg-white rounded-xl text-xs outline-none focus:border-[#3D342F]"
                    />
                    <span className="text-[9px] text-stone-400 leading-relaxed font-sans mt-0.5">
                      Tip: Use an Unsplash link structure, or paste any direct cake link.
                    </span>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#3D342F]/80 font-bold">Recipe Description</label>
                    <textarea
                      required
                      placeholder="Describe the aesthetic and gourmand specifications..."
                      value={newCakeDesc}
                      onChange={(e) => setNewCakeDesc(e.target.value)}
                      className="p-3 border border-[#B89B72]/20 bg-white rounded-xl text-xs outline-none focus:border-[#3D342F] h-20 resize-none"
                    />
                  </div>

                  {/* Ingredients array */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#3D342F]/80 font-bold">Fine Ingredients (Comma separated)</label>
                    <input
                      type="text"
                      placeholder="Organic flour, Fresh berries, Madagascar vanilla, Pasture eggs"
                      value={newCakeIngredients}
                      onChange={(e) => setNewCakeIngredients(e.target.value)}
                      className="p-3 border border-[#B89B72]/20 bg-white rounded-xl text-xs outline-none focus:border-[#3D342F]"
                    />
                  </div>
                </div>

                <button
                  id="cms-publish-cake-btn"
                  type="submit"
                  className="w-full py-3.5 bg-[#3D342F] hover:bg-[#B89B72] text-[#FDFBF7] font-semibold text-xs tracking-widest uppercase rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Creation</span>
                </button>
              </form>

              {/* Right Column - Existing Cakes list with Inline price editor */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center justify-between border-b border-[#B89B72]/15 pb-3">
                  <h3 className="font-serif text-lg text-[#3D342F] font-semibold">Active Studio Catalog ({cakes.length})</h3>
                  <span className="text-[10px] text-stone-400 lowercase italic">Double-click or edit values directly</span>
                </div>

                <div id="cms-catalog-grid" className="divide-y divide-[#B89B72]/10 max-h-[620px] overflow-y-auto pr-2 space-y-4">
                  {cakes.map((cake) => (
                    <div
                      id={`cms-catalog-item-${cake.id}`}
                      key={cake.id}
                      className="flex items-center justify-between py-4 gap-4"
                    >
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-[#B89B72]/15">
                          <img src={cake.imageUrl || null} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>

                        <div>
                          <h4 className="font-serif text-base font-semibold text-[#3D342F]">{cake.name}</h4>
                          <span className="bg-[#E8D5C4] border border-[#B89B72]/15 rounded-full px-2.5 py-0.5 text-[9px] uppercase tracking-widest text-[#3D342F] font-bold font-sans mt-1 inline-block">
                            {cake.category}
                          </span>
                        </div>
                      </div>

                      {/* Right editing details */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-stone-400 font-semibold">$</span>
                          <input
                            id={`inline-price-edit-${cake.id}`}
                            type="number"
                            value={cake.startingPrice}
                            onChange={(e) => onUpdateCakePrice(cake.id, Number(e.target.value))}
                            className="w-16 p-1.5 border border-[#B89B72]/20 rounded-lg text-xs font-mono font-semibold outline-none focus:border-[#3D342F] text-center"
                            title="Edit starting cost range"
                          />
                        </div>

                        {/* Delete asset */}
                        <button
                          id={`cms-delete-cake-${cake.id}`}
                          onClick={() => {
                            if (confirm(`Are you sure you want to remove '${cake.name}' from the public catalog?`)) {
                              onDeleteCake(cake.id);
                            }
                          }}
                          className="w-9 h-9 rounded-lg border border-rose-100 text-rose-500 hover:bg-rose-50 flex items-center justify-center transition-colors shrink-0"
                          title="Delete from Catalog"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Commission Ledger Logs */}
          {activeTab === 'inquiries' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-[#B89B72]/15 pb-4">
                <div>
                  <h3 className="font-serif text-lg text-[#3D342F] font-semibold">Bespoke Commission Ledger</h3>
                  <p className="text-[11px] text-stone-400 mt-1">Review custom commissions received via the bespoke booking visualizer.</p>
                </div>
                <span className="bg-[#3D342F] text-white rounded-full px-3 py-1 text-[10px] font-bold font-sans">
                  {inquiries.length} Inquiries Total
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-[#B89B72]/20 rounded-[2rem] bg-[#FDFBF7]/30 max-w-lg mx-auto">
                  <FileText className="w-10 h-10 text-[#B89B72]/50 mx-auto mb-4" />
                  <p className="font-serif text-base text-[#3D342F]">Ledger is empty.</p>
                  <p className="text-[11px] text-stone-400 font-sans mt-1">Clients who fill out the Bespoke Inquiry terminal will be registered live here.</p>
                </div>
              ) : (
                <div id="cms-inquiries-ledger" className="space-y-6">
                  {inquiries.map((inq) => (
                    <div
                      id={`ledger-inq-item-${inq.id}`}
                      key={inq.id}
                      className="border border-[#B89B72]/15 rounded-[2rem] p-6 bg-[#FDFBF7]/30 flex flex-col md:flex-row md:items-start justify-between gap-6"
                    >
                      {/* Left Block - Metadata details */}
                      <div className="space-y-4 flex-1">
                        
                        <div className="flex flex-wrap items-center gap-3.5">
                          <span className="font-serif text-lg font-semibold text-[#3D342F]">{inq.name}</span>
                          <span className="text-xs text-stone-400">({inq.dateCreated})</span>
                          
                          {/* Active Status Badge select */}
                          <select
                            id={`status-selector-${inq.id}`}
                            value={inq.status}
                            onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider appearance-none cursor-pointer border ${
                              inq.status === 'pending'
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : inq.status === 'reviewed'
                                ? 'bg-blue-100 text-blue-800 border-blue-300'
                                : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            }`}
                          >
                            <option value="pending">● Pending Review</option>
                            <option value="reviewed">● Reviewed</option>
                            <option value="accepted">✓ Accepted / Booked</option>
                          </select>
                        </div>

                        {/* Specifications list */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white border border-[#B89B72]/10 p-4 rounded-2xl text-[11px] font-sans">
                          <div>
                            <span className="text-stone-400 uppercase tracking-widest text-[8px] font-bold block">Theme Style</span>
                            <span className="font-serif text-stone-700 font-semibold mt-1 block uppercase">{inq.cakeType}</span>
                          </div>
                          <div>
                            <span className="text-stone-400 uppercase tracking-widest text-[8px] font-bold block">Size Portions</span>
                            <span className="text-stone-700 font-semibold mt-1 block">{inq.portions}</span>
                          </div>
                          <div>
                            <span className="text-stone-400 uppercase tracking-widest text-[8px] font-bold block">Choice Flavor</span>
                            <span className="text-stone-700 font-semibold mt-1 block">{inq.flavor}</span>
                          </div>
                          <div>
                            <span className="text-stone-400 uppercase tracking-widest text-[8px] font-bold block">Budget Goal</span>
                            <span className="text-stone-700 font-bold mt-1 block text-[#B89B72]">{inq.budget}</span>
                          </div>
                        </div>

                        {/* Custom message details */}
                        {inq.message && (
                          <div className="space-y-1">
                            <span className="text-[8px] uppercase tracking-widest font-bold text-stone-400">Design Instructions</span>
                            <p className="text-xs text-stone-500 font-light leading-relaxed bg-white border border-[#B89B72]/10 p-3 rounded-2xl">
                              {inq.message}
                            </p>
                          </div>
                        )}

                        {/* Contacts channels shortcuts */}
                        <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-stone-400">
                          <span>Email: <strong className="text-stone-700">{inq.email}</strong></span>
                          <span>Phone: <strong className="text-stone-700">{inq.phone}</strong></span>
                          <span>Event Date: <strong className="text-stone-700">{inq.eventDate}</strong></span>
                        </div>
                      </div>

                      {/* Right Block - Optional Reference preview + ledger control actions */}
                      <div className="flex flex-col items-center sm:items-end justify-between shrink-0 gap-6">
                        
                        {inq.referenceImageBase64 ? (
                          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#B89B72]/15 bg-stone-100 flex-shrink-0 relative group">
                            <img src={inq.referenceImageBase64 || null} alt="Sketch Reference" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-stone-200 flex items-center justify-center text-stone-300">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <a
                            id={`contact-channel-btn-${inq.id}`}
                            href={`https://wa.me/${inq.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-1.5 px-3 bg-[#3D342F] hover:bg-[#B89B72] text-white rounded-lg text-[10px] tracking-wider uppercase font-semibold transition-colors flex items-center gap-1.5"
                          >
                            <span>WhatsApp Chat</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </a>

                          <button
                            id={`ledg-delete-inq-${inq.id}`}
                            onClick={() => {
                              if (confirm(`Remove custom inquiry log for '${inq.name}' permanently?`)) {
                                onDeleteInquiry(inq.id);
                              }
                            }}
                            className="w-8 h-8 rounded-lg border border-rose-100 hover:bg-rose-50 text-rose-500 flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Announcements & Promotion Ribbons */}
          {activeTab === 'announcements' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
              
              {/* Left Column - Add Banner Form */}
              <form 
                id="cms-add-announcement-form"
                onSubmit={handleAddAnnouncementSubmit} 
                className="md:col-span-5 bg-[#FDFBF7]/85 border border-[#B89B72]/15 p-6 sm:p-8 rounded-[2rem] space-y-4"
              >
                <div className="flex items-center gap-1.5 border-b border-[#B89B72]/15 pb-3">
                  <Plus className="w-4.5 h-4.5 text-[#B89B72]" />
                  <h3 className="font-serif text-lg text-[#3D342F] font-semibold">Publish Notification Banner</h3>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[#3D342F]/80 font-bold">Banner Statement Text</label>
                  <textarea
                    required
                    placeholder="E.g., Winter Holiday Booking Special: 10% complimentary cupcakes for bookings over $300!"
                    value={newAnnText}
                    onChange={(e) => setNewAnnText(e.target.value)}
                    className="p-3 border border-[#B89B72]/20 bg-white rounded-xl text-xs outline-none focus:border-[#3D342F] h-24 resize-none"
                  />
                </div>

                <button
                  id="cms-publish-announcement-btn"
                  type="submit"
                  className="w-full py-3 bg-[#3D342F] hover:bg-[#B89B72] text-white text-xs tracking-widest uppercase font-semibold rounded-full transition-colors"
                >
                  Publish Announcement
                </button>
              </form>

              {/* Right Column - Existing Ribbons list */}
              <div className="md:col-span-7 space-y-5">
                <div className="border-b border-[#B89B72]/15 pb-3">
                  <h3 className="font-serif text-lg text-[#3D342F] font-semibold">Heirloom Ribbons Catalog</h3>
                </div>

                <div id="cms-announcement-tracker-list" className="divide-y divide-[#B89B72]/10 pr-2 space-y-4">
                  {announcements.map((ann) => (
                    <div
                      id={`ann-tracker-${ann.id}`}
                      key={ann.id}
                      className="flex items-center justify-between py-4 gap-4"
                    >
                      <div className="space-y-1.5 flex-grow">
                        <p className="text-xs font-medium text-stone-700 font-sans tracking-wide leading-relaxed">
                          {ann.text}
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <button
                            id={`ann-toggle-${ann.id}`}
                            onClick={() => onToggleAnnouncement(ann.id)}
                            className={`py-1 px-3 border rounded-full text-[9px] font-bold uppercase tracking-wider transition-colors ${
                              ann.active
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                                : 'bg-stone-50 text-stone-400 border-stone-200 hover:bg-stone-150'
                            }`}
                          >
                            {ann.active ? '● Active in Header' : '○ Standby Inactive'}
                          </button>
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        id={`delete-announcement-${ann.id}`}
                        onClick={() => onDeleteAnnouncement(ann.id)}
                        className="w-9 h-9 rounded-lg border border-rose-100 text-rose-500 hover:bg-rose-50 flex items-center justify-center transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: Testimonials/Reviews Manage */}
          {activeTab === 'testimonials' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
              
              {/* Left Column - Add Review Form */}
              <form 
                id="cms-add-testimonial-form"
                onSubmit={handleAddTestimonialSubmit} 
                className="md:col-span-5 bg-[#FDFBF7]/85 border border-[#B89B72]/15 p-6 sm:p-8 rounded-[2rem] space-y-4"
              >
                <div className="flex items-center gap-1.5 border-b border-[#B89B72]/15 pb-3">
                  <Plus className="w-4.5 h-4.5 text-[#B89B72]" />
                  <h3 className="font-serif text-lg text-[#3D342F] font-semibold">Publish Client Diary Log</h3>
                </div>

                <div className="space-y-3">
                  {/* Author Name */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#3D342F]/80 font-bold">Author Name</label>
                    <input
                      required
                      type="text"
                      placeholder="E.g., Lady Montgomery"
                      value={newTestAuthor}
                      onChange={(e) => setNewTestAuthor(e.target.value)}
                      className="p-3 border border-[#B89B72]/20 bg-white rounded-xl text-xs outline-none focus:border-[#3D342F]"
                    />
                  </div>

                  {/* Role and Location */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-[#3D342F]/80 font-bold">Role / Association</label>
                      <input
                        required
                        type="text"
                        placeholder="E.g., Bride / Groom"
                        value={newTestRole}
                        onChange={(e) => setNewTestRole(e.target.value)}
                        className="p-3 border border-[#B89B72]/20 bg-white rounded-xl text-xs outline-none focus:border-[#3D342F]"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-[#3D342F]/80 font-bold">Location Town</label>
                      <input
                        required
                        type="text"
                        placeholder="E.g., Short Hills, NJ"
                        value={newTestLoc}
                        onChange={(e) => setNewTestLoc(e.target.value)}
                        className="p-3 border border-[#B89B72]/20 bg-white rounded-xl text-xs outline-none focus:border-[#3D342F]"
                      />
                    </div>
                  </div>

                  {/* Rating selection */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#3D342F]/80 font-bold">Score Rating Stars</label>
                    <select
                      value={newTestRating}
                      onChange={(e) => setNewTestRating(Number(e.target.value))}
                      className="p-3 border border-[#B89B72]/20 bg-white rounded-xl text-xs outline-none focus:border-[#3D342F]"
                    >
                      <option value="5">5 Stars Rating (Highly recommended)</option>
                      <option value="4">4 Stars Rating</option>
                      <option value="3">3 Stars Rating</option>
                    </select>
                  </div>

                  {/* Review Text */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#3D342F]/80 font-bold">Detailed Quote Review</label>
                    <textarea
                      required
                      placeholder="Type testimonial details..."
                      value={newTestText}
                      onChange={(e) => setNewTestText(e.target.value)}
                      className="p-3 border border-[#B89B72]/20 bg-white rounded-xl text-xs outline-none focus:border-[#3D342F] h-20 resize-none"
                    />
                  </div>
                </div>

                <button
                  id="cms-publish-testimonial-btn"
                  type="submit"
                  className="w-full py-3 bg-[#3D342F] hover:bg-[#B89B72] text-[#FDFBF7] font-semibold text-xs tracking-widest uppercase rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Master Diary</span>
                </button>
              </form>

              {/* Right Column - test tracker */}
              <div className="md:col-span-7 space-y-5">
                <div className="border-b border-[#B89B72]/15 pb-3">
                  <h3 className="font-serif text-lg text-[#3D342F] font-semibold">Active Client Testimonials ({testimonials.length}) </h3>
                </div>

                <div id="cms-testimonials-tracker-list" className="divide-y divide-[#B89B72]/10 pr-2 space-y-4">
                  {testimonials.map((test) => (
                    <div
                      id={`test-log-${test.id}`}
                      key={test.id}
                      className="flex items-start justify-between py-4 gap-4"
                    >
                      <div className="space-y-1.5 flex-grow">
                        <div className="flex items-center gap-2.5">
                          <h4 className="font-serif text-base font-semibold text-[#3D342F]">{test.authorName}</h4>
                          <span className="text-[10px] text-[#B89B72] tracking-widest font-mono select-none">({test.location})</span>
                        </div>
                        
                        <p className="text-xs text-stone-500 font-sans italic leading-relaxed">
                          "{test.text}"
                        </p>
                        
                        <div className="flex items-center gap-1 text-[#B89B72]">
                          <Star className="w-3 h-3 fill-[#B89B72]" />
                          <span className="text-[10px] font-bold font-sans">{test.rating.toFixed(1)} Stars rating</span>
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        id={`delete-testimonial-${test.id}`}
                        onClick={() => onDeleteTestimonial(test.id)}
                        className="w-9 h-9 rounded-lg border border-rose-100 text-rose-500 hover:bg-rose-50 flex items-center justify-center transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
