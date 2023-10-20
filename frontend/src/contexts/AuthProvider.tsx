import { useMemo } from "react"
import useAuthState from "../hooks/useAuthState"
import { AuthContext } from "./AuthContext";

function parseJwt(token: string) {
  console.log("attempting ", token)
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

interface AuthProviderProps {
  children: React.ReactNode
}

const gapiConfig = {
  scope: 'https://www.googleapis.com/auth/drive.file email profile openid',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
  clientId: '1085983367599-5527f55859r5mufahtfe5nso9s0sf9lq.apps.googleusercontent.com'
};
const gsi = window.google.accounts.oauth2.initCodeClient({
  client_id: gapiConfig.clientId,
  ux_mode: 'redirect',
  scope: gapiConfig.scope,
  redirect_uri: import.meta.env.VITE_LOGIN_ENDPOINT,
})
const AuthProvider = ({ children }: AuthProviderProps) => {

  const [authState,] = useAuthState()
  const parsed = useMemo(() => {
    if (authState?.token != null) {
      return parseJwt(authState.token)
    }
    else {
      return null
    }
  }
    , [authState?.token])



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

export default Wrapper
