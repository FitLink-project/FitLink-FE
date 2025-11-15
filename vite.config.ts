import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: {
      crypto: 'rollup-plugin-node-polyfills/polyfills/crypto-browserify',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    minify: 'esbuild', // JS, CSS 압축 모두 esbuild 사용
    cssMinify: true,   // 간단 true 혹은 'esbuild' 권장
    sourcemap: false,  // 필요시 켤 수 있음
    rollupOptions: {
      output: {
        manualChunks: {}, // 코드 분할 설정 (필요시)
      },
    },
  },
});

