const canvas = document.getElementById('canvas-bg');const ctx = canvas.getContext('2d', { alpha: false });
let w, h, blobs = [];

function init() {    w = canvas.width = window.innerWidth / 4;
   h = canvas.height = window.innerHeight / 4;
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
        if (b.x < 0 || b.x > w) b.vx *= -1;        if (b.y < 0 || b.y > h) b.vy *= -1;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.c;
        ctx.fill();
    });
    requestAnimationFrame(animate);
}

   const iframe = document.getElementById('lightbox-iframe');
    const lightbox = document.getElementById('lightbox');
    if(iframe && lightbox) {
        iframe.src = `https://www.instagram.com/reel/${id}/embed`;
        lightbox.style.display = 'flex';
    }


function closeReel() {    const iframe = document.getElementById('lightbox-iframe');
    const lightbox = document.getElementById('lightbox');
    if(iframe && lightbox) {
        lightbox.style.display = 'none';
        iframe.src = '';
    }
}window.addEventListener('load', () => {
    init();});