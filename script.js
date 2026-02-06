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


document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;
    const isActive = answer.classList.contains('active');
    document.querySelectorAll('.faq-answer').forEach( a => a.classList.remove('active'));
    if (!isActive) answer.classList.add('active');
  });
});