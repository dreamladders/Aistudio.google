import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Plus, Check, ShieldCheck, Filter } from 'lucide-react';
import { CUSTOMER_REVIEWS, RESTAURANT_INFO, Review } from '../data/restaurantData';

interface ReviewsSectionProps {
  onOpenWriteReview: () => void;
  reviews: Review[];
  onLikeReview: (id: string) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  onOpenWriteReview,
  reviews,
  onLikeReview
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'paya' | 'biryani' | 'tala-hua'>('all');

  // Star breakdown calculation (based on 5038 reviews and 4.0 average)
  const ratingDistribution = [
    { stars: 5, percentage: 54, count: 2720 },
    { stars: 4, percentage: 22, count: 1108 },
    { stars: 3, percentage: 12, count: 604 },
    { stars: 2, percentage: 7, count: 352 },
    { stars: 1, percentage: 5, count: 254 },
  ];

  const filteredReviews = reviews.filter(rev => {
    if (activeFilter === 'paya') return rev.comment.toLowerCase().includes('paya') || rev.highlightDish?.toLowerCase().includes('paya');
    if (activeFilter === 'biryani') return rev.comment.toLowerCase().includes('biryani') || rev.highlightDish?.toLowerCase().includes('biryani');
    if (activeFilter === 'tala-hua') return rev.comment.toLowerCase().includes('tala hua') || rev.highlightDish?.toLowerCase().includes('tala');
    return true;
  });

  return (
    <section id="reviews" className="py-16 bg-[#0f0e0c] border-b border-[#241f18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
              <span>Verified Patron Experiences</span>
              <span>·</span>
              <span>Azampura & Kachiguda Food Community</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-100 font-display">
              Review Summary
            </h2>
            <p className="mt-2 text-stone-400 max-w-xl text-sm">
              Rated 4.0 out of 5 stars by over 5,038 verified Google Local Guides and Hyderabad food lovers.
            </p>
          </div>

          <button
            onClick={onOpenWriteReview}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm rounded-lg transition-all flex items-center gap-2 shadow active:scale-95 self-start md:self-auto"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Write a review</span>
          </button>
        </div>

        {/* Rating Breakdown Dashboard Card */}
        <div className="bg-[#171410] border border-[#2b241c] rounded-2xl p-6 sm:p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Score Big Display */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left justify-center border-b lg:border-b-0 lg:border-r border-[#2d261e] pb-6 lg:pb-0 lg:pr-8">
              <span className="text-5xl sm:text-6xl font-bold text-stone-100 tracking-tight font-display">
                {RESTAURANT_INFO.rating.toFixed(1)}
              </span>
              <div className="flex items-center gap-1 my-2 text-amber-400">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <Star className="w-5 h-5 text-stone-600 fill-stone-600" />
              </div>
              <p className="text-sm font-medium text-stone-300 tabular-nums">
                {RESTAURANT_INFO.reviewCount.toLocaleString()} reviews in the app
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Authentic reviews from Google Local Guides
              </p>
            </div>

            {/* Star Distribution Progress Bars */}
            <div className="lg:col-span-4 space-y-2.5">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-3 text-stone-400 font-semibold tabular-nums">{item.stars}</span>
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-current shrink-0" />
                  <div className="flex-1 h-2 bg-[#252018] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-stone-400 tabular-nums font-mono text-[11px]">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>

            {/* Customer Sentiments Callout Box */}
            <div className="lg:col-span-4 bg-[#1e1913] border border-[#332b20] rounded-xl p-4 text-xs space-y-2.5">
              <p className="font-semibold text-amber-400">Frequently Mentioned by Diners:</p>
              
              <div className="space-y-2 text-stone-300">
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <p className="italic">"Nice place to eat with family and friends Food quality is awesome"</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <p className="italic">"The staff are generally polite and the service is satisfactory."</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <p className="italic">"Tasty Tea Snack & spicy Chinese & Hyderabadi Biryani"</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Filter Reviews Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 text-xs">
          <span className="text-stone-400 font-medium mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter by:
          </span>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeFilter === 'all'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-[#181410] text-stone-400 hover:text-stone-200 border border-[#2b241c]'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setActiveFilter('biryani')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeFilter === 'biryani'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-[#181410] text-stone-400 hover:text-stone-200 border border-[#2b241c]'
            }`}
          >
            Biryani Experiences
          </button>
          <button
            onClick={() => setActiveFilter('paya')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeFilter === 'paya'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-[#181410] text-stone-400 hover:text-stone-200 border border-[#2b241c]'
            }`}
          >
            5 AM Paya & Breakfast
          </button>
          <button
            onClick={() => setActiveFilter('tala-hua')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeFilter === 'tala-hua'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-[#181410] text-stone-400 hover:text-stone-200 border border-[#2b241c]'
            }`}
          >
            Tala Hua Gosht
          </button>
        </div>

        {/* Customer Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map(rev => (
            <div
              key={rev.id}
              className="bg-[#171410] border border-[#2b241d] rounded-xl p-5 flex flex-col justify-between hover:border-amber-600/40 transition-colors"
            >
              <div>
                {/* Author row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${rev.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow`}>
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-stone-100 text-sm">{rev.author}</span>
                        {rev.verified && (
                          <span title="Verified Local Guide">
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-400 block">{rev.authorTitle}</span>
                    </div>
                  </div>

                  <span className="text-[11px] text-stone-500 shrink-0">{rev.date}</span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  {[...Array(5 - rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-stone-700 fill-stone-700" />
                  ))}
                </div>

                {/* Highlight Dish */}
                {rev.highlightDish && (
                  <div className="text-[11px] text-amber-400/90 font-medium mb-2 flex items-center gap-1">
                    <span>Recommends:</span>
                    <span className="text-stone-200 font-semibold">{rev.highlightDish}</span>
                  </div>
                )}

                {/* Comment Text */}
                <p className="text-xs text-stone-300 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              {/* Card Footer: Likes & Photos */}
              <div className="mt-5 pt-3 border-t border-[#251f18] flex items-center justify-between text-xs text-stone-400">
                <button
                  onClick={() => onLikeReview(rev.id)}
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="tabular-nums">{rev.likes || 0} Helpful</span>
                </button>

                {rev.photosCount && (
                  <span className="text-stone-500 text-[11px]">
                    +{rev.photosCount} photos shared
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
