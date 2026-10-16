import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, MenuIcon, CloseIcon, KalasamIcon } from './Icons';

export const Navbar = ({ theme, onToggleTheme, onOpenEnquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(() => (typeof window !== 'undefined' ? window.scrollY > 20 : false));

  useEffect(() => {
    let lastScrolled = window.scrollY > 20;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrolled = window.scrollY > 20;
          if (currentScrolled !== lastScrolled) {
            lastScrolled = currentScrolled;
            setIsScrolled(currentScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'முகப்பு', href: '#home' },
    { label: 'எங்களைப் பற்றி', href: '#about' },
    { label: 'வசதிகள்', href: '#facilities' },
    { label: 'புகைப்படங்கள்', href: '#gallery' },
    { label: 'தொடர்பு', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">

        {/* ── Brand Logo ── */}
        <a
          href="#home"
          className="navbar-brand"
          onClick={(e) => handleLinkClick(e, '#home')}
          aria-label="சமூகப் பணிமன்றம் - முகப்பு"
        >
          {/* Pink rounded icon box */}
          <span className="brand-icon-wrapper" aria-hidden="true">
            <KalasamIcon size={22} className="brand-kalasam-icon" />
          </span>

          {/* Brand text — name + tagline stacked */}
          <span className="brand-text-group">
            <span className="brand-name">சமூகப் பணிமன்றம்</span>
            <span className="brand-tagline">திருமண மண்டபம் • மதுரை</span>
          </span>
        </a>

        {/* ── Desktop Nav Links ── */}
        <nav className="desktop-nav" aria-label="முதன்மை வழிசெலுத்தல்">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href} className="nav-item">
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Right-side action buttons ── */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'ஒளி முறைக்கு மாற்றவும்' : 'இருள் முறைக்கு மாற்றவும்'}
            title={theme === 'dark' ? 'ஒளி முறைக்கு மாற்றவும்' : 'இருள் முறைக்கு மாற்றவும்'}
          >
            {theme === 'dark'
              ? <SunIcon size={20} className="theme-icon sun-icon" />
              : <MoonIcon size={20} className="theme-icon moon-icon" />
            }
          </button>

          {/* Enquiry Button — hidden on small screens, shown via drawer instead */}
          <button
            type="button"
            className="navbar-enquiry-btn"
            onClick={onOpenEnquiry}
            aria-label="முன்பதிவு செய்ய"
          >
            முன்பதிவு செய்ய
          </button>

          {/* Hamburger — only visible on mobile */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'மெனுவை மூடவும்' : 'மெனுவை திறக்கவும்'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'mobile-nav-open' : ''}`}>
        <nav aria-label="கைபேசி வழிசெலுத்தல்">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.href} className="mobile-nav-item">
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-drawer-actions">
            <button
              type="button"
              className="mobile-drawer-enquiry-btn"
              onClick={() => { setMobileMenuOpen(false); onOpenEnquiry(); }}
            >
              முன்பதிவு செய்ய
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
