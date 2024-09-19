export const OneSignalAppID = '4228cf8a-47dd-44d2-b646-9a8263db2898'

interface CountyCode {
  readonly country: string
  readonly code: string
  readonly flag: string
}
export const CountryCodesOptions: ReadonlyArray<CountyCode> = [
  { country: 'CA', code: '+1', flag: '🇨🇦' },
  { country: 'MX', code: '+52', flag: '🇲🇽' },
  { country: 'US', code: '+1', flag: '🇺🇸' },
]
