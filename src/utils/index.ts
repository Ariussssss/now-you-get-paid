import { PaidParams } from '../model'

export const defaultParams: PaidParams = {
  base: 10,
  startTime: 9,
  endTime: 6,
  workDays: 5,
}

export const getFromUrl = (): Partial<PaidParams> =>
  Object.fromEntries(
    location.search
      .slice(1)
      .split('&')
      .filter(Boolean)
      .map((e) => {
        const [k, v] = e.split('=')
        return [k, Number(v)]
      })
  )

const LocalStorageKey = 'now-you-get-paid'

export const setLocalStorage = (config: PaidParams) => {
  localStorage.setItem(LocalStorageKey, JSON.stringify(config))
}

export const getLocalStorage = (): PaidParams => {
  const query = localStorage.getItem(LocalStorageKey)
  try {
    return { ...defaultParams, ...JSON.parse(query || '{}') }
  } catch (err) {
    console.error(err)
    return defaultParams
  }
}
