"use client";

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner'; // Changed to sonner
import { Mail, MessageSquare, HelpCircle } from 'lucide-react'; // Icons

// Metadata should be handled in a parent layout or server component for client components
// export const metadata: Metadata = {
//   title: 'Contact Us - My Temps Mail',
//   description: 'Get in touch with My Temps Mail for support, feedback, or inquiries.',
// };

export default function ContactUsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(''); // Added subject
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Placeholder for actual form submission logic
    // TODO: Remove or replace with structured debug log if needed. This logs PII.
    // console.log({ name, email, subject, message });
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    toast.success('Your message has been sent! We will get back to you shortly.');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl">
          <header className="mb-10 text-center">
            <MessageSquare className="h-16 w-16 text-blue-600 dark:text-blue-500 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Get in Touch
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg leading-relaxed">
              Have questions, feedback, or need support? We're here to help! Fill out the form below, and our team will get back to you as soon as possible.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Full Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email Address</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Subject</Label>
              <Input
                type="text"
                name="subject"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                placeholder="e.g., Support Request, Feedback"
              />
            </div>
            <div>
              <Label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Message</Label>
              <Textarea
                name="message"
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                placeholder="Please describe your query in detail..."
              />
            </div>
            <div>
              <Button type="submit" className="w-full py-3 text-base" disabled={isSubmitting}>
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </Button>
            </div>
          </form>

          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Other Ways to Reach Us</h3>
            <div className="text-center text-gray-600 dark:text-gray-300 space-y-3">
              <p>
                <Mail className="inline-block h-5 w-5 mr-2 align-middle" /> 
                For general inquiries, you can also email us at: <a href="mailto:support@mytempsmail.com" className="text-blue-600 hover:underline">support@mytempsmail.com</a> (placeholder)
              </p>
              <p>
                <HelpCircle className="inline-block h-5 w-5 mr-2 align-middle" /> 
                Have a quick question? Check out our <a href="/faq" className="text-blue-600 hover:underline">FAQ Page</a>.
              </p>
              <p className="text-sm mt-4">
                We typically respond to inquiries within 24-48 business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
