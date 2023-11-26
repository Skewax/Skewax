import { useMutation } from "@apollo/client"
import createFileMutation from "../../../mutations/createFileMutation"
import EntryEditor from "./EntryEditor"
import useEditor from "../../../hooks/useEditor"
import useFileWrite from "../hooks/useFileWrite"


interface CreateFileEntryProps {
  parentId: string
  open: boolean
  setOpen: (open: boolean) => void
  document: any
  base?: boolean
}

const CreateFileEntry = ({ parentId, open, base, setOpen }: CreateFileEntryProps) => {

  const { setCurrentFile } = useEditor()

  const writeToFile = useFileWrite()

  const [createFileEntry] = useMutation(createFileMutation, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    update: (cache: any, { data }: any) => {
      if (data === null) {
        return
      }
      const oldDir: any = cache.readQuery({ query: document, variables: base ? undefined : { id: parentId } })
      const newDir = {
        ...oldDir.directory,
        files: [...oldDir.directory.files, data.createFile]
      }
      cache.writeQuery({
        query: document,
        variables: base ? undefined : { id: parentId },
        data: {
          directory: newDir
        }
      })

      setCurrentFile({
        contents: '',
        name: data.createFile.name,
        editable: true,
        isPBASIC: true,
        onSave: async (contents) => {
          await writeToFile(data.createFile.id, contents)
        },
        shouldDebounce: true
      })
    }
  })
  if (!open) return null
  return (
    <EntryEditor
      defaultName={"untitled.pbasic"}
      onReturn={(name) => {
        createFileEntry({
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

export default CreateFileEntry