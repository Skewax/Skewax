import { Box, Drawer, IconButton, Stack, Toolbar, Tooltip } from "@mui/material"
import { useState } from "react"
import FileTree from "./components/FileTree"
import useAuth from "../../../../hooks/useAuth"
import useEditor from "../../hooks/useEditor"
import { Edit } from "@mui/icons-material"
import SearchFiles from "./components/SearchFiles"

const Sidebar = () => {

  const { setCurrentFile } = useEditor()
  const { isSignedIn } = useAuth()
  const [open,] = useState(isSignedIn)
  const [width,] = useState('250px')


  return (
    <Drawer
      variant='persistent'
      anchor='left'
      open={open}
      // keepMounted={true}

      sx={{
        flexShrink: 0,
        width: width,
        [`& .MuiDrawer-paper`]: {
          width: width,
          boxSizing: 'border-box'
        }
      }}
    >
      <Box height={1} display='flex' flexDirection='column'>
        <Toolbar variant='dense' />
        <Stack direction='column' justifyContent='space-between' overflow='hidden' height={1}>
          <SearchFiles />
          {isSignedIn &&
            <Box overflow='auto' flexGrow={3}>
              <FileTree />
            </Box>
          }
          <Box display='flex' justifyContent='center' alignItems='end' flex-grow={1}>
            <Tooltip title='Scratchpad'>
              <IconButton onClick={() => setCurrentFile(null, null)}><Edit /></IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  )
}
export default Sidebar
