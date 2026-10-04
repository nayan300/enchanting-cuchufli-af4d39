import React from 'react';
import { Home, UtensilsCrossed, ShoppingBag, Sparkles, MapPin } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  cartCount,
  onOpenCart,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 py-1.5 px-4 shadow-lg lg:hidden">
      <div className="max-w-md mx-auto flex items-center justify-around">
        
        {/* Home Tab */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 transition-colors ${
            activeTab === 'home' ? 'text-amber-600' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        {/* Menu Tab */}
        <button
          onClick={() => onTabChange('menu')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 transition-colors ${
            activeTab === 'menu' ? 'text-amber-600' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <UtensilsCrossed className="w-5 h-5" />
          <span className="text-[10px] font-bold">Menu</span>
        </button>

        {/* Central Floating Order / Cart Button (matching reference image) */}
        <button
          onClick={onOpenCart}
          className="relative -top-4 w-14 h-14 rounded-full bg-linear-to-tr from-amber-600 to-amber-500 text-stone-950 flex flex-col items-center justify-center shadow-lg shadow-amber-500/40 border-4 border-[#FBF8F3] active:scale-95 transition-transform"
          aria-label="Order Cart"
        >
          <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[9px] font-extrabold tracking-tight">Order</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-stone-900 text-white rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>

        {/* Specials / Whiteboard Tab */}
        <button
          onClick={() => onTabChange('specials')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 transition-colors ${
            activeTab === 'specials' ? 'text-amber-600' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold">Specials</span>
        </button>

        {/* Location / Info Tab */}
        <button
          onClick={() => onTabChange('location')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 transition-colors ${
            activeTab === 'location' ? 'text-amber-600' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] font-bold">Location</span>
        </button>

      </div>
    </nav>
  );
};
