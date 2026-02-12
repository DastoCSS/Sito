/* --- CONFIGURAZIONE CANVAS (SFONDO ANIMATO) --- */
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d', { alpha: false });
let w, h, blobs = [];

function init() {
    // Risoluzione ridotta per massimizzare la fluidità (SEO Performance)
    w = canvas.width = window.innerWidth / 4;
    h = canvas.height = window.innerHeight / 4;
    
    // Creazione dei "bulbi" Techno/Deep
    blobs = Array.from({ length: 5 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 80 + 40, 
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
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

/* --- LOGICA LIGHTBOX (REELS INSTAGRAM) --- */
function openReel(id) {
    const lb = document.getElementById('lightbox');
    const iframe = document.getElementById('lightbox-iframe');
    if (lb && iframe) {
        iframe.src = `https://www.instagram.com/reel/${id}/embed`;
        lb.style.display = 'flex';
    }
}

function closeReel() {
    const lb = document.getElementById('lightbox');
    const iframe = document.getElementById('lightbox-iframe');
    if (lb && iframe) {
        lb.style.display = 'none';
        iframe.src = '';
    }
}

/* --- CARICAMENTO MAPPA (OTTIMIZZATO SEO) --- */
function loadMap() {
    const mapContainer = document.getElementById('map-container');
    // URL Statico per Napoli / Via Salita Vetriera
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3029.358249673414!2d14.2435!3d40.8369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b08468303ef3d%3A0x6734d0b674b0!2sVia%20Salita%20Vetriera%2C%20Napoli!5e0!3m2!1sit!2sit!4v17000000000003";
    
    if (mapContainer) {
        mapContainer.innerHTML = `<iframe src="${mapUrl}" width="100%" height="450" style="border:0; border-radius:20px;" allowfullscreen="" loading="lazy"></iframe>`;
    }
}

/* --- SLIDER IMMAGINI --- */
let currentSlide = 0;
function startSlider() {
    const track = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    
    if (track && slides.length > 0) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 4500);
    }
}

/* --- INIZIALIZZAZIONE EVENTI --- */
window.addEventListener('resize', init);

// Avvio coordinato al caricamento della pagina
window.addEventListener('load', () => {
    init();
    animate();
    startSlider();
    // Ritardo di 2 secondi per la mappa per migliorare il punteggio Google PageSpeed
    setTimeout(loadMap, 2000);
});