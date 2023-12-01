import { ReactNode, useMemo, useState } from "react"
import usePersistedState from "../../../hooks/persistedState/usePersistedState"
import EditorContext, { CurrentFile } from "./EditorContext"

const scratchpad = {
  initialContents: "' This is your scratchpad. It only exists on this computer, but will persist between page loads.",
  name: "Scratchpad",
  editable: true,
  isPBASIC: true,
  onSave: async (contents: string) => {
    console.log('saving scratchpad', contents)
  },
  shouldDebounce: false
}

const EditorProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {

  const [scratchpad, setScratchpad] = usePersistedState("skewaxStratchpad", "' This is your scratchpad. It only exists on this computer, but will persist between page loads.")
  const [currentFile, setCurrentFile] = useState<CurrentFile | null>(null)

  const currentFileInEditor = useMemo(() => {
    if (currentFile !== null) return currentFile
    return {
      initialContents: scratchpad,
      name: "Scratchpad",
      editable: true,
      isPBASIC: true,
      onSave: async (contents: string) => {
        setScratchpad(contents)
      },
      shouldDebounce: false
    }
  }, [currentFile, scratchpad, setScratchpad])

  const [liveContents, setLiveContents] = useState<string>("")

  const [currentFileID, setCurrentFileID] = usePersistedState<string | null>("skewaxCurrentFileID", null)

  return (
    <EditorContext.Provider value={{
      currentFile: currentFileInEditor,
      currentFileID,
      setCurrentFile: (file, id) => {
        if (id === null) {
          setCurrentFileID(null)
          setCurrentFile(null)
          return
        }
        setCurrentFileID(id)
        setCurrentFile(file)
      },
      liveContents,
      setLiveContents,
    }}>
      {children}
    </EditorContext.Provider >
  )
}

export default EditorProvider
