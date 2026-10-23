import React, { useState, useEffect } from 'react';
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
import Manivizah from './components/Manivizah';
import Guests from './components/Guests';

export const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.colorScheme = 'light';
    try {
      localStorage.removeItem('smp_theme');
    } catch {
      /* ignore */
    }
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

    let frameId = requestAnimationFrame(() => {
      const revealElements = document.querySelectorAll('.scroll-reveal');
      revealElements.forEach((el) => observer.observe(el));
    });

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

  const openEnquiry = () => setIsPopupOpen(true);

  return (
    <div className="app-container">
      <a href="#main-content" className="skip-link">
        முக்கிய உள்ளடக்கத்திற்கு செல்ல
      </a>

      <Navbar onOpenEnquiry={openEnquiry} />

      <main id="main-content">
        <HeroSection onOpenEnquiry={openEnquiry} />
        <AboutSection />
        <FacilitiesSection />
        <Manivizah />
        <GallerySection />
        <Guests />
        <ContactSection onOpenEnquiry={openEnquiry} />
      </main>

      <Footer onOpenEnquiry={openEnquiry} />

      <EnquiryPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />

      <WhatsAppButton />
    </div>
  );
};

export default App;
