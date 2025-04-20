const path = require('path');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false, // ✅ Force-enable even during Vercel builds
});

module.exports = withPWA({
  reactStrictMode: true,
  trailingSlash: false,
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
});
