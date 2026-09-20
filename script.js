// The HTML artwork list is the single source of image paths, titles, and captions.
// Without JavaScript it remains an ordinary, fully accessible gallery.
const portfolio = document.querySelector('#portfolio');
const list = portfolio.querySelector('.artwork-list');
const slides = [...list.querySelectorAll('.artwork')];
const controls = portfolio.querySelector('.carousel-controls');
const thumbnails = portfolio.querySelector('.thumbnail-list');
const status = document.querySelector('#slide-status');
const viewer = document.querySelector('#artwork-viewer');
const viewerImage = document.querySelector('#viewer-image');
const closeViewer = document.querySelector('#close-viewer');
let current = 0;
let returnFocus = null;

const thumbButtons = slides.map((slide, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', `Show artwork ${index + 1}: ${slide.querySelector('h3').textContent}`);
  const image = slide.querySelector('img').cloneNode();
  image.alt = '';
  image.loading = 'lazy';
  button.append(image);
  button.addEventListener('click', () => showSlide(index));
  thumbnails.append(button);
  return button;
});

function showSlide(index) {
  current = (index + slides.length) % slides.length;
  const previous = (current - 1 + slides.length) % slides.length;
  const next = (current + 1) % slides.length;
  slides.forEach((slide, i) => {
    const active = i === current;
    slide.classList.toggle('is-active', active);
    slide.classList.toggle('is-previous', i === previous);
    slide.classList.toggle('is-next', i === next);
    slide.hidden = !active && i !== previous && i !== next;
    // Side previews are decorative; navigation is through labeled controls.
    slide.inert = !active;
    slide.setAttribute('aria-hidden', String(!active));
    slide.querySelector('a').tabIndex = active ? 0 : -1;
    thumbButtons[i].setAttribute('aria-current', String(active));
  });
  status.textContent = `${current + 1} / ${slides.length}`;
}

document.querySelector('#previous-slide').addEventListener('click', () => showSlide(current - 1));
document.querySelector('#next-slide').addEventListener('click', () => showSlide(current + 1));
portfolio.addEventListener('keydown', (event) => {
  let target = current;
  if (event.key === 'ArrowLeft') target--;
  else if (event.key === 'ArrowRight') target++;
  else if (event.key === 'Home') target = 0;
  else if (event.key === 'End') target = slides.length - 1;
  else return;
  event.preventDefault();
  const wasArtwork = event.target.closest('.artwork-link');
  showSlide(target);
  if (wasArtwork) slides[current].querySelector('a').focus({ preventScroll: true });
});

// Native dialog provides modal semantics, Escape dismissal, and focus containment.
slides.forEach((slide) => {
  slide.querySelector('a').addEventListener('click', (event) => {
    if (typeof viewer.showModal !== 'function') return; // Original image link is the fallback.
    event.preventDefault();
    const image = slide.querySelector('img');
    viewerImage.src = image.getAttribute('src');
    viewerImage.alt = image.alt;
    document.querySelector('#viewer-title').textContent = slide.querySelector('h3').textContent;
    document.querySelector('#viewer-caption').textContent = slide.querySelector('figcaption p').textContent;
    returnFocus = event.currentTarget;
    viewer.showModal();
    document.body.classList.add('viewer-open');
    closeViewer.focus();
  });
});
closeViewer.addEventListener('click', () => viewer.close());
viewer.addEventListener('close', () => {
  document.body.classList.remove('viewer-open');
  returnFocus?.focus({ preventScroll: true });
});

// Horizontal touch gestures navigate; ordinary vertical page scrolling stays native.
let touchStart = null;
let suppressClick = false;
list.addEventListener('touchstart', (event) => {
  suppressClick = false;
  touchStart = event.touches.length === 1 ? event.touches[0] : null;
}, { passive: true });
list.addEventListener('touchend', (event) => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.clientX;
  const dy = event.changedTouches[0].clientY - touchStart.clientY;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    suppressClick = true;
    showSlide(current + (dx < 0 ? 1 : -1));
  }
  touchStart = null;
}, { passive: true });
list.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
list.addEventListener('click', (event) => {
  if (suppressClick) { event.preventDefault(); event.stopPropagation(); suppressClick = false; }
}, true);

// Activate only after event handlers and thumbnails are ready.
portfolio.classList.add('carousel-ready');
controls.hidden = false;
thumbnails.hidden = false;
showSlide(0);
