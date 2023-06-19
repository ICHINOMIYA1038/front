/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const hotReload = {
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    }
    return config
  },
}

module.exports = hotReload
