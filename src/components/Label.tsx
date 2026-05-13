import Image from 'next/image'

interface LabelProps {
  children: React.ReactNode
  variant?: 'BadgeNoIcon' | 'BadgeWithIcon' | 'default'
  icon?: string
}

export default function Label({ children, variant = 'default', icon }: LabelProps) {
  if (variant === 'BadgeWithIcon' && icon) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0" style={{ width: '24px', height: '24px', borderRadius: '4px', overflow: 'hidden' }}>
          <Image
            src={icon}
            alt={String(children)}
            width={24}
            height={24}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-gucina text-[12px] leading-[18px] tracking-[0.01em] text-[rgb(138,138,138)]">
          {children}
        </span>
      </div>
    )
  }

  const classes =
    variant === 'BadgeNoIcon'
      ? 'inline-flex items-center px-3 py-2 rounded-full border border-grey-border-darker text-body-s gap-2'
      : 'inline-flex items-center px-3 py-2 rounded-full bg-grey-background text-body-s gap-2'

  return <span className={classes}>{children}</span>
}
