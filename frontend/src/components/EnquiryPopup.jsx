import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CloseIcon, WhatsAppIcon, KalasamIcon, CheckIcon } from './Icons';

export const EnquiryPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  
  const popupRef = useRef(null);
  const nameInputRef = useRef(null);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsSubmitted(false);
      setErrors({});
      onClose();
    }, 280);
  }, [isClosing, onClose]);

  // Focus input when opened and lock background scroll
  useEffect(() => {
    if (isOpen || isClosing) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus({ preventScroll: true });
        }
      }, 100);
      return () => {
        clearTimeout(timer);
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      };
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }, [isOpen, isClosing]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((isOpen || isClosing) && e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isClosing, handleClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error for that field on change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // 1. Name validation
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'பெயர் குறைந்தபட்சம் 2 எழுத்துக்கள் இருக்க வேண்டும்';
    }

    // 2. Phone validation
    const trimmedPhone = formData.phone.trim().replace(/[\s-]/g, '');
    if (!trimmedPhone) {
      newErrors.phone = 'தயவுசெய்து உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்';
    } else if (!/^[6-9]\d{9}$/.test(trimmedPhone)) {
      newErrors.phone = 'சரியான 10 இலக்க இந்திய தொலைபேசி எண்ணை உள்ளிடவும் (எ.கா: 9876543210)';
    }

    // 3. Guests count validation
    const trimmedGuests = String(formData.guests).trim();
    if (!trimmedGuests) {
      newErrors.guests = 'விருந்தினர்களின் எண்ணிக்கையை உள்ளிடவும்';
    } else {
      const numGuests = Number(trimmedGuests);
      if (!Number.isInteger(numGuests) || numGuests < 1) {
        newErrors.guests = 'விருந்தினர்களின் எண்ணிக்கை 1 அல்லது அதற்கு மேல் இருக்க வேண்டும்';
      } else if (numGuests > 5000) {
        newErrors.guests = 'சரியான விருந்தினர்களின் எண்ணிக்கையை உள்ளிடவும்';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const trimmedName = formData.name.trim();
    const cleanPhone = formData.phone.trim().replace(/[\s-]/g, '');
    const guestsCount = formData.guests.trim();

    // Construct Tamil Message
    const tamilMessage = 
`வணக்கம்! சமூகப் பணிமன்றம் திருமண மண்டபம் முன்பதிவு பற்றிய தகவல் தேவை.

• மண்டபத்தின் பெயர்: சமூகப் பணிமன்றம் (ஞானஒலிவுபுரம், மதுரை)
• பெயர்: ${trimmedName}
• தொலைபேசி எண்: ${cleanPhone}
• விருந்தினர்களின் எண்ணிக்கை: ${guestsCount} பேர்

தயவுசெய்து மண்டப முன்பதிவு விவரங்களை தெரிவிக்கவும். நன்றி!`;

    const encodedMessage = encodeURIComponent(tamilMessage);
    const destinationNumber = '919842191273 ';
    const whatsappUrl = `https://wa.me/${destinationNumber}?text=${encodedMessage}`;

    setLastWhatsAppUrl(whatsappUrl);
    setIsSubmitted(true);

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div 
      className={`popup-backdrop ${isClosing ? 'popup-closing' : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div 
        ref={popupRef}
        className="popup-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Close 'X' Button */}
        <button
          type="button"
          className="popup-close-btn"
          onClick={handleClose}
          aria-label="படிவத்தை மூடவும்"
          title="படிவத்தை மூடவும்"
        >
          <CloseIcon size={22} />
        </button>

        {/* Modal Header */}
        <div className="popup-header">
          <div className="popup-brand-tag">
            <KalasamIcon size={20} className="popup-kalasam" />
            <span>சமூகப் பணிமன்றம்</span>
          </div>
          <h2 id="enquiry-modal-title" className="popup-title">
            மண்டப முன்பதிவு & விவரங்கள்
          </h2>
          <p className="popup-subtitle">
            உங்கள் சுபநிகழ்ச்சிக்கான விவரங்களை பூர்த்தி செய்து WhatsApp வழியாக உடனடியாக அனுப்பவும்
          </p>
        </div>

        {/* Submission Success State or Form */}
        {isSubmitted ? (
          <div className="popup-success-box">
            <div className="success-icon-wrap">
              <CheckIcon size={32} />
            </div>
            <h3 className="success-heading">விவரங்கள் பெறப்பட்டன!</h3>
            <p className="success-desc">
              உங்கள் முன்பதிவு தகவல் தயாராகி WhatsApp திறக்கப்பட்டுள்ளது. அங்கு செய்தியை சரிபார்த்து அனுப்பவும்.
            </p>
            <div className="success-actions">
              <a
                href={lastWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="popup-submit-btn"
              >
                <WhatsAppIcon size={20} />
                <span>மீண்டும் WhatsApp திறக்க</span>
              </a>
              <button
                type="button"
                className="popup-secondary-btn"
                onClick={handleClose}
              >
                முடிந்தது
              </button>
            </div>
          </div>
        ) : (
          <form className="popup-form" onSubmit={handleSubmit} noValidate>
            {/* Field 1: Name */}
            <div className="form-group">
              <label htmlFor="enquiry-name" className="form-label">
                பெயர் <span className="required-star">*</span>
              </label>
              <input
                ref={nameInputRef}
                id="enquiry-name"
                name="name"
                type="text"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                placeholder="உங்கள் பெயரை உள்ளிடவும்"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error-msg' : undefined}
              />
              {errors.name && (
                <p id="name-error-msg" className="form-error-msg" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Field 2: Phone Number */}
            <div className="form-group">
              <label htmlFor="enquiry-phone" className="form-label">
                தொலைபேசி எண் <span className="required-star">*</span>
              </label>
              <input
                id="enquiry-phone"
                name="phone"
                type="tel"
                className={`form-input ${errors.phone ? 'input-error' : ''}`}
                placeholder="10 இலக்க தொலைபேசி எண் (எ.கா: 9876543210)"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                maxLength={14}
                aria-required="true"
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error-msg' : undefined}
              />
              {errors.phone && (
                <p id="phone-error-msg" className="form-error-msg" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Field 3: Number of Guests */}
            <div className="form-group">
              <label htmlFor="enquiry-guests" className="form-label">
                விருந்தினர்களின் எண்ணிக்கை <span className="required-star">*</span>
              </label>
              <input
                id="enquiry-guests"
                name="guests"
                type="number"
                min="1"
                step="1"
                className={`form-input ${errors.guests ? 'input-error' : ''}`}
                placeholder="எ.கா: 200"
                value={formData.guests}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={errors.guests ? 'true' : 'false'}
                aria-describedby={errors.guests ? 'guests-error-msg' : undefined}
              />
              {errors.guests && (
                <p id="guests-error-msg" className="form-error-msg" role="alert">
                  {errors.guests}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="popup-form-actions">
              <button
                type="submit"
                className="popup-submit-btn"
                aria-label="WhatsApp மூலம் அனுப்பவும்"
              >
                <WhatsAppIcon size={20} className="btn-whatsapp-icon" />
                <span>WhatsApp மூலம் அனுப்பவும்</span>
              </button>
            </div>

            <p className="form-disclaimer">
              குறிப்பு: பொத்தானை அழுத்தியவுடன் WhatsApp செயலி அல்லது தளம் திறக்கும். அங்கு செய்தியை சரிபார்த்து அனுப்பலாம்.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
export default EnquiryPopup;
