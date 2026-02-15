/* =================================================================
   DASTO DJ - JAVASCRIPT CON CONVERSION TRACKING AVANZATO
   Basato su analisi Google Analytics reali
   ================================================================= */

// Canvas Background Animation
(function() {
    'use strict';

    const canvas = document.getElementById('canvas-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
        alpha: false,
        desynchronized: true
    });
    
    let w, h;
    let blobs = [];
    let animationId = null;

    const BLOB_CONFIG = {
        count: 5,
        minRadius: 40,
        maxRadius: 120,
        minSpeed: 0.15,
        maxSpeed: 0.3,
        colors: [
            '#0f051a',
            '#1a0033',
            '#220000',
            '#0a0a0a',
            '#001a1a'
        ]
    };

    function init() {
        resizeCanvas();
        createBlobs();
        animate();
    }

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
                vx: (Math.random() - 0.5) * (BLOB_CONFIG.maxSpeed - BLOB_CONFIG.minSpeed) + BLOB_CONFIG.minSpeed,
                vy: (Math.random() - 0.5) * (BLOB_CONFIG.maxSpeed - BLOB_CONFIG.minSpeed) + BLOB_CONFIG.minSpeed,
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

    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            createBlobs();
        }, 250);
    });

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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();


// ===================================================================
// CONVERSION TRACKING AVANZATO - Basato su Analytics Reali
// ===================================================================

(function() {
    'use strict';

    if (typeof gtag !== 'function') {
        console.warn('Google Analytics non caricato');
        return;
    }

    // Configurazione valori conversione (€ stimati per lead)
    const CONVERSION_VALUES = {
        WHATSAPP_CLICK: 20,      // Lead warm
        PHONE_CLICK: 25,         // Lead molto interessato
        LISTINO_DOWNLOAD: 15,    // Lead informativo
        PRESSKIT_DOWNLOAD: 10,   // Lead media/partnership
        FORM_SUBMIT: 30,         // Lead qualificato
        EMAIL_CLICK: 15,         // Lead standard
        REEL_PLAY: 3,           // Engagement video
        INSTAGRAM_CLICK: 2,      // Social engagement
        SOUNDCLOUD_CLICK: 2,     // Social engagement
        SCROLL_75: 1,           // Engagement profondo
        TIME_2MIN: 5            // Engagement alto
    };

    // ==================================================================
    // 1. CONVERSIONE PRINCIPALE: WhatsApp Click (PRIORITÀ MASSIMA)
    // ==================================================================
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn, a[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track come conversione primaria
            gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL', // Sostituire con ID reale
                'event_category': 'Lead',
                'event_label': 'WhatsApp Click',
                'value': CONVERSION_VALUES.WHATSAPP_CLICK,
                'currency': 'EUR'
            });

            // Track anche come evento custom per GA4
            gtag('event', 'whatsapp_click', {
                'event_category': 'Contact',
                'event_label': 'CTA Button',
                'value': CONVERSION_VALUES.WHATSAPP_CLICK
            });

            // Log per debug
            console.log('✅ Conversione WhatsApp tracciata');
        });
    });

    // ==================================================================
    // 2. DOWNLOAD LISTINO PREZZI (Lead Qualificato)
    // ==================================================================
    const listinoLinks = document.querySelectorAll('a[href*="Listino"], a[download*="Listino"], a[download*="listino"], a[href*="prezzi"]');
    
    listinoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const filename = this.getAttribute('href') || this.getAttribute('download') || 'Listino Prezzi';
            
            gtag('event', 'conversion', {
                'event_category': 'Lead',
                'event_label': 'Listino Download',
                'value': CONVERSION_VALUES.LISTINO_DOWNLOAD,
                'currency': 'EUR'
            });

            gtag('event', 'file_download', {
                'event_category': 'Downloads',
                'event_label': filename,
                'file_name': filename,
                'value': CONVERSION_VALUES.LISTINO_DOWNLOAD
            });

            console.log('✅ Download Listino Prezzi tracciato');
        });
    });

    // ==================================================================
    // 3. DOWNLOAD PRESS KIT (Media/Partnership)
    // ==================================================================
    const presskitLinks = document.querySelectorAll('a[href*="press"], a[download*="press"], a[href*="kit"]');
    
    presskitLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const filename = this.getAttribute('href') || 'Press Kit';
            
            gtag('event', 'file_download', {
                'event_category': 'Downloads',
                'event_label': 'Press Kit',
                'file_name': filename,
                'value': CONVERSION_VALUES.PRESSKIT_DOWNLOAD
            });

            console.log('✅ Download Press Kit tracciato');
        });
    });

    // ==================================================================
    // 4. CLICK TELEFONO (Chiamata Diretta)
    // ==================================================================
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            
            gtag('event', 'conversion', {
                'event_category': 'Contact',
                'event_label': 'Phone Call Click',
                'value': CONVERSION_VALUES.PHONE_CLICK,
                'currency': 'EUR'
            });

            gtag('event', 'phone_click', {
                'event_category': 'Contact',
                'event_label': phoneNumber,
                'value': CONVERSION_VALUES.PHONE_CLICK
            });

            console.log('✅ Click Telefono tracciato');
        });
    });

    // ==================================================================
    // 5. CLICK EMAIL
    // ==================================================================
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const email = this.getAttribute('href').replace('mailto:', '');
            
            gtag('event', 'email_click', {
                'event_category': 'Contact',
                'event_label': email,
                'value': CONVERSION_VALUES.EMAIL_CLICK
            });

            console.log('✅ Click Email tracciato');
        });
    });

    // ==================================================================
    // 6. SOCIAL MEDIA CLICKS (Instagram, SoundCloud)
    // ==================================================================
    const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');
    instagramLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            gtag('event', 'social_click', {
                'event_category': 'Social',
                'event_label': 'Instagram',
                'social_network': 'Instagram',
                'value': CONVERSION_VALUES.INSTAGRAM_CLICK
            });

            console.log('✅ Click Instagram tracciato');
        });
    });

    const soundcloudLinks = document.querySelectorAll('a[href*="soundcloud.com"]');
    soundcloudLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            gtag('event', 'social_click', {
                'event_category': 'Social',
                'event_label': 'SoundCloud',
                'social_network': 'SoundCloud',
                'value': CONVERSION_VALUES.SOUNDCLOUD_CLICK
            });

            console.log('✅ Click SoundCloud tracciato');
        });
    });

    // ==================================================================
    // 7. VIDEO/REEL PLAY (Engagement Alto)
    // ==================================================================
    const reelLinks = document.querySelectorAll('.item.reel a, a[href*="instagram.com/reel"]');
    
    reelLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const reelUrl = this.getAttribute('href');
            
            gtag('event', 'video_play', {
                'event_category': 'Engagement',
                'event_label': 'Instagram Reel',
                'video_url': reelUrl,
                'value': CONVERSION_VALUES.REEL_PLAY
            });

            console.log('✅ Play Reel tracciato');
        });
    });

    // ==================================================================
    // 8. SCROLL DEPTH TRACKING (Engagement)
    // ==================================================================
    let scrollTracked = {
        '25': false,
        '50': false,
        '75': false,
        '100': false
    };

    window.addEventListener('scroll', throttle(function() {
        const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
        
        Object.keys(scrollTracked).forEach(threshold => {
            if (scrollPercent >= threshold && !scrollTracked[threshold]) {
                scrollTracked[threshold] = true;
                
                gtag('event', 'scroll', {
                    'event_category': 'Engagement',
                    'event_label': `${threshold}% Scrolled`,
                    'value': threshold === '75' ? CONVERSION_VALUES.SCROLL_75 : 0
                });

                // Micro-conversione a 75%
                if (threshold === '75') {
                    gtag('event', 'high_engagement', {
                        'event_category': 'Engagement',
                        'event_label': 'Deep Scroll',
                        'value': CONVERSION_VALUES.SCROLL_75
                    });
                }

                console.log(`📊 Scroll ${threshold}% tracciato`);
            }
        });
    }, 500));

    // ==================================================================
    // 9. TIME ON SITE TRACKING (Engagement)
    // ==================================================================
    let timeTracked = {
        '30': false,
        '60': false,
        '120': false,
        '180': false
    };

    Object.keys(timeTracked).forEach(seconds => {
        setTimeout(() => {
            if (!timeTracked[seconds]) {
                timeTracked[seconds] = true;
                
                gtag('event', 'time_on_site', {
                    'event_category': 'Engagement',
                    'event_label': `${seconds}s on site`,
                    'value': seconds >= 120 ? CONVERSION_VALUES.TIME_2MIN : 0
                });

                // Micro-conversione a 2 minuti
                if (seconds >= 120) {
                    gtag('event', 'high_engagement', {
                        'event_category': 'Engagement',
                        'event_label': 'Long Visit',
                        'value': CONVERSION_VALUES.TIME_2MIN
                    });

                    console.log('✅ Utente engaged (2+ min)');
                }
            }
        }, seconds * 1000);
    });

    // ==================================================================
    // 10. FORM SUBMIT (se presente nel futuro)
    // ==================================================================
    const contactForms = document.querySelectorAll('form[id*="contact"], form[class*="contact"]');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            gtag('event', 'conversion', {
                'event_category': 'Lead',
                'event_label': 'Form Submit',
                'value': CONVERSION_VALUES.FORM_SUBMIT,
                'currency': 'EUR'
            });

            gtag('event', 'generate_lead', {
                'event_category': 'Lead',
                'event_label': 'Contact Form',
                'value': CONVERSION_VALUES.FORM_SUBMIT
            });

            console.log('✅ Form Submit tracciato');
        });
    });

    // ==================================================================
    // 11. OUTBOUND LINK TRACKING
    // ==================================================================
    const outboundLinks = document.querySelectorAll('a[href^="http"]');
    
    outboundLinks.forEach(link => {
        // Skip se è link interno
        if (link.hostname === window.location.hostname) return;
        
        link.addEventListener('click', function(e) {
            const url = this.getAttribute('href');
            
            gtag('event', 'click', {
                'event_category': 'Outbound Link',
                'event_label': url,
                'outbound': true
            });
        });
    });

    // ==================================================================
    // 12. ERROR TRACKING (404, JS Errors)
    // ==================================================================
    window.addEventListener('error', function(e) {
        gtag('event', 'exception', {
            'description': e.message,
            'fatal': false
        });
        
        console.error('❌ Errore JS:', e.message);
    });

    // ==================================================================
    // 13. PERFORMANCE METRICS
    // ==================================================================
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (window.performance && window.performance.timing) {
                const timing = window.performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                
                gtag('event', 'timing_complete', {
                    'name': 'load',
                    'value': loadTime,
                    'event_category': 'Performance'
                });

                console.log(`⚡ Page Load Time: ${loadTime}ms`);
            }
        }, 0);
    });

    // ==================================================================
    // UTILITY FUNCTIONS
    // ==================================================================

    // Throttle function per eventi frequenti (scroll, resize)
    function throttle(func, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                return func(...args);
            }
        };
    }

    // Debounce function
    function debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    console.log('✅ Advanced Conversion Tracking inizializzato');

})();


// ===================================================================
// USER BEHAVIOR ANALYTICS
// ===================================================================

(function() {
    'use strict';

    // Track rage clicks (user frustration)
    let clickCount = 0;
    let clickTimer = null;
    
    document.addEventListener('click', function(e) {
        clickCount++;
        
        if (clickTimer) clearTimeout(clickTimer);
        
        if (clickCount >= 3) {
            if (typeof gtag === 'function') {
                gtag('event', 'rage_click', {
                    'event_category': 'User Behavior',
                    'event_label': e.target.tagName + (e.target.className ? '.' + e.target.className : ''),
                    'non_interaction': true
                });
            }
            console.warn('⚠️ Rage click detected');
            clickCount = 0;
        }
        
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 1000);
    });

    // Track dead clicks (clicks on non-interactive elements)
    document.addEventListener('click', function(e) {
        const target = e.target;
        const isInteractive = target.tagName === 'A' || 
                             target.tagName === 'BUTTON' || 
                             target.tagName === 'INPUT' ||
                             target.onclick ||
                             target.hasAttribute('role') && ['button', 'link'].includes(target.getAttribute('role'));
        
        if (!isInteractive && typeof gtag === 'function') {
            gtag('event', 'dead_click', {
                'event_category': 'User Behavior',
                'event_label': target.tagName + (target.className ? '.' + target.className : ''),
                'non_interaction': true
            });
        }
    });

})();


// ===================================================================
// SMOOTH SCROLL
// ===================================================================

(function() {
    'use strict';

    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (!href || href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });

})();


// ===================================================================
// LAZY LOADING FALLBACK
// ===================================================================

(function() {
    'use strict';

    if ('loading' in HTMLImageElement.prototype) return;

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
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }

})();


// ===================================================================
// DEBUG MODE (solo in development)
// ===================================================================

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%c🎵 DASTO DJ Website - Debug Mode', 'color: #25d366; font-size: 16px; font-weight: bold');
    console.log('%c📊 Tracking Events:', 'color: #25d366; font-weight: bold');
    console.log('- WhatsApp clicks');
    console.log('- File downloads');
    console.log('- Social clicks');
    console.log('- Video plays');
    console.log('- Scroll depth');
    console.log('- Time on site');
    console.log('- User behavior');
}


// ===================================================================
// EXPORT (per testing)
// ===================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Export functions if needed for testing
    };
}