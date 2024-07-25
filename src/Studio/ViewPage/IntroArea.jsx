import { useState, useEffect } from 'react';
import { Box } from '@mui/material'
import Accordion from '../../Accordion';

export default function IntroArea(props) {
    const { intro, lang, show } = props
    const [ contentShow, setContentShow ] = useState( 'none' )

    useEffect(() => {
        setContentShow( show ? 'flex' : 'none')
    }, [ show ])

    function handleShow() {
        setContentShow( contentShow === 'none' ? 'flex' : 'none' )
    }

    return (
        <Box display='flex' flexDirection='column' width='100%' marginTop='12px'>
            <Accordion title='Intro' show={ contentShow } handleArea={ handleShow } />
                <Box display={ contentShow } marginLeft='20px' pt={ 1 } width='calc(100% - 40px)' textAlign='left'>                    
                    { intro[ lang ] }
                </Box>
        </Box>
    )
}