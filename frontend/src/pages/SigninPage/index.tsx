import { useSearchParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthState from '../../hooks/useAuthState';

export const SigninPage = () => {
  const [params] = useSearchParams();
  const [, setAuthState] = useAuthState()
  useEffect(() => {
    setAuthState({ token: params.get("token"), session: params.get("session") });
  })

  const error = params.get("error");
  if (error != null)
    return (<Navigate replace to={`/editor?error=${error}`} />);


  return (<Navigate replace to="/editor" />);
}
