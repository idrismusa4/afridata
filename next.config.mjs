/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Add configuration to handle pdf-parse as an external dependency for server builds
    if (isServer) {
      config.externals.push('pdf-parse');
    }

    return config;
  },
}

export default nextConfig
