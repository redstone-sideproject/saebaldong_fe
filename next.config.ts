import type { NextConfig } from 'next'

// const isDev = process.env.NODE_ENV === 'development'

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
        hostname: 'profile.img.sooplive.co.kr',
      },
    ],
  },

  // // 개발환경을 위한 것
  // rewrites: async () => {
  //   if (isDev) {
  //     return [
  //       {
  //         source: '/:path*',
  //         destination: 'http://localhost:8000/:path*',
  //       },
  //     ]
  //   }
  //   return []
  // },
}

export default nextConfig
