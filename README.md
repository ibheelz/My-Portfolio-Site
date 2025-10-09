# Interactive Resume - Game-Inspired Horizontal Scrolling

A beautiful, performant, and engaging interactive resume website that transforms your traditional CV into a side-scrolling platform game experience. Inspired by [Robby Leonardi's interactive resume](http://www.rleonardi.com/interactive-resume/).

## Features

- **Game-Inspired Design** - Side-scrolling journey through your career
- **Animated Character** - Dynamic character that responds to scroll speed
- **Parallax Backgrounds** - Multi-layer parallax for depth and immersion
- **Interactive Elements** - Collectibles, achievements, and easter eggs
- **Smooth Scrolling** - Hardware-accelerated horizontal scrolling
- **Multiple Input Methods** - Mouse wheel, keyboard arrows, and touch swipe
- **Fully Responsive** - Adapts beautifully from desktop to mobile
- **Accessible** - WCAG compliant with keyboard navigation and screen reader support
- **Performance Optimized** - 60fps animations with efficient rendering
- **No Framework Dependencies** - Pure vanilla JavaScript for minimal load time

## Quick Start

1. **Clone or download** this repository
2. **Edit** `data/resume-data.json` with your information
3. **Customize** colors and themes in `css/main.css`
4. **Open** `index.html` in a modern browser
5. **Deploy** to GitHub Pages, Netlify, or Vercel

## Project Structure

```
ibheelz.github.io/
├── index.html                  # Main HTML file
├── css/
│   ├── main.css               # Base styles and layout
│   ├── animations.css         # Keyframe animations
│   ├── responsive.css         # Mobile responsive styles
│   └── loader.css             # Preloader styles
├── js/
│   ├── main.js                # Main app initialization
│   ├── preloader.js           # Loading screen logic
│   ├── scroll-controller.js   # Horizontal scroll handling
│   ├── character-animation.js # Character sprite animation
│   ├── parallax.js            # Parallax background system
│   ├── skills-animation.js    # Skills section animations
│   ├── timeline.js            # Work experience timeline
│   └── contact-form.js        # Contact form validation
├── data/
│   └── resume-data.json       # Your resume content
└── assets/
    ├── sprites/               # Character sprite sheets
    ├── backgrounds/           # Background images
    ├── icons/                 # UI icons
    └── ui/                    # UI elements
```

## Customization Guide

### 1. Update Your Information

Edit `data/resume-data.json` with your personal information:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Job Title",
    "location": "Your City",
    "email": "your.email@example.com",
    ...
  },
  "skills": { ... },
  "experience": [ ... ],
  ...
}
```

### 2. Customize Colors

Edit CSS variables in `css/main.css`:

```css
:root {
    --primary-blue: #4A90E2;
    --primary-green: #4CAF50;
    --primary-purple: #7B68EE;
    /* Add your brand colors */
}
```

### 3. Add Your Character Sprite

Replace the procedural character in `js/character-animation.js` with your own sprite sheet:

```javascript
// Load your sprite image
this.spriteImage = new Image();
this.spriteImage.src = 'assets/sprites/character.png';
```

### 4. Background Images

Add custom background images to `assets/backgrounds/` and update the CSS in `css/main.css`:

```css
.parallax-layer.mountains {
    background-image: url('../assets/backgrounds/mountains.png');
}
```

## Control Methods

- **Mouse Wheel** - Scroll horizontally through your resume
- **Keyboard Arrows** - Use ← → keys to navigate
- **Touch Swipe** - Swipe left/right on mobile devices
- **Navigation Dots** - Click dots to jump between sections

## Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile browsers (iOS Safari, Chrome Mobile) ✅

## Performance

- Page load: <3 seconds
- Smooth 60fps scrolling
- Optimized for devices 2+ years old
- Lighthouse score: 90+

## Accessibility Features

- Full keyboard navigation
- Screen reader compatible
- ARIA labels throughout
- Reduced motion mode
- High contrast support
- Skip navigation links

## Easter Eggs

Try these hidden features:

- **Konami Code** - ↑ ↑ ↓ ↓ ← → ← → B A
- **Achievement System** - Unlock by exploring all sections
- **Hidden Messages** - Look carefully in the code comments

## Development

### Local Development

Simply open `index.html` in your browser. No build process required!

For live reload during development, use a simple HTTP server:

```bash
# Python 3
python -m http.server 8000

# Node.js (install http-server globally)
npx http-server

# PHP
php -S localhost:8000
```

### Production Build

For production deployment:

1. Minify CSS and JavaScript files
2. Optimize images (convert to WebP)
3. Enable gzip compression on your server
4. Add caching headers for static assets

## Deployment

### GitHub Pages

1. Push code to your repository
2. Go to Settings > Pages
3. Select branch and root directory
4. Your site will be live at `https://username.github.io`

### Netlify

1. Connect your GitHub repository
2. Build command: (none needed)
3. Publish directory: `/`
4. Deploy!

### Vercel

```bash
vercel
```

## Customization Tips

### Change Animation Speed

Edit timing in `css/animations.css`:

```css
.duration-normal {
    animation-duration: 0.5s; /* Adjust timing */
}
```

### Modify Scroll Sensitivity

Edit `js/scroll-controller.js`:

```javascript
const delta = e.deltaY || e.deltaX;
this.targetScroll += delta * 1.5; // Adjust multiplier
```

### Add New Sections

1. Add section HTML to `index.html`
2. Style it in `css/main.css`
3. Update navigation dots
4. Add entry to `data/resume-data.json`

## Troubleshooting

### Horizontal scroll not working

- Check browser console for JavaScript errors
- Ensure GSAP CDN is loading properly
- Verify `content-wrapper` element exists

### Images not loading

- Check file paths are correct
- Ensure images are in `assets/` folder
- Verify image file extensions match CSS

### Mobile not responsive

- Clear browser cache
- Check viewport meta tag in HTML
- Test on actual device, not just dev tools

## Credits

- Inspired by [Robby Leonardi](http://www.rleonardi.com/interactive-resume/)
- GSAP for advanced animations
- Built with vanilla JavaScript

## License

MIT License - Feel free to use this for your own resume!

## Support

Found a bug or have a question? Open an issue on GitHub.

## Changelog

### v1.0.0 (2025)
- Initial release
- Game-inspired horizontal scrolling
- Character animations
- Parallax backgrounds
- Skills and experience sections
- Contact form with validation
- Achievement system
- Mobile responsive
- Accessibility features

---

Made with by [Your Name]
