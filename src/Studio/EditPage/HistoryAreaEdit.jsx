import { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material'
import Accordion from '../../Accordion';
import HistoryRowView from '../HistoryFieldView';
import { BuildHistoryField } from '../StudioFunctions';
// import HistoryRow from '../HistoryRow';

export default function HistoryAreaEdit(props) {
    const { minId, history, historyRecord, lang, errors, updateHistory, show } = props
    const [ contentShow, setContentShow ] = useState( 'none' )
    const [ fields, setFields ] = useState( [] )

    useEffect(() => {
        setContentShow( show ? 'flex' : 'none')
    }, [ show ])

    function handleShow() {
        setContentShow( contentShow === 'none' ? 'flex' : 'none' )
    }

    useEffect(() => {
        if (Array.isArray(history)) {
            const shortHist = []
            shortHist.unshift(history[ history.length -1])
            if (history.length > 2) shortHist.unshift(history[ 1 ])
            if (history.length > 1) shortHist.unshift(history[ 0 ])
            setFields(BuildHistoryField(shortHist, lang))
        }
    }, [ history, lang ])

    if (fields === undefined) return null

    return (
        <Box display='flex' flexDirection='column' width='100%' marginTop='12px'>
            <Accordion title='History' show={ contentShow } handleArea={ handleShow } />
            <Box display={ contentShow } marginLeft='16px' pt={ 1 } width='calc(100% + 16px)' textAlign='left'>
                <Box className='formFieldContainer'>
                    <Box className='historyGridContainer'>
                        { fields.map((field, i) => (
                            <HistoryRowView key={ 'hist-' + i } field={ field } />
                        ))}
                    </Box>

                    <Box width='100%' textAlign='center' fontSize='.8em' marginTop='8px'>{ minId }</Box>
                    
                    <TextField size='small' className='formField' required autoComplete="off" variant="standard"
                        label="Change Description" name="historyDescription" value={ historyRecord.description?.[lang] || "" }
                        error={ errors?.historyDescription?.error } helperText = { errors?.historyDescription?.helperText }
                        InputProps={{ disableUnderline: true }}
                        onChange={ updateHistory }>
                    </TextField>
                    
                </Box>
            </Box>
        </Box>
    )
}