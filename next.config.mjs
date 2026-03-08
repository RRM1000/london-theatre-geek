/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.londontheatre.co.uk',
            },
            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',
            }
        ],
    },
}

export default nextConfig;
