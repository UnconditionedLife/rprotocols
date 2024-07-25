import { useEffect, useState } from 'react';
import { Box } from '@mui/material'
import Accordion from '../../Accordion';
import ReactMarkdown from 'react-markdown';

const RM = ReactMarkdown

export default function ElementsArea(props) {
    const { elements, lang, show } = props
    const [ contentShow, setContentShow ] = useState( 'none' )

    useEffect(() => {
        setContentShow( show ? 'flex' : 'none')
    }, [ show ])

    function handleShow() {
        setContentShow( contentShow === 'none' ? 'flex' : 'none' )
    }

    // return null

    return (
        <Box display='flex' flexDirection='column' width='100%' marginTop='12px'>
            <Accordion version='hist' title='Elements' show={ contentShow } handleArea={ handleShow } />
                <Box display={ contentShow } marginLeft='20px' pt={ 1 } width='100%' textAlign='left' style={{ flexDirection:'column'}}>

                        {/* <Box display={ protoShow } pt={ 0 } style={{ flexDirection:'column'}}> */}
                            {/* <div className='cardElements'><b>{ item.content.intro[lang] }</b><br/><br/></div> */}
                    { elements.map((element, i) => (
                        <Box key={ i } style={{  display:'flex', flexDirection:'row' }}>
                            {/* <div className='cardElements' style={{ width:'8px', color:'grey' }}>{ i+1 } </div> */}
                            <Box className='cardElements' 
                            style={{ width:'15px', height:'15px', marginTop:'-2px', fontWeight:600, borderRadius:'50%', 
                                paddingTop:'1px', border:"1px solid black", textAlign:'center' }}>{ i+1 } 
                        </Box>
                            <Box className='cardElements' style={{ width:'calc(100% - 80px)' }}>
                             <ReactMarkdown>{ element[lang] }</ReactMarkdown>
                                {/* { md.render(element[lang]) }<br/><br/> */}
                                </Box>
                        </Box>
                    ))}
                </Box>
        </Box>
    )
}