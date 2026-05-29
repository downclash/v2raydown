// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function () {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Theme toggle
  initTheme();

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Header background on scroll
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.style.background = document.documentElement.classList.contains('light-mode')
          ? 'rgba(248, 250, 252, 0.9)' : 'rgba(6, 6, 8, 0.9)';
      } else {
        header.style.background = document.documentElement.classList.contains('light-mode')
          ? 'rgba(248, 250, 252, 0.7)' : 'rgba(6, 6, 8, 0.7)';
      }
    });
  }

  // Intersection Observer for fade-in animations
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }
});

// Theme management
function initTheme() {
  const saved = localStorage.getItem('v2ray-theme');
  // Default to light mode; only use dark if explicitly saved
  if (saved === 'dark') {
    document.documentElement.classList.remove('light-mode');
  } else {
    document.documentElement.classList.add('light-mode');
  }

  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  const html = document.documentElement;
  const isLight = html.classList.toggle('light-mode');
  localStorage.setItem('v2ray-theme', isLight ? 'light' : 'dark');

  // Update header background
  const header = document.querySelector('header');
  if (header) {
    header.style.background = isLight
      ? 'rgba(248, 250, 252, 0.7)' : 'rgba(6, 6, 8, 0.7)';
  }
}

// FAQ toggle
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isActive = item.classList.contains('active');

  document.querySelectorAll('.faq-item').forEach(function (faq) {
    faq.classList.remove('active');
  });

  if (!isActive) {
    item.classList.add('active');
  }
}
