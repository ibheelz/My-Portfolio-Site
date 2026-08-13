'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import Image from 'next/image'
import SideNav from '@/src/components/SideNav'
import { useAnalytics } from '@/src/hooks/useAnalytics'


export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  useAnalytics()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* Main Layout */}
      <div className="page-wrapper">
        {/* Side Nav - visible only on desktop (hidden on smaller screens) */}
        <div className="hidden lg:flex sidebar-nav">
          <SideNav />
        </div>

        {/* Mobile/Tablet Top Navbar */}
        <div className="lg:hidden w-full mobile-navbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="flex items-center justify-between bg-[rgb(14,14,18)] px-4 py-3 w-full">
            {/* Left: Abiola Profile */}
            <Link href="/projects" className="flex gap-3 items-center cursor-pointer">
              <Image
                src="/profile-photo.jpg"
                alt="Abiola Adeyeye"
                width={56}
                height={56}
                style={{ borderRadius: '40px', flexShrink: 0, objectFit: 'cover' }}
                priority
              />
              <div className="flex flex-col gap-0">
                <h3 className="heading-3 text-sm">Abiola Adeyeye</h3>
                <span className="body-s text-xs">
                  abioladeyeye@gmail.com
                </span>
              </div>
            </Link>

            {/* Right: Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <X size={24} color="rgb(250,250,250)" weight="regular" />
              ) : (
                <List size={24} color="rgb(250,250,250)" weight="regular" />
              )}
            </button>
          </div>

        </div>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>

      {/* Mobile Menu Modal Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Modal - Plain gray background */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[101] overflow-y-auto"
            style={{ backgroundColor: 'var(--grey-bg)' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <div onClick={(e) => e.stopPropagation()} className="relative w-full h-full">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center z-50"
                aria-label="Close navigation"
              >
                <X size={24} color="rgb(250,250,250)" weight="regular" />
              </button>
              <SideNav hideProfile={true} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
