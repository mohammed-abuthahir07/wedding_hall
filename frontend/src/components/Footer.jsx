import React from 'react';
import { KalasamIcon } from './Icons';

export const Footer = ({ onOpenEnquiry }) => {
  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper" aria-label="கீழ்ப்பகுதி">
      <div className="section-container">
        <div className="footer-top-grid">
          {/* Brand — slides in from left */}
          <div className="footer-brand-column scroll-reveal reveal-left">
            <div className="footer-brand">
              <span className="footer-brand-icon">
                <KalasamIcon size={26} />
              </span>
              <span className="footer-brand-title">சமூகப் பணிமன்றம்</span>
            </div>
            <p className="footer-brand-desc">
              மதுரை யானவொலிபுரத்தில் 50 ஆண்டுகளுக்கும் மேலான பாரம்பரியம் கொண்ட ராசியான குளிர்சாதனத் திருமண மண்டபம். ஞானஒலிவுபுரம் சங்கத்தால் நடத்தப்படுகிறது.
            </p>
          </div>

          {/* Links — slides up */}
          <div className="footer-nav-column scroll-reveal reveal-up" data-reveal-delay="0.1s">
            <h4 className="footer-column-heading">பக்க இணைப்புகள்</h4>
            <ul className="footer-links-list">
              {[
                { label: 'முகப்பு', href: '#home' },
                { label: 'எங்களைப் பற்றி', href: '#about' },
                { label: 'வசதிகள்', href: '#facilities' },
                { label: 'புகைப்படங்கள்', href: '#gallery' },
                { label: 'தொடர்பு', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — slides in from right */}
          <div className="footer-contact-column scroll-reveal reveal-right" data-reveal-delay="0.2s">
            <h4 className="footer-column-heading">தொடர்புக்கு</h4>
            <p className="footer-contact-text"><strong>இடம்:</strong> ஞானஒலிவுபுரம், மதுரை</p>
            <p className="footer-contact-text"><strong>தொலைபேசி:</strong> +91 8682096578</p>
            <p className="footer-contact-text"><strong>நிர்வாகம்:</strong> ஞானஒலிவுபுரம் சங்கம்</p>
            <div className="footer-action-buttons">
              <button type="button" className="footer-enquiry-btn" onClick={onOpenEnquiry}>
                முன்பதிவு செய்ய
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar scroll-reveal reveal-up">
          <p className="footer-copyright">
            © 2026 சமூகப் பணிமன்றம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. ஞானஒலிவுபுரம் சங்கம், மதுரை.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
