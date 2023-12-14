import { useEffect } from 'react'

const useLocalStorageKey = <T>(key: string, defaultValue?: T) => {
  useEffect(() => {
    if (localStorage.getItem(key) === null) defaultValue !== undefined && writeValue(defaultValue)
  })

  const readValue = () => {
    try {
      const item = localStorage.getItem(key)
      if (item === null) throw Error("null data error")
      return JSON.parse(item)
    } catch (error) {
      console.error(error)
      return defaultValue
    }
  }

  const writeValue = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return value
    } catch (error) {
      console.error(error)
      return defaultValue
    }
  }

  return [readValue, writeValue] as const
}

export default useLocalStorageKey
