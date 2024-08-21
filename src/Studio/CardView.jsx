import { Box, Card, CardMedia } from "@mui/material";
import { motion } from "framer-motion";
import { urlizeString } from "../GlobalFunctions";



export default function CardView(props) {
    const { item, handleGoto, lang } = props;
    
    // console.log("lang", lang)

    return (
        <Box className="card" onClick={ () => { handleGoto( `/${lang}/studio/protocol/${urlizeString(item.title[lang])}/${item.majId}` ) }}>
            <Card sx={{ height:'100%' }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={ `/guide-images/${item.iId}.jpg` }
                    title="item.title[lang]"
                />
                <Box paddingX='6px'>
                    <h5>{ item.title[ lang ] }</h5>
                    <p className='cardVersion'>- { item.verNum } -</p>
                    <span style={{ fontSize:'.9em', fontWeight:'300' }}> { item.description[ lang ] }</span>
                </Box>
            </Card>
        </Box>
    )
}