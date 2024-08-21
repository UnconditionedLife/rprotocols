import { Fragment } from 'react';
import { Box, Button } from '@mui/material'
import NeedIcon from '/NeedIcon-reverse.svg';
import ProtocolIcon from '/ProtocolIcon-reverse.svg';
import CardSlider from './CardSlider.jsx';
import Quote from '../Library/Quote.jsx';

export default function StudioExplore({ db, handleGoto, lang }) {

    const samples = [
        { sec: "health", items: [
            "P.20240819T232610856-2101.0",
            "P.20240819T233440225-335.0",
        ]},
        { sec: "work", items: [
            "P.20240723T214139998-8636.0",
            "P.20240716T165602811-5197.0",
            "P.20240802T222430553-1659.0",
            "P.20240816T151315000-4430.0",
        ]},
        { sec: "personal", items: [
            "P.20240820T014402960-4876.0",
            "P.20240820T015254747-6424.0",
        ]},
        { sec: "home", items: [
            "P.20240820T020514683-428.0",
            "P.20240820T021240390-67.0",
        ]},
        { sec: "learn", items: [
            "P.20240820T023731478-8969.0",
            "P.20240820T160126483-961.0",
            "P.20240820T161819685-7886.0",
        ]},
        { sec: "safe", items: [
            "P.20240820T164226261-8123.0",
            "P.20240820T164933012-8867.0",
        ]}
    ]

    // console.log("DB", db)

    if (db === null) return null

    samples.forEach((sec, i) => {
        sec.items.forEach((iMajId, ii) => {
            samples[i].items[ii] = db.find(item => iMajId === item.majId)
        })
        // console.log("key", sec.sec, i)
    })

    
    // console.log("Samples", samples)

    function handleViewBundle(){
        // console.log("something")
    }

    return (
        <Fragment>
            <br/>
            <Box style={{ placeItems: 'center', marginTop:'50px', marginBottom:'50px' }}>
                {/* <img src="/RadicalPerson.svg" height="40px"></img> */}
                <img style={{ marginTop:"30px" }} src="/rManIcon.svg" height='90em'></img><br/>
                <span className='sectionTitle'>HOW IT WORKS</span>
                <Box display='flex' flexDirection='row' flexWrap='wrap'>
                    <Box margin='20px' maxWidth='220px'>
                        <h2 className='cardTitle' >Discover</h2>
                        <span className='calloutText'>Browse through the library of Needs and Protocols.</span>
                    </Box>
                    <Box margin='20px' maxWidth='220px'>
                        <h3 className='cardTitle' >Contribute</h3>
                        <span className='calloutText'>Community contributions ensures that each protocol evolves and stays relevant.</span>
                    </Box>
                    <Box margin='20px' maxWidth='220px'>
                        <h3 className='cardTitle' >Implement</h3>
                        <span className='calloutText'>Adopt Protocols directly in your operations with notification and transparency.</span>
                    </Box>
                </Box>
            </Box>
            
            <h3><b>THE STRUCTURE</b></h3>
            <span className='calloutText'>rPROTOCOLS are arranged into two levels</span>

            <Box display='grid' >
                <Box display={'flex'} flexDirection={'row'}>
                    {/* <Box className='benefits'> */}
                        {/* <Box m={1} display={'flex'} flexDirection={'row'} flexWrap='wrap' > */}
                            <Box m={1} p={2} minHeight={"90px"} width='300px'>
                                {/* <CategoryIcon fontSize='large' color='primary'/> */}
                                <img src={ NeedIcon } height='38px' alt="Need Icon" style={{ marginBottom:'15px' }} />
                
                                <p className='cardTitle'>Needs</p>
                                <span className='calloutText'>
                                <b>Identify and understand the essential needs that drive our actions.</b> Each need highlights a specific requirement that must be met, serving as the foundation for the corresponding protocol that offers a path to fulfillment.
                                    {/* Needs define a practical need to a protocol can guide us through meeting:<br/><strong>How can we address this need?</strong> */}
                                    </span>
                            </Box>
                        {/* </Box>
                        <Box m={1} display={'flex'} flexDirection={'row'} flexWrap='wrap' > */}
                            <Box m={1} p={2} minHeight={"90px"} width='300px'>
                                {/* <MyLocationIcon fontSize='large' color='primary'/> */}
                                <img src={ ProtocolIcon } height='38px' alt="Protocol Icon" style={{ marginBottom:'15px' }} />
                                <p className='cardTitle'>Protocols</p>
                                <span className='calloutText'>
                                    <b>Follow structured protocols to effectively address identified needs.</b> Each protocol provides step-by-step guidance, ensuring that every need is met with precision, clarity, and consistency.
                                    
                                    </span>
                            </Box>
                        {/* </Box> */}
                    {/* </Box> */}
                </Box>
            </Box>

        {/* <Box className='myceliumBackground' display={'flex'} flexDirection={'column'} backgroundColor='black' alignItems='center' overflow='hidden'> */}

            {/* <h1  className='headline'>Protocol Explorer</h1> */}
            {/* <Box className='headlineLogo'><img src="/rProtocolsLogo-blackBg.svg" alt='rProtocol Logo'></img></Box> */}
            {/* <h2 className='subheadline'>Find the Protocols You Need</h2> */}

            <Quote quote="Standards are like parachutes:|they only function when they are open." author="Tim Berners-Lee"/>

            {/* <Box mb='4em' mx={10} alignSelf={"center"} style={{ cursor:'pointer' }}>
                <Card style={{ paddingTop:'1em', paddingBottom:'1em', paddingLeft:'2em', paddingRight:'2em', backgroundColor:'#FFC400' }}
                    onClick={() => { handleGoto('/studio') }}>
                    <h3 style={{ color:'black', marginTop:'0px'}}><b>Jump in the<br/>Studio</b></h3>
                </Card>
            </Box> */}

            <h2 style={{ color:'#377AB8', marginTop:'-20px' }}>Explore Your Protocols</h2>
            <p>Protocols are designed to address needs.</p>
            {/* Explore Protocols in these six practical Life Needs. */}

            {/* <p>MAYBE PUT HERE EXPLANATION OF NEEDS AND PROTOCOLS. HANDSHAKE EXPECTATION</p> */}


            <h3>How can I maintain my Health and Wellness?</h3>
            <Box className='flexParagraph' >
                <b>Health and Wellness Protocols</b> offer guidance for achieving and maintaining physical and mental well-being. Covering nutrition, exercise, mental health, and preventive care, these protocols empower individuals to lead healthier lives through practical strategies and best practices.
            </Box>
            <CardSlider items={ samples[0].items } handleGoto={ handleGoto } lang={ lang } />
            <Button variant='contained' style={{ margin: '10px', marginBottom: '40px' }}
                onClick={ () => { handleGoto(`/${ lang }/studio/need/health-and-wellness/N.20240719T013350667-2941.0`)}}>
                    Health & Wellness &gt; Protocol Studio
            </Button>
            

            <h3>How can I Work effectively?</h3>
            <Box className='flexParagraph' >
                <b>Work Protocols</b> are designed to support individuals in navigating the complexities of the modern job market and workplace. From career development and job search strategies to remote work practices and entrepreneurship, these protocols offer valuable insights and tools. They also include foundational agreements and operating protocols for starting and managing businesses, helping individuals thrive professionally.
            </Box>
            <CardSlider items={ samples[1].items } handleGoto={ handleGoto } lang={ lang } />
            <Button variant='contained' style={{ margin: '10px', marginBottom: '40px' }}
                onClick={ () => { handleGoto(`/${ lang }/studio/need/how-to-make-a-living-through-work/N.20240718T183058317-4372.0`)}}>To Work &gt; Protocol Studio</Button>


            <h3>How can I grow Personally?</h3>
            <Box className='flexParagraph' >
                <b>Personal Development Protocols</b> focus on fostering growth and self-improvement. These protocols provide frameworks for goal setting, time management, emotional intelligence, and resilience. By offering practical strategies for self-reflection, creativity, and leadership, they empower individuals to reach their full potential and adapt to changing circumstances.
            </Box>
            <CardSlider items={ samples[2].items } handleGoto={ handleGoto } lang={ lang } />
            <Button variant='contained' style={{ margin: '10px', marginBottom: '40px' }}
                onClick={ () => { handleGoto(`/${ lang }/studio/need/how-to-fulfill-your-personal-growth/N.20240719T015630854-1559.0`)}}>Personal Develpment &gt; Protocol Studio</Button>


            <h3>How can I find and sustain a Home?</h3>
            <Box className='flexParagraph' >
                <b>Home Protocols</b> provide guidance for creating a safe, sustainable, and comfortable living space. Covering budgeting, maintenance, design, and safety, these protocols help individuals manage and enhance their homes and foster community living.
            </Box>
            <CardSlider items={ samples[3].items } handleGoto={ handleGoto } lang={ lang } />
            <Button variant='contained' style={{ margin: '10px', marginBottom: '40px' }}
                onClick={ () => { handleGoto(`/${ lang }/studio/need/how-to-maintain-a-home/N.20240719T011209835-8437.0`)}}>Maintaining a Home &gt; Protocol Studio</Button>


            <h3>How can I Learn new things?</h3>
            <Box className='flexParagraph' >
                <b>Learning Protocols</b> support lifelong learning and skill acquisition. They offer strategies for effective education, online learning, and self-directed study, encouraging critical thinking and collaboration to expand knowledge and capabilities.
            </Box>
            <CardSlider items={ samples[4].items } handleGoto={ handleGoto } lang={ lang } />
            <Button variant='contained' style={{ margin: '10px', marginBottom: '40px' }}
                onClick={ () => { handleGoto(`/${ lang }/studio/need/how-to-learn-new-things/N.20240719T010621680-9936.0#view-item`)}}>Life Long Learning &gt; Protocol Studio</Button>


            <h3>How can I ensure my Safety and Security?</h3>
            <Box className='flexParagraph' >
                <b>Safety and Security Protocols</b> offer guidelines for safeguarding personal and community well-being. Covering personal safety, financial security, online privacy, and emergency preparedness, these protocols help create secure environments for individuals and communities.
            </Box>
            <CardSlider items={ samples[5].items } handleGoto={ handleGoto } lang={ lang } />
            <Button variant='contained' style={{ margin: '10px', marginBottom: '40px' }}
                onClick={ () => { handleGoto(`/${ lang }/studio/need/how-to-ensure-safety-and-security/N.20240719T013958122-8822.0#view-item`)}}>Safety & Security &gt; Protocol Studio</Button>


        </Fragment>
    )
}
