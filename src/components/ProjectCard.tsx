'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/src/data/content'
import Label from './Label'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
        <div style={{ width: '100%', height: '520px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none', color: 'inherit', borderRadius: '16px', backgroundColor: 'var(--grey-bg)', cursor: 'pointer' }} className="group">
          {/* Image Container */}
          <div style={{ width: '100%', aspectRatio: '1', borderRadius: '16px', overflow: 'hidden', backgroundColor: 'var(--grey-bg)', position: 'relative' }}>
            <Image
              src={project.cardImage}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-[400ms]"
            />
          </div>

          {/* Text Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '0px', paddingRight: '0px' }}>
            <h3 className="heading-3">{project.title}</h3>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <span className="body-s">{project.label1}</span>
              <div style={{ width: '4px', height: '4px', backgroundColor: 'var(--grey-border-darker)', borderRadius: '8px' }} />
              <span className="body-s">{project.label2}</span>
            </div>
          </div>
        </div>
      </Link>
  )
}
