import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true,
    },
    hmr: {
      clientPort: 5173,
    },
    allowedHosts: [
      "ec2-43-201-109-130.ap-northeast-2.compute.amazonaws.com",
      "localhost",
      "127.0.0.1",
    ],
  },
  define: {
    __BASE_URL__: JSON.stringify(
      process.env.NODE_ENV === "production"
        ? "https://api.hugexp.xyz"
        : "http://localhost:8080"
    ),
  },
});
