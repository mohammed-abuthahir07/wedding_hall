import React, { useEffect, useCallback } from 'react';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

export const Lightbox = ({ isOpen, currentIndex, images, onClose, onPrev, onNext }) => {
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [isOpen, onClose, onPrev, onNext]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      className="lightbox-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="புகைப்படப் பார்வை"
    >
      <div className="lightbox-content-wrapper" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="படத்தை மூடவும்"
          title="மூடவும்"
        >
          <CloseIcon size={24} />
        </button>

        {/* Navigation Buttons */}
        <button
          type="button"
          className="lightbox-nav-btn lightbox-prev-btn"
          onClick={onPrev}
          aria-label="முந்தைய படம்"
          title="முந்தைய படம்"
        >
          <ChevronLeftIcon size={28} />
        </button>

        <button
          type="button"
          className="lightbox-nav-btn lightbox-next-btn"
          onClick={onNext}
          aria-label="அடுத்த படம்"
          title="அடுத்த படம்"
        >
          <ChevronRightIcon size={28} />
        </button>

        {/* Main Image */}
        <div className="lightbox-image-box">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="lightbox-img"
          />
        </div>

        {/* Caption & Counter */}
        <div className="lightbox-footer">
          <p className="lightbox-caption">{currentImage.title}</p>
          <span className="lightbox-counter">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Lightbox;
