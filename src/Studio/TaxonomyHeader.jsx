import { useState } from "react";
import { Box, Card, CardMedia, Chip } from "@mui/material";
import ButtonView from "./ButtonView";
import { useEffect } from "react";

export default function TaxonomyHeader(props) {
    const { sectors, domains, contexts, needs, sectorIndex, domainIndex, 
        contextIndex, needIndex, handleTaxonomy } = props;
    const [ currentSector, setCurrentSector ] = useState(null)
    const [ currentDomain, setCurrentDomain ] = useState(null)
    const [ currentContext, setCurrentContext ] = useState(null)
    const [ currentNeed, setCurrentNeed ] = useState(null)
    
    
    useEffect(() => {
        if (sectorIndex !== null) { 
            setCurrentSector(sectors[sectorIndex])
        } else {
            setCurrentSector(null)
        }
    }, [ db, sectorIndex ])

    useEffect(() => {
        if (domainIndex !== null) {
            setCurrentDomain(domains[domainIndex])
        } else {
            setCurrentDomain(null)
        }
    }, [ db, domainIndex ])

    useEffect(() => {
        if (contextIndex) {
            setCurrentContext(contexts[contextIndex])
        } else {
            setCurrentContext(null)
        }
    }, [ db, contextIndex ])

    useEffect(() => {
        if (needIndex) {
            setCurrentNeed(needs[needIndex])
        } else {
            setCurrentNeed(null)
        }
    }, [ db, needIndex ])


    console.log('current sector', currentSector)
    console.log('current domain', currentDomain)

    
    return (
        <Box>
            <Box>
                { (currentSector !== null) &&
                    <Chip color='primary' size='small' label={ currentSector.name.en } 
                        onClick={ () => { handleTaxonomy('sector', null) }}/>
                }
                { (currentDomain !== null) &&
                    <Chip color='primary' label={ currentDomain.name.en } size='small'
                        onClick={ () => { handleTaxonomy('domain', null) }} />
                }
                { (currentContext !== null) &&
                    <Chip color='primary' label={ currentContext.name.en } size='small'/>
                }
                { (currentNeed !== null) &&
                    <Chip color='primary' label={ currentNeed.name.en } size='small'/>
                }
            </Box>
            <h2 className='sectionTitle'>
                { (sectorIndex === null) && 'Select Sector' }

                { (currentSector !== null) && ( currentDomain === null) && 'Select Domain' }

                { (currentSector !== null) && ( currentDomain !== null) && ( currentContext === null ) && 'Select Context' }
                    
            </h2>
        </Box>
    )
}