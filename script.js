// Scroll fluide au clic flèches
document.querySelector('.slider-prev').addEventListener('click', () => {
  document.querySelector('.slider-container').scrollBy({
    left: -320,  // Scroll d'1 photo (300px + gap)
    behavior: 'smooth'
  });
});

document.querySelector('.slider-next').addEventListener('click', () => {
  document.querySelector('.slider-container').scrollBy({
    left: +320,  // Scroll d'1 photo
    behavior: 'smooth'
  });
});
