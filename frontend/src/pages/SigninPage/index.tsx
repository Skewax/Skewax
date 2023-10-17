import * as React from 'react';
import {useSearchParams} from 'react-router-dom';
import {Navigate} from 'react-router-dom';

export const SigninPage = () => {
    const [params]=useSearchParams();
    
    const error=params.get("error");
    if (error != null)
    	return (<Navigate replace to={`/editor?error=${error}`}/>);
    
    localStorage.setItem("token", params.get("token"));
    localStorage.setItem("session", params.get("session"));
    
    return (<Navigate replace to="/editor"/>);
}
