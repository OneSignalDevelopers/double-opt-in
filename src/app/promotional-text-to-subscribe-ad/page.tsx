'use client'


import { useSearchParams } from "next/navigation"

export default function TextToOptInPage() {
  const phone_number = useSearchParams().get('phone_number') || '77805'
  return (
    <div className="flex flex-col w-1/2 text-lg text-[#424D57]">
      <h1 className="text-4xl font-semibold text-[#051B2C] mb-2">
        Stay in the know
      </h1>
      <p className="mb-6">
        Be the first one to receive new releases, special offers, and more
      </p>
      <p className="mb-6">
        Text <span className="font-extrabold">ONESIGNAL</span> to{' '}
        <span className="font-extrabold">{phone_number}</span> to never miss a drop!
      </p>
      <p className="mb-6">
        By signing up via text, you agree to receive recurring automated
        promotional and personalized marketing text messages (e.g. cart
        reminders) from Onesignal at the cell number used when signing up.
        Consent is not a condition of any purchase. Reply HELP for help and STOP
        to cancel. Msg frequency varies. Msg & data rates may apply. View Terms
        & Privacy
      </p>
    </div>
  )
}
