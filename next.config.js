/** @type {import('next').NextConfig} */

module.exports = {
  pageExtensions: ['jsx'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
        tls: false,
        net: false,
        dns: false,
        module: false,
        async_hooks: false,
      }
    }

    return config
  },
  images: {
    remotePatterns: [
      {
        hostname: 's.gravatar.com',
      },
      {
        hostname: 'localhost',
      },
    ],
    domains: ['s3.ap-northeast-1.amazonaws.com'],
    unoptimized: true,
  },
}
