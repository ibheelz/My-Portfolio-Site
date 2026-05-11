'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Exploration } from '@/src/data/content'
import Label from './Label'

interface ExplorationCardProps {
  exploration: Exploration
}

export default function ExplorationCard({ exploration }: ExplorationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/explorations/${exploration.slug}`}>
        <div className="overflow-hidden rounded-2xl bg-grey-background flex flex-col cursor-pointer group">
          {/* Image Container */}
          <div className="relative w-full h-64 overflow-hidden rounded-2xl">
            <Image
              src={exploration.cardImage}
              alt={exploration.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Text Area */}
          <div className="p-4" style={{ gap: '4px' }}>
            <h3 className="text-heading-3 font-semibold mb-3">{exploration.title}</h3>
            <div className="flex flex-wrap gap-2">
              {exploration.tools.map((tool) => (
                <Label key={tool} variant="BadgeNoIcon">
                  {tool}
                </Label>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
