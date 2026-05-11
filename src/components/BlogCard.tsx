'use client'

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import { BlogPost } from '@/src/data/content'
import Label from './Label'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="border-b-2 border-black py-6 px-0 flex items-center justify-between hover:opacity-70 transition-opacity cursor-pointer group">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.labels.map((label) => (
              <Label key={label} variant="BadgeNoIcon">
                {label}
              </Label>
            ))}
          </div>
          <h3 className="text-heading-3 font-semibold mb-2">{post.title}</h3>
          <div className="flex items-center gap-4 text-body-s text-grey-text-main">
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
        <ArrowRight size={24} weight="bold" className="ml-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}
