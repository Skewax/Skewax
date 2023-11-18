import ReactCodemirror from '@uiw/react-codemirror'
import { pbasic, typeHoverDOMProvider } from "pbasic-language-pack"
import { codeFolding } from "@codemirror/language"

import {
  keymap, highlightSpecialChars, drawSelection, highlightActiveLine, dropCursor,
  rectangularSelection,
  lineNumbers, highlightActiveLineGutter
} from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import {
  defaultHighlightStyle, syntaxHighlighting,
  foldGutter, foldKeymap
} from "@codemirror/language"
import { defaultKeymap, history } from "@codemirror/commands"
import { autocompletion } from "@codemirror/autocomplete"
import { lintGutter, lintKeymap } from "@codemirror/lint"
import { Box, Toolbar } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

// typeHoverDOMProvider.value = (_, text) => 
// {
//     return {dom: (<div>{'<' + text + '>'}</div>)}
// }

const Codemirror = () => {
  const boundRef = useRef()
  const [size, setSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 })
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: boundRef?.current?.clientWidth ?? 0,
        height: boundRef?.current?.clientHeight ?? 0,
      })
    }


  }, [])
  return (
    <Box width={1} height={1} >
      <Toolbar variant='dense' />
      <Box
        width={1}
        height={1}
        ref={boundRef}
        overflow='hidden'
      >
        {
          // <ReactCodemirror
          //   value={"' SKEWAX '"}
          //   height={boundHeight}
          //   width={boundWidth}
          //   extensions={[
          //     lineNumbers(),
          //     dropCursor(),
          //     autocompletion(),
          //     highlightActiveLine(),
          //     highlightActiveLineGutter(),
          //     rectangularSelection(),
          //     history(),
          //     syntaxHighlighting(defaultHighlightStyle),
          //     drawSelection(),
          //     highlightSpecialChars(),
          //     EditorState.allowMultipleSelections.of(true),
          //     lintGutter(),
          //     codeFolding(),
          //     foldGutter(),
          //     keymap.of([...defaultKeymap, ...lintKeymap, ...foldKeymap]),
          //     pbasic()
          //   ]}
          // />
        }
      </Box>
    </Box>
  )
};

export default Codemirror;
