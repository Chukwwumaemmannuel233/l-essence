import { CONTACT } from "../lib/contact";

/* ─────────────────────────────────────────────
   PRIVACY POLICY
   Static content page — no client interactivity
   needed, so this stays a server component.
   Uses the same design tokens as the rest of the
   site (obsidian / gold / Cormorant + DM Sans).

   NOTE: This is a template, not legal advice.
   Have a Nigerian lawyer review it against the
   Nigeria Data Protection Act (NDPA) 2023 before
   publishing, and fill in the [bracketed] details.
───────────────────────────────────────────── */

const LAST_UPDATED = "5 July 2026";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "information-we-collect", label: "Information we collect" },
  { id: "how-we-use-it", label: "How we use it" },
  { id: "orders-payment", label: "Orders & payment data" },
  { id: "whatsapp", label: "Communicating via WhatsApp" },
  { id: "cookies", label: "Cookies & analytics" },
  { id: "sharing", label: "Sharing your information" },
  { id: "retention", label: "How long we keep data" },
  { id: "your-rights", label: "Your rights" },
  { id: "children", label: "Children's privacy" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact us" },
];

export default function PrivacyPolicyPage() {
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
            Privacy Policy
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

            <div id="overview" className="lp-section">
              <SectionHeading n="01" title="Overview" />
              <p>
                L'Essence ("we", "us", "our") sells fragrances to customers in Nigeria through this
                website and via WhatsApp. This policy explains what personal information we collect
                when you browse the site, place an order, or message us, how we use it, and the
                choices you have. By using this site or ordering from us, you agree to the practices
                described here.
              </p>
            </div>

            <div id="information-we-collect" className="lp-section">
              <SectionHeading n="02" title="Information we collect" />
              <p>We collect information in three ways:</p>
              <ul>
                <li><strong>Information you give us directly</strong> — your name, phone number, delivery address, and email address when you place an order or message us for a recommendation.</li>
                <li><strong>Information from your order</strong> — the products, sizes, and quantities you request, and your order history with us.</li>
                <li><strong>Information collected automatically</strong> — basic technical data such as your browser type, device type, and pages viewed, used to keep the site working correctly and to understand which fragrances people browse most.</li>
              </ul>
            </div>

            <div id="how-we-use-it" className="lp-section">
              <SectionHeading n="03" title="How we use it" />
              <p>We use your information to:</p>
              <ul>
                <li>Confirm, process, and deliver your order</li>
                <li>Reply to questions and give scent recommendations</li>
                <li>Send order updates (e.g. confirmation, dispatch, delivery) by WhatsApp, SMS, or email</li>
                <li>Improve the site and our product range</li>
                <li>Prevent fraud and keep our systems secure</li>
              </ul>
              <p className="mt-3">We do not sell your personal information to third parties.</p>
            </div>

            <div id="orders-payment" className="lp-section">
              <SectionHeading n="04" title="Orders & payment data" />
              <p>
                When you place an order, we collect the delivery details and contact information
                needed to fulfil it. Payment is typically arranged directly with you (for example by
                bank transfer or on delivery) and confirmed over WhatsApp; we do not store your
                bank card details on this website. If we introduce online card payments in future,
                that payment step will be handled by a licensed third-party payment processor, and
                your card details will go directly to them, not to us.
              </p>
            </div>

            <div id="whatsapp" className="lp-section">
              <SectionHeading n="05" title="Communicating via WhatsApp" />
              <p>
                Most of our ordering and customer support happens on WhatsApp. When you message us,
                WhatsApp (owned by Meta) processes that message according to its own privacy policy
                and terms, in addition to this one. We keep a record of order-related conversations
                so we can look up your order history and resolve any issues.
              </p>
            </div>

            <div id="cookies" className="lp-section">
              <SectionHeading n="06" title="Cookies & analytics" />
              <p>
                This site may use basic cookies or similar technology to remember your preferences
                (such as your last-viewed collection) and to understand overall site traffic. These
                do not identify you personally. You can disable cookies in your browser settings;
                the site will still work, though some conveniences may be lost.
              </p>
            </div>

            <div id="sharing" className="lp-section">
              <SectionHeading n="07" title="Sharing your information" />
              <p>We only share your information with:</p>
              <ul>
                <li>Delivery riders/couriers, so they can bring your order to you</li>
                <li>WhatsApp/Meta, as the platform we use to communicate with you</li>
                <li>Service providers who help us run the site (e.g. hosting), under obligations to protect your data</li>
                <li>Authorities, if required by Nigerian law</li>
              </ul>
            </div>

            <div id="retention" className="lp-section">
              <SectionHeading n="08" title="How long we keep data" />
              <p>
                We keep order and customer information for as long as needed to fulfil orders,
                handle returns or disputes, and meet our accounting and legal obligations, after
                which it is deleted or anonymised.
              </p>
            </div>

            <div id="your-rights" className="lp-section">
              <SectionHeading n="09" title="Your rights" />
              <p>
                Under the Nigeria Data Protection Act (NDPA) 2023, you have the right to ask us
                what personal information we hold about you, to request corrections, and to request
                deletion where we are not required to keep it for legal reasons. To exercise these
                rights, contact us using the details below.
              </p>
            </div>

            <div id="children" className="lp-section">
              <SectionHeading n="10" title="Children's privacy" />
              <p>
                Our products and this site are intended for adults. We do not knowingly collect
                personal information from children.
              </p>
            </div>

            <div id="changes" className="lp-section">
              <SectionHeading n="11" title="Changes to this policy" />
              <p>
                We may update this policy from time to time as our business or the law changes.
                The "last updated" date at the top of this page will reflect the most recent
                revision. Continued use of the site after a change means you accept the updated
                policy.
              </p>
            </div>

            <div id="contact" className="lp-section">
              <SectionHeading n="12" title="Contact us" />
              <p>
                If you have questions about this policy or how your information is handled, message
                us on{" "}
                <a href={`https://wa.me/${CONTACT.ordersWhatsApp}?text=Hello%20L'Essence%2C%20I%20have%20a%20question%20about%20the%20privacy%20policy.`}
                  target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>{" "}
                and we'll respond as soon as we can.
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