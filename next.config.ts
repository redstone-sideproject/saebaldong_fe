import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
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
        hostname: 'profile.img.sooplive.co.kr',
      },
    ],
  },
}

export default nextConfig
