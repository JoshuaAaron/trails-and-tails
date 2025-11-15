/** @type {import('next').NextConfig} */
const nextConfig = {
  // Make Google Maps API key available to the client
  env: {
    GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
  
  // Enable optimized images for map markers if needed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      },
      {
        protocol: 'https', 
        hostname: 'maps.gstatic.com',
      },
    ],
  },
};

export default nextConfig;