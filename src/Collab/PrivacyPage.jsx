import { useState, useEffect } from 'react';
import { Box } from '@mui/material'
import Link from '@mui/icons-material/Link';
import Quote from '../Library/Quote';
import { urlizeString } from '../GlobalFunctions';
import ReactMarkdown from 'react-markdown';
import { nowDates } from '../GlobalFunctions';
import { useTranslation } from 'react-i18next';

export default function PrivacyPage({ lang, db, handleGoto }) {
    const [protocol, setProtocol] = useState(null);
    const privacyPolicyMajId = "P.20240816T151315000-4430.2"
    const { t } = useTranslation();

    
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

    const ImageWithErrorHandling = ({ src, height, alt }) => {
        const [isImageLoaded, setIsImageLoaded] = useState(true);
      
        const handleError = () => {
          setIsImageLoaded(false); // Set image visibility to false when loading fails
        };
      
        return (
          isImageLoaded && (
            <img src={ src } height={ height } alt={ alt } style={{ marginRight:"8px", marginBottom:"8px"}} onError={handleError} />
          )
        );
      };

    const ProtocolItem = ({ protocol, prefix }) => {
        const colors = ( protocol.protocols.length > 0 ) 
            ? '#bebebe, #5a5a5a' 
            : '#36d1dc, #5b86e5'

        return (
            <Box style={{ marginLeft:'clamp(4px, 1.8vw, 20px)', border: '2px dotted #777', borderRight: 'none', 
                borderRadius:"10px", paddingLeft: '10px', paddingRight: '0px', marginBottom:'8px', 
                background: `linear-gradient(135deg, ${colors})` }}>
                    
                <span >
                    <Box display="flex" 
                        onClick={ () => { handleGoto( `/${ lang }/studio/protocol/${ urlizeString(protocol.title[ lang ])}/${protocol.majId}` ) }} >
                        <Box marginRight='8px'><h4 style={{ fontSize:"1.8rem", lineHeight:'1.7rem', cursor:"pointer" }}>{ prefix }</h4></Box>
                        <Box paddingRight='6px'><h4 style={{ fontSize:"1.8rem", lineHeight:'1.7rem', cursor:"pointer" }}>{ protocol.title[ lang ] || "(en) " + protocol.title.en }</h4></Box>
                    </Box>
                    <p style={{ fontSize:"0.9rem", cursor:"pointer" }} >
                        { `(v.${protocol.verNum}) ` } 
                        <Link fontSize="small" />
                    </p>
                </span>
                <Box display="flex" paddingRight='8px'>
                    <ImageWithErrorHandling
                        src={ "/protocols/" + protocol.iId + ".webp" }
                        height="200px"
                        alt={ protocol.title[ lang ]}
                    />
                    <p>{ protocol.intro[ lang ] || "(en) " + protocol.intro.en }</p>
                </Box>

                {protocol.elements && protocol.elements.length > 0 && (
                    <Box paddingRight='8px'>
                        {/* <h4>Sub-Protocols:</h4> */}
                        {protocol.elements.map((subElement, index) => (
                            <ElementItem key={ index} element={subElement} prefix={ index + 1 } />
                        ))}
                    </Box>
                )}
    
                { protocol.protocols && protocol.protocols.length > 0 && (
                    <Box paddingRight='8px'>
                        {/* <h4>Sub-Protocols:</h4> */}
                        {protocol.protocols.map((subProtocol, index) => (
                            <ProtocolItem key={ subProtocol.majId + "-" + index} protocol={ subProtocol } prefix={ `${prefix}.${index + 1}` } />
                        ))}
                    </Box>
                )}

                <p style={{ marginTop:"16px", marginBottom:"20px" }}>{ protocol.closing[lang] === "" ? protocol.closing.en ? "(en) " + protocol.closing.en : "" : protocol.closing[lang] }</p>
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
            <Box style={{ color:"white", marginLeft:'clamp(4px, 1.8vw, 20px)', paddingLeft: '10px' }}>
                <ReactMarkdown style={{ color:"white !important", whiteSpace:'pre-wrap'}}>{ "**" + numberToLetter(prefix) + ")** " + ( element[lang] || "(en) " + element.en ) }</ReactMarkdown>
            </Box>
        )
    }
    
    if ( protocol === null ) return null

    return (
        <Box display="flex" flexDirection="column" width="100%">
            <h1 className='headline'>{ t('privacy.sectionHead') }</h1>
            <span className='headline' style={{ marginTop:'-1rem'}}><img className='headlineLogo' src="/rCollabsLogo-BlackBg.svg" alt='rCollaboratives Logo'></img></span>

            <Quote quote={ t('privacy.gillespieQuote') } author={ t('privacy.gillespieAuthor') } />

            <Box style={{ marginTop:"-30px", alignSelf:"center", maxWidth:"700px", textAlign:"left" }}>
                <ProtocolItem protocol={ protocol } prefix="1"/>
                <Box width='100%' textAlign='center' marginTop="30px" color="#fff" >
                    { t("privacy.footerProtocolId") } ({privacyPolicyMajId})<br/>
                    { t("privacy.footerOutput") } { nowDates().ui } UTC<br/>
                    <img height="40px" style={{marginTop:"10px"}} src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-sa.png"/>
                </Box>
                
            </Box>

            <Quote quote={ t('privacy.mlkQuote') } author={ t('privacy.mlkAuthor') } />
        </Box>
    )
}
