"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { products, team, whatsappNumber } from "@/app/lib/data";
import { CONTACT } from "./lib/contact";

const featured = products.filter((p) => p.bestseller);

const GOLD = "var(--le-gold)";
const GOLD_LIGHT = "var(--le-gold-light)";
const MIST = "var(--le-mist)";
const OBS2 = "var(--le-obs2)";
const OBS3 = "var(--le-obs3)";
const WHITE = "var(--le-white)";
const ROSE = "var(--le-rose)";

export default function Home() {
  return (
    <>
      <style>{`
        :root {
          --le-obsidian:#0A0806; --le-obs2:#131009; --le-obs3:#1C1710;
          --le-gold:#C9A96E; --le-gold-light:#E2CFA0;
          --le-rose:#C4968C; --le-cream:#F5EFE6;
          --le-mist:#8A8070; --le-white:#FDFAF6;
        }
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        body { background: var(--le-obsidian); }
        .le-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .le-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s ease,transform .7s ease; }
        .le-reveal.le-visible { opacity:1; transform:translateY(0); }
        .le-delay-1 { transition-delay:.1s; }
        .le-delay-2 { transition-delay:.22s; }
        .le-delay-3 { transition-delay:.36s; }
        @keyframes leMarquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .le-marquee { animation: leMarquee 26s linear infinite; }
        @keyframes leScroll { 0%,100%{opacity:.4;height:40px} 50%{opacity:1;height:55px} }
        .le-scroll-line { animation: leScroll 2s ease-in-out infinite; }
        .le-card-sweep::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,var(--le-gold),transparent);
          transform:scaleX(0); transition:transform .4s;
        }
        .le-card-sweep:hover::after { transform:scaleX(1); }
        .le-col-card:hover .le-col-arrow { transform:translateX(4px); }
        .le-col-arrow { transition:transform .3s; }

        /* ── Video helpers ── */
        .le-video {
          position:absolute; inset:0; width:100%; height:100%;
          object-fit:cover; display:block;
        }
        /* Fallback shown while video loads / if browser blocks autoplay */
        .le-video-fallback {
          position:absolute; inset:0; width:100%; height:100%;
          object-fit:cover; display:block;
          background:var(--le-obs3);
        }

        @media(prefers-reduced-motion:reduce){
          .le-scroll-line,.le-marquee{animation:none;}
          .le-reveal{opacity:1;transform:none;}
          .le-video { display:none; }
        }
      `}</style>

      <main
        style={{
          fontFamily: "'DM Sans',system-ui,sans-serif",
          fontWeight: 300,
          color: "var(--le-cream)",
        }}
      >
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
            {[...Array(2)].flatMap((_, copyIdx) =>
              [
                "Signature Scents",
                "Gift Boxes",
                "Oud Blends",
                "Clean Musks",
                "Floral Notes",
                "Same-day Dispatch",
                "Scent Advice",
              ].map((item, i) => (
                <span
                  key={`${copyIdx}-${item}-${i}`}
                  className="le-display text-[.85rem] tracking-[.25em] uppercase px-8"
                  style={{ color: MIST }}
                >
                  {item}{" "}
                  <span style={{ color: GOLD, opacity: 0.6 }}>—</span>{" "}
                </span>
              )),
            )}
          </div>
        </div>

        {/* ════════════════════════════════
            COLLECTIONS
        ════════════════════════════════ */}
        <section
          className="px-12 md:px-20 py-28"
          style={{ background: "var(--le-obsidian)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-center">
            <div>
              <Eyebrow className="le-reveal">Collections</Eyebrow>
              <h2
                className="le-display le-reveal le-delay-1 font-light leading-[1.08]"
                style={{ fontSize: "clamp(2rem,3.5vw,3.5rem)", color: WHITE }}
              >
                Three moods.
                <br />
                <em style={{ color: GOLD_LIGHT }}>One signature.</em>
              </h2>
              <p
                className="le-reveal le-delay-2 mt-6 mb-10 text-[.95rem] leading-[1.8]"
                style={{ color: MIST }}
              >
                Each collection is built around how you want to feel — not just
                how you want to smell. Choose the mood, then let the fragrance
                do the rest.
              </p>
              <GhostLink href="/collections" className="le-reveal le-delay-2">
                See all fragrances
              </GhostLink>
            </div>
            <div
              className="le-reveal le-delay-1 flex flex-col gap-[1px]"
              style={{ background: "rgba(201,169,110,.1)" }}
            >
              {[
                {
                  num: "01",
                  name: "Nocturne Reserve",
                  sub: "Oud · Amber · Dark woods",
                },
                {
                  num: "02",
                  name: "Daylight Atelier",
                  sub: "Citrus · Green · Clean musks",
                },
                {
                  num: "03",
                  name: "Bloom Circuit",
                  sub: "Florals · Powder · Soft skin",
                },
              ].map((c) => (
                <Link
                  key={c.name}
                  href={`/collections?collection=${encodeURIComponent(c.name)}`}
                  className="le-col-card grid grid-cols-[1fr_auto] items-center px-10 py-8 transition-colors duration-300 no-underline"
                  style={{ background: OBS2 }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = OBS3)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = OBS2)
                  }
                >
                  <div>
                    <div
                      className="text-[.72rem] tracking-[.2em] uppercase mb-2 opacity-70"
                      style={{ color: GOLD }}
                    >
                      {c.num}
                    </div>
                    <div
                      className="le-display font-light text-[1.6rem] leading-none"
                      style={{ color: WHITE }}
                    >
                      {c.name}
                    </div>
                    <div
                      className="text-[.75rem] tracking-[.08em] mt-1"
                      style={{ color: MIST }}
                    >
                      {c.sub}
                    </div>
                  </div>
                  <span
                    className="le-col-arrow text-xl opacity-70"
                    style={{ color: GOLD }}
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            BESTSELLERS
            Each card now has a video slot.
            Drop your .mp4 into /public/videos/
            and update the src attributes below.
        ════════════════════════════════ */}
        <section className="px-12 md:px-20 py-28" style={{ background: OBS2 }}>
          <div className="le-reveal flex flex-wrap items-end justify-between gap-6 mb-16">
            <div>
              <Eyebrow>Best sellers</Eyebrow>
              <h2
                className="le-display font-light leading-[1.08]"
                style={{ fontSize: "clamp(2rem,3.5vw,3.5rem)", color: WHITE }}
              >
                Favourites with <em style={{ color: GOLD_LIGHT }}>memorable</em>{" "}
                dry-downs.
              </h2>
            </div>
            <GhostLink href="/collections">View all</GhostLink>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-[1px]"
            style={{ background: "rgba(201,169,110,.08)" }}
          >
            {(featured.length > 0 ? featured : PLACEHOLDER_PRODUCTS).map(
              (p: any, i: number) => {
                const isRose = p.accentColor === "rose";
                const accentRgb = isRose ? "196,150,140" : "201,169,110";
                const notesLine = Array.isArray(p.notes)
                  ? p.notes.join(" · ")
                  : p.notes;
                /* ── Add your product videos to /public/videos/ ──
                 Name them product-0.mp4, product-1.mp4, product-2.mp4
                 or swap src with your real video paths / CDN URLs      */
                const videoSrc = p.videoSrc ?? `/videos/product-${i}.mp4`;
                const posterSrc =
                  p.posterSrc ?? `/images/product-${i}-poster.jpg`;

                return (
                  <Link
                    key={p.id ?? p.name}
                    href={`/collections/${p.id ?? ""}`}
                    className="le-card-sweep relative flex flex-col no-underline le-reveal le-delay-${i} group overflow-hidden"
                    style={{ background: "var(--le-obsidian)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = OBS3)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "var(--le-obsidian)")
                    }
                  >
                    {/* ── PRODUCT VIDEO ──────────────────────────────
                      Replace src with your real video file path.
                      poster= shows while video loads (a still frame).
                      autoPlay muted loop playsInline = silent bg video.
                  ─────────────────────────────────────────────────── */}
                    <div
                      className="relative overflow-hidden"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <video
                        className="le-video transition-transform duration-700 group-hover:scale-105"
                        src={videoSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        aria-hidden="true"
                      />
                      {/* dark gradient overlay so text below stays readable */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to bottom,rgba(10,8,6,.05) 50%,rgba(10,8,6,.7) 100%)",
                        }}
                      />
                      {/* badge */}
                      {(p.badge || p.bestseller) && (
                        <span
                          className="absolute top-4 left-4 text-[.6rem] tracking-[.18em] uppercase px-3 py-1.5 rounded-[1px] font-medium z-10"
                          style={{
                            background: isRose ? "var(--le-rose)" : GOLD,
                            color: "var(--le-obsidian)",
                          }}
                        >
                          {p.badge ?? "Bestseller"}
                        </span>
                      )}
                    </div>

                    {/* copy below video */}
                    <div className="flex flex-col items-center text-center px-8 py-10 flex-1">
                      <h3
                        className="le-display font-light text-[1.5rem] leading-[1.2] mb-2"
                        style={{ color: WHITE }}
                      >
                        {p.name}
                      </h3>
                      {notesLine && (
                        <p
                          className="text-[.75rem] tracking-[.06em] leading-[1.7] mb-6"
                          style={{ color: MIST }}
                        >
                          {notesLine}
                        </p>
                      )}
                      <p
                        className="le-display text-[1.3rem] mt-auto"
                        style={{ color: GOLD_LIGHT }}
                      >
                        ₦{Number(p.price).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                );
              },
            )}
          </div>
        </section>

        {/* ════════════════════════════════
            SCENT STORY
            Left panel: replace orbital SVG
            with a full-bleed video.
            Drop your ambient/lifestyle video
            into /public/videos/scent-story.mp4
        ════════════════════════════════ */}
        <section style={{ background: "var(--le-obsidian)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
            {/* ── SCENT STORY VIDEO ──────────────────────────────
                Replace src with your lifestyle/ambient video.
                poster= shows a still before the video plays.
            ─────────────────────────────────────────────────── */}
            <div
              className="relative overflow-hidden min-h-[400px]"
              style={{ background: OBS2 }}
            >
              <video
                className="le-video"
                src="/videos/scent-story2.mp4"
                poster="/images/scent-story-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
              />
              {/* subtle dark overlay to keep the split panel edge clean */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right,transparent 70%,var(--le-obsidian))",
                }}
              />
            </div>

            {/* copy */}
            <div className="flex flex-col justify-center px-12 md:px-20 py-20">
              <Eyebrow className="le-reveal">Our approach</Eyebrow>
              <h2
                className="le-display le-reveal le-delay-1 font-light leading-[1.08] mb-6"
                style={{ fontSize: "clamp(2rem,3.5vw,3.5rem)", color: WHITE }}
              >
                Not sure what
                <br />
                to choose? <em style={{ color: GOLD_LIGHT }}>Tell us.</em>
              </h2>
              <p
                className="le-reveal le-delay-2 text-[.95rem] leading-[1.9] mb-10"
                style={{ color: MIST }}
              >
                Share the occasion, the impression you want to leave, and your
                budget. We'll match you to a fragrance that feels made for you —
                and send the order details directly to your WhatsApp.
              </p>
              <a
                href={`https://wa.me/${CONTACT.enquiriesWhatsApp}?text=Hello%20L'Essence%2C%20I'd%20like%20a%20scent%20match.`}
                className="le-reveal le-delay-3 self-start inline-flex items-center gap-2 text-[.75rem] tracking-[.15em] uppercase font-medium px-9 py-4 rounded-[1px] transition-all duration-300"
                style={{ background: GOLD, color: "var(--le-obsidian)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = GOLD_LIGHT;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = GOLD;
                  e.currentTarget.style.transform = "";
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get a scent match →
              </a>
              <div
                className="grid grid-cols-3 gap-8 mt-12 pt-10"
                style={{ borderTop: "1px solid rgba(201,169,110,.15)" }}
              >
                {[
                  { n: "6", l: "Launch scents" },
                  { n: "24h", l: "Response time" },
                  { n: "3", l: "Collections" },
                ].map((s, i) => (
                  <div key={s.n} className={`le-reveal le-delay-${i}`}>
                    <strong
                      className="le-display block font-light text-[2.5rem] leading-none"
                      style={{ color: GOLD_LIGHT }}
                    >
                      {s.n}
                    </strong>
                    <span
                      className="block text-[.7rem] tracking-[.1em] uppercase mt-1"
                      style={{ color: MIST }}
                    >
                      {s.l}
                    </span>
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
              <h2
                className="le-display le-reveal le-delay-1 font-light leading-[1.08]"
                style={{ fontSize: "clamp(2rem,3.5vw,3.5rem)", color: WHITE }}
              >
                Speak with
                <br />
                the right
                <br />
                <em style={{ color: GOLD_LIGHT }}>person.</em>
              </h2>
            </div>
            <p
              className="le-reveal text-[.95rem] leading-[1.8]"
              style={{ color: MIST }}
            >
              We keep it personal. Each team member handles a specific part of
              the experience — from scent guidance to gifting and order
              logistics.
            </p>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-[1px]"
            style={{ background: "rgba(201,169,110,.08)" }}
          >
            {team.map((member, i) => (
              <article
                key={member.name}
                className={`le-reveal le-delay-${i} px-8 py-10 transition-colors duration-300`}
                style={{ background: "var(--le-obsidian)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = OBS3)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "var(--le-obsidian)")
                }
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
                <h3
                  className="le-display font-light text-[1.3rem] mb-1"
                  style={{ color: WHITE }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-[.78rem] tracking-[.08em] mb-6"
                  style={{ color: MIST }}
                >
                  {member.role}
                </p>
                <a
                  href={member.whatsapp}
                  className="text-[.7rem] tracking-[.15em] uppercase pb-[1px] transition-colors duration-300"
                  style={{
                    color: GOLD,
                    borderBottom: "1px solid rgba(201,169,110,.3)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderBottomColor = GOLD)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderBottomColor =
                      "rgba(201,169,110,.3)")
                  }
                  target="_blank"
                  rel="noopener noreferrer"
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
          style={{
            background:
              "linear-gradient(135deg,var(--le-obsidian) 0%,#140F09 50%,var(--le-obsidian) 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            aria-hidden="true"
          >
            <div
              className="absolute w-[600px] h-[600px] rounded-full"
              style={{ border: "1px solid rgba(201,169,110,.06)" }}
            />
            <div
              className="absolute w-[900px] h-[900px] rounded-full"
              style={{ border: "1px solid rgba(201,169,110,.03)" }}
            />
          </div>
          <div className="relative z-10">
            <Eyebrow className="le-reveal justify-center">
              Ready to begin
            </Eyebrow>
            <h2
              className="le-display le-reveal le-delay-1 font-light leading-[1.08] my-6"
              style={{ fontSize: "clamp(2rem,4vw,4rem)", color: WHITE }}
            >
              Find your signature scent
              <br />
              in <em style={{ color: GOLD_LIGHT }}>minutes.</em>
            </h2>
            <p
              className="le-reveal le-delay-2 text-[.95rem] leading-[1.8] max-w-[30rem] mx-auto mb-12"
              style={{ color: MIST }}
            >
              Browse the collection or message us directly — we'll find the
              perfect fragrance for you and arrange fast delivery.
            </p>
            <div className="le-reveal le-delay-3 flex flex-wrap gap-6 justify-center">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 text-[.75rem] tracking-[.15em] uppercase font-medium px-9 py-4 rounded-[1px] transition-all duration-300"
                style={{ background: GOLD, color: "var(--le-obsidian)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = GOLD_LIGHT;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = GOLD;
                  e.currentTarget.style.transform = "";
                }}
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

      <RevealObserver />
    </>
  );
}

/* ════════════════════════════════
   HERO — canvas particles + hero video
════════════════════════════════ */
function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    type P = {
      ox: number;
      oy: number;
      orb: number;
      a: number;
      s: number;
      op: number;
      t: number;
      r: number;
      x: number;
      y: number;
    };
    let W = 0,
      H = 0,
      particles: P[] = [],
      rafId: number;
    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    const init = () => {
      particles = [];
      const n = Math.floor((W * H) / 18000);
      for (let i = 0; i < n; i++)
        particles.push({
          x: 0,
          y: 0,
          ox: Math.random() * W,
          oy: Math.random() * H,
          orb: Math.random() * 80 + 20,
          a: Math.random() * Math.PI * 2,
          s: Math.random() * 0.0004 + 0.0001,
          op: Math.random() * 0.35 + 0.05,
          t: Math.random() * 1000,
          r: Math.random() * 1.2 + 0.3,
        });
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.t += 1;
        p.x = p.ox + Math.cos(p.a + p.t * p.s) * p.orb;
        p.y = p.oy + Math.sin(p.a + p.t * p.s * 0.7) * p.orb * 0.5;
        if (p.x < 0 || p.x > W) p.ox = Math.random() * W;
        if (p.y < 0 || p.y > H) p.oy = Math.random() * H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,110,${p.op})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(draw);
    };
    resize();
    init();
    draw();
    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".le-hero-reveal");
    const t = setTimeout(
      () => els.forEach((el) => el.classList.add("le-visible")),
      120,
    );
    return () => clearTimeout(t);
  }, []);

  const waLink = `https://wa.me/${CONTACT.ordersWhatsApp}?text=Hello%20L'Essence%2C%20I'd%20like%20a%20scent%20recommendation.`;

  return (
    <section
      className="relative grid grid-cols-1 md:grid-cols-2 items-center overflow-hidden"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse 60% 80% at 70% 50%,#1E160A 0%,var(--le-obsidian) 60%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Left copy */}
      <div className="relative z-10 px-12 md:pl-20 md:pr-12 pt-32 pb-16 md:pt-0 md:pb-0">
        <p
          className="le-reveal le-hero-reveal flex items-center gap-4 text-[.7rem] tracking-[.3em] uppercase mb-8"
          style={{ color: GOLD }}
        >
          <span
            className="inline-block w-8 h-[1px]"
            style={{ background: GOLD }}
          />
          Fine fragrance, Lagos
        </p>
        <h1
          className="le-display le-reveal le-hero-reveal le-delay-1 font-light leading-[1.05] mb-8"
          style={{
            fontSize: "clamp(3rem,5vw,5.5rem)",
            color: "var(--le-white)",
          }}
        >
          Wear the scent
          <br />
          the room <em style={{ color: GOLD_LIGHT }}>remembers.</em>
        </h1>
        <p
          className="le-reveal le-hero-reveal le-delay-2 text-[.95rem] leading-[1.8] max-w-[26rem] mb-12"
          style={{ color: MIST }}
        >
          Warm oud, soft florals, clean musks — each bottle chosen for its
          ability to leave a lasting, personal impression long after you've
          left.
        </p>
        <div className="le-reveal le-hero-reveal le-delay-3 flex flex-wrap items-center gap-8">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-[.75rem] tracking-[.15em] uppercase font-medium px-9 py-4 rounded-[1px] transition-all duration-300"
            style={{ background: GOLD, color: "var(--le-obsidian)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = GOLD_LIGHT;
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = GOLD;
              e.currentTarget.style.transform = "";
            }}
          >
            Explore collection →
          </Link>
          <a
            href={waLink}
            className="text-[.75rem] tracking-[.12em] uppercase pb-[2px] transition-all duration-300 no-underline"
            style={{
              color: "var(--le-cream)",
              borderBottom: "1px solid rgba(201,169,110,.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = GOLD_LIGHT;
              e.currentTarget.style.borderBottomColor = GOLD;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--le-cream)";
              e.currentTarget.style.borderBottomColor = "rgba(201,169,110,.4)";
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask on WhatsApp
          </a>
        </div>
      </div>

      {/* ── HERO VIDEO ─────────────────────────────────────────────
          Replaces the animated bottle SVG.
          Drop your perfume video into /public/videos/hero.mp4
          A poster image shows while the video loads.
          The video is hidden on mobile (hidden md:block) and shown
          only on desktop where there's space to feature it.
      ─────────────────────────────────────────────────────────── */}
      <div
        className="hidden md:block relative h-full overflow-hidden"
        aria-hidden="true"
      >
        <video
          className="le-video"
          src="/videos/hero.mp4"
          poster="/images/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
        {/* left-edge gradient so it blends into the dark copy side */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right,var(--le-obsidian) 0%,transparent 30%,transparent 80%,rgba(10,8,6,.4) 100%)",
          }}
        />
      </div>

      {/* scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[.65rem] tracking-[.2em] uppercase"
        style={{ color: MIST }}
        aria-hidden="true"
      >
        <div
          className="le-scroll-line w-[1px]"
          style={{
            background: `linear-gradient(to bottom,${GOLD},transparent)`,
          }}
        />
        <span>Scroll</span>
      </div>
    </section>
  );
}

/* ════════════════════════════════
   RE-USABLE BITS
════════════════════════════════ */
function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-4 text-[.7rem] tracking-[.3em] uppercase mb-6 ${className}`}
      style={{ color: GOLD }}
    >
      <span
        className="inline-block w-8 h-[1px] shrink-0"
        style={{ background: GOLD }}
      />
      {children}
    </p>
  );
}

function GhostLink({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  const props = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      {...props}
      className={`inline-flex items-center gap-2 text-[.75rem] tracking-[.12em] uppercase pb-[2px] transition-all duration-300 no-underline ${className}`}
      style={{
        color: "var(--le-cream)",
        borderBottom: "1px solid rgba(201,169,110,.4)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = GOLD_LIGHT;
        e.currentTarget.style.borderBottomColor = GOLD;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--le-cream)";
        e.currentTarget.style.borderBottomColor = "rgba(201,169,110,.4)";
      }}
    >
      {children}
    </a>
  );
}

function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll(".le-reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("le-visible");
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return null;
}

const PLACEHOLDER_PRODUCTS = [
  {
    id: "1",
    name: "Sable Nuit",
    price: 45000,
    notes: "Dark oud · Sandalwood · Smoked amber",
    badge: "Bestseller",
    accentColor: "gold",
    videoSrc: "/videos/product-0.mp4",
    posterSrc: "/images/product-0-poster.jpg",
  },
  {
    id: "2",
    name: "Rose Volée",
    price: 38000,
    notes: "Damascus rose · Peony · White musk",
    badge: "Editor's pick",
    accentColor: "rose",
    videoSrc: "/videos/product-1.mp4",
    posterSrc: "/images/product-1-poster.jpg",
  },
  {
    id: "3",
    name: "Aura Blanche",
    price: 42000,
    notes: "Bergamot · Neroli · Cashmere wood",
    badge: "New arrival",
    accentColor: "gold",
    videoSrc: "/videos/product-2.mp4",
    posterSrc: "/images/product-2-poster.jpg",
  },
];
