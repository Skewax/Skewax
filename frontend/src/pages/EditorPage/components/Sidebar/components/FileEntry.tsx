import { Code, Description } from "@mui/icons-material"
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { FileTree_FileFragment } from "../../../../../__generated__/graphql"
import ContextMenu from "../../../../../components/ContextMenu"

interface FileEntryProps {
  file: FileTree_FileFragment
}

const FileEntry = ({ file }: FileEntryProps) => {


  return (
    <ContextMenu
      items={[
        {
          label: "Create File",
          onClick: () => { }
        },
        {
          label: "Create Directory",
          onClick: () => { }
        },
        {
          label: "Rename",
          onClick: () => { }
        },
        {
          label: "Delete",
          onClick: () => { }
        },
      ]}
    >

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
    </ContextMenu>
  )
}

export default FileEntry
