import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { fileURLToPath } from "url"

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // css: {
  //   postcss: './postcss.config.js'
  // }
})
