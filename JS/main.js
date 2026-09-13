/* ============================================
   DASTO DJ — main.js  (aggiornato 2026)
   Scroll reveal · Nav · Counter · Vinyl pause
   + Download button per il Manuale DJ
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. NAV SCROLL EFFECT
  ───────────────────────────────────────── */
  const nav = document.getElementById('nav');

  const updateNav = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();


  /* ─────────────────────────────────────────
     2. SCROLL REVEAL
  ───────────────────────────────────────── */
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


  /* ─────────────────────────────────────────
     3. ANIMATED COUNTER (stats)
  ───────────────────────────────────────── */
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


  /* ─────────────────────────────────────────
     4. VINYL — PAUSA SU HOVER
  ───────────────────────────────────────── */
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


  /* ─────────────────────────────────────────
     5. HERO TITLE — STAGGER ANIMATO
  ───────────────────────────────────────── */
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


  /* ─────────────────────────────────────────
     6. ZONE TAG — RIPPLE AL CLICK
  ───────────────────────────────────────── */
  document.querySelectorAll('.zones-list span').forEach(span => {
    span.addEventListener('click', () => {
      span.style.background = 'rgba(37,211,102,0.3)';
      setTimeout(() => (span.style.background = ''), 300);
    });
  });


  /* ─────────────────────────────────────────
     7. DOWNLOAD BUTTON — Manuale DJ/Produzione
        Inserisci il pulsante ovunque nel HTML:
        <button id="downloadManuale">↓ Scarica il Manuale</button>
        oppure aggiungilo dinamicamente qui sotto.
  ───────────────────────────────────────── */

  /**
   * Crea e inietta il pulsante di download se non esiste già nell'HTML.
   * Se preferisci metterlo tu nell'HTML con id="downloadManuale",
   * questo blocco lo trova e gli aggiunge solo il listener.
   */
  const injectDownloadBtn = () => {
    // Cerca un pulsante già presente nel markup
    let btn = document.getElementById('downloadManuale');

    // Se non c'è, crealo e appendilo alla sezione finale-cta
    if (!btn) {
      btn = document.createElement('a');
      btn.id        = 'downloadManuale';
      btn.className = 'cta-secondary download-btn';
      btn.innerHTML = '📄 Scarica il Manuale DJ';

      // Stile extra inline (o usa la classe CSS qui sotto)
      Object.assign(btn.style, {
        marginTop    : '16px',
        display      : 'inline-flex',
        alignItems   : 'center',
        gap          : '8px',
        cursor       : 'pointer'
      });

      // Inseriscilo dopo la hero-actions oppure nel footer — scegli tu
      const heroActions = document.querySelector('.hero-actions');
      if (heroActions) heroActions.after(btn);
    }

    /**
     * ─── COME USARLO ────────────────────────────────────────
     * OPZIONE A — link diretto al file (consigliato):
     *   Carica il PDF sul server (es. /files/Manuale_DJ.pdf)
     *   e imposta href + download come segue.
     *
     * OPZIONE B — blob generato lato client (se il file è
     *   già disponibile come ArrayBuffer/Base64 in memoria).
     * ────────────────────────────────────────────────────────
     */

    // ── OPZIONE A (modifica il path se necessario) ──
    btn.href     = '/files/Lezioni_Produzione_e_DJ.pdf'; // ← aggiorna il percorso
    btn.download = 'Manuale_DJ_Produzione_DASTO.pdf';
    btn.target   = '_blank';
    btn.rel      = 'noopener noreferrer';

    // Feedback visivo al click
    btn.addEventListener('click', () => {
      const original = btn.innerHTML;
      btn.innerHTML  = '✓ Download avviato!';
      btn.style.color = 'var(--green)';
      setTimeout(() => {
        btn.innerHTML   = original;
        btn.style.color = '';
      }, 2500);
    });
  };

  injectDownloadBtn();

}); // fine DOMContentLoaded
