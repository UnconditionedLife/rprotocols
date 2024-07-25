import { useEffect, useState } from 'react';
import { Box } from '@mui/material'
import Accordion from '../../Accordion';
import { wordCase } from '../../GlobalFunctions';
import { continents, countries } from 'countries-list';

export default function RegionsArea(props) {
    const { regions, lang, show } = props
    const [ contentShow, setContentShow ] = useState( 'none' )

    useEffect(() => {
        setContentShow( show ? 'flex' : 'none')
    }, [ show ])

    function handleShow() {
        setContentShow( contentShow === 'none' ? 'flex' : 'none' )
    }

// console.log("REGIONS",regions)


    return (
        <Box display='flex' flexDirection='column' width='100%' marginTop='12px'>
            <Accordion version='reg' title='Regions' show={ contentShow } handleArea={ handleShow } />
            <Box display={ contentShow } marginLeft='20px' pt={ 1 } width='calc(100% - 50px)' textAlign='left' style={{ flexDirection:'row', justifyContent:'center'}}>
                { regions.map((entry, i) => (
                    <Box key={ i } style={{  display:'flex', flexDirection:'row' }} alignSelf='center'>

                        {  entry.level === 'continent' &&
                            <Box display='flex' flexDirection='column' margin='6px' marginTop='-10px' marginBottom='-6px'>
                                <Box className='cardElements' style={{ fontWeight: 600, marginBottom:'3px' }}>
                                    { (entry.location === 'GB' ) && <span>GLOBAL</span> }
                                    { (entry.location !== 'GB' ) && <span>{ continents[entry.location] }</span>}
                                </Box>
                                <Box className='cardElements'>
                                    <img src={ '/ContinentIcons/' +  wordCase(entry.location) + 'Icon.png' } height="48px" /> 
                                </Box>
                                
                            </Box>
                        }
                        {  entry.level === 'nation' &&
                            <Box display='flex' flexDirection='column'  margin='6px' marginTop='-10px' marginBottom='-6px'>
                                <Box className='cardElements' style={{ width:'100%', fontWeight: 600, marginBottom:'3px', 
                                    marginLeft:'0px', textAlign:'center' }}>
                                    { countries[entry.location].name }
                                </Box>
                                <Box height='48px' alignContent='center' textAlign='center'>
                                    <img src={ "https://flagcdn.com/" + entry.location.toLowerCase() + ".svg" } width="48"></img>
                                </Box> 
                            </Box>
                        }
                        
                    </Box>
                ))}
            </Box>
        </Box>
    )
}