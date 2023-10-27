/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.receiteria.com.br',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
