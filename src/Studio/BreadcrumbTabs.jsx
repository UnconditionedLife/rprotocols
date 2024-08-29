import { Fragment, useEffect, useState, useCallback } from 'react';
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

        console.log("LOOKUP", idLookup)

        setLookup(idLookup);
    }, [ db ]);

    // Function to add a new tab to the links list
//     const addTab = useCallback((i) => {
//         console.log("BREADCRUMBS ADD ITEM", i )

//         if (i !== null || i!== undefined ) {
//             tempLinks.push({
//                 title: i.title[lang],
//                 majId: i.majId,
//                 parentNeeds: i.parentNeeds,
//                 type: i.type,
//                 bgcolor: getItemColor(i.type),
//                 cursor: "pointer"
//             })
//         } else {
//             tempLinks.push({
//                 title: "NO OTHER NEEDS/PROTOCOLS",
//                 majId: "",
//                 parentNeeds: "",
//                 type: "",
//                 bgcolor: "grey",
//                 cursor: "default"
//             })
//         }

// console.log("ADD TEMP LINKS", tempLinks)


//     }, [lang]);



//     const getNextTab = useCallback(() => {

// console.log("GET NEXT TEMPLINKS", tempLinks)
//         const lastItem = tempLinks[tempLinks.length - 1];

// console.log("GET NEXT LASTTAB", lastItem)

//         if (lastItem && lastItem.parentNeeds && lastItem.parentNeeds[0]) {

//             console.log("GET NEXT PASSED CONDITIONS")

//             return lookup[lastItem.parentNeeds[0]];
//         }
//     }, [tempLinks, lookup]);




//     const doNextTab = useCallback(() => {
//         const latestItem = getNextTab();

// console.log("NEXT TAB", latestItem)

//         if (latestItem) {
//             addTab(latestItem);
//             if (latestItem.parentNeeds[0] !== 'ROOT') doNextTab();
//         }
//     }, [ addTab, getNextTab ]);




    // Handle different prePost states
    useEffect(() => {

        console.log("IN BUILD BREADCRUMB LINKS")
        const getNextTab = ((tempLinks) => {

// console.log("GET NEXT TEMPLINKS", tempLinks)
                    const  lastItemNum = tempLinks.length - 1
                    let lastItem
                    if (lastItemNum > -1 ) {
                        lastItem = tempLinks[tempLinks.length - 1];
                    } else {
                        lastItem = null
                    }
            
// console.log("GET NEXT LASTITEM", lastItem)
    
            if (lastItem && lastItem.parentNeeds && lastItem.parentNeeds[0]) {
    
                // console.log("GET NEXT PASSED CONDITIONS")

                const majId = lastItem.parentNeeds[0]

                // console.log("MAJID", majId)

                if (majId !== undefined && majId !== "") {
                     const nextItem = lookup[ majId ];

                    //  console.log("FULL ITEM", nextItem)

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
    
    // console.log("NEXT TAB", latestItem)
    
            if (latestItem !== null) {
                // addTab(latestItem);
                const i = latestItem
                tempLinks.push({
                    title: i.title[lang],
                    majId: i.majId,
                    parentNeeds: i.parentNeeds,
                    type: i.type,
                    bgcolor: getItemColor(i.type),
                    cursor: "pointer"
                })
                if (latestItem.parentNeeds[0] !== 'ROOT') { 
                    // if not root go again
                    doNextTab(tempLinks);
                } else {
                    // if next one is root then add it
                    tempLinks.push({
                        title: i.title[lang],
                        majId: i.majId,
                        parentNeeds: i.parentNeeds,
                        type: i.type,
                        bgcolor: getItemColor(i.type),
                        cursor: "pointer"
                    })
                }
                return tempLinks
            }
        });

        const cleanLinkList = ((tempLinks, pop) => {

            // console.log("PRE CLEAN", tempLinks)
            
            if (tempLinks !== undefined) {
                tempLinks.reverse();
                if (pop) tempLinks.pop();
                return tempLinks
            }

            // console.log("POST CLEAN", tempLinks)

        });

        if (prePost === 'pre') {
            let tempLinks = []
            const i = item
            tempLinks.push({
                title: i.title[lang],
                majId: i.majId,
                parentNeeds: i.parentNeeds,
                type: i.type,
                bgcolor: getItemColor(i.type),
                cursor: "pointer"
            })

            console.log("TEMPLINKS", tempLinks)
            
            tempLinks = doNextTab(tempLinks);
            tempLinks = cleanLinkList(tempLinks, true);

            if (tempLinks !== undefined) setLinks(tempLinks)
            
        } else if (prePost === 'post') {
            let tempLinks = []

            const children = relDb.p[item.majId];

            console.log("CHILDREN IN POST", children)

            if (children) {
                children.forEach((majId) => {
                    const newItem = lookup[majId]

                    console.log("CHILDREN LookUp", newItem)

                    if (newItem !== undefined) {
                        const i = newItem
                        tempLinks.push({
                            title: i.title[lang],
                            majId: i.majId,
                            parentNeeds: i.parentNeeds,
                            type: i.type,
                            bgcolor: getItemColor(i.type),
                            cursor: "pointer"
                        })
                    // addTab(lookup[majId]);
                    }
                });
            }
            if (tempLinks.length === 0) {
                // addTab(null);
                tempLinks.push({ title: "NO OTHER NEEDS/PROTOCOLS", majId: "", parentNeeds: "", 
                    type: "", bgcolor: "grey", cursor:"default" })
            }
            tempLinks = cleanLinkList(tempLinks, false);
            // cleanLinkList(false);
            if (tempLinks !== undefined) {
                setLinks(tempLinks);
            }
        }

    },[ lookup, item, lang ]); // links, prePost, relDb


    

    // // useEffect(() => {
    //     if (prePost === 'pre') {
    //         addTab(item) // add current item
    //         doNextTab()
    //         cleanLinkList(true)

    //     } else if (prePost === 'post') {
    //         const children = relDb.p[ item.majId ]
    //         if (children) {
    //             children.forEach( (majId) => {
    //                 // const i = 
    //                 // if (i.type === "Need") 
    //                     addTab(lookup[ majId ])
    //         })}
    //         if ( links.length === 0 ) addTab(null) // SHOW "NO OTHER NEEDS" TAB
    //         cleanLinkList(false)
    //     }



        // function doNextTab(){
        //     const latestTab = getNextTab()
        //     if (latestTab !== undefined){
        //         addTab(latestTab)
        //         if (latestTab.parentNeeds[0] !== 'ROOT') doNextTab()
        // }}

        // function getNextTab(){
        //     const lastTab = links[links.length -1]
        //     if (lastTab && lastTab.parentNeeds[0] && lastTab.parentNeeds[0] !== "") {
        //         const nextTab = lookup[ lastTab.parentNeeds[0] ]
        //         return nextTab
        // }}

        // function cleanLinkList(pop){
        //     // flip them around and remove the last one (current item)
        //     const newLinks = deepClone(links)
        //     newLinks.reverse()
        //     if (pop === true)newLinks.pop()
        //     setLinks(newLinks)
        // }

    // }, [ db, item, lang, links, lookup, prePost, relDb, addTab ])

//     function addTab(i){
//         const newLinks = deepClone(links)

// console.log("LINKS", newLinks)

//         if (i !== null ) {
//             newLinks.push({ title: i.title[lang], majId: i.majId,
//                 parentNeeds: i.parentNeeds, type: i.type, 
//                 bgcolor: getItemColor(i.type), cursor:"pointer" })
//         } else {
//             newLinks.push({ title: "NO OTHER NEEDS/PROTOCOLS", majId: "", parentNeeds: "", 
//                 type: "", bgcolor: "grey", cursor:"default" })
//         }
//         setLinks(newLinks)
//     }
        

    // console.log("LINKS", links)

    if (links.length === 0) return null

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