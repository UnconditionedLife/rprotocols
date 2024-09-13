import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import StatusBadge from "../Library/StatusBadge";
import { getItemColor, urlizeString } from "../GlobalFunctions";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";


export default function ButtonView(props) {
    const { item, handleGoto } = props;
    const [ color, setColor ] = useState('')
    const { lang } = useParams();
    const { t } = useTranslation();
    
    useEffect(() => {
        setColor(getItemColor(item.type))
    }, [ item ])

    const statusBadgeColor = '#bababa'

    return (
        <Box key={ item.minDate } className='buttonCardContainer' 
            onClick={ () => { handleGoto(`/${lang}/studio/${item.type.toLowerCase()}/${urlizeString(item.title[ lang ] || "(en) " + item.title.en )}/${item.minId}`) }}>
            <Box className='buttonCardHeader' style={{ backgroundColor: color}}>
                <span className='buttonCardHeaderText' >{ t( "studio.type" + item.type + "UC" ) }</span>
            </Box>
            <Box className='buttonCardBody' >
                <h5 style={{ fontSize:'0.8rem', lineHeight:'1.0rem', fontWeight:'500' }}>{ item.title[lang] || "(en) " + item.title.en  }</h5>
                <span style={{ color:"black", fontSize:'0.7rem', lineHeight:'1.0rem', fontWeight:'300' }}> { item.description[lang] || "(en) " + item.description.en }</span>
            </Box>
            <Box className='buttonCardFooter'>
                <Box className='buttonCardFooterBox'>
                    <StatusBadge icon='Follow' label={ t("studio.statusFollow")} count={ item?.community?.followers } color={ statusBadgeColor } size='small' />
                    
                    {/* <StatusBadge icon='Fork' label='Forks' count='99' color={ statusBadgeColor } /> */}
                    
                    { item.type !== 'Need' &&
                        <StatusBadge icon='Adopt' label={ t("studio.statusAdopt") } count={ item?.community?.adopters } color={ statusBadgeColor } size='small' />
                    }
                    {/* <StatusBadge icon='Heart' label='' count='0' color={ statusBadgeColor } /> */}
                </Box>
            </Box>
        </Box>
    )
}