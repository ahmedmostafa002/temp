"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RecentPostsSidebar from './RecentPostsSidebar';
import type { SanityBlogPost } from '@/types';

interface PostSidebarProps {
  recentPosts: Pick<SanityBlogPost, '_id' | 'title' | 'slug' | 'publishedAt' | 'mainImage'>[];
}

export default function PostSidebar({ recentPosts }: PostSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <aside className="lg:w-1/3 mt-12 lg:mt-0">
      <div className="sticky top-24 space-y-8">
        {/* Search Form */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Search</h3>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
            {/* Optionally, add a submit button if desired, or rely on Enter key */}
            {/* <button type="submit" className="mt-2 w-full ...">Search</button> */}
          </form>
        </div>

        {/* Recent Posts */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700">
          <RecentPostsSidebar posts={recentPosts} />
        </div>

        {/* CTA Section */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700 text-center">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Try Our Tool!</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Need a quick, disposable email?
          </p>
          <Link href="/#email-client-section" legacyBehavior>
            <a className="inline-block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Get Your Free Temp Gmail
            </a>
          </Link>
        </div>
      </div>
    </aside>
  );
}
