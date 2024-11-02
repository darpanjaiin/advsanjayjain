// Enhanced scroll animations
const scrollElements = document.querySelectorAll('.fade-in-element');

const elementInView = (el, offset = 50) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset);
};

const displayScrollElement = (element) => {
    element.classList.add('fade-in');
};

const hideScrollElement = (element) => {
    element.classList.remove('fade-in');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el)) {
            displayScrollElement(el);
        }
    });
};

// Throttle scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        handleScrollAnimation();
    });
});

// Initialize animations on page load
window.addEventListener('load', handleScrollAnimation);

// Mobile navigation enhancement
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });
}

// Add hover effect for interactive elements
const interactiveElements = document.querySelectorAll('.stat-item, .work-card, .expertise-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'translateY(-5px)';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translateY(0)';
    });
});

// Parallax effect for images
const parallaxImages = document.querySelectorAll('.parallax-img');

window.addEventListener('scroll', () => {
    parallaxImages.forEach(image => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        image.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    });
});

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

// Enhanced Counter Animation
function animateCounter(counter) {
    const target = parseInt(counter.dataset.target);
    const duration = 5000; // 5 seconds
    const steps = 100;
    const stepDuration = duration / steps;
    let current = 0;

    // For the 28 years counter, we'll go up to 29 and then back to 28
    const maxValue = counter.dataset.target === "28" ? 29 : target;

    function updateCounter() {
        current += maxValue / steps;
        
        if (current <= maxValue) {
            counter.textContent = Math.round(current);
            setTimeout(updateCounter, stepDuration);
        } else if (counter.dataset.target === "28" && current >= 29) {
            // Special case for 28: decrease from 29 to 28
            counter.textContent = "28";
        } else {
            counter.textContent = target;
        }
    }

    counter.style.opacity = '1';
    updateCounter();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Create sparkles
    createSparkles();
    
    // Refresh sparkles periodically
    setInterval(createSparkles, 5000);

    // Initialize counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.style.opacity = '1';
        animateCounter(counter);
    });
});

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                counter.style.opacity = '1';
                animateCounter(counter);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe counter sections
document.querySelectorAll('.stats-container').forEach(section => {
    counterObserver.observe(section);
}); 