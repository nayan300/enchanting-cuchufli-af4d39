import React from 'react';
import { Camera, MapPin, Sparkles, CheckCircle, Bike, ShieldCheck, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const RestaurantTour: React.FC = () => {
  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5 text-amber-600" />
            <span>Real Restaurant Gallery & Ambience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
            A Glimpse of Shekhar's Food Club
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-xl">
            Experience our welcoming warm interior lighting, comfortable dine-in hall, and freshly plated dishes right on NH115 opposite the Sadiya Police Station.
          </p>
        </div>

        {/* Delivery Terms Tag */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 font-bold flex items-center gap-1.5">
            <Bike className="w-3.5 h-3.5 text-teal-600" />
            <span>₹40 Delivery (Under 1 km)</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold">
            <span>Min. Online Order: ₹299</span>
          </div>
        </div>
      </div>

      {/* 3 Real Photos Grid (Storefront, Dining Hall, Authentic Plated Biryani) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
        
        {/* Photo 1: Storefront Night */}
        <div className="group rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col">
          <div className="relative aspect-4/3 overflow-hidden bg-stone-900">
            <img
              src={RESTAURANT_INFO.storefrontNightImage}
              alt="Shekhar's Food Club Night Exterior with Glowing Signboard"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2.5 left-2.5 bg-stone-950/80 backdrop-blur-xs text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-stone-700">
              Night Storefront
            </div>
          </div>
          <div className="p-4 space-y-1 bg-white flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-stone-900 font-display">
                Illuminated 3D Neon Signboard
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed mt-1">
                Glowing warm sign with chef hat emblem and direct order phone (093957 75599) on NH115 Chariali.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-amber-700 flex items-center gap-1 pt-2">
              <MapPin className="w-3 h-3" /> Opp. Sadiya Police Station
            </span>
          </div>
        </div>

        {/* Photo 2: Dining Hall Interior */}
        <div className="group rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col">
          <div className="relative aspect-4/3 overflow-hidden bg-stone-900">
            <img
              src={RESTAURANT_INFO.interiorDiningImage}
              alt="Shekhar's Food Club Cozy Interior Dining Hall"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2.5 left-2.5 bg-stone-950/80 backdrop-blur-xs text-teal-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-stone-700">
              Dine-In Hall
            </div>
          </div>
          <div className="p-4 space-y-1 bg-white flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-stone-900 font-display">
                Warm Modern Ambience
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed mt-1">
                Slatted wooden ceiling with ambient cove lighting, white drop lamps, clean AC dining tables with checked placemats.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-teal-700 flex items-center gap-1 pt-2">
              <Clock className="w-3 h-3" /> Open 11:00 AM - 10:00 PM Daily
            </span>
          </div>
        </div>

        {/* Photo 3: Authentic Chicken Biryani Serve */}
        <div className="group rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col">
          <div className="relative aspect-4/3 overflow-hidden bg-stone-900">
            <img
              src={RESTAURANT_INFO.realBiryaniImage}
              alt="Authentic Plated Chicken Biryani with Egg and Salan at Shekhar's Food Club"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2.5 left-2.5 bg-stone-950/80 backdrop-blur-xs text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-stone-700">
              Fresh Kitchen Plating
            </div>
          </div>
          <div className="p-4 space-y-1 bg-white flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-stone-900 font-display">
                Signature Biryani & Side Salan
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed mt-1">
                Aromatic basmati cooked with 40% less oil, served with whole boiled egg and savory gravy bowl on our signature checked mats.
              </p>
            </div>
            <span className="text-[11px] font-bold text-stone-900 flex items-center gap-1 pt-2">
              <Sparkles className="w-3 h-3 text-amber-500" /> ₹100 (Half) / ₹180 (Full)
            </span>
          </div>
        </div>

      </div>

      {/* Delivery & Ordering Policy Banner */}
      <div className="p-4 rounded-2xl bg-linear-to-r from-amber-50 via-teal-50/50 to-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
            <Bike className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="font-extrabold text-stone-900 text-sm">
              Online Delivery Policy: ₹40 Under 1 Kilometer
            </p>
            <p className="text-stone-600 text-[11px]">
              Minimum food order for home delivery is <strong className="text-stone-900">₹299</strong>. 
              Takeaway pickup and Dine-in have <strong className="text-emerald-700">no minimum order limit</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-stone-500 font-semibold">Ready in 15–20 mins</span>
        </div>
      </div>

    </section>
  );
};
