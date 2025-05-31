import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { SanityBlogPost } from "@/types";
import { getPaginatedBlogPosts, getPostsTotalCount } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import { Chip } from "@nextui-org/react"; // Assuming Chip is still used for tags if fetched
import { Calendar, Clock } from "lucide-react"; // Icons for date/read time
import { formatDate } from '@/lib/utils'; // Added import

const POSTS_PER_PAGE = 9; // Display 9 posts per page (3x3 grid)

// Removed local formatDate function

export const dynamic = 'force-dynamic'; // Add this line to force dynamic rendering

export const metadata: Metadata = {
  title: "Blog | Insights on Free Temporary Gmail Accounts with Inbox - My Temps Mail",
  description: "Explore articles, guides, and tips from My Temps Mail on using free temporary Gmail accounts with inbox, temp mail for privacy, disposable email strategies, and online security.",
  keywords: "temp gmail blog, free temporary gmail account articles, disposable email tips, privacy guides, my temps mail blog",
  openGraph: {
    title: "Blog | Insights on Free Temporary Gmail Accounts with Inbox - My Temps Mail",
    description: "Explore articles and guides from My Temps Mail on free temporary Gmail accounts, privacy, and more.",
    url: "https://mytempsmail.com/blog",
  },
  twitter: {
    title: "Blog | Insights on Free Temporary Gmail Accounts with Inbox - My Temps Mail",
    description: "Explore articles and guides from My Temps Mail on free temporary Gmail accounts, privacy, and more.",
  },
  alternates: {
    canonical: "https://mytempsmail.com/blog",
  },
};

interface BlogPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
    page?: string
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = parseInt(searchParams?.page || "1", 10); // Added optional chaining for searchParams
  const pageIndex = currentPage - 1; // 0-indexed for query

  const [posts, totalPosts] = await Promise.all([
    getPaginatedBlogPosts(pageIndex, POSTS_PER_PAGE),
    getPostsTotalCount()
  ]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Temps Mail Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Expert insights, guides, and tips about temporary email accounts, email privacy, and best practices.
          </p>
        </header>

        {posts && posts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {posts.map((post) => {
                const imageUrl = post.mainImage?.asset ? urlFor(post.mainImage).width(400).height(225).quality(80).url() : null;
                // Assuming readTime might not be directly available from this query, can be added or estimated
                // const readTimeEstimate = post.body ? Math.ceil(JSON.stringify(post.body).length / 1500) + " min read" : "N/A";

                return (
                  <div key={post._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl">
                    {imageUrl && (
                      <Link href={`/blog/${post.slug?.current || ''}`} className="block aspect-[16/9] relative overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={post.mainImage?.alt || post.title || "Blog post image"}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </Link>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {post.publishedAt && (
                          <>
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </>
                        )}
                        {/* {post.body && ( // Placeholder for read time if available/calculated
                          <>
                            <span className="mx-1">•</span>
                            <Clock className="h-3.5 w-3.5" />
                            <span>{readTimeEstimate}</span>
                          </>
                        )} */}
                      </div>
                      <h2 className="text-xl font-semibold mb-3 line-clamp-2 text-gray-900 dark:text-white">
                        <Link href={`/blog/${post.slug?.current || ''}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {post.title || "Untitled Post"}
                        </Link>
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow text-sm">
                        {post.excerpt || "No excerpt available."}
                      </p>
                      {/* {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.categories.slice(0, 3).map((category) => ( // Show max 3 categories
                            category && typeof category !== 'string' && category.title && ( // Check if category is expanded
                              <Chip key={category._id} size="sm" variant="flat" color="secondary" className="text-xs">
                                {category.title}
                              </Chip>
                            )
                          ))}
                        </div>
                      )} */}
                      <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                        <Link href={`/blog/${post.slug?.current || ''}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm">
                          Read Full Article &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center space-x-2">
                {currentPage > 1 && (
                  <Link href={`/blog?page=${currentPage - 1}`}
                     className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                    Previous
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link key={page} href={`/blog?page=${page}`}
                     className={`px-4 py-2 text-sm font-medium border rounded-md ${
                       currentPage === page
                         ? "bg-blue-600 text-white border-blue-600"
                         : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                     }`}>
                    {page}
                  </Link>
                ))}
                {currentPage < totalPages && (
                  <Link href={`/blog?page=${currentPage + 1}`}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                    Next
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No blog posts available at the moment. Please check back later!
            </p>
          </div>
        )}
        
      </div>
    </div>
  );
}
