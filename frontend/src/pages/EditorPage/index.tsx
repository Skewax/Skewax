import { Box } from "@mui/material"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { CommandsProvider } from "../../contexts/useCommands"



export const EditorPage = () => {


  return (
    <CommandsProvider>
      <Navbar />
      <Box display='flex'>
        <Sidebar />
      </Box>
    </CommandsProvider>

  )
}
