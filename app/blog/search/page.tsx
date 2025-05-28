import { SanityBlogPost } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.client";
import { searchBlogPosts } from "@/lib/sanity.queries"; 
import { Metadata } from "next";
import { Suspense } from 'react';
import { formatDate } from '@/lib/utils'; // Added import

// Removed local formatDate function

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || "";
  const siteName = "My Temps Mail";
  const baseTitle = `Blog Search | Free Temporary Gmail Account with Inbox - ${siteName}`;
  const querySpecificTitle = query ? `Search Results for "${query}" | ${siteName}` : baseTitle;
  const defaultDescription = `Search articles on ${siteName} related to free temporary Gmail accounts with inbox, temp mail, and online privacy.`;
  const querySpecificDescription = query ? `Find blog posts about "${query}" and free temporary Gmail accounts with inbox on ${siteName}.` : defaultDescription;

  return {
    title: querySpecificTitle,
    description: querySpecificDescription,
    robots: {
      index: false, // Search result pages are generally not indexed
      follow: true,
    },
    openGraph: {
      title: querySpecificTitle,
      description: querySpecificDescription,
      url: `/blog/search${query ? `?q=${encodeURIComponent(query)}` : ''}`,
    },
    twitter: {
      title: querySpecificTitle,
      description: querySpecificDescription,
    },
    alternates: {
      canonical: `/blog/search${query ? `?q=${encodeURIComponent(query)}` : ''}`,
    }
  };
}

async function SearchResults({ query }: { query: string }) {
  const posts: SanityBlogPost[] = await searchBlogPosts(query);

  if (!posts.length) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600 dark:text-gray-300">
          No posts found matching your search for "{query}".
        </p>
        <Link href="/blog" className="mt-4 inline-block text-blue-600 hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => {
        const imageUrl = post.mainImage?.asset ? urlFor(post.mainImage).width(400).height(225).quality(80).url() : null;
        return (
          <div key={post._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
            {imageUrl && (
              <Link href={`/blog/${post.slug?.current || ''}`} className="block">
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={imageUrl}
                    alt={post.mainImage?.alt || post.title || "Blog post image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </Link>
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                <Link href={`/blog/${post.slug?.current || ''}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                  {post.title || "Untitled Post"}
                </Link>
              </h2>
              {post.publishedAt && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {formatDate(post.publishedAt)}
                </p>
              )}
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                {post.excerpt || "No excerpt available."}
              </p>
              <div className="mt-auto">
                <Link href={`/blog/${post.slug?.current || ''}`} className="text-blue-600 hover:underline font-medium">
                  Read More &rarr;
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function BlogSearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {query ? `Search Results for "${query}"` : "Search Our Blog"}
          </h1>
          {!query && (
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              Enter a term above to search our articles.
            </p>
          )}
        </header>
        
        {/* Search input can be added here if desired for this page itself, or rely on sidebar */}

        <Suspense fallback={<div className="text-center py-10">Loading search results...</div>}>
          {query ? <SearchResults query={query} /> : null}
        </Suspense>
      </div>
    </div>
  );
}
