import { Box, CircularProgress, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, } from "@mui/material";
import { ExpandLess, ExpandMore, Folder } from "@mui/icons-material";
import { useState } from "react";
import { gql } from "../../../../../__generated__";
import { useLazyQuery, useMutation } from "@apollo/client";
import FileEntry from "./FileEntry";
import { FileTree_FileFragment } from "../../../../../__generated__/graphql";
import ContextMenu from "../../../../../components/ContextMenu";
import FileEntryEditor from "./FileEntryEditor";

const subfolderQuery = gql(`
query Subfolder($id: ID!) {
  directory(id: $id) {
    ...FileTree_Directory
  }
}
`)

const createFileMutation = gql(`
mutation CreateFile($name: String!, $contents: String!, $parent: String!) {
  createFile(args: {name: $name, contents: $contents, parent: $parent}) {
    ...FileTree_File
  }
}
`)

const DirectoryEntry = ({ dir }: { dir: { id: string, name: string } }) => {

  const [creatingFile, setCreatingFile] = useState<boolean>(false)

  const [open, setOpen] = useState<boolean>(false)

  const [getDirectoryContents, { data }] = useLazyQuery(subfolderQuery)
  const [createFile] = useMutation(createFileMutation, {
    update: (cache, {data}, {variables}) => {

      console.log('updating')
      console.log(variables)

      if (data === null || data === undefined) return
      if (variables === null) return

      const dir: any = cache.readQuery({ 
        query: subfolderQuery, 
        variables: { id: variables?.parent as string } 
      })

      console.log(dir)

      const newDir = {
        ...dir.directory,
        files: [
          ...dir.directory.files,
          data.createFile
        ]
      }
      
      console.log(newDir)

      cache.writeQuery({
        query: subfolderQuery, 
        variables: { id: variables?.parent as string },
        data: { directory: newDir as any } 
      })
    }
  })

  return (
    <ContextMenu
      items={[
        {
          label: "Create File",
          onClick: () => { setCreatingFile(true) }
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
        {
          label: "Create File named Bob",
          onClick: () => { createFile({
            variables: {
              parent: data?.directory?.id as string,
              name: "bob.pbasic", 
              contents: "bob was here!"
            }
          }) }
        },
      ]}
    >
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
                {creatingFile && 
                  <FileEntryEditor
                    defaultName={"New File"}
                    onReturn={(name) => {
                      createFile({
                        variables: {
                          parent: data?.directory?.id as string,
                          name,
                          contents: ""
                        }
                      })
                    }}
                    onCancel={() => setCreatingFile(false)}
                  />
                }
              </>
          }
          <Divider />
        </List>
      </Collapse>
    </ContextMenu>
  )

}

export default DirectoryEntry
