import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import StatusBadge from "../Library/StatusBadge";
import { getItemColor, urlizeString } from "../GlobalFunctions";


export default function ButtonView(props) {
    const { item, handleGoto } = props;
    const [ color, setColor ] = useState('')
    const lang = 'en'
    
    useEffect(() => {
        setColor(getItemColor(item.type))
    }, [ item ])

    const statusBadgeColor = '#bababa'

    // console.log("URL", '/studio/' + item.type.toLowerCase() + '/' + urlizeString(item.title[ lang ]) + "/" + item.minId)

    return (
        <Box className='buttonCardContainer' onClick={ () => { handleGoto('/studio/' + item.type.toLowerCase() + '/' + urlizeString(item.title[ lang ]) + "/" + item.minId) }}>
            <Box className='buttonCardHeader' style={{ backgroundColor: color}}>
                <span className='buttonCardHeaderText' >{ item.type.toUpperCase() }</span>
            </Box>
            <Box className='buttonCardBody' >
                <h5 style={{ fontSize:'1em', fontWeight:'500' }}>{ item.title.en }</h5>
                <span style={{ fontSize:'.8em', fontWeight:'300' }}> { item.description.en }</span>
            </Box>
            <Box className='buttonCardFooter'>
                <Box className='buttonCardFooterBox'>
                    <StatusBadge icon='Follow' label='Follow' count={ item?.community?.followers } color={ statusBadgeColor } size='small' />
                    
                    {/* <StatusBadge icon='Fork' label='Forks' count='99' color={ statusBadgeColor } /> */}
                    
                    { item.type !== 'Need' &&
                        <StatusBadge icon='Adopt' label='Adopt' count={ item?.community?.adopters } color={ statusBadgeColor } size='small' />
                    }
                    {/* <StatusBadge icon='Heart' label='' count='0' color={ statusBadgeColor } /> */}
                </Box>
            </Box>
        </Box>
    )
}