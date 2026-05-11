interface LabelProps {
  children: React.ReactNode
  variant?: 'BadgeNoIcon' | 'default'
}

export default function Label({ children, variant = 'default' }: LabelProps) {
  const classes =
    variant === 'BadgeNoIcon'
      ? 'inline-flex items-center px-3 py-2 rounded-full border border-grey-border-darker text-body-s gap-2'
      : 'inline-flex items-center px-3 py-2 rounded-full bg-grey-background text-body-s gap-2'

  return <span className={classes}>{children}</span>
}
