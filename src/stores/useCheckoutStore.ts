import { create } from "zustand";
import { CartItem } from "./useCartStores";
import { DeliveryItem } from "./useDeliveryStore";

export interface CheckoutState {
  selectedItems: CartItem[];
  deliveryInfo: DeliveryItem | null;
  setSelectedItems: (items: CartItem[]) => void;
  setDeliveryInfo: (info: DeliveryItem) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  selectedItems: [],
  deliveryInfo: null,
  setSelectedItems: (items) => set({ selectedItems: items }),
  setDeliveryInfo: (info) => set({ deliveryInfo: info }),
  reset: () => set({ selectedItems: [], deliveryInfo: null }),
}));
