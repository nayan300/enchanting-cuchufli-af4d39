import React from 'react';
import { ArrowRight, Star, Flame, Sparkles, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import biryaniHeroImg from '../assets/images/shekhar_biryani_hero_1791080779217.jpg';

interface HeroBannerProps {
  onOrderNow: () => void;
  onOpenWhiteboard: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOrderNow,
  onOpenWhiteboard,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-stone-900 via-stone-900 to-amber-950 text-white shadow-xl p-5 sm:p-8 border border-stone-800/80">
      
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Text & CTA */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide uppercase">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>Opening Week Debut · Sadiya</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] font-display text-white">
            MORE FLAVOUR. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-amber-200 to-amber-400">
              LESS OIL.
            </span>
          </h1>

          {/* Description */}
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
            Welcome to <span className="text-white font-semibold">{RESTAURANT_INFO.name}</span>. Experience our standout 
            <span className="text-amber-300 font-semibold"> Chicken Dum Biryani</span>, steamed momos, and wok fried rice 
            prepared with authentic slow-cooked spices and minimal oil for pure, wholesome satisfaction.
          </p>

          {/* Trust stats row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 pt-1">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs border border-white/10">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-bold text-white text-sm">4.8</span>
              <span className="text-stone-300">(34 Google Reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-teal-900/40 text-teal-200 px-3 py-1.5 rounded-lg border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Standout Biryani & Healthy Focus</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOrderNow}
              className="px-6 py-3 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold rounded-2xl shadow-lg shadow-amber-900/30 flex items-center gap-2 text-sm sm:text-base transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              <span>Explore Menu & Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenWhiteboard}
              className="px-4 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-2xl border border-white/15 text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-98 flex items-center gap-2 cursor-pointer"
            >
              <span>📋 View Opening Whiteboard</span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Visual Card with Standout Callout */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-sm lg:max-w-none group">
            {/* Visual Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/40 aspect-16/10 sm:aspect-16/11 bg-stone-800">
              <img
                src={biryaniHeroImg}
                alt="Shekhar's Special Chicken Biryani with Less Oil"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Dish tag on image */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                <div>
                  <p className="font-bold text-sm text-amber-200">Signature Chicken Biryani</p>
                  <p className="text-[11px] text-stone-300">₹100 (Half) · ₹180 (Full)</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-[11px] font-black uppercase tracking-wider">
                  Standout Choice
                </span>
              </div>
            </div>

            {/* Floating Review Badge */}
            <div className="absolute -bottom-3 -left-3 bg-white text-stone-900 px-3.5 py-2 rounded-xl shadow-lg border border-stone-200 flex items-center gap-2.5 text-xs animate-in fade-in zoom-in">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                4.8
              </div>
              <div className="leading-tight">
                <p className="font-bold text-stone-900">Assam Top Rated</p>
                <p className="text-[10px] text-stone-500">Opposite Sadiya Police Stn.</p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
