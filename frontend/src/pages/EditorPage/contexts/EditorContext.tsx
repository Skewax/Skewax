import { createContext } from "react"


export interface CurrentFile {
  initialContents: string
  name: string
  editable: boolean
  isPBASIC: boolean
  onSave: (contents: string) => Promise<void>
  shouldDebounce: boolean
}

interface EditorContextValue {
  currentFile: CurrentFile
  liveContents: string
  setLiveContents: (contents: string) => void
  setCurrentFile: (file: CurrentFile | null, id: string | null) => void
  currentFileID: string | null
}

const EditorContext = createContext<EditorContextValue>({} as EditorContextValue)

export default EditorContext


