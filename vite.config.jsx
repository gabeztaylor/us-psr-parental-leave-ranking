import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/us-psr-parental-leave-ranking/",   // ← must match your GitHub repo name exactly
});