import { useEffect, useState } from "react"

const usePersistedState = <T extends any>(key: string, initialState: T): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    const storageValue = localStorage.getItem(key)

    if (storageValue) {
      return JSON.parse(storageValue)
    } else {
      return initialState
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

export default usePersistedState
