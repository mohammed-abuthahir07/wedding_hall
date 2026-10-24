import React from 'react';
import heroBgImage from '../assets/background.jpeg';
import heroBg1920 from '../assets/background-1920.webp';
import heroBg1280 from '../assets/background-1280.webp';
import heroBg768 from '../assets/background-768.webp';
import { SeatingIcon, DiningIcon, KalasamIcon } from './Icons';

export const HeroSection = ({ onOpenEnquiry }) => {
  return (
    <section
      id="home"
      className="hero-full-bg-section"
      aria-label="முகப்பு பிரிவு"
    >
      <picture className="hero-bg-picture">
        <source
          type="image/webp"
          srcSet={`${heroBg768} 768w, ${heroBg1280} 1280w, ${heroBg1920} 1920w`}
          sizes="100vw"
        />
        <img
          src={heroBgImage}
          alt=""
          className="hero-bg-img"
          width={2048}
          height={1367}
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <div className="hero-dark-overlay" aria-hidden="true"></div>

      <div className="hero-content-container">
        <div className="hero-pill-badge hero-reveal-item delay-1">
          <KalasamIcon size={18} className="hero-badge-icon" />
          <span>மதுரை ஞானஒளிவுபுரம் • திருமண மண்டபம்</span>
        </div>

        <h1 className="hero-heading-main hero-reveal-item delay-2">
          <span className="hero-heading-accent">ராசியான </span>
          <span className="hero-heading-white">குளிர்சாதனத் திருமண மண்டபம்</span>
        </h1>

        <p className="hero-description-text hero-reveal-item delay-3">
          50 ஆண்டுகளுக்கும் மேலான பாரம்பரியம் கொண்ட மண்டபம்
        </p>

        <p className="hero-organizer-line hero-reveal-item delay-4">
          ஞானஒளிவுபுரம் சமூக சேவா சங்கத்தால் நடத்தப்படுகிறது
        </p>

        <p className="hero-organization hero-reveal-item delay-4">
          (சமூகப் பணிமன்றம்)
        </p>

        <div className="hero-cta-group hero-reveal-item delay-5">
          <button
            type="button"
            className="hero-enquiry-cta-btn"
            onClick={onOpenEnquiry}
            aria-label="விவரங்களை அறிய / முன்பதிவு செய்ய"
          >
            <span>விவரங்களை அறிய / முன்பதிவு செய்ய</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        <div className="hero-features-panels-grid">
          <div className="hero-feature-panel hero-reveal-left delay-6">
            <div className="feature-panel-icon-wrap">
              <SeatingIcon size={24} className="feature-panel-svg" />
            </div>
            <div className="feature-panel-text-wrap">
              <span className="feature-panel-title">200 பேர் அமரக்கூடிய அரங்கு</span>
              <span className="feature-panel-sub">குளிரூட்டப்பட்ட விசாலமான இருக்கை</span>
            </div>
          </div>

          <div className="hero-feature-panel hero-reveal-right delay-6">
            <div className="feature-panel-icon-wrap">
              <DiningIcon size={24} className="feature-panel-svg" />
            </div>
            <div className="feature-panel-text-wrap">
              <span className="feature-panel-title">உணவு அருந்துவதற்கான தனி உணவுக்கூடம்</span>
              <span className="feature-panel-sub">சுத்தமான மற்றும் வசதியான சாப்பாட்டுக் கூடம்</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
