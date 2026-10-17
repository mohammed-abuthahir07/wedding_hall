import React from 'react';
import { PhoneIcon, WhatsAppIcon, MapPinIcon, KalasamIcon, CheckIcon } from './Icons';
import frontImg from '../assets/img2.jpeg';
import { buildWhatsAppUrl, DISPLAY_PHONE_NUMBER } from '../utils/whatsapp';

export const ContactSection = ({ onOpenEnquiry }) => {
  const phoneNumber = DISPLAY_PHONE_NUMBER;
  const whatsappUrl = buildWhatsAppUrl(
    'வணக்கம்! சமூகப் பணிமன்றம் திருமண மண்டபம் முன்பதிவு மற்றும் விவரங்களை அறிய விரும்புகிறேன்.'
  );

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
                <span>ஞானஒளிவுபுரம், மதுரை</span>
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
                  'ஞானஒளிவுபுரம் சங்கம் நிர்வாகம்',
                ].map((item) => (
                  <li key={item} className="contact-why-item">
                    <span className="contact-why-check"><CheckIcon size={14} /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-route-info">
              <h4 className="contact-route-title">எளிதான அமைவிடம் & வழித்தடம்</h4>
              <p className="contact-route-desc">
                மதுரை மாநகரின் ஞானஒளிவுபுரம் அமைந்துள்ள எங்கள் திருமண மண்டபத்தை பேருந்து நிலையம் மற்றும் ரயில் நிலையத்திலிருந்து ஆட்டோ, கார் மற்றும் பேருந்து மூலம் மிக எளிதாக வந்தடையலாம்.
              </p>
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
                  <a  className="contact-link">+91 {phoneNumber}</a>
                </p>
                <p className="contact-card-sub">நேரடியாக அழைக்கவும் — காலை 8 மணி முதல் இரவு 9 மணி வரை</p>
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
                <p className="contact-card-value location-text">ஞானஒளிவுபுரம், மதுரை</p>
                <p className="contact-card-sub">நிர்வாகம்: ஞானஒளிவுபுரம் சங்கம்</p>
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

        {/* Nearby Landmark Distances */}
        <div className="contact-landmarks-wrap scroll-reveal reveal-up" data-reveal-delay="0.15s">
          <h4 className="contact-landmarks-title">முக்கிய இடங்களிலிருந்து எளிதான அமைவிட தூரம்</h4>
          <div className="contact-landmarks-grid">
            {[
              { place: 'மதுரை சந்திப்பு ரயில் நிலையம்', distance: '~4.0 கி.மீ', time: '10 நிமிடங்கள்' },
              { place: 'மதுரை பெரியார் பேருந்து நிலையம்', distance: '~4.0 கி.மீ', time: '12 நிமிடங்கள்' },
              { place: 'மதுரை மீனாட்சி அம்மன் திருக்கோவில்', distance: '~5.0 கி.மீ', time: '15 நிமிடங்கள்' },
              { place: 'மாட்டுத்தாவணி (MGR) பேருந்து நிலையம்', distance: '~8.0 கி.மீ', time: '20 நிமிடங்கள்' },
            ].map((landmark, idx) => {
              const col = idx % 2;
              const dirClass = col === 0 ? 'reveal-left' : 'reveal-right';
              return (
                <div key={landmark.place} className={`contact-landmark-card scroll-reveal ${dirClass}`}>
                  <div className="landmark-card-icon">
                    <MapPinIcon size={20} />
                  </div>
                  <div className="landmark-card-info">
                    <h5 className="landmark-place-name">{landmark.place}</h5>
                    <p className="landmark-distance-text">
                      <span className="landmark-dist-highlight">{landmark.distance}</span> • சுமார் {landmark.time} பயண நேரம்
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Frequently Asked Questions (FAQ) */}
        <div className="contact-faq-wrap scroll-reveal reveal-up" data-reveal-delay="0.2s">
          <div className="section-header text-center">
            <span className="section-badge">
              <KalasamIcon size={16} />
              <span>விளக்கங்கள்</span>
            </span>
            <h3 className="section-title">அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQ)</h3>
            <div className="section-title-divider"></div>
            <p className="section-description">
              மண்டப முன்பதிவு மற்றும் வசதிகள் குறித்து வாடிக்கையாளர்கள் பொதுவாக கேட்கும் கேள்விகளுக்கான தெளிவான பதில்கள்
            </p>
          </div>

          <div className="contact-faq-grid">
            {[
              {
                q: 'மண்டபத்தை நேரில் வந்து பார்வையிடலாமா?',
                a: 'ஆம், நிச்சயமாக! திங்கள் முதல் சனி வரை காலை 8:00 மணி முதல் இரவு 9:00 மணி வரையிலும், ஞாயிற்றுக்கிழமைகளில் காலை 9:00 மணி முதல் மாலை 6:00 மணி வரையிலும் நீங்கள் நேரடியாக வந்து மண்டப அரங்கு, மேடை மற்றும் உணவுக்கூடத்தை பார்வையிடலாம்.'
              },
              {
                q: 'எந்தெந்த சுபநிகழ்ச்சிகளுக்கு மண்டபம் முன்பதிவு செய்யப்படுகிறது?',
                a: 'திருமணம், நிச்சயதார்த்தம், வரவேற்பு, வளைகாப்பு, சதாபிஷேகம், மணிவிழா, பிறந்தநாள் மற்றும் அனைத்து குடும்ப சுப மங்கள வைபவங்களுக்கும் முன்பதிவு செய்யப்படுகிறது.'
              },
              {
                q: 'முன்பதிவு செய்ய என்ன நடைமுறைகளை பின்பற்ற வேண்டும்?',
                a: 'தொலைபேசி (+91 8870889819) அல்லது WhatsApp மூலம் தொடர்பு கொண்டு உங்கள் தேதி காலியாக உள்ளதா என உறுதி செய்து, நேரில் அல்லது படிவம் மூலம் முன்பதிவு செய்து கொள்ளலாம்.'
              },
              {
                q: 'உணவுக்கூடத்தின் வசதிகள் மற்றும் கொள்ளளவு என்ன?',
                a: 'சுத்தமான பந்தி முறை உணவு அருந்துவதற்கான தனி விசாலமான சாப்பாட்டுக் கூடம், குடிநீர் வசதி மற்றும் சமையல் பாத்திரங்கள் கழுவும் வசதியுடன் உள்ளது.'
              }
            ].map((faq, idx) => {
              const dirClass = idx % 2 === 0 ? 'reveal-left' : 'reveal-right';
              return (
                <div key={faq.q} className={`contact-faq-card scroll-reveal ${dirClass}`}>
                  <h4 className="contact-faq-question">
                    <span className="faq-q-mark">கேள்வி:</span> {faq.q}
                  </h4>
                  <p className="contact-faq-answer">{faq.a}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
