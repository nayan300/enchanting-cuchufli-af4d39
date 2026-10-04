import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check, RefreshCw, Edit3 } from 'lucide-react';
import { ComboDeal } from '../data/restaurantData';
import { ComboManagerModal } from './ComboManagerModal';

interface SpecialComboBannerProps {
  currentCombo: ComboDeal;
  onChangeCombo: (newCombo: ComboDeal) => void;
  onAddCombo: (combo: ComboDeal) => void;
}

export const SpecialComboBanner: React.FC<SpecialComboBannerProps> = ({
  currentCombo,
  onChangeCombo,
  onAddCombo,
}) => {
  const [added, setAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    onAddCombo(currentCombo);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-amber-500 via-amber-500 to-amber-600 text-stone-950 p-5 sm:p-7 shadow-lg border border-amber-400">
        
        {/* Background decorative patterns */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-teal-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Information */}
          <div className="space-y-2 text-center md:text-left flex-1 min-w-0">
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950 text-amber-300 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentCombo.badgeText || "TODAY'S EXCLUSIVE COMBO"}</span>
              </div>

              {/* Change Combo Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 hover:bg-white text-stone-900 text-xs font-bold transition-all shadow-2xs cursor-pointer border border-stone-300/80 active:scale-95"
                title="Change or customize today's combo"
              >
                <RefreshCw className="w-3 h-3 text-amber-700" />
                <span>Change Combo</span>
              </button>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-stone-950 leading-tight">
              {currentCombo.title}
            </h3>

            <p className="text-stone-900/85 text-xs sm:text-sm max-w-md font-medium leading-relaxed">
              {currentCombo.description}
            </p>

            <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black font-display text-stone-950">
                  ₹{currentCombo.comboPrice}
                </span>
                {currentCombo.originalPrice > currentCombo.comboPrice && (
                  <span className="text-sm line-through text-stone-700/80 font-bold">
                    ₹{currentCombo.originalPrice}
                  </span>
                )}
              </div>
              {currentCombo.savings > 0 && (
                <span className="bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-extrabold px-2.5 py-1 rounded-lg border border-stone-200">
                  Save ₹{currentCombo.savings}
                </span>
              )}
            </div>
          </div>

          {/* Right Action & Visual */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-md border-2 border-white/60 shrink-0 bg-stone-100">
              <img
                src={currentCombo.image}
                alt={currentCombo.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleAdd}
                className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap ${
                  added
                    ? 'bg-stone-950 text-emerald-400'
                    : 'bg-stone-950 hover:bg-stone-900 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <span>Grab Special ₹{currentCombo.comboPrice}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[11px] font-bold text-stone-900 hover:text-stone-950 underline text-center"
              >
                Switch combo deal
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Modal to Switch/Customize Combos */}
      <ComboManagerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeCombo={currentCombo}
        onSelectCombo={onChangeCombo}
      />
    </>
  );
};
