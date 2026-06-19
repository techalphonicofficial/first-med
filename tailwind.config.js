/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          blue: "#0878BE",
          yellow: "#F1E300",
          soft: "#EAF7FF",
          softBlue: "#EAF7FF",
          bg: "#F7FAFD",
          background: "#F7FAFD",
          dark: "#0F172A",
          ink: "#0F172A",
          gray: "#64748B",
          mint: "#DFFCF1",
          navy: "#071529"
        },
        category: {
          health: "#EAF7FF",
          personal: "#FFF0F9",
          hair: "#F0FFF4",
          fitness: "#FFF7ED",
          wellness: "#F5F3FF",
          homeopathy: "#ECFDF5",
          vitamins: "#FFFBEB",
          braces: "#EFF6FF",
          immunity: "#FEF2F2"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(8, 120, 190, 0.13)",
        card: "0 14px 36px rgba(15, 23, 42, 0.08)",
        premium: "0 22px 70px rgba(8, 120, 190, 0.18)",
        glow: "0 18px 38px rgba(8, 120, 190, 0.25)"
      },
      borderRadius: {
        "2xl": "1.25rem"
      }
    }
  },
  plugins: []
};
