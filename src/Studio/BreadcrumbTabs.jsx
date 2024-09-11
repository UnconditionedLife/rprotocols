import { Fragment, useEffect, useState } from 'react';
import { Box } from '@mui/material'
import { getItemColor, urlizeString } from '../GlobalFunctions';
import NeedIcon from '/NeedIcon-reverse.svg';
import ProtocolIcon from '/ProtocolIcon-reverse.svg';
import { deepClone } from '@mui/x-data-grid/internals';

export default function BreadcrumbTabs({ item, relDb, db, handleGoto, prePost, lang }) {
    const [ lookup, setLookup ] = useState([])
    const [ links, setLinks ] = useState([])
        
    // let tempLinks = [];

    // let links = new Array()
    
    // Build lookup only when 'db' changes
    useEffect(() => {
        const idLookup = db.reduce((acc, i) => {
            acc[i.majId] = i;
            return acc;
        }, {});

        // console.log("LOOKUP", idLookup)

        setLookup(idLookup);
    }, [ db ]);

    // Handle different prePost states
    useEffect(() => {
        const getNextTab = ((tempLinks) => {
            const  lastItemNum = tempLinks.length - 1
            let lastItem
            if (lastItemNum > -1 ) {
                lastItem = tempLinks[tempLinks.length - 1];
            } else {
                lastItem = null
            }

            if (lastItem && lastItem.parentNeeds && lastItem.parentNeeds[0]) {
                const majId = lastItem.parentNeeds[0]
                if (majId !== undefined && majId !== "") {
                    const nextItem = lookup[ majId ];
                    if (nextItem !== undefined) {
                        return nextItem
                    } else {
                        return null
                    }
                    
                } else {
                    return null
                }
            }
        });

        const doNextTab = ((tempLinks) => {
            const latestItem = getNextTab(tempLinks);
            if (latestItem !== null) {
                const i = latestItem
                
                if (latestItem.minId !== item.minId) {
                    tempLinks.push({
                        title: i.title[lang] || "(en) " + i.title.en,
                        majId: i.majId,
                        parentNeeds: i.parentNeeds,
                        type: i.type,
                        bgcolor: getItemColor(i.type),
                        cursor: "pointer"
                    })
                }

                if (latestItem.parentNeeds[0] !== 'ROOT') doNextTab(tempLinks);

                return tempLinks
            }
        });

        const cleanLinkList = ((tempLinks, pop) => {        
            if (tempLinks !== undefined) {
                tempLinks.reverse();
                if (pop) tempLinks.pop();
                return tempLinks
            }
        });

        if (prePost === 'pre') {
            let tempLinks = []
            const i = item
            if (i.parentNeeds[0] !== 'ROOT') {
                tempLinks.push({
                    title: i.title[lang] || "(EN) " + i.title.en,
                    majId: i.majId,
                    parentNeeds: i.parentNeeds,
                    type: i.type,
                    bgcolor: getItemColor(i.type),
                    cursor: "pointer"
                })
                
                tempLinks = doNextTab(tempLinks);
                tempLinks = cleanLinkList(tempLinks, true);
            }

            if (tempLinks !== undefined) setLinks(tempLinks)
            
        } else if (prePost === 'post') {
            let tempLinks = []
            const children = relDb.p[item.majId];
            if (children) {
                children.forEach((majId) => {
                    const newItem = lookup[majId]

                    console.log("CHILDREN LookUp", newItem)

                    if (newItem !== undefined) {
                        const i = newItem
                        tempLinks.push({
                            title: i.title[lang] || "(en) " + i.title.en,
                            majId: i.majId,
                            parentNeeds: i.parentNeeds,
                            type: i.type,
                            bgcolor: getItemColor(i.type),
                            cursor: "pointer"
                        })
                    }
                });
            }
            if (tempLinks.length === 0) {
                tempLinks.push({ title: "NO OTHER NEEDS/PROTOCOLS", majId: "", parentNeeds: "", 
                    type: "", bgcolor: "grey", cursor:"default" })
            }
            tempLinks = cleanLinkList(tempLinks, false);
            if (tempLinks !== undefined) {
                setLinks(tempLinks);
            }
        }

    },[ lookup, item, lang ]); // links, prePost, relDb

    // DO NOTHING IF NO LINKS
    if (links.length === 0) return null

    function handleClick(i) {
        if (i.majId !== "")
            handleGoto( `/${lang}/studio/need/${urlizeString(i.title)}/${i.majId}` )
    }

    function getRadius(corner, i){
        if (prePost === "pre") if (corner === "top") return (i === 0) ? "10% 30%" : "0"
        if (prePost === "post") if (corner === "bottom") return (i === links.length - 1) ? "10% 30%" : "0"
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