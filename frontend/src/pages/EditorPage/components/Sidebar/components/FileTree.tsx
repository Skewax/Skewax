import { useQuery } from "@apollo/client"
import { gql } from "../../../../../__generated__/gql"
import { Box, CircularProgress, List } from "@mui/material"
import DirectoryEntry from "./DirectoryEntry"
import FileEntry from "./FileEntry"

const baseDirectoryQuery = gql(`
query BaseDirectory {
  baseDirectory {
    id
    name
    files {
      id
      name
      isPBASIC 
      writable
    }
    directories {
      id
      name
    }
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
        data.baseDirectory.directories.map((directory) =>
          <DirectoryEntry dir={directory} />
        )
      }
      {
        data.baseDirectory.files.map((file) =>
          <FileEntry file={file} />
        )
      }

    </List>
  )
}

export default FileTree
