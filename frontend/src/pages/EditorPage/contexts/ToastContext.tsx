import { createContext} from "react"

export enum Severity {
    Error,
    Warning,
    Success,
    Info
}

interface ToastContextValue {
    sendToast: (message: any, severity: Severity) => void
    clearToasts: () => void
}

const ToastContext = createContext<ToastContextValue>({} as ToastContextValue)

export default ToastContext