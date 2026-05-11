'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Project } from '@/src/data/content'
import Label from './Label'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="overflow-hidden rounded-2xl bg-grey-background h-96 flex flex-col cursor-pointer group">
          {/* Image Container */}
          <div className="relative flex-1 overflow-hidden rounded-2xl">
            <Image
              src={project.cardImage}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Text Area */}
          <div className="p-6" style={{ gap: '4px' }}>
            <h3 className="text-heading-3 font-semibold mb-2">{project.title}</h3>
            <div className="flex items-center gap-1 text-body-s">
              <span>{project.label1}</span>
              <div className="w-1 h-1 bg-grey-border-darker rounded-full"></div>
              <span>{project.label2}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
