import { Fragment, useEffect, useState } from 'react';
import { Box, Card, CardActions, Button, Tooltip } from '@mui/material'
import { getUserObject, getUserName, deepCopy, wordCase, urlizeString } from '../../GlobalFunctions';
import ProtocolForm from '../EditPage/EditItemPage';
import EditIcon from '@mui/icons-material/EditNote';
import PromoteIcon from '@mui/icons-material/PlusOne';
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
import BreadcrumbTabs from '../BreadcrumbTabs';
import { useParams } from 'react-router';

export default function ViewItemPage(props) {
    const { item, getLinkedItems, handleGoto, action, handleBuildNewItem,
        db, relDb, handleSetAddSet, needsList } = props
    // const [ lang, setLang ] = useState('en')
    const { lang } = useParams();
    const [ editLang, setEditLang ] = useState( lang )
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
        // console.log("IN LINKED ITEMS USEEFFECT")
        setLinkedItems(getLinkedItems(item.majId, item.minDate))
    }, [ item.majId, item.minDate, getLinkedItems ])

    function handleLanguage(newLang){
        // console.log("CHANGE LANG:", newLang)
        setEditLang(newLang)
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
        handleGoto(`/${lang}/studio/add/`)
    }

    function addNewSet(setObj){
        handleSetAddSet(setObj)
        setAddPopup(false)
        handleGoto(`/${lang}/studio/add-set/`)
    }

    // console.log('**USER**', getUserName())
    
    // console.log('**item**', item)

    const version = item.verNum.split(".")[0]

    const buttons = (
        <Fragment>
            <Tooltip title={`Edit ${wordCase(item.type)}`} placement="top">
            <Button size="small" variant="contained" style={{ margin:'4px' }}
                onClick={() => { handleGoto( `/${lang}/studio/edit/${item.minId}` ) }} 
                endIcon={ <EditIcon /> }>EDIT</Button>
            </Tooltip>
            
            { version === '0' &&
                <Tooltip title={`Promote ${wordCase(item.type)} from v.${item.verNum} to v.1.0`} placement="top">
                    <Button size="small" variant="outlined" style={{ margin:'4px' }} 
                        onClick={() => { handleGoto( `/${lang}/studio/promote/${ urlizeString( item.title[lang] )}/${item.minId}` ) }}
                        endIcon={ <PromoteIcon /> }>PROMOTE</Button>
                </Tooltip>
            }

            { item.type === 'Protocol' && version !== "0" &&
                <Tooltip title={`Copy ${wordCase(item.type)} to New Version`} placement="top">
                    <Button size="small" variant="outlined" style={{ margin:'4px' }} 
                        onClick={() => { handleGoto( `/${lang}/studio/fork/${ urlizeString( item.title[lang] || item.title.en )}/${item.minId}`) }}
                        endIcon={ <ForkIcon /> }>FORK</Button>
                </Tooltip>
            }

            {/* <Button size="small" variant="outlined" style={{ margin:'4px' }}
                onClick={() => { handleGoto( `/${lang}/studio` ) }} 
                endIcon={ <CloseIcon /> }>CLOSE</Button> */}
        </Fragment>
    )

    if (!item) return null

    // console.log("item", item)

    const showAllText = (showAll) ? "Hide All" : "Show All"

    return (
        <Box marginTop='30px' id='view-item' style={{ scrollBehavior:'smooth' }}>
            <AddItemPopup item={ item } addPopup={ addPopup } setAddPopup={ setAddPopup } 
                addNewItem={ addNewItem } addNewSet={ addNewSet } db={ db } lang={ lang }
                handleViewAddLink={ handleViewAddLink } />

            { item && relDb && db && 
                <BreadcrumbTabs item={ item } relDb={ relDb } db={ db } handleGoto={ handleGoto } prePost="pre" lang={ lang } />
            }
        
            <Card key={item.id} className="itemCard" >

                <HeaderArea item={ item } lang={ editLang } handleLanguage={ handleLanguage } 
                    handleGoto={ handleGoto } action={ action } 
                    parentNeeds={ parentNeeds } relDb={ relDb } db={ db } />

                { (!user) &&
                    <span style={{ fontSize:'.65em', color:'red' }}>
                        Login to Edit, Fork, or Adopt
                    </span>
                }
                { (user) && <Box marginTop='20px'>{ buttons }</Box> }

                <Box className='itemCardShowLink' onClick={ () => { setShowAll(!showAll) }}>
                    { showAllText }
                </Box>

                { item.type !== "Need" &&
                    <RegionsArea regions={ item.regions } lang={ editLang } show={ showAll } /> 
                }

                { item.type !== "Need" &&
                    <IntroArea intro={ item.intro } lang={ editLang } show={ showAll } /> 
                }

                { (item.type === "Protocol") &&
                    <ElementsArea elements={ item.elements } lang={ editLang } show={ showAll } />
                }

                { (item.type === "Protocol") &&
                    <ProtocolsArea protocols={ item.protocols } lang={ editLang } show={ showAll }
                        handleGoto={ handleGoto } db={ db } />
                }

                { item?.type === 'Need' &&
                    <LinkedItemsArea linkedItems={ linkedItems } lang={ editLang } show={ showAll } 
                        handleGoto={ handleGoto } setAddPopup={ setAddPopup } />
                }

                { item.type !== "Need" &&
                    <ClosingArea closing={ item.closing } lang={ editLang } show={ showAll } /> 
                }

                { item.type !== "Need" &&
                    <AttributionArea item={ item } lang={ editLang } show={ showAll } />
                }

                <HistoryAreaView item={ item } history={ item.history } lang={ editLang } show={ showAll } />

                <img height="36px" style={{marginTop:"-8px"}} 
                    src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-sa.png"/>
                
                <CardActions sx={{ marginBottom:'20px' }}>
                    { (!user) &&
                        <span style={{ fontSize:'.65em', color:'red' }}>Login to Edit, New Version, or Adopt</span>
                    }
                    { (user) &&
                        <Box marginTop='20px'>{ buttons }</Box>
                    }
                </CardActions>
            </Card>
            
            { item && relDb && db && 
                <BreadcrumbTabs item={ item } relDb={ relDb } db={ db } handleGoto={ handleGoto } prePost="post" lang={ lang }/>
            }

        </Box>
    )
}