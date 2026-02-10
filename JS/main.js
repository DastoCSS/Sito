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

function loadMap() {
    document.getElementById('map-container').innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=YOUR_MAP_ID" width="100%" height="100%" style="border:0; border-radius:20px;" allowfullscreen="" loading="lazy"></iframe>`;
}

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