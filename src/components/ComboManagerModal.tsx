import React, { useState } from 'react';
import { X, Check, Sparkles, RefreshCw, Plus, Tag, ArrowRight, Wand2 } from 'lucide-react';
import { ComboDeal, PRESET_COMBOS, MENU_ITEMS, MenuItem } from '../data/restaurantData';

interface ComboManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCombo: ComboDeal;
  onSelectCombo: (combo: ComboDeal) => void;
}

export const ComboManagerModal: React.FC<ComboManagerModalProps> = ({
  isOpen,
  onClose,
  activeCombo,
  onSelectCombo,
}) => {
  const [tab, setTab] = useState<'presets' | 'custom'>('presets');

  // Custom combo builder state
  const [selectedItem1Id, setSelectedItem1Id] = useState<string>('chicken-biryani');
  const [selectedItem2Id, setSelectedItem2Id] = useState<string>('blue-lagoon');
  const [customPrice, setCustomPrice] = useState<number>(140);
  const [customBadge, setCustomBadge] = useState<string>("TODAY'S SPECIAL");

  if (!isOpen) return null;

  const item1 = MENU_ITEMS.find((m) => m.id === selectedItem1Id) || MENU_ITEMS[0];
  const item2 = MENU_ITEMS.find((m) => m.id === selectedItem2Id) || MENU_ITEMS[1];

  const item1Price = item1.hasPortions ? (item1.halfPrice ?? item1.fullPrice) : item1.fullPrice;
  const item2Price = item2.hasPortions ? (item2.halfPrice ?? item2.fullPrice) : item2.fullPrice;
  const calculatedOriginalPrice = item1Price + item2Price;
  const calculatedSavings = Math.max(0, calculatedOriginalPrice - customPrice);

  const handleApplyPreset = (combo: ComboDeal) => {
    onSelectCombo(combo);
    onClose();
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const isBothVeg = item1.isVeg && item2.isVeg;
    const customCombo: ComboDeal = {
      id: `custom-combo-${Date.now()}`,
      title: `${item1.name} + ${item2.name}`,
      subtitle: `${item1.hasPortions ? 'Half' : 'Full'} & ${item2.hasPortions ? 'Half' : 'Full'} Pairing`,
      description: `Chef Shekhar's handpicked daily pairing: ${item1.name} served fresh with ${item2.name}. Prepared with less oil!`,
      itemsIncluded: [item1.name, item2.name],
      originalPrice: calculatedOriginalPrice,
      comboPrice: Number(customPrice) || calculatedOriginalPrice - 10,
      savings: calculatedSavings,
      badgeText: customBadge.toUpperCase() || "DAILY SPECIAL",
      image: item1.image,
      isVeg: isBothVeg,
    };
    onSelectCombo(customCombo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 p-5 sm:p-7 z-10 space-y-5 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-1">
              <RefreshCw className="w-3 h-3 text-amber-700 animate-spin-reverse" />
              <span>Live Deal Management</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
              Change Today's Exclusive Combo
            </h3>
            <p className="text-xs text-stone-500">
              Update the featured special deal shown on the homepage anytime.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch: Presets vs Custom Builder */}
        <div className="flex p-1 bg-stone-100 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setTab('presets')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              tab === 'presets'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Curated Specials ({PRESET_COMBOS.length})</span>
          </button>
          <button
            onClick={() => setTab('custom')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              tab === 'custom'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Build Custom Combo</span>
          </button>
        </div>

        {/* Presets List */}
        {tab === 'presets' && (
          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {PRESET_COMBOS.map((combo) => {
              const isActive = activeCombo.id === combo.id;
              return (
                <div
                  key={combo.id}
                  onClick={() => handleApplyPreset(combo)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isActive
                      ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/30'
                      : 'bg-white hover:bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={combo.image}
                      alt={combo.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-200"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-stone-900 text-amber-300">
                          {combo.badgeText}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                          {combo.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        {combo.subtitle}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-black text-sm text-amber-600 font-display">
                          ₹{combo.comboPrice}
                        </span>
                        <span className="text-xs line-through text-stone-400">
                          ₹{combo.originalPrice}
                        </span>
                        <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                          Save ₹{combo.savings}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isActive ? (
                      <span className="px-3 py-1.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs"
                      >
                        Set Active
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Custom Combo Builder */}
        {tab === 'custom' && (
          <form onSubmit={handleApplyCustom} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Dish 1 picker */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  1st Dish / Starter
                </label>
                <select
                  value={selectedItem1Id}
                  onChange={(e) => setSelectedItem1Id(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
                >
                  {MENU_ITEMS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} (₹{item.hasPortions ? item.halfPrice : item.fullPrice})
                    </option>
                  ))}
                </select>
              </div>

              {/* Dish 2 picker */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  2nd Dish / Drink / Side
                </label>
                <select
                  value={selectedItem2Id}
                  onChange={(e) => setSelectedItem2Id(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
                >
                  {MENU_ITEMS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} (₹{item.hasPortions ? item.halfPrice : item.fullPrice})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Promotional Combo Price (₹)
                </label>
                <input
                  type="number"
                  required
                  min={20}
                  max={1000}
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Highlight Badge Label
                </label>
                <input
                  type="text"
                  value={customBadge}
                  onChange={(e) => setCustomBadge(e.target.value)}
                  placeholder="e.g. TODAY'S SPECIAL"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            {/* Calculated Preview Box */}
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs space-y-1">
              <div className="flex justify-between font-bold text-stone-900">
                <span>Combined Regular Value:</span>
                <span>₹{calculatedOriginalPrice}</span>
              </div>
              <div className="flex justify-between font-bold text-amber-700">
                <span>Special Promo Combo Price:</span>
                <span className="text-sm font-black">₹{customPrice}</span>
              </div>
              <div className="flex justify-between text-teal-800 font-semibold pt-1 border-t border-amber-200/60">
                <span>Customer Savings:</span>
                <span>Save ₹{calculatedSavings}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Apply as Today's Combo</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
