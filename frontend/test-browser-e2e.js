import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const PORT = 4173;
const DIST_DIR = path.resolve('dist');

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

// 1. Static file server for dist
function startServer() {
  const server = http.createServer((req, res) => {
    let filePath = path.join(DIST_DIR, req.url.split('?')[0]);
    if (req.url === '/' || req.url === '') {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    });
  });

  return new Promise((resolve) => {
    server.listen(PORT, '127.0.0.1', () => {
      console.log(`✓ Local test server running at http://127.0.0.1:${PORT}`);
      resolve(server);
    });
  });
}

// 2. CDP helper class
class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
    this.events = [];
    this.consoleLogs = [];
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) {
            reject(new Error(msg.error.message));
          } else {
            resolve(msg.result);
          }
        } else if (msg.method === 'Runtime.consoleAPICalled') {
          this.consoleLogs.push(msg.params);
        } else if (msg.method === 'Runtime.exceptionThrown') {
          console.error('JS RUNTIME EXCEPTION:', JSON.stringify(msg.params.exceptionDetails, null, 2));
        } else if (msg.method) {
          this.events.push(msg);
        }
      };
    });
  }

  async send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result?.value;
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

// Helper sleep
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const server = await startServer();
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  console.log(`Starting headless Chrome from: ${chromePath}...`);
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=' + path.resolve('.chrome-test-profile')
  ]);

  await delay(1500);

  let versionInfo;
  for (let i = 0; i < 10; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9222/json/version');
      versionInfo = await res.json();
      break;
    } catch {
      await delay(500);
    }
  }

  if (!versionInfo) {
    console.error('Failed to connect to headless Chrome remote debugger');
    chromeProcess.kill();
    server.close();
    process.exit(1);
  }

  console.log(`✓ Connected to Chrome: ${versionInfo['Browser']}`);

  // Create new page target
  const newTargetRes = await fetch('http://127.0.0.1:9222/json/new?http://127.0.0.1:' + PORT, {
    method: 'PUT'
  });
  const pageTarget = await newTargetRes.json();
  const cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await cdp.connect();

  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('DOM.enable');

  console.log('\n==================================================');
  console.log('       SAMUGA PANI MANDRAM — COMPREHENSIVE QA');
  console.log('==================================================\n');

  // Viewports to test
  const viewports = [
    { name: 'Small mobile', width: 320, height: 568, isMobile: true },
    { name: 'Mobile', width: 360, height: 800, isMobile: true },
    { name: 'Mobile', width: 375, height: 812, isMobile: true },
    { name: 'Mobile', width: 390, height: 844, isMobile: true },
    { name: 'Large mobile', width: 430, height: 932, isMobile: true },
    { name: 'Small tablet', width: 600, height: 900, isMobile: true },
    { name: 'Tablet', width: 768, height: 1024, isMobile: true },
    { name: 'Tablet', width: 820, height: 1180, isMobile: true },
    { name: 'Small laptop', width: 1024, height: 768, isMobile: false },
    { name: 'Laptop', width: 1280, height: 800, isMobile: false },
    { name: 'Desktop', width: 1440, height: 900, isMobile: false },
    { name: 'Large monitor', width: 1920, height: 1080, isMobile: false }
  ];

  let testPassed = 0;
  let testFailed = 0;

  function report(passed, testName, details = '') {
    if (passed) {
      testPassed++;
      console.log(`  ✓ [PASS] ${testName} ${details}`);
    } else {
      testFailed++;
      console.error(`  ✗ [FAIL] ${testName} ${details}`);
    }
  }

  // --- 1. SEO & DOCUMENT LEVEL AUDIT ---
  console.log('--- 1. SEO & Document Structure Audit ---');
  await cdp.send('Page.navigate', { url: `http://127.0.0.1:${PORT}/` });
  await delay(1200);

  const docLang = await cdp.evaluate('document.documentElement.lang');
  report(docLang === 'ta', 'Document language is Tamil (lang="ta")', `(got: "${docLang}")`);

  const pageTitle = await cdp.evaluate('document.title');
  report(pageTitle.includes('சமூகப் பணிமன்றம்'), 'Page title contains Tamil brand name', `("${pageTitle}")`);

  const metaDesc = await cdp.evaluate(`document.querySelector('meta[name="description"]')?.content`);
  report(Boolean(metaDesc && metaDesc.includes('மதுரை') && metaDesc.includes('சமூகப் பணிமன்றம்')), 'Tamil Meta description present and valid', `("${metaDesc?.substring(0, 45)}...")`);

  const h1Text = await cdp.evaluate(`document.querySelector('h1')?.textContent?.replace(/\\s+/g, ' ').trim()`);
  report(h1Text === 'ராசியான குளிர்சாதனத் திருமண மண்டபம்', 'Primary H1 is exactly "ராசியான குளிர்சாதனத் திருமண மண்டபம்"', `("${h1Text}")`);

  const jsonLd = await cdp.evaluate(`(() => {
    const el = document.querySelector('script[type="application/ld+json"]');
    return el ? JSON.parse(el.textContent) : null;
  })()`);
  report(Boolean(jsonLd && jsonLd.name === 'சமூகப் பணிமன்றம்' && jsonLd.telephone === '+918870889819'), 'Valid JSON-LD EventVenue structured data', `(Name: ${jsonLd?.name}, Tel: ${jsonLd?.telephone})`);

  // --- 2. AUTOMATIC BOOKING POPUP ON LOAD & REFRESH AUDIT ---
  console.log('\n--- 2. Automatic Booking Popup on Load & Refresh Audit ---');
  // Scenario 1: Initial page open automatically displays the popup
  const isPopupInitiallyOpen = await cdp.evaluate(`Boolean(document.querySelector('.popup-dialog'))`);
  report(isPopupInitiallyOpen, 'Scenario 1: Popup opens automatically on initial website visit');

  const initialBodyOverflow = await cdp.evaluate(`document.body.style.overflow`);
  const initialHtmlOverflow = await cdp.evaluate(`document.documentElement.style.overflow`);
  report(
    initialBodyOverflow === 'hidden' && initialHtmlOverflow === 'hidden',
    'Background scrolling locked on both documentElement and body while popup is open',
    `(html: "${initialHtmlOverflow}", body: "${initialBodyOverflow}")`
  );

  const popupTitle = await cdp.evaluate(`document.getElementById('enquiry-modal-title')?.textContent?.trim()`);
  report(popupTitle === 'மண்டப முன்பதிவு & விவரங்கள்', 'Popup title is in Tamil', `("${popupTitle}")`);

  // Check form labels in popup
  const formLabels = await cdp.evaluate(`Array.from(document.querySelectorAll('.form-label')).map(l => l.textContent.replace('*', '').trim())`);
  report(
    formLabels.includes('பெயர்') && formLabels.includes('தொலைபேசி எண்') && formLabels.includes('விருந்தினர்களின் எண்ணிக்கை'),
    'Popup has all 3 required Tamil labels (பெயர், தொலைபேசி எண், விருந்தினர்களின் எண்ணிக்கை)',
    `(${formLabels.join(', ')})`
  );

  // Check submit button in Tamil
  const submitBtnText = await cdp.evaluate(`document.querySelector('.popup-submit-btn')?.textContent?.trim()`);
  report(submitBtnText.includes('WhatsApp மூலம் அனுப்பவும்'), 'Submit button has Tamil label "WhatsApp மூலம் அனுப்பவும்"', `("${submitBtnText}")`);

  // Scenario 3: Close popup using X button with smooth exit animation
  await cdp.evaluate(`document.querySelector('.popup-close-btn').click()`);
  // Check exit animation class applied during closing
  await delay(100);
  const hasClosingClass = await cdp.evaluate(`Boolean(document.querySelector('.popup-backdrop.popup-closing'))`);
  report(hasClosingClass, 'Smooth exit animation initiated (.popup-closing)');

  // Wait for animation to finish
  await delay(300);
  const isPopupClosed = await cdp.evaluate(`!document.querySelector('.popup-dialog')`);
  report(isPopupClosed, 'Scenario 3: Popup closes smoothly and unmounts after exit animation');

  const restoredBodyOverflow = await cdp.evaluate(`document.body.style.overflow`);
  const restoredHtmlOverflow = await cdp.evaluate(`document.documentElement.style.overflow`);
  report(
    restoredBodyOverflow === '' && restoredHtmlOverflow === '',
    'Background scrolling restored cleanly on both documentElement and body after popup is closed'
  );

  // Scenario 4: Scroll down after closing — popup must NOT reopen
  await cdp.evaluate(`window.scrollTo(0, 1200)`);
  await delay(500);
  const popupAfterScroll = await cdp.evaluate(`Boolean(document.querySelector('.popup-dialog'))`);
  report(!popupAfterScroll, 'Scenario 4: Popup does not reopen when user scrolls down the page');

  // Scenario 5: Full page refresh after closing — popup appears again automatically
  await cdp.send('Page.reload');
  await delay(1200);

  const isPopupOpenAfterRefresh = await cdp.evaluate(`Boolean(document.querySelector('.popup-dialog'))`);
  report(isPopupOpenAfterRefresh, 'Scenario 5: Popup appears again automatically after page refresh');

  const scrollYAfterRefresh = await cdp.evaluate(`window.scrollY`);
  report(scrollYAfterRefresh <= 5, 'Page returns to top on refresh', `(scrollY: ${scrollYAfterRefresh})`);

  // Scenario 6: Close with Escape key
  await cdp.evaluate(`window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))`);
  await delay(400);
  const isClosedViaEscape = await cdp.evaluate(`!document.querySelector('.popup-dialog')`);
  report(isClosedViaEscape, 'Scenario 6: Popup closes smoothly when pressing Escape key');

  // Scenario 7: Form validation check
  await cdp.evaluate(`document.querySelector('.navbar-enquiry-btn')?.click() || document.querySelector('.hero-enquiry-cta-btn')?.click()`);
  await delay(300);

  // Submit empty form to trigger validation errors
  await cdp.evaluate(`document.querySelector('.popup-form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))`);
  await delay(200);

  const validationErrors = await cdp.evaluate(`Array.from(document.querySelectorAll('.form-error-msg')).map(e => e.textContent.trim())`);
  report(
    validationErrors.length >= 2,
    'Scenario 7: Form validates required fields in Tamil before opening WhatsApp',
    `(${validationErrors.join(' | ')})`
  );

  // Close popup again
  await cdp.evaluate(`document.querySelector('.popup-close-btn')?.click()`);
  await delay(400);

  // Check no duplicate dialogs ever exist
  const dialogCount = await cdp.evaluate(`document.querySelectorAll('.popup-dialog').length`);
  report(dialogCount === 0, 'Scenario 10: Zero duplicate dialogs present in DOM');

  // --- 2C. HIDDEN SCROLLBAR & FLUID SCROLLING FUNCTIONALITY AUDIT ---
  console.log('\n--- 2C. Hidden Scrollbar & Fluid Scrolling Functionality Audit ---');

  const htmlScrollbarWidth = await cdp.evaluate(`getComputedStyle(document.documentElement).scrollbarWidth`);
  report(htmlScrollbarWidth === 'none', 'Document root (html) has scrollbar-width: none (hidden scrollbar)', `(got: "${htmlScrollbarWidth}")`);

  const bodyScrollbarWidth = await cdp.evaluate(`getComputedStyle(document.body).scrollbarWidth`);
  report(bodyScrollbarWidth === 'none', 'Document body has scrollbar-width: none (hidden scrollbar)', `(got: "${bodyScrollbarWidth}")`);

  const appContainerOverflowY = await cdp.evaluate(`getComputedStyle(document.querySelector('.app-container')).overflowY`);
  report(
    appContainerOverflowY === 'visible',
    'Main .app-container does not create an unintended nested scroll container',
    `(overflowY: "${appContainerOverflowY}")`
  );

  // Test that normal document scrolling is 100% functional
  await cdp.evaluate(`window.scrollTo(0, 1200)`);
  await delay(200);
  const actualScrollY = await cdp.evaluate(`window.scrollY`);
  report(
    actualScrollY >= 1100,
    'Page scrolls smoothly through content despite hidden scrollbar',
    `(scrolled to: ${actualScrollY}px)`
  );
  await cdp.evaluate(`window.scrollTo(0, 0)`);
  await delay(200);

  // --- 2B. DIRECTIONAL SLIDE-IN ANIMATION AUDIT ---
  console.log('\n--- 2B. Directional Slide-in Reveal Animation Audit ---');

  const leftElements = await cdp.evaluate(`document.querySelectorAll('.scroll-reveal.reveal-left').length`);
  report(leftElements >= 4, `Left-to-Right (.reveal-left) elements present across sections (Found: ${leftElements})`);

  const rightElements = await cdp.evaluate(`document.querySelectorAll('.scroll-reveal.reveal-right').length`);
  report(rightElements >= 4, `Right-to-Left (.reveal-right) elements present across sections (Found: ${rightElements})`);

  const upElements = await cdp.evaluate(`document.querySelectorAll('.scroll-reveal.reveal-up').length`);
  report(upElements >= 4, `Bottom-to-Top (.reveal-up) elements present across sections (Found: ${upElements})`);

  const heroDirPanels = await cdp.evaluate(`Boolean(document.querySelector('.hero-reveal-left') && document.querySelector('.hero-reveal-right'))`);
  report(heroDirPanels, 'Hero feature cards have left & right slide-in entrance animations');

  // Scroll through entire page progressively to trigger reveal on all elements
  await cdp.evaluate(`(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 350) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 40));
    }
    window.scrollTo(0, document.body.scrollHeight);
  })()`);
  await delay(800);

  const unrevealedCount = await cdp.evaluate(`document.querySelectorAll('.scroll-reveal:not(.revealed)').length`);
  report(unrevealedCount === 0, `All scroll-reveal elements successfully animate into view when scrolled (Unrevealed: ${unrevealedCount})`);

  // Return to top
  await cdp.evaluate(`window.scrollTo(0, 0)`);
  await delay(300);

  // --- 2D. MOBILE NAVBAR REOPEN AND NAVIGATION STABILITY AUDIT ---
  console.log('\n--- 2D. Mobile Navbar Reopen and Navigation Stability Audit ---');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true
  });
  await delay(200);

  // Open mobile menu
  await cdp.evaluate(`document.querySelector('.mobile-menu-btn')?.click()`);
  await delay(300);
  const mobileMenuOpenInitially = await cdp.evaluate(`Boolean(document.querySelector('.mobile-nav-open'))`);
  report(mobileMenuOpenInitially, 'Mobile navigation menu opens on hamburger click');

  // Click a navigation item to move to another section (facilities)
  await cdp.evaluate(`(() => {
    const link = document.querySelector('.mobile-nav-link[href="#facilities"]');
    link?.click();
  })()`);
  await delay(800);

  const postNavStatus = await cdp.evaluate(`(() => {
    const el = document.querySelector('.navbar-header');
    const r = el?.getBoundingClientRect();
    return {
      scrollY: window.scrollY,
      navTop: r?.top,
      isMenuClosed: !document.querySelector('.mobile-nav-open')
    };
  })()`);
  report(postNavStatus.scrollY > 200 && postNavStatus.isMenuClosed, 'Navigating via mobile link scrolls to section and closes menu');

  // Click hamburger icon AGAIN at this scroll position (The user reported bug)
  await cdp.evaluate(`document.querySelector('.mobile-menu-btn')?.click()`);
  await delay(300);

  const reopenStatus = await cdp.evaluate(`(() => {
    const el = document.querySelector('.navbar-header');
    const r = el?.getBoundingClientRect();
    return {
      scrollY: window.scrollY,
      navTop: r?.top,
      isMenuOpen: Boolean(document.querySelector('.mobile-nav-open')),
      inViewport: r && r.top === 0 && r.height > 0
    };
  })()`);
  report(reopenStatus.inViewport && reopenStatus.isMenuOpen, 'Navbar remains visible at top:0 without disappearing or jumping when reopening menu');

  // Close menu and reset viewport
  await cdp.evaluate(`document.querySelector('.mobile-menu-btn')?.click()`);
  await delay(200);
  await cdp.send('Emulation.clearDeviceMetricsOverride');
  await delay(200);

  // --- 3. THEME SWITCHER REMOVAL AUDIT ---
  console.log('\n--- 3. Theme Switcher Removal Audit ---');
  await cdp.evaluate(`localStorage.setItem('smp_theme', 'dark')`);
  await cdp.send('Page.reload');
  await delay(1000);
  await cdp.evaluate(`document.querySelector('.popup-close-btn')?.click()`);
  await delay(300);

  const themeToggleCount = await cdp.evaluate(`document.querySelectorAll('.theme-toggle-btn').length`);
  report(themeToggleCount === 0, 'Theme toggle control is removed from the interface');

  const dataTheme = await cdp.evaluate(`document.documentElement.getAttribute('data-theme')`);
  report(!dataTheme, 'documentElement does not apply a leftover data-theme', `(got: "${dataTheme}")`);

  const savedTheme = await cdp.evaluate(`localStorage.getItem('smp_theme')`);
  report(savedTheme === null, 'Persisted smp_theme preference is cleared', `("${savedTheme}")`);

  const bodyBg = await cdp.evaluate(`getComputedStyle(document.body).backgroundColor`);
  report(bodyBg === 'rgb(255, 255, 255)', 'Site keeps the intended light background', `(${bodyBg})`);

  // --- 4. HERO SECTION & CONTENT INTEGRITY AUDIT ---
  console.log('\n--- 4. Hero Section & Content Integrity Audit ---');
  // Verify full background image on hero section
  const heroBgSrc = await cdp.evaluate(`document.querySelector('.hero-bg-img')?.currentSrc || document.querySelector('.hero-bg-img')?.src || ''`);
  report(Boolean(heroBgSrc), 'Hero section uses full-background hall photograph', `(${heroBgSrc.substring(0, 80)}...)`);

  // Verify dark overlay exists
  const hasDarkOverlay = await cdp.evaluate(`Boolean(document.querySelector('.hero-dark-overlay'))`);
  report(hasDarkOverlay, 'Dark gradient overlay is present over photograph for text readability');

  // Verify no separate image card exists
  const separateImageCardCount = await cdp.evaluate(`document.querySelectorAll('.hero-image-wrapper, .hero-image').length`);
  report(separateImageCardCount === 0, 'Old separate hero image card is completely removed', `(Count: ${separateImageCardCount})`);

  // Verify Pill Badge
  const heroBadge = await cdp.evaluate(`document.querySelector('.hero-pill-badge')?.textContent?.trim()`);
  report(heroBadge.includes('திருமண மண்டபம்') && (heroBadge.includes('ஞானஒளிவுபுரம்') || heroBadge.includes('யானவொலிபுரம்')), 'Hero top pill badge matches screenshot', `("${heroBadge}")`);

  // Verify Main Heading over background
  const heroH1 = await cdp.evaluate(`document.querySelector('.hero-heading-main')?.textContent?.replace(/\\s+/g, ' ').trim()`);
  report(heroH1 === 'ராசியான குளிர்சாதனத் திருமண மண்டபம்', 'Main heading over image: "ராசியான குளிர்சாதனத் திருமண மண்டபம்"', `("${heroH1}")`);

  // Verify Description & Organizer Line
  const heroDesc = await cdp.evaluate(`document.querySelector('.hero-description-text')?.textContent?.trim()`);
  report(heroDesc === '50 ஆண்டுகளுக்கும் மேலான பாரம்பரியம் கொண்ட மண்டபம்', 'Supporting description: "50 ஆண்டுகளுக்கும் மேலான பாரம்பரியம் கொண்ட மண்டபம்"', `("${heroDesc}")`);

  const heroOrganizer = await cdp.evaluate(`document.querySelector('.hero-organizer-line')?.textContent?.trim()`);
  report(heroOrganizer.includes('நடத்தப்படுகிறது'), 'Organizer line: "ஞானஒளிவுபுரம் சமூக சேவை சங்கத்தால் நடத்தப்படுகிறது"', `("${heroOrganizer}")`);

  // Verify CTA Button
  const heroCtaText = await cdp.evaluate(`document.querySelector('.hero-enquiry-cta-btn')?.textContent?.trim()`);
  report(heroCtaText.includes('விவரங்களை அறிய / முன்பதிவு செய்ய'), 'Primary CTA button: "விவரங்களை அறிய / முன்பதிவு செய்ய"', `("${heroCtaText}")`);

  // Verify Feature Panels over image
  const heroFeatures = await cdp.evaluate(`Array.from(document.querySelectorAll('.hero-feature-panel .feature-panel-title')).map(el => el.textContent.trim())`);
  report(
    heroFeatures.length === 2 &&
    heroFeatures.includes('200 பேர் அமரக்கூடிய அரங்கு') &&
    heroFeatures.includes('உணவு அருந்துவதற்கான தனி உணவுக்கூடம்'),
    'Two compact feature panels over image: 200 பேர் அமரக்கூடிய அரங்கு & தனி உணவுக்கூடம்',
    `(${heroFeatures.join(' | ')})`
  );

  // Verify Header Logo does NOT overlap Nav Links
  const headerOverlapCheck = await cdp.evaluate(`(() => {
    const brand = document.querySelector('.navbar-brand');
    const nav = document.querySelector('.desktop-nav');
    if (!brand || !nav || getComputedStyle(nav).display === 'none') return true;
    const bRect = brand.getBoundingClientRect();
    const nRect = nav.getBoundingClientRect();
    return nRect.left >= bRect.right;
  })()`);
  report(headerOverlapCheck, 'Header brand logo does not overlap navigation links');

  // --- 5. FACILITIES SECTION AUDIT ---
  console.log('\n--- 5. Confirmed Facilities Audit ---');
  const facilityTitles = await cdp.evaluate(`Array.from(document.querySelectorAll('.facility-feature-title')).map(el => el.textContent.trim())`);
  report(
    facilityTitles.length === 3 &&
    facilityTitles.includes('குளிர்சாதன திருமண அரங்கு') &&
    facilityTitles.includes('200 பேர் அமரக்கூடிய அரங்கு') &&
    facilityTitles.includes('உணவு அருந்துவதற்கான தனி உணவுக்கூடம்'),
    'Only the 3 confirmed facilities are displayed in Facilities section',
    `(${facilityTitles.join(' | ')})`
  );

  // --- 6. PHOTO GALLERY & LIGHTBOX AUDIT ---
  console.log('\n--- 6. Photo Gallery & Lightbox Audit ---');
  const galleryCount = await cdp.evaluate(`document.querySelectorAll('.gallery-item-card').length`);
  report(galleryCount === 9, 'Gallery displays all 9 local wedding hall photos', `(Count: ${galleryCount})`);

  // Test clicking first gallery image opens lightbox
  await cdp.evaluate(`document.querySelectorAll('.gallery-item-card')[0].click()`);
  await delay(300);
  const isLightboxOpen = await cdp.evaluate(`Boolean(document.querySelector('.lightbox-overlay'))`);
  report(isLightboxOpen, 'Clicking gallery image opens Lightbox modal');

  const lightboxCaption = await cdp.evaluate(`document.querySelector('.lightbox-caption')?.textContent?.trim()`);
  report(lightboxCaption === 'திருமண மண்டப முகப்பு தோற்றம்', 'Lightbox displays descriptive Tamil caption', `("${lightboxCaption}")`);

  // Test close lightbox
  await cdp.evaluate(`document.querySelector('.lightbox-close-btn').click()`);
  await delay(300);
  const isLightboxClosed = await cdp.evaluate(`!document.querySelector('.lightbox-overlay')`);
  report(isLightboxClosed, 'Closing lightbox works smoothly');

  // --- 7. FLOATING WHATSAPP & CONTACT ACTIONS AUDIT ---
  console.log('\n--- 7. Floating WhatsApp & Contact Audit ---');
  const floatingWaHref = await cdp.evaluate(`document.querySelector('.floating-whatsapp-btn')?.getAttribute('href')`);
  report(
    floatingWaHref && floatingWaHref.startsWith('https://wa.me/918870889819'),
    'Floating WhatsApp links to international destination 918870889819',
    `("${floatingWaHref?.substring(0, 36)}...")`
  );

  const phoneHref = await cdp.evaluate(`document.querySelector('.phone-action-btn')?.getAttribute('href')`);
  report(phoneHref === 'tel:8870889819', 'Direct call button links to tel:8870889819', `("${phoneHref}")`);

  // --- 8. RESPONSIVE VIEWPORT TESTING (ALL 12 VIEWPORTS) ---
  console.log('\n--- 8. Complete Responsive Viewport Layout Audit ---');

  for (const vp of viewports) {
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.isMobile
    });
    await delay(300);

    // Check for horizontal overflow
    const overflowCheck = await cdp.evaluate(`(() => {
      const scrollW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const bodyScrollW = document.body.scrollWidth;
      const bodyClientW = document.body.clientWidth;
      return {
        hasOverflow: (scrollW > clientW + 2) || (bodyScrollW > bodyClientW + 2),
        scrollW,
        clientW,
        bodyScrollW,
        bodyClientW
      };
    })()`);

    report(
      !overflowCheck.hasOverflow,
      `Viewport ${vp.width}x${vp.height} (${vp.name}): Zero horizontal overflow`,
      `(scrollWidth: ${overflowCheck.scrollW}, clientWidth: ${overflowCheck.clientW})`
    );

    // If mobile menu exists on small screens, test toggle
    if (vp.width <= 820) {
      const isMobileMenuBtnVisible = await cdp.evaluate(`(() => {
        const btn = document.querySelector('.mobile-menu-btn');
        return btn && getComputedStyle(btn).display !== 'none';
      })()`);
      report(isMobileMenuBtnVisible, `Viewport ${vp.width}px: Mobile navigation hamburger is visible`);
    }
  }

  // Check console error logs
  console.log('\n--- 9. Browser Console Errors & Warnings Audit ---');
  const errorLogs = cdp.consoleLogs.filter(log => log.type === 'error');
  report(errorLogs.length === 0, `Zero runtime browser console errors recorded (Found: ${errorLogs.length})`);

  console.log('\n==================================================');
  console.log(`TOTAL AUDIT RESULT: ${testPassed} PASSED, ${testFailed} FAILED.`);
  console.log('==================================================\n');

  // Clean up
  cdp.close();
  chromeProcess.kill();
  server.close();
  process.exit(testFailed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal error during browser QA testing:', err);
  process.exit(1);
});
