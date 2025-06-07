/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "rubik-rotate": {
          "0%": {
            transform: "rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
          },
          "16.66%": {
            transform: "rotateX(90deg) rotateY(0deg) rotateZ(0deg)",
          },
          "33.33%": {
            transform: "rotateX(90deg) rotateY(90deg) rotateZ(0deg)",
          },
          "50%": {
            transform: "rotateX(90deg) rotateY(90deg) rotateZ(90deg)",
          },
          "66.66%": {
            transform: "rotateX(180deg) rotateY(90deg) rotateZ(90deg)",
          },
          "83.33%": {
            transform: "rotateX(180deg) rotateY(180deg) rotateZ(90deg)",
          },
          "100%": {
            transform: "rotateX(360deg) rotateY(360deg) rotateZ(360deg)",
          },
        },
        "ceramic-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(245, 241, 232, 0.3), inset 0 0 20px rgba(245, 241, 232, 0.1)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(245, 241, 232, 0.5), inset 0 0 30px rgba(245, 241, 232, 0.2)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "rubik-rotate": "rubik-rotate 20s linear infinite",
        "ceramic-glow": "ceramic-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
