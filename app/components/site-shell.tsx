"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappNumber } from "@/app/lib/data";
import { CONTACT } from "@/app/lib/contact";

const GOLD       = "var(--le-gold)";
const GOLD_LIGHT = "var(--le-gold-light)";
const MIST       = "var(--le-mist)";

const navItems = [
  { href: "/collections", label: "Collections" },
  { href: "/about",       label: "Our story"   },
  { href: "/contact",     label: "Contact"      },
  { href: "/blog",        label: "Blog"         },
];

const footerItems = [
  { href: "/collections", label: "Collections" },
  { href: "/about",       label: "Our story"   },
  { href: "/contact",     label: "Contact"      },
  { href: "/blog",        label: "Blog"         },
  { href: "/privacy",     label: "Privacy Policy" },
  { href: "/terms",       label: "Terms of Service" },
];

/* ─────────────────────────────────────────────
   SiteHeader
───────────────────────────────────────────── */
export function SiteHeader() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname                = usePathname();

  /* close drawer on route change */
  useEffect(() => { setOpen(false); }, [pathname]);

  /* close on Escape */
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  /* lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* add background to nav after scrolling past hero */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{`
        :root{
          --le-obsidian:#0A0806;--le-obs2:#131009;--le-obs3:#1C1710;
          --le-gold:#C9A96E;--le-gold-light:#E2CFA0;
          --le-mist:#8A8070;--le-white:#FDFAF6;
        }
        .le-display{font-family:'Cormorant Garamond',Georgia,serif;}

        /* Drawer slide-in from right */
        @keyframes drawerIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes drawerOut {
          from { transform: translateX(0);    opacity: 1; }
          to   { transform: translateX(100%); opacity: 0; }
        }
        .drawer-open  { animation: drawerIn  .32s cubic-bezier(.22,1,.36,1) both; }
        .drawer-close { animation: drawerOut .24s cubic-bezier(.55,0,1,.45) both; }

        /* Backdrop fade */
        @keyframes backdropIn  { from{opacity:0} to{opacity:1} }
        @keyframes backdropOut { from{opacity:1} to{opacity:0} }
        .bd-open  { animation: backdropIn  .25s ease both; }
        .bd-close { animation: backdropOut .22s ease both; }

        /* Hamburger lines */
        .hb-line {
          display:block; width:22px; height:1.5px;
          background: var(--le-gold-light);
          transition: transform .3s ease, opacity .25s ease, width .3s ease;
          transform-origin: center;
        }
        .hb-open .hb-top    { transform: translateY(5.75px) rotate(45deg); }
        .hb-open .hb-mid    { opacity: 0; width: 0; }
        .hb-open .hb-bot    { transform: translateY(-5.75px) rotate(-45deg); }

        /* Nav link active underline */
        .nav-link-active {
          color: var(--le-gold-light) !important;
          border-bottom: 1px solid rgba(201,169,110,.5);
          padding-bottom: 1px;
        }

        @media(prefers-reduced-motion:reduce){
          .drawer-open,.drawer-close,.bd-open,.bd-close{animation:none;}
          .hb-line{transition:none;}
        }
      `}</style>

      {/* ── NAV BAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 md:py-6 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(10,8,6,.97)"
            : "linear-gradient(to bottom,rgba(10,8,6,.92) 0%,transparent 100%)",
          borderBottom: scrolled ? "1px solid rgba(201,169,110,.1)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="le-display text-[1.2rem] md:text-[1.35rem] tracking-[.2em] font-light z-10"
          style={{ color: GOLD_LIGHT }}
          aria-label="L'Essence home"
        >
          L&apos;Essence
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-10 list-none">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-[.75rem] tracking-[.15em] uppercase transition-colors duration-300 ${pathname === item.href ? "nav-link-active" : ""}`}
                style={{ color: pathname === item.href ? GOLD_LIGHT : MIST }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GOLD_LIGHT)}
                onMouseLeave={(e) => (e.currentTarget.style.color = pathname === item.href ? GOLD_LIGHT : MIST)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: CTA + hamburger */}
        <div className="flex items-center gap-4">
          {/* WhatsApp CTA — hidden on small, visible md+ */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hello%20L'Essence%2C%20I'd%20like%20to%20shop.`}
            target="_blank" rel="noopener noreferrer"
            className="hidden sm:inline-flex text-[.72rem] md:text-[.75rem] tracking-[.12em] uppercase font-medium px-4 md:px-5 py-2.5 rounded-[1px] transition-colors duration-300"
            style={{ background: GOLD, color: "var(--le-obsidian)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = GOLD_LIGHT)}
            onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
          >
            Shop now
          </a>

          {/* Hamburger — visible only on mobile */}
          <button
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden flex flex-col justify-center items-center gap-[4.25px] w-10 h-10 rounded-[1px] z-10 ${open ? "hb-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            style={{ background: "rgba(201,169,110,.08)", border: "1px solid rgba(201,169,110,.18)" }}
          >
            <span className="hb-line hb-top" />
            <span className="hb-line hb-mid" />
            <span className="hb-line hb-bot" />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER BACKDROP ── */}
      {open && (
        <div
          className="bd-open fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(10,8,6,.75)", backdropFilter: "blur(6px)" }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── MOBILE DRAWER PANEL ── */}
      <aside
        className={`${open ? "drawer-open" : "drawer-close pointer-events-none"} fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col`}
        style={{
          width: "min(320px, 85vw)",
          background: "var(--le-obs2)",
          borderLeft: "1px solid rgba(201,169,110,.15)",
        }}
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-7 py-6"
          style={{ borderBottom: "1px solid rgba(201,169,110,.1)" }}>
          <span className="le-display text-[1.1rem] tracking-[.2em] font-light" style={{ color: GOLD_LIGHT }}>
            L&apos;Essence
          </span>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-9 h-9 rounded-[1px] transition-colors duration-200"
            style={{ background: "rgba(201,169,110,.08)", border: "1px solid rgba(201,169,110,.2)", color: MIST }}
            onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.color = MIST)}
            aria-label="Close menu"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex flex-col flex-1 px-7 py-8 gap-1" aria-label="Mobile navigation links">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between py-4 text-[.8rem] tracking-[.18em] uppercase transition-colors duration-200"
              style={{
                color: pathname === item.href ? GOLD_LIGHT : MIST,
                borderBottom: "1px solid rgba(201,169,110,.08)",
                animationDelay: `${i * 0.06}s`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD_LIGHT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = pathname === item.href ? GOLD_LIGHT : MIST)}
            >
              <span>{item.label}</span>
              <span style={{ color: GOLD, opacity: .6, fontSize: ".9rem" }}>→</span>
            </Link>
          ))}
        </nav>

        {/* Drawer WhatsApp CTA */}
        <div className="px-7 pb-10 pt-6 flex flex-col gap-4"
          style={{ borderTop: "1px solid rgba(201,169,110,.1)" }}>
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hello%20L'Essence%2C%20I'd%20like%20to%20shop.`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 text-[.72rem] tracking-[.14em] uppercase font-medium py-4 rounded-[1px] transition-colors duration-300"
            style={{ background: GOLD, color: "var(--le-obsidian)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = GOLD_LIGHT)}
            onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
          >
            <WaIcon size={15} color="var(--le-obsidian)" />
            Shop on WhatsApp
          </a>
          <span className="text-center text-[.62rem] tracking-[.08em] opacity-40" style={{ color: MIST }}>
            © 2025 L'Essence
          </span>
        </div>
      </aside>
    </>
  );
}

/* ─────────────────────────────────────────────
   SiteFooter
───────────────────────────────────────────── */
export function SiteFooter() {
  return (
    <footer
      className="flex flex-wrap items-center justify-between gap-6 px-6 md:px-20 py-10 md:py-12"
      style={{ background: "var(--le-obsidian)", borderTop: "1px solid rgba(201,169,110,.12)" }}
    >
      <Link
        href="/"
        className="le-display text-[1.1rem] tracking-[.2em] font-light"
        style={{ color: GOLD_LIGHT }}
      >
        L&apos;Essence
      </Link>

      <ul className="flex flex-wrap gap-6 md:gap-8 list-none">
        {footerItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-[.72rem] tracking-[.1em] uppercase transition-colors duration-300 no-underline"
              style={{ color: MIST }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MIST)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-end gap-2">
        <a
          href={`https://wa.me/${CONTACT.enquiriesWhatsApp}?text=Hello%20L'Essence%2C%20I'd%20like%20a%20scent%20recommendation.`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-[.68rem] tracking-[.12em] uppercase transition-colors duration-300"
          style={{ color: GOLD }}
          onMouseEnter={(e) => (e.currentTarget.style.color = GOLD_LIGHT)}
          onMouseLeave={(e) => (e.currentTarget.style.color = GOLD)}
        >
          <WaIcon /> Chat on WhatsApp
        </a>
        <span className="text-[.68rem] opacity-40" style={{ color: MIST }}>
          © 2025 L&apos;Essence. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   WhatsAppFloat
───────────────────────────────────────────── */
export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${CONTACT.enquiriesWhatsApp}?text=Hello%20L'Essence%2C%20I'd%20like%20a%20scent%20recommendation.`}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200"
      style={{ background: GOLD, boxShadow: "0 4px 24px rgba(201,169,110,.35)" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = GOLD_LIGHT; e.currentTarget.style.transform = "scale(1.08)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.transform = ""; }}
      aria-label="Chat on WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <WaIcon size={26} color="var(--le-obsidian)" />
    </a>
  );
}

/* ─────────────────────────────────────────────
   Shared WhatsApp SVG icon
───────────────────────────────────────────── */
function WaIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}