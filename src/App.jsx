import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import "./App.css";

const NAV_LINKS = ["Home", "About", "Programs", "Contact"];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar__logo" onClick={() => scrollTo("home")}>
        <span className="logo-hope">HOPE</span>
        <span className="logo-fitness">FITNESS</span>
      </div>
      <ul className="navbar__links">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <button className="nav-btn" onClick={() => scrollTo(link)}>{link}</button>
          </li>
        ))}
      </ul>
      <button className="navbar__cta" onClick={() => scrollTo("contact")}>Join Now</button>
      <button className="navbar__hamburger" onClick={() => setMenuOpen((v) => !v)}>
        <span className={menuOpen ? "bar bar--open" : "bar"} />
        <span className={menuOpen ? "bar bar--open bar2" : "bar bar2"} />
        <span className={menuOpen ? "bar bar--open bar3" : "bar bar3"} />
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.25 }}>
            {NAV_LINKS.map((link) => (
              <button key={link} className="mobile-link" onClick={() => scrollTo(link)}>{link}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  return (
    <section id="home" className="hero">
      <motion.div className="hero__bg" style={{ y }} />
      <div className="hero__overlay" />
      <div className="hero__content">
        <motion.p className="hero__tagline" initial={{ opacity: 0, letterSpacing: "0.3em" }} animate={{ opacity: 1, letterSpacing: "0.5em" }} transition={{ duration: 1, delay: 0.2 }}>WELCOME TO</motion.p>
        <motion.h1 className="hero__title" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
          HOPE<br /><span className="hero__title--outline">FITNESS</span>
        </motion.h1>
        <motion.p className="hero__motto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
          "Forge Your Strength. Find Your Hope."
        </motion.p>
        <motion.div className="hero__actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }}>
          <button className="btn btn--primary" onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })}>Explore Programs</button>
          <button className="btn btn--ghost" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>Our Story</button>
        </motion.div>
      </div>
      <motion.div className="hero__scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        <span className="scroll-line" /><span>SCROLL</span>
      </motion.div>
    </section>
  );
}

const STATS = [
  { value: "500+", label: "Active Members" },
  { value: "15+", label: "Expert Trainers" },
  { value: "8", label: "Years of Excellence" },
  { value: "30+", label: "Programs" },
];

function Stats() {
  return (
    <section className="stats-bar">
      {STATS.map((s, i) => (
        <motion.div key={s.label} className="stat-item" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </motion.div>
      ))}
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about section">
      <div className="container about__grid">
        <motion.div className="about__image-wrap" initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="about__img-card about__img-card--1">
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80" alt="Gym floor" />
          </div>
          <div className="about__img-card about__img-card--2">
            <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" alt="Training" />
          </div>
          <div className="about__badge"><span className="badge-num">8</span><span className="badge-txt">Years<br />of Hope</span></div>
        </motion.div>
        <motion.div className="about__text" initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
          <p className="section__eyebrow">About Us</p>
          <h2 className="section__title">We Don't Just Build<br /><span className="text-accent">Bodies — We Build Lives</span></h2>
          <p className="about__desc">Hope Fitness was born in 2016 with a single mission: to be the gym that never gives up on you. Whether you're stepping in for the first time or you're a seasoned athlete, we meet you where you are and push you to where you want to be.</p>
          <p className="about__desc">Our state-of-the-art facility spans 12,000 sq ft of training space, equipped with the latest gear and staffed by certified professionals who genuinely care about your transformation.</p>
          <ul className="about__pillars">
            {["World-class Equipment", "Certified Expert Trainers", "Community-driven Culture", "24/7 Access"].map((item) => (
              <li key={item}><span className="pillar-dot" />{item}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

const PROGRAMS = [
  { icon: "🔥", title: "HIIT Training", desc: "High-intensity interval training designed to torch calories and boost metabolism in under an hour.", color: "#ff5722" },
  { icon: "💪", title: "Strength & Power", desc: "Build raw strength with structured powerlifting and bodybuilding programs under expert guidance.", color: "#e91e63" },
  { icon: "🧘", title: "Yoga & Flexibility", desc: "Restore balance, improve mobility, and sharpen your mind through holistic yoga sessions.", color: "#9c27b0" },
  { icon: "🥊", title: "Boxing & Combat", desc: "Unleash your aggression productively. Real boxing technique meets cardio conditioning.", color: "#ff9800" },
  { icon: "🏃", title: "Cardio Core", desc: "Strengthen your cardiovascular system and sculpt a rock-solid core with dedicated cardio classes.", color: "#00bcd4" },
  { icon: "🍎", title: "Nutrition Coaching", desc: "Personalized diet plans and nutrition guidance to maximize your training results.", color: "#4caf50" },
];

function Programs() {
  return (
    <section id="programs" className="programs section">
      <div className="container">
        <motion.div className="section__header" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="section__eyebrow">What We Offer</p>
          <h2 className="section__title">Programs Built for <span className="text-accent">Every Goal</span></h2>
          <p className="section__sub">From fat loss to peak performance — we have a program crafted just for you.</p>
        </motion.div>
        <div className="programs__grid">
          {PROGRAMS.map((prog, i) => (
            <motion.div key={prog.title} className="program-card" style={{ "--card-accent": prog.color }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ y: -8, transition: { duration: 0.25 } }}>
              <div className="program-card__icon">{prog.icon}</div>
              <h3 className="program-card__title">{prog.title}</h3>
              <p className="program-card__desc">{prog.desc}</p>
              <div className="program-card__bar" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Motto() {
  return (
    <section className="motto-section">
      <div className="motto-bg" />
      <motion.div className="motto-content" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
        <p className="motto-label">Our Motto</p>
        <h2 className="motto-text">"Every Rep is a Step.<br />Every Step is <em>Hope.</em>"</h2>
        <p className="motto-sub">We believe fitness is not just a destination — it's a daily commitment to becoming better. At Hope Fitness, your journey never stops, and neither does our support.</p>
      </motion.div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); if (form.name && form.email && form.message) setSubmitted(true); };

  return (
    <section id="contact" className="contact section">
      <div className="container contact__grid">
        <motion.div className="contact__info" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="section__eyebrow">Get In Touch</p>
          <h2 className="section__title">Ready to Start Your <span className="text-accent">Journey?</span></h2>
          <p className="contact__desc">Drop us a message and one of our coaches will reach out within 24 hours to help you find the perfect program.</p>
          <div className="contact__details">
            {[
              { icon: "📍", label: "Location", val: "42 Iron Street, Ludhiana, Punjab" },
              { icon: "📞", label: "Phone", val: "+91 98765 43210" },
              { icon: "✉️", label: "Email", val: "hello@hopefitness.in" },
              { icon: "🕐", label: "Hours", val: "Mon–Sat: 5 AM – 10 PM" },
            ].map((d) => (
              <div className="contact-detail" key={d.label}>
                <span className="detail-icon">{d.icon}</span>
                <div><p className="detail-label">{d.label}</p><p className="detail-val">{d.val}</p></div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div className="contact__form-wrap" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" className="form-success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <div className="success-icon">🎉</div>
                <h3>Message Sent!</h3>
                <p>We'll reach out within 24 hours. Welcome to the Hope family!</p>
                <button className="btn btn--primary" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }}>Send Another</button>
              </motion.div>
            ) : (
              <motion.form key="form" className="contact__form" onSubmit={handleSubmit}>
                <h3 className="form-title">Book a Free Session</h3>
                <div className="form-row">
                  <div className="form-group"><label>Your Name *</label><input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required /></div>
                  <div className="form-group"><label>Phone Number</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" /></div>
                </div>
                <div className="form-group"><label>Email Address *</label><input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required /></div>
                <div className="form-group"><label>Your Message *</label><textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your fitness goals..." rows={4} required /></div>
                <button type="submit" className="btn btn--primary btn--full">Send Message →</button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div><span className="logo-hope">HOPE</span><span className="logo-fitness">FITNESS</span></div>
          <p>Forge Your Strength. Find Your Hope.</p>
        </div>
        <div className="footer__links">
          {["Home", "About", "Programs", "Contact"].map((l) => (
            <button key={l} className="footer-link" onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}>{l}</button>
          ))}
        </div>
        <p className="footer__copy">© 2026 Abhay Sharma. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Programs />
      <Motto />
      <Contact />
      <Footer />
    </div>
  );
}
