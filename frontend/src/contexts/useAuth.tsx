import { createContext, useContext, useState } from "react"

const gapiConfig = {
  scope: 'https://www.googleapis.com/auth/drive.file',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
  clientId: '322293244084-ia0sb80g7kakes38jkbibprno239tcl6.apps.googleusercontent.com'
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

const AuthProvider = ({ children }: AuthProviderProps) => {

  const [token, setToken] = useState<string | null>(null)

  const gsi = window.google.accounts.oauth2.initCodeClient({
    client_id: gapiConfig.clientId,
    scope: gapiConfig.scope,
    callback: (codeResponse) => {
      console.log(codeResponse)
    }
  })

  console.log(token)

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
