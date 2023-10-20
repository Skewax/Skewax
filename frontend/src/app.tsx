
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import { EditorPage } from './pages/EditorPage'
import { SigninPage } from './pages/SigninPage'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AuthProvider from './contexts/AuthProvider'
import { useMemo } from 'react'

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

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),

});

const App = () => {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createTheme({ palette: { mode: prefersDarkMode ? 'dark' : 'light' } }), [prefersDarkMode])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}
export default App
