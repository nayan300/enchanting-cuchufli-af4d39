import React, { useState, useEffect } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Phone,
  MessageSquare,
  ShoppingBag,
  History,
  RotateCcw,
  Check,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CartItem, OrderType, RecentOrder } from '../types/cart';
import { RESTAURANT_INFO, MENU_ITEMS } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onReorderItems: (itemsToReorder: CartItem[]) => void;
}

const STORAGE_KEY = 'shekhars_food_club_recent_orders';

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onReorderItems,
}) => {
  const [orderType, setOrderType] = useState<OrderType>('takeaway');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [cookingNotes, setCookingNotes] = useState('');
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [reorderedId, setReorderedId] = useState<string | null>(null);
  const [showRecentSection, setShowRecentSection] = useState(true);

  // Load recent orders from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setRecentOrders(JSON.parse(saved));
      } else {
        // Seed default initial recent orders for immediate delightful testing
        const biryani = MENU_ITEMS.find((m) => m.id === 'chicken-biryani')!;
        const lagoon = MENU_ITEMS.find((m) => m.id === 'blue-lagoon')!;
        const momo = MENU_ITEMS.find((m) => m.id === 'chicken-momo')!;
        const fries = MENU_ITEMS.find((m) => m.id === 'french-fries')!;

        const initialOrders: RecentOrder[] = [
          {
            id: 'ord-prev-1',
            date: 'Yesterday at 7:30 PM',
            totalAmount: 160,
            orderType: 'takeaway',
            customerName: 'Bikash',
            items: [
              {
                id: 'chicken-biryani-half',
                item: biryani,
                portion: 'half',
                unitPrice: 100,
                quantity: 1,
              },
              {
                id: 'blue-lagoon-full',
                item: lagoon,
                portion: 'full',
                unitPrice: 60,
                quantity: 1,
              },
            ],
          },
          {
            id: 'ord-prev-2',
            date: '3 days ago',
            totalAmount: 110,
            orderType: 'dine_in',
            customerName: 'Pranab',
            items: [
              {
                id: 'chicken-momo-half',
                item: momo,
                portion: 'half',
                unitPrice: 60,
                quantity: 1,
              },
              {
                id: 'french-fries-full',
                item: fries,
                portion: 'full',
                unitPrice: 50,
                quantity: 1,
              },
            ],
          },
        ];
        setRecentOrders(initialOrders);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialOrders));
      }
    } catch {
      // Fallback
    }
  }, []);

  if (!isOpen) return null;

  const isDelivery = orderType === 'delivery';
  const minDeliveryOrder = RESTAURANT_INFO.minDeliveryOrder ?? 299;
  const deliveryCharge = isDelivery ? (RESTAURANT_INFO.deliveryChargeUnder1Km ?? 40) : 0;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const packagingFee = 0; // Free for opening week
  const grandTotal = subtotal + deliveryCharge + packagingFee;

  const isBelowMinDelivery = isDelivery && subtotal < minDeliveryOrder;
  const amountNeededForDelivery = Math.max(0, minDeliveryOrder - subtotal);

  // Save order to recent orders in localStorage
  const saveOrderToRecent = () => {
    if (items.length === 0) return;

    const newOrder: RecentOrder = {
      id: `ord-${Date.now()}`,
      date: 'Just now',
      totalAmount: grandTotal,
      orderType,
      customerName: customerName.trim() || undefined,
      items: [...items],
    };

    const updated = [newOrder, ...recentOrders.filter((o) => o.id !== newOrder.id)].slice(0, 5);
    setRecentOrders(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    if (isBelowMinDelivery) {
      alert(`Minimum food order for delivery is ₹${minDeliveryOrder}. Please add ₹${amountNeededForDelivery} more, or select Takeaway/Dine-in.`);
      return;
    }

    saveOrderToRecent();

    let orderTypeLabel = 'Takeaway (Self-Pickup)';
    if (orderType === 'dine_in') orderTypeLabel = 'Dine-In (Table)';
    if (orderType === 'delivery') orderTypeLabel = 'Home Delivery (Under 1 km)';

    let message = `*NEW ORDER - SHEKHAR'S FOOD CLUB*\n`;
    message += `--------------------------------\n`;
    message += `*Customer:* ${customerName.trim() || 'Food Club Guest'}\n`;
    if (customerPhone.trim()) message += `*Contact:* ${customerPhone.trim()}\n`;
    message += `*Order Type:* ${orderTypeLabel}\n`;
    if (tableOrAddress.trim()) {
      message += `*Location / Details:* ${tableOrAddress.trim()}\n`;
    }
    if (cookingNotes.trim()) {
      message += `*Special Note:* ${cookingNotes.trim()}\n`;
    }
    message += `\n*ITEMS ORDERED:*\n`;

    items.forEach((ci, idx) => {
      const portionText = ci.item.hasPortions ? `(${ci.portion.toUpperCase()})` : '';
      message += `${idx + 1}. ${ci.item.name} ${portionText} x ${ci.quantity} = ₹${ci.unitPrice * ci.quantity}\n`;
    });

    message += `--------------------------------\n`;
    message += `*Subtotal:* ₹${subtotal}\n`;
    if (isDelivery) {
      message += `*Delivery Charge (Under 1 km):* ₹${deliveryCharge}\n`;
    }
    message += `*Total Amount:* ₹${grandTotal}\n`;
    message += `*Payment:* Cash / UPI on Delivery/Pickup\n\n`;
    message += `Please confirm my order. Thank you!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleReorderClick = (order: RecentOrder) => {
    onReorderItems(order.items);
    setReorderedId(order.id);
    setTimeout(() => setReorderedId(null), 1500);
  };

  const handleClearHistory = () => {
    setRecentOrders([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col border-l border-stone-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-stone-900 font-display">Your Food Bag</h3>
                <p className="text-xs text-stone-500">{items.length} unique dish(es)</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  title="Empty Cart"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            
            {/* If Cart has items: Show items, order type, and details */}
            {items.length > 0 ? (
              <>
                {/* Order Type Toggle */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-700 block">How will you enjoy this?</label>
                    {isDelivery && (
                      <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                        ₹40 under 1 km · Min ₹299
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-1 p-1 bg-stone-200/70 rounded-xl text-xs font-semibold">
                    <button
                      onClick={() => setOrderType('takeaway')}
                      className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer ${
                        orderType === 'takeaway'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      🛍️ Takeaway
                    </button>
                    <button
                      onClick={() => setOrderType('dine_in')}
                      className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer ${
                        orderType === 'dine_in'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      🍽️ Dine-in
                    </button>
                    <button
                      onClick={() => setOrderType('delivery')}
                      className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer ${
                        orderType === 'delivery'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      🛵 Delivery
                    </button>
                  </div>

                  {/* Delivery Minimum Notice & Progress */}
                  {isDelivery && (
                    <div className={`p-3 rounded-xl border text-xs space-y-1.5 transition-colors ${
                      isBelowMinDelivery ? 'bg-amber-50/90 border-amber-300' : 'bg-emerald-50/90 border-emerald-300 text-emerald-900'
                    }`}>
                      <div className="flex items-center justify-between font-bold">
                        <span>
                          {isBelowMinDelivery ? 'Minimum food order for delivery: ₹299' : '✅ Delivery minimum reached!'}
                        </span>
                        {isBelowMinDelivery && (
                          <span className="text-amber-800 font-extrabold">Add ₹{amountNeededForDelivery} more</span>
                        )}
                      </div>
                      <div className="w-full bg-stone-200/80 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isBelowMinDelivery ? 'bg-amber-600' : 'bg-emerald-600'
                          }`}
                          style={{ width: `${Math.min(100, Math.round((subtotal / minDeliveryOrder) * 100))}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-stone-600">
                        {isBelowMinDelivery
                          ? `Food subtotal is ₹${subtotal}. Add ₹${amountNeededForDelivery} more to place delivery order (or switch to Takeaway with no minimum).`
                          : `Delivery charge: ₹40 (flat under 1 km in Sadiya/Chapakhowa).`}
                      </p>
                    </div>
                  )}
                </div>

                {/* Items List */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-stone-700 block">Selected Items</label>
                  {items.map((ci) => (
                    <div
                      key={ci.id}
                      className="p-3 bg-white rounded-2xl border border-stone-200/90 shadow-2xs flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              ci.item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                            }`}
                          />
                          <h5 className="font-bold text-xs text-stone-900 truncate">
                            {ci.item.name}
                          </h5>
                        </div>
                        <p className="text-[11px] text-stone-500 pl-3.5">
                          {ci.item.hasPortions ? (
                            <span className="font-semibold text-amber-800 uppercase">
                              {ci.portion} Portion · ₹{ci.unitPrice}
                            </span>
                          ) : (
                            <span>Standard Portion · ₹{ci.unitPrice}</span>
                          )}
                        </p>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-1 bg-stone-100 rounded-xl p-1 shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(ci.id, -1)}
                          className="w-6 h-6 rounded-lg bg-white text-stone-700 flex items-center justify-center hover:bg-stone-200 transition-colors shadow-2xs cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-xs px-1.5 min-w-4 text-center">
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(ci.id, 1)}
                          className="w-6 h-6 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center hover:bg-amber-400 transition-colors shadow-2xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="text-right shrink-0 min-w-12">
                        <span className="font-extrabold text-xs text-stone-900 font-display">
                          ₹{ci.unitPrice * ci.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Details Form */}
                <div className="p-3.5 bg-white rounded-2xl border border-stone-200 space-y-3 text-xs">
                  <div className="font-bold text-stone-900 flex items-center justify-between">
                    <span>Order & Delivery Details</span>
                    <span className="text-[10px] text-stone-400 font-normal">Optional / Pre-fill</span>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Your Name (e.g. Shekhar / Rahul)"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number (e.g. 093957 75599)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder={
                        orderType === 'dine_in'
                          ? 'Table Number (or mention Dine-in)'
                          : orderType === 'delivery'
                          ? 'Delivery Address in Sadiya / Chapakhowa'
                          : 'Pickup time (e.g. In 15 minutes)'
                      }
                      value={tableOrAddress}
                      onChange={(e) => setTableOrAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Cooking note (e.g. Extra spicy momo chutney, less salt)"
                      value={cookingNotes}
                      onChange={(e) => setCookingNotes(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div className="p-3.5 bg-white rounded-2xl border border-stone-200 space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-stone-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    {isDelivery ? (
                      <span className="font-bold text-stone-900">₹{deliveryCharge} (Under 1 km)</span>
                    ) : (
                      <span className="font-semibold text-teal-700">FREE ({orderType === 'dine_in' ? 'Dine-in' : 'Takeaway'})</span>
                    )}
                  </div>
                  <div className="flex justify-between text-teal-700">
                    <span>Opening Week Packaging</span>
                    <span className="font-semibold">FREE (₹0)</span>
                  </div>
                  <div className="pt-2 border-t border-stone-100 flex justify-between text-sm font-bold text-stone-900">
                    <span>Grand Total</span>
                    <span className="text-base text-amber-600 font-display">₹{grandTotal}</span>
                  </div>
                </div>
              </>
            ) : (
              /* Empty Cart State */
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-amber-100/70 text-amber-800 flex items-center justify-center text-2xl mx-auto">
                  🍽️
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-stone-900 font-display">Your bag is empty</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Quickly re-order from your recent favorites below, or explore the menu!
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-xs"
                >
                  Browse Full Menu
                </button>
              </div>
            )}

            {/* RECENT ORDERS (LOCAL STORAGE-BASED) */}
            {recentOrders.length > 0 && (
              <div className="pt-3 border-t border-stone-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                      Recent Orders
                    </span>
                    <span className="text-[10px] bg-stone-200 text-stone-700 px-1.5 py-0.5 rounded-full font-bold">
                      {recentOrders.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowRecentSection(!showRecentSection)}
                      className="text-stone-400 hover:text-stone-700 p-1"
                      title={showRecentSection ? 'Collapse' : 'Expand'}
                    >
                      {showRecentSection ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={handleClearHistory}
                      className="text-[11px] text-stone-400 hover:text-rose-600 underline"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {showRecentSection && (
                  <div className="space-y-2.5">
                    {recentOrders.map((ord) => {
                      const isJustReordered = reorderedId === ord.id;
                      return (
                        <div
                          key={ord.id}
                          className="p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs hover:border-amber-300 transition-colors space-y-2"
                        >
                          <div className="flex items-center justify-between text-[11px] text-stone-500 pb-1 border-b border-stone-100">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-stone-400" />
                              <span>{ord.date}</span>
                            </span>
                            <span className="font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-full capitalize">
                              {ord.orderType.replace('_', ' ')}
                            </span>
                          </div>

                          {/* Items summary */}
                          <div className="space-y-1">
                            {ord.items.map((it, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between text-xs text-stone-800"
                              >
                                <span className="truncate pr-2">
                                  {it.quantity}x {it.item.name}
                                  {it.item.hasPortions && (
                                    <span className="text-[10px] text-amber-700 font-bold ml-1 uppercase">
                                      ({it.portion})
                                    </span>
                                  )}
                                </span>
                                <span className="font-semibold text-stone-600 shrink-0">
                                  ₹{it.unitPrice * it.quantity}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Footer with total and Re-order CTA */}
                          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-stone-400 block">Total</span>
                              <span className="font-black text-xs text-stone-900 font-display">
                                ₹{ord.totalAmount}
                              </span>
                            </div>

                            <button
                              onClick={() => handleReorderClick(ord)}
                              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs ${
                                isJustReordered
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-amber-500 hover:bg-amber-600 text-stone-950'
                              }`}
                            >
                              {isJustReordered ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Added!</span>
                                </>
                              ) : (
                                <>
                                  <RotateCcw className="w-3.5 h-3.5" />
                                  <span>Re-order</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Checkout Action Bar */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-stone-200 space-y-2">
              {isBelowMinDelivery ? (
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98 cursor-pointer"
                >
                  <span>Add ₹{amountNeededForDelivery} more for Delivery (Min ₹299)</span>
                </button>
              ) : (
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 fill-white/20" />
                  <span>Send Order via WhatsApp (₹{grandTotal})</span>
                </button>
              )}

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-amber-50 hover:text-amber-800 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-stone-200"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>Call to Order (093957 75599)</span>
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
