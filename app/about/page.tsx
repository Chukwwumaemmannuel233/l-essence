"use client";

import { useEffect } from "react";
import { team, whatsappNumber } from "@/app/lib/data";
import { CONTACT } from "@/app/lib/contact";

/* ─────────────────────────────────────────────
   ABOUT / OUR STORY PAGE
   No header / footer / WhatsApp float here —
   those live once in app/layout.tsx via site-shell.
   This file is page content only.
───────────────────────────────────────────── */
export default function AboutPage() {
  useEffect(() => {
    const els = document.querySelectorAll(".le-reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("le-visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        :root{
          --le-obsidian:#0A0806;--le-obs2:#131009;--le-obs3:#1C1710;
          --le-gold:#C9A96E;--le-gold-light:#E2CFA0;
          --le-rose:#C4968C;--le-olive:#7A9468;
          --le-cream:#F5EFE6;--le-mist:#8A8070;--le-white:#FDFAF6;
        }
        .le-display{font-family:'Cormorant Garamond',Georgia,serif;}
        .le-reveal{opacity:0;transform:translateY(26px);transition:opacity .7s ease,transform .7s ease;}
        .le-reveal.le-visible{opacity:1;transform:translateY(0);}
        .le-d1{transition-delay:.1s;} .le-d2{transition-delay:.22s;} .le-d3{transition-delay:.34s;} .le-d4{transition-delay:.46s;}
        @keyframes leDrift{0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(-14px) rotate(1.5deg);}}
        .le-drift{animation:leDrift 7s ease-in-out infinite;}
        @keyframes leDrift2{0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(-10px) rotate(-2deg);}}
        .le-drift-2{animation:leDrift2 8.5s ease-in-out infinite;}
        .le-num-row { counter-reset: le-step; }
        .le-num { counter-increment: le-step; }
        .le-num::before { content: counter(le-step, decimal-leading-zero); }
        @media(prefers-reduced-motion:reduce){.le-drift,.le-drift-2,.le-reveal{animation:none;transition:none;opacity:1;transform:none;}}
      `}</style>

      <main style={{ fontFamily:"'DM Sans',system-ui,sans-serif", fontWeight:300, color:"var(--le-cream)", background:"var(--le-obsidian)" }}>

        {/* ════════════════════════════════
            HERO
        ════════════════════════════════ */}
        <section className="relative flex flex-col justify-end overflow-hidden"
          style={{ minHeight:"58vh", background:"radial-gradient(ellipse 70% 60% at 50% 100%,#1E160A 0%,var(--le-obsidian) 65%)" }}>

          <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{ backgroundImage:"linear-gradient(rgba(201,169,110,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,.03) 1px,transparent 1px)", backgroundSize:"80px 80px" }} />

          <div className="absolute right-[6%] top-[14%] le-drift hidden lg:block" aria-hidden="true">
            <DriftBottle />
          </div>
          <div className="absolute left-[4%] bottom-[16%] le-drift-2 hidden xl:block" aria-hidden="true">
            <DriftLeaf />
          </div>

          <div className="relative z-10 px-8 md:px-20 pb-16 pt-28">
            <p className="le-reveal flex items-center gap-4 text-[.68rem] tracking-[.32em] uppercase mb-6"
              style={{ color:"var(--le-gold)" }}>
              <span className="inline-block w-8 h-[1px]" style={{ background:"var(--le-gold)" }} />
              Our story
            </p>
            <h1 className="le-display le-reveal le-d1 font-light leading-[1.02] mb-6"
              style={{ fontSize:"clamp(3rem,6.5vw,6.5rem)", color:"var(--le-white)" }}>
              Built on a single<br />belief: <em style={{ color:"var(--le-gold-light)" }}>scent is memory.</em>
            </h1>
            <p className="le-reveal le-d2 text-[.95rem] leading-[1.85] max-w-[34rem]"
              style={{ color:"var(--le-mist)" }}>
              L'Essence started in Lagos with a simple question — why does a great fragrance
              feel impossible to find? Three years later, we're still answering it, one bottle at a time.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background:"linear-gradient(to bottom,transparent,var(--le-obsidian))" }} />
        </section>

        {/* ════════════════════════════════
            ORIGIN STORY — split layout
        ════════════════════════════════ */}
        <section style={{ background:"var(--le-obs2)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[560px]">
            {/* visual */}
            <div className="relative flex items-center justify-center min-h-[360px] overflow-hidden" style={{ background:"var(--le-obs3)" }}>
              <OriginSvg />
            </div>
            {/* copy */}
            <div className="flex flex-col justify-center px-8 md:px-20 py-20">
              <p className="le-reveal flex items-center gap-4 text-[.68rem] tracking-[.3em] uppercase mb-6" style={{ color:"var(--le-gold)" }}>
                <span className="inline-block w-8 h-[1px]" style={{ background:"var(--le-gold)" }} />
                How we started
              </p>
              <h2 className="le-display le-reveal le-d1 font-light leading-[1.08] mb-6"
                style={{ fontSize:"clamp(2rem,3.5vw,3.2rem)", color:"var(--le-white)" }}>
                A small table at a<br />Lagos market, <em style={{ color:"var(--le-gold-light)" }}>2022.</em>
              </h2>
              <p className="le-reveal le-d2 text-[.92rem] leading-[1.9] mb-5" style={{ color:"var(--le-mist)" }}>
                L'Essence began with six bottles, a borrowed table, and a conviction that fine
                fragrance shouldn't require a trip abroad or a designer-store markup. We tested
                blends on friends, took notes on what made people lean in for a second smell,
                and built our first collection around the answers.
              </p>
              <p className="le-reveal le-d3 text-[.92rem] leading-[1.9]" style={{ color:"var(--le-mist)" }}>
                Today we work with a small circle of perfumers across West Africa and Europe,
                but the process hasn't changed — every scent earns its place by making someone
                stop and ask what you're wearing.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            VALUES — numbered rows
        ════════════════════════════════ */}
        <section className="px-8 md:px-20 py-28" style={{ background:"var(--le-obsidian)" }}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
            <div>
              <p className="le-reveal flex items-center gap-4 text-[.68rem] tracking-[.3em] uppercase mb-6" style={{ color:"var(--le-gold)" }}>
                <span className="inline-block w-8 h-[1px]" style={{ background:"var(--le-gold)" }} />
                What we believe
              </p>
              <h2 className="le-display le-reveal le-d1 font-light leading-[1.08]"
                style={{ fontSize:"clamp(2rem,3.5vw,3.2rem)", color:"var(--le-white)" }}>
                Three things<br />we won't<br /><em style={{ color:"var(--le-gold-light)" }}>compromise on.</em>
              </h2>
            </div>
            <p className="le-reveal le-d2 self-end text-[.92rem] leading-[1.85] max-w-[34rem]" style={{ color:"var(--le-mist)" }}>
              Every decision — from which perfumer we work with to how fast we reply on
              WhatsApp — gets filtered through these.
            </p>
          </div>

          <div className="le-num-row grid grid-cols-1 gap-[1px]" style={{ background:"rgba(201,169,110,.1)" }}>
            {[
              {
                title: "Longevity over loudness",
                body: "We'd rather a scent last quietly on your skin for ten hours than announce itself for two and fade. Every fragrance is tested for dry-down, not just first spray.",
                color: "var(--le-gold)",
              },
              {
                title: "Real ingredients, honest pricing",
                body: "No filler notes to pad a price tag. We tell you what's actually in the bottle, and price it fairly because we're not paying for a flagship store on Victoria Island.",
                color: "var(--le-rose)",
              },
              {
                title: "A person, not a chatbot",
                body: "Every order goes through WhatsApp because we want to actually talk to you — about the occasion, your skin chemistry, what you didn't like about your last bottle.",
                color: "var(--le-olive,#7A9468)",
              },
            ].map((v, i) => (
              <div key={v.title}
                className={`le-num le-reveal le-d${i + 1} group grid grid-cols-[auto_1fr] gap-8 md:gap-14 items-start px-8 md:px-12 py-10 transition-colors duration-300`}
                style={{ background:"var(--le-obs2)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--le-obs3)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--le-obs2)")}
              >
                <span className="le-display le-num font-light leading-none"
                  style={{ fontSize:"clamp(2.4rem,4vw,3.6rem)", color: v.color, opacity:.55 }} />
                <div>
                  <h3 className="le-display font-light leading-[1.1] mb-3"
                    style={{ fontSize:"clamp(1.4rem,2.2vw,1.9rem)", color:"var(--le-white)" }}>
                    {v.title}
                  </h3>
                  <p className="text-[.9rem] leading-[1.85] max-w-[38rem]" style={{ color:"var(--le-mist)" }}>
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════
            PROCESS — scent journey timeline
        ════════════════════════════════ */}
        <section className="px-8 md:px-20 py-28" style={{ background:"var(--le-obs2)" }}>
          <p className="le-reveal flex items-center gap-4 text-[.68rem] tracking-[.3em] uppercase mb-6" style={{ color:"var(--le-gold)" }}>
            <span className="inline-block w-8 h-[1px]" style={{ background:"var(--le-gold)" }} />
            From idea to bottle
          </p>
          <h2 className="le-display le-reveal le-d1 font-light leading-[1.08] mb-16"
            style={{ fontSize:"clamp(2rem,3.5vw,3.2rem)", color:"var(--le-white)", maxWidth:"40rem" }}>
            Every fragrance goes through<br />the same four <em style={{ color:"var(--le-gold-light)" }}>checkpoints.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-[1px]" style={{ background:"rgba(201,169,110,.08)" }}>
            {[
              { step:"01", title:"Brief",      desc:"We start with a mood, not a formula — dark and intense, fresh and clean, or soft and floral." },
              { step:"02", title:"Blend",      desc:"Our perfumers test 6–10 variations, adjusting top, heart, and base notes against real skin." },
              { step:"03", title:"Wear test",  desc:"A small group wears each candidate for a full day. Only the ones people ask about move forward." },
              { step:"04", title:"Bottle",     desc:"Final formula gets bottled, labelled, and added to the collection — ready for your WhatsApp order." },
            ].map((s, i) => (
              <div key={s.step}
                className={`le-reveal le-d${Math.min(i, 3)} px-8 py-10 transition-colors duration-300`}
                style={{ background:"var(--le-obsidian)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--le-obs3)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--le-obsidian)")}
              >
                <span className="le-display block font-light leading-none mb-6"
                  style={{ fontSize:"2rem", color:"var(--le-gold)", opacity:.5 }}>
                  {s.step}
                </span>
                <h3 className="le-display font-light text-[1.3rem] mb-3" style={{ color:"var(--le-white)" }}>
                  {s.title}
                </h3>
                <p className="text-[.82rem] leading-[1.75]" style={{ color:"var(--le-mist)" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════
            STATS BAND
        ════════════════════════════════ */}
        <section className="relative overflow-hidden px-8 md:px-20 py-24"
          style={{ background:"linear-gradient(135deg,var(--le-obsidian) 0%,#140F09 50%,var(--le-obsidian) 100%)" }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <div className="absolute rounded-full" style={{ width:520,height:520,border:"1px solid rgba(201,169,110,.05)" }} />
            <div className="absolute rounded-full" style={{ width:800,height:800,border:"1px solid rgba(201,169,110,.03)" }} />
          </div>
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 text-center">
            {[
              { n:"3", l:"Years in business" },
              { n:"6", l:"Launch fragrances" },
              { n:"24h", l:"Average reply time" },
              { n:"100%", l:"WhatsApp-ordered" },
            ].map((s, i) => (
              <div key={s.l} className={`le-reveal le-d${i}`}>
                <strong className="le-display block font-light leading-none"
                  style={{ fontSize:"clamp(2.4rem,5vw,3.6rem)", color:"var(--le-gold-light)" }}>
                  {s.n}
                </strong>
                <span className="block text-[.7rem] tracking-[.12em] uppercase mt-3" style={{ color:"var(--le-mist)" }}>
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════
            TEAM
        ════════════════════════════════ */}
        <section className="px-8 md:px-20 py-28" style={{ background:"var(--le-obsidian)" }}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-end mb-16">
            <div>
              <p className="le-reveal flex items-center gap-4 text-[.68rem] tracking-[.3em] uppercase mb-6" style={{ color:"var(--le-gold)" }}>
                <span className="inline-block w-8 h-[1px]" style={{ background:"var(--le-gold)" }} />
                The people behind it
              </p>
              <h2 className="le-display le-reveal le-d1 font-light leading-[1.08]"
                style={{ fontSize:"clamp(2rem,3.5vw,3.2rem)", color:"var(--le-white)" }}>
                Small team.<br /><em style={{ color:"var(--le-gold-light)" }}>Big attention.</em>
              </h2>
            </div>
            <p className="le-reveal le-d2 text-[.92rem] leading-[1.85]" style={{ color:"var(--le-mist)" }}>
              We stay small on purpose — it's the only way every order gets a real reply
              from a real person who knows the collection inside out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px]" style={{ background:"rgba(201,169,110,.08)" }}>
            {(team.length > 0 ? team : PLACEHOLDER_TEAM).map((member: any, i: number) => (
              <article key={member.name}
                className={`le-reveal le-d${Math.min(i, 3)} px-8 py-10 transition-colors duration-300`}
                style={{ background:"var(--le-obs2)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--le-obs3)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--le-obs2)")}
              >
                <div className="w-11 h-11 rounded-full flex items-center justify-center le-display text-base mb-6"
                  style={{ background:"rgba(201,169,110,.1)", border:"1px solid rgba(201,169,110,.3)", color:"var(--le-gold-light)" }}
                  aria-hidden="true">
                  {member.name.charAt(0)}
                </div>
                <h3 className="le-display font-light text-[1.3rem] mb-1" style={{ color:"var(--le-white)" }}>
                  {member.name}
                </h3>
                <p className="text-[.78rem] tracking-[.08em] mb-6" style={{ color:"var(--le-mist)" }}>
                  {member.role}
                </p>
                <a href={member.whatsapp}
                  className="text-[.7rem] tracking-[.15em] uppercase pb-[1px] transition-colors duration-300"
                  style={{ color:"var(--le-gold)", borderBottom:"1px solid rgba(201,169,110,.3)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = "var(--le-gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,.3)")}
                  target="_blank" rel="noopener noreferrer">
                  Message →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════
            CTA BAND
        ════════════════════════════════ */}
        <section className="relative overflow-hidden text-center px-8 py-32"
          style={{ background:"linear-gradient(135deg,var(--le-obsidian) 0%,#140F09 50%,var(--le-obsidian) 100%)" }}>
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
            <div className="absolute rounded-full" style={{ width:600,height:600,border:"1px solid rgba(201,169,110,.06)" }} />
            <div className="absolute rounded-full" style={{ width:900,height:900,border:"1px solid rgba(201,169,110,.03)" }} />
          </div>
          <div className="relative z-10">
            <p className="le-reveal flex items-center justify-center gap-4 text-[.68rem] tracking-[.3em] uppercase mb-6"
              style={{ color:"var(--le-gold)" }}>
              <span className="inline-block w-8 h-[1px]" style={{ background:"var(--le-gold)" }} />
              Ready when you are
            </p>
            <h2 className="le-display le-reveal le-d1 font-light leading-[1.08] mb-6"
              style={{ fontSize:"clamp(2rem,4vw,3.8rem)", color:"var(--le-white)" }}>
              Come find your<br />signature <em style={{ color:"var(--le-gold-light)" }}>scent.</em>
            </h2>
            <p className="le-reveal le-d2 text-[.95rem] leading-[1.85] max-w-[30rem] mx-auto mb-10" style={{ color:"var(--le-mist)" }}>
              Browse the collection or send us a message — we'll help you find the
              fragrance that fits, no pressure.
            </p>
            <div className="le-reveal le-d3 flex flex-wrap gap-6 justify-center">
              <a href="/collections"
                className="inline-flex items-center gap-2 text-[.75rem] tracking-[.15em] uppercase font-medium px-9 py-4 rounded-[1px] transition-all duration-300"
                style={{ background:"var(--le-gold)", color:"var(--le-obsidian)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--le-gold-light)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--le-gold)"; e.currentTarget.style.transform = ""; }}>
                Shop the collection →
              </a>
              <a href={`https://wa.me/${CONTACT.ordersWhatsApp}?text=Hello%20L'Essence%2C%20I'd%20like%20to%20know%20more%20about%20your%20story.`}
                className="inline-flex items-center gap-2 text-[.75rem] tracking-[.12em] uppercase pb-[2px] transition-all duration-300"
                style={{ color:"var(--le-cream)", borderBottom:"1px solid rgba(201,169,110,.4)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--le-gold-light)"; e.currentTarget.style.borderBottomColor = "var(--le-gold)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--le-cream)"; e.currentTarget.style.borderBottomColor = "rgba(201,169,110,.4)"; }}
                target="_blank" rel="noopener noreferrer">
                Say hello on WhatsApp
              </a>
            </div>      
          </div>
        </section>

      </main>
    </>
  );
}

/* ─────────────────────────────────────────────
   SVG ASSETS
───────────────────────────────────────────── */
function DriftBottle() {
  return (
    <svg width="80" height="180" viewBox="0 0 80 180" fill="none" opacity=".3">
      <defs>
        <linearGradient id="db" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2CFA0" /><stop offset="100%" stopColor="#C9A96E" />
        </linearGradient>
      </defs>
      <rect x="30" y="6" width="20" height="5" rx="1" fill="url(#db)" opacity=".8" />
      <rect x="32" y="11" width="16" height="16" rx="1" fill="url(#db)" opacity=".7" />
      <path d="M34 27 L32 42 L48 42 L46 27Z" fill="rgba(201,169,110,.3)" />
      <rect x="16" y="42" width="48" height="128" rx="3" fill="rgba(201,169,110,.1)" stroke="rgba(201,169,110,.3)" strokeWidth=".5" />
      <rect x="22" y="68" width="36" height="48" rx="2" fill="none" stroke="rgba(201,169,110,.2)" strokeWidth=".5" />
    </svg>
  );
}

function DriftLeaf() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" opacity=".22">
      <path d="M30 6C40 14 48 26 44 38C40 50 26 54 16 48C10 44 8 36 12 28C16 18 22 10 30 6Z"
        fill="none" stroke="#C4968C" strokeWidth="1" />
      <path d="M30 6C30 20 30 38 30 54" stroke="#C4968C" strokeWidth=".5" opacity=".6" />
    </svg>
  );
}

function OriginSvg() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 560" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="oS" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="rgba(201,169,110,.14)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="400" height="560" fill="#0E0B07" />
      <circle cx="200" cy="240" r="190" fill="url(#oS)" />

      {/* three small bottles representing the original six, grouped */}
      <g opacity=".9">
        <rect x="150" y="190" width="34" height="100" rx="3" fill="rgba(201,169,110,.14)" stroke="rgba(201,169,110,.35)" strokeWidth=".6" />
        <rect x="160" y="178" width="14" height="14" rx="1" fill="rgba(201,169,110,.5)" />
        <rect x="200" y="160" width="40" height="130" rx="3" fill="rgba(201,169,110,.18)" stroke="rgba(201,169,110,.4)" strokeWidth=".6" />
        <rect x="212" y="146" width="16" height="16" rx="1" fill="rgba(201,169,110,.55)" />
        <rect x="252" y="200" width="30" height="90" rx="3" fill="rgba(196,150,140,.16)" stroke="rgba(196,150,140,.35)" strokeWidth=".6" />
        <rect x="261" y="190" width="12" height="12" rx="1" fill="rgba(196,150,140,.5)" />
      </g>

      <line x1="60" y1="300" x2="340" y2="300" stroke="rgba(201,169,110,.15)" strokeWidth=".5" />
      <text x="200" y="340" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="13" fill="rgba(201,169,110,.55)" letterSpacing="3">
        SIX BOTTLES. ONE TABLE.
      </text>
      <text x="200" y="364" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="9" fill="rgba(201,169,110,.4)" letterSpacing="2">
        LAGOS, 2022
      </text>

      <text x="40" y="40" fontFamily="Cormorant Garamond,serif" fontSize="9" fill="rgba(201,169,110,.3)" letterSpacing="3">EST. 2022</text>
      <text x="40" y="520" fontFamily="Cormorant Garamond,serif" fontSize="9" fill="rgba(201,169,110,.3)" letterSpacing="3">L'ESSENCE</text>
    </svg>
  );
}

/* ── Placeholder team if data.ts team is empty ── */
const PLACEHOLDER_TEAM = [
  { name:"Adaeze", role:"Scent consultant & gifting",   whatsapp:"#" },
  { name:"Tunde",  role:"Orders & same-day dispatch",   whatsapp:"#" },
  { name:"Chisom", role:"Collections & new arrivals",   whatsapp:"#" },
];