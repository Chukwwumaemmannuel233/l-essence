"use client";

import { useState, useEffect } from "react";
import { team, whatsappNumber } from "@/app/lib/data";
import { CONTACT } from "../lib/contact";

/* ─────────────────────────────────────────────
   CONTACT PAGE
   Every action redirects to WhatsApp.
   No header / footer / WhatsApp float —
   those come from app/layout.tsx via site-shell.
───────────────────────────────────────────── */

const GOLD       = "var(--le-gold)";
const GOLD_LIGHT = "var(--le-gold-light)";
const MIST       = "var(--le-mist)";
const OBS2       = "var(--le-obs2)";
const OBS3       = "var(--le-obs3)";
const WHITE      = "var(--le-white)";

/* Pre-built WhatsApp message templates */
const TOPICS = [
  {
    icon: "✦",
    label: "I need a scent recommendation",
    message: "Hello L'Essence, I'd like a personalised scent recommendation. Can you help me find the right fragrance?",
    accent: GOLD,
  },
  {
    icon: "◈",
    label: "I want to place an order",
    message: "Hello L'Essence, I'd like to place an order. Can you send me the available fragrances and prices?",
    accent: "var(--le-rose)",
  },
  {
    icon: "◎",
    label: "I'm shopping for a gift",
    message: "Hello L'Essence, I'm looking for a gift fragrance. Can you help me choose something special?",
    accent: "var(--le-olive,#7A9468)",
  },
  {
    icon: "◇",
    label: "I have a question about delivery",
    message: "Hello L'Essence, I have a question about delivery. Can you tell me more about your delivery options?",
    accent: GOLD,
  },
  {
    icon: "○",
    label: "I want to track my order",
    message: "Hello L'Essence, I'd like to track my order. Can you help me with that?",
    accent: "var(--le-rose)",
  },
  {
    icon: "◆",
    label: "Something else",
    message: "Hello L'Essence, I'd like to get in touch.",
    accent: "var(--le-olive,#7A9468)",
  },
];

const PLACEHOLDER_TEAM = [
  { name:"Adaeze", role:"Scent advice & gifting",    specialty:"Best for: Recommendations, gift sets, scent matching",  whatsapp:`https://wa.me/${whatsappNumber}?text=Hello%20Adaeze%2C%20I%20need%20scent%20advice.` },
  { name:"Tunde",  role:"Orders & delivery",         specialty:"Best for: Placing orders, delivery questions, tracking",  whatsapp:`https://wa.me/${whatsappNumber}?text=Hello%20Tunde%2C%20I%20have%20an%20order%20question.` },
  { name:"Chisom", role:"Collections & new arrivals",specialty:"Best for: New drops, collection info, availability",      whatsapp:`https://wa.me/${whatsappNumber}?text=Hello%20Chisom%2C%20I%20have%20a%20question%20about%20your%20collection.` },
];

function waHref(msg: string) {
  return `https://wa.me/${CONTACT.ordersWhatsApp}?text=${encodeURIComponent(msg)}`;
}

export default function ContactPage() {
  const [customMsg, setCustomMsg] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".le-reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("le-visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const displayTeam: any[] =
    (team as any[]).length > 0
      ? (team as any[]).map((m: any) => ({
          ...m,
          specialty: m.specialty ?? "Best for: General enquiries",
        }))
      : PLACEHOLDER_TEAM;

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
        .le-reveal{opacity:0;transform:translateY(24px);transition:opacity .65s ease,transform .65s ease;}
        .le-reveal.le-visible{opacity:1;transform:translateY(0);}
        .le-d1{transition-delay:.08s;}.le-d2{transition-delay:.18s;}.le-d3{transition-delay:.28s;}.le-d4{transition-delay:.38s;}
        .topic-card{transition:background .25s,transform .2s,border-color .25s;}
        .topic-card:hover{transform:translateY(-2px);}
        textarea{resize:none;outline:none;}
        textarea::placeholder{color:var(--le-mist);opacity:.6;}
        @keyframes leWaPulse{0%,100%{box-shadow:0 0 0 0 rgba(201,169,110,.35);}70%{box-shadow:0 0 0 12px rgba(201,169,110,0);}}
        .wa-pulse{animation:leWaPulse 2.2s ease infinite;}
        @media(prefers-reduced-motion:reduce){.le-reveal,.topic-card,.wa-pulse{animation:none;transition:none;opacity:1;transform:none;}}
      `}</style>

      <main style={{ fontFamily:"'DM Sans',system-ui,sans-serif", fontWeight:300, color:"var(--le-cream)", background:"var(--le-obsidian)" }}>

        {/* ════════════════════════════════
            HERO
        ════════════════════════════════ */}
        <section className="relative flex flex-col justify-end overflow-hidden"
          style={{ minHeight:"52vh", background:"radial-gradient(ellipse 70% 65% at 50% 100%,#1E160A 0%,var(--le-obsidian) 65%)" }}>

          <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{ backgroundImage:"linear-gradient(rgba(201,169,110,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,.03) 1px,transparent 1px)", backgroundSize:"80px 80px" }} />

          {/* animated WhatsApp icon background accent */}
          <div className="absolute right-[10%] top-[18%] hidden lg:block opacity-[.07]" aria-hidden="true">
            <WaIconLarge />
          </div>

          <div className="relative z-10 px-8 md:px-20 pb-16 pt-28">
            <p className={`flex items-center gap-4 text-[.68rem] tracking-[.32em] uppercase mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              style={{ color: GOLD, transitionDelay:".08s" }}>
              <span className="inline-block w-8 h-[1px]" style={{ background: GOLD }} />
              Get in touch
            </p>
            <h1 className={`le-display font-light leading-[1.02] mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ fontSize:"clamp(3rem,6.5vw,6.5rem)", color: WHITE, transitionDelay:".18s" }}>
              We're always<br />on <em style={{ color: GOLD_LIGHT }}>WhatsApp.</em>
            </h1>
            <p className={`text-[.95rem] leading-[1.85] max-w-[34rem] transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              style={{ color: MIST, transitionDelay:".3s" }}>
              No contact forms. No ticket system. Just a direct WhatsApp message
              to a real person who knows the collection — and replies within 24 hours.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background:"linear-gradient(to bottom,transparent,var(--le-obsidian))" }} />
        </section>

        {/* ════════════════════════════════
            QUICK-TOPIC SHORTCUTS
        ════════════════════════════════ */}
        <section className="px-8 md:px-20 py-20" style={{ background: OBS2 }}>
          <p className="le-reveal flex items-center gap-4 text-[.68rem] tracking-[.3em] uppercase mb-4" style={{ color: GOLD }}>
            <span className="inline-block w-8 h-[1px]" style={{ background: GOLD }} />
            What brings you here?
          </p>
          <h2 className="le-display le-reveal le-d1 font-light leading-[1.08] mb-12"
            style={{ fontSize:"clamp(1.8rem,3vw,2.8rem)", color: WHITE }}>
            Pick a topic and we'll open<br />WhatsApp for you.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TOPICS.map((topic, i) => (
              <a key={topic.label}
                href={waHref(topic.message)}
                target="_blank" rel="noopener noreferrer"
                className={`topic-card le-reveal le-d${Math.min(i, 4)} flex items-start gap-5 px-7 py-6 rounded-[1px] group`}
                style={{ background:"var(--le-obsidian)", border:`1px solid rgba(201,169,110,.12)` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = OBS3;
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--le-obsidian)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,.12)";
                }}
              >
                <span className="text-[1.1rem] mt-[2px] shrink-0" style={{ color: topic.accent }}>
                  {topic.icon}
                </span>
                <div className="flex-1">
                  <span className="block text-[.88rem] leading-[1.5]" style={{ color: WHITE }}>
                    {topic.label}
                  </span>
                  <span className="flex items-center gap-1.5 mt-2 text-[.68rem] tracking-[.12em] uppercase transition-all duration-200 group-hover:translate-x-1"
                    style={{ color: topic.accent }}>
                    <WaIconSmall color={topic.accent} /> Open WhatsApp →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════
            CUSTOM MESSAGE COMPOSER
        ════════════════════════════════ */}
        <section className="px-8 md:px-20 py-20" style={{ background:"var(--le-obsidian)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* left */}
            <div>
              <p className="le-reveal flex items-center gap-4 text-[.68rem] tracking-[.3em] uppercase mb-6" style={{ color: GOLD }}>
                <span className="inline-block w-8 h-[1px]" style={{ background: GOLD }} />
                Write your own message
              </p>
              <h2 className="le-display le-reveal le-d1 font-light leading-[1.08] mb-6"
                style={{ fontSize:"clamp(1.8rem,3vw,2.8rem)", color: WHITE }}>
                Something more<br /><em style={{ color: GOLD_LIGHT }}>specific in mind?</em>
              </h2>
              <p className="le-reveal le-d2 text-[.9rem] leading-[1.85]" style={{ color: MIST }}>
                Type your message below. When you tap "Send on WhatsApp" it opens
                directly in the app — pre-filled and ready to go. No copy-pasting needed.
              </p>
            </div>

            {/* right — composer */}
            <div className="le-reveal le-d1 flex flex-col gap-4">
              <textarea
                rows={6}
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="e.g. I'm looking for something dark and woody for evening wear, budget around ₦50,000…"
                className="w-full px-5 py-4 rounded-[1px] text-[.9rem] leading-[1.7]"
                style={{
                  background: OBS2,
                  border:"1px solid rgba(201,169,110,.18)",
                  color: WHITE,
                  fontFamily:"'DM Sans',system-ui,sans-serif",
                  fontWeight: 300,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,.5)")}
                onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(201,169,110,.18)")}
              />

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="text-[.7rem] tracking-[.08em]" style={{ color: MIST }}>
                  {customMsg.length > 0 ? `${customMsg.length} characters` : "Start typing above"}
                </span>
                <a
                  href={customMsg.trim() ? waHref(customMsg.trim()) : waHref("Hello L'Essence, I'd like to get in touch.")}
                  target="_blank" rel="noopener noreferrer"
                  className="wa-pulse inline-flex items-center gap-3 text-[.75rem] tracking-[.15em] uppercase font-medium px-8 py-4 rounded-[1px] transition-all duration-300"
                  style={{ background: GOLD, color:"var(--le-obsidian)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = GOLD_LIGHT; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.transform = ""; }}
                >
                  <WaIconSmall color="var(--le-obsidian)" />
                  Send on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            TEAM ROUTING
        ════════════════════════════════ */}
        <section className="px-8 md:px-20 py-20" style={{ background: OBS2 }}>
          <p className="le-reveal flex items-center gap-4 text-[.68rem] tracking-[.3em] uppercase mb-4" style={{ color: GOLD }}>
            <span className="inline-block w-8 h-[1px]" style={{ background: GOLD }} />
            Speak to the right person
          </p>
          <h2 className="le-display le-reveal le-d1 font-light leading-[1.08] mb-3"
            style={{ fontSize:"clamp(1.8rem,3vw,2.8rem)", color: WHITE }}>
            Our team, by speciality.
          </h2>
          <p className="le-reveal le-d2 text-[.9rem] leading-[1.8] max-w-[36rem] mb-14" style={{ color: MIST }}>
            Every team member handles a specific part of the experience.
            Message the right person and you'll get a faster, more useful reply.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px]" style={{ background:"rgba(201,169,110,.08)" }}>
            {displayTeam.map((member: any, i: number) => (
              <a key={member.name}
                href={member.whatsapp ?? waHref(`Hello ${member.name}, I'd like to get in touch.`)}
                target="_blank" rel="noopener noreferrer"
                className={`le-reveal le-d${Math.min(i, 3)} group flex flex-col px-8 py-10 transition-colors duration-300`}
                style={{ background:"var(--le-obsidian)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = OBS3)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--le-obsidian)")}
              >
                {/* avatar initial */}
                <div className="w-11 h-11 rounded-full flex items-center justify-center le-display text-base mb-6 shrink-0"
                  style={{ background:"rgba(201,169,110,.1)", border:"1px solid rgba(201,169,110,.3)", color: GOLD_LIGHT }}
                  aria-hidden="true">
                  {member.name.charAt(0)}
                </div>
                <h3 className="le-display font-light text-[1.3rem] mb-1" style={{ color: WHITE }}>
                  {member.name}
                </h3>
                <p className="text-[.78rem] tracking-[.08em] mb-4" style={{ color: MIST }}>
                  {member.role}
                </p>
                <p className="text-[.74rem] leading-[1.65] mb-8" style={{ color:"rgba(138,128,112,.7)" }}>
                  {member.specialty}
                </p>
                <span className="mt-auto flex items-center gap-2 text-[.68rem] tracking-[.14em] uppercase transition-all duration-300 group-hover:translate-x-1"
                  style={{ color: GOLD }}>
                  <WaIconSmall color={GOLD} size={13} /> Message on WhatsApp →
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════
            HOURS + EXPECTATIONS
        ════════════════════════════════ */}
        <section className="px-8 md:px-20 py-20" style={{ background:"var(--le-obsidian)" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px]" style={{ background:"rgba(201,169,110,.08)" }}>
            {[
              {
                heading:"Response time",
                body:"We reply to every WhatsApp message within 24 hours — usually much faster. Morning messages tend to get the quickest replies.",
                accent: GOLD,
              },
              {
                heading:"When we're available",
                body:"Monday to Saturday, 9am–8pm WAT. Sunday we're slower but still check in. Public holidays we may be a little delayed.",
                accent:"var(--le-rose)",
              },
              {
                heading:"What to expect",
                body:"A real person, not a bot. We might ask a few questions about the occasion or your preferences before recommending — that's how we get it right.",
                accent:"var(--le-olive,#7A9468)",
              },
            ].map((item, i) => (
              <div key={item.heading}
                className={`le-reveal le-d${i + 1} px-8 py-10 transition-colors duration-300`}
                style={{ background: OBS2 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = OBS3)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = OBS2)}
              >
                <span className="inline-block w-6 h-[1px] mb-6" style={{ background: item.accent }} />
                <h3 className="le-display font-light text-[1.25rem] mb-4" style={{ color: WHITE }}>
                  {item.heading}
                </h3>
                <p className="text-[.85rem] leading-[1.8]" style={{ color: MIST }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════
            BIG CTA
        ════════════════════════════════ */}
        <section className="relative overflow-hidden text-center px-8 py-32"
          style={{ background:"linear-gradient(135deg,var(--le-obsidian) 0%,#140F09 50%,var(--le-obsidian) 100%)" }}>
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
            <div className="absolute rounded-full" style={{ width:550,height:550,border:"1px solid rgba(201,169,110,.06)" }} />
            <div className="absolute rounded-full" style={{ width:850,height:850,border:"1px solid rgba(201,169,110,.03)" }} />
          </div>
          <div className="relative z-10">
            <p className="le-reveal flex items-center justify-center gap-4 text-[.68rem] tracking-[.3em] uppercase mb-6" style={{ color: GOLD }}>
              <span className="inline-block w-8 h-[1px]" style={{ background: GOLD }} />
              One tap away
            </p>
            <h2 className="le-display le-reveal le-d1 font-light leading-[1.05] mb-6"
              style={{ fontSize:"clamp(2rem,4.5vw,4.2rem)", color: WHITE }}>
              Don't overthink it —<br /><em style={{ color: GOLD_LIGHT }}>just say hello.</em>
            </h2>
            <p className="le-reveal le-d2 text-[.95rem] leading-[1.85] max-w-[28rem] mx-auto mb-12" style={{ color: MIST }}>
              We're friendly, we know the stock, and we genuinely enjoy helping
              people find the right scent. Send us anything.
            </p>
            <a href={waHref("Hello L'Essence, I'd like to get in touch.")}
              target="_blank" rel="noopener noreferrer"
              className="le-reveal le-d3 wa-pulse inline-flex items-center gap-3 text-[.8rem] tracking-[.15em] uppercase font-medium px-10 py-5 rounded-[1px] transition-all duration-300"
              style={{ background: GOLD, color:"var(--le-obsidian)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = GOLD_LIGHT; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.transform = ""; }}>
              <WaIconSmall color="var(--le-obsidian)" size={18} />
              Open WhatsApp now
            </a>
          </div>
        </section>

      </main>
    </>
  );
}

/* ─────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────── */
function WaIconSmall({ color = "currentColor", size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function WaIconLarge() {
  return (
    <svg width="320" height="320" viewBox="0 0 24 24" fill="var(--le-gold)" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}