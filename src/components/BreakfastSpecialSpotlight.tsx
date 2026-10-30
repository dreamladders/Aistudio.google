import React from 'react';
import { Sunrise, Clock, Flame, ChevronRight, Plus, Check } from 'lucide-react';
import { MenuItem } from '../data/restaurantData';

interface BreakfastSpecialSpotlightProps {
  onAddToCart: (item: MenuItem, portionName?: string, price?: number) => void;
  breakfastItems: MenuItem[];
}

export const BreakfastSpecialSpotlight: React.FC<BreakfastSpecialSpotlightProps> = ({
  onAddToCart,
  breakfastItems
}) => {
  return (
    <section id="breakfast" className="py-16 bg-[#12100d] border-b border-[#28221b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
              <Sunrise className="w-4 h-4 text-amber-400" />
              <span>Old City Dawn Tradition · 5:00 AM – 10:30 AM Daily</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-100 font-display">
              The Legendary 5 AM Paya & Nihari Breakfast
            </h2>
            <p className="mt-2 text-stone-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              For over two decades, travellers stepping off early morning trains at Kachiguda Railway Station (just 1.2 km away) and Old Malakpet locals head straight to Hotel Firdous for simmering trotters, rich bone marrow stews, and fresh Char Koni Naan.
            </p>
          </div>

          <div className="shrink-0 bg-[#1c1813] border border-amber-800/40 rounded-xl p-4 text-xs text-stone-300 max-w-xs">
            <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
              <Clock className="w-4 h-4" />
              <span>Served Fresh From 5:00 AM</span>
            </div>
            <p className="text-stone-400">
              Slow-cooked in sealed deghs through the night. Highly recommended to arrive before 9:30 AM for hot bone marrow nalli.
            </p>
          </div>
        </div>

        {/* Highlight Card: Paya Soup & Naan Focus */}
        <div className="bg-gradient-to-br from-[#1c1813] to-[#16130f] border border-[#332b21] rounded-2xl overflow-hidden shadow-2xl mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto">
              <img
                src="/src/assets/images/firdous_paya_soup_breakfast_1793377439332.jpg"
                alt="Dawn Hyderabadi Paya Soup with Char Koni Naan"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-stone-950 font-bold text-xs rounded-md shadow-md">
                Kachiguda Dawn Favorite
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-amber-500 font-medium mb-1">
                  <span>Traditional Potli Masala Recipe</span>
                  <span className="text-stone-400">₹180 / Serving</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-stone-100 font-display">
                  Hyderabadi Paya Shorba with Char Koni Naan
                </h3>
                <p className="mt-3 text-sm text-stone-300 leading-relaxed">
                  Tender goat trotters slow-simmered for over 10 hours with 18 hand-ground potli spices. The gelatinous, nutrient-rich broth is infused with caramelized onions, fresh mint, green chillies, and ginger slivers. Accompanied by our authentic triangular Char Koni tandoor naan designed for dipping.
                </p>

                {/* Review callout from prompt */}
                <div className="mt-4 p-3.5 bg-[#252019] rounded-xl border border-stone-800 text-xs text-stone-300">
                  <p className="italic text-stone-300">
                    "When I landed at Kachiguda morning 5 am and metro starts 6am wanted to eat some breakfast hence googled out this hotel... The paya soup here was piping hot with thick collagen and the naan was crisp."
                  </p>
                  <p className="mt-1 text-right text-[11px] text-amber-400 font-semibold">— Gopinath J.P, Local Guide</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800">
                <div className="space-y-0.5">
                  <p className="text-xs text-stone-400">Available Daily</p>
                  <p className="text-sm font-semibold text-amber-300">5:00 AM – 10:30 AM</p>
                </div>

                <button
                  onClick={() => {
                    const payaItem = breakfastItems.find(i => i.id === 'hyderabadi-paya-soup');
                    if (payaItem) onAddToCart(payaItem);
                  }}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs sm:text-sm rounded-lg transition-all flex items-center gap-2 shadow-lg active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Order Morning Paya (₹180)</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Secondary Breakfast Items Grid (Khichdi Khatta Kheema, Nalli Nihari, Marag) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {breakfastItems.filter(i => i.id !== 'hyderabadi-paya-soup').map(item => (
            <div
              key={item.id}
              className="bg-[#181410] border border-[#2e271e] rounded-xl p-5 flex flex-col justify-between hover:border-amber-600/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                    {item.tags[0] || 'Morning Special'}
                  </span>
                  <span className="text-sm font-bold text-stone-200 tabular-nums">
                    ₹{item.price}
                  </span>
                </div>
                
                <h4 className="text-lg font-bold text-stone-100 font-display">
                  {item.name}
                </h4>
                {item.urduName && (
                  <p className="text-xs text-amber-300/70 font-serif mb-2">{item.urduName}</p>
                )}
                
                <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#292219] flex items-center justify-between">
                <span className="text-[11px] text-stone-500">Fresh from Handi</span>
                <button
                  onClick={() => onAddToCart(item)}
                  className="px-3 py-1.5 bg-[#262017] hover:bg-amber-500 hover:text-stone-950 text-stone-200 border border-stone-700 hover:border-amber-500 rounded-md text-xs font-medium transition-all flex items-center gap-1 active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
