/* ============================================
   DASTO DJ â€” main.js  (aggiornato 2026)
   Scroll reveal Â· Nav Â· Counter Â· Vinyl pause
   + Download button per il Manuale DJ
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     1. NAV SCROLL EFFECT
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const nav = document.getElementById('nav');

  const updateNav = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();


  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     2. SCROLL REVEAL
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // Stagger sulle card servizi
  document.querySelectorAll('.service-grid .card').forEach((el, i) => {
    el.dataset.delay = i * 100;
  });

  // Stagger sulle review card
  document.querySelectorAll('.reviews-grid .review-card').forEach((el, i) => {
    el.dataset.delay = i * 100;
  });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));


  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     3. ANIMATED COUNTER (stats)
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const countUp = (el, target, duration = 1800) => {
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 4); // ease-out quart
      el.textContent = Math.floor(eased * target);
      progress < 1 ? requestAnimationFrame(update) : (el.textContent = target);
    };
    requestAnimationFrame(update);
  };

  const statsSection = document.querySelector('.stats');
  let counted = false;

  if (statsSection) {
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll('.stat[data-count]').forEach(stat => {
          countUp(stat.querySelector('.stat-num'), parseInt(stat.dataset.count));
        });
      }
    }, { threshold: 0.5 }).observe(statsSection);
  }


  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     4. VINYL â€” PAUSA SU HOVER
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const vinyl      = document.querySelector('.vinyl');
  const vinylInner = document.querySelector('.vinyl-inner');

  if (vinyl) {
    const setPause = (state) => {
      vinyl.style.animationPlayState      = state;
      if (vinylInner) vinylInner.style.animationPlayState = state;
    };
    vinyl.addEventListener('mouseenter', () => setPause('paused'));
    vinyl.addEventListener('mouseleave', () => setPause('running'));
  }


  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     5. HERO TITLE â€” STAGGER ANIMATO
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  document.querySelectorAll('.hero-title .line').forEach((line, i) => {
    Object.assign(line.style, {
      opacity    : '0',
      transform  : 'translateY(20px)',
      transition : `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s`
    });
    setTimeout(() => {
      line.style.opacity   = '1';
      line.style.transform = 'translateY(0)';
    }, 100);
  });


  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     6. ZONE TAG â€” RIPPLE AL CLICK
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  document.querySelectorAll('.zones-list span').forEach(span => {
    span.addEventListener('click', () => {
      span.style.background = 'rgba(37,211,102,0.3)';
      setTimeout(() => (span.style.background = ''), 300);
    });
  });


  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     7. DOWNLOAD BUTTON â€” Manuale DJ/Produzione
        Inserisci il pulsante ovunque nel HTML:
        <button id="downloadManuale">â†“ Scarica il Manuale</button>
        oppure aggiungilo dinamicamente qui sotto.
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

  /**
   * Crea e inietta il pulsante di download se non esiste giÃ  nell'HTML.
   * Se preferisci metterlo tu nell'HTML con id="downloadManuale",
   * questo blocco lo trova e gli aggiunge solo il listener.
   */
  const injectDownloadBtn = () => {
    // Cerca un pulsante giÃ  presente nel markup
    let btn = document.getElementById('downloadManuale');

    // Se non c'Ã¨, crealo e appendilo alla sezione finale-cta
    if (!btn) {
      btn = document.createElement('a');
      btn.id        = 'downloadManuale';
      btn.className = 'cta-secondary download-btn';
      btn.innerHTML = 'ðŸ“„ Scarica il Manuale DJ';

      // Stile extra inline (o usa la classe CSS qui sotto)
      Object.assign(btn.style, {
        marginTop    : '16px',
        display      : 'inline-flex',
        alignItems   : 'center',
        gap          : '8px',
        cursor       : 'pointer'
      });

      // Inseriscilo dopo la hero-actions oppure nel footer â€” scegli tu
      const heroActions = document.querySelector('.hero-actions');
      if (heroActions) heroActions.after(btn);
    }

    /**
     * â”€â”€â”€ COME USARLO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     * OPZIONE A â€” link diretto al file (consigliato):
     *   Carica il PDF sul server (es. /files/Manuale_DJ.pdf)
     *   e imposta href + download come segue.
     *
     * OPZIONE B â€” blob generato lato client (se il file Ã¨
     *   giÃ  disponibile come ArrayBuffer/Base64 in memoria).
     * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     */

    // â”€â”€ OPZIONE A (modifica il path se necessario) â”€â”€
    btn.href     = '/files/Lezioni_Produzione_e_DJ.pdf'; // â† aggiorna il percorso
    btn.download = 'Manuale_DJ_Produzione_DASTO.pdf';
    btn.target   = '_blank';
    btn.rel      = 'noopener noreferrer';

    // Feedback visivo al click
    btn.addEventListener('click', () => {
      const original = btn.innerHTML;
      btn.innerHTML  = 'âœ“ Download avviato!';
      btn.style.color = 'var(--green)';
      setTimeout(() => {
        btn.innerHTML   = original;
        btn.style.color = '';
      }, 2500);
    });
  };

  injectDownloadBtn();

}); // fine DOMContentLoaded
