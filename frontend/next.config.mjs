/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
