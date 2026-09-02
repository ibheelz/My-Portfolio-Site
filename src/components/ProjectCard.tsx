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
        <div style={{ width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }} className="project-card group">
          {/* Image Container */}
          <div style={{ width: '100%', aspectRatio: '1', borderRadius: '16px', overflow: 'hidden', backgroundColor: 'var(--grey-bg)', position: 'relative' }}>
            <Image
              src={project.cardImage}
              alt={project.title}
              fill
              loading="lazy"
              quality={75}
              className="object-cover group-hover:scale-[1.03] transition-transform duration-[400ms]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1240px) 50vw, 400px"
            />
          </div>

          {/* Text Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '0px', paddingRight: '0px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
              <h3 className="heading-3">{project.title}</h3>
              {project.date && (
                <span style={{ fontSize: '12px', color: 'rgb(138, 138, 138)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {project.date.split(' ').pop()}
                </span>
              )}
            </div>
            {project.description && (
              <p style={{ fontSize: '14px', color: 'rgb(138, 138, 138)', lineHeight: '1.5', margin: 0 }}>
                {project.description}
              </p>
            )}
          </div>
        </div>
      </Link>
  )
}
