// ===============================
// LANGUAGE
// ===============================
function detectLanguage() {
  const lang = navigator.language || 'en';
  return lang.startsWith('it') ? 'it' : 'en';
}

function applyLanguage() {
  const lang = content[detectLanguage()];
  document.documentElement.lang = detectLanguage();

  const textMap = {
    'ui-subtitle': lang.subtitle,
    'ui-booking-btn': lang.bookingBtn,
    'title-about': lang.titleAbout,
    'title-pricing': lang.titlePricing,
    'title-equipment': lang.titleEquipment,
    'title-services': lang.titleServices,
    'title-highlights': lang.titleHighlights,
    'title-music': lang.titleMusic,
    'title-booking': lang.titleBooking
  };

  Object.keys(textMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = textMap[id];
  });

  ['text-about', 'text-services', 'text-music', 'text-booking'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = lang[id.replace('text-', 'text')];
  });
}

// ===============================
// CANVAS (LIGHT VERSION)
// ===============================
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let blobs = [];
let rafId;
const isMobile = window.innerWidth < 768;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createBlobs() {
  blobs = Array.from({ length: isMobile ? 2 : 3 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: isMobile ? 120 : 180,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  }));
}

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#111';
  blobs.forEach(b => {
    b.x += b.vx;
    b.y += b.vy;

    if (b.x < 0 || b.x > canvas.width) b.vx *= -1;
    if (b.y < 0 || b.y > canvas.height) b.vy *= -1;

    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  });

  rafId = requestAnimationFrame(drawCanvas);
}

// ===============================
// SLIDER (VISIBILITY AWARE)
// ===============================
const track = document.getElementById('sliderTrack');
let slideIndex = 0;
let sliderTimer;

function startSlider() {
  if (!track) return;
  sliderTimer = setInterval(() => {
    const slides = track.children.length;
    slideIndex = (slideIndex + 1) % slides;
    track.style.transform = `translate3d(-${slideIndex * 100}%,0,0)`;
  }, 4500);
}

function stopSlider() {
  clearInterval(sliderTimer);
}

// ===============================
// LIGHTBOX
// ===============================
function openReel(id) {
  const lb = document.getElementById('lightbox');
  const iframe = document.getElementById('lightbox-iframe');
  iframe.src = `https://www.instagram.com/reel/${id}/embed`;
  lb.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeReel() {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightbox-iframe').src = '';
  lb.style.display = 'none';
  document.body.style.overflow = '';
}

// ===============================
// VISIBILITY MANAGEMENT
// ===============================
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(rafId);
    stopSlider();
  } else {
    drawCanvas();
    startSlider();
  }
});

// ===============================
// INIT
// ===============================
window.addEventListener('resize', () => {
  resizeCanvas();
  createBlobs();
});

window.addEventListener('load', () => {
  resizeCanvas();
  createBlobs();
  drawCanvas();
  startSlider();
  applyLanguage();
});
