import { MetadataRoute } from 'next';
import { SITE } from './lib/site';
import { practiceAreas } from './lib/practice-areas';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;
  const languages = ['en', 'ko'];
  
  const staticPaths = [
    '',
    '/about',
    '/accessibility',
    '/contact',
    '/message',
    '/privacy',
    '/cookie-policy',
    '/reviews',
    '/services',
    '/terms',
    '/insights',
    '/insights/ai-contracts',
    '/insights/ai-in-entertainment',
    '/insights/ai-law',
    '/insights/chain-of-title',
    '/insights/contract-red-flags',
    '/insights/nil-basics',
    '/insights/publicity-basics',
  ];

  const practiceAreaPaths = practiceAreas.map((a) => `/services/${a.slug}`);
  const allPaths = [...staticPaths, ...practiceAreaPaths];

  const routes: MetadataRoute.Sitemap = [];

  for (const path of allPaths) {
    for (const lng of languages) {
      routes.push({
        url: `${baseUrl}/${lng}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : 0.8,
      });
    }
  }

  return routes;
}
