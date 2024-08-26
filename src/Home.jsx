import { Fragment, useEffect, useState } from 'react';
import { Box, Card } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { dbGetAllUsersAsync } from './Database';
import { useNavigate } from 'react-router-dom';
import Quote from './Library/Quote';


export default function Home(props) {
    const { handleSwitchPublicPage } = props
    const [ user, setUser ] = useState({})
    const [ goto, setGoto ] = useState(null)


    // useEffect(() => {
    //     setUser(getUsers())

    //     function getUsers(){
    //         dbGetAllUsersAsync().then((b) => {
    //             // console.log("db users", b)
    //             if (!b) b = []
    //             return b
    //         })
    //     }
    // }, [])

    // const navigate = useNavigate()

    // useEffect(() => {
    //     if (goto) {
    //       navigate( goto, { replace: false });
    //     }
    // }, [goto, navigate]);

    return (
        // <Box className='myceliumBackground'>   
        <Fragment>
            <h1 className='headline'>Let&apos;s Collaborate</h1>
            <Box><img className='headlineLogo'src="/rProtocolsLogo-blackBg.svg" alt='rProtocol Logo'></img></Box>
            <span className='subheadline' >The World&apos;s Open Protocols & Practices Community</span>

            <Box display='flex' flexDirection='column' marginTop='clamp(30px, 8vw, 40px)' ml={ 1.5 } mr={ 1.5 } alignSelf={"center"} maxWidth='90%' alignContent='center'>
                <h2 style={{ fontSize:'clamp(1.3rem, 3vw, 2.3rem)' }}>What Are Protocols?</h2>
                <Box display='flex' flexDirection='row' flexWrap='wrap' justifyContent='center'> 
                    <Box><p className='paragraph'>Protocols, unlike rules, are designed to liberate rather than control. They offer flexible, consensual ways of collaborating, adopted voluntarily based on their relevance to specific needs. Each protocol is an experiment in finding the most effective methods for collaboration within specific contexts.</p></Box>
                </Box>
            </Box>
            <Box alignSelf={"center"} maxWidth='100%'>
                <h5 style={{ fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)' }}>Find Agreements, Contracts, Policies, and Practices!</h5>
                <p className='paragraph' style={{textAlign:"center"}}><b>No more slow and costly documents — let&apos;s take matters into our hands.</b></p>
                <Box><p className='paragraph'>Protocols range from replacing traditional contracts to shaping everyday practices, enabling a peer-to-peer environment that fosters radical collaboration and innovation. By adopting protocols, people take responsibility for their work and create a more dynamic, inclusive, and effective way of working together.</p></Box>
                {/* <br/> */}
                <p className='paragraph' style={{textAlign:"center"}}><b>Embrace a radically collaborative approach and human-scale solutions.</b></p>
            </Box>
            <br/>
            <br/>

            <img style={{ marginTop:"30px" }} src="/rManIcon.svg" height='90em'></img>

            <h3>Benefits of Protocols</h3>
            <br/>
            {/* <Box display='grid' alignSelf={"center"} style={{ placeItems: 'center'}}> */}
                <Box className='benefits'>
                    <Box className='benefit'>
                        <img className="benefitIcon" src="/simplifyIcon.webp" />
                        <h4 style={{ marginTop:'4px' }}>Simplify Complexity</h4>
                        <Box className='benefitText'>Replace outdated policies and cumbersome contracts, agreements with clear, efficient protocols.</Box>
                    </Box>
                    <Box className='benefit'>
                        <img className="benefitIcon" src="/openIcon.webp" />
                        <h4 style={{ marginTop:'4px' }}>Open Collaboration</h4>
                        <Box className='benefitText'>Leverage a community of innovators contributing to and refining protocols that set new standards in effectiveness.</Box>
                    </Box>
                    <Box className='benefit'>
                        <img className="benefitIcon" src="/flexibilityIcon.webp" />
                        <h4 style={{ marginTop:'4px' }}>Flexibility</h4>
                        <Box className='benefitText'>Adapt any protocol or practice to meet your specific needs and challenges.</Box>
                    </Box>
                    <Box className='benefit'>
                        <img className="benefitIcon" src="/transparencyIcon.webp" />
                        <h4 style={{ marginTop:'4px' }}>Transparency and Trust</h4>
                        <span className='benefitText'>Build trust with transparent practices that everyone can understand and adopt.</span>
                    </Box>
                    <Box className='benefit'>
                        <img className="benefitIcon" src="/speedIcon.webp" />
                        <h4 style={{ marginTop:'4px' }}>Speed and Agility</h4>
                        <Box className='benefitText'>Implement solutions faster with protocols and practices designed for rapid deployment and scalability.</Box>
                    </Box>
                    <Box className='benefit'>
                        <img className="benefitIcon" src="/efficiencyIcon.webp" />
                        <h4 style={{ marginTop:'4px' }}>Cost Efficiency</h4>
                        <Box className='benefitText'>Reduce operational costs by adopting streamlined protocols and practices that minimize redundancy and enhance process efficiency.</Box>
                    </Box>
                </Box>
            {/* </Box> */}

            <Quote quote="What we have ignored is what citizens|can do and the importance of real|involvement from the people involved." author="Elinor Ostrom"/>
            
            <h2 style={{ marginTop:'0px' }}>How Protocols Work</h2>
            <Box style={{ width:'640px', placeItems:'left', alignSelf:'center', maxWidth:'90%', fontSize:'0.75' }} mb={2}>
                <span style={{ textAlign:'left', color: 'white' }}>Here is how open protocols work within a collaborative community.<br/>
                <br/>(1) The community uses and contributes protocols, ensuring they are beneficial and serve needs.<br/>
                <br/>(2) Others then adopt these protocols, integrating them into their practices.<br/>
                <br/>(3) Collaborators then bundle protocols together to meet specific contexts.<br/>
                <br/>(4) Finally, these guides are made available for other collaborators to use, creating a continuous cycle of contribution, adoption, and enhancement. This process fosters a dynamic, collaborative environment where protocols evolve based on collective input and practical application, ultimately enhancing the community's overall efficiency and innovation.</span>
            </Box>
            <img className='howTheyWork' src="/how-collaboratives-work.svg"></img>
            <br/>

            <Quote quote="Coming together is a beginning.|Keeping together is progress.|Working together is success." author="Henry Ford"/>
            
            {/* <h2>Featured Protocols & Practices</h2>
            <Box display='grid' style={{ placeItems: 'center', alignSelf:'center', marginBottom:'80px'}}>
                <Box className='featured'>
                    <FeaturedSection/>
                </Box>
            </Box> */}
            <br/>
            {/* <span className='sectionTitle'>Community & Support</span> */}
        {/* </Box>  */}
        </Fragment> 
    )
}
