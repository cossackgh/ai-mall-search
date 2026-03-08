"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#shops", label: "Магазины" },
  { href: "#food", label: "Рестораны" },
  { href: "#entertainment", label: "Развлечения" },
  { href: "#events", label: "Акции" },
  { href: "#services", label: "Услуги" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrolled]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-mall-dark/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-card flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">Г</span>
            </div>
            <span className="text-white font-bold text-lg leading-tight">
              ТРЦ «Галактика»
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop phone */}
          <a
            href="tel:+74957004200"
            className="hidden lg:block text-accent font-semibold text-sm hover:text-accent/80 transition-colors"
          >
            +7 (495) 700-42-00
          </a>

          {/* Burger button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-xl hover:bg-white/10 transition-colors"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-mall-dark/95 backdrop-blur-md px-4 pb-4 pt-2 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="text-white/80 hover:text-white hover:bg-white/10 text-base font-medium
                         transition-colors px-4 py-3 rounded-xl"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+74957004200"
            onClick={handleNavClick}
            className="text-accent font-semibold text-base px-4 py-3 rounded-xl hover:bg-white/10 transition-colors mt-1 border-t border-white/10 pt-4"
          >
            +7 (495) 700-42-00
          </a>
        </nav>
      </div>
    </header>
  );
}
