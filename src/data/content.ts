export type ContentType = 'project' | 'blog' | 'exploration'

export interface Project {
  type: 'project'
  slug: string
  title: string
  label1: string
  label2: string
  duration: string
  readingTime?: string
  isFeatured?: boolean
  cardImage: string
  heroImage: string
  roleLabels: string[]
  sections: Array<{
    title: string
    content: string
    image?: string
  }>
}

export interface BlogPost {
  type: 'blog'
  slug: string
  title: string
  date: string
  readingTime: string
  isNew?: boolean
  labels: string[]
  quote: string
  sections: Array<{
    title: string
    content: string
  }>
}

export interface Exploration {
  type: 'exploration'
  slug: string
  title: string
  tools: string[]
  isFeatured?: boolean
  cardImage: string
  images: string[]
}

export const projects: Project[] = [
  {
    type: 'project',
    slug: 'verdant',
    title: 'Verdant',
    label1: 'Cafe',
    label2: 'Food',
    duration: '4 Weeks',
    readingTime: '4 min read',
    isFeatured: true,
    cardImage: 'https://framerusercontent.com/images/Gjv37JbUfzuixRwc4G6wKaGqehc.png',
    heroImage: 'https://framerusercontent.com/images/9bJJ90PcA0AIO3pZTS7Gi79k.png',
    roleLabels: ['Visual Identity', 'Brand Identity', 'Branding', 'Cafe'],
    sections: [
      {
        title: 'The Brief',
        content: 'Verdant is a sustainable cafe focused on organic, locally-sourced ingredients. The brand identity needed to reflect the cafe\'s commitment to nature and sustainability while maintaining a modern, approachable aesthetic.',
      },
      {
        title: 'Design Direction',
        content: 'The design system uses natural color palettes inspired by plants and earth tones. Typography emphasizes clarity and readability, while the visual elements incorporate organic shapes and botanical illustrations to reinforce the eco-conscious message.',
      },
      {
        title: 'Visual Identity',
        content: 'The logo features a stylized leaf that doubles as a coffee cup, symbolizing the intersection of nature and coffee culture. This mark forms the foundation of the entire visual system.',
      },
      {
        title: 'Application',
        content: 'From packaging to digital touchpoints, the brand identity maintains consistency while adapting to different contexts. The flexible system allows for seasonal variations and special editions.',
      },
    ],
  },
  {
    type: 'project',
    slug: 'duskline',
    title: 'Duskline',
    label1: 'Listening Bar',
    label2: 'Entertainment',
    duration: '4 Weeks',
    isFeatured: true,
    cardImage: 'https://framerusercontent.com/images/qXkwFSNeDhLPMrgjgIowdfMR1E.png',
    heroImage: 'https://framerusercontent.com/images/xcKqdi3zJ4mgzPoQhSL5zV6LaM.png',
    roleLabels: ['Brand Design', 'Branding', 'Listening Bar', 'Entertainment'],
    sections: [
      {
        title: 'The Concept',
        content: 'Duskline is an immersive listening bar experience where music is the main attraction. The brand needed to communicate sophistication, exclusivity, and a deep appreciation for sonic experiences.',
      },
      {
        title: 'Brand Strategy',
        content: 'The visual identity draws inspiration from analog music formats and vintage audio equipment, reimagined for a contemporary audience. Deep, moody colors create an intimate atmosphere.',
      },
      {
        title: 'Design Elements',
        content: 'Custom typography and a distinctive audio waveform pattern serve as key brand elements. These are used consistently across all touchpoints to create a cohesive experience.',
      },
      {
        title: 'Experience Design',
        content: 'Every interaction reinforces the brand\'s focus on sound and listening. From the website to physical signage, the design invites visitors into an exclusive sonic world.',
      },
    ],
  },
  {
    type: 'project',
    slug: 'again-again',
    title: 'Again & Again',
    label1: 'Skincare',
    label2: 'Beauty',
    duration: '2 Months',
    isFeatured: false,
    cardImage: 'https://framerusercontent.com/images/placeholder-skincare.png',
    heroImage: 'https://framerusercontent.com/images/placeholder-skincare-hero.png',
    roleLabels: ['Brand Design', 'Packaging Design', 'Beauty', 'Skincare'],
    sections: [
      {
        title: 'Skincare Brand',
        content: 'A clean, minimalist approach to skincare branding.',
      },
      {
        title: 'Visual System',
        content: 'Emphasizing natural ingredients and sustainable practices.',
      },
      {
        title: 'Packaging',
        content: 'Elegant packaging design that stands out on shelves.',
      },
      {
        title: 'Digital Presence',
        content: 'Cohesive digital experience across all platforms.',
      },
    ],
  },
]

export const blogPosts: BlogPost[] = [
  {
    type: 'blog',
    slug: 'designing-for-the-music-business',
    title: 'Designing for the music business',
    date: '2022-04-08',
    readingTime: '7 min read',
    isNew: true,
    labels: ['Music Business', 'Personal Connections', 'Web Design', 'Spotify'],
    quote: 'Design is not just about making things look good; it\'s about creating meaningful connections between people and music.',
    sections: [
      {
        title: 'Understanding the Industry',
        content: 'The music industry is rapidly evolving with streaming platforms dominating how we consume music. Designers need to understand this shift and create experiences that enhance how people discover and enjoy music.',
      },
      {
        title: 'Designing for Discovery',
        content: 'With millions of songs available, the challenge is helping users discover music they love. This requires thoughtful information architecture and intuitive filtering systems that don\'t overwhelm users.',
      },
      {
        title: 'Building Communities',
        content: 'Modern music platforms are about more than just playback—they\'re about community. Designers must create spaces where fans connect with artists and each other.',
      },
      {
        title: 'The Personal Touch',
        content: 'The most successful music design experiences feel personal. Whether through curated playlists or personalized recommendations, creating that human connection is key.',
      },
    ],
  },
]

export const explorations: Exploration[] = [
  {
    type: 'exploration',
    slug: 'slots',
    title: 'Casino & Slots',
    tools: ['Photoshop', 'Nano Banana Pro'],
    isFeatured: false,
    cardImage: 'https://framerusercontent.com/images/bIy3Wm81gIbP6mrUi5RkzGKdI.png',
    images: [
      'https://framerusercontent.com/images/bIy3Wm81gIbP6mrUi5RkzGKdI.png',
      'https://framerusercontent.com/images/slots-2.png',
      'https://framerusercontent.com/images/slots-3.png',
      'https://framerusercontent.com/images/slots-4.png',
    ],
  },
  {
    type: 'exploration',
    slug: 'ecommerce-posters',
    title: 'E-Commerce Posters',
    tools: ['Photoshop', 'Illustrator'],
    isFeatured: true,
    cardImage: 'https://framerusercontent.com/images/FpnS05Dyr8VS33BysFtyZYsoxo.webp',
    images: [
      'https://framerusercontent.com/images/FpnS05Dyr8VS33BysFtyZYsoxo.webp',
      'https://framerusercontent.com/images/ecommerce-2.png',
      'https://framerusercontent.com/images/ecommerce-3.png',
      'https://framerusercontent.com/images/ecommerce-4.png',
    ],
  },
  {
    type: 'exploration',
    slug: 'miela-posters',
    title: 'Digital Agency Designs',
    tools: ['Photoshop', 'Illustrator'],
    isFeatured: true,
    cardImage: 'https://framerusercontent.com/images/9Nfy7lTjOXpn6pplcPO0DocHILw.png',
    images: [
      'https://framerusercontent.com/images/9Nfy7lTjOXpn6pplcPO0DocHILw.png',
      'https://framerusercontent.com/images/miela-2.png',
      'https://framerusercontent.com/images/miela-3.png',
    ],
  },
  {
    type: 'exploration',
    slug: 'igaming-posters',
    title: 'iGaming Posters',
    tools: ['Photoshop', 'Illustrator'],
    isFeatured: true,
    cardImage: 'https://framerusercontent.com/images/0OoFz5p9hNvRgCJLvy669DQzbG4.png',
    images: [
      'https://framerusercontent.com/images/0OoFz5p9hNvRgCJLvy669DQzbG4.png',
      'https://framerusercontent.com/images/igaming-2.png',
      'https://framerusercontent.com/images/igaming-3.png',
      'https://framerusercontent.com/images/igaming-4.png',
    ],
  },
]
