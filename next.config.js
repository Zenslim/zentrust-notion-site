const path = require('path');

module.exports = {
  reactStrictMode: true,
  trailingSlash: false,
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};