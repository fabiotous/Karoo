import { Link } from 'react-router-dom';

const Footers = () => {
  return (
    <footer className="site-footer">
    <div className="footer-container">
        <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: support@karoo.com</p>
            <p>Phone: +1 234 567 890</p>
        </div>

        <div className="footer-section">
            <h4>Follow Us</h4>
            <a href="https://www.facebook.com" className="social-link">Facebook</a>
            <a href="https://www.instagram.com" className="social-link">Instagram</a>
            <a href="https://www.twitter.com" className="social-link">X (formerly Twitter)</a>
        </div>

        <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/faq">FAQs</Link>
            <Link to="/about">About Us</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/shipping">Shipping & Returns</Link>
            <Link to="/staff">Staff Portal</Link>
        </div>
    </div>
    <div className="footer-bottom">
        &copy; 2026 Karoo. All Rights Reserved.
    </div>
</footer>
  )
}

export default Footers