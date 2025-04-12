/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/signin',
        destination: '/signin',
      },
    ];
  },

  // Optional but helpful:
  // Ensures consistent URL behavior
  trailingSlash: false,
};

module.exports = nextConfig;
