import { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, CircularProgress, TextField, InputAdornment, Alert, AlertTitle,
    Snackbar, IconButton, Card} from '@mui/material'
import { SearchRounded } from '@mui/icons-material';
import { CloseRounded } from '@mui/icons-material';
import { getDbAsync } from '../Database.js';
import rProtocolStudio from '/rProtocolStudio.svg';
import { getUserObject, deepCopy } from '../GlobalFunctions.jsx';
import { useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults.jsx';
import ViewItemPage from './ViewPage/ViewItemPage.jsx';
import elasticlunr from 'elasticlunrjs';
import { buildRelationships, getListOfNeeds, LoadIndex } from './StudioFunctions.jsx';
import EditItemPage from './EditPage/EditItemPage.jsx';
import { BuildNewItem } from './StudioFunctions.jsx';
import AddSetPage from './AddSetPage/AddSetPage.jsx';
import StudioExplore from './StudioExplore.jsx';
import Home from '../Home.jsx';
import HomeSwitcher from '../HomeSwitcher.jsx';
import AboutUs from '../Collab/AboutUs.jsx';
import PrivacyPage from '../Collab/PrivacyPage.jsx';

import GraphPage from './Graph/GraphPage.jsx';
import SectionDiamond from '../SectionDiamond.jsx';


export default function Studio() {
    const itemCardRef = useRef(null)
    const location = useLocation()
    const [ user, setUser ] = useState("")
    const [ db, setDb ] = useState(null)
    const [ relDb, setRelDb ] = useState({})
    const [ needsList, setNeedsList ] = useState(null)
    const [ index, setIndex ] = useState(null)
    const { lang, area, action, value1, value2 } = useParams();
    const [ item, setItem ] = useState(null)
    const [ newItem, setNewItem ] = useState(null)
    const [ setInfo, setSetInfo ] = useState(null)
    // const [ searching, setSearching ] = useState(false)
    const [ goto, setGoto ] = useState(null)

    const [ searchResults, setSearchResults ] = useState([])
    const [ alertMessage, setAlertMessage ] = useState( '')
    const [ aboutToEdit, setAboutToEdit ] = useState( false )
    const [ searchTerm, setSearchTerm ] = useState("")    
    const navigate = useNavigate()



    useEffect(() => {
        if (area === "home" && location.state && location.state.from404) {
            setAlertMessage("Oops! It seems this page wandered off somewhere... or maybe it never existed?")
            
            // Clear the location state
            navigate(location.pathname, { replace: true, state: null });
        }
    }, [ area, location, navigate ]);


    useEffect(() => {
        if (area === "studio") {
            if (action === "search" && value1 ) {
                setSearchTerm(value1)
            } else {
                setSearchTerm(undefined)
                // setSearching( true )
            }

            // **** check if about to Edit ****
            if (action === 'edit') setAboutToEdit( true )
        }
    }, [ area, action, value1 ])


    // **** LOAD DATABASE TO GET LATEST DATA FOR EDITING ****
    useEffect(() => {
        // console.log("GOING FOR DATA")
        getDbAsync().then((latestItems)=> {

        // ***************** TEMPORARY PATCHES NEED TO FIX API *********************
            latestItems.forEach((item, i) => {

                if (item.iId === "P.20240819T233440225-335") console.log("LOAD ITEM", item)

                if (item.parentNeeds === undefined)
                    console.log("ParentNeeds Undefined")
                    latestItems[i].parentNeeds = []

                if (item.needMajId !== "" && item.parentNeeds.length === 0)
                        console.log("EMPTY ParentNeeds")
                        latestItems[i].parentNeeds.push( item.needMajId )

                if ( item.minId.includes("NaN") ) {
                    latestItems[i].minId = item.minId.replaceAll("NaN", "0")
                    latestItems[i].verNum = String(item.verNum).replaceAll("NaN", "0")
                    console.log("WAS NaN", item.title.en)
                }
                if (item.needMinId) delete latestItems[i].needMinId
                if (item.needMajId) delete latestItems[i].needMajId
                if (item.needTitle) delete latestItems[i].needTitle
                
                

                // item.parentNeeds.forEach((p, iii) => {
                //     console.log("P", `|${p}|`)
                //     if (p !== 'ROOT') {
                //         const idArr = p.split('.')
                //         console.log("ID ARRAY", idArr)
                //         if (idArr[2] !== '0')
                //             latestItems[i].parentNeeds[iii] = `${idArr[0]}.${idArr[1]}.0`
                //     }       
                // })
            })
        // ***************** TEMPORARY PATCHES NEED TO FIX API *********************

            setDb(latestItems)
            setNeedsList(getListOfNeeds(latestItems))

            // console.log("new Rels", newRels, "db", latestItems)

            setAboutToEdit( false )
            
        })
    },[ aboutToEdit ])

    // console.log('relDb', relDb)


    useEffect(() => {
        if (db !== null) {
            setNeedsList(getListOfNeeds(db))
            const newRels = buildRelationships(db)
            setRelDb(newRels)
        }
    },[ db ])

    // INITIALIZE SEARCH INDEX
    useEffect(() => {
        const i = elasticlunr((Index) => {
            Index.setRef('id')
            Index.addField('title')
            Index.addField('description')
            Index.addField('author')
            Index.addField('tags')
            Index.addField('needTitle')
        })
        setIndex(i)
    }, [ setIndex ])

    // IF DB IS LOADED LOAD INDEX
    useEffect(() => {

        // TODO Need at siteLang and an editLang to distinguish the site 
        //      interface language and the content languages

        if (db !== null) LoadIndex(db, index, 'en')
    }, [ db, index ])

    // RUN SEARCH WITH EACH ENTRY INTO SEARCH
    useEffect(() => {
        if ( area === "studio" && action === "search" && value1 !== null && index?.search && db !== null ) {
            const rawResults = index.search(value1, {
                fields: {
                    title: { boost: 5 },
                    tags: { boost: 2 },
                    description: { boost:1 },
                    author: { boost: 1 },
                    needTitle: { boost: 1 }
                }
            })
            // pull items from DB that match Raw Results
            const itemMap = {};
            db.forEach(item => { itemMap[item.minId] = item })
            const results = rawResults.map(result => itemMap[result.ref])
                .filter(item => item !== undefined);
            setSearchResults(results)        
        }
    }, [ index, value1, db, action, area ] )

    // GET AND SET USER
    useEffect(() => {
        if (getUserObject() !== user) setUser( getUserObject() )
    }, [ setUser, user ])

    // useEffect(() => {
    //     if (inView) console.log("IN VIEW")
    // })


    // USE VALUE2 TO SET ITEM
    useEffect(() => {
        let theItem
        if ( area === "studio" && (action === "need" || action === "protocol") && value2 && db ) {
            const urlId = value2
            const idParts = urlId.split(".").length

// console.log("idParts", idParts)


            const idType = (idParts === 3) ? 'majId' : 'minId'

            theItem = db.find(item => item[idType] === urlId)

            // console.log("THEItem from URL", theItem)

            if (theItem !== undefined) {
                // ***************** TEMPORARY PATCHES NEED TO FIX API *********************
                // add year
                if (!theItem?.year) theItem.year = theItem.minDate.substring(0, 4)

                // change needMinId > needMajId        
                if ('needMinId' in theItem) {
                    if (!('needMajId' in theItem)) {
                        theItem.needMajId = theItem.needMinId
                        delete theItem.needMinId
                    }
                } 
                

                // ***************** TEMPORARY PATCHES *********************

                setItem( theItem )
            } else {

                if (area === "studio" && (action === "need"  || action === "protocol" )) {
                    setAlertMessage(`Oops! It seems item ID: ${urlId} wandered off somewhere... or maybe it never existed?`)
                    // Clear the location state
                    navigate(location.pathname, { replace: true, state: null });
                }
            }
        }
    }, [ action, area, value2, db ])  


    // NAVIGATE TO URL
    useEffect(() => {
        if (goto) navigate( goto, { replace: false });
    }, [goto, navigate]);

    // SCROLL TO THE VIEW OR EDIT CARD
    useEffect(() => {
        if (itemCardRef.current) {
            itemCardRef.current.scrollIntoView({ behavior: "smooth" });
        }
    })

    // REDIRECT BAD URLS
    let error = false
    
    const validLangs = [ undefined, "en", "es", "pt" ]
    if (!validLangs.includes(lang)) error = true

    const validAreas = [ undefined, "home", "studio", "explore", "about-us", "privacy-protocols" ]
    if (!validAreas.includes(area)) {
        error = true
    } else {
        if ( area === "home" && action !== undefined ) error = true
        if ( area === "explore" && action !== undefined ) error = true

        const validActions = [ "edit", "need", "protocol", "add", "add-set", "fork", "search" ]
        if ( area === "studio" && !validActions.includes(action) ) error = true
    }

    if (error) {
        console.log("SWITCHING TO HOME WITH ERROR404")
        return <HomeSwitcher error404={ true } />
    }


    // FUNCTIONS

    function addRemoveItemInMemory(newItem, oldMinid) {
        let tempDB = deepCopy(db)
        tempDB.push(newItem)
        if (oldMinid) {
            tempDB = tempDB.filter(item => item.minId !== oldMinid)
        }
        setDb(tempDB)
    }

    // function removeItemFromMemory(oldMinid) {
    //     const tempDB = deepCopy(db)
    //     tempDB.filter(item => item.minId !== oldMinid)
    //     setDb(tempDB)
    // }

    // function reloadProtocols() {
    //     getDbAsync().then((d)=> {
    //         setDb(d)

    //         console.log("DATABASE:", d)
    //     })
    // }

    // CHANGE URL
    function handleGoto(url){
        
// console.log("Passed URL", url)
        
        // setSearching(false)
        setGoto(url)
    }

    function handleSearchTerm(newValue){
        // setSearching(true)
        handleGoto(`/${lang}/studio/search/${newValue}` )
    }

    // console.log("USER IN STUDIO", user)

    // this function is here because it requires DB & relDb
    function getLinkedItems(majId){
        const parentIdSet = new Set(relDb.p[ majId ])
        return db.filter(obj => parentIdSet.has(obj.majId))
            .sort(function(a, b) {
                let textA = a.title.en.toUpperCase();
                let textB = b.title.en.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }
        )
    }

    function getNeedTitle(needMajId) {
        const parentItem = db.find(item => item.majId === needMajId)
        // console.log("parentItem", parentItem)
        return parentItem?.title || { en: "PARENTLESS" }
    }

    // ****** CREATE AND SET A NEW ITEM *****
    function handleBuildNewItem( type, parentNeeds ){

        // console.log("IN CREATE NEW ITEM")
        // console.log("TYPE:", type, "ParentNeeds:", parentNeeds)

        // if (type === 'Need') {
            const newItem = BuildNewItem( type, parentNeeds )
            handleNewItemChange(newItem)
        // }   
    }

    function handleNewItemChange(newItem){
        setNewItem(newItem)
    }

    function handleSetAddSet(newObj){
        setSetInfo(newObj)
    }


    const snackbarState = ( alertMessage !== '' ) ? true : false


// console.log("Search Results", searchResults)

if (item) console.log("item", item) 

// console.log("ADD setInfo", setInfo)

// console.log("DB @ STUDIO", db)

    if (db === null) return null

    return (
        <Box className='myceliumBackground' id="Studio-Page-Container">

            {/* ********  ERROR MESSAGES ********* */}

            <Snackbar anchorOrigin={{ vertical: 'top', horizontal:'center' }}
                open={ snackbarState } onClose={ () => { setAlertMessage('') }}
                key={ 'top-center' } >
                <Alert severity="error" sx={{ width:'100%' }}
                    action={ <IconButton color="inherit"
                        size="small" onClick={() => { setAlertMessage('') }} >
                            <CloseRounded fontSize="inherit" />
                            </IconButton>
                        }>
                    <AlertTitle>Error</AlertTitle>
                    { alertMessage }
                </Alert>
            </Snackbar>

            {/* ********  ERROR MESSAGES ********* */}


            { area === "home" &&
                <Home lang={ lang }/>
            }
            
            <Box style={{ width:'95%', height:'60px', backgroundColor:'rgba(34, 127, 175, 0.4)',
                clipPath: 'polygon(0 100%, 50% 0, 100% 100%' }}>
                { area !== "home" &&
                    <span style={{ color:'white', lineHeight:'60px', cursor:'pointer', fontSize:'1.1rem' }} 
                        onClick={ () => { handleGoto(`/${lang}/home`) }}>
                        Home
                    </span>
                }
            </Box>
            
            <Box className='studioContainer' >
                {/* <Box alignContent='center'> */}
                {/* <Box position="relative" top='0' backgroundColor='rgba(34, 127, 175, 0.4)' 
                    margin='-8px' marginTop='-50px' width='100%' height='5vw'>
                </Box> */}

                <img src={ rProtocolStudio } style={{ width:'clamp(300px, 60vw, 450px)', marginTop:'46px' }} alt="rProtocol Studio" />
                <h3 className='calloutHeader' style={{ marginTop:'30px' }}>The Power of &quot;HOW TO&quot; in Our Hands!</h3>
                {/* <span className='calloutText'>{ `Find the Protocols and Guides You Need ${inView}`}</span> */}

                    <Box alignSelf='center' backgroundColor='rgba(255, 255, 255, 0.9)' 
                        padding='8px' borderRadius='10px' width="94%" maxWidth='340px' marginTop='8px'>
                        <TextField size='small' className='formField' width='90%'
                            name={ "search" } value={ searchTerm } autoComplete='off'
                            placeholder="Find needs and protocols..."
                            InputProps={{startAdornment: (
                                <InputAdornment position="start">
                                  <SearchRounded />
                                </InputAdornment>
                            )}}
                            onChange={ (e) => { handleSearchTerm(e.target.value) } }
                            onFocus={ (e) => { handleSearchTerm(e.target.value) }} />
                    </Box>
            
                    { area !== "studio" &&
                        <Box mb='4em' mx={10} alignSelf={"center"} style={{ cursor:'pointer' }}>
                            <Card style={{ marginTop:'30px', paddingTop:'1.1em', paddingBottom:'0.8em', paddingLeft:'2em', paddingRight:'2em', backgroundColor:'#FFC400' }}
                                onClick={ () => { handleSearchTerm("Life's Needs"); handleGoto(`/${lang}/studio/need/life-s-needs/N.20240716T165825706-1513.0`) }}>
                                <h4 style={{ color:'black', marginTop:'0px'}}><b>Browse</b></h4>
                            </Card>
                        </Box>
                    }
                    
                    {area === "studio" && action === "search" && (
                        searchResults.length === 0
                            ? <Box width='200px' height='200px' margin='30px' alignSelf='center'><CircularProgress/></Box>
                            : <SearchResults searchResults={searchResults} handleGoto={handleGoto} />
                    )}

                    { (area === "studio" && (action === "need" || action === "protocol") && item !== null ) &&
                        <Box alignSelf='center' marginTop='30px' ref={ itemCardRef } >
                            <ViewItemPage item={ item } getLinkedItems={ getLinkedItems } 
                                handleBuildNewItem={ handleBuildNewItem } action={ action } 
                                handleGoto={ handleGoto } handleSetAddSet={ handleSetAddSet }
                                db={ db } relDb={ relDb } needsList={ needsList }  />
                        </Box>
                    }

                    { ( area === "studio" && action === "edit" && item !== null ) &&
                        <Box alignSelf='center' ref={ itemCardRef } >
                            <EditItemPage item={ item } newItem={ newItem } lang={ 'en' } 
                                getLinkedItems={ getLinkedItems } handleGoto={ handleGoto }
                                getNeedTitle={ getNeedTitle } action={ action } 
                                needsList={ needsList } addRemoveItemInMemory={ addRemoveItemInMemory }
                                handleNewItemChange={ handleNewItemChange } db={ db }/>
                        </Box>
                    }

                    { ( area === "studio" && action === "add" && item !== null ) &&
                        <Box alignSelf='center'>
                            {console.log('LOADING "ADD" - EDIT ITEM PAGE')}
                            <EditItemPage item={ item } newItem={ newItem } lang={ 'en' } 
                                getNeedTitle={ getNeedTitle } handleGoto={ handleGoto } 
                                action={ action } needsList={ needsList }
                                addRemoveItemInMemory={ addRemoveItemInMemory }
                                handleNewItemChange={ handleNewItemChange } db={ db }/>
                        </Box>
                    }

                    { area === "studio" && action === "add-set" && setInfo &&
                        <Box alignSelf='center'>
                            <AddSetPage setInfo={ setInfo } handleSetAddSet={ handleSetAddSet }
                                action={ action } needsList={ needsList } 
                                addRemoveItemInMemory={ addRemoveItemInMemory }
                                handleGoto={ handleGoto } />
                        </Box>
                    }

                    {/* { (db) &&
                        <Box id="graph" key={ db[0].minId } width='1180px' height='1050px' backgroundColor='white' alignSelf='center'
                            marginTop='75px' overflow='hidden'>
                            <GraphPage db={ db } relDb={ relDb }/>
                        </Box>
                    } */}

                {/* </Box> */}

                { (db === null) && <Box width='200px' height='200px' margin='50px' alignSelf='center' ><CircularProgress/></Box> }
                
            </Box>

            <SectionDiamond section="explore" handleGoto={ handleGoto } />
            { (area === "explore" || area === "home") && 
                <StudioExplore db={ db } handleGoto={ handleGoto } lang={ lang } area={ area } />
            }

            <SectionDiamond section="about-us" handleGoto={ handleGoto } />
            { (area === "about-us" || area === "home") && 
                <AboutUs lang={ lang } area={ area } />
            }    

            <SectionDiamond section="privacy-protocols" handleGoto={ handleGoto } />
            { (area === "privacy-protocols" || area === "home") && 
                <PrivacyPage lang={ lang } db={ db } handleGoto={ handleGoto } />
            }

        </Box>
    )
}
