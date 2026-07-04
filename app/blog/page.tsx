"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { whatsappNumber } from "@/app/lib/data";
import { CONTACT } from "@/app/lib/contact";
import Image from "next/image";

const GOLD = "var(--le-gold)";
const GOLD_LIGHT = "var(--le-gold-light)";
const MIST = "var(--le-mist)";
const OBS2 = "var(--le-obs2)";
const OBS3 = "var(--le-obs3)";
const WHITE = "var(--le-white)";

/* ─────────────────────────────────────────────
   BLOG DATA — full article content added
───────────────────────────────────────────── */
const POSTS = [
  {
    id: "oud-guide",
    tag: "Fragrance 101",
    tagColor: GOLD,
    title:
      "The Complete Guide to Oud: Why the World's Most Expensive Wood Smells Like Nothing Else",
    excerpt:
      "Oud has been burned in palaces and mosques for centuries, but what actually makes it smell the way it does — and how do you wear it without being overwhelmed?",
    readTime: "6 min read",
    date: "June 2025",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80",
    featured: true,
    waText:
      "Hello L'Essence, I read your oud guide and I'd like to try an oud fragrance.",
    body: [
      {
        type: "p",
        text: "Oud — also called agarwood — comes from the Aquilaria tree, native to Southeast Asia and parts of the Middle East. When the tree becomes infected with a specific mould, it produces a dark, resinous wood as a defence. That resin is oud. The rarer and older the infection, the more complex and valuable the scent.",
      },
      { type: "h3", text: "Why does it smell so distinctive?" },
      {
        type: "p",
        text: "Oud has a smell unlike any other ingredient in perfumery. Depending on its origin — Indian oud is often animalic and dense, Cambodian oud is smoother and sweeter, Laotian oud is lighter and more floral — it can read as smoky, woody, leathery, sweet, or even faintly medicinal. The complexity is the point.",
      },
      {
        type: "p",
        text: "A good oud fragrance unfolds in stages. The first spray might feel intense — almost challenging. Give it ten minutes. The warmth of your skin begins to soften it, and what was sharp becomes rich. After an hour, most oud fragrances settle into a deep, almost intimate base that lasts all day.",
      },
      { type: "h3", text: "How to wear oud without being overwhelmed" },
      {
        type: "p",
        text: "The rule is simple: less is more, especially at first. One or two sprays on the wrist or neck is enough. Oud is designed to project — it doesn't need help. If you're new to it, try an oud blend rather than pure oud oil. Blended with amber, rose, or sandalwood, it becomes far more approachable.",
      },
      {
        type: "p",
        text: "At L'Essence, our Nocturne Reserve collection is built around oud. Each fragrance uses a different oud base — some smoky, some sweet, some almost floral. Message us and we'll help you find the one that works for your skin and occasion.",
      },
    ],
  },
  {
    id: "skin-chemistry",
    tag: "Scent Science",
    tagColor: "var(--le-rose)",
    title: "Why the Same Perfume Smells Different on Every Person",
    excerpt:
      "Your skin pH, body temperature, and even your diet change how a fragrance unfolds. Here's the science — and how to use it when you're shopping.",
    readTime: "5 min read",
    date: "May 2025",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=900&q=80",
    featured: true,
    waText:
      "Hello L'Essence, I read about skin chemistry and want help finding my perfect scent.",
    body: [
      {
        type: "p",
        text: "You've seen it happen. A friend sprays a fragrance, it smells incredible. You try the same bottle on your wrist — it doesn't quite work. This is skin chemistry, and it's one of the most misunderstood parts of wearing perfume.",
      },
      { type: "h3", text: "The science of it" },
      {
        type: "p",
        text: "Your skin's pH level, moisture content, body temperature, and even the bacteria that naturally live on your skin all interact with fragrance molecules. Slightly acidic skin (common in people who eat a lot of citrus or red meat) can amplify certain notes and dampen others. Warmer skin makes fragrance project more — which is why the same scent feels bolder on someone with a higher body temperature.",
      },
      { type: "h3", text: "What this means when you're shopping" },
      {
        type: "p",
        text: "Never judge a fragrance on paper. Spray it on your wrist, wait ten minutes, and smell it again. That first burst — the top notes — will have faded, and what's left is what the fragrance actually smells like on your skin. That's what you'll be wearing all day.",
      },
      {
        type: "p",
        text: "It also means you can't trust a recommendation that doesn't account for you specifically. That's why we ask questions before we recommend anything. Message us — tell us what you've tried before, what you liked and didn't like — and we'll suggest something that's actually likely to work on your skin.",
      },
    ],
  },
  {
    id: "layering-scents",
    tag: "How To",
    tagColor: "var(--le-olive,#7A9468)",
    title: "How to Layer Fragrances Without Making a Mess",
    excerpt:
      "Fragrance layering can make your scent last longer and feel completely unique to you. We walk you through which notes pair well and which combinations to avoid.",
    readTime: "4 min read",
    date: "May 2025",
    image:
      "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&w=900&q=80",
    featured: false,
    waText:
      "Hello L'Essence, I want to try layering fragrances. Can you help me pick a combination?",
    body: [
      {
        type: "p",
        text: "Layering fragrances — wearing two or more at once — sounds risky, but when it works, it produces something that smells entirely like you. A signature that can't be bought off a shelf.",
      },
      { type: "h3", text: "The basic rule: anchor + accent" },
      {
        type: "p",
        text: "Start with an anchor: a heavier, longer-lasting fragrance as your base. Oud, sandalwood, amber, and musk all work well as anchors. Then add an accent on top — something lighter and more characterful, like a citrus, a floral, or a green note. The anchor holds the scent on your skin; the accent gives it personality.",
      },
      { type: "h3", text: "Combinations that almost always work" },
      {
        type: "p",
        text: "Oud + rose is the oldest pairing in Middle Eastern perfumery, and for good reason — they complement each other perfectly. Sandalwood + citrus is clean and modern. Musk + floral feels effortless and skin-like. Start with these and build your intuition from there.",
      },
      { type: "h3", text: "What to avoid" },
      {
        type: "p",
        text: "Layering two fragrances with similar heavy base notes — two ouds, two ambers — usually just creates a dense, indistinct cloud. And avoid layering two fragrances with conflicting personalities, like a sharp green and a heavy animalic. If you're unsure, message us — we're happy to suggest pairings from our collection.",
      },
    ],
  },
  {
    id: "gifting-guide",
    tag: "Gifting",
    tagColor: GOLD,
    title: "The L'Essence Gifting Guide: How to Buy a Perfume for Someone Else",
    excerpt:
      "Buying fragrance as a gift feels risky, but it doesn't have to be. A few smart questions — and our help — make it one of the most personal gifts you can give.",
    readTime: "4 min read",
    date: "April 2025",
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80",
    featured: false,
    waText: "Hello L'Essence, I need help buying a perfume as a gift.",
    body: [
      {
        type: "p",
        text: "Perfume is one of the most personal gifts you can give — which is exactly why people are afraid to buy it for someone else. What if they don't like it? What if it doesn't smell right on them? These are real concerns, but they're manageable.",
      },
      { type: "h3", text: "Ask three questions before you shop" },
      {
        type: "p",
        text: "First: what fragrances do they already wear, and what do they say about them? This tells you their general direction — whether they lean fresh or heavy, floral or woody. Second: what's the occasion? A daytime gift for someone's birthday is different from something intended for evening wear. Third: is there anything they've specifically said they love or hate? People usually have opinions about scent even if they've never bought a bottle themselves.",
      },
      { type: "h3", text: "When in doubt, go neutral" },
      {
        type: "p",
        text: "If you have no information to go on, choose something in the middle of the spectrum — a clean musk or a light floral rather than a bold oud or a sharp green. Universally wearable fragrances are safer gifts than characterful ones, even if they're slightly less interesting.",
      },
      {
        type: "p",
        text: "The best option: message us. Tell us who the gift is for, what you know about them, your budget, and the occasion. We'll recommend the right bottle and can arrange gift packaging. We've helped people choose dozens of fragrance gifts — it's one of the things we're genuinely good at.",
      },
    ],
  },
  {
    id: "notes-explained",
    tag: "Fragrance 101",
    tagColor: GOLD,
    title: "Top, Heart, Base: What Fragrance Notes Actually Mean",
    excerpt:
      "You've seen the pyramid on every perfume description. But what do top notes, heart notes, and base notes actually do — and why does a scent smell so different after an hour?",
    readTime: "5 min read",
    date: "March 2025",
    image:
      "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&w=900&q=80",
    featured: false,
    waText:
      "Hello L'Essence, I read your notes guide and want to learn more about a specific fragrance.",
    body: [
      {
        type: "p",
        text: "Every fragrance is built in layers, and those layers reveal themselves over time. That's why a perfume that smells sharp and citrusy in the bottle can end up warm and woody on your skin an hour later. Understanding the three layers — top, heart, and base — helps you make better buying decisions.",
      },
      { type: "h3", text: "Top notes: the first impression" },
      {
        type: "p",
        text: "Top notes are the first thing you smell when you spray. They're usually light, fresh, and sharp — citrus, green, aquatic, or aldehydic notes are common. They're designed to make an immediate impression. The problem: they evaporate quickly. Most top notes fade within 15–30 minutes. Never buy a fragrance based on how it smells on first spray.",
      },
      { type: "h3", text: "Heart notes: the character" },
      {
        type: "p",
        text: "After the top notes fade, the heart of the fragrance emerges. This is usually the most complex and representative part — florals, spices, and some woods appear here. The heart is what gives a fragrance its identity, and it lasts for several hours.",
      },
      { type: "h3", text: "Base notes: what stays" },
      {
        type: "p",
        text: "Base notes are the foundation — the heaviest, longest-lasting molecules in the formula. Oud, sandalwood, musk, amber, and vetiver are all common base notes. They often can't be smelled immediately, but they anchor the fragrance and are what you smell at the end of the day. A good base note is what makes a fragrance feel expensive.",
      },
    ],
  },
  {
    id: "lagos-scent-culture",
    tag: "Culture",
    tagColor: "var(--le-rose)",
    title:
      "Scent in Lagos: How a City's Heat, Humidity, and Energy Changes How We Wear Fragrance",
    excerpt:
      "Lagos is not Paris. The humidity, the heat, the pace — they all shape which fragrances work and which disappear in an hour. We break down what thrives in our climate.",
    readTime: "7 min read",
    date: "February 2025",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffedac5c8a0?auto=format&fit=crop&w=900&q=80",
    featured: false,
    waText:
      "Hello L'Essence, I want a fragrance that works well in Lagos heat.",
    body: [
      {
        type: "p",
        text: "Fragrance advice written for Paris or London doesn't translate to Lagos. In a city this hot and humid, the rules change. What projects beautifully in a European winter can become overwhelming in Lagos heat. And what works in air conditioning might disappear completely the moment you step outside.",
      },
      { type: "h3", text: "How heat changes fragrance" },
      {
        type: "p",
        text: "Heat is a fragrance amplifier. Your body temperature increases how quickly fragrance molecules evaporate — which means everything projects more, and top notes disappear faster. In Lagos, a fragrance that smells balanced in an air-conditioned room can become overpowering outside. This means you need to apply less, and you need fragrances that are built to handle amplification.",
      },
      { type: "h3", text: "Humidity is the other factor" },
      {
        type: "p",
        text: "High humidity can make certain ingredients — particularly heavy synthetics and some musks — go sour or powdery on the skin. Fragrances with natural ingredients tend to perform more predictably in humid conditions. This is part of why we prioritise quality of ingredients, not just price point, when building our collection.",
      },
      { type: "h3", text: "What works in our climate" },
      {
        type: "p",
        text: "Clean musks and light florals work year-round — they don't fight the heat, they work with it. Oud, when it's a high-quality oud rather than a synthetic approximation, actually performs beautifully in heat — it becomes richer and more complex rather than turning harsh. Avoid heavy synthetic ouds in Lagos summers. Fresh citrus works brilliantly but fades quickly; pair it with a woody base to help it last.",
      },
      {
        type: "p",
        text: "We built the L'Essence collection with Lagos wearability in mind. Message us and tell us where you're wearing it — daytime, evening, air-conditioned office, outdoor event — and we'll recommend accordingly.",
      },
    ],
  },
];

const TAGS = [
  "All",
  "Fragrance 101",
  "Scent Science",
  "How To",
  "Gifting",
  "Culture",
];

function waHref(text: string) {
  return `https://wa.me/${CONTACT.ordersWhatsApp}?text=${encodeURIComponent(text)}`;
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function BlogPage() {
  const [active, setActive] = useState("All");
  const [visible, setVisible] = useState(false);
  const [readPost, setReadPost] = useState<(typeof POSTS)[0] | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const filtered =
    active === "All" ? POSTS : POSTS.filter((p) => p.tag === active);
  const featured = POSTS.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  /* close modal on Escape */
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setReadPost(null);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  /* lock body scroll when modal is open */
  useEffect(() => {
    document.body.style.overflow = readPost ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [readPost]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".le-reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("le-visible");
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [active]);

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
        .le-d1{transition-delay:.08s;}.le-d2{transition-delay:.18s;}
        .le-d3{transition-delay:.28s;}.le-d4{transition-delay:.38s;}
        .post-img{object-fit:cover;width:100%;height:100%;transition:transform .6s ease;}
        .post-card:hover .post-img{transform:scale(1.04);}
        .tag-btn{transition:all .22s;}
        .read-btn{cursor:pointer;transition:all .25s;}
        .read-btn:hover{letter-spacing:.18em;}
        @keyframes modalIn{from{opacity:0;transform:translateY(24px) scale(.98);}to{opacity:1;transform:translateY(0) scale(1);}}
        .modal-in{animation:modalIn .28s cubic-bezier(.22,1,.36,1) both;}
        @keyframes backdropIn{from{opacity:0;}to{opacity:1;}}
        .backdrop-in{animation:backdropIn .22s ease both;}
        @media(prefers-reduced-motion:reduce){.le-reveal,.post-img,.modal-in,.backdrop-in{animation:none;transition:none;opacity:1;transform:none;}}
      `}</style>

      <main
        style={{
          fontFamily: "'DM Sans',system-ui,sans-serif",
          fontWeight: 300,
          color: "var(--le-cream)",
          background: "var(--le-obsidian)",
        }}
      >
        {/* ════════════════════════════════
            HERO
        ════════════════════════════════ */}
        <section
          className="relative flex flex-col justify-end overflow-hidden"
          style={{
            minHeight: "50vh",
            background:
              "radial-gradient(ellipse 70% 60% at 50% 100%,#1E160A 0%,var(--le-obsidian) 65%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(201,169,110,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,.03) 1px,transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          <div className="relative z-10 px-8 md:px-20 pb-16 pt-28">
            <p
              className={`flex items-center gap-4 text-[.68rem] tracking-[.32em] uppercase mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              style={{ color: GOLD, transitionDelay: ".08s" }}
            >
              <span
                className="inline-block w-8 h-[1px]"
                style={{ background: GOLD }}
              />
              The L'Essence Journal
            </p>
            <h1
              className={`le-display font-light leading-[1.02] mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                fontSize: "clamp(3rem,6.5vw,6.5rem)",
                color: WHITE,
                transitionDelay: ".18s",
              }}
            >
              Stories about
              <br />
              scent, style, <em style={{ color: GOLD_LIGHT }}>and Lagos.</em>
            </h1>
            <p
              className={`text-[.95rem] leading-[1.85] max-w-[34rem] mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              style={{ color: MIST, transitionDelay: ".28s" }}
            >
              Guides, opinions, and honest advice on wearing fragrance — written
              for people who take scent seriously.
            </p>
            <div
              className={`flex flex-wrap gap-2 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: ".38s" }}
            >
              {TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className="tag-btn text-[.68rem] tracking-[.14em] uppercase px-4 py-2 rounded-[1px] font-medium"
                  style={{
                    background: active === t ? GOLD : "rgba(201,169,110,.08)",
                    color: active === t ? "var(--le-obsidian)" : MIST,
                    border:
                      active === t
                        ? `1px solid ${GOLD}`
                        : "1px solid rgba(201,169,110,.18)",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom,transparent,var(--le-obsidian))",
            }}
          />
        </section>

        {/* ════════════════════════════════
            FEATURED POSTS
        ════════════════════════════════ */}
        {active === "All" && (
          <section
            className="px-8 md:px-20 py-16"
            style={{ background: "var(--le-obsidian)" }}
          >
            <p
              className="le-reveal flex items-center gap-4 text-[.68rem] tracking-[.3em] uppercase mb-10"
              style={{ color: GOLD }}
            >
              <span
                className="inline-block w-8 h-[1px]"
                style={{ background: GOLD }}
              />
              Featured reads
            </p>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-[1px]"
              style={{ background: "rgba(201,169,110,.08)" }}
            >
              {featured.map((post, i) => (
                <div
                  key={post.id}
                  className={`post-card le-reveal le-d${i + 1} group relative flex flex-col overflow-hidden`}
                  style={{ background: OBS2 }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "16/9" }}
                  >
                    {post.image && !imgErrors[post.id] ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="post-img absolute inset-0"
                        onError={() =>
                          setImgErrors((p) => ({ ...p, [post.id]: true }))
                        }
                        loading="lazy"
                      />
                    ) : (
                      <FallbackCover color={post.tagColor} />
                    )}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to bottom,rgba(10,8,6,.1) 0%,rgba(10,8,6,.75) 100%)",
                      }}
                    />
                    <span
                      className="absolute top-4 left-4 text-[.6rem] tracking-[.18em] uppercase px-3 py-1.5 rounded-[1px] font-medium"
                      style={{
                        background: post.tagColor,
                        color: "var(--le-obsidian)",
                      }}
                    >
                      {post.tag}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span
                        className="text-[.65rem] tracking-[.1em] uppercase"
                        style={{ color: MIST }}
                      >
                        {post.date}
                      </span>
                      <span style={{ color: "rgba(138,128,112,.4)" }}>·</span>
                      <span
                        className="text-[.65rem] tracking-[.1em] uppercase"
                        style={{ color: MIST }}
                      >
                        {post.readTime}
                      </span>
                    </div>
                    <h2
                      className="le-display font-light leading-[1.15] mb-4"
                      style={{
                        fontSize: "clamp(1.4rem,2.2vw,1.9rem)",
                        color: WHITE,
                      }}
                    >
                      {post.title}
                    </h2>
                    <p
                      className="text-[.85rem] leading-[1.8] mb-8 flex-1"
                      style={{ color: MIST }}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      className="flex items-center justify-between flex-wrap gap-4 pt-6"
                      style={{ borderTop: "1px solid rgba(201,169,110,.1)" }}
                    >
                      <a
                        href={waHref(post.waText)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[.68rem] tracking-[.14em] uppercase font-medium px-5 py-3 rounded-[1px] transition-all duration-200"
                        style={{
                          background: GOLD,
                          color: "var(--le-obsidian)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = GOLD_LIGHT;
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = GOLD;
                          e.currentTarget.style.transform = "";
                        }}
                      >
                        <WaIcon size={13} color="var(--le-obsidian)" /> Try this
                        scent →
                      </a>
                      <button
                        onClick={() => setReadPost(post)}
                        className="read-btn flex items-center gap-2 text-[.68rem] tracking-[.14em] uppercase"
                        style={{ color: post.tagColor }}
                      >
                        Read article →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ════════════════════════════════
            ALL / FILTERED GRID
        ════════════════════════════════ */}
        <section className="px-8 md:px-20 py-16" style={{ background: OBS2 }}>
          <p
            className="le-reveal flex items-center gap-4 text-[.68rem] tracking-[.3em] uppercase mb-10"
            style={{ color: GOLD }}
          >
            <span
              className="inline-block w-8 h-[1px]"
              style={{ background: GOLD }}
            />
            {active === "All" ? "All posts" : active}
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p
                className="le-display text-[1.8rem] font-light mb-4"
                style={{ color: MIST }}
              >
                No posts in this category yet.
              </p>
              <button
                onClick={() => setActive("All")}
                className="text-[.7rem] tracking-[.14em] uppercase px-6 py-3 rounded-[1px] mt-2"
                style={{ background: GOLD, color: "var(--le-obsidian)" }}
              >
                View all posts
              </button>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]"
              style={{ background: "rgba(201,169,110,.08)" }}
            >
              {(active === "All" ? rest : filtered).map((post, i) => (
                <PostCard
                  key={post.id}
                  post={post}
                  index={i}
                  imgError={imgErrors[post.id]}
                  onImgError={() =>
                    setImgErrors((p) => ({ ...p, [post.id]: true }))
                  }
                  onRead={() => setReadPost(post)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ════════════════════════════════
            BROADCAST STRIP
        ════════════════════════════════ */}
        <section style={{ background: "var(--le-obsidian)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[360px]">
            <div
              className="relative hidden md:flex items-center justify-center overflow-hidden"
              style={{ background: OBS3 }}
            >
              <JournalSvg />
            </div>
            <div className="flex flex-col justify-center px-8 md:px-14 py-16">
              <p
                className="le-reveal flex items-center gap-4 text-[.68rem] tracking-[.3em] uppercase mb-6"
                style={{ color: GOLD }}
              >
                <span
                  className="inline-block w-8 h-[1px]"
                  style={{ background: GOLD }}
                />
                Never miss a drop
              </p>
              <h2
                className="le-display le-reveal le-d1 font-light leading-[1.08] mb-4"
                style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", color: WHITE }}
              >
                New articles, new scents —<br />
                <em style={{ color: GOLD_LIGHT }}>straight to WhatsApp.</em>
              </h2>
              <p
                className="le-reveal le-d2 text-[.88rem] leading-[1.85] mb-8"
                style={{ color: MIST }}
              >
                Send us a quick message and we'll add you to our broadcast list.
                First to know when new fragrances drop, and first to read the
                journal.
              </p>
              <a
                href={waHref(
                  "Hello L'Essence, I'd like to be added to your WhatsApp broadcast list for new articles and scents.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="le-reveal le-d3 self-start inline-flex items-center gap-3 text-[.75rem] tracking-[.15em] uppercase font-medium px-8 py-4 rounded-[1px] transition-all duration-300"
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
                <WaIcon size={16} color="var(--le-obsidian)" /> Join the
                broadcast list
              </a>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            SCENT CTA
        ════════════════════════════════ */}
        <section
          className="relative overflow-hidden text-center px-8 py-28"
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
              className="absolute rounded-full"
              style={{
                width: 500,
                height: 500,
                border: "1px solid rgba(201,169,110,.06)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: 780,
                height: 780,
                border: "1px solid rgba(201,169,110,.03)",
              }}
            />
          </div>
          <div className="relative z-10">
            <p
              className="le-reveal flex items-center justify-center gap-4 text-[.68rem] tracking-[.3em] uppercase mb-6"
              style={{ color: GOLD }}
            >
              <span
                className="inline-block w-8 h-[1px]"
                style={{ background: GOLD }}
              />
              Ready to shop
            </p>
            <h2
              className="le-display le-reveal le-d1 font-light leading-[1.08] mb-6"
              style={{ fontSize: "clamp(2rem,4vw,3.8rem)", color: WHITE }}
            >
              Enough reading —<br />
              <em style={{ color: GOLD_LIGHT }}>let's find your scent.</em>
            </h2>
            <p
              className="le-reveal le-d2 text-[.92rem] leading-[1.85] max-w-[28rem] mx-auto mb-10"
              style={{ color: MIST }}
            >
              Tell us what you've been looking for and we'll match you to the
              right fragrance via WhatsApp.
            </p>
            <div className="le-reveal le-d3 flex flex-wrap gap-5 justify-center">
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
                Browse the collection →
              </Link>
              <a
                href={waHref(
                  "Hello L'Essence, I've been reading your blog and I'd like a scent recommendation.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[.75rem] tracking-[.12em] uppercase pb-[2px] transition-all duration-300"
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
                  e.currentTarget.style.borderBottomColor =
                    "rgba(201,169,110,.4)";
                }}
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ════════════════════════════════
          READ MODAL
      ════════════════════════════════ */}
      {readPost && (
        <div
          className="backdrop-in fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto py-8 px-4"
          style={{
            background: "rgba(10,8,6,.88)",
            backdropFilter: "blur(14px)",
          }}
          onClick={() => setReadPost(null)}
        >
          <article
            className="modal-in relative w-full max-w-[720px] rounded-[2px] overflow-hidden"
            style={{
              background: "var(--le-obs2)",
              border: "1px solid rgba(201,169,110,.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* close button */}
            <button
              onClick={() => setReadPost(null)}
              className="absolute top-5 right-5 z-10 flex items-center gap-2 text-[.65rem] tracking-[.14em] uppercase px-4 py-2 rounded-[1px] transition-colors duration-200"
              style={{
                background: "rgba(201,169,110,.1)",
                color: MIST,
                border: "1px solid rgba(201,169,110,.2)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MIST)}
              aria-label="Close article"
            >
              ✕ Close
            </button>

            {/* hero image */}
            {readPost.image && (
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "16/7" }}
              >
                <Image
                  src={readPost.image}
                  alt={readPost.title}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom,rgba(10,8,6,.08) 0%,rgba(10,8,6,.7) 100%)",
                  }}
                />
                {/* tag badge over image */}
                <span
                  className="absolute bottom-5 left-7 text-[.6rem] tracking-[.18em] uppercase px-3 py-1.5 rounded-[1px] font-medium"
                  style={{
                    background: readPost.tagColor,
                    color: "var(--le-obsidian)",
                  }}
                >
                  {readPost.tag}
                </span>
              </div>
            )}

            {/* article body */}
            <div className="px-7 md:px-12 py-10">
              {/* meta */}
              <div className="flex items-center gap-5 mb-5">
                <span
                  className="text-[.65rem] tracking-[.12em] uppercase"
                  style={{ color: MIST }}
                >
                  {readPost.date}
                </span>
                <span style={{ color: "rgba(138,128,112,.35)" }}>·</span>
                <span
                  className="text-[.65rem] tracking-[.12em] uppercase"
                  style={{ color: MIST }}
                >
                  {readPost.readTime}
                </span>
              </div>

              {/* title */}
              <h2
                className="le-display font-light leading-[1.1] mb-8"
                style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", color: WHITE }}
              >
                {readPost.title}
              </h2>

              {/* body blocks */}
              <div className="flex flex-col gap-5">
                {readPost.body.map((block, i) =>
                  block.type === "h3" ? (
                    <h3
                      key={i}
                      className="le-display font-light mt-4"
                      style={{
                        fontSize: "clamp(1.1rem,2vw,1.4rem)",
                        color: GOLD_LIGHT,
                      }}
                    >
                      {block.text}
                    </h3>
                  ) : (
                    <p
                      key={i}
                      className="text-[.9rem] leading-[1.9]"
                      style={{ color: MIST }}
                    >
                      {block.text}
                    </p>
                  ),
                )}
              </div>

              {/* divider */}
              <div
                className="my-10"
                style={{ borderTop: "1px solid rgba(201,169,110,.15)" }}
              />

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <a
                  href={waHref(readPost.waText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-[.75rem] tracking-[.14em] uppercase font-medium px-7 py-4 rounded-[1px] transition-all duration-300"
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
                  <WaIcon size={15} color="var(--le-obsidian)" />
                  Try a related scent on WhatsApp
                </a>
                <button
                  onClick={() => setReadPost(null)}
                  className="text-[.7rem] tracking-[.12em] uppercase pb-[2px] transition-colors duration-200"
                  style={{
                    color: MIST,
                    borderBottom: "1px solid rgba(138,128,112,.3)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = MIST)}
                >
                  ← Back to journal
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   POST CARD
───────────────────────────────────────────── */
function PostCard({
  post,
  index,
  imgError,
  onImgError,
  onRead,
}: {
  post: (typeof POSTS)[0];
  index: number;
  imgError: boolean;
  onImgError: () => void;
  onRead: () => void;
}) {
  const delay = `le-d${Math.min((index % 3) + 1, 4)}`;
  return (
    <article
      className={`post-card le-reveal ${delay} group flex flex-col overflow-hidden transition-colors duration-300`}
      style={{ background: "var(--le-obsidian)" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.background = OBS3)
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.background =
          "var(--le-obsidian)")
      }
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        {post.image && !imgError ? (
          <img
            src={post.image}
            alt={post.title}
            className="post-img absolute inset-0"
            onError={onImgError}
            loading="lazy"
          />
        ) : (
          <FallbackCover color={post.tagColor} />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom,rgba(10,8,6,.08) 0%,rgba(10,8,6,.65) 100%)",
          }}
        />
        <span
          className="absolute top-3 left-3 text-[.58rem] tracking-[.16em] uppercase px-2.5 py-1 rounded-[1px] font-medium"
          style={{ background: post.tagColor, color: "var(--le-obsidian)" }}
        >
          {post.tag}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-[.62rem] tracking-[.08em] uppercase"
            style={{ color: MIST }}
          >
            {post.date}
          </span>
          <span style={{ color: "rgba(138,128,112,.35)" }}>·</span>
          <span
            className="text-[.62rem] tracking-[.08em] uppercase"
            style={{ color: MIST }}
          >
            {post.readTime}
          </span>
        </div>
        <h3
          className="le-display font-light leading-[1.2] mb-3"
          style={{ fontSize: "clamp(1.15rem,1.8vw,1.4rem)", color: WHITE }}
        >
          {post.title}
        </h3>
        <p
          className="text-[.8rem] leading-[1.75] mb-6 flex-1"
          style={{ color: MIST }}
        >
          {post.excerpt}
        </p>
        <div
          className="flex items-center justify-between flex-wrap gap-3 pt-4"
          style={{ borderTop: "1px solid rgba(201,169,110,.1)" }}
        >
          <a
            href={`https://wa.me/${CONTACT.ordersWhatsApp}?text=${encodeURIComponent(post.waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[.62rem] tracking-[.12em] uppercase font-medium px-4 py-2 rounded-[1px] transition-all duration-200"
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
            <WaIcon size={12} color="var(--le-obsidian)" /> Try this scent
          </a>
          <button
            onClick={onRead}
            className="read-btn flex items-center gap-1.5 text-[.62rem] tracking-[.14em] uppercase"
            style={{ color: post.tagColor }}
          >
            Read article →
          </button>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────
   SVG ASSETS
───────────────────────────────────────────── */
function FallbackCover({ color }: { color: string }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: `radial-gradient(ellipse at 50% 60%,rgba(201,169,110,.08) 0%,var(--le-obs3) 70%)`,
      }}
    >
      <svg
        width="60"
        height="100"
        viewBox="0 0 60 100"
        fill="none"
        opacity=".4"
      >
        <rect x="22" y="3" width="16" height="3" rx="1" fill={color} />
        <rect
          x="23"
          y="6"
          width="14"
          height="12"
          rx="1"
          fill={color}
          opacity=".7"
        />
        <path d="M23 18 L21 28 L39 28 L37 18Z" fill={color} opacity=".3" />
        <rect
          x="8"
          y="28"
          width="44"
          height="68"
          rx="2"
          fill={color}
          opacity=".1"
          stroke={color}
          strokeWidth=".5"
        />
        <rect
          x="14"
          y="44"
          width="32"
          height="38"
          rx="1"
          fill="none"
          stroke={color}
          strokeWidth=".4"
          opacity=".5"
        />
      </svg>
    </div>
  );
}

function JournalSvg() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 360"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="jg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="rgba(201,169,110,.1)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="400" height="360" fill="#0E0B07" />
      <circle cx="200" cy="180" r="160" fill="url(#jg)" />
      <path
        d="M100 100 L200 120 L300 100 L300 260 L200 280 L100 260 Z"
        fill="none"
        stroke="rgba(201,169,110,.12)"
        strokeWidth="1"
      />
      <line
        x1="200"
        y1="120"
        x2="200"
        y2="280"
        stroke="rgba(201,169,110,.15)"
        strokeWidth=".8"
      />
      {[140, 158, 176, 194, 212, 230].map((y) => (
        <line
          key={`l${y}`}
          x1="118"
          y1={y}
          x2="188"
          y2={y}
          stroke="rgba(201,169,110,.1)"
          strokeWidth=".6"
        />
      ))}
      {[140, 158, 176, 194, 212, 230].map((y) => (
        <line
          key={`r${y}`}
          x1="212"
          y1={y}
          x2="282"
          y2={y}
          stroke="rgba(201,169,110,.1)"
          strokeWidth=".6"
        />
      ))}
      <text
        x="200"
        y="314"
        textAnchor="middle"
        fontFamily="Cormorant Garamond,serif"
        fontSize="10"
        fill="rgba(201,169,110,.35)"
        letterSpacing="4"
      >
        THE JOURNAL
      </text>
    </svg>
  );
}

function WaIcon({
  size = 16,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
