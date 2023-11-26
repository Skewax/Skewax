import { Box, Drawer, IconButton, Toolbar, Tooltip } from "@mui/material"
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
      <Toolbar variant='dense' />
      <>
        {isSignedIn &&
          <Box height={1} display='flex' flexDirection='column' flex-grow={1}>
            <FileTree />
          </Box>
        }
        <Box position='absolute' bottom={0} width={1} p={1}>
          <Tooltip title='Scratchpad'>
            <IconButton onClick={() => setCurrentFile(null)}><Edit /></IconButton>
          </Tooltip>
        </Box>
      </>
    </Drawer>
  )
}
export default Sidebar
