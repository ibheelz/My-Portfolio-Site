interface ToolIconProps {
  name: string
  hideText?: boolean
}

export default function ToolIcon({ name, hideText }: ToolIconProps) {
  const iconMap: Record<string, string> = {
    'Adobe Creative Suite': '/icons/tools/adobe.png',
    'Nano Banana Pro': '/icons/tools/nano-banana.png',
    'Notion': '/icons/tools/notion.png',
    'Midjourney': '/icons/tools/midjourney.png',
    'Canva': '/icons/tools/canva.png',
    'Figma': '/icons/tools/figma.png',
    'Blender': '/icons/tools/blender.png',
    'Photoshop': '/icons/tools/photoshop.webp',
    'Illustrator': '/icons/tools/illustrator.webp',
    'Claude': '/icons/tools/claude.svg',
  }

  const iconPath = iconMap[name]

  return (
    <div className={hideText ? "flex items-center" : "flex items-center gap-2 w-full"}>
      {iconPath && (
        <img
          src={iconPath}
          alt={name}
          className="flex-shrink-0 w-5 h-5 object-contain"
        />
      )}
      {!hideText && (
        <span className="font-gucina text-[12px] leading-[18px] text-[rgb(138,138,138)]">
          {name}
        </span>
      )}
    </div>
  )
}
