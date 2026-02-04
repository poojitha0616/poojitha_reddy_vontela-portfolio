// Enable "js" class so reveal animations work only when JS loads
document.documentElement.classList.add("js");

/* =========================
   Mobile Menu
========================= */
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuBtn.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.classList.remove("open");
    });
  });
}

/* =========================
   Active Nav on Scroll
========================= */
const sections = document.querySelectorAll("section[id]");
const navA = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  let current = "";

  sections.forEach((sec) => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 140;
    const height = sec.offsetHeight;

    if (top >= offset && top < offset + height) {
      current = sec.getAttribute("id");
    }
  });

  navA.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

/* =========================
   Typing Effect
========================= */
const typingEl = document.getElementById("typing");

if (typingEl) {
  const roles = [
    "full-stack web applications.",
    "backend systems and databases.",
    "UI/UX-driven user experiences.",
    "ServiceNow ITSM workflows.",
    "data-driven software solutions.",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];

    if (!deleting) {
      typingEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1200);
        return;
      }
    } else {
      typingEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeLoop, deleting ? 40 : 55);
  }

  typeLoop();
}

/* =========================
   Reveal Animation on Scroll
========================= */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 120) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =========================
   Certificates Modal
   (Matches your HTML IDs)
========================= */
const certModal = document.getElementById("certModal");
const certBackdrop = document.getElementById("certBackdrop");
const certCloseBtn = document.getElementById("certCloseBtn");
const certModalTitle = document.getElementById("certModalTitle");
const certModalBody = document.getElementById("certModalBody");
const certModalCard = document.getElementById("certModalCard");

function openCert({ title, type, kind, src }) {
  if (!certModal) return;

  certModalTitle.textContent = title || "Certificate";
  certModalBody.innerHTML = "";

  // Insert image or PDF
  if (kind === "pdf") {
    const iframe = document.createElement("iframe");
    iframe.src = src;
    certModalBody.appendChild(iframe);
  } else {
    const img = document.createElement("img");
    img.src = src;
    img.alt = title || "Certificate";
    certModalBody.appendChild(img);
  }

  // Flash modal glow based on type
  certModalCard.classList.remove("flash-cloud", "flash-cyber", "flash-ccna", "flash-intern");
  certModalCard.classList.add(`flash-${type || "ccna"}`);

  certModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeCert() {
  if (!certModal) return;
  certModal.classList.remove("show");
  certModalBody.innerHTML = "";
  document.body.style.overflow = "";
}

document.querySelectorAll(".cert-card").forEach((card) => {
  card.addEventListener("click", () => {
    const type = card.dataset.type;   // cloud/cyber/ccna/intern
    const kind = card.dataset.kind;   // img/pdf
    const src = card.dataset.src;     // filename
    const title = card.dataset.title; // popup title

    // Flash card color
    card.classList.remove("flash-cloud", "flash-cyber", "flash-ccna", "flash-intern");
    card.classList.add(`flash-${type}`);
    setTimeout(() => card.classList.remove(`flash-${type}`), 600);

    openCert({ title, type, kind, src });
  });
});

certCloseBtn?.addEventListener("click", closeCert);
certBackdrop?.addEventListener("click", closeCert);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && certModal?.classList.contains("show")) {
    closeCert();
  }
});

/* =========================
   Flash Glow on Click (All Cards)
========================= */
document
  .querySelectorAll(".skill-card, .proj-card, .exp-card, .box")
  .forEach((card) => {
    card.addEventListener("click", () => {
      const colors = [
        { c: "rgba(59,130,246,0.22)", b: "rgba(59,130,246,0.55)" }, // blue
        { c: "rgba(99,102,241,0.22)", b: "rgba(99,102,241,0.55)" }, // indigo
        { c: "rgba(34,197,94,0.20)", b: "rgba(34,197,94,0.55)" },   // green
        { c: "rgba(244,63,94,0.18)", b: "rgba(244,63,94,0.55)" },   // pink/red
      ];

      const pick = colors[Math.floor(Math.random() * colors.length)];

      card.style.setProperty("--flashColor", pick.c);
      card.style.setProperty("--flashBorder", pick.b);

      // Restart animation
      card.classList.remove("card-flash");
      void card.offsetWidth;
      card.classList.add("card-flash");
    });
  });
/* =========================
   Colorful hover by category
========================= */
const glowMap = {
  cloud:  { c1: "rgba(59,130,246,0.30)", c2: "rgba(59,130,246,0.14)", ring: "rgba(59,130,246,0.16)", border: "rgba(59,130,246,0.65)", shadow: "rgba(59,130,246,0.28)" }, // blue
  aws:    { c1: "rgba(244,63,94,0.30)",  c2: "rgba(244,63,94,0.14)",  ring: "rgba(244,63,94,0.14)",  border: "rgba(244,63,94,0.65)",  shadow: "rgba(244,63,94,0.26)"  }, // red/pink
  cyber:  { c1: "rgba(34,197,94,0.28)",  c2: "rgba(34,197,94,0.12)",  ring: "rgba(34,197,94,0.14)",  border: "rgba(34,197,94,0.62)",  shadow: "rgba(34,197,94,0.22)"  }, // green
  ccna:   { c1: "rgba(99,102,241,0.28)", c2: "rgba(99,102,241,0.12)", ring: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.62)", shadow: "rgba(99,102,241,0.24)" }, // purple
  intern: { c1: "rgba(244,63,94,0.26)",  c2: "rgba(244,63,94,0.12)",  ring: "rgba(244,63,94,0.13)",  border: "rgba(244,63,94,0.62)",  shadow: "rgba(244,63,94,0.22)"  }, // pink/red
  ai:     { c1: "rgba(14,165,233,0.28)", c2: "rgba(14,165,233,0.12)", ring: "rgba(14,165,233,0.14)", border: "rgba(14,165,233,0.62)", shadow: "rgba(14,165,233,0.22)" }, // cyan
  backend:{ c1: "rgba(245,158,11,0.26)", c2: "rgba(245,158,11,0.12)", ring: "rgba(245,158,11,0.13)", border: "rgba(245,158,11,0.62)", shadow: "rgba(245,158,11,0.22)" }, // amber
  web:    { c1: "rgba(168,85,247,0.26)", c2: "rgba(168,85,247,0.12)", ring: "rgba(168,85,247,0.13)", border: "rgba(168,85,247,0.62)", shadow: "rgba(168,85,247,0.22)" }, // violet
};

function applyGlow(el, key) {
  const g = glowMap[key] || glowMap.ccna;
  el.style.setProperty("--glowColor", g.c1);
  el.style.setProperty("--glowColor2", g.c2);
  el.style.setProperty("--ringGlow", g.ring);
  el.style.setProperty("--borderGlow", g.border);
  el.style.setProperty("--shadowGlow", g.shadow);
}

/* Certificates (already have data-type) */
document.querySelectorAll(".cert-card").forEach((card) => {
  card.addEventListener("mouseenter", () => applyGlow(card, card.dataset.type));
});

/* Projects (we will add data-type) */
document.querySelectorAll(".proj-card").forEach((card) => {
  card.addEventListener("mouseenter", () => applyGlow(card, card.dataset.type));
});
