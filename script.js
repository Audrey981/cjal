const container = document.querySelector('.slider-container');
const slides = Array.from(container.querySelectorAll('.slide'));
let index = 0;

function goTo(i){
  index = Math.max(0, Math.min(i, slides.length - 1));
  slides[index].scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center'
  });
}

document.querySelector('.slider-prev').addEventListener('click', () => goTo(index - 1));
document.querySelector('.slider-next').addEventListener('click', () => goTo(index + 1));

/* Ajout : synchroniser index quand on swipe/scroll à la main */
function updateIndexFromScroll(){
  const center = container.scrollLeft + container.clientWidth / 2;
  let closest = 0;
  let minDist = Infinity;

  slides.forEach((slide, i) => {
    const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
    const dist = Math.abs(center - slideCenter);
    if (dist < minDist) { minDist = dist; closest = i; }
  });

  index = closest;
}

container.addEventListener('scroll', () => {
  window.requestAnimationFrame(updateIndexFromScroll);
});

document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;
    const isActive = answer.classList.contains('active');
    document.querySelectorAll('.faq-answer').forEach( a => a.classList.remove('active'));
    if (!isActive) answer.classList.add('active');
  });
});