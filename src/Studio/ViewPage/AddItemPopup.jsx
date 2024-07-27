import { Autocomplete, Box, Button, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import { getItemColor } from '../../GlobalFunctions';
import { useMemo, useRef } from 'react';


export default function AddItemPopup(props) {
    const { item, addPopup, setAddPopup, addNewItem, addNewSet, db, lang, handleViewAddLink } = props
    // const inputRef = useRef(null);

    // console.log('Needs List', needsList)
    const sortedItems = useMemo(() => {
        const reducedList = db.map(need => ({
            majId: need.majId,
            title: need.title[ lang ]
        })).filter((i) => (item.majId !== i.majId && i.title !== undefined) )
        reducedList.push( { majId: "1", title: "  Link a Parent Need" } )
        return reducedList.sort(function(a, b) {
            let textA = a.title.toUpperCase();
            let textB = b.title.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        }, [lang, db, item ]);

    // const selectedValue = useMemo(() => { 
    //     // return sortedItems.find((sortedNeed) => sortedNeed.majId === item.needMajId)
    //     return sortedItems.find((sortedNeed) => sortedNeed.majId === "" )
    // }, [ sortedItems ]); //, item.needMajId

    if (!sortedItems) return null

    const selectedValue = 1

    return (
        <Dialog open={ addPopup }>
            <DialogTitle>{ 'Add/Link Items to:' }</DialogTitle>
            <Box display='flex' flexDirection='column' width='340px' alignContent='center' 
                alignItems='center' paddingBottom='30px'>
                
                <Box marginBottom='10px' fontSize='1.2em'><b>{ item.title[ lang ] }</b></Box>
                <Box display='flex' flexDirection='row'>
                    <Button size="small" variant="contained" style={{ margin:'4px', width:'145px', 
                        backgroundColor:getItemColor('Need') }} endIcon={ <AddIcon /> }
                        onClick={ () => { addNewItem('Need') }}>Need</Button>

                    <Button size="small" variant="outlined" style={{ margin:'4px', width:'145px',
                        color:getItemColor('Need'), borderColor: getItemColor('Need') }} endIcon={ <AddIcon /> }
                        onClick={ () => { addNewSet( 
                            {
                                type: 'Need',
                                needMajId: item.majId
                            }
                        )}}>Need Set</Button>
                </Box>

                <Box display='flex' flexDirection='row'>
                    <Button size="small" variant="contained" style={{ margin:'4px', width:'145px', 
                        backgroundColor:getItemColor('Protocol') }} endIcon={ <AddIcon /> }
                        onClick={ () => { addNewItem('Protocol') }}>Protocol</Button>
                         
                    <Button size="small" variant="outlined" style={{ margin:'4px', width:'145px',
                        color:getItemColor('Protocol'), borderColor: getItemColor('Protocol') }} endIcon={ <AddIcon /> }
                        onClick={ () => { addNewSet( 
                            {
                                type: 'Protocol',
                                needMajId: item.majId 
                            }
                        )}}>Protocol Set</Button>
                </Box>

                <Box display='flex' flexDirection='row'>
                    <Button  size="small" variant="contained" style={{ margin:'4px', width:'145px', 
                        backgroundColor:getItemColor('Guide') }} endIcon={ <AddIcon /> }
                        onClick={ () => { addNewItem('Guide') }}>Guide</Button>

                    <Button size="small" variant="outlined" style={{ margin:'4px', width:'145px',
                        color:getItemColor('Guide'), borderColor: getItemColor('Guide') }} endIcon={ <AddIcon /> }
                        onClick={ () => { addNewSet( 
                            {
                                type: 'Guide',
                                needMajId: item.majId 
                            }
                        )}}>Guide Set</Button>    
                </Box>

                {/* <Box marginTop="16px" >
                    <Autocomplete id="item-selector" key={ sortedItems.majId } sx={{ width:'300px' }}
                        options={ sortedItems } autoHighlight clearOnEscape
                        value={ selectedValue }
                        getOptionLabel={(option) => { return option.title || '' }}
                        // onChange={(event, newValue) => {
                            // console.log('newValue', newValue)
                            // handleParentChange(newValue.majId, needsList.find(need => need.majId === newValue.majId).title)
                        // }}
                        onChange={(event, newValue) => {
                            handleViewAddLink( newValue )
                            inputRef.current.blur();
                        }}
                        renderOption={(props, option) => ( <li {...props} key={option.majId} style={{ textAlign:'left' }}>{ option.title }</li>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} label="Link Existing Item" size='small'
                                inputRef={ inputRef } />
                        )}
                    />
                </Box> */}

                <Button  size="small" variant="outlined" 
                    style={{ margin:'4px', width:'200px', marginTop:'20px' }}
                    onClick={ () => { setAddPopup(false) }}>Cancel</Button>
            </Box>
        </Dialog>
    )
}