import { useState, useEffect } from 'react';
import { Box } from '@mui/material'
import Accordion from '../../Accordion';

export default function AttributionArea(props) {
    const { item, lang, show } = props
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
                <Box display={ contentShow } flexDirection='column' marginLeft='20px' pt={ 1 } 
                    width='calc(100% - 40px)' textAlign='left'>                    
                    <Box style={{ fontWeight:'500' }}>{ item.attribComment[ lang ] }</Box> 
                    <Box style={{ fontWeight:'300' }}>{ item.attribLink }</Box>
                </Box>
        </Box>
    )
}