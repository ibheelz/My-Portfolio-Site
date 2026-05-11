'use client'

import { projects } from '@/src/data/content'
import ProjectCard from '@/src/components/ProjectCard'
import Label from '@/src/components/Label'

const otherProjects = [
  { name: 'Lucia Davis', label1: 'AI Influencer', label2: 'Personal Project' },
  { name: 'Riley Mobolaji', label1: 'AI Influencer', label2: 'Personal Project' },
  { name: 'Aria Vale', label1: 'AI Influencer', label2: 'Personal Project' },
]

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.isFeatured)

  return (
    <div className="ml-[296px] bg-grey-background p-16" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
      {/* Header */}
      <div className="mb-16" style={{ gap: '2px', marginBottom: '64px' }}>
        <p className="text-heading-s font-semibold mb-2">Recent projects</p>
        <p className="text-body-m text-grey-text-main">(2025 - 2026)</p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-3 gap-6 mb-16" style={{ gap: '24px', marginBottom: '64px' }}>
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* Other Projects */}
      <div>
        <h2 className="text-heading-2 font-semibold mb-8">Other projects</h2>
        <div className="space-y-0">
          {otherProjects.map((project) => (
            <div
              key={project.name}
              className="border-b-2 border-black py-6 px-0 flex items-center justify-between hover:opacity-70 transition-opacity"
            >
              <div className="flex-1">
                <h3 className="text-heading-3 font-semibold mb-2">{project.name}</h3>
                <div className="flex items-center gap-1 text-body-s">
                  <span>{project.label1}</span>
                  <div className="w-1 h-1 bg-grey-border-darker rounded-full"></div>
                  <span>{project.label2}</span>
                </div>
              </div>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l-7 7m7-7H5" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
