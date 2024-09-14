'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DoubleOptInSMSModal } from '../components/double-opt-in-sms'
import { TextToSubscribeModal } from '../components//text-to-subscribe-modal'

export default function MenuPage() {
  const [textToSubscribeModalOpen, setTextToSubscribeModalOpen] =
    useState(false)
  const [dobleOptinModalOpen, setDobleOptinModalOpen] = useState(false)

  return (
    <div className="flex flex-col">
    <div>
      <div className="flex flex-col text-black mb-10">
        <img
          src="/onesignal-logo.png"
          alt="OneSignal"
          className="h-8 w-36 justify-center mx-auto"
        />
        <h1 className="text-2xl mt-7 justify-center mx-auto">
          Templates for building email and phone number collection funnels for
          conversion
        </h1>
      </div>
      <div className="flex flex-col gap-8">
        <section className="flex flex-col">
          <h2 className="text-black mb-3 text-lg font-semibold">Email & SMS</h2>
          <div className="flex gap-4">
            <Link
              className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
              href="/sign-up"
            >
              Sign Up
            </Link>
            <Link
              className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
              href="#"
            >
              Collection Site
            </Link>
          </div>
        </section>

        <section className="flex flex-col">
          <h2 className="text-black mb-3 text-lg font-semibold">SMS Only</h2>
          <div className="flex gap-4">
            <button
              className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
              onClick={() => setTextToSubscribeModalOpen(true)}
            >
              Text to Subscribe Double Opt-In
            </button>

            <TextToSubscribeModal
              isOpen={textToSubscribeModalOpen}
              onClose={() => setTextToSubscribeModalOpen(false)}
            />

            <button
              className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
              onClick={() => setDobleOptinModalOpen(true)}
            >
              Double Opt-in SMS Modal
            </button>
            <DoubleOptInSMSModal
              isOpen={dobleOptinModalOpen}
              onClose={() => setDobleOptinModalOpen(false)}
            />

            <Link
              className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
              href="#"
            >
              Text to Subscribe Double Opt-in
            </Link>

            <Link
              className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
              href="/text-opt-in"
            >
              Text to Opt-in
            </Link>
          </div>
        </section>

        <section className="flex flex-col">
          <h2 className="text-black mb-3 text-lg font-semibold">Email Only</h2>
          <div className="flex gap-4">
            <Link
              className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
              href="#"
            >
              Text to Opt-in
            </Link>
            <Link
              className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
              href="#"
            >
              Text to Opt-in
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
