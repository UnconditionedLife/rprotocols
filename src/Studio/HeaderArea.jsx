import { useState, useEffect } from 'react';
import { Box } from '@mui/material'
import LanguageBar from './LanguageBar';
// import NorthIcon from '@mui/icons-material/North';
import { getItemColor, urlizeString } from '../GlobalFunctions';

// import SvgIcon from '@mui/material';
import ProtocolIcon from '/ProtocolIcon.svg';
import NeedIcon from '/NeedIcon.svg';
import GuideIcon from '/GuideIcon.svg';
import TagBar from './TagBar';
import CommunityBar from './CommunityBar';
import NeedsBar from './EditPage/NeedsBar';

export default function HeaderArea(props) {
    const { item, lang, handleLanguage, displayState, handleGoto, parentNeeds } = props
    const [ iconColor, setIconColor ] = useState('')

// console.log("HEADER ITEM", item)
// console.log("displayState", displayState)
    
    useEffect(() => {
        setIconColor(getItemColor(item.type))
    }, [ item ])

    if (!item) return null

    return (
        <Box display='flex' flexDirection='column' width='100%'>
        
            <CommunityBar item={ item } displayState={ displayState} />

            <Box className='itemIconContainer' backgroundColor={ iconColor }>
                { item.type === 'Need' && <img src={ NeedIcon } height='36px' alt="Need Icon" /> }
                { item.type === 'Protocol' && <img src={ ProtocolIcon } height='36px' alt="Protocol Icon" /> }
                { item.type === 'Guide' && <img src={ GuideIcon } height='28px' alt="Guide Icon" /> }
            </Box>

            { (displayState === 'edit' || displayState === 'add' || displayState === 'add-set' || item.parentNeeds.length === 0 ) && 
                <NeedsBar parentNeeds={ parentNeeds } lang={ lang } action="display" handleGoto={ handleGoto }/>
            }

            { displayState === 'view' && item.parentNeeds.length !== 0 &&
                <NeedsBar parentNeeds={ parentNeeds } lang={ lang } action="link"  handleGoto={ handleGoto }/>
            }

            { displayState !== 'add-set' && 
                <h5 style={{ marginTop:'8px', color: getItemColor(item.type) }}>
                    { item.title?.[lang] }
                </h5>
            }
            
            <h5 className='cardClas' style={{ marginTop:'4px', fontSize:'1.0em', fontWeight: 500, color: getItemColor(item.type)}} >{ item.type.toUpperCase() }</h5>
            
            { displayState !== 'add-set' && 
                <span className='cardVersion' style={{ fontSize:'1.0em', fontWeight:600 }}>
                    ––&nbsp;&nbsp;Ver. { item.verNum }&nbsp;&nbsp;––
                </span>
            }

            { displayState !== 'add-set' && 
                <LanguageBar handleLanguage={ handleLanguage } lang={ lang }/>
            }

            <span className='cardDescription'> { item.description?.[lang] || "" }</span>

            { displayState !== 'add-set' && 
                <TagBar tags={ item.tags?.[lang] || "" } />
            }
        </Box>
    )
}