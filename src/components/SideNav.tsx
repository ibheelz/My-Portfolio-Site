'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  Compass,
  Briefcase,
  Path,
  User as UserIcon,
  LinkedinLogo,
  BehanceLogo,
  TwitterLogo,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react'

interface SideNavProps {
  hideProfile?: boolean
  collapsed?: boolean
  onToggleCollapse?: () => void
}

export default function SideNav({ hideProfile = false, collapsed = false, onToggleCollapse }: SideNavProps) {
  const pathname = usePathname()
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  const isActive = (path: string) => path === '/projects' ? pathname === '/projects' || pathname.startsWith('/projects/') : pathname.startsWith(path)

  const navItems = [
    { href: '/projects', label: 'Projects', icon: Briefcase },
    { href: '/explore', label: 'Explore', icon: Path },
    { href: '/about-me', label: 'About', icon: UserIcon },
  ]

  const socialItems = [
    { href: 'https://www.linkedin.com/in/ibheelz', label: 'LinkedIn', icon: LinkedinLogo },
    { href: 'https://www.behance.net/ibheelz', label: 'Behance', icon: BehanceLogo },
    { href: 'https://twitter.com/abioladeyeye', label: 'Twitter', icon: TwitterLogo },
  ]

  if (collapsed) {
    return (
      <nav
        className="sticky text-white flex flex-col items-center transition-all duration-300"
        style={{
          width: '80px',
          top: '0px',
          backgroundColor: 'var(--grey-bg)',
          padding: '3% 2%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          height: '100%',
        }}
      >
        {/* Profile Section */}
        {!hideProfile && (
          <div
            style={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            onClick={() => window.location.href = '/projects'}
            title="Abiola Adeyeye"
          >
            <Image
              src="/profile-photo.jpg"
              alt="Abiola Adeyeye"
              width={48}
              height={48}
              style={{ borderRadius: '36px', flexShrink: 0, objectFit: 'cover' }}
              priority
            />
          </div>
        )}

        {/* Spacing between profile and main nav */}
        <div style={{ flex: '0.5' }} />

        {/* Main Navigation - Icons Only */}
        <div className="flex flex-col gap-3" style={{ alignItems: 'center', flexShrink: 0 }}>
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            const isHovered = hoveredNav === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredNav(item.href)}
                onMouseLeave={() => setHoveredNav(null)}
                title={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '24px',
                  backgroundColor: isHovered || active ? '#000000' : 'transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={24} weight="light" color={active ? 'rgb(129, 195, 215)' : 'rgb(143, 134, 152)'} />
              </Link>
            )
          })}
        </div>

        {/* Spacing between main nav and social */}
        <div style={{ flex: '1' }} />

        {/* Social Navigation - Icons Only */}
        <div className="flex flex-col gap-3" style={{ alignItems: 'center', flexShrink: 0 }}>
          {socialItems.map((item) => {
            const Icon = item.icon
            const isHovered = hoveredNav === `social-${item.href}`
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredNav(`social-${item.href}`)}
                onMouseLeave={() => setHoveredNav(null)}
                title={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '24px',
                  backgroundColor: isHovered ? '#000000' : 'transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={24} weight="light" color="rgb(143, 134, 152)" />
              </a>
            )
          })}
        </div>

        {/* Spacing before expand button */}
        <div style={{ flex: '0.5' }} />

        {/* Expand Button - Bottom */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgb(138, 138, 138)',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgb(250, 250, 250)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgb(138, 138, 138)')}
            title="Expand sidebar"
          >
            <CaretRight size={20} weight="bold" />
          </button>
        )}
      </nav>
    )
  }

  return (
    <nav
      className="sticky text-white flex flex-col transition-all duration-300"
      style={{
        width: '296px',
        top: '0px',
        backgroundColor: 'var(--grey-bg)',
        padding: '3% 2%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
      }}
    >
      {/* Profile Section */}
      {!hideProfile && (
        <div
          style={{
            display: 'flex',
            gap: '2%',
            alignItems: 'flex-start',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          onClick={() => window.location.href = '/projects'}
        >
          <Image
            src="/profile-photo.jpg"
            alt="Abiola Adeyeye"
            width={48}
            height={48}
            style={{ borderRadius: '36px', flexShrink: 0, objectFit: 'cover' }}
            priority
          />
          <div className="flex flex-col gap-0">
            <h3 className="heading-3">Abiola Adeyeye</h3>
            <a
              href="mailto:abioladeyeye@gmail.com"
              className="body-s hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              abioladeyeye@gmail.com
            </a>
          </div>
        </div>
      )}

      {/* Spacing between profile and main nav */}
      <div style={{ flex: '0.5' }} />

      {/* Main Navigation */}
      <div className="flex flex-col gap-2" style={{ flexShrink: 0 }}>
        <p className="uppercase-headline">Main</p>
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          const isHovered = hoveredNav === item.href
          return (
            <div
              key={item.href}
              onMouseEnter={() => setHoveredNav(item.href)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-full transition-all body-m-leading"
                style={{
                  padding: '0.7% 1.8% 0.7% 0.7%',
                  backgroundColor: isHovered || active ? '#000000' : 'transparent',
                  color: active ? 'rgb(129, 195, 215)' : 'rgb(138, 138, 138)',
                  display: 'fit-content',
                  width: 'fit-content',
                }}
              >
                <Icon size={24} weight="light" color={active ? 'rgb(129, 195, 215)' : 'rgb(143, 134, 152)'} />
                <span>{item.label}</span>
              </Link>
            </div>
          )
        })}
      </div>

      {/* Spacing between main nav and social */}
      <div style={{ flex: '1' }} />

      {/* Social Navigation */}
      <div className="flex flex-col gap-2" style={{ flexShrink: 0 }}>
        <p className="uppercase-headline">Social</p>
        {socialItems.map((item) => {
          const Icon = item.icon
          const isHovered = hoveredNav === `social-${item.href}`
          return (
            <div
              key={item.href}
              onMouseEnter={() => setHoveredNav(`social-${item.href}`)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full transition-all hover:text-white body-m-leading"
                style={{
                  padding: '0.7% 1.8% 0.7% 0.7%',
                  backgroundColor: isHovered ? '#000000' : 'transparent',
                  color: 'rgb(138, 138, 138)',
                  display: 'fit-content',
                  width: 'fit-content',
                }}
              >
                <Icon size={24} weight="light" color="rgb(143, 134, 152)" />
                <span>{item.label}</span>
              </a>
            </div>
          )
        })}
      </div>

      {/* Spacing before collapse button */}
      <div style={{ flex: '0.5' }} />

      {/* Collapse Button - Bottom */}
      {onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgb(138, 138, 138)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s ease',
            flexShrink: 0,
            alignSelf: 'flex-start',
            marginLeft: '2%',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgb(250, 250, 250)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgb(138, 138, 138)')}
          title="Collapse sidebar"
        >
          <CaretLeft size={20} weight="bold" />
        </button>
      )}
    </nav>
  )
}
