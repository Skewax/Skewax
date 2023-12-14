import { ReactNode, useState } from "react";
import ToastContext, { Severity } from "./ToastContext";
import { Alert, AlertColor, Snackbar } from "@mui/material";

import GoodIcon from '@mui/icons-material/CheckOutlined';
import WarningIcon from '@mui/icons-material/WarningAmberOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import ErrorIcon from '@mui/icons-material/ErrorOutlined';

function severityToString(sev: Severity): AlertColor {
  switch (sev) {
    case Severity.Error: return "error"
    case Severity.Info: return "info"
    case Severity.Success: return "success"
    case Severity.Warning: return "warning"
  }
}

function severityToIcon(sev: Severity): any {
  switch (sev) {
    case Severity.Error: return (<ErrorIcon />)
    case Severity.Info: return (<InfoIcon />)
    case Severity.Success: return (<GoodIcon />)
    case Severity.Warning: return (<WarningIcon />)
  }
}

const ToastProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {

  const [toast, setToast] = useState<any>(null)

  return (
    <ToastContext.Provider value={{
      sendToast(msg: any, severity: Severity) {
        setToast((
          <Alert
            severity={severityToString(severity)}
            onClose={() => setToast(null)}
            icon={severityToIcon(severity)}>
            {msg.toString()}
          </Alert>
        ))
      },

      clearToasts() {
        setToast(null)
      },
    }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={toast !== null}
        autoHideDuration={4000}>
        {toast}
      </Snackbar>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
