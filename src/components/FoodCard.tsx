import React, { useState } from 'react';
import { Heart, Star, Plus, Minus, Check, Sparkles, Share2, Copy, MessageSquare, X } from 'lucide-react';
import { MenuItem, RESTAURANT_INFO } from '../data/restaurantData';

interface FoodCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, portion: 'half' | 'full') => void;
  cartQuantity: number;
  onUpdateQuantity?: (portion: 'half' | 'full', delta: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  onAddToCart,
  cartQuantity,
  onUpdateQuantity,
  isFavorite,
  onToggleFavorite,
}) => {
  const [selectedPortion, setSelectedPortion] = useState<'half' | 'full'>(
    item.hasPortions ? 'half' : 'full'
  );
  const [justAdded, setJustAdded] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const currentPrice = item.hasPortions
    ? selectedPortion === 'half'
      ? (item.halfPrice ?? item.fullPrice)
      : item.fullPrice
    : item.fullPrice;

  const handleAdd = () => {
    onAddToCart(item, selectedPortion);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  };

  const getShareText = () => {
    const priceText = item.hasPortions
      ? `₹${item.halfPrice} (Half) / ₹${item.fullPrice} (Full)`
      : `₹${item.fullPrice}`;
    return `Check out *${item.name}* (${priceText}) at ${RESTAURANT_INFO.name}, Sadiya! 🍽️\n\nFresh, flavourful food cooked with 40% less oil.\n📍 Location: Opposite Sadiya Police Station, Chariali.\n📞 Order / WhatsApp: 093957 75599`;
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(getShareText() + `\n\n` + window.location.href);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setShowShareModal(false);
  };

  const handleCopyShareLink = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#${item.id}`;
    const textToCopy = `${getShareText()}\n\n${shareUrl}`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
      }
      setCopiedLink(true);
      setTimeout(() => {
        setCopiedLink(false);
        setShowShareModal(false);
      }, 1500);
    } catch {
      // Fallback
      setCopiedLink(true);
      setTimeout(() => {
        setCopiedLink(false);
        setShowShareModal(false);
      }, 1500);
    }
  };

  const handleTriggerShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${item.name} - Shekhar's Food Club`,
          text: getShareText(),
          url: window.location.href,
        });
        return;
      } catch (err) {
        // Fallback to custom popup if user cancelled or error
      }
    }
    setShowShareModal(true);
  };

  return (
    <div className="bg-white rounded-3xl p-3.5 sm:p-4 border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative">
      <div>
        {/* Top Image Box with Badges & Actions */}
        <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 mb-3 border border-stone-100">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Fallback styling overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Top Left Badge */}
          {item.badge && (
            <div className="absolute top-2.5 left-2.5">
              <span
                className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-xs ${
                  item.badge === 'STANDOUT'
                    ? 'bg-amber-600'
                    : item.badge === 'BESTSELLER'
                    ? 'bg-rose-600'
                    : item.badge === 'TODAY SPECIAL'
                    ? 'bg-teal-600'
                    : 'bg-stone-900'
                }`}
              >
                {item.badge}
              </span>
            </div>
          )}

          {/* Veg / Non-Veg Indicator */}
          <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-xs p-1 rounded-md border border-stone-200/70 shadow-xs">
            <span
              className={`w-2.5 h-2.5 rounded-full block ${
                item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
              }`}
              title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            />
          </div>

          {/* Top Right Cluster: Share Button + Favorite Heart Button */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
            {/* Social Share Button */}
            <button
              onClick={handleTriggerShare}
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs border border-stone-200/70 flex items-center justify-center text-stone-600 hover:text-amber-700 transition-colors shadow-xs active:scale-90 cursor-pointer"
              title={`Share ${item.name} with friends`}
              aria-label={`Share ${item.name}`}
            >
              <Share2 className="w-3.5 h-3.5 text-stone-600 hover:text-amber-700" />
            </button>

            {/* Favorite Heart Button */}
            <button
              onClick={() => onToggleFavorite(item.id)}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-stone-200/70 flex items-center justify-center text-stone-600 hover:text-rose-600 transition-colors shadow-xs active:scale-90"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? 'fill-rose-500 text-rose-500' : 'text-stone-500'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Share Popover Overlay if open */}
        {showShareModal && (
          <div className="absolute inset-x-3 top-12 z-30 bg-stone-900 text-white rounded-2xl p-4 shadow-xl border border-stone-700 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" />
                Share with Friends
              </span>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 text-stone-400 hover:text-white rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-stone-300 py-2">
              Share <strong className="text-white">{item.name}</strong> from Shekhar's Food Club:
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleShareWhatsApp}
                className="py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleCopyShareLink}
                className="py-2 px-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Info</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Dish Title & Highlight */}
        <div className="space-y-1 mb-2">
          <h3 className="font-bold text-stone-900 text-base leading-snug font-display group-hover:text-amber-700 transition-colors">
            {item.name}
          </h3>
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 text-xs text-stone-600 mb-3">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="font-bold text-stone-900">{item.rating}</span>
          <span className="text-stone-400">({item.reviewsCount} reviews)</span>
        </div>
      </div>

      {/* Bottom Area: Portion Toggle + Price + Add Button */}
      <div className="space-y-3 pt-2 border-t border-stone-100">
        
        {/* Portion Selector if item supports Half/Full */}
        {item.hasPortions ? (
          <div className="flex items-center p-1 bg-stone-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setSelectedPortion('half')}
              className={`flex-1 py-1 px-2 rounded-lg text-center transition-all ${
                selectedPortion === 'half'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Half · ₹{item.halfPrice}
            </button>
            <button
              onClick={() => setSelectedPortion('full')}
              className={`flex-1 py-1 px-2 rounded-lg text-center transition-all ${
                selectedPortion === 'full'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Full · ₹{item.fullPrice}
            </button>
          </div>
        ) : item.pieces ? (
          <div className="text-[11px] font-semibold text-stone-500 bg-stone-50 px-2 py-0.5 rounded-lg inline-block">
            Standard Plate · {item.pieces} Pieces
          </div>
        ) : (
          <div className="text-[11px] font-semibold text-stone-500 bg-stone-50 px-2 py-0.5 rounded-lg inline-block">
            Freshly Prepared Portion
          </div>
        )}

        {/* Price and Add to Cart Button (matches reference app's circular + button) */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div>
            <span className="text-xs text-stone-400 font-medium block">Price</span>
            <span className="text-lg font-black text-stone-900 font-display">
              ₹{currentPrice}
            </span>
          </div>

          {/* Add / Stepper Button */}
          {cartQuantity > 0 && onUpdateQuantity ? (
            <div className="flex items-center bg-stone-900 text-white rounded-2xl p-1 gap-1.5 shadow-sm">
              <button
                onClick={() => onUpdateQuantity(selectedPortion, -1)}
                className="w-7 h-7 rounded-xl flex items-center justify-center hover:bg-stone-800 text-stone-200 transition-colors"
                title="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-xs px-1 min-w-4 text-center">
                {cartQuantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(selectedPortion, 1)}
                className="w-7 h-7 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center hover:bg-amber-400 transition-colors"
                title="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className={`h-10 px-4 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-sm cursor-pointer ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 text-stone-950'
              }`}
              title={`Add ${item.name} (${selectedPortion}) to order`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add</span>
                </>
              )}
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
