/**
 * GAME ENGINE
 * Physics, jumping, collision detection, and game mechanics
 */

class GameEngine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();

        // Player properties
        this.player = {
            x: 100,
            y: 0,
            width: 40,
            height: 60,
            velocityX: 0,
            velocityY: 0,
            speed: 5,
            jumpPower: -15,
            onGround: false,
            facing: 'right'
        };

        // Game state
        this.score = 0;
        this.coinsCollected = 0;
        this.totalCoins = 20;
        this.gravity = 0.6;
        this.friction = 0.8;

        // Input handling
        this.keys = {};
        this.platforms = [];
        this.collectibles = [];

        // Scroll offset
        this.scrollOffset = 0;

        this.init();
    }

    init() {
        this.setupInput();
        this.setupCollectibles();
        this.setupPlatforms();
        this.updateHUD();

        // Start game loop
        this.gameLoop();

        // Listen for scroll events
        document.addEventListener('customScroll', (e) => {
            this.scrollOffset = e.detail.scroll || 0;
        });

        // Show HUD
        const hud = document.getElementById('gameHUD');
        if (hud) {
            setTimeout(() => {
                hud.classList.add('visible');
            }, 500);
        }
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    setupInput() {
        // Keyboard input
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;

            // Jump on spacebar
            if (e.key === ' ' && this.player.onGround) {
                e.preventDefault();
                this.player.velocityY = this.player.jumpPower;
                this.player.onGround = false;
                this.createJumpParticles();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    setupCollectibles() {
        // Get all collectible elements
        const collectibleEls = document.querySelectorAll('.collectible');

        collectibleEls.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);

            this.collectibles.push({
                element: el,
                x: parseFloat(style.left) || rect.left,
                y: window.innerHeight - parseFloat(style.bottom) - 30,
                width: 30,
                height: 30,
                points: parseInt(el.getAttribute('data-points')) || 100,
                type: el.classList.contains('star') ? 'star' : 'coin',
                collected: false
            });
        });
    }

    setupPlatforms() {
        // Get all platform elements
        const platformEls = document.querySelectorAll('.platform');

        platformEls.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);

            this.platforms.push({
                element: el,
                x: parseFloat(style.left) || rect.left,
                y: window.innerHeight - parseFloat(style.bottom) - 40,
                width: parseFloat(style.width) || rect.width,
                height: 40
            });
        });
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        // Horizontal movement
        if (this.keys['ArrowLeft'] || this.keys['a']) {
            this.player.velocityX = -this.player.speed;
            this.player.facing = 'left';
        } else if (this.keys['ArrowRight'] || this.keys['d']) {
            this.player.velocityX = this.player.speed;
            this.player.facing = 'right';
        } else {
            this.player.velocityX *= this.friction;
        }

        // Apply gravity
        if (!this.player.onGround) {
            this.player.velocityY += this.gravity;
        }

        // Update position
        this.player.x += this.player.velocityX;
        this.player.y += this.player.velocityY;

        // Keep player within bounds (with scroll offset)
        const minX = this.scrollOffset;
        const maxX = this.scrollOffset + window.innerWidth - this.player.width;

        if (this.player.x < minX) {
            this.player.x = minX;
        } else if (this.player.x > maxX) {
            this.player.x = maxX;
        }

        // Ground collision
        const groundY = window.innerHeight - this.player.height;
        if (this.player.y >= groundY) {
            this.player.y = groundY;
            this.player.velocityY = 0;
            this.player.onGround = true;
        } else {
            this.player.onGround = false;
        }

        // Platform collision
        this.checkPlatformCollisions();

        // Collectible collision
        this.checkCollectibleCollisions();
    }

    checkPlatformCollisions() {
        this.platforms.forEach((platform) => {
            // Adjust platform position for scroll
            const platformX = platform.x - this.scrollOffset;

            // Check if player is above platform and falling
            if (
                this.player.velocityY >= 0 &&
                this.player.x + this.player.width > platformX &&
                this.player.x < platformX + platform.width &&
                this.player.y + this.player.height >= platform.y &&
                this.player.y + this.player.height <= platform.y + 20
            ) {
                this.player.y = platform.y - this.player.height;
                this.player.velocityY = 0;
                this.player.onGround = true;
            }
        });
    }

    checkCollectibleCollisions() {
        this.collectibles.forEach((collectible) => {
            if (collectible.collected) return;

            // Adjust collectible position for scroll
            const collectibleX = collectible.x - this.scrollOffset;

            // Check collision
            if (
                this.player.x + this.player.width > collectibleX &&
                this.player.x < collectibleX + collectible.width &&
                this.player.y + this.player.height > collectible.y &&
                this.player.y < collectible.y + collectible.height
            ) {
                this.collectItem(collectible);
            }
        });
    }

    collectItem(collectible) {
        collectible.collected = true;

        // Update score
        this.score += collectible.points;

        if (collectible.type === 'coin') {
            this.coinsCollected++;
        }

        this.updateHUD();

        // Animate collection
        if (collectible.element) {
            collectible.element.classList.add('collected');
        }

        // Show score popup
        this.showScorePopup(collectible.points, collectible.x, collectible.y);

        // Create particles
        this.createCollectParticles(collectible);

        // Play sound effect (optional)
        this.playCollectSound();
    }

    createJumpParticles() {
        for (let i = 0; i < 5; i++) {
            this.createParticle(
                this.player.x + this.player.width / 2,
                this.player.y + this.player.height,
                '#888',
                Math.random() * 10 - 5
            );
        }
    }

    createCollectParticles(collectible) {
        const color = collectible.type === 'star' ? '#FFD700' : '#4A90E2';

        for (let i = 0; i < 10; i++) {
            this.createParticle(
                collectible.x + collectible.width / 2,
                collectible.y + collectible.height / 2,
                color,
                Math.random() * 20 - 10
            );
        }
    }

    createParticle(x, y, color, offsetX = 0) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            left: ${x - this.scrollOffset}px;
            top: ${y}px;
            background: ${color};
            --particle-x: ${offsetX}px;
        `;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }

    showScorePopup(points, x, y) {
        const popup = document.createElement('div');
        popup.className = 'score-popup';
        popup.textContent = `+${points}`;
        popup.style.cssText = `
            position: fixed;
            left: ${x - this.scrollOffset}px;
            top: ${y}px;
        `;

        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 1000);
    }

    playCollectSound() {
        // Optional: Add sound effect
        // const audio = new Audio('assets/sounds/collect.mp3');
        // audio.volume = 0.3;
        // audio.play();
    }

    updateHUD() {
        const scoreEl = document.getElementById('gameScore');
        const coinsEl = document.getElementById('coinsCollected');

        if (scoreEl) {
            scoreEl.textContent = this.score.toString().padStart(4, '0');
        }

        if (coinsEl) {
            coinsEl.textContent = this.coinsCollected;
        }
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Save context state
        this.ctx.save();

        // Draw player
        this.drawPlayer();

        // Restore context
        this.ctx.restore();
    }

    drawPlayer() {
        const ctx = this.ctx;

        // Calculate player position on canvas (accounting for scroll)
        const drawX = this.player.x - this.scrollOffset;
        const drawY = this.player.y;

        // Draw shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(
            drawX + this.player.width / 2,
            drawY + this.player.height + 5,
            this.player.width / 2,
            8,
            0,
            0,
            Math.PI * 2
        );
        ctx.fill();

        // Draw character body
        ctx.fillStyle = '#4A90E2';
        ctx.fillRect(drawX + 8, drawY + 20, 24, 30);

        // Draw head
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(drawX + 20, drawY + 12, 12, 0, Math.PI * 2);
        ctx.fill();

        // Draw eyes
        ctx.fillStyle = '#000';
        const eyeOffsetX = this.player.facing === 'right' ? 4 : -4;
        ctx.beginPath();
        ctx.arc(drawX + 17 + eyeOffsetX, drawY + 10, 2, 0, Math.PI * 2);
        ctx.arc(drawX + 23 + eyeOffsetX, drawY + 10, 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw mouth
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (this.player.onGround) {
            ctx.arc(drawX + 20, drawY + 14, 4, 0, Math.PI);
        } else {
            ctx.arc(drawX + 20, drawY + 14, 4, Math.PI, Math.PI * 2);
        }
        ctx.stroke();

        // Draw arms (animated when moving)
        const armAngle = this.player.velocityX !== 0 ? Math.sin(Date.now() * 0.01) * 0.3 : 0;

        ctx.strokeStyle = '#4A90E2';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        // Left arm
        ctx.beginPath();
        ctx.moveTo(drawX + 12, drawY + 28);
        ctx.lineTo(drawX + 5 + Math.cos(armAngle) * 8, drawY + 38 + Math.sin(armAngle) * 8);
        ctx.stroke();

        // Right arm
        ctx.beginPath();
        ctx.moveTo(drawX + 28, drawY + 28);
        ctx.lineTo(drawX + 35 - Math.cos(armAngle) * 8, drawY + 38 - Math.sin(armAngle) * 8);
        ctx.stroke();

        // Draw legs (animated when moving)
        const legAngle = this.player.velocityX !== 0 ? Math.sin(Date.now() * 0.01) * 0.4 : 0;

        // Left leg
        ctx.beginPath();
        ctx.moveTo(drawX + 14, drawY + 50);
        ctx.lineTo(drawX + 10 + Math.cos(legAngle) * 6, drawY + 60 + Math.sin(Math.abs(legAngle)) * 5);
        ctx.stroke();

        // Right leg
        ctx.beginPath();
        ctx.moveTo(drawX + 26, drawY + 50);
        ctx.lineTo(drawX + 30 - Math.cos(legAngle) * 6, drawY + 60 + Math.sin(Math.abs(legAngle)) * 5);
        ctx.stroke();

        // Glow effect
        ctx.shadowColor = '#4A90E2';
        ctx.shadowBlur = 15;
        ctx.strokeStyle = 'rgba(74, 144, 226, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(drawX, drawY, this.player.width, this.player.height);
        ctx.shadowBlur = 0;
    }

    getPlayerInfo() {
        return {
            x: this.player.x,
            y: this.player.y,
            velocityX: this.player.velocityX,
            velocityY: this.player.velocityY,
            onGround: this.player.onGround,
            score: this.score,
            coinsCollected: this.coinsCollected
        };
    }
}

// Export for use in other modules
window.GameEngine = GameEngine;
