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
  {
    id: "9",
    question: "What is a temporary email address?",
    answer:
      "A temporary email address is a disposable, anonymous email address that automatically expires after a predetermined period. These addresses are designed for short-term use without requiring personal information or registration, making them ideal for protecting your primary email from spam and maintaining privacy online.",
  },
  {
    id: "10",
    question: "How long are emails kept?",
    answer:
      "The retention period varies significantly depending on the service provider: 10 minutes to a few hours: Most basic services like 10minutemail. 48 hours: Services like ThrowAwayMail and Maildrop. 8 days: YOPmail retains messages for up to 8 days. 3-5 hours of inactivity: Services like Internxt expire after periods of inactivity. Emails are automatically deleted when the temporary address expires, and you can manually delete them before expiration on most platforms.",
  },
  {
    id: "11",
    question: "How to create a temporary email address",
    answer:
      "Creating a temporary email is straightforward: Visit a temporary email service like Temp Mail, AdGuard Temp Mail, or 10minutemail Get an automatically generated address - most services provide one instantly upon visiting Copy the email address for use in registrations or verifications Use the address wherever you need a temporary email Check your inbox on the service's website for incoming messages. You can also create disposable addresses using Gmail by adding aliases with the '+' symbol or using different domain variations.",
  },
  {
    id: "12",
    question: "How do you keep my emails safe?",
    answer:
      "Temporary email services protect your privacy through several security measures: No personal information required: You don't need to provide real details to create an account. Automatic deletion: Emails are automatically removed after expiration, preventing long-term data storage. Spam protection: Acts as a barrier against phishing attempts and malicious emails. Anonymous access: Most services don't track or store user information. However, temporary emails should only be used for non-sensitive communications, as they typically don't offer encryption for highly confidential data.",
  },
  {
    id: "13",
    question: "How to use a temporary email address",
    answer:
      "Using temporary email is simple: Generate or obtain a temporary email address from a service Use it for registrations on websites you don't fully trust Sign up for trials or downloads without exposing your real email Receive verification emails and confirmation messages Access the inbox through the service's website to read messages Let it expire automatically or delete it manually when done.",
  },
  {
    id: "14",
    question: "How long will my disposable temporary email last?",
    answer:
      "The lifespan depends on the specific service: Minutes: 10minutemail lasts exactly 10 minutes. Hours: Most services last 2-3 hours. Days: Some premium services offer longer retention periods. Activity-based: Some expire after periods of inactivity rather than fixed time.",
  },
  {
    id: "15",
    question: "How does a temporary email protect you?",
    answer:
      "Temporary emails provide protection through: Identity shielding: Prevents websites from collecting your real email address. Spam prevention: Keeps unwanted marketing emails away from your primary inbox. Reduced tracking: Limits companies' ability to track your online activities across platforms. Breach protection: If a service is compromised, your real email remains safe.",
  },
  {
    id: "16",
    question: "Can I send emails from my temporary email address?",
    answer:
      "Most temporary email services are receive-only and don't support sending emails. However, some advanced services may offer limited sending capabilities. The primary purpose is to receive verification emails, confirmations, and temporary communications rather than ongoing correspondence.",
  },
  {
    id: "17",
    question: "Can my temporary inbox receive attachments?",
    answer:
      "Yes, most temporary email services can receive attachments, but with limitations: File size restrictions may apply Security scanning is often limited compared to regular email services Storage duration follows the same expiration rules as text emails Download capabilities vary by service provider Always exercise caution when downloading attachments from temporary emails, as security protections may be minimal.",
  },
  {
    id: "18",
    question: "Can you recover deleted emails?",
    answer:
      "No, emails in temporary accounts cannot be recovered once deleted or expired. This is by design - the temporary nature means: Automatic deletion is permanent No backup systems are typically in place No recovery options are available after expiration Manual deletion is also irreversible This permanent deletion is actually a privacy feature, ensuring your data doesn't persist longer than intended.",
  },
  {
    id: "19",
    question: "Why use a temporary email address?",
    answer:
      "Key benefits include: Privacy protection: Keep your real email address private. Spam reduction: Avoid cluttering your primary inbox Security enhancement: Reduce exposure to phishing and malicious emails Testing purposes: Useful for developers and testers Trial registrations: Sign up for services without long-term commitment Anonymous browsing: Maintain anonymity online.",
  },
  {
    id: "20",
    question: "When to use a temporary email address",
    answer:
      "Use temporary emails when: Signing up for trials or one-time services Downloading files that require email verification Registering on untrusted websites Accessing gated content temporarily Testing applications during development Avoiding long-term marketing communications.",
  },
  {
    id: "21",
    question: "Do you provide fake email addresses?",
    answer:
      "Temporary email services provide real, functional email addresses that can receive emails - they're not 'fake' in the sense of being non-functional. However, they are: Temporary and disposable by design Anonymous without personal identification Automatically generated rather than personally chosen Real addresses that work for receiving emails",
  },
  {
    id: "22",
    question: "Do emails stay private?",
    answer:
      "Privacy levels vary by service: Most reputable services don't store personal information. Emails are typically viewable by anyone who knows the address No encryption is usually provided for message content Automatic deletion provides privacy through data destruction No long-term storage reduces privacy risks. For truly private communications, use encrypted email services rather than temporary ones.",
  },
  {
    id: "23",
    question: "Are disposable temporary emails anonymous?",
    answer:
      "Yes, temporary emails provide a high level of anonymity: No personal information required for creation. No registration process needed Untraceable to real identity in most cases IP address protection when used with VPNs Anonymous access to services and websites. However, complete anonymity depends on your overall browsing practices and the specific service used.",
  },
  {
    id: "24",
    question: "Where do I see if I've received an email?",
    answer:
      "Check for emails by: Visiting the service website where you created the temporary address Entering your temporary email address in the inbox checker Refreshing the inbox to see new messages Clicking on emails to read their content Using the service's interface to manage received messages. Most services provide a simple web interface for accessing your temporary inbox without requiring login credentials.",
  },
  {
    id: "25",
    question: "Will disposable temporary email help me?",
    answer:
      "Temporary emails will help you if you want to: Protect your primary email from spam and unwanted messages Maintain privacy when signing up for services Test websites and applications safely Avoid long-term marketing commitments Reduce inbox clutter in your main email account Browse anonymously without revealing your identity. However, they're not suitable for important communications, financial services, or anything requiring long-term access to your email history.",
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
