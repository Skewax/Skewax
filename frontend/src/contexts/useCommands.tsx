import { PropsWithChildren, createContext, useEffect, useState, useCallback } from "react"

export interface Command {
  id: string
  name?: string,
  shortcut?: string,
  modifiers?: Modifiers,
  description?: string,
  icon?: React.ReactNode
  onExecution: () => void
}

interface CommandContextState {
  commands: Command[]
  addCommand: (command: Command) => void
}

export const CommandsContext = createContext<CommandContextState>({
  commands: [],
  addCommand: () => { },
})

export interface Modifiers {
  Main: boolean
  Shift: boolean
  Alt: boolean
}

export function shortcutModifiers(modifierStrings: string[]): Modifiers {
  let output: Modifiers = { Main: false, Shift: false, Alt: false }
  modifierStrings.forEach((str) => {
    output = { ...output, [str]: true }
  })
  return (output)
}

export const CommandsProvider = ({ children }: PropsWithChildren) => {
  const [commands, setCommands] = useState<Command[]>([])

  const addCommand = (newCommand: Command) => {
    if (commands.find((command: Command) => command.id === newCommand.id) !== undefined) return
    const newCommandList = [...commands, newCommand]
    setCommands(newCommandList)
  }


  //handling keyboard shortcut occurences
  const [modifiers, setModifiers] = useState<Modifiers>({ Main: false, Shift: false, Alt: false })

  const keydownListener = useCallback((keydownEvent: KeyboardEvent) => {
    if (keydownEvent.key === 'Meta' || keydownEvent.key === 'Control') setModifiers({ ...modifiers, Main: true })
    else if (keydownEvent.key === 'Shift') setModifiers({ ...modifiers, Shift: true })
    else if (keydownEvent.key === 'Alt') setModifiers({ ...modifiers, Alt: true })
    else {
      commands.forEach(command => {
        if (
          command.shortcut === keydownEvent.key &&
          command.modifiers?.Shift === modifiers.Shift &&
          command.modifiers?.Alt === modifiers.Alt &&
          command.modifiers?.Main === modifiers.Main
        ) {
          keydownEvent.preventDefault()
          command.onExecution()
        }
      })
    }
  }, [modifiers, commands])

  const keyupListener = useCallback((keyupEvent: KeyboardEvent) => {
    if (keyupEvent.key === 'Meta' || keyupEvent.key === 'Control') setModifiers({ ...modifiers, Main: false })
    else if (keyupEvent.key === 'Shift') setModifiers({ ...modifiers, Shift: false })
    else if (keyupEvent.key === 'Alt') setModifiers({ ...modifiers, Alt: false })
  }, [modifiers])

  useEffect(() => {
    window.addEventListener('keydown', keydownListener, true)
    return () => window.removeEventListener('keydown', keydownListener, true)
  }, [keydownListener])
  useEffect(() => {
    window.addEventListener('keyup', keyupListener, true)
    return () => window.removeEventListener('keyup', keyupListener, true)
  }, [keydownListener])

  return (
    <CommandsContext.Provider value={{ commands, addCommand }}>
      {children}
    </CommandsContext.Provider>
  )
}


