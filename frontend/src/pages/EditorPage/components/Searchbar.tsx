import { Box, Paper, TextField, useTheme } from "@mui/material"
import { useCallback, useRef, useState } from "react"
import CommandDiplay from "../../../components/CommandDisplay"
import useKeyboardShortcut from "use-keyboard-shortcut"


const Searchbar = () => {

  const [active, setActive] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')

  const theme = useTheme()
  const searchbarRef = useRef()
  const focusSearchbar = useCallback(() => {
    if (searchbarRef.current) {
      searchbarRef.current.focus()
    }
  }, [])

  useKeyboardShortcut(['Meta', 'K'], () => {
    focusSearchbar()
  })



  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height={1}
      px={active ? 0 : 5}
      style={{
        transition: theme.transitions.create('all', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.shortest
        })
      }}
    >
      <Paper sx={{ borderRadius: '50vh', px: 1, width: '100%' }} >
        <TextField
          placeholder={active ? '' : 'Command Palette'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          inputRef={searchbarRef}
          variant='standard'
          fullWidth
          onFocus={() => setActive(true)}
          onBlur={() => { setActive(false); setSearchTerm('') }}
          InputProps={{
            startAdornment: <></>,
            disableUnderline: true,
            endAdornment: <Box position='absolute' right={0} mr={1}><CommandDiplay command={{ modifiers: { Main: true }, shortcut: 'k' }} /></Box>
          }}
          inputProps={{ style: { textAlign: 'center' } }}

        />
      </Paper>
    </Box>
  )
}
export default Searchbar
