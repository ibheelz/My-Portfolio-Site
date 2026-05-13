interface ToolIconProps {
  name: string
}

export default function ToolIcon({ name }: ToolIconProps) {
  const iconMap: Record<string, string> = {
    'Adobe Creative Suite': '/icons/tools/adobe.svg',
    'Nano Banana Pro': '/icons/tools/nano-banana.svg',
    'Notion': '/icons/tools/notion.svg',
    'Midjourney': '/icons/tools/midjourney.svg',
    'Canva': '/icons/tools/canva.svg',
    'Figma': '/icons/tools/figma.svg',
    'Blender': '/icons/tools/blender.svg',
    'Claude': '/icons/tools/claude.svg',
  }

  const iconPath = iconMap[name]

  return (
    <div className="flex items-center gap-2">
      {iconPath ? (
        <img
          src={iconPath}
          alt={name}
          className="flex-shrink-0 w-5 h-5 object-contain"
        />
      ) : (
        <div className="flex-shrink-0 w-5 h-5 bg-[rgb(97,97,97)] rounded-full" />
      )}
      <span className="font-gucina text-[12px] leading-[18px] text-[rgb(138,138,138)]">
        {name}
      </span>
    </div>
  )
}
