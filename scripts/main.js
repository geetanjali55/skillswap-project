const card = document.getElementById('card');
card.addEventListener('click', () => {
  card.classList.toggle('open');
});

// Optional: Slide slightly on hover, fully out on click
card.addEventListener('mouseenter', () => card.classList.add('hovered'));
card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
