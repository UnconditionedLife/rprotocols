import { Box, Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { getItemColor, urlizeString } from "../../GlobalFunctions";
import StatusBadge from "../../Library/StatusBadge";


export default function LinkedItemRow(props) {
    const { item, index, handleGoto } = props;
    const [ color, setColor ] = useState('')
    const lang = 'en'
    
    useEffect(() => {
        setColor(getItemColor(item.type))
    }, [ item ])

    const statusBadgeColor = '#bababa'

    // console.log("URL", '/studio/' + item.type.toLowerCase() + '/' + urlizeString(item.title[ lang ]) + "/" + item.minId)

    return (
        <Fragment>
            <Grid key={ item.minDate + "-" + index } {...{ xs: 12, sm: 6, md: 4, lg: 3 }} minHeight={40}>
                <span className='buttonCardHeaderText' >{ item.type.toUpperCase() }</span>
            </Grid>
            <Grid key={ item.minDate + "-" + index } {...{ xs: 12, sm: 6, md: 4, lg: 3 }} minHeight={40}>
                <h5 style={{ fontSize:'0.8em', lineHeight: '1.1em', fontWeight:'500' }}>{ item.title.en }</h5>
            </Grid>
            <Grid key={ item.minDate + "-" + index } {...{ xs: 12, sm: 6, md: 4, lg: 3 }} minHeight={40}>
                <span style={{ fontSize:'0.7em', lineHeight: '0em', fontWeight:'300' }}> { item.description.en }</span>
            </Grid>
            <Grid key={ item.minDate + "-" + index } {...{ xs: 12, sm: 6, md: 4, lg: 3 }} minHeight={40}>
                <StatusBadge icon='Follow' label='Follow' count={ item?.community?.followers } color={ statusBadgeColor } size='small' />
                    
                {/* <StatusBadge icon='Fork' label='Forks' count='99' color={ statusBadgeColor } /> */}
                                
                { item.type !== 'Need' &&
                    <StatusBadge icon='Adopt' label='Adopt' count={ item?.community?.adopters } color={ statusBadgeColor } size='small' />
                }
                {/* <StatusBadge icon='Heart' label='' count='0' color={ statusBadgeColor } /> */}

            </Grid>
        </Fragment>

        // <Box key={ item.minDate } className='buttonCardContainer' onClick={ () => { handleGoto('/studio/' + item.type.toLowerCase() + '/' + urlizeString(item.title[ lang ]) + "/" + item.minId) }}>
        //     <Box className='buttonCardHeader' style={{ backgroundColor: color}}>
        //         <span className='buttonCardHeaderText' >{ item.type.toUpperCase() }</span>
        //     </Box>
        //     <Box className='buttonCardBody' >
        //         <h5 style={{ fontSize:'0.8em', lineHeight: '1.1em', fontWeight:'500' }}>{ item.title.en }</h5>
        //         <span style={{ fontSize:'0.7em', lineHeight: '0em', fontWeight:'300' }}> { item.description.en }</span>
        //     </Box>
        //     <Box className='buttonCardFooter'>
        //         <Box className='buttonCardFooterBox'>
        //             <StatusBadge icon='Follow' label='Follow' count={ item?.community?.followers } color={ statusBadgeColor } size='small' />
                    
        //             {/* <StatusBadge icon='Fork' label='Forks' count='99' color={ statusBadgeColor } /> */}
                    
        //             { item.type !== 'Need' &&
        //                 <StatusBadge icon='Adopt' label='Adopt' count={ item?.community?.adopters } color={ statusBadgeColor } size='small' />
        //             }
        //             {/* <StatusBadge icon='Heart' label='' count='0' color={ statusBadgeColor } /> */}
        //         </Box>
        //     </Box>
        // </Box>
    )
}