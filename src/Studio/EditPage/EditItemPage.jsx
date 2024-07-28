import { useState, useEffect } from 'react';
import { Box, Button, Card } from '@mui/material'

// import { dbSaveItemAsync } from '../Database.js';

import { deepCopy, urlizeString } from '../../GlobalFunctions.jsx';
import HeaderArea from '../HeaderArea.jsx';
import { BuildNewHistory, AddIdToArray, IncrementMinorVersion, 
    validateFields, saveItemToDb, marshalRecord, 
    DecrementMinorVersion} from '../StudioFunctions.jsx';
import IntroAreaEdit from './IntroAreaEdit.jsx';
import HeaderAreaEdit from './HeaderAreaEdit.jsx';
import ClosingAreaEdit from './ClosingAreaEdit.jsx';
import HistoryAreaEdit from './HistoryAreaEdit.jsx';
import AttributionAreaEdit from './AttributionAreaEdit.jsx';
import RegionsAreaEdit from './RegionsAreaEdit.jsx';
import ElementsAreaEdit from './ElementsAreaEdit.jsx';
import ProtocolsAreaEdit from './ProtocolsAreaEdit.jsx';


export default function EditItemPage(props) {
    const { item, newItem, lang, getNeedTitle, handleGoto, displayState, 
        addRemoveItemInMemory, needsList, handleNewItemChange, db } = props;
    const [ originalState, setOriginalState ] = useState({});
    const [ formState, setFormState ] = useState(null)
    const [ regions, setRegions ] = useState([])
    const [ elements, setElements ] = useState([]);
    const [ protocols, setProtocols ] = useState([]);
    const [ historyRecord, setHistoryRecord ] = useState([])
    const [ errors, setErrors ] = useState({})
    const [ showAll, setShowAll ] = useState( true )
    const [ changeLog, setChangeLog ] = useState("Changed: ")
    const [ parentNeeds, setParentNeeds ] = useState( [] )

    // console.log('item vs. newItem', item, newItem)

    // const location = useLocation()

    // let tempEditFunction

    // useEffect(() => {
    //     console.log('pathname', location.pathname)
    //     if (location.pathname.includes('/studio/edit/add/')) { 
    //         console.log("SET TO ADD"); 
    //         setEditFunction('add') 
    //         tempEditFunction = 'add'
    //     }
    //     if (location.pathname.includes('/studio/edit/fork/')) {
    //         console.log("SET TO FORK"); 
    //         setEditFunction('fork')
    //         tempEditFunction = 'fork'
    //     }
    // }, [ location.pathname ])

    useEffect(() => {
        // GET CORRECT NEW ITEM AND ASSIGN IT TO FORMSTATE
        const refItem = newItem || item
        setOriginalState( deepCopy(refItem) );        
        const stateItem =  deepCopy(refItem)

        // EXTRACT ARRAYS
        if (refItem?.regions)
            setRegions(AddIdToArray(refItem.regions, "reg"))

        if (refItem?.elements)
            setElements(AddIdToArray(refItem.elements, "elem"))

        if (refItem?.protocols) {
            setProtocols(AddIdToArray(refItem.protocols, "proto"))
        }

        // UPDATE VERSION NUMBER
        const newVerNum = (newItem) ? '1.0' : IncrementMinorVersion(stateItem?.verNum)
        stateItem.verNum = newVerNum

        // CREATE NEW HISTORY RECORD
        const newHistory = BuildNewHistory( newVerNum )
        if (newVerNum === '1.0') newHistory.description.en = "Initial version"
        stateItem.history.unshift(newHistory)
        setHistoryRecord( newHistory )

        // UPDATE MIN ID
        stateItem.minId = stateItem.iId + '.' + newVerNum

        // TEMP add parentNeeds
        if (!stateItem.parentNeeds) stateItem.parentNeeds= []

        // Create "setParentNeeds" as list of { title & majId }
        // from the list of majId in parentNeeds
        const parentIdSet = new Set( stateItem.parentNeeds )
        const filteredParents = needsList.filter(obj => parentIdSet.has(obj.majId));
        setParentNeeds(filteredParents)
        
        setFormState( stateItem )

console.log('EDIT FORM STATEITEM', stateItem )
        
    }, [ item, newItem, getNeedTitle, needsList ])


    useEffect(() => {
        // UPDATE NEEDS LIST
        if ( formState?.parentNeeds ) {
            // Create "setParentNeeds" as list of { title & majId }
            // from the list of majId in parentNeeds
            const parentIdSet = new Set( formState.parentNeeds )
            const filteredParents = needsList.filter(obj => parentIdSet.has(obj.majId));
            setParentNeeds(filteredParents)
        }
    }, [ formState, needsList ])


    // RESET ERRORS
    function clearErrors(name) {
        const newErrors = errors
        delete newErrors[name]
        setErrors(newErrors)

        // console.log('errors', errors, newErrors)
    }

    // UPDATE FIELDS DIRECTLY OR IN NESTED STATE
    const handleFieldChange = (e) => {
        const { name, value } = e.target;

        // clear error for this field
        clearErrors(name)
        
        // Deals with field that have Language objects
        if ([ "tags", "title", "description", "intro", "closing", 
            "attribComment" ].includes(name)) {
            let nestedValues = formState[name]
            if (nestedValues?.[lang]) { 
                nestedValues[lang] = value
            } else { 
                nestedValues = { ...formState[name], [lang]: value }
            }
            setFormState((prevState) => ({
                ...prevState,
                [name]: nestedValues,
            }));
            // log changes for the history description
            logChanges(name, value, true)
        } else {
            // assigns value directly
            setFormState((prevState) => ({
                ...prevState,
                [name]: value
            }));
            // log changes for the history description
            logChanges( name, value, false)
        } 

    };

    function logChanges(name, value, nested){
        let change = false
        if (!nested) {
            if (originalState[name] !== value) change = true
        } else {
            if (originalState[name][lang] !== value) change = true
        }
        if (change && !changeLog.includes(name)) {
            const newLog = changeLog + name + ", "
            setChangeLog(newLog)
            updateHistory({ target: { name: "historyDescription", value: newLog }})
            // return "Changed: " + newLog
        }
    }
    
    function handleParentList(newArr){

console.log("newList @ Set FormState", newArr)

        logChanges("parentNeed", null, false)
        setFormState((prevState) => ({
            ...prevState,
            parentNeeds: newArr
        }));
    }

    function handleEditAddParent(newParent){

console.log('newParent', newParent)

        const newList = deepCopy(parentNeeds)
        newList.unshift(newParent)
        handleEditUpdateParents(newList)
    }

    function handleEditRemoveParent(index){
        const newList = deepCopy(parentNeeds)
        newList.splice(index, 1)
        handleEditUpdateParents(newList)
    }

    function handleEditUpdateParents( newParents ){
        // console.log('NEEDS CHANGE', newParents)
        const parentIdsList = []
        newParents.forEach(parent => parentIdsList.push( parent.majId ))
        logChanges("Parent Needs", "", false)
        setFormState((prevState) => ({ ...prevState, parentNeeds: parentIdsList }));
    }

    // type is 'elem' or 'proto'
    function addArrayItem(array, type) {
        const newObject = (type !== 'reg') ? { [lang]: "" } :
            { level: "continent", location: 'global' } 
        const newArray = [...array, newObject]
        const index = newArray.length - 1
        newArray[index].id = type + "-" + (index + 1)
        if (type === 'reg') setRegions(newArray)
        if (type === 'elem') setElements(newArray)
        if (type === 'proto') setProtocols(newArray) 
    }

    function removeArrayItem(array, type, index) {
        const newArray = array.toSpliced(index, 1)
        if (type === 'reg') setRegions(newArray)
        if (type === 'elem') setElements(newArray)
        if (type === 'proto') setProtocols(newArray) 
    }

    const updateArrayItems = (array, type, index, value, field) => {
        const newArray = [...array]
        if (type !== 'proto') {
            const editField = (field) ? field : lang
            newArray[index][editField] = value
        }
        if (type === 'reg') {
            if (field === 'level')
                newArray[index].location = (value === 'continent') ? 'global' : ""
            setRegions(newArray)
        }
        if (type === 'elem') setElements(newArray)
        if (type === 'proto') {

            console.log("newValue", value)
            newArray[index] = value
            console.log("newArray", newArray)

            setProtocols(newArray) 
        }
    };

    const updateHistory =(e) => {
        const { name, value } = e.target;
        clearErrors(name)

console.log("IN UPDATE HISTORY")

        const newHistoryRecord = deepCopy(historyRecord)
        const newHistoryArray = deepCopy(formState.history)
        newHistoryRecord.description[lang] = value
        newHistoryArray[0]= newHistoryRecord
        
        setFormState((prevState) => ({ ...prevState, history: newHistoryArray }));
        setHistoryRecord(newHistoryRecord)
    }

    // *************** SAVE FORM ITEM *****************

    function handleSaveForm(){
        const objArr = { formState: formState, elements: elements, protocols: protocols, 
            historyRecord: historyRecord, lang: lang }
        const newErrors = validateFields( objArr )
        setErrors(newErrors)

        console.log("newErrors", newErrors)

        if (Object.keys(newErrors).length < 1) {
            const newRecord = marshalRecord(formState, elements, protocols, regions)

            console.log("formState@save", formState)

            saveItemToDb( newRecord ).then((r) => {
                if (r === 'success') {
                    // Remove the item from memory so we don't see duplicates
                    const preMinId = getPreviousMinId(newRecord.verNum, newRecord.minId)
                    addRemoveItemInMemory(newRecord, preMinId)

                    handleNewItemChange(null)

                    handleGoto( '/studio/' + newRecord.type.toLowerCase() + "/" + urlizeString(newRecord.title[ lang ]) + "/" + newRecord.minId )
                    // reloadProtocols()
                    // integrate item into db 
                }
            })
        }
    }

    function getPreviousMinId(verNum, minId){
        const perviousVerNum = DecrementMinorVersion(verNum)
        const minIdArr = minId.split('.')
        const previousMinId = minIdArr[0] + '.' + minIdArr[1] + '.' + perviousVerNum
        console.log("previousMinId", previousMinId )
        return previousMinId
    }

    function cancelEdit() {
        handleNewItemChange(null)
        setFormState({ ...originalState });

        const perviousMinId = getPreviousMinId(formState.verNum, formState.minId)

        const urlTitle = ( formState.title[ lang ] !== "" ) 
            ? formState.type.toLowerCase() + "/" + urlizeString(formState.title[ lang ]) + "/" + perviousMinId
            : "need/" + urlizeString(formState.needTitle[ lang ]) + "/" + formState.needMajId
        handleGoto( '/studio/' + urlTitle )
    }

    // console.log("formState", formState)


    if ( !formState ) return ( null )
    
    // FORM IS READY NEED TO CHECK OF FORM GOT DIRTY
    const ready = (formState.title != "") ? false : true

    // console.log('Steps', steps)


    // console.log("ELEMENTS", elements)

    
    function handleArea(props) {
        const { version, show } = props
        const newShow = show === 'none' ? 'flex' : 'none';

        // if (version === 'header') setHeaderShow( newShow )
        // if (version === 'content') setContentShow( newShow )
        if (version === 'items' ) setItemsShow( newShow )
        // if (version === 'attrib' ) setAttribShow( newShow )
        // if (version === 'history' ) setHistoryShow( newShow )   
    }

    function handleLanguage(newLang){
        // console.log("CHANGE LANG:", newLang)
        // setLang(newLang)
    }

    console.log('formstate', formState)
    console.log('parentNeeds', parentNeeds)

    const textFlag = (displayState === 'add') ?  'NEW ' + formState.type.toUpperCase() : 'EDITING ' + formState.type.toUpperCase()

    const showAllText = (showAll) ? "Hide All" : "Show All"

    return (
        <form key={ formState.versionId }>
        <Card key={formState.id} className="itemCard" >

            <HeaderArea item={ formState } lang={ lang } handleLanguage={ handleLanguage } displayState={ displayState }/>

            {/* **** SHOW THE EDITING RED FLAG **** */}
            <Box style={{ fontSize:'1.5em', width:'100%', fontWeight:700, color:'white', marginTop:'20px', 
                backgroundColor:'#CC3300' }}>{ textFlag }</Box>

            <Box className='itemCardShowLink' style={{ marginBottom:'-14px' }} onClick={ () => { setShowAll(!showAll) }}>
                    { showAllText }
            </Box>

            <HeaderAreaEdit formState={ formState } parentNeeds={ parentNeeds } errors={ errors } 
                handleFieldChange={ handleFieldChange } handleEditRemoveParent={ handleEditRemoveParent }
                handleParentList={ handleParentList } lang={ lang } handleEditAddParent={ handleEditAddParent }
                show={ showAll } needsList={ needsList } />

            { formState.type !== "Need" &&
                <RegionsAreaEdit regions={ regions } errors={ errors } updateArrayItems={ updateArrayItems } 
                    addArrayItem={ addArrayItem } removeArrayItem={ removeArrayItem } show={ showAll } />
            }
            
            {/* ****** INTRO FOR PROTOCOLS & GUIDES ONLY ****** */}
            { formState.type !== "Need" &&
                <IntroAreaEdit formState={ formState } errors={ errors } handleFieldChange={ handleFieldChange } 
                    lang={ lang } show={ showAll } />
            }

            { formState.type === "Protocol" &&
                <ElementsAreaEdit elements={ elements } setElements={ setElements }
                    errors={ errors } updateArrayItems={ updateArrayItems } addArrayItem={ addArrayItem } 
                    removeArrayItem={ removeArrayItem } lang={ lang } show={ showAll } />
            }

            { formState.type === "Guide" &&
                <ProtocolsAreaEdit protocols={ protocols } setProtocols={ setProtocols }
                    errors={ errors } updateArrayItems={ updateArrayItems } addArrayItem={ addArrayItem }
                    removeArrayItem={ removeArrayItem } lang={ lang } show={ showAll } db={ db } formState={ formState } />
            }

            { formState.type !== "Need" &&
                <ClosingAreaEdit formState={ formState } errors={ errors } handleFieldChange={ handleFieldChange } 
                    lang={ lang } show={ showAll } />
            }

            { formState.type !== "Need" &&
                <AttributionAreaEdit formState={ formState } errors={ errors } handleFieldChange={ handleFieldChange } 
                    lang={ lang } show={ showAll } />
            }

            <HistoryAreaEdit history={ formState.history } historyRecord={ historyRecord } errors={ errors } 
                minId={ formState.minId } updateHistory={ updateHistory } lang={ lang } show={ showAll } />

            {/* // *********** FORM FOOTER *********** */}
            <Box color='#CC3300'>* Required</Box>

            <Box margin={ 1 } mt={2}>
                <Button variant="contained" size="small" disabled={ready} 
                    onClick={()=>{ handleSaveForm() }}>
                    Save
                </Button>
                &nbsp; &nbsp;
                <Button variant="outlined" size="small"
                    onClick={()=>{ cancelEdit() }}>
                    Cancel
                </Button>
            </Box>
            </Card>
        </form>
    )
}