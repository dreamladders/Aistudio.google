import React, { useState } from 'react';
import { 
  Star, Navigation, Phone, Bookmark, Share2, Image, 
  MapPin, Clock, Check, ChevronRight, UtensilsCrossed, Download
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onOpenPhotos: () => void;
  onOpenClaim: () => void;
  onExploreMenu: () => void;
  onOpenDownload: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPhotos, onOpenClaim, onExploreMenu, onOpenDownload }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Live status calculation based on current hour
  const now = new Date();
  const currentHour = now.getHours();
  const isOpen = currentHour >= 5 && currentHour < 24; // 5:00 AM to 11:30 PM
  const isBreakfastTime = currentHour >= 5 && currentHour < 11;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hotel Firdous - Authentic Hyderabadi Restaurant',
          text: 'Check out Hotel Firdous at Chaderghat, Malakpet, Hyderabad. Legendary Dum Biryani, Tala Hua Gosht & 5 AM Paya Breakfast!',
          url: window.location.href,
        });
      } catch (e) {
        // Fallback to clipboard
        copyLink();
      }
    } else {
      copyLink();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 3000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const openGoogleMaps = () => {
    const query = encodeURIComponent(`Hotel Firdous Sahifa Masjid Rd Azampura Malakpet Hyderabad`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <section className="relative pt-6 pb-14 border-b border-[#252119] overflow-hidden">
      {/* Subtle warm background glow */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-1/4 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Google Business Profile Header Card */}
        <div className="bg-[#171410] border border-[#2e2820] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Business Details & Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Name & Local Scripts */}
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-amber-500 font-medium tracking-wide mb-1.5">
                  <span>Hyderabadi Restaurant</span>
                  <span>·</span>
                  <span>Est. 2002</span>
                  <span>·</span>
                  <span>Old Malakpet / Chaderghat</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight font-display text-balance">
                  Hotel Firdous
                </h1>
                
                <div className="flex items-center gap-3 mt-1.5 text-base sm:text-lg text-amber-300/90 font-medium">
                  <span>{RESTAURANT_INFO.teluguName}</span>
                  <span className="text-stone-600">|</span>
                  <span className="font-serif tracking-wider">{RESTAURANT_INFO.urduName}</span>
                </div>
              </div>

              {/* Rating & Review Counter */}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/15 border border-amber-500/30 rounded-md text-amber-400 font-semibold">
                  <span>{RESTAURANT_INFO.rating.toFixed(1)}</span>
                  <div className="flex items-center text-amber-400">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <Star className="w-3.5 h-3.5 text-stone-600 fill-stone-600" />
                  </div>
                </div>

                <a 
                  href="#reviews" 
                  className="text-stone-300 hover:text-amber-400 underline decoration-stone-600 underline-offset-4 transition-colors font-medium tabular-nums"
                >
                  {RESTAURANT_INFO.reviewCount.toLocaleString()} reviews in the app
                </a>
                
                <span className="text-stone-600">·</span>
                
                <button
                  onClick={onOpenPhotos}
                  className="text-amber-400 hover:text-amber-300 font-medium underline decoration-amber-500/50 underline-offset-4 flex items-center gap-1 transition-colors"
                >
                  <Image className="w-3.5 h-3.5" />
                  <span className="tabular-nums">{RESTAURANT_INFO.photosCount} Photos</span>
                </button>
              </div>

              {/* Status and Operating Window */}
              <div className="flex flex-wrap items-center gap-2.5 text-sm">
                <span className={`inline-flex items-center gap-1.5 font-semibold ${isOpen ? 'text-emerald-400' : 'text-rose-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                  {isOpen ? 'Open' : 'Closed'}
                </span>
                <span className="text-stone-500">·</span>
                <span className="text-stone-300">Closes 11:30 pm</span>
                <span className="text-stone-500">·</span>
                <span className="text-amber-400/90 text-xs sm:text-sm">
                  {isBreakfastTime ? '🌅 Dawn Paya & Nihari Breakfast Active' : '🔥 Biryani & Tala Hua Gosht Counter Active'}
                </span>
              </div>

              {/* Primary Action Buttons Bar */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
                <button
                  onClick={openGoogleMaps}
                  className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all text-xs font-semibold group active:scale-95"
                >
                  <Navigation className="w-4 h-4 sm:w-5 sm:h-5 mb-1 group-hover:-translate-y-0.5 transition-transform" />
                  <span>Directions</span>
                </button>

                <button
                  onClick={onExploreMenu}
                  className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-[#231f18] hover:bg-[#2c271f] text-stone-200 border border-[#3b3428] transition-all text-xs font-semibold group active:scale-95"
                >
                  <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 mb-1 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Menu</span>
                </button>

                <a
                  href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                  className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-[#231f18] hover:bg-[#2c271f] text-stone-200 border border-[#3b3428] transition-all text-xs font-semibold group active:scale-95"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mb-1 text-amber-400 group-hover:rotate-12 transition-transform" />
                  <span>Call</span>
                </a>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl transition-all text-xs font-semibold active:scale-95 ${
                    isSaved 
                      ? 'bg-amber-600 text-stone-950 border border-amber-400 font-bold' 
                      : 'bg-[#231f18] hover:bg-[#2c271f] text-stone-200 border border-[#3b3428]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 ${isSaved ? 'fill-current' : 'text-amber-400'}`} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-[#231f18] hover:bg-[#2c271f] text-stone-200 border border-[#3b3428] transition-all text-xs font-semibold group active:scale-95"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5 mb-1 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Share</span>
                </button>

                <button
                  onClick={onOpenDownload}
                  className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-[#2a2217] hover:bg-amber-500 hover:text-stone-950 text-amber-400 border border-amber-800/60 transition-all text-xs font-semibold group active:scale-95"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mb-1 group-hover:translate-y-0.5 transition-transform" />
                  <span>Download</span>
                </button>
              </div>

              {/* Share Toast */}
              {shareToast && (
                <div className="text-xs text-amber-300 bg-amber-950/80 border border-amber-800/80 px-3 py-2 rounded-lg flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Restaurant link copied to clipboard!</span>
                </div>
              )}

              {/* Verified Location & Phone Information */}
              <div className="pt-2 border-t border-[#2a241c] space-y-3 text-xs sm:text-sm text-stone-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="leading-relaxed text-stone-200">
                      {RESTAURANT_INFO.address}
                    </p>
                    <div className="flex items-center gap-4 mt-1.5 text-xs">
                      <button 
                        onClick={handleCopyAddress} 
                        className="text-amber-400 hover:text-amber-300 underline font-medium"
                      >
                        {copiedAddress ? 'Address Copied!' : 'Copy Address'}
                      </button>
                      <span className="text-stone-600">·</span>
                      <span className="font-mono text-stone-400">{RESTAURANT_INFO.plusCode}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <a 
                      href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                      className="font-medium text-amber-300 hover:underline tracking-wide tabular-nums"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>

                  <button
                    onClick={onOpenClaim}
                    className="text-xs text-stone-400 hover:text-amber-300 underline transition-colors"
                  >
                    Claim this business
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Photo Showcase & Photo Count Trigger (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div 
                onClick={onOpenPhotos}
                className="relative rounded-xl overflow-hidden cursor-pointer group aspect-[4/3] bg-stone-900 border border-[#383126]"
              >
                <img
                  src="/src/assets/images/firdous_restaurant_hero_1793377437164.jpg"
                  alt="Hotel Firdous Dining Hall and Traditional Handi Counter"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-md text-[11px] font-semibold text-amber-300 border border-white/10">
                  Degh & Kitchen Counter
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <div>
                    <p className="font-semibold text-stone-100">See all 498 photos in the app</p>
                    <p className="text-[11px] text-stone-300">Biryani handis, 5 AM paya breakfast & cafe ambiance</p>
                  </div>
                  <span className="p-2 bg-amber-500 text-stone-950 rounded-lg group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* 3 Photo Thumbnails Row */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={onOpenPhotos}
                  className="relative aspect-square rounded-lg overflow-hidden border border-[#332b20] group bg-stone-900"
                >
                  <img
                    src="/src/assets/images/firdous_mutton_biryani_1793377437168.jpg"
                    alt="Mutton Dum Biryani"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <span className="absolute bottom-1 left-1 right-1 text-[10px] font-medium text-white truncate px-1 bg-black/60 rounded">
                    Dum Biryani
                  </span>
                </button>

                <button
                  onClick={onOpenPhotos}
                  className="relative aspect-square rounded-lg overflow-hidden border border-[#332b20] group bg-stone-900"
                >
                  <img
                    src="/src/assets/images/firdous_tala_hua_gosht_1793377437650.jpg"
                    alt="Tala Hua Gosht"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <span className="absolute bottom-1 left-1 right-1 text-[10px] font-medium text-white truncate px-1 bg-black/60 rounded">
                    Tala Hua Gosht
                  </span>
                </button>

                <button
                  onClick={onOpenPhotos}
                  className="relative aspect-square rounded-lg overflow-hidden border border-[#332b20] group bg-stone-900"
                >
                  <img
                    src="/src/assets/images/firdous_paya_soup_breakfast_1793377439332.jpg"
                    alt="Paya Soup Breakfast"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center p-1 group-hover:bg-black/40 transition-colors">
                    <span className="text-xs font-bold text-amber-300">+495</span>
                    <span className="text-[10px] leading-tight">Photos</span>
                  </div>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Highlighted Review Quotes Strip from real user prompt */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#14120e] border border-[#2a241b] rounded-xl p-4 text-xs text-stone-300 flex items-start gap-3">
            <span className="text-amber-400 font-serif text-2xl leading-none">“</span>
            <div>
              <p className="italic text-stone-200">
                "Visiting Hotel Firdous since 2002 and the taste is still as amazing as ever. The tala hua gosht is a must try, crispy and full of authentic taste."
              </p>
              <p className="mt-2 text-[11px] text-amber-500 font-semibold">— Ateeq, Local Guide (25 reviews)</p>
            </div>
          </div>

          <div className="bg-[#14120e] border border-[#2a241b] rounded-xl p-4 text-xs text-stone-300 flex items-start gap-3">
            <span className="text-amber-400 font-serif text-2xl leading-none">“</span>
            <div>
              <p className="italic text-stone-200">
                "When I landed at Kachiguda morning 5 am wanted to eat some breakfast... paya soup here was piping hot with thick collagen & fresh char koni naan."
              </p>
              <p className="mt-2 text-[11px] text-amber-500 font-semibold">— Gopinath J.P, Local Guide (454 photos)</p>
            </div>
          </div>

          <div className="bg-[#14120e] border border-[#2a241b] rounded-xl p-4 text-xs text-stone-300 flex items-start gap-3">
            <span className="text-amber-400 font-serif text-2xl leading-none">“</span>
            <div>
              <p className="italic text-stone-200">
                "The biryani and Khichdhi Khatta are tasty and the prices are reasonable. A nice option around Old Malakpet craving local flavors."
              </p>
              <p className="mt-2 text-[11px] text-amber-500 font-semibold">— Mohd Nadeem (Nady), Local Guide</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
