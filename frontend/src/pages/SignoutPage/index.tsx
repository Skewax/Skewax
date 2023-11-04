import { useSearchParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthState from '../../hooks/useAuthState';

export const SignoutPage = () => {
  const [params] = useSearchParams();
  const [, setAuthState] = useAuthState()
  useEffect(() => {
    setAuthState({ token: null, session: null });
  })

  return (<Navigate replace to="/editor" />);
}