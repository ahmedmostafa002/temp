"use client";

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input'; // Assuming you have an Input component
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { toast } from 'sonner'; // Changed to sonner
import { Send } from 'lucide-react';

export default function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    setIsSubscribing(true);
    // Placeholder for actual newsletter subscription logic
    // TODO: Remove or replace with structured debug log if needed. This logs PII.
    // console.log('Subscribing email:', email);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    toast.success('Thanks for subscribing! (Placeholder)');
    setEmail('');
    setIsSubscribing(false);
  };

  return (
    <div>
      <h4 className="font-semibold text-white mb-4">Stay Updated</h4>
      <p className="text-gray-400 mb-4 text-sm">
        Get the latest news, tips, and updates from My Temps Mail.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 flex-grow"
          aria-label="Email for newsletter"
        />
        <Button 
          type="submit" 
          variant="default" // Changed to default variant
          disabled={isSubscribing}
          className="shrink-0" // Prevent button from shrinking too much
        >
          {isSubscribing ? 'Subscribing...' : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}
