import Link from "next/link";
import { siteTagline } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__copy">
          <strong>HOME</strong> is a premium global media platform for thoughtful stories, elegant reporting, and
          slower ideas. {siteTagline}
        </div>

        <div className="site-nav" aria-label="Footer navigation">
          <Link href="/philosophy">Philosophy</Link>
          <Link href="/profiles">Profiles</Link>
          <Link href="/stories">Stories</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/welcome">Welcome HOME</Link>
        </div>
      </div>
    </footer>
  );
}
