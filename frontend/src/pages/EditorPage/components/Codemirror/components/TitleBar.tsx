import { AppBar, Avatar, IconButton, Stack, Typography } from '@mui/material'
import { Article, Code } from '@mui/icons-material'
import { CurrentFile } from '../../../contexts/EditorContext'

const TitleBar = ({ currentFile }: { currentFile: CurrentFile }) => {

  return (
    <AppBar
      position='relative'
      color='default'
    >
      <Stack
        direction='row'
        m={1}
        spacing={2}
        display='flex'
        alignItems='center'
      >
        {
          currentFile.isPBASIC ?
            <Avatar sx={{ width: 32, height: 32 }}>
              <Code fontSize='small' />
            </Avatar>
            :
            <Avatar sx={{ width: 32, height: 32 }}>
              <Article fontSize='small' />
            </Avatar>
        }
        <Typography variant='h6' align='center' >
          {currentFile.name}
        </Typography>
      </Stack>
    </AppBar>
  )
}

export default TitleBar
