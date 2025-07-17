// Wave animation with gradient colors
(function() {
  const canvas = document.getElementById('waveCanvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  // Wave system with gradient colors
  const waves = [];
  
  // Create multiple wave layers
  for (let i = 0; i < 4; i++) {
    waves.push({
      amplitude: 20 + Math.random() * 60,
      wavelength: 300 + Math.random() * 500,
      speed: 0.008 + Math.random() * 0.012,
      phase: Math.random() * Math.PI * 2,
      yOffset: canvas.height * 0.3 + i * 100,
      opacity: 0.1 + Math.random() * 0.15,
      colorStop1: Math.random() * 0.3, // Random position for gradient
      colorStop2: 0.7 + Math.random() * 0.3
    });
  }

  function createGradient(wave, ctx, canvas) {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    
    // Dynamic gradient colors based on wave properties
    const hue1 = 45 + Math.sin(Date.now() * 0.001 + wave.phase) * 15; // Yellow variations
    const hue2 = 120 + Math.sin(Date.now() * 0.0008 + wave.phase) * 30; // Green variations
    
    gradient.addColorStop(0, `hsla(${hue1}, 100%, 60%, ${wave.opacity})`);
    gradient.addColorStop(wave.colorStop1, `hsla(${(hue1 + hue2) / 2}, 80%, 65%, ${wave.opacity * 0.8})`);
    gradient.addColorStop(wave.colorStop2, `hsla(${hue2}, 90%, 50%, ${wave.opacity})`);
    gradient.addColorStop(1, `hsla(${hue2 + 20}, 70%, 45%, ${wave.opacity * 0.6})`);
    
    return gradient;
  }

  function drawWave(wave) {
    ctx.beginPath();
    ctx.moveTo(0, wave.yOffset);
    
    // Draw smooth wave
    for (let x = 0; x <= canvas.width; x += 2) {
      const y = wave.yOffset + 
        Math.sin((x + wave.phase) * (2 * Math.PI / wave.wavelength)) * wave.amplitude +
        Math.sin((x * 0.5 + wave.phase * 0.7) * (2 * Math.PI / (wave.wavelength * 1.3))) * wave.amplitude * 0.3;
      
      ctx.lineTo(x, y);
    }
    
    // Add subtle glow effect for smoother fade
    const gradient = createGradient(wave, ctx, canvas);
    ctx.shadowColor = gradient;
    ctx.shadowBlur = 8;
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2 + Math.sin(Date.now() * 0.001 + wave.phase) * 0.5;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
  }

  function animate() {
    // Clear canvas with smooth fade effect and blur
    ctx.save();
    
    // Apply subtle blur to soften the fade edges (with fallback)
    if (ctx.filter !== undefined) {
      ctx.filter = 'blur(0.5px)';
    }
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Reset filter and alpha
    if (ctx.filter !== undefined) {
      ctx.filter = 'none';
    }
    ctx.globalAlpha = 1;
    ctx.restore();
    
    // Update and draw waves
    waves.forEach(wave => {
      drawWave(wave);
      wave.phase += wave.speed;
      
      // Subtle amplitude variation
      wave.amplitude += Math.sin(Date.now() * 0.0005 + wave.phase) * 0.1;
    });
    
    requestAnimationFrame(animate);
  }

  animate();
})();

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Header background on scroll + Wave fade
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  const canvas = document.getElementById('waveCanvas');
  const scrolled = window.pageYOffset;
  
  // Header background
  if (scrolled > 50) {
    header.style.background = 'rgba(26, 26, 26, 0.98)';
  } else {
    header.style.background = 'rgba(26, 26, 26, 0.95)';
  }
  
  // Wave fade on scroll for better text readability
  const fadeStart = 100;
  const fadeEnd = 300;
  
  if (scrolled <= fadeStart) {
    canvas.style.opacity = '1';
  } else if (scrolled >= fadeEnd) {
    canvas.style.opacity = '0';
  } else {
    const opacity = 1 - ((scrolled - fadeStart) / (fadeEnd - fadeStart));
    canvas.style.opacity = opacity.toString();
  }
});

// Contact form handling with Formspree
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const form = this;
  const formData = new FormData(form);
  
  // Simple form validation
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  if (!name || !email || !message) {
    showNotification('Please fill in all required fields.', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address.', 'error');
    return;
  }
  
  // Show loading state
  const submitButton = form.querySelector('.submit-button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  // Submit to Formspree
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
      form.reset();
    } else {
      throw new Error('Form submission failed');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    showNotification('Sorry, there was a problem sending your message. Please try again.', 'error');
  })
  .finally(() => {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  });
});

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;
  
  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? 'linear-gradient(135deg, #00FF7F, #FFD700)' : 
                 type === 'error' ? 'linear-gradient(135deg, #ff4757, #ff6b7a)' : 
                 'linear-gradient(135deg, #FFD700, #00FF7F)'};
    color: #1a1a1a;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    max-width: 400px;
    animation: slideInRight 0.3s ease;
    font-weight: 500;
  `;
  
  // Add notification content styles
  const content = notification.querySelector('.notification-content');
  content.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  `;
  
  const closeButton = notification.querySelector('.notification-close');
  closeButton.style.cssText = `
    background: none;
    border: none;
    color: #1a1a1a;
    font-size: 18px;
    cursor: pointer;
    font-weight: bold;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  `;
  
  closeButton.addEventListener('mouseenter', () => closeButton.style.opacity = '1');
  closeButton.addEventListener('mouseleave', () => closeButton.style.opacity = '0.7');
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Add slide animations CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
    }
  });
}, observerOptions);

// Observe sections for scroll animations
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    observer.observe(section);
  });
});

// Parallax effect for hero section (reduced for better performance)
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  
  if (hero && scrolled < window.innerHeight) {
    const speed = scrolled * 0.3;
    hero.style.transform = `translateY(${speed}px)`;
  }
  
  ticking = false;
}

window.addEventListener('scroll', function() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Mobile menu functionality
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  if (mobileMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
}

// Make closeMobileMenu globally available
window.closeMobileMenu = closeMobileMenu;

// Mobile menu event listeners
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }
  
  // Close mobile menu when clicking outside
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        closeMobileMenu();
      }
    });
  }
  
  // Close mobile menu on window resize if desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
});