'use client'

import Image from 'next/image'
import { Phone, EnvelopeSimpleOpen, MapPin } from '@phosphor-icons/react'

export default function LetsConnectSection() {
  return (
    <section
      className="w-full border-t-2 border-[rgb(2,1,10)] bg-[rgb(14,14,18)] overflow-visible"
      style={{ padding: '96px' }}
    >
      {/* Outer container - flex row */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch lg:items-stretch" style={{ gap: '32px' }}>
        {/* Left Side - Photograph */}
        <div className="w-full lg:w-1/2 relative flex-shrink-0">
          <div className="relative w-full h-full rounded-2xl overflow-visible" style={{ borderRadius: '16px' }}>
            <Image
              src="https://framerusercontent.com/images/5ylj0gysRWJbYU3eEdJqMvks02w.png"
              alt="Let's Connect"
              fill
              className="object-cover"
              style={{ borderRadius: '16px' }}
            />

            {/* Watermark Logo - bottom right corner */}
            <div className="absolute flex items-center justify-center overflow-visible" style={{ bottom: '12px', right: '12px', width: '108px', height: '42.5px' }}>
              <Image
                src="https://framerusercontent.com/images/dCtHDieyJay9H91GpY1lWIzFAI.svg"
                alt="Logo"
                width={108}
                height={42.5}
                style={{ width: '108px', height: '42.5px' }}
              />
            </div>
          </div>
        </div>

        {/* Right Side - Text and Contact Area */}
        <div className="flex-1 w-full lg:w-1/2 flex flex-col overflow-visible">
          {/* Main content wrapper with max-width */}
          <div className="flex flex-col gap-6 max-w-[640px] mx-auto lg:mx-0 w-full justify-between" style={{ gap: '24px' }}>

            {/* Top Text Group */}
            <div className="flex flex-col gap-2.5" style={{ gap: '10px' }}>
              {/* Label */}
              <div style={{ width: '233px' }}>
                <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                  Let's Connect
                </label>
              </div>

              {/* Large Statement */}
              <h2
                className="font-gucina text-[28px] leading-[1.3em] tracking-[-0.02em] text-[rgb(250,250,250)]"
                style={{ maxWidth: '544px', fontWeight: '500' }}
              >
                I'm not just here to design products; I'm here to connect with people.
              </h2>

              {/* Body Paragraph */}
              <p
                className="font-gucina text-[16px] leading-[28px] tracking-[0.01em] text-[rgb(138,138,138)]"
                style={{ maxWidth: '500px' }}
              >
                As a creative designer, I'm constantly exploring the space where creativity meets technology to build user experiences that are meaningful, lasting, and well crafted.
              </p>
            </div>

            {/* Bottom Contact Rows Group */}
            <div className="flex flex-col gap-6 justify-end" style={{ gap: '24px', alignItems: 'flex-end' }}>

              {/* Row 1 - Phone */}
              <div className="flex gap-4 items-center w-full" style={{ gap: '16px' }}>
                <div
                  className="flex-shrink-0 flex items-center justify-center border border-[rgb(51,51,51)]"
                  style={{ width: '40px', height: '40px', borderRadius: '8px' }}
                >
                  <Phone size={20} weight="regular" color="rgb(143,134,152)" />
                </div>
                <div className="flex flex-col gap-1.5" style={{ gap: '6px' }}>
                  <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                    Phone Number
                  </label>
                  <a
                    href="tel:+234902448-1896"
                    className="font-gucina text-[16px] leading-[20px] tracking-[0.01em] text-[rgb(250,250,250)] hover:opacity-75 transition-opacity"
                  >
                    +234 (902) 448-1896
                  </a>
                </div>
              </div>

              {/* Row 2 - Email */}
              <div className="flex gap-4 items-center w-full" style={{ gap: '16px' }}>
                <div
                  className="flex-shrink-0 flex items-center justify-center border border-[rgb(51,51,51)]"
                  style={{ width: '40px', height: '40px', borderRadius: '8px' }}
                >
                  <EnvelopeSimpleOpen size={20} weight="regular" color="rgb(143,134,152)" />
                </div>
                <div className="flex flex-col gap-1.5" style={{ gap: '6px' }}>
                  <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                    Email
                  </label>
                  <a
                    href="mailto:abioladeyeye@gmail.com"
                    className="font-gucina text-[16px] leading-[20px] tracking-[0.01em] text-[rgb(250,250,250)] hover:opacity-75 transition-opacity"
                  >
                    abioladeyeye@gmail.com
                  </a>
                </div>
              </div>

              {/* Row 3 - Residence */}
              <div className="flex gap-4 items-center w-full" style={{ gap: '16px' }}>
                <div
                  className="flex-shrink-0 flex items-center justify-center border border-[rgb(51,51,51)]"
                  style={{ width: '40px', height: '40px', borderRadius: '8px' }}
                >
                  <MapPin size={20} weight="regular" color="rgb(143,134,152)" />
                </div>
                <div className="flex flex-col gap-1.5" style={{ gap: '6px' }}>
                  <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                    Current Residence
                  </label>
                  <p className="font-gucina text-[16px] leading-[20px] tracking-[0.01em] text-[rgb(250,250,250)]">
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
