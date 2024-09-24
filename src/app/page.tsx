"use client";

import { useState } from 'react'
import Link from 'next/link'
import { PromotionalDoubleOptInSMSModal } from '../components/promotional-double-opt-in-sms'
import { PromotionalTextToSubscribeModal } from '../components/promotional-text-to-subscribe-modal'
import { OneSignalAppID } from '@core/constants';

export default function MenuPage() {
  const [
    promotionalTextToSubscribeModalOpen,
    setPromotionalTextToSubscribeModalOpen,
  ] = useState(false)
  const [promotionalDobleOptinModalOpen, setPromotionalDobleOptinModalOpen] =
    useState(false)
  // const [smsCouponCodePopupOpen, setSMSCouponCodePopupOpen] = useState(false)
  // const [emailCouponCodePopupOpen, setEmailCouponCodePopupOpen] =
  //   useState(false)

  const [appId, setAppId] = useState(OneSignalAppID);
  const [isValidAppId, setIsValid] = useState(true);
  const validateAppId = (input: string) => {
    const uuidRegex =
      /^[0-9A-F]{8}-[0-9A-F]{4}-7[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;;
    return uuidRegex.test(input);
  };

  const handleAppIdInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e?.currentTarget?.value || "";
    setAppId(input);
    setIsValid(validateAppId(input));
  };

  const [phoneNumber, setPhone] = useState("+44 (267) 432-1123");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const validatePhone = (input: string) => {
    // This regex allows for various phone number formats including country codes
    // It supports country codes of 1-3 digits, followed by the main number
    const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
    return phoneRegex.test(input);
  };

  const formatPhoneNumber = (input: string) => {
    // Remove all non-digit characters
    const cleaned = input.replace(/\D/g, "");

    // Check if there's a country code (assuming 1-3 digits)
    let countryCode = "";
    let restOfNumber = cleaned;

    if (cleaned.length > 10) {
      countryCode = "+" + cleaned.slice(0, cleaned.length - 10);
      restOfNumber = cleaned.slice(-10);
    }

    // Format the main part of the number
    let formatted = "";
    if (restOfNumber.length <= 3) {
      formatted = restOfNumber;
    } else if (restOfNumber.length <= 6) {
      formatted = `(${restOfNumber.slice(0, 3)}) ${restOfNumber.slice(3)}`;
    } else {
      formatted = `(${restOfNumber.slice(0, 3)}) ${restOfNumber.slice(3, 6)}-${restOfNumber.slice(6)}`;
    }

    // Combine country code and formatted number
    return countryCode ? `${countryCode} ${formatted}` : formatted;
  };

  const handlePhoneInputChange = (e:  React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    const formattedInput = formatPhoneNumber(input);
    setPhone(formattedInput);
    setIsPhoneNumberValid(validatePhone(formattedInput));
  };

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
              href={"/log-in-collection-opt-in?app_id=" + appId}
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
              appId={appId}
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
              phoneNumber={phoneNumber}
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
              href={"/newsletter-sign-up?app_id=" + appId}
            >
              Newsletter sign up
            </Link>
          </div>
        </section>
            <section>
            <h2 className="text-black mb-3 text-lg font-semibold">Settings</h2>
            <div className="mx-auto mt-4 flex flex-col gap-4">
              <div className="flex flex-col">
              <label htmlFor="phone-input" className="mb-1">From Phone Number</label>
              <input
                id="phone-input"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneInputChange}
                className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isPhoneNumberValid ? "border-gray-300" : "border-red-500"
                }`}
              />
              {!isPhoneNumberValid && phoneNumber && (
                <p className="mt-2 text-sm text-red-600">
                Please enter a valid phone number
                </p>
              )}
              </div>
              <div className="flex flex-col">
              <label htmlFor="uuid-input" className="mb-1">App Id</label>
              <input
                id="uuid-input"
                type="text"
                value={appId}
                onChange={handleAppIdInputChange}
                className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isValidAppId ? "border-gray-300" : "border-red-500"
                }`}
              />
              {!isValidAppId && appId && (
                <p className="mt-2 text-sm text-red-600">
                Please enter a valid UUID
                </p>
              )}
              </div>
            </div>
            </section>
        </div>
      </div>
  );
}
