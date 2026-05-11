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

export default function SideNav() {
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
      className="sticky top-0 w-[296px] text-white flex flex-col gap-10"
      style={{
        backgroundColor: 'var(--grey-bg)',
        borderRadius: '16px',
        padding: '32px 24px 24px 24px',
        height: 'calc(100vh - 16px)',
        overflowY: 'auto',
      }}
    >
      {/* Profile Section */}
      <div className="flex flex-col gap-4">
        <Image
          src="https://framerusercontent.com/images/pYTUyNQdLsvydRLSiS2tOjZ6V2U.png"
          alt="Abiola Adeyeye"
          width={48}
          height={48}
          style={{ borderRadius: '36px' }}
          priority
        />
        <div>
          <h3 className="heading-3">Abiola Adeyeye</h3>
          <a
            href="mailto:abioladeyeye@gmail.com"
            className="body-s hover:underline"
          >
            abioladeyeye@gmail.com
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex flex-col gap-3">
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
                backgroundColor: 'var(--grey-bg)',
                color: active ? 'var(--white)' : 'var(--grey-text-main)',
              }}
            >
              <Icon size={24} weight="fill" color={active ? 'var(--white)' : 'rgb(143, 134, 152)'} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Social Navigation */}
      <div className="flex flex-col gap-3">
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
                backgroundColor: 'var(--grey-bg)',
                color: 'var(--grey-text-main)',
              }}
            >
              <Icon size={24} weight="fill" color="rgb(143, 134, 152)" />
              <span>{item.label}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
