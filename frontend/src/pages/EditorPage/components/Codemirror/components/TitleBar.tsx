import { AppBar, Avatar, Box, CircularProgress, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { Article, Check, Code } from '@mui/icons-material'
import { CurrentFile } from '../../../contexts/EditorContext'
import Compiler from './Compiler'

const TitleBar = ({ currentFile, loading }: { currentFile: CurrentFile, loading: boolean }) => {

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
        <Tooltip title={loading ? 'Saving' : 'Saved'}>
          <div>
            {
              loading ?
                <CircularProgress size={24} />
                :
                <Check />
            }
          </div>
        </Tooltip>
        <Box flexGrow={2}></Box>
        {currentFile.isPBASIC ?
          <Compiler/>: null
        }
      </Stack>
    </AppBar>
  )
}

export default TitleBar
