"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      toasts: [],
      cartDrawerOpen: false,
      prescription: { status: "missing", fields: {}, fileName: "" },
      orders: [],
      session: { isAuthenticated: true, role: "customer" },
      user: { name: "Akash Sharma", email: "akash@example.com", phone: "+91 98765 43210" },
      pushToast: (toast) => {
        const id = `${Date.now()}-${Math.random()}`;
        set({ toasts: [...get().toasts.slice(-3), { id, type: "info", ...toast }] });
        if (typeof window !== "undefined") {
          window.setTimeout(() => get().dismissToast(id), 3600);
        }
      },
      dismissToast: (id) => set({ toasts: get().toasts.filter((toast) => toast.id !== id) }),
      openCartDrawer: () => set({ cartDrawerOpen: true }),
      closeCartDrawer: () => set({ cartDrawerOpen: false }),
      addToCart: (product) => {
        if (!product.inStock) {
          get().pushToast({ type: "error", title: "Out of stock", text: "This item cannot be added right now." });
          return { blocked: true };
        }
        const cart = get().cart;
        const existing = cart.find((item) => item.id === product.id);
        set({
          cart: existing
            ? cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
            : [...cart, { ...product, quantity: 1 }]
        });
        set({ cartDrawerOpen: true });
        get().pushToast({
          type: product.rxRequired ? "info" : "success",
          title: product.rxRequired ? "Added with prescription check" : "Added to cart",
          text: product.rxRequired ? "Upload the prescription during checkout to place this order." : product.name
        });
        return { blocked: false };
      },
      updateQty: (id, quantity) =>
        set({ cart: get().cart.map((item) => (item.id === id ? { ...item, quantity } : item)).filter((item) => item.quantity > 0) }),
      removeFromCart: (id) => set({ cart: get().cart.filter((item) => item.id !== id) }),
      toggleWishlist: (product) =>
        {
          const saved = get().wishlist.some((item) => item.id === product.id);
          set({ wishlist: saved ? get().wishlist.filter((item) => item.id !== product.id) : [...get().wishlist, product] });
          get().pushToast({ type: saved ? "info" : "success", title: saved ? "Removed from wishlist" : "Saved to wishlist", text: product.name });
        },
      approvePrescription: (fields, fileName) => {
        const required = ["patientName", "doctorName", "clinicName", "registrationNumber", "issueDate"];
        const approved = required.every((field) => Boolean(fields[field])) && Boolean(fileName);
        set({ prescription: { status: approved ? "approved" : "rejected", fields, fileName } });
        get().pushToast({ type: approved ? "success" : "error", title: approved ? "Prescription approved" : "Prescription incomplete", text: approved ? "Rx products are now unlocked for this demo." : "Add every required field and upload a file." });
        return approved;
      },
      placeOrder: (details) => {
        const total = get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const order = { id: `FM-${Date.now().toString().slice(-5)}`, status: "Confirmed", total, eta: "Today", details };
        set({ orders: [order, ...get().orders], cart: [] });
        get().pushToast({ type: "success", title: "Order confirmed", text: `${order.id} is ready to track.` });
        return order;
      }
    }),
    {
      name: "firstmed-store",
      partialize: ({ toasts, ...state }) => state
    }
  )
);
