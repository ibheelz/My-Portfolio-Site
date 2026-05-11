'use client'

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
} from '@phosphor-icons/react'

interface SideNavProps {
  hideProfile?: boolean
}

export default function SideNav({ hideProfile = false }: SideNavProps) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navItems = [
    { href: '/', label: 'Explore', icon: Compass },
    { href: '/projects', label: 'Projects', icon: Briefcase },
    { href: '/explorations', label: 'Explorations', icon: Path },
    { href: '/about-me', label: 'About', icon: UserIcon },
  ]

  const socialItems = [
    { href: 'https://www.linkedin.com/in/ibheelz', label: 'LinkedIn', icon: LinkedinLogo },
    { href: 'https://www.behance.net/ibheelz', label: 'Behance', icon: BehanceLogo },
    { href: 'https://twitter.com/abioladeyeye', label: 'Twitter', icon: TwitterLogo },
  ]

  return (
    <nav
      className="sticky w-[296px] text-white flex flex-col"
      style={{
        top: '8px',
        backgroundColor: 'var(--grey-bg)',
        padding: '32px 24px 24px 24px',
        overflowY: 'auto',
        height: '100%',
        gap: '32px',
        maxHeight: 'calc(100vh - 16px)',
      }}
    >
      {/* Profile Section */}
      {!hideProfile && (
        <div className="flex gap-3 items-start">
          <Image
            src="https://framerusercontent.com/images/pYTUyNQdLsvydRLSiS2tOjZ6V2U.png"
            alt="Abiola Adeyeye"
            width={48}
            height={48}
            style={{ borderRadius: '36px', flexShrink: 0 }}
            priority
          />
          <div className="flex flex-col gap-0">
            <h3 className="heading-3">Abiola Adeyeye</h3>
            <a
              href="mailto:abioladeyeye@gmail.com"
              className="body-s hover:underline"
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
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-full transition-colors body-m-leading"
              style={{
                padding: '10px 24px 10px 10px',
                backgroundColor: 'transparent',
                color: active ? 'rgb(129, 195, 215)' : 'rgb(138, 138, 138)',
              }}
            >
              <Icon size={24} weight="light" color={active ? 'rgb(129, 195, 215)' : 'rgb(143, 134, 152)'} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Social Navigation */}
      <div className="flex flex-col gap-2" style={{ marginTop: '20px' }}>
        <p className="uppercase-headline">Social</p>
        {socialItems.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full transition-colors hover:text-white body-m-leading"
              style={{
                padding: '10px 24px 10px 10px',
                backgroundColor: 'transparent',
                color: 'rgb(138, 138, 138)',
              }}
            >
              <Icon size={24} weight="light" color="rgb(143, 134, 152)" />
              <span>{item.label}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
