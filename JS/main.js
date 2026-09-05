// ==========================================================================
// DASTØ DJ - Modern Main Script (Glow Effect & Scroll Reveal)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. MOUSE MOVE EFFECT SULLE CARTE (Neon Glow interattivo) ---
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 2. SCROLL REVEAL (Animazioni eleganti allo scorrimento) ---
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target); // Ferma l'osservazione una volta animato
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
});
