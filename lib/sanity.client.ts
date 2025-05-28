import { createClient, type SanityClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true';
// SANITY_API_READ_TOKEN is not typically used directly in the client for public data,
// but might be used for previews or server-side fetching of private data.
// For now, the client will be configured for public read access.

if (!projectId) {
  throw new Error("The Sanity Project ID is not set. Check your .env file.");
}
if (!dataset) {
  throw new Error("The Sanity Dataset is not set. Check your .env file.");
}
if (!apiVersion) {
  throw new Error("The Sanity API Version is not set. Check your .env file.");
}

export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn, // if you're using ISR or only static generation at build time, then it's "true"
  // token: process.env.SANITY_API_READ_TOKEN, // Only if you need to authenticate for fetching
  // perspective: 'published', // 'published' 'previewDrafts' 'raw'
});

// Helper function for generating Image URLs with only the asset reference data in your documents.
// Read more: https://www.sanity.io/docs/image-url
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Example usage for fetching data (you'll adapt this for your blog posts)
// export async function getPosts() {
//   const posts = await client.fetch('*[_type == "post"]');
//   return posts;
// }
