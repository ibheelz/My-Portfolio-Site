# Abiola Adeyeye — Brand & Visual Designer Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with side navigation
│   ├── page.tsx            # Homepage with hero, featured projects, explorations, and blog
│   ├── globals.css         # Global styles and font imports
│   ├── projects/
│   │   ├── page.tsx        # Projects listing page
│   │   └── [slug]/page.tsx # Individual project detail page
│   ├── explorations/
│   │   ├── page.tsx        # Explorations listing page
│   │   └── [slug]/page.tsx # Individual exploration detail page
│   ├── blog/
│   │   ├── page.tsx        # Blog listing page
│   │   └── [slug]/page.tsx # Individual blog post page
│   └── about-me/
│       └── page.tsx        # About page with bio, skills, and contact
├── components/
│   ├── SideNav.tsx         # Fixed side navigation component
│   ├── Label.tsx           # Badge/label component
│   ├── SectionHeadline.tsx # Section header component
│   ├── ProjectCard.tsx     # Project card component
│   ├── ExplorationCard.tsx # Exploration card component
│   └── BlogCard.tsx        # Blog post card component
└── data/
    └── content.ts          # CMS data: projects, blog posts, explorations

public/
└── fonts/
    ├── Inter-Regular.woff2
    ├── Inter-Regular.ttf
    ├── Inter-SemiBold.woff2
    └── Inter-SemiBold.ttf
```

## Adding Content

### Projects

Edit `src/data/content.ts` and add to the `projects` array:

```typescript
{
  type: 'project',
  slug: 'my-project',
  title: 'Project Title',
  label1: 'Category',
  label2: 'Type',
  duration: '4 Weeks',
  isFeatured: true,
  cardImage: 'https://example.com/card.png',
  heroImage: 'https://example.com/hero.png',
  roleLabels: ['Role 1', 'Role 2'],
  sections: [
    {
      title: 'Section Title',
      content: 'Section content...',
      image: 'https://example.com/image.png'
    }
  ]
}
```

### Blog Posts

Add to the `blogPosts` array:

```typescript
{
  type: 'blog',
  slug: 'post-slug',
  title: 'Post Title',
  date: '2024-01-15',
  readingTime: '5 min read',
  isNew: true,
  labels: ['Label 1', 'Label 2'],
  quote: 'Pull quote text',
  sections: [
    {
      title: 'Section Title',
      content: 'Section content...'
    }
  ]
}
```

### Explorations

Add to the `explorations` array:

```typescript
{
  type: 'exploration',
  slug: 'exploration-slug',
  title: 'Exploration Title',
  tools: ['Tool 1', 'Tool 2'],
  isFeatured: true,
  cardImage: 'https://example.com/card.png',
  images: ['https://example.com/img1.png', 'https://example.com/img2.png']
}
```

## Adding Fonts

Place font files in `public/fonts/` directory:
- Inter-Regular.woff2 / Inter-Regular.ttf
- Inter-SemiBold.woff2 / Inter-SemiBold.ttf

The `@font-face` declarations are already configured in `src/app/globals.css`.

## Setup & Build

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Project
```bash
npm run build
```

### 3. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to preview.

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Vercel will auto-detect Next.js and configure build settings

### Custom Domain

1. In Vercel Settings → Domains
2. Add custom domain: `abioladeyeye.com`
3. Configure DNS records according to Vercel instructions

## Features

- **Responsive Design** - Mobile-optimized layout with fixed side navigation
- **Framer Motion Animations** - Smooth page transitions and hover effects
- **Image Optimization** - Next.js Image component with lazy loading
- **Type Safety** - Full TypeScript support
- **Tailwind CSS** - Utility-first styling
- **SEO Optimized** - Metadata and dynamic routes

## Color Palette

- **Black**: #000000
- **White**: #FFFFFF
- **Grey Background**: #F5F5F5
- **Grey Border**: #E0E0E0
- **Grey Border Darker**: #CCCCCC
- **Grey Text Main**: #666666
- **Primary**: #2563EB

## Typography

- **Heading L**: 48px / 600 weight
- **Heading M**: 28px / 600 weight
- **Heading 2**: 32px / 600 weight
- **Heading 3**: 20px / 600 weight
- **Heading S**: 24px / 600 weight
- **Body XL**: 20px
- **Body M**: 16px
- **Body S**: 14px
- **Uppercase**: 12px / 600 weight / uppercase

## License

Personal portfolio — All rights reserved
