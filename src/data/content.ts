export type ContentType = 'project' | 'blog' | 'exploration'

export interface Project {
  type: 'project'
  slug: string
  title: string
  description?: string
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
    images?: string[]
    video?: string
    videoFile?: string
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
  description?: string
  date?: string
  tools: string[]
  isFeatured?: boolean
  cardImage: string
  images: string[]
  randomizeImages?: boolean
}

export const projects: Project[] = [
  {
    type: 'project',
    slug: 'jameson',
    title: 'Jameson',
    description: 'OOH installation featuring a monumental 3D-modeled barrel man in Lagos.',
    label1: 'OOH',
    label2: '3D Modelling',
    duration: '2 Months',
    date: 'September 2024',
    isFeatured: true,
    cardImage: '/jdot-cover.png',
    heroImage: '/jameson-hero.webp',
    roleLabels: [],
    sections: [
      {
        title: 'The Idea',
        content: 'Jameson wanted Lagos to feel the distillery before they ever stepped inside it. The plan was simple. Put something so big and so bold on a Lagos road that people in traffic had no choice but to notice.\n\nThat something was the barrel man. Jameson\'s iconic figure, the one that represents the cooper and the craft behind every bottle, built at full scale, standing on top of a branded container. And the detail that made it all click: he was facing the direction of the venue. Not just a decoration. A guide.',
        image: '/jameson-idea.webp',
      },
      {
        title: 'Process',
        content: 'I modeled the container and the barrel man from scratch in Blender. The figure had to look like it was moving, like it was actually heading somewhere. Because it was.\n\nEvery joint, every proportion, every angle was worked out in 3D before anything was built in real life.',
        images: ['/jameson-process-1.webp', '/jameson-process-2.webp'],
      },
      {
        title: 'Visualization',
        content: 'The renders showed exactly what would go up. Jameson green, the barrel man mid-stride, the branded container underneath him with the event details on every face.\n\nWhat you see in the render is what showed up on the street.',
        images: ['/jameson-vis-1.webp', '/jameson-vis-2.webp', '/jameson-vis-3.webp'],
      },
      {
        title: 'Result',
        content: 'It went up on one of the busiest roads on Lagos Island and stayed through the full run of JDOT at Fidelity Bank Grounds Oniru.\n\nPeople in traffic saw a giant green figure carrying a barrel and pointing the way. The barrel man was the first thing they saw. The event was the second.',
        images: ['/jameson-result-3.jpg', '/jameson-result-4.jpg', '/jameson-result-7.jpg', '/jameson-result-8.jpg', '/jameson-result-9.jpg'],
      },
    ],
  },
  {
    type: 'project',
    slug: 'martell',
    title: 'Martell',
    description: 'OOH monument installation strategically positioned at Lagos' most trafficked roundabout.',
    label1: 'OOH',
    label2: '3D Modelling',
    duration: '2 Months',
    date: 'June – July 2023',
    isFeatured: true,
    cardImage: '/martell-cover.webp',
    heroImage: '/martell-cover.webp',
    roleLabels: ['Design'],
    sections: [
      {
        title: 'The Idea',
        content: 'Most outdoor advertising asks for attention. This did not. The brief was about location, specifically the one roundabout in Lagos that every single person crossing into Lagos Island cannot avoid.\n\nThe audacity of the concept was not the structure itself. It was the decision to plant a permanent branded monument at that exact point in the city and let geography do the rest.',
        image: '/martell-hero.webp',
      },
      {
        title: 'Process',
        content: 'I handled the 3D modeling and visualization in Blender as part of the creative team at Eyekontact.\n\nEvery surface and proportion was built to real world scale before fabrication began.',
        images: ['/martell-pro-1.webp', '/martell-pro-3.webp'],
      },
      {
        title: 'Visualization',
        content: 'The renders showed exactly what would be built. Navy background, white letters, gold swallow.\n\nThe swallow was the most detailed part. Each fin was modeled separately so it would catch shadow properly at that size. What you see in the render is what went up at the roundabout.',
        images: ['/martell-vis-1.webp', '/martell-vis-3.webp'],
      },
      {
        title: 'Result',
        content: 'The installation went up at the Admiralty Way roundabout in Lekki, one of the most trafficked junctions on the Lagos Island corridor. Day or night, from ground level or above, it held.\n\nThe ground lanterns framing the black platform, the backlit lettering cutting through Lagos traffic at night, the swallow visible from every approach. It was not just seen. It was felt.\n\nThat is what happens when the location is the strategy.',
        images: ['/martell-res-1.webp', '/martell-res-3.webp', '/martell-res-4.webp'],
      },
    ],
  },
  {
    type: 'project',
    slug: 'duskline',
    title: 'Duskline',
    description: 'Brand identity for a vinyl record shop and listening bar.',
    label1: 'Listening Bar',
    label2: 'Branding',
    duration: '4 Weeks',
    date: 'January – February 2021',
    isFeatured: false,
    cardImage: 'https://framerusercontent.com/images/qXkwFSNeDhLPMrgjgIowdfMR1E.png',
    heroImage: 'https://framerusercontent.com/images/xcKqdi3zJ4mgzPoQhSL5zV6LaM.png',
    roleLabels: ['Brand Design', 'Branding', 'Listening Bar', 'Entertainment'],
    sections: [
      {
        title: 'Project Overview',
        content: 'Duskline is a vinyl record shop that becomes a listening bar at night. It serves people who care about music and want a warm, welcoming place to enjoy it.\n\nThe brand captures the dual experience. It feels dark and atmospheric at night, but always friendly. Every design choice started with one principle: sound first.',
        videoFile: '/duskline-4k.mp4',
      },
      {
        title: 'The Challenge',
        content: 'Duskline is two things at once: a record shop during the day and a listening bar at night. The challenge was creating one brand identity that worked for both without feeling split.\n\nThe design needed to feel warm and easy to browse during the day, then shift into something darker and moodier at night. One visual language for two very different experiences.',
        image: '/d6.png',
      },
      {
        title: 'Brand Strategy',
        content: 'The strategy focuses on the listening experience, not just the products. Whether you are flipping through records or sitting with a drink, sound is the connecting thread. This became the foundation for every design choice.\n\nEvery detail, from color to typeface, was designed to feel intentional and unhurried. The brand does not demand attention. Instead, it draws you in quietly, the way good music does.',
        images: ['/d1.png', '/d2.png', '/d3.png', '/d4.png', '/d5.png', '/d7.gif'],
      },
    ],
  },
  {
    type: 'project',
    slug: 'verdant',
    title: 'Verdant',
    description: 'Brand identity for Portland specialty coffee focused on human connection.',
    label1: 'Cafe',
    label2: 'Branding',
    duration: '4 Weeks',
    date: 'January – February 2025',
    readingTime: '4 min read',
    isFeatured: true,
    cardImage: 'https://framerusercontent.com/images/Gjv37JbUfzuixRwc4G6wKaGqehc.png',
    heroImage: 'https://framerusercontent.com/images/9bJJ90PcA0AIO3pZTS7Gi79k.png',
    roleLabels: ['Visual Identity', 'Brand Identity', 'Branding', 'Cafe'],
    sections: [
      {
        title: 'Project Overview',
        content: 'Verdant Cafe is a Portland specialty coffee brand with one core idea: sitting down with a friend over a good cup of coffee. Founder Marcus Chen buys beans directly from farmers in Colombia, Ethiopia, and Guatemala.\n\nThe brand identity is playful but premium. It features hand-drawn typefaces, warm earthy colors, and a bearded mascot that represents Marcus. The mascot also reads as two coffee cups toasting, embedding friendship into every detail.',
        videoFile: '/verdant-one-4k.mp4',
      },
      {
        title: 'The Challenge',
        content: 'Specialty coffee branding has become too serious and exclusive. Most brands use minimal, cold design that feels more like a museum than a welcoming space.\n\nMen between 30 and 50 need accessible places to sit and talk with friends. Verdant needed to feel different while keeping its focus on quality and ethical sourcing.',
        image: '/verdant-challenge-v2.gif',
      },
      {
        title: 'Brand Strategy',
        content: 'The strategy is built on genuine human connection over coffee. Marcus Chen built the brand around his story of finding friendship again through coffee.\n\nVerdant is playful but premium. It targets men who care about quality but do not want coffee snobbery. The promise is simple: good coffee from farmers we know, in a place where you can relax and talk.',
        image: '/verdant-strategy.png',
      },
      {
        title: 'Visual Identity',
        content: 'The bearded mascot icon represents Marcus. It also reads as two coffee cups toasting together.\n\nWarm earthy colors, deep teal and cream, and simple typefaces create a design that feels handmade and real, not corporate.',
        images: ['/verdant-identity-v1.png', '/verdant-identity-v3.png', '/verdant-identity-v4.png', '/verdant-identity-v5.png', '/verdant-identity-v6.png', '/verdant-identity-v7.png', '/verdant-identity-v8.png', '/verdant-identity-v9.png', '/verdant-identity-v10.png'],
        videoFile: '/verdant-two-4k.mp4',
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
    slug: 'posters',
    title: 'Posters',
    description: 'Creative poster designs exploring visual storytelling and composition through various artistic styles.',
    date: 'Aug 25, 2023',
    tools: ['Photoshop', 'Illustrator', 'Figma'],
    isFeatured: true,
    cardImage: 'https://framerusercontent.com/images/FpnS05Dyr8VS33BysFtyZYsoxo.webp?width=1842&height=1754',
    randomizeImages: false,
    images: [
      'https://framerusercontent.com/images/FpnS05Dyr8VS33BysFtyZYsoxo.webp?width=1842&height=1754',
      'https://framerusercontent.com/images/lbe2UvK4F3tucUOwQMZWrh2NE.jpg?width=4096&height=4096',
      'https://framerusercontent.com/images/dIpWOsFwzVtdzNSD3pSAHhmmjKY.png?width=1242&height=1208',
      'https://framerusercontent.com/images/TZ87NRylhvnOTFPfdO9D0ajJeio.png?width=2048&height=2048',
      'https://framerusercontent.com/images/LbnvzXqr3P4LBJV2Q1gES4NauU.png?width=2000&height=2000',
      'https://framerusercontent.com/images/gItAqlwvxAL4vL9GothXOsAIo.png?width=2000&height=2000',
      '/posters-1.png',
      '/posters-2.png',
      '/posters-3.png',
      '/posters-4.png',
      '/posters-5.png',
      '/posters-6.png',
      '/posters-7.png',
      ],
  },
  {
    type: 'exploration',
    slug: 'lucia',
    title: 'Lucia',
    description: 'An AI influencer dedicated to Chelsea FC and connecting with the football community on Instagram.',
    date: 'Jul 01, 2026',
    tools: ['Photoshop', 'Nano Banana Pro'],
    isFeatured: true,
    cardImage: '/lucia/lucia-cover.webp',
    randomizeImages: false,
    images: [
      '/lucia/lucia-cover.webp',
      '/lucia/lucia-1.webp',
      '/lucia/lucia-2.webp',
      '/lucia/lucia-3.webp',
      '/lucia/lucia-4.webp',
      '/lucia/lucia-5.webp',
      '/lucia/lucia-6.webp',
      '/lucia/lucia-7.webp',
    ],
  },
]
