import { useQuery } from "@apollo/client"
import { gql } from "../../../../../__generated__/gql"
import { CircularProgress } from "@mui/material"

const baseDirectoryQuery = gql(`
query BaseDirectory {
  baseDirectory {
    id
    name
    files {
      id
      name
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
  console.log("mounted")
  if (data === undefined) {
    return (
      <CircularProgress />
    )
  }
  return (
    <div>
      {
        data && data.baseDirectory.name
      }
    </div>
  )
}

export default FileTree
