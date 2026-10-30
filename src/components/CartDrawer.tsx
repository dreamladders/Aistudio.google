import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, CheckCircle2, Phone, Utensils } from 'lucide-react';
import { MenuItem, RESTAURANT_INFO } from '../data/restaurantData';

export interface CartItem {
  id: string;
  item: MenuItem;
  portionName?: string;
  price: number;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [orderType, setOrderType] = useState<'takeaway' | 'dinein'>('takeaway');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderToken, setOrderToken] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const packagingFee = orderType === 'takeaway' ? 20 : 0;
  const total = subtotal + packagingFee;

  const handlePlaceOrder = (viaWhatsApp = false) => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please enter your name and contact phone number.');
      return;
    }

    const token = `FD-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderToken(token);

    if (viaWhatsApp) {
      // Build clean WhatsApp message
      const itemsText = cart.map(i => `• ${i.item.name} (${i.portionName || 'Standard'}) x${i.quantity} = ₹${i.price * i.quantity}`).join('\n');
      const message = `*HOTEL FIRDOUS ORDER [Token: ${token}]*\n` +
        `Customer: ${customerName}\n` +
        `Phone: ${customerPhone}\n` +
        `Order Type: ${orderType.toUpperCase()}\n\n` +
        `*Items Ordered:*\n${itemsText}\n\n` +
        (specialInstructions ? `*Instructions:* ${specialInstructions}\n\n` : '') +
        `*Total Amount:* ₹${total}\n\n` +
        `Please confirm preparation time. Thank you!`;
      
      const whatsappUrl = `https://wa.me/919391176439?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }

    setOrderConfirmed(true);
  };

  const handleReset = () => {
    onClearCart();
    setOrderConfirmed(false);
    setOrderToken('');
    setCustomerName('');
    setCustomerPhone('');
    setSpecialInstructions('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#16130f] border-l border-[#2e261e] h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#29221b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-stone-100 font-display">
              Your Order Basket
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderConfirmed ? (
          /* Confirmation Receipt View */
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-2xl font-bold text-stone-100 font-display">
              Order Received!
            </h4>

            <div className="bg-[#1f1913] border border-amber-900/40 rounded-xl p-4 w-full text-xs space-y-2">
              <div className="flex items-center justify-between text-stone-400">
                <span>Order Token:</span>
                <span className="font-mono text-base font-bold text-amber-400">{orderToken}</span>
              </div>
              <div className="flex items-center justify-between text-stone-400">
                <span>Service Type:</span>
                <span className="font-semibold text-stone-200 capitalize">{orderType}</span>
              </div>
              <div className="flex items-center justify-between text-stone-400">
                <span>Total Payable:</span>
                <span className="font-bold text-stone-100 text-sm tabular-nums">₹{total}</span>
              </div>
              <div className="flex items-center justify-between text-stone-400">
                <span>Customer:</span>
                <span className="font-medium text-stone-200">{customerName} ({customerPhone})</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Your order is registered with the kitchen at Hotel Firdous (Sahifa Masjid Rd, Azampura). You can also call us directly at <span className="text-amber-400 font-semibold">{RESTAURANT_INFO.phone}</span> quoting your token.
            </p>

            <button
              onClick={handleReset}
              className="w-full py-2.5 bg-amber-500 text-stone-950 font-bold rounded-lg text-xs hover:bg-amber-400 transition-colors"
            >
              Done & Start Fresh
            </button>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Basket */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3">
            <ShoppingBag className="w-12 h-12 text-stone-600" />
            <p className="text-base font-semibold text-stone-300">Your basket is empty</p>
            <p className="text-xs text-stone-500 max-w-xs">
              Explore our world-famous Mutton Dum Biryani, Tala Hua Gosht, or 5 AM Paya Breakfast and add them here!
            </p>
            <button
              onClick={onClose}
              className="mt-3 px-4 py-2 bg-[#251f18] text-amber-400 border border-stone-800 rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          /* Cart Items List & Checkout Form */
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {/* Order Mode Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#1a1611] rounded-lg border border-stone-800 text-xs">
                <button
                  onClick={() => setOrderType('takeaway')}
                  className={`py-2 rounded-md font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                    orderType === 'takeaway'
                      ? 'bg-amber-500 text-stone-950 shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Takeaway Pickup</span>
                </button>
                <button
                  onClick={() => setOrderType('dinein')}
                  className={`py-2 rounded-md font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                    orderType === 'dinein'
                      ? 'bg-amber-500 text-stone-950 shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Dine-In Table</span>
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#1c1813] border border-[#2b241c] rounded-lg flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-stone-200 truncate">{item.item.name}</h4>
                      {item.portionName && (
                        <span className="text-[11px] text-amber-400">{item.portionName}</span>
                      )}
                      <p className="text-stone-400 text-[11px] tabular-nums">
                        ₹{item.price} each
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-[#282119] rounded border border-stone-800 px-1 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 text-stone-400 hover:text-stone-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-stone-200 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 text-stone-400 hover:text-stone-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-stone-200 w-12 text-right tabular-nums">
                        ₹{item.price * item.quantity}
                      </span>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-stone-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Info Form */}
              <div className="space-y-3 pt-3 border-t border-[#29221b] text-xs">
                <p className="font-semibold text-stone-200">Customer Details:</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name *"
                    className="w-full px-3 py-2 bg-[#1b1712] border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 text-xs"
                  />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Phone Number *"
                    className="w-full px-3 py-2 bg-[#1b1712] border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Special instructions (e.g. extra spicy, extra gravy)..."
                  className="w-full px-3 py-2 bg-[#1b1712] border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

            </div>

            {/* Subtotal & Actions Footer */}
            <div className="p-6 border-t border-[#29221b] bg-[#14110e] space-y-3 text-xs">
              <div className="space-y-1.5 text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-200 font-mono">₹{subtotal}</span>
                </div>
                {orderType === 'takeaway' && (
                  <div className="flex justify-between">
                    <span>Handi / Foil Packaging</span>
                    <span className="text-stone-200 font-mono">₹{packagingFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-stone-100 pt-1.5 border-t border-stone-800">
                  <span>Total Amount</span>
                  <span className="text-amber-400 font-mono">₹{total}</span>
                </div>
              </div>

              {/* Order Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handlePlaceOrder(true)}
                  className="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 text-xs shadow active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Order via WhatsApp</span>
                </button>

                <button
                  onClick={() => handlePlaceOrder(false)}
                  className="py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 text-xs shadow active:scale-95"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Generate Token</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-stone-500">
                Direct pickup counter at Sahifa Masjid Rd, Azampura · Pay upon pickup or delivery
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
