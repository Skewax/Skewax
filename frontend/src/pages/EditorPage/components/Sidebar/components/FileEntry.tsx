import { Code, Description } from "@mui/icons-material"
import { CircularProgress, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { FileTree_FileFragment } from "../../../../../__generated__/graphql"
import ContextMenu from "../../../../../components/ContextMenu"
import { gql } from "../../../../../__generated__"
import { useLazyQuery } from "@apollo/client"
import useEditor from "../../../hooks/useEditor"

interface FileEntryProps {
  file: FileTree_FileFragment
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

const FileEntry = ({ file }: FileEntryProps) => {

  const { setCurrentFile } = useEditor()

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

        }
      })
    }
  })

  return (
    <ContextMenu
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
          label: "Rename",
          onClick: () => { }
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
