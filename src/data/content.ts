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
    images?: string[]
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
        images: ['/jameson-process-1.webp', '/jameson-process-2.webp', '/jameson-process-3.webp', '/jameson-process-4.webp'],
      },
      {
        title: 'Visualization',
        content: 'The renders showed exactly what would go up. Jameson green, the barrel man mid-stride, the branded container underneath him with the event details on every face.\n\nWhat you see in the render is what showed up on the street.',
        images: ['/jameson-vis-1.webp', '/jameson-vis-2.webp', '/jameson-vis-3.webp', '/jameson-vis-4.webp', '/jameson-vis-5.webp', '/jameson-vis-6.webp'],
      },
      {
        title: 'Result',
        content: 'It went up on one of the busiest roads on Lagos Island and stayed through the full run of JDOT at Fidelity Bank Grounds Oniru.\n\nPeople in traffic saw a giant green figure carrying a barrel and pointing the way. The barrel man was the first thing they saw. The event was the second.',
        images: ['/jameson-result-1.jpg', '/jameson-result-2.jpg', '/jameson-result-3.jpg', '/jameson-result-4.jpg', '/jameson-result-5.jpg', '/jameson-result-6.jpg', '/jameson-result-7.jpg', '/jameson-result-8.jpg', '/jameson-result-9.jpg'],
      },
    ],
  },
  {
    type: 'project',
    slug: 'martell',
    title: 'Martell',
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
        images: ['/martell-pro-1.webp', '/martell-pro-2.webp', '/martell-pro-3.webp'],
      },
      {
        title: 'Visualization',
        content: 'The renders showed exactly what would be built. Navy background, white letters, gold swallow.\n\nThe swallow was the most detailed part. Each fin was modeled separately so it would catch shadow properly at that size. What you see in the render is what went up at the roundabout.',
        images: ['/martell-vis-1.webp', '/martell-vis-3.webp', '/martell-vis-2.webp'],
      },
      {
        title: 'Result',
        content: 'The installation went up at the Admiralty Way roundabout in Lekki, one of the most trafficked junctions on the Lagos Island corridor. Day or night, from ground level or above, it held.\n\nThe ground lanterns framing the black platform, the backlit lettering cutting through Lagos traffic at night, the swallow visible from every approach. It was not just seen. It was felt.\n\nThat is what happens when the location is the strategy.',
        images: ['/martell-res-1.webp', '/martell-res-2.webp', '/martell-res-3.webp', '/martell-res-4.webp'],
      },
    ],
  },
  {
    type: 'project',
    slug: 'duskline',
    title: 'Duskline',
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
        image: 'https://framerusercontent.com/images/jdAWGQ79Ef5Oq9ifYlVLjaQ4E.gif?width=800&height=600',
      },
      {
        title: 'The Challenge',
        content: 'Duskline is two things at once: a record shop during the day and a listening bar at night. The challenge was creating one brand identity that worked for both without feeling split.\n\nThe design needed to feel warm and easy to browse during the day, then shift into something darker and moodier at night. One visual language for two very different experiences.',
        image: 'https://framerusercontent.com/images/fsgAmyTmClybagSHaZB6UZFQ4T8.gif?width=1408&height=958',
      },
      {
        title: 'Brand Strategy',
        content: 'The strategy focuses on the listening experience, not just the products. Whether you are flipping through records or sitting with a drink, sound is the connecting thread. This became the foundation for every design choice.\n\nEvery detail, from color to typeface, was designed to feel intentional and unhurried. The brand does not demand attention. Instead, it draws you in quietly, the way good music does.',
        image: 'https://framerusercontent.com/images/iFsYnxNfati1W0exANnih8B9Qc.gif?width=1920&height=1440',
      },
    ],
  },
  {
    type: 'project',
    slug: 'verdant',
    title: 'Verdant',
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
        image: 'https://framerusercontent.com/images/xOhrZlZGOQ2RCjPxGczDXfAtdYc.gif?width=800&height=450',
      },
      {
        title: 'The Challenge',
        content: 'Specialty coffee branding has become too serious and exclusive. Most brands use minimal, cold design that feels more like a museum than a welcoming space.\n\nMen between 30 and 50 need accessible places to sit and talk with friends. Verdant needed to feel different while keeping its focus on quality and ethical sourcing.',
        image: 'https://framerusercontent.com/images/1teDv4ZcZm10tBmTdbONWqT8Sso.gif?width=1400&height=1051',
      },
      {
        title: 'Brand Strategy',
        content: 'The strategy is built on genuine human connection over coffee. Marcus Chen built the brand around his story of finding friendship again through coffee.\n\nVerdant is playful but premium. It targets men who care about quality but do not want coffee snobbery. The promise is simple: good coffee from farmers we know, in a place where you can relax and talk.',
        image: 'https://framerusercontent.com/images/Sl8rx0GmuTH5PtkF3T6c6W2p9g.gif?width=800&height=450',
      },
      {
        title: 'Visual Identity',
        content: 'The bearded mascot icon represents Marcus. It also reads as two coffee cups toasting together.\n\nWarm earthy colors, deep teal and cream, and simple typefaces create a design that feels handmade and real, not corporate.',
        image: 'https://framerusercontent.com/images/umKHDWBYIi7CLGa4eIRtHGSrQw.png?width=1400&height=964',
      },
    ],
  },
  {
    type: 'project',
    slug: 'rash',
    title: 'Rash',
    label1: 'Sports',
    label2: 'Branding',
    duration: '1 Month',
    date: 'March 2020',
    isFeatured: false,
    cardImage: '/rash-cover.webp',
    heroImage: '/rash-hero.webp',
    roleLabels: ['Branding', 'Sports'],
    sections: [
      {
        title: 'The Athlete',
        content: 'Rasheedat Ajibade, known as Rash, is a Nigerian professional footballer who was already making waves at Atletico Madrid when this project began. She is now captain of the Super Falcons and plays for Paris Saint-Germain.\n\nKnown for her blue hair and her campaign #TheGirlWithTheBlueHair, Rash needed a personal brand that matched her energy on and off the pitch.',
      },
      {
        title: 'The Logo',
        content: 'The mark is designed around Rasheedat herself. The shape forms an R but it is also a figure in motion, a player mid-kick, striking the ball with her right foot the way she plays.\n\nThe blue circle sitting at the top is her blue hair, the same detail that made her #TheGirlWithTheBlueHair before the world knew her name. Everything in the logo is her. The initial, the movement, the hair.\n\nIt is a portrait disguised as a symbol.',
        image: '/rash-logo.webp',
      },
      {
        title: 'The Identity',
        content: 'The logo is built around a single gesture. Clean, personal, unmistakable.\n\nThe wordmark sits underneath it, straightforward and confident, the same way she carries herself. No excess. Just her name and what it stands for.',
      },
      {
        title: 'The Merch',
        content: 'The identity was applied across a full range of merchandise. Hoodies, slides, beanies.\n\nEach piece carries the brand quietly, the way a personal brand should, present without being loud.',
        images: ['/rash-slides.webp', '/rash-merch.webp'],
      },
      {
        title: 'Where It Stands Now',
        content: 'The brand was designed in 2020. Since then Rash has won WAFCON, signed for PSG, and become one of the most recognizable athletes in African women\'s football.\n\nThe identity built six years ago is still the one she carries.',
        images: ['/rash-on-merch.webp', '/rash-on-merch-2.webp'],
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
    randomizeImages: true,
    images: [
      'https://framerusercontent.com/images/FpnS05Dyr8VS33BysFtyZYsoxo.webp?width=1842&height=1754',
      'https://framerusercontent.com/images/lbe2UvK4F3tucUOwQMZWrh2NE.jpg?width=4096&height=4096',
      'https://framerusercontent.com/images/dIpWOsFwzVtdzNSD3pSAHhmmjKY.png?width=1242&height=1208',
      'https://framerusercontent.com/images/TZ87NRylhvnOTFPfdO9D0ajJeio.png?width=2048&height=2048',
      'https://framerusercontent.com/images/LbnvzXqr3P4LBJV2Q1gES4NauU.png?width=2000&height=2000',
      'https://framerusercontent.com/images/gItAqlwvxAL4vL9GothXOsAIo.png?width=2000&height=2000',
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
