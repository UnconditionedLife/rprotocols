import { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material'
import Accordion from '../../Accordion';
import NeedSelector from './NeedSelector';

export default function HeaderAreaEdit(props) {
    const { formState, errors, lang, handleFieldChange, handleParentChange, show, needsList } = props
    const [ contentShow, setContentShow ] = useState( 'none' )

    useEffect(() => {
        setContentShow( show ? 'flex' : 'none')
    }, [ show ])

    function handleShow() {
        setContentShow( contentShow === 'none' ? 'flex' : 'none' )
    }

    return (
        <Box display='flex' flexDirection='column' width='100%' marginTop='12px'>
            <Accordion title='Header' show={ contentShow } handleArea={ handleShow } />
            <Box display={ contentShow } marginLeft='16px' pt={ 1 } width='calc(100% - 16px)' textAlign='left' flexDirection='column'>                    
                
                <Box className='formFieldContainer'>
                    <NeedSelector formState={ formState } needsList={ needsList } handleParentChange={ handleParentChange } lang={ lang } />
                </Box>

                <Box className='formFieldContainer'>
                    <TextField className='formField' variant="standard" size='small' required
                        label="Title" name={ "title" } value={ formState.title[lang] || "" }
                        error={ errors?.title?.error } helperText = { errors?.title?.helperText }
                        InputProps={{ disableUnderline: true }} onChange={ handleFieldChange } 
                    />
                </Box>
                <Box className='formFieldContainer'>
                    <TextField multiline size='small' className='formField' required variant="standard"
                        label="Description" name={ "description" } value={ formState?.description[lang] || "" }
                        error={ errors?.description?.error } helperText = { errors?.description?.helperText }
                        InputProps={{ disableUnderline: true }} 
                        onChange={ handleFieldChange }
                    />
                </Box>
                <Box className='formFieldContainer'>
                    <TextField multiline size='small' className='formField' required variant="standard"
                        label="Tags (separated by commas)" name={ "tags" } value={ formState.tags?.[lang] || ""}
                        error={ errors?.tags?.error } helperText = { errors?.tags?.helperText }
                        InputProps={{ disableUnderline: true }}
                        onChange={ handleFieldChange }>
                    </TextField>
                </Box>

            </Box>
        </Box>
    )
}