import React from 'react';
import { PhoneIcon, WhatsAppIcon, MapPinIcon, KalasamIcon, CheckIcon } from './Icons';
import frontImg from '../assets/img2.jpeg';

export const ContactSection = ({ onOpenEnquiry }) => {
  const phoneNumber = '9842191273';
  const whatsappUrl = `https://wa.me/919842191273?text=${encodeURIComponent(
    'வணக்கம்! சமூகப் பணிமன்றம் திருமண மண்டபம் முன்பதிவு மற்றும் விவரங்களை அறிய விரும்புகிறேன்.'
  )}`;

  return (
    <section id="contact" className="contact-section" aria-label="தொடர்பு பிரிவு">
      <div className="section-container">

        {/* Section Header */}
        <div className="section-header text-center scroll-reveal reveal-up">
          <span className="section-badge">
            <KalasamIcon size={16} />
            <span>எங்களை அணுக</span>
          </span>
          <h2 className="section-title">தொடர்புக்கு</h2>
          <div className="section-title-divider"></div>
          <p className="section-description">
            உங்கள் சுபநிகழ்ச்சிக்கான மண்டப முன்பதிவு மற்றும் மேலதிக விவரங்களுக்கு
            எங்களை தொடர்பு கொள்ளவும் — நாங்கள் உதவ எப்போதும் தயாராக இருக்கிறோம்
          </p>
        </div>

        <div className="contact-two-col">

          {/* Left — image + why choose us slides in from left */}
          <div className="contact-img-col scroll-reveal reveal-left" data-reveal-delay="0.1s">
            <div className="contact-img-wrap">
              <img src={frontImg} alt="சமூகப் பணிமன்றம் திருமண மண்டபம் முகப்பு" className="contact-hall-img" loading="lazy" />
              <div className="contact-img-badge">
                <KalasamIcon size={18} />
                <span>ஞானஒலிவுபுரம், மதுரை</span>
              </div>
            </div>

            <div className="contact-why-box">
              <h4 className="contact-why-title">ஏன் எங்கள் மண்டபம்?</h4>
              <ul className="contact-why-list">
                {[
                  '50+ ஆண்டுகள் நம்பகமான சேவை',
                  'குளிர்சாதன விசாலமான அரங்கு',
                  '200 பேர் கொள்ளளவு',
                  'தனி சுத்தமான உணவுக்கூடம்',
                  'சுலப அணுகல் — மதுரை நகரில்',
                  'ஞானஒலிவுபுரம் சங்கம் நிர்வாகம்',
                ].map((item) => (
                  <li key={item} className="contact-why-item">
                    <span className="contact-why-check"><CheckIcon size={14} /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — contact cards slide in from right */}
          <div className="contact-cards-col">
            {/* Phone */}
            <div className="contact-info-card scroll-reveal reveal-right" data-reveal-delay="0.1s">
              <div className="contact-card-icon-wrap">
                <PhoneIcon size={28} className="contact-svg-icon" />
              </div>
              <div className="contact-card-content">
                <h3 className="contact-card-label">தொலைபேசி எண்</h3>
                <p className="contact-card-value">
                  <a href={`tel:${phoneNumber}`} className="contact-link">+91 {phoneNumber}</a>
                </p>
                <p className="contact-card-sub">நேரடியாக அழைக்கவும் — காலை 8 மணி முதல் இரவு 9 மணி வரை</p>
                <a href={`tel:${phoneNumber}`} className="contact-card-action-btn phone-action-btn" aria-label="தொலைபேசியில் அழைக்கவும்">
                  இப்போதே அழைக்க
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="contact-info-card contact-highlight-card scroll-reveal reveal-right" data-reveal-delay="0.18s">
              <div className="contact-card-icon-wrap whatsapp-icon-wrap">
                <WhatsAppIcon size={28} className="contact-svg-icon whatsapp-svg" />
              </div>
              <div className="contact-card-content">
                <h3 className="contact-card-label">WhatsApp தகவல்</h3>
                <p className="contact-card-value">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-link">+91 {phoneNumber}</a>
                </p>
                <p className="contact-card-sub">செய்தி மூலம் உடனடி தகவல் பெற மற்றும் முன்பதிவு செய்ய</p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-card-action-btn whatsapp-action-btn" aria-label="WhatsApp மூலம் செய்தி அனுப்பவும்">
                  WhatsApp செய்தி
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="contact-info-card scroll-reveal reveal-right" data-reveal-delay="0.26s">
              <div className="contact-card-icon-wrap">
                <MapPinIcon size={28} className="contact-svg-icon" />
              </div>
              <div className="contact-card-content">
                <h3 className="contact-card-label">அமைவிடம் & நிர்வாகம்</h3>
                <p className="contact-card-value location-text">ஞானஒலிவுபுரம், மதுரை</p>
                <p className="contact-card-sub">நிர்வாகம்: ஞானஒலிவுபுரம் சங்கம்</p>
                <button type="button" className="contact-card-action-btn enquiry-action-btn" onClick={onOpenEnquiry} aria-label="முன்பதிவு படிவத்தை திறக்கவும்">
                  முன்பதிவு படிவம்
                </button>
              </div>
            </div>

            {/* Hours */}
            <div className="contact-hours-box scroll-reveal reveal-up" data-reveal-delay="0.32s">
              <h4 className="contact-hours-title">
                <span className="contact-hours-dot"></span>
                அலுவலக நேரம்
              </h4>
              <div className="contact-hours-grid">
                <span className="contact-hours-day">திங்கள் – சனி</span>
                <span className="contact-hours-time">காலை 8:00 – இரவு 9:00</span>
                <span className="contact-hours-day">ஞாயிறு</span>
                <span className="contact-hours-time">காலை 9:00 – மாலை 6:00</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
