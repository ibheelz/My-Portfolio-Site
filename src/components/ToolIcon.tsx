interface ToolIconProps {
  name: string
}

export default function ToolIcon({ name }: ToolIconProps) {
  const icons: Record<string, { color: string; icon: string }> = {
    'Adobe Creative Suite': {
      color: '#FF0000',
      icon: '◆'
    },
    'Nano Banana Pro': {
      color: '#FFD700',
      icon: '🍌'
    },
    'Notion': {
      color: '#FFFFFF',
      icon: '◻'
    },
    'Midjourney': {
      color: '#9B6FFF',
      icon: '✨'
    },
    'Canva': {
      color: '#00C4CC',
      icon: '◕'
    },
    'Figma': {
      color: '#F24E1E',
      icon: '◆'
    },
    'Blender': {
      color: '#EA7600',
      icon: '⬢'
    },
    'Claude': {
      color: '#5A5A5A',
      icon: '✦'
    },
  }

  const tool = icons[name] || { color: '#666666', icon: '●' }

  return (
    <div className="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 20 20" className="flex-shrink-0">
        <circle cx="10" cy="10" r="8" fill={tool.color} opacity="0.2" />
        <circle cx="10" cy="10" r="6" fill={tool.color} opacity="0.1" stroke={tool.color} strokeWidth="1" />
        <text
          x="10"
          y="12"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fontWeight="bold"
          fill={tool.color}
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
