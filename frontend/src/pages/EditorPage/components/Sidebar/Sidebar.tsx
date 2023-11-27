import { Box, Drawer, Grid, IconButton, Stack, TextField, Toolbar, Tooltip } from "@mui/material"
import { useState } from "react"
import FileTree from "./components/FileTree"
import useAuth from "../../../../hooks/useAuth"
import useEditor from "../../hooks/useEditor"
import { Edit } from "@mui/icons-material"

const Sidebar = () => {

  const { setCurrentFile } = useEditor()
  const { isSignedIn } = useAuth()
  const [open, setOpen] = useState(isSignedIn)
  const [width, setWidth] = useState('250px')


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
          <Box margin={1}>
            <TextField fullWidth label='Search Files' variant='standard' size='small' />
          </Box>
          {isSignedIn &&
            <Box overflow='auto' flexGrow={3}>
              <FileTree />
            </Box>
          }
          <Box display='flex' justifyContent='center' alignItems='end' flex-grow={1}>
            <Tooltip title='Scratchpad'>
              <IconButton onClick={() => setCurrentFile(null)}><Edit /></IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  )
}
export default Sidebar
