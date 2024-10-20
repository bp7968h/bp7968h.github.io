// Show "To Top" button only when scrolling down
window.addEventListener('scroll', function() {
  const toTopButton = document.getElementById('toTop');
  if (window.scrollY > 100) {
    toTopButton.style.display = 'block';
  } else {
    toTopButton.style.display = 'none';
  }
});