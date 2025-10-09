/**
 * CHARACTER ANIMATION
 * Sprite-based character animation system
 */

class CharacterAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);

        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // Animation states
        this.states = {
            idle: { frames: 4, speed: 0.1 },
            walk: { frames: 8, speed: 0.15 },
            run: { frames: 8, speed: 0.25 },
            jump: { frames: 6, speed: 0.2 }
        };

        this.currentState = 'idle';
        this.currentFrame = 0;
        this.frameCount = 0;
        this.velocity = 0;

        this.init();
    }

    init() {
        // Since we don't have actual sprite sheets,
        // we'll create a simple procedural character
        this.createCharacter();

        // Listen to scroll events for state changes
        document.addEventListener('customScroll', (e) => {
            this.updateState(e.detail.velocity);
        });

        // Start animation loop
        this.animate();
    }

    /**
     * Create a simple procedural character
     */
    createCharacter() {
        // This will be drawn each frame
        // In production, you'd load sprite sheets here
    }

    /**
     * Update character state based on velocity
     */
    updateState(velocity) {
        this.velocity = velocity;

        if (velocity === 0) {
            this.currentState = 'idle';
        } else if (velocity < 30) {
            this.currentState = 'walk';
        } else {
            this.currentState = 'run';
        }
    }

    /**
     * Main animation loop
     */
    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Update frame
        const state = this.states[this.currentState];
        this.frameCount++;

        if (this.frameCount >= 60 * state.speed) {
            this.currentFrame = (this.currentFrame + 1) % state.frames;
            this.frameCount = 0;
        }

        // Draw character
        this.draw();

        // Continue loop
        requestAnimationFrame(() => this.animate());
    }

    /**
     * Draw the character
     */
    draw() {
        const ctx = this.ctx;
        const centerX = this.width / 2;
        const centerY = this.height / 2;

        // Simple character representation
        // Body
        ctx.fillStyle = '#4A90E2';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
        ctx.fill();

        // Eyes based on animation frame
        const eyeOffset = Math.sin(this.currentFrame * 0.5) * 2;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(centerX - 10, centerY - 10 + eyeOffset, 5, 0, Math.PI * 2);
        ctx.arc(centerX + 10, centerY - 10 + eyeOffset, 5, 0, Math.PI * 2);
        ctx.fill();

        // Pupils
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(centerX - 10, centerY - 10 + eyeOffset, 2, 0, Math.PI * 2);
        ctx.arc(centerX + 10, centerY - 10 + eyeOffset, 2, 0, Math.PI * 2);
        ctx.fill();

        // Mouth
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const mouthY = centerY + 5;

        if (this.currentState === 'idle') {
            ctx.arc(centerX, mouthY, 10, 0.2, Math.PI - 0.2);
        } else {
            ctx.arc(centerX, mouthY, 12, 0.3, Math.PI - 0.3);
        }

        ctx.stroke();

        // Arms/Legs movement based on state
        if (this.currentState !== 'idle') {
            const armAngle = Math.sin(this.currentFrame * 0.8) * 0.3;

            ctx.strokeStyle = '#4A90E2';
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';

            // Left arm
            ctx.beginPath();
            ctx.moveTo(centerX - 20, centerY + 10);
            ctx.lineTo(centerX - 30 + Math.cos(armAngle) * 10, centerY + 25 + Math.sin(armAngle) * 10);
            ctx.stroke();

            // Right arm
            ctx.beginPath();
            ctx.moveTo(centerX + 20, centerY + 10);
            ctx.lineTo(centerX + 30 - Math.cos(armAngle) * 10, centerY + 25 - Math.sin(armAngle) * 10);
            ctx.stroke();
        }

        // Glow effect
        ctx.shadowColor = '#4A90E2';
        ctx.shadowBlur = 15;
        ctx.strokeStyle = 'rgba(74, 144, 226, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    /**
     * Trigger special animation
     */
    triggerAnimation(type) {
        if (this.states[type]) {
            this.currentState = type;
            this.currentFrame = 0;
        }
    }
}

// Export for use in other modules
window.CharacterAnimation = CharacterAnimation;
