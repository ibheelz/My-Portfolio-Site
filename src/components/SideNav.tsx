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
          top: '8px',
          backgroundColor: 'var(--grey-bg)',
          padding: '16px',
          overflowY: 'auto',
          height: '100%',
          gap: '24px',
          maxHeight: 'calc(100vh - 16px)',
        }}
      >
        {/* Profile Section */}
        {!hideProfile && (
          <div
            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
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

        {/* Main Navigation - Icons Only */}
        <div className="flex flex-col gap-3" style={{ alignItems: 'center' }}>
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

        {/* Social Navigation - Icons Only */}
        <div className="flex flex-col gap-3" style={{ alignItems: 'center', marginTop: '12px' }}>
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
      </nav>
    )
  }

  return (
    <nav
      className="sticky text-white flex flex-col transition-all duration-300"
      style={{
        width: '296px',
        top: '8px',
        backgroundColor: 'var(--grey-bg)',
        padding: '32px 24px 24px 24px',
        overflowY: 'auto',
        height: '100%',
        gap: '32px',
        maxHeight: 'calc(100vh - 16px)',
        position: 'relative',
      }}
    >
      {/* Collapse Button */}
      {onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'transparent',
            border: 'none',
            color: 'rgb(138, 138, 138)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgb(250, 250, 250)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgb(138, 138, 138)')}
          title="Collapse sidebar"
        >
          <CaretLeft size={20} weight="bold" />
        </button>
      )}

      {/* Profile Section */}
      {!hideProfile && (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => window.location.href = '/projects'}>
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

      {/* Main Navigation */}
      <div className="flex flex-col gap-2">
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
                  padding: '10px 24px 10px 10px',
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

      {/* Social Navigation */}
      <div className="flex flex-col gap-2" style={{ marginTop: '20px' }}>
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
                  padding: '10px 24px 10px 10px',
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
    </nav>
  )
}
