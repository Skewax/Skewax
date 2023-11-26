import { Box } from "@mui/material"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { CommandsProvider } from "../../contexts/useCommands"
import Codemirror from "./components/Codemirror"
import usePersistedState from "../../hooks/persistedState/usePersistedState"
import { useEffect } from "react"
import EditorProvider from "./contexts/EditorProvider"



export const EditorPage = () => {

  const [, setLastVisited] = usePersistedState("lastVisited", "/editor")
  useEffect(() => {
    setLastVisited("/editor")
  })

  return (
    <EditorProvider>
      <CommandsProvider>
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
      </CommandsProvider >
    </EditorProvider >

  )
}
