import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 프로덕션 빌드시 base URL 설정
  base: "/",
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true,
    },
    hmr: {
      clientPort: 5173,
      // WebSocket 프로토콜 명시 (WSS 대신 WS 사용)
      protocol: "ws",
      // WebSocket 연결 호스트 설정
      host: "localhost",
    },
    allowedHosts: [
      "ec2-43-201-109-130.ap-northeast-2.compute.amazonaws.com",
      "localhost",
      "127.0.0.1",
      "www.hugexp.xyz",
      "hugexp.xyz"
    ],
    // MIME 타입 관련 헤더 추가
    headers: {
      "Accept-Ranges": "bytes",
    },
  },
  // 의존성 사전 번들링 최적화 (모듈 로드 에러 방지)
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  // 빌드 설정
  build: {
    // 프로덕션에서는 소스맵 비활성화 (보안 및 크기 최적화)
    sourcemap: false,
    // 빌드 출력 디렉토리
    outDir: "dist",
    // 빌드 전 출력 디렉토리 정리
    emptyOutDir: true,
    // 청크 크기 경고 한계 설정 (KB)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 벤더 라이브러리 분리 (캐싱 최적화)
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          editor: ["@uiw/react-md-editor", "@uiw/react-markdown-preview"],
        },
        // 에셋 파일명 패턴 설정
        assetFileNames: "assets/[name]-[hash][extname]",
        // 청크 파일명 패턴 설정
        chunkFileNames: "assets/[name]-[hash].js",
        // 엔트리 파일명 패턴 설정
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
    // 타겟 브라우저 설정
    target: "es2015",
    // CSS 코드 분할
    cssCodeSplit: true,
    // 압축 설정
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // 프로덕션에서 console.log 제거
        drop_debugger: true, // debugger 문 제거
      },
    },
  },
  define: {
    __BASE_URL__: JSON.stringify(
      process.env.NODE_ENV === "production"
        ? "http://api.hugexp.xyz"
        : "http://localhost:8080"
    ),
  },
});
