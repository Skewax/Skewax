import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, } from "@mui/material";
import { Description, Folder } from "@mui/icons-material";
import { useState } from "react";

const DirectoryEntry = ({ dir }: { dir: { id: string, name: string } }) => {

  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <ListItemButton onClick={() => {
        setOpen(!open)
        // getSubfolder(dir.id)
      }}>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText primary={dir.name} />
      </ListItemButton>
      <Collapse in={open}>
        <List disablePadding sx={{
          paddingLeft: 2,
        }}>
          <ListItemButton>
            <ListItemIcon>
              <Description />
            </ListItemIcon>
            <ListItemText primary={"hi"} />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  )

}

export default DirectoryEntry
