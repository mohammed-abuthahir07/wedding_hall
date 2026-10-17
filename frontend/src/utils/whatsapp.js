export const WHATSAPP_NUMBER = "918870889819";
export const DISPLAY_PHONE_NUMBER = "8870889819";

/**
 * Clean phone number to ensure strictly international digits only (e.g. 918870889819)
 * Removes spaces, plus signs, brackets, hyphens.
 */
export const sanitizeWhatsAppNumber = (num = WHATSAPP_NUMBER) => {
  return String(num).replace(/[^0-9]/g, '');
};

/**
 * Generate a clean wa.me URL with properly encoded message
 */
export const buildWhatsAppUrl = (message, number = WHATSAPP_NUMBER) => {
  const cleanNumber = sanitizeWhatsAppNumber(number);
  const encodedText = encodeURIComponent(message || '');
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
};

/**
 * Open WhatsApp directly in new window/tab or native app
 */
export const openWhatsApp = (message, number = WHATSAPP_NUMBER) => {
  const url = buildWhatsAppUrl(message, number);
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  return { url, win };
};
