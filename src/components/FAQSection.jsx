import React, { useState } from 'react';
import './FAQSection.css';
import dropdownIcon from '../assets/dropdown-icon.png'; // Assuming the icon image is here

function FAQSection() {
  // State to keep track of the open FAQ item index
  const [openIndex, setOpenIndex] = useState(null);

  // Function to toggle the open/closed state of an FAQ item
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Sample FAQ data (you can replace this with your actual questions and answers)
  const faqs = [
    {
      question: 'Can I apply without a salary account?',
      answer: 'Yes, you can. We have options for individuals without a traditional salary account. Please check the eligibility criteria for details.'
    },
    {
      question: 'What happens if I miss a payment?',
      answer: 'Missing a payment may incur late fees and affect your credit score. Please contact us as soon as possible if you anticipate difficulty in making a payment.'
    },
    {
      question: 'Can students apply?',
      answer: 'Eligibility criteria include factors like age and income source. While some students may qualify, it depends on meeting the specific requirements outlined in the application process.'
    },
  ];

  return (
    <section className="faq-section">
      <div className="container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-items">
          {faqs.map((faq, index) => (
            <div className={`faq-item ${openIndex === index ? 'open' : ''}`} key={index}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <p>{faq.question}</p>
                {/* Using img tag for the dropdown icon */}
                <img 
                  src={dropdownIcon} 
                  alt="Dropdown Icon"
                  className={`dropdown-icon ${openIndex === index ? 'rotated' : ''}`}
                />
              </div>
              {/* Conditionally render the answer */}
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection; 