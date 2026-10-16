// Test suite for Form Validation & WhatsApp Integration

function validateForm({ name, phone, guests }) {
  const errors = {};
  const trimmedName = (name || '').trim();
  if (!trimmedName) {
    errors.name = 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்';
  } else if (trimmedName.length < 2) {
    errors.name = 'பெயர் குறைந்தபட்சம் 2 எழுத்துக்கள் இருக்க வேண்டும்';
  }

  const trimmedPhone = (phone || '').trim().replace(/[\s-]/g, '');
  if (!trimmedPhone) {
    errors.phone = 'தயவுசெய்து உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்';
  } else if (!/^[6-9]\d{9}$/.test(trimmedPhone)) {
    errors.phone = 'சரியான 10 இலக்க இந்திய தொலைபேசி எண்ணை உள்ளிடவும் (எ.கா: 9876543210)';
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
  const cleanPhone = phone.trim().replace(/[\s-]/g, '');
  const guestsCount = String(guests).trim();
  const tamilMessage = 
`வணக்கம்! சமூகப் பணிமன்றம் திருமண மண்டபம் முன்பதிவு பற்றிய தகவல் தேவை.

• மண்டபத்தின் பெயர்: சமூகப் பணிமன்றம் (யானவொலிபுரம், மதுரை)
• பெயர்: ${trimmedName}
• தொலைபேசி எண்: ${cleanPhone}
• விருந்தினர்களின் எண்ணிக்கை: ${guestsCount} பேர்

தயவுசெய்து மண்டப முன்பதிவு விவரங்களை தெரிவிக்கவும். நன்றி!`;

  return `https://wa.me/918682096578?text=${encodeURIComponent(tamilMessage)}`;
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
const test2 = validateForm({ name: 'A', phone: '9876543210', guests: '200' });
assert(!test2.isValid, 'Short name fails validation');
assert(test2.errors.name === 'பெயர் குறைந்தபட்சம் 2 எழுத்துக்கள் இருக்க வேண்டும்', 'Short name error message in Tamil');

// 3. Invalid phone with letters
const test3 = validateForm({ name: 'கண்ணன்', phone: '98765abcd0', guests: '200' });
assert(!test3.isValid, 'Phone with letters fails');
assert(test3.errors.phone.includes('சரியான 10 இலக்க இந்திய தொலைபேசி எண்ணை உள்ளிடவும்'), 'Invalid phone error message in Tamil');

// 4. Invalid phone starting with invalid digit (e.g. 5)
const test4 = validateForm({ name: 'கண்ணன்', phone: '5876543210', guests: '200' });
assert(!test4.isValid, 'Phone starting with 5 fails');

// 5. Zero guests
const test5 = validateForm({ name: 'கண்ணன்', phone: '9876543210', guests: '0' });
assert(!test5.isValid, 'Zero guests fails');
assert(test5.errors.guests === 'விருந்தினர்களின் எண்ணிக்கை 1 அல்லது அதற்கு மேல் இருக்க வேண்டும்', 'Zero guests error in Tamil');

// 6. Negative guests
const test6 = validateForm({ name: 'கண்ணன்', phone: '9876543210', guests: '-50' });
assert(!test6.isValid, 'Negative guests fails');

// 7. Decimal guests
const test7 = validateForm({ name: 'கண்ணன்', phone: '9876543210', guests: '150.5' });
assert(!test7.isValid, 'Decimal guests fails');

// 8. Too many guests (>5000)
const test8 = validateForm({ name: 'கண்ணன்', phone: '9876543210', guests: '99999' });
assert(!test8.isValid, 'Too many guests fails');

// 9. Valid form with Tamil name
const test9 = validateForm({ name: 'முத்துராமலிங்கம்', phone: '8682096578', guests: '250' });
assert(test9.isValid, 'Valid Tamil submission passes validation');
assert(Object.keys(test9.errors).length === 0, 'No errors on valid input');

// 10. Valid form with spaces in phone (e.g. 86820 96578)
const test10 = validateForm({ name: 'சுரேஷ் குமார்', phone: '86820 96578', guests: '180' });
assert(test10.isValid, 'Formatted phone with space passes');

console.log('\n--- WHATSAPP URL GENERATION TESTS ---');

const waUrl = buildWhatsAppUrl({ name: 'முத்துராமலிங்கம்', phone: '86820 96578', guests: '250' });
assert(waUrl.startsWith('https://wa.me/918682096578?text='), 'Target phone number is international format 918682096578');
assert(waUrl.includes('encodeURIComponent') === false, 'URL is correctly encoded without raw string leaks');

const decodedMsg = decodeURIComponent(waUrl.split('text=')[1]);
assert(decodedMsg.includes('சமூகப் பணிமன்றம்'), 'Prefilled message includes brand name சமூகப் பணிமன்றம்');
assert(decodedMsg.includes('முத்துராமலிங்கம்'), 'Prefilled message includes customer name');
assert(decodedMsg.includes('8682096578'), 'Prefilled message includes cleaned customer phone');
assert(decodedMsg.includes('250 பேர்'), 'Prefilled message includes guest count');
assert(decodedMsg.includes('யானவொலிபுரம், மதுரை'), 'Prefilled message includes location Yanavolipuram, Madurai');

console.log(`\nRESULTS: ${passed} / ${total} tests passed.`);
if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}
