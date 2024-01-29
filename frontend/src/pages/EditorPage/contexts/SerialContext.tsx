import { createContext } from "react";
import SerialPort from "serialport";

interface ActiveSerialContextValue {
  connectedDevice: null | SerialPort
  disconnect: () => Promise<void>
  executeOnDevice: <T>(func: (port: SerialPort) => Promise<T>) => Promise<T>
}

interface DisabledSerialContextValue {
  connectToDevice: () => Promise<void>
}


const SerialContext = createContext<ActiveSerialContextValue | DisabledSerialContextValue | false>(false)

export default SerialContext
