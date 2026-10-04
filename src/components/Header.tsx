import React, { useState } from 'react';
import { ShoppingBag, Bell, Phone, MapPin, X, Sparkles, Smartphone, Monitor } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  isMobileFrame,
  onToggleFrame,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FBF8F3]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          
          {/* Left: Mobile/Nav indicator or Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex flex-col text-left group">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900 group-hover:text-amber-600 transition-colors font-display">
                Shekhar's <span className="text-amber-600">Food Club</span>
              </span>
              <span className="text-[11px] font-medium text-stone-500 hidden sm:inline-block">
                Fresh, flavourful food with less oil · Sadiya
              </span>
            </a>
          </div>

          {/* Center info: Location highlight */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-stone-600 bg-amber-50/80 border border-amber-200/60 px-3 py-1.5 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate max-w-xs">{RESTAURANT_INFO.landmark}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-emerald-700">Open 11 AM - 10 PM</span>
          </div>

          {/* Right Action zone */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Toggle (Mobile Mockup vs Full Responsive Web) */}
            <button
              onClick={onToggleFrame}
              title={isMobileFrame ? "Switch to Wide Web View" : "Switch to Mobile App Preview"}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all border border-stone-200 shadow-xs"
            >
              {isMobileFrame ? (
                <>
                  <Monitor className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden md:inline">Desktop View</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-teal-600" />
                  <span className="hidden md:inline">App View</span>
                </>
              )}
            </button>

            {/* Direct Call Button */}
            <a
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-stone-100 hover:bg-amber-50 hover:text-amber-700 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-stone-200"
              title="Call Shekhar's Food Club"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline font-mono">093957 75599</span>
            </a>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200 shadow-xs text-stone-700 transition-all active:scale-95"
                aria-label="View notifications and announcements"
              >
                <Bell className="w-5 h-5 text-stone-700" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  2
                </span>
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <span className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Opening Announcements
                    </span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3 pt-3">
                    <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-1">
                        <span>🔥 Today's Special Combo</span>
                      </div>
                      <p className="text-xs text-stone-700">
                        Crispy French Fries + Blue Lagoon Mocktail for just ₹100! Save ₹10 on opening week.
                      </p>
                    </div>
                    <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-100">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 mb-1">
                        <span>🌿 Less Oil Guarantee</span>
                      </div>
                      <p className="text-xs text-stone-700">
                        All our Biryani, Momos, and wok dishes are cooked with 40% less oil for clean digestion.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 sm:px-3 sm:py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-stone-900 text-white rounded-full text-[11px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </header>
    </>
  );
};
