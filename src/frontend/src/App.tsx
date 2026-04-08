import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const INSTAGRAM_URL =
  "https://www.instagram.com/_shuvamcreates?igsh=aGQwbTAyZXd3dnR4";
const WHATSAPP_URL = "https://wa.me/919692504800";
const WORK_URL = "https://photography-studio-1dd.caffeine.xyz";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="portfolio-root">
      {/* NAVBAR */}
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <h2 className="logo">@shuvamcreates</h2>
        <nav className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
          <button
            type="button"
            data-ocid="nav.home.link"
            onClick={() => scrollTo("hero")}
            className="nav-btn"
          >
            Home
          </button>
          <button
            type="button"
            data-ocid="nav.services.link"
            onClick={() => scrollTo("services")}
            className="nav-btn"
          >
            Services
          </button>
          <button
            type="button"
            data-ocid="nav.work.link"
            onClick={() => scrollTo("work")}
            className="nav-btn"
          >
            Work
          </button>
          <a
            data-ocid="nav.instagram.link"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="nav-btn"
          >
            Instagram
          </a>
        </nav>
        <button
          type="button"
          className="hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* HERO */}
      <section id="hero" className="hero" ref={heroRef}>
        <div className="hero-overlay" />
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <h1 className="hero-heading">
            designing
            <br />
            digital
            <br />
            experiences.
          </h1>
          <p className="hero-sub">
            I'm Shuvam Panda — a creative web designer crafting modern, fast and
            premium websites for brands and creators.
          </p>
          <a
            href={WORK_URL}
            target="_blank"
            rel="noreferrer"
            className="cta-btn"
            data-ocid="hero.primary_button"
          >
            View My Work
          </a>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section section--dark">
        <div className="container">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What I Do
          </motion.h2>
          <div className="service-grid">
            {[
              {
                title: "Website Design",
                desc: "Modern UI/UX focused website designs tailored for brands and creators.",
                icon: "✦",
              },
              {
                title: "Frontend Development",
                desc: "Fast, responsive websites built using clean HTML and CSS.",
                icon: "⬡",
              },
              {
                title: "Portfolio Websites",
                desc: "Premium personal and business portfolios that attract clients.",
                icon: "◈",
              },
              {
                title: "Logo Design",
                desc: "Distinctive, memorable logos that capture your brand identity and make a lasting impression.",
                icon: "◉",
              },
              {
                title: "Video Ads Creation",
                desc: "Compelling short-form video ads crafted to stop the scroll and convert viewers into customers.",
                icon: "▶",
              },
              {
                title: "Product Ads Creation",
                desc: "Eye-catching product advertisements designed to showcase your offerings and drive sales.",
                icon: "◇",
              },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                className="service-card"
                data-ocid={`services.item.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <span className="service-icon">{s.icon}</span>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="section section--dark">
        <div className="container">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Selected Work
          </motion.h2>
          <motion.div
            className="project-card"
            data-ocid="work.item.1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="project-img-wrap">
              <img
                src="/assets/generated/photography-portfolio-preview.dim_420x260.jpg"
                alt="Photography Portfolio Website"
                className="project-img"
              />
            </div>
            <div className="project-info">
              <h3 className="project-title">Photography Portfolio Website</h3>
              <p className="project-desc">
                Designed and developed a premium portfolio website for a
                professional photographer with modern UI and responsive layout.
              </p>
              <a
                href={WORK_URL}
                target="_blank"
                rel="noreferrer"
                className="cta-btn cta-btn--sm"
                data-ocid="work.primary_button"
              >
                View Project
              </a>
            </div>
          </motion.div>
          <motion.div
            className="project-card"
            data-ocid="work.item.2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="project-img-wrap">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, oklch(0.42 0.14 168) 0%, oklch(0.55 0.17 152) 50%, oklch(0.38 0.12 185) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="oklch(0.95 0.05 168)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="Health care waveform icon"
                >
                  <title>Health care waveform icon</title>
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                <span
                  style={{
                    color: "oklch(0.95 0.05 168)",
                    fontSize: "0.8rem",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                    opacity: 0.85,
                  }}
                >
                  HOME HEALTH CARE
                </span>
              </div>
            </div>
            <div className="project-info">
              <h3 className="project-title">New Life Home Health Care</h3>
              <p className="project-desc">
                A home health care platform providing compassionate,
                professional care services — built to connect patients with
                trusted healthcare providers.
              </p>
              <a
                href="https://newlife-home-health-care-f0x.caffeine.xyz"
                target="_blank"
                rel="noreferrer"
                className="cta-btn cta-btn--sm"
                data-ocid="work.item.2.button"
              >
                View Project
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS & TOOLS */}
      <section className="section section--dark" id="skills">
        <div className="container skills-container">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Skills &amp; Tools
          </motion.h2>
          <div className="skill-list">
            {[
              "HTML",
              "CSS",
              "JavaScript",
              "Responsive Design",
              "UI Design",
              "Figma",
            ].map((skill, i) => (
              <motion.span
                key={skill}
                className="skill-pill"
                data-ocid={`skills.item.${i + 1}`}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT ME */}
      <section className="section section--dark about-section" id="about">
        <div className="container about-container">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="about-quote"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <em>Be bold or italic, never regular.</em> ✍️ Web design for creators
            who refuse to be quiet. If you have an idea, let's bring it to life.
          </motion.p>
          <motion.p
            className="about-bio"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            📍 Based in Bhubaneswar, Odisha. Part-time human, full-time
            pixel-pusher. 🎨 I don't just design websites; I build digital
            legacies. Let's create something electric ⚡.
          </motion.p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact-section" id="contact">
        <div className="container contact-container">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Let's Work Together
          </motion.h2>
          <p className="contact-sub">
            Have a project in mind? Let's build something amazing together.
          </p>
          <div className="contact-info" data-ocid="contact.panel">
            <p className="contact-detail">
              <span className="contact-label">Email</span>
              <a href="mailto:shuvam.panda2@gmail.com" className="contact-link">
                shuvam.panda2@gmail.com
              </a>
            </p>
            <p className="contact-detail">
              <span className="contact-label">Phone</span>
              <a href="tel:+919692504800" className="contact-link">
                +91 9692504800
              </a>
            </p>
            <p className="contact-detail">
              <span className="contact-label">WhatsApp</span>
              <a
                href="https://wa.me/919692504800"
                target="_blank"
                rel="noreferrer"
                className="contact-link whatsapp-link"
                data-ocid="contact.whatsapp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                  aria-hidden="true"
                  style={{
                    display: "inline",
                    verticalAlign: "middle",
                    marginRight: "6px",
                  }}
                >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                +91 9692504800
              </a>
            </p>
          </div>
          <button
            type="button"
            className="cta-btn"
            data-ocid="contact.primary_button"
            onClick={() => setHireModalOpen(true)}
          >
            Hire Me
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      {/* HIRE ME MODAL */}
      {hireModalOpen && (
        <HireModal
          onClose={() => setHireModalOpen(false)}
          whatsappUrl={WHATSAPP_URL}
          instagramUrl={INSTAGRAM_URL}
        />
      )}
    </div>
  );
}

/* ── Hire Me modal ── */
interface HireModalProps {
  onClose: () => void;
  whatsappUrl: string;
  instagramUrl: string;
}

function HireModal({ onClose, whatsappUrl, instagramUrl }: HireModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="hire-modal-overlay" data-ocid="hire.modal.overlay">
      {/* backdrop click target */}
      <button
        type="button"
        className="hire-modal-backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <dialog open className="hire-modal" data-ocid="hire.modal">
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="hire-modal-inner"
        >
          <button
            type="button"
            className="hire-modal-close"
            aria-label="Close modal"
            data-ocid="hire.modal.close"
            onClick={onClose}
          >
            ✕
          </button>
          <h3 className="hire-modal-title">Get In Touch</h3>
          <p className="hire-modal-sub">Choose how you'd like to reach me</p>
          <div className="hire-modal-options">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hire-option hire-option--whatsapp"
              data-ocid="hire.modal.whatsapp"
              onClick={onClose}
            >
              <span className="hire-option-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </span>
              <span className="hire-option-label">WhatsApp</span>
              <span className="hire-option-sub">Chat with me directly</span>
            </a>

            {/* Instagram */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hire-option hire-option--instagram"
              data-ocid="hire.modal.instagram"
              onClick={onClose}
            >
              <span className="hire-option-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <title>Instagram</title>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </span>
              <span className="hire-option-label">Instagram</span>
              <span className="hire-option-sub">DM me on Instagram</span>
            </a>
          </div>
        </motion.div>
      </dialog>
    </div>
  );
}
