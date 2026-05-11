'use client'

import Image from 'next/image'
import { projects } from '@/src/data/content'
import Label from '@/src/components/Label'
import { Envelope, Phone, MapPin } from '@phosphor-icons/react'

interface ProjectDetailPageProps {
  params: { slug: string }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    return <div className="ml-[296px] p-8">Project not found</div>
  }

  return (
    <div className="ml-[296px]">
      {/* Fixed Hero Image */}
      <div
        className="fixed top-4 left-80 right-4 h-[664px] bg-grey-background rounded-t-3xl overflow-hidden"
        style={{ left: '312px' }}
      >
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          style={{ inset: '-36px' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-[680px]">
        {/* Hero Text Section */}
        <div className="h-[680px] flex items-end px-16 pb-6" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
          <h1 className="text-heading-l font-semibold">{project.title}</h1>
        </div>

        {/* Content Container */}
        <div className="flex gap-8 px-16 pb-16" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
          {/* Left Content */}
          <div className="flex-1">
            {project.sections.map((section, index) => (
              <div key={index} className="mb-16" style={{ marginBottom: '64px' }}>
                <h2 className="text-heading-2 font-semibold mb-6">{section.title}</h2>
                <p className="text-body-m text-grey-text-main whitespace-pre-wrap mb-8">{section.content}</p>
                {section.image && (
                  <Image
                    src={section.image}
                    alt={section.title}
                    width={680}
                    height={680}
                    className="rounded-2xl object-cover"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="w-80 border-l-2 border-black pl-6 pt-24" style={{ minWidth: '296px' }}>
            <div className="sticky top-0">
              <div className="mb-8">
                <p className="text-uppercase text-grey-text-main text-xs font-semibold mb-4">Role</p>
                <div className="flex flex-wrap gap-2">
                  {project.roleLabels.map((label) => (
                    <Label key={label} variant="BadgeNoIcon">
                      {label}
                    </Label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <p className="text-uppercase text-grey-text-main text-xs font-semibold mb-4">Duration</p>
                <p className="text-body-s">{project.duration}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Connect Section */}
        <div className="bg-grey-background border-t-2 border-black mt-16 px-16 py-24 flex gap-8" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
          <div className="flex-1">
            <Image
              src="https://framerusercontent.com/images/5ylj0gysRWJbYU3eEdJqMvks02w.png"
              alt="Connect"
              width={440}
              height={440}
              className="rounded-2xl object-cover"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center gap-8">
            <div>
              <p className="text-uppercase text-grey-text-main text-xs font-semibold mb-4">Let's connect</p>
              <h2 className="text-body-xl font-semibold mb-6">
                I'm not just here to design products; I'm here to connect with people.
              </h2>
              <p className="text-body-m text-grey-text-main">
                As a creative designer with over 5 years of experience, I'm passionate about creating meaningful brand experiences and visual identities that resonate with audiences.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-grey-border-darker rounded flex items-center justify-center">
                  <Envelope size={20} />
                </div>
                <div>
                  <p className="text-body-s text-grey-text-main">Email</p>
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
                  <p className="text-body-s text-grey-text-main">Phone</p>
                  <p className="text-body-m font-semibold">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-grey-border-darker rounded flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-body-s text-grey-text-main">Location</p>
                  <p className="text-body-m font-semibold">Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
