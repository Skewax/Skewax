import { AppBar, Avatar, Box, CircularProgress, Stack, Tooltip, Typography } from '@mui/material'
import { Article, Check, Code } from '@mui/icons-material'
import Compiler from '../Compiler'
import SerialSelector from './components/SerialSelector'
import { CurrentFile } from '../../../../contexts/EditorContext'

const TitleBar = ({ currentFile, loading }: { currentFile: CurrentFile, loading: boolean }) => {

  return (
    <AppBar
      position='relative'
      color='default'
      sx={{
        flexGrow: 3,
      }}
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
        {currentFile.isPBASIC &&
          <Stack direction='row'>
            <SerialSelector />
            <Compiler />
          </Stack>
        }
      </Stack>
    </AppBar>
  )
}

export default TitleBar
