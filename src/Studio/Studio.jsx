import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, CircularProgress, TextField, InputAdornment, Alert, AlertTitle,
    Snackbar, 
    IconButton} from '@mui/material'
import { SearchRounded } from '@mui/icons-material';
import MyLocationIcon from '@mui/icons-material/MyLocation';        // Context
import CategoryIcon from '@mui/icons-material/Category';            // Domain
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';  // Purpose
import SignpostIcon from '@mui/icons-material/Signpost';            // Protocol
import { CloseRounded } from '@mui/icons-material';
import { getDbAsync } from '../Database.js';
import rProtocolStudio from '../assets/rProtocolStudio.svg';
import { getUserObject, deepCopy } from '../GlobalFunctions.jsx';
import { useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults.jsx';
import ViewItemPage from './ViewPage/ViewItemPage.jsx';
import elasticlunr from 'elasticlunrjs';
import { buildRelationships, getListOfNeeds, LoadIndex } from './StudioFunctions.jsx';
import EditItemPage from './EditPage/EditItemPage.jsx';
import { BuildNewItem } from './StudioFunctions.jsx';
import GraphPage from './Graph/GraphPage.jsx';
import AddSetPage from './AddSetPage/AddSetPage.jsx';

console.log('LOADING STUDIO')

export default function Studio() {
    const location = useLocation()
    const [ user, setUser ] = useState("")
    const [ db, setDb ] = useState(null)
    const [ relDb, setRelDb ] = useState({})
    const [ needsList, setNeedsList ] = useState(null)
    
    const [ index, setIndex ] = useState(null)

    const { urlId, searchTerm } = useParams();
    // const { searchterm } = useParams();

    const [ item, setItem ] = useState(null)
    const [ newItem, setNewItem ] = useState(null)
    const [ setInfo, setSetInfo ] = useState(null)

    // const [ parentItem, setParentItem ] = useState(null)
    const [ itemType, setItemType ] = useState(null)
    const [ searching, setSearching ] = useState(false)
    const [ goto, setGoto ] = useState(null)

    const [ searchResults, setSearchResults ] = useState([])
    const [ displayState, setDisplayState ] = useState(null)
    const [ alertMessage, setAlertMessage ] = useState( '')

    const navigate = useNavigate()


    // console.log('LOADING STUDIO -- BEFORE USE EFFECTS')

    useEffect(() => {
        // get the second element of the path and set the display state
        // VIEW, EDIT, ADD
        const mainSection = location.pathname.split('/', 3)[2]
        let newState = mainSection

        // console.log("newState", newState)

        if ( mainSection === "need" 
            || mainSection === "protocol" 
            || mainSection === "guide") newState = "view"

        // console.log('newState', newState)

        setDisplayState(newState)
    }, [ location.pathname ])

    // console.log("displayState", displayState)

    // const user = globalVars.user

    // LOAD DATABASE
    useEffect(() => {
        getDbAsync().then((latestItems)=> {
        // ***************** TEMPORARY PATCHES NEED TO FIX API *********************
            latestItems.forEach((item, i) => {
                if (!item.parentNeeds) 
                    latestItems[i].parentNeeds = []

                if (item.needMajId !== "")
                        latestItems[i].parentNeeds.push( item.needMajId )

                if ( item.minId.includes("NaN") ) {
                    latestItems[i].minId = item.minId.replaceAll("NaN", "0")
                    latestItems[i].verNum = String(item.verNum).replaceAll("NaN", "0")
                    console.log("WAS NaN", item.title.en)
                }
                if (item.needMinId) delete latestItems[i].needMinId
            })
        // ***************** TEMPORARY PATCHES NEED TO FIX API *********************

            setDb(latestItems)
            setNeedsList(getListOfNeeds(latestItems))

            const newRels = buildRelationships(latestItems)

            // console.log("new Rels", newRels, "db", latestItems)

            setRelDb(newRels)
        })
    },[])

    // console.log('relDb', relDb)

    useEffect(() => {
        if (db !== null)
            setNeedsList(getListOfNeeds(db))
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
        if ( searchTerm !== null && index?.search && db !== null && displayState === 'search') {
            const rawResults = index.search(searchTerm, {
                fields: {
                    title: { boost: 5 },
                    tags: { boost: 2 },
                    description: { boost:1 },
                    author: { boost: 1 },
                    needTitle: { boost: 1 }
                }
            })
            // pull items from DB that mach Raw Results
            const itemMap = {};
            db.forEach(item => { itemMap[item.minId] = item })
            const results = rawResults.map(result => itemMap[result.ref])
                .filter(item => item !== undefined);
            setSearchResults(results)        
        }
    }, [ index, searchTerm, db, displayState ] )

    // GET AND SET USER
    useEffect(() => {
        if (getUserObject() !== user) setUser( getUserObject() )
    }, [ setUser, user ])


    // USE URL ITEMID TO SET ITEM
    useEffect(() => {
        let theItem
        if ( urlId && db ) {
            const idParts = urlId.split(".").length
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

                console.log( 'URL minId:', item.minId, 'displayState:', displayState )

                if (displayState === 'view' || displayState === 'edit' )
                    setAlertMessage("Item ID: '" + urlId + "' was not found and I have no idea what happened to it :(")
            }
        }
    }, [ urlId, db, displayState ])  


    // NAVIGATE TO URL
    useEffect(() => {
        if (goto) navigate( goto, { replace: true });
    }, [goto, navigate]);

    // console.log('LOADING STUDIO -- AFTER USE EFFECTS')
    
    // function saveAllItemsToDynamoDB() {
    //     const max = 1
        
    //     // const localP = getLocalProtocols()

    //     // console.log("P", P)
        
    //     db.forEach((i, index) => {
    //         // if (i.type === 'Guide') {

    //         // add the year column for the latest table
    //         db[index].year = "2024"

    //         if (!i.iId.includes(".")) {
    //             console.log("NO PERIOD", i.iId)

    //             const oldId = i.iId
    //             const newIdObj = buildNowIds(i.type)

    //             // find items that link to this
    //             db.forEach((linked, linkedIndex) => {
    //                 if (linked.needMinId === oldId) {
    //                     db[linkedIndex].needMinId = newIdObj.minId
    //                     console.log('linked', linked)
    //                 }
    //             })

    //             // update primary item
    //             db[index].iId = newIdObj.iId
    //             db[index].majId = newIdObj.majId
    //             db[index].minId = newIdObj.minId
    //             db[index].majDate = newIdObj.date
    //             db[index].minDate = newIdObj.date

    //             // set up clean history

    //             db[index].history = [ {
    //                 date: newIdObj.date,
    //                 author: getUserName(),
    //                 contactInfo: getUserEmail(),
    //                 description: "First version",
    //                 verNum: i.verNum,
    //                 minId: newIdObj.minId
    //             }]

    //             // make verNum a String
    //             db[index].verNum = String(db[index].verNum)
    //         }

    //         console.log(db[index])

    //         // DYNAMODB FORMAT

    //         function getNames(arr, id){
    //             // console.log("ID", id)
    //             // console.log("ARR", arr)
    //             const x = arr.find((d) => d.id == id );
    //             // console.log(x)

    //             return x.name
    //         }
    //         function addQuotes(s){
    //             s = s.replaceAll('{', '{"')
    //             s = s.replaceAll('}', '"}')
    //             s = s.replaceAll('=', '":"')
    //             s = s.replaceAll(', ', '", "')
    //             return JSON.parse(s)
    //         }

    //     });

    // }

    function addRemoveItemInMemory(newItem, oldMinid) {
        let tempDB = deepCopy(db)
        tempDB.push(newItem)
        if (oldMinid) {
            tempDB = tempDB.filter(item => item.minId !== oldMinid)
        }
        setDb(tempDB)
    }

    function removeItemFromMemory(oldMinid) {
        const tempDB = deepCopy(db)
        tempDB.filter(item => item.minId !== oldMinid)
        setDb(tempDB)
    }

    function reloadProtocols() {
        getDbAsync().then((d)=> {
            setDb(d)

            console.log("DATABASE:", d)
        })
    }

    // CHANGE URL
    function handleGoto(url){

// console.log("Passed URL", url)

        setSearching(false)
        setGoto(url)
    }

    function handleSearchTerm(newValue){
        setSearching(true)
        handleGoto('/studio/search/'+ newValue )
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
        console.log("parentItem", parentItem)
        return parentItem?.title || { en: "PARENTLESS" }
    }

    // ****** CREATE AND SET A NEW ITEM *****
    function handleBuildNewItem( type, parentNeeds ){

        console.log("IN CREATE NEW ITEM")
        console.log("TYPE:", type, "ParentNeeds:", parentNeeds)

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

// console.log("DIPLSAY STATE", displayState)
// console.log("item", item)
// console.log("ADD setInfo", setInfo)


    // RETURN 
    // if ( ( displayState === "view" ) && item === null ) return null

    return (
        <Box className='myceliumBackground' display={'flex'} flexDirection={'column'} backgroundColor='black' alignItems='center' overflow='hidden'>
            <img src={ rProtocolStudio } height='70px' style={{ marginTop:'26px' }} alt="rProtocol Studio" />
            <h3 className='calloutHeader' style={{ marginTop:'10px' }}>The Power of &quot;HOW TO&quot; in Our Hands!</h3>
            <span className='calloutText'>Find the Protocols and Guides You Need</span>

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
            
            <Box className='studioContainer' >
                {/* <Box alignContent='center'> */}

                    <Box alignSelf='center' backgroundColor='rgba(255, 255, 255, 0.9)' 
                        padding='8px' borderRadius='10px' width="360px" marginTop='30px' marginBottom='30px'>
                        <TextField size='small' className='formField' width='300px'
                            name={ "search" } value={ searchTerm } autoComplete='off'
                            placeholder="Search needs, protocols, and guides..."
                            InputProps={{startAdornment: (
                                <InputAdornment position="start">
                                  <SearchRounded />
                                </InputAdornment>
                            )}}
                            onChange={ (e) => { handleSearchTerm(e.target.value) } }
                            onFocus={ e => { handleSearchTerm(e.target.value) }} />
                    </Box>

                    {/* <Box color='green' onClick={ () => saveAllItemsToDynamoDB() }>UPLOAD TO DYNAMODB</Box> */}

                    
                    { displayState === 'search' && searchResults.length === 0 &&
                        <Box width='200px' height='200px' margin='30px' alignSelf='center' ><CircularProgress/></Box>
                    }

                    { displayState === "search" && searchResults.length > 0 &&
                        <SearchResults searchResults={ searchResults } handleGoto={ handleGoto }/>
                    }

                    { (displayState === "view" && item !== null ) &&
                        <Box alignSelf='center'>
                            <ViewItemPage item={ item } getLinkedItems={ getLinkedItems } 
                                handleBuildNewItem={ handleBuildNewItem } displayState={ displayState } 
                                handleGoto={ handleGoto } handleSetAddSet={ handleSetAddSet }
                                db={ db } relDb={ relDb } needsList={ needsList }  />
                        </Box>
                    }

                    {/* { displayState === "add-to" &&
                        <Box alignSelf='center'>
                            <ItemView item={ newItem } getLinkedItems={ getLinkedItems }
                                displayState={ displayState } handleBuildNewItem={ handleBuildNewItem }
                                handleGoto={ handleGoto } />
                        </Box>
                    } */}

                    { (displayState === "edit" && item !== null ) &&
                        <Box alignSelf='center'>
                            <EditItemPage item={ item } newItem={ newItem } lang={ 'en' } 
                                getLinkedItems={ getLinkedItems } handleGoto={ handleGoto }
                                getNeedTitle={ getNeedTitle } displayState={ displayState } 
                                needsList={ needsList } addRemoveItemInMemory={ addRemoveItemInMemory }
                                handleNewItemChange={ handleNewItemChange } db={ db }/>
                        </Box>
                    }

                    { (displayState === "add" && item !== null ) &&
                        <Box alignSelf='center'>
                            {console.log('LOADING "ADD" - EDIT ITEM PAGE')}
                            <EditItemPage item={ item } newItem={ newItem } lang={ 'en' } 
                                getNeedTitle={ getNeedTitle } handleGoto={ handleGoto } 
                                displayState={ displayState } needsList={ needsList }
                                addRemoveItemInMemory={ addRemoveItemInMemory }
                                handleNewItemChange={ handleNewItemChange }/>
                        </Box>
                    }

                    { (displayState === "add-set") &&
                        <Box alignSelf='center'>
                            <AddSetPage setInfo={ setInfo } handleSetAddSet={ handleSetAddSet }
                                displayState={ displayState } needsList={ needsList } 
                                addRemoveItemInMemory={ addRemoveItemInMemory }
                                handleGoto={ handleGoto } />
                        </Box>
                    }

                    { (db) &&
                        <Box id="graph" key={ db[0].minId } width='1180px' height='1050px' backgroundColor='white' alignSelf='center'
                            marginTop='75px' overflow='hidden'>
                            <GraphPage db={ db }/>
                        </Box>
                    }



                {/* </Box> */}

                { (db === null) && <Box width='200px' height='200px' margin='50px' alignSelf='center' ><CircularProgress/></Box> }

                <br/>
                <br/>
                <br/>
            </Box>
            { displayState === undefined &&
                <Box display='flex' flexDirection='column'>
                <br/>
                <br/>
                <br/>
                <span className='subheadline'><b>rPROTOCOL Structure</b></span>
                <span className='calloutText'>rPROTOCOLS are arranged into four levels:<br/>Context, Domain, Need, and Protocol</span><br/>
                
                <Box display='grid' >
                    <Box display={'flex'} flexDirection={'row'}>
                        <Box className='benefits'>
                            <Box m={1} display={'flex'} flexDirection={'row'} flexWrap='wrap' >
                            <Box m={1} p={2} minHeight={"90px"} maxWidth='280px'>
                                    <CategoryIcon fontSize='large' color='primary'/>
                                    <p className='cardTitle'>Domain</p>
                                    <span>Domains represent significant aspects of our society, identifying the areas we are dealing with and answering the crucial question:<br/><strong>'Where do we find ourselves?'</strong></span>
                                </Box>
                                <Box m={1} p={2} minHeight={"90px"} maxWidth='280px'>
                                    <MyLocationIcon fontSize='large' color='primary'/>
                                    <p className='cardTitle'>Context</p>
                                    <span>Contexts represent unique of our world, defining the settings where interactions and decisions occur, and answering the fundamental question:<br/><strong>'What are we dealing with?'</strong></span>
                                </Box>
                            </Box>
                            <Box m={1} display={'flex'} flexDirection={'row'} flexWrap='wrap'>
                                <Box m={1} p={2} minHeight={"90px"} maxWidth='280px'>
                                    <PsychologyAltIcon fontSize='large' color='primary'/>
                                    <p className='cardTitle'>Need</p>
                                    <span>Needs define the rationale behind the protocol, addressing a specific aspect of the Domain and answering the critical question:<br/><strong>'Why are we addressing this issue?'</strong></span>
                                </Box>
                                <Box m={1} p={2} minHeight={"90px"} maxWidth='280px'>
                                    <SignpostIcon fontSize='large' color='primary'/>
                                    <p className='cardTitle'>Protocol</p>
                                    <span>Protocol is a detailed set of guidelines that provides a specific solution to a Need, effectively addressing the practical question:<br/><strong>'How do we accomplish this?'</strong></span>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                </Box>
            }


            <br/>
            <br/>
            <br/>
            {/* <Button onClick={() => { loadProtocols() }}>LOAD PROTOCOLS</Button> */}
            <span className='subheadline' ><b>Protocol Guide Examples</b></span>
            <span className='sectionTitle'>The Traditional Formats You Know</span>
            <span className='calloutText'>Protocols can serve any of these and more, however <br/> they simpler than typical complex legal documents.</span>
            <br/>
            <br/>
            <Box className="bundleContainer">
                <Box className='bundleList'>
                    <span className='bundleHeader'>Agreements</span><br/>
                    <span className='bundleTitle' onClick={ () => { handleGoto('/studio/') }}>Founders</span><br/>
                    <span className='bundleTitle' onClick={ () => { handleGoto('/studio/') }}>Operating</span><br/>
                </Box>
                <Box className='bundleList'>
                    <span className='bundleHeader'>Contracts</span><br/>
                    <span className='bundleTitle' onClick={ () => { handleGoto('/studio/') }}>Sales</span><br/>
                    <span className='bundleTitle' onClick={ () => { handleGoto('/studio/') }}>Purchase Order</span><br/>
                </Box>
                <Box className='bundleList'>
                    <span className='bundleHeader'>Policies</span><br/>
                    <span className='bundleTitle' onClick={ () => { handleGoto('/studio/') }}>Privacy Policy</span><br/>
                    <span className='bundleTitle' onClick={ () => { handleGoto('/studio/') }}>Health & Safety</span><br/>
                </Box>
                <Box className='bundleList'>
                    <span className='bundleHeader'>Practices</span><br/>
                    <span className='bundleTitle' onClick={ () => { handleGoto('/studio/') }}>Onboarding</span><br/>
                    <span className='bundleTitle' onClick={ () => { handleGoto('/studio/') }}>Root Cause</span><br/>
                </Box>
            </Box>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </Box>
    )
}
