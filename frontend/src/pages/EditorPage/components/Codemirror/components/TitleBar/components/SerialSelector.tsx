import { Button, Tooltip } from "@mui/material";

const serial = (() => {
  if ("serial" in navigator) {
    return navigator.serial;
  }
  return null
})()


const SerialSelector = () => {

  if (serial === null) {
    return null // add message about browser not supporting
  }

  return (
    <Button
      variant='contained'
      onClick={() => {
        if (serial) {
          serial.requestPort().then((port) => {
            console.log(port)
          })
        }
      }
      }
    >Serial</Button>
  )

}

export default SerialSelector
