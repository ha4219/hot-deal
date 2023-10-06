/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO remove
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["image.fmkorea.com"],
  },
};

module.exports = nextConfig;
