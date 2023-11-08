import { Code, Description } from "@mui/icons-material"
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { FileTree_FileFragment } from "../../../../../__generated__/graphql"

const FileEntry = ({ file }: { file: FileTree_FileFragment }) => {
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
