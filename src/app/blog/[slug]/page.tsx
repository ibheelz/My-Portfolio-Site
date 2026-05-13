import { blogPosts } from '@/src/data/content'
import Label from '@/src/components/Label'

interface BlogPostPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return <div className="ml-[296px] p-8">Blog post not found</div>
  }

  return (
    <div className="ml-[296px] px-16 py-12 max-w-3xl" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {post.labels.map((label) => (
            <Label key={label} variant="BadgeNoIcon">
              {label}
            </Label>
          ))}
        </div>
        <h1 className="text-heading-l font-semibold mb-6">{post.title}</h1>
        <div className="flex items-center gap-6 text-body-s text-grey-text-main">
          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>{post.readingTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Pull Quote */}
        <blockquote className="border-l-2 border-primary-600 pl-6 py-4">
          <p className="text-body-xl italic text-grey-text-main">{post.quote}</p>
        </blockquote>

        {/* Sections */}
        {post.sections.map((section, index) => (
          <section key={index}>
            <h2 className="text-heading-2 font-semibold mb-6">{section.title}</h2>
            <p className="text-body-m text-grey-text-main whitespace-pre-wrap leading-relaxed">{section.content}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
