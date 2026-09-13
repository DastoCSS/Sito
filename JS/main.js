document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Animazione elementi allo Scroll ([data-reveal]) ---
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((el) => revealObserver.observe(el));


  // --- 2. Animazione Contatori Numerici ---
  const statNumbers = document.querySelectorAll('.stat[data-count] .stat-num');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const parent = target.closest('.stat');
        const endValue = parseInt(parent.getAttribute('data-count'), 10);
        
        let startValue = 0;
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / endValue));

        const timer = setInterval(() => {
          startValue += 1;
          target.textContent = startValue;
          if (startValue >= endValue) {
            target.textContent = endValue + '+';
            clearInterval(timer);
          }
        }, stepTime);

        countObserver.unobserve(parent);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach((num) => {
    const parent = num.closest('.stat');
    if (parent) countObserver.observe(parent);
  });


  // --- 3. Pulsante di Download Dinamico per Preventivo PDF ---
  const injectDownloadBtn = () => {
    const heroActions = document.querySelector('.hero-actions');
    if (!heroActions) return;

    const downloadBtn = document.createElement('a');
    downloadBtn.href = 'pdf/preventivo-dastodj.pdf';
    downloadBtn.className = 'cta-secondary';
    downloadBtn.setAttribute('download', 'Preventivo-DASTO-DJ.pdf');
    downloadBtn.innerHTML = '📄 Scarica Info PDF';
    
    heroActions.appendChild(downloadBtn);
  };

  injectDownloadBtn();

}); // fine DOMContentLoaded
