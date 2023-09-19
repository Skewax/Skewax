import React, { useMemo } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import { EditorPage } from './pages/EditorPage'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './contexts/useAuth'
import { GoogleApiProvider } from 'react-gapi/dist/types/GoogleApiProvider'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/editor",
    element: <EditorPage />
  }
])

const App = () => {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createTheme({ palette: { mode: prefersDarkMode ? 'dark' : 'light' } }), [prefersDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode >,
)
