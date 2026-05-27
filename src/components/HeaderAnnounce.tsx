/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, LogIn, Heart, ShoppingBag } from 'lucide-react';
import { Announcement } from '../types';

interface HeaderAnnounceProps {
  activeView: string;
  setActiveView: (view: string) => void;
  announcements: Announcement[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export default function HeaderAnnounce({
  activeView,
  setActiveView,
  announcements,
  setSelectedCategory
}: HeaderAnnounceProps) {
  const [currentAnnIndex, setCurrentAnnIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const activeAnnouncements = announcements.filter(a => a.active);

  // Rotate announcements
  useEffect(() => {
    if (activeAnnouncements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentAnnIndex((prev) => (prev + 1) % activeAnnouncements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeAnnouncements]);

  // Track page scroll for sticky styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: string, category?: string) => {
    setActiveView(view);
    if (category) {
      setSelectedCategory(category);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full z-40 relative">
      {/* 1. Announcement Ticker Banner */}
      {activeAnnouncements.length > 0 && (
        <div 
          id="announcement-bar"
          className="bg-[#3D342F] text-[#E8D5C4] py-2 px-4 text-xs font-light tracking-[0.15em] transition-all duration-500 overflow-hidden text-center flex items-center justify-center gap-2 border-b border-[#3e3530]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B89B72] animate-pulse" />
          <div className="inline-block animate-fade-in text-center">
            {activeAnnouncements[currentAnnIndex].text}
          </div>
        </div>
      )}

      {/* 2. Main Navigation Bar */}
      <nav
        id="main-nav-bar"
        className={`w-full transition-all duration-500 ${
          isScrolled
            ? 'glassmorphism bg-[#FDFBF7]/90 sticky top-0 border-b border-[#B89B72]/10 shadow-sm py-4'
            : 'bg-[#FDFBF7] py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Menu Icon for Mobile */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#3D342F] focus:outline-none p-1.5 hover:bg-[#E8D5C4]/50 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Nav Items - Left Side */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-medium tracking-[0.2em] uppercase text-[#3D342F]/80">
            <button
              id="nav-link-collections"
              onClick={() => handleNavClick('collections', 'all')}
              className={`hover:text-[#B89B72] transition-colors ${
                activeView === 'collections' ? 'text-[#B89B72] border-b border-[#B89B72]/40 pb-1' : ''
              }`}
            >
              Collections
            </button>
            <button
              id="nav-link-bespoke"
              onClick={() => handleNavClick('contact')}
              className={`hover:text-[#B89B72] transition-colors ${
                activeView === 'contact' ? 'text-[#B89B72] border-b border-[#B89B72]/40 pb-1' : ''
              }`}
            >
              Bespoke Commission
            </button>
          </div>

          {/* Central Logo */}
          <div className="text-center flex flex-col items-center">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="group focus:outline-none focus:ring-0"
            >
              <h1 className="font-serif text-2xl md:text-3xl tracking-[0.15em] text-[#3D342F] transition-colors group-hover:text-[#B89B72] font-light">
                L&D <span className="font-sans text-xs not-italic tracking-[0.4em] uppercase font-light text-[#B89B72] block sm:inline sm:ml-2">Home Bakery</span>
              </h1>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <span className="w-6 h-[1px] bg-[#B89B72]/30 group-hover:w-10 transition-all duration-500"></span>
                <span className="text-[8px] font-sans tracking-[0.4em] uppercase text-[#B89B72] font-semibold">NEW JERSEY</span>
                <span className="w-6 h-[1px] bg-[#B89B72]/30 group-hover:w-10 transition-all duration-500"></span>
              </div>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-4 md:space-x-6 text-xs font-medium tracking-[0.2em] uppercase text-[#3D342F]">
            <button
              id="nav-link-about"
              onClick={() => {
                setActiveView('home');
                setTimeout(() => {
                  document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hidden lg:block hover:text-[#B89B72] transition-colors cursor-pointer"
            >
              The Atelier
            </button>

            <button
              id="nav-cms-button"
              onClick={() => handleNavClick('cms')}
              className={`flex items-center gap-1.5 py-2 px-4 transition-all text-[10px] tracking-[0.15em] font-semibold ${
                activeView === 'cms'
                  ? 'bg-[#3D342F] text-[#FDFBF7] border border-[#3D342F]'
                  : 'bg-[#3D342F] text-white hover:bg-[#B89B72] transition-colors'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Owner CMS</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[88px] z-30 bg-[#FDFBF7] flex flex-col p-8 space-y-8 animate-fade-in md:hidden border-t border-[#B89B72]/15">
          <div className="flex flex-col space-y-6 text-sm font-medium tracking-[0.2em] uppercase text-[#3D342F]">
            <button
              id="mobile-nav-home"
              onClick={() => handleNavClick('home')}
              className="text-left py-2 hover:text-[#B89B72] border-b border-[#3D342F]/5"
            >
              Home
            </button>
            <button
              id="mobile-nav-collections"
              onClick={() => handleNavClick('collections', 'all')}
              className="text-left py-2 hover:text-[#B89B72] border-b border-[#3D342F]/5"
            >
              Explore Collections
            </button>
            <button
              id="mobile-nav-bespoke"
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 hover:text-[#B89B72] border-b border-[#3D342F]/5"
            >
              Bespoke Commission
            </button>
            <button
              id="mobile-nav-about"
              onClick={() => {
                handleNavClick('home');
                setTimeout(() => {
                  document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left py-2 hover:text-[#B89B72] border-b border-[#3D342F]/5"
            >
              About The Atelier
            </button>
            <button
              id="mobile-nav-testimonials"
              onClick={() => {
                handleNavClick('home');
                setTimeout(() => {
                  document.getElementById('testimonials-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left py-2 hover:text-[#B89B72] border-b border-[#3D342F]/5"
            >
              Client Testimonials
            </button>
            <button
              id="mobile-nav-cms"
              onClick={() => handleNavClick('cms')}
              className="text-left py-2 text-[#B89B72] border-b border-[#3D342F]/5 flex items-center justify-between"
            >
              <span>Owner Dashboard</span>
              <LogIn className="w-4 h-4 text-[#B89B72]" />
            </button>
          </div>

          <div className="pt-10 mt-auto border-t border-[#B89B72]/20 text-center flex flex-col items-center">
            <h3 className="font-serif text-lg tracking-[0.2em] text-[#3D342F] uppercase">L&D Home Bakery</h3>
            <p className="text-[10px] tracking-[0.1em] text-stone-400 mt-2">Bespoke Custom Cake Studio | New Jersey, USA</p>
            <p className="text-[10px] tracking-[0.15em] text-[#B89B72] mt-3 underline uppercase">Inquiries via WhatsApp</p>
          </div>
        </div>
      )}
    </header>
  );
}
