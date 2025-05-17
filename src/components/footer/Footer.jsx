import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* Top section */}
      <div className="footer-top">
        <div className="footer-promo">
          <p>New to Jumia?</p>
          <span>Subscribe to our newsletter for the latest offers</span>
        </div>

        <div className="footer-subscribe">
          <input type="email" placeholder="example@email.com" />
          <button>Subscribe</button>
        </div>
      </div>

      {/* Terms agreement */}
      <div className="footer-terms">
        <label>
          <input type="checkbox" />
          <span>
            I agree to Jumia's Privacy Policy and Cookie Policy.
            <strong> I agree to the legal terms</strong>
          </span>
        </label>
      </div>

      {/* Bottom section */}
      <div className="footer-bottom">
        <div className="footer-column">
          <h4>Need Help?</h4>
          <ul>
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>Call Us</li>
            <li><strong>Useful Links:</strong></li>
            <li>How to Place an Order</li>
            <li>Payment Methods</li>
            <li>Shipping Policy</li>
            <li>Return Policy</li>
            <li>Refund Policy</li>
            <li>Payment Information Guidelines</li>
            <li>Black Friday Deals</li>
            <li>Ramadan Offers</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>About Us</h4>
          <ul>
            <li>Join Jumia</li>
            <li>Terms and Conditions</li>
            <li>Jumia Store Selling Terms and Conditions</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
            <li>Free Delivery</li>
            <li>Flash Sale</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Boost Your Sales</h4>
          <ul>
            <li>Sell on Jumia</li>
            <li>Vendor Knowledge Base (Vendor hub)</li>
            <li>Start Your Journey with Jumia (J-Force)</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Jumia International</h4>
          <ul>
            <li>Algeria</li>
            <li>Morocco</li>
            <li>Nigeria</li>
            <li>Côte d'Ivoire</li>
            <li>Ghana</li>
            <li>Kenya</li>
            <li>Senegal</li>
            <li>Uganda</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
