/**
 * PARALLAX
 * Multi-layer parallax background system
 */

class Parallax {
    constructor() {
        this.layers = document.querySelectorAll('.parallax-layer');
        this.isMobile = window.innerWidth <= 768;
        this.currentScroll = 0;

        this.init();
    }

    init() {
        // Skip complex parallax on mobile
        if (this.isMobile) {
            this.setupSimpleParallax();
            return;
        }

        // Listen to custom scroll events
        document.addEventListener('customScroll', (e) => {
            this.update(e.detail.scroll);
        });

        // Initial update
        this.update(0);
    }

    /**
     * Simplified parallax for mobile
     */
    setupSimpleParallax() {
        // Simple vertical parallax on mobile
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            this.layers.forEach((layer) => {
                const speed = parseFloat(layer.getAttribute('data-speed')) || 1;
                const yPos = -(scrollY * speed * 0.3);

                layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        }, { passive: true });
    }

    /**
     * Update parallax layers based on scroll position
     */
    update(scroll) {
        if (this.isMobile) return;

        this.currentScroll = scroll;

        // Use requestAnimationFrame for smooth updates
        requestAnimationFrame(() => {
            this.layers.forEach((layer) => {
                const speed = parseFloat(layer.getAttribute('data-speed')) || 1;

                // Calculate parallax offset
                // Slower speed = more depth (moves less)
                const xPos = -(this.currentScroll * speed);

                // Apply transform with hardware acceleration
                layer.style.transform = `translate3d(${xPos}px, 0, 0)`;
                layer.style.willChange = 'transform';
            });
        });
    }

    /**
     * Handle window resize
     */
    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;

        // Reinitialize if switching between mobile/desktop
        if (wasMobile !== this.isMobile) {
            this.layers.forEach((layer) => {
                layer.style.transform = 'translate3d(0, 0, 0)';
            });
            this.init();
        }
    }
}

// Export for use in other modules
window.Parallax = Parallax;
