import { Fragment } from 'react';
import { Box, Button } from '@mui/material'
import NeedIcon from '/NeedIcon-reverse.svg';
import ProtocolIcon from '/ProtocolIcon-reverse.svg';
import CardSlider from './CardSlider.jsx';
import Quote from '../Library/Quote.jsx';
import { useTranslation } from 'react-i18next';

export default function StudioExplore({ db, handleGoto, lang }) {
    const { t } = useTranslation();


    // console.log("Loaded Explore")


    const samples = [
        { sec: "health", items: [
            "P.20240819T232610856-2101",
            "P.20240819T233440225-335",
        ]},
        { sec: "work", items: [
            "P.20240723T214139998-8636",
            "P.20240716T165602811-5197",
            "P.20240802T222430553-1659",
            "P.20240816T151315000-4430",
            "P.20240730T160518275-5721"
        ]},
        { sec: "personal", items: [
            "P.20240820T014402960-4876",
            "P.20240820T015254747-6424",
        ]},
        { sec: "home", items: [
            "P.20240820T020514683-428",
            "P.20240820T021240390-67",
        ]},
        { sec: "learn", items: [
            "P.20240820T023731478-8969",
            "P.20240820T160126483-961",
            "P.20240820T161819685-7886",
        ]},
        { sec: "safe", items: [
            "P.20240820T164226261-8123",
            "P.20240820T164933012-8867",
        ]}
    ]

    // console.log("DB", db)

    // if (db === null) return null

    samples.forEach((sec, i) => {
        sec.items.forEach((iId, ii) => {
            samples[i].items[ii] = db.find(item => iId === item.iId)
        })
        // console.log("key", sec.sec, i)
    })

    // console.log("Samples", samples)
    // console.log("Explore Return")

    return (
        <Fragment>
            <Box display="flex" flexDirection="column" width="100%" style={{ placeItems: 'center', marginTop:'10px', marginBottom:'50px' }}>
                <h1 className='headline'>{ t('explore.sectionHead') }</h1>
                <img style={{ marginTop:"30px" }} src="/rManIcon.svg" height='90em'></img><br/>
                <span className='sectionTitle'>{ t('explore.howWorkHead') }</span>
                <Box display='flex' flexDirection='row' flexWrap='wrap' maxWidth='95vw' alignItems='center' justifyContent='center'>
                    <Box margin='20px' maxWidth='220px'>
                        <h2 className='cardTitle' >{ t('explore.howWorkH1') }</h2>
                        <span className='calloutText'>{ t('explore.howWorkP1') }</span>
                    </Box>
                    <Box margin='20px' maxWidth='220px'>
                        <h3 className='cardTitle' >{ t('explore.howWorkH2') }</h3>
                        <span className='calloutText'>{ t('explore.howWorkP2') }</span>
                    </Box>
                    <Box margin='20px' maxWidth='220px'>
                        <h3 className='cardTitle' >{ t('explore.howWorkH3') }</h3>
                        <span className='calloutText'>{ t('explore.howWorkP3') }</span>
                    </Box>
                </Box>
            </Box>
            <br/>
            <br/>
            <span className='sectionTitle'>{ t('explore.structureHead') }</span>
            <span className='calloutText'>{ t('explore.structureSubhead') }</span>

            <Box display={'flex'} flexDirection={'row'} flexWrap='wrap' maxWidth='95vw' alignItems='center' justifyContent='center'>
                <Box m={1} p={2} minHeight={"90px"} width='300px'>
                    <img src={ NeedIcon } height='38px' alt="Need Icon" style={{ marginBottom:'15px' }} />
                    <p className='cardTitle'>{ t('explore.structureH1') }</p>
                    <span className='calloutText'><b>{ t('explore.structureP1-1b') }</b> { t('explore.structureP1-2') }</span>
                </Box>
                <Box m={1} p={2} minHeight={"90px"} width='300px'>
                    <img src={ ProtocolIcon } height='38px' alt="Protocol Icon" style={{ marginBottom:'15px' }} />
                    <p className='cardTitle'>{ t('explore.structureH2') }</p>
                    <span className='calloutText'>
                        <b>{ t('explore.structureP2-1b') }</b> { t('explore.structureP2-2') }</span>
                </Box>
            </Box>

            <Quote quote={ t('explore.bernersLeeQuote') } author={ t('explore.bernersLeeAuthor') }/>

            <h2 style={{ color:'#377AB8', marginTop:'-20px' }}>{ t('explore.exploreProtocolsHead') }</h2>
            <p>{ t('explore.exploreProtocolsSubhead') }</p>

            {/* <p>MAYBE PUT HERE EXPLANATION OF NEEDS AND PROTOCOLS. HANDSHAKE EXPECTATION</p> */}

            <h3>{ t('explore.healthHead') }</h3>
            <Box className='flexParagraph' >
                <b>{ t('explore.healthP-1b') }</b> { t('explore.healthP-2') }
            </Box>
            <CardSlider items={ samples[0].items } handleGoto={ handleGoto } lang={ lang } />
            <Button variant='contained' style={{ margin: '10px', marginBottom: '40px' }}
                onClick={ () => { handleGoto(`/${ lang }/studio/need/health-and-wellness/N.20240719T013350667-2941.0`)}}>
                    { t('explore.healthButton') }
            </Button>
            
            <h3>{ t('explore.workHead') }</h3>
            <Box className='flexParagraph' >
                <b>{ t('explore.workP-1b') }</b> { t('explore.workP-2') }
            </Box>
            <CardSlider items={ samples[1].items } handleGoto={ handleGoto } lang={ lang } />
            <Button variant='contained' style={{ margin: '10px', marginBottom: '40px' }}
                onClick={ () => { handleGoto(`/${ lang }/studio/need/how-to-make-a-living-through-work/N.20240718T183058317-4372.0`)}}>
                    { t('explore.workButton') }
            </Button>

            <h3>{ t('explore.personalHead') }</h3>
            <Box className='flexParagraph' >
                <b>{ t('explore.personalP-1b') }</b> { t('explore.personalP-2') }
            </Box>
            <CardSlider items={ samples[2].items } handleGoto={ handleGoto } lang={ lang } />
            <Button variant='contained' style={{ margin: '10px', marginBottom: '40px' }}
                onClick={ () => { handleGoto(`/${ lang }/studio/need/how-to-fulfill-your-personal-growth/N.20240719T015630854-1559.0`)}}>
                    { t('explore.personalButton') }
            </Button>


            <h3>{ t('explore.homeHead') }</h3>
            <Box className='flexParagraph' >
                <b>{ t('explore.homeP-1b') }</b> { t('explore.homeP-2') }
            </Box>
            <CardSlider items={ samples[3].items } handleGoto={ handleGoto } lang={ lang } />
            <Button variant='contained' style={{ margin: '10px', marginBottom: '40px' }}
                onClick={ () => { handleGoto(`/${ lang }/studio/need/how-to-maintain-a-home/N.20240719T011209835-8437.0`)}}>
                    { t('explore.homeButton') }
            </Button>


            <h3>{ t('explore.learnHead') }</h3>
            <Box className='flexParagraph' >
                <b>{ t('explore.learnP-1b') }</b> { t('explore.learnP-2') }
            </Box>
            <CardSlider items={ samples[4].items } handleGoto={ handleGoto } lang={ lang } />
            <Button variant='contained' style={{ margin: '10px', marginBottom: '40px' }}
                onClick={ () => { handleGoto(`/${ lang }/studio/need/how-to-learn-new-things/N.20240719T010621680-9936.0#view-item`)}}>
                    { t('explore.learnButton') }
            </Button>


            <h3>{ t('explore.safetyHead') }</h3>
            <Box className='flexParagraph' >
                <b>{ t('explore.safetyP-1b') }</b> { t('explore.safetyP-2') }
            </Box>
            <CardSlider items={ samples[5].items } handleGoto={ handleGoto } lang={ lang } />
            <Button variant='contained' style={{ margin: '10px', marginBottom: '40px' }}
                onClick={ () => { handleGoto(`/${ lang }/studio/need/how-to-ensure-safety-and-security/N.20240719T013958122-8822.0#view-item`)}}>
                    { t('explore.safetyButton') }
            </Button>
        </Fragment>
    )
}
