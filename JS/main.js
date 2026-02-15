/* =================================================================
   DASTO DJ - JAVASCRIPT OTTIMIZZATO
   ================================================================= */

// Canvas Background Animation
(function() {
    'use strict';

    const canvas = document.getElementById('canvas-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
        alpha: false,
        desynchronized: true // Migliora performance su alcuni browser
    });
    
    let w, h;
    let blobs = [];
    let animationId = null;

    // Configurazione blob
    const BLOB_CONFIG = {
        count: 5,
        minRadius: 40,
        maxRadius: 120,
        minSpeed: 0.15,
        maxSpeed: 0.3,
        colors: [
            '#0f051a', // Viola scuro
            '#1a0033', // Viola medio
            '#220000', // Rosso scuro
            '#0a0a0a', // Nero
            '#001a1a'  // Verde scuro
        ]
    };

    // Inizializza canvas e blobs
    function init() {
        resizeCanvas();
        createBlobs();
        animate();
    }

    // Ridimensiona canvas
    function resizeCanvas() {
        // Riduciamo la risoluzione per migliori performance
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = canvas.width = window.innerWidth / 3 * dpr;
        h = canvas.height = window.innerHeight / 3 * dpr;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
    }

    // Crea blobs con posizioni e velocità casuali
    function createBlobs() {
        blobs = [];
        for (let i = 0; i < BLOB_CONFIG.count; i++) {
            blobs.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: BLOB_CONFIG.minRadius + Math.random() * (BLOB_CONFIG.maxRadius - BLOB_CONFIG.minRadius),
                vx: (Math.random() - 0.5) * (BLOB_CONFIG.maxSpeed - BLOB_CONFIG.minSpeed) + BLOB_CONFIG.minSpeed,
                vy: (Math.random() - 0.5) * (BLOB_CONFIG.maxSpeed - BLOB_CONFIG.minSpeed) + BLOB_CONFIG.minSpeed,
                color: BLOB_CONFIG.colors[Math.floor(Math.random() * BLOB_CONFIG.colors.length)]
            });
        }
    }

    // Loop di animazione
    function animate() {
        // Background
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, w, h);

        // Disegna e muovi blobs
        blobs.forEach(blob => {
            // Aggiorna posizione
            blob.x += blob.vx;
            blob.y += blob.vy;

            // Rimbalza sui bordi
            if (blob.x - blob.r < 0 || blob.x + blob.r > w) {
                blob.vx *= -1;
                blob.x = Math.max(blob.r, Math.min(blob.x, w - blob.r));
            }
            if (blob.y - blob.r < 0 || blob.y + blob.r > h) {
                blob.vy *= -1;
                blob.y = Math.max(blob.r, Math.min(blob.y, h - blob.r));
            }

            // Disegna blob
            ctx.beginPath();
            ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
            ctx.fillStyle = blob.color;
            ctx.fill();
        });

        animationId = requestAnimationFrame(animate);
    }

    // Handle resize con debounce
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            createBlobs();
        }, 250);
    });

    // Pausa animazione quando tab non è visibile (risparmio risorse)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        } else {
            if (!animationId) {
                animate();
            }
        }
    });

    // Inizializza quando DOM è pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();


// Smooth Scroll per link interni
(function() {
    'use strict';

    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignora link vuoti o solo #
            if (!href || href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Aggiorna URL senza reload
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });

})();


// Lazy Loading per immagini (fallback se non supportato nativamente)
(function() {
    'use strict';

    if ('loading' in HTMLImageElement.prototype) {
        // Il browser supporta lazy loading nativo
        return;
    }

    // Fallback con Intersection Observer
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback per browser molto vecchi - carica tutte le immagini
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }

})();


// Analytics Eventi (tracciamento interazioni)
(function() {
    'use strict';

    // Verifica che gtag sia disponibile
    if (typeof gtag !== 'function') return;

    // Traccia click sui social link
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.href.includes('instagram') ? 'Instagram' : 'SoundCloud';
            gtag('event', 'click', {
                'event_category': 'Social',
                'event_label': platform
            });
        });
    });

    // Traccia click su WhatsApp
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            gtag('event', 'click', {
                'event_category': 'Contact',
                'event_label': 'WhatsApp CTA'
            });
        });
    }

    // Traccia download PDF
    const pdfLinks = document.querySelectorAll('a[download]');
    pdfLinks.forEach(link => {
        link.addEventListener('click', function() {
            const fileName = this.getAttribute('href').split('/').pop();
            gtag('event', 'download', {
                'event_category': 'PDF',
                'event_label': fileName
            });
        });
    });

    // Traccia play video/reel
    const reelLinks = document.querySelectorAll('.item.reel a');
    reelLinks.forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'click', {
                'event_category': 'Video',
                'event_label': 'Reel Play'
            });
        });
    });

})();


// Gestione form di contatto (se presente in futuro)
(function() {
    'use strict';

    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validazione base
        const email = this.querySelector('input[type="email"]');
        const message = this.querySelector('textarea');
        
        if (!email.value || !message.value) {
            alert('Compila tutti i campi richiesti');
            return;
        }

        // Invio form (implementare backend)
        console.log('Form submitted', {
            email: email.value,
            message: message.value
        });

        // Feedback utente
        alert('Messaggio inviato! Ti risponderemo al più presto.');
        this.reset();
    });

})();


// Performance: Preload immagini critiche al hover
(function() {
    'use strict';

    const reelItems = document.querySelectorAll('.item.reel');
    
    reelItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img && !img.complete) {
                // Forza caricamento se non ancora completato
                const tempImg = new Image();
                tempImg.src = img.src;
            }
        }, { once: true });
    });

})();


// Accessibilità: Focus trap per modal (se implementato)
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }

        // ESC per chiudere
        if (e.key === 'Escape') {
            element.style.display = 'none';
            // Restore focus to trigger element
        }
    });
}


// Utility: Detect se utente è su mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}


// Ottimizzazione scroll performance
(function() {
    'use strict';

    let ticking = false;
    const rightColumn = document.querySelector('.right');
    
    if (!rightColumn) return;

    rightColumn.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Aggiungi effetti scroll-based qui se necessario
                ticking = false;
            });
            ticking = true;
        }
    });

})();


// Cookie Consent (se necessario per GDPR)
(function() {
    'use strict';

    // Verifica se il consenso è già stato dato
    if (localStorage.getItem('cookieConsent')) return;

    // Crea banner (implementare HTML/CSS)
    // Questo è solo un esempio base
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <p>Questo sito utilizza cookie per migliorare l'esperienza utente.</p>
        <button id="acceptCookies">Accetta</button>
    `;
    
    // Aggiungi stili inline se non presenti nel CSS
    banner.style.cssText = 'position:fixed;bottom:20px;left:20px;right:20px;background:rgba(0,0,0,0.9);padding:20px;border-radius:10px;z-index:9999;display:flex;justify-content:space-between;align-items:center;';
    
    // document.body.appendChild(banner);

    // Handle accept
    const acceptBtn = document.getElementById('acceptCookies');
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'true');
            banner.remove();
        });
    }

})();


// Log per debug (rimuovere in produzione)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🎵 DASTO DJ Website - Dev Mode');
    console.log('Performance metrics available in DevTools');
}


// Export per testing (se necessario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isMobile,
        trapFocus
    };
}