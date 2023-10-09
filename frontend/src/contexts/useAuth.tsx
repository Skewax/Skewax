import { createContext, useContext, useState } from "react"

const gapiConfig = {
  scope: 'https://www.googleapis.com/auth/drive.file',
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


const AuthContext = createContext<AuthContext>({} as any)

const useAuth = () => useContext(AuthContext)

const gsi = window.google.accounts.oauth2.initCodeClient({
  client_id: gapiConfig.clientId,
  ux_mode: 'redirect',
  scope: gapiConfig.scope,
  redirect_uri: import.meta.env.VITE_LOGIN_ENDPOINT,
})
const AuthProvider = ({ children }: AuthProviderProps) => {

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
