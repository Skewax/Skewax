import { ListItemButton, ListItemIcon, ListItemText, } from "@mui/material";
import { ExpandLess, ExpandMore, Folder } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import SubTree from "./components/SubTree";
import subfolderQuery from "./subfolderQuery";
import ContextMenu from "../../../../../../components/ContextMenu";
import EntryEditor from "../EntryEditor";
import { gql } from "../../../../../../__generated__";
import usePersistedState from "../../../../../../hooks/persistedState/usePersistedState";
import useEditor from "../../../../hooks/useEditor";

const RenameDirectoryMutation = gql(`
  mutation RenameDirectory($id: ID!, $name: String!) {
    renameDirectory(id: $id, name: $name) {
      id
      name
    }
  }
`)

const DirectoryEntry = ({ dir }: { dir: { id: string, name: string } }) => {

  const [open, setOpen] = usePersistedState<boolean>('open' + dir.id, false)

  const { currentFileID } = useEditor()


  const [getDirectoryContents, { data }] = useLazyQuery(subfolderQuery)
  useEffect(() => {
    if (open && data === undefined) getDirectoryContents({
      variables: { id: dir.id },
      fetchPolicy: 'cache-and-network'
    })
  }, [open, data, getDirectoryContents, dir.id])

  const [renameDirectory] = useMutation(RenameDirectoryMutation, {
    update(cache, { data }) {
      if (!data?.renameDirectory) return
      cache.modify({
        id: cache.identify(data?.renameDirectory),
        fields: {
          name() {
            return data?.renameDirectory?.name
          }
        }
      })
    }
  })

  const [renaming, setRenaming] = useState<boolean>(false)
  const [creatingFile, setCreatingFile] = useState<boolean>(false)
  const [creatingDirectory, setCreatingDirectory] = useState<boolean>(false)

  return (
    <ContextMenu
      items={
        [
          {
            label: "Create File",
            onClick: () => {
              setOpen(true)
              setCreatingFile(true)
            }
          },
          {
            label: "Create Directory",
            onClick: () => {
              setOpen(true)
              setCreatingDirectory(true)
            }
          },
          {
            label: "Rename",
            onClick: () => { setRenaming(true) }
          },
          {
            label: "Delete",
            onClick: () => { }
          }
        ]}
    >

      {
        renaming ?
          <EntryEditor
            defaultName={dir.name}
            onReturn={(name) => {
              renameDirectory({ variables: { id: dir.id, name } })
              setRenaming(false)
            }}
            onCancel={() => {
              setRenaming(false)
            }}
          />
          : <ListItemButton
            onClick={() => {
              if (!open) setOpen(true)
              else {
                if (data?.directory?.files.find(file => file.id === currentFileID) === undefined) {
                  setOpen(false)
                }

              }
            }}
          >
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary={dir.name} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
      }
      <SubTree
        directory={data?.directory ?? undefined}
        open={open}
        creatingFile={creatingFile}
        setCreatingFile={setCreatingFile}
        creatingDirectory={creatingDirectory}
        setCreatingDirectory={setCreatingDirectory}

      />
    </ContextMenu >
  )

}

export default DirectoryEntry
