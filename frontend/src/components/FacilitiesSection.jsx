import React from 'react';
import { AcIcon, SeatingIcon, DiningIcon, KalasamIcon } from './Icons';
import acImg from '../assets/img14.webp';
import seatingImg from '../assets/img15.webp';
import diningImg from '../assets/img9.jpeg';

export const FacilitiesSection = () => {
  const facilities = [
    {
      id: 'ac',
      icon: <AcIcon size={36} className="facility-card-svg" />,
      title: 'குளிர்சாதன திருமண அரங்கு',
      description: 'நிகழ்ச்சிக்கு வருகை தரும் விருந்தினர்கள் அனைவரும் அமைதியாகவும் மனநிறைவுடனும் பங்கேற்க முழுமையான குளிர்சாதன வசதி செய்யப்பட்டுள்ளது. கோடை காலத்திலும் கூட இரட்டை குளிர் அமைப்பு வழியாக சரியான வெப்பநிலை பராமரிக்கப்படும்.',
      tag: 'குளிரூட்டப்பட்ட வசதி',
      img: acImg,
      imgAlt: 'குளிர்சாதன திருமண அரங்கு'
    },
    {
      id: 'seating',
      icon: <SeatingIcon size={36} className="facility-card-svg" />,
      title: '200 பேர் அமரக்கூடிய அரங்கு',
      description: '200 விருந்தினர்கள் ஒரே நேரத்தில் சௌகரியமாக அமர்ந்து சுபநிகழ்ச்சிகளை கண்டு மகிழ விசாலமான மற்றும் நேர்த்தியான இருக்கை அமைப்பு. தலைமை மேடை தெளிவாக தெரியும் வகையில் இருக்கைகள் அமைக்கப்பட்டுள்ளன.',
      tag: '200 இருக்கைகள்',
      img: seatingImg,
      imgAlt: '200 பேர் அமரக்கூடிய இருக்கை அமைப்பு'
    },
    {
      id: 'dining',
      icon: <DiningIcon size={36} className="facility-card-svg" />,
      title: 'உணவு அருந்துவதற்கான தனி உணவுக்கூடம்',
      description: 'விருந்தினர்கள் சுவையான விருந்துணவை நெரிசலின்றி அமைதியாக அருந்த தனி, விசாலமான மற்றும் தூய்மையான உணவுக்கூடம். திருமண விருந்துக்கு ஏற்ற அனைத்து வசதிகளும் உள்ளன.',
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
                  <img src={fac.img} alt={fac.imgAlt} className="facility-card-img" loading="lazy" />
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

      </div>
    </section>
  );
};

export default FacilitiesSection;
