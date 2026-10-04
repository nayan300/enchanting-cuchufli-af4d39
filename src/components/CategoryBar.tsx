import React from 'react';
import { CATEGORIES } from '../data/restaurantData';

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-base sm:text-lg font-bold text-stone-900 font-display">
          Browse Categories
        </h2>
        <span className="text-xs text-stone-500 font-medium">
          Freshly made to order
        </span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-1 px-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex flex-col items-center gap-1.5 shrink-0 group transition-all duration-200 outline-none`}
              aria-pressed={isActive}
            >
              {/* Circular Icon Container */}
              <div
                className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20 scale-105'
                    : 'bg-white text-stone-700 border-stone-200/90 hover:border-amber-300 hover:bg-amber-50/40 shadow-xs'
                }`}
              >
                <span className="text-2xl sm:text-3xl select-none transform group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
              </div>

              {/* Label */}
              <span
                className={`text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive ? 'text-amber-700 font-bold' : 'text-stone-600 group-hover:text-stone-900'
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
