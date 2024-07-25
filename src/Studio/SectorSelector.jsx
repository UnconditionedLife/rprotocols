import { Box, Card, CardMedia } from "@mui/material";
import { motion } from "framer-motion";
import ButtonView from "./ButtonView";
import { useEffect } from "react";

export default function SectorSelector(props) {
    const { db, sectorIndex, handleTaxonomy } = props;
    
    return (
        
        <Box>
            
            <Box display='flex' maxWidth='744px' flexWrap='wrap'>
                { (sectorIndex === null) && 
                    db.sectors.map((item, index) => (
                        <ButtonView key={item.id} item={ item } index={ index } level='sector' handleTaxonomy={ handleTaxonomy }></ButtonView>
                    ))
                }
            </Box>
        </Box>
    )
}