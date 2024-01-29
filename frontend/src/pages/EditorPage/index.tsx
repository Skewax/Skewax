import { Box } from "@mui/material"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Codemirror from "./components/Codemirror"
import usePersistedState from "../../hooks/persistedState/usePersistedState"
import { useEffect } from "react"
import EditorProvider from "./contexts/EditorProvider"
import ToastProvider from "./contexts/ToastProvider"



export const EditorPage = () => {

  const [, setLastVisited] = usePersistedState("lastVisited", "/editor")
  useEffect(() => {
    setLastVisited("/editor")
  })

  return (
    <EditorProvider>
      <ToastProvider>
        <Box
          display='flex'
          position='absolute'
          top={0}
          left={0}
          height={1}
          width={1}
        >
          <Navbar />
          <Box
            display='flex'
            flexDirection='row'
            height={1}
            width={1}
          >
            <Sidebar />
            <Codemirror />
          </Box>
        </Box>
      </ToastProvider>
    </EditorProvider >

  )
}
