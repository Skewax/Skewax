import { Code, Description } from "@mui/icons-material"
import { CircularProgress, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { FileTree_FileFragment } from "../../../../../__generated__/graphql"
import ContextMenu from "../../../../../components/ContextMenu"
import { gql } from "../../../../../__generated__"
import { useLazyQuery, useMutation } from "@apollo/client"
import useEditor from "../../../hooks/useEditor"
import { useState } from "react"
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
    id
    name
  }
}
`)

const FileEntry = ({ file, setCreatingDirectory, setCreatingFile }: FileEntryProps) => {

  const { setCurrentFile } = useEditor()

  const [renaming, setRenaming] = useState<boolean>(false)

  const writeFileContents = useFileWrite()

  const [getFileContents, { loading }] = useLazyQuery(GetFileContentsDocument, {
    variables: {
      id: file.id
    },
    onCompleted: (data) => {
      if (!data.file) return
      setCurrentFile({
        contents: data.file.contents,
        name: data.file.name,
        editable: data.file.writable,
        isPBASIC: data.file.isPBASIC,
        onSave: async (contents) => {
          await writeFileContents(file.id, contents)
        },
        shouldDebounce: true
      })
    }
  })

  const [renameFile] = useMutation(RenameFileMutation, {
    update(cache, { data }) {
      if (!data?.updateFile) return
      cache.modify({
        id: cache.identify(data?.updateFile),
        fields: {
          name() {
            return data?.updateFile?.name
          }
        }
      })
    }
  })

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
