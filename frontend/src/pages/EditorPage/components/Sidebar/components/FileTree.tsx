import { useMutation, useQuery } from "@apollo/client"
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

const directoryQuery = gql(`
query Directory($id: ID!) {
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

const FileTree = () => {
  const { data } = useQuery(baseDirectoryQuery)
  const [createFile] = useMutation(createFileMutation, {
    update: (cache, {data}, {variables}) => {

      console.log('updating')
      console.log(variables)

      if (data === null || data === undefined) return
      if (variables === null) return

      const dir: any = cache.readQuery({ 
        query: directoryQuery, 
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
        query: directoryQuery, 
        variables: { id: variables?.parent as string },
        data: { directory: newDir as any } 
      })
    }
  });
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
        {
          label: "Create File named Bob",
          onClick: () => {createFile({
            variables: {
              parent: data.baseDirectory.id,
              name: "bob.pbasic", 
              contents: "bob was here!"
            }
          })}
        }
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
