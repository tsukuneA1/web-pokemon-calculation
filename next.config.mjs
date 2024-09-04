import withSitemap from 'next-sitemap';
import { generateRobotsTxt, siteUrl } from './next-sitemap.config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

const sitemapConfig = {
  siteUrl: 'pokemon-calculation-sv.vercel.app',
  generateRobotsTxt: true
}

export default withSitemap(nextConfig, sitemapConfig);
