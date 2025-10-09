/**
 * GAME ENTITIES
 * Player, Platforms, Collectibles, Enemies, Particles
 */

// ============================================
// PLAYER CLASS
// ============================================
class Player {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 48;

        // Physics
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 4;
        this.maxSpeed = 6;
        this.acceleration = 0.5;
        this.jumpPower = -12;
        this.doubleJumpPower = -10;
        this.wallSlideSpeed = 2;
        this.wallJumpPower = { x: 8, y: -11 };

        // State
        this.onGround = false;
        this.canDoubleJump = false;
        this.hasDoubleJumped = false;
        this.onWall = false;
        this.wallDirection = 0;
        this.facing = 1; // 1 = right, -1 = left
        this.state = 'idle'; // idle, walk, run, jump, fall, wallSlide

        // Combat
        this.health = 3;
        this.maxHealth = 3;
        this.invincible = false;
        this.invincibleTime = 0;
        this.invincibleDuration = 2000;

        // Coyote time (jump grace period)
        this.coyoteTime = 0;
        this.coyoteTimeMax = 0.1;

        // Jump buffering
        this.jumpBuffer = 0;
        this.jumpBufferMax = 0.1;

        // Animation
        this.animationFrame = 0;
        this.animationSpeed = 0.15;
        this.animationTimer = 0;
    }

    update() {
        this.handleInput();
        this.applyPhysics();
        this.updateState();
        this.updateAnimation();
        this.updateTimers();
        this.constrainToWorld();
    }

    handleInput() {
        const keys = this.game.keys;

        // Horizontal movement
        let targetVelocity = 0;

        if (keys['ArrowLeft'] || keys['a']) {
            targetVelocity = -this.maxSpeed;
            this.facing = -1;
        } else if (keys['ArrowRight'] || keys['d']) {
            targetVelocity = this.maxSpeed;
            this.facing = 1;
        }

        // Apply acceleration/deceleration
        if (targetVelocity !== 0) {
            this.velocityX += (targetVelocity - this.velocityX) * this.acceleration;
        } else {
            this.velocityX *= (this.onGround ? this.game.friction : this.game.airResistance);
        }

        // Jump
        if ((keys['ArrowUp'] || keys['w'] || keys[' '] || keys['Space']) && !this.jumpPressed) {
            this.jumpPressed = true;
            this.jump();
        }

        if (!(keys['ArrowUp'] || keys['w'] || keys[' '] || keys['Space'])) {
            this.jumpPressed = false;
        }

        // Wall jump
        if (this.onWall && (keys['ArrowUp'] || keys['w'] || keys[' '] || keys['Space']) && !this.wallJumpPressed) {
            this.wallJumpPressed = true;
            this.wallJump();
        }

        if (!(keys['ArrowUp'] || keys['w'] || keys[' '] || keys['Space'])) {
            this.wallJumpPressed = false;
        }
    }

    jump() {
        // Ground jump
        if (this.onGround || this.coyoteTime > 0) {
            this.velocityY = this.jumpPower;
            this.onGround = false;
            this.coyoteTime = 0;
            this.canDoubleJump = true;
            this.hasDoubleJumped = false;
            this.createJumpParticles();
        }
        // Double jump
        else if (this.canDoubleJump && !this.hasDoubleJumped) {
            this.velocityY = this.doubleJumpPower;
            this.hasDoubleJumped = true;
            this.createDoubleJumpParticles();
        }
        // Jump buffer
        else {
            this.jumpBuffer = this.jumpBufferMax;
        }
    }

    wallJump() {
        this.velocityX = this.wallDirection * this.wallJumpPower.x;
        this.velocityY = this.wallJumpPower.y;
        this.onWall = false;
        this.wallDirection = 0;
        this.facing = -this.wallDirection;
        this.createWallJumpParticles();
    }

    applyPhysics() {
        // Gravity
        if (!this.onGround) {
            this.velocityY += this.game.gravity;

            // Wall slide
            if (this.onWall && this.velocityY > 0) {
                this.velocityY = Math.min(this.velocityY, this.wallSlideSpeed);
            }

            // Max fall speed
            this.velocityY = Math.min(this.velocityY, this.game.maxFallSpeed);
        }

        // Apply velocity
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Reset ground and wall states
        this.onGround = false;
        this.onWall = false;
    }

    updateState() {
        // Determine current state
        if (this.onGround) {
            if (Math.abs(this.velocityX) < 0.1) {
                this.state = 'idle';
            } else if (Math.abs(this.velocityX) < 4) {
                this.state = 'walk';
            } else {
                this.state = 'run';
            }
        } else if (this.onWall) {
            this.state = 'wallSlide';
        } else {
            this.state = this.velocityY < 0 ? 'jump' : 'fall';
        }
    }

    updateAnimation() {
        this.animationTimer += this.game.deltaTime;

        const speeds = {
            'idle': 0.1,
            'walk': 0.15,
            'run': 0.08,
            'jump': 0.2,
            'fall': 0.2,
            'wallSlide': 0.15
        };

        if (this.animationTimer >= speeds[this.state]) {
            this.animationTimer = 0;
            this.animationFrame = (this.animationFrame + 1) % 8;
        }
    }

    updateTimers() {
        // Coyote time
        if (!this.onGround && this.coyoteTime > 0) {
            this.coyoteTime -= this.game.deltaTime;
        }

        // Jump buffer
        if (this.jumpBuffer > 0) {
            this.jumpBuffer -= this.game.deltaTime;
            if (this.onGround) {
                this.jump();
                this.jumpBuffer = 0;
            }
        }

        // Invincibility
        if (this.invincible) {
            this.invincibleTime += this.game.deltaTime * 1000;
            if (this.invincibleTime >= this.invincibleDuration) {
                this.invincible = false;
                this.invincibleTime = 0;
            }
        }
    }

    constrainToWorld() {
        // Keep player in world bounds
        if (this.x < 0) {
            this.x = 0;
            this.velocityX = 0;
        }
        if (this.x + this.width > this.game.camera.bounds.maxX) {
            this.x = this.game.camera.bounds.maxX - this.width;
            this.velocityX = 0;
        }

        // Death pit
        if (this.y > this.game.canvas.height + 100) {
            this.die();
        }
    }

    checkCollision(entity) {
        return (
            this.x < entity.x + entity.width &&
            this.x + this.width > entity.x &&
            this.y < entity.y + entity.height &&
            this.y + this.height > entity.y
        );
    }

    handlePlatformCollision(platform) {
        const overlap = this.getOverlap(platform);

        if (overlap.bottom < overlap.top && overlap.bottom < overlap.left && overlap.bottom < overlap.right) {
            // Landing on top
            this.y = platform.y - this.height;
            this.velocityY = 0;
            this.onGround = true;
            this.coyoteTime = this.coyoteTimeMax;
            this.hasDoubleJumped = false;

            // Platform momentum
            if (platform.velocityX) {
                this.x += platform.velocityX;
            }
        } else if (overlap.top < overlap.bottom && overlap.top < overlap.left && overlap.top < overlap.right) {
            // Hit from below
            this.y = platform.y + platform.height;
            this.velocityY = 0;
        } else if (overlap.left < overlap.right) {
            // Hit from left
            this.x = platform.x - this.width;
            this.velocityX = 0;
            this.onWall = true;
            this.wallDirection = -1;
        } else {
            // Hit from right
            this.x = platform.x + platform.width;
            this.velocityX = 0;
            this.onWall = true;
            this.wallDirection = 1;
        }
    }

    getOverlap(entity) {
        return {
            left: (this.x + this.width) - entity.x,
            right: (entity.x + entity.width) - this.x,
            top: (this.y + this.height) - entity.y,
            bottom: (entity.y + entity.height) - this.y
        };
    }

    takeDamage() {
        if (this.invincible) return;

        this.health--;
        this.invincible = true;
        this.invincibleTime = 0;

        // Update health display
        this.updateHealthDisplay();

        // Knockback
        this.velocityY = -8;

        if (this.health <= 0) {
            this.die();
        }
    }

    updateHealthDisplay() {
        const healthFill = document.getElementById('healthFill');
        if (healthFill) {
            const percentage = (this.health / this.maxHealth) * 100;
            healthFill.style.width = `${percentage}%`;
        }
    }

    die() {
        // Respawn
        this.x = 100;
        this.y = 300;
        this.velocityX = 0;
        this.velocityY = 0;
        this.health = this.maxHealth;
        this.updateHealthDisplay();
        this.game.lives--;

        if (this.game.lives <= 0) {
            this.game.gameOver();
        }
    }

    createJumpParticles() {
        for (let i = 0; i < 5; i++) {
            this.game.particles.push(new Particle(
                this.x + this.width / 2,
                this.y + this.height,
                '#888'
            ));
        }
    }

    createDoubleJumpParticles() {
        for (let i = 0; i < 8; i++) {
            this.game.particles.push(new Particle(
                this.x + this.width / 2,
                this.y + this.height / 2,
                '#4A90E2'
            ));
        }
    }

    createWallJumpParticles() {
        for (let i = 0; i < 6; i++) {
            this.game.particles.push(new Particle(
                this.x + (this.wallDirection > 0 ? this.width : 0),
                this.y + this.height / 2,
                '#FFD700'
            ));
        }
    }

    render(ctx) {
        // Flicker when invincible
        if (this.invincible && Math.floor(this.invincibleTime / 100) % 2 === 0) {
            return;
        }

        ctx.save();

        // Flip sprite based on facing direction
        if (this.facing === -1) {
            ctx.translate(this.x + this.width, this.y);
            ctx.scale(-1, 1);
        } else {
            ctx.translate(this.x, this.y);
        }

        // Draw character body
        ctx.fillStyle = '#4A90E2';
        ctx.fillRect(4, 16, 24, 28);

        // Draw head
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(16, 12, 10, 0, Math.PI * 2);
        ctx.fill();

        // Draw eyes
        ctx.fillStyle = '#000';
        const eyeX = this.state === 'wallSlide' ? 2 : 0;
        ctx.fillRect(12 + eyeX, 10, 2, 3);
        ctx.fillRect(18 + eyeX, 10, 2, 3);

        // Draw mouth
        ctx.beginPath();
        if (this.state === 'jump') {
            ctx.arc(16, 14, 3, Math.PI, 0);
        } else {
            ctx.arc(16, 16, 3, 0, Math.PI);
        }
        ctx.stroke();

        // Draw arms (animated)
        const armSwing = Math.sin(this.animationFrame * 0.5) * (this.state === 'run' ? 10 : 5);
        ctx.strokeStyle = '#4A90E2';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';

        // Left arm
        ctx.beginPath();
        ctx.moveTo(8, 20);
        ctx.lineTo(2 + Math.cos(armSwing) * 5, 28 + Math.sin(armSwing) * 5);
        ctx.stroke();

        // Right arm
        ctx.beginPath();
        ctx.moveTo(24, 20);
        ctx.lineTo(30 - Math.cos(armSwing) * 5, 28 - Math.sin(armSwing) * 5);
        ctx.stroke();

        // Draw legs (animated)
        const legSwing = Math.sin((this.animationFrame + 4) * 0.5) * (this.state === 'run' ? 8 : 4);

        // Left leg
        ctx.beginPath();
        ctx.moveTo(12, 44);
        ctx.lineTo(8 + Math.cos(legSwing) * 4, 48 + Math.abs(Math.sin(legSwing)) * 3);
        ctx.stroke();

        // Right leg
        ctx.beginPath();
        ctx.moveTo(20, 44);
        ctx.lineTo(24 - Math.cos(legSwing) * 4, 48 + Math.abs(Math.sin(legSwing)) * 3);
        ctx.stroke();

        ctx.restore();

        // Debug hitbox
        if (this.game.debug) {
            ctx.strokeStyle = '#ff0000';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}

// ============================================
// PLATFORM CLASS
// ============================================
class Platform {
    constructor(x, y, width, height, type = 'grass') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.velocityX = 0;
        this.velocityY = 0;

        // Moving platform properties
        this.isMoving = false;
        this.moveRange = 0;
        this.moveSpeed = 0;
        this.startX = x;
        this.startY = y;
    }

    update() {
        if (this.isMoving) {
            // Implement moving platform logic
        }
    }

    render(ctx) {
        const colors = {
            'grass': '#228B22',
            'wood': '#8B4513',
            'stone': '#708090',
            'concrete': '#696969',
            'metal': '#C0C0C0',
            'branch': '#654321',
            'tech': '#4169E1',
            'cloud': '#F0F8FF',
            'cave': '#2F4F4F',
            'castle': '#8B4513'
        };

        ctx.fillStyle = colors[this.type] || '#228B22';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Add texture/details
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(this.x, this.y + this.height - 5, this.width, 5);

        // Top highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(this.x, this.y, this.width, 3);
    }
}

// ============================================
// COLLECTIBLE CLASS
// ============================================
class Collectible {
    constructor(x, y, type = 'coin', points = 100) {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 24;
        this.type = type;
        this.points = points;
        this.collected = false;

        this.floatOffset = 0;
        this.floatSpeed = 2;
        this.rotation = 0;
        this.rotationSpeed = 0.05;
    }

    update() {
        this.floatOffset = Math.sin(Date.now() * 0.002 * this.floatSpeed) * 5;
        this.rotation += this.rotationSpeed;
    }

    render(ctx) {
        if (this.collected) return;

        this.update();

        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2 + this.floatOffset);
        ctx.rotate(this.rotation);

        const icons = {
            'coin': { color: '#FFD700', symbol: '●' },
            'star': { color: '#4A90E2', symbol: '⭐' },
            'skill': { color: '#7B68EE', symbol: '◆' },
            'briefcase': { color: '#FF6B6B', symbol: '💼' },
            'gem': { color: '#50E3C2', symbol: '💎' },
            'data': { color: '#00FF00', symbol: '◈' },
            'paint': { color: '#FF69B4', symbol: '🎨' },
            'crystal': { color: '#9370DB', symbol: '✦' },
            'contact': { color: '#FFD700', symbol: '✉' }
        };

        const icon = icons[this.type] || icons['coin'];

        // Glow
        ctx.shadowColor = icon.color;
        ctx.shadowBlur = 15;

        // Draw collectible
        ctx.fillStyle = icon.color;
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(icon.symbol, 0, 0);

        ctx.restore();
    }
}

// ============================================
// ENEMY CLASS
// ============================================
class Enemy {
    constructor(x, y, type = 'bug') {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.type = type;
        this.velocityX = 2;
        this.startX = x;
        this.patrolRange = 200;
    }

    update() {
        // Patrol movement
        this.x += this.velocityX;

        if (this.x < this.startX - this.patrolRange || this.x > this.startX + this.patrolRange) {
            this.velocityX *= -1;
        }
    }

    render(ctx) {
        const enemies = {
            'bug': { color: '#FF0000', symbol: '🐛' },
            'deadline': { color: '#FF6B6B', symbol: '⏰' },
            'stress': { color: '#9370DB', symbol: '💢' },
            'vine': { color: '#228B22', symbol: '🌿' },
            'virus': { color: '#FF1493', symbol: '☠' },
            'distraction': { color: '#FFD700', symbol: '📱' }
        };

        const enemy = enemies[this.type] || enemies['bug'];

        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

        // Draw enemy
        ctx.font = '28px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(enemy.symbol, 0, 0);

        ctx.restore();
    }
}

// ============================================
// PARTICLE CLASS
// ============================================
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.velocityX = (Math.random() - 0.5) * 6;
        this.velocityY = (Math.random() - 0.5) * 6 - 2;
        this.life = 1;
        this.decay = 0.02;
        this.size = Math.random() * 4 + 2;
        this.color = color;
        this.gravity = 0.2;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityY += this.gravity;
        this.life -= this.decay;
        this.size *= 0.98;
    }

    render(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Export classes
window.Player = Player;
window.Platform = Platform;
window.Collectible = Collectible;
window.Enemy = Enemy;
window.Particle = Particle;
