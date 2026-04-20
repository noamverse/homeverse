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
  // TODO: Add /ecosystem#media anchor once HOME Media becomes a dedicated branch on the ecosystem page
  { href: "/ecosystem",            label: "HOME Media" },
  // TODO: Add /ecosystem#fund anchor once HOME Fund becomes a dedicated branch on the ecosystem page
  { href: "/ecosystem",            label: "HOME Fund" },
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
        {/* TODO: Replace with real HOME email address once domain and email are configured. */}
        <a href="mailto:hello@home.xyz" className="sf-bottom__contact">
          Write to us — hello@home.xyz
        </a>
        <div className="sf-bottom__social">
          {/* TODO: Replace '#' with real social profile URLs */}
          <a href="#" className="sf-bottom__social-link">Threads</a>
          <span className="sf-bottom__dot" aria-hidden="true">·</span>
          <a href="#" className="sf-bottom__social-link">Instagram</a>
          <span className="sf-bottom__dot" aria-hidden="true">·</span>
          <a href="#" className="sf-bottom__social-link">LinkedIn</a>
        </div>
        <p className="sf-bottom__copy">© 2026 HOME. Built with love.</p>
      </div>

    </footer>
  );
}
