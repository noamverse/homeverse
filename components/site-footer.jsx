import Link from "next/link";
import { siteTagline } from "@/lib/content";

const navLinks = [
  { href: "/philosophy", label: "Philosophy" },
  { href: "/featured", label: "Featured" },
  { href: "/stories", label: "Stories" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/welcome", label: "Welcome HOME" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">HOME</p>
          <p className="site-footer__tagline">{siteTagline}</p>
          <p className="site-footer__copy">
            A relationship-centered media platform built for founders, patrons, and worldbuilders.
            Hospitality, editorial rigor, and cultural taste under one roof.
          </p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="site-footer__bottom">
        <span className="site-footer__legal">
          &copy; {new Date().getFullYear()} HOME. All rights reserved.
        </span>
        <span className="site-footer__legal">
          Built with intention.
        </span>
      </div>
    </footer>
  );
}
