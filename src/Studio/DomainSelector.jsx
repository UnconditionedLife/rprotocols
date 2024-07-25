import { useState, useEffect } from "react";
import { Box, Card, CardMedia } from "@mui/material";
import { motion } from "framer-motion";
import ButtonView from "./ButtonView";

export default function DomainSelector(props) {
    const { domains, sectorIndex, domainIndex, handleTaxonomy } = props;
    // const [ domains, setDomains ] = useState(null)

    
    if ( sectorIndex === null || domains === null ) return null

    return (
        <Box>
            <Box display='flex' maxWidth='744px' flexWrap='wrap'>
                { (sectorIndex !== null) && (domainIndex === null) &&
                    domains.map((item, index) => (
                        <ButtonView key={item.id} item={ item } index={ index } level='domain' handleTaxonomy={ handleTaxonomy }></ButtonView>
                    ))
                }
            </Box>
        </Box>
    )
}