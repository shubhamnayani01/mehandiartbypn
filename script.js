/* ============================================================
   MEHANDI ART BY PN — script.js
   Multi-page support
   ============================================================ */

/* ---------- CONFIG ---------- */
const CONFIG = {
  phone:     '919737675008',
  waMessage: 'Hi! I want to book Mehandi services.',
  instagram: 'mehndi_artby_pn',
};

/* ---------- UTILITY ---------- */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

function waLink(msg) {
  return `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(msg || CONFIG.waMessage)}`;
}


/* ---------- MOBILE NAV ---------- */
(function initNav() {
  // Wait for components.js to inject nav
  const init = () => {
    const burger = $('navBurger');
    const mMenu  = $('mobileMenu');
    if (!burger || !mMenu) return;

    burger.addEventListener('click', () => {
      const open = mMenu.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    $$('#mobileMenu a').forEach(a => {
      a.addEventListener('click', () => {
        mMenu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });
    
    // Close on escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mMenu.classList.contains('open')) {
        mMenu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      }
    });
  };

  // Try immediately, also on DOMContentLoaded (for components.js injection)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 50));
  } else {
    setTimeout(init, 50);
  }
})();

/* ---------- SMOOTH SCROLL + NAV SHRINK ---------- */
(function initScroll() {
  // Smooth anchor scroll — only for same-page #hash links
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Shrink nav on scroll
  const checkNav = () => {
    const nav = document.querySelector('header nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', checkNav, { passive: true });
  // Also check on load (for components.js injection)
  setTimeout(checkNav, 100);
})();

/* ---------- SCROLL REVEAL ---------- */
(function initReveal() {
  const observe = () => {
    const els = $$('.reveal, .reveal-left, .reveal-right');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 55);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    els.forEach(el => observer.observe(el));
  };

  // Run after a small delay to allow components.js to inject content
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(observe, 100));
  } else {
    setTimeout(observe, 100);
  }
})();

/* ---------- ANIMATED COUNTERS ---------- */
(function initCounters() {
  const observe = () => {
    const counters = $$('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const dur    = 1800;
        const start  = performance.now();

        (function tick(now) {
          const progress = Math.min((now - start) / dur, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        })(start);

        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(observe, 100));
  } else {
    setTimeout(observe, 100);
  }
})();

/* ---------- GALLERY LIGHTBOX ---------- */
(function initLightbox() {
  const init = () => {
    const lightbox = $('lightbox');
    const lbImg    = $('lbImg');
    const lbCaption= $('lbCaption');
    const lbPrev   = $('lbPrev');
    const lbNext   = $('lbNext');
    const lbClose  = $('lbClose');

    if (!lightbox) return;

    const items = $$('.gallery-item[data-src]');
    let current = 0;
    let touchStartX = 0;

    function getVisibleItems() {
      return [...items].filter(item => !item.classList.contains('filtered-out'));
    }

    function openLightbox(idx) {
      const visibleItems = getVisibleItems();
      current = idx;
      const item = visibleItems[current];
      if (!item) return;
      lbImg.src = item.dataset.src;
      lbImg.alt = item.dataset.caption || 'Mehandi Art by PN';
      lbCaption.textContent = item.dataset.caption || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      lbImg.style.opacity = '0';
      lbImg.onload = () => { lbImg.style.transition = 'opacity .3s'; lbImg.style.opacity = '1'; };
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function navigate(dir) {
      const visibleItems = getVisibleItems();
      current = (current + dir + visibleItems.length) % visibleItems.length;
      openLightbox(current);
    }

    items.forEach((item, i) => {
      item.addEventListener('click', () => {
        const visibleItems = getVisibleItems();
        const visibleIdx = visibleItems.indexOf(item);
        if (visibleIdx !== -1) openLightbox(visibleIdx);
      });
    });

    lbClose && lbClose.addEventListener('click', closeLightbox);
    lbPrev  && lbPrev.addEventListener('click',  () => navigate(-1));
    lbNext  && lbNext.addEventListener('click',  () => navigate(1));

    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    
    // Touch swipe support
    lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
    }, { passive: true });

    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')   navigate(-1);
      if (e.key === 'ArrowRight')  navigate(1);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ---------- GALLERY FILTER TABS ---------- */
(function initGalleryFilter() {
  const init = () => {
    const tabs = $$('.filter-tab');
    const items = $$('.gallery-item[data-category]');
    if (!tabs.length || !items.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.dataset.filter;

        // Update active tab
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Filter items
        items.forEach(item => {
          const category = item.dataset.category;
          if (filter === 'all' || category === filter) {
            item.classList.remove('filtered-out');
          } else {
            item.classList.add('filtered-out');
          }
        });
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ---------- FAQ ACCORDION ---------- */
(function initFAQ() {
  const init = () => {
    const faqItems = $$('.faq-item[data-faq]');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all others in same category
        const category = item.closest('.faq-category');
        if (category) {
          category.querySelectorAll('.faq-item.open').forEach(openItem => {
            if (openItem !== item) {
              openItem.classList.remove('open');
              openItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
            }
          });
        }

        // Toggle current
        item.classList.toggle('open', !isOpen);
        question.setAttribute('aria-expanded', !isOpen);
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ---------- CONTACT FORM — WhatsApp Submission ---------- */
(function initForm() {
  const init = () => {
    const form       = $('bookingForm');
    const successBox = $('formSuccess');
    if (!form) return;

    function validate(form) {
      let valid = true;
      const required = form.querySelectorAll('[required]');
      required.forEach(field => {
        field.classList.remove('error');
        if (!field.value.trim()) { field.classList.add('error'); valid = false; }
      });

      const phone = form.querySelector('[name="phone"]');
      if (phone && phone.value.trim()) {
        const ph = phone.value.replace(/\D/g, '');
        if (ph.length < 10) { phone.classList.add('error'); valid = false; }
      }

      return valid;
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validate(form)) {
        form.querySelector('.error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const name    = form.querySelector('[name="name"]').value.trim();
      const phone   = form.querySelector('[name="phone"]').value.trim();
      const service = form.querySelector('[name="service"]').value;
      const date    = form.querySelector('[name="date"]').value;
      const location= form.querySelector('[name="location"]').value.trim();
      const occasion= form.querySelector('[name="occasion"]')?.value || '';
      const notes   = form.querySelector('[name="notes"]').value.trim();

      const msg = [
        `🌿 *New Booking Request — Mehandi Art by PN*`,
        ``,
        `👤 *Name:* ${name}`,
        `📞 *Phone:* ${phone}`,
        `🎨 *Service:* ${service || 'Not specified'}`,
        `📅 *Date:* ${date || 'Flexible'}`,
        `📍 *Location:* ${location || 'Pandeshra'}`,
        occasion ? `🎉 *Occasion:* ${occasion}` : null,
        notes ? `📝 *Notes:* ${notes}` : null,
      ].filter(Boolean).join('\n');

      window.open(waLink(msg), '_blank');

      form.style.display = 'none';
      successBox.classList.add('show');
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Remove error state on input
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => field.classList.remove('error'));
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ---------- LAZY LOAD IMAGES ---------- */
(function initLazyLoad() {
  const observe = () => {
    const imgs = $$('img[data-src]');
    if (!imgs.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });
      imgs.forEach(img => observer.observe(img));
    } else {
      imgs.forEach(img => { img.src = img.dataset.src; img.removeAttribute('data-src'); });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(observe, 100));
  } else {
    setTimeout(observe, 100);
  }
})();

/* ---------- MARQUEE PAUSE ON HOVER ---------- */
(function initMarquee() {
  const inner = document.querySelector('.marquee-inner');
  if (!inner) return;
  inner.addEventListener('mouseenter', () => inner.style.animationPlayState = 'paused');
  inner.addEventListener('mouseleave', () => inner.style.animationPlayState = 'running');
})();
