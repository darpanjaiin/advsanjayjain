// Sparkle Effect
function createSparkles() {
    const sparkleContainer = document.querySelector('.sparkle-container');
    if (!sparkleContainer) return;

    // Clear existing sparkles
    sparkleContainer.innerHTML = '';

    // Create new sparkles
    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.width = `${Math.random() * 2 + 1}px`; // Random width between 1-3px
        sparkle.style.height = `${Math.random() * 30 + 10}px`; // Random height between 10-40px
        sparkle.style.animationDelay = `${Math.random() * 5}s`; // Random delay
        sparkle.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random duration between 2-5s
        sparkleContainer.appendChild(sparkle);
    }
}

// Counter Animation with smooth counting effect
function animateCounter(counter) {
    const target = parseInt(counter.dataset.target);
    const duration = 2000; // 2 seconds for counting
    const start = 0;
    const increment = (target - start) / (duration / 16); // 60fps
    let current = start;

    function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Apply easing
        const easedProgress = easeOutQuart(progress);
        current = start + (target - start) * easedProgress;
        
        counter.textContent = Math.round(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            counter.textContent = target;
        }
    }

    const startTime = performance.now();
    requestAnimationFrame(update);
}

// Initialize counters when they become visible
const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                animateCounter(counter);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start observing when document loads
document.addEventListener('DOMContentLoaded', () => {
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        counterObserver.observe(statsContainer);
    }
});

// Enhanced Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Elegant Scroll Animations
const scrollAnimations = () => {
    const elements = document.querySelectorAll('.section-container, .expertise-card, .contact-option');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.section-container, .expertise-card, .contact-option');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    scrollAnimations();
});

// Smooth scroll handling
window.addEventListener('scroll', () => {
    requestAnimationFrame(scrollAnimations);
});

// Add active state to navigation items
function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavItem);
window.addEventListener('load', updateActiveNavItem);

// Add background video source dynamically
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    heroVideo.innerHTML = `
        <source src="https://assets.mixkit.co/videos/preview/mixkit-black-and-white-view-of-a-courthouse-50858-large.mp4" type="video/mp4">
    `;
}

// Add portrait image dynamically
const portraitImg = document.querySelector('.parallax-img');
if (portraitImg) {
    portraitImg.src = "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80";
}

// Parallax and Scroll Effects
const sections = document.querySelectorAll('.section-container');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    scrollObserver.observe(section);
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    document.querySelectorAll('.parallax-bg').forEach(bg => {
        const speed = bg.dataset.speed || 0.5;
        bg.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    document.querySelectorAll('.expertise-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const centerX = rect.left + rect.width / 2;
        const rotateX = (window.innerHeight / 2 - centerY) * 0.01;
        const rotateY = (window.innerWidth / 2 - centerX) * 0.01;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// Disclaimer Modal
const disclaimerLink = document.getElementById('disclaimer-link');
const disclaimerModal = document.getElementById('disclaimer-modal');
const closeModal = document.querySelector('.close-modal');

disclaimerLink.addEventListener('click', (e) => {
    e.preventDefault();
    disclaimerModal.style.display = 'block';
    setTimeout(() => {
        disclaimerModal.style.opacity = '1';
    }, 10);
});

const closeModalFunction = () => {
    disclaimerModal.style.opacity = '0';
    setTimeout(() => {
        disclaimerModal.style.display = 'none';
    }, 300);
};

closeModal.addEventListener('click', closeModalFunction);

window.addEventListener('click', (e) => {
    if (e.target === disclaimerModal) {
        closeModalFunction();
    }
});

// Make expertise cards clickable
document.querySelectorAll('.expertise-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({ 
            behavior: 'smooth'
        });
    });
});

// Parallax scroll effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.section-container').forEach(section => {
        const rate = scrolled * 0.3;
        section.style.transform = `translate3d(0, 0, ${rate}px) scale(${1 + scrolled * 0.0005})`;
    });
});

// Enhanced Parallax and Zoom Effect
function initParallaxZoom() {
    const sections = document.querySelectorAll('section');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateParallax() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            if (rect.top < viewportHeight && rect.bottom > 0) {
                const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
                const scale = 1 + (scrollProgress * 0.1); // Subtle zoom effect
                const translateY = scrollProgress * 30; // Subtle parallax
                
                section.style.transform = `
                    scale(${scale})
                    translateY(${translateY}px)
                    translateZ(0)
                `;
                section.style.opacity = Math.min(1, 0.4 + scrollProgress);
            }
        });
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial update
    updateParallax();
}

// Make expertise cards clickable
document.querySelectorAll('.expertise-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelector('.quick-contact').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Enhanced smooth scroll for navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 100;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initParallaxZoom();
    createSparkles();
    
    // Initialize counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.style.opacity = '1';
        animateCounter(counter);
    });

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});