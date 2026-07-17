export default function Contact() {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="eyebrow">Contact</div>
        <h1 className="page-title">Get in touch</h1>
        <p className="page-lede">
          For collaboration, data access requests, or questions about the methodology
          used on this platform, reach out via the details below.
        </p>

        <div className="contact-grid">
          <div className="contact-card panel">
            <div className="eyebrow">Email</div>
            <p className="contact-value mono">contact@giap-chilika.org</p>
            <p className="contact-note">Replace with your preferred contact address.</p>
          </div>
          <div className="contact-card panel">
            <div className="eyebrow">Organization</div>
            <p className="contact-value">Wetland &amp; coastal research collaboration</p>
            <p className="contact-note">Institutional affiliation can be added here.</p>
          </div>
          <div className="contact-card panel">
            <div className="eyebrow">Coverage Area</div>
            <p className="contact-value mono">Chilika Lagoon, Odisha, India</p>
            <p className="contact-note">19.5°N–19.9°N · 85.1°E–85.6°E</p>
          </div>
        </div>
      </div>
    </section>
  );
}
