/* =================================================================
   DASTO DJ - JAVASCRIPT OTTIMIZZATO
   Tracking pulito + Performance + UX
   ================================================================= */

'use strict';

// ===================================================================
// 1. CANVAS BACKGROUND ANIMATO
// ===================================================================
(function () {
    const canvas = document.getElementById('canvas-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    let w, h, blobs = [], animationId = null;

    const BLOB_CONFIG = {
        count: 5,
        minRadius: 40,
        maxRadius: 120,
        minSpeed: 0.15,
        maxSpeed: 0.3,
        colors: ['#0f051a', '#1a0033', '#220000', '#0a0a0a', '#001a1a']
    };

    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = canvas.width = window.innerWidth / 3 * dpr;
        h = canvas.height = window.innerHeight / 3 * dpr;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
    }

    function createBlobs() {
        blobs = [];
        for (let i = 0; i < BLOB_CONFIG.count; i++) {
            blobs.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: BLOB_CONFIG.minRadius + Math.random() * (BLOB_CONFIG.maxRadius - BLOB_CONFIG.minRadius),
                vx: (Math.random() - 0.5) * BLOB_CONFIG.maxSpeed + BLOB_CONFIG.minSpeed,
                vy: (Math.random() - 0.5) * BLOB_CONFIG.maxSpeed + BLOB_CONFIG.minSpeed,
                color: BLOB_CONFIG.colors[Math.floor(Math.random() * BLOB_CONFIG.colors.length)]
            });
        }
    }

    function animate() {
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, w, h);

        blobs.forEach(blob => {
            blob.x += blob.vx;
            blob.y += blob.vy;

            if (blob.x - blob.r < 0 || blob.x + blob.r > w) {
                blob.vx *= -1;
                blob.x = Math.max(blob.r, Math.min(blob.x, w - blob.r));
            }
            if (blob.y - blob.r < 0 || blob.y + blob.r > h) {
                blob.vy *= -1;
                blob.y = Math.max(blob.r, Math.min(blob.y, h - blob.r));
            }

            ctx.beginPath();
            ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
            ctx.fillStyle = blob.color;
            ctx.fill();
        });

        animationId = requestAnimationFrame(animate);
    }

    function init() {
        resizeCanvas();
        createBlobs();
        animate();
    }

    // Pausa quando la tab non è visibile (risparmio CPU)
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
        } else {
            if (!animationId) animate();
        }
    });

    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { resizeCanvas(); createBlobs(); }, 250);
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


// ===================================================================
// 2. CONVERSION TRACKING — GA4
// ===================================================================
(function () {
    if (typeof gtag !== 'function') return;

    // Valori lead stimati in euro
    const VALUE = {
        WHATSAPP: 20,
        PHONE:    25,
        LISTINO:  15,
        PRESSKIT: 10,
        SOCIAL:    2,
        REEL:      3,
        SCROLL75:  1,
        TIME2MIN:  5
    };

    // Helper: traccia evento una sola volta per elemento
    function trackOnce(element, eventName, params) {
        if (element._tracked && element._tracked[eventName]) return;
        if (!element._tracked) element._tracked = {};
        element._tracked[eventName] = true;
        gtag('event', eventName, params);
    }

    // --- WhatsApp (conversione primaria) ---
    document.querySelectorAll('.whatsapp-btn, a[href*="wa.me"]').forEach(el => {
        el.addEventListener('click', function () {
            gtag('event', 'whatsapp_click', {
                event_category: 'Contact',
                event_label: 'CTA Button',
                value: VALUE.WHATSAPP,
                currency: 'EUR'
            });
        });
    });

    // --- Click telefono ---
    document.querySelectorAll('a[href^="tel:"]').forEach(el => {
        el.addEventListener('click', function () {
            gtag('event', 'phone_click', {
                event_category: 'Contact',
                event_label: this.getAttribute('href').replace('tel:', ''),
                value: VALUE.PHONE,
                currency: 'EUR'
            });
        });
    });

    // --- Download Listino Prezzi ---
    document.querySelectorAll('a[href*="Listino"], a[href*="listino"], a[href*="prezzi"]').forEach(el => {
        el.addEventListener('click', function () {
            gtag('event', 'file_download', {
                event_category: 'Downloads',
                event_label: 'Listino Prezzi 2026',
                value: VALUE.LISTINO
            });
        });
    });

    // --- Download Press Kit ---
    document.querySelectorAll('a[href*="press"], a[href*="kit"]').forEach(el => {
        el.addEventListener('click', function () {
            gtag('event', 'file_download', {
                event_category: 'Downloads',
                event_label: 'Press Kit',
                value: VALUE.PRESSKIT
            });
        });
    });

    // --- Click Instagram ---
    document.querySelectorAll('a[href*="instagram.com"]').forEach(el => {
        el.addEventListener('click', function () {
            gtag('event', 'social_click', {
                event_category: 'Social',
                social_network: 'Instagram',
                value: VALUE.SOCIAL
            });
        });
    });

    // --- Click SoundCloud ---
    document.querySelectorAll('a[href*="soundcloud.com"]').forEach(el => {
        el.addEventListener('click', function () {
            gtag('event', 'social_click', {
                event_category: 'Social',
                social_network: 'SoundCloud',
                value: VALUE.SOCIAL
            });
        });
    });

    // --- Click Reels Instagram ---
    document.querySelectorAll('a[href*="instagram.com/reel"]').forEach(el => {
        el.addEventListener('click', function () {
            gtag('event', 'video_play', {
                event_category: 'Engagement',
                event_label: 'Instagram Reel',
                video_url: this.getAttribute('href'),
                value: VALUE.REEL
            });
        });
    });

    // --- Scroll Depth (25 / 50 / 75 / 100%) ---
    const scrollMilestones = { 25: false, 50: false, 75: false, 100: false };

    window.addEventListener('scroll', throttle(function () {
        const pct = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);

        Object.keys(scrollMilestones).forEach(threshold => {
            if (pct >= threshold && !scrollMilestones[threshold]) {
                scrollMilestones[threshold] = true;
                gtag('event', 'scroll_depth', {
                    event_category: 'Engagement',
                    event_label: threshold + '%',
                    value: threshold === '75' ? VALUE.SCROLL75 : 0
                });

                if (threshold === '75') {
                    gtag('event', 'high_engagement', {
                        event_category: 'Engagement',
                        event_label: 'Deep Scroll 75%'
                    });
                }
            }
        });
    }, 600));

    // --- Time on Site (30s / 60s / 120s) ---
    [30, 60, 120].forEach(seconds => {
        setTimeout(() => {
            gtag('event', 'time_on_site', {
                event_category: 'Engagement',
                event_label: seconds + 's',
                value: seconds >= 120 ? VALUE.TIME2MIN : 0
            });

            if (seconds >= 120) {
                gtag('event', 'high_engagement', {
                    event_category: 'Engagement',
                    event_label: 'Long Visit 2min+'
                });
            }
        }, seconds * 1000);
    });

    // --- Page Load Performance ---
    window.addEventListener('load', function () {
        setTimeout(() => {
            const nav = performance.getEntriesByType('navigation')[0];
            if (nav) {
                gtag('event', 'timing_complete', {
                    name: 'load',
                    value: Math.round(nav.loadEventEnd - nav.startTime),
                    event_category: 'Performance'
                });
            }
        }, 100);
    });

    // --- JS Error Tracking ---
    window.addEventListener('error', function (e) {
        gtag('event', 'exception', {
            description: e.message + ' @ ' + e.filename + ':' + e.lineno,
            fatal: false
        });
    });

})();


// ===================================================================
// 3. SMOOTH SCROLL PER ANCORE INTERNE
// ===================================================================
(function () {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (history.pushState) history.pushState(null, null, href);
            }
        });
    });
})();


// ===================================================================
// 4. LAZY LOADING FALLBACK (browser vecchi)
// ===================================================================
(function () {
    if ('loading' in HTMLImageElement.prototype) return;

    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => obs.observe(img));
    }
})();


// ===================================================================
// 5. UTILITY FUNCTIONS
// ===================================================================
function throttle(fn, delay) {
    let last = 0;
    return function (...args) {
        const now = Date.now();
        if (now - last >= delay) {
            last = now;
            return fn.apply(this, args);
        }
    };
}