'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DoubleOptInModal } from '../components/double-opt-in-modal'
import { TextToSubscribeModal } from '../components//text-to-subscribe-modal'

export default function HomePage() {
  const [textToSubscribeModalOpen, setTextToSubscribeModalOpen] =
    useState(false)
  const [dobleOptinModalOpen, setDobleOptinModalOpen] = useState(false)

  return (
    <div className="flex flex-col">
      <img src="/onesignal-logo.png" alt="OneSignal" className="h-6 mb-2" />

      <Link
        className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
        href="/sign-up"
      >
        Sign-up Page
      </Link>
      <button
        className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
        onClick={() => setTextToSubscribeModalOpen(true)}
      >
        Text to subscribe
      </button>
      <TextToSubscribeModal
        isOpen={textToSubscribeModalOpen}
        onClose={() => setTextToSubscribeModalOpen(false)}
      />

      <button
        className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
        onClick={() => setDobleOptinModalOpen(true)}
      >
        Double-opt in
      </button>
      <DoubleOptInModal
        isOpen={dobleOptinModalOpen}
        onClose={() => setDobleOptinModalOpen(false)}
      />
    </div>
  )
}
