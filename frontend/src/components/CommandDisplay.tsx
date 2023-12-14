import { Avatar, Stack, Typography } from "@mui/material"
import { KeyboardCapslock, KeyboardCommandKey, KeyboardOptionKey } from "@mui/icons-material"
import { OverridableComponent } from "@mui/material/OverridableComponent"

interface CommandDisplayProps {
  command: {
    modifiers: Partial<{
      Shift: boolean
      Main: boolean
      Alt: boolean
    }>
    shortcut: string
  }
}
interface KeyDisplayProps {
  Display?: OverridableComponent<any>
  text?: string
}

const KeyDisplay = ({ Display, text }: KeyDisplayProps) => {
  return (
    <Avatar variant='rounded' sx={{ height: '15px', width: '15px' }}>
      {Display && <Display sx={{ width: '10px', height: '10px' }} />}
      <Typography variant='caption'>{text?.toUpperCase()}</Typography>
    </Avatar>
  )
}

const CommandDiplay = ({ command }: CommandDisplayProps) => {

  return (
    <Stack direction='row' spacing={0.5}>
      {command.modifiers?.Main && <KeyDisplay Display={KeyboardCommandKey} />}
      {command.modifiers?.Shift && <KeyDisplay Display={KeyboardCapslock} />}
      {command.modifiers?.Alt && <KeyDisplay Display={KeyboardOptionKey} />}
      <KeyDisplay text={command.shortcut} />
    </Stack>
  )
}
export default CommandDiplay
