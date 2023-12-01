import { Box, TextField } from "@mui/material"
import { useRef, useState } from "react"
import useKeyboardShortcut from "use-keyboard-shortcut"


const SearchFiles = () => {
  const [search, setSearch] = useState<string>("")

  const searchRef = useRef()


  useKeyboardShortcut(['Meta', 'F'], () => {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  },
    {
      overrideSystem: true
    }
  )

  useKeyboardShortcut(['Control', 'F'], () => {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  },
    {
      overrideSystem: true
    }
  )



  return (
    <Box margin={1}>
      <TextField
        fullWidth
        inputRef={searchRef}
        label="Search files"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant='standard'
      />
    </Box>

  )
}

export default SearchFiles
