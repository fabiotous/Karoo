import { useState } from "react";
import '../css/TermsConditions.css';

const TermsConditions = () => {
  return (
    <div className="policy-container">
      <h1>Terms & Conditions</h1>
      <p>Welcome to our website. By using our services, you agree to the following terms.</p>

      <h2>Use of Website</h2>
      <p>You must use this website in accordance with all applicable laws.</p>

      <h2>Account Responsibility</h2>
      <p>Keep your account credentials secure and notify us immediately of any unauthorized access.</p>

      <h2>Limitation of Liability</h2>
      <p>We are not responsible for any indirect or consequential damages arising from your use of the site.</p>

      <h2>Changes to Terms</h2>
      <p>We may update these terms periodically. Continued use of the site indicates acceptance of changes.</p>
    </div>
  );
};

export default TermsConditions;