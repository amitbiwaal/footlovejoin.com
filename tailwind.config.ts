import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---- New premium palette: warm charcoal + coral / rose-gold ----
        bg: {
          DEFAULT: "#0E0D12", // page background (warm near-black)
          soft: "#16141C", // slightly lifted sections
          card: "#1C1926", // cards
          card2: "#241F30", // nested / hovered cards
        },
        coral: {
          DEFAULT: "#FF6B5A",
          bright: "#FF7E5F",
          soft: "#FF8F73",
        },
        rose: {
          DEFAULT: "#E8A87C", // rose-gold accent
          gold: "#F4C89A",
        },
        ink: {
          DEFAULT: "#F7F2EE", // primary text
          muted: "#A79FB0", // secondary text
          faint: "#6F6879", // tertiary / captions
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        content: "1440px",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #FF6B5A 0%, #FF8F73 45%, #E8A87C 100%)",
        "brand-radial":
          "radial-gradient(1200px 600px at 50% -10%, rgba(255,107,90,0.25), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(255,107,90,0.45)",
        card: "0 20px 50px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
