export type ContentType = 'project' | 'blog' | 'exploration'

export interface Project {
  type: 'project'
  slug: string
  title: string
  label1: string
  label2: string
  duration: string
  date?: string
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
    date: 'January – February 2026',
    readingTime: '4 min read',
    isFeatured: true,
    cardImage: 'https://framerusercontent.com/images/Gjv37JbUfzuixRwc4G6wKaGqehc.png',
    heroImage: 'https://framerusercontent.com/images/9bJJ90PcA0AIO3pZTS7Gi79k.png',
    roleLabels: ['Visual Identity', 'Brand Identity', 'Branding', 'Cafe'],
    sections: [
      {
        title: 'Project Overview',
        content: 'Verdant Cafe is a Portland-based specialty coffee brand centered on one idea: sitting down with your friend over a good cup of coffee. Founder Marcus Chen sources beans directly from farmers in Colombia, Ethiopia, and Guatemala. The playful-but-premium brand identity features hand-drawn typography, warm earthy colors, and a bearded mascot that represents Marcus while doubling as two coffee cups toasting—embedding friendship into every detail.',
        image: 'https://framerusercontent.com/images/xOhrZlZGOQ2RCjPxGczDXfAtdYc.gif?width=800&height=450',
      },
      {
        title: 'The Challenge',
        content: 'Specialty coffee branding has become overly serious and exclusive. Most brands adopt minimal, cold aesthetics that feel more like design museums than welcoming spaces. Men aged 30-50 lack accessible third places where they can sit down with friends without pretense or performance. Verdant needed to break this mold while maintaining premium quality and ethical sourcing standards.',
        image: 'https://framerusercontent.com/images/1teDv4ZcZm10tBmTdbONWqT8Sso.gif?width=1400&height=1051',
      },
      {
        title: 'Brand Strategy',
        content: 'The strategy centers on genuine human connection over coffee. Marcus Chen\'s story of rediscovering friendship through a simple coffee conversation became the brand foundation. Verdant positions itself as playful but premium, targeting men who appreciate craft quality but reject coffee snobbery. The brand promise is simple: good coffee from farmers we know, shared in a space where you can relax and talk.',
        image: 'https://framerusercontent.com/images/Sl8rx0GmuTH5PtkF3T6c6W2p9g.gif?width=800&height=450',
      },
      {
        title: 'Visual Identity',
        content: 'The bearded mascot icon represents Marcus while visually reading as two coffee cups toasting. Warm earthy colors (deep teal & cream) and organic typography create an approachable premium aesthetic that feels crafted, not corporate.',
        image: 'https://framerusercontent.com/images/umKHDWBYIi7CLGa4eIRtHGSrQw.png?width=1400&height=964',
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
    date: 'January – February 2026',
    isFeatured: true,
    cardImage: 'https://framerusercontent.com/images/qXkwFSNeDhLPMrgjgIowdfMR1E.png',
    heroImage: 'https://framerusercontent.com/images/xcKqdi3zJ4mgzPoQhSL5zV6LaM.png',
    roleLabels: ['Brand Design', 'Branding', 'Listening Bar', 'Entertainment'],
    sections: [
      {
        title: 'Project Overview',
        content: 'Duskline is a vinyl record shop that transforms into a listening bar at night. It\'s built for people who take music seriously but want somewhere warm and welcoming to enjoy it.\n\nThe brand identity captures that dual nature, dark, atmospheric, and confident by night, but always approachable. Every design decision was guided by one idea: sound first.',
        image: 'https://framerusercontent.com/images/jdAWGQ79Ef5Oq9ifYlVLjaQ4E.gif?width=800&height=600',
      },
      {
        title: 'The Challenge',
        content: 'Duskline operates as two things at once, a record shop by day and a listening bar by night. The challenge was building a single brand identity that could hold both without feeling split or inconsistent.\n\nThe design had to feel warm and browsable in the daytime while shifting into something moodier and more atmospheric after dark. One visual language, two very different experiences.',
        image: 'https://framerusercontent.com/images/fsgAmyTmClybagSHaZB6UZFQ4T8.gif?width=1408&height=958',
      },
      {
        title: 'Brand Strategy',
        content: 'The strategy was to lead with the listening experience rather than the products. Whether you are flipping through crates or sitting with a drink, the common thread is sound. That became the anchor for every brand decision.\n\nFrom the color palette to the typography, everything was built to feel intentional and unhurried. The brand does not shout for attention. It draws you in quietly, the same way good music does.',
        image: 'https://framerusercontent.com/images/iFsYnxNfati1W0exANnih8B9Qc.gif?width=1920&height=1440',
      },
      {
        title: 'Visual Identity',
        content: 'The identity is built around a rich, considered color system. Deep burgundy anchors the palette with weight and warmth, balanced by a soft cream and a warm off white that keep the brand from feeling heavy or closed off.\n\nTogether the three colors reflect the atmosphere of the space itself. Dark and intimate at its core, but always with enough warmth to feel welcoming. The palette works across everything from signage to packaging without losing its character.',
        image: 'https://framerusercontent.com/images/lU8OrmyNlhSmf7qWsr4BoaWjCWk.png?width=1408&height=957',
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
