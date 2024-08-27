import { useState, useEffect } from 'react';
import { Box, Breadcrumbs } from '@mui/material'
import { getItemColor, urlizeString } from '../GlobalFunctions';
import StatusBadge from '../Library/StatusBadge';
import useSize from '../Library/useSize';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LinkIcon from '@mui/icons-material/Link';

export default function BreadcrumbBar(props) {
    const { item, relDb, db, handleGoto } = props
    const [ boxColor, setBoxColor ] = useState('')
    const windowSize = useSize();

    const lang = "en"

    // BUILD LOOKUP TABLE BY MAJID
    const dbLookup = {}
    db.forEach(i => dbLookup[i.majId] = i)

    useEffect(() => {
        setBoxColor(getItemColor(item.type))
    }, [ item ])

    // const statusBadgeColor = boxColor
    // const isNarrow = windowSize[0] < 500 ? true : false

    if ( !item || !relDb ) return null

    // BUILD BREADCRUMB LIST
    const breadcrumbs = []
    const links = new Array()
    
    // INSERT SUBJECT ITEM TO SEED THE SEARCH
    links.push({ title: item.title[lang], majId: item.majId, parentNeeds: item.parentNeeds, type: item.type })
    
    let reachedRoot = false
    do {
        const newParentKeys = links[links.length -1]
        if (newParentKeys.parentNeeds[0]) {
            // console.log("NextItem", newParentKeys.parentNeeds[0])
            const nextItem = dbLookup[ newParentKeys.parentNeeds[0] ]
            if (newParentKeys.parentNeeds[0] === 'ROOT') { 
                reachedRoot = true 
                break
            } else {
                links.push({ title: nextItem.title[lang], majId: nextItem.majId, parentNeeds: nextItem.parentNeeds, type: nextItem.type })
            }
        } else {
            break
        }
    } while (reachedRoot === false)

    links.forEach((i, index) => {
        // if (index > 0) 
            addBreadcrumb(i.title, i.majId, i.type, (index === 0))
    })

    // console.log("LINKS", links)
    // buildBreadcrumb(item.title[ lang ], item.majId, true)
    // do {
    //     console.log("DO LOOP")
    //     // if (links[0]) {
    //         if (links[0] === "ROOT") break
    //         const nextItem =  dbLookup[ links[0] ]
    //         console.log("LINKS", links, nextItem)
    //         if (nextItem !== undefined) {
    //             console.log("IN NEXT", nextItem)
    //             console.log("BREADCRUMB CALL", nextItem.title[lang], nextItem.majId, false)
    //             const nextParents = relDb.c[ nextItem.majId ]
    //             nextParents.forEach(i => {
    //                 links.push(i.majId)
    //             })

    //             buildBreadcrumb(nextItem.title[lang], nextItem.majId, false)
    //             links.shift()
    //         }
            
            
    //     // } else {
    //         // break
    //     // }
        
    //     break
    //     //  relDb.p[ links[0] ]
    // } while (links.length > 0)

    function addBreadcrumb(title, majId, type, bold){
        // console.log("BREADCRUMB INSIDE", title, majId, bold)

        breadcrumbs.unshift(<span key={ majId } style={{ cursor:'pointer', color:getItemColor(type) }}
            onClick={ () => handleGoto(`/${ lang }/studio/need/${urlizeString(title)}/${majId}` ) }>
                { (!bold) &&  title }
                { (bold && <b>{ title} </b>)}
        </span> 
    )}

    // console.log("breadcrumbs", breadcrumbs)


    return (
    <Box display='flex'>
        <img src="/rootNeedIcon.png" width="26" height="13" style={{ marginTop:'6px' }} />&nbsp;
        <Breadcrumbs separator={<LinkIcon fontSize="small" />} maxItems={ 5 } itemsAfterCollapse={ 2 }
            sx={{ fontSize:'.9rem', marginTop:'3px' }} >
            { breadcrumbs }
        </Breadcrumbs>
        {/* &nbsp; */}
        {/* <NavigateNextIcon fontSize="small" style={{ marginTop:'4px', color:'grey' }}/> */}
    </Box>
    )
}