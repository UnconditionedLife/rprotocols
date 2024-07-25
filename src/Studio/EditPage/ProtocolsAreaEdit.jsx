import { useState, useEffect, useMemo } from 'react';
import { Box, TextField, Button, Autocomplete } from '@mui/material'
import Remove from '@mui/icons-material/DeleteForever';
import ReorderIcon from '@mui/icons-material/SwapVert';
import { Reorder } from "framer-motion"
import Accordion from '../../Accordion';
import { buildItemsForSelect, sortArrByTitle } from '../StudioFunctions';

export default function ProtocolsAreaEdit(props) {
    const { protocols, setProtocols, lang, errors, updateArrayItems, addArrayItem, 
        removeArrayItem, show, db, formState } = props
    const [ contentShow, setContentShow ] = useState( 'none' )

    useEffect(() => {
        setContentShow( show ? 'flex' : 'none')
    }, [ show ])

    function handleShow() {
        setContentShow( contentShow === 'none' ? 'flex' : 'none' )
    }
    
    // BUILDS & SORTS ARRAY OF OBJECT WITH ** majId ** & ** title **
    const sortedProtocols = useMemo(() => {
        const selectType = "Protocol"
        const protocolList = buildItemsForSelect(db, formState, selectType)
        return sortArrByTitle(protocolList, lang)
    }, [ lang, db, formState ]);

    // const selectedValue = useMemo(() => { 
    //     // return sortedItems.find((sortedNeed) => sortedNeed.majId === item.needMajId)
    //     return sortedProtocols.find((proto) => proto.majId === null )
    // }, [ sortedProtocols ]); //, item.needMajId

    // const selectedValue = useMemo(() => { 
    //     // console.log("formState.needMajId", formState.needMajId, formState)
    //     return sortedNeeds.find((sortedNeed) => sortedNeed.majId === formState.needMajId)
    // }, [ sortedNeeds, formState ]);


// console.log("sortedProtocols", sortedProtocols)

    if (!sortedProtocols) return null

    return (
        <Box display='flex' flexDirection='column' width='100%' marginTop='12px'>
            <Accordion title='Elements' show={ contentShow } handleArea={ handleShow } />
            <Box display={ contentShow } marginLeft='0px' pt={ 1 } width='calc(100% + 58px)' textAlign='left' >                    
                <Box className='formFieldContainer' textAlign='center'>
                    
                    { protocols.length > 0 &&
                        <Reorder.Group axis="y" values={protocols} onReorder={setProtocols} as='div'>
                            
                            { protocols.map((protocol, index) => (
                                <Reorder.Item key={ "proto" + index } value={protocol} as='div'>
                                    <Box key={ protocol.majId } className='formElementRow' backgroundColor='white' style={{ display:'flex', alignItems:'stretch'}}>
                                        <Box style={{ display:'flex', alignItems:'center'}}>
                                            <ReorderIcon fontSize='medium' style={{ color:'lightgray', margin:"4px", cursor: "ns-resize"}} />
                                        </Box>
                                        <Autocomplete id="item-selector" key={ sortedProtocols.majId } sx={{ width:'600px' }}
                                            options={ sortedProtocols } autoHighlight clearOnEscape
                                            value={ sortedProtocols.find((proto) => proto.majId === protocol.majId ) }
                                            getOptionLabel={(option) => { return option.title[ lang ] || '' }}
                                            onChange={(event, newValue) => {
                                                // console.log('newValue', newValue)
                                                updateArrayItems(protocols, 'proto', index, newValue, "majId") //needsList.find(need => need.majId === newValue.majId).title
                                                //(array, type, index, value, field)
                                            }}
                                            renderOption={(props, option) => ( <li {...props} key={option.majId} style={{ textAlign:'left' }}>{ option.title[lang] }</li>
                                            )}
                                            renderInput={(params) => (
                                            <TextField {...params} label="Link Existing Item" size='small' 
                                            // InputProps={{ disableUnderline: true, style: { fontSize:'1.2em', fontWeight: "300", color:'#034007', backgroundColor:'#f8f8f8' }}}
                                            />
                                
                                            )}
                                        />
                                        {/* <TextField multiline size='small' className='formElementField' style={{ marginTop:'4px' }}
                                            key={ index } label= { '#'+(parseInt(index) + parseInt(1)) } value={ element[lang] }
                                            // error={ errors?.tags?.error } helperText = { errors?.tags?.helperText }
                                            onChange={(e) => updateArrayItems( protocols, 'proto', index, e.target.value )}>
                                        </TextField> */}
                                        <Box style={{ display:'flex', alignItems:'center'}} 
                                            onClick={ () => { removeArrayItem(protocols, 'proto', index) }} >
                                            <Remove fontSize='medium' style={{ color:'lightgray', margin:"4px", cursor: "pointer"}} />
                                        </Box>
                                    </Box>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    }
                    <Button style={{ marginTop:'0px', marginBottom:'-10px'}} onClick={ () => { addArrayItem(protocols, 'proto') }}>Add Item</Button>

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