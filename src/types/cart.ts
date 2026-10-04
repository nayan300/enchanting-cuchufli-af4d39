import { MenuItem } from '../data/restaurantData';

export interface CartItem {
  id: string; // `${item.id}-${portion}`
  item: MenuItem;
  portion: 'half' | 'full';
  unitPrice: number;
  quantity: number;
}

export type OrderType = 'dine_in' | 'takeaway' | 'delivery';

export interface OrderDetails {
  orderType: OrderType;
  customerName: string;
  customerPhone: string;
  tableOrAddress: string;
  cookingNotes: string;
}

export interface RecentOrder {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  orderType: OrderType;
  customerName?: string;
}
