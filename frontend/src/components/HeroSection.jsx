import React from 'react';
import heroBgImage from '../assets/background.jpeg';
import { SeatingIcon, DiningIcon, KalasamIcon } from './Icons';

export const HeroSection = ({ onOpenEnquiry }) => {
  return (
    <section 
      id="home" 
      className="hero-full-bg-section" 
      style={{ backgroundImage: `url(${heroBgImage})` }}
      aria-label="முகப்பு பிரிவு"
    >
      {/* Dark Gradient Overlay for Readability */}
      <div className="hero-dark-overlay" aria-hidden="true"></div>

      <div className="hero-content-container">
        {/* Top Pill Badge */}
        <div className="hero-pill-badge hero-reveal-item delay-1">
          <KalasamIcon size={18} className="hero-badge-icon" />
          <span>மதுரை ஞானஒளிவுபுரம் • திருமண மண்டபம்</span>
        </div>

        {/* Main Heading */}
        <h1 className="hero-heading-main hero-reveal-item delay-2">
          <span className="hero-heading-accent">ராசியான </span>
          <span className="hero-heading-white">குளிர்சாதனத் திருமண மண்டபம்</span>
        </h1>

        {/* Supporting Description */}
        <p className="hero-description-text hero-reveal-item delay-3">
          50 ஆண்டுகளுக்கும் மேலான பாரம்பரியம் கொண்ட மண்டபம்
        </p>

        {/* Organization Name */}
        

        {/* Existing Subtitle */}
        <p className="hero-organizer-line hero-reveal-item delay-4">
          ஞானஒளிவுபுரம் சமூக சேவா சங்கத்தால் நடத்தப்படுகிறது
        </p>

        <p className="hero-organization hero-reveal-item delay-4">
          (சமூகப் பணிமன்றம்)
        </p>

        {/* Primary CTA Button */}
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

        {/* Bottom Compact Feature Panels (Over the Background Image) */}
        <div className="hero-features-panels-grid">
          <div className="hero-feature-panel hero-reveal-left delay-6">
            <div className="feature-panel-icon-wrap">
              <SeatingIcon size={24} className="feature-panel-svg" />
            </div>
            <div className="feature-panel-text-wrap">
              <span className="feature-panel-title">250 பேர் அமரக்கூடிய அரங்கு</span>
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
