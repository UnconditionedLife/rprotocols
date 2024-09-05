import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { dbGetAllUsersAsync } from './Database';
import { useNavigate } from 'react-router-dom';
import Quote from './Library/Quote';



export default function Home() {
    const [ user, setUser ] = useState({})
    const [ goto, setGoto ] = useState(null)
    const { t } = useTranslation();

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
            <h1 className='headline' style={{ marginBottom:"-3rem" }}>{ t('home.sectionHead') }</h1>
            <Box><img className='headlineLogo'src="/rProtocolsLogo-blackBg.svg" alt='rProtocol Logo'></img></Box>
            <span className='subheadline' style={{ marginTop:"-24px" }} >{ t('home.sectionSubhead') }</span>

            <Box display='flex' flexDirection='column' marginTop='clamp(30px, 8vw, 40px)' ml={ 1.5 } mr={ 1.5 } alignSelf={"center"} maxWidth='90%' alignContent='center'>
                <h2>{ t('home.introH1') }</h2>
                <Box display='flex' flexDirection='row' flexWrap='wrap' justifyContent='center'> 
                    <Box><p className='paragraph'>{ t('home.introP1') }</p></Box>
                </Box>
            </Box>
            <Box alignSelf={"center"} maxWidth='100%'>
                <h5 style={{ fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)' }}>{ t('home.introH2')}</h5>
                <p className='paragraph' style={{textAlign:"center"}}><b>{ t('home.introSH2') }</b></p>
                <Box><p className='paragraph'>{ t('home.introP2') }</p></Box>
                <br/>
                <p className='paragraph' style={{textAlign:"center"}}><b>{ t('home.introCallout') }</b></p>
            </Box>
            <br/>
            <br/>

            <img style={{ marginTop:"30px" }} src="/rManIcon.svg" height='90em'></img>

            <h3>{ t('home.benefitHeadline') }</h3>
            <br/>
            {/* <Box display='grid' alignSelf={"center"} style={{ placeItems: 'center'}}> */}
                <Box className='benefits'>
                    <Box className='benefit'>
                        <img className="benefitIcon" src="/simplifyIcon.webp" />
                        <h4 style={{ marginTop:'4px' }}>{ t('home.benefitH1') }</h4>
                        <Box className='benefitText'>{ t('home.benefitP1') }</Box>
                    </Box>
                    <Box className='benefit'>
                        <img className="benefitIcon" src="/openIcon.webp" />
                        <h4 style={{ marginTop:'4px' }}>{ t('home.benefitH2') }</h4>
                        <Box className='benefitText'>{ t('home.benefitP2') }</Box>
                    </Box>
                    <Box className='benefit'>
                        <img className="benefitIcon" src="/flexibilityIcon.webp" />
                        <h4 style={{ marginTop:'4px' }}>{ t('home.benefitH3') }</h4>
                        <Box className='benefitText'>{ t('home.benefitP3') }</Box>
                    </Box>
                    <Box className='benefit'>
                        <img className="benefitIcon" src="/transparencyIcon.webp" />
                        <h4 style={{ marginTop:'4px' }}>{ t('home.benefitH4') }</h4>
                        <span className='benefitText'>{ t('home.benefitP4') }</span>
                    </Box>
                    <Box className='benefit'>
                        <img className="benefitIcon" src="/speedIcon.webp" />
                        <h4 style={{ marginTop:'4px' }}>{ t('home.benefitH5') }</h4>
                        <Box className='benefitText'>{ t('home.benefitP5') }</Box>
                    </Box>
                    <Box className='benefit'>
                        <img className="benefitIcon" src="/efficiencyIcon.webp" />
                        <h4 style={{ marginTop:'4px' }}>{ t('home.benefitH6') }</h4>
                        <Box className='benefitText'>{ t('home.benefitP6') }</Box>
                    </Box>
                </Box>
            {/* </Box> */}

            <Quote quote={ t('home.ostromQuote') } author={ t('home.ostromAuthor')}/>
            
            <h2 style={{ marginTop:'0px' }}>{ t('home.howWorkHead') }</h2>
            <Box style={{ width:'640px', placeItems:'left', alignSelf:'center', maxWidth:'90%', fontSize:'0.75' }} mb={2}>
                <span style={{ textAlign:'left', color: 'white' }}>{ t('home.howWorkIntro') }<br/>
                <br/>(1) { t('home.howWorkP1') }<br/>
                <br/>(2) { t('home.howWorkP2') }<br/>
                <br/>(3) { t('home.howWorkP3') }<br/>
                <br/>(4) { t('home.howWorkP4') }</span>
            </Box>
            <img className='howTheyWork' src="/how-collaboratives-work.svg"></img>
            <br/>

            <Quote quote={ t('home.haleQuote') } author={ t('home.haleAuthor')}/>
            
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
