import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Admins can paste any image URL in the CMS, so allow any https host.
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
};

export default withNextIntl(nextConfig);
