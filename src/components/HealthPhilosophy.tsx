import React from 'react';
import { Droplet, HeartPulse, Sparkles, Utensils, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const HealthPhilosophy: React.FC = () => {
  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
          <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
          <span>Our Distinctive Culinary Philosophy</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
          Fresh, Flavourful Food with <span className="text-teal-700">Less Oil</span>
        </h2>
        <p className="text-stone-600 text-sm mt-1 leading-relaxed">
          At {RESTAURANT_INFO.name}, we believe restaurant indulgence shouldn't leave you feeling sluggish or weighed down. 
          By carefully controlling our oil measurements and using slow-cooked spices, we unlock rich natural juices and pure aroma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold">
            <Droplet className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm font-display">40% Less Oil Measured</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every batch of biryani and wok stir-fry is cooked with measured, high-quality refined oil so you never experience oily residue.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-800 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-teal-700" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm font-display">Dum Steam Sealed Spices</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Slow sealing lets whole cardamoms, cinnamon, and bay leaves infuse into the rice grains naturally through aromatic vapor.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-stone-200 text-stone-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5 text-stone-700" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm font-display">Fresh Prep Daily</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            From our handmade momo skins to fresh chicken cuts and garden produce, everything is sliced and prepared each morning.
          </p>
        </div>
      </div>
    </section>
  );
};
