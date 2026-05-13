interface ToolIconProps {
  name: string
}

export default function ToolIcon({ name }: ToolIconProps) {
  const colors: Record<string, string> = {
    'Adobe Creative Suite': '#FF0000',
    'Nano Banana Pro': '#FFD700',
    'Notion': '#FFFFFF',
    'Midjourney': '#9B6FFF',
    'Canva': '#00C4CC',
    'Figma': '#F24E1E',
    'Blender': '#EA7600',
    'Claude': '#5A5A5A',
  }

  const color = colors[name] || '#666666'

  return (
    <div className="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 20 20" className="flex-shrink-0">
        <circle cx="10" cy="10" r="8" fill={color} opacity="0.2" />
        <circle cx="10" cy="10" r="6" fill={color} opacity="0.1" stroke={color} strokeWidth="1" />
        <text
          x="10"
          y="12"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fontWeight="bold"
          fill={color}
          fontFamily="Arial, sans-serif"
        >
          {name.charAt(0).toUpperCase()}
        </text>
      </svg>
      <span className="font-gucina text-[12px] leading-[18px] text-[rgb(138,138,138)]">
        {name}
      </span>
    </div>
  )
}
