import { createContext, useContext, useEffect, useMemo, useState } from "react"
import usePersistedState from "../hooks/usePersistedState";

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
const gapiConfig = {
  scope: 'https://www.googleapis.com/auth/drive.file email profile openid',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
  clientId: '1085983367599-5527f55859r5mufahtfe5nso9s0sf9lq.apps.googleusercontent.com'
};

interface AuthContext {
  signIn: () => void
  signOut: () => void
  user: null
  isSignedIn: boolean
}

interface AuthProviderProps {
  children: React.ReactNode
}


const AuthContext = createContext<AuthContext>({} as AuthContext)

const useAuth = () => useContext(AuthContext)

const gsi = window.google.accounts.oauth2.initCodeClient({
  client_id: gapiConfig.clientId,
  ux_mode: 'redirect',
  scope: gapiConfig.scope,
  redirect_uri: import.meta.env.VITE_LOGIN_ENDPOINT,
})
const AuthProvider = ({ children }: AuthProviderProps) => {

  const [token, setToken] = usePersistedState<string | null>('token', null)
  const parsed = useMemo(() => {
    if (token != null) {
      return parseJwt(token)
    }
    else {
      return null
    }
  }
    , [token])
  console.log("parsed jwt: ", parsed)

  useEffect(() => {
    if (token !== null) {
      const tokenOut = parseJwt(token)
      console.log(tokenOut)
    }
  }, [token])




  return (
    <AuthContext.Provider value={{
      signIn: () => {
        gsi.requestCode();
      },
      signOut: () => {

      },
      isSignedIn: false,
      user: null,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

const Wrapper = ({ children }: AuthProviderProps) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export {
  Wrapper as AuthProvider,
  useAuth
}
