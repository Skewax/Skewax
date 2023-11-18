import { ListItem, TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react"


interface DirectoryEntryEditorProps {
  defaultName: string
  onReturn: (name: string) => void
  onCancel: () => void
}


const DirectoryEntryEditor = ({ defaultName, onReturn, onCancel }: DirectoryEntryEditorProps) => {
  const [name, setName] = useState(defaultName)

  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <ListItem>
      <TextField
        inputRef={ref}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {

          if (e.key === "Escape") { onCancel() }
          if (e.key === "Enter") { onReturn(name) }

        }}
        // onBlur={() => onCancel()}
        onFocus={(event) => {
          event.target.select()
        }}
      />
    </ListItem>
  )
}

export default DirectoryEntryEditor
