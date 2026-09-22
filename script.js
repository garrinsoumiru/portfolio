/* ==========================================================
   GARRIN RASHEESA SOUMIRU — PORTFOLIO JS
   ========================================================== */
   document.addEventListener("DOMContentLoaded", () => {

    /* ---------- 1. Navbar: scroll effect ---------- */
    const navbar = document.getElementById("navbar");
    const backToTop = document.getElementById("backToTop");
  
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
      backToTop.classList.toggle("show", window.scrollY > 500);
    });
  
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    /* ---------- 2. Hamburger menu (mobile) ---------- */
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
  
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
  
    // Close menu when a link is clicked
    navLinks.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  
    /* ---------- 3. Typing effect in hero ---------- */
    const roles = [
      "ERP Enthusiast",
      "SAP FI & Invoice Verification",
      "EPICOR Implementation",
      "Purchasing Officer",
      "Information Systems Fresh Graduate"
    ];
    const typedEl = document.getElementById("typed");
    let roleIdx = 0, charIdx = 0, deleting = false;
  
    function typeLoop() {
      const word = roles[roleIdx];
      if (!deleting) {
        typedEl.textContent = word.slice(0, ++charIdx);
        if (charIdx === word.length) {
          deleting = true;
          setTimeout(typeLoop, 1800);
          return;
        }
        setTimeout(typeLoop, 70);
      } else {
        typedEl.textContent = word.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
        setTimeout(typeLoop, 35);
      }
    }
    typeLoop();
  
    /* ---------- 4. Reveal animation on scroll ---------- */
    const revealEls = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));
  
    /* ---------- 5. Statistics counter ---------- */
    const statNums = document.querySelectorAll(".stat-num");
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.target;
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 50));
        const tick = () => {
          current += step;
          if (current >= target) { el.textContent = target + "+"; }
          else { el.textContent = current; requestAnimationFrame(tick); }
        };
        tick();
        statObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => statObserver.observe(el));
  
    /* ---------- 6. Skill bars animation ---------- */
    const bars = document.querySelectorAll(".bar");
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("go");
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    bars.forEach(el => barObserver.observe(el));
  
    /* ---------- 7. Project filter ---------- */
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
  
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
          const match = filter === "all" || card.dataset.category === filter;
          card.classList.toggle("hide", !match);
        });
      });
    });
  
    /* ---------- 8. Scroll-spy for active nav ---------- */
    const sections = document.querySelectorAll("section[id]");
    const navLinkEls = document.querySelectorAll(".nav-link");
  
    window.addEventListener("scroll", () => {
      const pos = window.scrollY + 120;
      sections.forEach(sec => {
        if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
          navLinkEls.forEach(l =>
            l.classList.toggle("active", l.getAttribute("href") === "#" + sec.id)
          );
        }
      });
    });
  
    /* ---------- 9. Contact form ---------- */
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nama = document.getElementById("nama").value.trim();
      const email = document.getElementById("email").value.trim();
      const subjek = document.getElementById("subjek").value.trim();
      const pesan = document.getElementById("pesan").value.trim();
  
      if (!nama || !email || !subjek || !pesan) {
        status.textContent = "Please fill in all fields.";
        status.className = "form-status err";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Invalid email format.";
        status.className = "form-status err";
        return;
      }
  
      // Simulated submission — replace with fetch() to your backend if available
      status.textContent = "Sending message...";
      status.className = "form-status";
      setTimeout(() => {
        status.textContent = `Thank you, ${nama}! Your message has been sent.`;
        status.className = "form-status ok";
        form.reset();
      }, 1200);
    });
  });