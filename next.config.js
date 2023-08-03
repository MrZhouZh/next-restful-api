/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATA_API_KEY: process.env.DATA_API_KEY,
    API_URL: process.env.API_URL,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/MrZhouZh/test-blogposts/main/images/**'
      }
    ]
  }
}

module.exports = nextConfig
