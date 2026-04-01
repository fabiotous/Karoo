import { useState } from "react";
import '../css/ShippingReturns.css';

const ShippingReturns = () => {
  return (
    <div className="policy-container">
      <h1>Shipping & Returns</h1>
      <p>We want you to have a smooth shopping experience. Here are our shipping and return policies.</p>

      <h2>Shipping Policy</h2>
      <ul>
        <li>Orders are processed within 1-3 business days.</li>
        <li>Standard shipping typically takes 5-7 business days.</li>
        <li>Express shipping options are available at checkout.</li>
      </ul>

      <h2>Return Policy</h2>
      <ul>
        <li>Returns are accepted within 30 days of delivery.</li>
        <li>Items must be in original condition and packaging.</li>
        <li>Refunds will be issued to the original payment method.</li>
      </ul>

      <h2>Contact Us</h2>
      <p>For questions about shipping or returns, email support@karoo.com.</p>
    </div>
  );
};

export default ShippingReturns;