import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [
    tailwindcss(),
    svgr(),
    reactRouter(),
    tsconfigPaths(),
    devtoolsJson(),
  ],
});
