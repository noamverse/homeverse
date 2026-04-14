import Image from "next/image";
import Link from "next/link";
import { siteTagline } from "@/lib/content";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/featured", label: "Featured" },
  { href: "/stories", label: "Stories" },
  { href: "/journal", label: "Journal" },
  { href: "/welcome", label: "Welcome HOME" },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label="HOME home page">
          <span className="brand-mark">
            <Image
              src="/logo.png.png"
              alt="HOME logo"
              width={200}
              height={80}
              className="brand-logo"
              priority
            />
          </span>

          <span className="brand-copy">
            <span className="brand-name">HOME</span>
            <span className="brand-tagline">{siteTagline}</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
