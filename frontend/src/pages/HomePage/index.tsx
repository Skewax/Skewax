import { Box, Button, Grid, Paper, Typography } from "@mui/material"
import logoDark from '../../assets/logo-dark.svg'
import logoLight from '../../assets/logo-light.svg'
import demoApp from '../../assets/demo-light-LEGACY.png'
import useIsDarkMode from "../../hooks/useIsDarkMode"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import usePersistedState from "../../hooks/persistedState/usePersistedState"

const HomePage = () => {

  const darkMode = useIsDarkMode()
  const navigate = useNavigate()

  const [, setLastVisited] = usePersistedState("lastVisited", "/about")
  useEffect(() => {
    setLastVisited("/about")
  })


  return (
    <Box display='flex' flexDirection='column' width={1} alignItems='center' mt={5}>
      <Box width='50%'>
        <img src={darkMode ? logoDark : logoLight} />
      </Box>
      <Typography variant='subtitle1' textAlign='center' m={3}>The Modern PBASIC IDE</Typography>
      <Button variant='contained' size="large" onClick={() => navigate('/editor')}>Start Coding</Button>
      <Grid container spacing={5} p={5}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ objectFit: 'contain' }}>
            <img src={demoApp} width='100%' height='100%' />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='body1'>
            In July of 2022, Parallax Inc's own Parallax IDE for Chrome was shut down as part of the deprecation of Chrome Apps.
            This made many computers, especially chromebooks, unable to compile and run PBASIC on Basic Stamp hardware. This is why Skewax exists. <br /><br />
            Skewax can be used on any browser, and can compile on any computer with Chrome. It supports the BS2 hardware and any compatible PBASIC versions.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )

}


export default HomePage
