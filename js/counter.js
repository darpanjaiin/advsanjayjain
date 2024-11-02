class NumberTicker {
    constructor(element, options = {}) {
        this.element = element;
        this.target = parseInt(element.dataset.target) || 0;
        this.duration = options.duration || 2000; // Animation duration in ms
        this.formatNumber = options.formatNumber ?? true;
        this.easing = options.easing || this.easeOutExpo;
        this.decimals = options.decimals || 0;
        this.current = 0;
        this.startTime = null;
        this.isAnimating = false;
    }

    start() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.startTime = performance.now();
        this.animate();
    }

    animate(currentTime = performance.now()) {
        // Calculate progress (0 to 1)
        const elapsed = currentTime - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);

        // Apply easing
        const easedProgress = this.easing(progress);
        
        // Calculate current value
        this.current = Math.min(easedProgress * this.target, this.target);
        
        // Format and update display
        const displayValue = this.formatValue(this.current);
        this.element.textContent = displayValue;

        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame((time) => this.animate(time));
        } else {
            this.isAnimating = false;
            // Ensure final value is exactly the target
            this.element.textContent = this.formatValue(this.target);
        }
    }

    formatValue(value) {
        const fixed = Number(value).toFixed(this.decimals);
        if (!this.formatNumber) return fixed;
        
        const [whole, decimal] = fixed.split('.');
        const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return decimal ? `${formattedWhole}.${decimal}` : formattedWhole;
    }

    // Easing function for smooth animation
    easeOutExpo(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    reset() {
        this.current = 0;
        this.element.textContent = this.formatValue(0);
        this.isAnimating = false;
        this.startTime = null;
    }
}

// Initialize counters with Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                
                const ticker = new NumberTicker(entry.target, {
                    duration: 2000,    // 2 seconds animation
                    formatNumber: true, // Add thousand separators
                    decimals: 0        // No decimal places
                });
                
                // Reset and start animation
                ticker.reset();
                ticker.start();
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px'
    });

    // Observe all counter elements
    counters.forEach(counter => observer.observe(counter));
}); 