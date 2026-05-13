'use client'

import Image from 'next/image'
import { Phone, EnvelopeSimpleOpen, MapPin } from '@phosphor-icons/react'

export default function LetsConnectSection() {
  return (
    <section
      className="w-full border-t-2 border-[rgb(2,1,10)] bg-[rgb(14,14,18)] overflow-visible"
      style={{ padding: 'clamp(48px, 10vw, 96px) clamp(16px, 5vw, 64px)' }}
    >
      {/* Outer container - flex row on desktop, column on mobile */}
      <div className="flex flex-col-reverse lg:flex-row gap-8 items-stretch lg:items-stretch w-full" style={{ gap: 'clamp(24px, 5vw, 40px)' }}>
        {/* Left Side - Photograph - appears below text on mobile */}
        <div className="w-full lg:w-1/2 relative lg:flex-shrink-0 lg:h-full" style={{ height: 'clamp(350px, 60vw, 700px)' }}>
          <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{ borderRadius: '16px', position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src="/me.jpg"
              alt="Let's Connect"
              fill
              className="object-cover"
              style={{ borderRadius: '16px' }}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Right Side - Text and Contact Area */}
        <div className="flex-1 w-full lg:w-1/2 flex flex-col overflow-visible">
          {/* Main content wrapper with max-width */}
          <div className="flex flex-col gap-6 w-full justify-between" style={{ gap: 'clamp(16px, 3vw, 24px)' }}>

            {/* Top Text Group */}
            <div className="flex flex-col gap-2.5" style={{ gap: 'clamp(8px, 2vw, 10px)' }}>
              {/* Label */}
              <div>
                <label className="font-gucina font-bold text-[clamp(11px,2vw,12px)] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                  Let's Connect
                </label>
              </div>

              {/* Large Statement */}
              <p
                className="font-gucina text-[clamp(22px,6vw,28px)] leading-[1.3em] tracking-[-0.02em] text-[rgb(250,250,250)]"
              >
                I'm not just here to design products;
                <br />
                I'm here to connect with people.
              </p>

              {/* Body Paragraph */}
              <p
                className="font-gucina text-[clamp(14px,2vw,16px)] leading-[1.6] tracking-[0.01em] text-[rgb(138,138,138)]"
              >
                As a creative designer, I'm constantly exploring the space where creativity meets technology to build user experiences that are meaningful, lasting, and well crafted.
              </p>
            </div>

            {/* Bottom Contact Rows Group */}
            <div className="flex flex-col gap-6 w-full" style={{ gap: 'clamp(16px, 3vw, 24px)' }}>

              {/* Row 1 - Phone */}
              <div className="flex gap-4 items-start w-full" style={{ gap: 'clamp(12px, 2vw, 16px)' }}>
                <div
                  className="flex-shrink-0 flex items-center justify-center border border-[rgb(51,51,51)]"
                  style={{ width: '40px', height: '40px', borderRadius: '8px', minWidth: '40px' }}
                >
                  <Phone size={20} weight="regular" color="rgb(143,134,152)" />
                </div>
                <div className="flex flex-col gap-1.5" style={{ gap: '6px' }}>
                  <label className="font-gucina font-bold text-[clamp(10px,2vw,12px)] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                    Phone Number
                  </label>
                  <a
                    href="tel:+234902448-1896"
                    className="font-gucina text-[clamp(14px,2vw,16px)] leading-[1.5] tracking-[0.01em] text-[rgb(250,250,250)] hover:opacity-75 transition-opacity"
                  >
                    +234 (902) 448-1896
                  </a>
                </div>
              </div>

              {/* Row 2 - Email */}
              <div className="flex gap-4 items-start w-full" style={{ gap: 'clamp(12px, 2vw, 16px)' }}>
                <div
                  className="flex-shrink-0 flex items-center justify-center border border-[rgb(51,51,51)]"
                  style={{ width: '40px', height: '40px', borderRadius: '8px', minWidth: '40px' }}
                >
                  <EnvelopeSimpleOpen size={20} weight="regular" color="rgb(143,134,152)" />
                </div>
                <div className="flex flex-col gap-1.5" style={{ gap: '6px' }}>
                  <label className="font-gucina font-bold text-[clamp(10px,2vw,12px)] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                    Email
                  </label>
                  <a
                    href="mailto:abioladeyeye@gmail.com"
                    className="font-gucina text-[clamp(14px,2vw,16px)] leading-[1.5] tracking-[0.01em] text-[rgb(250,250,250)] hover:opacity-75 transition-opacity"
                  >
                    abioladeyeye@gmail.com
                  </a>
                </div>
              </div>

              {/* Row 3 - Residence */}
              <div className="flex gap-4 items-start w-full" style={{ gap: 'clamp(12px, 2vw, 16px)' }}>
                <div
                  className="flex-shrink-0 flex items-center justify-center border border-[rgb(51,51,51)]"
                  style={{ width: '40px', height: '40px', borderRadius: '8px', minWidth: '40px' }}
                >
                  <MapPin size={20} weight="regular" color="rgb(143,134,152)" />
                </div>
                <div className="flex flex-col gap-1.5" style={{ gap: '6px' }}>
                  <label className="font-gucina font-bold text-[clamp(10px,2vw,12px)] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                    Current Residence
                  </label>
                  <p className="font-gucina text-[clamp(14px,2vw,16px)] leading-[1.5] tracking-[0.01em] text-[rgb(250,250,250)]">
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
