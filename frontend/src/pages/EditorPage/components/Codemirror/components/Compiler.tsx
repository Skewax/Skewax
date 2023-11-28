
import React from 'react';
import useEditor from '../../../hooks/useEditor'
import pbasic from 'pbasic-tokenizer'
import { Button, Tooltip } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import useToast from '../../../hooks/useToast';
import { Severity } from '../../../contexts/ToastContext';

const Compiler = ({}) => {

    const {liveContents} = useEditor();
    const {sendToast} = useToast();

    return (
        <Button 
            onClick={() => {
                const module = pbasic.compile(liveContents);

                if (module.Error) {
                    sendToast(module.Error, Severity.Error)
                } else {
                    sendToast("Successfully compiled!", Severity.Success)
                }

                console.log(module);
            }}
        >
            <Tooltip title="Compile">
                <WorkIcon />
            </Tooltip>
        </Button>
    )

};

export default Compiler;