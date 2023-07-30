/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { // ! Add for Cloudinary later
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig
