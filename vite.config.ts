import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.REPO_NAME || "/",
  plugins: [react()],
});
