import { useTheme } from "@mui/material";

const useIsDarkMode = () => {
  const theme = useTheme()
  return theme.palette.mode === 'dark'
}

export default useIsDarkMode
