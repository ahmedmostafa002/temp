import Link from 'next/link';
import Image from 'next/image';
import type { SanityBlogPost } from '@/types'; // Assuming SanityBlogPost includes excerpt, mainImage, etc.
import { urlFor } from '@/lib/sanity.client';
import { formatDate } from '@/lib/utils'; // Added import

// Removed local formatDate function

interface RelatedPostsSectionProps {
  posts: Pick<SanityBlogPost, '_id' | 'title' | 'slug' | 'mainImage' | 'excerpt' | 'publishedAt'>[];
  title?: string;
}

export default function RelatedPostsSection({ posts, title = "Related Posts" }: RelatedPostsSectionProps) {
  if (!posts || posts.length === 0) {
    return null; // Don't render anything if no related posts
  }

  return (
    <div className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-700">
      <div className="text-center mb-12"> {/* Wrapper for centering */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white inline-block"> {/* Adjusted classes */}
          {title}
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-2"></div> {/* Underline element */}
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug?.current || ''}`} className="group block p-4 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-md border dark:border-gray-200 dark:border-gray-700">
            {post.mainImage?.asset && (
              <div className="relative w-full aspect-[16/9] rounded overflow-hidden mb-3">
                <Image
                  src={urlFor(post.mainImage).width(300).height(168).quality(75).url()}
                  alt={post.mainImage.alt || post.title || ''}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 30vw, 250px"
                />
              </div>
            )}
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
              {post.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {post.excerpt}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">{formatDate(post.publishedAt)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
