import { useEffect, useState } from 'react';
import { Box, Card, CardActions, Button } from '@mui/material'
import Accordion from '../../Accordion';
import { getUserObject, getUserName, deepCopy } from '../../GlobalFunctions';
import ProtocolForm from '../EditPage/EditItemPage';
import EditIcon from '@mui/icons-material/EditNote';
import ForkIcon from '@mui/icons-material/ForkRight';
import AdoptIcon from '@mui/icons-material/FactCheck';
import CloseIcon from '@mui/icons-material/CloseOutlined';
import GuideIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/AddCircleOutline';

import AttributionArea from './AttributionArea';
import ClosingArea from './ClosingArea';
import ElementsArea from './ElementsArea';
import HeaderArea from '../HeaderArea';
import HistoryAreaView from './HistoryAreaView';
import IntroArea from './IntroArea';
import LinkedItemsArea from './LinkedItemsArea';
import ProtocolsArea from './ProtocolsArea';

import AddItemPopup from './AddItemPopup';
import RegionsArea from './RegionsArea';


export default function ViewItemPage(props) {
    const { item, getLinkedItems, handleGoto, displayState, handleBuildNewItem,
        db, relDb, handleSetAddSet, needsList } = props
    // const [ introShow, setIntroShow ] = useState( 'none' )
    // const [ elemShow, setElemShow ] = useState( 'none' )
    // const [ protoShow, setProtoShow ] = useState( 'none' )
    // const [ linksShow, setLinksShow ] = useState( 'none' )
    // const [ attribShow, setAttribShow ] = useState( 'none' )
    // const [ histShow, setHistShow ] = useState( 'none' )
    const [ lang, setLang ] = useState('en')
    const [ showAll, setShowAll ] = useState( true )
    const [ linkedItems, setLinkedItems ] = useState([])
    const [ addPopup, setAddPopup ] = useState(false)
    const [ parentNeeds, setParentNeeds ] = useState( [] )
    
    // console.log("inside Item View :)", item)

    useEffect(() =>{
        // Create "setParentNeeds" as list of { title & majId }
        // from the list of majId in parentNeeds
        const parentIdSet = new Set( item.parentNeeds )
        const filteredParents = needsList.filter(obj => parentIdSet.has(obj.majId))
        setParentNeeds(filteredParents)
    }, [ needsList, item ])


    useEffect(() => {
        setLinkedItems(getLinkedItems(item.majId, item.minDate))
    }, [ item.majId, item.minDate, getLinkedItems ])


    function handleLanguage(newLang){
        // console.log("CHANGE LANG:", newLang)
        setLang(newLang)
    }
    
    const user = getUserObject()

    // console.log("protocol", protocol)

    function shrinkText(text, maxLength) {
        if (text.length > maxLength) {
          return text.substring(0, maxLength).trimEnd() + "...";
        } else {
          return text;
        }
    }

    function handleViewAddLink(newParent){
        // THIS IS ABOUT ADDING A LINK FROM THE CHILD TO THIS ITEM
        // WILL NEED TO EDIT AND SAVE THE CHILD
        const newList = deepCopy(parentNeeds)
        newList.unshift(newParent)
        handleParentChange(newList)
    }

    function handleParentChange( newParents ){
        
        console.log('NEEDS CHANGE', newParents)
        const parentIdsList = []
        newParents.forEach(parent => {
            parentIdsList.push( parent.majId )
        })
 
        // WILL NEED TO EDIT THE CHILD
        // setFormState((prevState) => ({
        //     ...prevState,
        //     parentNeeds: parentIdsList
        // }));
    }

    function formatElements(text, part) {
        if (text.includes(":")) {
            const array = text.split(":", 2)
            return array[part]
        } else {
          return text;
        }
    }

    // function handlePopup(state){
    //     console.log('Handleing POPUP', state)
    //     setAddPopup(state)
    // }

    function addNewItem(type){
        // console.log("IN ADD NEW ITEM")
        const parents = []
        parents.push(item.majId)
        handleBuildNewItem( type, parents )
        setAddPopup(false)
        handleGoto('/studio/add/')
    }

    function addNewSet(setObj){
        handleSetAddSet(setObj)
        setAddPopup(false)
        handleGoto('/studio/add-set/')
    }

    // function handleButtons(button){
    //     if (button === 'add') {
    //         console.log('ADD BUTTON: OPEN POPUP')
    //         setAddPopup( true )
    //         // handleGoto( '/studio/add/'+ item.id )
    //     }
    // }

    // console.log('**USER**', getUserName())
    
    // console.log('**item**', item)

    if (!item) return null

    const showAllText = (showAll) ? "Hide All" : "Show All"

    return (
        <Box marginTop='30px'>
            <AddItemPopup item={ item } addPopup={ addPopup } setAddPopup={ setAddPopup } 
                addNewItem={ addNewItem } addNewSet={ addNewSet } db={ db } lang={ lang }
                handleViewAddLink={ handleViewAddLink } />
        
            <Card key={item.id} className="itemCard" >

                <HeaderArea item={ item } lang={ lang } handleLanguage={ handleLanguage } 
                    handleGoto={ handleGoto } displayState={ displayState } 
                    parentNeeds={ parentNeeds } />

                <Box className='itemCardShowLink' onClick={ () => { setShowAll(!showAll) }}>
                    { showAllText }
                </Box>

                { item.type !== "Need" &&
                    <RegionsArea regions={ item.regions } lang={ lang } show={ showAll } /> 
                }

                { item.type !== "Need" &&
                    <IntroArea intro={ item.intro } lang={ lang } show={ showAll } /> 
                }

                { (item.type === "Protocol") &&
                    <ElementsArea elements={ item.elements } lang={ lang } show={ showAll } />
                }

                { (item.type === "Guide") &&
                    <ProtocolsArea protocols={ item.protocols } lang={ lang } show={ showAll }
                        handleGoto={ handleGoto } />
                }

                { item?.type === 'Need' &&
                    <LinkedItemsArea linkedItems={ linkedItems } lang={ lang } show={ showAll } 
                        handleGoto={ handleGoto } setAddPopup={ setAddPopup } />
                }

                { item.type !== "Need" &&
                    <ClosingArea closing={ item.closing } lang={ lang } show={ showAll } /> 
                }

                { item.type !== "Need" &&
                    <AttributionArea item={ item } lang={ lang } show={ showAll } />
                }

                <HistoryAreaView item={ item } history={ item.history } lang={ lang } show={ showAll } />
                
                <CardActions>
                    { (!user) &&
                        <span style={{ fontSize:'.65em', color:'red' }}>Login to Edit, Fork, and Adopt</span>
                    }
                    { (user) &&
                        <Box marginTop='20px'>
                            { item.type !== 'Need' &&
                                <Button size="small" variant="contained" style={{ margin:'4px' }} disabled
                                    onClick={() => { handleGoto( '/studio/adopt/' + item.minId ) }}  
                                    endIcon={ <AdoptIcon /> }>ADOPT</Button>
                            }

                            {/* <Button size="small" variant="contained" style={{ margin:'4px' }}
                                    onClick={() => { setAddPopup(true ) }}
                                    endIcon={ <AddIcon /> }>Link</Button> */}
                                
                            {/* <Button size="small" variant="outlined" style={{ margin:'4px' }}
                                    onClick={() => { handleGoto( '/studio/' + item.id ) }}  
                                    endIcon={ <GuideIcon /> }>GUIDE</Button> */}

                            

                            <Button size="small" variant="outlined" style={{ margin:'4px' }}
                                onClick={() => { handleGoto( '/studio/edit/' + item.minId ) }} 
                                endIcon={ <EditIcon /> }>EDIT</Button>
                            { item.type !== 'Need' &&
                                <Button size="small" variant="outlined" style={{ margin:'4px' }} 
                                    onClick={() => { handleGoto( '/studio/fork/' + item.minId ) }}
                                    endIcon={ <ForkIcon /> }>FORK</Button>
                            }

                            <Button size="small" variant="outlined" style={{ margin:'4px' }}
                                onClick={() => { handleGoto( '/studio/search/' ) }} 
                                endIcon={ <CloseIcon /> }>CLOSE</Button>

                    
                            
                            
                        </Box>
                    }
                </CardActions>
            </Card>
        </Box>
    )
}