'use client'

import Image from 'next/image'
import Label from '@/src/components/Label'
import { Envelope, Phone, MapPin } from '@phosphor-icons/react'

export default function AboutPage() {
  const skills = [
    'Brand Identity',
    'Visual Design',
    'UI/UX Design',
    'Design Systems',
    '3D Modeling',
    'Motion Design',
    'Figma',
    'Adobe Creative Suite',
    'Generative AI Design',
    'Marketing Design',
  ]

  const experience = [
    {
      title: 'Senior Brand Designer',
      company: 'Creative Studio',
      duration: '2023 - Present',
      description: 'Leading brand identity projects and mentoring junior designers',
    },
    {
      title: 'Brand Designer',
      company: 'Design Agency',
      duration: '2021 - 2023',
      description: 'Created visual identities and design systems for multiple clients',
    },
    {
      title: 'UI/UX Designer',
      company: 'Tech Startup',
      duration: '2019 - 2021',
      description: 'Designed user interfaces and experiences for mobile and web platforms',
    },
  ]

  return (
    <div className="px-16 py-12" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
      {/* Bio Section */}
      <section className="mb-16 max-w-3xl" style={{ marginBottom: '64px' }}>
        <h1 className="text-heading-m font-semibold mb-8">About me</h1>
        <div className="space-y-6">
          <p className="text-body-m text-grey-text-main leading-relaxed">
            I'm a brand and visual designer with over 5 years of experience creating meaningful brand experiences and visual identities. My approach combines strategic thinking with creative execution to deliver designs that resonate with audiences and drive business value.
          </p>
          <p className="text-body-m text-grey-text-main leading-relaxed">
            I specialize in brand identity design, visual systems, and creative direction. I'm passionate about leveraging AI-augmented workflows to enhance creativity and efficiency, while maintaining the human touch that makes design meaningful.
          </p>
          <p className="text-body-m text-grey-text-main leading-relaxed">
            When I'm not designing, I'm exploring new technologies, experimenting with generative tools, and connecting with the creative community. I believe great design happens at the intersection of art, strategy, and technology.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-16" style={{ marginBottom: '64px' }}>
        <h2 className="text-heading-2 font-semibold mb-8">Skills & Expertise</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <Label key={skill} variant="BadgeNoIcon">
              {skill}
            </Label>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-16 max-w-3xl" style={{ marginBottom: '64px' }}>
        <h2 className="text-heading-2 font-semibold mb-8">Experience</h2>
        <div className="space-y-0">
          {experience.map((job, index) => (
            <div
              key={index}
              className="border-b-2 border-black py-6 px-0"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-heading-3 font-semibold">{job.title}</h3>
                  <p className="text-body-m text-grey-text-main">{job.company}</p>
                </div>
                <span className="text-body-s text-grey-text-main">{job.duration}</span>
              </div>
              <p className="text-body-m text-grey-text-main">{job.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="border-t-2 border-black p-16" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
        <h2 className="text-uppercase text-grey-text-main text-xs font-semibold mb-8">Get in touch</h2>
        <h3 className="text-heading-m font-semibold mb-8">Let's work together</h3>

        <div className="space-y-6 max-w-2xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-grey-border-darker rounded flex items-center justify-center">
              <Envelope size={20} />
            </div>
            <div>
              <p className="text-body-s text-grey-text-main mb-1">Email</p>
              <a href="mailto:abioladeyeye@gmail.com" className="text-body-m font-semibold hover:underline">
                abioladeyeye@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-grey-border-darker rounded flex items-center justify-center">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-body-s text-grey-text-main mb-1">Phone</p>
              <p className="text-body-m font-semibold">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-grey-border-darker rounded flex items-center justify-center">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-body-s text-grey-text-main mb-1">Location</p>
              <p className="text-body-m font-semibold">Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
