import React, { useState, useEffect } from 'react';
import { NAV_PAGES } from '../data/menu.js';
import '../styles/navbar.css';

/* ─── RESPONSIVE NAVBAR ────────────────────────────────────────────── */
function Navbar({ page, setPage, cartCount }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect scroll for navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking a nav link
  const handleNavClick = (pageItem) => {
    setPage(pageItem);
    setMenuOpen(false);
  };

  // Close menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        
        {/* Logo */}
        <button className="logo-btn" onClick={() => handleNavClick('Home')}>
          <div className="logo-box">
            <span className="logo-text">NB</span>
            <span className="logo-dot" />
          </div>
          <div className="logo-text-group">
            <div className="glitch-wrap" data-text="NEON BYTE">
              NEON BYTE
            </div>
            <div className="logo-tagline">EAT. UPGRADE. REPEAT.</div>
          </div>
        </button>

        {/* Desktop Navigation Menu */}
        <div className="nav-menu-desktop">
          {NAV_PAGES.map((pageItem) => (
            <button
              key={pageItem}
              className={`nav-link ${page === pageItem ? 'active' : ''}`}
              onClick={() => handleNavClick(pageItem)}
            >
              {pageItem}
            </button>
          ))}
        </div>

        {/* Desktop Cart & Order Button */}
        <div className="nav-actions-desktop">
          <button className="cart-btn" onClick={() => handleNavClick('Cart')} title="Shopping Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>

          <button className="btn-neon-cyan" onClick={() => handleNavClick('Menu')}>
            ORDER NOW
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="hamburger-wrapper">
          <button 
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            title="Toggle Menu"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line line1" />
            <span className="hamburger-line line2" />
            <span className="hamburger-line line3" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {NAV_PAGES.map((pageItem) => (
            <button
              key={pageItem}
              className={`mobile-nav-link ${page === pageItem ? 'active' : ''}`}
              onClick={() => handleNavClick(pageItem)}
            >
              {pageItem}
            </button>
          ))}
          
          {/* Mobile Cart & Order */}
          <div className="mobile-actions">
            <button className="mobile-cart-btn" onClick={() => handleNavClick('Cart')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Cart {cartCount > 0 && `(${cartCount})`}
            </button>

            <button className="mobile-order-btn" onClick={() => handleNavClick('Menu')}>
              ORDER NOW
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;