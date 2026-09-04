document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for Reveal Elements
  const revealElements = document.querySelectorAll("[data-reveal]");

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  };

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
  revealElements.forEach(el => revealObserver.observe(el));

  // Stats Counter Animation
  const statNums = document.querySelectorAll(".stat-num[data-count]");
  
  const animateStats = (el) => {
    const target = +el.getAttribute("data-count");
    let count = 0;
    const duration = 2000; // 2 seconds
    const stepTime = Math.abs(Math.floor(duration / target));

    const timer = setInterval(() => {
      count++;
      el.textContent = count + "+";
      if (count >= target) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(num => statsObserver.observe(num));
});
