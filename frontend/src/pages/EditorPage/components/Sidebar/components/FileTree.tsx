import { useQuery } from "@apollo/client"
import { gql } from "../../../../../__generated__/gql"
import { Box, CircularProgress, List } from "@mui/material"
import DirectoryEntry from "./DirectoryEntry"
import FileEntry from "./FileEntry"
import { DirectoryContentsFragment, FileTree_FileFragment } from "../../../../../__generated__/graphql"

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
  )
}

export default FileTree
