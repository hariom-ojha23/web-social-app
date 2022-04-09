/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'images.pexels.com',
      'www.pixelstalk.net',
      's3.amazonaws.com',
    ],
  },
}

module.exports = nextConfig
