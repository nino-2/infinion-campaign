import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      theme: {
        extend: {
          fontFamily: {
            worksans: ['"Work Sans"', "sans-serif"],
            nunito: ["Nunito", "sans-serif"],
            generalsans: ['"General Sans"', "sans-serif"],
          },
        },
      },
    }),
  ],
});
