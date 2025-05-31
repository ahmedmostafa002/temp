// Page for Random Email Generator

import type { Metadata } from 'next';
import type { FAQItem } from "@/types"; 

// Import components
import HeroSectionREG from "@/components/random-email-name-generator/HeroSectionREG"; // Import the new Hero section
import FeaturesSectionREG from "@/components/random-email-name-generator/FeaturesSectionREG"; // Import new Features section
import CtaSection from "@/components/home/CtaSection"; // May be adapted or kept
import EmailGeneratorForm from "@/components/random-email-name-generator/EmailGeneratorForm"; // Import the new form
import SeoContentSectionREG from "@/components/random-email-name-generator/SeoContentSectionREG"; // Import new SEO Content section
import FaqSectionREG from "@/components/random-email-name-generator/FaqSectionREG"; // Re-adding dedicated FAQ section

// const faqItemsData: FAQItem[] = [ ... ]; // REMOVED as FaqSectionREG has its own data

export const metadata: Metadata = {
  title: 'Free Random Email Name Generator | My Temps Mail',
  description: 'Instantly generate unique and creative random email names with our free AI-powered tool. Get professional email name suggestions for Gmail, Outlook, Yahoo, and more. Perfect for creating new accounts or branding.',
  keywords: ['random email name generator', 'email name generator', 'ai email name generator', 'free email name generator', 'username generator', 'email address ideas', 'creative email names', 'professional email names'],
  openGraph: {
    title: 'Free Random Email Name Generator | My Temps Mail',
    description: 'Instantly generate unique and creative random email names with our free AI-powered tool. Get professional email name suggestions for Gmail, Outlook, Yahoo, and more.',
    url: '/random-email-name-generator', // Updated URL
    siteName: 'My Temps Mail', // Or your site name
    images: [
      {
        url: '/og-image.jpg', // Replace with a specific OG image for this tool
        width: 1200,
        height: 630,
        alt: 'Random Email Name Generator', // Updated alt
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Random Email Name Generator | My Temps Mail',
    description: 'Instantly generate unique and creative random email names with our free AI-powered tool.',
    // images: ['/og-image.png'], // Replace with a specific OG image for this tool
  },
  alternates: {
    canonical: '/random-email-name-generator', // Updated URL
  },
};

export default async function RandomEmailNameGeneratorPage() { // Renamed function for clarity
  // No blog posts needed for this page
  // const sanityBlogPosts: SanityBlogPost[] = await getBlogPostsForHome(); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      
      <HeroSectionREG />

      {/* Section for the Email Generator Form */}
      <div id="email-generator-section" className="bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-gray-800 dark:to-indigo-900 py-12 md:py-16 scroll-mt-20">
        <div className="container mx-auto px-4">
          <EmailGeneratorForm />
        </div>
      </div>
      
      <FeaturesSectionREG /> {/* Adding new Features section */}
      
      <SeoContentSectionREG />
      
      <FaqSectionREG /> {/* Re-adding dedicated FAQ section */}
      
      {/* CtaSection can be kept or adapted */}
      <CtaSection />
    </div>
  );
}
