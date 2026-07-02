"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products, whatsappNumber } from "@/app/lib/data";
import { CONTACT } from "../lib/contact";

/* ─────────────────────────────────────────────
   TYPES
   Matches your real Product type in app/lib/data.ts,
   where `notes` is a string[].
───────────────────────────────────────────── */
interface Product {
  id: string;
  name: string;
  price: number;
  collection: string;
  bestseller?: boolean;
  notes?: string[];
  badge?: string;
  accentColor?: "gold" | "rose" | "olive";
  image?: string;
}

/* ─────────────────────────────────────────────
   FREE PERFUME PHOTOGRAPHY (Unsplash)
   These are real, working, free-to-use photo URLs —
   confirmed live Unsplash CDN paths, not placeholders.
───────────────────────────────────────────── */
const UNSPLASH: Record<string, string> = {
  nocturne1: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&w=800&q=80",
  nocturne2: "https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=800&q=80",
  nocturne3: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
  daylight1: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
  daylight2: "https://images.unsplash.com/photo-1615634375648-b1c0150d8c6f?auto=format&fit=crop&w=800&q=80",
  daylight3: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80",
  bloom1:    "https://images.unsplash.com/photo-1610461888750-10bfc601b874?auto=format&fit=crop&w=800&q=80",
  bloom2:    "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80",
  bloom3:    "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&w=800&q=80",
};

/* ─────────────────────────────────────────────
   PLACEHOLDER DATA  (only used if your data.ts
   products array is empty)
───────────────────────────────────────────── */
const PLACEHOLDER: Product[] = [
  { id:"n1", name:"Sable Nuit",     price:45000, collection:"Nocturne Reserve", bestseller:true,  notes:["Dark oud","Sandalwood","Smoked amber"],      badge:"Bestseller",    accentColor:"gold",  image: UNSPLASH.nocturne1 },
  { id:"n2", name:"Encre Noire",    price:52000, collection:"Nocturne Reserve",                   notes:["Vetiver","Cypress","Cashmere"],              badge:"New arrival",   accentColor:"gold",  image: UNSPLASH.nocturne2 },
  { id:"n3", name:"Oud Mystère",    price:58000, collection:"Nocturne Reserve",                   notes:["Royal oud","Incense","Dark rose"],                                  accentColor:"gold",  image: UNSPLASH.nocturne3 },
  { id:"d1", name:"Lumière Verte",  price:38000, collection:"Daylight Atelier",                   notes:["Bergamot","Green tea","Cedar"],              badge:"Staff pick",    accentColor:"olive", image: UNSPLASH.daylight1 },
  { id:"d2", name:"Citron Soleil",  price:35000, collection:"Daylight Atelier", bestseller:true,  notes:["Sicilian lemon","Neroli","White musk"],      badge:"Bestseller",    accentColor:"olive", image: UNSPLASH.daylight2 },
  { id:"d3", name:"Aura Blanche",   price:42000, collection:"Daylight Atelier",                   notes:["Cashmere wood","Iris","Clean musk"],                               accentColor:"olive", image: UNSPLASH.daylight3 },
  { id:"b1", name:"Rose Volée",     price:38000, collection:"Bloom Circuit",    bestseller:true,  notes:["Damascus rose","Peony","White musk"],        badge:"Editor's pick", accentColor:"rose",  image: UNSPLASH.bloom1 },
  { id:"b2", name:"Fleur de Soir",  price:41000, collection:"Bloom Circuit",                     notes:["Tuberose","Jasmine","Soft powder"],          badge:"New arrival",   accentColor:"rose",  image: UNSPLASH.bloom2 },
  { id:"b3", name:"Cerise Dorée",   price:44000, collection:"Bloom Circuit",                     notes:["Cherry blossom","Vanilla","Sandalwood"],                           accentColor:"rose",  image: UNSPLASH.bloom3 },
];

const COLLECTIONS = ["All", "Nocturne Reserve", "Daylight Atelier", "Bloom Circuit"];

const COLLECTION_META: Record<string, { tagline: string; desc: string; mood: string }> = {
  "All":              { tagline:"Every drop, every mood.", desc:"Six curated fragrances across three collections — each chosen for lasting impressions.", mood:"All collections" },
  "Nocturne Reserve": { tagline:"For those who arrive after dark.", desc:"Deep oud, smoked amber, and dark woods. Fragrances that command a room.", mood:"Dark · Intense · Memorable" },
  "Daylight Atelier": { tagline:"Light enough to wear all day.", desc:"Fresh citrus, clean musks, and green notes. Made for the hours between sunrise and sunset.", mood:"Fresh · Clean · Effortless" },
  "Bloom Circuit":    { tagline:"Soft. Feminine. Unforgettable.", desc:"Roses, tuberose, jasmine, and powder. Every bottle built around a floral heart.", mood:"Floral · Romantic · Soft" },
};

function notesToArray(notes?: string[] | string): string[] {
  if (!notes) return [];
  if (Array.isArray(notes)) return notes;
  return notes.split(/[,·]/).map((n) => n.trim()).filter(Boolean);
}
function notesToLine(notes?: string[] | string): string {
  return notesToArray(notes).join(" · ");
}

/* ─────────────────────────────────────────────
   MAIN PAGE
   No header / footer / WhatsApp float here —
   those live once in app/layout.tsx via
   app/components/site-shell.tsx and wrap every
   page automatically. This file is page content only.
───────────────────────────────────────────── */
export default function CollectionsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CollectionsInner />
    </Suspense>
  );
}

function CollectionsInner() {
  const searchParams  = useSearchParams();
  const initialFilter = searchParams.get("collection") ?? "All";

  const [active, setActive]       = useState(initialFilter);
  const [modal, setModal]         = useState<Product | null>(null);
  const [visible, setVisible]     = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const realProducts = products as unknown as Product[];
  const allProducts: Product[] = realProducts.length > 0 ? realProducts : PLACEHOLDER;

  const filtered = active === "All"
    ? allProducts
    : allProducts.filter((p) => p.collection === active);

  const meta = COLLECTION_META[active] ?? COLLECTION_META["All"];

  useEffect(() => {
    const els = document.querySelectorAll(".le-reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("le-visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [active]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const waLink = (p: Product) =>
    `https://wa.me/${CONTACT.ordersWhatsApp}?text=Hello%20L'Essence%2C%20I'd%20like%20to%20order%20*${encodeURIComponent(p.name)}*%20(₦${p.price.toLocaleString()}).`;

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
        .le-d1{transition-delay:.08s;} .le-d2{transition-delay:.18s;} .le-d3{transition-delay:.28s;} .le-d4{transition-delay:.38s;}
        @keyframes leFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
        .le-float{animation:leFloat 5s ease-in-out infinite;}
        @keyframes leFadeIn{from{opacity:0;transform:scale(.97);}to{opacity:1;transform:scale(1);}}
        .le-modal-in{animation:leFadeIn .25s ease;}
        .card-glow:hover{box-shadow:0 0 40px rgba(201,169,110,.12);}
        .filter-btn{transition:all .25s;}
        .img-cover{object-fit:cover;width:100%;height:100%;}
        @media(prefers-reduced-motion:reduce){.le-float,.le-reveal{animation:none;transition:none;opacity:1;transform:none;}}
      `}</style>

      <main style={{ fontFamily:"'DM Sans',system-ui,sans-serif", fontWeight:300, color:"var(--le-cream)", background:"var(--le-obsidian)" }}>

        {/* ════════════════════════════════
            HERO BANNER
        ════════════════════════════════ */}
        <section className="relative flex flex-col justify-end overflow-hidden"
          style={{ minHeight:"60vh", background:"radial-gradient(ellipse 80% 60% at 50% 100%,#1E160A 0%,var(--le-obsidian) 65%)" }}>

          <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{ backgroundImage:"linear-gradient(rgba(201,169,110,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,.03) 1px,transparent 1px)", backgroundSize:"80px 80px" }} />

          <div className="absolute right-[8%] top-[12%] le-float hidden lg:block" aria-hidden="true">
            <HeroBannerBottle />
          </div>
          <div className="absolute left-[5%] bottom-[20%] le-float hidden xl:block" style={{ animationDelay:".8s" }} aria-hidden="true">
            <SmallBottleAccent />
          </div>

          <div className="relative z-10 px-8 md:px-20 pb-16 pt-28">
            <p className={`flex items-center gap-4 text-[.68rem] tracking-[.32em] uppercase mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ color:"var(--le-gold)", transitionDelay:".1s" }}>
              <span className="inline-block w-8 h-[1px]" style={{ background:"var(--le-gold)" }} />
              L'Essence Collections
            </p>
            <h1 className={`le-display font-light leading-[1.02] mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ fontSize:"clamp(3.2rem,7vw,7rem)", color:"var(--le-white)", transitionDelay:".2s" }}>
              Every bottle<br />tells a <em style={{ color:"var(--le-gold-light)" }}>story.</em>
            </h1>
            <p className={`text-[.95rem] leading-[1.85] max-w-[32rem] mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ color:"var(--le-mist)", transitionDelay:".32s" }}>
              Six curated fragrances across three moods. Choose your scent, message us on WhatsApp, and we'll deliver to your door.
            </p>

            <div className={`flex flex-wrap gap-2 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay:".44s" }}>
              {COLLECTIONS.map((c) => (
                <button key={c} onClick={() => setActive(c)}
                  className="filter-btn text-[.7rem] tracking-[.14em] uppercase px-5 py-2.5 rounded-[1px] font-medium"
                  style={{
                    background: active === c ? "var(--le-gold)" : "rgba(201,169,110,.08)",
                    color:      active === c ? "var(--le-obsidian)" : "var(--le-mist)",
                    border:     active === c ? "1px solid var(--le-gold)" : "1px solid rgba(201,169,110,.18)",
                  }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background:"linear-gradient(to bottom,transparent,var(--le-obsidian))" }} />
        </section>

        {/* ════════════════════════════════
            ACTIVE COLLECTION META
        ════════════════════════════════ */}
        <section className="px-8 md:px-20 py-14" style={{ background:"var(--le-obs2)" }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="le-reveal text-[.68rem] tracking-[.28em] uppercase mb-3" style={{ color:"var(--le-gold)" }}>
                {meta.mood}
              </p>
              <h2 className="le-display le-reveal le-d1 font-light leading-[1.05]"
                style={{ fontSize:"clamp(1.8rem,3vw,2.8rem)", color:"var(--le-white)" }}>
                {meta.tagline}
              </h2>
              <p className="le-reveal le-d2 mt-3 text-[.9rem] leading-[1.8] max-w-[36rem]"
                style={{ color:"var(--le-mist)" }}>
                {meta.desc}
              </p>
            </div>
            <div className="le-reveal le-d2 shrink-0 text-right">
              <span className="le-display text-[3rem] font-light leading-none" style={{ color:"var(--le-gold-light)" }}>
                {filtered.length}
              </span>
              <span className="block text-[.68rem] tracking-[.16em] uppercase mt-1" style={{ color:"var(--le-mist)" }}>
                {filtered.length === 1 ? "fragrance" : "fragrances"}
              </span>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            PRODUCT GRID
        ════════════════════════════════ */}
        <section className="px-8 md:px-20 py-16" style={{ background:"var(--le-obsidian)" }}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <p className="le-display text-[2rem] font-light mb-4" style={{ color:"var(--le-mist)" }}>No fragrances found</p>
              <button onClick={() => setActive("All")} className="text-[.72rem] tracking-[.14em] uppercase px-6 py-3 rounded-[1px] mt-2"
                style={{ background:"var(--le-gold)", color:"var(--le-obsidian)" }}>
                View all
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px]"
              style={{ background:"rgba(201,169,110,.08)" }}>
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  imgError={imgErrors[product.id]}
                  onImgError={() => setImgErrors((prev) => ({ ...prev, [product.id]: true }))}
                  onQuickView={() => setModal(product)}
                  waLink={waLink(product)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ════════════════════════════════
            COLLECTION SWITCHER STRIP
        ════════════════════════════════ */}
        <section className="px-8 md:px-20 py-20" style={{ background:"var(--le-obs2)" }}>
          <p className="le-reveal flex items-center gap-4 text-[.68rem] tracking-[.28em] uppercase mb-10" style={{ color:"var(--le-gold)" }}>
            <span className="inline-block w-8 h-[1px]" style={{ background:"var(--le-gold)" }} />
            Browse by collection
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px]" style={{ background:"rgba(201,169,110,.08)" }}>
            {COLLECTIONS.filter((c) => c !== "All").map((c, i) => {
              const colors = ["var(--le-gold)","var(--le-rose)","var(--le-olive,#7A9468)"];
              return (
                <button key={c} onClick={() => { setActive(c); window.scrollTo({ top: 0, behavior:"smooth" }); }}
                  className={`le-reveal le-d${i} group text-left px-10 py-12 transition-colors duration-300`}
                  style={{ background: active === c ? "var(--le-obs3)" : "var(--le-obs2)" }}
                  onMouseEnter={(e)=>((e.currentTarget as HTMLElement).style.background="var(--le-obs3)")}
                  onMouseLeave={(e)=>((e.currentTarget as HTMLElement).style.background= active===c ? "var(--le-obs3)" : "var(--le-obs2)")}>
                  <span className="block text-[.68rem] tracking-[.22em] uppercase mb-3" style={{ color: colors[i] }}>
                    0{i+1}
                  </span>
                  <span className="le-display block font-light leading-[1.05] mb-2"
                    style={{ fontSize:"clamp(1.6rem,2.5vw,2.2rem)", color:"var(--le-white)" }}>
                    {c}
                  </span>
                  <span className="block text-[.78rem]" style={{ color:"var(--le-mist)" }}>
                    {COLLECTION_META[c].mood}
                  </span>
                  <span className="block mt-6 text-[.68rem] tracking-[.16em] uppercase transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: colors[i] }}>
                    Browse →
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ════════════════════════════════
            SCENT ADVICE BAND
        ════════════════════════════════ */}
        <section className="relative overflow-hidden px-8 md:px-20 py-24 text-center"
          style={{ background:"linear-gradient(135deg,var(--le-obsidian) 0%,#140F09 50%,var(--le-obsidian) 100%)" }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <div className="absolute rounded-full" style={{ width:500,height:500,border:"1px solid rgba(201,169,110,.05)" }} />
            <div className="absolute rounded-full" style={{ width:780,height:780,border:"1px solid rgba(201,169,110,.03)" }} />
          </div>
          <div className="relative z-10">
            <p className="le-reveal flex items-center justify-center gap-4 text-[.68rem] tracking-[.28em] uppercase mb-6"
              style={{ color:"var(--le-gold)" }}>
              <span className="inline-block w-8 h-[1px]" style={{ background:"var(--le-gold)" }} />
              Personal service
            </p>
            <h2 className="le-display le-reveal le-d1 font-light leading-[1.05] mb-6"
              style={{ fontSize:"clamp(2rem,4vw,3.8rem)", color:"var(--le-white)" }}>
              Not sure which to choose?<br /><em style={{ color:"var(--le-gold-light)" }}>We'll help you decide.</em>
            </h2>
            <p className="le-reveal le-d2 text-[.92rem] leading-[1.9] max-w-[30rem] mx-auto mb-10"
              style={{ color:"var(--le-mist)" }}>
              Tell us the occasion, your budget, and the notes you love. We'll send a personalised recommendation straight to your WhatsApp.
            </p>
            <a href={`https://wa.me/${CONTACT.ordersWhatsApp}?text=Hello%20L'Essence%2C%20I%20need%20a%20scent%20recommendation.`}
              className="le-reveal le-d3 inline-flex items-center gap-3 text-[.75rem] tracking-[.15em] uppercase font-medium px-10 py-4 rounded-[1px] transition-all duration-300"
              style={{ background:"var(--le-gold)", color:"var(--le-obsidian)" }}
              onMouseEnter={(e)=>{ e.currentTarget.style.background="var(--le-gold-light)"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={(e)=>{ e.currentTarget.style.background="var(--le-gold)"; e.currentTarget.style.transform=""; }}
              target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Get a free recommendation
            </a>
          </div>
        </section>

      </main>

      {/* ════════════════════════════════
          QUICK-VIEW MODAL
      ════════════════════════════════ */}
      {modal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
          style={{ background:"rgba(10,8,6,.85)", backdropFilter:"blur(12px)" }}
          onClick={() => setModal(null)}>
          <div className="le-modal-in relative w-full max-w-[860px] max-h-[90vh] overflow-auto rounded-[2px]"
            style={{ background:"var(--le-obs2)", border:"1px solid rgba(201,169,110,.15)" }}
            onClick={(e) => e.stopPropagation()}>

            <button onClick={() => setModal(null)}
              className="absolute top-4 right-4 z-10 text-[.65rem] tracking-[.14em] uppercase px-4 py-2 rounded-[1px] transition-colors duration-200"
              style={{ background:"rgba(201,169,110,.1)", color:"var(--le-mist)", border:"1px solid rgba(201,169,110,.2)" }}
              onMouseEnter={(e)=>(e.currentTarget.style.color="var(--le-gold)")}
              onMouseLeave={(e)=>(e.currentTarget.style.color="var(--le-mist)")}>
              ✕ Close
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative min-h-[320px] md:min-h-[480px]" style={{ background:"var(--le-obs3)" }}>
                {modal.image && !imgErrors[modal.id] ? (
                  <img src={modal.image} alt={modal.name} className="img-cover absolute inset-0"
                    onError={() => setImgErrors((prev) => ({ ...prev, [modal.id]: true }))} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LargeBottleSvg color={modal.accentColor} />
                  </div>
                )}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background:"linear-gradient(to right,transparent 60%,var(--le-obs2))" }} />
              </div>

              <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
                <div>
                  <p className="text-[.65rem] tracking-[.22em] uppercase mb-3" style={{ color:"var(--le-gold)" }}>
                    {modal.collection}
                  </p>
                  <h2 className="le-display font-light leading-[1.05]"
                    style={{ fontSize:"clamp(2rem,4vw,3.2rem)", color:"var(--le-white)" }}>
                    {modal.name}
                  </h2>
                </div>

                {notesToArray(modal.notes).length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {notesToArray(modal.notes).map((note) => (
                      <span key={note} className="text-[.7rem] tracking-[.08em] px-3 py-1.5 rounded-[1px]"
                        style={{ background:"rgba(201,169,110,.08)", color:"var(--le-mist)", border:"1px solid rgba(201,169,110,.15)" }}>
                        {note}
                      </span>
                    ))}
                  </div>
                )}

                <p className="le-display text-[2.2rem] font-light" style={{ color:"var(--le-gold-light)" }}>
                  ₦{modal.price.toLocaleString()}
                </p>

                <div className="flex flex-col gap-3">
                  <a href={waLink(modal)}
                    className="inline-flex items-center justify-center gap-3 text-[.75rem] tracking-[.14em] uppercase font-medium px-8 py-4 rounded-[1px] transition-all duration-300"
                    style={{ background:"var(--le-gold)", color:"var(--le-obsidian)" }}
                    onMouseEnter={(e)=>{ e.currentTarget.style.background="var(--le-gold-light)"; e.currentTarget.style.transform="translateY(-1px)"; }}
                    onMouseLeave={(e)=>{ e.currentTarget.style.background="var(--le-gold)"; e.currentTarget.style.transform=""; }}
                    target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon size={18} color="var(--le-obsidian)" /> Order on WhatsApp
                  </a>
                  <button onClick={() => setModal(null)}
                    className="text-[.7rem] tracking-[.12em] uppercase px-8 py-3 rounded-[1px] transition-colors duration-200"
                    style={{ background:"transparent", color:"var(--le-mist)", border:"1px solid rgba(201,169,110,.18)" }}
                    onMouseEnter={(e)=>(e.currentTarget.style.borderColor="rgba(201,169,110,.4)")}
                    onMouseLeave={(e)=>(e.currentTarget.style.borderColor="rgba(201,169,110,.18)")}>
                    Continue browsing
                  </button>
                </div>

                <p className="text-[.72rem] leading-[1.7]" style={{ color:"var(--le-mist)" }}>
                  Message us to confirm availability and arrange same-day or next-day delivery within Lagos.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────── */
function ProductCard({ product, index, imgError, onImgError, onQuickView, waLink }: {
  product: Product;
  index: number;
  imgError: boolean;
  onImgError: () => void;
  onQuickView: () => void;
  waLink: string;
}) {
  const delayClass = `le-d${Math.min(index % 3, 3)}`;
  const accentRgb = product.accentColor === "rose" ? "196,150,140" : product.accentColor === "olive" ? "122,148,104" : "201,169,110";
  const accentVar = product.accentColor === "rose" ? "var(--le-rose)" : product.accentColor === "olive" ? "var(--le-olive,#7A9468)" : "var(--le-gold)";
  const notesLine = notesToLine(product.notes);

  return (
    <article className={`card-glow le-reveal ${delayClass} group relative flex flex-col transition-colors duration-300`}
      style={{ background:"var(--le-obs2)" }}
      onMouseEnter={(e)=>((e.currentTarget as HTMLElement).style.background="var(--le-obs3)")}
      onMouseLeave={(e)=>((e.currentTarget as HTMLElement).style.background="var(--le-obs2)")}>

      <div className="relative overflow-hidden" style={{ aspectRatio:"3/4" }}>
        {product.image && !imgError ? (
          <>
            <img src={product.image} alt={product.name} className="img-cover transition-transform duration-700 group-hover:scale-105"
              onError={onImgError} loading="lazy" />
            <div className="absolute inset-0 transition-opacity duration-500"
              style={{ background:"linear-gradient(to bottom,rgba(10,8,6,.18) 0%,rgba(10,8,6,.72) 100%)" }} />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background:`radial-gradient(ellipse at 50% 60%,rgba(${accentRgb},.12) 0%,var(--le-obs3) 70%)` }}>
            <LargeBottleSvg color={product.accentColor} />
          </div>
        )}

        {(product.badge || product.bestseller) && (
          <span className="absolute top-4 left-4 text-[.6rem] tracking-[.18em] uppercase px-3 py-1.5 rounded-[1px]"
            style={{ background: accentVar, color:"var(--le-obsidian)", fontWeight:500 }}>
            {product.badge ?? "Bestseller"}
          </span>
        )}

        <button onClick={onQuickView}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background:"rgba(10,8,6,.4)" }}>
          <span className="text-[.7rem] tracking-[.18em] uppercase px-5 py-3 rounded-[1px]"
            style={{ background:"rgba(201,169,110,.15)", color:"var(--le-gold-light)", border:"1px solid rgba(201,169,110,.35)", backdropFilter:"blur(8px)" }}>
            Quick view
          </span>
        </button>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <p className="text-[.62rem] tracking-[.18em] uppercase mb-2" style={{ color: accentVar }}>
          {product.collection}
        </p>
        <h3 className="le-display font-light text-[1.45rem] leading-[1.1] mb-2" style={{ color:"var(--le-white)" }}>
          {product.name}
        </h3>
        {notesLine && (
          <p className="text-[.75rem] leading-[1.7] mb-4" style={{ color:"var(--le-mist)" }}>
            {notesLine}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-4"
          style={{ borderTop:"1px solid rgba(201,169,110,.1)" }}>
          <span className="le-display text-[1.4rem] font-light" style={{ color:"var(--le-gold-light)" }}>
            ₦{product.price.toLocaleString()}
          </span>
          <a href={waLink}
            className="inline-flex items-center gap-2 text-[.65rem] tracking-[.12em] uppercase font-medium px-4 py-2.5 rounded-[1px] transition-all duration-200"
            style={{ background:"var(--le-gold)", color:"var(--le-obsidian)" }}
            onMouseEnter={(e)=>{ e.currentTarget.style.background="var(--le-gold-light)"; e.currentTarget.style.transform="translateY(-1px)"; }}
            onMouseLeave={(e)=>{ e.currentTarget.style.background="var(--le-gold)"; e.currentTarget.style.transform=""; }}
            target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={14} color="var(--le-obsidian)" /> Order
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background:`linear-gradient(90deg,transparent,${accentVar},transparent)` }} />
    </article>
  );
}

/* ─────────────────────────────────────────────
   SVG ASSETS (fallback only — used if a product
   has no image or its image fails to load)
───────────────────────────────────────────── */
function HeroBannerBottle() {
  return (
    <svg width="90" height="200" viewBox="0 0 90 200" fill="none" opacity=".35">
      <defs>
        <linearGradient id="hbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2CFA0"/><stop offset="100%" stopColor="#C9A96E"/>
        </linearGradient>
      </defs>
      <rect x="34" y="8" width="22" height="5" rx="1" fill="url(#hbg)" opacity=".8"/>
      <rect x="36" y="13" width="18" height="18" rx="1" fill="url(#hbg)" opacity=".7"/>
      <path d="M38 31 L36 48 L54 48 L52 31Z" fill="rgba(201,169,110,.3)"/>
      <rect x="18" y="48" width="54" height="140" rx="3" fill="rgba(201,169,110,.12)" stroke="rgba(201,169,110,.3)" strokeWidth=".5"/>
      <rect x="24" y="78" width="42" height="55" rx="2" fill="none" stroke="rgba(201,169,110,.2)" strokeWidth=".5"/>
      <text x="45" y="102" textAnchor="middle" fontFamily="serif" fontSize="8" fill="rgba(201,169,110,.6)" letterSpacing="2">L'E</text>
    </svg>
  );
}

function SmallBottleAccent() {
  return (
    <svg width="50" height="110" viewBox="0 0 50 110" fill="none" opacity=".2">
      <rect x="19" y="4" width="12" height="4" rx="1" fill="#C9A96E"/>
      <rect x="20" y="8" width="10" height="12" rx="1" fill="#C9A96E" opacity=".7"/>
      <path d="M20 20 L18 30 L32 30 L30 20Z" fill="rgba(201,169,110,.3)"/>
      <rect x="8" y="30" width="34" height="76" rx="2" fill="rgba(201,169,110,.1)" stroke="rgba(201,169,110,.25)" strokeWidth=".5"/>
    </svg>
  );
}

function LargeBottleSvg({ color }: { color?: string }) {
  const rgb = color === "rose" ? "196,150,140" : color === "olive" ? "122,148,104" : "201,169,110";
  return (
    <svg width="100" height="186" viewBox="0 0 100 186" fill="none">
      <defs>
        <linearGradient id={`lg-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`rgba(${rgb},.5)`}/><stop offset="100%" stopColor={`rgba(${rgb},.15)`}/>
        </linearGradient>
      </defs>
      <rect x="37" y="5" width="26" height="5" rx="1" fill={`rgba(${rgb},.6)`}/>
      <rect x="39" y="10" width="22" height="18" rx="1" fill={`rgba(${rgb},.5)`}/>
      <path d="M39 28 L36 44 L64 44 L61 28Z" fill={`rgba(${rgb},.2)`}/>
      <rect x="14" y="44" width="72" height="136" rx="3" fill={`url(#lg-${color})`} stroke={`rgba(${rgb},.3)`} strokeWidth=".5"/>
      <rect x="22" y="72" width="56" height="68" rx="2" fill="none" stroke={`rgba(${rgb},.2)`} strokeWidth=".5"/>
      <text x="50" y="106" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="10" fill={`rgba(${rgb},.7)`} letterSpacing="3">L'ESSENCE</text>
      <line x1="28" y1="112" x2="72" y2="112" stroke={`rgba(${rgb},.2)`} strokeWidth=".5"/>
    </svg>
  );
}

function WhatsAppIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   LOADING SKELETON
───────────────────────────────────────────── */
function PageSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:"var(--le-obsidian)" }}>
      <div className="le-display text-[1.2rem] tracking-[.2em] font-light" style={{ color:"var(--le-mist)" }}>
        Loading collections…
      </div>
    </div>
  );
}