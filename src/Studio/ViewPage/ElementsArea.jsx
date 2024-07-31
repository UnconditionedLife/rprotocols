import { useEffect, useState } from 'react';
import { Box } from '@mui/material'
import Accordion from '../../Accordion';
import ReactMarkdown from 'react-markdown';

const RM = ReactMarkdown

export default function ElementsArea(props) {
    const { elements, lang, show } = props
    const [ contentShow, setContentShow ] = useState( 'none' )

    useEffect(() => {
        setContentShow( show ? 'flex' : 'none')
    }, [ show ])

    function handleShow() {
        setContentShow( contentShow === 'none' ? 'flex' : 'none' )
    }

    // return null

    return (
        <Box className='iCardAreaContainer' >
            <Accordion version='hist' title='Elements' show={ contentShow } handleArea={ handleShow } />
                <Box display={ contentShow } className='iCardAreaContentBox-col' >
                    { elements.map((element, i) => (
                        <Box key={ i } className='iCardAreaListItemRow' >
                            <Box className='iCardAreaListItemNumber'>{ i+1 }</Box>
                            <Box className='iCardAreaListItemText' >
                                <ReactMarkdown >{ element[lang] }</ReactMarkdown>
                            </Box>
                        </Box>
                    ))}
                </Box>
        </Box>
    )
}