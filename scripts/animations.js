// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Create intersection observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Special handling for different animation types
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
            
            if (entry.target.classList.contains('skill-progress')) {
                entry.target.classList.add('animate');
            }
        }
    });
}, observerOptions);

// Apply fade-in animation to various elements
const fadeInElements = document.querySelectorAll(`
    .hero-title,
    .hero-description,
    .hero-buttons,
    .section-header,
    .service-card,
    .portfolio-item,
    .contact-item,
    .about-text,
    .about-stats
`);

fadeInElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Apply slide-in animations
const slideInLeftElements = document.querySelectorAll(`
    .about-text,
    .contact-info
`);

slideInLeftElements.forEach(el => {
    el.classList.add('slide-in-left');
    observer.observe(el);
});

const slideInRightElements = document.querySelectorAll(`
    .about-stats,
    .contact-form
`);

slideInRightElements.forEach(el => {
    el.classList.add('slide-in-right');
    observer.observe(el);
});

// Observe skill progress bars and stat numbers
document.querySelectorAll('.skill-progress').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.stat-number').forEach(el => {
    observer.observe(el);
});

// Counter animation for statistics
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    if (hero && scrolled < hero.offsetHeight) {
        // Parallax background
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        
        // Parallax content (slower)
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        
        // Floating cards with different speeds
        floatingCards.forEach((card, index) => {
            const speed = 0.1 + (index * 0.05);
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Mouse cursor effect
let cursor = null;
let cursorFollower = null;

// Create custom cursor only for desktop
if (window.innerWidth > 768) {
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    // Add cursor styles
    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
        .custom-cursor {
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        }
        
        .cursor-follower {
            width: 40px;
            height: 40px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.5;
            transition: all 0.3s ease;
        }
        
        .custom-cursor.hover {
            transform: scale(1.5);
        }
        
        .cursor-follower.hover {
            transform: scale(1.2);
            opacity: 0.8;
        }
        
        body {
            cursor: none;
        }
        
        a, button, .btn {
            cursor: none;
        }
    `;
    document.head.appendChild(cursorStyles);
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        if (cursor && cursorFollower) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Delayed follower
            setTimeout(() => {
                cursorFollower.style.left = (e.clientX - 20) + 'px';
                cursorFollower.style.top = (e.clientY - 20) + 'px';
            }, 100);
        }
    });
    
    // Hover effects for interactive elements
    document.addEventListener('mouseover', (e) => {
        if (e.target.matches('a, button, .btn, .service-card, .portfolio-item, .nav-link')) {
            cursor?.classList.add('hover');
            cursorFollower?.classList.add('hover');
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.matches('a, button, .btn, .service-card, .portfolio-item, .nav-link')) {
            cursor?.classList.remove('hover');
            cursorFollower?.classList.remove('hover');
        }
    });
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    
    typing();
}

// Page load animations
window.addEventListener('load', () => {
    // Remove loading overlay if exists
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    }
    
    // Animate hero elements with stagger
    const heroElements = [
        document.querySelector('.hero-title'),
        document.querySelector('.hero-description'),
        document.querySelector('.hero-buttons')
    ];
    
    heroElements.forEach((element, index) => {
        if (element) {
            element.style.animationDelay = `${index * 0.3}s`;
        }
    });
});

// Smooth reveal animation for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        
        // Check if section is in viewport
        if (scrollPosition > sectionTop - windowHeight + 200 && 
            scrollPosition < sectionTop + sectionHeight) {
            
            section.classList.add('section-revealed');
        }
    });
};

// Add section reveal styles
const revealStyles = document.createElement('style');
revealStyles.textContent = `
    section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    section.section-revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyles);

// Apply section reveal on scroll
window.addEventListener('scroll', debounce(revealSections, 16));

// Initial reveal check
document.addEventListener('DOMContentLoaded', revealSections);

// Text scramble effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.getRandomChar();
                    this.queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    getRandomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply text scramble to hero title on load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const scramble = new TextScramble(heroTitle);
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        setTimeout(() => {
            scramble.setText(originalText);
        }, 1000);
    }
});

// Utility function for debouncing (if not already defined in main.js)
function debounce(func, wait) {
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