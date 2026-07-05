import { CONTACT } from "../lib/contact";

/* ─────────────────────────────────────────────
   TERMS OF SERVICE
   Static content page — server component, no
   client interactivity needed. Shares design
   tokens with the rest of the site.

   NOTE: This is a template, not legal advice.
   Have a Nigerian lawyer review it before
   publishing, and fill in the [bracketed] details
   (business registration name/number, etc.).
───────────────────────────────────────────── */

const LAST_UPDATED = "5 July 2026";

const SECTIONS = [
  { id: "acceptance", label: "Acceptance of terms" },
  { id: "products", label: "Products & availability" },
  { id: "pricing", label: "Pricing & payment" },
  { id: "ordering", label: "Ordering via WhatsApp" },
  { id: "delivery", label: "Delivery" },
  { id: "returns", label: "Returns & authenticity" },
  { id: "ip", label: "Intellectual property" },
  { id: "liability", label: "Limitation of liability" },
  { id: "law", label: "Governing law" },
  { id: "changes", label: "Changes to these terms" },
  { id: "contact", label: "Contact us" },
];

export default function TermsOfServicePage() {
  return (
    <>
      <style>{`
        :root{
          --le-obsidian:#0A0806;--le-obs2:#131009;--le-obs3:#1C1710;
          --le-gold:#C9A96E;--le-gold-light:#E2CFA0;
          --le-cream:#F5EFE6;--le-mist:#8A8070;--le-white:#FDFAF6;
        }
        .lp-display{font-family:'Cormorant Garamond',Georgia,serif;}
        .lp-body{font-family:'DM Sans',system-ui,sans-serif;}
        .lp-section h2{scroll-margin-top:2rem;}
        .lp-toc a{display:block;transition:color .2s;}
        .lp-toc a:hover{color:var(--le-gold-light);}
        .lp-prose p, .lp-prose li{color:var(--le-mist);line-height:1.85;font-size:.92rem;}
        .lp-prose strong{color:var(--le-cream);font-weight:500;}
        .lp-prose a{color:var(--le-gold-light);text-decoration:underline;text-underline-offset:3px;}
        .lp-prose ul{list-style:disc;padding-left:1.25rem;display:flex;flex-direction:column;gap:.5rem;margin-top:.75rem;}
        @media(prefers-reduced-motion:reduce){.lp-toc a{transition:none;}}
      `}</style>

      <main className="lp-body" style={{ background:"var(--le-obsidian)", color:"var(--le-cream)", fontWeight:300, minHeight:"100vh" }}>

        {/* HEADER */}
        <section className="px-8 md:px-20 pt-28 pb-14" style={{ borderBottom:"1px solid rgba(201,169,110,.1)" }}>
          <p className="flex items-center gap-4 text-[.68rem] tracking-[.32em] uppercase mb-6" style={{ color:"var(--le-gold)" }}>
            <span className="inline-block w-8 h-[1px]" style={{ background:"var(--le-gold)" }} />
            Legal
          </p>
          <h1 className="lp-display font-light leading-[1.05]" style={{ fontSize:"clamp(2.4rem,5vw,4.2rem)", color:"var(--le-white)" }}>
            Terms of Service
          </h1>
          <p className="mt-4 text-[.8rem]" style={{ color:"var(--le-mist)" }}>
            Last updated {LAST_UPDATED}
          </p>
        </section>

        {/* BODY */}
        <section className="px-8 md:px-20 py-16 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-20 max-w-[1200px]">

          {/* TOC */}
          <nav className="lp-toc hidden lg:block" aria-label="Table of contents">
            <p className="text-[.62rem] tracking-[.22em] uppercase mb-4" style={{ color:"var(--le-gold)" }}>On this page</p>
            <ul className="flex flex-col gap-3 sticky top-8">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-[.78rem]" style={{ color:"var(--le-mist)" }}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CONTENT */}
          <div className="lp-prose flex flex-col gap-14">

            <div id="acceptance" className="lp-section">
              <SectionHeading n="01" title="Acceptance of terms" />
              <p>
                These terms govern your use of the L'Essence website and any order you place with us,
                whether through this site or via WhatsApp. By browsing the site or placing an order,
                you agree to these terms. If you don't agree with any part of them, please don't use
                the site or place an order.
              </p>
            </div>

            <div id="products" className="lp-section">
              <SectionHeading n="02" title="Products & availability" />
              <p>
                We make reasonable efforts to describe our fragrances, notes, and sizes accurately.
                Bottle photography is representative; slight variations in packaging or batch may
                occur. Products are subject to availability — if an item you order is out of stock,
                we'll let you know via WhatsApp and offer an alternative or a refund.
              </p>
            </div>

            <div id="pricing" className="lp-section">
              <SectionHeading n="03" title="Pricing & payment" />
              <p>
                All prices are listed in Nigerian Naira (₦) and may change without prior notice;
                the price shown at the time you place your order is the price that applies. Payment
                is arranged directly with our team, typically by bank transfer or on delivery, and
                confirmed over WhatsApp before your order is dispatched.
              </p>
            </div>

            <div id="ordering" className="lp-section">
              <SectionHeading n="04" title="Ordering via WhatsApp" />
              <p>
                Tapping "Order on WhatsApp" opens a pre-filled message to our team with the product
                and price you selected — it is a request to order, not a confirmed sale. Your order
                is confirmed once our team replies to confirm availability, delivery details, and
                payment.
              </p>
            </div>

            <div id="delivery" className="lp-section">
              <SectionHeading n="05" title="Delivery" />
              <p>
                We currently offer same-day or next-day delivery within Lagos, and arrange delivery
                to other locations on request. Delivery timing is an estimate, not a guarantee, and
                can be affected by traffic, weather, or courier availability. Please make sure your
                delivery address and phone number are correct when ordering — we are not responsible
                for delays caused by incorrect details.
              </p>
            </div>

            <div id="returns" className="lp-section">
              <SectionHeading n="06" title="Returns & authenticity" />
              <p>
                Every fragrance we sell is authentic. If your order arrives damaged, incorrect, or
                different from what you ordered, message us within 48 hours of delivery with a photo
                and your order details, and we'll arrange a replacement or refund. For hygiene
                reasons, we're unable to accept returns of opened or used bottles unless the product
                itself is faulty.
              </p>
            </div>

            <div id="ip" className="lp-section">
              <SectionHeading n="07" title="Intellectual property" />
              <p>
                The L'Essence name, logo, product names, and site content (text, images, layout) are
                our property or used under licence, and may not be copied or reused without our
                written permission.
              </p>
            </div>

            <div id="liability" className="lp-section">
              <SectionHeading n="08" title="Limitation of liability" />
              <p>
                We are not liable for indirect or consequential loss arising from your use of the
                site or your order (for example, a missed event due to a delivery delay). Our total
                liability for any order is limited to the amount you paid for that order. Nothing in
                these terms limits any right you have that cannot be excluded under Nigerian consumer
                protection law.
              </p>
            </div>

            <div id="law" className="lp-section">
              <SectionHeading n="09" title="Governing law" />
              <p>
                These terms are governed by the laws of the Federal Republic of Nigeria, and any
                dispute will be subject to the exclusive jurisdiction of the Nigerian courts.
              </p>
            </div>

            <div id="changes" className="lp-section">
              <SectionHeading n="10" title="Changes to these terms" />
              <p>
                We may update these terms from time to time. The "last updated" date at the top of
                this page reflects the most recent revision. Continued use of the site after a change
                means you accept the updated terms.
              </p>
            </div>

            <div id="contact" className="lp-section">
              <SectionHeading n="11" title="Contact us" />
              <p>
                Questions about these terms or an existing order? Message us on{" "}
                <a href={`https://wa.me/${CONTACT.ordersWhatsApp}?text=Hello%20L'Essence%2C%20I%20have%20a%20question%20about%20the%20terms%20of%20service.`}
                  target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>{" "}
                and we'll be glad to help.
              </p>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}

function SectionHeading({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-4" style={{ borderLeft:"1px solid rgba(201,169,110,.3)", paddingLeft:"1rem" }}>
      <span className="lp-display text-[1.1rem]" style={{ color:"var(--le-gold)" }}>{n}</span>
      <h2 className="lp-display font-light" style={{ fontSize:"clamp(1.4rem,2.4vw,1.9rem)", color:"var(--le-white)" }}>
        {title}
      </h2>
    </div>
  );
}