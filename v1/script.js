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
    
    // Create gradient stroke
    ctx.strokeStyle = createGradient(wave, ctx, canvas);
    ctx.lineWidth = 2 + Math.sin(Date.now() * 0.001 + wave.phase) * 0.5;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  function animate() {
    // Clear canvas with subtle fade effect
    ctx.fillStyle = 'rgba(26, 26, 26, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
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

// Header background on scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  const scrolled = window.pageYOffset;
  
  if (scrolled > 50) {
    header.style.background = 'rgba(26, 26, 26, 0.98)';
  } else {
    header.style.background = 'rgba(26, 26, 26, 0.95)';
  }
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message')
  };
  
  // Simple form validation
  if (!data.name || !data.email || !data.message) {
    showNotification('Please fill in all required fields.', 'error');
    return;
  }
  
  if (!isValidEmail(data.email)) {
    showNotification('Please enter a valid email address.', 'error');
    return;
  }
  
  // Show loading state
  const submitButton = this.querySelector('.submit-button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  // Simulate form submission (replace with actual submission logic)
  setTimeout(() => {
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    this.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 2000);
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

// Parallax effect for hero section
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  
  if (hero) {
    const speed = scrolled * 0.5;
    hero.style.transform = `translateY(${speed}px)`;
  }
});

// Mobile menu toggle (if needed for smaller screens)
function createMobileMenu() {
  const header = document.querySelector('.header-content');
  const nav = document.querySelector('.nav');
  
  if (window.innerWidth <= 768) {
    // Add mobile menu functionality if nav overflows
    const navRect = nav.getBoundingClientRect();
    if (navRect.width > window.innerWidth - 100) {
      // Implement mobile menu logic here if needed
    }
  }
}

window.addEventListener('resize', createMobileMenu);
document.addEventListener('DOMContentLoaded', createMobileMenu);