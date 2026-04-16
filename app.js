const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

/* progress bar */
const progress = $("#progress");
function updateProgress(){
  const st = window.scrollY || document.documentElement.scrollTop;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

/* mobile menu */
const menuBtn = $("#menuBtn");
const mobileMenu = $("#mobileMenu");
menuBtn?.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
$$('#mobileMenu a').forEach(a => a.addEventListener("click", () => mobileMenu.classList.add("hidden")));

/* smooth scroll */
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const href = a.getAttribute("href");
  if (!href || href === "#") return;
  const target = document.querySelector(href);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
});

/* reveal on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting){
      en.target.classList.add("is-in");
      io.unobserve(en.target);
    }
  });
},{ threshold: 0.12 });
$$(".reveal").forEach(el => io.observe(el));

/* add-to-cart toast (demo) */
const toast = $("#toast");
let toastTimer = null;

function showToast(msg){
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove("hidden");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 2200);
}

$$("[data-toast]").forEach(btn => {
  btn.addEventListener("click", () => showToast(btn.dataset.toast));
});

/* newsletter submit (demo) */
$("#newsletterForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = $("#email")?.value?.trim();
  if (!email) return;
  showToast("Subscribed — welcome to Aura.");
  e.target.reset();
});

/* footer year */
$("#year").textContent = new Date().getFullYear();