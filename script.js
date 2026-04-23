if (typeof AOS !== 'undefined') {
  AOS.init();
}

// Slider

const slides = Array.from(document.querySelectorAll('.slide'));
let current = 0;

function updateSlider() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'prev', 'next', 'hidden');
    if (i === current) {
      slide.classList.add('active');
    } else if (i === (current - 1 + slides.length) % slides.length) {
      slide.classList.add('prev');
    } else if (i === (current + 1) % slides.length) {
      slide.classList.add('next');
    } else {
      slide.classList.add('hidden');
    }
  });
}

updateSlider();

const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');

if (prevBtn) prevBtn.addEventListener('click', () => {
  current = (current - 1 + slides.length) % slides.length;
  updateSlider();
});

if (nextBtn) nextBtn.addEventListener('click', () => {
  current = (current + 1) % slides.length;
  updateSlider();
});

slides.forEach((slide, i) => {
  slide.addEventListener('click', () => {
    if (i !== current) {
      current = i;
      updateSlider();
    }
  });
});

const wrapper = document.querySelector('.slider-wrapper');
if (wrapper) {
  wrapper.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      current = (current + 1) % slides.length;
    } else {
      current = (current - 1 + slides.length) % slides.length;
    }
    updateSlider();
  }, { passive: false });
}

let touchStartX = 0;
const track = document.querySelector('.slider-track');
if (track) {
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        current = (current + 1) % slides.length;
      } else {
        current = (current - 1 + slides.length) % slides.length;
      }
      updateSlider();
    }
  });
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