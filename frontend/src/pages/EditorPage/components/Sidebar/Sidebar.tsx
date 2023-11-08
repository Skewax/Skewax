import { Drawer, Toolbar } from "@mui/material"
import { useState } from "react"
import FileTree from "./components/FileTree"
import useAuth from "../../../../hooks/useAuth"

const Sidebar = () => {

  const { isSignedIn } = useAuth()
  const [open, setOpen] = useState(isSignedIn)
  const [width, setWidth] = useState('200px')

  return (
    <Drawer
      variant='persistent'
      anchor='left'
      open={open}
      // keepMounted={true}

      sx={{
        flexShrink: 0,
        width: width,
        [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box' }
      }}
    >
      <Toolbar />
      {isSignedIn &&
        <FileTree />
      }
    </Drawer>
  )
}
export default Sidebar
