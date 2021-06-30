import { useState, useEffect, useCallback } from 'react'
import { getFromUrl, getLocalStorage, setLocalStorage } from '../utils'

export const usePaid = () => {
  const [percent, setPercent] = useState(1)
  const cacheConfig = {
    ...getLocalStorage(),
    ...getFromUrl(),
  }
  setLocalStorage(cacheConfig)
  const { base, startTime, endTime, workDays } = cacheConfig
  const oneDayPaid = Math.ceil(
    ((base * 12) / (365 - (365 / 7) * (7 - workDays))) * 1000
  )
  const start = startTime % 13
  const end = endTime > 12 ? endTime % 25 : (endTime + 12) % 25

  useEffect(() => {
    const timer = window.setInterval(() => {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth()
      const date = today.getDate()

      const todayTime = today.getTime()
      const todayStart = new Date(year, month, date, start, 0, 0).getTime()
      const todayEnd = new Date(year, month, date, end, 0, 0).getTime()
      console.info("end, start", end, start);

      const oneDay = (end - start) * 3600 * 1000
      if (todayTime < todayStart) {
        setPercent(0)
      } else if (todayTime > todayEnd) {
        setPercent(1)
      } else {
        setPercent((todayTime - todayStart) / oneDay)
      }
    }, 300)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return { percent, oneDayPaid }
}
