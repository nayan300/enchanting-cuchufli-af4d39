import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationCard: React.FC = () => {
  return (
    <section id="location-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>Store Location & Visit Details</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
            Find Us in Sadiya
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Conveniently situated right on NH115 opposite the police station.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <Navigation className="w-4 h-4" />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Full Address */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>Address & Landmark</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed font-medium">
            {RESTAURANT_INFO.address}
          </p>
          <div className="pt-1">
            <span className="inline-block text-[11px] font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md">
              Landmark: {RESTAURANT_INFO.landmark}
            </span>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>Kitchen Hours</span>
          </div>
          <p className="text-xs text-stone-700 font-medium">
            {RESTAURANT_INFO.hours}
          </p>
          <p className="text-xs text-stone-500">
            {RESTAURANT_INFO.days}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Open Daily for Dine-in & Takeaway</span>
          </div>
        </div>

        {/* Contact & Owner */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Phone className="w-4 h-4 text-amber-600" />
            <span>Direct Orders & Host</span>
          </div>
          <p className="text-xs text-stone-700">
            Owner: <span className="font-bold text-stone-900">{RESTAURANT_INFO.owner}</span>
          </p>
          <p className="text-xs font-mono font-bold text-stone-900">
            Phone: {RESTAURANT_INFO.phoneFormatted}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <a
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              Call Now
            </a>
            <span className="text-stone-300">·</span>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              WhatsApp
            </a>
          </div>
        </div>

      </div>

      {/* Simulated Map View Card */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-48">
        <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-800 flex items-center justify-center">
          <MapPin className="w-6 h-6 text-amber-600 animate-bounce" />
        </div>
        <div>
          <h4 className="font-bold text-base text-stone-900 font-display">
            Shekhar's Food Club Location Pin
          </h4>
          <p className="text-xs text-stone-500 max-w-md mx-auto mt-0.5">
            NH115, Chariali, Chapakhowa, Lakhimi Pathar, Assam 786157
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 font-medium">
            ✅ Opposite Police Station
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 font-medium">
            🚗 Easy Parking at Chariali
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 font-medium">
            🪑 Dine-in Seating Available
          </span>
        </div>
      </div>

    </section>
  );
};
