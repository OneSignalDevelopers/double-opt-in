import { FunctionComponent, useState } from 'react'
import Image from 'next/image'
import phone from '../../public/phone.svg'
import { CountryCodesOptions, OneSignalAppID } from '@core/constants'
import { safeTry } from '@core/utils'

interface Props {
  readonly isOpen: boolean
  readonly onClose: () => void
}

enum StepType {
  'collection',
  'complete',
}

export const PromotionalDoubleOptInSMSModal: FunctionComponent<Props> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<StepType>(StepType.collection)
  const [selectedCountry, setSelectedCountry] = useState('US')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  if (!isOpen) return null

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const country = event.target.value
    setSelectedCountry(country)
  }

  const handlePhoneInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target
    setPhoneNumber(value)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl flex overflow-hidden">
        {/* Left Side (Image or Graphic) */}
        <div className="w-1/3 relative">
          <Image
            src="/bg-1.png"
            alt="Sidebar Graphic"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
        </div>

        {/* Right Side (Content) */}
        <div className="w-2/3 p-8 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>

          {/* Modal Content */}
          {currentStep == StepType.collection
            ? renderCollectionForm()
            : renderNextStep()}
        </div>
      </div>
    </div>
  )

  function renderCollectionForm() {
    return (
      <div className="flex flex-col items-start space-y-4">
        <img src="/onesignal-logo.png" alt="OneSignal" className="h-6 mb-2" />
        <h2 className="text-3xl font-semibold text-[#051B2C]">Get 20% off</h2>
        <p className="text-[#424D57]">
          On your first order, plus get access to new launches
        </p>

        <p className="text-sm text-[#424D57] mt-2">
          By signing up, you agree to receive automated promotional messages
          from [Company Name]. This agreement is not a condition of purchase.
          Message frequency varies. Reply STOP to opt out or HELP for help.
          Message & data rates apply. Terms and privacy policy found at{' '}
          <a
            href="https://company.com/terms"
            className="text-blue-500 underline"
          >
            company.com/terms
          </a>
          .
        </p>

        <div className="w-full">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-[#424D57]"
          >
            Phone Number
          </label>
          <div className="flex mt-1  space-x-0">
            <select
              name="country_code"
              className="border text-black border-gray-300 rounded-l-md text-sm p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={handleSelectChange}
              value={selectedCountry}
            >
              {CountryCodesOptions.map((cc) => {
                return (
                  <option key={cc.country} value={cc.country}>
                    {cc.flag} {cc.code}
                  </option>
                )
              })}
            </select>
            <input
              type="tel"
              id="phone"
              name="phone"
              pattern="^\+[1-9]\d{1,14}$"
              onChange={handlePhoneInputChange}
              className="flex-grow text-black block px-3 py-2 border border-gray-300 rounded-r-md text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Your Phone Number"
            />
          </div>
        </div>

        <p>{errorMessage}</p>

        <button
          onClick={() => createSMSSubscription()}
          className="cursor-pointer w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4 disabled:bg-blue-400"
          disabled={!selectedCountry || !phoneNumber}
        >
          Get 20% off now
        </button>

        <button
          onClick={onClose}
          className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-2"
        >
          No Thanks
        </button>
      </div>
    )
  }

  function renderNextStep() {
    return (
      <div className="flex flex-col items-start space-y-4 text-black">
        <img src="/onesignal-logo.png" alt="OneSignal" className="h-6 mb-2" />
        <div className="w-72 h-72 flex flex-col justify-center mx-auto">
          <Image className="" src={phone} priority alt="Phone icon" />
          <button
            className="mt-6"
            onClick={() => {
              onClose()
              setCurrentStep(StepType.collection)
            }}
          >
            Close
          </button>
        </div>
        {/* <h2>Check your texts</h2>
        <p>Reply ‘Y’ to subscribe and get 20% off your first order</p> */}
      </div>
    )
  }

  /**
   * Relies on "Send message prompt" being enabled
   * in the dashboard
   */
  async function createSMSSubscription() {
    const createUserAPI = `https://api.onesignal.com/apps/${OneSignalAppID}/users`
    const [error, _] = await safeTry(() =>
      fetch(createUserAPI, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          properties: {
            country: selectedCountry,
            tags: {
              campaignAttribution: '20%OffPromo',
            },
          },
          subscriptions: [
            {
              type: 'SMS',
              token:
                CountryCodesOptions.find((x) => x.country == selectedCountry)!
                  .code + phoneNumber,
              enabled: true,
            },
          ],
        }),
      })
    )

    if (error) {
      setErrorMessage(error?.message)
    } else {
      setCurrentStep(StepType.complete)
      setErrorMessage('')
      setPhoneNumber('')
      setSelectedCountry('')
    }
  }
}
