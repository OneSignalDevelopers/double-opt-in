'use client'

import { FormEvent, useState } from 'react'
import { OneSignalAppID } from '@/core/constants'
import { safeTry } from '@/core/utils'
import { useSearchParams } from 'next/navigation'


export default function SignUpPage() {
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'US',
  })

  const [formOptions, setFormOptions] = useState({
    wants_marketing: true,
    wants_promotions: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    setFormOptions(prevData => ({
      ...prevData,
      [name]: !prevData[name as keyof typeof formOptions],
    }))
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
      <h1 className="text-2xl font-semibold text-[#051B2C] mb-2">Sign Up</h1>
      <p className="text-[#424D57] mb-6">Sign up for our amazing product</p>

      <form className="space-y-4" onSubmit={submitForm}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[#424D57]"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#424D57]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Your Email"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-[#424D57]"
          >
            Phone Number
          </label>
          <div className="flex mt-1">
            <select
              name="country_code"
              className="border text-black border-gray-300 rounded-l-md text-sm p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="CA">🇨🇦 +1</option>
              <option value="MX">🇲🇽 +52</option>
              <option value="US">🇺🇸 +1</option>
            </select>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="^\d{1,14}$"
              className="block w-full text-black px-3 py-2 border border-gray-300 rounded-r-md text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Your Phone Number"
            />
          </div>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="marketing"
            name="wants_marketing"
            onChange={handleOptionChange}
            checked={formOptions.wants_marketing}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="marketing" className="ml-2 text-sm text-[#424D57]">
            I agree to receive marketing emails
          </label>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="promotions"
            name="wants_promotions"
            onChange={handleOptionChange}
            checked={formOptions.wants_promotions}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="promotions" className="ml-2 text-sm text-[#424D57]">
            I agree to receive automated promotional messages from [Company
            Name]. This agreement is not a condition of purchase. Message
            frequency varies. Reply STOP to opt out or HELP for help. Message &
            data rates apply. Terms and privacy policy found at{' '}
            <a href="#" className="text-blue-500 underline">
              company.com/terms
            </a>
            .
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
      </form>
    </div>
  )

  async function submitForm(event: FormEvent) {
    event.preventDefault()
    // Use the app_id query parameter if it exists, otherwise use the default OneSignalAppID
    const appId = searchParams.get('app_id') || OneSignalAppID
    const createUserAPI = `https://api.onesignal.com/apps/${appId}/users`
    const subscriptionsToCreate: Array<{
      type: string
      token: string
      enabled: boolean
    }> = []
    formData.email &&
      subscriptionsToCreate.push({
        type: 'Email',
        token: formData.email,
        enabled: true,
      })
    formData.phone &&
      subscriptionsToCreate.push({
        type: 'SMS',
        token: formData.phone,
        enabled: true,
      })
    const [error] = await safeTry(() =>
      fetch(createUserAPI, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          properties: {
            country: formData.country,
            tags: {
              name: formData.name,
              wantsMarketing: `${formOptions.wants_marketing}`,
              wantsPromotions: `${formOptions.wants_promotions}`,
            },
          },
          subscriptions: subscriptionsToCreate,
        }),
      })
    )

    if (error) {
      console.error('Failed to create user')
    } else {
      console.log('User created successfully')
    }
  }
}
