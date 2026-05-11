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
          <div className="flex items-center justify-between bg-[rgb(14,14,18)] px-4 py-3 border-b border-[rgb(31,31,31)]">
            {/* Left: Abiola Profile */}
            <div className="flex gap-3 items-start">
              <Image
                src="https://framerusercontent.com/images/pYTUyNQdLsvydRLSiS2tOjZ6V2U.png"
                alt="Abiola Adeyeye"
                width={40}
                height={40}
                style={{ borderRadius: '32px', flexShrink: 0 }}
                priority
              />
              <div className="flex flex-col gap-0">
                <h3 className="heading-3 text-sm">Abiola Adeyeye</h3>
                <a href="mailto:abioladeyeye@gmail.com" className="body-s text-xs hover:underline">
                  abioladeyeye@gmail.com
                </a>
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
            className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:hidden fixed inset-0 bg-[rgb(14,14,18)]/70 backdrop-blur-sm z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-end bg-[rgb(14,14,18)] px-4 py-3 border-b border-[rgb(31,31,31)]">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center"
                aria-label="Close navigation"
              >
                <X size={24} color="rgb(250,250,250)" weight="regular" />
              </button>
            </div>
            <SideNav />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
