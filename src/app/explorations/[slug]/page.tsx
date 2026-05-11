import Image from 'next/image'
import { explorations } from '@/src/data/content'
import Label from '@/src/components/Label'

interface ExplorationDetailPageProps {
  params: { slug: string }
}

export default function ExplorationDetailPage({ params }: ExplorationDetailPageProps) {
  const exploration = explorations.find((e) => e.slug === params.slug)

  if (!exploration) {
    return <div className="ml-[296px] p-8">Exploration not found</div>
  }

  return (
    <div className="ml-[296px] px-16 py-12" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
      {/* Header */}
      <div className="mb-12 gap-2">
        <h1 className="text-heading-s font-semibold mb-4">{exploration.title}</h1>
        <div className="flex flex-wrap gap-2">
          {exploration.tools.map((tool) => (
            <Label key={tool} variant="BadgeNoIcon">
              {tool}
            </Label>
          ))}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="space-y-8" style={{ gap: '32px' }}>
        {exploration.images.map((image, index) => (
          <div key={index} className="relative w-full h-[680px] rounded-2xl overflow-hidden">
            <Image
              src={image}
              alt={`${exploration.title} - Image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
