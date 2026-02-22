/* ============================================
   DASTO DJ — main.js
   Scroll reveal · Nav · Counter · Vinyl pause
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- 1. NAV SCROLL EFFECT ----
  const nav = document.getElementById('nav');

  const updateNav = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();


  // ---- 2. SCROLL REVEAL ----
  const reveals = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger if multiple siblings visible at once
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // Add stagger delays to service cards and review cards
  document.querySelectorAll('.service-grid .card').forEach((el, i) => {
    el.dataset.delay = i * 100;
  });
  document.querySelectorAll('.reviews-grid .review-card').forEach((el, i) => {
    el.dataset.delay = i * 100;
  });

  reveals.forEach(el => revealObserver.observe(el));


  // ---- 3. ANIMATED COUNTER (stats) ----
  const statNums = document.querySelectorAll('.stat[data-count] .stat-num');

  const countUp = (el, target, duration = 1800) => {
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    };
    requestAnimationFrame(update);
  };

  const statsSection = document.querySelector('.stats');
  let counted = false;

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      document.querySelectorAll('.stat[data-count]').forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const numEl = stat.querySelector('.stat-num');
        countUp(numEl, target);
      });
    }
  }, { threshold: 0.5 });

  if (statsSection) statsObserver.observe(statsSection);


  // ---- 4. VINYL PAUSE ON HOVER ----
  const vinyl = document.querySelector('.vinyl');
  const vinylInner = document.querySelector('.vinyl-inner');

  if (vinyl) {
    vinyl.addEventListener('mouseenter', () => {
      vinyl.style.animationPlayState = 'paused';
      if (vinylInner) vinylInner.style.animationPlayState = 'paused';
    });
    vinyl.addEventListener('mouseleave', () => {
      vinyl.style.animationPlayState = 'running';
      if (vinylInner) vinylInner.style.animationPlayState = 'running';
    });
  }


  // ---- 5. HERO TITLE STAGGER ----
  const heroLines = document.querySelectorAll('.hero-title .line');
  heroLines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(20px)';
    line.style.transition = `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s`;
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 100);
  });


  // ---- 6. ZONE TAG HOVER RIPPLE ----
  document.querySelectorAll('.zones-list span').forEach(span => {
    span.addEventListener('click', () => {
      span.style.background = 'rgba(37,211,102,0.3)';
      setTimeout(() => {
        span.style.background = '';
      }, 300);
    });
  });

});