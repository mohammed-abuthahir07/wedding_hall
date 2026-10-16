import React from 'react';
import { KalasamIcon, CheckIcon } from './Icons';
import hallImg from '../assets/img17.webp';
import stageImg from '../assets/img15.webp';

export const AboutSection = () => {
  return (
    <section id="about" className="about-section" aria-label="எங்களைப் பற்றி பிரிவு">
      <div className="section-container">

        {/* Section Header */}
        <div className="section-header text-center scroll-reveal reveal-up">
          <span className="section-badge">
            <KalasamIcon size={16} />
            <span>பாரம்பரியப் பெருமை</span>
          </span>
          <h2 className="section-title">எங்களைப் பற்றி</h2>
          <div className="section-title-divider"></div>
          <p className="section-description">
            மதுரை யானவொலிபுரத்தில் தலைமுறை தலைமுறையாக நம்பகமாக நிலைத்திருக்கும் திருமண மண்டபம்
          </p>
        </div>

        {/* Two-column: text + image */}
        <div className="about-two-col">
          {/* Left — text slides in from left */}
          <div className="about-text-col scroll-reveal reveal-left" data-reveal-delay="0.1s">
            <h3 className="about-card-headline">
              மதுரை யானவொலிபுரத்தில் 50 ஆண்டுகளுக்கும் மேலான நன்மதிப்பும் பாரம்பரியமும்
            </h3>

            <p className="about-description">
              மதுரை மாநகரின் வரலாற்றுச் சிறப்புமிக்க யானவொலிபுரத்தில் அமைந்துள்ள
              <strong> சமூகப் பணிமன்றம்</strong>, கடந்த 50 ஆண்டுகளுக்கும் மேலாக எண்ணற்ற குடும்பங்களின்
              மங்களகரமான சுபநிகழ்ச்சிகள் இனிதே நடந்தேறிய ராசியான திருமண மண்டபமாகும்.
            </p>

            <p className="about-description">
              இம்மண்டபம் <strong>ஞானஒலிவுபுரம் சங்கத்தால்</strong> மிகச் சிறந்த முறையில் நிர்வகிக்கப்பட்டு
              மக்களின் நல்வாழ்விற்காகவும் சுபநிகழ்ச்சிகளுக்காகவும் தொடர்ந்து அர்ப்பணிப்புடன்
              நடத்தப்பட்டு வருகிறது.
            </p>

            <p className="about-description">
              குளிர்சாதன வசதியுடன் கூடிய விசாலமான அரங்கம், தனி உணவுக்கூடம், மற்றும்
              சுத்தமான சூழல் ஆகியவற்றுடன் உங்கள் திருமணத்தை மறக்கமுடியாத அனுபவமாக மாற்றுவோம்.
            </p>

            {/* Highlights */}
            <div className="about-highlights-grid">
              {[
                { title: '50+ ஆண்டுகள்', desc: 'தலைமுறை தொடரும் நன்மதிப்பு' },
                { title: 'ஞானஒலிவுபுரம் சங்கம்', desc: 'நம்பகமான நிர்வாகம்' },
                { title: 'ராசியான மண்டபம்', desc: 'அனைத்து சுபநிகழ்ச்சிகளுக்கும்' },
                { title: '200 பேர் அரங்கு', desc: 'விசாலமான குளிர்சாதன அரங்கு' },
                { title: 'தனி உணவுக்கூடம்', desc: 'சுத்தமான சாப்பாட்டு வசதி' },
                { title: 'சுலப வழித்தடம்', desc: 'மதுரை நகர மையத்திற்கு அருகில்' },
              ].map((item) => (
                <div key={item.title} className="about-highlight-item">
                  <div className="highlight-icon-box">
                    <CheckIcon size={14} />
                  </div>
                  <div>
                    <h4 className="highlight-item-title">{item.title}</h4>
                    <p className="highlight-item-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — images slide in from right */}
          <div className="about-image-col scroll-reveal reveal-right" data-reveal-delay="0.2s">
            <div className="about-img-stack">
              <img src={hallImg} alt="சமூகப் பணிமன்றம் அரங்கு உட்புறம்" className="about-img-main" loading="lazy" />
              <img src={stageImg} alt="திருமண மேடை அலங்காரம்" className="about-img-secondary" loading="lazy" />
              <div className="about-img-badge">
                <span className="about-img-badge-num">50+</span>
                <span className="about-img-badge-text">ஆண்டுகள்<br />பாரம்பரியம்</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row — slides up */}
        <div className="about-stats-row scroll-reveal reveal-up" data-reveal-delay="0.15s">
          {[
            { num: '50+', label: 'ஆண்டுகள் சேவை' },
            { num: '200', label: 'பேர் அரங்கு கொள்ளளவு' },
            { num: '1000+', label: 'குடும்பங்கள் நம்பிக்கை' },
            { num: '100%', label: 'திருப்தி உறுதி' },
          ].map((stat, i, arr) => (
            <React.Fragment key={stat.num}>
              <div className="about-stat-item">
                <span className="about-stat-num">{stat.num}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
              {i < arr.length - 1 && <div className="about-stat-divider"></div>}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
