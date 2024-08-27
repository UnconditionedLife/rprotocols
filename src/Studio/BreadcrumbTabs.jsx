import { Fragment, useEffect, useState } from 'react';
import { Box } from '@mui/material'
import { getItemColor, urlizeString } from '../GlobalFunctions';
// import StatusBadge from '../Library/StatusBadge';
// import useSize from '../Library/useSize';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import LinkIcon from '@mui/icons-material/Link';

export default function BreadcrumbTabs({ item, relDb, db, handleGoto, prePost, lang }) {
    const [ lookup, setLookup ] = useState([])
    // const [ links, setLinks ] = useState([])

    let links = new Array()
    
    useEffect(() => {
        // build lookup
        const idLookup = {}
        db.forEach(i => { idLookup[i.majId] = i })
        setLookup(idLookup)
  
        // BUILD BREADCRUMB/TABS LIST && INSERT SUBJECT ITEM TO SEED LOOP
        
    }, [ db, item, lang ])

    if ( !item || !relDb ) return null

    // console.log("LINKS", links, lang)
    
    function addTab(i){
        if (i !== null ) {
            links.push({ title: i.title[lang], majId: i.majId,
                parentNeeds: i.parentNeeds, type: i.type, 
                bgcolor: getItemColor(i.type), cursor:"pointer" })
        } else {
            links.push({ title: "NO OTHER NEEDS", majId: "", parentNeeds: "", 
                type: "", bgcolor: "grey", cursor:"default" })
        }
    }

    function getNextTab(){
        const lastTab = links[links.length -1]
        if (lastTab && lastTab.parentNeeds[0] && lastTab.parentNeeds[0] !== "") {
            const nextTab = lookup[ lastTab.parentNeeds[0] ]
            return nextTab
        }
    }

    function doNextTab(){
        const latestTab = getNextTab()
        if (latestTab !== undefined){
            addTab(latestTab)
            if (latestTab.parentNeeds[0] !== 'ROOT') doNextTab()
        }
    }

    if (prePost === 'pre') {
        addTab(item) // add current item
        doNextTab()
        cleanLinkList(true)

        console.log("LINKS", links)

    } else if (prePost === 'post') {
        const children = relDb.p[ item.majId ]

        console.log("CHILDREN IN POST", children )

        if (children) {
            children.forEach( (majId) => {
                // const i = 
                // if (i.type === "Need") 
                    addTab(lookup[ majId ])
            })
        }
        if ( links.length === 0 ) addTab(null) // SHOW "NO OTHER NEEDS" TAB
        cleanLinkList(false)
    }

    function cleanLinkList(pop){
        // flip them around and remove the last one (current item)
        links.reverse()
        if (pop === true)links.pop()
    }
    
    function handleClick(i) {
        if (i.majId !== "") {
            handleGoto(`/${lang}/studio/need/${urlizeString(i.title)}/${i.majId}`  )
        }
    }

    // set the CSS ClassName
    const boxClass = prePost === 'pre' ? 'breadcrumbTabPre' : 'breadcrumbTabPost'

    return (
        <Fragment>
            {links.map((b) => (
                <Box key={ b.majId }  className={ boxClass } bgcolor={ b.bgcolor } 
                    onClick={ () => handleClick(b) } style={{ cursor: b.cursor }} >
                        { b.title }
                </Box>
            ))}
        </Fragment>
    )
}