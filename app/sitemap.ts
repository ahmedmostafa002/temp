import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity.client'; 
// Removed SanityBlogPost import to avoid issues if _updatedAt is not on it.
// We'll use a more generic type for fetched posts within this file.

const BASE_URL = 'https://mytempsmail.com';

interface SitemapPost {
  slug?: { current?: string }; // slug is an object with current property
  publishedAt?: string;
  _updatedAt?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/random-email-name-generator`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date().toISOString(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/faq`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date().toISOString(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date().toISOString(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/blog`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
  ];

  // Dynamic pages (blog posts)
  let blogPostUrls: MetadataRoute.Sitemap = [];
  try {
    // Fetch only necessary fields for the sitemap
    const postsQuery = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
      "slug": slug.current, 
      "publishedAt": publishedAt,
      "_updatedAt": _updatedAt 
    }`;
    // Use a local type for fetched posts to avoid conflicts with global SanityBlogPost if it's not perfectly aligned
    const posts: SitemapPost[] = await client.fetch(postsQuery);
    
    blogPostUrls = posts.map((post) => {
      const postSlug = post.slug?.current;
      if (!postSlug) return null; // Skip if slug is somehow missing

      let lastModDate: string | Date = new Date().toISOString(); // Default to now
      if (post._updatedAt) {
        lastModDate = new Date(post._updatedAt).toISOString();
      } else if (post.publishedAt) {
        lastModDate = new Date(post.publishedAt).toISOString();
      }

      return {
        url: `${BASE_URL}/blog/${postSlug}`,
        lastModified: lastModDate,
        changeFrequency: 'monthly' as 'monthly', // Explicitly cast to literal type
        priority: 0.8,
      };
    }).filter(Boolean) as MetadataRoute.Sitemap; // Filter out nulls and cast

  } catch (error) {
    // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
    console.error("Error fetching blog posts for sitemap:", error);
  }

  return [
    ...staticPages,
    ...blogPostUrls,
  ];
}
