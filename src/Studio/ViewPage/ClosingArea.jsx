import { useState, useEffect } from 'react';
import { Box } from '@mui/material'
import Accordion from '../../Accordion';
import ReactMarkdown from 'react-markdown';

export default function ClosingArea(props) {
    const { closing, lang, show } = props
    const [ contentShow, setContentShow ] = useState( 'none' )

    useEffect(() => {
        setContentShow( show ? 'flex' : 'none')
    }, [ show ])

    function handleShow() {
        setContentShow( contentShow === 'none' ? 'flex' : 'none' )
    }

    return (
        <Box className='iCardAreaContainer' >
            <Accordion title='Closing' show={ contentShow } handleArea={ handleShow } />
            <Box display={ contentShow } className='iCardAreaContentBox-col' >
                <ReactMarkdown>{ closing[ lang ] }</ReactMarkdown>
            </Box>
        </Box>
    )
}