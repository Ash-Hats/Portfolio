const cursorGlow = document.querySelector('.cursor-glow');
<<<<<<< HEAD
=======
const cursorDot = document.querySelector('.cursor-dot');
>>>>>>> 2909d783b425ce064a22cb282daa9da046db5865
const pupils = document.querySelectorAll('.pupil');
const revealEls = document.querySelectorAll('.reveal');
const bars = document.querySelectorAll('.bar');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a[data-section]');
<<<<<<< HEAD
const navToggle = document.querySelector('.nav-toggle');
=======
>>>>>>> 2909d783b425ce064a22cb282daa9da046db5865
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const trackedSelectors = [
  '.about-card',
  '.skill-block',
  '.project-card',
  '.cert-card',
  '.terminal',
  '.exp-timeline',
  '.contact-form',
  '.contact-info',
  '.stat'
];
const revealItems = document.querySelectorAll(trackedSelectors.join(','));

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let targetSphereX = 0;
let targetSphereY = 0;
let pointerFramePending = false;

const updatePointer = () => {
  pointerFramePending = false;
  if (cursorGlow) {
    cursorGlow.style.left = `${mouseX}px`;
    cursorGlow.style.top = `${mouseY}px`;
  }
<<<<<<< HEAD
=======
  if (cursorDot) {
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }
>>>>>>> 2909d783b425ce064a22cb282daa9da046db5865

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  targetSphereX = (mouseY - centerY) / centerY;
  targetSphereY = (mouseX - centerX) / centerX;

  pupils.forEach((pupil) => {
    const rect = pupil.parentElement.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;
    const dx = mouseX - eyeCenterX;
    const dy = mouseY - eyeCenterY;
    const angle = Math.atan2(dy, dx);
    const maxOffset = 10;
    const offsetX = Math.cos(angle) * maxOffset;
    const offsetY = Math.sin(angle) * maxOffset;
    pupil.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
  });
};

window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  if (!pointerFramePending) {
    pointerFramePending = true;
    requestAnimationFrame(updatePointer);
  }
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.bar').forEach((bar) => {
        const level = bar.dataset.level || 0;
        bar.style.width = `${level}%`;
      });
    }
  });
}, { threshold: 0.2 });

revealEls.forEach((el) => observer.observe(el));
revealItems.forEach((el) => {
  el.classList.add('reveal-item');
  observer.observe(el);
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { threshold: 0.4 });

['top', 'about', 'skills', 'projects', 'certs', 'labs', 'experience', 'contact'].forEach((id) => {
  const section = document.getElementById(id);
  if (section) sectionObserver.observe(section);
});

window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

<<<<<<< HEAD
if (nav && navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (!nav.classList.contains('open')) return;
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

=======
>>>>>>> 2909d783b425ce064a22cb282daa9da046db5865
function initParticles() {
  if (prefersReducedMotion) return;
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  const isMobile = window.innerWidth < 700;
  const particleCount = isMobile ? 70 : 160;
  const particles = [];
  let rafId = null;
  let isActive = !document.hidden;

  const createParticle = () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 1.4,
    vy: (Math.random() - 0.5) * 1.4,
    size: Math.random() * 1.6 + 0.6,
    baseAlpha: Math.random() * 0.3 + 0.2
  });

  for (let i = 0; i < particleCount; i += 1) {
    particles.push(createParticle());
  }

  const draw = () => {
    if (!isActive) {
      rafId = null;
      return;
    }
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influenceRadius = isMobile ? 180 : 260;
      const influence = Math.max(0, influenceRadius - dist) / influenceRadius;
      p.vx += (dx / (dist || 1)) * influence * 0.035;
      p.vy += (dy / (dist || 1)) * influence * 0.035;

      p.vx *= 0.99;
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      const glow = influence > 0 ? 0.4 : 0;
      ctx.beginPath();
      ctx.fillStyle = `rgba(229, 229, 229, ${p.baseAlpha})`;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      if (glow > 0) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(139, 0, 0, ${glow * 0.4})`;
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    rafId = requestAnimationFrame(draw);
  };

  const start = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(draw);
  };

  start();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  document.addEventListener('visibilitychange', () => {
    isActive = !document.hidden;
    if (isActive) start();
  });
}

function initSphere() {
  if (prefersReducedMotion) return;
  const container = document.getElementById('sphere-container');
  if (!container || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  container.appendChild(renderer.domElement);

  const points = [];
  const connections = [];
  const radius = 2;
  const isMobile = window.innerWidth < 700;
  const count = isMobile ? 60 : 110;
  const maxDistance = isMobile ? 1.2 : 1.0;

  for (let i = 0; i < count; i += 1) {
    const theta = Math.acos(2 * Math.random() - 1);
    const phi = 2 * Math.PI * Math.random();
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(theta);
    points.push(new THREE.Vector3(x, y, z));
  }

  for (let i = 0; i < count; i += 1) {
    for (let j = i + 1; j < count; j += 1) {
      if (points[i].distanceTo(points[j]) < maxDistance) {
        connections.push(points[i], points[j]);
      }
    }
  }

  const pointGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const pointMaterial = new THREE.PointsMaterial({
    color: 0x8b0000,
    size: isMobile ? 0.035 : 0.045,
    transparent: true,
    opacity: 0.9
  });
  const pointCloud = new THREE.Points(pointGeometry, pointMaterial);

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(connections);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xb0b0b0, transparent: true, opacity: 0.35 });
  const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);

  scene.add(pointCloud);
  scene.add(lineMesh);

  let currentX = 0;
  let currentY = 0;

  let rafId = null;
  let isActive = !document.hidden;
  const animate = () => {
    if (!isActive) {
      rafId = null;
      return;
    }
    currentX += (targetSphereX - currentX) * 0.04;
    currentY += (targetSphereY - currentY) * 0.04;
    pointCloud.rotation.y += 0.0015;
    lineMesh.rotation.y += 0.0015;
    pointCloud.rotation.x += 0.001;
    lineMesh.rotation.x += 0.001;
    pointCloud.rotation.y += currentY * 0.002;
    pointCloud.rotation.x += currentX * 0.002;
    lineMesh.rotation.y += currentY * 0.002;
    lineMesh.rotation.x += currentX * 0.002;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
  };

  const start = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(animate);
  };

  start();

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  document.addEventListener('visibilitychange', () => {
    isActive = !document.hidden;
    if (isActive) start();
  });
}

initParticles();
<<<<<<< HEAD
initSphere();
=======
initSphere();
>>>>>>> 2909d783b425ce064a22cb282daa9da046db5865
