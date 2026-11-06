(() => {
  document.documentElement.classList.add('js');

  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');
  const navLinks = [...document.querySelectorAll('.site-nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const revealItems = document.querySelectorAll('.reveal');

  const updateActiveNavigation = () => {
    const activeSection = sections.reduce((active, section) => {
      return section.getBoundingClientRect().top <= window.innerHeight * 0.4 ? section : active;
    }, sections[0]);

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeSection?.id}`);
    });
  };

  const updateScrollState = () => {
    header?.classList.toggle('scrolled', window.scrollY > 24);
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / (scrollableHeight - 1) : 0;
    document.documentElement.style.setProperty('--scroll-progress', String(progress));
    updateActiveNavigation();
  };

  const closeMenu = () => {
    navigation?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'true');
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
  });

  document.addEventListener('click', (event) => {
    if (navigation?.classList.contains('open') &&
        (event.target === navigation || !header?.contains(event.target))) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation?.classList.contains('open')) {
      closeMenu();
      menuToggle?.focus();
    }
  });

  navLinks.forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('scroll', updateScrollState, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
    updateScrollState();
  });
  updateScrollState();

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => {
      const siblings = [...item.parentElement.children].filter((child) => child.classList.contains('reveal'));
      const siblingIndex = siblings.indexOf(item);
      item.style.setProperty('--reveal-delay', `${Math.min(siblingIndex, 4) * 90}ms`);
      revealObserver.observe(item);
    });

  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const hero = document.querySelector('.hero');
    const heroCanvas = hero?.querySelector('.hero-network');
    const context = heroCanvas?.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hero && heroCanvas && context) {
      let width = 0;
      let height = 0;
      let points = [];
      let pointer = null;
      let pointerInside = false;
      let fadeUntil = 0;
      let animationFrame = 0;

      const resizeCanvas = () => {
        const bounds = hero.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        width = bounds.width;
        height = bounds.height;
        heroCanvas.width = Math.round(width * ratio);
        heroCanvas.height = Math.round(height * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        const count = Math.min(72, Math.max(32, Math.round(width * height / 12500)));
        points = Array.from({ length: count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          phase: Math.random() * Math.PI * 2,
          radius: .7 + Math.random() * 1.1,
          gold: Math.random() > .78
        }));
        drawNetwork(performance.now());
      };

      const drawNetwork = (time) => {
        context.clearRect(0, 0, width, height);
        const seconds = time / 1000;
        const cursor = pointerInside ? pointer : null;
        const cursorRadius = 175;
        const positions = points.map((point) => {
          let x = point.x + Math.sin(seconds * .35 + point.phase) * 2.5;
          let y = point.y + Math.cos(seconds * .28 + point.phase) * 2.5;
          let influence = 0;

          if (cursor) {
            const dx = x - cursor.x;
            const dy = y - cursor.y;
            const distance = Math.hypot(dx, dy);
            influence = Math.max(0, 1 - distance / cursorRadius);
            if (distance > 0) {
              const wave = Math.sin(distance * .055 - seconds * 3 + point.phase) * influence * 8;
              x += dx / distance * wave;
              y += dy / distance * wave;
            }
          }

          return { x, y, influence, point };
        });

        if (cursor) {
          positions.forEach(({ x, y, influence }) => {
            if (influence <= 0) return;
            context.beginPath();
            context.moveTo(cursor.x, cursor.y);
            context.lineTo(x, y);
            context.strokeStyle = `rgba(98, 193, 154, ${influence * .16})`;
            context.lineWidth = .7;
            context.stroke();
          });
        }

        positions.forEach(({ x, y, influence, point }) => {
          const pulse = reduceMotion ? 0 : (Math.sin(seconds * 1.5 + point.phase) + 1) * .07;
          context.beginPath();
          context.arc(x, y, point.radius + influence * 1.1, 0, Math.PI * 2);
          context.fillStyle = point.gold
            ? `rgba(216, 174, 99, ${.2 + pulse + influence * .55})`
            : `rgba(98, 193, 154, ${.17 + pulse + influence * .58})`;
          context.fill();
        });
      };

      const animateNetwork = (time) => {
        drawNetwork(time);
        if (pointerInside || time < fadeUntil) {
          animationFrame = window.requestAnimationFrame(animateNetwork);
        } else {
          animationFrame = 0;
        }
      };

      const requestNetworkFrame = () => {
        if (reduceMotion) {
          drawNetwork(performance.now());
        } else if (!animationFrame) {
          animationFrame = window.requestAnimationFrame(animateNetwork);
        }
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas, { passive: true });
      hero.addEventListener('pointermove', (event) => {
        const bounds = hero.getBoundingClientRect();
        pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
        pointerInside = true;
        hero.classList.add('has-pointer');
        requestNetworkFrame();
      }, { passive: true });
      hero.addEventListener('pointerleave', () => {
        pointerInside = false;
        fadeUntil = performance.now() + 400;
        hero.classList.remove('has-pointer');
        requestNetworkFrame();
      });
    }

    document.querySelectorAll('.capability, .stack-group, .project-card, .timeline-item, .service-row, .education-card').forEach((item) => {
      item.addEventListener('pointermove', (event) => {
        const bounds = item.getBoundingClientRect();
        item.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
        item.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
      });
    });
  }
})();
