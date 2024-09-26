'use client'

import { Suspense, useState } from 'react'
import { OneSignalAppID } from '@core/constants'
import { safeTry } from '@core/utils'
import { useSearchParams } from 'next/navigation';


export default function  NewsletterSignupPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewsletterSignup />
      </Suspense>
    </div>
  );
};

function NewsletterSignup() {
  const appId = useSearchParams().get('appId') || OneSignalAppID;
  const [email, setEmail] = useState('')
  const [subscriptionCreated, setsubscriptionCreated] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setEmail(value)
  }

  return (
    <div className="min-h-screen grid grid-cols-12 bg-[#e6e7f1]">
      {/* Left Side: OneSignal Logo */}
      <div className="col-span-8 flex items-start justify-start p-10">
        <img src="/onesignal-logo.png" alt="OneSignal" className="h-6 mb-2" />
      </div>

      {/* Right Side: Subscription Form */}
      <div className="col-span-4 flex flex-col justify-end items-start p-10">
        <h2 className="text-2xl font-semibold text-[#051B2C] mb-4">
          Stay Up to Date
        </h2>
        <p className="text-sm text-[#424D57] mb-6">
          Subscribe to our emails and be the first to know about new arrivals,
          sales & promos!
        </p>

        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#051B2C]"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          className="mt-1 text-black mb-6 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Sign Up Button */}
        <button
          className="w-full bg-blue-600 disabled:bg-blue-400 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition"
          disabled={!email || subscriptionCreated}
          type="button"
          onClick={onClick}
        >
          {subscriptionCreated ? "You've been subscribed!" : 'Sign Up'}
        </button>
        {!!errorMessage && <p>{errorMessage}</p>}

        {/* Marketing Agreement */}
        <p className="text-xs text-[#424D57] mt-4">
          By signing up, you agree to receive marketing emails.
        </p>
      </div>
    </div>
  )

  async function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    const createUserAPI = `https://api.onesignal.com/apps/${appId}/users`
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error , _result] = await safeTry(() =>
      fetch(createUserAPI, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          properties: {
            tags: {
              wantsNewsletter: true,
            },
          },
          subscriptions: [
            {
              type: 'Email',
              token: email,
              enabled: true,
            },
          ],
        }),
      })
    )
    if (error) {
      console.error('Failed to create user')
      setErrorMessage(error.message);
    } else {
      setsubscriptionCreated(true)
      setErrorMessage('');
    }
  }
}
