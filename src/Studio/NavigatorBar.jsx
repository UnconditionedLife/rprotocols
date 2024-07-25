// import { useEffect, useState } from 'react';
// import { Box, Fab } from '@mui/material'
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
// import ContextLabel from '../assets/ContextLabel.svg';
// import DomainLabel from '../assets/DomainLabel.svg';
// import NeedLabel from '../assets/NeedLabel.svg';
// import ProtocolLabel from '../assets/ProtocolLabel.svg';


// export default function NavigatorBar(props) {
//     const { levelData, levelName, handleNavAction, position, clicked, lang } = props
//     const [ level, setLevel ] = useState("")
//     const [ labelImage, setLabelImage ] = useState("")
//     // const [ levelIcon, setLevelIcon ] = useState("")

//     useEffect(() => {
//         setLevel(levelName)
//         if (levelName == 'Domain') setLabelImage(DomainLabel)
//         if (levelName == 'Context') setLabelImage(ContextLabel)
//         if (levelName == 'Need') setLabelImage(NeedLabel)
//         if (levelName == 'Protocol') setLabelImage(ProtocolLabel)
//     }, [levelName])

//     const nameColor = (clicked == level) ? '#D2042D' : 'black'

//     if (level === "") return ( null )

//         console.log("NAV LEVEL DATA", levelData)

//     return (
//         <Box>            
//             <Box className='navBarContainer' >
//                 {/* <img src={ labelImage } height='54px'/> */}
//                 <Box className="navBarOutline" >
//                     <Fab className="navBarFab" size='small' onClick={() => { handleNavAction(level, "down", levelData) }}>
//                         <ArrowLeftIcon color='action' />
//                     </Fab>
//                     <Box className='navBarTextContainer' onClick={() => { handleNavAction(level, "click", levelData) }} >
//                         <Box className='navBarTextFlex' >
//                             { (level !== 'Protocol') &&
//                                 <Box className='navBarText' color={ nameColor } >
//                                     { levelData[position].name[lang].toUpperCase() }<br/>
//                                     <span style={{ fontSize:'.8em', fontWeight:'400', textTransform:'uppercase' }} >{ level }</span>
//                                 </Box>
//                             }
//                             { (level === 'Protocol') &&
//                                 <Box className='navBarText' color={ nameColor } >
//                                     { (levelData.length > 0) &&

//                                         <span>
//                                             { levelData[position].content.title[lang].toUpperCase() + " (Ver. " 
//                                                 + levelData[position].header.version + ")"} <br/>
//                                             {/* <span style={{ fontSize:'.8em', fontWeight:'400', textTransform:'uppercase' }} >({ level })</span> */}
//                                         </span>
//                                     }
//                                     { (levelData.length === 0) &&
//                                         <span>
//                                         {/* ({ level }) <br/> */}
//                                         NO PROTOCOLS YET</span>
//                                     }
//                                 </Box>
//                             }
//                         </Box>
//                     </Box>
//                     <Fab className="navBarFab" size='small' onClick={() => { handleNavAction(level, "up", levelData) }}>
//                         <ArrowRightIcon color='action' />
//                     </Fab>
//                 </Box>
//             </Box>
//             {/* <Tooltip title="Add" placement="top" arrow>
//                 <Button>top</Button>
//             </Tooltip> */}
//         </Box>
//     )
// }
