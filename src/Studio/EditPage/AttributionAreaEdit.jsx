import { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material'
import Accordion from '../../Accordion';

export default function AttributionAreaEdit(props) {
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
            <Accordion title='Attribution' show={ contentShow } handleArea={ handleShow } />
            <Box display={ contentShow } marginLeft='16px' pt={ 1 } width='calc(100% - 16px)' textAlign='left' flexDirection='column'>                    
                <Box className='formFieldContainer'>
                    <TextField multiline size='small' className='formField' variant="standard"
                        label="Comment" name={ "attribComment" } value={ formState.attribComment?.[lang] || "" }
                        error={ errors?.attribComment?.error } helperText = { errors?.attribComment?.helperText }
                        InputProps={{ disableUnderline: true }}
                        onChange={ handleFieldChange }>
                    </TextField>
                </Box>
                <Box className='formFieldContainer'>
                    <TextField size='small' className='formField' variant="standard"
                        label="URL Link" name={ "attribLink" } value={ formState.attribLink || "" }
                        error={ errors?.attribLink?.error } helperText = { errors?.attribLink?.helperText }
                        InputProps={{ disableUnderline: true }}
                        onChange={ handleFieldChange }>
                    </TextField>
                </Box>
            </Box>
        </Box>
    )
}