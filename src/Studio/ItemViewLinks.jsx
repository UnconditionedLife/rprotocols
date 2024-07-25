import { useState } from 'react';
import { Box } from '@mui/material'
import Accordion from '../Accordion';

export default function ItemViewIntro(props) {
    const { intro, lang } = props
    const [ contentShow, setContentShow ] = useState( 'none' )

    function handleShow() {
        const newShow = contentShow === 'none' ? 'flex' : 'none';
        setContentShow( newShow )
    }

    console.log('INTRO', intro, lang)

    return (
        <Box display='flex' flexDirection='column' width='100%' marginTop='12px'>
            <Accordion title='Intro' show={ contentShow } handleArea={ handleShow } />
                <Box display={ contentShow } marginLeft='20px' pt={ 1 } width='100%' textAlign='left'>                    
                    { intro[ lang ] }
                </Box>
        </Box>
    )
}