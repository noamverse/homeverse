import Link from "next/link";
import styles from "./ecosystem-page.module.css";

const thresholdSignals = ["Belonging", "Hospitality", "Media", "Capital", "Events", "Spaces", "Relationship"];

const pillars = [
  {
    title: "Capital with conscience",
    label: "HOME Ventures",
    body: "Belief, timing, and patronage before the market has language for the value.",
    notes: ["Founder backing", "Patronage structures", "Long-horizon trust"],
  },
  {
    title: "Hospitality as a worldview",
    label: "HOME Hospitality",
    body: "The philosophy made tangible through rooms, dinners, and atmosphere-led experiences.",
    notes: ["Gatherings", "Concept design", "Atmosphere-led experiences"],
  },
  {
    title: "Fellowship and belonging",
    label: "HOME Fellowship",
    body: "Aligned founders, patrons, and builders gathered into formats where relationship matures.",
    notes: ["Salons", "Private events", "Membership rhythms"],
  },
  {
    title: "Operational lift for builders",
    label: "HOME Engine",
    body: "Strategy and incubation support that translate resonance into practical momentum.",
    notes: ["Founder support", "Creative strategy", "Incubation"],
  },
  {
    title: "Spaces that hold the field",
    label: "HOME Base",
    body: "The spatial expression of the ecosystem: future residences, gathering rooms, and living nodes.",
    notes: ["Residencies", "Gathering spaces", "Physical nodes"],
  },
  {
    title: "Story as connective tissue",
    label: "Media / Distribution",
    body: "Profiles, features, and amplification create the first layer of trust and entry.",
    notes: ["Editorial", "Distribution", "Amplification"],
  },
];

const flywheelSteps = ["Story", "Trust", "Relationship", "Collaboration", "Opportunity", "Belonging", "Expansion"];

const layerGroups = [
  {
    title: "Active now",
    tone: "now",
    description: "The parts of HOME already creating signal, relationship, and momentum.",
    items: [
      "Editorial signal and public philosophy",
      "Founder and worldbuilder amplification",
      "Introductions and early collaborations",
      "Welcome surfaces that turn resonance into conversation",
    ],
  },
  {
    title: "Emerging next",
    tone: "next",
    description: "The layers moving from concept to embodiment as the ecosystem deepens.",
    items: [
      "Recurring fellowship formats and private gatherings",
      "Hospitality concepts and experience-led programming",
      "Founder engine and incubation support",
      "HOME Base spaces and place-based nodes",
    ],
  },
];

const entryWays = [
  {
    title: "Be Featured",
    body: "For founders, hosts, patrons, and builders whose work carries a clear atmosphere and deserves studied amplification.",
    href: "/featured",
    cta: "Enter through Featured",
  },
  {
    title: "Work With HOME",
    body: "For aligned collaborators seeking strategy, editorial development, programming, or ecosystem-building partnership.",
    href: "/welcome",
    cta: "Begin the conversation",
  },
  {
    title: "Partner With HOME",
    body: "For institutions, brands, and family offices that understand relationship, hospitality, and long-horizon trust as real infrastructure.",
    href: "/welcome",
    cta: "Explore partnership",
  },
  {
    title: "Receive the Signal",
    body: "For those who want to stay close to the world as it forms through stories, invitations, and future correspondence.",
    href: "/stories",
    cta: "Stay near the field",
  },
];

export default function EcosystemPage() {
  return (
    <main className={`page-main ${styles.page}`}>
      <div className="container">
        <div className={styles.shell}>
          <section className={styles.intro}>
            <div className={styles.introCopyWrap}>
              <p className={styles.eyebrow}>Architectural map</p>
              <h1 className={styles.title}>Ecosystem</h1>
              <p className={styles.introCopy}>The living architecture of HOME, seen as a field rather than a feed.</p>
            </div>

            <div className={styles.thresholdPanel}>
              <div className={styles.thresholdOrbit} aria-hidden="true">
                <span className={styles.thresholdRingOuter} />
                <span className={styles.thresholdRingInner} />
                <span className={styles.thresholdPulse} />
              </div>

              <div className={styles.thresholdPanelBody}>
                <p className={styles.thresholdLabel}>Field notes</p>
                <div className={styles.thresholdSignals}>
                  {thresholdSignals.map((signal) => (
                    <span key={signal}>{signal}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className={styles.mapSection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Central map</p>
                <h2>HOME at the center. Distinct branches around it. One field.</h2>
              </div>
              <p>A cleaner view of how signal, spaces, capital, and belonging reinforce one another.</p>
            </div>

            <div className={styles.cosmos}>
              <div className={styles.orbitField} aria-hidden="true">
                <span className={styles.ringOuter} />
                <span className={styles.ringMiddle} />
                <span className={styles.ringInner} />
                <span className={styles.gridGlow} />
              </div>

              <article className={`${styles.mapNode} ${styles.mapNodeVentures}`}>
                <p className={styles.mapNodeKind}>Capital</p>
                <h3>HOME Ventures</h3>
                <p>Long-horizon capital and patronage for founders with cultural consequence.</p>
              </article>

              <article className={`${styles.mapNode} ${styles.mapNodeHospitality}`}>
                <p className={styles.mapNodeKind}>Atmosphere</p>
                <h3>HOME Hospitality</h3>
                <p>Tables, spaces, and hospitality concepts that turn philosophy into lived welcome.</p>
              </article>

              <article className={`${styles.mapNode} ${styles.mapNodeFellowship}`}>
                <p className={styles.mapNodeKind}>Gathering</p>
                <h3>HOME Fellowship</h3>
                <p>Salons and private gatherings where trust compounds in person.</p>
              </article>

              <div className={styles.core}>
                <p className={styles.coreLabel}>Center</p>
                <h3>HOME</h3>
                <p>A family-level operating system built on love, hospitality, stewardship, and belonging.</p>
              </div>

              <article className={`${styles.mapNode} ${styles.mapNodeEngine}`}>
                <p className={styles.mapNodeKind}>Support</p>
                <h3>HOME Engine</h3>
                <p>Founder support and operating lift that turns signal into traction.</p>
              </article>

              <article className={`${styles.mapNode} ${styles.mapNodeBase}`}>
                <p className={styles.mapNodeKind}>Space</p>
                <h3>HOME Base</h3>
                <p>Physical houses and future spaces where the ecosystem can convene and deepen.</p>
              </article>

              <article className={`${styles.mapNode} ${styles.mapNodeRelationship}`}>
                <p className={styles.mapNodeKind}>Infrastructure</p>
                <h3>Relationship Layer</h3>
                <p>Introductions, curation, trust, and relational memory across the whole field.</p>
              </article>

              <article className={`${styles.mapNode} ${styles.mapNodeMedia}`}>
                <p className={styles.mapNodeKind}>Signal</p>
                <h3>Media / Distribution</h3>
                <p>Editorial and amplification surfaces that circulate the right stories with care.</p>
              </article>
            </div>
          </section>

          <section className={styles.pillarsSection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Major branches</p>
                <h2>Each branch holds a different form of warmth, leverage, and continuity.</h2>
              </div>
              <p>Each layer stands alone, but becomes stronger inside the shared field.</p>
            </div>

            <div className={styles.pillarsGrid}>
              {pillars.map((pillar) => (
                <article key={pillar.label} className={styles.pillarCard}>
                  <p className={styles.pillarLabel}>{pillar.label}</p>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                  <div className={styles.pillarNotes}>
                    {pillar.notes.map((note) => (
                      <span key={note}>{note}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.flywheelSection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>How it compounds</p>
                <h2>HOME compounds through deepened relationship, not widened extraction.</h2>
              </div>
              <p>A simple flywheel for how the field expands.</p>
            </div>

            <div className={styles.flywheel}>
              {flywheelSteps.map((step, index) => (
                <div key={step} className={styles.flywheelStep}>
                  <span>{`0${index + 1}`}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.layersSection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Current and emerging</p>
                <h2>The world is active now, while new layers prepare to come into form.</h2>
              </div>
              <p>What is already live, and what is coherently coming next.</p>
            </div>

            <div className={styles.layerGrid}>
              {layerGroups.map((group) => (
                <article
                  key={group.title}
                  className={`${styles.layerCard} ${group.tone === "next" ? styles.layerCardNext : styles.layerCardNow}`}
                >
                  <p className={styles.layerLabel}>{group.title}</p>
                  <p className={styles.layerDescription}>{group.description}</p>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.entrySection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Ways to enter</p>
                <h2>There are multiple points of entry into the field, depending on who you are and what you are carrying.</h2>
              </div>
              <p>Not one door, but several clear paths inward.</p>
            </div>

            <div className={styles.entryGrid}>
              {entryWays.map((entry) => (
                <article key={entry.title} className={styles.entryCard}>
                  <h3>{entry.title}</h3>
                  <p>{entry.body}</p>
                  <Link href={entry.href}>{entry.cta}</Link>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
