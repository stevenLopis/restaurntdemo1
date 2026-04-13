/* ─────────────────────────────────────────────────────────────
   MobileMenu.jsx  — drop this into your Navbar component
   Toggle `isOpen` via your existing hamburger button state.
   ───────────────────────────────────────────────────────────── */

import { useState } from "react";

export function MobileMenuNav({ isOpen, cartCount = 0, onClose }) {
  if (!isOpen) return null;

  const links = [
    { label: "Home",    href: "/",        icon: IconHome },
    { label: "Menu",    href: "/menu",    icon: IconMenu },
    { label: "About",   href: "/about",   icon: IconAbout },
    { label: "Help",    href: "/help",    icon: IconHelp },
    { label: "Contact", href: "/contact", icon: IconContact },
  ];

  return (
    <nav className="mobile-menu-nav" role="navigation" aria-label="Mobile navigation">

      {/* ── Regular nav links ── */}
      {links.map(({ label, href, icon: Icon }) => (
        <a key={label} href={href} onClick={onClose}>
          <Icon className="mnav-icon" aria-hidden="true" />
          {label}
        </a>
      ))}

      {/* ── Divider ── */}
      <div className="mnav-divider" role="separator" />

      {/* ── Cart (with badge) ── */}
      <a href="/cart" onClick={onClose}>
        <IconCart className="mnav-icon" aria-hidden="true" />
        Cart
        {cartCount > 0 && (
          <span className="mnav-cart-badge">{cartCount}</span>
        )}
      </a>

      {/* ── Order Now CTA ── */}
      <a href="/order" className="mnav-order" onClick={onClose}>
        ⚡ Order Now
      </a>

    </nav>
  );
}

/* ─── Inline SVG icons (no external dep needed) ─── */

const IconHome = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"
      stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconMenu = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6h16M4 12h16M4 18h16"
      stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
  </svg>
);

const IconAbout = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" fill="none"/>
    <path d="M12 8v1M12 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconHelp = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" fill="none"/>
    <path d="M9.5 9a2.5 2.5 0 015 0c0 2-2.5 2.5-2.5 4.5M12 17.5v.5"
      stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
  </svg>
);

const IconContact = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
      stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconCart = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
      stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
