export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <main className="page-main">
      <div className="container">
        <section className="page-hero">
          <div className="page-hero__inner">
            <div className="eyebrow">Contact</div>
            <h1 className="section-title">Say hello to HOME.</h1>
            <p className="section-copy">
              For partnerships, editorial inquiries, founder submissions, or kind notes, use the form below.
            </p>
          </div>
        </section>

        <section className="contact-card">
          <form className="contact-form">
            <input className="contact-input" type="text" placeholder="Your name" />
            <input className="contact-input" type="email" placeholder="Your email" />
            <input className="contact-input" type="text" placeholder="Subject" />
            <textarea className="contact-textarea" placeholder="Your message" />
            <div className="newsletter-actions">
              <button type="button" className="button-primary">
                Send message
              </button>
              <span className="contact-note">Basic UI for now. You can connect this later to Formspree, Resend, or your preferred backend.</span>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
