import { create } from "zustand";

export interface DeliveryItem {
  name: string;
  phone: string;
  email?: string;
  address: string;
  postcode: string;
  state: string;
  country: string;
  weight: number;
}

export interface DeliveryState {
  deliveryInfo: DeliveryItem;
  setDeliveryInfo: (data: Partial<DeliveryItem>) => void;
  resetDeliveryInfo: () => void;
}

export const useDeliveryStore = create<DeliveryState>((set) => ({
  deliveryInfo: {
    name: "",
    phone: "",
    email: "",
    address: "",
    postcode: "",
    state: "",
    country: "",
    weight: 0,
  },
  setDeliveryInfo: (data) =>
    set((state) => ({
      deliveryInfo: { ...state.deliveryInfo, ...data },
    })),
  resetDeliveryInfo: () =>
    set({
      deliveryInfo: {
        name: "",
        phone: "",
        email: "",
        address: "",
        postcode: "",
        state: "",
        country: "",
        weight: 0,
      },
    }),
}));
