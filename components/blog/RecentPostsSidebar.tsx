import Link from 'next/link';
import type { SanityBlogPost } from '@/types';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity.client';

interface RecentPostsSidebarProps {
  posts: Pick<SanityBlogPost, '_id' | 'title' | 'slug' | 'publishedAt' | 'mainImage'>[];
}

export default function RecentPostsSidebar({ posts }: RecentPostsSidebarProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Posts</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">No recent posts to display.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Posts</h3>
      <ul className="space-y-4"> {/* Increased spacing for image */}
        {posts.map((post) => {
          const imageUrl = post.mainImage?.asset ? urlFor(post.mainImage).width(80).height(60).quality(75).url() : null;
          return (
            <li key={post._id}>
              <Link href={`/blog/${post.slug?.current || ''}`} className="flex items-center gap-3 group">
                {imageUrl && (
                  <div className="relative w-20 h-[60px] flex-shrink-0 rounded overflow-hidden"> {/* Corrected height */}
                    <Image
                      src={imageUrl}
                      alt={post.mainImage?.alt || post.title || 'Recent post image'}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="80px"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title || 'Untitled Post'}
                  </h4>
                  {/* Optionally, add date here if needed */}
                  {/* <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(post.publishedAt)}</span> */}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
