import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FacilitiesSection from './components/FacilitiesSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import EnquiryPopup from './components/EnquiryPopup';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

export const App = () => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('smp_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Popup state: automatically open on every fresh page load and reload
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('smp_theme', theme); } catch { /* ignore */ }
  }, [theme]);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // ── Always start at the top on refresh (manual scroll restoration) ──
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // ── Scroll Reveal Observer — invisible → visible on scroll ──
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.scroll-reveal').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.revealDelay;
            if (delay) {
              entry.target.style.transitionDelay = delay;
            }
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    // Observe all scroll-reveal elements after paint
    let frameId = requestAnimationFrame(() => {
      const revealElements = document.querySelectorAll('.scroll-reveal');
      revealElements.forEach((el) => observer.observe(el));
    });

    // Safety fallback: ensure no element stays permanently invisible if observer doesn't fire
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll('.scroll-reveal:not(.revealed)').forEach((el) => {
        el.classList.add('revealed');
      });
    }, 4500);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(safetyTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenEnquiry={() => setIsPopupOpen(true)}
      />

      <main id="main-content">
        <HeroSection onOpenEnquiry={() => setIsPopupOpen(true)} />
        <AboutSection />
        <FacilitiesSection />
        <GallerySection />
        <ContactSection onOpenEnquiry={() => setIsPopupOpen(true)} />
      </main>

      <Footer onOpenEnquiry={() => setIsPopupOpen(true)} />

      <EnquiryPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />

      <WhatsAppButton />
    </div>
  );
};

export default App;