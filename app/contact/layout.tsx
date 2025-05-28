import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Support for Your Free Temporary Gmail Account with Inbox - My Temps Mail',
  description: 'Need help or have questions about your free temporary Gmail account with inbox? Contact My Temps Mail for support, feedback, or inquiries regarding our temp Gmail service.',
  openGraph: {
    title: 'Contact Us | Support for Your Free Temporary Gmail Account with Inbox - My Temps Mail',
    description: 'Need help or have questions about your free temporary Gmail account with inbox? Contact My Temps Mail for support.',
    url: 'https://mytempsmail.com/contact',
  },
  twitter: {
    title: 'Contact Us | Support for Your Free Temporary Gmail Account with Inbox - My Temps Mail',
    description: 'Need help or have questions about your free temporary Gmail account with inbox? Contact My Temps Mail for support.',
  },
  alternates: {
    canonical: 'https://mytempsmail.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
