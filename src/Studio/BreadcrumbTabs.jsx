import { Fragment, useEffect, useState } from 'react';
import { Box } from '@mui/material'
import { getItemColor, urlizeString } from '../GlobalFunctions';
// import StatusBadge from '../Library/StatusBadge';
// import useSize from '../Library/useSize';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import LinkIcon from '@mui/icons-material/Link';

export default function BreadcrumbTabs({ item, relDb, db, handleGoto, prePost, lang }) {
    const [ lookup, setLookup ] = useState([])
    const [ links, setLinks ] = useState([])
    
    useEffect(() => {
        // build lookup
        const idLookup = {}
        db.forEach(i => { idLookup[i.majId] = i })
        setLookup(idLookup)
  
        // build links/tabs list
        const newLinks = new Array()
        newLinks.push({ title: item.title[lang], majId: item.majId, 
            parentNeeds: item.parentNeeds, type: item.type, bgcolor: getItemColor(item.type)  })

            console.log("PARENT NEEDS BUG",item)


        setLinks(newLinks)
    }, [ db, item, lang ])
    
    return null

    if ( !item || !relDb ) return null

    // console.log("LINKS", links, lang)
    
    if (prePost === 'pre') {
        let reachedRoot = false
        do {
            
            const newParentKeys = links[links.length -1]
            console.log("NextItem", newParentKeys)
            if (!newParentKeys) continue;
            console.log("NextItem", newParentKeys.parentNeeds)
            if (newParentKeys.parentNeeds[0]) {
                console.log("NextItem", newParentKeys.parentNeeds)
                const nextItem = lookup[ newParentKeys.parentNeeds[0] ]
                if (newParentKeys.parentNeeds[0] === 'ROOT') { 
                    reachedRoot = true 
                    break
                } else {
                    links.push({ title: nextItem.title[lang], majId: nextItem.majId, 
                        parentNeeds: nextItem.parentNeeds, type: nextItem.type, bgcolor: getItemColor(nextItem.type), cursor:"pointer" })
                }
            } else {
                break
            }
        } while (reachedRoot === false)
        
        // links.push({ title: "THE RADICAL BEGINNING", majId: "", parentNeeds: "", type: "", bgcolor: "grey", cursor:"default" })
    }

    if (prePost === 'post') {
        const children = relDb.p[ item.majId ]
        if (children) {
            children.forEach( (majId) => {
                const i = lookup[ majId ]
                if (i.type === "Need") {
                    links.push({ title: i.title[lang], majId: i.majId, 
                        parentNeeds: i.parentNeeds, type: i.type, bgcolor: getItemColor(i.type), cursor:"pointer" })
                }
            })
        }

        if ( links.length < 2 ) {
            links.push({ title: "NO OTHER NEEDS", majId: "", parentNeeds: "", type: "", bgcolor: "grey", cursor:"default" })
        }
    }

    // flip them around and remove the last one(same as current item)
    links.reverse()
    links.pop()

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