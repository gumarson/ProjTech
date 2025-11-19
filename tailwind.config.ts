import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          100: '#d9f99d', 
          200: '#bef264',
          600: '#4c9c2e', 
          800: '#166534',
          900: '#14532d',
        },
        gray: {
          100: '#f7fafc',
          700: '#4a5568',
        },
        primary: {
          100: '#E5E7EB',
          200: '#D1D5DB',
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#4B5563',
          600: '#374151',
          700: '#1F2937',
          800: '#111827',
          900: '#030712',
        },
        accent: {
          100: '#93C5FD',
          200: '#60A5FA',
          300: '#3B82F6',
          400: '#2563EB',
          500: '#1D4ED8',
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
