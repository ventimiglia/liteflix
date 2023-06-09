/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org', 'res.cloudinary.com'],
  },
  env: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
    CLOUD_UPLOAD_PRESET: process.env.CLOUD_UPLOAD_PRESET,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  },
}

module.exports = nextConfig
