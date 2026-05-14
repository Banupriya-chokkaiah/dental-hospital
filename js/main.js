/* ══════════════════════════════════════════════
   KHALID Aesthetic SMILES — MAIN JAVASCRIPT
   ══════════════════════════════════════════════ */

// ── PAGE NAVIGATION ──
function showPage(page) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  const nav = document.getElementById('pageNav');
  if (nav) {
    nav.style.display = 'flex';
    document.querySelectorAll('.page-nav-btn').forEach((b, i) => {
      const pages = ['home', 'about', 'treatments', 'ba', 'contact'];
      b.classList.toggle('active', pages[i] === page);
    });
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => observeReveal(), 150);
  if (page === 'home') setTimeout(() => startCounters(), 400);
}

// ── HERO SLIDER ──
let currentSlide = 0;
let slideTimer = null;
let progressTimer = null;
let progressVal = 0;
const SLIDE_DURATION = 5800;

function goSlide(n) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  resetProgress();
}

function changeSlide(d) { goSlide(currentSlide + d); }

function resetProgress() {
  const bar = document.getElementById('slideProgress');
  if (!bar) return;
  clearInterval(progressTimer);
  progressVal = 0;
  bar.style.transition = 'none';
  bar.style.width = '0%';
  requestAnimationFrame(() => {
    bar.style.transition = `width ${SLIDE_DURATION}ms linear`;
    bar.style.width = '100%';
  });
}

function startSlider() {
  slideTimer = setInterval(() => changeSlide(1), SLIDE_DURATION);
  resetProgress();
}

// ── TESTIMONIAL SLIDER ──
let testIdx = 0;
function goTest(n) {
  const track = document.getElementById('testTrack');
  const testDots = document.querySelectorAll('.test-dot');
  if (!track) return;
  testIdx = n;
  const w = window.innerWidth <= 768 ? 100 : 33.33;
  track.style.transform = `translateX(-${n * w}%)`;
  testDots.forEach((d, i) => d.classList.toggle('active', i === n));
}
setInterval(() => goTest((testIdx + 1) % 3), 5200);

// ── BEFORE/AFTER SLIDER ──
function initBA(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const after = document.getElementById(id + '-after');
  const div = document.getElementById(id + '-div');
  const hdl = document.getElementById(id + '-hdl');
  if (!after || !div || !hdl) return;
  let dragging = false;

  function setPos(x) {
    const r = el.getBoundingClientRect();
    let p = Math.max(4, Math.min(96, ((x - r.left) / r.width) * 100));
    after.style.clipPath = `inset(0 ${100 - p}% 0 0)`;
    div.style.left = p + '%';
    hdl.style.left = p + '%';
  }

  el.addEventListener('mousedown', e => { dragging = true; setPos(e.clientX); });
  window.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX); });
  window.addEventListener('mouseup', () => { dragging = false; });
  el.addEventListener('touchstart', e => { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchmove', e => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchend', () => { dragging = false; });
}

const baIds = ['ba1','ba2','ba3','bap1','bap2','bap3','bap4','bap5','bap6'];
baIds.forEach(id => initBA(id));

// ── COUNTERS ──
let countersRun = false;
function startCounters() {
  if (countersRun) return;
  countersRun = true;
  document.querySelectorAll('.count-anim').forEach(el => {
    const target = +el.dataset.target;
    const dur = 2200;
    const steps = 80;
    let cur = 0;
    const inc = target / steps;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= target) { cur = target; clearInterval(timer); }
      if (target >= 1000) {
        el.textContent = Math.round(cur).toLocaleString() + (cur >= target ? '+' : '');
      } else {
        el.textContent = Math.round(cur);
      }
    }, dur / steps);
  });
}

// ── HERO STAT COUNTERS (on load) ──
function initHeroCounters() {
  document.querySelectorAll('.hero-stat-num[data-target]').forEach(el => {
    const target = +el.dataset.target;
    const dur = 1800;
    const steps = 70;
    let cur = 0;
    const inc = target / steps;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= target) { cur = target; clearInterval(timer); }
      if (target >= 1000) {
        el.textContent = Math.round(cur).toLocaleString() + (cur >= target ? '+' : '');
      } else {
        el.textContent = Math.round(cur);
      }
    }, dur / steps);
  });
}

// ── INTERSECTION OBSERVER ──
function observeReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => {
    if (!el.classList.contains('visible')) obs.observe(el);
  });
}

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  if (nb) nb.classList.toggle('scrolled', window.scrollY > 60);
  if (window.scrollY > 500) startCounters();
});

// ── MOBILE MENU ──
function toggleMobile() {
  const m = document.getElementById('mobileMenu');
  if (m) m.classList.toggle('open');
}

// ── SCROLL TO APPOINTMENT ──
function scrollToAppt() {
  setTimeout(() => {
    const el = document.getElementById('appointment');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 250);
}

// ── FORM SUBMIT ──
function submitAppt() {
  const form = document.getElementById('apptForm');
  const success = document.getElementById('apptSuccess');
  if (form && success) { form.style.display = 'none'; success.classList.add('show'); }
}
function submitContact() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  if (form && success) { form.style.display = 'none'; success.classList.add('show'); }
}

// ── KEYBOARD SLIDER ──
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') changeSlide(-1);
  if (e.key === 'ArrowRight') changeSlide(1);
});

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  observeReveal();
  startSlider();
  setTimeout(initHeroCounters, 700);
});