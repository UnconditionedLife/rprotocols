import { useEffect, useState } from 'react';
import { Box, Card } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { dbGetAllUsersAsync } from './Database';
import { useNavigate } from 'react-router-dom';


export default function ProtocolsHome(props) {
    const { handleSwitchPublicPage } = props
    const [ user, setUser ] = useState({})
    const [ goto, setGoto ] = useState(null)


    useEffect(() => {
        setUser(getUsers())

        function getUsers(){
            dbGetAllUsersAsync().then((b) => {
                // console.log("db users", b)
                if (!b) b = []
                return b
            })
        }
    }, [])

    const navigate = useNavigate()

    useEffect(() => {
        if (goto) {
          navigate( goto, { replace: true });
        }
    }, [goto, navigate]);

    function gotoURL(url){
        setGoto( url )
    }

    return (
        <Box className='myceliumBackground'>    
            <h1>Let&apos;s Collaborate</h1>
            <span className='headline'><img className='headlineLogo'src="/rProtocolsLogo-blackBg.svg" alt='rProtocol Logo'></img></span>
            <span className='subheadline' style={{ marginTop:"-44px" }}>The World&apos;s Open Protocols & Practices Community</span>
            <Box mt={ 8 } ml={ 1.5 } mr={ 1.5 } alignSelf={"center"} maxWidth='90%'>
                <h2>What Are Protocols?</h2>
                <p className='paragraph'>Protocols, unlike rules, are designed to liberate rather than control. They offer flexible, consensual ways of collaborating, adopted voluntarily based on their relevance to specific needs.</p>
                <p className='paragraph'>Each protocol is an experiment in finding the most effective methods for collaboration within specific contexts and domains.</p>
                <p className='paragraph'>They can range from replacing traditional contracts to shaping everyday practices, enabling a peer-to-peer environment that fosters radical collaboration and innovation. By choosing and adapting protocols, people take responsibility for their work and create a more dynamic, inclusive, and effective way of working together.</p>
            </Box>
            <Box my='5em' mx={10} alignSelf={"center"} style={{ cursor:'pointer' }}>
                <Card style={{ paddingTop:'1em', paddingBottom:'1em', paddingLeft:'2em', paddingRight:'2em', backgroundColor:'#FFC400' }}
                    onClick={() => { setGoto('/studio/explore') }}>
                    <h3 style={{ color:'black', marginTop:'0px'}}><b>Explore the<br/>rPROTOCOLS</b></h3>
                </Card>
            </Box>
            <Box alignSelf={"center"} maxWidth='95%'>
                <h4>Craft Agreements, Contracts, Policies, and Practices With Ease!</h4>
                <p>No more slow and costly documents — let's take matters into our hands.<br/>Embrace a radically collaborative approach and human-scale solutions.</p>
            </Box>
            <br/>
            <br/>
            <br/>

            <img style={{ marginTop:"30px" }} src="/RadicalPerson.svg" height='90em'></img>

            <h3>Benefits</h3>
            <Box display='grid' alignSelf={"center"} style={{ placeItems: 'center'}}>
                <Box className='benefits'>
                    <Box className='benefit'>
                        <img src="/simplifyIcon.webp" width='76px'></img>
                        <h5 style={{ marginTop:'4px' }}>Simplify Complexity</h5>
                        <Box className='benefitText'>Replace outdated policies and cumbersome contracts, agreements with clear, efficient protocols and practices.</Box>
                    </Box>
                    <Box className='benefit'>
                        <img src="/openIcon.webp" width='76px'></img>
                        <h5 style={{ marginTop:'4px' }}>Open Collaboration</h5>
                        <Box className='benefitText'>Leverage a community of innovators contributing to and refining protocols and practices that set new standards in efficiency and effectiveness.</Box>
                    </Box>
                    <Box className='benefit'>
                        <img src="/flexibilityIcon.webp" width='76px'></img>
                        <h5 style={{ marginTop:'4px' }}>Flexibility</h5>
                        <Box className='benefitText'>Adapt any protocol or practice to meet your organization's specific needs and challenges.</Box>
                    </Box>
                    <Box className='benefit'>
                        <img src="/transparencyIcon.webp" width='76px'></img>
                        <h5 style={{ marginTop:'4px' }}>Transparency and Trust</h5>
                        <span className='benefitText'>Build trust with transparent practices that everyone can understand and adopt.</span>
                    </Box>
                    <Box className='benefit'>
                        <img src="/speedIcon.webp" width='76px'></img>
                        <h5 style={{ marginTop:'4px' }}>Speed and Agility</h5>
                        <Box className='benefitText'>Implement solutions faster with protocols and practices designed for rapid deployment and scalability.</Box>
                    </Box>
                    <Box className='benefit'>
                        <img src="/efficiencyIcon.webp" width='76px'></img>
                        <h5 style={{ marginTop:'4px' }}>Cost Efficiency</h5>
                        <Box className='benefitText'>Reduce operational costs by adopting streamlined protocols and practices that minimize redundancy and enhance process efficiency.</Box>
                    </Box>
                </Box>
            </Box>
            <Box mt={ 10 } mb={ 6 } alignSelf={"center"} maxWidth='90%'>
                <span className='quote'>"What we have ignored is what citizens<br/>can do and the importance of real<br/>involvement from the people involved."<br/><strong>Elinor Ostrom</strong></span>
            </Box>
            
            <h2>How Protocols Work</h2>
            <Box style={{ width:'640px', placeItems:'center', alignSelf:'center', maxWidth:'90%', fontSize:'0.75' }} mb={2}>
                <span style={{ fontSize:'0.8em', color: 'white' }}>The diagram illustrates the process of how open protocols work within a collaborative community. It starts with the community (1) using and contributing protocols, ensuring that these protocols are relevant and beneficial. Collaborators (2) then consent to and adopt these protocols, integrating them into their practices. Following this, collaborators (3) create protocol guides, which are comprehensive collections designed to address specific needs or purposes. Finally, these guides (4) are made available for other collaborators to use, creating a continuous cycle of contribution, adoption, and enhancement. This process fosters a dynamic, collaborative environment where protocols evolve based on collective input and practical application, ultimately enhancing the community's overall efficiency and innovation.</span>
            </Box>
            <img className='howTheyWork' src="/how-collaboratives-work.svg"></img>
            <br/>
            <span className='quote'>"Coming together is a beginning.<br/>Keeping together is progress.<br/>Working together is success."<br/><strong>Henry Ford</strong></span>
            
            {/* <h2>Featured Protocols & Practices</h2>
            <Box display='grid' style={{ placeItems: 'center', alignSelf:'center', marginBottom:'80px'}}>
                <Box className='featured'>
                    <FeaturedSection/>
                </Box>
            </Box> */}
            <br/>
            {/* <span className='sectionTitle'>Community & Support</span> */}
        </Box>
    )
}
