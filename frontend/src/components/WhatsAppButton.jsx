
import React from 'react';
import { WhatsAppIcon } from './Icons';

export const WhatsAppButton = () => {
  // India country code (91) + 10-digit mobile number
  const destinationNumber = '919842191273';

  const defaultMessage =
    'வணக்கம்! குழந்தைசாமி அவர்களே சமூகப் பணிமன்றம் திருமண மண்டபம் பற்றிய விவரங்கள் அறிய விரும்புகிறேன்.';

  const whatsappUrl = `https://wa.me/${destinationNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <aside aria-label="WhatsApp தொடர்பு">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="WhatsApp மூலம் தொடர்பு கொள்ள"
        title="WhatsApp மூலம் தொடர்பு கொள்ள"
      >
        <span
          className="floating-whatsapp-tooltip"
          aria-hidden="true"
        >
          WhatsApp தொடர்பு
        </span>

        <WhatsAppIcon
          size={30}
          className="floating-whatsapp-svg"
        />
      </a>
    </aside>
  );
};

export default WhatsAppButton;
