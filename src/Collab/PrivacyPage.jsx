import { useState, useEffect } from 'react';
import { Box } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Quote from '../Library/Quote';
import { urlizeString } from '../GlobalFunctions';
import ReactMarkdown from 'react-markdown';
import { nowDates } from '../GlobalFunctions';

export default function PrivacyPage({ lang, db, handleGoto }) {
    const [protocol, setProtocol] = useState(null);
    const privacyPolicyMajId = "P.20240816T151315000-4430.2"

    
    useEffect(() => {
        const fullProtocol = getAllProtocols( privacyPolicyMajId )
        setProtocol(fullProtocol)
    }, [])

    function getProtocolFromDb( majId ) {
        return db.find((i) => i.majId === majId)
    }

    function getAllProtocols( majId ){
        let protocol = getProtocolFromDb( majId )

        // Check if the protocol has sub-protocols
        if (protocol && protocol.protocols && protocol.protocols.length > 0) {
            for (let i = 0; i < protocol.protocols.length; i++) {
                // Fetch and replace the sub-protocol majId with the actual protocol object
                protocol.protocols[i] = getAllProtocols(protocol.protocols[i].majId);
            }
        }
        return protocol
    }

    const ProtocolItem = ({ protocol, prefix }) => {
        return (
            <Box style={{ marginLeft:'clamp(4px, 1.8vw, 20px)', borderLeft: '1px dotted #777', borderBottom: '1px dotted #777', 
                paddingLeft: '10px' }}>
                <h4 style={{ fontSize:"1.8rem" }}>{ prefix } &nbsp;{ protocol.title[ lang ] }</h4>
                <p style={{ fontSize:"0.9rem" }}>
                    { `(v.${protocol.verNum}) ` } 
                    <OpenInNewIcon fontSize="small" style={{ cursor:"pointer" }}
                        onClick={ () => { handleGoto( `/${ lang }/studio/protocol/${ urlizeString(protocol.title[ lang ])}/${protocol.majId}` ) }}
                    />
                </p>
                <p>{ protocol.intro[ lang ] }</p>

                {protocol.elements && protocol.elements.length > 0 && (
                    <Box>
                        {/* <h4>Sub-Protocols:</h4> */}
                        {protocol.elements.map((subElement, index) => (
                            <ElementItem key={ index} element={subElement} prefix={ index + 1 } />
                        ))}
                    </Box>
                )}
    
                { protocol.protocols && protocol.protocols.length > 0 && (
                    <Box>
                        {/* <h4>Sub-Protocols:</h4> */}
                        {protocol.protocols.map((subProtocol, index) => (
                            <ProtocolItem key={ subProtocol.majId + "-" + index} protocol={subProtocol} prefix={ `${prefix}.${index + 1}` } />
                        ))}
                    </Box>
                )}

                <p style={{ marginTop:"16px", marginBottom:"20px" }}>{ protocol.closing[ lang ] }</p>
            </Box>
        )
    }

    function numberToLetter(num) {
        let result = '';
        while (num > 0) {
            num--; // Adjust to 0-based index
            let remainder = num % 26;
            result = String.fromCharCode(97 + remainder) + result; // Convert to letter
            num = Math.floor(num / 26); // Move to the next "digit"
        }
        return result;
    }

    const ElementItem = ({ element, prefix }) => {
        return (
            <Box style={{ color:"white", marginLeft:'clamp(4px, 1.8vw, 20px)', borderLeft: '1px solid #777', paddingLeft: '10px' }}>
                <ReactMarkdown style={{ color:"white !important", whiteSpace:'pre-wrap'}}>{ "**" + numberToLetter(prefix) + ")** " + element[ lang ] }</ReactMarkdown>
            </Box>
        )
    }
    
    if ( protocol === null ) return null

    return (
        <Box display="flex" flexDirection="column" width="100%">
            <h1 className='headline'>Privacy Protocols</h1>
            <span className='headline' style={{ marginTop:'-1.1em'}}><img className='headlineLogo' src="/rCollabsLogo-BlackBg.svg" alt='rCollaboratives Logo'></img></span>

            <Quote quote="Mutual respect is so important because as soon as it disappears in relations between you and the next person, there's trouble." author="Dizzy Gillespie" />

            <Box style={{ marginTop:"-100px", alignSelf:"center", maxWidth:"700px", textAlign:"left" }}>
                
                <ProtocolItem protocol={ protocol } prefix="1"/>
                <Box width='100%' textAlign='center' marginTop="30px" color="#fff" >
                    PROTOCOL ID: ({privacyPolicyMajId})<br/>
                    Output: { nowDates().ui } UTC<br/>
                    <img height="40px" style={{marginTop:"10px"}} src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-sa.png"/>
                </Box>
                
            </Box>

            <Quote quote="We must learn to live together as brothers|or perish together as fools." author="Martin Luther King Jr." />
        </Box>
    )
}
