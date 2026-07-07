export const routes = {
  home: "/",
  products: "/products/",
  prescription: "/prescription/",
  cart: "/cart/",
  checkout: "/checkout/",
  account: "/account/dashboard/",
  orders: "/account/orders/",
  login: "/login/",
  vendor: "/vendor/dashboard/",
  delivery: "/delivery/dashboard/",
  warehouse: "/warehouse/",
  admin: "/admin/",
  subscription: "/subscription/",
  membership: "/membership/"
};

export const protectedRoutes = [
  "/account",
  "/checkout",
  "/vendor",
  "/delivery",
  "/warehouse",
  "/admin",
  "/subscription",
  "/membership",
  "/support"
];
