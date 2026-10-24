import React from 'react';
import { AcIcon, SeatingIcon, DiningIcon, KalasamIcon, CheckIcon } from './Icons';
import acImg from '../assets/img14.webp';
import seatingImg from '../assets/img15.webp';
import diningImg from '../assets/img9.jpeg';

export const FacilitiesSection = () => {
  const facilities = [
    {
      id: 'ac',
      icon: <AcIcon size={36} className="facility-card-svg" />,
      title: 'குளிர்சாதன திருமண அரங்கு',
      description: 'நிகழ்ச்சிக்கு வருகை தரும் விருந்தினர்கள் அனைவரும் அமைதியாகவும் மனநிறைவுடனும் பங்கேற்க முழுமையான குளிர்சாதன வசதி செய்யப்பட்டுள்ளது. கோடை காலத்திலும் கூட இரட்டை குளிர் அமைப்பு வழியாக சரியான வெப்பநிலை பராமரிக்கப்பட்டு, மணமேடை சடங்குகள் முதல் விருந்தினர் அமரும் பகுதி வரை இதமான சூழல் எப்போதும் நிலவும்.',
      tag: 'குளிரூட்டப்பட்ட வசதி',
      img: acImg,
      imgAlt: 'குளிர்சாதன திருமண அரங்கு'
    },
    {
      id: 'seating',
      icon: <SeatingIcon size={36} className="facility-card-svg" />,
      title: '200 பேர் அமரக்கூடிய அரங்கு',
      description: '200 விருந்தினர்கள் ஒரே நேரத்தில் சௌகரியமாக அமர்ந்து சுபநிகழ்ச்சிகளை கண்டு மகிழ விசாலமான மற்றும் நேர்த்தியான இருக்கை அமைப்பு. தலைமை மேடை தெளிவாக தெரியும் வகையில் இருக்கைகள் அமைக்கப்பட்டு, பெரியவர்கள் மற்றும் குழந்தைகள் சிரமமின்றி நடமாட அகலமான நடைபாதை வசதியும் உள்ளது.',
      tag: '200 இருக்கைகள்',
      img: seatingImg,
      imgAlt: '200 பேர் அமரக்கூடிய இருக்கை அமைப்பு'
    },
    {
      id: 'dining',
      icon: <DiningIcon size={36} className="facility-card-svg" />,
      title: 'உணவு அருந்துவதற்கான தனி உணவுக்கூடம்',
      description: 'விருந்தினர்கள் சுவையான விருந்துணவை நெரிசலின்றி அமைதியாக அருந்த தனி, விசாலமான மற்றும் தூய்மையான உணவுக்கூடம். திருமண பந்தி விருந்துக்கு ஏற்ற தூய்மையான மேஜை நாற்காலிகள், சுத்திகரிக்கப்பட்ட குடிநீர் மற்றும் உணவு எளிதாக பரிமாறும் கட்டமைப்புடன் வடிவமைக்கப்பட்டுள்ளது.',
      tag: 'தனி உணவுக்கூடம்',
      img: diningImg,
      imgAlt: 'தனி உணவுக்கூடம் வசதி'
    }
  ];

  return (
    <section id="facilities" className="facilities-section" aria-label="மண்டப வசதிகள் பிரிவு">
      <div className="section-container">

        {/* Section Header */}
        <div className="section-header text-center scroll-reveal reveal-up">
          <span className="section-badge">
            <KalasamIcon size={16} />
            <span>சிறப்பம்சங்கள்</span>
          </span>
          <h2 className="section-title">மண்டபத்தின் முக்கிய வசதிகள்</h2>
          <div className="section-title-divider"></div>
          <p className="section-description">
            உங்கள் குடும்பத் திருமணங்களும் சுபநிகழ்ச்சிகளும் சிறப்பாக அமைய தேவையான
            அத்தியாவசிய வசதிகள் — நவீன வசதியுடன் பாரம்பரிய சூழல்
          </p>
        </div>

        {/* Cards with images — directional animations (left, up, right) */}
        <div className="facilities-grid">
          {facilities.map((fac, idx) => {
            const dirClass = idx === 0 ? 'reveal-left' : idx === 2 ? 'reveal-right' : 'reveal-up';
            return (
              <div
                key={fac.id}
                className={`facility-feature-card scroll-reveal ${dirClass}`}
                data-reveal-delay={`${idx * 0.12}s`}
              >
                <div className="facility-card-img-wrap">
                  <img src={fac.img} alt={fac.imgAlt} className="facility-card-img" width={800} height={450} loading="lazy" decoding="async" />
                  <div className="facility-card-img-overlay"></div>
                </div>
                <div className="facility-card-body">
                  <div className="facility-card-icon-wrap">{fac.icon}</div>
                  <span className="facility-card-tag">{fac.tag}</span>
                  <h3 className="facility-feature-title">{fac.title}</h3>
                  <p className="facility-feature-desc">{fac.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner */}
        <div className="facilities-banner scroll-reveal reveal-up" data-reveal-delay="0.1s">
          <div className="facilities-banner-content">
            <KalasamIcon size={28} className="facilities-banner-icon" />
            <div>
              <h3 className="facilities-banner-title">உங்கள் கனவு திருமணம் இங்கே நனவாகும்</h3>
              <p className="facilities-banner-desc">
                முன்பதிவு செய்வதற்கு இப்போதே தொடர்பு கொள்ளுங்கள் — கிடைக்கும் தேதிகள் மிகவும் வரையறையானவை.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Amenities Grid — Scroll animations */}
        <div className="facilities-extra-amenities scroll-reveal reveal-up" data-reveal-delay="0.12s">
          <h4 className="facilities-extra-title">மண்டபத்தின் கூடுதல் அத்தியாவசிய சிறப்பம்சங்கள்</h4>
          <p className="facilities-extra-subtitle">
            மங்களகரமான சுப முகூர்த்த நிகழ்வுகள் எவ்வித குறையுமின்றி இனிதே நடந்தேற தேவையான முழுமையான வசதிகள்
          </p>
          <div className="facilities-amenities-grid">
            {[
              {
                title: 'மணமக்கள் தனி அலங்கார அறைகள்',
                desc: 'மணமகன் மற்றும் மணமகள் சௌகரியமாக ஆடை அலங்காரம் செய்து கொள்ள தனித்தனி தூய்மையான ஓய்வறைகள்.'
              },
              {
                title: 'தடையில்லா மின்சார ஜெனரேட்டர்',
                desc: 'சுப முகூர்த்த நேரத்திலும் விழாவின் அனைத்து தருணங்களிலும் மின் தடை ஏற்படாதவாறு நவீன ஜெனரேட்டர் வசதி.'
              },
              {
                title: 'சுத்திகரிக்கப்பட்ட குடிநீர் & சுகாதாரம்',
                desc: 'அனைத்து விருந்தினர்களுக்கும் பாதுகாப்பான சுத்திகரிக்கப்பட்ட குடிநீர் மற்றும் தொடர்ந்து பராமரிக்கப்படும் தூய்மையான கழிப்பறைகள்.'
              },
              {
                title: 'தெளிவான ஒலிபெருக்கி & மைக்ரோஃபோன்',
                desc: 'மங்கள வாத்திய நாதஸ்வரம், வாழ்த்துரை மற்றும் மந்திர உச்சாடனம் அரங்கம் முழுவதும் இனிமையாக ஒலிக்கும் தரமான ஒலி அமைப்பு.'
              },
              {
                title: 'பாதுகாப்பான இருசக்கர வாகன நிறுத்தம்',
                desc: 'விழாவிற்கு வருகை தரும் உறவினர்கள் மற்றும் நண்பர்களின் வாகனங்களை பாதுகாப்பாக நிறுத்த போதுமான இடவசதி.'
              },
              {
                title: 'விசாலமான சமையல் மற்றும் பாத்திரக் கூடம்',
                desc: 'சுவையான உணவு வகைகளை குறித்த நேரத்தில் சுகாதாரமான முறையில் சமைக்க தேவையான தண்ணீர் மற்றும் பாத்திரங்கள் கழுவும் வசதிகள்.'
              }
            ].map((amenity, idx) => {
              const col = idx % 3;
              const dirClass = col === 0 ? 'reveal-left' : col === 2 ? 'reveal-right' : 'reveal-up';
              return (
                <div key={amenity.title} className={`facility-amenity-card scroll-reveal ${dirClass}`}>
                  <div className="facility-amenity-badge">
                    <CheckIcon size={14} />
                  </div>
                  <h5 className="facility-amenity-heading">{amenity.title}</h5>
                  <p className="facility-amenity-desc">{amenity.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3-Step Booking Guidance */}
        <div className="facilities-steps-wrap scroll-reveal reveal-up" data-reveal-delay="0.15s">
          <h4 className="facilities-steps-title">சுலபமான 3-படி முன்பதிவு நடைமுறை</h4>
          <div className="facilities-steps-grid">
            <div className="facilities-step-card scroll-reveal reveal-left" data-reveal-delay="0.1s">
              <span className="facilities-step-num">01</span>
              <h5 className="facilities-step-heading">தேதி & விவரங்கள் கேட்டறிதல்</h5>
              <p className="facilities-step-text">
                தொலைபேசி அல்லது WhatsApp வழியாக உங்கள் சுபநிகழ்ச்சிக்கான தேதியை தொடர்புகொண்டு மண்டபம் உள்ளதா என உறுதி செய்யவும்.
              </p>
            </div>
            <div className="facilities-step-card scroll-reveal reveal-up" data-reveal-delay="0.2s">
              <span className="facilities-step-num">02</span>
              <h5 className="facilities-step-heading">மண்டபத்தை நேரில் பார்வையிடல்</h5>
              <p className="facilities-step-text">
                மதுரை ஞானஒளிவுபுரத்திற்கு நேரடியாக வருகை தந்து திருமண அரங்கு, மணமேடை மற்றும் சாப்பாட்டுக் கூடத்தை பார்வையிடலாம்.
              </p>
            </div>
            <div className="facilities-step-card scroll-reveal reveal-right" data-reveal-delay="0.3s">
              <span className="facilities-step-num">03</span>
              <h5 className="facilities-step-heading">முன்பதிவை உறுதி செய்தல்</h5>
              <p className="facilities-step-text">
                நிர்வாக அலுவலகத்தில் முன்பதிவு படிவத்தை நிறைவு செய்து உங்கள் இல்லத்து சுபநிகழ்ச்சிக்கான மண்டபத்தை முன்பதிவு செய்து கொள்ளுங்கள்.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FacilitiesSection;
