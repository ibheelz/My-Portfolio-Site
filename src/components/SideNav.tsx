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
    <nav className="fixed left-0 top-0 h-screen w-[296px] bg-black text-white p-6 overflow-y-auto flex flex-col gap-10" style={{ padding: '32px 24px 24px 24px' }}>
      {/* Profile Section */}
      <div className="flex flex-col gap-4">
        <Image
          src="https://framerusercontent.com/images/pYTUyNQdLsvydRLSiS2tOjZ6V2U.png"
          alt="Abiola Adeyeye"
          width={48}
          height={48}
          className="rounded-full"
          style={{ borderRadius: '36px' }}
        />
        <div>
          <h3 className="text-heading-3 font-semibold">Abiola Adeyeye</h3>
          <a
            href="mailto:abioladeyeye@gmail.com"
            className="text-body-s text-grey-text-main hover:underline"
          >
            abioladeyeye@gmail.com
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex flex-col gap-3">
        <p className="text-uppercase text-grey-text-main text-xs">Main</p>
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-2.5 rounded-full transition-colors ${
                active
                  ? 'bg-grey-background text-white'
                  : 'bg-grey-background text-grey-text-main hover:bg-opacity-80'
              }`}
              style={{ padding: '10px 24px 10px 10px' }}
            >
              <Icon size={24} weight="fill" />
              <span className="text-body-m">{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Social Navigation */}
      <div className="flex flex-col gap-3">
        <p className="text-uppercase text-grey-text-main text-xs">Social</p>
        {socialItems.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-grey-background text-grey-text-main hover:text-white transition-colors"
              style={{ padding: '10px 24px 10px 10px' }}
            >
              <Icon size={24} weight="fill" />
              <span className="text-body-m">{item.label}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
