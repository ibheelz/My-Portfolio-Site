import { projects, explorations } from '@/src/data/content'
import ProjectDetailClient from '@/src/components/ProjectDetailClient'
import ExplorationDetailClient from '@/src/components/ExplorationDetailClient'

interface DetailPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return [
    ...projects.map((project) => ({ slug: project.slug })),
    ...explorations.map((exploration) => ({ slug: exploration.slug })),
  ]
}

export default function DetailPage({ params }: DetailPageProps) {
  const project = projects.find((p) => p.slug === params.slug)
  const exploration = explorations.find((e) => e.slug === params.slug)

  if (project) {
    return <ProjectDetailClient slug={params.slug} />
  }

  if (exploration) {
    return <ExplorationDetailClient slug={params.slug} />
  }

  return <div>Not found</div>
}
