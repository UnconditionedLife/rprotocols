import { useState, useEffect } from 'react';
import { Box } from '@mui/material'
import { displayDateFromNow, getItemColor } from '../GlobalFunctions';
import StatusBadge from '../Library/StatusBadge';
import useSize from '../Library/useSize';

export default function CommunityBar(props) {
    const { item, displayState } = props
    const [ boxColor, setBoxColor ] = useState('')
    const windowSize = useSize();

    useEffect(() => {
        setBoxColor(getItemColor(item.type))
    }, [ item ])

    const statusBadgeColor = boxColor
    const isNarrow = windowSize[0] < 500 ? true : false

console.log('isNarrow', isNarrow)


    if (!item) return null
    const cLabels = {
        follow: isNarrow ? "" : "Follow",
        adopt: isNarrow ? "" : "Adopt",
        fork: isNarrow ? "" : "Fork",

    }

    return (
        <Box display='flex' flexDirection='row' width='calc(100% + 16px)' height='21px'
            marginLeft='-14px' marginTop='-20px' backgroundColor={ boxColor }
            paddingTop='2px' paddingBottom='0px' paddingRight='12px' 
            textAlign='center' justifyContent='space-between' flexWrap='wrap'>
            
            { displayState !== 'add-set' &&
                <Box className='communityUpdatedText'
                // marginTop='1px' marginBottom='-3px' marginLeft='10px'
                >
                    <span  >
                        Updated { displayDateFromNow( item.minDate )}
                    </span>
                </Box>
            }
            
            <Box display='flex' flexDirection='row'>
                { displayState !== 'add-set' &&
                    <StatusBadge icon='Follow' label={ cLabels.follow } color={ statusBadgeColor } size='large'
                        count={  0 } />
                }

                {/* <StatusBadge icon='Support' label='Support' color={ statusBadgeColor } size='large' 
                    count={ item?.community?.supporters } /> */}
            
                { (item.type !== 'Need' && displayState !== 'add-set') &&
                    <StatusBadge icon='Adopt' label={ cLabels.adopt } color={ statusBadgeColor } size='large'
                        count={ item?.community?.adopters } />
                }
                { (item.type !== 'Need' && displayState !== 'add-set') &&
                    <StatusBadge icon='Fork' label={ cLabels.fork } color={ statusBadgeColor } size='large'
                        count={ item?.community?.forks } />
                }
            </Box>
        </Box>
    )
}