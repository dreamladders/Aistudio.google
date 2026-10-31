/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { BreakfastSpecialSpotlight } from './components/BreakfastSpecialSpotlight';
import { MenuSection } from './components/MenuSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationDirections } from './components/LocationDirections';
import { PhotoGalleryModal } from './components/PhotoGalleryModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { WriteReviewModal, ClaimBusinessModal, TableReservationModal } from './components/Modals';
import { DownloadModal } from './components/DownloadModal';
import { Footer } from './components/Footer';
import { MENU_ITEMS, CUSTOMER_REVIEWS, MenuItem, Review } from './data/restaurantData';
import { Phone, Navigation, ShoppingBag, Download } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>(CUSTOMER_REVIEWS);
  const [cartOpen, setCartOpen] = useState(false);
  const [photoGalleryOpen, setPhotoGalleryOpen] = useState(false);
  const [claimBusinessOpen, setClaimBusinessOpen] = useState(false);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (item: MenuItem, portionName?: string, price?: number) => {
    const finalPrice = price || item.price;
    const cartItemId = portionName ? `${item.id}-${portionName}` : item.id;

    setCart(prev => {
      const existing = prev.find(i => i.id === cartItemId);
      if (existing) {
        return prev.map(i => i.id === cartItemId ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        return [...prev, {
          id: cartItemId,
          item,
          portionName,
          price: finalPrice,
          quantity: 1
        }];
      }
    });

    showToast(`Added ${item.name} to order`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddReview = (newReview: Review) => {
    setReviews([newReview, ...reviews]);
    showToast('Thank you! Your review has been published.');
  };

  const handleLikeReview = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, likes: (r.likes || 0) + 1 } : r));
    showToast('Marked as helpful');
  };

  const breakfastItems = MENU_ITEMS.filter(i => i.category === 'breakfast');
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0e0c] text-[#f7f5f0] flex flex-col selection:bg-amber-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenReservation={() => setReservationOpen(true)}
        onOpenDownload={() => setDownloadOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Google Business Profile & Hero */}
        <Hero
          onOpenPhotos={() => setPhotoGalleryOpen(true)}
          onOpenClaim={() => setClaimBusinessOpen(true)}
          onExploreMenu={scrollToMenu}
          onOpenDownload={() => setDownloadOpen(true)}
        />

        {/* Core Pillars: Biryani, Tala Hua Gosht, Irani Chai */}
        <SpecialtiesSection
          items={MENU_ITEMS}
          onAddToCart={handleAddToCart}
        />

        {/* 5 AM Paya & Nihari Breakfast Spotlight (highlighted in user prompt) */}
        <BreakfastSpecialSpotlight
          breakfastItems={breakfastItems}
          onAddToCart={handleAddToCart}
        />

        {/* Full Interactive Menu */}
        <MenuSection
          items={MENU_ITEMS}
          onAddToCart={handleAddToCart}
        />

        {/* Real Customer Reviews & Ratings Dashboard */}
        <ReviewsSection
          reviews={reviews}
          onOpenWriteReview={() => setWriteReviewOpen(true)}
          onLikeReview={handleLikeReview}
        />

        {/* Location, Kachiguda Transit Distance, and Maps Navigation */}
        <LocationDirections />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <PhotoGalleryModal
        isOpen={photoGalleryOpen}
        onClose={() => setPhotoGalleryOpen(false)}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <WriteReviewModal
        isOpen={writeReviewOpen}
        onClose={() => setWriteReviewOpen(false)}
        onSubmitReview={handleAddReview}
      />

      <ClaimBusinessModal
        isOpen={claimBusinessOpen}
        onClose={() => setClaimBusinessOpen(false)}
      />

      <TableReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />

      <DownloadModal
        isOpen={downloadOpen}
        onClose={() => setDownloadOpen(false)}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-amber-500 text-stone-950 rounded-lg text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Bottom Quick Action on Mobile (within 15% sticky cap) */}
      <aside aria-label="Mobile quick actions" className="sm:hidden fixed bottom-3 left-3 right-3 z-30 bg-[#16130f]/95 backdrop-blur-md border border-[#3b3225] rounded-xl p-2 shadow-2xl flex items-center justify-between gap-2 text-xs">
        <a
          href="tel:09391176439"
          className="flex-1 py-2 rounded-lg bg-[#241e17] text-stone-200 font-semibold flex items-center justify-center gap-1.5 border border-stone-800"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>Call Hotel</span>
        </a>

        <button
          onClick={() => {
            const query = encodeURIComponent(`Hotel Firdous Sahifa Masjid Rd Azampura Malakpet Hyderabad`);
            window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
          }}
          className="flex-1 py-2 rounded-lg bg-[#241e17] text-stone-200 font-semibold flex items-center justify-center gap-1.5 border border-stone-800"
        >
          <Navigation className="w-3.5 h-3.5 text-amber-400" />
          <span>Directions</span>
        </button>

        <button
          onClick={() => setCartOpen(true)}
          className="flex-1 py-2 rounded-lg bg-amber-500 text-stone-950 font-bold flex items-center justify-center gap-1.5 shadow"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Cart ({totalCartCount})</span>
        </button>
      </aside>
    </div>
  );
}
