/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['advsanjayjain.in'],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [320, 640, 768, 1024, 1366, 1600],
    },
    compress: true,
    poweredByHeader: false,
    headers: async () => [
        {
            source: '/:all*(svg|jpg|png)',
            locale: false,
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=31536000, immutable',
                },
            ],
        },
    ],
};

module.exports = nextConfig; 