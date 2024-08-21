import { useEffect, useState } from 'react';
import { Box } from '@mui/material'
import Accordion from '../../Accordion';
import { urlizeString } from '../../GlobalFunctions';
import ReactMarkdown from 'react-markdown';

export default function ProtocolsArea(props) {
    const { protocols, lang, show, handleGoto, db } = props
    const [ contentShow, setContentShow ] = useState( 'none' )

    useEffect(() => {
        setContentShow( show ? 'flex' : 'none')
    }, [ show ])

    function handleShow() {
        setContentShow( contentShow === 'none' ? 'flex' : 'none' )
    }

    const displayProtocols = []
    protocols.forEach((p) => {
        const item = db.find((i) => i.majId === p.majId) 
        if (item) {
            displayProtocols.push(item) 
        } else {
            const temp = { ...p }
            temp.verNum = ""
            temp.description = { en: "", es: "", pt: "" }
            displayProtocols.push(temp)
        }
    })

    return (
        <Box className='iCardAreaContainer' >
            <Accordion title='Sub-Protocols' show={ contentShow } handleArea={ handleShow } />
            <Box display={ contentShow } className='iCardAreaContentBox-col' >
                { displayProtocols.map((p, i) => (
                    <Box key={ i } className='iCardAreaListItemRow' >
                        <Box className='iCardAreaListItemNumber' >{ i+1 }</Box>
                        <Box className='iCardAreaListItemText'
                            onClick={ () => { handleGoto(`/${lang}/studio/protocol/${urlizeString(p.title[ lang ])}/${p.majId}` ) }}>
                            <ReactMarkdown>{ `## ${p?.title?.[lang]} - v.${ p.verNum } \n${ p.description[lang] }`  }</ReactMarkdown><br/>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}