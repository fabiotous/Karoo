import { useState } from "react";
import '../css/Faq.css';

const faqData = [
  {
    question: "How do I create an account?",
    answer: "Click on the Sign Up button and enter your email and password."
  },
  {
    question: "How do I log in?",
    answer: "Go to the Sign In page and enter your credentials."
  },
  {
    question: "Can I add items to my cart?",
    answer: "Yes! Browse products and click 'Add to Cart'."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use secure authentication and encryption."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>

      {faqData.map((item, index) => (
        <div key={index} className="faq-item">
          <div
            className="faq-question"
            onClick={() => toggleFAQ(index)}
          >
            {item.question}
            <span>{activeIndex === index ? "−" : "+"}</span>
          </div>

          {activeIndex === index && (
            <div className="faq-answer">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;