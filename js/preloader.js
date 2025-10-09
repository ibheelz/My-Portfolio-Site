/**
 * PRELOADER
 * Handles loading screen with percentage animation
 */

class Preloader {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.loadingProgress = document.getElementById('loadingProgress');
        this.loadingPercentage = document.getElementById('loadingPercentage');
        this.pressStart = document.getElementById('pressStart');
        this.startButton = document.getElementById('startButton');

        this.currentProgress = 0;
        this.targetProgress = 0;
        this.isComplete = false;

        this.init();
    }

    init() {
        // Start loading simulation
        this.simulateLoading();

        // Add start button listener
        this.startButton.addEventListener('click', () => this.startExperience());

        // Also allow Enter key to start
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !this.pressStart.classList.contains('hidden')) {
                this.startExperience();
            }
        });
    }

    /**
     * Simulate asset loading with realistic progress
     */
    simulateLoading() {
        // Simulate loading various assets
        const loadingSteps = [
            { progress: 20, delay: 300, label: 'Loading assets...' },
            { progress: 40, delay: 400, label: 'Loading fonts...' },
            { progress: 60, delay: 500, label: 'Loading images...' },
            { progress: 80, delay: 600, label: 'Initializing...' },
            { progress: 100, delay: 400, label: 'Ready!' }
        ];

        let currentStep = 0;

        const loadNextStep = () => {
            if (currentStep < loadingSteps.length) {
                const step = loadingSteps[currentStep];
                this.targetProgress = step.progress;

                setTimeout(() => {
                    currentStep++;
                    loadNextStep();
                }, step.delay);
            } else {
                this.onLoadingComplete();
            }
        };

        loadNextStep();

        // Animate progress bar smoothly
        this.animateProgress();
    }

    /**
     * Animate progress bar to target percentage
     */
    animateProgress() {
        const animate = () => {
            if (this.currentProgress < this.targetProgress) {
                // Smooth easing
                const diff = this.targetProgress - this.currentProgress;
                this.currentProgress += diff * 0.1;

                // Round to avoid floating point issues
                if (Math.abs(this.targetProgress - this.currentProgress) < 0.5) {
                    this.currentProgress = this.targetProgress;
                }

                // Update UI
                this.updateProgress(this.currentProgress);

                requestAnimationFrame(animate);
            } else if (!this.isComplete) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    /**
     * Update progress bar and percentage display
     */
    updateProgress(progress) {
        const rounded = Math.round(progress);
        this.loadingProgress.style.width = `${rounded}%`;
        this.loadingPercentage.textContent = `${rounded}%`;
    }

    /**
     * Handle loading completion
     */
    onLoadingComplete() {
        this.isComplete = true;

        // Show press start button after a short delay
        setTimeout(() => {
            this.pressStart.classList.remove('hidden');
        }, 500);
    }

    /**
     * Start the main experience
     */
    startExperience() {
        // Add loaded class to fade out preloader
        this.preloader.classList.add('loaded');

        // Remove preloader from DOM after animation
        setTimeout(() => {
            this.preloader.style.display = 'none';

            // Trigger custom event for main app to start
            document.dispatchEvent(new CustomEvent('preloaderComplete'));

            // Show UI elements
            this.showUIElements();
        }, 500);
    }

    /**
     * Show UI elements after preloader
     */
    showUIElements() {
        const progressContainer = document.getElementById('progressContainer');
        const quickNav = document.getElementById('quickNav');
        const controlsInfo = document.getElementById('controlsInfo');

        // Fade in UI elements with delays
        setTimeout(() => {
            if (progressContainer) progressContainer.classList.add('visible');
        }, 100);

        setTimeout(() => {
            if (quickNav) quickNav.classList.add('visible');
        }, 300);

        setTimeout(() => {
            if (controlsInfo) controlsInfo.classList.add('visible');
        }, 500);
    }
}

// Initialize preloader when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.preloader = new Preloader();
    });
} else {
    window.preloader = new Preloader();
}
