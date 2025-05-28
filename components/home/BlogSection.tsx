import Link from "next/link";
import { Card, CardBody, Button } from "@nextui-org/react"; // Removed NextUI Image
import Image from "next/image"; // Using next/image
import { ArrowRight } from "lucide-react";
import type { SanityBlogPost } from "@/types";
import { urlFor } from "@/lib/sanity.client"; // Import urlFor

// Helper function to format date (e.g., YYYY-MM-DD)
const formatDate = (dateString?: string): string => {
  if (!dateString) {
    return "Date N/A"; // Return a placeholder if dateString is undefined
  }
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toISOString().split("T")[0];
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return "Date Error"; // Return an error placeholder
  }
};

interface BlogSectionProps {
  blogPosts: SanityBlogPost[]; // Changed to SanityBlogPost
}

export default function BlogSection({ blogPosts }: BlogSectionProps) {
  if (!blogPosts || blogPosts.length === 0) {
    return (
      <section id="blog" className="py-16 bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-gray-800 dark:to-indigo-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Latest Blog Posts</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            No blog posts available at the moment. Please check back later!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-16 bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-gray-800 dark:to-indigo-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white inline-block">Latest Blog Posts</h2>
          <div className="w-32 h-1 bg-blue-600 mx-auto mt-2 mb-4"></div> {/* Underline */}
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Learn more about temporary Gmail accounts, email privacy, and testing best practices.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => {
            const imageUrl = post.mainImage?.asset ? urlFor(post.mainImage).width(400).height(225).quality(80).url() : null;
            // console.log(`Post: ${post.title}, Image URL: ${imageUrl}, MainImage Data:`, post.mainImage); // Debug log
            return (
              <Card key={post._id} className="h-full flex flex-col overflow-hidden">
                <div className="relative w-full h-[200px]"> {/* Wrapper for next/image */}
                  {imageUrl ? (
                    <Image
                      alt={post.mainImage?.alt || post.title || "Blog post image"}
                      className="object-cover" // layout="fill" will handle sizing
                      src={imageUrl}
                      fill // Replaces layout="fill" in newer Next.js
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <p className="text-gray-500 text-sm">No image</p>
                    </div>
                  )}
                </div>
                <CardBody className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2 flex-grow-0">{post.title || "Untitled Post"}</h3> {/* flex-grow-0 */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">{post.excerpt || "No excerpt available."}</p>
                  <div className="mt-auto"> {/* Push button to bottom */}
                    <Button
                      as={Link}
                      href={post.slug?.current ? `/blog/${post.slug.current}` : '#'}
                      color="primary"
                      variant="flat"
                      size="sm"
                      endContent={<ArrowRight className="h-4 w-4" />}
                    >
                      Read More
                    </Button>
                  </div>
                </CardBody>
              </Card>
            );
          })}
      </div>

      <div className="text-center mt-12">
          <Button
            as={Link}
            href="/blog"
            color="primary"
            variant="solid" // Changed from bordered to solid for more prominence
            size="lg"
            className="shadow-lg hover:shadow-xl transition-shadow" // Added shadow for better UI
            endContent={<ArrowRight className="h-5 w-5" />}
          >
            View All Blog Posts
          </Button>
        </div>
      </div>
    </section>
  );
}
