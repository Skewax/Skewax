import { Box, CircularProgress, Collapse, Divider, List } from "@mui/material"
import DirectoryEntry from "../DirectoryEntry"
import FileEntry from "../../FileEntry.1"
import { FileTree_DirectoryFragment, FileTree_FileFragment } from "../../../../../../../__generated__/graphql"
import CreateFileEntry from "../../CreateFileEntry"
import subfolderQuery from "../subfolderQuery"
import CreateDirectoryEntry from "../../CreateDirectoryEntry"

interface SubTreeProps {
  directory: FileTree_DirectoryFragment | undefined
  open: boolean
  creatingFile: boolean
  setCreatingFile: (creatingFile: boolean) => void
  creatingDirectory: boolean
  setCreatingDirectory: (creatingDirectory: boolean) => void
}

const SubTree = ({ directory, open, creatingFile, setCreatingFile, creatingDirectory, setCreatingDirectory }: SubTreeProps) => {

  return (
    <Collapse in={open}>
      <List disablePadding sx={{
        paddingLeft: 2,
      }}>
        <br />
        {
          directory == undefined ?
            <Box display='flex' justifyContent='center' alignItems='center' height={1} width={1}>
              <CircularProgress size={20} />
            </Box> :
            <>
              {
                directory.directories.map((subdir) =>
                  <DirectoryEntry key={subdir.id} dir={subdir} />
                )
              }
              {
                directory.files.map((file: FileTree_FileFragment) =>
                  <FileEntry
                    file={file}
                    key={file.id}
                    parentId={directory.id}
                    setCreatingFile={setCreatingFile}
                    setCreatingDirectory={setCreatingDirectory}
                  />
                )
              }
              <CreateFileEntry
                parentId={directory.id}
                open={creatingFile}
                setOpen={setCreatingFile}
                document={subfolderQuery}
              />
              <CreateDirectoryEntry
                parentId={directory.id}
                open={creatingDirectory}
                setOpen={setCreatingDirectory}
                document={subfolderQuery}
              />
            </>
        }
        <Divider />
      </List>
    </Collapse>
  )

}

export default SubTree
