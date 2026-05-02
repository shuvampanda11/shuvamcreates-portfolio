import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ── Follow-Effect Section Images — Shuvam's uploaded photos ── */
const FOLLOW_IMAGES: string[] = [
  "/assets/whatsapp_image_2026-05-02_at_11.10.27_am-019de929-5a45-723a-b3f4-5ee366577081.jpeg",
  "/assets/72hrs_in_bangkok-019de929-5b34-7473-b48c-900af1f47d9e.webp",
  "/assets/whatsapp_image_2026-04-24_at_2.31.14_pm-019de929-5f80-70bb-85fb-49dac1409ff5.jpeg",
  "/assets/655173678_18076167986572189_7800662887643349128_n-019de929-5f67-749a-b4bf-2917b1550b36.jpg",
  "/assets/kolkata_diaries_09-02-019de929-5ff9-73d5-9bff-e06ddb1a606c.jpg",
  "/assets/whatsapp_image_2026-04-21_at_1.57.59_pm-019de929-60db-77c8-abef-68d29b29e3f4.jpeg",
];

/* ── Cursor-Follow Hero Section ── */
function FollowEffectSection({
  onScrollToWork,
}: { onScrollToWork: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const [cardVisible, setCardVisible] = useState(false);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const currentImgRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const imgRefsRef = useRef<HTMLImageElement[]>([]);

  const setImgRef = useCallback((el: HTMLImageElement | null, i: number) => {
    if (el) imgRefsRef.current[i] = el;
  }, []);

  const setLetterRef = useCallback((el: HTMLSpanElement | null, i: number) => {
    if (el) lettersRef.current[i] = el;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const THRESHOLD = 60;
    const BLUR_RADIUS = 120;

    function onMouseMove(e: MouseEvent) {
      const x = e.clientX;
      const y = e.clientY;
      const isInteractive = (e.target as HTMLElement).closest(
        "[data-interactive]",
      );

      setCardPos({ x, y });
      setCardVisible(!isInteractive);

      // Letter push + blur effect
      for (const letter of lettersRef.current) {
        if (!letter) continue;
        const rect = letter.getBoundingClientRect();
        const dx = x - (rect.left + rect.width / 2);
        const dy = y - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);
        if (dist < 150) {
          const angle = Math.atan2(dy, dx);
          const push = (150 - dist) / 10;
          letter.style.transform = `translate(${Math.cos(angle) * push}px, ${Math.sin(angle) * push}px)`;
        } else {
          letter.style.transform = "translate(0, 0)";
        }
        // Blur: closest = max blur, farther = 0
        if (dist < BLUR_RADIUS) {
          const blurAmt = ((BLUR_RADIUS - dist) / BLUR_RADIUS) * 6;
          letter.style.filter = `blur(${blurAmt.toFixed(1)}px)`;
        } else {
          letter.style.filter = "blur(0px)";
        }
      }

      // Image swap on movement
      const movement = Math.hypot(
        x - lastPosRef.current.x,
        y - lastPosRef.current.y,
      );
      if (movement > THRESHOLD) {
        const imgs = imgRefsRef.current;
        if (imgs[currentImgRef.current]) {
          imgs[currentImgRef.current].classList.remove("fcard-img--active");
        }
        currentImgRef.current =
          (currentImgRef.current + 1) % FOLLOW_IMAGES.length;
        if (imgs[currentImgRef.current]) {
          imgs[currentImgRef.current].classList.add("fcard-img--active");
        }
        lastPosRef.current = { x, y };
      }
    }

    function onMouseLeave() {
      setCardVisible(false);
      for (const l of lettersRef.current) {
        if (l) {
          l.style.transform = "translate(0, 0)";
          l.style.filter = "blur(0px)";
        }
      }
    }

    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);
    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const heroLetters = "WEB DESIGNER"
    .split("")
    .map((char, _i) => (char === " " ? "\u00A0" : char));

  return (
    <div ref={sectionRef} className="fcard-section" style={{ cursor: "none" }}>
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.52)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Fixed header for this section */}
      <div className="fcard-header">
        <div className="fcard-header-left">© 2026</div>
        <div className="fcard-header-right">
          <strong>@shuvamcreates</strong>
        </div>
      </div>

      {/* Centered Hero Text */}
      <div className="fcard-hero-text">
        <div className="fcard-tagline">@ shuvamcreates</div>
        <h2 className="fcard-heading">
          {heroLetters.map((char, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: static character array — positions never reorder
              key={i}
              ref={(el) => setLetterRef(el, i)}
              className="fcard-letter"
            >
              {char}
            </span>
          ))}
        </h2>
        <div className="fcard-bio-row">
          <p className="fcard-bio-text">
            Specializing in web design, digital experiences &amp; brand
            identities that define the modern aesthetic.
          </p>
          <div className="fcard-bio-btns">
            <button
              type="button"
              data-interactive="true"
              className="fcard-btn fcard-btn--outline"
              onClick={onScrollToWork}
              data-ocid="follow.view_projects_button"
            >
              View Projects
            </button>
            <button
              type="button"
              data-interactive="true"
              className="fcard-btn fcard-btn--solid"
              onClick={() =>
                window.open("https://wa.me/919692504800", "_blank")
              }
              data-ocid="follow.contact_button"
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Floating cursor-follow card */}
      <div
        ref={cardRef}
        className="fcard-card"
        style={{
          left: cardPos.x,
          top: cardPos.y,
          opacity: cardVisible ? 1 : 0,
        }}
        aria-hidden="true"
      >
        {FOLLOW_IMAGES.map((src, i) => (
          <img
            key={src}
            ref={(el) => setImgRef(el, i)}
            src={src}
            alt=""
            className={`fcard-img${i === 0 ? " fcard-img--active" : ""}`}
          />
        ))}
      </div>

      {/* Footer labels */}
      <div className="fcard-footer">
        <div>Selected Works</div>
        <div>Scroll to explore</div>
      </div>
    </div>
  );
}

/* ── Scroll Reveal Hook ── */
function useScrollReveal() {
  const observed = useRef(new WeakSet<HTMLElement>());
  const observe = useCallback((el: HTMLElement | null) => {
    if (!el || observed.current.has(el)) return;
    observed.current.add(el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
  }, []);
  return observe;
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

/* ── Google Reviews Data ── */
const GOOGLE_REVIEWS = [
  {
    name: "Priyanka Priyadarshini",
    rating: 5,
    text: "Absolutely loved the work! The designer was patient, creative, and responsive throughout the process.",
  },
  {
    name: "Nurulla Chowdhury",
    rating: 4.5,
    text: "Great experience working together!",
  },
  {
    name: "Dipayan Dutta",
    rating: 5,
    text: "Excellent work and very professional.",
  },
  {
    name: "Mitarani Panda",
    rating: 4.7,
    text: "Good service nd best design",
  },
  {
    name: "Subhashree Panda",
    rating: 5,
    text: "Excellent website designs!!!!",
  },
  {
    name: "biswajit mohapatra",
    rating: 4.8,
    text: "A passionate web designer with a knack for creating clean, modern, and effective web experiences. Highly recommended if you're looking for quality design work.",
  },
  {
    name: "Malay Sarkar",
    rating: 4.5,
    text: "Highly satisfied with the results!",
  },
];

/* ── Render star rating (supports half stars) ── */
function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.3 && rating % 1 < 0.8;
  const nearFull = rating % 1 >= 0.8;
  const actualFull = nearFull ? full + 1 : full;
  const stars =
    "★".repeat(actualFull) +
    (half ? "½" : "") +
    "☆".repeat(5 - actualFull - (half ? 1 : 0));
  return stars;
}

export default function App() {
  const reveal = useScrollReveal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PricingTab>("starter");
  const [visitCount, setVisitCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const reviewsRef = useRef<HTMLDivElement | null>(null);
  const countAnimRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Flicker effect refs
  const interfaceRef = useRef<HTMLSpanElement | null>(null);
  const architectRef = useRef<HTMLSpanElement | null>(null);
  const iaWrapRef = useRef<HTMLDivElement | null>(null);

  // Bar-light flicker: Interface flickers first, Architect after 1.4s delay
  useEffect(() => {
    const wrapper = iaWrapRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const iEl = interfaceRef.current;
          const aEl = architectRef.current;
          if (entry.isIntersecting) {
            // Remove first so re-entering replays animation
            if (iEl) {
              iEl.classList.remove("flicker-interface");
              // Force reflow to reset animation
              void (iEl as HTMLElement).offsetWidth;
              iEl.classList.add("flicker-interface");
            }
            if (aEl) {
              aEl.classList.remove("flicker-architect");
              void (aEl as HTMLElement).offsetWidth;
              aEl.classList.add("flicker-architect");
            }
          } else {
            // Cleanup so animation replays on next scroll in
            if (iEl) iEl.classList.remove("flicker-interface");
            if (aEl) aEl.classList.remove("flicker-architect");
          }
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Backend actor for page views
  const { actor } = useActor(createActor);

  // Record page view via backend on mount
  useEffect(() => {
    if (!actor) return;
    actor
      .recordPageView()
      .then((count) => {
        setVisitCount(Number(count));
      })
      .catch(() => {
        // fallback: keep count at 0
      });
  }, [actor]);

  // Count-up animation when reviews section enters viewport
  useEffect(() => {
    const el = reviewsRef.current;
    if (!el || visitCount === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            let start = 0;
            const target = visitCount;
            const duration = 1400;
            const step = Math.ceil(target / (duration / 16));
            if (countAnimRef.current) clearInterval(countAnimRef.current);
            countAnimRef.current = setInterval(() => {
              start += step;
              if (start >= target) {
                setDisplayCount(target);
                if (countAnimRef.current) clearInterval(countAnimRef.current);
              } else {
                setDisplayCount(start);
              }
            }, 16);
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visitCount]);

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
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="nav-btn"
          >
            Home
          </button>
          <button
            type="button"
            data-ocid="nav.profile.link"
            onClick={() => scrollTo("profile")}
            className="nav-btn"
          >
            Profile
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

      {/* CURSOR-FOLLOW HERO — first section, video background */}
      <FollowEffectSection onScrollToWork={() => scrollTo("work")} />

      {/* INTERFACE / ARCHITECT TYPOGRAPHY SECTION */}
      <section className="min-h-[90vh] flex flex-col justify-end px-6 md:px-12 pt-32 pb-24 border-b border-gray-800 interface-architect-section">
        <div className="max-w-[1920px] mx-auto w-full">
          {/* Giant heading — flicker wrapper observed by IntersectionObserver */}
          <div className="reveal" ref={reveal}>
            <div ref={iaWrapRef}>
              <h2
                className="text-[13vw] leading-[0.8] font-bold tracking-tighter uppercase mb-12"
                style={{ fontFamily: "inherit" }}
              >
                <span ref={interfaceRef} style={{ color: "#F5F5F0" }}>
                  Interface
                </span>
                <br />
                <span ref={architectRef} className="text-gray-400">
                  Architect
                </span>
              </h2>
            </div>
          </div>

          {/* Description */}
          <div className="reveal" ref={reveal}>
            <p
              className="text-sm md:text-lg font-medium leading-relaxed max-w-xl"
              style={{ color: "#ffffff" }}
            >
              Freelance designer &amp; developer crafting digital experiences
              with a focus on immersive motion and typography.
            </p>
          </div>
        </div>
      </section>

      {/* PROFILE */}
      <section id="profile" className="profile-section">
        <div className="profile-inner">
          {/* LEFT COLUMN — tall portrait card */}
          <div className="profile-left">
            <div
              className="profile-portrait-frame reveal"
              ref={reveal}
              data-ocid="profile.avatar"
            >
              <img
                src="/assets/images/shuvam-profile-new.png"
                alt="Shuvam Panda — Creative Designer"
                className="profile-portrait-img"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="profile-right">
            {/* Location */}
            <div
              className="profile-location reveal"
              ref={reveal}
              data-ocid="profile.location"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="13"
                height="13"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Bhubaneswar, India
            </div>

            {/* Name */}
            <h1
              className="profile-name reveal"
              ref={reveal}
              style={{ transitionDelay: "0.1s" }}
            >
              <span className="profile-name-line">Shuvam</span>
              <span className="profile-name-line profile-name-line--accent">
                Panda
              </span>
            </h1>

            {/* Accent divider */}
            <div className="profile-divider" aria-hidden="true">
              <span className="profile-divider-line" />
              <span className="profile-divider-dot" />
              <span className="profile-divider-dot" />
              <span className="profile-divider-dot profile-divider-dot--bright" />
            </div>

            {/* About Me */}
            <div
              className="profile-block profile-glass-card reveal"
              ref={reveal}
              style={{ transitionDelay: "0.2s" }}
              data-ocid="profile.about"
            >
              <div className="profile-label">
                <span className="profile-label-dot" />
                About Me
              </div>
              <p className="profile-about-text">
                I'm Shuvam Panda — a creative designer and visual storyteller
                based in Bhubaneswar, India. I specialize in branding, visual
                identity, and motion graphics, crafting compelling visuals that
                sell, convert, and leave a lasting impression. Available for
                freelance projects — let's build something amazing together.
              </p>
            </div>

            {/* Skills */}
            <div
              className="profile-block reveal"
              ref={reveal}
              style={{ transitionDelay: "0.3s" }}
              data-ocid="profile.skills"
            >
              <div className="profile-label">
                <span className="profile-label-dot" />
                Skills
              </div>
              <div className="profile-skills-row">
                {[
                  {
                    badge: "Ps",
                    color: "#31a8ff",
                    bg: "rgba(49,168,255,0.13)",
                    name: "Photoshop",
                    glow: "rgba(49,168,255,0.28)",
                  },
                  {
                    badge: "Ai",
                    color: "#ff9a00",
                    bg: "rgba(255,154,0,0.13)",
                    name: "Illustrator",
                    glow: "rgba(255,154,0,0.28)",
                  },
                  {
                    badge: "Fg",
                    color: "#a259ff",
                    bg: "rgba(162,89,255,0.13)",
                    name: "Figma",
                    glow: "rgba(162,89,255,0.28)",
                  },
                  {
                    badge: "Pr",
                    color: "#9999ff",
                    bg: "rgba(153,153,255,0.13)",
                    name: "Premiere Pro",
                    glow: "rgba(153,153,255,0.28)",
                  },
                  {
                    badge: "Ae",
                    color: "#9d8cff",
                    bg: "rgba(80,60,180,0.15)",
                    name: "After Effects",
                    glow: "rgba(100,80,200,0.3)",
                  },
                ].map((tool, i) => (
                  <div
                    key={tool.name}
                    className="profile-skill-pill"
                    data-ocid={`profile.skill.${i + 1}`}
                    style={
                      {
                        "--pill-color": tool.color,
                        "--pill-bg": tool.bg,
                        "--pill-glow": tool.glow,
                      } as React.CSSProperties
                    }
                  >
                    <span className="profile-skill-badge">{tool.badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div
              className="profile-socials reveal"
              ref={reveal}
              style={{ transitionDelay: "0.4s" }}
              data-ocid="profile.socials"
            >
              {[
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com",
                  color: "#0a66c2",
                  hoverBg: "rgba(10,102,194,0.18)",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <title>LinkedIn</title>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  label: "Email",
                  href: "mailto:shuvampanda@gmail.com",
                  color: "#c4b5fd",
                  hoverBg: "rgba(196,181,253,0.12)",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <title>Email</title>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                },
                {
                  label: "WhatsApp",
                  href: "https://wa.me/919692504800",
                  color: "#25d366",
                  hoverBg: "rgba(37,211,102,0.14)",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <title>WhatsApp</title>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  href: "https://instagram.com/shuvamcreates",
                  color: "#f77737",
                  hoverBg: "rgba(225,48,108,0.13)",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <title>Instagram</title>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                },
                {
                  label: "TikTok",
                  href: "https://tiktok.com/@shuvamcreates",
                  color: "#69c9d0",
                  hoverBg: "rgba(105,201,208,0.12)",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <title>TikTok</title>
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={
                    social.href.startsWith("mailto:") ? "_self" : "_blank"
                  }
                  rel="noreferrer"
                  className="profile-social-icon"
                  aria-label={social.label}
                  data-ocid={`profile.social.${social.label.toLowerCase()}`}
                  style={
                    {
                      "--social-color": social.color,
                      "--social-hover-bg": social.hoverBg,
                    } as React.CSSProperties
                  }
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="section section--texture section--texture-1"
      >
        <div className="container">
          <h2 className="section-heading reveal" ref={reveal}>
            What I Do
          </h2>
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
              <div
                key={s.title}
                className="service-card reveal"
                ref={reveal}
                style={{ transitionDelay: `${i * 0.08}s` }}
                data-ocid={`services.item.${i + 1}`}
              >
                <div className="service-icon-wrap">
                  <span className="service-icon">{s.icon}</span>
                  <span className="service-num">0{i + 1}</span>
                </div>
                <div className="service-content">
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.desc}</p>
                </div>
              </div>
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
          <h2 className="section-heading reveal" ref={reveal}>
            Plans &amp; Pricing
          </h2>
          <p
            className="pricing-subtitle reveal"
            ref={reveal}
            style={{ transitionDelay: "0.1s" }}
          >
            Choose the plan that fits your goals — and let's build something
            great together.
          </p>

          {/* Tabs */}
          <div
            className="pricing-tabs reveal"
            ref={reveal}
            style={{ transitionDelay: "0.2s" }}
            data-ocid="pricing.tabs"
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
          </div>

          {/* Tab Content */}
          <div className="pricing-content" data-ocid="pricing.panel">
            <AnimatePresence mode="wait">
              {activeTab !== "addons" ? (
                <div
                  key={activeTab}
                  className={`pricing-card pricing-card--${activeTab}`}
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
                </div>
              ) : (
                <div key="addons">
                  <div className="pricing-badge pricing-badge--addons">
                    🎯 Extra Add-ons (Optional)
                  </div>
                  <div className="addons-grid">
                    {ADDONS.map((addon, i) => (
                      <div
                        key={addon.name}
                        className="addon-card"
                        data-ocid={`pricing.addon.item.${i + 1}`}
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
                      </div>
                    ))}
                  </div>
                </div>
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
          <h2 className="section-heading reveal" ref={reveal}>
            Our Clients
          </h2>
          <p
            className="clients-subtitle reveal"
            ref={reveal}
            style={{ transitionDelay: "0.1s" }}
          >
            Real projects. Real results. Delivered with care.
          </p>
          <div className="client-cards-row" data-ocid="work.list">
            {[
              {
                img: "/assets/generated/photography-portfolio-preview.dim_420x260.jpg",
                title: "Photography Portfolio",
                tag: "Web Design",
                href: WORK_URL,
                ocid: "work.item.1",
              },
              {
                img: "/assets/images/newlife-logo.png",
                imgClass: "client-card-img--logo",
                title: "New Life Home Health Care",
                tag: "Web Dev",
                href: "https://newlife-home-health-care-f0x.caffeine.xyz",
                ocid: "work.item.2",
              },
              {
                img: null,
                imgClass: "client-card-img--ai-placeholder",
                title: "खुशबू perfume",
                tag: "AI / Web App",
                href: "https://v0-agentic-build-orchestrate-a-lilac.vercel.app/",
                ocid: "work.item.3",
              },
              {
                img: null,
                imgClass: "client-card-img--copper-placeholder",
                title: "Hot Copper Studio",
                tag: "Web Design",
                href: "https://hot-copper-rfv-draft.caffeine.xyz",
                ocid: "work.item.4",
              },
            ].map((project, i) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="client-card reveal"
                ref={reveal}
                style={{ transitionDelay: `${i * 0.1}s` }}
                data-ocid={project.ocid}
              >
                {/* Thumbnail */}
                <div className="client-card-thumb">
                  {project.img ? (
                    <img
                      src={project.img}
                      alt={project.title}
                      className={`client-card-img${project.imgClass ? ` ${project.imgClass}` : ""}`}
                      loading="lazy"
                    />
                  ) : project.imgClass === "client-card-img--ai-placeholder" ? (
                    <div className="client-card-img--ai-placeholder">
                      <span className="ai-placeholder-label">खुशबू perfume</span>
                    </div>
                  ) : project.imgClass ===
                    "client-card-img--copper-placeholder" ? (
                    <div className="client-card-img--copper-placeholder">
                      <span className="copper-placeholder-label">
                        Hot Copper
                      </span>
                    </div>
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
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STATS & REVIEWS */}
      <section
        id="reviews"
        className="section reviews-section"
        ref={reviewsRef}
      >
        <div className="container">
          {/* Heading */}
          <div className="reviews-heading-area reveal" ref={reveal}>
            <span className="reviews-label">RECOGNITION</span>
            <h2 className="reviews-main-heading">What Clients Say</h2>
          </div>

          {/* Stats bar */}
          <div
            className="reviews-stats-row reveal"
            ref={reveal}
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="reviews-stat-card" data-ocid="reviews.visits_stat">
              <div className="reviews-stat-number">
                {displayCount.toLocaleString()}+
              </div>
              <div className="reviews-stat-label">Website VIEWS</div>
            </div>
            <div className="reviews-stat-card" data-ocid="reviews.rating_stat">
              <div className="reviews-stat-number reviews-stat-number--gold">
                4.8 ★
              </div>
              <div className="reviews-stat-label">Google Rating</div>
              <div className="reviews-stat-sublabel">
                Based on client reviews
              </div>
            </div>
          </div>

          {/* Reviews slider */}
          <div
            className="reviews-slider-outer reveal"
            ref={reveal}
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="reviews-slider-track" data-ocid="reviews.slider">
              {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((review, i) => (
                <div
                  key={`${review.name}-${i}`}
                  className="reviews-card"
                  data-ocid={`reviews.item.${(i % GOOGLE_REVIEWS.length) + 1}`}
                >
                  <div className="reviews-stars">
                    {renderStars(review.rating)}
                  </div>
                  <p className="reviews-text">{review.text}</p>
                  <div className="reviews-reviewer">
                    <span className="reviews-reviewer-name">{review.name}</span>
                    <span className="reviews-google-label">Google</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS & TOOLS */}
      <section
        className="section section--texture section--texture-3"
        id="skills"
      >
        <div className="container skills-container">
          <h2 className="section-heading reveal" ref={reveal}>
            Skills &amp; Tools
          </h2>
          <div
            className="skill-list reveal"
            ref={reveal}
            style={{ transitionDelay: "0.15s" }}
          >
            {[
              "HTML",
              "CSS",
              "JavaScript",
              "Responsive Design",
              "UI Design",
              "Figma",
            ].map((skill, i) => (
              <span
                key={skill}
                className="skill-pill"
                data-ocid={`skills.item.${i + 1}`}
              >
                {skill}
              </span>
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
          <h2 className="section-heading reveal" ref={reveal}>
            About Me
          </h2>
          <p
            className="about-quote reveal"
            ref={reveal}
            style={{ transitionDelay: "0.1s" }}
          >
            <em>Be bold or italic, never regular.</em> ✍️ Web design for creators
            who refuse to be quiet. If you have an idea, let's bring it to life.
          </p>
          <p
            className="about-bio reveal"
            ref={reveal}
            style={{ transitionDelay: "0.2s" }}
          >
            📍 Based in Bhubaneswar, Odisha. Part-time human, full-time
            pixel-pusher. 🎨 I don't just design websites; I build digital
            legacies. Let's create something electric ⚡.
          </p>
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
          <h2 className="section-heading reveal" ref={reveal}>
            Let's Work Together
          </h2>
          <p
            className="contact-sub reveal"
            ref={reveal}
            style={{ transitionDelay: "0.1s" }}
          >
            Have a project in mind? Let's build something amazing together.
          </p>
          <div
            className="contact-info reveal"
            ref={reveal}
            style={{ transitionDelay: "0.2s" }}
            data-ocid="contact.panel"
          >
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
        <p>© {new Date().getFullYear()}. Built with ❤️@shuvamcreates.pvt.ltd</p>
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
        <div className="hire-modal-inner">
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
        </div>
      </dialog>
    </div>
  );
}
