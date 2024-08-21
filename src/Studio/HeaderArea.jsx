import { useState, useEffect } from 'react';
import { Box } from '@mui/material'
import LanguageBar from './LanguageBar';
// import NorthIcon from '@mui/icons-material/North';
import { getItemColor } from '../GlobalFunctions';

// import SvgIcon from '@mui/material';
// import ProtocolIcon from '/ProtocolIcon.svg';
import NeedIcon from '/NeedIcon-reverse.svg';
import ProtocolIcon from '/ProtocolIcon-reverse.svg';
import TagBar from './TagBar';
import CommunityBar from './CommunityBar';
import NeedsBar from './EditPage/NeedsBar';
// import BreadcrumbBar from './BreadcrumbBar';

export default function HeaderArea(props) {
    const { item, lang, handleLanguage, action, handleGoto, parentNeeds } = props
    const [ itemColor, setItemColor ] = useState('')

// console.log("HEADER ITEM", item)
// console.log("action", action)
    
    useEffect(() => {
        setItemColor(getItemColor(item.type))
    }, [ item ])

    if (!item) return null

    return (
        <Box display='flex' flexDirection='column' width='100%'>
        
            <CommunityBar item={ item } action={ action} />

            {/* <Box className='itemIconContainer' backgroundColor={ itemColor }> */}
            <Box marginTop="25px">
                { item.type === 'Need' && <img src={ NeedIcon } height='38px' alt="Need Icon" /> }
                { item.type === 'Protocol' && <img src={ ProtocolIcon } height='38px' alt="Protocol Icon" /> }
            </Box>

            { (action === 'edit' || action === 'add' || action === 'add-set' || item.parentNeeds.length === 0 ) && 
                <NeedsBar parentNeeds={ parentNeeds } lang={ lang } action="display" handleGoto={ handleGoto }/>
            }
            
            { action !== 'add-set' && 
                <Box>
                    {/* <hr width='60%' color={ itemColor } /> */}
                    <h5 style={{ fontSize:'1.4em', fontWeight:800, marginTop:'8px', color: itemColor }}>
                        { item.title?.[lang] }
                    </h5>
                    {/* <hr width='60%' color={ itemColor } /> */}
                </Box>
            }
            
            {/* <h5 className='cardClas' style={{ marginTop:'4px', fontSize:'1.0em', fontWeight: 500, color: itemColor }} >{ item.type.toUpperCase() }</h5> */}
            
            { action !== 'add-set' && 
                <span className='cardVersion' color={itemColor} style={{ fontSize:'0.9em', fontWeight:500, color:{ itemColor }, fontFamily:'monospace' }}>
                    ––&nbsp;v.{ item.verNum }&nbsp;––
                </span>
            }

            { action !== 'add-set' && 
                <LanguageBar handleLanguage={ handleLanguage } lang={ lang }/>
            }

            <span className='cardDescription'> { item.description?.[lang] || "" }</span>

            { action !== 'add-set' && 
                <TagBar tags={ item.tags?.[lang] || "" } />
            }
        </Box>
    )
}