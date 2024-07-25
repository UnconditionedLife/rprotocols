// import { useState, useEffect } from 'react';
// import { Box, Button } from '@mui/material'
// import NavigatorBar from './NavigatorBar.jsx';
// import ViewItemPage from './ViewPage/ViewItemPage.jsx';
// import ProtocolForm from './EditPage/EditItemPage.jsx';
// import { getUserName, getUserObject, compareVersions, getVersions, 
//     makeFork, getUserEmail, deepCopy, sortByName } from '../GlobalFunctions.jsx';
// import { v4 as uuidv4 } from 'uuid';
// import VersionBar from '../VersionBar.jsx';
// import dayjs from "dayjs"
// import SectorSelector from './SectorSelector.jsx';
// import DomainSelector from './DomainSelector.jsx';
// import TaxonomyHeader from './TaxonomyHeader.jsx';

// export default function Navigator(props) {
//     const { db, addProtocolToDB, reloadProtocols, currentSection } = props
//     const [ majorVersions, setMajorVersions ] = useState([])
//     const [ currentVersion, setCurrentVersion ] = useState( 1 )
//     const [ current, setCurrent ] = useState([0, 0, 0, 0])
//     const [ sectorIndex, setSectorIndex ] = useState(null)
//     const [ domainIndex, setDomainIndex ] = useState(null)
//     const [ contextIndex, setContextIndex ] = useState(null)
//     const [ needIndex, setNeedIndex ] = useState(null)

//     const [ domains, setDomains ] = useState(null)
//     const [ contexts, setContexts ] = useState(null)
//     const [ needs, setNeeds ] = useState(null)
//     const [ guideNeeds, setGuideNeeds ] = useState(null)
//     const [ topVersionProtocols, setTopVersionProtocols ] = useState(null)
//     const [ topVersionGuides, setTopVersionGuides ] = useState(null)
//     const [ sameVersionProtocols, setSameVersionProtocols ] = useState(null)
//     const [ clicked, setClicked ] = useState('Context')
//     const [ user, setUser ] = useState('')
//     const [ lang, setLang] = useState('en')
//     // const [ description, setDescription ] = useState(db.sectors[0].description[lang])
//     const [ display, setDisplay ] = useState('view') // view / edit / new


//     // const [ posProtocol, setPosProtocol ] = useState(0)
//     const [ newProtocol, setNewProtocol ] = useState(
//         {
//             header:{
//                 protocolId: "",
//                 versionId: uuidv4(),
//                 description: {},
//                 version: "1.0.0",
//                 sectorId: "",
//                 sectorName: {},
//                 domainId: "",
//                 domainName: {},
//                 contextId: "",
//                 contextName: {},
//                 needId: "",
//                 needName: {}
//             },
//             content:{
//                 title: {},
//                 intro: {},
//                 elements:[
//                     {},
//                 ],
//                 attribution:{
//                     message: {},
//                     url: {}
//                 },
//                 links:[
//                     {
//                         rel: {},
//                         href: {}
//                     }
//                 ]
//             },
//             metadata: {
//                 definitions: [
//                     { term: "", definition: "" }
//                 ],
//                 variables: [
//                     { variable: "", description: "" }
//                 ]
//             },
//             history:[
//                 {
//                     date: {},
//                     description: {},
//                     version:{
//                         number: {},
//                         description: {}
//                     },
//                     author: {},
//                     contactInfo: ""
//                 }
//             ],
//             discuss: {
//                 purpose: "",
//                 comments: ""
//             }
//         })

    
//     // console.log("DB", db)
    
//     useEffect(() => {
//         if (getUserObject() !== user) {
//             setUser( getUserObject() )
//         }
//     })



//     useEffect(() => {
//         setDomains(db.domains)
//         setContexts(db.contexts)
//         setNeeds(db.needs)
//         setGuideNeeds(sortByName(db.guideNeeds))
//         // setAllProtocols(db.protocols)
//     }, [])

//     useEffect(() => {
//         if ( sectorIndex !== null ) {
//             const sectorId = db.sectors[sectorIndex].id
//             let doms = db.domains.filter((d) => { return d.parentId === sectorId })
//             setDomains(doms)
//         }
//     }, [ db, sectorIndex ])

//     useEffect(() => {
//         if ( domainIndex !== null ) {
//             const domainId = db.domains[domainIndex].id
//             let cont = db.contexts.filter((d) => { return d.parentId === domainId })
//             setContexts(cont)
//         }
//     }, [ db, domainIndex ])



//     useEffect(() => {

//         console.log('something changed', db.protocols.length)

//         // filter DOMAINS to current context
//         if (domains) {
//             const d_id = domains[current[0]].id
//             let theContexts = db.contexts.filter((d) => { return d.domainId == d_id })
//             if (theContexts.length < 1) theContexts = [{ name:'{ no domains yet }' }]
//             setContexts(theContexts)
//             const theNeeds = filterNeeds(theContexts)
//             setNeeds(theNeeds)
//             const theProtocols = filterProtocols(theNeeds)
//             setTopVersionProtocols(theProtocols)
//         }

//         // filter NEEDS to current domain
//         function filterNeeds(theContexts){
//             const c_id = theContexts[current[1]].id
//             let newNeeds = db.needs.filter((n) => {
//                 return n.contextId == c_id;
//             })
//             if (newNeeds.length < 1) newNeeds = [{ name: { en: '{ no needs yet }', es: '{ Aún no hay necesidades }', pt: '{ Ainda não há necessidades }' }}]
//             return sortByName(newNeeds)
//         }
        
//         // filter PROTOCOLS to current need
//         function filterProtocols(theNeeds){
//             // filter matching protocols
//             const n_id = theNeeds[current[2]].id
//             let newProtocols = db.protocols.filter((p) => {
//                 return p.header.needId == n_id;
//             })

            

//             console.log('something changed - new protocols', newProtocols)

//             if ( newProtocols.length === 0 ) {
//                 setMajorVersions([ 0 ])
//                 setCurrentVersion(0)
//                 return []
//             }
//             // sort protocols by version number descending
//             newProtocols.sort(compareVersions);

//             // get the major versions
//             const theVersions = getVersions(newProtocols)

//             console.log('something changed new Vs', theVersions)


//             setMajorVersions(theVersions)

//             // get list of TOP minor version of Each Version
//             const versionTops = {}
//             newProtocols.map((p) => {
//                 const splitV = p.header.version.split('.')
//                 const majorV = Number(splitV[0])
//                 const minorV = Number(splitV[1])
//                 const verId = p.header.versionId

//                 if (versionTops[majorV] === undefined) versionTops[majorV] = { ver: -1 }
//                 if ( minorV > versionTops[majorV].ver) {
//                     versionTops[majorV].ver = minorV
//                     versionTops[majorV].verId = verId
//                 }
//             })

//             // get list of TOP Major version protocols
//             const newTopVersionProtocols = []
//             newProtocols.map((p) => {
//                 Object.keys(versionTops).forEach((k) =>{
//                     if (versionTops[k].verId == p.header.versionId) {
//                         newTopVersionProtocols.unshift(p)
//                     }
//                 })
//             })
//             setCurrentVersion(Number(newTopVersionProtocols[[current[3]]].header.version.split('.')[0]))
//             return newTopVersionProtocols
//         }
//     }, [ current, db, domains, currentVersion ])


//     useEffect(() => {
//         // if (needs) {
//         //     const tempProtocol = newProtocol
//         //     tempProtocol.header.domainId = domains[ current[0] ].id
//         //     tempProtocol.header.domainName = domains[ current[0] ].name
//         //     tempProtocol.header.contextId = db.contexts[ current[1] ].id
//         //     tempProtocol.header.contextName = db.contexts[ current[1] ].name
//         //     tempProtocol.header.needId = needs[ current[2] ].id
//         //     tempProtocol.header.needName = needs[ current[2] ].name
//         //     setNewProtocol(tempProtocol)
//         // }
//     }, [ db, contexts, needs, current, newProtocol ])

//     // filter NEEDS to current domain
//     useEffect(() => {
//         if (topVersionProtocols) {
//             if (topVersionProtocols.length > 0 && display !== 'edit') setDisplay('view')
//             if (topVersionProtocols.length === 0) setDisplay('new')
//         }
//     }, [ topVersionProtocols, display ])

//     function handleNavAction(level, dir, data ) {
//         // move navigators
        
//         if (level == 'Domain') {
//             const newPos = nextItem(dir, current[0], data)
//             if (current[0] !== newPos) setCurrent([ newPos, 0, 0, 0 ])
//             setDescription(domains[ newPos ].description[lang])
//         }
//         if (level == 'Context') {
//             const newPos = nextItem(dir, current[1], data)
//             if (current[1] !== newPos) setCurrent([ current[0], newPos, 0, 0 ])
//             setDescription(contexts[ newPos ].description[lang])
//         }
//         if (level == 'Need') {
//             const newPos = nextItem(dir, current[2], data)
//             if (current[2] !== newPos) setCurrent([ current[0], current[1], newPos, 0 ])
//             setDescription(needs[ newPos ].description[lang])
//         }
//         if (level == 'Protocol') {
//             const newPos = nextItem(dir, current[3], data)
//             if (current[3] !== newPos) setCurrent([ current[0], current[1], current[2], newPos ])
//             setDescription(topVersionProtocols[ newPos ].header.description[lang])
//             setCurrentVersion(Number(topVersionProtocols[ newPos ].header.version.split('.')[0]))
//         }
            
//         setClicked(level)

//         function nextItem(dir, position, data) {    
//             let result 
//             if (dir == "down") result = (position == 0) ? data.length - 1 : position - 1
//             if (dir == "up") result = (position == data.length - 1) ? 0 : position + 1
//             if (dir == "click") result = position
//             return result
//         }
//     }   

//     if (topVersionProtocols == null) return ( null )

//     function handleDisplay(newView){
//         if (newView === 'fork') {
//             const fork = makeFork(topVersionProtocols[current[3]], majorVersions)
//             // addProtocolToDB(fork)
//             if (JSON.stringify(fork.content.attribution) === '{}') {
//                 fork.content.attribution = {
//                     message: {},
//                     url: ""
//                 }
//             }

// console.log('fork', fork)


//             const elements = deepCopy(fork.content.elements)
//             handleSaveProtocol( elements, fork, 'unflat').then((r) => {
    
//                 console.log('result', r)
    
//                 if (r === 'success') {
//                     // handleDisplay('view')
//                     reloadProtocols()
//                 }
//             })
            
//             // topVersionProtocols[current[3]], majorVersions
//             // setCurrent([ current[0], current[1], current[2],  ])
//             // setDisplay('edit')
//         } else {
//             setDisplay(newView)
//         }
//     }

//     function handleVersion(newVersion){
//         topVersionProtocols.map((p, i) => {
//             if (Number(p.header.version.split('.')[0]) === Number(newVersion) ) {
//                 setCurrent([ current[0], current[1], current[2], i ])
//                 setCurrentVersion(Number(newVersion))
//             }
//         })
//     }

//     function handleViewGuide(guide){
//         handleDisplay('guide')
//     }

//     function handleTaxonomy(level, newIndex){

// console.log('Level:', level, 'Index:', newIndex )

//         if (level === 'sector') {
//             console.log('in sector')
//             setSectorIndex(newIndex)
//             setDomainIndex(null)
//             setContextIndex(null)
//             setNeedIndex(null)
//         }
//         if (level === 'domain') {
//             setDomainIndex(newIndex)
//             setContextIndex(null)
//             setNeedIndex(null)
//         }
//         if (level === 'context') {
//             setContextIndex(newIndex)
//             setNeedIndex(null)
//         }
//         if (level === 'need') setNeedIndex(newIndex)
//     }

//     const currentProtocol = topVersionProtocols[current[3]]


// console.log("DB", db)

//     const needsData = currentSection === 'Protocols' ? needs : guideNeeds

//     if (!db) return null

//     return (
//         <Box maxWidth='100vw' mt={2} display='flex' flexDirection='column' flexWrap='wrap' justifyContent='center' alignSelf='center' style={{ padding:'10px' }}>
//             {/* <DisplayGraph/> */}
//             {/* // Context Selector */}
//             <Box display='flex' flexDirection='column' minWidth='360px' maxWidth='1200px' justifyContent='center'>

//                 {/* <TaxonomyHeader db={ db } sectorIndex={ sectorIndex } domainIndex={ domainIndex } 
//                     contextIndex={ contextIndex } needIndex={ needIndex } handleTaxonomy={ handleTaxonomy } />

//                 <SectorSelector db={ db } sectorIndex={ sectorIndex } handleTaxonomy={ handleTaxonomy } />

//                 <DomainSelector db={ db } sectorIndex={ sectorIndex } domainIndex={ domainIndex } handleTaxonomy={ handleTaxonomy } /> */}

//                 {/* <NavigatorBar levelData={ db.domains } levelName={ "Domain" } handleNavAction={ handleNavAction } position={ current[0] } clicked={ clicked } lang={ lang }/> */}

//                 {/* <NavigatorBar levelData={ contexts } levelName={ "Context" } handleNavAction={ handleNavAction } position={ current[1] } clicked={ clicked } lang={ lang }/> */}
                
//                 {/* <NavigatorBar levelData={ needsData } levelName={ "Need" } handleNavAction={ handleNavAction } position={ current[2] } clicked={ clicked } lang={ lang }/> */}

//                 { currentSection === 'Protocols' &&
//                     <NavigatorBar levelData={ topVersionProtocols } levelName={ "Protocol" } handleNavAction={ handleNavAction } position={ current[3] } clicked={ clicked } lang={ lang }/>
//                 }
//                 { currentSection === 'Guides' &&
//                     <NavigatorBar levelData={ topVersionGuides } levelName={ "Guides" } handleNavAction={ handleNavAction } position={ current[3] } clicked={ clicked } lang={ lang }/>
//                 }

//                 <h2 className='sectionTitle' style={{ fontSize:'1.1em'}}>{ clicked } Description</h2>

//                 <Box className='protocolDescriptionContainer' >
//                     {/* <Box className='protocolDescription' >{ description }</Box> */}
//                 </Box>
                
//                 <h2 className='sectionTitle' style={{ fontSize:'1.1em'}}>Protocol Versions</h2>
//                 <Box display='flex' alignContent='center' justifyContent='center' style={{ marginBottom:'20px' }}>
//                     <VersionBar majorVersions={ majorVersions } currentVersion={ currentVersion } handleVersion={ handleVersion }/>
//                 </Box>
//             </Box>

//             <Box width="calc(100vw - 6px)" minWidth='360px' maxWidth='600px' backgroundColor='white' borderRadius='8px' display='flex' 
//                 border='3px solid #7393B3' justifyContent='center' style={{ overflowY:'scroll' }} >

//                 { (display === 'view') && 
//                     <ViewItemPage protocol={ currentProtocol } lang={ lang } display={ display } handleDisplay={ handleDisplay }/>
//                 }

//                 { (display === 'edit') &&
//                     <Box width="100%">
//                         { console.log("proto-protocol", topVersionProtocols[current[3]])}
//                         { (user == "") &&
//                             <span >Login to Edit a Protocol</span>
//                         }
//                         { (user != "") &&
//                             <ProtocolForm lang={ lang } majorVersions={ majorVersions } protocol={ currentProtocol } domains = { db.domains } 
//                                 contexts={ contexts } needs={ needs } handleDisplay={ handleDisplay } reloadProtocols={ reloadProtocols } />
//                         }
//                     </Box>           
//                 }

//                 { (display === 'new') && 
//                     <Box>
//                         { (user == "") &&
//                             <span >Login to Add a Protocol</span>
//                         }
//                         { (user != "") &&
//                             <ProtocolForm lang={ lang } protocol={ newProtocol } contexts = { db.contexts } 
//                                 domains={ domains } needs={ needs } handleDisplay={ handleDisplay } reloadProtocols={ reloadProtocols } />
//                         }
//                     </Box>
//                 }
//             </Box>
//         </Box>
//     )
// }