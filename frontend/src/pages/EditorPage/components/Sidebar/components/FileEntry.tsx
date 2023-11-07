import { Code, Description } from "@mui/icons-material"
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

const FileEntry = ({ file }: { file: { id: string, name: string, isPBASIC: boolean, writable: boolean } }) => {
  return (
    <ListItemButton>
      <ListItemIcon>
        {
          file.isPBASIC ?
            <Code /> :
            <Description />
        }
      </ListItemIcon>
      <ListItemText primary={file.name} />
    </ListItemButton>
  )
}

export default FileEntry
