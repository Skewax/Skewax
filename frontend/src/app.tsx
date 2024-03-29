/* eslint-disable @typescript-eslint/no-explicit-any */

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import { EditorPage } from './pages/EditorPage'
import { SigninPage } from './pages/SigninPage'
import { ApolloClient, ApolloLink, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { useMemo } from 'react'
import useAuth from './hooks/useAuth'
import { onError } from "@apollo/client/link/error";
import { DefaultRedirect } from './pages/DefaultRedirect'
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist'

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultRedirect />
  },
  {
    path: "/about",
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
])

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  fetchOptions: {
    mode: 'cors',
  },
})


const cache = new InMemoryCache()

function filterObject(obj: any, callback: (value: any, key: string) => boolean) {
  return Object.fromEntries(Object.entries(obj).
    filter(([key, val]) => callback(val, key)));
}

const persistor = new CachePersistor({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
  persistenceMapper: async (data: any) => {
    return JSON.stringify(filterObject(JSON.parse(data), (value: any) => {
      return value.__typename !== "File"
    }))

  }
})

persistor.restore()

const App = () => {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createTheme({ palette: { mode: prefersDarkMode ? 'dark' : 'light' } }), [prefersDarkMode])
  const { jwtData, requestToken } = useAuth()


  const client = useMemo(() => {

    if (jwtData == null) return new ApolloClient({
      link: httpLink,
      cache: cache,
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
      cache: cache,
      connectToDevTools: true,
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
