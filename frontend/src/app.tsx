
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import { EditorPage } from './pages/EditorPage'
import { SigninPage } from './pages/SigninPage'
import { SignoutPage } from './pages/SignoutPage'
import { ApolloClient, ApolloLink, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { useMemo } from 'react'
import useAuth from './hooks/useAuth'
import { onError } from "@apollo/client/link/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/editor",
    element: <EditorPage />
  },
  {
    path: "/signin",
    element: <SigninPage />
  },
  {
    path: "/signout",
    element: <SignoutPage />
  }
])

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  fetchOptions: {
    mode: 'cors',
  },
})



const App = () => {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createTheme({ palette: { mode: prefersDarkMode ? 'dark' : 'light' } }), [prefersDarkMode])
  const { jwtData, requestToken } = useAuth()


  const client = useMemo(() => {

    if (jwtData == null) return new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });

    const authMiddleware = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          "Authorization": jwtData.raw,
        },
      }
    })

    const errorMiddleware = onError(({ graphQLErrors }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => {
          if (message === "authentication error") {
            requestToken()
          }
        })
      }
    })


    return new ApolloClient({
      // link: httpLink.concat(authMiddleware),
      link: ApolloLink.from([authMiddleware, errorMiddleware, httpLink]),
      cache: new InMemoryCache(),

    });
  }, [jwtData, requestToken]);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ApolloProvider>
  )
}
export default App
