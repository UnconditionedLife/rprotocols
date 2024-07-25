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

// console.log("Protocols", protocols)

    return (
        <Box display='flex' flexDirection='column' width='100%' marginTop='12px'>
            <Accordion title='Protocols' show={ contentShow } handleArea={ handleShow } />
            <Box display={ contentShow } marginLeft='20px' pt={ 1 } width='100%' textAlign='left' style={{ flexDirection:'column'}}>
                { protocols.map((protocol, i) => (
                    <Box key={ i } style={{  display:'flex', flexDirection:'row' }}>
                        <Box className='cardElements' 
                            style={{ width:'15px', height:'15px', marginTop:'-2px', fontWeight:600, borderRadius:'50%', 
                                border:"1px solid black", textAlign:'center' }}>{ i+1 } 
                        </Box>
                        <Box className='cardElements' style={{ fontWeight:400 }}
                            onClick={ () => { handleGoto('/studio/protocol/' + urlizeString(protocol.title[ lang ]) + protocol.minId ) }}>
                            <ReactMarkdown>{ "## " + protocol?.title?.[lang] || "" }</ReactMarkdown><br/>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}