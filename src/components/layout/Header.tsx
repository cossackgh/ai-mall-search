"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/chat/SearchBar";

const navLinks = [
  { href: "#shops", label: "Магазины" },
  { href: "#food", label: "Рестораны" },
  { href: "#entertainment", label: "Развлечения" },
  { href: "#events", label: "Акции" },
  { href: "#services", label: "Услуги" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setPastHero(y > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
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
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-full gradient-card flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">Г</span>
            </div>
            <span className="text-white font-bold text-lg leading-tight whitespace-nowrap">
              ТРЦ «Галактика»
            </span>
          </a>

          {/* Desktop nav — hidden when search bar is shown */}
          <nav
            className={`hidden lg:flex items-center gap-8 transition-all duration-300 ${
              pastHero ? "opacity-0 pointer-events-none w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Centered search bar — fades in after scrolling past hero */}
          <div
            className={`hidden lg:block flex-1 max-w-md mx-4 transition-all duration-500 ${
              pastHero
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
            aria-hidden={!pastHero}
          >
            <SearchBar
              size="sm"
              placeholder="Поиск по ТРЦ «Галактика»..."
            />
          </div>

          {/* Desktop phone */}
          <a
            href="tel:+74957004200"
            className="hidden lg:block text-accent font-semibold text-sm hover:text-accent/80 transition-colors whitespace-nowrap flex-shrink-0"
          >
            +7 (495) 700-42-00
          </a>

          {/* Burger button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-xl hover:bg-white/10 transition-colors flex-shrink-0"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
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
          menuOpen ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0"
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
