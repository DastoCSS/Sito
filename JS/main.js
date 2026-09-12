/* ============================================
   DASTO DJ — main.js (aggiornato 2026)
   Scroll reveal · Nav · Counter · Download PDF
   Percorsi da Scrivania Locale
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAV SCROLL EFFECT ── */
  const nav = document.getElementById('nav');
  const updateNav = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();


  /* ── 2. SCROLL REVEAL ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay, 10) || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.service-grid .card').forEach((el, i) => {
    el.dataset.delay = i * 100;
  });

  document.querySelectorAll('.reviews-grid .review-card').forEach((el, i) => {
    el.dataset.delay = i * 100;
  });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));


  /* ── 3. ANIMATED COUNTER (stats) ── */
  const countUp = (el, target, duration = 1800) => {
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
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
          const numEl = stat.querySelector('.stat-num');
          if (numEl) countUp(numEl, parseInt(stat.dataset.count, 10));
        });
      }
    }, { threshold: 0.5 }).observe(statsSection);
  }


  /* ── 4. VINYL — PAUSA SU HOVER ── */
  const vinyl = document.querySelector('.vinyl');
  const vinylInner = document.querySelector('.vinyl-inner');

  if (vinyl) {
    const setPause = (state) => {
      vinyl.style.animationPlayState = state;
      if (vinylInner) vinylInner.style.animationPlayState = state;
    };
    vinyl.addEventListener('mouseenter', () => setPause('paused'));
    vinyl.addEventListener('mouseleave', () => setPause('running'));
  }


  /* ── 5. HERO TITLE — STAGGER ANIMATO ── */
  document.querySelectorAll('.hero-title .line').forEach((line, i) => {
    Object.assign(line.style, {
      opacity: '0',
      transform: 'translateY(20px)',
      transition: `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s`
    });
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 100);
  });


  /* ── 6. ZONE TAG — RIPPLE AL CLICK ── */
  document.querySelectorAll('.zones-list span').forEach(span => {
    span.addEventListener('click', () => {
      span.style.background = 'rgba(37,211,102,0.3)';
      setTimeout(() => (span.style.background = ''), 300);
    });
  });


  /* ── 7. DOWNLOAD BUTTONS (PDF DA SCRIVANIA / PDF FOLDER) ── */
  const setupPdfDownloads = () => {
    // Definizione dei PDF nella cartella /pdf/
    const pdfFiles = [
      { id: 'downloadListino', path: 'pdf/Listino Prezzi.pdf', label: '📊 Listino Prezzi 2026' },
      { id: 'downloadPressKit', path: 'pdf/Press Kit.pdf', label: '📁 Press Kit / Media Kit' },
      { id: 'downloadTechRider', path: 'pdf/tech-rider-dasto.pdf', label: '🎛️ Technical Rider' }
    ];

    pdfFiles.forEach(file => {
      // Dynamic Prefetch
      const prefetchLink = document.createElement('link');
      prefetchLink.rel = 'prefetch';
      prefetchLink.href = file.path;
      prefetchLink.as = 'document';
      document.head.appendChild(prefetchLink);

      let btn = document.getElementById(file.id);

      if (btn) {
        btn.href = file.path;
        btn.download = file.path.split('/').pop();
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';

        btn.addEventListener('click', () => {
          const originalText = btn.innerHTML;
          btn.innerHTML = '✓ Scaricato!';
          btn.style.color = '#25d366';
          
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.color = '';
          }, 3000);
        });
      }
    });
  };

  setupPdfDownloads();

});
