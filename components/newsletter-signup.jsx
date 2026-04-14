export default function NewsletterSignup() {
  return (
    <section className="newsletter-card">
      <div>
        <div className="eyebrow">Journal letter</div>
        <h2 className="section-title">A private note from the house.</h2>
        <p className="section-copy">
          Receive essays, field notes, and thoughtful updates from HOME with warmth, clarity, and restraint.
        </p>
      </div>

      <form className="newsletter-form">
        <input className="newsletter-input" type="text" placeholder="Your name" />
        <input className="newsletter-input" type="email" placeholder="Your email" />
        <div className="newsletter-actions">
          <button type="button" className="button-primary">
            Join the letter
          </button>
          <span className="newsletter-note">Basic UI for now. Connect this to your email platform later.</span>
        </div>
      </form>
    </section>
  );
}
