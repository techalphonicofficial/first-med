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
  delivery: "/delivery/dashboard/"
};

export const protectedRoutes = [
  "/account",
  "/checkout",
  "/vendor",
  "/delivery"
];
