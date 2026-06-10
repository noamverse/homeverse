/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/featured',
        destination: '/family',
        permanent: true,
      },
      {
        source: '/profiles',
        destination: '/family',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
