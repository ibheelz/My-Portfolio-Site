/**
 * SCROLL CONTROLLER
 * Handles horizontal scrolling with mouse, keyboard, and touch
 */

class ScrollController {
    constructor() {
        this.contentWrapper = document.getElementById('contentWrapper');
        this.progressFill = document.getElementById('progressFill');
        this.progressPercentage = document.getElementById('progressPercentage');
        this.navDots = document.querySelectorAll('.nav-dot');

        this.currentScroll = 0;
        this.targetScroll = 0;
        this.maxScroll = 0;
        this.velocity = 0;
        this.isAnimating = false;
        this.isMobile = window.innerWidth <= 768;

        // Touch handling
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isTouching = false;

        // Keyboard handling
        this.keys = {};

        // Throttle settings
        this.lastScrollTime = 0;
        this.scrollThrottle = 16; // ~60fps

        this.init();
    }

    init() {
        // Calculate max scroll distance
        this.calculateMaxScroll();

        // Skip horizontal scroll setup on mobile (use native vertical scroll)
        if (this.isMobile) {
            this.setupMobileScroll();
            return;
        }

        // Set up event listeners for desktop
        this.setupMouseWheel();
        this.setupKeyboard();
        this.setupTouch();
        this.setupNavigation();

        // Start animation loop
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Listen for section changes
        this.observeSections();
    }

    /**
     * Calculate maximum scroll distance
     */
    calculateMaxScroll() {
        if (this.isMobile) {
            this.maxScroll = 0; // Native scroll on mobile
            return;
        }

        const wrapperWidth = this.contentWrapper.scrollWidth;
        const viewportWidth = window.innerWidth;
        this.maxScroll = wrapperWidth - viewportWidth;
    }

    /**
     * Setup for mobile vertical scrolling
     */
    setupMobileScroll() {
        // On mobile, just track native scroll for progress bar
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / height) * 100;

            if (this.progressFill) {
                this.progressFill.style.width = `${progress}%`;
            }
            if (this.progressPercentage) {
                this.progressPercentage.textContent = `${Math.round(progress)}%`;
            }

            this.updateActiveSection();
        });
    }

    /**
     * Setup mouse wheel scrolling
     */
    setupMouseWheel() {
        let lastWheelTime = 0;

        const handleWheel = (e) => {
            const now = Date.now();

            // Throttle scroll events
            if (now - lastWheelTime < this.scrollThrottle) {
                return;
            }

            lastWheelTime = now;

            // Prevent default scroll behavior
            e.preventDefault();

            // Calculate scroll delta
            const delta = e.deltaY || e.deltaX;

            // Update target scroll with smoothing
            this.targetScroll += delta * 1.5;
            this.targetScroll = Math.max(0, Math.min(this.targetScroll, this.maxScroll));

            // Update velocity for character animation
            this.velocity = Math.abs(delta);
        };

        // Use passive: false to allow preventDefault
        window.addEventListener('wheel', handleWheel, { passive: false });
    }

    /**
     * Setup keyboard controls (arrow keys)
     */
    setupKeyboard() {
        const scrollSpeed = 50;
        const scrollAcceleration = 5;

        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;

            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });

        // Update target scroll based on held keys
        const updateKeyboardScroll = () => {
            let movement = 0;

            if (this.keys['ArrowRight']) {
                movement = scrollSpeed;
                this.velocity = scrollSpeed;
            } else if (this.keys['ArrowLeft']) {
                movement = -scrollSpeed;
                this.velocity = scrollSpeed;
            } else {
                this.velocity *= 0.9; // Decay velocity
            }

            if (movement !== 0) {
                this.targetScroll += movement;
                this.targetScroll = Math.max(0, Math.min(this.targetScroll, this.maxScroll));
            }

            requestAnimationFrame(updateKeyboardScroll);
        };

        updateKeyboardScroll();
    }

    /**
     * Setup touch/swipe controls
     */
    setupTouch() {
        let startX = 0;
        let startScroll = 0;

        window.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startScroll = this.currentScroll;
            this.isTouching = true;
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (!this.isTouching) return;

            const deltaX = startX - e.touches[0].clientX;
            this.targetScroll = startScroll + deltaX * 2;
            this.targetScroll = Math.max(0, Math.min(this.targetScroll, this.maxScroll));
        }, { passive: true });

        window.addEventListener('touchend', () => {
            this.isTouching = false;
        }, { passive: true });
    }

    /**
     * Setup quick navigation dots
     */
    setupNavigation() {
        this.navDots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const section = dot.getAttribute('data-section');
                this.scrollToSection(section);
            });
        });
    }

    /**
     * Scroll to specific section
     */
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);

        if (!section) return;

        if (this.isMobile) {
            // Use native scroll on mobile
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Calculate section position
            const sectionLeft = section.offsetLeft;
            this.targetScroll = sectionLeft;
        }
    }

    /**
     * Main animation loop
     */
    animate() {
        if (this.isMobile) return;

        // Smooth scrolling with easing
        const diff = this.targetScroll - this.currentScroll;
        this.currentScroll += diff * 0.1; // Easing factor

        // Update transform
        this.contentWrapper.style.transform = `translate3d(-${this.currentScroll}px, 0, 0)`;

        // Update progress bar
        const progress = (this.currentScroll / this.maxScroll) * 100;
        if (this.progressFill) {
            this.progressFill.style.width = `${progress}%`;
        }
        if (this.progressPercentage) {
            this.progressPercentage.textContent = `${Math.round(progress)}%`;
        }

        // Update active section
        this.updateActiveSection();

        // Dispatch scroll event for parallax and other listeners
        document.dispatchEvent(new CustomEvent('customScroll', {
            detail: {
                scroll: this.currentScroll,
                velocity: this.velocity,
                progress: progress
            }
        }));

        // Continue animation
        requestAnimationFrame(() => this.animate());
    }

    /**
     * Update active navigation dot based on scroll position
     */
    updateActiveSection() {
        const sections = document.querySelectorAll('.game-section');
        let currentSection = null;

        if (this.isMobile) {
            // Mobile: use window scroll
            const scrollPos = window.scrollY + window.innerHeight / 2;

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    currentSection = section.getAttribute('data-section');
                }
            });
        } else {
            // Desktop: use horizontal scroll
            const scrollPos = this.currentScroll + window.innerWidth / 2;

            sections.forEach((section) => {
                const sectionLeft = section.offsetLeft;
                const sectionRight = sectionLeft + section.offsetWidth;

                if (scrollPos >= sectionLeft && scrollPos < sectionRight) {
                    currentSection = section.getAttribute('data-section');
                }
            });
        }

        // Update navigation dots
        this.navDots.forEach((dot) => {
            const section = dot.getAttribute('data-section');
            if (section === currentSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    /**
     * Observe sections for visibility
     */
    observeSections() {
        const sections = document.querySelectorAll('.game-section');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');

                        // Trigger section-specific animations
                        const sectionType = entry.target.getAttribute('data-section');
                        document.dispatchEvent(new CustomEvent('sectionVisible', {
                            detail: { section: sectionType }
                        }));
                    }
                });
            },
            {
                threshold: 0.3,
                root: this.isMobile ? null : document.querySelector('.game-container')
            }
        );

        sections.forEach((section) => observer.observe(section));
    }

    /**
     * Handle window resize
     */
    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;

        // Recalculate max scroll
        this.calculateMaxScroll();

        // If switching between mobile/desktop, reinitialize
        if (wasMobile !== this.isMobile) {
            this.currentScroll = 0;
            this.targetScroll = 0;

            if (this.isMobile) {
                this.contentWrapper.style.transform = 'none';
            }
        }
    }

    /**
     * Get current scroll information
     */
    getScrollInfo() {
        return {
            current: this.currentScroll,
            target: this.targetScroll,
            max: this.maxScroll,
            velocity: this.velocity,
            progress: (this.currentScroll / this.maxScroll) * 100
        };
    }
}

// Export for use in other modules
window.ScrollController = ScrollController;
