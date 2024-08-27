import { Fragment, useEffect, useState } from 'react';
import { Box } from '@mui/material'
import { getItemColor, urlizeString } from '../GlobalFunctions';
import NeedIcon from '/NeedIcon-reverse.svg';
import ProtocolIcon from '/ProtocolIcon-reverse.svg';

export default function BreadcrumbTabs({ item, relDb, db, handleGoto, prePost, lang }) {
    const [ lookup, setLookup ] = useState([])

    let links = new Array()
    
    useEffect(() => {
        // build lookup
        const idLookup = {}
        db.forEach(i => { idLookup[i.majId] = i })
        setLookup(idLookup)        
    }, [ db, item, lang ])

    if ( !item || !relDb ) return null
    
    function addTab(i){
        if (i !== null ) {
            links.push({ title: i.title[lang], majId: i.majId,
                parentNeeds: i.parentNeeds, type: i.type, 
                bgcolor: getItemColor(i.type), cursor:"pointer" })
        } else {
            links.push({ title: "NO OTHER NEEDS/PROTOCOLS", majId: "", parentNeeds: "", 
                type: "", bgcolor: "grey", cursor:"default" })
    }}

    function getNextTab(){
        const lastTab = links[links.length -1]
        if (lastTab && lastTab.parentNeeds[0] && lastTab.parentNeeds[0] !== "") {
            const nextTab = lookup[ lastTab.parentNeeds[0] ]
            return nextTab
    }}

    function doNextTab(){
        const latestTab = getNextTab()
        if (latestTab !== undefined){
            addTab(latestTab)
            if (latestTab.parentNeeds[0] !== 'ROOT') doNextTab()
    }}

    if (prePost === 'pre') {
        addTab(item) // add current item
        doNextTab()
        cleanLinkList(true)

    } else if (prePost === 'post') {
        const children = relDb.p[ item.majId ]
        if (children) {
            children.forEach( (majId) => {
                // const i = 
                // if (i.type === "Need") 
                    addTab(lookup[ majId ])
        })}
        if ( links.length === 0 ) addTab(null) // SHOW "NO OTHER NEEDS" TAB
        cleanLinkList(false)
    }

    function cleanLinkList(pop){
        // flip them around and remove the last one (current item)
        links.reverse()
        if (pop === true)links.pop()
    }
    
    function handleClick(i) {
        if (i.majId !== "")
            handleGoto( `/${lang}/studio/need/${urlizeString(i.title)}/${i.majId}` )
    }

    function getRadius(corner, i){
        if (prePost === "pre") {
            if (corner === "top") return (i === 0) ? "10% 30%" : "0"
        }
        if (prePost === "post") {
            if (corner === "bottom") return (i === links.length - 1) ? "10% 30%" : "0"
        }
        return "0"
    }

    return (
        <Fragment>
            {links.map((b, i) => (
                <Box key={ b.majId } display="flex" marginLeft="40px" borderLeft="2px solid grey" marginBottom="-4px" marginTop="4px" height='54px' bgcolor="rgba(0,0,0,0)"
                    style={{ color:"white", textAlign:"left", lineHeight:"54px", paddingLeft:"30px", cursor: b.cursor, borderTopLeftRadius:getRadius("top",i), borderBottomLeftRadius:getRadius("bottom",i)}}
                    onClick={ () => handleClick(b) } >
                    <Box style={{ marginLeft:"-42px", paddingTop:"8px", backgroundColor:"rgba(0,0,0,0)"}}>
                        { b.type === 'Need' && <img src={ NeedIcon } height='20px' alt="Need Icon" /> }
                        { b.type === 'Protocol' && <img src={ ProtocolIcon } height='22px' alt="Protocol Icon" /> }
                        { b.type === '' && <Box height="12px" width="12px" marginLeft="3px" marginTop="10px"  borderRadius="50%" 
                            backgroundColor="white" border="2px solid grey"></Box> } 
                    </Box>
                    <Box style={{ marginLeft:"15px", backgroundColor:"rgba(0,0,0,0)", color: b.bgcolor }}>
                        <b>{ b.title }</b>
                    </Box>     
                </Box>
            ))}
        </Fragment>
    )
}