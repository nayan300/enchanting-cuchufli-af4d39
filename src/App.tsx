import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, RESTAURANT_INFO, MenuItem, ComboDeal, PRESET_COMBOS } from './data/restaurantData';
import { CartItem } from './types/cart';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryBar } from './components/CategoryBar';
import { SearchBar } from './components/SearchBar';
import { FoodCard } from './components/FoodCard';
import { SpecialComboBanner } from './components/SpecialComboBanner';
import { WhiteboardSpecials } from './components/WhiteboardSpecials';
import { HealthPhilosophy } from './components/HealthPhilosophy';
import { TrustBadges } from './components/TrustBadges';
import { RestaurantTour } from './components/RestaurantTour';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationCard } from './components/LocationCard';
import { CartDrawer } from './components/CartDrawer';
import { BottomNavBar } from './components/BottomNavBar';
import { Flame, Star, Sparkles, Phone, MessageSquare, Heart, Check, ArrowRight } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['chicken-biryani', 'chicken-momo']));
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [lessOilOnly, setLessOilOnly] = useState<boolean>(false);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeCombo, setActiveCombo] = useState<ComboDeal>(PRESET_COMBOS[0]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Add to Cart
  const handleAddToCart = (item: MenuItem, portion: 'half' | 'full' = 'full') => {
    const unitPrice = item.hasPortions
      ? portion === 'half'
        ? (item.halfPrice ?? item.fullPrice)
        : item.fullPrice
      : item.fullPrice;

    const cartItemId = `${item.id}-${portion}`;

    setCart((prev) => {
      const existing = prev.find((ci) => ci.id === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.id === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { id: cartItemId, item, portion, unitPrice, quantity: 1 }];
    });

    showToast(`Added ${item.name} (${item.hasPortions ? portion.toUpperCase() : 'Standard'}) to cart!`);
  };

  // Add Dynamic Combo Deal to Cart
  const handleAddComboToCart = (combo: ComboDeal) => {
    const comboItem: MenuItem = {
      id: combo.id,
      name: combo.title,
      description: combo.description,
      category: 'combos',
      categoryLabel: 'Beverages & Combos',
      hasPortions: false,
      fullPrice: combo.comboPrice,
      isVeg: combo.isVeg,
      badge: 'TODAY SPECIAL',
      rating: 5.0,
      reviewsCount: 24,
      image: combo.image,
      highlight: `Special Combo · Save ₹${combo.savings}`,
    };
    handleAddToCart(comboItem, 'full');
  };

  const handleChangeCombo = (newCombo: ComboDeal) => {
    setActiveCombo(newCombo);
    showToast(`Today's Exclusive Combo updated to: ${newCombo.title}! ✨`);
  };

  // Update item quantity
  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.id === cartItemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleUpdateFromCard = (item: MenuItem, portion: 'half' | 'full', delta: number) => {
    const cartItemId = `${item.id}-${portion}`;
    handleUpdateQuantity(cartItemId, delta);
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Re-order items from Recent Orders
  const handleReorderItems = (itemsToReorder: CartItem[]) => {
    setCart((prev) => {
      const updated = [...prev];
      itemsToReorder.forEach((reorderItem) => {
        const existingIdx = updated.findIndex((ci) => ci.id === reorderItem.id);
        if (existingIdx >= 0) {
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: updated[existingIdx].quantity + reorderItem.quantity,
          };
        } else {
          updated.push({ ...reorderItem });
        }
      });
      return updated;
    });
    showToast(`Added ${itemsToReorder.length} item(s) from recent order to your bag! 🔄`);
  };

  // Favorites toggle
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Removed from favorites');
      } else {
        next.add(id);
        showToast('Added to your favorite dishes ❤️');
      }
      return next;
    });
  };

  // Total items in cart
  const cartTotalCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter === 'veg' && !item.isVeg) return false;
      if (dietaryFilter === 'non-veg' && item.isVeg) return false;
      // Less oil filter
      if (lessOilOnly) {
        const matchesLessOil =
          item.highlight?.toLowerCase().includes('less oil') ||
          item.id === 'chicken-biryani' ||
          item.id === 'chicken-momo' ||
          item.id.includes('rice') ||
          item.id.includes('noodles');
        if (!matchesLessOil) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.categoryLabel.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      return true;
    });
  }, [selectedCategory, dietaryFilter, lessOilOnly, searchQuery]);

  // Standout popular picks (like the "Popular Picks" in the attachment)
  const popularPicks = useMemo(() => {
    return MENU_ITEMS.filter(
      (item) => item.badge === 'STANDOUT' || item.badge === 'BESTSELLER' || item.badge === 'POPULAR'
    );
  }, []);

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWhiteboard = () => {
    const el = document.getElementById('whiteboard-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLocation = () => {
    const el = document.getElementById('location-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tab === 'menu') scrollToMenu();
    if (tab === 'specials') scrollToWhiteboard();
    if (tab === 'location') scrollToLocation();
  };

  return (
    <div className={`min-h-screen bg-[#FBF8F3] text-stone-900 ${isMobileFrame ? 'py-4 sm:py-8 px-2 flex justify-center bg-stone-300' : ''}`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 border border-stone-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container / Mobile Mockup Shell */}
      <div
        className={`w-full transition-all duration-300 ${
          isMobileFrame
            ? 'max-w-md bg-[#FBF8F3] rounded-[44px] shadow-2xl overflow-hidden border-[10px] border-stone-900 relative ring-1 ring-black/10'
            : 'max-w-6xl mx-auto'
        }`}
      >
        {/* Mobile Mockup Speaker & Notch bar if in Frame Mode */}
        {isMobileFrame && (
          <div className="bg-stone-900 pt-2 pb-1 px-6 flex items-center justify-between text-white text-[11px] font-semibold select-none">
            <span>9:41</span>
            <div className="w-20 h-4 bg-stone-800 rounded-full mx-auto"></div>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <span className="w-4 h-2 rounded-xs border border-white/60 bg-white inline-block"></span>
            </div>
          </div>
        )}

        {/* Global Navigation Header */}
        <Header
          cartCount={cartTotalCount}
          onOpenCart={() => setIsCartOpen(true)}
          isMobileFrame={isMobileFrame}
          onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
        />

        {/* Main Content Area */}
        <main className="px-4 sm:px-6 py-5 space-y-7 pb-24 lg:pb-12">
          
          {/* Hero Banner (Directly styled like attachment promo card) */}
          <HeroBanner
            onOrderNow={scrollToMenu}
            onOpenWhiteboard={scrollToWhiteboard}
          />

          {/* Search & Filter Controls */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            dietaryFilter={dietaryFilter}
            onDietaryFilterChange={setDietaryFilter}
            lessOilOnly={lessOilOnly}
            onToggleLessOil={() => setLessOilOnly(!lessOilOnly)}
          />

          {/* Category Carousel (Circular Icons matching reference image) */}
          <CategoryBar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Popular Picks (Matching Pizza Hut reference carousel/grid) */}
          {selectedCategory === 'all' && !searchQuery && !lessOilOnly && dietaryFilter === 'all' && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display flex items-center gap-2">
                    <span>Popular Picks</span>
                    <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                      Hot
                    </span>
                  </h2>
                  <p className="text-xs text-stone-500">
                    Highest rated by Sadiya customers
                  </p>
                </div>
                <button
                  onClick={scrollToMenu}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularPicks.map((dish) => {
                  const cardQty = cart
                    .filter((ci) => ci.item.id === dish.id)
                    .reduce((sum, ci) => sum + ci.quantity, 0);

                  return (
                    <FoodCard
                      key={`pop-${dish.id}`}
                      item={dish}
                      onAddToCart={handleAddToCart}
                      cartQuantity={cardQty}
                      onUpdateQuantity={(portion, delta) =>
                        handleUpdateFromCard(dish, portion, delta)
                      }
                      isFavorite={favorites.has(dish.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {/* Today's Special Combo Banner (Can be changed anytime) */}
          <SpecialComboBanner
            currentCombo={activeCombo}
            onChangeCombo={handleChangeCombo}
            onAddCombo={handleAddComboToCart}
          />

          {/* All Menu Items Section */}
          <section id="menu-section" className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display">
                  {selectedCategory === 'all'
                    ? 'Our Complete Menu'
                    : MENU_ITEMS.find((m) => m.category === selectedCategory)?.categoryLabel ||
                      'Menu Items'}
                </h2>
                <p className="text-xs text-stone-500">
                  Showing {filteredItems.length} dishes · Prepared fresh with less oil
                </p>
              </div>

              {(selectedCategory !== 'all' || searchQuery || lessOilOnly || dietaryFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setDietaryFilter('all');
                    setLessOilOnly(false);
                  }}
                  className="text-xs font-bold text-amber-700 hover:underline"
                >
                  Reset Filters
                </button>
              )}
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
                <span className="text-4xl block">🔍</span>
                <h3 className="font-bold text-stone-800 text-base">No matching dishes found</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try clearing your search query or dietary filters to view all delicious options.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setDietaryFilter('all');
                    setLessOilOnly(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
                >
                  Show All Dishes
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((dish) => {
                  const cardQty = cart
                    .filter((ci) => ci.item.id === dish.id)
                    .reduce((sum, ci) => sum + ci.quantity, 0);

                  return (
                    <FoodCard
                      key={dish.id}
                      item={dish}
                      onAddToCart={handleAddToCart}
                      cartQuantity={cardQty}
                      onUpdateQuantity={(portion, delta) =>
                        handleUpdateFromCard(dish, portion, delta)
                      }
                      isFavorite={favorites.has(dish.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  );
                })}
              </div>
            )}
          </section>

          {/* Opening Week Whiteboard Feature Section */}
          <section id="whiteboard-section">
            <WhiteboardSpecials
              onQuickAdd={handleAddToCart}
              activeCombo={activeCombo}
              onAddCombo={handleAddComboToCart}
            />
          </section>

          {/* Trust Badges Bar (Fast delivery, best quality, less oil, opposite police stn) */}
          <TrustBadges />

          {/* Real Restaurant Tour & Ambience Gallery with Pictures */}
          <RestaurantTour />

          {/* Health & Less Oil Cooking Philosophy */}
          <HealthPhilosophy />

          {/* Google Reviews Showcase (4.8 rating from 34 reviews) */}
          <ReviewsSection />

          {/* Store Location & Kitchen Hours */}
          <LocationCard />

        </main>

        {/* Footer */}
        <footer className="bg-stone-900 text-stone-400 py-10 px-6 border-t border-stone-800">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  Shekhar's <span className="text-amber-500">Food Club</span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  {RESTAURANT_INFO.tagline} · Sadiya, Assam
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp: 093957 75599</span>
                </a>
                <a
                  href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                  className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>Call Shekhar</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
              <div>
                <h4 className="font-bold text-white mb-2">Location & Landmark</h4>
                <p className="text-stone-400 leading-relaxed">
                  {RESTAURANT_INFO.address}
                </p>
                <p className="text-amber-400 mt-1 font-semibold">
                  Directly opposite Sadiya Police Station Chariali
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">Hours & Service</h4>
                <p className="text-stone-400">
                  Open Every Day: {RESTAURANT_INFO.hours}
                </p>
                <p className="text-stone-400 mt-1">
                  Dine-in, Takeaway & Local WhatsApp Delivery
                </p>
                <p className="text-teal-400 font-semibold mt-1">
                  40% Less Oil Cooking Standard
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">Google Listing Score</h4>
                <div className="flex items-center gap-1 text-amber-400 font-bold mb-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>4.8 Rating (34 Verified Reviews)</span>
                </div>
                <p className="text-stone-400">
                  Thank you to the wonderful community of Chapakhowa & Sadiya!
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
              <p>© {new Date().getFullYear()} Shekhar's Food Club. All rights reserved.</p>
              <p>Handcrafted fresh meals · Less oil, pure flavour</p>
            </div>
          </div>
        </footer>

        {/* Mobile Bottom Navigation Bar (Matching Pizza Hut reference app layout) */}
        <BottomNavBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          cartCount={cartTotalCount}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Slide-out Cart Drawer with WhatsApp Order generator & Recent Orders */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onReorderItems={handleReorderItems}
        />

      </div>

    </div>
  );
}
