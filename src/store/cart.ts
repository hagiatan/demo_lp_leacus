"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  toast: {
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  };
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  showToast: (message: string, type: "success" | "error") => void;
  hideToast: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toast: {
        message: "",
        type: "success",
        isVisible: false,
      },

      addItem: (product: Product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.product.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
          get().showToast(`${product.name} quantity updated`, "success");
        } else {
          set({ items: [...items, { product, quantity: 1 }] });
          get().showToast(`${product.name} added to cart`, "success");
        }
        set({ isOpen: true });
      },

      removeItem: (productId: string) => {
        const item = get().items.find(item => item.product.id === productId);
        set({ items: get().items.filter((item) => item.product.id !== productId) });
        if (item) {
          get().showToast(`${item.product.name} removed from cart`, "success");
        }
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
        get().showToast("Cart cleared", "success");
      },
      
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      showToast: (message: string, type: "success" | "error") => {
        set({
          toast: {
            message,
            type,
            isVisible: true,
          },
        });
      },

      hideToast: () => {
        set({
          toast: {
            message: "",
            type: "success",
            isVisible: false,
          },
        });
      },
    }),
    {
      name: "aluna-cart",
      partialize: (state) => ({
        items: state.items,
        // Don't persist toast state
      }),
    }
  )
);
