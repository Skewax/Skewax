import { Code, Description } from "@mui/icons-material"
import { ListItem, ListItemIcon, TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react"


interface FileEntryEditorProps {
    defaultName: string
    onReturn: (name: string) => void
    onCancel: () => void
}


const FileEntryEditor = ({ defaultName, onReturn, onCancel }: FileEntryEditorProps) => {
    const [name, setName] = useState(defaultName)

    const ref = useRef<HTMLInputElement>(null)
    useEffect(() => {
        ref.current?.focus()
    }, [])

    return (
    <ListItem>
        <ListItemIcon>
            {
            name.endsWith(".pbasic") ?
                <Code /> :
                <Description />
            }
        </ListItemIcon>
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

export default FileEntryEditor
