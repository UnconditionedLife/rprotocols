import { Box, Card, CardMedia } from "@mui/material";
import { motion } from "framer-motion";
import { urlizeString } from "../GlobalFunctions";



export default function CardView(props) {
    const { item, handleGoto, lang } = props;
    
    // console.log("lang", lang)

    const title = item.title[lang] || "(en) " + item.title.en

    return (
        <Box className="card" onClick={ () => { handleGoto( `/${lang}/studio/protocol/${urlizeString(item.title[lang] || item.title.en)}/${item.majId}` ) }}>
            <Card sx={{ height:'100%' }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={ `/guide-images/${item.iId}.jpg` }
                    title={ title }
                />
                <Box paddingX='6px'>
                    <h5>{ title }</h5>
                    <p className='cardVersion' style={{ color: "darkgray" }}>- { item.verNum } -</p>
                    <span style={{ fontSize:'.9em', fontWeight:'300' }}> { item.description[ lang ] || "(en) " + item.description.en }</span>
                </Box>
            </Card>
        </Box>
    )
}