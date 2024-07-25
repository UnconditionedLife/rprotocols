import { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import Accordion from '../../Accordion';
import Remove from '@mui/icons-material/DeleteForever';
// import ReorderIcon from '@mui/icons-material/SwapVert';
// import { Reorder } from 'framer-motion';
import { countries } from 'countries-list'

export default function RegionsAreaEdit(props) {
    const { regions, errors, updateArrayItems, addArrayItem, removeArrayItem, show } = props

    const [ contentShow, setContentShow ] = useState( 'none' )

    useEffect(() => {
        setContentShow( show ? 'flex' : 'none')
    }, [ show ])

    function handleShow() {
        setContentShow( contentShow === 'none' ? 'flex' : 'none' )
    }
    const countryNames = Object.keys(countries).map(code => {
        return {
            code: code,
            name: (countries[code].name.length < 30) ? countries[code].name : 
                countries[code].name.substring(0, 32) + "..."
        };
    });

    function labelizeIt(value){
        const values = {
            stateProvince: 'State/Province Name',
            county: 'County Name',
            city: 'City Name'
        }
        return values[value]
    }

    return (
        <Box display='flex' flexDirection='column' width='100%' marginTop='12px'>
            <Accordion title='Regions' show={ contentShow } handleArea={ handleShow } />
            <Box display={ contentShow } marginLeft='16px' pt={ 1 } width='calc(100% + 16px)' textAlign='left' flexDirection='column'>                
                <Box className='formFieldContainer'>
                    {/* <Reorder.Group axis="y" values={regions} onReorder={setRegions} as='div'> */}
                        { regions.map((region, index) => (
                            // <Reorder.Item key={region.id} value={region} as='div'>
                                <Box key={ region.id } className='formElementRow' backgroundColor='white' style={{ marginLeft:'',  display:'flex', alignItems:'stretch' }}>
                                    {/* <Box style={{ display:'flex', alignItems:'center'}}>
                                            <ReorderIcon fontSize='medium' style={{ color:'lightgray', margin:"4px", cursor: "ns-resize"}} />
                                    </Box> */}
                                    <TextField select size='small' className='formRegionField' variant="standard"
                                        key={ 'level-' + index } label= 'Level' value={ region.level }
                                        defaultValue={'continental'}
                                        onChange={(e) => updateArrayItems( regions, 'reg', index, e.target.value, 'level' )}>
                                            <MenuItem value='continent'>Continental</MenuItem>
                                            <MenuItem value='nation'>National</MenuItem>
                                            <MenuItem value='stateProvince'>State/Provincial</MenuItem>
                                            <MenuItem value='county'>County</MenuItem>
                                            <MenuItem value='city'>City</MenuItem>
                                    </TextField>
                                    { region.level === 'continent' &&
                                        <TextField select size='small' className='formRegionField' variant="standard"
                                           style={{ marginLeft:'12px' }}
                                           key={ 'continents-' + index } label= 'Continents' value={ region.location }
                                           // error={ errors?.tags?.error } helperText = { errors?.tags?.helperText }
                                           defaultValue={'global'}
                                           onChange={(e) => updateArrayItems( regions, 'reg', index, e.target.value, 'location' )}>
                                               <MenuItem value='GB'>Global</MenuItem>
                                               <MenuItem value='AF'>Africa</MenuItem>
                                               <MenuItem value='AN'>Antarctica</MenuItem>
                                               <MenuItem value='AS'>Asia</MenuItem>
                                               <MenuItem value='EU'>Europe</MenuItem>
                                               <MenuItem value='NA'>North America</MenuItem>
                                               <MenuItem value='OC'>Oceania</MenuItem>
                                               <MenuItem value='SA'>South America</MenuItem>
                                        </TextField>
                                    }
                                    { region.level === 'nation' &&
                                        //list of countries
                                        <TextField select size='small' className='formRegionField' variant="standard"
                                            style={{ marginLeft:'12px' }}
                                            key={ 'nations-' + index } label= 'Nations' value={ region.location }
                                            // error={ errors?.tags?.error } helperText = { errors?.tags?.helperText }
                                            // defaultValue={'global'}
                                            onChange={(e) => updateArrayItems( regions, 'reg', index, e.target.value, 'location' )}>
                                                { countryNames.map((country, index) => (
                                                    <MenuItem key={ 'country-' + index } value={country.code}>{country.name}</MenuItem>
                                                ))}
                                        </TextField>
                                    }
                                    { (region.level !== 'continent' && region.level !== 'nation') &&
                                        <TextField size='small' className='formRegionField' variant="standard"
                                        style={{ marginLeft:'12px' }}
                                        key={ region.level +'-' + index } label={labelizeIt(region.level)} value={ region.location }
                                        // error={ errors?.tags?.error } helperText = { errors?.tags?.helperText }
                                        // defaultValue={'global'}
                                        onChange={(e) => updateArrayItems( regions, 'reg', index, e.target.value, 'location' )}>
                                    </TextField>
                                    }
                                    { (index !== 0 ) &&
                                        <Box style={{ display:'flex', alignItems:'center'}}
                                            onClick={ () => { removeArrayItem( regions, 'reg', index ) }} >
                                                <Remove fontSize='medium' style={{ color:'lightgray', margin:"4px", cursor: "pointer"}} />
                                        </Box>
                                    }
                                    { (index === 0 ) &&
                                        <Box style={{ width:'35px', display:'flex', alignItems:'center'}} ></Box>
                                    }
                                </Box>
                            // </Reorder.Item>
                        ))}
                    {/* </Reorder.Group> */}
                </Box>
                <Button style={{ width:'calc(100% - 50px)', marginTop:'0px', marginBottom:'-10px'}} onClick={ () => { addArrayItem(regions, 'reg') }}>Add Region</Button>
            </Box>
        </Box>
    )
}