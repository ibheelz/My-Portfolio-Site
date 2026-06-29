import { explorations } from '@/src/data/content'
import ExplorationDetailClient from '@/src/components/ExplorationDetailClient'

interface ExplorationDetailPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return explorations.map((exploration) => ({
    slug: exploration.slug,
  }))
}

export default function ExplorationDetailPage({ params }: ExplorationDetailPageProps) {
  return <ExplorationDetailClient slug={params.slug} />
}
