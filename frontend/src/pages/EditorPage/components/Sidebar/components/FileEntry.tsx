import { Code, Description } from "@mui/icons-material"
import { CircularProgress, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { FileTree_FileFragment } from "../../../../../__generated__/graphql"
import ContextMenu from "../../../../../components/ContextMenu"
import { gql } from "../../../../../__generated__"
import { useLazyQuery, useMutation } from "@apollo/client"
import useEditor from "../../../hooks/useEditor"
import { useEffect, useState } from "react"
import EntryEditor from "./EntryEditor"
import useFileWrite from "../hooks/useFileWrite"

interface FileEntryProps {
  file: FileTree_FileFragment
  parentId: string
  setCreatingFile: (creatingFile: boolean) => void
  setCreatingDirectory: (creatingDirectory: boolean) => void
}

const GetFileContentsDocument = gql(`
  query GetFileContents($id: ID!) {
    file(id: $id) {
      id
      name
      contents
      isPBASIC
      writable
    }
  }
  `)

const RenameFileMutation = gql(`
mutation RenameFile($id: ID!, $name: String!) {
  updateFile(id: $id, args: { name: $name }) {
    ...FileTree_File
  }
}
`)

const FileEntry = ({ file, setCreatingDirectory, setCreatingFile }: FileEntryProps) => {

  const { setCurrentFile, currentFileID, currentFile } = useEditor()

  const [renaming, setRenaming] = useState<boolean>(false)

  const writeFileContents = useFileWrite()

  const [getFileContents, { loading, data, error }] = useLazyQuery(GetFileContentsDocument, {
    variables: {
      id: file.id
    },
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (loading || error || data?.file === undefined || data?.file === null) return
    setCurrentFile({
      initialContents: data.file.contents,
      name: data.file.name,
      editable: data.file.writable,
      isPBASIC: data.file.isPBASIC,
      onSave: async (contents) => {
        await writeFileContents(file.id, contents)
      },
      shouldDebounce: true
    }, data.file.id)



  }, [data, loading, error])



  const [renameFile] = useMutation(RenameFileMutation, {
    update(cache, { data }) {
      if (!data?.updateFile) return
      cache.modify({
        id: cache.identify(data?.updateFile),
        fields: {
          name() {
            return data?.updateFile.name
          },
          isPBASIC() {
            return data?.updateFile.isPBASIC
          },
          writable() {
            return data?.updateFile.writable
          }
        }
      })
    }
  })

  useEffect(() => {
    if (currentFileID === file.id && currentFile.name === "Scratchpad") {
      getFileContents()
    }
  }, [currentFileID, currentFile, getFileContents, file.id])

  if (renaming) {
    return (
      <EntryEditor
        defaultName={file.name}
        onReturn={(name) => {
          renameFile({ variables: { id: file.id, name } })
          setRenaming(false)
        }}
        onCancel={() => {
          setRenaming(false)
        }}
      />
    )
  }

  return (
    <ContextMenu
      items={[
        {
          label: "Create File",
          onClick: () => { setCreatingFile(true) }
        },
        {
          label: "Create Directory",
          onClick: () => { setCreatingDirectory(true) }
        },
        {
          label: "Rename",
          onClick: () => { setRenaming(true) }
        },
        {
          label: "Delete",
          onClick: () => { }
        },
      ]}
    >

      <ListItemButton
        onClick={() => {
          getFileContents()
        }}
        selected={currentFileID === file.id}
      >
        <ListItemIcon>
          {
            file.isPBASIC ?
              <Code /> :
              <Description />
          }
        </ListItemIcon>
        <ListItemText primary={file.name} />
        <ListItemIcon>
          {
            loading ? <CircularProgress size={10} /> : null
          }
        </ListItemIcon>
      </ListItemButton>
    </ContextMenu>
  )
}

export default FileEntry
