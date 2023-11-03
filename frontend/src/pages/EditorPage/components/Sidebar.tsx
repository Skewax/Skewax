import { Drawer, Toolbar } from "@mui/material"
import { useState } from "react"
import { gql } from "../../../__generated__/gql"
import { useQuery } from "@apollo/client"


const baseDirectoryQuery = gql(`
query BaseDirectory {
  baseDirectory {
    id
    name
    files {
      id
      name
      contents
    }
    directories {
      id
      name
      files {
        id
        name
      }
    }
  }
}
`)

const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const [width, setWidth] = useState('300px')

  const { data } = useQuery(baseDirectoryQuery)

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
      {
        data && data.baseDirectory.name
      }
    </Drawer>
  )
}
export default Sidebar
