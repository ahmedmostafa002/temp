import { Metadata } from 'next';
import Link from 'next/link'; // Added Link import

export const metadata: Metadata = {
  title: 'Privacy Policy | Free Temporary Gmail Account with Inbox - My Temps Mail',
  description: 'Understand how My Temps Mail protects your privacy when using our free temporary Gmail account with inbox service. Learn about data collection, use, and security for our temp Gmail generator.',
  openGraph: {
    title: 'Privacy Policy | Free Temporary Gmail Account with Inbox - My Temps Mail',
    description: 'Learn how My Temps Mail handles your data for our free temporary Gmail account service.',
    url: 'https://mytempsmail.com/privacy',
  },
  twitter: {
    title: 'Privacy Policy | Free Temporary Gmail Account with Inbox - My Temps Mail',
    description: 'Learn how My Temps Mail handles your data for our free temporary Gmail account service.',
  },
  alternates: {
    canonical: 'https://mytempsmail.com/privacy',
  },
  robots: {
    index: true, 
    follow: true,
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 md:p-12 rounded-lg shadow-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Last updated: May 28, 2025</p>
          </header>

          <section>
            <p className="mb-6">Welcome to My Temps Mail ("us", "we", or "our"). We operate the My Temps Mail website (the "Service").</p>
            <p className="mb-6">This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Information Collection and Use</h2>
            <p className="mb-4">We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">Types of Data Collected</h3>
            
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4 mb-2">Personal Data</h4>
            <p className="mb-4">While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>
            <ul className="list-disc list-outside pl-5 mb-4 space-y-1">
              <li>Email address (temporary, generated by the service)</li>
              <li>Usage Data</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4 mb-2">Usage Data</h4>
            <p className="mb-6">We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Use of Data</h2>
            <p className="mb-2">My Temps Mail uses the collected data for various purposes:</p>
            <ul className="list-disc list-outside pl-5 mb-6 space-y-1">
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
              <li>To provide customer care and support</li>
              <li>To provide analysis or valuable information so that we can improve the Service</li>
              <li>To monitor the usage of the Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Data Deletion</h2>
            <p className="mb-6">Temporary email accounts and their associated messages generated by our Service are automatically deleted after a short period (e.g., 10 minutes). We do not retain this data beyond its expiration.</p>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Security of Data</h2>
            <p className="mb-6">The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p className="mb-4">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            <p className="mb-4">We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "last updated" date at the top of this Privacy Policy.</p>
            <p className="mb-6">You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Contact Us</h2>
            <p className="mb-2">If you have any questions about this Privacy Policy, please contact us:</p>
            <ul className="list-disc list-outside pl-5">
              <li>By visiting our <Link href="/contact" className="text-blue-600 hover:underline">Contact Page</Link>.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
