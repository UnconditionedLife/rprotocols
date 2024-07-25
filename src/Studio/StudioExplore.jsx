import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, Button, Typography, CircularProgress } from '@mui/material'
import MyLocationIcon from '@mui/icons-material/MyLocation';        // Context
import CategoryIcon from '@mui/icons-material/Category';            // Domain
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';  // Purpose
import SignpostIcon from '@mui/icons-material/Signpost';            // Protocol
// import Navigator from './Navigator.jsx';
import { dbSaveItemAsync, dbGetAllGuidesAsync } from '../Database.js';
import rProtocolStudio from '../assets/rProtocolStudio.svg';
import { getNewProtocols } from '../Database-NewProtocols.js';
import { getUserName, getUserObject, deepCopy } from '../GlobalFunctions.jsx';
import { getLocalProtocols } from '../Protocols.jsx';
import StudioToggle from './StudioToggle.jsx';
import CardSlider from './CardSlider.jsx';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';




export default function StudioExplore(props) {
    // const { } = props
    const [ user, setUser ] = useState("")
    const [ db, setDb ] = useState(null)
    const { itemid } = useParams();
    const [ studioSection, setStudioSection ] = useState('Protocols')
    const [ goto, setGoto ] = useState(null)

    // const user = globalVars.user


    let searchIndex = []

    // useEffect(() => {
    //     getDbAsync().then((d)=> {
    //         setDb(d)
    //         // searchIndex = LoadIndex(d)

    //         // console.log("searchIndex:", searchIndex)
    //     })
    // },[])

    useEffect(() => {
        // console.log("GET USER USEEFFECT", getUserObject())
        if (getUserObject() !== user) {
            // console.log("GET USER USEEFFECT INSIDE", getUserObject())
            setUser( getUserObject() )
        }
    })

    function loadProtocols(){
        const p = getNewProtocols()
        p.map((i) =>{
            dbSaveProtocolAsync(i)
        })
    }

    const loaded = (db != null)




    function LoadIndex(d) {

        console.log("D", d)

        const newIndex = []
        // return null
        d.protocols.forEach(p => {
            console.log("P", p)
            const row = {
                id: p.id,
                text: p.description.en + " " + p.needName.en + " " 
                    + p.title.en + " " + p.intro.en
            }
            console.log("row", row)

            newIndex.push(row)
        })
        console.log("newIndex", newIndex)

        return newIndex
    }

    function addProtocolToDB(newProtocol) {
        const oldDB = deepCopy(db)

        console.log('oldDB', oldDB)

        oldDB.protocols.push(newProtocol)

        console.log('newProtocol', newProtocol)

        setDb(oldDB)
    }

    function reloadProtocols() {
        getDbAsync().then((d)=> {
            setDb(d)

            console.log("DATABASE:", d)
        })
    }

    function handleSection(e, newSection) {

        console.log('CLICK', newSection)

        setStudioSection(newSection)
    }

    function handleViewBundle() {

    }

    function handleOpenItem(){
        return null
    }
    // console.log("USER IN STUDIO", user)

    const navigate = useNavigate()

    useEffect(() => {
        if (goto) {
          navigate( goto, { replace: true });
        }
    }, [goto, navigate]);

    return (
        <Box className='myceliumBackground' display={'flex'} flexDirection={'column'} backgroundColor='black' alignItems='center' overflow='hidden'>
            {/* <Header/> */}
            {/* <h1 className='headline'>Explore rPROTOCOLS</h1> */}
            <h1 style={{ fontSize: '3.2em', fontWeight: '700', lineHeight: '1', color: '#f9f9f9', marginTop: 'em' }}>Explore&nbsp;<img className='headlineProtocolsLogo' src="/rProtocolsLogo-blackBg.svg" alt='rProtocol Logo'/></h1>
            <h2 className='subheadline' style={{ marginTop:'8px' }}>Our Open Protocols & Practices Community</h2>

            <span className='quote' >Standards are like parachutes:<br/>they only function when they are open.<br/><b>Tim Berners-Lee</b></span>

            <h3>Common Guides</h3>
            <p>Guides contain protocols and are traditionally called agreements, contracts, policies, etc.</p>
            <h5 style={{ marginTop:'0px', cursor:'pointer' }}
                onClick={ () => { setGoto('/studio/guides')}}
                >Browse All Guides</h5>
            <CardSlider items = { [] } handleOpenItem={ handleOpenItem } />
            <h5 style={{ marginTop:'0px', cursor:'pointer' }}
                onClick={ () => { setGoto('/studio/guides')}}
                >Browse All Guides</h5>
<br/>
<br/>
<br/>
<br/>
            <h3>Common Protocols</h3>
            <p>Protocols are the "HOW-TOs" the address an identified need.</p>
            <h5 style={{ marginTop:'0px', cursor:'pointer' }}
                onClick={ () => { setGoto('/studio/protocols')}}
                >Browse All Protocols</h5>
            <CardSlider items = { [] } handleOpenItem={ handleOpenItem } />
            <h5 style={{ marginTop:'0px', cursor:'pointer' }}
                onClick={ () => { setGoto('/studio/protocols')}}
                >Browse All Protocols</h5>

            <br/>
            <Box style={{ placeItems: 'center', marginTop:'50px', marginBottom:'50px' }}>
                <img src="/RadicalPerson.svg" height="40px"></img>
                <span className='sectionTitle'>HOW IT WORKS</span>
                <h2 className='cardTitle' style={{ marginTop:'30px'}}>Discover</h2>
                <span className='calloutText'>Browse through the library of protocols and guides.</span>
                <h3 className='cardTitle' style={{ marginTop:'40px'}}>Contribute</h3>
                <span className='calloutText'>Community contributions ensures that<br/>each protocol evolves and stays relevant.</span>
                <h3 className='cardTitle' style={{ marginTop:'40px'}}>Implement</h3>
                <span className='calloutText'>Adopt guides and protocols directly in your<br/>operations with notification and transparency.</span>
            </Box>

            <Box className='studioContainer' >
                <img src={ rProtocolStudio } height='70px' style={{ marginTop:'26px' }} alt="rProtocol Studio" />
                <h3 className='calloutHeader' style={{ marginTop:'38px' }}>The Power of &quot;HOW TO&quot; in Our Hands!</h3>
                <span className='calloutText'>Navigate the Protocols and Bundles You Need</span>

                <Box my='5em' mx={10} alignSelf={"center"} style={{ cursor:'pointer' }}>
                    <Card style={{ paddingTop:'1em', paddingBottom:'1em', paddingLeft:'2em', paddingRight:'2em', backgroundColor:'#FFC400' }}
                        onClick={() => { setGoto('/studio') }}>
                        <h3 style={{ color:'black', marginTop:'0px'}}><b>Jump in the<br/>Studio</b></h3>
                    </Card>
                </Box>

                
                <br/>
            </Box>

            <br/>
            <br/>
            <br/>
            <span className='subheadline'><b>rPROTOCOL Structure</b></span>
            <span className='calloutText'>rPROTOCOLS are arranged into four levels:<br/>Context, Domain, Need, and Protocol</span><br/>
            

            <Box display='grid' >
                <motion.div
                onClick={ () => { handleGoto('/studio/' + studioSection + '/item.header.guideId') }}
                initial={{ height:'0px', width:'0px' }}
                whileInView={{ height:'100%', width: '100%' }}
                transition={{
                    type:'spring',
                    stiffness: 400,
                    damping: 15,
                    repeat: 0,
                    // repeatType: 'mirror',
                    repeatDay: 0.2,
                }}>
                <Box display={'flex'} flexDirection={'row'}>
                    <Box className='benefits'>
                        <Box m={1} display={'flex'} flexDirection={'row'} flexWrap='wrap' >
                        <Box m={1} p={2} minHeight={"90px"} maxWidth='280px'>
                                <CategoryIcon fontSize='large' color='primary'/>
                                <p className='cardTitle'>Domain</p>
                                <span>Domains represent significant aspects of our society, identifying the areas we are dealing with and answering the crucial question:<br/><strong>'Where do we find ourselves?'</strong></span>
                            </Box>
                            <Box m={1} p={2} minHeight={"90px"} maxWidth='280px'>
                                <MyLocationIcon fontSize='large' color='primary'/>
                                <p className='cardTitle'>Context</p>
                                <span>Contexts represent unique of our world, defining the settings where interactions and decisions occur, and answering the fundamental question:<br/><strong>'What are we dealing with?'</strong></span>
                            </Box>
                        </Box>
                        <Box m={1} display={'flex'} flexDirection={'row'} flexWrap='wrap'>
                            <Box m={1} p={2} minHeight={"90px"} maxWidth='280px'>
                                <PsychologyAltIcon fontSize='large' color='primary'/>
                                <p className='cardTitle'>Need</p>
                                <span>Needs define the rationale behind the protocol, addressing a specific aspect of the Domain and answering the critical question:<br/><strong>'Why are we addressing this issue?'</strong></span>
                            </Box>
                            <Box m={1} p={2} minHeight={"90px"} maxWidth='280px'>
                                <SignpostIcon fontSize='large' color='primary'/>
                                <p className='cardTitle'>Protocol</p>
                                <span>Protocol is a detailed set of guidelines that provides a specific solution to a Need, effectively addressing the practical question:<br/><strong>'How do we accomplish this?'</strong></span>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                </motion.div>
            </Box>
            

            <br/>
            <br/>
            <br/>
            {/* <Button onClick={() => { loadProtocols() }}>LOAD PROTOCOLS</Button> */}
            <span className='subheadline' ><b>Protocol Bundle Examples</b></span>
            <span className='sectionTitle'>The Traditional Formats You Know</span>
            <span className='calloutText'>Protocols can serve any of these and more, however <br/> they simpler than typical complex legal documents.</span>
            <br/>
            <br/>
            <Box className="bundleContainer">
                <Box className='bundleList'>
                    <span className='bundleHeader'>Agreements</span><br/>
                    <span className='bundleTitle' onClick={ handleViewBundle() }>Founders</span><br/>
                    <span className='bundleTitle' onClick={ handleViewBundle() }>Operating</span><br/>
                </Box>
                <Box className='bundleList'>
                    <span className='bundleHeader'>Contracts</span><br/>
                    <span className='bundleTitle' onClick={ handleViewBundle() }>Sales</span><br/>
                    <span className='bundleTitle' onClick={ handleViewBundle() }>Purchase Order</span><br/>
                </Box>
                <Box className='bundleList'>
                    <span className='bundleHeader'>Policies</span><br/>
                    <span className='bundleTitle' onClick={ handleViewBundle() }>Privacy Policy</span><br/>
                    <span className='bundleTitle' onClick={ handleViewBundle() }>Health & Safety</span><br/>
                </Box>
                <Box className='bundleList'>
                    <span className='bundleHeader'>Practices</span><br/>
                    <span className='bundleTitle' onClick={ handleViewBundle() }>Onboarding</span><br/>
                    <span className='bundleTitle' onClick={ handleViewBundle() }>Root Cause</span><br/>
                </Box>
            </Box>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </Box>
    )
}
