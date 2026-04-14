import Link from "next/link";
import { siteTagline } from "@/lib/content";

export const metadata = {
  title: "Enter HOME",
};

export default function EnterHomePage() {
  return (
    <main className="page-main">
      <div className="container">
        <section className="page-hero">
          <div className="page-hero__inner">
            <div className="eyebrow">Enter HOME</div>
            <h1 className="section-title">Begin with the rooms that shape the house.</h1>
            <p className="section-copy">
              {siteTagline} Start with the philosophy, spend time with the profiles, and move through the stories and
              journal at a more human pace.
            </p>
          </div>
        </section>

        <section className="movement-grid">
          <Link href="/philosophy" className="movement-card movement-card--link">
            <h3 className="movement-card__title">Read the philosophy</h3>
            <p className="section-copy">Begin with the first principles behind HOME and the worldview shaping the institution.</p>
          </Link>

          <Link href="/profiles" className="movement-card movement-card--link">
            <h3 className="movement-card__title">Meet the profiles</h3>
            <p className="section-copy">Spend time with founders, patrons, and hosts who are building with relational intelligence.</p>
          </Link>

          <Link href="/stories" className="movement-card movement-card--link">
            <h3 className="movement-card__title">Enter the stories</h3>
            <p className="section-copy">Read narrative features that trace atmosphere, taste, culture, and power with emotional depth.</p>
          </Link>

          <Link href="/journal" className="movement-card movement-card--link">
            <h3 className="movement-card__title">Receive the journal</h3>
            <p className="section-copy">Return to the interior voice of the project through essays, notes, and slower reflections.</p>
          </Link>
        </section>
      </div>
    </main>
  );
}
