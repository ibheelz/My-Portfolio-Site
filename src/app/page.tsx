'use client'

import Image from 'next/image'
import Link from 'next/link'
import { projects, explorations, blogPosts } from '@/src/data/content'
import Label from '@/src/components/Label'
import SectionHeadline from '@/src/components/SectionHeadline'
import ProjectCard from '@/src/components/ProjectCard'
import ExplorationCard from '@/src/components/ExplorationCard'
import BlogCard from '@/src/components/BlogCard'

export default function Home() {
  const featuredProjects = projects.filter((p) => p.isFeatured).slice(0, 3)
  const featuredExplorations = explorations.filter((e) => e.isFeatured).slice(0, 4)

  return (
    <div className="ml-[296px] pt-12 px-16 pb-[120px]" style={{ paddingLeft: '36px', paddingRight: '64px', paddingTop: '36px', paddingBottom: '120px' }}>
      {/* Hero Section */}
      <section className="mb-16" style={{ gap: '7px', paddingTop: '12px', marginBottom: '64px' }}>
        <div className="flex items-start justify-between mb-6">
          <div></div>
          <div className="w-1 h-1 bg-grey-border rounded" style={{ width: '4px', height: '4px' }}></div>
        </div>

        <h1 className="text-heading-m font-semibold max-w-[876px] mb-6">
          Building value into brands through design.
        </h1>

        <p className="text-uppercase text-grey-text-main mb-6">What I do</p>

        <div className="flex flex-wrap gap-2">
          {['Branding', '3D Modelling', 'Visual Design', 'Generative AI Design', 'E-commerce Design', 'Marketing Design'].map((label) => (
            <Label key={label} variant="BadgeNoIcon">
              {label}
            </Label>
          ))}
        </div>
      </section>

      {/* Recent Projects */}
      <section className="mb-16" style={{ marginBottom: '64px' }}>
        <SectionHeadline title="Recent projects" href="/projects" />
        <div className="grid grid-cols-3 gap-6" style={{ gap: '24px' }}>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Explorations */}
      <section className="mb-16" style={{ marginBottom: '64px' }}>
        <SectionHeadline title="Explorations" href="/explorations" />
        <div className="grid grid-cols-4 gap-6" style={{ gap: '24px' }}>
          {featuredExplorations.map((exploration) => (
            <ExplorationCard key={exploration.slug} exploration={exploration} />
          ))}
        </div>
      </section>

      {/* Blog */}
      <section>
        <SectionHeadline title="Latest writing" href="/blog" />
        <div className="space-y-0">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}
