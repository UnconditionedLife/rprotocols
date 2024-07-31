import { useEffect, useState } from 'react';
import { Box } from '@mui/material'
import Accordion from '../../Accordion';
import { urlizeString } from '../../GlobalFunctions';
import ReactMarkdown from 'react-markdown';

export default function ProtocolsArea(props) {
    const { protocols, lang, show, handleGoto } = props
    const [ contentShow, setContentShow ] = useState( 'none' )

    useEffect(() => {
        setContentShow( show ? 'flex' : 'none')
    }, [ show ])

    function handleShow() {
        setContentShow( contentShow === 'none' ? 'flex' : 'none' )
    }

console.log("Protocols", protocols)

    return (
        <Box className='iCardAreaContainer' >
            <Accordion title='Protocols' show={ contentShow } handleArea={ handleShow } />
            <Box display={ contentShow } className='iCardAreaContentBox-col' >
                { protocols.map((protocol, i) => (
                    <Box key={ i } className='iCardAreaListItemRow' >
                        <Box className='iCardAreaListItemNumber' >{ i+1 }</Box>
                        <Box className='iCardAreaListItemText'
                            onClick={ () => { handleGoto('/studio/protocol/' + urlizeString(protocol.title[ lang ]) + "/" + protocol.majId ) }}>
                            <ReactMarkdown>{ "## " + protocol?.title?.[lang] || "" }</ReactMarkdown><br/>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}