import React, { useState, useMemo } from 'react';
import { Search, Flame, Plus, Check, Filter } from 'lucide-react';
import { MenuItem } from '../data/restaurantData';

interface MenuSectionProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem, portionName?: string, price?: number) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ items, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpice, setSelectedSpice] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'biryani', label: 'Dum Biryani Handis' },
    { id: 'starters', label: 'Tala Hua & Starters' },
    { id: 'breakfast', label: '5 AM Breakfast' },
    { id: 'curries', label: 'Curries & Breads' },
    { id: 'chai', label: 'Irani Chai & Snacks' },
    { id: 'desserts', label: 'Royal Desserts' },
  ];

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.urduName && item.urduName.includes(searchQuery));
      const matchesSpice = selectedSpice === 'all' || item.spiceLevel === selectedSpice;
      return matchesCategory && matchesSearch && matchesSpice;
    });
  }, [items, activeCategory, searchQuery, selectedSpice]);

  return (
    <section id="menu" className="py-16 bg-[#12100d] border-b border-[#29221b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
              <span>Fresh Handi Preparation Daily</span>
              <span>·</span>
              <span>Dine-In, Takeaway & Catering</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-100 font-display">
              Hotel Firdous Full Menu
            </h2>
            <p className="mt-2 text-sm text-stone-400 max-w-xl">
              Authentic Nizami & street recipes prepared fresh in handis using pure spices and traditional Dum cooking.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search biryani, paya, tala hua..."
              className="w-full pl-9 pr-4 py-2.5 bg-[#1a1612] border border-[#332b21] rounded-lg text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Functional Category Filter Segmented Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all active:scale-95 ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'bg-[#1a1612] hover:bg-[#252019] text-stone-300 border border-[#2e261d]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Spice Filter Row */}
        <div className="flex items-center gap-3 text-xs text-stone-400 mb-6">
          <span className="flex items-center gap-1 font-medium text-stone-300">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Spice Level:</span>
          </span>
          {['all', 'Mild', 'Medium', 'Spicy', 'Fiery'].map(spice => (
            <button
              key={spice}
              onClick={() => setSelectedSpice(spice)}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                selectedSpice === spice
                  ? 'bg-amber-950 text-amber-300 border border-amber-800 font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {spice === 'all' ? 'All' : spice}
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#16130f] rounded-xl border border-stone-800">
            <p className="text-stone-400 text-sm">No dishes match your filter.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); setSelectedSpice('all'); }}
              className="mt-3 text-xs text-amber-400 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="bg-[#171410] border border-[#2c261e] rounded-xl overflow-hidden flex flex-col justify-between hover:border-amber-600/40 transition-all group"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Top tags */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      {item.isBestseller ? (
                        <span className="px-2 py-0.5 bg-amber-500 text-stone-950 text-[10px] font-bold rounded">
                          Bestseller
                        </span>
                      ) : <span />}

                      {item.spiceLevel && (
                        <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm text-amber-300 text-[10px] font-medium rounded border border-white/10">
                          {item.spiceLevel}
                        </span>
                      )}
                    </div>

                    {/* Bottom Price */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                      <span className="text-[11px] text-stone-300 font-medium">
                        {item.tags[0]}
                      </span>
                      <span className="text-base font-bold text-amber-400 tabular-nums">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className="text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors font-display">
                      {item.name}
                    </h3>
                    {item.urduName && (
                      <p className="text-xs text-amber-400/80 font-serif mb-1.5">{item.urduName}</p>
                    )}
                    <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Actions / Portions */}
                <div className="p-4 pt-0">
                  {item.portions && item.portions.length > 0 ? (
                    <div className="space-y-2 pt-3 border-t border-[#262018]">
                      <span className="text-[11px] text-stone-400 block font-medium">Select size:</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {item.portions.slice(0, 2).map(p => (
                          <button
                            key={p.name}
                            onClick={() => onAddToCart(item, p.name, p.price)}
                            className="px-2 py-1.5 bg-[#211c15] hover:bg-amber-500 hover:text-stone-950 border border-stone-800 hover:border-amber-500 rounded text-[11px] font-medium text-stone-300 transition-all flex items-center justify-between active:scale-95"
                          >
                            <span className="truncate mr-1">{p.name.split('(')[0]}</span>
                            <span className="font-bold text-amber-400 hover:text-inherit tabular-nums">₹{p.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="pt-3 border-t border-[#262018] flex items-center justify-between">
                      <span className="text-[11px] text-stone-500">Standard portion</span>
                      <button
                        onClick={() => onAddToCart(item)}
                        className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-md text-xs transition-all flex items-center gap-1 active:scale-95 shadow"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add ₹{item.price}</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
