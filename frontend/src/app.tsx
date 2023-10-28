
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import { EditorPage } from './pages/EditorPage'
import { SigninPage } from './pages/SigninPage'
import { ApolloClient, ApolloLink, InMemoryCache, ApolloProvider, HttpLink, createHttpLink, concat } from "@apollo/client";
import { useEffect, useMemo } from 'react'
import useAuth from './hooks/useAuth'

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
  }
])

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),

});


const App = () => {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createTheme({ palette: { mode: prefersDarkMode ? 'dark' : 'light' } }), [prefersDarkMode])
  const { jwtData } = useAuth()
  console.log(jwtData)

  useEffect(() => {
    if (jwtData == null) return
    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          authorization: jwtData.raw,
          ...headers
        }
      }))
      return forward(operation)
    })


    client.setLink(authMiddleware.concat(httpLink))
    // client.refetchQueries({
    // include: "all"
    // })
  }, [jwtData])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ApolloProvider>
  )
}
export default App
