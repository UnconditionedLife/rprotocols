import { useState, useEffect } from 'react';
import { Box, TextField, Card, Button } from '@mui/material'
import { BuildNewHistory, BuildNewItem, saveItemToDb } from '../StudioFunctions.jsx';

// import { dbSaveItemAsync } from '../Database.js';

// import { deepCopy } from '../../GlobalFunctions.jsx';
// import HeaderArea from '../HeaderArea.jsx';
// import { BuildNewHistory, AddIdToArray, IncrementMinorVersion, 
//     validateFields, saveItemToDb, marshalRecord } from '../StudioFunctions.jsx';
// import IntroAreaEdit from './IntroAreaEdit.jsx';
// import HeaderAreaEdit from './HeaderAreaEdit.jsx';
// import ClosingAreaEdit from './ClosingAreaEdit.jsx';
// import HistoryAreaEdit from './HistoryAreaEdit.jsx';
// import AttributionAreaEdit from './AttributionAreaEdit.jsx';
// import RegionsAreaEdit from './RegionsAreaEdit.jsx';
// import ElementsAreaEdit from './ElementsAreaEdit.jsx';
// import ProtocolsAreaEdit from './ProtocolsAreaEdit.jsx';
import NeedSelector from '../EditPage/NeedSelector.jsx';
import { deepCopy, urlizeString } from '../../GlobalFunctions.jsx';
import HeaderArea from '../HeaderArea.jsx';


export default function AddSetPage(props) {
    const { setInfo, handleSetAddSet,  needsList, displayState, addRemoveItemInMemory, 
        handleGoto } = props;
    const [ setText, setSetText ] = useState("")
    const [ needMajId, setNeedMajId ] = useState("")
    const [ needTitle, setNeedTitle ] = useState({})
    const [ setArr, setSetArr ] = useState([])
    const [ loaded, setLoaded ] = useState( false )
    const [ lang, setLang ] = useState('en')
    

    useEffect(() => {
        setNeedMajId(setInfo.needMajId)
        setNeedTitle(setInfo.needTitle)
    }), [ setInfo ]

    const handleSetTextChange = (e) => {
        const { name, value } = e.target;
        
        // TODO CHECK THAT THEIR ARE THE RIGHT NUMBER OF LINES

        setSetText(value)
    }

    function handleProcessSet(){
        const setOfSetsArr = setText.split("\n\n")

        console.log(setOfSetsArr)

        const minItemsArr = []
        setOfSetsArr.forEach((set) => {

            // SPLIT SET INTO LINES
            const tempSetArr = set.split("\n")
            if (tempSetArr.length === 3) {

                // CLEAN LINES INCASE THEY HAVE TITLES OR SPACES
                tempSetArr.forEach((line, index) => {
                    if (line.includes(':')) {
                        const lineArr = line.split(':')
                        tempSetArr[index] = lineArr[1].trim()
                    } else {
                        tempSetArr[index] = line.trim()
                    }
                })

                //CREATE NEW ITEM OBJECT
                const minItem = {
                    type: setInfo.type,
                    title: {},
                    description: {},
                    tags: {},
                    parentNeeds: [],
                    needMajId: "",
                    needTitle: ""
                }
                minItem.parentNeeds.push(setInfo.needMajId)
                minItem.title[ lang ] = tempSetArr[0]
                minItem.description[ lang ] = tempSetArr[1]
                minItem.tags[ lang ] = tempSetArr[2]
                minItemsArr.push( minItem )

            } else if (tempSetArr.length > 3) {
                // Show Error
                console.error("ERROR", "TOO MANY LINES")
            } else if (tempSetArr.length < 3) {
                // Show Error
                console.error("ERROR", "NOT ENOUGH LINES")
            }
        })
        const basicItemsArr = []
        minItemsArr.forEach((minItem) => {
            const basicItem = BuildNewItem(minItem.type, minItem.parentNeeds, 
                    minItem.title, minItem.description, minItem.tags)  // type, parentNeeds, title, description, tags
                basicItem.history.push(BuildNewHistory('1.0'))
                basicItem.history[0].description[ lang ] = "Initial Version - set uploaded"
                basicItemsArr.push(basicItem)
        })

        console.log("SET", basicItemsArr)
        setSetArr(basicItemsArr)
        setLoaded(true)
    }

    const handleUploadFieldChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)

        // clear error for this field
        // clearErrors(name)

        const index = name.split("-")[0]
        const field = name.split("-")[1]

        const newArr = deepCopy(setArr)
        newArr[index][field][lang] = value 
        setSetArr(newArr)

    }

    function cancelSet(stage){

        console.log("CANCELING SET")
        if (stage === 'upload') {
            setSetText("")
            handleGoto('/studio/need/' + needMajId + "/" + urlizeString(needTitle[ lang ]) )
        }

        if (stage === 'save' ) {
            setSetArr([])
            setLoaded(false)
        }
        
        
    }

    function uploadSet(){
        setArr.forEach((item) => {
            console.log("saving items")

            saveItemToDb( item ).then((r) => {
                if (r === 'success') {

                    addRemoveItemInMemory(item, null)
                    // handleNewItemChange(null)

                    // TODO clear setInfo
    
                    handleGoto( '/studio/' + item.type.toLowerCase() + "/" + urlizeString(item.title[ lang ]) + "/" + item.minId )
                    // handleGoto('/studio/need/' + needMajId + "/" + urlizeString(needTitle[ lang ]) )
                    // reloadProtocols()
                    // integrate item into db 
                } else {
                    console.log("UNABLE TO SAVE ITEM", item)
                }
            })

        })
    }

    function handleLanguage(newLang){
        // console.log("CHANGE LANG:", newLang)
        setLang(newLang)
    }

    const notReady = false
    
    // () => {

    //     return false
    // }

    return (
        <Box marginTop='30px'>
            <Card key={setInfo.needMajId} className="itemCard" >
                { ( loaded === true ) && 
                <Box display='flex' flexDirection='column' width='100%' marginTop='0px'>
                    <Box display='flex' marginLeft='16px' pt={ 1 } width='calc(100% - 16px)' textAlign='left' flexDirection='column'> 

                        <HeaderArea item={ setInfo } displayState={ displayState } lang={ lang } />

                        <Box className='formFieldContainer'>
                            <b>SET OF ITEMS UPLOADED</b> <br/>
                            Please confirm that all { setInfo.type }s appear correct before saving them to the repository.
                        </Box>
                        
                        <Box className='formFieldContainer'>
                            {/* <NeedSelector formState={ formState } needsList={ needsList } handleParentChange={ handleParentChange } lang={ lang } /> */}
                        </Box>
                        { setArr.map((item, i) => (
                            <Box key={ item.minId }>
                                <Box className='formFieldContainer' marginBottom='-30px'><h4>Item #{ i + 1 }</h4></Box>
                                <Box className='formFieldContainer'><hr/></Box>
                                <Box className='formFieldContainer'>
                                    <TextField multiline size='small' className='formField' required
                                        label="Title" name={ i + "-title" } value={ item.title[ lang ] }
                                        // error={ errors?.description?.error } helperText = { errors?.description?.helperText }
                                        inputProps={{ style: { fontSize:'0.95em', fontWeight: "300", color:'#034007' } }}
                                        onChange={ handleUploadFieldChange }
                                        // onChange={(e) => updateArrayItems( elements, 'elem', index, e.target.value )}
                                    />
                                </Box>
                                <Box className='formFieldContainer'>
                                    <TextField multiline size='small' className='formField' required
                                        label="Description" name={ i + "-description" } value={ item.description[ lang ] }
                                        // error={ errors?.description?.error } helperText = { errors?.description?.helperText }
                                        inputProps={{ style: { fontSize:'0.95em', fontWeight: "300", color:'#034007' } }}
                                        onChange={ handleUploadFieldChange }
                                    />
                                </Box>
                                <Box className='formFieldContainer'>
                                    <TextField multiline size='small' className='formField' required
                                        label="Tags" name={ i + "-tags" } value={ item.tags[ lang ] }
                                        // error={ errors?.description?.error } helperText = { errors?.description?.helperText }
                                        inputProps={{ style: { fontSize:'0.95em', fontWeight: "300", color:'#034007' } }}
                                        onChange={ handleUploadFieldChange }
                                    />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box color='#CC3300'>* Required</Box>
                    <Box margin={ 1 } mt={2}>
                        <Button variant="contained" size="small" disabled={ notReady } 
                            onClick={()=>{ uploadSet() }}>
                            CONFIRM
                        </Button>
                        &nbsp; &nbsp;
                        <Button variant="outlined" size="small"
                            onClick={()=>{ cancelSet("save") }}>
                            Cancel
                        </Button>
                    </Box>   
                </Box>
                }
                { ( loaded === false ) && 
                <Box display='flex' flexDirection='column' width='100%' marginTop='0px'>
                    
                    <HeaderArea item={ setInfo } displayState={ displayState } lang={ lang }
                        handleLanguage={ handleLanguage }/>
                    
                    <Box display='flex' marginLeft='16px' pt={ 1 } width='calc(100% - 16px)' textAlign='left' flexDirection='column'>  

                    <Box className='formFieldContainer'>
                        <b>INSTRUCTIONS</b> <br/>
                        Currently <b>Add Set</b> only supports one Parent Need and the <b>Title, Description, and Tags (IN THAT ORDER)</b> in pain text delimited by line. 
                        Each <b>{ setInfo.type }</b> has to be separated by an empty line. All { setInfo.type }s will be added to the Parent Need listed above.
                    </Box>
                    
                    <Box className='formFieldContainer'>
                        {/* <NeedSelector formState={ formState } needsList={ needsList } handleParentChange={ handleParentChange } lang={ lang } /> */}
                    </Box>
                    <Box className='formFieldContainer'>
                        <TextField multiline size='small' className='formField' required
                            label="Line Delimited Text" name={ "setText" } value={ setText }
                            // error={ errors?.description?.error } helperText = { errors?.description?.helperText }
                            inputProps={{ style: { fontSize:'0.95em', fontWeight: "300", color:'#034007', height:'200px' } }}
                            onChange={ handleSetTextChange }
                        />
                    </Box>
                </Box>
                <Box color='#CC3300'>* Required</Box>
                <Box margin={ 1 } mt={2}>
                    <Button variant="contained" size="small" disabled={ notReady } 
                        onClick={()=>{ handleProcessSet() }}>
                        UPLOAD
                    </Button>
                    &nbsp; &nbsp;
                    <Button variant="outlined" size="small"
                        onClick={()=>{ cancelSet( 'upload' ) }}>
                        Cancel
                    </Button>
                </Box>   
            </Box>
                }
            </Card>
        </Box>
   )
}