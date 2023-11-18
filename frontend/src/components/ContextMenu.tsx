import { Box, BoxProps, Menu, MenuItem } from "@mui/material"
import { useEffect, useMemo, useState } from "react"

interface ContextMenuItem {
  label: string
  onClick: () => void
  disabled?: boolean
}

interface ContextMenuProps extends BoxProps {
  children: React.ReactNode | React.ReactNode[]
  items: ContextMenuItem[]
}



const ContextMenu = ({ children, items, ...boxProps }: ContextMenuProps) => {

  const [contextMenu, setContextMenu] = useState<null | {
    mouseY: number,
    mouseX: number
  }>(null)

  const menuItems = useMemo(() =>
    items.map((item) => (
      <MenuItem key={item.label} onClick={item.onClick} disabled={item.disabled}>{item.label}</MenuItem>
    ))
    , [items])

  return (
    <Box
      {...boxProps}
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setContextMenu(
          contextMenu === null
            ? {
              mouseX: e.clientX + 2,
              mouseY: e.clientY - 6,
            }
            : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
            // Other native context menus might behave different.
            // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
            null,
        );
      }}
    >
      {children}
      < Menu
        open={contextMenu !== null}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        onClose={() => { setContextMenu(null) }}
        onClick={() => { setContextMenu(null) }}

      >
        {menuItems}
      </Menu >
    </Box >
  )
}

export default ContextMenu 
