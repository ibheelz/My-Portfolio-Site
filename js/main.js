/**
 * MAIN
 * Initialize and coordinate all modules
 */

class InteractiveResume {
    constructor() {
        this.resumeData = null;
        this.modules = {};
        this.achievements = new Set();
        this.isReady = false;

        this.init();
    }

    async init() {
        // Load resume data first
        await this.loadResumeData();

        // Wait for preloader to complete
        document.addEventListener('preloaderComplete', () => {
            this.onPreloaderComplete();
        });

        // Set up achievements system
        this.setupAchievements();

        // Set up easter eggs
        this.setupEasterEggs();

        // Set up accessibility features
        this.setupAccessibility();

        // Set up download CV button
        this.setupDownloadCV();
    }

    /**
     * Load resume data from JSON
     */
    async loadResumeData() {
        try {
            const response = await fetch('data/resume-data.json');
            this.resumeData = await response.json();

            // Populate hero section
            this.populateHeroSection();

            // Populate social links
            this.populateSocialLinks();

            // Populate achievements
            this.populateAchievements();
        } catch (error) {
            console.error('Error loading resume data:', error);
        }
    }

    /**
     * Initialize all modules after preloader
     */
    onPreloaderComplete() {
        this.isReady = true;

        // Initialize game engine first
        this.modules.gameEngine = new window.GameEngine();

        // Initialize other modules
        this.modules.scrollController = new window.ScrollController();
        this.modules.parallax = new window.Parallax();
        this.modules.characterAnimation = new window.CharacterAnimation('characterCanvas');
        this.modules.skillsAnimation = new window.SkillsAnimation();
        this.modules.timeline = new window.Timeline();
        this.modules.contactForm = new window.ContactForm();

        // Trigger hero animations
        this.animateHeroSection();

        // Unlock first achievement
        setTimeout(() => {
            this.unlockAchievement('First Scroll');
        }, 2000);
    }

    /**
     * Populate hero section with data
     */
    populateHeroSection() {
        if (!this.resumeData) return;

        const { personal } = this.resumeData;

        // Name
        const nameEl = document.getElementById('heroName');
        if (nameEl) {
            nameEl.textContent = personal.name;
        }

        // Title
        const titleEl = document.getElementById('heroTitle');
        if (titleEl) {
            titleEl.textContent = personal.title;
        }

        // Location
        const locationEl = document.getElementById('heroLocation');
        if (locationEl) {
            locationEl.textContent = personal.location;
        }

        // Interests
        const interestsEl = document.getElementById('heroInterests');
        if (interestsEl && personal.interests) {
            interestsEl.textContent = personal.interests.join(', ');
        }
    }

    /**
     * Animate hero section with typewriter effect
     */
    animateHeroSection() {
        const nameEl = document.getElementById('heroName');
        const titleEl = document.getElementById('heroTitle');

        if (nameEl) {
            this.typewriterEffect(nameEl, 50);
        }

        if (titleEl) {
            setTimeout(() => {
                this.typewriterEffect(titleEl, 30);
            }, 1000);
        }
    }

    /**
     * Typewriter effect
     */
    typewriterEffect(element, speed) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '3px solid var(--primary-blue)';
        element.style.paddingRight = '5px';

        let index = 0;

        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 500);
            }
        };

        type();
    }

    /**
     * Populate social links
     */
    populateSocialLinks() {
        if (!this.resumeData) return;

        const container = document.getElementById('socialPlatforms');
        if (!container) return;

        const { social } = this.resumeData.personal;
        const icons = {
            github: '🔗',
            linkedin: '💼',
            twitter: '🐦',
            portfolio: '🌐',
            dribbble: '🎨'
        };

        Object.entries(social).forEach(([platform, url]) => {
            const link = document.createElement('a');
            link.href = url;
            link.className = 'social-link';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            const icon = document.createElement('span');
            icon.className = 'social-icon';
            icon.textContent = icons[platform] || '🔗';

            const name = document.createElement('span');
            name.textContent = platform.charAt(0).toUpperCase() + platform.slice(1);

            link.appendChild(icon);
            link.appendChild(name);
            container.appendChild(link);
        });
    }

    /**
     * Setup achievements system
     */
    setupAchievements() {
        // Listen for section visibility
        document.addEventListener('sectionVisible', (e) => {
            const section = e.detail.section;

            if (section === 'skills' && !this.achievements.has('Skills Unlocked')) {
                this.unlockAchievement('Skills Unlocked');
            } else if (section === 'experience' && !this.achievements.has('Experience Master')) {
                this.unlockAchievement('Experience Master');
            }
        });

        // Listen for achievement unlocks
        document.addEventListener('achievementUnlocked', (e) => {
            this.unlockAchievement(e.detail.name);
        });
    }

    /**
     * Populate achievements list
     */
    populateAchievements() {
        if (!this.resumeData) return;

        const container = document.getElementById('achievementList');
        if (!container) return;

        this.resumeData.achievements.forEach((achievement) => {
            const item = document.createElement('div');
            item.className = 'achievement-item';
            item.setAttribute('data-achievement', achievement.name);

            const icon = document.createElement('span');
            icon.className = 'achievement-icon';
            icon.textContent = achievement.icon;

            const name = document.createElement('span');
            name.className = 'achievement-name';
            name.textContent = achievement.name;

            item.appendChild(icon);
            item.appendChild(name);
            container.appendChild(item);
        });
    }

    /**
     * Unlock achievement
     */
    unlockAchievement(name) {
        if (this.achievements.has(name)) return;

        this.achievements.add(name);

        const item = document.querySelector(`[data-achievement="${name}"]`);
        if (item) {
            item.classList.add('unlocked');
        }

        // Show notification (optional)
        this.showAchievementNotification(name);
    }

    /**
     * Show achievement notification
     */
    showAchievementNotification(name) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #7B68EE, #4A90E2);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
        `;

        notification.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px;">🎉 Achievement Unlocked!</div>
            <div>${name}</div>
        `;

        document.body.appendChild(notification);

        // Remove after animation
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    /**
     * Setup easter eggs
     */
    setupEasterEggs() {
        // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
        const konamiCode = [
            'ArrowUp',
            'ArrowUp',
            'ArrowDown',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'ArrowLeft',
            'ArrowRight',
            'b',
            'a'
        ];
        let konamiIndex = 0;

        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;

                if (konamiIndex === konamiCode.length) {
                    this.triggerKonamiCode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    /**
     * Trigger Konami Code easter egg
     */
    triggerKonamiCode() {
        const easterEgg = document.getElementById('easterEgg');
        if (easterEgg) {
            easterEgg.classList.remove('hidden');
            this.unlockAchievement('Secret Found');
        }
    }

    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Reduced motion toggle
        const reducedMotionToggle = document.getElementById('reducedMotionToggle');

        if (reducedMotionToggle) {
            reducedMotionToggle.addEventListener('click', () => {
                document.body.classList.toggle('reduced-motion');

                const isReduced = document.body.classList.contains('reduced-motion');
                reducedMotionToggle.setAttribute('aria-pressed', isReduced);
            });
        }

        // Sound toggle
        const soundToggle = document.getElementById('soundToggle');
        let soundEnabled = false;

        if (soundToggle) {
            soundToggle.addEventListener('click', () => {
                soundEnabled = !soundEnabled;
                soundToggle.setAttribute('aria-pressed', soundEnabled);

                const icon = soundToggle.querySelector('.sound-icon');
                if (icon) {
                    icon.textContent = soundEnabled ? '🔊' : '🔇';
                }
            });
        }

        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
        }
    }

    /**
     * Setup download CV button
     */
    setupDownloadCV() {
        const downloadButton = document.getElementById('downloadCV');

        if (downloadButton) {
            downloadButton.addEventListener('click', () => {
                // In production, link to actual PDF
                // For now, show a message
                alert('CV download would start here. Link to your PDF file!');

                // You could generate a PDF dynamically or link to a static file
                // window.open('path/to/your-cv.pdf', '_blank');
            });
        }
    }

    /**
     * Get current state
     */
    getState() {
        return {
            isReady: this.isReady,
            achievements: Array.from(this.achievements),
            resumeData: this.resumeData
        };
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new InteractiveResume();
    });
} else {
    window.app = new InteractiveResume();
}
