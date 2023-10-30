import { useMemo } from "react"
import useAuthState from "../hooks/useAuthState"
import { AuthContext, JWT } from "./AuthContext";

function parseJwt(token: string): { exp: number, iss: string, user_id: string } {
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

  const [authState, setAuthState] = useAuthState()
  const jwt: JWT | null = useMemo(() => {
    if (authState?.token != null) {
      const uncheckedJwt = parseJwt(authState.token)
      if (uncheckedJwt.iss != "Skewax" || new Date(uncheckedJwt.exp * 1000) < new Date()) {
        //TODO: implement refresh token
        setAuthState({ token: null, session: null })
        return null
      }
      return {
        exp: new Date(uncheckedJwt.exp * 1000),
        userId: uncheckedJwt.user_id,
      }
    }
    else {
      return null
    }
  }
    , [authState?.token, setAuthState])


  return (
    <AuthContext.Provider value={{
      signIn: () => {
        gsi.requestCode();
      },
      signOut: () => {
        setAuthState({ token: null, session: null })
      },
      jwtData: authState?.token == null || jwt == null ? null : {
        raw: authState.token,
        parsed: jwt
      },
      isSignedIn: jwt !== null,
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
