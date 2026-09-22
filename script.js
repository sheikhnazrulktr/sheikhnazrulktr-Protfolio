const nav = document.querySelector(".nav");
const menu = document.querySelector(".menu");

menu?.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach((a) =>
  a.addEventListener("click", () => nav.classList.remove("open"))
);

const progress = document.querySelector(".progress");
window.addEventListener("scroll", () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = height > 0 ? `${(window.scrollY / height) * 100}%` : "0%";
});

const cursor = document.querySelector(".cursor");
const ring = document.querySelector(".cursor-ring");
window.addEventListener("mousemove", (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
  ring.animate(
    { left: `${event.clientX}px`, top: `${event.clientY}px` },
    { duration: 180, fill: "forwards" }
  );
});

document.querySelectorAll("a,.btn,.skill,.project-card").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    ring.style.width = "52px";
    ring.style.height = "52px";
  });
  element.addEventListener("mouseleave", () => {
    ring.style.width = "32px";
    ring.style.height = "32px";
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in");
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll(".section-content,.section-kicker,.skill,.project-card,.timeline article")
  .forEach((element) => {
    element.classList.add("observe");
    observer.observe(element);
  });

const style = document.createElement("style");
style.textContent = `
  .observe{opacity:0;transform:translateY(28px);transition:opacity .8s ease,transform .8s ease}
  .observe.in{opacity:1;transform:none}
  .skill:nth-child(2),.skill:nth-child(5){transition-delay:.08s}
  .skill:nth-child(3),.skill:nth-child(6){transition-delay:.16s}
`;
document.head.appendChild(style);

// Formspree receives contact messages directly and forwards them to the verified email.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzezrlyr";
const messageLink = document.querySelector(".cta-message");

function closeContactForm() {
  document.querySelector(".contact-modal")?.remove();
}

function openContactForm(event) {
  event.preventDefault();

  const modal = document.createElement("div");
  modal.className = "contact-modal";
  modal.innerHTML = `
    <div class="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title">
      <button class="contact-close" type="button" aria-label="Close form">×</button>
      <p class="modal-kicker">Start a conversation</p>
      <h2 id="contact-title">Tell me about your <span>opportunity.</span></h2>
      <form class="contact-form">
        <label>Name<input name="name" type="text" placeholder="Your name" required /></label>
        <label>Work / opportunity<input name="work" type="text" placeholder="What would you like to discuss?" required /></label>
        <label>Email<input name="email" type="email" placeholder="Your email address" required /></label>
        <label>Message<textarea name="message" rows="5" placeholder="Write your message" required></textarea></label>
        <button class="btn btn-primary" type="submit">Send message <b>↗</b></button>
      </form>
      <p class="form-note">Your message will be sent directly through this website.</p>
    </div>
  `;

  document.body.appendChild(modal);
  modal.querySelector("input")?.focus();
  modal.querySelector(".contact-close").addEventListener("click", closeContactForm);
  modal.addEventListener("click", (clickEvent) => {
    if (clickEvent.target === modal) closeContactForm();
  });

  modal.querySelector(".contact-form").addEventListener("submit", async (submitEvent) => {
    submitEvent.preventDefault();

    const form = submitEvent.currentTarget;
    const button = form.querySelector("button[type=submit]");
    const originalText = button.innerHTML;
    button.disabled = true;
    button.textContent = "Sending...";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Form submission failed");

      form.innerHTML = `
        <div class="form-success" role="status">
          <strong>Message sent successfully.</strong>
          <p>Thank you. I’ll get back to you soon.</p>
        </div>
      `;
    } catch (error) {
      button.disabled = false;
      button.innerHTML = originalText;
      const note = modal.querySelector(".form-note");
      note.textContent = "Message could not be sent. Please try again.";
      note.style.color = "#c0392b";
    }
  });
}

messageLink?.addEventListener("click", openContactForm);

document.getElementById("year").textContent = new Date().getFullYear();
