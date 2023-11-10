import { Box, CircularProgress, Collapse, List, ListItemButton, ListItemIcon, ListItemText, } from "@mui/material";
import { ExpandLess, ExpandMore, Folder } from "@mui/icons-material";
import { useState } from "react";
import { gql } from "../../../../../__generated__";
import { useLazyQuery } from "@apollo/client";
import FileEntry from "./FileEntry";
import { FileTree_FileFragment } from "../../../../../__generated__/graphql";

const subfolderQuery = gql(`
query Subfolder($id: ID!) {
  directory(id: $id) {
    ...FileTree_Directory
  }
}
`)

const DirectoryEntry = ({ dir }: { dir: { id: string, name: string } }) => {

  const [open, setOpen] = useState<boolean>(false)

  const [getDirectoryContents, { data }] = useLazyQuery(subfolderQuery)

  return (
    <>
      <ListItemButton
        onClick={() => {
          if (!open) getDirectoryContents({ variables: { id: dir.id } })
          setOpen(!open)
        }}
      >
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText primary={dir.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>
        <List disablePadding sx={{
          paddingLeft: 2,
        }}>
          <br />
          {
            data?.directory == undefined ?
              <Box display='flex' justifyContent='center' alignItems='center' height={1} width={1}>
                <CircularProgress size={20} />
              </Box> :
              <>
                {
                  data.directory.directories.map((directory) =>
                    <DirectoryEntry dir={directory} />
                  )
                }
                {
                  data.directory.files.map((file: FileTree_FileFragment) =>
                    <FileEntry file={file} />
                  )
                }
              </>
          }
        </List>
      </Collapse>
    </>
  )

}

export default DirectoryEntry
