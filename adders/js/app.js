// Adders Static Site - Enhanced JavaScript
// Converted from React components to vanilla JS with improvements

class AddersApp {
    constructor() {
        this.state = {
            isLoaded: false,
            isLowPerformance: false,
            scrollY: 0,
            contactModal: {
                isOpen: false,
                type: 'work-with-us',
                title: ''
            }
        };
        
        this.rafId = null;
        this.performanceMonitor = null;
        this.intersectionObserver = null;
        this.tickerAnimationId = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.initializeApp();
    }
    
    bindEvents() {
        // Button event listeners
        document.getElementById('workWithUsBtn')?.addEventListener('click', () => {
            this.openContactModal('work-with-us', 'Work With Us');
        });
        
        document.getElementById('joinCrewBtn')?.addEventListener('click', () => {
            this.openContactModal('join-crew', 'Join The Crew');
        });
        
        document.getElementById('applyNowBtn')?.addEventListener('click', () => {
            this.openContactModal('apply-now', 'Apply Now');
        });
        
        // Modal event listeners
        document.getElementById('modalClose')?.addEventListener('click', () => {
            this.closeContactModal();
        });
        
        document.getElementById('cancelBtn')?.addEventListener('click', () => {
            this.closeContactModal();
        });
        
        // Form submission
        document.getElementById('contactForm')?.addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });
        
        // Close modal on backdrop click
        document.getElementById('contactModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'contactModal') {
                this.closeContactModal();
            }
        });
        
        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.contactModal.isOpen) {
                this.closeContactModal();
            }
        });
        
        // Optimized scroll handler with RAF throttling
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        
        // Visibility change handling for battery optimization
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
        
        // Window resize handler
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250), { passive: true });
    }
    
    async initializeApp() {
        // Simulate initial loading
        await new Promise(resolve => setTimeout(resolve, 100));
        
        this.hideLoadingSkeleton();
        this.state.isLoaded = true;
        
        // Initialize all components
        this.initPerformanceMonitor();
        this.initBackgroundAnimation();
        this.initScrollAnimations();
        this.initTicker();
        this.initTrafficCards();
        
        // Show initial animations
        this.triggerInitialAnimations();
    }
    
    hideLoadingSkeleton() {
        const skeleton = document.getElementById('loadingSkeleton');
        if (skeleton) {
            skeleton.style.opacity = '0';
            setTimeout(() => {
                skeleton.style.display = 'none';
            }, 300);
        }
    }
    
    triggerInitialAnimations() {
        // Trigger hero animations with staggered delays
        const heroAnimations = [
            '.logo-entrance',
            '.text-entrance', 
            '.subtitle-entrance',
            '.description-entrance',
            '.buttons-entrance'
        ];
        
        heroAnimations.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.animationDelay = `${index * 0.2}s`;
            }
        });
    }
    
    // Performance Monitoring System
    initPerformanceMonitor() {
        let frameCount = 0;
        let lastTime = performance.now();
        let fpsHistory = [];
        
        const measurePerformance = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                fpsHistory.push(fps);
                if (fpsHistory.length > 5) {
                    fpsHistory.shift();
                }
                
                const avgFps = fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length;
                const newIsLowPerformance = avgFps < 45 && fpsHistory.length >= 3;
                
                if (newIsLowPerformance !== this.state.isLowPerformance) {
                    this.state.isLowPerformance = newIsLowPerformance;
                    this.optimizeForPerformance();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            this.performanceMonitor = requestAnimationFrame(measurePerformance);
        };
        
        // Start monitoring after a delay
        setTimeout(() => {
            this.performanceMonitor = requestAnimationFrame(measurePerformance);
        }, 1000);
    }
    
    optimizeForPerformance() {
        if (this.state.isLowPerformance) {
            // Reduce background animation elements
            const dots = document.querySelectorAll('.floating-element');
            dots.forEach((dot, index) => {
                if (index % 2 === 0) dot.remove();
            });
            
            // Reduce ticker animation speed
            const tickerContent = document.getElementById('tickerContent');
            if (tickerContent) {
                tickerContent.style.animationDuration = '60s';
            }
        }
    }
    
    // Enhanced Background Animation
    initBackgroundAnimation() {
        const container = document.getElementById('bgAnimation');
        if (!container) return;
        
        const dotCount = window.innerWidth > 768 ? 50 : 25;
        const lineCount = window.innerWidth > 768 ? 5 : 3;
        
        // Create floating dots
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'floating-element';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.top = Math.random() * 100 + '%';
            dot.style.animationDelay = Math.random() * 6 + 's';
            dot.style.animationDuration = (4 + Math.random() * 4) + 's';
            container.appendChild(dot);
        }
        
        // Create drifting lines
        for (let i = 0; i < lineCount; i++) {
            const line = document.createElement('div');
            line.className = 'drifting-line';
            line.style.top = (20 + i * 20) + '%';
            line.style.width = (200 + Math.random() * 300) + 'px';
            line.style.animationDelay = (i * 4) + 's';
            line.style.animationDuration = (15 + Math.random() * 10) + 's';
            container.appendChild(line);
        }
    }
    
    // Enhanced Scroll Animations with Intersection Observer
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '50px'
        };
        
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    
                    // Animate child elements with stagger
                    const staggerElements = entry.target.querySelectorAll('.stagger-1, .stagger-2, .stagger-3, .stagger-4, .stagger-5, .stagger-6');
                    staggerElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('is-visible');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.animate-on-scroll, [data-scroll-animate]');
        animatedElements.forEach(el => {
            this.intersectionObserver.observe(el);
        });
    }
    
    // Ultra-Optimized Ticker System
    initTicker() {
        const container = document.getElementById('tickerContainer');
        const content = document.getElementById('tickerContent');
        
        if (!container || !content) return;
        
        const phrases = [
            'Built for scale. Trained for chaos.',
            'Whitehat, black-belt.',
            'Powered by dashboards. Driven by instinct.',
            'Less meetings. More winning.',
            'Ukraine-built. World-ready.',
            'No titles, only roles.',
            'Clean traffic. Dirty minds.',
            'Still hungry after 8+ years.'
        ];
        
        // Create ticker content with duplicates for seamless loop
        const createTickerContent = () => {
            const duplicatedPhrases = [...phrases, ...phrases, ...phrases];
            content.innerHTML = duplicatedPhrases
                .map(phrase => `<span class="ticker-phrase">${phrase}</span>`)
                .join('');
        };
        
        createTickerContent();
        
        // Start ticker animation
        this.startTickerAnimation();
        
        // Observe ticker visibility for performance
        const tickerObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                this.startTickerAnimation();
            } else {
                this.stopTickerAnimation();
            }
        }, { threshold: 0.1 });
        
        tickerObserver.observe(container);
    }
    
    startTickerAnimation() {
        const content = document.getElementById('tickerContent');
        if (!content) return;
        
        content.style.animation = 'scroll-horizontal 40s linear infinite';
    }
    
    stopTickerAnimation() {
        const content = document.getElementById('tickerContent');
        if (!content) return;
        
        content.style.animation = 'none';
    }
    
    // Enhanced Traffic Cards with Hover Effects
    initTrafficCards() {
        const cards = document.querySelectorAll('.traffic-channel-card');
        
        cards.forEach(card => {
            let isHovered = false;
            
            const handleMouseEnter = () => {
                isHovered = true;
                const overlay = card.querySelector('.traffic-card-overlay');
                const content = card.querySelector('.traffic-card-content');
                
                if (overlay) overlay.style.opacity = '1';
                if (content) content.style.opacity = '0';
            };
            
            const handleMouseLeave = () => {
                isHovered = false;
                const overlay = card.querySelector('.traffic-card-overlay');
                const content = card.querySelector('.traffic-card-content');
                
                if (overlay) overlay.style.opacity = '0';
                if (content) content.style.opacity = '1';
            };
            
            // Only add hover effects on non-touch devices
            if (window.matchMedia('(hover: hover)').matches) {
                card.addEventListener('mouseenter', handleMouseEnter);
                card.addEventListener('mouseleave', handleMouseLeave);
            }
            
            // Add click handler for touch devices
            card.addEventListener('click', () => {
                if (!window.matchMedia('(hover: hover)').matches) {
                    if (!isHovered) {
                        handleMouseEnter();
                        setTimeout(handleMouseLeave, 3000); // Auto-hide after 3s
                    } else {
                        handleMouseLeave();
                    }
                }
            });
        });
    }
    
    // Optimized Scroll Handler
    handleScroll() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        
        this.rafId = requestAnimationFrame(() => {
            this.state.scrollY = window.scrollY;
            
            // Add any scroll-dependent effects here
            // For example, parallax effects could be added
        });
    }
    
    // Contact Modal System
    openContactModal(type, title) {
        this.state.contactModal = {
            isOpen: true,
            type,
            title
        };
        
        const modal = document.getElementById('contactModal');
        const modalTitle = document.getElementById('modalTitle');
        const formType = document.getElementById('formType');
        const messageTextarea = document.getElementById('message');
        
        if (!modal || !modalTitle || !formType) return;
        
        modalTitle.textContent = title;
        formType.value = type;
        
        // Update placeholder text based on type
        if (messageTextarea) {
            const placeholders = {
                'work-with-us': 'Tell us about your business, traffic volume, and what kind of partnership you\'re looking for...',
                'join-crew': 'Tell us about your experience in affiliate marketing, your skills, and why you want to join Adders...',
                'apply-now': 'Share your background, experience, and what role you\'re interested in...'
            };
            messageTextarea.placeholder = placeholders[type] || 'Your message...';
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input[type="text"]');
            if (firstInput) firstInput.focus();
        }, 300);
    }
    
    closeContactModal() {
        this.state.contactModal.isOpen = false;
        
        const modal = document.getElementById('contactModal');
        const form = document.getElementById('contactForm');
        const successDiv = document.getElementById('modalSuccess');
        
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Reset form and hide success message after delay
        setTimeout(() => {
            if (form) form.reset();
            if (successDiv) successDiv.classList.add('hidden');
            this.clearFormErrors();
            this.showForm();
        }, 300);
    }
    
    // Enhanced Form Handling
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = document.getElementById('submitBtn');
        const submitText = document.getElementById('submitText');
        
        // Clear previous errors
        this.clearFormErrors();
        
        // Validate form
        const validation = this.validateForm(formData);
        if (!validation.isValid) {
            this.displayFormErrors(validation.errors);
            return;
        }
        
        // Show loading state
        if (submitBtn && submitText) {
            submitBtn.disabled = true;
            submitText.textContent = 'Sending...';
        }
        
        try {
            // Simulate API call
            await this.submitContactForm(formData);
            
            // Show success
            this.showSuccess(formData.get('type'));
            
        } catch (error) {
            this.displayFormErrors({ general: 'Something went wrong. Please try again or contact us directly at contact@adders.team.' });
        } finally {
            // Reset button state
            if (submitBtn && submitText) {
                submitBtn.disabled = false;
                submitText.textContent = 'Send Message';
            }
        }
    }
    
    validateForm(formData) {
        const errors = {};
        let isValid = true;
        
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const message = formData.get('message')?.trim();
        
        if (!name) {
            errors.name = 'Name is required';
            isValid = false;
        }
        
        if (!email) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!this.isValidEmail(email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }
        
        if (!message) {
            errors.message = 'Message is required';
            isValid = false;
        }
        
        return { isValid, errors };
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    displayFormErrors(errors) {
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(`${field}Error`);
            if (errorElement) {
                errorElement.textContent = errors[field];
                errorElement.style.color = '#ef4444';
            }
        });
    }
    
    clearFormErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }
    
    async submitContactForm(formData) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Log form data for demonstration
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company'),
            message: formData.get('message'),
            type: formData.get('type'),
            timestamp: new Date().toISOString()
        };
        
        console.log('Contact form submission:', data);
        
        // In a real application, this would be an actual API call
        // return fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        
        return { success: true };
    }
    
    showSuccess(type) {
        const form = document.getElementById('contactForm');
        const successDiv = document.getElementById('modalSuccess');
        const successMessage = document.getElementById('successMessage');
        
        const messages = {
            'work-with-us': 'Thanks for your interest! Our partnership team will review your submission and get back to you within 24 hours.',
            'join-crew': 'Application received! Our talent team will review your profile and reach out if there\'s a match.',
            'apply-now': 'Your application has been submitted successfully! We\'ll be in touch soon.'
        };
        
        if (successMessage) {
            successMessage.textContent = messages[type] || 'Thank you for reaching out! We\'ll get back to you soon.';
        }
        
        if (form) form.style.display = 'none';
        if (successDiv) successDiv.classList.remove('hidden');
        
        // Auto-close modal after 4 seconds
        setTimeout(() => {
            this.closeContactModal();
        }, 4000);
    }
    
    showForm() {
        const form = document.getElementById('contactForm');
        if (form) form.style.display = 'flex';
    }
    
    // Visibility Change Handler
    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations when tab is not visible
            this.stopTickerAnimation();
            
            if (this.rafId) {
                cancelAnimationFrame(this.rafId);
                this.rafId = null;
            }
            
            if (this.performanceMonitor) {
                cancelAnimationFrame(this.performanceMonitor);
            }
        } else {
            // Resume animations when tab becomes visible
            if (this.state.isLoaded) {
                this.startTickerAnimation();
                
                // Restart performance monitoring
                setTimeout(() => {
                    this.initPerformanceMonitor();
                }, 100);
            }
        }
    }
    
    // Resize Handler
    handleResize() {
        // Recreate background animation if needed
        const container = document.getElementById('bgAnimation');
        if (container && window.innerWidth > 768 && container.children.length < 25) {
            container.innerHTML = '';
            this.initBackgroundAnimation();
        }
        
        // Restart ticker to adjust for new container width
        this.initTicker();
    }
    
    // Utility Functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Cleanup
    destroy() {
        // Cancel all animations
        if (this.rafId) cancelAnimationFrame(this.rafId);
        if (this.performanceMonitor) cancelAnimationFrame(this.performanceMonitor);
        if (this.tickerAnimationId) cancelAnimationFrame(this.tickerAnimationId);
        
        // Disconnect observers
        if (this.intersectionObserver) this.intersectionObserver.disconnect();
        
        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
}

// Additional Performance Optimizations
class PerformanceOptimizer {
    static init() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Optimize images
        this.optimizeImages();
        
        // Enable hardware acceleration for key elements
        this.enableHardwareAcceleration();
        
        // Detect and optimize for low-end devices
        this.detectDeviceCapabilities();
    }
    
    static preloadCriticalResources() {
        const criticalImages = [
            './images/mark-white.png',
            './images/logo-white.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    static optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading optimization
            if (!img.loading) {
                img.loading = 'lazy';
            }
            
            // Add decode hint
            img.decoding = 'async';
        });
    }
    
    static enableHardwareAcceleration() {
        const acceleratedElements = [
            '.hero-section',
            '.traffic-channel-card',
            '.ticker-content',
            '.modal-container'
        ];
        
        acceleratedElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.willChange = 'transform';
                el.style.transform = 'translateZ(0)';
            });
        });
    }
    
    static detectDeviceCapabilities() {
        const isLowEndDevice = 
            navigator.hardwareConcurrency <= 2 || 
            navigator.deviceMemory <= 2 || 
            window.innerWidth < 768;
        
        if (isLowEndDevice) {
            document.body.classList.add('low-end-device');
            
            // Reduce animations
            const style = document.createElement('style');
            style.textContent = `
                .low-end-device .floating-element:nth-child(even) { display: none; }
                .low-end-device .ticker-content { animation-duration: 60s !important; }
                .low-end-device .traffic-channel-card { transition-duration: 0.15s !important; }
            `;
            document.head.appendChild(style);
        }
    }
}

// Modern Service Worker Registration for PWA capabilities
class ServiceWorkerManager {
    static async register() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('ServiceWorker registered successfully:', registration.scope);
            } catch (error) {
                console.log('ServiceWorker registration failed:', error);
            }
        }
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize performance optimizations first
    PerformanceOptimizer.init();
    
    // Initialize main application
    window.addersApp = new AddersApp();
    
    // Register service worker for PWA capabilities
    ServiceWorkerManager.register();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.addersApp) {
        window.addersApp.destroy();
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AddersApp, PerformanceOptimizer };
}