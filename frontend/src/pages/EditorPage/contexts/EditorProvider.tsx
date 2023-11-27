import { ReactNode, useState } from "react"
import usePersistedState from "../../../hooks/persistedState/usePersistedState"
import EditorContext, { CurrentFile } from "./EditorContext"

const EditorProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {

  const [scratchpad, setScrathpad] = usePersistedState("skewaxStratchpad", "' This is your scratchpad. It only exists on this computer, but will persist between page loads.")
  const [currentFile, setCurrentFile] = useState<CurrentFile | null>(null)

  const [currentFileID, setCurrentFileID] = usePersistedState<string | null>("skewaxCurrentFileID", null)

  return (
    <EditorContext.Provider value={{
      currentFile: currentFile ?? {
        id: null,
        contents: scratchpad,
        name: "Scratchpad",
        editable: true,
        isPBASIC: true,
        onSave: async (contents) => {
          setScrathpad(contents)
        },
        shouldDebounce: true
      },
      setCurrentFile: (file) => {
        if (file === null) {
          setCurrentFileID(null)
        } else {
          setCurrentFileID(file.id)
        }
        setCurrentFile(file)
      }
    }}>
      {children}
    </EditorContext.Provider >
  )
}

export default EditorProvider
