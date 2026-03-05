document.addEventListener('DOMContentLoaded', () => {

  // ====== YEAR ======
  document.getElementById('year').textContent = new Date().getFullYear();

  // ====== CUSTOM CURSOR ======
  const cursor = document.getElementById('cursor');
  const dot    = cursor.querySelector('.cursor__dot');
  const ring   = cursor.querySelector('.cursor__ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .gal-item, .fact, .chip').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // ====== SCROLL REVEAL ======
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ====== ACTIVE NAV LINK ======
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => {
          l.style.color = '';
          if (l.getAttribute('href') === '#' + e.target.id) {
            l.style.color = 'var(--rose)';
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(s => navObserver.observe(s));

  // ====== HERO PARALLAX ======
  const heroRight = document.querySelector('.hero__right');
  if (heroRight) {
    window.addEventListener('scroll', () => {
      heroRight.style.transform = `translateY(${window.scrollY * 0.08}px)`;
    }, { passive: true });
  }

});
