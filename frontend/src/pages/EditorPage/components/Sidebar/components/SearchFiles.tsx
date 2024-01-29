import { Box, TextField } from "@mui/material"
import { useRef, useState } from "react"
import useKeyboardShortcut from "use-keyboard-shortcut"


const SearchFiles = ({ searchTerm, setSearchTerm }: { searchTerm: string, setSearchTerm: (term: string) => void }) => {

  const searchRef = useRef<HTMLElement>()


  useKeyboardShortcut(['Meta', 'F'], () => {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  },
    {
      overrideSystem: false
    }
  )

  useKeyboardShortcut(['Control', 'F'], () => {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  },
    {
      overrideSystem: false
    }
  )



  return (
    <Box margin={1}>
      <TextField
        fullWidth
        inputRef={searchRef}
        label="Search files"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant='standard'
      />
    </Box>

  )
}

export default SearchFiles
