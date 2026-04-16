import { AnimatePresence, motion } from "motion/react";
import { type RefObject, useEffect, useRef, useState } from "react";

/* ── Background Slideshow Images ── */
const SLIDESHOW_IMAGES = [
  "/assets/images/tyson-herrman-snc-m8kfqkk-unsplash-019d7b60-6b34-7053-a0c3-37eec659c405.jpg",
  "/assets/images/andrew-neel-cckf4tshauw-unsplash-019d7b60-91c4-7549-a0f8-c2896ffa7ab1.jpg",
  "/assets/images/carl-heyerdahl-ke0nc8-58mq-unsplash-019d7b60-9433-7475-91b3-42a4233f5707.jpg",
  "/assets/images/fia-yang-ajxrh39kntc-unsplash-019d7b60-97ff-7485-99a8-6b9bb4e7720a.jpg",
  "/assets/images/brian-patrick-tagalog-_8hgfbxwd0a-unsplash-019d7b61-0ae7-756f-aa0a-d1b428e756cb.jpg",
];

/* ── Typing Effect Hook ── */
const TYPING_LINES = [
  "brands that sell.",
  "ads that convert.",
  "logos that last.",
];
const TYPE_SPEED = 80; // ms per character — typing
const ERASE_SPEED = 40; // ms per character — erasing (faster = snappier)
const HOLD_PAUSE = 900; // ms to hold the completed word before erasing
const LINE_PAUSE = 200; // ms gap between erase-end and next word start

function useTypingEffect() {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let active = true;

    async function wait(ms: number) {
      await new Promise<void>((res) => setTimeout(res, ms));
    }

    async function run() {
      let li = 0;
      while (active) {
        const target = TYPING_LINES[li] ?? "";

        // Type forward
        for (let ci = 1; ci <= target.length; ci++) {
          if (!active) return;
          setDisplayed(target.slice(0, ci));
          await wait(TYPE_SPEED);
        }

        // Hold at full word
        await wait(HOLD_PAUSE);
        if (!active) return;

        // Erase backward
        for (let ci = target.length - 1; ci >= 0; ci--) {
          if (!active) return;
          setDisplayed(target.slice(0, ci));
          await wait(ERASE_SPEED);
        }

        // Brief pause before next word
        await wait(LINE_PAUSE);
        if (!active) return;

        // Advance to next word
        li = (li + 1) % TYPING_LINES.length;
      }
    }

    void run();
    return () => {
      active = false;
    };
  }, []);

  return displayed;
}

const INSTAGRAM_URL =
  "https://www.instagram.com/_shuvamcreates?igsh=aGQwbTAyZXd3dnR4";
const WHATSAPP_URL = "https://wa.me/919692504800";
const WORK_URL = "https://photography-studio-1dd.caffeine.xyz";

/* ── Pricing Plans ── */
type PricingTab = "starter" | "plus" | "premium" | "addons";

const PRICING_TABS: { id: PricingTab; label: string; emoji: string }[] = [
  { id: "starter", label: "Starter", emoji: "🟢" },
  { id: "plus", label: "Plus", emoji: "🔵" },
  { id: "premium", label: "Premium", emoji: "🟣" },
  { id: "addons", label: "Add-ons", emoji: "🎯" },
];

interface Plan {
  badge: string;
  included: string[];
  excluded: string[];
  price: string;
  waLink: string;
}

const PLANS: Record<Exclude<PricingTab, "addons">, Plan> = {
  starter: {
    badge: "Best for: Beginners / Personal Use",
    included: [
      "Basic Website Design",
      "Simple & Clean Layout",
      "Mobile Responsive",
      "Hosting Included",
      "Subdomain (example: yourname.mywebsite.com)",
    ],
    excluded: ["No Custom Domain", "No Maintenance"],
    price: "₹1,999/-",
    waLink:
      "https://wa.me/919692504800?text=Hi%2C%20I%27m%20interested%20in%20the%20Starter%20Plan%20(Basic)%20for%20my%20website.%20Please%20share%20more%20details!",
  },
  plus: {
    badge: "Best for: Small Businesses / Growing Brands",
    included: [
      "Professional Website Design",
      "Better UI/UX (Not Basic)",
      "Static Website (Fast & Smooth)",
      "Mobile Responsive",
      "Custom Domain Included (yourname.com)",
      "Hosting Included",
      "1 Year Free Maintenance",
    ],
    excluded: [],
    price: "₹6,999/-",
    waLink:
      "https://wa.me/919692504800?text=Hi%2C%20I%27m%20interested%20in%20the%20Plus%20Plan%20(Standard)%20for%20my%20website.%20Please%20share%20more%20details!",
  },
  premium: {
    badge: "Best for: Brands / Businesses who want top quality",
    included: [
      "Premium High-End Design",
      "Fully Professional Look & Feel",
      "Mobile + Performance Optimized",
      "Custom Domain Included",
      "High-Speed Hosting",
      "Lifetime Maintenance",
      "Priority Support",
    ],
    excluded: [],
    price: "₹9,999/-",
    waLink:
      "https://wa.me/919692504800?text=Hi%2C%20I%27m%20interested%20in%20the%20Premium%20Plan%20(Advanced)%20for%20my%20website.%20Please%20share%20more%20details!",
  },
};

interface Addon {
  icon: string;
  name: string;
  desc: string;
}

const ADDONS: Addon[] = [
  {
    icon: "🔍",
    name: "SEO Optimization",
    desc: "Rank higher on Google with targeted keyword setup, meta tags, and performance tuning.",
  },
  {
    icon: "💬",
    name: "Contact Forms / WhatsApp Integration",
    desc: "Let visitors reach you instantly via embedded contact forms or a direct WhatsApp chat button.",
  },
  {
    icon: "🛠️",
    name: "Admin Panel",
    desc: "Manage your website content easily without touching any code — built to your needs.",
  },
  {
    icon: "🛒",
    name: "E-commerce Features",
    desc: "Sell products or services online with a fully functional store, cart, and checkout.",
  },
];

/* ── Floating Particles ── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

function useParticleCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PARTICLE_COUNT = 90;
    const CONNECTION_DIST = 120;
    const SPEED_MIN = 0.3;
    const SPEED_MAX = 0.8;
    // soft purple/violet matching portfolio accent
    const PARTICLE_COLOR = "rgba(160, 120, 255,";
    const LINE_COLOR = "rgba(180, 140, 255,";

    let particles: Particle[] = [];
    let animId: number;
    let w = 0;
    let h = 0;

    function resize() {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }

    function randBetween(a: number, b: number) {
      return a + Math.random() * (b - a);
    }

    function initParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const speed = randBetween(SPEED_MIN, SPEED_MAX);
        const angle = Math.random() * Math.PI * 2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: randBetween(2, 3),
        };
      });
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      // update positions + bounce
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        }
        if (p.x > w) {
          p.x = w;
          p.vx *= -1;
        }
        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        }
        if (p.y > h) {
          p.y = h;
          p.vy *= -1;
        }
      }

      // draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = `${LINE_COLOR}${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${PARTICLE_COLOR}0.75)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();

    const onResize = () => {
      cancelAnimationFrame(animId);
      resize();
      initParticles();
      draw();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [canvasRef]);
}

/* ── Slideshow Hook ── */
function useSlideshow(count: number, intervalMs = 5000) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        return (c + 1) % count;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [count, intervalMs]);

  return { current, prev };
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PricingTab>("starter");
  const [expandedClient, setExpandedClient] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  const typedWord = useTypingEffect();
  const { current: slideCurrent, prev: slidePrev } = useSlideshow(
    SLIDESHOW_IMAGES.length,
    5000,
  );

  useParticleCanvas(particleCanvasRef);

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
            data-ocid="nav.pricing.link"
            onClick={() => scrollTo("pricing")}
            className="nav-btn nav-btn--pricing"
          >
            Plans &amp; Pricing
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
        {/* Background slideshow — z-index -1, behind canvas */}
        {SLIDESHOW_IMAGES.map((src, i) => (
          <div
            key={src}
            className="hero-slide"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === slideCurrent ? 1 : i === slidePrev ? 0 : 0,
            }}
          />
        ))}
        <canvas ref={particleCanvasRef} className="hero-particles" />
        <div className="hero-overlay" />
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <h1 className="hero-heading">
            <span className="typing-accent">
              {typedWord}
              <span className="typing-cursor typing-cursor--blink" />
            </span>
            <br />
            <span className="typing-static">digital experiences.</span>
          </h1>
          <p className="hero-sub">
            I'm Shuvam Panda — a creative web designer crafting modern, fast and
            premium websites for brands and creators.
          </p>
          <button
            type="button"
            onClick={() => scrollTo("work")}
            className="cta-btn"
            data-ocid="hero.primary_button"
          >
            View My Work
          </button>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="section section--texture section--texture-1"
      >
        <div className="container">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              >
                <span className="service-icon">{s.icon}</span>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS & PRICING */}
      <section
        id="pricing"
        className="section section--texture section--texture-2 pricing-section"
      >
        <div className="container">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Plans &amp; Pricing
          </motion.h2>
          <motion.p
            className="pricing-subtitle"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Choose the plan that fits your goals — and let's build something
            great together.
          </motion.p>

          {/* Tabs */}
          <motion.div
            className="pricing-tabs"
            data-ocid="pricing.tabs"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {PRICING_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`pricing-tab ${activeTab === tab.id ? "pricing-tab--active" : ""}`}
                data-ocid={`pricing.tab.${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="pricing-tab-emoji">{tab.emoji}</span>
                {tab.label}
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="pricing-tab-indicator"
                    className="pricing-tab-indicator"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <div className="pricing-content" data-ocid="pricing.panel">
            <AnimatePresence mode="wait">
              {activeTab !== "addons" ? (
                <motion.div
                  key={activeTab}
                  className={`pricing-card pricing-card--${activeTab}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.38, ease: "easeOut" }}
                  data-ocid={`pricing.${activeTab}.card`}
                >
                  {/* Badge */}
                  <div className={`pricing-badge pricing-badge--${activeTab}`}>
                    {PRICING_TABS.find((t) => t.id === activeTab)?.emoji}{" "}
                    {PLANS[activeTab].badge}
                  </div>

                  {/* Features */}
                  <ul className="pricing-features">
                    {PLANS[activeTab].included.map((feat) => (
                      <li
                        key={feat}
                        className="pricing-feature pricing-feature--included"
                      >
                        <span className="pricing-feature-icon">✅</span>
                        {feat}
                      </li>
                    ))}
                    {PLANS[activeTab].excluded.map((feat) => (
                      <li
                        key={feat}
                        className="pricing-feature pricing-feature--excluded"
                      >
                        <span className="pricing-feature-icon">❌</span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* Price tag */}
                  <div className="pricing-price">{PLANS[activeTab].price}</div>

                  {/* Buy button */}
                  <a
                    href={PLANS[activeTab].waLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`pricing-buy-btn pricing-buy-btn--${activeTab}`}
                    data-ocid={`pricing.${activeTab}.buy_button`}
                  >
                    Get Started
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                      aria-hidden="true"
                      style={{
                        display: "inline",
                        marginLeft: "8px",
                        verticalAlign: "middle",
                      }}
                    >
                      <title>WhatsApp</title>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  key="addons"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.38, ease: "easeOut" }}
                >
                  <div className="pricing-badge pricing-badge--addons">
                    🎯 Extra Add-ons (Optional)
                  </div>
                  <div className="addons-grid">
                    {ADDONS.map((addon, i) => (
                      <motion.div
                        key={addon.name}
                        className="addon-card"
                        data-ocid={`pricing.addon.item.${i + 1}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: i * 0.07,
                          ease: "easeOut",
                        }}
                      >
                        <span className="addon-icon">{addon.icon}</span>
                        <div className="addon-info">
                          <h4 className="addon-name">{addon.name}</h4>
                          <p className="addon-desc">{addon.desc}</p>
                        </div>
                        <a
                          href={`https://wa.me/919692504800?text=Hi%2C%20I%27m%20interested%20in%20adding%20${encodeURIComponent(addon.name)}%20to%20my%20website.%20Please%20share%20more%20details!`}
                          target="_blank"
                          rel="noreferrer"
                          className="addon-btn"
                          data-ocid={`pricing.addon.buy_button.${i + 1}`}
                        >
                          Add This
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* OUR CLIENTS */}
      <section
        id="work"
        className="section section--texture section--texture-2 clients-section"
      >
        <div className="container">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Our Clients
          </motion.h2>
          <motion.p
            className="clients-subtitle"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Real projects. Real results. Delivered with care.
          </motion.p>
          <div className="client-cards-row" data-ocid="work.list">
            {[
              {
                img: "/assets/generated/photography-portfolio-preview.dim_420x260.jpg",
                title: "Photography Portfolio",
                desc: "Premium portfolio website for a professional photographer with modern UI and responsive layout.",
                tag: "Web Design",
                href: WORK_URL,
                ocid: "work.item.1",
              },
              {
                img: "/assets/images/newlife-logo.png",
                imgClass: "client-card-img--logo",
                title: "New Life Home Health Care",
                desc: "Home health care platform connecting patients with trusted healthcare providers.",
                tag: "Web Dev",
                href: "https://newlife-home-health-care-f0x.caffeine.xyz",
                ocid: "work.item.2",
              },
            ].map((project, i) => {
              const isExpanded = expandedClient === i;
              return (
                <motion.div
                  key={project.title}
                  className={`client-card${isExpanded ? " is-expanded" : ""}`}
                  data-ocid={project.ocid}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  onClick={() => setExpandedClient(isExpanded ? null : i)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setExpandedClient(isExpanded ? null : i);
                    }
                  }}
                >
                  {/* Thumbnail */}
                  <div className="client-card-thumb">
                    {project.img ? (
                      <img
                        src={project.img}
                        alt={project.title}
                        className={`client-card-img${"imgClass" in project && project.imgClass ? ` ${project.imgClass}` : ""}`}
                      />
                    ) : (
                      <div className="client-card-placeholder">
                        <span className="client-card-placeholder-icon">◈</span>
                      </div>
                    )}
                    <span className="client-card-tag">{project.tag}</span>
                  </div>
                  {/* Always-visible title */}
                  <div className="client-card-header">
                    <h3 className="client-card-title">{project.title}</h3>
                    <span className="client-card-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                  {/* Slide-reveal info */}
                  <div className="client-card-reveal">
                    <p className="client-card-desc">{project.desc}</p>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="client-card-btn"
                      data-ocid={`${project.ocid}.button`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Project
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SKILLS & TOOLS */}
      <section
        className="section section--texture section--texture-3"
        id="skills"
      >
        <div className="container skills-container">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
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
                transition={{
                  duration: 0.35,
                  delay: i * 0.07,
                  ease: "easeOut",
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT ME */}
      <section
        className="section section--texture section--texture-1 about-section"
        id="about"
      >
        <div className="container about-container">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="about-quote"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <em>Be bold or italic, never regular.</em> ✍️ Web design for creators
            who refuse to be quiet. If you have an idea, let's bring it to life.
          </motion.p>
          <motion.p
            className="about-bio"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            📍 Based in Bhubaneswar, Odisha. Part-time human, full-time
            pixel-pusher. 🎨 I don't just design websites; I build digital
            legacies. Let's create something electric ⚡.
          </motion.p>
        </div>
      </section>

      {/* CONTACT */}
      <section
        className="section contact-section"
        id="contact"
        style={{
          backgroundImage: "url('/assets/images/texture-2.jpg')",
        }}
      >
        <div className="container contact-container">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
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
