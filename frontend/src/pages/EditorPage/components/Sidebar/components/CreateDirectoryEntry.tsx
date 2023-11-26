import { useMutation } from "@apollo/client"
import EntryEditor from "./EntryEditor"
import createDirectoryMutation from "../../../mutations/createDirectoryMutation"

interface CreateDirectoryEntryProps {
  parentId: string
  document: any
  open: boolean
  base?: boolean
  setOpen: (open: boolean) => void
}

const CreateDirectoryEntry = ({ parentId, document, open, setOpen, base }: CreateDirectoryEntryProps) => {
  const [createDirectoryEntry] = useMutation(createDirectoryMutation, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    update: (cache: any, { data }: any) => {
      if (data === null) {
        return
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const oldDir: any = cache.readQuery({ query: document, variables: base ? undefined : { id: parentId } })
      const newDir = {
        ...oldDir.directory,
        directories: [...oldDir.directory.directories, data.createDirectory]
      }
      cache.writeQuery({
        query: document,
        variables: base ? undefined : { id: parentId },
        data: {
          directory: newDir
        }
      })
    }
  })
  if (!open) return null
  return (
    <EntryEditor
      defaultName={"Untitled Folder"}
      onReturn={(name) => {
        createDirectoryEntry({
          variables: {
            name,
            parent: parentId
          }
        })
        setOpen(false)
      }}
      onCancel={() => { setOpen(false) }}
    />
  )
}

export default CreateDirectoryEntry
