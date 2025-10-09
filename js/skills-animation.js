/**
 * SKILLS ANIMATION
 * Animated skill bars and visibility triggers
 */

class SkillsAnimation {
    constructor() {
        this.skillsSection = document.getElementById('skills');
        this.designSkills = document.getElementById('designSkills');
        this.programmingSkills = document.getElementById('programmingSkills');
        this.toolsSkills = document.getElementById('toolsSkills');

        this.isAnimated = false;

        this.init();
    }

    async init() {
        // Load resume data
        const data = await this.loadResumeData();

        if (!data) return;

        // Populate skills
        this.populateSkills(data.skills);

        // Set up intersection observer
        this.observeSection();
    }

    /**
     * Load resume data from JSON
     */
    async loadResumeData() {
        try {
            const response = await fetch('data/resume-data.json');
            return await response.json();
        } catch (error) {
            console.error('Error loading resume data:', error);
            return null;
        }
    }

    /**
     * Populate skills from data
     */
    populateSkills(skills) {
        if (skills.design) {
            this.renderSkillList(this.designSkills, skills.design);
        }

        if (skills.programming) {
            this.renderSkillList(this.programmingSkills, skills.programming);
        }

        if (skills.tools) {
            this.renderSkillList(this.toolsSkills, skills.tools);
        }
    }

    /**
     * Render skill items
     */
    renderSkillList(container, skills) {
        if (!container) return;

        container.innerHTML = '';

        skills.forEach((skill, index) => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.style.transitionDelay = `${index * 0.1}s`;

            const skillHeader = document.createElement('div');
            skillHeader.className = 'skill-header';

            const skillName = document.createElement('span');
            skillName.className = 'skill-name';
            skillName.textContent = skill.name;

            const skillLevel = document.createElement('span');
            skillLevel.className = 'skill-level';
            skillLevel.textContent = skill.proficiency;

            skillHeader.appendChild(skillName);
            skillHeader.appendChild(skillLevel);

            const skillBar = document.createElement('div');
            skillBar.className = 'skill-bar';

            const skillProgress = document.createElement('div');
            skillProgress.className = 'skill-progress';
            skillProgress.setAttribute('data-level', skill.level);

            skillBar.appendChild(skillProgress);
            skillItem.appendChild(skillHeader);
            skillItem.appendChild(skillBar);

            container.appendChild(skillItem);
        });
    }

    /**
     * Observe section for visibility
     */
    observeSection() {
        if (!this.skillsSection) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !this.isAnimated) {
                        this.animateSkills();
                        this.isAnimated = true;
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(this.skillsSection);
    }

    /**
     * Animate skill bars
     */
    animateSkills() {
        const skillItems = document.querySelectorAll('.skill-item');

        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');

                // Animate progress bar
                const progressBar = item.querySelector('.skill-progress');
                if (progressBar) {
                    const level = parseInt(progressBar.getAttribute('data-level'));
                    const percentage = (level / 5) * 100;

                    setTimeout(() => {
                        progressBar.style.width = `${percentage}%`;
                    }, 100);
                }
            }, index * 100);
        });
    }
}

// Export for use in other modules
window.SkillsAnimation = SkillsAnimation;
