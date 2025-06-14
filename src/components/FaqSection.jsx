import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'Do I need to create an account to read articles?',
    answer: 'No. You can freely browse and read all public articles without creating an account. However, to write articles, comment, or like content, you must be logged in.'
  },
  {
    question: 'How can I post an article?',
    answer: 'Once you log in, go to the "Post Article" page. Fill out the form with your title, content, category, and tags, then submit it. Your article will be published instantly.'
  },
  {
    question: 'Can I edit or delete my article?',
    answer: 'Yes. Visit the "My Articles" page to update or delete your articles. The update form is pre-filled with your existing data.'
  },
  {
    question: 'How is my data secured?',
    answer: 'We use Firebase Authentication for secure login and JWT for route protection. Sensitive credentials are stored safely in environment variables.'
  },
  {
    question: 'Does the platform support dark mode?',
    answer: 'Yes. You can toggle between light and dark themes using the button in the navigation bar.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 text-gray-800 dark:text-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left font-medium text-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <span>{faq.question}</span>
              {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
