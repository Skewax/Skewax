import { Navigate } from "react-router-dom"
import usePersistedState from "../../hooks/persistedState/usePersistedState"


export const DefaultRedirect = () => {
  const [lastVisited] = usePersistedState("lastVisited", "/about")

  return (
    <Navigate replace to={lastVisited} />
  )
}
