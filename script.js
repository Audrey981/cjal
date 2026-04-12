if (typeof AOS !== 'undefined') {
  AOS.init();
}

// Slider
const container = document.querySelector('.slider-container');
if (container) {
  const slides = Array.from(container.querySelectorAll('.slide'));
  let index = 0;
  const slidePositions = slides.map(slide => ({
    left: slide.offsetLeft,
    width: slide.clientWidth
  }));
  function goTo(i) {
    index = Math.max(0, Math.min(i, slides.length - 1));
    slides[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));
  container.addEventListener('scroll', () => window.requestAnimationFrame(() => {
    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0, minDist = Infinity;
    slidePositions.forEach((pos, i) => {
      const dist = Math.abs(center - (pos.left + pos.width / 2));
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    index = closest;
  }));
}

// FAQ
document.querySelectorAll('.faq-question').forEach(q => {
  const answer = q.nextElementSibling;
  q.addEventListener('click', () => {
    const isActive = answer.classList.contains('active');
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('active'));
    if (!isActive) answer.classList.add('active');
  });
});

// Année
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Lightbox ← tout le bloc dans un if
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  document.querySelectorAll('.card-img-zoom img').forEach(img => {
    img.addEventListener('click', function() {
      document.getElementById('lightbox-img').src = this.src;
      document.getElementById('lightbox-img').alt = this.alt;
      lightbox.classList.add('open');
    });
  });
  lightbox.addEventListener('click', e => {
    if (e.target !== document.getElementById('lightbox-img')) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.getElementById('lightbox-img').src = '';
  }
}

// Bouton retour en haut
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight / 2) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}