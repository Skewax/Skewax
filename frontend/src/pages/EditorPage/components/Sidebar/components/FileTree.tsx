import { useMutation, useQuery } from "@apollo/client"
import { gql } from "../../../../../__generated__/gql"
import { Box, CircularProgress, List } from "@mui/material"
import DirectoryEntry from "./DirectoryEntry"
import FileEntry from "./FileEntry"
import { DirectoryContentsFragment, FileTree_DirectoryFragment, FileTree_FileFragment } from "../../../../../__generated__/graphql"
import ContextMenu from "../../../../../components/ContextMenu"
import { useEffect, useState } from "react"
import DirectoryEntryEditor from "./DirectoryEntryEditor"
// import CreateFileEntry from "./CreateFileEntry"
// import CreateDirectoryEntry from "./CreateDirectoryEntry"

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

const createDirectoryMutation = gql(`
mutation CreateDirectory($name: String!, $parent: ID!) {
  createDirectory(name: $name, parentDirectory: $parent) {
    id
    name
    files {
      ...FileTree_File
    }
    directories {
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
}
`)

const FileTree = () => {
  // const [creatingFile, setCreatingFile] = useState(false)
  const [creatingDirectory, setCreatingDirectory] = useState(false)

  const { data } = useQuery(baseDirectoryQuery)

  const [createDirectory] = useMutation(createDirectoryMutation, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    update: (cache: any, { data }: any) => {
      if (data === null) {
        return
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const oldBaseDir: any = cache.readQuery({ query: baseDirectoryQuery })
      const newBaseDir = {
        ...oldBaseDir.baseDirectory,
        directories: [
          ...oldBaseDir.baseDirectory.directories,
          {
            ...data.createDirectory,
          }
        ]
      }
      cache.writeQuery(
        {
          query: baseDirectoryQuery,
          data: {
            baseDirectory: newBaseDir
          }
        }
      )
    }
  })


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
            <FileEntry file={file} key={file.id} />
          )
        }
        {creatingDirectory &&
          <DirectoryEntryEditor
            defaultName={"Untitled Folder"}
            onReturn={(name) => {
              setCreatingDirectory(false)
              createDirectory({
                variables: {
                  name,
                  parent: data.baseDirectory.id
                }
              })
            }}
            onCancel={() => setCreatingDirectory(false)}
          />
        }

      </List>
    </ContextMenu>
  )
  // <CreateFileEntry />
}

export default FileTree
