/**
 * PLATFORMER GAME ENGINE
 * Complete 2D platform game engine with physics, collision, entities
 */

class PlatformerEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error('Canvas not found:', canvasId);
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();

        // Game state
        this.running = false;
        this.paused = false;
        this.currentWorld = 0;
        this.score = 0;
        this.lives = 3;
        this.time = 0;

        // Game settings
        this.gravity = 0.8;
        this.maxFallSpeed = 15;
        this.friction = 0.85;
        this.airResistance = 0.95;

        // Camera
        this.camera = {
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            smoothing: 0.1,
            bounds: { minX: 0, maxX: 5000, minY: 0, maxY: 600 }
        };

        // Entities
        this.player = null;
        this.platforms = [];
        this.collectibles = [];
        this.enemies = [];
        this.particles = [];
        this.triggers = [];

        // Input
        this.keys = {};
        this.mouse = { x: 0, y: 0, pressed: false };
        this.touch = { active: false, startX: 0, startY: 0, x: 0, y: 0 };

        // Performance
        this.lastTime = 0;
        this.deltaTime = 0;
        this.fps = 60;
        this.frameCount = 0;

        this.init();
    }

    init() {
        this.setupInput();
        this.createPlayer();
        this.loadCurrentWorld();
        this.start();
    }

    setupCanvas() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupInput() {
        // Keyboard
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            this.keys[e.code] = true;

            // Prevent default for game keys
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
            this.keys[e.code] = false;
        });

        // Mouse
        this.canvas.addEventListener('mousedown', (e) => {
            this.mouse.pressed = true;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        this.canvas.addEventListener('mouseup', () => {
            this.mouse.pressed = false;
        });

        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Touch
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.touch.active = true;
            this.touch.startX = touch.clientX;
            this.touch.startY = touch.clientY;
            this.touch.x = touch.clientX;
            this.touch.y = touch.clientY;
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (this.touch.active) {
                const touch = e.touches[0];
                this.touch.x = touch.clientX;
                this.touch.y = touch.clientY;
            }
        });

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.touch.active = false;
        });
    }

    createPlayer() {
        this.player = new Player(this, 100, 300);
    }

    loadCurrentWorld() {
        // Load world data based on currentWorld
        const worlds = [
            this.createTutorialWorld(),
            this.createSkillMountains(),
            this.createCorporateCity(),
            this.createProjectJungle(),
            this.createDigitalSpace(),
            this.createCreativeCloud(),
            this.createNetworkCaves(),
            this.createContactCastle()
        ];

        const world = worlds[this.currentWorld];
        this.platforms = world.platforms;
        this.collectibles = world.collectibles;
        this.enemies = world.enemies;
        this.camera.bounds = world.bounds;

        // Reset player position
        this.player.x = world.startX;
        this.player.y = world.startY;
        this.player.velocityX = 0;
        this.player.velocityY = 0;
    }

    createTutorialWorld() {
        return {
            name: "Tutorial Town",
            startX: 100,
            startY: 300,
            bounds: { minX: 0, maxX: 3000, minY: 0, maxY: 600 },
            platforms: [
                new Platform(0, 550, 3000, 50, 'grass'),
                new Platform(300, 450, 200, 20, 'wood'),
                new Platform(600, 350, 200, 20, 'wood'),
                new Platform(900, 250, 200, 20, 'wood'),
                new Platform(1200, 350, 300, 20, 'wood'),
                new Platform(1600, 450, 200, 20, 'wood'),
                new Platform(2000, 350, 400, 20, 'wood'),
                new Platform(2500, 250, 200, 20, 'wood')
            ],
            collectibles: [
                new Collectible(350, 400, 'coin', 100),
                new Collectible(650, 300, 'coin', 100),
                new Collectible(950, 200, 'star', 500),
                new Collectible(1300, 300, 'coin', 100),
                new Collectible(2100, 300, 'star', 500)
            ],
            enemies: [
                new Enemy(800, 500, 'bug'),
                new Enemy(1400, 500, 'bug'),
                new Enemy(2200, 500, 'bug')
            ]
        };
    }

    createSkillMountains() {
        return {
            name: "Skill Mountains",
            startX: 100,
            startY: 300,
            bounds: { minX: 0, maxX: 4000, minY: 0, maxY: 600 },
            platforms: [
                new Platform(0, 550, 500, 50, 'stone'),
                new Platform(400, 450, 150, 20, 'stone'),
                new Platform(650, 350, 150, 20, 'stone'),
                new Platform(900, 250, 150, 20, 'stone'),
                new Platform(1150, 150, 200, 20, 'stone'),
                new Platform(1450, 250, 150, 20, 'stone'),
                new Platform(1700, 350, 150, 20, 'stone'),
                new Platform(1950, 450, 300, 20, 'stone'),
                new Platform(2350, 350, 150, 20, 'stone'),
                new Platform(2600, 250, 150, 20, 'stone'),
                new Platform(2850, 350, 150, 20, 'stone'),
                new Platform(3100, 450, 900, 50, 'stone')
            ],
            collectibles: [
                new Collectible(475, 400, 'skill', 200),
                new Collectible(725, 300, 'skill', 200),
                new Collectible(975, 200, 'skill', 200),
                new Collectible(1225, 100, 'star', 500),
                new Collectible(1525, 200, 'skill', 200),
                new Collectible(1775, 300, 'skill', 200),
                new Collectible(2425, 300, 'skill', 200),
                new Collectible(2675, 200, 'star', 500)
            ],
            enemies: [
                new Enemy(1000, 500, 'bug'),
                new Enemy(2000, 400, 'bug'),
                new Enemy(3200, 400, 'bug')
            ]
        };
    }

    createCorporateCity() {
        return {
            name: "Corporate City",
            startX: 100,
            startY: 300,
            bounds: { minX: 0, maxX: 5000, minY: 0, maxY: 600 },
            platforms: [
                new Platform(0, 550, 5000, 50, 'concrete'),
                // Buildings as platforms
                new Platform(300, 450, 150, 20, 'metal'),
                new Platform(300, 350, 150, 20, 'metal'),
                new Platform(300, 250, 150, 20, 'metal'),
                new Platform(700, 400, 150, 20, 'metal'),
                new Platform(700, 300, 150, 20, 'metal'),
                new Platform(1100, 450, 150, 20, 'metal'),
                new Platform(1100, 350, 150, 20, 'metal'),
                new Platform(1100, 250, 150, 20, 'metal'),
                new Platform(1100, 150, 150, 20, 'metal'),
                new Platform(1500, 400, 200, 20, 'metal'),
                new Platform(1500, 300, 200, 20, 'metal'),
                new Platform(1500, 200, 200, 20, 'metal'),
                new Platform(1900, 450, 150, 20, 'metal'),
                new Platform(2300, 350, 200, 20, 'metal'),
                new Platform(2300, 250, 200, 20, 'metal'),
                new Platform(2700, 400, 150, 20, 'metal'),
                new Platform(2700, 300, 150, 20, 'metal'),
                new Platform(3100, 450, 150, 20, 'metal'),
                new Platform(3100, 350, 150, 20, 'metal'),
                new Platform(3100, 250, 150, 20, 'metal'),
                new Platform(3500, 400, 200, 20, 'metal'),
                new Platform(3500, 300, 200, 20, 'metal'),
                new Platform(3900, 450, 150, 20, 'metal'),
                new Platform(4300, 350, 150, 20, 'metal')
            ],
            collectibles: [
                new Collectible(375, 400, 'briefcase', 300),
                new Collectible(375, 300, 'coin', 100),
                new Collectible(375, 200, 'star', 500),
                new Collectible(775, 350, 'briefcase', 300),
                new Collectible(775, 250, 'coin', 100),
                new Collectible(1175, 400, 'briefcase', 300),
                new Collectible(1175, 300, 'coin', 100),
                new Collectible(1175, 200, 'coin', 100),
                new Collectible(1175, 100, 'star', 500),
                new Collectible(1600, 350, 'briefcase', 300),
                new Collectible(2375, 300, 'briefcase', 300),
                new Collectible(3175, 400, 'briefcase', 300),
                new Collectible(3600, 350, 'star', 500)
            ],
            enemies: [
                new Enemy(600, 500, 'deadline'),
                new Enemy(1300, 500, 'stress'),
                new Enemy(2100, 500, 'deadline'),
                new Enemy(2900, 500, 'stress'),
                new Enemy(4000, 500, 'deadline')
            ]
        };
    }

    createProjectJungle() {
        return {
            name: "Project Jungle",
            startX: 100,
            startY: 300,
            bounds: { minX: 0, maxX: 4500, minY: 0, maxY: 600 },
            platforms: [
                new Platform(0, 550, 4500, 50, 'wood'),
                // Tree branches
                new Platform(300, 400, 200, 15, 'branch'),
                new Platform(600, 300, 200, 15, 'branch'),
                new Platform(900, 200, 200, 15, 'branch'),
                new Platform(1200, 300, 250, 15, 'branch'),
                new Platform(1550, 400, 200, 15, 'branch'),
                new Platform(1850, 300, 200, 15, 'branch'),
                new Platform(2150, 200, 200, 15, 'branch'),
                new Platform(2450, 350, 250, 15, 'branch'),
                new Platform(2800, 450, 200, 15, 'branch'),
                new Platform(3100, 350, 200, 15, 'branch'),
                new Platform(3400, 250, 200, 15, 'branch'),
                new Platform(3700, 350, 300, 15, 'branch'),
                new Platform(4100, 450, 400, 50, 'wood')
            ],
            collectibles: [
                new Collectible(400, 350, 'gem', 200),
                new Collectible(700, 250, 'gem', 200),
                new Collectible(1000, 150, 'star', 500),
                new Collectible(1325, 250, 'gem', 200),
                new Collectible(1650, 350, 'gem', 200),
                new Collectible(1950, 250, 'gem', 200),
                new Collectible(2250, 150, 'star', 500),
                new Collectible(2575, 300, 'gem', 200),
                new Collectible(3200, 300, 'gem', 200),
                new Collectible(3500, 200, 'star', 500)
            ],
            enemies: [
                new Enemy(800, 500, 'vine'),
                new Enemy(1400, 500, 'vine'),
                new Enemy(2200, 500, 'vine'),
                new Enemy(3000, 500, 'vine')
            ]
        };
    }

    createDigitalSpace() {
        return {
            name: "Digital Space Station",
            startX: 100,
            startY: 300,
            bounds: { minX: 0, maxX: 4000, minY: 0, maxY: 600 },
            platforms: [
                new Platform(0, 550, 300, 50, 'tech'),
                new Platform(400, 450, 200, 20, 'tech'),
                new Platform(700, 350, 200, 20, 'tech'),
                new Platform(1000, 250, 200, 20, 'tech'),
                new Platform(1300, 350, 250, 20, 'tech'),
                new Platform(1650, 450, 200, 20, 'tech'),
                new Platform(1950, 350, 200, 20, 'tech'),
                new Platform(2250, 250, 200, 20, 'tech'),
                new Platform(2550, 350, 250, 20, 'tech'),
                new Platform(2900, 450, 200, 20, 'tech'),
                new Platform(3200, 350, 200, 20, 'tech'),
                new Platform(3500, 450, 500, 50, 'tech')
            ],
            collectibles: [
                new Collectible(475, 400, 'data', 150),
                new Collectible(775, 300, 'data', 150),
                new Collectible(1075, 200, 'star', 500),
                new Collectible(1425, 300, 'data', 150),
                new Collectible(1725, 400, 'data', 150),
                new Collectible(2025, 300, 'data', 150),
                new Collectible(2325, 200, 'star', 500),
                new Collectible(2675, 300, 'data', 150),
                new Collectible(2975, 400, 'data', 150),
                new Collectible(3275, 300, 'star', 500)
            ],
            enemies: [
                new Enemy(900, 500, 'virus'),
                new Enemy(1700, 500, 'virus'),
                new Enemy(2500, 500, 'virus'),
                new Enemy(3400, 500, 'virus')
            ]
        };
    }

    createCreativeCloud() {
        return {
            name: "Creative Cloud Kingdom",
            startX: 100,
            startY: 400,
            bounds: { minX: 0, maxX: 3500, minY: 0, maxY: 600 },
            platforms: [
                new Platform(0, 550, 200, 50, 'cloud'),
                new Platform(300, 450, 200, 30, 'cloud'),
                new Platform(600, 350, 200, 30, 'cloud'),
                new Platform(900, 450, 200, 30, 'cloud'),
                new Platform(1200, 350, 200, 30, 'cloud'),
                new Platform(1500, 450, 250, 30, 'cloud'),
                new Platform(1850, 350, 200, 30, 'cloud'),
                new Platform(2150, 250, 200, 30, 'cloud'),
                new Platform(2450, 350, 200, 30, 'cloud'),
                new Platform(2750, 450, 300, 30, 'cloud'),
                new Platform(3150, 550, 350, 50, 'cloud')
            ],
            collectibles: [
                new Collectible(375, 400, 'paint', 150),
                new Collectible(675, 300, 'paint', 150),
                new Collectible(975, 400, 'paint', 150),
                new Collectible(1275, 300, 'star', 500),
                new Collectible(1600, 400, 'paint', 150),
                new Collectible(1925, 300, 'paint', 150),
                new Collectible(2225, 200, 'star', 500),
                new Collectible(2525, 300, 'paint', 150),
                new Collectible(2900, 400, 'star', 500)
            ],
            enemies: [
                new Enemy(700, 300, 'distraction'),
                new Enemy(1400, 300, 'distraction'),
                new Enemy(2300, 200, 'distraction')
            ]
        };
    }

    createNetworkCaves() {
        return {
            name: "Underground Network Caves",
            startX: 100,
            startY: 300,
            bounds: { minX: 0, maxX: 4000, minY: 0, maxY: 600 },
            platforms: [
                new Platform(0, 550, 4000, 50, 'cave'),
                new Platform(300, 450, 200, 20, 'cave'),
                new Platform(600, 350, 200, 20, 'cave'),
                new Platform(900, 250, 200, 20, 'cave'),
                new Platform(1200, 350, 250, 20, 'cave'),
                new Platform(1550, 450, 200, 20, 'cave'),
                new Platform(1850, 350, 200, 20, 'cave'),
                new Platform(2150, 250, 200, 20, 'cave'),
                new Platform(2450, 350, 250, 20, 'cave'),
                new Platform(2800, 450, 200, 20, 'cave'),
                new Platform(3100, 350, 200, 20, 'cave'),
                new Platform(3400, 450, 600, 50, 'cave')
            ],
            collectibles: [
                new Collectible(375, 400, 'crystal', 150),
                new Collectible(675, 300, 'crystal', 150),
                new Collectible(975, 200, 'star', 500),
                new Collectible(1325, 300, 'crystal', 150),
                new Collectible(1625, 400, 'crystal', 150),
                new Collectible(1925, 300, 'crystal', 150),
                new Collectible(2225, 200, 'star', 500),
                new Collectible(2575, 300, 'crystal', 150),
                new Collectible(2875, 400, 'crystal', 150),
                new Collectible(3175, 300, 'star', 500)
            ],
            enemies: [
                new Enemy(800, 500, 'bug'),
                new Enemy(1600, 500, 'bug'),
                new Enemy(2400, 500, 'bug'),
                new Enemy(3200, 500, 'bug')
            ]
        };
    }

    createContactCastle() {
        return {
            name: "Contact Castle",
            startX: 100,
            startY: 300,
            bounds: { minX: 0, maxX: 3000, minY: 0, maxY: 600 },
            platforms: [
                new Platform(0, 550, 3000, 50, 'castle'),
                new Platform(300, 450, 200, 20, 'castle'),
                new Platform(600, 350, 200, 20, 'castle'),
                new Platform(900, 250, 200, 20, 'castle'),
                new Platform(1200, 150, 200, 20, 'castle'),
                new Platform(1500, 250, 200, 20, 'castle'),
                new Platform(1800, 350, 200, 20, 'castle'),
                new Platform(2100, 450, 300, 20, 'castle'),
                new Platform(2500, 350, 500, 50, 'castle')
            ],
            collectibles: [
                new Collectible(375, 400, 'contact', 300),
                new Collectible(675, 300, 'contact', 300),
                new Collectible(975, 200, 'star', 500),
                new Collectible(1275, 100, 'star', 500),
                new Collectible(1575, 200, 'contact', 300),
                new Collectible(1875, 300, 'contact', 300),
                new Collectible(2200, 400, 'star', 500)
            ],
            enemies: []
        };
    }

    start() {
        this.running = true;
        this.gameLoop();
    }

    stop() {
        this.running = false;
    }

    pause() {
        this.paused = !this.paused;
    }

    gameLoop(timestamp = 0) {
        if (!this.running) return;

        // Calculate delta time
        this.deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        this.frameCount++;

        if (!this.paused) {
            this.update();
            this.updateCamera();
        }

        this.render();

        requestAnimationFrame((ts) => this.gameLoop(ts));
    }

    update() {
        // Update player
        if (this.player) {
            this.player.update();
        }

        // Update enemies
        this.enemies.forEach(enemy => enemy.update());

        // Update particles
        this.particles = this.particles.filter(p => {
            p.update();
            return p.life > 0;
        });

        // Check collisions
        this.checkCollisions();

        // Update time
        this.time += this.deltaTime;
    }

    updateCamera() {
        if (!this.player) return;

        // Follow player with smoothing
        this.camera.targetX = this.player.x - this.canvas.width / 2 + this.player.width / 2;
        this.camera.targetY = this.player.y - this.canvas.height / 2 + this.player.height / 2;

        // Apply camera bounds
        this.camera.targetX = Math.max(this.camera.bounds.minX, Math.min(this.camera.targetX, this.camera.bounds.maxX - this.canvas.width));
        this.camera.targetY = Math.max(this.camera.bounds.minY, Math.min(this.camera.targetY, this.camera.bounds.maxY - this.canvas.height));

        // Smooth camera movement
        this.camera.x += (this.camera.targetX - this.camera.x) * this.camera.smoothing;
        this.camera.y += (this.camera.targetY - this.camera.y) * this.camera.smoothing;
    }

    checkCollisions() {
        if (!this.player) return;

        // Platform collisions
        this.platforms.forEach(platform => {
            if (this.player.checkCollision(platform)) {
                this.player.handlePlatformCollision(platform);
            }
        });

        // Collectible collisions
        this.collectibles = this.collectibles.filter(collectible => {
            if (!collectible.collected && this.player.checkCollision(collectible)) {
                this.collectItem(collectible);
                return false;
            }
            return true;
        });

        // Enemy collisions
        this.enemies.forEach(enemy => {
            if (this.player.checkCollision(enemy) && !this.player.invincible) {
                this.player.takeDamage();
            }
        });
    }

    collectItem(collectible) {
        this.score += collectible.points;
        this.createCollectParticles(collectible.x + collectible.width / 2, collectible.y + collectible.height / 2, collectible.type);

        // Update HUD
        this.updateScore();

        // Play sound
        this.playSound('collect');
    }

    createCollectParticles(x, y, type) {
        const colors = {
            'coin': '#FFD700',
            'star': '#4A90E2',
            'skill': '#7B68EE',
            'briefcase': '#FF6B6B',
            'gem': '#50E3C2',
            'data': '#00FF00',
            'paint': '#FF69B4',
            'crystal': '#9370DB',
            'contact': '#FFD700'
        };

        const color = colors[type] || '#FFD700';

        for (let i = 0; i < 10; i++) {
            this.particles.push(new Particle(x, y, color));
        }
    }

    updateScore() {
        const scoreEl = document.getElementById('gameScore');
        if (scoreEl) {
            scoreEl.textContent = this.score.toString().padStart(4, '0');
        }
    }

    playSound(soundName) {
        // Implement sound system
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = this.getSkyColor();
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Save context
        this.ctx.save();

        // Apply camera transform
        this.ctx.translate(-this.camera.x, -this.camera.y);

        // Render platforms
        this.platforms.forEach(platform => platform.render(this.ctx));

        // Render collectibles
        this.collectibles.forEach(collectible => collectible.render(this.ctx));

        // Render enemies
        this.enemies.forEach(enemy => enemy.render(this.ctx));

        // Render player
        if (this.player) {
            this.player.render(this.ctx);
        }

        // Render particles
        this.particles.forEach(particle => particle.render(this.ctx));

        // Restore context
        this.ctx.restore();

        // Render UI
        this.renderUI();
    }

    getSkyColor() {
        const colors = {
            0: '#87CEEB', // Tutorial - Sky Blue
            1: '#B0C4DE', // Mountains - Light Steel Blue
            2: '#4682B4', // City - Steel Blue
            3: '#228B22', // Jungle - Forest Green
            4: '#191970', // Space - Midnight Blue
            5: '#FFB6C1', // Cloud - Light Pink
            6: '#2F4F4F', // Cave - Dark Slate Gray
            7: '#8B4513'  // Castle - Saddle Brown
        };

        return colors[this.currentWorld] || '#87CEEB';
    }

    renderUI() {
        // Already handled by HTML HUD
    }

    nextWorld() {
        if (this.currentWorld < 7) {
            this.currentWorld++;
            this.loadCurrentWorld();
            this.updateWorldName();
        } else {
            this.gameComplete();
        }
    }

    updateWorldName() {
        const worldNames = [
            "LEVEL 1 - TUTORIAL TOWN",
            "LEVEL 2 - SKILL MOUNTAINS",
            "LEVEL 3 - CORPORATE CITY",
            "LEVEL 4 - PROJECT JUNGLE",
            "LEVEL 5 - DIGITAL SPACE",
            "LEVEL 6 - CREATIVE CLOUD",
            "LEVEL 7 - NETWORK CAVES",
            "LEVEL 8 - CONTACT CASTLE"
        ];

        const nameEl = document.getElementById('levelName');
        if (nameEl) {
            nameEl.textContent = worldNames[this.currentWorld];
        }
    }

    gameComplete() {
        alert('Congratulations! You completed the game!');
    }
}

// Export
window.PlatformerEngine = PlatformerEngine;
