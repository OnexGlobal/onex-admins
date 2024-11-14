import { defineConfig } from "vite";
import { config } from "dotenv";

config();
export default defineConfig({
  define: {
    "process.env": process.env,
  },
});
