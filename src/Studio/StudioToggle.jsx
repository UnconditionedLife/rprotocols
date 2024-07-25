import { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ProtocolIcon from '@mui/icons-material/FormatAlignJustify';
import BundleIcon from '@mui/icons-material/MenuBook';
import { Box } from '@mui/material';


export default function StudioToggle(props) {
    const { studioSection, handleSection } = props
    const [ protocolLabel, setProtocolLabel ] = useState(false)
    const [ guideLabel, setGuideLabel ] = useState(false)
    

    useEffect(() => {
        if (studioSection === 'protocols') {
            setProtocolLabel( '#D3302F' )
            setGuideLabel( 'gray' )
        }
        if (studioSection === 'guides') {
            setGuideLabel( '#D3302F' )
            setProtocolLabel( 'gray' )
        }
    }, [ studioSection, setProtocolLabel, setGuideLabel ])

console.log()

    return (
        <Box display='flex' alignContent='center' alignSelf='center'>
            <Box style={{ paddingTop:'8px', width:'114px' }}>
                <h4 style={{ color: protocolLabel }}>PROTOCOLS</h4>
            </Box>
            <Box style={{ margin:'16px', width:'110px', alignSelf:'center', backgroundColor:'white', borderRadius:'4px' }}>
                <ToggleButtonGroup value={ studioSection } exclusive={ true } onChange={ handleSection }>
                    <ToggleButton value="protocols" color="error" size="large" > 
                        <ProtocolIcon />
                    </ToggleButton>
                    <ToggleButton value="guides" color="error" size="large" >
                        <BundleIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box style={{ paddingTop:'8px', width:'114px' }}>
                <h4 style={{ color: guideLabel }}>GUIDES</h4>
            </Box>
        </Box>
    );
}

//onClick={ (e) => { handleSection(e) }}