/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      // Old Family URLs
      {
        source: "/featured",
        destination: "/family",
        permanent: true,
      },
      {
        source: "/featured/:slug",
        destination: "/family/:slug",
        permanent: true,
      },
      {
        source: "/profiles",
        destination: "/family",
        permanent: true,
      },

      // Retired Lobby and room URLs
      {
        source: "/lobby",
        destination: "/",
        permanent: true,
      },
      {
        source: "/belong",
        destination: "/",
        permanent: true,
      },
      {
        source: "/build",
        destination: "/",
        permanent: true,
      },
      {
        source: "/bring",
        destination: "/",
        permanent: true,
      },
      {
        source: "/seed",
        destination: "/",
        permanent: true,
      },
      {
        source: "/partner",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
