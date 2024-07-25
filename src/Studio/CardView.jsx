import { Box, Card, CardMedia } from "@mui/material";
import { motion } from "framer-motion";



export default function CardView(props) {
    const { item, handleGoto, studioSection } = props;
    
    return (
        <motion.div
            className="card"
            onClick={ () => { handleGoto('/studio/' + studioSection + '/item.header.guideId') }}
            initial={{ height:'0px', width:'0px' }}
            whileInView={{ height:'340px', width: '240px' }}
            transition={{
                type:'spring',
                stiffness: 400,
                damping: 20,
                repeat: 0,
                // repeatType: 'mirror',
                repeatDay: 0.2,
            }}>
            

        {/* <Box className="card" onClick={ () => { handleGoto('/studio/' + studioSection + '/item.header.guideId') }}> */}
            <Card sx={{ height:'100%' }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={ "/guide-images/" + item.header.guideId + ".webp" }
                    // image={ "/guide-images/018g5743-39c2-7f01-h22d-b149a13ws84a0.webp" }
                    title="green iguana"
                />
                <Box paddingX='6px'>
                    <h5>{ item.content.title.en }</h5>
                    <p className='cardVersion'>- { item.header.version } -</p>
                    <span style={{ fontSize:'.9em', fontWeight:'300' }}> { item.header.description.en }</span>
                </Box>
            
            </Card>
            </motion.div>
        
        
    )
}