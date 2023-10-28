
import { AppBar, Avatar, Box, Button, Grid, Popover, Stack, TableRow, Toolbar, Typography } from "@mui/material"
import logoDark from '../../../assets/logo-dark.svg'
import logoLight from '../../../assets/logo-light-background.svg'
import useIsDarkMode from "../../../hooks/useIsDarkMode"
import Searchbar from "./Searchbar"
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
import useAuth from "../../../hooks/useAuth"
import { gql } from "../../../__generated__"
import { useLazyQuery, useQuery } from "@apollo/client"

const userQuery = gql(`
  query Me {
    me {
      id
      name
      email
      image
    }
  }

`)

const Navbar = () => {
  const isDark = useIsDarkMode()

  const { signIn, isSignedIn, user, signOut } = useAuth()
  const [doUserQuery, { data: userData }] = useLazyQuery(userQuery)



  return (
    <PopupState variant='popover' popupId='navbar-popup'>
      {(popupState) => (
        <AppBar
          variant='elevation'
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar variant='dense' sx={{ mr: -3 }}>
            <Grid container justifyContent='space-between'>
              <Grid item xs={2} display='flex' alignItems='center'>
                <img style={{ height: 35 }} src={isDark ? logoDark : logoLight} />
              </Grid>
              <Grid item xs={4}>
                <Searchbar />
              </Grid>
              <Grid item xs={2} >
                <Box display='flex' justifyContent='right' alignItems='center' height={1}>
                  <Button {...bindTrigger(popupState)}>
                    <Avatar
                      sx={{ height: '30px', width: '30px', border: 1, borderColor: 'secondary.default' }}
                      alt={userData?.me.name ?? 'Login'}
                      src={userData?.me.image ?? ''}
                    />
                  </Button>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                  >
                    <Box m={2}>
                      <Stack spacing={2}>
                        {!isSignedIn &&
                          <Button onClick={signIn}>Sign In</Button>
                        }
                        {isSignedIn &&
                          <Box display='flex'>
                            <Avatar sx={{ width: 56, height: 56, border: 1, }} alt={user?.displayName ?? 'Login'} src={user?.photoURL ?? ''} />
                            <Box display='flex' flexDirection='column' justifyContent='center' ml={1}>
                              <Typography variant='body1'>{user?.displayName}</Typography>
                              <Typography variant='caption'>{user?.email}</Typography>
                            </Box>
                          </Box>
                        }
                        {isSignedIn &&
                          <Box display='flex' flexDirection='column' justifyContent='center'>
                            <Button fullWidth onClick={doUserQuery}>Profile</Button>
                            <Button fullWidth onClick={signOut}>Sign Out</Button>
                          </Box>
                        }
                      </Stack>
                    </Box>
                  </Popover>
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      )}
    </PopupState>
  )
}
export default Navbar
