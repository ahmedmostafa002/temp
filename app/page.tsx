// Removed "use client" to make this a Server Component by default

import type { SanityBlogPost, FAQItem } from "@/types"; // Changed BlogPost to SanityBlogPost
import { getBlogPostsForHome } from "@/lib/sanity.queries"; // Import Sanity fetch function

// Import new components
import HeroIntro from "@/components/home/HeroIntro";
import EmailClient from "@/components/home/EmailClient"; // This is a Client Component
import FeaturesSection from "@/components/home/FeaturesSection";
import SeoContentSection from "@/components/home/SeoContentSection"; // Added SEO Section
import BlogSection from "@/components/home/BlogSection";
import FaqSection from "@/components/home/FaqSection"; // This is a Client Component
import CtaSection from "@/components/home/CtaSection";

// Hardcoded FAQ data remains, blog data will be fetched
const faqItemsData: FAQItem[] = [
  {
    id: "1",
    question: "What is a temporary Gmail account with inbox free?",
    answer:
      "A temporary Gmail account is a disposable email address that provides full inbox functionality for a limited time. Our free temp Gmail account service generates real Gmail addresses that can receive emails, view attachments, and function like regular Gmail accounts, but automatically expire after 10 minutes for privacy protection.",
  },
  {
    id: "2",
    question: "How long does the temp Gmail account free service last?",
    answer:
      "Each temporary Gmail account generated through our service lasts for 10 minutes. This provides enough time for email verification, testing, or receiving important messages while ensuring your privacy is protected through automatic expiration.",
  },
  {
    id: "3",
    question: "Is the temporary Gmail account with inbox really free?",
    answer:
      "Yes, our temporary Gmail generator is completely free to use. There are no hidden fees, subscriptions, or premium features. You can generate unlimited temp Gmail accounts with full inbox access at no cost.",
  },
  {
    id: "4",
    question: "Can I receive emails in the temporary Gmail inbox?",
    answer:
      "Our temp Gmail account free service provides full inbox functionality. You can receive emails, read messages, view HTML content, and download attachments just like a regular Gmail account. The inbox automatically refreshes every 30 seconds to show new messages.",
  },
  {
    id: "5",
    question: "What can I use temporary Gmail accounts for?",
    answer:
      "Temporary Gmail accounts are perfect for email verification during sign-ups, testing email functionality in applications, protecting your privacy when registering for services, avoiding spam in your main inbox, and any situation where you need a disposable email address with full functionality.",
  },
  {
    id: "6",
    question: "Are temporary Gmail accounts secure and private?",
    answer:
      "Yes, our temporary Gmail service prioritizes security and privacy. No personal information is required to generate accounts, all data is automatically deleted when accounts expire, and we don't store or track any email content. The service is designed for maximum privacy protection.",
  },
  {
    id: "7",
    question: "Can I extend the temporary Gmail account duration?",
    answer:
      "Currently, temporary Gmail accounts have a fixed 10-minute duration and cannot be extended. This ensures optimal privacy and security. If you need a longer-lasting email address, you can generate a new temporary Gmail account at any time for free.",
  },
  {
    id: "8",
    question: "Do temporary Gmail accounts work with all websites and services?",
    answer:
      "Yes, our temporary Gmail accounts are real Gmail addresses that work with virtually all websites, services, and platforms that accept Gmail registrations. They function identically to regular Gmail accounts during their active period.",
  },
];

export default async function HomePage() { // Made HomePage async
  const sanityBlogPosts: SanityBlogPost[] = await getBlogPostsForHome();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      
      {/* HeroIntro is a Server Component, EmailClient is a Client Component */}
      <HeroIntro />

      {/* EmailClient Section with full-width background */}
      <div id="email-client-section" className="bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-gray-800 dark:to-indigo-900 py-12 md:py-16 scroll-mt-20"> {/* Added ID and scroll-mt */}
        <div className="container mx-auto px-4">
          <EmailClient />
        </div>
      </div>
      
      <FeaturesSection />
      <SeoContentSection />
      <BlogSection blogPosts={sanityBlogPosts} /> {/* Pass fetched Sanity posts */}
      <FaqSection faqItems={faqItemsData} /> {/* FaqSection is a Client Component */}
      <CtaSection />
    </div>
  );
}
