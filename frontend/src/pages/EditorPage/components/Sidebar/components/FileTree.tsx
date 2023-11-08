import { useQuery } from "@apollo/client"
import { gql } from "../../../../../__generated__/gql"
import { Box, CircularProgress, List } from "@mui/material"
import DirectoryEntry from "./DirectoryEntry"
import FileEntry from "./FileEntry"
import { DirectoryContentsFragment, FileTree_FileFragment } from "../../../../../__generated__/graphql"
import ContextMenu from "../../../../../components/ContextMenu"

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
  const { data } = useQuery(baseDirectoryQuery)
  if (data === undefined) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' height={1} width={1}>
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
          onClick: () => { }
        },
        {
          label: "Create Directory",
          onClick: () => { }
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
            <FileEntry file={file} key={file.id} />
          )
        }

      </List>
    </ContextMenu>
  )
}

export default FileTree
