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

// typeHoverDOMProvider.value = (_, text) => 
// {
//     return {dom: (<div>{'<' + text + '>'}</div>)}
// }

const Codemirror = () => {
  return (
    <Box >
      <Toolbar variant='dense' />
      <ReactCodemirror
        value={"' SKEWAX '"}
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
          keymap.of([
            ...defaultKeymap,
            ...lintKeymap,
            ...foldKeymap
          ]),

          pbasic()
        ]}
      />
    </Box>
  )
};

export default Codemirror;
