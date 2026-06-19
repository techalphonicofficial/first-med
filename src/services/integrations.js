export const integrationContracts = {
  auth: {
    login: "POST /auth/login",
    register: "POST /auth/register",
    otp: "POST /auth/otp/verify",
    session: "GET /auth/me"
  },
  products: {
    list: "GET /products",
    detail: "GET /products/:slug",
    search: "GET /search?q="
  },
  prescription: {
    upload: "POST /prescriptions",
    status: "GET /prescriptions/:id/status",
    review: "Replace demo validation with OCR/manual pharmacist review"
  },
  checkout: {
    cart: "GET/POST/PATCH /cart",
    order: "POST /orders",
    payment: "Razorpay/Stripe/PayPal client handoff"
  },
  realtime: {
    tracking: "Socket.io channel: order:trackingId"
  },
  maps: {
    addressPicker: "Google Maps or Mapbox geocoding component",
    routePreview: "Map provider route polyline"
  }
};
