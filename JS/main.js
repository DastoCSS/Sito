const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d', { alpha: false });
let w, h, blobs = [];

function init() {
    w = canvas.width = window.innerWidth / 4;
    h = canvas.height = window.innerHeight / 4;
    
    // Creazione dei "bulbi"
    blobs = Array.from({ length: 5 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 80 + 40, // Bulbi belli grandi
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        // Colori Techno/Deep
        c: ['#0f051a', '#220000', '#0a0a0a', '#1a0033'][Math.floor(Math.random() * 4)]
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

// Lightbox & Map logic
function openReel(id) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lightbox-iframe').src = `https://www.instagram.com/reel/${id}/embed`;
    lb.style.display = 'flex';
}

function closeReel() {
    document.getElementById('lightbox').style.display = 'none';
    document.getElementById('lightbox-iframe').src = '';
}

// main.js - Versione Fix Mappa e Performance
function loadMap() {
    const mapContainer = document.getElementById('map-container');
    // URL pulito per Napoli Centro / Via Salita Vetriera
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3029.3364964646!2d14.2415!3d40.837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b084606138d6b%3A0x633d790f97063f10!2sVia%20Salita%20Vetriera%2C%20Napoli!5e0!3m2!1sit!2sit!4v1700000000000";
    
    mapContainer.innerHTML = `<iframe src="${mapUrl}" width="100%" height="100%" style="border:0; border-radius:20px;" allowfullscreen="" loading="lazy"></iframe>`;
}

// Avvia il caricamento della mappa dopo 2 secondi per non rallentare il sito (SEO Speed)
setTimeout(loadMap, 2000);

// Slider
let currentSlide = 0;
setInterval(() => {
    const track = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    if(track && slides.length) {
        currentSlide = (currentSlide + 1) % slides.length;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}, 4500);

window.addEventListener('resize', init);
init();
animate();
