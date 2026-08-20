import { type FormEvent, useState } from "react";
import { ADDRESS, EMAIL, ENQUIRY, PHONE, SOCIAL } from "../data/contact";
import {
  FacebookIcon,
  InstagramIcon,
  PinIcon,
} from "../components/icons";

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
} as const;

export function ContactPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main id="main" className="contact-page">
      <header className="contact-hero">
        <p className="lux-kicker">Contact</p>
        <h1>Come closer.</h1>
        <p>
          Trade, press, or a question about the range - call, email, visit, or write.
          We reply with care from Ahmedabad.
        </p>
      </header>

      <section className="contact-shell">
        <aside className="contact-panel">
          <a className="contact-place" href={ADDRESS.maps} target="_blank" rel="noreferrer">
            <span className="contact-place-icon" aria-hidden="true">
              <PinIcon />
            </span>
            <span>
              <em>Visit us</em>
              <strong>{ADDRESS.line}</strong>
              <span>{ADDRESS.city}</span>
            </span>
          </a>

          <ul className="contact-tiles">
            <li>
              <a href={ENQUIRY.href}>
                <em>Enquiry</em>
                <strong>{ENQUIRY.display}</strong>
              </a>
            </li>
            <li>
              <a href={PHONE.href}>
                <em>Phone</em>
                <strong>{PHONE.display}</strong>
              </a>
            </li>
            <li>
              <a href={EMAIL.href}>
                <em>Email</em>
                <strong className="contact-mail">{EMAIL.display}</strong>
              </a>
            </li>
          </ul>

          <ul className="contact-social" aria-label="Social media">
            {SOCIAL.map((item) => {
              const Icon = SOCIAL_ICONS[item.id];
              return (
                <li key={item.id}>
                  <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                    <Icon />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="contact-form-wrap">
          <p className="lux-kicker">Write to us</p>
          <h2>Send a message</h2>
          {sent ? (
            <p className="form-note">Thank you. Your message has been received.</p>
          ) : (
            <form className="contact-form" onSubmit={onSubmit}>
              <label>
                Name
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>
                Email
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                Message
                <textarea name="message" rows={5} required />
              </label>
              <button className="cta cta-lime" type="submit">
                Send message
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
