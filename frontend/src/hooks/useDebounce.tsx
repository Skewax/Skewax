import { useEffect, useRef, useCallback, useState } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDebounce(callback: any, delay: number): [any, boolean] {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        setLoading(false)
      }
    }
  }
    , [])

  const debouncedCallback = useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setLoading(true)
    timeoutRef.current = setTimeout(() => {
      callback(...args)
      setLoading(false)
    }, delay)
  }

    , [callback, delay])

  return [
    debouncedCallback,
    loading

  ]
}

export default useDebounce
