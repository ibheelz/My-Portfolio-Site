import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'

interface SectionHeadlineProps {
  title: string
  href?: string
}

export default function SectionHeadline({ title, href }: SectionHeadlineProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-heading-2 font-semibold">{title}</h2>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-2 text-body-m font-semibold opacity-0 hover:opacity-100 transition-opacity"
        >
          View all
          <ArrowRight size={20} weight="bold" />
        </Link>
      )}
    </div>
  )
}
