import React, { useState } from 'react';
import { Phone, ShoppingBag, MapPin, Clock, Download } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenReservation, onOpenDownload }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0f0e0c]/95 backdrop-blur-md border-b border-[#2d2820]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element wordmark in display face) */}
        <a href="#" className="flex items-baseline gap-2.5 whitespace-nowrap shrink-0 group">
          <span className="text-2xl font-bold tracking-tight text-amber-100 group-hover:text-amber-400 transition-colors font-display">
            Hotel Firdous
          </span>
          <span className="text-xs text-amber-500/80 font-medium tracking-wide">
            హోటల్ ఫిర్దౌస్
          </span>
        </a>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
          <a href="#specialties" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Specialties
          </a>
          <a href="#breakfast" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5">
            <span>5 AM Breakfast</span>
          </a>
          <a href="#menu" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Full Menu
          </a>
          <a href="#reviews" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Reviews (4.0 ★)
          </a>
          <a href="#location" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Location & Hours
          </a>
        </nav>

        {/* Zone 3: 1 primary action with cart, download, & table CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenDownload}
            title="Download Files & Source Code"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-200 bg-[#211b15] border border-stone-700 hover:border-amber-500 hover:text-amber-400 rounded-md transition-all whitespace-nowrap shrink-0 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            onClick={onOpenReservation}
            className="hidden lg:inline-flex items-center px-3 py-2 text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-800/60 rounded-md hover:bg-amber-900/60 transition-colors whitespace-nowrap shrink-0"
          >
            Table / Handi
          </button>
          
          <button
            onClick={onOpenCart}
            aria-label="View Order Cart"
            className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#0f0e0c] bg-gradient-to-r from-amber-400 to-amber-500 rounded-md hover:from-amber-300 hover:to-amber-400 transition-all shadow-sm whitespace-nowrap shrink-0 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Online</span>
            {cartCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-[#0f0e0c] text-amber-400 rounded-full text-[11px] font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Secondary Bar for Quick Navigation */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 border-t border-[#221e18] bg-[#14120e] text-xs text-stone-300 overflow-x-auto no-scrollbar gap-4">
        <a href="#specialties" className="whitespace-nowrap hover:text-amber-400">Specialties</a>
        <a href="#breakfast" className="whitespace-nowrap hover:text-amber-400">5 AM Breakfast</a>
        <a href="#menu" className="whitespace-nowrap hover:text-amber-400">Menu</a>
        <a href="#reviews" className="whitespace-nowrap hover:text-amber-400">4.0 ★ Reviews</a>
        <a href="#location" className="whitespace-nowrap hover:text-amber-400">Directions</a>
        <a href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`} className="whitespace-nowrap text-amber-400 font-semibold flex items-center gap-1">
          <Phone className="w-3 h-3" /> Call
        </a>
      </div>
    </header>
  );
};
