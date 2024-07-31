import { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material'
import Remove from '@mui/icons-material/DeleteForever';
import ReorderIcon from '@mui/icons-material/SwapVert';
import { Reorder } from "framer-motion" 
import Accordion from '../../Accordion';
// import RichTextEditor from './RichTextEditor';

export default function ElementsAreaEdit(props) {
    const { elements, setElements, lang, errors, updateArrayItems, addArrayItem, removeArrayItem, show } = props
    const [ contentShow, setContentShow ] = useState( 'none' )

    useEffect(() => {
        setContentShow( show ? 'flex' : 'none')
    }, [ show ])

    function handleShow() {
        setContentShow( contentShow === 'none' ? 'flex' : 'none' )
    }

    return (
        <Box display='flex' flexDirection='column' width='100%' marginTop='12px'>
            <Accordion title='Elements' show={ contentShow } handleArea={ handleShow } />
            <Box display={ contentShow } marginLeft='0px' pt={ 1 } width='calc(100% + 58px)' textAlign='left' >                    
                <Box className='formFieldContainer' textAlign='center'>
                    
                { elements.length > 0 &&
                        <Reorder.Group axis="y" values={elements} onReorder={setElements} as='div'>
                            
                            { elements.map((element, index) => (
                                <Reorder.Item key={element.id} value={element} as='div'>
                                    <Box key={ element.id } className='formElementRow' backgroundColor='white' style={{ display:'flex', alignItems:'stretch'}}>
                                        <Box style={{ display:'flex', alignItems:'center'}}>
                                                <ReorderIcon fontSize='medium' style={{ color:'lightgray', margin:"4px", cursor: "ns-resize"}} />
                                        </Box>
                                        <TextField multiline size='small' className='formElementField' variant="standard"
                                            key={ index } 
                                            label= { "Element #" + (index + 1) } 
                                            value={ element[lang] }
                                            InputProps={{ disableUnderline: true }}
                                            // error={ errors?.tags?.error } helperText = { errors?.tags?.helperText }
                                            onChange={(e) => updateArrayItems( elements, 'elem', index, e.target.value )}>
                                        </TextField>
                                        <Box style={{ display:'flex', alignItems:'center'}}
                                            onClick={ () => { removeArrayItem( elements, 'elem', index ) }} >
                                            <Remove fontSize='medium' style={{ color:'lightgray', margin:"4px", marginTop:"0px", cursor: "pointer"}} />
                                        </Box>
                                    </Box>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    }
                    <Button style={{ marginTop:'0px', marginBottom:'-10px'}} onClick={ () => { addArrayItem(elements, 'elem') }}>Add Item</Button>



                </Box>
            </Box>
        </Box>
    )
}

{/* <TextField multiline size='small' className='formField'
                        label="Introduction" name={ "intro" } value={ formState.intro?.[lang] || "" }
                        error={ errors?.intro?.error } helperText = { errors?.intro?.helperText }
                        inputProps={{ style: { fontSize:'0.95em', fontWeight: "300", color:'darkgreen' } }}
                        onChange={ handleChange }>
                    </TextField> */}