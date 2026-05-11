'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import Image from 'next/image'
import SideNav from '@/src/components/SideNav'

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Main Layout */}
      <div className="page-wrapper">
        {/* Side Nav - visible only on desktop (hidden on smaller screens) */}
        <div className="hidden lg:flex">
          <SideNav />
        </div>

        {/* Mobile/Tablet Top Navbar */}
        <div className="lg:hidden w-full">
          <div className="flex items-center justify-between h-16 bg-[rgb(14,14,18)] px-4 border-b border-[rgb(31,31,31)]">
            {/* Left: Abiola Profile */}
            <div className="flex items-center gap-3">
              <Image
                src="https://framerusercontent.com/images/pYTUyNQdLsvydRLSiS2tOjZ6V2U.png"
                alt="Abiola Adeyeye"
                width={40}
                height={40}
                style={{ borderRadius: '32px' }}
                priority
              />
              <div className="flex flex-col gap-0">
                <h3 className="text-sm font-semibold text-white">Abiola</h3>
              </div>
            </div>

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

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="bg-[rgb(14,14,18)] border-b border-[rgb(31,31,31)] z-40"
              >
                <SideNav />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>
    </>
  )
}
