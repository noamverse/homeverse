export default function NewsletterSignup() {
  return (
    <section className="newsletter-card">
      <div>
        <div className="eyebrow">Newsletter</div>
        <h2 className="section-title">A quieter brief for modern life.</h2>
        <p className="section-copy">
          Receive thoughtful essays, founder profiles, and beautifully edited updates from HOME.
        </p>
      </div>

      <form className="newsletter-form">
        <input className="newsletter-input" type="text" placeholder="Your name" />
        <input className="newsletter-input" type="email" placeholder="Your email" />
        <div className="newsletter-actions">
          <button type="button" className="button-primary">
            Join the newsletter
          </button>
          <span className="newsletter-note">Basic UI for now. Connect this to your email platform later.</span>
        </div>
      </form>
    </section>
  );
}
