import React, { useState } from 'react';
import { KalasamIcon } from './Icons';
import Lightbox from './Lightbox';

import heroBg from '../assets/background.jpeg';
import img2 from '../assets/img2.jpeg';
import img5 from '../assets/img12.webp';
import img9 from '../assets/img9.jpeg';
import img18 from '../assets/img18.webp';
import img19 from '../assets/img19.webp';

export const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const galleryImages = [
    { src: heroBg, title: 'திருமண மண்டப முகப்பு தோற்றம்', alt: 'சமூகப் பணிமன்றம் திருமண மண்டபம் முகப்பு தோற்றம்' },
    { src: img2, title: 'மண்டப உட்புற அரங்கு மற்றும் மேடை தோற்றம்', alt: 'சமூகப் பணிமன்றம் மணமேடை மற்றும் அரங்கு' },
    { src: img19, title: '250 பேர் அமரக்கூடிய விசாலமான இருக்கைகள்', alt: 'சமூகப் பணிமன்றம் இருக்கை அமைப்பு' },
    { src: img5, title: 'குளிரூட்டப்பட்ட திருமண அரங்கம்', alt: 'குளிர்சாதன திருமண அரங்கு தோற்றம்' },
    { src: img18, title: 'அலங்கரிக்கப்பட்ட திருமண மேடை', alt: 'சுபநிகழ்ச்சிகளுக்கான திருமண மேடை அமைப்பு' },
    { src: img9, title: 'உணவு அருந்துவதற்கான தனி உணவுக்கூடம்', alt: 'சமூகப் பணிமன்றம் சாப்பாட்டுக் கூடம்' },
  ];

  const handleOpenLightbox = (index) => {
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setActivePhotoIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActivePhotoIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="gallery-section" aria-label="புகைப்படங்கள் பிரிவு">
      <div className="section-container">

        {/* Section Header */}
        <div className="section-header text-center scroll-reveal reveal-up">
          <span className="section-badge">
            <KalasamIcon size={16} />
            <span>படத் தொகுப்பு</span>
          </span>
          <h2 className="section-title">புகைப்படங்கள்</h2>
          <div className="section-title-divider"></div>
          <p className="section-description">
            எங்கள் திருமண மண்டபத்தின் நேர்த்தியான அரங்கு, மேடை மற்றும் உணவுக்கூடத்தின் அழகிய காட்சிகள்
          </p>
        </div>

        {/* Each gallery card animates with directional motion (left, up, right) */}
        <div className="gallery-grid">
          {galleryImages.map((photo, index) => {
            const col = index % 3;
            const dirClass = col === 0 ? 'reveal-left' : col === 2 ? 'reveal-right' : 'reveal-up';
            return (
              <div
                key={index}
                className={`gallery-item-card scroll-reveal ${dirClass}`}
                data-reveal-delay={`${col * 0.1}s`}
                onClick={() => handleOpenLightbox(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpenLightbox(index); }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${photo.title} - பெரிதாக்க அழுத்தவும்`}
              >
              <div className="gallery-image-container">
                <img src={photo.src} alt={photo.alt} className="gallery-thumbnail" width={800} height={600} loading="lazy" decoding="async" />
                <div className="gallery-item-hover-overlay">
                  <span className="gallery-zoom-badge">பெரிதாக்கு</span>
                  <p className="gallery-hover-title">{photo.title}</p>
                </div>
              </div>
            </div>
          );
        })}
        </div>

        {/* Gallery Visit Invitation Banner */}
        <div className="gallery-visit-card scroll-reveal reveal-up" data-reveal-delay="0.15s">
          <div className="gallery-visit-content">
            <h4 className="gallery-visit-title">நேரடியாக வந்து மண்டபத்தை பார்வையிட அன்போடு அழைக்கிறோம்</h4>
            <p className="gallery-visit-text">
              புகைப்படங்களில் காண்பதை விட நேரில் பார்வையிடும்போது எங்கள் சமூகப் பணிமன்றத்தின் அமைதியான சூழல், விசாலமான குளிர்சாதன இருக்கை அமைப்பு மற்றும் தூய்மையான சாப்பாட்டுக் கூடம் உங்களுக்கு முழு மனநிறைவை அளிக்கும்.
            </p>
            <div className="gallery-visit-highlights">
              <span className="gallery-visit-tag">நேரடி உண்மை புகைப்படங்கள்</span>
              <span className="gallery-visit-tag">அனைத்து சுபமுகூர்த்த ஏற்பாடுகள்</span>
              <span className="gallery-visit-tag">முழு வழிகாட்டுதல்</span>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={activePhotoIndex}
        images={galleryImages}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};

export default GallerySection;
