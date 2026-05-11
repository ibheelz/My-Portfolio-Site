'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import SideNav from '@/src/components/SideNav'

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  return (
    <>
      {/* Hamburger Button - visible only on tablet/mobile (lg:hidden) */}
      <button
        onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
        className="lg:hidden fixed top-4 right-4 w-10 h-10 flex items-center justify-center bg-[rgb(14,14,18)] border border-[rgb(31,31,31)] rounded-lg z-50"
        aria-label="Toggle navigation"
      >
        {mobileDrawerOpen ? (
          <X size={24} color="rgb(250,250,250)" />
        ) : (
          <List size={24} color="rgb(250,250,250)" />
        )}
      </button>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileDrawerOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Mobile Top Drawer Navigation */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:hidden fixed top-0 left-0 right-0 bg-[rgb(14,14,18)] z-50 w-full"
          >
            <div className="flex items-center justify-between p-4 mb-6">
              <h3 className="heading-3">Navigation</h3>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-2"
                aria-label="Close navigation"
              >
                <X size={24} color="rgb(250,250,250)" />
              </button>
            </div>
            <SideNav />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout */}
      <div className="page-wrapper">
        {/* Side Nav - visible only on desktop (hidden on smaller screens) */}
        <div className="hidden lg:flex">
          <SideNav />
        </div>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>
    </>
  )
}
