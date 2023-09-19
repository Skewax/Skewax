import { AppBar, Box, Theme, Toolbar, styled } from "@mui/material"
import useIsDarkMode from "../hooks/useIsDarkMode"
import logoDark from '../assets/logo-dark.svg'
import logoLight from '../assets/logo-light.svg'

interface OffsetProps {
  theme: Theme
}

const Offset = styled('div')(({ theme }: OffsetProps) => theme.mixins.toolbar)

const Navbar = () => {
  const isDark = useIsDarkMode()
  return (
    <>
      <AppBar position='fixed'>
        <Toolbar>
          <Box maxHeight={1}>
            <img src={isDark ? logoDark : logoLight} />
          </Box>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  )
}
export default Navbar
