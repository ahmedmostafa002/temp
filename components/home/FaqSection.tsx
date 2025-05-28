"use client";

import { useState } from "react";
import { Card, CardBody, Button, Divider } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import type { FAQItem } from "@/types";

interface FaqSectionProps {
  faqItems: FAQItem[];
}

export default function FaqSection({ faqItems }: FaqSectionProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  return (
    <section id="faq" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white inline-block">Frequently Asked Questions</h2>
        <div className="w-32 h-1 bg-blue-600 mx-auto mt-2 mb-4"></div> {/* Underline */}
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Everything you need to know about our temporary Gmail account service.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqItems.map((item) => (
          <Card key={item.id} className="w-full">
            <CardBody className="p-0">
              <button // Changed from NextUI Button to a regular button for more layout control
                type="button"
                className="w-full flex items-center justify-between p-6 h-auto text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                onClick={() => setExpandedFAQ(expandedFAQ === item.id ? null : item.id)}
                aria-expanded={expandedFAQ === item.id}
                aria-controls={`faq-answer-${item.id}`}
              >
                <span id={`faq-question-${item.id}`} className="font-semibold text-lg flex-grow mr-4 break-words text-gray-900 dark:text-white">{item.question}</span>
                <ArrowRight
                  className={`h-5 w-5 transition-transform shrink-0 text-gray-500 dark:text-gray-400 ${expandedFAQ === item.id ? "rotate-90" : ""}`}
                />
              </button>
              {expandedFAQ === item.id && (
                <div id={`faq-answer-${item.id}`} role="region" aria-labelledby={`faq-question-${item.id}`}>
                  <Divider />
                  <div className="p-6 pt-4"> {/* Adjusted padding for answer */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
