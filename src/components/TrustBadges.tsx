import React from 'react';
import { Bike, ShieldCheck, Tag, HeartHandshake, MapPin } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-2">
      <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
          <Bike className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-xs text-stone-900 leading-tight">₹40 Delivery</p>
          <p className="text-[11px] text-stone-500">Under 1 km · Min ₹299</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-xs text-stone-900 leading-tight">Less Oil Guarantee</p>
          <p className="text-[11px] text-stone-500">40% Less Oil Cooking</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
          <Tag className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-xs text-stone-900 leading-tight">Takeaway & Dine-In</p>
          <p className="text-[11px] text-stone-500">No minimum order</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-xs text-stone-900 leading-tight">Prime Sadiya Spot</p>
          <p className="text-[11px] text-stone-500">Opp. Police Station</p>
        </div>
      </div>
    </div>
  );
};
