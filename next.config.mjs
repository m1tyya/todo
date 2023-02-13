/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		fontLoaders: [
			{ loader: '@next/font/google', options: { subsets: ['latin'] } },
		],
	},
	reactStrictMode: true,
	swcMinify: true,
};

export default nextConfig;