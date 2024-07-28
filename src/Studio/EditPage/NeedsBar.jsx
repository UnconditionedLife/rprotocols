import { Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Cancel';
import { urlizeString } from '../../GlobalFunctions';

export default function NeedsBar(props) {
    const { parentNeeds, lang, handleEditRemoveParent, action, handleGoto, error, helperText } = props

    console.log('Array.isArray(parentNeeds)', Array.isArray(parentNeeds), parentNeeds)
    if (!Array.isArray(parentNeeds)) return null

    return (
        <Box display='flex' flexDirection='row' width='100%' justifyContent='center' 
            marginBottom='8px' flexWrap='wrap'>
            
            { parentNeeds.length > 0 && 
                parentNeeds.map((need, i) => (
                    <Box key={ i }>
                    { action === 'edit' &&
                        <Box display="flex" key={ i } className='itemNeedsBox' style={{ alignItems:'center' }}
                            onClick={ () => handleEditRemoveParent(i) }>
                            <span>{ need.title[ lang ] }</span> &nbsp;&nbsp; 
                            <DeleteIcon fontSize='12px' />
                        </Box>
                    }
                    { action === "display" &&
                        <Box display="flex" key={ i } className='itemNeedsBox' style={{ alignItems:'center' }} >
                            <span>{ need.title[ lang ] }</span>
                        </Box>
                    }

                    { action === 'link' &&
                        <Box display="flex" key={ i } className='itemNeedsBox' style={{ alignItems:'center' }}
                        onClick={ () => { handleGoto('/studio/need/' + urlizeString( need.title[ lang ] ) + "/" + need.majId) } } >
                            <span>{ need.title[ lang ] }</span>
                        </Box>
                    }
                    </Box>
            ))}
            { parentNeeds.length === 0 && 
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Box className='itemNeedsBox' textAlign='center'><span >NO PARENT NEEDS</span></Box>
                    { error &&
                        <Box color='red'>{ helperText }</Box> 
                    }
                </Box>
            }
        </Box>
    )
}