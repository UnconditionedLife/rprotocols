import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material'
import LinkIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import Accordion from '../../Accordion';
import LinkedItemsList from './LinkedItemsList';

export default function LinkedItemsArea(props) {
    const { linkedItems, lang, show, handleGoto, setAddPopup } = props
    const [ contentShow, setContentShow ] = useState( 'none' )

    useEffect(() => {
        if ( show ) 
            setContentShow('flex')
        else
            setContentShow('none')
    }, [ show ])

    function handleShow() {
        setContentShow( contentShow === 'none' ? 'flex' : 'none' )
    }

    // console.log('CHILDREN', linkedItems)

    // const key = linkedItems.length !== 0 ? linkedItems[0] : linkedItems

    return (
        <Box display='flex' flexDirection='column' width='100%' marginTop='12px'>
            <Accordion title={ 'Protocols & Sub-Needs (' + linkedItems.length + ')' } show={ contentShow } handleArea={ handleShow } />
                <Box display={ contentShow } marginLeft='20px' pt={ 1 } width='calc(100% - 40px)' 
                    textAlign='center' flexDirection='column'>
                    <Box display='flex' marginTop='-16px' width='100%' justifyContent='center' >
                        {/* <Button size="small" variant="contained" style={{ margin:'4px' }}
                                onClick={() => { setAddPopup( true ) }}
                                endIcon={ <AddIcon /> }>Add Items</Button> */}
                        
                        <Button size="small" variant="contained" style={{ marginTop:'4px', marginBottom:'10px' }}
                                onClick={() => { setAddPopup( true ) }}
                                startIcon={ <AddIcon />}
                                endIcon={ <LinkIcon /> }>Add / Link Items</Button>
                    </Box>
                    <LinkedItemsList links={ linkedItems } lang={ lang }  handleGoto={ handleGoto } />
                </Box>
        </Box>
    )
}