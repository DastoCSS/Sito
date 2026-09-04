// ==========================================================================
// DASTØ DJ - Main Script
// Gestione Tema (Giorno/Notte), Loghi Dinamici e Animazioni allo Scroll
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GESTIONE TEMA E LOGHI DINAMICI ---
    const isLightMode = document.documentElement.classList.contains('light-mode');
    
    // Seleziona tutti i loghi (Header, Footer e Sfondo Watermark)
    const logos = [
        document.getElementById('header-logo'),
        document.getElementById('footer-logo'),
        document.getElementById('watermark-logo')
    ];

    // Aggiorna le sorgenti delle immagini in base al tema
    logos.forEach(img => {
        if (!img) return;
        const lightSrc = img.getAttribute('data-light-src');
        const darkSrc = img.getAttribute('data-dark-src');
        
        if (isLightMode && lightSrc) {
            img.src = lightSrc;
        } else if (!isLightMode && darkSrc) {
            img.src = darkSrc;
        }
    });

    // --- 2. ANIMAZIONI ALLO SCROLL (Fade Up) ---
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    // Configurazione dell'Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Attiva l'animazione poco prima che l'elemento entri del tutto
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aggiunge la classe per mostrare l'elemento
                entry.target.classList.add('is-revealed');
                // Smette di osservare l'elemento una volta rivelato
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Inizia a osservare tutti gli elementi con attributo data-reveal
    revealElements.forEach(el => revealObserver.observe(el));
});
