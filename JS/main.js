// 1. OTTIMIZZAZIONE CANVAS (Risoluzione ridotta per velocità)
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d', { alpha: false });
let w, h, blobs = [];

function initCanvas() {
    w = canvas.width = window.innerWidth / 4; // Risoluzione 1/4 per fluidità
    h = canvas.height = window.innerHeight / 4;
    blobs = Array.from({ length: 4 }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 50 + 20,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        c: ['#0a0a0a', '#1a0033', '#440011'][Math.floor(Math.random() * 3)]
    }));
}

function animate() {
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, w, h);
    blobs.forEach(b => {
        b.x += b.vx; b.y += b.vy;
        if (b.x < 0 || b.x > w) b.vx *= -1;
        if (b.y < 0 || b.y > h) b.vy *= -1;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.c;
        ctx.fill();
    });
    requestAnimationFrame(animate);
}

// 2. GESTIONE REELS (On-Demand)
function openReel(id) {
    const lb = document.getElementById('lightbox');
    const iframe = document.getElementById('lightbox-iframe');
    iframe.src = `https://www.instagram.com/reel/${id}/embed`;
    lb.style.display = 'flex';
}

function closeReel() {
    const lb = document.getElementById('lightbox');
    document.getElementById('lightbox-iframe').src = '';
    lb.style.display = 'none';
}

// 3. CARICAMENTO MAPPA (On-Demand)
function loadMap() {
    const container = document.getElementById('map-container');
    container.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193123.456!2d14.2681!3d40.8518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b08401f3ad57d%3A0x6d02a4fc4163c4a2!2sNapoli%20NA!5e0!3m2!1sit!2sit!4v1710000000000" width="100%" height="100%" style="border:0; border-radius:20px;" allowfullscreen="" loading="lazy"></iframe>`;
}

// 4. SLIDER SEMPLICE
let currentSlide = 0;
setInterval(() => {
    const track = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    if(track) {
        currentSlide = (currentSlide + 1) % slides.length;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}, 4000);

// Startup
window.addEventListener('resize', initCanvas);
initCanvas();
animate();