/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  disableStaticImages: false,
  images: {
    domains: ['localhost']
  },
  env: {
    PUBLIC_URL: "http://localhost:3000"
  }
}

module.exports = nextConfig
