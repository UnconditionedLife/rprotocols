// import { useState } from 'react';
// import { Box, Card, CardActions, Button, MenuItem, Typography } from '@mui/material'
// import Accordian from './Accordian';
// import { getUserObject, getUserName } from './GlobalFunctions';
// import LanguageBar from './LanguageBar';
// import ProtocolForm from './Studio/StudioForm';
// import EditIcon from '@mui/icons-material/EditNote';
// import ForkIcon from '@mui/icons-material/ForkRight';
// import AdoptIcon from '@mui/icons-material/FactCheck';
// import BundleIcon from '@mui/icons-material/MenuBook';




// export default function GuideView(props) {
//     const { guide, display, handleDisplay } = props
//     const [ protoShow, setProtoShow ] = useState( 'none' )
//     const [ linksShow, setLinksShow ] = useState( 'none' )
//     const [ attribShow, setAttribShow ] = useState( 'none' )
//     const [ histShow, setHistShow ] = useState( 'none' )
//     const [ lang, setLang ] = useState('en')
    

//     function handleLanguage(newLang){
//         console.log("CHANGE LANG:", newLang)
//         setLang(newLang)
//     }
    
//     const user = getUserObject()

//     // console.log("protocol", protocol)

//     function shrinkText(text, maxLength) {
//         if (text.length > maxLength) {
//           return text.substring(0, maxLength).trimEnd() + "...";
//         } else {
//           return text;
//         }
//     }

//     function formatElements(text, part) {
//         if (text.includes(":")) {
//             const array = text.split(":", 2)
//             return array[part]
//         } else {
//           return text;
//         }
//     }

//     function handleArea(props) {
//         const { version, show } = props
//         const newShow = show === 'none' ? 'flex' : 'none';

//         if (version === 'proto') setProtoShow( newShow )
//         if (version === 'links') setLinksShow( newShow )
//         if (version === 'attrib' ) setAttribShow( newShow )
//         if (version === 'hist' ) setHistShow( newShow )
        
//     }

//     // console.log('**USER**', getUserName())
    
//     console.log('**PROTOCOL**', protocol)

//     if ( protocol === undefined ) return null

//     return (
//         <Box>
//         { (display === 'view') &&
//         <Card key={protocol.header.protocolId} className="protocolCard" >

//             <span className='cardClas' style={{ marginTop:'15px'}} >In the <b>{ protocol.header.contextName[lang].toUpperCase() }</b> Domain</span>
            
//             <hr width ='1px' style={{ marginTop: '5px', marginBottom: '7px' }} />

//             <span className='cardClas' >Within the <b>{ protocol.header.domainName[lang].toUpperCase() }</b> Context</span>

//             <hr width ='1px' style={{ marginTop: '6px', marginBottom: '6px' }} />

//             <span className='cardClas' >For the <b>{ protocol.header.needName[lang].toUpperCase() }</b> Need<br/></span>

//             <hr width ='80px' style={{ marginTop: '20px', marginBottom: '14px' }}></hr>

//             {/* <Box className="iconCircle">
//                 <ProtocolIcon className="icon" fontSize='medium' color='primary'/><br/>
//             </Box> */}

//             {/* <span className='cardTitle'> */}
//             <h5 style={{ marginTop:'0px'}}>
//                 {/* onClick={() => { handleEdit(domain, "domain") }} */}
//                 { protocol.content.title[lang] }
//             </h5>
//             {/* </span> */}

//             <span className='cardVersion'>
//                 {/* onClick={() => { handleEdit(domain, "domain") }} */}
//                 –– Ver. { protocol.header.version } ––
//             </span>

//             <LanguageBar handleLanguage={ handleLanguage } lang={ lang }/>

//             <span className='cardDescription'> { protocol.header.description[lang] }</span>

//             { protocol.content.elements.length > 0 &&
//                 <Box width='100%' mt={ 1 }>
//                     <Accordian version='proto' title='Protocol' show={ protoShow } handleArea={ handleArea } />
//                     <Box display={ protoShow } pt={ 0 } style={{ flexDirection:'column'}}>
//                         <div className='cardElements'><b>{ protocol.content.intro[lang] }</b><br/><br/></div>
//                             { protocol.content.elements.map((element, i) => (
//                                 <Box key={ i } style={{  display:'flex', flexDirection:'row' }}>
//                                     <div className='cardElements' style={{ width:'4px' }}>{ i+1 } </div>
//                                     <div className='cardElements'>{ element[lang] }<br/><br/></div>
//                                 </Box>
//                             ))}
//                     </Box>
                    
//                     <Accordian version='links' title='Links' show={ linksShow } handleArea={ handleArea } />
//                     <Box display={ linksShow } pt={ 1 }>
//                         <br/>
//                         <span className='cardAttribution'>
//                             <br/> { protocol.content.attribution.message[lang] }
//                         </span>
//                     </Box>
        
//                     <Accordian version='attrib' title='Attribution' show={ attribShow } handleArea={ handleArea } />
//                     <Box display={ attribShow } pt={ 1 }>
//                         <br/>
//                         <span className='cardAttribution'>
//                             <br/> { protocol.content.attribution.message[lang] }
//                         </span>
//                     </Box>
                
//                     <Accordian version='hist' title='History' show={ histShow } handleArea={ handleArea } />
//                     <Box display={ histShow } pt={ 1 }>
//                         { protocol.history.map((element, i) => (
//                             <Box width='100%' key={ i }>
//                                 <span className='cardBy'>Created By: { element.author[lang] }<br/></span>
//                                 <span className='cardDate'>
//                                     { new Date(element.date).toLocaleString("en-US", { 
//                                         year: "numeric", month: "long", day: "numeric", 
//                                         hour: "numeric", minute: "numeric", timeZoneName: "short" }) }
//                                 </span>
//                             </Box>
//                         ))}
//                     </Box>

//                     {/* <hr style={{ border: '1px solid #d8ecf3', marginBottom: '-3px', marginTop: '16px' }} />
//                     <Box display='flex' flexDirection='row' justifyContent='space-between' onClick={() => { handleArea('attrib') }}>
//                         <Box pl={ 1 }><span className='cardSectionLabel'>Attribution</span></Box>
//                         <Box pr={ 1 } pt='3px' style={{ fontWeight:'lighter' }}>{ attribArrow }</Box>
//                     </Box> */}

//                 </Box>
//             }
//             <CardActions>
//                 { (!user) &&
//                     <span style={{ fontSize:'.65em', color:'red' }}>Login to Edit, Fork, and Adopt</span>
//                 }
//                 { (user) &&
//                     <Box>
//                         <Button size="small" variant="contained" style={{ margin:'4px' }}
//                             onClick={() => { handleDisplay('edit') }} endIcon={ <EditIcon /> }>EDIT</Button>
//                         <Button size="small" variant="outlined" style={{ margin:'4px' }} 
//                             onClick={() => { handleDisplay('fork') }}  endIcon={ <ForkIcon /> }>FORK</Button>
//                         <Button size="small" variant="outlined" style={{ margin:'4px' }} disabled
//                             onClick={() => { handleDisplay('adopt') }}  endIcon={ <AdoptIcon /> }>ADOPT</Button>
//                         <Button size="small" variant="outlined" style={{ margin:'4px' }} disabled
//                             onClick={() => { handleDisplay('adopt') }}  endIcon={ <BundleIcon /> }>BUNDLE</Button>
                        
//                     </Box>
//                 }
//             </CardActions>
//         </Card>
//         }
//         {/* { (display == 'edit') &&
//             <ProtocolForm db={ db }  protocol={ protocol } handleDisplay={ handleDisplay } lang={ lang } handleLanguage={ handleLanguage } />
//         } */}
//         </Box>
//     )
// }