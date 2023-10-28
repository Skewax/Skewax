import { createContext } from "react"

export interface JWT {
  exp: Date,
  userId: string,
}
interface AuthContextProps {
  signIn: () => void
  signOut: () => void
  isSignedIn: boolean
  user: unknown
  jwtData: {
    raw: string
    parsed: JWT
  } | null
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export {
  AuthContext,
}
