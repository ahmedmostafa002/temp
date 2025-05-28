import { getPostBySlug, getRelatedPosts, getRecentPostsSidebar } from '@/lib/sanity.queries'; // Added getRecentPostsSidebar
import { urlFor } from '@/lib/sanity.client';
import type { SanityBlogPost } from '@/types';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import RelatedPostsSection from '@/components/blog/RelatedPostsSection';
// import RecentPostsSidebar from '@/components/blog/RecentPostsSidebar'; // No longer directly used here
import PostSidebar from '@/components/blog/PostSidebar'; // Import the new sidebar component
import { formatDate } from '@/lib/utils'; // Added import

interface PostPageProps {
  params: any; // Changed to any to bypass build error
}

// Removed local formatDate function

export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | My Temps Mail Blog',
      description: 'The blog post you are looking for could not be found on My Temps Mail, your source for free temporary Gmail accounts with inbox.',
    };
  }

  const previousImages = (await parent).openGraph?.images || []

  const siteName = "My Temps Mail";
  const defaultTitle = `${post.title || 'Blog Post'} | ${siteName}`;
  const defaultDescription = post.excerpt || `Read the latest article from ${siteName} on topics related to free temporary Gmail accounts with inbox and online privacy.`;

  let ogAuthors: string[] = [];
  // Type guard to ensure author is the expanded object and has a name
  if (post.author && post.author._type === 'author' && typeof post.author.name === 'string') {
    ogAuthors = [post.author.name];
  }

  return {
    title: post.metaTitle || defaultTitle,
    description: post.metaDescription || defaultDescription,
    openGraph: {
      title: post.metaTitle || defaultTitle,
      description: post.metaDescription || defaultDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ogAuthors,
      images: post.openGraphImage?.asset
        ? [urlFor(post.openGraphImage).width(1200).height(630).url(), ...previousImages]
        : post.mainImage?.asset 
          ? [urlFor(post.mainImage).width(1200).height(630).url(), ...previousImages]
          : [...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || defaultTitle,
      description: post.metaDescription || defaultDescription,
      images: post.openGraphImage?.asset
        ? [urlFor(post.openGraphImage).width(1200).height(630).url()]
        : post.mainImage?.asset
          ? [urlFor(post.mainImage).width(1200).height(630).url()]
          : undefined, // Use parent images if none specific
    },
    alternates: {
        canonical: `/blog/${post.slug?.current || ''}`,
    }
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post: SanityBlogPost | null = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound(); // Triggers 404 page
  }
  
  // Fetch related posts (pass current post's slug to exclude it)
  const relatedPostsData: SanityBlogPost[] = await getRelatedPosts(params.slug); // Renamed for clarity
  const recentPostsSidebar: Pick<SanityBlogPost, '_id' | 'title' | 'slug' | 'publishedAt'>[] = await getRecentPostsSidebar(params.slug); // Pass current slug

  const mainImageUrl = post.mainImage?.asset ? urlFor(post.mainImage).url() : null;

  const finalBreadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" }, // Changed to /blog
    { label: post.title || "Post" }, // Current page, no href
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title || "",
    "description": post.metaDescription || post.excerpt || "",
    "image": mainImageUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mytempsmail.com'}/og-image.jpg`, // Fallback OG image
    "datePublished": post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString(),
    "dateModified": (post as any)._updatedAt ? new Date((post as any)._updatedAt).toISOString() : (post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString()),
    "author": (post.author && post.author._type === 'author' && post.author.name) ? {
      "@type": "Person",
      "name": post.author.name,
    } : {
      "@type": "Organization",
      "name": "My Temps Mail",
    },
    "publisher": {
      "@type": "Organization",
      "name": "My Temps Mail",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mytempsmail.com'}/mytempsmaillogo.svg`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mytempsmail.com'}/blog/${post.slug?.current || ''}`,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 md:py-12">
      {/* Article Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container mx-auto px-4">
        <div className="lg:flex lg:gap-x-8 xl:gap-x-12">
          {/* Main Content Area */}
          <div className="lg:w-2/3 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg">
            <Breadcrumbs items={finalBreadcrumbItems} className="mb-4 md:mb-6" />
            <article className="prose prose-lg dark:prose-invert max-w-none"> {/* max-w-none to use parent's width */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                {post.title || 'Untitled Post'}
              </h1>
              
              <div className="text-gray-600 dark:text-gray-400 mb-6 text-sm"> {/* Reverted text-center from heading change */}
                <span>Published on {formatDate(post.publishedAt)}</span>
                {post.author && post.author._type === 'author' && post.author.name && (
                  <span> by <Link href={`/author/${post.author.slug?.current || ''}`} className="text-blue-600 hover:underline">{post.author.name}</Link></span>
                )}
              </div>

              {mainImageUrl && post.mainImage?.asset && (
                <div className="mb-8 relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={mainImageUrl}
                    alt={post.mainImage.alt || post.title || 'Blog post image'}
                    fill
                    className="object-cover" // Removed rounded-lg shadow-md from here, added to wrapper
                    priority 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px" // Adjusted sizes
                  />
                </div>
              )}

              {post.body ? (
                <div className="portable-text-content">
                  <PortableText value={post.body} />
                </div>
              ) : (
                <p>This post has no content.</p>
              )}

              {/* "Back to Blog" link removed */}
            </article>
          </div>

          {/* Sidebar Area */}
          <PostSidebar recentPosts={recentPostsSidebar} />
        </div>

        {/* Related Posts Section (using the new component) */}
        <RelatedPostsSection posts={relatedPostsData} title="Related Posts" />
      </div>
    </div>
  );
}
