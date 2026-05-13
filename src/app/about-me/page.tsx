'use client'

import Image from 'next/image'
import Link from 'next/link'
import ToolIcon from '@/src/components/ToolIcon'
import LetsConnectSection from '@/src/components/LetsConnectSection'
import { DownloadSimple } from '@phosphor-icons/react'
export default function AboutPage() {

  const aboutSentences = [
    "I'm a designer focused on creating experiences that actually matter.",
    "I care about how people interact with technology and work to make those moments simple and meaningful.",
    "I love solving complex problems and believe great design starts with understanding people.",
    "Every project I take on is about finding thoughtful solutions that work for both users and businesses.",
    "I push boundaries but keep things practical.",
    "I thrive in collaboration and I'm always learning."
  ]

  const currentStack = [
    'Adobe Creative Suite',
    'Nano Banana Pro',
    'Notion',
    'Midjourney',
    'Canva',
    'Figma',
    'Blender',
    'Claude',
  ]

  const whatIDo = ['Branding', '3D Modelling', 'Visual Design', 'Generative AI Design', 'E-commerce Design', 'Marketing Design']
  const iKnow = ['Python', 'Photo Manipulation', 'Html and CSS', 'Typography', 'Logo Design', 'Brand Design']

  const experience = [
    { company: 'Miela', role: 'Brand Designer & IT Lead', duration: 'Jun 2023 - Oct 2025' },
    { company: 'Eyekontact Limited', role: 'Senior Creative Executive', duration: '2022 - 2023' },
    { company: 'Kunyo.co', role: 'Creative Specialist', duration: 'May 2021 - Sep 2022' },
    { company: 'EaglesTracker', role: 'Graphic Designer', duration: 'Jan 2019 - Dec 2021' },
  ]

  const testimonials = [
    {
      name: 'Ana Smith',
      title: 'Product Manager at Tech Innovations',
      quote: `Abiola's design expertise is a game-changer. He's a valuable asset to any design team.`,
    },
    {
      name: 'Jan Sue',
      title: 'Product Manager at Nava',
      quote: 'Working with Abiola on our startup\'s product was an incredible experience.',
    },
    {
      name: 'Tony Jones',
      title: 'Product Manager at Acme',
      quote: 'Abiola has a strong creative instinct and an ability to translate a brief into something that truly stands out.',
    },
  ]

  return (
    <>
      {/* Name Heading */}
      <div className="relative w-full bg-[rgb(14,14,18)] z-10" style={{ paddingLeft: '64px', paddingRight: '64px', paddingTop: '96px' }}>
        <h1
          className="font-heading text-[45px] leading-[106px] tracking-[-0.02em] text-[rgb(250,250,250)] uppercase"
          style={{ fontFamily: 'Mortend', marginBottom: '64px' }}
        >
          Abiola Adeyeye
        </h1>
      </div>

      {/* Solid Content Area - Two Column Layout */}
      <div className="relative w-full bg-[rgb(14,14,18)] z-10">
        <div className="flex flex-col lg:flex-row gap-2 px-4" style={{ paddingLeft: '64px', paddingRight: '64px', gap: '8px' }}>

          {/* Left Column */}
          <div className="flex-1" style={{ paddingTop: '96px', paddingBottom: '64px' }}>

            {/* About Me Section */}
            <div className="mb-16" style={{ marginBottom: '64px' }}>
              <h2
                className="font-heading text-[15px] leading-[28px] tracking-[0.07em] text-[rgb(250,250,250)] uppercase mb-5"
                style={{ fontFamily: 'Mortend', marginBottom: '20px' }}
              >
                About me
              </h2>
              {aboutSentences.map((sentence, index) => (
                <p key={index} className="font-gucina text-[16px] leading-[28px] tracking-[0.01em] text-[rgb(138,138,138)] mb-4">
                  {sentence}
                </p>
              ))}
              <div className="w-full" style={{ borderBottom: `1px solid rgb(31, 31, 31)`, marginTop: '64px', paddingBottom: '24px' }} />
            </div>

            {/* Work Experiences Section */}
            <div style={{ marginBottom: '64px' }}>
              {/* Work Experiences Header */}
              <div className="mb-8" style={{ marginBottom: '20px' }}>
                <h2
                  className="font-heading text-[15px] leading-[28px] tracking-[0.07em] text-[rgb(250,250,250)] uppercase"
                  style={{ fontFamily: 'Mortend' }}
                >
                  Work Experiences
                </h2>
              </div>

              {/* Column Headers */}
              <div className="flex justify-between gap-8 mb-6">
                <div className="flex-1">
                  <span className="font-gucina font-bold text-[12px] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                    Company
                  </span>
                </div>
                <div className="flex-1">
                  <span className="font-gucina font-bold text-[12px] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                    Role
                  </span>
                </div>
                <div className="flex-1">
                  <span className="font-gucina font-bold text-[12px] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                    Duration
                  </span>
                </div>
              </div>

              {/* Experience Rows */}
              <div className="flex flex-col gap-6 mb-8" style={{ marginBottom: '32px' }}>
                {experience.map((exp, index) => (
                  <div key={index} className="flex justify-between gap-8 pb-6" style={{ borderBottom: `1px solid rgb(31, 31, 31)`, paddingBottom: '24px' }}>
                    <div className="flex-1">
                      <p className="font-gucina text-[16px] leading-[28px] tracking-[0.01em] text-[rgb(250,250,250)]">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="font-gucina text-[16px] leading-[28px] tracking-[0.01em] text-[rgb(250,250,250)]">
                        {exp.role}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="font-gucina text-[16px] leading-[28px] tracking-[0.01em] text-[rgb(250,250,250)]">
                        {exp.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Full Resume Button */}
              <a
                href="https://drive.google.com/file/d/1HG_51ItrZI4yQOi1qifwe9L5_q_E2lyG/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center flex-shrink-0 border border-[rgb(51,51,51)] rounded-full overflow-hidden transition-colors"
                style={{ padding: '12px 12px 12px 16px' }}
              >
                {/* Hover background fill */}
                <span
                  className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100"
                  style={{
                    top: '12px',
                    bottom: '12px',
                    left: '0',
                    right: '0',
                    backgroundColor: 'rgb(22, 66, 91)',
                    zIndex: 1,
                  }}
                />

                {/* Text and Icon */}
                <span className="relative z-[2] flex items-center" style={{ gap: '4px' }}>
                  <span className="font-gucina font-semibold text-[12px] leading-[18px] tracking-[0.01em] text-[rgb(129,195,215)]">
                    Full resume
                  </span>
                  <DownloadSimple size={18} weight="regular" color="rgb(129,195,215)" />
                </span>
              </a>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside
            className="w-full lg:w-[25%] lg:min-w-[296px] border-t-2 lg:border-t-0 lg:border-l-2 border-[rgb(2,1,10)] hidden lg:block"
            style={{ paddingTop: '96px', paddingRight: '64px', paddingBottom: '64px', paddingLeft: '24px' }}
          >
            {/* What I Do */}
            <div className="mb-8" style={{ marginBottom: '32px' }}>
              <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)] block mb-5" style={{ marginBottom: '20px' }}>
                What I Do
              </label>
              <div className="flex flex-wrap gap-3">
                {whatIDo.map((item) => (
                  <div key={item} className="rounded-full border border-[rgb(51,51,51)] px-3 py-2">
                    <span className="font-gucina text-[12px] leading-[18px] text-[rgb(138,138,138)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full h-px bg-[rgb(31,31,31)] mt-8" />
            </div>

            {/* Current Stack */}
            <div className="mb-8" style={{ marginBottom: '32px' }}>
              <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)] block mb-5" style={{ marginBottom: '20px' }}>
                Current Stack
              </label>
              <div className="flex flex-wrap gap-3">
                {currentStack.map((item) => (
                  <div key={item}>
                    <ToolIcon name={item} />
                  </div>
                ))}
              </div>
              <div className="w-full h-px bg-[rgb(31,31,31)] mt-8" />
            </div>

            {/* I Know */}
            <div>
              <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)] block mb-5" style={{ marginBottom: '20px' }}>
                I Know
              </label>
              <div className="flex flex-wrap gap-3">
                {iKnow.map((item) => (
                  <div key={item} className="rounded-full border border-[rgb(51,51,51)] px-3 py-2">
                    <span className="font-gucina text-[12px] leading-[18px] text-[rgb(138,138,138)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Testimonials Section */}
        <section
          className="w-full border-t-2 border-[rgb(2,1,10)] bg-[rgb(14,14,18)] overflow-hidden"
          style={{ padding: '64px' }}
        >
          <h2
            className="font-heading text-[15px] leading-[28px] tracking-[0.07em] text-[rgb(250,250,250)] uppercase mb-5"
            style={{ fontFamily: 'Mortend', marginBottom: '20px' }}
          >
            Testimonials
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative" style={{ gap: '32px' }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col gap-4 relative">
                {/* Vertical Divider */}
                {index < testimonials.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-0 w-px h-64 bg-[rgb(31,31,31)]" style={{ height: '256px' }} />
                )}

                {/* Quote */}
                <p className="font-gucina text-[14px] leading-[24px] text-[rgb(138,138,138)]">
                  "{testimonial.quote}"
                </p>

                {/* Avatar + Name/Role Row */}
                <div className="flex gap-3 items-start">
                  {/* Avatar */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{
                      width: '34px',
                      height: '34px',
                      minWidth: '34px',
                      backgroundColor: ['rgb(99, 102, 241)', 'rgb(168, 85, 247)', 'rgb(59, 130, 246)'][index],
                    }}
                  >
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>

                  {/* Name and Role */}
                  <div>
                    <p className="font-gucina font-bold text-[12px] text-[rgb(250,250,250)]">
                      {testimonial.name}
                    </p>
                    <p className="font-gucina text-[12px] text-[rgb(138,138,138)]">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Let's Connect Section */}
      <LetsConnectSection />
    </>
  )
}
