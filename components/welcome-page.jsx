import Link from "next/link";
import { siteTagline } from "@/lib/content";

const arrivalNotes = [
  "Some people arrive as readers and want to stay close to the signal.",
  "Some arrive because they sense a collaboration, feature, or patronage opportunity.",
  "Some simply want to introduce themselves to the house before taking a next step.",
];

const pathways = [
  {
    eyebrow: "Editorial consideration",
    title: "Be Featured",
    body:
      "For founders, hosts, patrons, and worldbuilders whose work carries atmosphere, substance, and a point of view HOME would want to study with care.",
    detail: "Features, essays, conversations, and story-led editorial formats.",
    cta: "View featured",
    href: "/featured",
  },
  {
    eyebrow: "Creative engagement",
    title: "Work With HOME",
    body:
      "For aligned collaborators who want to build with the house through strategy, editorial projects, cultural programming, or thoughtful commissions.",
    detail: "Creative direction, publishing concepts, experiences, and slower forms of advisory work.",
    cta: "Read the philosophy",
    href: "/philosophy",
  },
  {
    eyebrow: "Institutional alignment",
    title: "Partner With HOME",
    body:
      "For brands, institutions, and patrons who understand that trust is built through restraint, standards, and the quality of the environment around the work.",
    detail: "Partnerships shaped for resonance, cultural fit, and long-horizon value.",
    cta: "Enter the stories",
    href: "/stories",
  },
  {
    eyebrow: "Ongoing correspondence",
    title: "Receive the Signal",
    body:
      "For readers who want a quieter way to stay close: worldview, pathways, thoughtful updates, and invitations as the HOME world takes form.",
    detail: "A private channel for the people who want to follow the ecosystem as it deepens.",
    cta: "Explore the ecosystem",
    href: "/ecosystem",
  },
];

const intakeOptions = [
  "Be featured",
  "Work with HOME",
  "Partner with HOME",
  "Receive the signal",
];

function PathwayCard({ eyebrow, title, body, detail, cta, href, index }) {
  return (
    <article className="welcome-pathway-card">
      <div className="welcome-pathway-card__topline">
        <span>{eyebrow}</span>
        <span>{`0${index + 1}`}</span>
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="welcome-pathway-card__footer">
        <p>{detail}</p>
        <Link href={href}>{cta}</Link>
      </div>
    </article>
  );
}

export default function WelcomePage() {
  return (
    <main className="page-main welcome-page">
      <div className="container">
        <div className="welcome-shell">
          <section className="welcome-threshold-header">
            <div className="welcome-threshold-header__topline">
              <p className="home-section-label">Welcome HOME</p>
              <p className="welcome-threshold-header__marker">Receiving room</p>
            </div>

            <div className="welcome-threshold-header__body">
              <div>
                <h1 className="welcome-threshold-header__title">Welcome HOME</h1>
                <p className="welcome-threshold-header__supporting">
                  A quiet threshold into the house, where collaboration, correspondence, and considered arrival can
                  begin with warmth.
                </p>
              </div>

              <div className="welcome-threshold-header__note">
                <p className="welcome-threshold-header__note-label">Threshold note</p>
                <p className="welcome-threshold-header__note-quote">{siteTagline}</p>
                <p className="welcome-threshold-header__note-text">
                  This page is here to help you find the right path into HOME without turning the first encounter into
                  a transaction.
                </p>
              </div>
            </div>
          </section>

          <section className="welcome-orientation">
            <div className="welcome-orientation__intro">
              <p className="home-section-label">Orientation</p>
              <h2 className="section-title">There are different ways to arrive into HOME.</h2>
              <p className="section-copy section-copy--large">
                Some people come to read. Some come because they recognize a fit. Some are looking for a place to
                introduce an idea, a body of work, or a future collaboration. The point of this page is not to rush
                that process. It is to give it shape.
              </p>
            </div>

            <div className="welcome-orientation__notes">
              {arrivalNotes.map((note) => (
                <article key={note}>
                  <p>{note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="welcome-pathways">
            <div className="welcome-section-heading">
              <div>
                <p className="home-section-label">Pathways</p>
                <h2 className="section-title">Choose the form of arrival that feels true to why you are here.</h2>
              </div>
              <p className="section-copy">
                These are not dashboard options or a menu of transactions. They are four different ways of entering
                the ecosystem with clarity.
              </p>
            </div>

            <div className="welcome-pathways__grid">
              {pathways.map((pathway, index) => (
                <PathwayCard key={pathway.title} {...pathway} index={index} />
              ))}
            </div>
          </section>

          <section className="welcome-intake">
            <div className="welcome-intake__copy">
              <p className="home-section-label">Begin the intake</p>
              <h2 className="section-title">Leave a first note for the house.</h2>
              <p className="section-copy section-copy--large">
                A light beginning is enough. Tell HOME how you are arriving, who you are, and what you would like to
                open. This can become the intake surface for future newsletter signups, collaborations, features, and
                partnership inquiries without losing the dignity of the page.
              </p>

              <div className="welcome-intake__aside">
                <p className="welcome-intake__aside-label">A note on tone</p>
                <p>
                  Brief is welcome. Specific is helpful. A few well-chosen lines are better than a formal pitch deck
                  disguised as a contact form.
                </p>
              </div>
            </div>

            <div className="welcome-intake__panel">
              <form className="welcome-intake-form">
                <div className="welcome-intake-form__row">
                  <label className="welcome-intake-form__field">
                    <span>Name</span>
                    <input type="text" placeholder="Your name" />
                  </label>
                  <label className="welcome-intake-form__field">
                    <span>Email</span>
                    <input type="email" placeholder="Your email" />
                  </label>
                </div>

                <label className="welcome-intake-form__field">
                  <span>I am arriving to...</span>
                  <select defaultValue="">
                    <option value="" disabled>
                      Select a pathway
                    </option>
                    {intakeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="welcome-intake-form__field">
                  <span>Context</span>
                  <textarea
                    rows="5"
                    placeholder="A few lines about your work, your interest, or the conversation you would like to begin."
                  />
                </label>

                <div className="welcome-intake-form__actions">
                  <button type="button" className="button-primary">
                    Begin the conversation
                  </button>
                  <p>
                    UI only for now. This section is ready to connect later to newsletter, inquiry, and partnership
                    workflows.
                  </p>
                </div>
              </form>
            </div>
          </section>

          <section className="welcome-closing">
            <p className="home-section-label">Final invitation</p>
            <h2 className="welcome-closing__title">If the atmosphere feels familiar, you have already found the door.</h2>
            <p className="welcome-closing__body">
              Welcome HOME. Enter with care, with signal, with a sense of proportion. Whether you are here to read,
              collaborate, partner, or simply stay near the field, let this be the place where the relationship begins
              well.
            </p>

            <div className="welcome-closing__actions">
              <Link href="/ecosystem" className="button-secondary">
                Explore the ecosystem
              </Link>
              <Link href="/featured" className="button-primary">
                Continue into HOME
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
