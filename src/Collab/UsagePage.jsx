import { useState } from 'react';
import { Box, Card, Button, TextField, MenuItem, Typography } from '@mui/material'
import Header from '../Header';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';
import FeaturedSection from '../FeaturedSection';
import ContactForm from '../ContactForm';
import ResponsiveVideo from '../ResponsiveVideo';

export default function UsagePage(props) {
    const { handleSwitchPublicPage } = props

    const screenW = window.screen.width
    const videoW = ( screenW > 700) ? 700 : 375
    const ratio = 0.5625
    const videoH = videoW * ratio
    
    return (
        <Box className='plantBackground'>    
            <h1 className='headline'>About</h1>
            <span className='headline' style={{ marginTop:'-2em'}}><img className='headlineLogo'src="/rCollabsLogo-blackBg.svg" alt='rCollaboratives Logo'></img></span>

            <Box className="quoteContainer">
                <span className='quote'>&quot;Alone we can do so little; together we can do so much.&quot;<br/><strong>Helen Keller</strong></span>
            </Box>
            
            <Box style={{ display:'flex', flexDirection: 'column', justifyContent:'center', alignContent: 'center', marginTop:'0' }}>
                
                <Box className='sessionDescription'>
                    <p className='subheadline' style={{ marginTop:'-35px', marginBottom:'12px' }}>What are Collaboratives and rCollabs?</p>
                    <p>Collaboratives are innovative, cooperative entities designed to operate outside traditional corporate frameworks. They emphasize collective ownership, self-management, and peer-to-peer collaboration. rCollabs takes this concept further by creating a network of these collaboratives, integrating advanced technologies and open-source protocols to foster a circular economy. In rCollabs, community funding flows through peer participants, driving operational excellence and magnifying impact within an interdependent ecosystem. Our goal is to empower individuals to co-create and co-manage ventures, fostering a resilient economic structure that adapts and thrives across diverse service and product areas.</p>

                    <p className='subheadline' style={{ marginTop:'20px', marginBottom:'12px' }}>Who's Behind rCollabs?</p>
                    <p>rCollabs is powered by a dedicated team of innovators, entrepreneurs, and community leaders who are passionate about transforming the economic landscape. Our founders bring a wealth of experience in cooperative business models, digital innovation, and social entrepreneurship. They are united by a vision of a more inclusive and equitable economy, where every participant has a stake in the success and sustainability of the collective.</p>
                    <p>In addition to our core team, rCollabs is supported by the global Radical World and Integrative Law communities. These communities are composed of thought leaders, activists, and legal professionals who are pioneering new ways of thinking about and practicing law and economics. They advocate for systems that prioritize human well-being, social justice, and ecological sustainability. Their insights and expertise play a crucial role in shaping the principles and practices of rCollabs.</p>
                    <p>Together, this diverse coalition of change-makers is committed to providing the tools, resources, and support needed to launch and grow successful collaboratives within the rCollabs network. By leveraging the collective knowledge and experience of our global community, we are building a resilient and adaptable economic ecosystem that champions transparency, fairness, and mutual benefit.</p>

                    <p className='subheadline' style={{ marginTop:'20px', marginBottom:'12px' }}>Envisioned Impact</p>
                    <p>At rCollabs, we envision a profound impact on the way economic activity is conducted and experienced globally. Our aim is to revolutionize traditional economic models by fostering a network of collaboratives that operate with transparency, fairness, and mutual benefit at their core. We believe that by empowering individuals and communities to co-create and co-manage ventures, we can catalyze a more inclusive and equitable economy.</p>
                    <p>Our impact extends beyond economic metrics; it touches lives and transforms communities. By leveraging technology, open-source protocols, and community-driven initiatives, we envision an interconnected economic ecosystem that is resilient and adaptable. This ecosystem will support diverse needs and aspirations, ensuring that value is created and shared equitably among all participants.</p>
                    <p>We see a future where everyone has the opportunity to participate in and benefit from a thriving, collaborative economy. Our work aims to pave the way for a world where economic empowerment and social equity are the foundation of our collective efforts. Through our initiatives, we aspire to create lasting change that fosters social justice, ecological sustainability, and human well-being, driving forward the vision of a Radical World.</p>

                    <p className='subheadline' style={{ marginTop:'20px', marginBottom:'12px' }}>Join Us</p>
                    <p>We invite you to explore the possibilities within the rCollabs network. Whether you are looking to start your own collaborative, support community-driven ventures, or simply learn more about our innovative approach, there is a place for you in our ecosystem. Together, we can build a future where economic empowerment and social equity are at the forefront of our collective efforts.</p>
                </Box>
                <Box my='2em' alignSelf={"center"} style={{ display:"flex", flexDirection:"row" }}>
                    <a href='/sessions'>
                        <Card style={{ paddingTop:'1em', paddingBottom:'1em', paddingLeft:'2em', paddingRight:'2em', backgroundColor:'#FFC400' }}>
                            <Typography variant="h1" fontSize='1.4em'><strong>Join a Free<br/>Collaborative Session</strong></Typography>
                        </Card>
                    </a>
                </Box>
            </Box>

            <br/>
            <br/>
            <br/>
            <br/>
            <span className='sectionTitle'>CONTACT US</span>
            <span className='benefitTitle'>Want to learn more? Reach out or join one of our regular Founders Calls.</span>
            <Box display='grid' style={{ placeItems: 'center', marginBottom: '50px'}}>
                <Box className="form">
                    <ContactForm/>
                </Box>
            </Box>
        </Box>
    )
}
