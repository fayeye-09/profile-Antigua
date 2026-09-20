// Edit the artwork list in index.html: it remains a gallery without JavaScript.
const portfolio = document.querySelector('#portfolio');
const list = portfolio.querySelector('.artwork-list');
const slides = [...list.querySelectorAll('.artwork')];
const viewer = document.querySelector('#artwork-viewer');
const viewerImage = document.querySelector('#viewer-image');
const closeViewer = document.querySelector('#close-viewer');
const intervalMs = 3000;
let current = 0;
let timer = null;
let hovered = false;
let returnFocus = null;

function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    const active = i === current;
    slide.classList.toggle('is-active', active);
    slide.classList.toggle('is-preview-before', i === (current - 1 + slides.length) % slides.length);
    slide.classList.toggle('is-preview-after', i === (current + 1) % slides.length);
    slide.classList.toggle('is-far-before', i === (current - 2 + slides.length) % slides.length);
    slide.classList.toggle('is-far-after', i === (current + 2) % slides.length);
    slide.inert = !active;
    slide.setAttribute('aria-hidden', String(!active));
    slide.querySelector('a').tabIndex = active ? 0 : -1;
  });
  // Load the next artwork ahead of its scheduled appearance.
  slides[(current + 1) % slides.length].querySelector('img').loading = 'eager';
}
function updateTimer() {
  clearInterval(timer);
  timer = null;
  // Don't change an artwork while someone is inspecting it or keyboard-focusing it.
  if (!hovered && !viewer.open && !document.hidden && !list.contains(document.activeElement)) {
    timer = setInterval(() => showSlide(current + 1), intervalMs);
  }
}
list.addEventListener('mouseenter', () => { hovered = true; updateTimer(); });
list.addEventListener('mouseleave', () => { hovered = false; updateTimer(); });
document.addEventListener('visibilitychange', updateTimer);
list.addEventListener('focusin', updateTimer);
list.addEventListener('focusout', () => setTimeout(updateTimer, 0));

// The native dialog keeps the enlarged artwork on this page.
slides.forEach((slide) => {
  slide.querySelector('a').addEventListener('click', (event) => {
    if (typeof viewer.showModal !== 'function') return;
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
    updateTimer();
  });
});
closeViewer.addEventListener('click', () => viewer.close());
viewer.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') { event.preventDefault(); closeViewer.focus(); }
});
viewer.addEventListener('close', () => {
  document.body.classList.remove('viewer-open');
  returnFocus?.focus({ preventScroll: true });
  updateTimer();
});
portfolio.classList.add('presentation-ready');
slides[0].querySelector('img').loading = 'eager';
showSlide(0);
updateTimer();
