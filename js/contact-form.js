/**
 * CONTACT FORM
 * Form validation and submission handling
 */

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.nameInput = document.getElementById('contactName');
        this.emailInput = document.getElementById('contactEmail');
        this.messageInput = document.getElementById('contactMessage');
        this.successMessage = document.getElementById('formSuccess');

        this.init();
    }

    init() {
        if (!this.form) return;

        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation
        this.nameInput?.addEventListener('blur', () => this.validateName());
        this.emailInput?.addEventListener('blur', () => this.validateEmail());
        this.messageInput?.addEventListener('blur', () => this.validateMessage());

        // Clear errors on input
        [this.nameInput, this.emailInput, this.messageInput].forEach((input) => {
            input?.addEventListener('input', () => {
                this.clearError(input);
            });
        });
    }

    /**
     * Validate name field
     */
    validateName() {
        const value = this.nameInput.value.trim();

        if (value.length < 2) {
            this.showError(this.nameInput, 'Name must be at least 2 characters');
            return false;
        }

        this.clearError(this.nameInput);
        return true;
    }

    /**
     * Validate email field
     */
    validateEmail() {
        const value = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
            this.showError(this.emailInput, 'Please enter a valid email address');
            return false;
        }

        this.clearError(this.emailInput);
        return true;
    }

    /**
     * Validate message field
     */
    validateMessage() {
        const value = this.messageInput.value.trim();

        if (value.length < 10) {
            this.showError(this.messageInput, 'Message must be at least 10 characters');
            return false;
        }

        this.clearError(this.messageInput);
        return true;
    }

    /**
     * Show error message
     */
    showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');

        formGroup.classList.add('error');
        errorElement.textContent = message;

        // Shake animation
        input.style.animation = 'none';
        setTimeout(() => {
            input.style.animation = 'errorShake 0.5s ease';
        }, 10);
    }

    /**
     * Clear error message
     */
    clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');

        formGroup.classList.remove('error');
        errorElement.textContent = '';
        input.style.animation = 'none';
    }

    /**
     * Handle form submission
     */
    async handleSubmit() {
        // Validate all fields
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isMessageValid = this.validateMessage();

        if (!isNameValid || !isEmailValid || !isMessageValid) {
            return;
        }

        // Get form data
        const formData = {
            name: this.nameInput.value.trim(),
            email: this.emailInput.value.trim(),
            message: this.messageInput.value.trim()
        };

        // Show loading state
        const submitButton = this.form.querySelector('.submit-button');
        const originalText = submitButton.querySelector('.button-text').textContent;
        submitButton.querySelector('.button-text').textContent = 'SENDING...';
        submitButton.disabled = true;

        try {
            // Simulate API call (replace with actual endpoint)
            await this.simulateSubmission(formData);

            // Show success message
            this.showSuccess();

            // Unlock achievement
            this.unlockAchievement('Contact Made');

            // Reset form
            this.form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Sorry, there was an error sending your message. Please try again.');
        } finally {
            // Reset button
            submitButton.querySelector('.button-text').textContent = originalText;
            submitButton.disabled = false;
        }
    }

    /**
     * Simulate form submission (replace with actual API call)
     */
    async simulateSubmission(data) {
        return new Promise((resolve) => {
            console.log('Form data:', data);
            setTimeout(resolve, 1500);
        });
    }

    /**
     * Show success message
     */
    showSuccess() {
        // Hide form
        this.form.style.display = 'none';

        // Show success message
        this.successMessage.classList.remove('hidden');

        // Trigger confetti
        this.triggerConfetti();

        // Reset after delay
        setTimeout(() => {
            this.successMessage.classList.add('hidden');
            this.form.style.display = 'flex';
        }, 5000);
    }

    /**
     * Trigger confetti animation
     */
    triggerConfetti() {
        const victoryAnimation = document.getElementById('victoryAnimation');
        if (!victoryAnimation) return;

        victoryAnimation.classList.remove('hidden');

        // Simple confetti effect
        const canvas = document.getElementById('confettiCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#4A90E2', '#7B68EE', '#50E3C2', '#F5A623', '#4CAF50'];

        // Create particles
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: -10,
                size: Math.random() * 10 + 5,
                speedY: Math.random() * 3 + 2,
                speedX: Math.random() * 4 - 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360
            });
        }

        // Animate particles
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let hasActiveParticles = false;

            particles.forEach((p) => {
                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += 5;

                if (p.y < canvas.height) {
                    hasActiveParticles = true;

                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation * Math.PI) / 180);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    ctx.restore();
                }
            });

            if (hasActiveParticles) {
                requestAnimationFrame(animate);
            } else {
                victoryAnimation.classList.add('hidden');
            }
        };

        animate();
    }

    /**
     * Unlock achievement
     */
    unlockAchievement(achievementName) {
        document.dispatchEvent(
            new CustomEvent('achievementUnlocked', {
                detail: { name: achievementName }
            })
        );
    }
}

// Export for use in other modules
window.ContactForm = ContactForm;
