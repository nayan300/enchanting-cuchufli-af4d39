import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, Check, Leaf } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  dietaryFilter: 'all' | 'veg' | 'non-veg';
  onDietaryFilterChange: (filter: 'all' | 'veg' | 'non-veg') => void;
  lessOilOnly: boolean;
  onToggleLessOil: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  dietaryFilter,
  onDietaryFilterChange,
  lessOilOnly,
  onToggleLessOil,
}) => {
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const activeFiltersCount = (dietaryFilter !== 'all' ? 1 : 0) + (lessOilOnly ? 1 : 0);

  return (
    <div className="relative space-y-2">
      <div className="flex items-center gap-2">
        {/* Search input container */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Chicken Biryani, Momo, Fried Rice, Blue Lagoon..."
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-stone-200 rounded-2xl text-sm text-stone-800 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Trigger button */}
        <button
          onClick={() => setShowFiltersModal(!showFiltersModal)}
          className={`relative p-2.5 rounded-2xl border transition-all flex items-center justify-center ${
            activeFiltersCount > 0 || showFiltersModal
              ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-sm'
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50 shadow-xs'
          }`}
          title="Filter Menu"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-stone-900 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter Chips Bar (Quick toggles) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
        <button
          onClick={() => onDietaryFilterChange('all')}
          className={`px-3 py-1 rounded-full font-medium transition-colors ${
            dietaryFilter === 'all'
              ? 'bg-stone-900 text-white'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          All
        </button>
        <button
          onClick={() => onDietaryFilterChange(dietaryFilter === 'veg' ? 'all' : 'veg')}
          className={`px-3 py-1 rounded-full font-medium flex items-center gap-1.5 transition-colors ${
            dietaryFilter === 'veg'
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Veg Only</span>
        </button>
        <button
          onClick={() => onDietaryFilterChange(dietaryFilter === 'non-veg' ? 'all' : 'non-veg')}
          className={`px-3 py-1 rounded-full font-medium flex items-center gap-1.5 transition-colors ${
            dietaryFilter === 'non-veg'
              ? 'bg-red-600 text-white'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          <span>Non-Veg</span>
        </button>
        <button
          onClick={onToggleLessOil}
          className={`px-3 py-1 rounded-full font-medium flex items-center gap-1.5 transition-colors ${
            lessOilOnly
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-teal-50 text-teal-800 border border-teal-200/80 hover:bg-teal-100/60'
          }`}
        >
          <Leaf className="w-3 h-3 text-teal-600" />
          <span>Less Oil Highlights</span>
        </button>
      </div>

      {/* Expanded Filter Panel */}
      {showFiltersModal && (
        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-lg space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Filter Menu Dishes</span>
            <button
              onClick={() => {
                onDietaryFilterChange('all');
                if (lessOilOnly) onToggleLessOil();
                setShowFiltersModal(false);
              }}
              className="text-xs text-amber-700 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <label
              onClick={() => onDietaryFilterChange('veg')}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                dietaryFilter === 'veg' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-stone-50 border-stone-200'
              }`}
            >
              <span className="font-semibold">🌱 Pure Vegetarian</span>
              {dietaryFilter === 'veg' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </label>
            <label
              onClick={() => onDietaryFilterChange('non-veg')}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                dietaryFilter === 'non-veg' ? 'bg-red-50 border-red-300 text-red-800' : 'bg-stone-50 border-stone-200'
              }`}
            >
              <span className="font-semibold">🍗 Chicken & Egg</span>
              {dietaryFilter === 'non-veg' && <Check className="w-3.5 h-3.5 text-red-600" />}
            </label>
            <label
              onClick={onToggleLessOil}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors col-span-2 ${
                lessOilOnly ? 'bg-teal-50 border-teal-300 text-teal-800' : 'bg-stone-50 border-stone-200'
              }`}
            >
              <div>
                <span className="font-semibold block">🌿 Standout Less-Oil Creations</span>
                <span className="text-[11px] text-stone-500">Highlighting dishes made with 40% less oil</span>
              </div>
              {lessOilOnly && <Check className="w-3.5 h-3.5 text-teal-600" />}
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
