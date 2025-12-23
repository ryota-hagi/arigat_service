document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = document.body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });
  }

  const scrollButtons = document.querySelectorAll('[data-scroll]');
  scrollButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-scroll');
      if (!target) return;

      if (target === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const section = document.getElementById(target);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      if (document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
        menuToggle?.setAttribute('aria-expanded', 'false');
        mobileMenu?.setAttribute('aria-hidden', 'true');
      }
    });
  });

  const targetToggle = document.querySelector('[data-target-toggle]');
  const targetButtons = document.querySelectorAll('[data-target-switch]');
  const targetPanels = document.querySelectorAll('[data-target-panel]');

  const setTarget = (target) => {
    if (targetToggle) {
      targetToggle.setAttribute('data-active', target);
    }
    targetButtons.forEach((button) => {
      button.classList.toggle('is-active', button.getAttribute('data-target-switch') === target);
    });
    targetPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.getAttribute('data-target-panel') === target);
    });
  };

  targetButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target-switch');
      if (target) {
        setTarget(target);
      }
    });
  });

  if (targetToggle) {
    const initialTarget = targetToggle.getAttribute('data-active') || 'new';
    setTarget(initialTarget);
  }

  const planButtons = document.querySelectorAll('[data-plan]');
  const planPanels = document.querySelectorAll('[data-plan-content]');

  const setPlan = (plan) => {
    planButtons.forEach((button) => {
      button.classList.toggle('is-active', button.getAttribute('data-plan') === plan);
    });
    planPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.getAttribute('data-plan-content') === plan);
    });
  };

  planButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const plan = button.getAttribute('data-plan');
      if (plan) {
        setPlan(plan);
      }
    });
  });

  const initialPlan = document.querySelector('.plan-tab.is-active')?.getAttribute('data-plan') || 'A';
  setPlan(initialPlan);

  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach((item) => {
    const trigger = item.querySelector('[data-accordion-trigger]');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      accordionItems.forEach((panel) => panel.classList.remove('is-open'));
      if (!isOpen) {
        item.classList.add('is-open');
      }
    });
  });

  const contactForm = document.querySelector('[data-contact-form]');
  const contactSuccess = document.querySelector('[data-contact-success]');
  const contactReset = document.querySelector('[data-contact-reset]');

  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      contactForm.style.display = 'none';
      contactSuccess.style.display = 'block';
    });
  }

  if (contactReset && contactForm && contactSuccess) {
    contactReset.addEventListener('click', () => {
      contactSuccess.style.display = 'none';
      contactForm.style.display = 'grid';
    });
  }

  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxTriggers = document.querySelectorAll('[data-lightbox-trigger]');
  const lightboxCloseButtons = document.querySelectorAll('[data-lightbox-close]');

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  };

  lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (!lightbox) return;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  lightboxCloseButtons.forEach((button) => {
    button.addEventListener('click', closeLightbox);
  });

  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });

  const revealItems = document.querySelectorAll('.reveal');
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  if (!prefersReducedMotion) {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -8;
        const rotateY = ((x / rect.width) - 0.5) * 8;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  const initHeroBackground = () => {
    const container = document.getElementById('hero-three');
    if (!container || !window.THREE || prefersReducedMotion) return;

    const getSize = () => ({
      width: container.clientWidth || window.innerWidth,
      height: container.clientHeight || window.innerHeight,
    });

    const { width, height } = getSize();
    const scene = new window.THREE.Scene();
    scene.fog = new window.THREE.FogExp2(0x0f172a, 0.002);
    scene.background = new window.THREE.Color(0x0f172a);

    const camera = new window.THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    camera.position.z = 100;

    const renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particleCount = 600;
    const geometry = new window.THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const palette = [
      new window.THREE.Color(0x3b82f6),
      new window.THREE.Color(0x60a5fa),
      new window.THREE.Color(0xfacc15),
    ];

    for (let i = 0; i < particleCount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 40 + Math.random() * 100;
      const z = (Math.random() - 0.5) * 2000;
      positions.push(Math.cos(angle) * radius, Math.sin(angle) * radius, z);
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new window.THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new window.THREE.Float32BufferAttribute(colors, 3));

    const material = new window.THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: window.THREE.AdditiveBlending,
    });

    const points = new window.THREE.Points(geometry, material);
    scene.add(points);

    let mouseX = 0;
    let mouseY = 0;
    let targetZ = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      targetZ = window.scrollY * 0.4;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll);

    const animate = () => {
      camera.position.z += (targetZ + 100 - camera.position.z) * 0.05;
      camera.rotation.x += (-mouseY * 0.1 - camera.rotation.x) * 0.05;
      camera.rotation.y += (-mouseX * 0.1 - camera.rotation.y) * 0.05;
      points.rotation.z += 0.001;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
      const size = getSize();
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
      renderer.setSize(size.width, size.height);
    });
  };

  const initMorphingParticles = () => {
    const container = document.getElementById('solution-three');
    if (!container || !window.THREE || prefersReducedMotion) return;

    const getSize = () => ({
      width: container.clientWidth || window.innerWidth,
      height: container.clientHeight || window.innerHeight,
    });

    const { width, height } = getSize();
    const scene = new window.THREE.Scene();
    const camera = new window.THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particleCount = 1200;
    const geometry = new window.THREE.BufferGeometry();
    const initialPositions = [];
    const targetPositions = [];

    for (let i = 0; i < particleCount; i += 1) {
      initialPositions.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
    }

    const radius = 35;
    for (let i = 0; i < particleCount; i += 1) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      targetPositions.push(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
    }

    const currentPositions = new Float32Array(initialPositions);
    geometry.setAttribute('position', new window.THREE.BufferAttribute(currentPositions, 3));

    const material = new window.THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 0.6,
      transparent: true,
      opacity: 0.75,
    });

    const particles = new window.THREE.Points(geometry, material);
    scene.add(particles);

    let time = 0;
    const animate = () => {
      time += 0.01;
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;

      const morphFactor = (Math.sin(time) + 1) / 2;
      const positions = particles.geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i += 1) {
        const ix = i * 3;
        positions[ix] = initialPositions[ix] * (1 - morphFactor) + targetPositions[ix] * morphFactor;
        positions[ix + 1] = initialPositions[ix + 1] * (1 - morphFactor) + targetPositions[ix + 1] * morphFactor;
        positions[ix + 2] = initialPositions[ix + 2] * (1 - morphFactor) + targetPositions[ix + 2] * morphFactor;
      }

      particles.geometry.attributes.position.needsUpdate = true;
      const colorShift = 0.2 + morphFactor * 0.4;
      material.color.setRGB(colorShift, 0.5, 1.0);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
      const size = getSize();
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
      renderer.setSize(size.width, size.height);
    });
  };

  initHeroBackground();
  initMorphingParticles();
});
