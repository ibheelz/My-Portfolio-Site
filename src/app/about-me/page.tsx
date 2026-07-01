'use client'

import Image from 'next/image'
import Link from 'next/link'
import ToolIcon from '@/src/components/ToolIcon'
import { DownloadSimple } from '@phosphor-icons/react'
import { FadeIn } from '@/src/components/FadeIn'
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

  const experience = [
    { company: 'Miela', role: 'Brand Designer & IT Lead', duration: 'Jun 2023 - Oct 2025' },
    { company: 'Eyekontact Limited', role: 'Senior Creative Executive', duration: '2022 - 2023' },
    { company: 'Kunyo.co', role: 'Creative Specialist', duration: 'May 2021 - Sep 2022' },
    { company: 'EaglesTracker', role: 'Graphic Designer', duration: 'Jan 2019 - Dec 2021' },
  ]

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full overflow-hidden flex flex-col justify-end min-h-[60vh] sm:min-h-[70vh]"
        style={{ paddingLeft: 'clamp(16px, 5vw, 64px)', paddingRight: 'clamp(16px, 5vw, 64px)', paddingBottom: 'clamp(16px, 3vw, 24px)' }}
      >
        <Image
          src="https://framerusercontent.com/images/rwhNTEieRWAoioAYAhisVn9BCE.jpeg"
          alt="Abiola Adeyeye"
          fill
          className="absolute inset-0 object-cover"
          priority
        />

        {/* Gradient overlay for title readability */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]"
          style={{
            height: '200px',
            background: 'linear-gradient(to top, rgb(14, 14, 18) 0%, rgba(14, 14, 18, 0.6) 50%, transparent 100%)'
          }}
        />

        <FadeIn className="relative z-[2]">
          <h1
            className="font-heading text-[clamp(32px,8vw,45px)] leading-[1.2] tracking-[-0.02em] text-[rgb(250,250,250)] uppercase"
            style={{ fontFamily: 'Mortend' }}
          >
            Abiola Adeyeye
          </h1>
        </FadeIn>
      </div>

      {/* Solid Content Area - Two Column Layout */}
      <div className="relative w-full bg-[rgb(14,14,18)]">
        <div className="w-full flex flex-col lg:flex-row gap-0" style={{ paddingLeft: 'clamp(16px, 5vw, 64px)', paddingRight: 'clamp(16px, 5vw, 64px)' }}>

          {/* Left Column */}
          <div className="flex-1" style={{ paddingTop: 'clamp(48px, 10vw, 96px)', paddingBottom: 'clamp(32px, 8vw, 64px)' }}>

            {/* About Me Section */}
            <FadeIn style={{ marginBottom: 'clamp(32px, 8vw, 64px)' }}>
              <div>
                <h2
                  className="font-heading text-[clamp(12px,2.5vw,15px)] leading-[1.4] tracking-[0.07em] text-[rgb(250,250,250)] uppercase"
                  style={{ fontFamily: 'Mortend', marginBottom: 'clamp(12px, 2vw, 20px)' }}
                >
                  About me
                </h2>
                {aboutSentences.map((sentence, index) => (
                  <p key={index} className="font-gucina text-[clamp(14px,2vw,16px)] leading-[1.75] tracking-[0.01em] text-[rgb(138,138,138)]" style={{ marginBottom: 'clamp(12px, 2vw, 16px)' }}>
                    {sentence}
                  </p>
                ))}
                <div className="w-full" style={{ borderBottom: `1px solid rgb(31, 31, 31)`, marginTop: 'clamp(32px, 8vw, 64px)', paddingBottom: 'clamp(12px, 2vw, 24px)' }} />
              </div>
            </FadeIn>

            {/* Work Experiences Section */}
            <div style={{ marginBottom: 'clamp(32px, 8vw, 64px)' }}>
              {/* Work Experiences Header */}
              <div style={{ marginBottom: 'clamp(12px, 2vw, 20px)' }}>
                <h2
                  className="font-heading text-[clamp(12px,2.5vw,15px)] leading-[1.4] tracking-[0.07em] text-[rgb(250,250,250)] uppercase"
                  style={{ fontFamily: 'Mortend' }}
                >
                  Work Experiences
                </h2>
              </div>

              {/* Column Headers - Hidden on mobile */}
              <div className="hidden md:flex justify-between gap-8 mb-6">
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
              <div className="flex flex-col" style={{ marginBottom: 'clamp(16px, 4vw, 32px)' }}>
                {experience.map((exp, index) => (
                  <FadeIn key={index} delay={index * 0.08}>
                    <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-8" style={{ borderBottom: `1px solid rgb(31, 31, 31)`, paddingBottom: 'clamp(12px, 3vw, 24px)', marginBottom: 'clamp(12px, 3vw, 24px)' }}>
                    {/* Mobile layout */}
                    <div className="flex flex-col md:flex-1 md:gap-0">
                      <span className="md:hidden font-gucina font-bold text-[12px] tracking-[0.14em] uppercase text-[rgb(97,97,97)] mb-1">Company</span>
                      <p className="font-gucina text-[clamp(14px,2vw,16px)] leading-[1.5] tracking-[0.01em] text-[rgb(250,250,250)]">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-1 md:gap-0">
                      <span className="md:hidden font-gucina font-bold text-[12px] tracking-[0.14em] uppercase text-[rgb(97,97,97)] mb-1">Role</span>
                      <p className="font-gucina text-[clamp(14px,2vw,16px)] leading-[1.5] tracking-[0.01em] text-[rgb(250,250,250)]">
                        {exp.role}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-1 md:gap-0">
                      <span className="md:hidden font-gucina font-bold text-[12px] tracking-[0.14em] uppercase text-[rgb(97,97,97)] mb-1">Duration</span>
                      <p className="font-gucina text-[clamp(14px,2vw,16px)] leading-[1.5] tracking-[0.01em] text-[rgb(250,250,250)]">
                        {exp.duration}
                      </p>
                    </div>
                    </div>
                  </FadeIn>
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
            className="w-full lg:w-[25%] lg:min-w-[296px] border-t-2 lg:border-t-0 lg:border-l-2 border-[rgb(2,1,10)] -ml-4 md:-ml-10 lg:ml-0"
            style={{
              paddingTop: 'clamp(32px, 8vw, 96px)',
              paddingRight: 'clamp(16px, 5vw, 64px)',
              paddingBottom: 'clamp(32px, 8vw, 64px)',
              paddingLeft: 'clamp(16px, 5vw, 24px)'
            }}
          >
            {/* What I Do */}
            <FadeIn style={{ marginBottom: 'clamp(24px, 5vw, 32px)' }}>
              <div>
                <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)] block" style={{ marginBottom: 'clamp(12px, 2vw, 20px)' }}>
                  What I Do
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {whatIDo.map((item) => (
                    <div key={item} className="rounded-full border border-[rgb(51,51,51)] px-3 py-2">
                      <span className="font-gucina text-[clamp(11px,2vw,12px)] leading-[1.5] text-[rgb(138,138,138)]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="w-full h-px bg-[rgb(31,31,31)]" style={{ marginTop: 'clamp(16px, 3vw, 32px)' }} />
              </div>
            </FadeIn>

            {/* Current Stack */}
            <FadeIn>
              <div>
                <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)] block" style={{ marginBottom: 'clamp(12px, 2vw, 20px)' }}>
                  Current Stack
                </label>
                <div className="flex flex-col gap-3 sm:gap-4">
                  {currentStack.map((item) => (
                    <div key={item} className="w-full">
                      <ToolIcon name={item} />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </aside>
        </div>
      </div>
    </>
  )
}
