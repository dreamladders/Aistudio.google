import React, { useState } from 'react';
import { X, Star, ShieldCheck, Check, Phone, Users, Calendar, Clock, Utensils } from 'lucide-react';
import { RESTAURANT_INFO, Review } from '../data/restaurantData';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [highlightDish, setHighlightDish] = useState('');
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      alert('Please provide your name and your review feedback.');
      return;
    }

    const newRev: Review = {
      id: `user-rev-${Date.now()}`,
      author: name,
      authorTitle: 'Patron · Verified Review',
      rating,
      date: 'Just now',
      comment,
      avatarBg: 'bg-amber-600',
      likes: 1,
      highlightDish: highlightDish || 'Authentic Hyderabadi Special',
      verified: true
    };

    onSubmitReview(newRev);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#171410] border border-[#2e261e] w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-stone-100 font-display">
          Write a Review for Hotel Firdous
        </h3>
        <p className="text-xs text-stone-400 mt-1">
          Share your experience with the biryani, paya breakfast, or tea snacks
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          {/* Star selector */}
          <div>
            <label className="block text-stone-300 font-medium mb-1.5">Overall Rating:</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-stone-700 fill-stone-800'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 font-bold text-amber-400 text-sm">{rating}.0 / 5.0</span>
            </div>
          </div>

          <div>
            <label className="block text-stone-300 font-medium mb-1">Your Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Asif Khan (Local Guide)"
              className="w-full px-3 py-2 bg-[#1f1a14] border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-stone-300 font-medium mb-1">Recommended Dish / Item</label>
            <input
              type="text"
              value={highlightDish}
              onChange={(e) => setHighlightDish(e.target.value)}
              placeholder="e.g. Tala Hua Gosht, 5 AM Paya Soup, Mutton Dum Biryani"
              className="w-full px-3 py-2 bg-[#1f1a14] border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-stone-300 font-medium mb-1">Your Review *</label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe the flavor, portion size, service, and why you love or recommend Hotel Firdous..."
              className="w-full px-3 py-2 bg-[#1f1a14] border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#231e17] text-stone-400 hover:text-white rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition-colors"
            >
              Post Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ClaimBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimBusinessModal: React.FC<ClaimBusinessModalProps> = ({ isOpen, onClose }) => {
  const [claimSubmitted, setClaimSubmitted] = useState(false);
  const [ownerPhone, setOwnerPhone] = useState(RESTAURANT_INFO.phone);
  const [managerName, setManagerName] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#171410] border border-[#2e261e] w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-amber-400">
          <ShieldCheck className="w-5 h-5" />
          <h3 className="text-lg font-bold text-stone-100 font-display">
            Claim Hotel Firdous
          </h3>
        </div>

        {claimSubmitted ? (
          <div className="py-6 text-center space-y-3 text-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-stone-100 text-sm">Verification Initiated</h4>
            <p className="text-stone-300">
              An OTP and verification request have been routed to the registered phone number <strong>{ownerPhone}</strong>.
            </p>
            <button
              onClick={() => { setClaimSubmitted(false); onClose(); }}
              className="mt-4 px-4 py-2 bg-amber-500 text-stone-950 font-bold rounded-lg text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-xs text-stone-300">
            <p className="leading-relaxed">
              Are you the owner or authorized manager of <strong>Hotel Firdous</strong> (Shop No. 16-7-383/3, Sahifa Masjid Rd, Azampura, Malakpet)?
            </p>

            <div className="bg-[#1f1913] p-3.5 rounded-xl border border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-stone-400">
                <span>Registered Phone:</span>
                <span className="font-mono text-amber-300 font-semibold">{RESTAURANT_INFO.phone}</span>
              </div>
              <div className="flex items-center justify-between text-stone-400">
                <span>Location:</span>
                <span className="text-stone-200">Azampura, Hyderabad</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-stone-300 font-medium">Your Full Name & Designation:</label>
              <input
                type="text"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                placeholder="e.g. Proprietor / Managing Partner"
                className="w-full px-3 py-2 bg-[#1f1a14] border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#231e17] text-stone-400 hover:text-white rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setClaimSubmitted(true)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition-colors"
              >
                Send Verification OTP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({ isOpen, onClose }) => {
  const [bookingType, setBookingType] = useState<'family-dinein' | 'bulk-deg'>('family-dinein');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guestsOrDeg, setGuestsOrDeg] = useState('4');
  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('1:30 PM');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please provide name and phone number.');
      return;
    }
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#171410] border border-[#2e261e] w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-stone-100 font-display">
          Table Seating & Bulk Handi Catering
        </h3>
        <p className="text-xs text-stone-400 mt-1">
          Reserve family cabin seating or pre-order 1kg to 15kg Biryani Degs for functions
        </p>

        {isBooked ? (
          <div className="py-8 text-center space-y-3 text-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-stone-100 text-sm">Request Received!</h4>
            <p className="text-stone-300 max-w-sm mx-auto">
              Thank you {name}. Our head captain at Hotel Firdous will call {phone} to confirm your {bookingType === 'family-dinein' ? 'table reservation' : 'bulk handi order'}.
            </p>
            <button
              onClick={() => { setIsBooked(false); onClose(); }}
              className="mt-4 px-4 py-2 bg-amber-500 text-stone-950 font-bold rounded-lg text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
            {/* Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#201a14] rounded-lg border border-stone-800">
              <button
                type="button"
                onClick={() => setBookingType('family-dinein')}
                className={`py-2 rounded font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                  bookingType === 'family-dinein'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-400'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Family Dining Table</span>
              </button>
              <button
                type="button"
                onClick={() => setBookingType('bulk-deg')}
                className={`py-2 rounded font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                  bookingType === 'bulk-deg'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-400'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Bulk Biryani Deg</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-300 font-medium mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 bg-[#1f1a14] border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Contact Phone *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="093911 76439"
                  className="w-full px-3 py-2 bg-[#1f1a14] border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-stone-300 font-medium mb-1">
                  {bookingType === 'family-dinein' ? 'Guests' : 'Deg Weight'}
                </label>
                <select
                  value={guestsOrDeg}
                  onChange={(e) => setGuestsOrDeg(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1f1a14] border border-stone-700 rounded-lg text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  {bookingType === 'family-dinein' ? (
                    <>
                      <option value="2">2 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="8+">8+ Guests (Family Cabin)</option>
                    </>
                  ) : (
                    <>
                      <option value="1kg">1 kg Handi (4-5 pers)</option>
                      <option value="2kg">2 kg Handi (8-10 pers)</option>
                      <option value="5kg">5 kg Degh (20-25 pers)</option>
                      <option value="10kg">10 kg Royal Degh (50 pers)</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Date</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Today / Tomorrow"
                  className="w-full px-3 py-2 bg-[#1f1a14] border border-stone-700 rounded-lg text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Preferred Time</label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. 5:30 AM / 1:30 PM"
                  className="w-full px-3 py-2 bg-[#1f1a14] border border-stone-700 rounded-lg text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#231e17] text-stone-400 hover:text-white rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition-colors"
              >
                Submit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
