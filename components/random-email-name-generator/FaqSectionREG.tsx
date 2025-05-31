"use client";

import { useState } from "react";
import { Card, CardBody, Divider } from "@nextui-org/react"; // Removed Button as it's not used from NextUI here
import { ArrowRight } from "lucide-react";
import type { FAQItem } from "@/types";

// FAQ items specific to the Random Email Generator
const faqItemsDataREG: FAQItem[] = [
  {
    id: "reg-1",
    question: "How does the AI generate random email addresses?",
    answer:
      "Our tool uses a sophisticated AI model (GPT-4o mini) to understand patterns of real email addresses. It then generates unique and plausible usernames based on your optional input (like a name or keyword) and combines them with your chosen email domain (e.g., @gmail.com, @outlook.com) or a common one if you select 'custom'.",
  },
  {
    id: "reg-2",
    question: "Are the generated email addresses real or valid?",
    answer:
      "The email addresses are syntactically valid and designed to look like real emails. However, they are not actual, active email accounts with inboxes. They are intended for use cases where you need a placeholder email, for testing, or to protect your real email from spam when signing up for services.",
  },
  {
    id: "reg-3",
    question: "Can I choose any email provider domain?",
    answer:
      "We offer a selection of common email providers like Gmail, Outlook, Live, Yahoo, and ProtonMail. You can also choose 'Custom (AI will choose)' and our AI will pick a common domain for you. We aim to provide a diverse range of options.",
  },
  {
    id: "reg-4",
    question: "Is there a limit to how many emails I can generate?",
    answer:
      "Yes, to ensure fair usage and optimal performance, you can generate up to 50 email addresses per request. The service is free to use within these limits.",
  },
  {
    id: "reg-5",
    question: "How 'random' are the generated emails if I provide a name?",
    answer:
      "If you provide a name or keyword, the AI will incorporate that text into each generated username. The 'randomness' then comes from how the AI combines this with other elements (numbers, other words, separators like dots or hyphens) to create unique variations, all while aiming for a professional look.",
  },
  {
    id: "reg-6",
    question: "Is my input (name/text) stored or used for other purposes?",
    answer:
      "No, your input is only used at the moment of generation to create the email addresses. We do not store your input text or the generated emails after your session. Your privacy is important to us.",
  },
];

export default function FaqSectionREG() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  return (
    <section id="faq-reg" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white inline-block">Generator FAQs</h2>
        <div className="w-32 h-1 bg-blue-600 mx-auto mt-2 mb-4"></div> {/* Underline */}
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Answers to common questions about our Random Email Generator.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqItemsDataREG.map((item) => (
          <Card key={item.id} className="w-full">
            <CardBody className="p-0">
              <button
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
                  <div className="p-6 pt-4">
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
