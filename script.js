

(function () {
  'use strict';


  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link');
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navLinks');
  const sections  = document.querySelectorAll('section[id], .hero-wrapper');
  const yearSpan  = document.getElementById('year');


  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

 
  function handleNavbarScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

 
  function highlightActiveSection() {

    const triggerY = window.scrollY + Math.min(180, window.innerHeight * 0.25);

    let activeId = null;

    sections.forEach(section => {
      const top = section.offsetTop;
      if (triggerY >= top) {
        activeId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${activeId}`);
    });
  }

  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    highlightActiveSection();
  }, { passive: true });


  handleNavbarScroll();
  highlightActiveSection();


  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));

      const [top, mid, bot] = navToggle.querySelectorAll('span');
      if (isOpen) {
        top.style.transform = 'translateY(6.5px) rotate(45deg)';
        mid.style.opacity   = '0';
        mid.style.transform = 'scaleX(0)';
        bot.style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        [top, mid, bot].forEach(s => {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      }
    });


    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      });
    });


    document.addEventListener('click', e => {
      if (navMenu.classList.contains('open') &&
          !navMenu.contains(e.target) &&
          !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      }
    });
  }


  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach((el, i) => {

    const parent = el.parentElement;
    if (parent && (parent.classList.contains('projects-grid') ||
                   parent.classList.contains('skills-grid') ||
                   parent.classList.contains('contact-links'))) {
      const siblings = Array.from(parent.children).filter(c => c.classList.contains('reveal'));
      const idx = siblings.indexOf(el);
      el.style.transitionDelay = `${idx * 80}ms`;
    }
    revealObserver.observe(el);
  });

})();
