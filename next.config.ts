import type { NextConfig } from "next";
import { dirname } from "path";
import { fileURLToPath } from "url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const baseConfig: NextConfig = {
  reactStrictMode: process.env.NODE_ENV === "development",
  outputFileTracingRoot: projectRoot,
  
  /* =========================================
     IMAGE OPTIMIZATION
  ========================================= */
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year for immutable assets
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* =========================================
     COMPRESSION & PERFORMANCE
  ========================================= */
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,

  /* =========================================
     EXPERIMENTAL OPTIMIZATIONS
  ========================================= */
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "recharts"],
    optimizeCss: true,
    scrollRestoration: true,
    esmExternals: true,
  },

  /* =========================================
     HEADERS & SECURITY
  ========================================= */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/Images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/logos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  /* =========================================
     WEBPACK OPTIMIZATION
  ========================================= */
  webpack: (config, { isServer }) => {
    config.optimization = {
      ...config.optimization,
      moduleIds: "deterministic",
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: 10,
            reuseExistingChunk: true,
          },
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
            enforce: true,
          },
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: "framer-motion",
            priority: 15,
            reuseExistingChunk: true,
          },
        },
      },
    };

    return config;
  },
};

// Allow optional bundle analysis via `ANALYZE=true npm run build`
let nextConfig: NextConfig = baseConfig;

if (process.env.ANALYZE === "true") {
  // Use require() here to avoid making @next/bundle-analyzer a hard runtime dependency.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
    // Generate a static report inside .next/analyze/
    analyzerMode: "static",
    reportFilename: "./.next/analyze/report.html",
    openAnalyzer: false,
  });

  nextConfig = withBundleAnalyzer(baseConfig);
}

export default nextConfig;
