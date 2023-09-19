import { Drawer, Toolbar } from "@mui/material"
import { useState } from "react"




const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const [width, setWidth] = useState('300px')

  return (
    <Drawer
      variant='persistent'
      anchor='left'
      open={open}
      sx={{
        flexShrink: 0,
        width: width,
        [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box' }
      }}
    >
      <Toolbar />
      hi
    </Drawer>
  )
}
export default Sidebar
