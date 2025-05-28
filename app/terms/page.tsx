import { Metadata } from 'next';
import Link from 'next/link'; // Added Link import

export const metadata: Metadata = {
  title: 'Terms of Service | Free Temporary Gmail Account with Inbox - My Temps Mail',
  description: 'Review the Terms of Service for using My Temps Mail, your provider of free temporary Gmail accounts with inbox access. Understand your rights and responsibilities when using our temp Gmail generator.',
  openGraph: {
    title: 'Terms of Service | Free Temporary Gmail Account with Inbox - My Temps Mail',
    description: 'Review the Terms of Service for My Temps Mail, your free temporary Gmail account provider.',
    url: 'https://mytempsmail.com/terms',
  },
  twitter: {
    title: 'Terms of Service | Free Temporary Gmail Account with Inbox - My Temps Mail',
    description: 'Review the Terms of Service for My Temps Mail, your free temporary Gmail account provider.',
  },
  alternates: {
    canonical: 'https://mytempsmail.com/terms',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 md:p-12 rounded-lg shadow-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Terms of Service
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Last updated: May 28, 2025</p>
          </header>

          <section>
            <p className="mb-6">Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the My Temps Mail website (the "Service") operated by My Temps Mail ("us", "we", or "our").</p>
            <p className="mb-6">Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>
            <p className="mb-6">By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Accounts</h2>
            <p className="mb-4">Our Service provides temporary email accounts. These accounts are for short-term use and will be automatically deleted after a predefined period. You are responsible for any activity that occurs through your temporary account.</p>
            <p className="mb-6">You agree not to use the Service for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).</p>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Intellectual Property</h2>
            <p className="mb-4">The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of My Temps Mail and its licensors. The Service is protected by copyright, trademark, and other laws of both the [Your Country/Region] and foreign countries.</p>
            <p className="mb-6">Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of My Temps Mail.</p>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Links To Other Web Sites</h2>
            <p className="mb-4">Our Service may contain links to third-party web sites or services that are not owned or controlled by My Temps Mail.</p>
            <p className="mb-4">My Temps Mail has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that My Temps Mail shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
            <p className="mb-6">We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.</p>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Termination</h2>
            <p className="mb-4">We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
            <p className="mb-6">All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Disclaimer</h2>
            <p className="mb-4">Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>
            <p className="mb-6">My Temps Mail its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.</p>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Governing Law</h2>
            <p className="mb-4">These Terms shall be governed and construed in accordance with the laws of [Your Country/Region], without regard to its conflict of law provisions.</p>
            <p className="mb-6">Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.</p>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Changes</h2>
            <p className="mb-4">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            <p className="mb-6">By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Contact Us</h2>
            <p className="mb-2">If you have any questions about these Terms, please contact us:</p>
            <ul className="list-disc list-outside pl-5">
              <li>By visiting our <Link href="/contact" className="text-blue-600 hover:underline">Contact Page</Link>.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
