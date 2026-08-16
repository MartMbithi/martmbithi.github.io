// Portfolio
// Mobile nav, sticky-header state, portfolio filter, reveal-on-scroll, footer year.

(function () {
  'use strict';

  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // Sticky header state
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Portfolio filter
  const filterBtns = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('[data-category]');
  if (filterBtns.length && items.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        // Keep the panel pointed at whichever tab is now selected.
        const panel = document.getElementById(btn.getAttribute('aria-controls'));
        if (panel && btn.id) panel.setAttribute('aria-labelledby', btn.id);
        const cat = btn.dataset.filter;
        items.forEach((item) => {
          const match = cat === '*' || item.dataset.category === cat;
          item.classList.toggle('hidden', !match);
        });
      });
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealAll = () => revealEls.forEach((el) => el.classList.add('in'));

  if (revealEls.length && 'IntersectionObserver' in window) {
    // threshold must stay 0: containers like the case list are far taller than
    // the viewport, so a ratio-based threshold can never be satisfied and the
    // content would never appear.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));

    // Failsafe: nothing stays hidden permanently if the observer misbehaves.
    window.setTimeout(revealAll, 2000);
  } else {
    revealAll();
  }

  // Footer year
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
