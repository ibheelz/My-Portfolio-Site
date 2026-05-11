import { blogPosts } from '@/src/data/content'
import BlogCard from '@/src/components/BlogCard'

export default function BlogPage() {
  return (
    <div className="ml-[296px] px-16 py-12 max-w-4xl" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-heading-m font-semibold mb-2">Latest writing</h1>
        <p className="text-body-m text-grey-text-main">Thoughts on design, creativity, and the music business</p>
      </div>

      {/* Blog Posts */}
      <div className="space-y-0">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
