import { Box } from "@mui/material"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { CommandsProvider } from "../../contexts/useCommands"
import Codemirror from "./components/Codemirror"



export const EditorPage = () => {


  return (
    <CommandsProvider>
      <Box display='flex'>
        <Navbar />
        <Box display='flex' flexDirection='row' height={1}>
          <Sidebar />
          <Codemirror />
        </Box>
      </Box>
    </CommandsProvider>

  )
}
