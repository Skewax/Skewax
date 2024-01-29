import { ReactNode } from "react";
import SerialContext from "./SerialContext";

const serial = (() => {
  if ("serial" in navigator) {
    return navigator.serial;
  }
  return null
})()


const SerialProvider = ({ children }: { children: ReactNode }) => {
  if (serial === null) return <SerialContext.Provider value={false}>{children}</SerialContext.Provider>

  return (
    <SerialContext.Provider value={{}}
  )

}
