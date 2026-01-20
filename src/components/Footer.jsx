import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiGithub } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="footer-title">SmartEcom</h3>
            <p className="text-sm">
              Your one-stop shop for quality products with smart features and excellent service.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="btn btn-ghost btn-sm btn-circle">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="btn btn-ghost btn-sm btn-circle">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="btn btn-ghost btn-sm btn-circle">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="btn btn-ghost btn-sm btn-circle">
                <FiGithub size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-title">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="link link-hover">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="link link-hover">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link link-hover">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="link link-hover">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="footer-title">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="link link-hover">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="link link-hover">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="link link-hover">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="link link-hover">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="footer-title">Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe to get updates on new products and offers
            </p>
            <div className="form-control">
              <div className="join">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered join-item"
                />
                <button className="btn btn-primary join-item">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>
            © {new Date().getFullYear()} SmartEcom. All rights reserved. | 
            <span className="ml-2">Built for CSE-3532 Course Project</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
