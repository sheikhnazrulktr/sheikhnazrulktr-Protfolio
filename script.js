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
  .contact-side{position:relative;padding:34px 0 0 34px;border-left:1px solid #303030}
  .contact-side:before{content:"LET'S CONNECT";position:absolute;top:0;left:34px;color:var(--accent);font-size:9px;letter-spacing:.22em;font-weight:700}
  .contact-side .email,.contact-side .phone{display:flex;align-items:center;justify-content:space-between;width:100%;padding:18px 0;border-bottom:1px solid #303030;font:600 clamp(16px,1.7vw,24px) Manrope;transition:color .25s,border-color .25s}
  .contact-side .phone{font-size:clamp(15px,1.45vw,20px);color:#bdbbb5}
  .contact-side .email:hover,.contact-side .phone:hover{color:var(--accent);border-color:var(--accent)}
  .contact-side .email span,.contact-side .phone span,.social-link span{color:var(--accent);font-size:18px}
  .contact-side .cta-message{display:inline-flex;align-items:center;gap:12px;margin-top:28px;padding:13px 18px;border:1px solid var(--accent);color:var(--accent);font:600 10px Manrope;letter-spacing:.16em;text-transform:uppercase;transition:.3s}
  .contact-side .cta-message:hover{background:var(--accent);color:#080808;transform:translateY(-3px);box-shadow:0 12px 28px #d7ff4f22}
  .contact-side>p{max-width:390px;margin-top:25px;color:#777;line-height:1.7}
  .contact-meta{display:flex;gap:28px;margin-top:28px;color:#aaa;font-size:10px;letter-spacing:.14em;text-transform:uppercase}
  .social-links{display:flex;flex-wrap:wrap;gap:9px;margin-top:30px;padding-top:22px;border-top:1px solid #303030}
  .social-link{display:inline-flex;align-items:center;gap:8px;padding:10px 12px;border:1px solid #333;color:#aaa;background:#101010;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;transition:.3s}
  .social-link svg{width:15px;height:15px;fill:currentColor}
  .social-link:hover{color:var(--accent);border-color:var(--accent);transform:translateY(-3px);box-shadow:0 10px 24px #d7ff4f18}
  .contact-modal{position:fixed;inset:0;z-index:200;display:grid;place-items:center;padding:24px;background:rgba(0,0,0,.78);backdrop-filter:blur(14px);animation:modalFade .35s ease}
  .contact-dialog{position:relative;width:min(100%,560px);max-height:90vh;overflow:auto;padding:42px;background:linear-gradient(145deg,#181818,#0b0b0b);border:1px solid #3a3a3a;box-shadow:0 30px 90px #000;border-radius:4px;animation:modalUp .45s cubic-bezier(.2,.8,.2,1)}
  .contact-dialog:before{content:"";position:absolute;top:0;left:0;width:100%;height:3px;background:var(--accent)}
  .contact-close{position:absolute;top:16px;right:20px;border:0;background:none;color:#aaa;font-size:30px;line-height:1;cursor:pointer;transition:color .25s,transform .25s}
  .contact-close:hover{color:var(--accent);transform:rotate(90deg)}
  .modal-kicker{margin-bottom:12px;color:var(--accent);font-size:10px;letter-spacing:.22em;text-transform:uppercase}
  .contact-dialog h2{max-width:430px;margin-bottom:28px;color:var(--text);font:800 clamp(32px,5vw,54px)/.98 Manrope;letter-spacing:-.06em}
  .contact-dialog h2 span{color:var(--accent)}
  .contact-form{display:grid;gap:17px}
  .contact-form label{display:grid;gap:8px;color:#b9b6ae;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase}
  .contact-form input,.contact-form textarea{width:100%;border:1px solid #363636;border-radius:0;background:#101010;color:var(--text);padding:14px 15px;outline:none;font:15px "DM Sans",sans-serif;letter-spacing:0;text-transform:none;transition:border-color .25s,box-shadow .25s}
  .contact-form textarea{resize:vertical;min-height:125px}
  .contact-form input::placeholder,.contact-form textarea::placeholder{color:#686868}
  .contact-form input:focus,.contact-form textarea:focus{border-color:var(--accent);box-shadow:0 0 0 3px #d7ff4f18}
  .contact-form .btn{justify-self:start;margin-top:7px;cursor:pointer}
  .contact-form .btn:disabled{opacity:.65;cursor:wait;transform:none}
  .form-note{margin-top:18px;color:#777;font-size:11px;line-height:1.6}
  .form-success{padding:28px 0;color:#ddd;border-top:1px solid #333;border-bottom:1px solid #333}
  .form-success strong{display:block;margin-bottom:8px;color:var(--accent);font:700 22px Manrope}
  .form-success p{color:#999}
  @keyframes modalFade{from{opacity:0}to{opacity:1}}
  @keyframes modalUp{from{opacity:0;transform:translateY(24px) scale(.98)}to{opacity:1;transform:none}}
  @media(max-width:850px){.contact-side{padding:34px 0 0;border-left:0;border-top:1px solid #303030}.contact-side:before{left:0;top:18px}}
  @media(max-width:520px){.contact-modal{padding:14px}.contact-dialog{padding:34px 22px 24px}.contact-dialog h2{margin-bottom:22px}.contact-side .email{font-size:16px}.contact-meta{flex-direction:column;gap:12px}}
`;
document.head.appendChild(style);

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
        <button class="btn btn-fill" type="submit">Send message <b>↗</b></button>
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
