"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { products, team, whatsappNumber } from "@/app/lib/data";
import { CONTACT } from "./lib/contact";

/* ─────────────────────────────────────────────────────────────
   Tailwind doesn't ship these exact colour tokens by default,
   so we extend via inline CSS variables declared once on <main>.
   All Tailwind classes below reference these vars through
   arbitrary-value syntax: e.g. text-[var(--gold)]

   NOTE: SiteHeader, SiteFooter, and WhatsAppFloat now live in
   app/components/site-shell.tsx and are rendered once from the
   root layout — they are intentionally NOT included here.
───────────────────────────────────────────────────────────── */

const featured = products.filter((p) => p.bestseller);

/* ── tiny helpers ── */
const GOLD       = "var(--le-gold)";
const GOLD_LIGHT = "var(--le-gold-light)";
const MIST       = "var(--le-mist)";
const OBS2       = "var(--le-obs2)";
const OBS3       = "var(--le-obs3)";
const WHITE      = "var(--le-white)";
const ROSE       = "var(--le-rose)";

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      {/* CSS variable definitions + global keyframes */}
      <style>{`
        :root {
          --le-obsidian:  #0A0806;
          --le-obs2:      #131009;
          --le-obs3:      #1C1710;
          --le-gold:      #C9A96E;
          --le-gold-light:#E2CFA0;
          --le-rose:      #C4968C;
          --le-cream:     #F5EFE6;
          --le-mist:      #8A8070;
          --le-white:     #FDFAF6;
        }
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        body { background: var(--le-obsidian); }

        .le-display { font-family: 'Cormorant Garamond', Georgia, serif; }

        /* reveal animation */
        .le-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s ease,transform .7s ease; }
        .le-reveal.le-visible { opacity:1; transform:translateY(0); }
        .le-delay-1 { transition-delay:.1s; }
        .le-delay-2 { transition-delay:.22s; }
        .le-delay-3 { transition-delay:.36s; }

        /* marquee */
        @keyframes leMarquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .le-marquee { animation: leMarquee 26s linear infinite; }

        /* bottle float */
        @keyframes leFloat { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-18px)} }
        .le-float { animation: leFloat 6s ease-in-out infinite; }

        /* aura pulse */
        @keyframes leAura { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:1} 50%{transform:translate(-50%,-50%) scale(1.12);opacity:.65} }
        .le-aura { animation: leAura 4s ease-in-out infinite; }

        /* smoke */
        @keyframes leSmoke { 0%{opacity:0;transform:translateX(-50%) translateY(20px) scale(.6)} 30%{opacity:.4} 100%{opacity:0;transform:translateX(-50%) translateY(-60px) scale(1.6)} }
        .le-smoke   { animation: leSmoke 3s ease-in-out infinite; }
        .le-smoke-2 { animation: leSmoke 3s ease-in-out 1s infinite; }
        .le-smoke-3 { animation: leSmoke 3s ease-in-out 2s infinite; }

        /* scroll line */
        @keyframes leScroll { 0%,100%{opacity:.4;height:40px} 50%{opacity:1;height:55px} }
        .le-scroll-line { animation: leScroll 2s ease-in-out infinite; }

        /* product card underline sweep */
        .le-card-sweep::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,var(--le-gold),transparent);
          transform:scaleX(0); transition:transform .4s;
        }
        .le-card-sweep:hover::after { transform:scaleX(1); }

        /* collection card arrow */
        .le-col-card:hover .le-col-arrow { transform:translateX(4px); }
        .le-col-arrow { transition:transform .3s; }

        @media(prefers-reduced-motion:reduce){
          .le-float,.le-aura,.le-smoke,.le-smoke-2,.le-smoke-3,.le-scroll-line,.le-marquee{animation:none;}
          .le-reveal{opacity:1;transform:none;}
        }
      `}</style>

      <main style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 300, color: "var(--le-cream)" }}>

        {/* ════════════════════════════════
            HERO
        ════════════════════════════════ */}
        <HeroSection />

        {/* ════════════════════════════════
            MARQUEE
        ════════════════════════════════ */}
        <div
          className="overflow-hidden py-4"
          style={{
            borderTop: "1px solid rgba(201,169,110,.15)",
            borderBottom: "1px solid rgba(201,169,110,.15)",
            background: OBS2,
          }}
        >
          <div className="le-marquee flex whitespace-nowrap">
            {[...Array(2)].flatMap(() =>
              ["Signature Scents", "Gift Boxes", "Oud Blends", "Clean Musks", "Floral Notes", "Same-day Dispatch", "Scent Advice"].map((item, i) => (
                <span key={`${item}-${i}`} className="le-display text-[.85rem] tracking-[.25em] uppercase px-8" style={{ color: MIST }}>
                  {item} <span style={{ color: GOLD, opacity: .6 }}>—</span>{" "}
                </span>
              ))
            )}
          </div>
        </div>

        {/* ════════════════════════════════
            COLLECTIONS
        ════════════════════════════════ */}
        <section className="px-12 md:px-20 py-28" style={{ background: "var(--le-obsidian)" }}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-center">
            {/* left */}
            <div>
              <Eyebrow className="le-reveal">Collections</Eyebrow>
              <h2 className="le-display le-reveal le-delay-1 font-light leading-[1.08]"
                style={{ fontSize: "clamp(2rem,3.5vw,3.5rem)", color: WHITE }}>
                Three moods.<br /><em style={{ color: GOLD_LIGHT }}>One signature.</em>
              </h2>
              <p className="le-reveal le-delay-2 mt-6 mb-10 text-[.95rem] leading-[1.8]" style={{ color: MIST }}>
                Each collection is built around how you want to feel — not just how you want to smell.
                Choose the mood, then let the fragrance do the rest.
              </p>
              <GhostLink href="/collections" className="le-reveal le-delay-2">See all fragrances</GhostLink>
            </div>
            {/* right */}
            <div className="le-reveal le-delay-1 flex flex-col gap-[1px]" style={{ background: "rgba(201,169,110,.1)" }}>
              {[
                { num: "01", name: "Nocturne Reserve", sub: "Oud · Amber · Dark woods" },
                { num: "02", name: "Daylight Atelier",  sub: "Citrus · Green · Clean musks" },
                { num: "03", name: "Bloom Circuit",     sub: "Florals · Powder · Soft skin" },
              ].map((c) => (
                <Link
                  key={c.name}
                  href={`/collections?collection=${encodeURIComponent(c.name)}`}
                  className="le-col-card grid grid-cols-[1fr_auto] items-center px-10 py-8 transition-colors duration-300 no-underline"
                  style={{ background: OBS2 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = OBS3)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = OBS2)}
                >
                  <div>
                    <div className="text-[.72rem] tracking-[.2em] uppercase mb-2 opacity-70" style={{ color: GOLD }}>{c.num}</div>
                    <div className="le-display font-light text-[1.6rem] leading-none" style={{ color: WHITE }}>{c.name}</div>
                    <div className="text-[.75rem] tracking-[.08em] mt-1" style={{ color: MIST }}>{c.sub}</div>
                  </div>
                  <span className="le-col-arrow text-xl opacity-70" style={{ color: GOLD }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            BESTSELLERS
        ════════════════════════════════ */}
        <section className="px-12 md:px-20 py-28" style={{ background: OBS2 }}>
          <div className="le-reveal flex flex-wrap items-end justify-between gap-6 mb-16">
            <div>
              <Eyebrow>Best sellers</Eyebrow>
              <h2 className="le-display font-light leading-[1.08]"
                style={{ fontSize: "clamp(2rem,3.5vw,3.5rem)", color: WHITE }}>
                Favourites with <em style={{ color: GOLD_LIGHT }}>memorable</em> dry-downs.
              </h2>
            </div>
            <GhostLink href="/collections">View all</GhostLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px]" style={{ background: "rgba(201,169,110,.08)" }}>
            {(featured.length > 0 ? featured : PLACEHOLDER_PRODUCTS).map((p: any, i: number) => {
              const isRose = p.accentColor === "rose";
              const accentRgb = isRose ? "196,150,140" : "201,169,110";
              const notesLine = Array.isArray(p.notes) ? p.notes.join(" · ") : p.notes;
              return (
                <Link
                  key={p.id ?? p.name}
                  href={`/collections/${p.id ?? ""}`}
                  className={`le-card-sweep relative flex flex-col items-center text-center px-8 py-12 transition-colors duration-300 no-underline le-reveal le-delay-${i}`}
                  style={{ background: "var(--le-obsidian)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = OBS3)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--le-obsidian)")}
                >
                  {/* mini bottle icon */}
                  <MiniBottle index={i} rgb={accentRgb} />

                  {(p.badge || p.bestseller) && (
                    <span
                      className="inline-block text-[.65rem] tracking-[.2em] uppercase border rounded-[1px] px-3 py-1 mb-4"
                      style={{ color: isRose ? ROSE : GOLD, borderColor: `rgba(${accentRgb},.3)` }}
                    >
                      {p.badge ?? "Bestseller"}
                    </span>
                  )}
                  <h3 className="le-display font-light text-[1.5rem] leading-[1.2] mb-2" style={{ color: WHITE }}>
                    {p.name}
                  </h3>
                  {notesLine && (
                    <p className="text-[.75rem] tracking-[.06em] leading-[1.7] mb-6" style={{ color: MIST }}>
                      {notesLine}
                    </p>
                  )}
                  <p className="le-display text-[1.3rem] mt-auto" style={{ color: GOLD_LIGHT }}>
                    ₦{Number(p.price).toLocaleString()}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ════════════════════════════════
            SCENT STORY
        ════════════════════════════════ */}
        <section style={{ background: "var(--le-obsidian)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
            {/* orbital visual */}
            <div className="relative flex items-center justify-center min-h-[400px]" style={{ background: OBS2 }}>
              <OrbitalSvg />
            </div>
            {/* copy */}
            <div className="flex flex-col justify-center px-12 md:px-20 py-20">
              <Eyebrow className="le-reveal">Our approach</Eyebrow>
              <h2 className="le-display le-reveal le-delay-1 font-light leading-[1.08] mb-6"
                style={{ fontSize: "clamp(2rem,3.5vw,3.5rem)", color: WHITE }}>
                Not sure what<br />to choose? <em style={{ color: GOLD_LIGHT }}>Tell us.</em>
              </h2>
              <p className="le-reveal le-delay-2 text-[.95rem] leading-[1.9] mb-10" style={{ color: MIST }}>
                Share the occasion, the impression you want to leave, and your budget.
                We'll match you to a fragrance that feels made for you — and send the
                order details directly to your WhatsApp.
              </p>
              <a
                href={`https://wa.me/${CONTACT.enquiriesWhatsApp}?text=Hello%20L'Essence%2C%20I'd%20like%20a%20scent%20match.`}
                className="le-reveal le-delay-3 self-start inline-flex items-center gap-2 text-[.75rem] tracking-[.15em] uppercase font-medium px-9 py-4 rounded-[1px] transition-all duration-300"
                style={{ background: GOLD, color: "var(--le-obsidian)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = GOLD_LIGHT; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.transform = ""; }}
                target="_blank" rel="noopener noreferrer"
              >
                Get a scent match →
              </a>

              {/* stats */}
              <div
                className="grid grid-cols-3 gap-8 mt-12 pt-10"
                style={{ borderTop: "1px solid rgba(201,169,110,.15)" }}
              >
                {[{ n: "6", l: "Launch scents" }, { n: "24h", l: "Response time" }, { n: "3", l: "Collections" }].map((s, i) => (
                  <div key={s.n} className={`le-reveal le-delay-${i}`}>
                    <strong className="le-display block font-light text-[2.5rem] leading-none" style={{ color: GOLD_LIGHT }}>{s.n}</strong>
                    <span className="block text-[.7rem] tracking-[.1em] uppercase mt-1" style={{ color: MIST }}>{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            TEAM
        ════════════════════════════════ */}
        <section className="px-12 md:px-20 py-28" style={{ background: OBS2 }}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-end mb-16">
            <div>
              <Eyebrow className="le-reveal">Our team</Eyebrow>
              <h2 className="le-display le-reveal le-delay-1 font-light leading-[1.08]"
                style={{ fontSize: "clamp(2rem,3.5vw,3.5rem)", color: WHITE }}>
                Speak with<br />the right<br /><em style={{ color: GOLD_LIGHT }}>person.</em>
              </h2>
            </div>
            <p className="le-reveal text-[.95rem] leading-[1.8]" style={{ color: MIST }}>
              We keep it personal. Each team member handles a specific part of the
              experience — from scent guidance to gifting and order logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px]" style={{ background: "rgba(201,169,110,.08)" }}>
            {team.map((member, i) => (
              <article
                key={member.name}
                className={`le-reveal le-delay-${i} px-8 py-10 transition-colors duration-300`}
                style={{ background: "var(--le-obsidian)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = OBS3)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--le-obsidian)")}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center le-display text-base mb-6"
                  style={{
                    background: "rgba(201,169,110,.1)",
                    border: "1px solid rgba(201,169,110,.3)",
                    color: GOLD_LIGHT,
                  }}
                  aria-hidden="true"
                >
                  {member.name.charAt(0)}
                </div>
                <h3 className="le-display font-light text-[1.3rem] mb-1" style={{ color: WHITE }}>{member.name}</h3>
                <p className="text-[.78rem] tracking-[.08em] mb-6" style={{ color: MIST }}>{member.role}</p>
                <a
                  href={member.whatsapp}
                  className="text-[.7rem] tracking-[.15em] uppercase pb-[1px] transition-colors duration-300"
                  style={{ color: GOLD, borderBottom: "1px solid rgba(201,169,110,.3)", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,.3)")}
                  target="_blank" rel="noopener noreferrer"
                >
                  Message →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════
            CTA BAND
        ════════════════════════════════ */}
        <section
          className="relative overflow-hidden text-center px-8 py-36"
          style={{ background: "linear-gradient(135deg,var(--le-obsidian) 0%,#140F09 50%,var(--le-obsidian) 100%)" }}
        >
          {/* concentric ring decorations */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
            <div className="absolute w-[600px] h-[600px] rounded-full" style={{ border: "1px solid rgba(201,169,110,.06)" }} />
            <div className="absolute w-[900px] h-[900px] rounded-full" style={{ border: "1px solid rgba(201,169,110,.03)" }} />
          </div>
          <div className="relative z-10">
            <Eyebrow className="le-reveal justify-center">Ready to begin</Eyebrow>
            <h2 className="le-display le-reveal le-delay-1 font-light leading-[1.08] my-6"
              style={{ fontSize: "clamp(2rem,4vw,4rem)", color: WHITE }}>
              Find your signature scent<br />in <em style={{ color: GOLD_LIGHT }}>minutes.</em>
            </h2>
            <p className="le-reveal le-delay-2 text-[.95rem] leading-[1.8] max-w-[30rem] mx-auto mb-12" style={{ color: MIST }}>
              Browse the collection or message us directly — we'll find the perfect
              fragrance for you and arrange fast delivery.
            </p>
            <div className="le-reveal le-delay-3 flex flex-wrap gap-6 justify-center">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 text-[.75rem] tracking-[.15em] uppercase font-medium px-9 py-4 rounded-[1px] transition-all duration-300"
                style={{ background: GOLD, color: "var(--le-obsidian)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = GOLD_LIGHT; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.transform = ""; }}
              >
                Shop all fragrances →
              </Link>
              <GhostLink
                href={`https://wa.me/${CONTACT.ordersWhatsApp}?text=Hello%20L'Essence%2C%20I'd%20like%20to%20order.`}
                external
              >
                Chat on WhatsApp
              </GhostLink>
            </div>
          </div>
        </section>

      </main>

      {/* Scroll reveal observer */}
      <RevealObserver />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO  (client component — needs canvas ref + useEffect)
══════════════════════════════════════════════════════════════ */
function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type P = { ox:number;oy:number;orb:number;a:number;s:number;op:number;t:number;r:number;x:number;y:number };
    let W=0, H=0, particles:P[]=[], rafId:number;

    const resize = () => { W=canvas.offsetWidth; H=canvas.offsetHeight; canvas.width=W; canvas.height=H; };
    const init   = () => {
      particles=[];
      const n=Math.floor((W*H)/18000);
      for(let i=0;i<n;i++) particles.push({x:0,y:0,ox:Math.random()*W,oy:Math.random()*H,orb:Math.random()*80+20,a:Math.random()*Math.PI*2,s:Math.random()*.0004+.0001,op:Math.random()*.35+.05,t:Math.random()*1000,r:Math.random()*1.2+.3});
    };
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      particles.forEach(p=>{
        p.t+=1; p.x=p.ox+Math.cos(p.a+p.t*p.s)*p.orb; p.y=p.oy+Math.sin(p.a+p.t*p.s*.7)*p.orb*.5;
        if(p.x<0||p.x>W) p.ox=Math.random()*W;
        if(p.y<0||p.y>H) p.oy=Math.random()*H;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(201,169,110,${p.op})`; ctx.fill();
      });
      rafId=requestAnimationFrame(draw);
    };

    resize(); init(); draw();
    const onResize = () => { resize(); init(); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize",onResize); };
  }, []);

  /* hero reveal */
  useEffect(() => {
    const els = document.querySelectorAll(".le-hero-reveal");
    const t = setTimeout(() => els.forEach(el => el.classList.add("le-visible")), 120);
    return () => clearTimeout(t);
  }, []);

  const waLink = `https://wa.me/${CONTACT.ordersWhatsApp}?text=Hello%20L'Essence%2C%20I'd%20like%20a%20scent%20recommendation.`;

  return (
    <section
      className="relative grid grid-cols-1 md:grid-cols-2 items-center overflow-hidden"
      style={{ minHeight: "100vh", background: "radial-gradient(ellipse 60% 80% at 70% 50%,#1E160A 0%,var(--le-obsidian) 60%)" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />

      {/* Left copy */}
      <div className="relative z-10 px-12 md:pl-20 md:pr-12 pt-32 pb-16 md:pt-0 md:pb-0">
        <p className="le-reveal le-hero-reveal flex items-center gap-4 text-[.7rem] tracking-[.3em] uppercase mb-8" style={{ color: GOLD }}>
          <span className="inline-block w-8 h-[1px]" style={{ background: GOLD }} />
          Fine fragrance, Lagos
        </p>
        <h1
          className="le-display le-reveal le-hero-reveal le-delay-1 font-light leading-[1.05] mb-8"
          style={{ fontSize: "clamp(3rem,5vw,5.5rem)", color: "var(--le-white)" }}
        >
          Wear the scent<br />the room <em style={{ color: GOLD_LIGHT }}>remembers.</em>
        </h1>
        <p className="le-reveal le-hero-reveal le-delay-2 text-[.95rem] leading-[1.8] max-w-[26rem] mb-12" style={{ color: MIST }}>
          Warm oud, soft florals, clean musks — each bottle chosen for its ability
          to leave a lasting, personal impression long after you've left.
        </p>
        <div className="le-reveal le-hero-reveal le-delay-3 flex flex-wrap items-center gap-8">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-[.75rem] tracking-[.15em] uppercase font-medium px-9 py-4 rounded-[1px] transition-all duration-300"
            style={{ background: GOLD, color: "var(--le-obsidian)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = GOLD_LIGHT; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.transform = ""; }}
          >
            Explore collection →
          </Link>
          <a
            href={waLink}
            className="text-[.75rem] tracking-[.12em] uppercase pb-[2px] transition-all duration-300 no-underline"
            style={{ color: "var(--le-cream)", borderBottom: "1px solid rgba(201,169,110,.4)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = GOLD_LIGHT; e.currentTarget.style.borderBottomColor = GOLD; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--le-cream)"; e.currentTarget.style.borderBottomColor = "rgba(201,169,110,.4)"; }}
            target="_blank" rel="noopener noreferrer"
          >
            Ask on WhatsApp
          </a>
        </div>
      </div>

      {/* Right — bottle */}
      <div className="hidden md:flex relative z-10 items-center justify-center h-full" aria-hidden="true">
        <div className="relative w-[320px] h-[480px]">
          {/* aura */}
          <div
            className="le-aura absolute rounded-full pointer-events-none"
            style={{
              width:400,height:400,top:"50%",left:"50%",
              background:"radial-gradient(circle,rgba(201,169,110,.08) 0%,rgba(196,150,140,.04) 40%,transparent 70%)",
            }}
          />
          {/* smoke rings */}
          {["le-smoke","le-smoke-2","le-smoke-3"].map((cls,i) => (
            <div key={i} className={`${cls} absolute`} style={{ top:"10%", left:"50%" }}>
              <svg width={60-i*10} height={30-i*5} viewBox={`0 0 ${60-i*10} ${30-i*5}`}>
                <ellipse cx={(60-i*10)/2} cy={(30-i*5)/2} rx={(60-i*10)/2-2} ry={(30-i*5)/2-2}
                  fill="none" stroke={`rgba(201,169,110,${.15-i*.03})`} strokeWidth="1"/>
              </svg>
            </div>
          ))}
          {/* bottle SVG */}
          <BottleSvg />
          {/* orbit particles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 480">
            {[
              {cx:50,cy:180,r:2,fill:"rgba(201,169,110,.2)",dur:"4s",v:"180;160;180"},
              {cx:270,cy:220,r:1.5,fill:"rgba(196,150,140,.25)",dur:"5s",v:"220;200;220"},
              {cx:80,cy:100,r:1,fill:"rgba(201,169,110,.15)",dur:"6s",v:"100;80;100"},
              {cx:240,cy:140,r:2.5,fill:"rgba(201,169,110,.12)",dur:"3.5s",v:"140;120;140"},
              {cx:155,cy:60,r:1.5,fill:"rgba(196,150,140,.18)",dur:"4.5s",v:"60;40;60"},
            ].map((dot,i)=>(
              <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.fill}>
                <animate attributeName="cy" values={dot.v} dur={dot.dur} repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.2;0.55;0.2" dur={dot.dur} repeatCount="indefinite"/>
              </circle>
            ))}
            <ellipse cx="160" cy="240" rx="140" ry="50" fill="none" stroke="rgba(201,169,110,.04)" strokeWidth="0.5"/>
          </svg>
        </div>
      </div>

      {/* scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[.65rem] tracking-[.2em] uppercase"
        style={{ color: MIST }}
        aria-hidden="true"
      >
        <div className="le-scroll-line w-[1px]" style={{ background: `linear-gradient(to bottom,${GOLD},transparent)` }} />
        <span>Scroll</span>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SMALL RE-USABLE BITS
══════════════════════════════════════════════════════════════ */
function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-4 text-[.7rem] tracking-[.3em] uppercase mb-6 ${className}`} style={{ color: GOLD }}>
      <span className="inline-block w-8 h-[1px] shrink-0" style={{ background: GOLD }} />
      {children}
    </p>
  );
}

function GhostLink({ href, children, external, className = "" }: { href: string; children: React.ReactNode; external?: boolean; className?: string }) {
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      href={href}
      {...props}
      className={`inline-flex items-center gap-2 text-[.75rem] tracking-[.12em] uppercase pb-[2px] transition-all duration-300 no-underline ${className}`}
      style={{ color: "var(--le-cream)", borderBottom: "1px solid rgba(201,169,110,.4)" }}
      onMouseEnter={(e) => { e.currentTarget.style.color = GOLD_LIGHT; e.currentTarget.style.borderBottomColor = GOLD; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--le-cream)"; e.currentTarget.style.borderBottomColor = "rgba(201,169,110,.4)"; }}
    >
      {children}
    </a>
  );
}

function MiniBottle({ index, rgb }: { index: number; rgb: string }) {
  if (index === 1)
    return (
      <svg width="48" height="80" viewBox="0 0 48 80" fill="none" className="mb-8">
        <rect x="16" y="2" width="16" height="12" rx="2" fill={`rgba(${rgb},.6)`}/>
        <path d="M14 14 L12 28 L36 28 L34 14Z" fill={`rgba(${rgb},.15)`}/>
        <rect x="6" y="28" width="36" height="48" rx="3" fill={`rgba(${rgb},.08)`} stroke={`rgba(${rgb},.35)`} strokeWidth="0.5"/>
        <ellipse cx="24" cy="52" rx="10" ry="12" fill="none" stroke={`rgba(${rgb},.2)`} strokeWidth="0.5"/>
      </svg>
    );
  if (index === 2)
    return (
      <svg width="48" height="80" viewBox="0 0 48 80" fill="none" className="mb-8">
        <circle cx="24" cy="10" r="8" fill={`rgba(${rgb},.3)`} stroke={`rgba(${rgb},.4)`} strokeWidth="0.5"/>
        <line x1="24" y1="18" x2="24" y2="28" stroke={`rgba(${rgb},.3)`} strokeWidth="1"/>
        <rect x="8" y="28" width="32" height="48" rx="2" fill={`rgba(${rgb},.08)`} stroke={`rgba(${rgb},.25)`} strokeWidth="0.5"/>
        <rect x="14" y="38" width="20" height="22" rx="1" fill="none" stroke={`rgba(${rgb},.15)`} strokeWidth="0.5"/>
      </svg>
    );
  return (
    <svg width="48" height="80" viewBox="0 0 48 80" fill="none" className="mb-8">
      <rect x="18" y="4" width="12" height="10" rx="1" fill={`rgba(${rgb},.5)`}/>
      <path d="M16 14 L14 26 L34 26 L34 14Z" fill={`rgba(${rgb},.15)`}/>
      <rect x="8" y="26" width="32" height="50" rx="2" fill={`rgba(${rgb},.08)`} stroke={`rgba(${rgb},.3)`} strokeWidth="0.5"/>
      <rect x="12" y="36" width="24" height="28" rx="1" fill="none" stroke={`rgba(${rgb},.2)`} strokeWidth="0.5"/>
      <line x1="24" y1="40" x2="24" y2="60" stroke={`rgba(${rgb},.15)`} strokeWidth="0.5"/>
    </svg>
  );
}

function BottleSvg() {
  return (
    <svg className="le-float absolute" style={{ top:"50%", left:"50%" }} width="160" height="300" viewBox="0 0 160 300" fill="none">
      <defs>
        <linearGradient id="bG" x1="20" y1="0" x2="140" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1C1710"/><stop offset="35%" stopColor="#2A2218"/>
          <stop offset="65%" stopColor="#1C1710"/><stop offset="100%" stopColor="#0A0806"/>
        </linearGradient>
        <linearGradient id="sG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(201,169,110,0)"/><stop offset="40%" stopColor="rgba(201,169,110,.18)"/>
          <stop offset="60%" stopColor="rgba(201,169,110,.08)"/><stop offset="100%" stopColor="rgba(201,169,110,0)"/>
        </linearGradient>
        <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2CFA0"/><stop offset="50%" stopColor="#C9A96E"/>
          <stop offset="100%" stopColor="#8A6A3A"/>
        </linearGradient>
        <linearGradient id="lG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(196,150,140,.25)"/><stop offset="100%" stopColor="rgba(196,150,140,.08)"/>
        </linearGradient>
      </defs>
      <rect x="62" y="18" width="36" height="6" rx="2" fill="url(#gC)" opacity=".9"/>
      <rect x="66" y="24" width="28" height="28" rx="1" fill="url(#gC)" opacity=".85"/>
      <path d="M68 52 L64 78 L96 78 L92 52 Z" fill="url(#bG)"/>
      <path d="M68 52 L64 78 L96 78 L92 52 Z" fill="url(#sG)"/>
      <rect x="62" y="74" width="36" height="5" rx="1" fill="url(#gC)" opacity=".4"/>
      <rect x="32" y="79" width="96" height="188" rx="4" fill="url(#bG)"/>
      <rect x="32" y="79" width="96" height="188" rx="4" fill="url(#sG)"/>
      <rect x="36" y="120" width="88" height="143" rx="2" fill="url(#lG)"/>
      <rect x="32" y="79" width="96" height="3" rx="1" fill="url(#gC)" opacity=".5"/>
      <rect x="32" y="200" width="96" height="2" rx="1" fill="url(#gC)" opacity=".25"/>
      <rect x="44" y="130" width="72" height="80" rx="2" fill="rgba(201,169,110,.04)" stroke="rgba(201,169,110,.15)" strokeWidth=".5"/>
      <text x="80" y="160" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="11" fill="rgba(201,169,110,.7)" letterSpacing="3">L'ESSENCE</text>
      <line x1="56" y1="166" x2="104" y2="166" stroke="rgba(201,169,110,.2)" strokeWidth=".5"/>
      <text x="80" y="179" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="7" fill="rgba(201,169,110,.45)" letterSpacing="2">NOCTURNE RESERVE</text>
      <rect x="32" y="264" width="96" height="3" rx="1" fill="url(#gC)" opacity=".3"/>
      <rect x="28" y="267" width="104" height="8" rx="2" fill="url(#bG)" opacity=".8"/>
      <line x1="34" y1="82" x2="34" y2="264" stroke="rgba(201,169,110,.08)" strokeWidth="1"/>
      <line x1="126" y1="82" x2="126" y2="264" stroke="rgba(0,0,0,.3)" strokeWidth="2"/>
    </svg>
  );
}

function OrbitalSvg() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="oG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(201,169,110,.12)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <rect width="400" height="600" fill="#0E0B07"/>
      <circle cx="200" cy="300" r="180" fill="url(#oG)"/>
      <circle cx="200" cy="300" r="60"  fill="none" stroke="rgba(201,169,110,.08)" strokeWidth="1"/>
      <circle cx="200" cy="300" r="100" fill="none" stroke="rgba(201,169,110,.06)" strokeWidth=".5"/>
      <circle cx="200" cy="300" r="145" fill="none" stroke="rgba(201,169,110,.04)" strokeWidth=".5"/>
      <circle cx="200" cy="300" r="40"  fill="rgba(201,169,110,.06)" stroke="rgba(201,169,110,.2)" strokeWidth=".5"/>
      <circle cx="200" cy="200" r="4" fill="rgba(201,169,110,.4)">
        <animateTransform attributeName="transform" type="rotate" from="0 200 300" to="360 200 300" dur="8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="120" cy="300" r="2.5" fill="rgba(196,150,140,.4)">
        <animateTransform attributeName="transform" type="rotate" from="0 200 300" to="-360 200 300" dur="12s" repeatCount="indefinite"/>
      </circle>
      <circle cx="200" cy="155" r="3" fill="rgba(201,169,110,.25)">
        <animateTransform attributeName="transform" type="rotate" from="45 200 300" to="405 200 300" dur="16s" repeatCount="indefinite"/>
      </circle>
      <text x="30"  y="40"  fontFamily="Cormorant Garamond,serif" fontSize="9" fill="rgba(201,169,110,.3)" letterSpacing="3">FINE FRAGRANCE</text>
      <text x="30"  y="570" fontFamily="Cormorant Garamond,serif" fontSize="9" fill="rgba(201,169,110,.3)" letterSpacing="3">EST. 2024</text>
      <text x="200" y="192" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="8" fill="rgba(201,169,110,.5)" letterSpacing="2">TOP NOTES</text>
      <text x="200" y="298" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="8" fill="rgba(201,169,110,.5)" letterSpacing="2">HEART</text>
      <text x="200" y="347" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="20" fill="rgba(201,169,110,.15)" letterSpacing="1">BASE</text>
    </svg>
  );
}

function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll(".le-reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("le-visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return null;
}

/* ── Placeholder products if data array has no bestsellers yet ── */
const PLACEHOLDER_PRODUCTS = [
  { id:"1", name:"Sable Nuit",   price:45000, notes:"Dark oud · Sandalwood · Smoked amber",  badge:"Bestseller",    accentColor:"gold" },
  { id:"2", name:"Rose Volée",   price:38000, notes:"Damascus rose · Peony · White musk",    badge:"Editor's pick", accentColor:"rose" },
  { id:"3", name:"Aura Blanche", price:42000, notes:"Bergamot · Neroli · Cashmere wood",     badge:"New arrival",   accentColor:"gold" },
];