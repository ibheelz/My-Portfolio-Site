/**
 * TIMELINE
 * Work experience timeline as game levels
 */

class Timeline {
    constructor() {
        this.container = document.getElementById('timelineContainer');
        this.experienceSection = document.getElementById('experience');

        this.init();
    }

    async init() {
        // Load resume data
        const data = await this.loadResumeData();

        if (!data || !data.experience) return;

        // Render timeline levels
        this.renderTimeline(data.experience);

        // Set up intersection observer
        this.observeLevels();
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
     * Render timeline levels
     */
    renderTimeline(experiences) {
        if (!this.container) return;

        this.container.innerHTML = '';

        experiences.forEach((exp, index) => {
            const level = this.createTimelineLevel(exp, index);
            this.container.appendChild(level);
        });
    }

    /**
     * Create a single timeline level
     */
    createTimelineLevel(exp, index) {
        const level = document.createElement('div');
        level.className = 'timeline-level';
        level.style.transitionDelay = `${index * 0.2}s`;

        // Set theme color if available
        if (exp.color) {
            level.style.setProperty('--level-color', exp.color);
        }

        // Header
        const header = document.createElement('div');
        header.className = 'level-header';

        const companyName = document.createElement('h3');
        companyName.className = 'company-name';
        companyName.textContent = exp.company;

        const dates = document.createElement('p');
        dates.className = 'job-dates';
        dates.textContent = exp.dates;

        header.appendChild(companyName);
        header.appendChild(dates);

        // Role
        const role = document.createElement('h4');
        role.className = 'job-role';
        role.textContent = exp.role;

        // Description
        const description = document.createElement('p');
        description.className = 'job-description';
        description.textContent = exp.description;

        // Skill Distribution
        const skillDist = this.createSkillDistribution(exp.skills);

        // Assemble level
        level.appendChild(header);
        level.appendChild(role);
        level.appendChild(description);
        level.appendChild(skillDist);

        return level;
    }

    /**
     * Create skill distribution bubbles
     */
    createSkillDistribution(skills) {
        const container = document.createElement('div');
        container.className = 'skill-distribution';

        const skillTypes = [
            { key: 'design', label: 'Design', color: '#7B68EE' },
            { key: 'code', label: 'Code', color: '#4A90E2' },
            { key: 'other', label: 'Other', color: '#50E3C2' }
        ];

        skillTypes.forEach(({ key, label, color }) => {
            const bubble = document.createElement('div');
            bubble.className = 'skill-bubble';

            const percentage = document.createElement('div');
            percentage.className = 'bubble-percentage';
            percentage.textContent = `${skills[key]}%`;
            percentage.style.color = color;

            const labelEl = document.createElement('div');
            labelEl.className = 'bubble-label';
            labelEl.textContent = label;

            bubble.appendChild(percentage);
            bubble.appendChild(labelEl);
            container.appendChild(bubble);
        });

        return container;
    }

    /**
     * Observe timeline levels for visibility
     */
    observeLevels() {
        const levels = document.querySelectorAll('.timeline-level');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.2 }
        );

        levels.forEach((level) => observer.observe(level));
    }
}

// Export for use in other modules
window.Timeline = Timeline;
