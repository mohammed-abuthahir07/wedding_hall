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
            { num: '50+', label: 'ஆண்டுகள் பாரம்பரிய சேவை' },
            { num: '200', label: 'பேர் அரங்கு கொள்ளளவு' },
            { num: '1', label: 'தனி சாப்பாட்டுக் கூடம்' },
            { num: 'A/C', label: 'முழு குளிர்சாதன வசதி' },
          ].map((stat, i, arr) => (
            <React.Fragment key={stat.label}>
              <div className="about-stat-item">
                <span className="about-stat-num">{stat.num}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
              {i < arr.length - 1 && <div className="about-stat-divider"></div>}
            </React.Fragment>
          ))}
        </div>

        {/* Auspicious ceremonies block */}
        <div className="about-events-box scroll-reveal reveal-up" data-reveal-delay="0.2s">
          <h4 className="about-events-title">மண்டபத்தில் நடத்தப்படும் சுபநிகழ்ச்சிகள்</h4>
          <p className="about-events-subtitle">
            அனைத்து வகையான குடும்ப சுப மங்கள வைபவங்களுக்கும் ஏற்ற அமைதியான மற்றும் ராசியான சூழல்
          </p>
          <div className="about-events-grid">
            {[
              { title: 'திருமண விழாக்கள்', desc: 'மங்கள வாத்திய முழங்க சுப முகூர்த்த திருமணங்கள் இனிதே நடைபெற ஏற்ற விசாலமான அரங்கம்.' },
              { title: 'நிச்சயதார்த்த வைபவம்', desc: 'இரு குடும்பத்தினரும் கூடி மகிழும் மங்களகரமான நிச்சயதார்த்த வைபவத்திற்கான சிறந்த வசதி.' },
              { title: 'திருமண வரவேற்பு', desc: 'வருகை தரும் உறவினர்கள் மற்றும் நண்பர்களை வரவேற்று உபசரிக்க குளிரூட்டப்பட்ட வசதி.' },
              { title: 'சீமந்தம் & வளைகாப்பு', desc: 'குடும்பத்தினர் ஆசியுடன் தாய்மை போற்றும் மங்களகரமான வளைகாப்பு வைபவங்கள்.' },
              { title: 'சதாபிஷேகம் & மணிவிழா', desc: 'பெரியவர்களின் ஆயுள் நிறைவை போற்றி கொண்டாடும் 60, 70, 80-ஆம் ஆண்டு மணிவிழாக்கள்.' },
              { title: 'குடும்ப சுபநிகழ்ச்சிகள்', desc: 'காதுகுத்து, பிறந்தநாள் மற்றும் அனைத்து குடும்ப சுப மங்கள நிகழ்வுகளுக்கான சாப்பாட்டு வசதி.' },
            ].map((ev, idx) => {
              const dirClass = idx % 2 === 0 ? 'reveal-left' : 'reveal-right';
              return (
                <div key={ev.title} className={`about-event-card scroll-reveal ${dirClass}`}>
                  <div className="about-event-dot"></div>
                  <h5 className="about-event-name">{ev.title}</h5>
                  <p className="about-event-desc">{ev.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
