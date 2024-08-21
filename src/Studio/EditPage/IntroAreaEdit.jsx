import { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material'
import Accordion from '../../Accordion';

export default function IntroAreaEdit(props) {
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
            <Accordion title='Purpose' show={ contentShow } handleArea={ handleShow } />
            <Box display={ contentShow } marginLeft='16px' pt={ 1 } width='calc(100% + 16px)' textAlign='left'>                    
                <Box className='formFieldContainer'>
                    <TextField multiline size='small' className='formField' variant="standard"
                        label="" name={ "intro" } value={ formState.intro?.[lang] || "" }
                        error={ errors?.intro?.error } helperText = { errors?.intro?.helperText }
                        InputProps={{ disableUnderline: true,  sx: { fontSize: "28px" } }}
                        onChange={ handleFieldChange }>
                    </TextField>
                </Box>
            </Box>
        </Box>
    )
}