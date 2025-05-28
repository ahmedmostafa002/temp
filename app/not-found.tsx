import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Page Not Found | Free Temporary Gmail Account with Inbox - My Temps Mail',
  description: 'Sorry, the page you are looking for on My Temps Mail (your source for a free temporary Gmail account with inbox) could not be found. Please check the URL or return to the homepage.',
  robots: {
    index: false, // 404 pages should generally not be indexed
    follow: true,
  }
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl max-w-lg w-full">
        <Image 
          src="/mytempsmaillogo.svg" // Using the site logo
          alt="My Temps Mail Logo"
          width={80}
          height={80}
          className="mx-auto mb-6"
        />
        <h1 className="text-6xl md:text-8xl font-bold text-blue-600 dark:text-blue-500 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:gap-4">
          <Link href="/" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md w-full sm:w-auto">
            Go to Homepage
          </Link>
          <Link href="/blog" className="inline-block px-6 py-3 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md w-full sm:w-auto">
            Visit Our Blog
          </Link>
        </div>
        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
}
