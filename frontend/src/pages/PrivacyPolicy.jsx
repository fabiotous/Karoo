import { useState } from "react";
import '../css/PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Privacy Policy</h1>
      <p>We respect your privacy and are committed to protecting your personal data.</p>

      <h2>Information We Collect</h2>
      <ul>
        <li>Personal information you provide (name, email, etc.)</li>
        <li>Usage data from your activity on our website</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>
        We use the data to improve our services, communicate with you, and personalize your experience.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We may share information with trusted third-party providers to operate our services efficiently.
      </p>

      <h2>Contact Us</h2>
      <p>If you have any questions about this privacy policy, contact us at support@karoo.com.</p>
    </div>
  );
};

export default PrivacyPolicy;