export const OneSignalAppID = '4228cf8a-47dd-44d2-b646-9a8263db2898'

interface CountyCode {
  readonly code: string
  readonly flag: string
}
export const CountryCodes = new Map<string, CountyCode>([
  ['CA', { code: '+1', flag: '🇨🇦' }],
  ['MX', { code: '+52', flag: '🇲🇽' }],
  ['US', { code: '+1', flag: '🇺🇸' }],
])
