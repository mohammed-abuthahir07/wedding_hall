// Test suite for Form Validation & WhatsApp Integration

function validateForm({ name, phone, guests }) {
  const errors = {};
  const trimmedName = (name || '').trim();
  if (!trimmedName) {
    errors.name = 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்';
  } else if (trimmedName.length < 2) {
    errors.name = 'பெயர் குறைந்தபட்சம் 2 எழுத்துக்கள் இருக்க வேண்டும்';
  }

  // Accepts any user-entered phone format (local, mobile, international with +91)
  const trimmedPhone = (phone || '').trim();
  if (!trimmedPhone) {
    errors.phone = 'தயவுசெய்து உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்';
  }

  const trimmedGuests = String(guests || '').trim();
  if (!trimmedGuests) {
    errors.guests = 'விருந்தினர்களின் எண்ணிக்கையை உள்ளிடவும்';
  } else {
    const numGuests = Number(trimmedGuests);
    if (!Number.isInteger(numGuests) || numGuests < 1) {
      errors.guests = 'விருந்தினர்களின் எண்ணிக்கை 1 அல்லது அதற்கு மேல் இருக்க வேண்டும்';
    } else if (numGuests > 5000) {
      errors.guests = 'சரியான விருந்தினர்களின் எண்ணிக்கையை உள்ளிடவும்';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

function buildWhatsAppUrl({ name, phone, guests }) {
  const trimmedName = name.trim();
  const cleanPhone = phone.trim();
  const guestsCount = String(guests).trim();
  const tamilMessage = 
`வணக்கம்! சமூகப் பணிமன்றம் திருமண மண்டபம் முன்பதிவு பற்றிய தகவல் தேவை.

• மண்டபத்தின் பெயர்: சமூகப் பணிமன்றம் (ஞானஒலிவுபுரம், மதுரை)
• பெயர்: ${trimmedName}
• தொலைபேசி எண்: ${cleanPhone}
• விருந்தினர்களின் எண்ணிக்கை: ${guestsCount} பேர்

தயவுசெய்து மண்டப முன்பதிவு விவரங்களை தெரிவிக்கவும். நன்றி!`;

  return `https://wa.me/918870889819?text=${encodeURIComponent(tamilMessage)}`;
}

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    passed++;
    console.log(`✓ [PASS] ${message}`);
  } else {
    console.error(`✗ [FAIL] ${message}`);
  }
}

console.log('--- FORM VALIDATION TESTS ---');

// 1. All empty
const test1 = validateForm({ name: '', phone: '', guests: '' });
assert(!test1.isValid, 'All empty fails validation');
assert(test1.errors.name === 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்', 'Name empty error message in Tamil');
assert(test1.errors.phone === 'தயவுசெய்து உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்', 'Phone empty error message in Tamil');
assert(test1.errors.guests === 'விருந்தினர்களின் எண்ணிக்கையை உள்ளிடவும்', 'Guests empty error message in Tamil');

// 2. Name too short
const test2 = validateForm({ name: 'A', phone: '8870889819', guests: '200' });
assert(!test2.isValid, 'Short name fails validation');
assert(test2.errors.name === 'பெயர் குறைந்தபட்சம் 2 எழுத்துக்கள் இருக்க வேண்டும்', 'Short name error message in Tamil');

// 3. User provides international formatted phone (+918012693457)
const test3 = validateForm({ name: 'கண்ணன்', phone: '+918012693457', guests: '200' });
assert(test3.isValid, 'International +91 phone passes without error');

// 4. User provides standard mobile number
const test4 = validateForm({ name: 'கண்ணன்', phone: '8870889819', guests: '200' });
assert(test4.isValid, 'Standard 10-digit phone passes');

// 5. Zero guests
const test5 = validateForm({ name: 'கண்ணன்', phone: '8870889819', guests: '0' });
assert(!test5.isValid, 'Zero guests fails');
assert(test5.errors.guests === 'விருந்தினர்களின் எண்ணிக்கை 1 அல்லது அதற்கு மேல் இருக்க வேண்டும்', 'Zero guests error in Tamil');

// 6. Negative guests
const test6 = validateForm({ name: 'கண்ணன்', phone: '8870889819', guests: '-50' });
assert(!test6.isValid, 'Negative guests fails');

// 7. Decimal guests
const test7 = validateForm({ name: 'கண்ணன்', phone: '8870889819', guests: '150.5' });
assert(!test7.isValid, 'Decimal guests fails');

// 8. Too many guests (>5000)
const test8 = validateForm({ name: 'கண்ணன்', phone: '8870889819', guests: '99999' });
assert(!test8.isValid, 'Too many guests fails');

// 9. Valid form with Tamil name
const test9 = validateForm({ name: 'முத்துராமலிங்கம்', phone: '8870889819', guests: '250' });
assert(test9.isValid, 'Valid Tamil submission passes validation');
assert(Object.keys(test9.errors).length === 0, 'No errors on valid input');

// 10. Valid form with spaces in phone (e.g. +91 88708 89819)
const test10 = validateForm({ name: 'சுரேஷ் குமார்', phone: '+91 88708 89819', guests: '180' });
assert(test10.isValid, 'Formatted phone with spaces and country code passes');

console.log('\n--- WHATSAPP URL GENERATION TESTS ---');

const waUrl = buildWhatsAppUrl({ name: 'முத்துராமலிங்கம்', phone: '+918012693457', guests: '250' });
assert(waUrl.startsWith('https://wa.me/918870889819?text='), 'Target phone number is international format 918870889819');
assert(waUrl.includes('encodeURIComponent') === false, 'URL is correctly encoded without raw string leaks');

const decodedMsg = decodeURIComponent(waUrl.split('text=')[1]);
assert(decodedMsg.includes('சமூகப் பணிமன்றம்'), 'Prefilled message includes brand name சமூகப் பணிமன்றம்');
assert(decodedMsg.includes('முத்துராமலிங்கம்'), 'Prefilled message includes customer name');
assert(decodedMsg.includes('+918012693457'), 'Prefilled message includes actual customer phone');
assert(decodedMsg.includes('250 பேர்'), 'Prefilled message includes guest count');
assert(decodedMsg.includes('ஞானஒலிவுபுரம், மதுரை'), 'Prefilled message includes location ஞானஒலிவுபுரம், மதுரை');

console.log(`\nRESULTS: ${passed} / ${total} tests passed.`);
if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}
