import usePersistedState from "./persistedState/usePersistedState"

const useAuthState = () => {
  return usePersistedState<{
    token: string | null,
    session: string | null
  }>("skewaxAuthState", {
    token: null,
    session: null
  })
}

export default useAuthState
