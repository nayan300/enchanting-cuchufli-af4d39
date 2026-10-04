import React from 'react';
import { Sparkles, MapPin, Phone, MessageSquare, Plus } from 'lucide-react';
import { OPENING_WEEK_WHITEBOARD_DATA, RESTAURANT_INFO, MENU_ITEMS, MenuItem, ComboDeal } from '../data/restaurantData';

interface WhiteboardSpecialsProps {
  onQuickAdd: (item: MenuItem, portion: 'half' | 'full') => void;
  activeCombo?: ComboDeal;
  onAddCombo?: (combo: ComboDeal) => void;
}

export const WhiteboardSpecials: React.FC<WhiteboardSpecialsProps> = ({
  onQuickAdd,
  activeCombo,
  onAddCombo,
}) => {
  const biryani = MENU_ITEMS.find((m) => m.id === 'chicken-biryani')!;
  const momo = MENU_ITEMS.find((m) => m.id === 'chicken-momo')!;
  const defaultCombo = MENU_ITEMS.find((m) => m.id === 'fries-blue-lagoon-combo')!;
  const chillyChicken = MENU_ITEMS.find((m) => m.id === 'chilly-chicken')!;

  return (
    <div className="relative rounded-3xl p-6 sm:p-8 bg-stone-900 text-stone-100 shadow-2xl border-4 border-stone-700/80 overflow-hidden">
      
      {/* Wooden / Aluminum Frame simulation */}
      <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
      
      {/* Top Hanging Bar / Clip effect */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-xs"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500 shadow-xs"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs"></div>
          <span className="text-xs font-mono text-stone-400 pl-2">
            DAILY WHITEBOARD SPECIALS · OPENING WEEK
          </span>
        </div>
        <div className="text-xs font-board text-amber-300 text-lg">
          Fresh Batch Every Morning ✨
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left Handwritten Board Area */}
        <div className="md:col-span-8 space-y-4">
          
          <div className="space-y-1">
            <h3 className="font-board text-3xl sm:text-4xl text-amber-300 tracking-wide font-bold">
              {OPENING_WEEK_WHITEBOARD_DATA.title}
            </h3>
            <p className="font-board text-xl text-stone-300">
              "{OPENING_WEEK_WHITEBOARD_DATA.note}"
            </p>
          </div>

          {/* Chalkboard list items */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-800/80 border border-stone-700 hover:border-amber-500/50 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-board text-2xl text-white font-bold">1. Chicken Dum Biryani</span>
                  <span className="text-[10px] bg-amber-500 text-stone-950 font-bold px-2 py-0.5 rounded-full">
                    Standout Pick
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-mono">Basmati · Less Oil · 11:00 AM onwards</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-amber-300 text-sm font-mono">₹100 (H) / ₹180 (F)</span>
                <button
                  onClick={() => onQuickAdd(biryani, 'half')}
                  className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1 active:scale-95 transition-all"
                  title="Add Half Biryani"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-800/80 border border-stone-700 hover:border-teal-500/50 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-board text-2xl text-white font-bold">
                    2. {activeCombo ? activeCombo.title : "Fries + Blue Lagoon Cooler"}
                  </span>
                  <span className="text-[10px] bg-teal-500 text-stone-950 font-bold px-2 py-0.5 rounded-full">
                    {activeCombo ? activeCombo.badgeText : "Today's Special"}
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-mono">
                  {activeCombo ? activeCombo.subtitle : "Crispy salted fries + chilled citrus cooler"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-teal-300 text-sm font-mono">
                  ₹{activeCombo ? activeCombo.comboPrice : 100} Only
                </span>
                <button
                  onClick={() => {
                    if (activeCombo && onAddCombo) {
                      onAddCombo(activeCombo);
                    } else {
                      onQuickAdd(defaultCombo, 'full');
                    }
                  }}
                  className="p-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-stone-950 font-bold text-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                  title="Add Special Combo"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-800/80 border border-stone-700 hover:border-amber-500/50 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-board text-2xl text-white font-bold">3. Chicken Momo (Steamed / Fried)</span>
                  <span className="text-[10px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full">
                    Customer Fave
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-mono">Served with hot garlic chilli chutney</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-amber-300 text-sm font-mono">₹60 (H) / ₹120 (F)</span>
                <button
                  onClick={() => onQuickAdd(momo, 'half')}
                  className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1 active:scale-95 transition-all"
                  title="Add Half Momo"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-800/80 border border-stone-700 hover:border-amber-500/50 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-board text-2xl text-white font-bold">4. Chilly Chicken (7 pcs)</span>
                  <span className="text-[10px] bg-amber-500 text-stone-950 font-bold px-2 py-0.5 rounded-full">
                    Wok Glazed
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-mono">Spicy & juicy appetizer</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-amber-300 text-sm font-mono">₹150</span>
                <button
                  onClick={() => onQuickAdd(chillyChicken, 'full')}
                  className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1 active:scale-95 transition-all"
                  title="Add Chilly Chicken"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Info Box & Whiteboard Note */}
        <div className="md:col-span-4 bg-stone-800/90 rounded-2xl p-5 border border-stone-700 space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Visiting Sadiya</span>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed">
            Look for our signboard and opening whiteboard opposite the Sadiya Police Station Chariali. Dine in our cozy ambient lighting or pick up takeaway in minutes.
          </p>

          <div className="pt-2 border-t border-stone-700 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Opposite Sadiya Police Station, Chariali</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Direct: 093957 75599</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Shekhar!%20I%20saw%20your%20Opening%20Week%20Whiteboard%20Menu%20and%20would%20like%20to%20order.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct Inquiry</span>
            </a>
          </div>
        </div>

      </div>

      {/* Chalk message footer */}
      <div className="mt-6 pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 font-mono gap-2">
        <span>🕒 Whiteboard Updated Daily for Fresh Preparations</span>
        <span className="font-board text-lg text-amber-200">Owner: Shekhar · Welcome to the Food Club!</span>
      </div>

    </div>
  );
};
