/**
 * DEV TAILOR - PORTFOLIO INTERACTION ENGINE
 * Animations, Filtering, Themes & Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTypingEffect();
  initThemeEngine();
  initCopyActions();
  initContactForm();
  initNavScroll();
  initModals();
});

/* ==========================================================================
   Interactive Background Particle Canvas
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 70);
  const mouse = { x: null, y: null, radius: 120 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse collision
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 3;
          this.y -= (dy / dist) * force * 3;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary') || '#06b6d4';
      ctx.globalAlpha = 0.45;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary') || '#6366f1';
          ctx.globalAlpha = (1 - dist / 110) * 0.18;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   Hero Dynamic Typing Effect
   ========================================================================== */
function initTypingEffect() {
  const typedSpan = document.getElementById('typed-text');
  if (!typedSpan) return;

  const roles = [
    'Web Developer',
    'Django & Python Developer',
    'Frontend & UI Engineer',
    'Software Developer'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deleteSpeed = 45;
  const pauseEnd = 1600;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typedSpan.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedSpan.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? deleteSpeed : typingSpeed;

    if (!isDeleting && charIdx === currentRole.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   Theme Switcher Engine
   ========================================================================== */
function initThemeEngine() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themes = ['cyber', 'emerald', 'violet'];
  let currentIdx = 0;

  const savedTheme = localStorage.getItem('dev_portfolio_theme') || 'cyber';
  setTheme(savedTheme);
  currentIdx = themes.indexOf(savedTheme) !== -1 ? themes.indexOf(savedTheme) : 0;

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      currentIdx = (currentIdx + 1) % themes.length;
      const newTheme = themes[currentIdx];
      setTheme(newTheme);
      showToast(`Switched theme to [${newTheme.toUpperCase()}]`);
    });
  }
}

function setTheme(theme) {
  if (theme === 'cyber') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  localStorage.setItem('dev_portfolio_theme', theme);
}

/* ==========================================================================
   Copy to Clipboard & Toast System
   ========================================================================== */
function initCopyActions() {
  const copyButtons = document.querySelectorAll('.btn-copy-action');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: "${textToCopy}"`);
        }).catch(() => {
          showToast(`Selected: ${textToCopy}`);
        });
      }
    });
  });
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==========================================================================
   Project Details Modal System
   ========================================================================== */
const projectDatabase = {
  dailynest: {
    title: 'DailyNest | Grocery Quick-Commerce Platform',
    category: 'Full Stack / Django & SQL',
    stack: ['Django', 'Python', 'SQLite / MySQL', 'JavaScript', 'HTML5', 'CSS3', 'REST APIs'],
    summary: 'A robust Blinkit-inspired quick commerce platform engineered to manage real-time inventory, instant product categorization, and synchronized order delivery workflows.',
    features: [
      'Real-time automated stock tracking with instant decrement on purchase and low-stock alerts for administrators.',
      'End-to-end email OTP verification pipeline securing user logins and authorizing successful delivery handoffs.',
      'Comprehensive Admin Control Center with dynamic sales charts, inventory reordering alerts, user management, and automated delivery partner assignment based on availability.',
      'Modular Django models implementing normalized relational schemas for products, categories, orders, carts, and delivery partner logs.'
    ],
    github: 'https://github.com/mrdev2004',
    demo: '#'
  },
  auction: {
    title: 'BidRise | Real-Time Online Auction Website',
    category: 'Full Stack / React, PHP, Three.js & SQL',
    stack: ['React.js', 'PHP', 'MySQL', 'Three.js (3D)', 'WebSockets / AJAX', 'Bootstrap'],
    summary: 'A sophisticated multi-user auction portal with 3D product visualization and synchronized concurrent bidding mechanisms.',
    features: [
      'Multi-role architecture with dedicated portals: Bidders (place bids, track active lots), Auctioneers (create listings, set reserves), and Admin (oversight, commission tracking, user moderation).',
      'Three.js 3D interactive viewer enabling bidders to rotate and examine product items before bidding.',
      'High-concurrency bid engine preventing race conditions and validating minimum incremental amounts in real time.',
      'Admin financial oversight dashboard computing platform commissions and managing automated user blocking/unblocking.'
    ],
    github: 'https://github.com/mrdev2004',
    demo: '#'
  },
  mern: {
    title: 'Full Stack MERN E-Commerce Store',
    category: 'Full Stack / MERN Ecosystem',
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT Auth', 'Tailwind CSS'],
    summary: 'A scalable, modern e-commerce storefront delivering rapid search, multi-faceted filtering, and secure JWT-based customer checkout flows.',
    features: [
      'High-speed product catalog with full-text search, price range filtering, category aggregation, and instant stock indicators.',
      'RESTful backend architecture built with Express.js and MongoDB Mongoose models with indexes for high read throughput.',
      'JWT-authenticated customer accounts with role differentiation (Customer vs Admin) and persistent shopping cart states.',
      'Fully responsive mobile-first UI crafted with reusable React components.'
    ],
    github: 'https://github.com/mrdev2004',
    demo: '#'
  },
  scrap: {
    title: 'Scrap Management & Recycling System',
    category: 'Web Application / PHP & SQL',
    stack: ['PHP', 'MySQL', 'Bootstrap 5', 'HTML5', 'CSS3', 'JavaScript'],
    summary: 'An eco-conscious e-commerce portal connecting scrap sellers with certified recyclers to promote circular recycling economies.',
    features: [
      'Categorized scrap catalog allowing users to request on-demand pickup for paper, plastic, electronic waste, and metals.',
      'Dynamic price calculation module factoring weight and current scrap market rates.',
      'Admin operations module for scheduling collection agents, updating scrap commodity rates, and tracking recycling tonnage.',
      'Fully responsive layout built with clean Bootstrap components.'
    ],
    github: 'https://github.com/mrdev2004',
    demo: '#'
  },
  twitter: {
    title: 'Twitter Trend Analysis & Dashboard',
    category: 'Data & Web / Python',
    stack: ['Python', 'Data Analytics', 'Web UI', 'API Integration'],
    summary: 'A data-driven analytics tool that tracks trending hashtags, sentiment indicators, and volume spikes.',
    features: [
      'Data pipeline extracting and aggregating trending conversation topics.',
      'Visual charts presenting volume variations and trend longevity.',
      'Clean interactive dashboard for inspecting top influencers and hashtags.'
    ],
    github: 'https://github.com/mrdev2004',
    demo: '#'
  },
  expresso: {
    title: "Expresso's Restaurant Web Portal",
    category: 'Frontend & UI / Responsive Web',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'UI/UX Design'],
    summary: 'An engaging dining and café website featuring interactive menus, chef specials, and table reservation booking.',
    features: [
      'Interactive culinary menu categorized into beverages, main course, and desserts with price tags.',
      'Online table booking reservation form with real-time field validation.',
      'Fluid animations, appetizing visual hierarchy, and full mobile optimization.'
    ],
    github: 'https://github.com/mrdev2004',
    demo: '#'
  }
};

function initModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const viewDetailBtns = document.querySelectorAll('.btn-view-project');

  // Project Detail Modal
  viewDetailBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project');
      const data = projectDatabase[projId];
      if (data && modalOverlay) {
        populateProjectModal(data);
        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('active');
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay) modalOverlay.classList.remove('active');
    }
  });
}

function populateProjectModal(data) {
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-summary').textContent = data.summary;

  const stackContainer = document.getElementById('modal-stack');
  stackContainer.innerHTML = '';
  data.stack.forEach((tech) => {
    const span = document.createElement('span');
    span.className = 'tech-tag';
    span.textContent = tech;
    stackContainer.appendChild(span);
  });

  const featuresContainer = document.getElementById('modal-features');
  featuresContainer.innerHTML = '';
  data.features.forEach((feat) => {
    const li = document.createElement('li');
    li.innerHTML = `▹ ${escapeHtml(feat)}`;
    li.style.marginBottom = '0.5rem';
    featuresContainer.appendChild(li);
  });

  const ghLink = document.getElementById('modal-github');
  if (ghLink) ghLink.href = data.github;
}

/* ==========================================================================
   Contact Form Direct Mail Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim() || 'Portfolio Contact from ' + name;
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in your name, email, and message.');
      return;
    }

    const mailtoUri = `mailto:tdev292004@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Hi Dev,\n\nMy name is ${name} (${email}).\n\n${message}\n\nSent via Portfolio Website`
    )}`;

    window.open(mailtoUri, '_blank');
    showToast('Mail client opened! Looking forward to connecting.');
    form.reset();
  });
}

/* ==========================================================================
   Navigation ScrollSpy & Mobile Menu
   ========================================================================== */
function initNavScroll() {
  const navbar = document.querySelector('.navbar');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('open')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    links.forEach((l) => {
      l.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
