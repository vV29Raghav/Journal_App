/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/:path*` : 'http://localhost:8080/:path*',
      },
    ]
  },
};

export default nextConfig;
