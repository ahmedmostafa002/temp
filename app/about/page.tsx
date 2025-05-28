import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link'; // Added Link import

export const metadata: Metadata = {
  title: 'About My Temps Mail | Your Free Temporary Gmail Account with Inbox Service',
  description: 'Discover My Temps Mail: our mission is to provide the best free temporary Gmail account with inbox access, ensuring your privacy and security with disposable email solutions.',
  openGraph: {
    title: 'About My Temps Mail | Your Free Temporary Gmail Account with Inbox Service',
    description: 'Discover My Temps Mail: our mission is to provide the best free temporary Gmail account with inbox access, ensuring your privacy and security with disposable email solutions.',
    url: 'https://mytempsmail.com/about',
  },
  twitter: {
    title: 'About My Temps Mail | Your Free Temporary Gmail Account with Inbox Service',
    description: 'Discover My Temps Mail: our mission is to provide the best free temporary Gmail account with inbox access, ensuring your privacy and security with disposable email solutions.',
  },
  alternates: {
    canonical: 'https://mytempsmail.com/about',
  },
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 md:p-12 rounded-lg shadow-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          <header className="mb-10 text-center">
            <Image 
              src="/mytempsmaillogo.svg" 
              alt="My Temps Mail Logo"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              About My Temps Mail
            </h1>
          </header>

          <section>
            <p className="mb-6 text-lg">
              Welcome to My Temps Mail! We are passionate about providing a simple, free, and reliable solution for temporary email needs. In an online world where email addresses are frequently required for registrations, trials, and communications, we understand the importance of protecting your primary inbox from spam and maintaining your privacy.
            </p>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Our Mission
            </h2>
            <p className="mb-6">
              Our mission is to empower users with control over their online identity by offering easy-to-use temporary email accounts. We aim to provide a seamless experience for generating disposable email addresses that function just like regular email, allowing you to receive confirmations, verify accounts, and test services without compromising your personal information.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Why Choose My Temps Mail?
            </h2>
            <ul className="list-disc list-outside pl-5 mb-6 space-y-2">
              <li><strong>Instant & Free:</strong> Generate a new temporary email address in seconds, completely free of charge.</li>
              <li><strong>Full Inbox Functionality:</strong> Receive emails, view content, and manage your temporary inbox with ease.</li>
              <li><strong>Privacy Focused:</strong> No registration required. Your temporary emails and associated data are automatically deleted after a short period.</li>
              <li><strong>User-Friendly:</strong> We've designed our service to be intuitive and straightforward for everyone.</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Our Commitment
            </h2>
            <p className="mb-4">
              We are committed to continuously improving My Temps Mail. We listen to user feedback and strive to enhance our features, reliability, and security to meet the evolving needs of our users. Our goal is to be your go-to service for temporary email solutions.
            </p>
            <p className="mb-6">
              Thank you for choosing My Temps Mail. We hope our service helps you navigate the digital world more safely and efficiently.
            </p>
            
            {/* 
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Meet the Team (Optional Placeholder)
            </h2>
            <p className="mb-6">
              My Temps Mail is developed and maintained by a small team of dedicated individuals passionate about online privacy and utility tools. We believe in creating useful services that are accessible to everyone.
            </p>
            */}

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Contact Us
            </h2>
            <p className="mb-6">
              If you have any questions, feedback, or suggestions, please don't hesitate to reach out. We'd love to hear from you!
              Visit our <Link href="/contact" className="text-blue-600 hover:underline">Contact Page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
