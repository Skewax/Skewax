import { useMutation, useQuery } from "@apollo/client"
import { gql } from "../../../../../__generated__/gql"
import { Box, CircularProgress, List } from "@mui/material"
import DirectoryEntry from "./DirectoryEntry"
import FileEntry from "./FileEntry"
import { DirectoryContentsFragment, FileTree_FileFragment } from "../../../../../__generated__/graphql"
import ContextMenu from "../../../../../components/ContextMenu"
import { useState } from "react"
import CreateDirectoryEntry from "./CreateDirectoryEntry"
import CreateFileEntry from "./CreateFileEntry"

gql(`
fragment FileTree_File on File {
  id
  name
  isPBASIC
  writable
}
fragment FileTree_Directory on Directory {
  id
  name
  files {
    ...FileTree_File
  }
  directories {
    id
    name
  }
}
`)

const baseDirectoryQuery = gql(`
query BaseDirectory {
  baseDirectory {
    ...FileTree_Directory
  }
}
`)



const FileTree = () => {
  const [creatingFile, setCreatingFile] = useState(false)
  const [creatingDirectory, setCreatingDirectory] = useState(false)

  const { data } = useQuery(baseDirectoryQuery, {
    fetchPolicy: 'cache-and-network'
  })

  if (data === undefined) {
    return (
      <Box margin={1} display='flex' justifyContent='center' alignItems='center' height={1} width={1}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <ContextMenu
      height={1}
      items={[
        {
          label: "Create File",
          onClick: () => {
            setCreatingFile(true)
          }

        },
        {
          label: "Create Directory",
          onClick: () => {
            setCreatingDirectory(true)
          }
        },
      ]}
    >
      <List
        disablePadding
      >
        {
          data.baseDirectory.directories.map((directory: DirectoryContentsFragment) =>
            <DirectoryEntry dir={directory} key={directory.id} />
          )
        }
        {
          data.baseDirectory.files.map((file: FileTree_FileFragment) =>
            <FileEntry
              file={file}
              key={file.id}
              setCreatingFile={setCreatingFile}
              setCreatingDirectory={setCreatingDirectory}
              parentId={data.baseDirectory.id}
            />
          )
        }
        <CreateDirectoryEntry
          document={baseDirectoryQuery}
          parentId={data.baseDirectory.id}
          open={creatingDirectory}
          setOpen={setCreatingDirectory}
          base={true}
        />
        <CreateFileEntry
          document={baseDirectoryQuery}
          parentId={data.baseDirectory.id}
          open={creatingFile}
          setOpen={setCreatingFile}
          base={true}
        />

      </List>

    </ContextMenu >
  )
}

export default FileTree
