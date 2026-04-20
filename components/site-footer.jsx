import Link from "next/link";

// TODO: Replace '#' with actual page URLs when those pages exist
const exploreLinks = [
  { href: "/welcome", label: "Welcome" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/featured", label: "Featured" },
  { href: "/stories", label: "Stories" },
  { href: "/ecosystem", label: "Ecosystem" },
];

const ecosystemLinks = [
  { href: "/ecosystem#ventures",   label: "HOME Ventures" },
  { href: "/ecosystem#ai",         label: "HOME AI" },
  { href: "/ecosystem#fellowship", label: "HOME Fellowship" },
  { href: "/ecosystem#base",       label: "HOME Base" },
  { href: "/ecosystem",            label: "HOME Media" },
  { href: "/ecosystem#ventures",   label: "HOME Fund" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">

      {/* 1. Closing line — the emotional hero of the footer */}
      <div className="sf-hero">
        <div className="sf-hero__glow" aria-hidden="true" />
        <p className="sf-hero__text">Life is a family, not a marketplace.</p>
      </div>

      {/* 2. Quiet navigation — two columns, stacked on mobile */}
      <div className="sf-nav">
        <div className="sf-nav__inner">
          <div className="sf-nav__col">
            <span className="sf-nav__label">Explore</span>
            <ul className="sf-nav__list">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="sf-nav__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="sf-nav__col">
            <span className="sf-nav__label">The Ecosystem</span>
            <ul className="sf-nav__list">
              {ecosystemLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="sf-nav__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Connective tissue — the closing whisper */}
      <div className="sf-bottom">
        {/* TODO: Verify email is active once Cloudflare Email Routing is configured */}
        <a href="mailto:hello@homeverse.family" className="sf-bottom__contact">
          Write to us — hello@homeverse.family
        </a>
        <div className="sf-bottom__social">
          <a href="https://www.threads.com/@noamverse" className="sf-bottom__social-link" target="_blank" rel="noopener noreferrer">Threads</a>
          <span className="sf-bottom__dot" aria-hidden="true">·</span>
          <a href="https://www.instagram.com/homemultiverse" className="sf-bottom__social-link" target="_blank" rel="noopener noreferrer">Instagram</a>
          <span className="sf-bottom__dot" aria-hidden="true">·</span>
          <a href="https://www.linkedin.com/company/homemultiverse/" className="sf-bottom__social-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <p className="sf-bottom__copy">© 2026 HOME. Built with love.</p>
      </div>

    </footer>
  );
}
