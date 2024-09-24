'use client'

import Image from 'next/image'
import { FunctionComponent } from 'react'

interface Props {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly phoneNumber: string
}

export const PromotionalTextToSubscribeModal: FunctionComponent<Props> = ({
  isOpen,
  onClose,
  phoneNumber,
}) => {
  if (!isOpen) return null

  const message =
    'Fat Squirrel: Reply Y to subscribe to get 20% off. Reply HELP for help and STOP to cancel. Msg frequency varies. Msg & data rates may apply. View Terms & Privacy: https://fatsquirrel.ostc.tv/12i3sf'

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md flex flex-col overflow-hidden">
          {/* Top Bar (Image or Graphic) */}
          <div className="relative w-full h-40">
            <Image
              src="/bg-1.png"
              alt="Top Graphic"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="absolute inset-0"
            />
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-lg hover:text-gray-300"
            >
              &times;
            </button>
          </div>

          {/* Content Below the Top Bar */}
          <div className="p-8">
            <div className="flex flex-col items-center space-y-4 text-center">
              <img
                src="/onesignal-logo.png"
                alt="OneSignal"
                className="h-6 mb-2"
              />
              <h2 className="text-3xl font-semibold text-[#051B2C]">
                Get 20% off
              </h2>
              <p className="text-[#424D57]">
                On your first order, plus get access to new launches
              </p>
              <p className="text-sm text-[#424D57] mt-2">
                By signing up, you agree to receive automated promotional
                messages from [Company Name]. This agreement is not a condition
                of purchase. Message frequency varies. Reply STOP to opt out or
                HELP for help. Message & data rates apply. Terms and privacy
                policy found at{' '}
                <a
                  href="<LINK TO YOUR COMPANY TERMS>"
                  className="text-blue-500 underline"
                >
                  company.com/terms
                </a>
                .
              </p>

              <button className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4">
                <a
                  href={`sms://${phoneNumber}?body=${encodeURIComponent(
                    message
                  )}`}
                >
                  Get 20% off now
                </a>
              </button>
              <button
                onClick={onClose}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-2"
              >
                No Thanks
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
