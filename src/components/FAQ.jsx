import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I book a bus ticket?',
      answer:
        'You can book a bus ticket by navigating to the home page, selecting your origin, destination, and date, and then choosing from the available buses.',
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'We accept major credit cards (Visa, MasterCard, American Express) and popular digital wallets.',
    },
    {
      question: 'Can I cancel or modify my booking?',
      answer:
        'Cancellation and modification policies vary by ticket type. Please check your ticket details or contact customer support for assistance.',
    },
    {
      question: 'What should I do if my bus is delayed?',
      answer:
        'In case of delays, we will notify you via SMS or email. You can also check the real-time status of your bus on our website.',
    },
    {
      question: 'Do I need to print my ticket?',
      answer:
        'No, you can show your e-ticket on your mobile device when boarding the bus.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 bg-white dark:bg-gray-700 rounded-lg shadow-md"
            >
              <button
                className="w-full flex justify-between items-center p-4 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {openIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-700 dark:text-gray-200">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
