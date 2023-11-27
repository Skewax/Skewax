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

const CreateFileEntry = ({ parentId, open, base, setOpen, document }: CreateFileEntryProps) => {

  const { setCurrentFile } = useEditor()

  const writeToFile = useFileWrite()

  const [createFileEntry] = useMutation(createFileMutation, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    update: (cache: any, { data }: any) => {
      if (data === null) {
        return
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const oldDir: any = cache.readQuery({ query: document, variables: base ? undefined : { id: parentId } })

      const dir = base ? oldDir.baseDirectory : oldDir.directory

      if (dir === undefined) {
        return
      }


      const newDir = {
        ...dir,
        files: [...dir.files, data.createFile]
      }

      if (base) {
        cache.writeQuery({
          query: document,
          data: {
            baseDirectory: newDir
          }
        })
      }
      else {
        cache.writeQuery({
          query: document,
          variables: { id: parentId },
          data: {
            directory: newDir
          }
        })
      }

      setCurrentFile({
        contents: '',
        name: data.createFile.name,
        editable: true,
        isPBASIC: true,
        onSave: async (contents) => {
          await writeToFile(data.createFile.id, contents)
        },
        shouldDebounce: true
      }, data.createFile.id)
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
