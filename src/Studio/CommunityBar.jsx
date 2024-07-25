import { useState, useEffect } from 'react';
import { Box } from '@mui/material'
import { displayDateFromNow, getItemColor } from '../GlobalFunctions';
import StatusBadge from '../Library/StatusBadge';


export default function CommunityBar(props) {
    const { item, displayState } = props
    const [ boxColor, setBoxColor ] = useState('')
    
    useEffect(() => {
        setBoxColor(getItemColor(item.type))
    }, [ item ])

    const statusBadgeColor = boxColor

    if (!item) return null

    return (
        <Box display='flex' flexDirection='row' width='calc(100% + 16px)' height='21px'
            marginLeft='-14px' marginTop='-20px' backgroundColor={ boxColor }
            paddingTop='2px' paddingBottom='0px' paddingRight='12px' 
            textAlign='center' justifyContent='space-between' flexWrap='wrap'>
            
            { displayState !== 'add-set' &&
                <Box marginTop='1px' marginBottom='-3px' marginLeft='20px'>
                    <span className='cardClas' style={{ color: 'white', fontWeight:600}} >
                        Last updated { displayDateFromNow( item.minDate )}
                    </span></Box>
            }
            
            <Box display='flex' flexDirection='row'>
                { displayState !== 'add-set' &&
                    <StatusBadge icon='Follow' label='Follow' color={ statusBadgeColor } size='large'
                        count={ item?.community?.followers } />
                }

                {/* <StatusBadge icon='Support' label='Support' color={ statusBadgeColor } size='large' 
                    count={ item?.community?.supporters } /> */}
            
                { (item.type !== 'Need' && displayState !== 'add-set') &&
                    <StatusBadge icon='Adopt' label='Adopt' color={ statusBadgeColor } size='large'
                        count={ item?.community?.adopters } />
                }
                { (item.type !== 'Need' && displayState !== 'add-set') &&
                    <StatusBadge icon='Fork' label='Fork' color={ statusBadgeColor } size='large'
                        count={ item?.community?.forks } />
                }
            </Box>
        </Box>
    )
}