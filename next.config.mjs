/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  },
}

export default nextConfig
