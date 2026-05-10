// ===== SMOOTH ACTIVE NAV LINK =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});


// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
  ".about-section, .skills-section, .projects-section, .contact-section, .card, .proj-card"
);

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
};

revealElements.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = "all 0.8s ease";
});

window.addEventListener("scroll", revealOnScroll);


// ===== PROJECT MODAL SCROLL LOCK =====
const projectDetails = document.querySelectorAll(".proj-detail");

window.addEventListener("hashchange", () => {
  const active = window.location.hash;

  if (active.includes("proj-")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});


// ===== CONTACT FORM SIMPLE VALIDATION =====
const form = document.querySelector(".contact-form");

form.addEventListener("submit", (e) => {
  const inputs = form.querySelectorAll("input, textarea");
  let valid = true;

  inputs.forEach(input => {
    if (!input.checkValidity()) {
      valid = false;
    }
  });

  if (!valid) {
    e.preventDefault();
  } else {
    alert("Message sent successfully!");
  }
});



// ===== SMART SMOOTH SCROLL (DO NOT BREAK PROJECTS) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // ❌ DO NOT block project detail and back buttons
    if (href.startsWith("#proj-") || href === "#projects") return;

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// ===== BUTTON HOVER MICRO INTERACTION =====
const buttons = document.querySelectorAll(".home-btn, .details-btn, .send-btn");

buttons.forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "scale(1.05)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
  });
});

// ===== SAVE & RESTORE SCROLL POSITION FOR PROJECT DETAILS =====

// ===== SAVE SCROLL POSITION =====
document.querySelectorAll('.details-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  });
});

// ===== RESTORE SCROLL POSITION AFTER BACK =====
document.querySelectorAll('.detail-back a').forEach(backBtn => {
  backBtn.addEventListener('click', () => {
    const savedPosition = sessionStorage.getItem('scrollPosition');

    if (savedPosition !== null) {
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedPosition),
          behavior: "auto" // important: avoid conflict
        });
      }, 10);
    }
  });
});
// ===== CONTACT FORM VALIDATION =====

const contactForm = document.querySelector(".contact-form");
const sendBtn = document.querySelector(".send-btn");

contactForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const firstName = document.querySelector('input[name="firstname"]');
  const lastName = document.querySelector('input[name="lastname"]');
  const email = document.querySelector('input[name="email"]');
  const contact = document.querySelector('input[name="contact"]');
  const message = document.querySelector('textarea[name="message"]');

  let isValid = true;

  // Remove previous warning styles
  [firstName, lastName, email, contact, message].forEach(input => {
    input.style.borderColor = "#555";
  });

  // Check empty fields
  if (firstName.value.trim() === "") {
    firstName.style.borderColor = "red";
    isValid = false;
  }

  if (lastName.value.trim() === "") {
    lastName.style.borderColor = "red";
    isValid = false;
  }

  if (email.value.trim() === "") {
    email.style.borderColor = "red";
    isValid = false;
  }

  if (contact.value.trim() === "") {
    contact.style.borderColor = "red";
    isValid = false;
  }

  if (message.value.trim() === "") {
    message.style.borderColor = "red";
    isValid = false;
  }

  // Warning message
  if (!isValid) {
    alert("Please fill in all required fields.");
    return;
  }

  // Button animation
  sendBtn.innerHTML = "Sending...";
  sendBtn.disabled = true;

  setTimeout(() => {
    sendBtn.innerHTML = "Message Sent ✓";
    sendBtn.style.background = "#4CAF50";

    // Reset form
    contactForm.reset();

    setTimeout(() => {
      sendBtn.innerHTML = "Send message";
      sendBtn.disabled = false;
      sendBtn.style.background = "";
    }, 2500);

  }, 1500);
});