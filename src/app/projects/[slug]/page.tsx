import { projects } from '@/src/data/content'
import ProjectDetailClient from '@/src/components/ProjectDetailClient'

interface ProjectDetailPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  return <ProjectDetailClient slug={params.slug} />
}
