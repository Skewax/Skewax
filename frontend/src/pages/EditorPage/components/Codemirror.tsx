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
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useIsDarkMode from '../../../hooks/useIsDarkMode'

// typeHoverDOMProvider.value = (_, text) => 
// {
//     return {dom: (<div>{'<' + text + '>'}</div>)}
// }

const Codemirror = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const boundRef = useRef(null) as any
  const [size, setSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 })

  useEffect(() => {
    function handleWindowResize() {
      setSize({
        width: boundRef.current.clientWidth,
        height: boundRef.current.clientHeight
      })
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useLayoutEffect(() => {
    setSize({
      width: boundRef.current.clientWidth,
      height: boundRef.current.clientHeight
    })
  }, [])


  const isDark = useIsDarkMode()

  return (
    <Box width={1} height={1} display='flex' flexDirection='column'>
      <Toolbar variant='dense' />
      <Box
        width={1}
        height={1}
        ref={boundRef}
        overflow='hidden'
      >
        <ReactCodemirror
          value={"' SKEWAX '"}

          theme={isDark ? 'dark' : 'light'}

          height={size.height.toString() + 'px'}
          width={size.width.toString() + 'px'}
          extensions={[
            lineNumbers(),
            dropCursor(),
            autocompletion(),
            highlightActiveLine(),
            highlightActiveLineGutter(),
            rectangularSelection(),
            history(),
            syntaxHighlighting(defaultHighlightStyle),
            drawSelection(),
            highlightSpecialChars(),
            EditorState.allowMultipleSelections.of(true),
            lintGutter(),
            codeFolding(),
            foldGutter(),
            keymap.of([...defaultKeymap, ...lintKeymap, ...foldKeymap]),
            pbasic()
          ]}
        />
      </Box>
    </Box>
  )
};

export default Codemirror;
