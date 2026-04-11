import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcApplePay } from "react-icons/fa";

const Footer = () => {
  const footerLinks = {
    shop: [
      { name: "Men's Collection", path: "/shop/men" },
      { name: "Women's Collection", path: "/shop/women" },
      { name: "New Arrivals", path: "/new" },
      { name: "Best Sellers", path: "/hot" },
      { name: "Accessories", path: "/shop/accessories" },
    ],
    help: [
      { name: "Order Tracking", path: "/orders" },
      { name: "Returns & Exchanges", path: "/returns" },
      { name: "Shipping Policy", path: "/shipping" },
      { name: "FAQ", path: "/faq" },
      { name: "Privacy Policy", path: "/privacy" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Sustainability", path: "/impact" },
      { name: "Affiliate Program", path: "/affiliate" },
      { name: "Contact Us", path: "/contact" },
    ],
  };

  return (
    <footer className="bg-bg-surface border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link to="/" className="text-3xl font-black tracking-tighter text-text">
              SNITCH
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-sm">
              We create premium streetwear for the bold and the fearless. 
              Our mission is to empower individual expression through 
              cutting-edge design and unparalleled quality.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-3 rounded-xl bg-bg-muted hover:bg-primary hover:text-white transition-all duration-300">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="p-3 rounded-xl bg-bg-muted hover:bg-primary hover:text-white transition-all duration-300">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="p-3 rounded-xl bg-bg-muted hover:bg-primary hover:text-white transition-all duration-300">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="p-3 rounded-xl bg-bg-muted hover:bg-primary hover:text-white transition-all duration-300">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-text mb-6">Shop</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-text-muted hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-text mb-6">Support</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-text-muted hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-text mb-6">Company</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-text-muted hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-text-muted font-bold">
            © {new Date().getFullYear()} SNITCH E-COMMERCE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-50">Secure Payments</p>
            <div className="flex items-center gap-6 text-text-muted opacity-60">
               <FaCcVisa size={32} title="Visa" className="hover:text-text transition-colors" />
               <FaCcMastercard size={32} title="Mastercard" className="hover:text-text transition-colors" />
               <FaCcPaypal size={32} title="PayPal" className="hover:text-text transition-colors" />
               <FaCcApplePay size={32} title="Apple Pay" className="hover:text-text transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
