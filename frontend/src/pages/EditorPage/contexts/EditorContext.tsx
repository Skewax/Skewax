import { createContext } from "react"


export interface CurrentFile {
  contents: string
  name: string
  editable: boolean
  isPBASIC: boolean
  onSave: (contents: string) => Promise<void>
  shouldDebounce: boolean
}

interface EditorContextValue {
  currentFile: CurrentFile
  setCurrentFile: (file: CurrentFile | null, id: string | null) => void
  currentFileID: string | null
}

const EditorContext = createContext<EditorContextValue>({} as EditorContextValue)

export default EditorContext


