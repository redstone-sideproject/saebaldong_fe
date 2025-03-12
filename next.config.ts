import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        pathname: '/**',
        hostname: 'nng-phinf.pstatic.net',
      },
      {
        protocol: 'https',
        pathname: '/**',
        hostname: 'yt3.googleusercontent.com',
      },
    ],
  },
}

export default nextConfig
