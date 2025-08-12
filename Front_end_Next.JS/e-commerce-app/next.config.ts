import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      
      },
       {
        protocol: 'http', 
        hostname: '127.0.0.1',
        port: '8008', 
      },
    ],
  },
};

export default nextConfig;
