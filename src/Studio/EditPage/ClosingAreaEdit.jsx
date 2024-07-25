import { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material'
import Accordion from '../../Accordion';

export default function ClosingAreaEdit(props) {
    const { formState, lang, errors, handleFieldChange, show } = props
    const [ contentShow, setContentShow ] = useState( 'none' )

    useEffect(() => {
        setContentShow( show ? 'flex' : 'none')
    }, [ show ])

    function handleShow() {
        setContentShow( contentShow === 'none' ? 'flex' : 'none' )
    }

    return (
        <Box display='flex' flexDirection='column' width='100%' marginTop='12px'>
            <Accordion title='Closing' show={ contentShow } handleArea={ handleShow } />
            <Box display={ contentShow } marginLeft='16px' pt={ 1 } width='calc(100% + 16px)' textAlign='left'>                    
                <Box className='formFieldContainer'>
                    <TextField multiline size='small' className='formField' variant="standard"
                        label="Closing" name={ "closing" } value={ formState.closing?.[lang] || "" }
                        error={ errors?.closing?.error } helperText = { errors?.closing?.helperText }
                        InputProps={{ disableUnderline: true }}
                        onChange={ handleFieldChange }>
                    </TextField>
                </Box>
            </Box>
        </Box>
    )
}