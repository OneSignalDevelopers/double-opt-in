'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PromotionalDoubleOptInSMSModal } from '../components/promotional-double-opt-in-sms'
import { PromotionalTextToSubscribeModal } from '../components/promotional-text-to-subscribe-modal'

export default function MenuPage() {
  const [
    promotionalTextToSubscribeModalOpen,
    setPromotionalTextToSubscribeModalOpen,
  ] = useState(false)
  const [promotionalDobleOptinModalOpen, setPromotionalDobleOptinModalOpen] =
    useState(false)
  const [smsCouponCodePopupOpen, setSMSCouponCodePopupOpen] = useState(false)
  const [emailCouponCodePopupOpen, setEmailCouponCodePopupOpen] =
    useState(false)

  return (
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
              href="/log-in-collection-opt-in"
            >
              Log-in collection opt-in
            </Link>
          </div>
        </section>

        <section className="flex flex-col">
          <h2 className="text-black mb-3 text-lg font-semibold">SMS Only</h2>
          <div className="flex gap-4">
            {/* <button
              className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
              onClick={() => setSMSCouponCodePopupOpen(true)}
            >
              Coupon Code promotional opt-in
            </button>
            <CouponCodePopup
              collect={'sms'}
              isOpen={smsCouponCodePopupOpen}
              onClose={() => setSMSCouponCodePopupOpen(false)}
            /> */}

            <button
              className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
              onClick={() => setPromotionalDobleOptinModalOpen(true)}
            >
              Promotional double opt-in
            </button>
            <PromotionalDoubleOptInSMSModal
              isOpen={promotionalDobleOptinModalOpen}
              onClose={() => setPromotionalDobleOptinModalOpen(false)}
            />

            <button
              className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
              onClick={() => setPromotionalTextToSubscribeModalOpen(true)}
            >
              Promotional text-to-subscribe
            </button>
            <PromotionalTextToSubscribeModal
              isOpen={promotionalTextToSubscribeModalOpen}
              onClose={() => setPromotionalTextToSubscribeModalOpen(false)}
            />

            <Link
              className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
              href="/promotional-text-to-subscribe-ad"
            >
              Promotional text-to-subscribe via advertisement
            </Link>
          </div>
        </section>

        <section className="flex flex-col">
          <h2 className="text-black mb-3 text-lg font-semibold">Email Only</h2>
          <div className="flex gap-4">
            {/* <button
              className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
              onClick={() => setEmailCouponCodePopupOpen(true)}
            >
              Coupon code promotional opt-in
            </button>
            <CouponCodePopup
              collect={'email'}
              isOpen={emailCouponCodePopupOpen}
              onClose={() => setEmailCouponCodePopupOpen(false)}
            /> */}
            <Link
              className="bg-[#051B2C] text-white font-medium py-3 px-6 hover:bg-opacity-90 transition duration-200"
              href="/newsletter-sign-up"
            >
              Newsletter sign up
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
