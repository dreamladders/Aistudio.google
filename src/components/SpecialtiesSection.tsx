import React from 'react';
import { Sparkles, Plus, Flame, Award, Heart } from 'lucide-react';
import { MenuItem } from '../data/restaurantData';

interface SpecialtiesSectionProps {
  onAddToCart: (item: MenuItem, portionName?: string, price?: number) => void;
  items: MenuItem[];
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({ onAddToCart, items }) => {
  // Grab key bestsellers
  const biryani = items.find(i => i.id === 'mutton-dum-biryani');
  const talaHua = items.find(i => i.id === 'tala-hua-gosht');
  const iraniChai = items.find(i => i.id === 'irani-dum-chai');

  return (
    <section id="specialties" className="py-16 bg-[#0f0e0c] border-b border-[#241f18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Firdous Pillars of Flavor Since 2002</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-100 font-display">
            The Signatures That Made Firdous Famous
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 leading-relaxed">
            From the handi steam of authentic dum biryani to the sizzling dark crunch of Tala Hua Gosht and our creamy Irani chai counter.
          </p>
        </div>

        {/* 2-Column Split: Dum Biryani & Tala Hua Gosht */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Mutton Dum Biryani Spotlight */}
          {biryani && (
            <div className="bg-[#16130f] border border-[#2f281f] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-amber-600/50 transition-all">
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                <img
                  src={biryani.image}
                  alt={biryani.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-stone-950 text-xs font-bold rounded shadow">
                  House Bestseller #1
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-amber-300 font-medium">Authentic Handi Dum</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                      {biryani.name}
                    </h3>
                  </div>
                  <span className="text-lg font-bold text-amber-400 tabular-nums">
                    ₹{biryani.price}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm text-stone-300 leading-relaxed">
                  {biryani.description}
                </p>

                {/* Portion Options Quick Add */}
                <div className="pt-2 border-t border-stone-800">
                  <p className="text-xs text-stone-400 mb-2 font-medium">Select Portion Size:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {biryani.portions?.map(p => (
                      <button
                        key={p.name}
                        onClick={() => onAddToCart(biryani, p.name, p.price)}
                        className="px-2.5 py-2 bg-[#211b14] hover:bg-amber-500 hover:text-stone-950 border border-stone-800 hover:border-amber-500 rounded-lg text-xs font-medium text-stone-300 transition-all flex flex-col items-center justify-center text-center active:scale-95"
                      >
                        <span className="text-[11px] truncate w-full">{p.name.split('(')[0]}</span>
                        <span className="font-bold text-amber-400 hover:text-inherit tabular-nums">₹{p.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tala Hua Gosht Spotlight */}
          {talaHua && (
            <div className="bg-[#16130f] border border-[#2f281f] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-amber-600/50 transition-all">
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                <img
                  src={talaHua.image}
                  alt={talaHua.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-rose-600 text-white text-xs font-bold rounded shadow">
                  Ateeq's "Must Try" Legend
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-amber-300 font-medium">Crispy Fried Mutton</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                      {talaHua.name}
                    </h3>
                  </div>
                  <span className="text-lg font-bold text-amber-400 tabular-nums">
                    ₹{talaHua.price}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm text-stone-300 leading-relaxed">
                  {talaHua.description}
                </p>

                {/* Portion Options Quick Add */}
                <div className="pt-2 border-t border-stone-800">
                  <p className="text-xs text-stone-400 mb-2 font-medium">Select Portion Size:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {talaHua.portions?.map(p => (
                      <button
                        key={p.name}
                        onClick={() => onAddToCart(talaHua, p.name, p.price)}
                        className="px-2.5 py-2 bg-[#211b14] hover:bg-amber-500 hover:text-stone-950 border border-stone-800 hover:border-amber-500 rounded-lg text-xs font-medium text-stone-300 transition-all flex flex-col items-center justify-center text-center active:scale-95"
                      >
                        <span className="text-[11px] truncate w-full">{p.name}</span>
                        <span className="font-bold text-amber-400 hover:text-inherit tabular-nums">₹{p.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Irani Chai Banner Strip */}
        {iraniChai && (
          <div className="bg-[#17130f] border border-[#2f271d] rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-amber-900/40">
                <img
                  src={iraniChai.image}
                  alt="Irani Chai at Firdous"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-amber-500 font-semibold mb-1">
                  <span>Chai Counter Active All Day</span>
                  <span>·</span>
                  <span>From ₹35</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-stone-100 font-display">
                  Dum Irani Chai & Osmania Biscuits
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-stone-400 max-w-xl">
                  Thick slow-steamed buffalo milk combined with rich spiced decoction. Paired with crisp Osmania biscuits or hot meat Lukhmi for the perfect Old City evening break.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onAddToCart(iraniChai)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs sm:text-sm rounded-lg transition-all flex items-center gap-2 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Order Irani Chai (₹35)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
