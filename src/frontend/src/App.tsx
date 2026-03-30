import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const INSTAGRAM_URL =
  "https://www.instagram.com/_shuvamcreates?igsh=aGQwbTAyZXd3dnR4";
const WORK_URL = "https://photography-studio-1dd.caffeine.xyz";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="cta-btn"
            data-ocid="contact.primary_button"
          >
            Hire Me
          </a>
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
    </div>
  );
}
