import React from 'react';
import { MapPin, Phone, Clock, Navigation, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  const openGoogleMaps = () => {
    const query = encodeURIComponent(`Hotel Firdous Sahifa Masjid Rd Azampura Malakpet Hyderabad`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <footer className="bg-[#0b0a08] border-t border-[#241f17] text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Heritage */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-stone-100 font-display">Hotel Firdous</span>
              <span className="text-xs text-amber-500 font-medium">హోటల్ ఫిర్దౌస్</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Preserving authentic Hyderabadi culinary heritage since 2002. World-famous for Mutton Dum Biryani, crispy Tala Hua Gosht, and the iconic 5 AM Paya breakfast.
            </p>
            <div className="pt-1 text-[11px] text-amber-500/80 font-mono">
              Plus Code: {RESTAURANT_INFO.plusCode}
            </div>
          </div>

          {/* Timings */}
          <div className="space-y-2.5">
            <h4 className="text-stone-200 font-bold text-xs uppercase tracking-wider">
              Service Hours
            </h4>
            <div className="space-y-2 text-stone-400">
              <div>
                <span className="text-amber-400 font-medium block">Dawn Breakfast:</span>
                <span>5:00 AM – 10:30 AM (Paya, Nihari, Khichdi)</span>
              </div>
              <div>
                <span className="text-amber-400 font-medium block">Lunch & Dinner:</span>
                <span>11:30 AM – 11:30 PM (Biryani & Tala Hua)</span>
              </div>
              <div>
                <span className="text-amber-400 font-medium block">Irani Chai Counter:</span>
                <span>All day from 5:00 AM onwards</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-stone-200 font-bold text-xs uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#specialties" className="hover:text-amber-400 transition-colors">House Specialties</a></li>
              <li><a href="#breakfast" className="hover:text-amber-400 transition-colors">5 AM Paya Tradition</a></li>
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">Full Food Menu</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Customer Reviews (4.0 ★)</a></li>
              <li><a href="#location" className="hover:text-amber-400 transition-colors">Location & Transit Guide</a></li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-stone-200 font-bold text-xs uppercase tracking-wider">
              Visit Hotel Firdous
            </h4>
            <p className="leading-relaxed text-stone-300">
              {RESTAURANT_INFO.address}
            </p>
            <div className="space-y-1">
              <a 
                href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`} 
                className="text-amber-400 font-semibold hover:underline block tabular-nums"
              >
                Phone: {RESTAURANT_INFO.phone}
              </a>
            </div>
            <button
              onClick={openGoogleMaps}
              className="inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-amber-400 underline font-medium transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions to Restaurant</span>
            </button>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-[#1e1913] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Hotel Firdous (హోటల్ ఫిర్దౌస్). All rights reserved.</p>
          <p className="flex items-center gap-1 text-stone-400">
            <span>Crafted for Hyderabad food lovers and Kachiguda dawn travellers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
