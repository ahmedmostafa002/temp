import { client } from "./sanity.client";
import type { SanityBlogPost } from "@/types";
import { groq } from "next-sanity";

// GROQ query to fetch all published blog posts, ordered by publication date
// Adjust "_type == 'post'" if your Sanity schema uses a different type name for blog posts.
export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage {
    asset->{
      _id,
      url
    },
    alt
  },
  excerpt,
  publishedAt,
  author->{
    _id,
    name,
    slug,
    image {asset->{_id, url}, alt}
  },
  categories[]->{
    _id,
    title,
    slug
  },
  metaTitle,
  metaDescription,
  openGraphImage {
    asset->{
      _id,
      url
    },
    alt
  }
  // body field is intentionally omitted for list views
}`;

// Function to fetch blog posts for the homepage blog section
// This will be used in Server Components, e.g., app/page.tsx
export async function getBlogPostsForHome(): Promise<SanityBlogPost[]> {
  // You might want to limit the number of posts for the homepage, e.g., by appending [0...2] to the query
  // For example: `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...2] { ... }`
  // For now, fetching all and assuming BlogSection.tsx might slice or handle display limit.
  if (client) {
    try {
      const posts = await client.fetch<SanityBlogPost[]>(postsQuery);
      return posts;
    } catch (error) {
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error("Failed to fetch blog posts from Sanity:", error);
      return []; // Return empty array on error
    }
  }
  return []; // Return empty array if client is not available (e.g., env vars missing)
}

// You might also want a query for a single post by slug:
// export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
//   ..., // include all fields
//   "body": body[]{ ..., asset-> } // example of expanding asset references in body
// }`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage {
    asset->{
      _id,
      url
    },
    alt
  },
  excerpt,
  publishedAt,
  author->{
    _id,
    name,
    slug,
    image {asset->{_id, url}, alt}
  },
  categories[]->{
    _id,
    title,
    slug
  },
  metaTitle,
  metaDescription,
  openGraphImage {
    asset->{
      _id,
      url
    },
    alt
  },
  body, // Fetch the full body for the single post page
  _updatedAt // Fetch the last update timestamp
}`;

export async function getPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  if (client) {
    try {
      const post = await client.fetch<SanityBlogPost | null>(postBySlugQuery, { slug });
      return post || null; // client.fetch might return null directly if not found
    } catch (error) {
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error(`Failed to fetch post by slug "${slug}" from Sanity:`, error);
      return null;
    }
  }
  return null;
}

// Query for related posts (e.g., 3 latest posts excluding the current one)
export const relatedPostsQuery = groq`*[_type == "post" && defined(slug.current) && slug.current != $currentSlug] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  mainImage {
    asset->{
      _id,
      url
    },
    alt
  },
  publishedAt,
  excerpt
}`;

export async function getRelatedPosts(currentSlug: string): Promise<SanityBlogPost[]> {
  if (client) {
    try {
      const posts = await client.fetch<SanityBlogPost[]>(relatedPostsQuery, { currentSlug });
      return posts;
    } catch (error) {
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error(`Failed to fetch related posts for slug "${currentSlug}" from Sanity:`, error);
      return [];
    }
  }
  return [];
}

// Query for recent posts for the sidebar (e.g., 5 latest posts, excluding current)
export const recentPostsSidebarQuery = groq`*[_type == "post" && defined(slug.current) && slug.current != $currentSlug] | order(publishedAt desc) [0...5] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage {
    asset->{
      _id,
      url
    },
    alt
  }
}`;

export async function getRecentPostsSidebar(currentSlug: string): Promise<Pick<SanityBlogPost, '_id' | 'title' | 'slug' | 'publishedAt' | 'mainImage'>[]> {
  if (client) {
    try {
      const posts = await client.fetch<Pick<SanityBlogPost, '_id' | 'title' | 'slug' | 'publishedAt' | 'mainImage'>[]>(recentPostsSidebarQuery, { currentSlug });
      return posts;
    } catch (error) {
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error(`Failed to fetch recent posts for sidebar (excluding ${currentSlug}) from Sanity:`, error);
      return [];
    }
  }
  return [];
}

// Query for fetching a paginated list of blog posts
export const paginatedPostsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [$start...$end] {
  _id,
  title,
  slug,
  mainImage {
    asset->{
      _id,
      url
    },
    alt
  },
  excerpt,
  publishedAt,
  author->{
    _id,
    name
  },
  categories[]->{
    _id,
    title
  }
  // metaTitle, metaDescription, openGraphImage can be added if needed for card previews
}`;

// Function to fetch paginated blog posts
export async function getPaginatedBlogPosts(pageIndex: number, pageSize: number): Promise<SanityBlogPost[]> {
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  if (client) {
    try {
      const posts = await client.fetch<SanityBlogPost[]>(paginatedPostsQuery, { start, end });
      return posts;
    } catch (error) {
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error(`Failed to fetch paginated blog posts (page ${pageIndex}) from Sanity:`, error);
      return [];
    }
  }
  return [];
}

// Query to get the total count of blog posts
export const postsTotalCountQuery = groq`count(*[_type == "post" && defined(slug.current)])`;

// Function to get the total count of blog posts
export async function getPostsTotalCount(): Promise<number> {
  if (client) {
    try {
      const count = await client.fetch<number>(postsTotalCountQuery);
      return count;
    } catch (error) {
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error("Failed to fetch total posts count from Sanity:", error);
      return 0;
    }
  }
  return 0;
}

// Query for searching blog posts
export const searchPostsQuery = groq`*[_type == "post" && defined(slug.current) && (
  title match $query + "*" ||
  excerpt match $query + "*" ||
  pt::text(body) match $query + "*" // Search in portable text
)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage {
    asset->{
      _id,
      url
    },
    alt
  },
  excerpt,
  publishedAt
  // author and categories can be added if needed for search results display
}`;

export async function searchBlogPosts(query: string): Promise<SanityBlogPost[]> {
  if (client && query) {
    try {
      const posts = await client.fetch<SanityBlogPost[]>(searchPostsQuery, { query: query } as any); // Using type assertion
      return posts;
    } catch (error) {
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error(`Failed to fetch search results for query "${query}" from Sanity:`, error);
      return [];
    }
  }
  return [];
}
