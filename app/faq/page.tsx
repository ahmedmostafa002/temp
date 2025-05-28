import { Metadata } from "next";
import FaqSection from "@/components/home/FaqSection"; // Re-use the client component for interactivity
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "FAQ | Free Temporary Gmail Account with Inbox - My Temps Mail",
  description: "Get answers to frequently asked questions about using a free temporary Gmail account with inbox from My Temps Mail, including temp Gmail features, privacy, and usage.",
  openGraph: {
    title: "FAQ | Free Temporary Gmail Account with Inbox - My Temps Mail",
    description: "Find answers to common questions about our free temporary Gmail account with inbox service.",
    url: 'https://mytempsmail.com/faq',
  },
  twitter: {
    title: "FAQ | Free Temporary Gmail Account with Inbox - My Temps Mail",
    description: "Find answers to common questions about our free temporary Gmail account with inbox service.",
  },
  alternates: {
    canonical: "https://mytempsmail.com/faq",
  },
};

// Hardcoded FAQ data (same as used in FaqSection on homepage)
// This could also be fetched from Sanity if FAQs were managed there
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

import Link from "next/link"; // Added Link import

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <header className="mb-10 text-center max-w-3xl mx-auto">
          {/* The FaqSection component will render its own H2 title "Frequently Asked Questions" */}
          {/* We can add a more general page intro here if needed, or let FaqSection handle it. */}
          {/* For now, FaqSection's title should suffice as the main page heading. */}
        </header>
        
        <FaqSection faqItems={faqItemsData} />

        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Can't find the answer you're looking for?
          </p>
          <Link href="/contact" className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md">
            Contact Our Support Team
          </Link>
        </div>
      </div>
    </div>
  );
}
