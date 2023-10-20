import { useCallback, useEffect, useRef, useState } from 'react'
import useLocalStorageKey from './useLocalStorageKey'
import { v4 as uuidv4 } from 'uuid'

const useLocalStorage = <T>(key: string, initialValue: T = null, global = false) => {
  const idRef = useRef<string>(uuidv4())
  const [read, write] = useLocalStorageKey(key, initialValue)
  const [storedValue, setStoredValue] = useState<T>(() => {
    return read() ?? initialValue
  })

  useEffect(() => {
    setStoredValue(read())
  }, [key])

  const handleStorage = useCallback(() => {
    const item: T = read()
    const value = item || initialValue
    setStoredValue(value)
  }, [setStoredValue, key, initialValue])

  useEffect(() => {
    const handler = (evt: any) => {
      if (global) {
        handleStorage()
      } else {
        const { key: evtKey, id } = (evt as CustomEvent).detail || {}
        if ((evtKey && evtKey === key) && (id !== idRef.current)) {
          handleStorage()
        }
      }
    }
    window.addEventListener('storeLocalValue', handler)
    return () => window.removeEventListener('storeLocalValue', handler)
  })

  const setValue = useCallback<typeof setStoredValue>(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        write(valueToStore)
        setStoredValue(valueToStore)
        window.dispatchEvent(new CustomEvent('storeLocalValue', { detail: { key, id: idRef.current } }))
      } catch (error) {
        console.error(error)
      }
    },
    [storedValue, key],
  )

  return [storedValue, setValue] as const
}

export default useLocalStorage
