import { Box, Card, Typography } from '@mui/material'
import ContactForm from '../ContactForm';
import { useNavigate } from 'react-router-dom';

export default function SessionsPage(props) {
    const { handleSwitchPublicPage } = props
    
    const screenW = window.screen.width
    const videoW = ( screenW > 700) ? 600 : 350


    const navigate = useNavigate()
    
    return (
        <Box className='plantBackground'>
            <h1 className='headline'>Collaborative Sessions</h1>
            <span className='headline'><img className='headlineLogo'src="/rCollabsLogo-blackBg.svg" alt='rCollabs Logo'></img></span>
            <span className='subheadline' style={{ marginTop:'-35px' }}>The Peer-to-Peer Brands Network Driving Mutual Success</span>
            <br/>
            <br/>
            <br/>
            <br/>
            <Box maxWidth={ videoW } alignSelf='center'>
                <span className='quote' style={{ width: videoW }}>Join us for our free, transformative sessions designed to empower you as a dynamic collaborator and co-founder. Whether you prefer attending in person or participating virtually via Zoom, these sessions offer a unique opportunity to learn, connect, and grow within the rCollab Network. Explore the basics of collaboration, dive into branding, engage in protocol development, and embark on your journey as a co-founder with the support of a vibrant community.<p/>Dates are yet to be set, so stay tuned and be sure to sign up to secure your spot in these invaluable co-learning experiences.</span>
            </Box>
            
            {/* // SESSION 1 */}
            <Box className="sessionContainerYellow">
                <Box m={4} mr={.2} display='flex' flexDirection="column" justifyContent='flex-end'>
                    <img className='sessionPic' src="/Session1.png"></img>
                </Box>
                <Box className='quote' style={{ width: videoW, textAlign:'left' }}>
                    
                    <b>Co-learning Sessions: Master the Collab Basics with SOLE</b><br/>Jumpstart your journey into the world of collaboration and co-founding with our immersive SOLEs (Self Oriented Learning Experiences) sessions. Designed to introduce you to the core principles and innovative approaches of being a dynamic collaborator and co-founder, these sessions provide a hands-on learning experience like no other.
                    <br/><br/>
                    <p className='benefitTitle'>What to Expect:</p>
                    <ul className='sessionText' style={{ width: videoW - 30, textAlign:'left' }}>
                        <li style={{ margin: '4px'}}><b>Engaging Workshops:</b> Participate in interactive workshops where you can learn the foundational skills of collaboration and co-founding.</li>
                        <li style={{ margin: '4px'}}><b>Peer Collaboration:</b> Work alongside a diverse group of individuals, sharing ideas and strategies to enhance your collaborative efforts.</li>
                        <li style={{ margin: '4px'}}><b>Practical Exercises:</b> Engage in real-world exercises that help you apply what you've learned in a practical, impactful way.</li>
                        <li style={{ margin: '4px'}}><b>Expert Guidance:</b> Receive insights and guidance from experienced facilitators who are passionate about fostering collaboration and innovation.</li>
                        <li style={{ margin: '4px'}}><b>Community Building:</b> Connect with like-minded peers, forming a supportive network that extends beyond the sessions.</li>
                    </ul>
                    <p className='sessionText' style={{ width: videoW, textAlign:'left' }}>Join us to explore the starting perspectives and approaches that will empower you to thrive as a collaborator and co-founder. Whether you're new to the concept or looking to deepen your understanding, our SOLES sessions are the perfect stepping stone to mastering the Collab basics.</p>
                    {/* <Box my='2em' style={{ width:'100%', display:"flex" }}> */}
                        {/* <a href='sessions/form?session=1'> */}
                            <Card style={{ paddingTop:'1em', paddingBottom:'1em', paddingLeft:'2em', paddingRight:'2em', 
                                backgroundColor:'#FFC400', textAlign: 'center', cursor:'pointer' }} onClick={()=>{navigate('/sessions/form?session=1', {replace: true })}}>
                                <Typography variant="h1" fontSize='1.1em'><b>Sign Me Up for Co-learning Sessions</b></Typography>
                            </Card>
                        {/* </a> */}
                    {/* </Box> */}
                </Box>
            </Box>

            {/* // SESSION 2 */}
            <Box className="sessionContainerTransparent">
                <Box className='quote' style={{ width: videoW, textAlign:'left' }}>
                    <b>Branding Sessions: Identify and Partner Up</b><br/>Choose the brand or service you want to contribute to our ecosystem and partner with peers who share your passion. Start the exciting journey of becoming a Collab owner with our Branding Sessions.
                    <br/><br/>
                    <p className='benefitTitle'>What to Expect:</p>
                    <ul className='sessionText' style={{ width: videoW - 30, textAlign:'left' }}>
                        <li style={{ margin: '4px'}}><b>Brand Exploration:</b> Dive deep into identifying the brands or services that resonate with your interests and goals.</li>
                        <li style={{ margin: '4px'}}><b>Collaborative Brainstorming:</b> Engage in creative brainstorming sessions with peers to generate innovative ideas and strategies.</li>
                        <li style={{ margin: '4px'}}><b>Hands-On Activities:</b> Participate in practical activities that help you understand and refine the branding approach.</li>
                        <li style={{ margin: '4px'}}><b>Networking Opportunities:</b> Connect with like-minded individuals who share your vision, forming valuable partnerships.</li>
                        <li style={{ margin: '4px'}}><b>Step-by-Step Guidance:</b> Receive expert advice and support as you navigate the process of becoming a rCollab owner.</li>
                    </ul>
                    <p className='sessionText' style={{ width: videoW, textAlign:'left' }}>Join us to explore, collaborate, and take the first steps towards owning your rCollab.</p>
                    {/* <a href='/sessions?signup=session2'> */}
                        <Card style={{ paddingTop:'1em', paddingBottom:'1em', paddingLeft:'2em', 
                            paddingRight:'2em', backgroundColor:'#FFC400', textAlign: 'center', cursor:'pointer'  }} onClick={()=>{navigate('/sessions/form?session=2', {replace: true })}}>
                            <Typography variant="h1" fontSize='1.1em'><b>Sign Me Up for Branding Sessions</b></Typography>
                        </Card>
                    {/* </a> */}
                </Box>
                <Box m={4} mr={.2} >
                    <img className='sessionPic' src="/Session2.png"></img>
                </Box>
            </Box>
            
            {/* // SESSION 3 */}
            <Box className="sessionContainerYellow">
                <Box m={4} mr={.2} >
                    <img className='sessionPic' src="/Session3.png"></img>
                </Box>
                <Box className='quote' style={{ maxWidth: videoW, textAlign:'left' }}>
                    
                    <b>Protocol Development Sessions: Build and Innovate</b><br/>Get involved in the Protocol development process and contribute to building the rProtocol platform and content. Collaborate with peers to answer the critical question, "How can we do this?"
                    <br/><br/>
                    <p className='benefitTitle'>What to Expect:</p>
                    <ul className='sessionText' style={{ width: videoW - 30, textAlign:'left' }}>
                        <li style={{ margin: '4px'}}><b>Interactive Discussions:</b> Engage in detailed discussions about protocol development and its impact on the rCollab ecosystem.</li>
                        <li style={{ margin: '4px'}}><b>Practical Workshops:</b> Participate in workshops that provide hands-on experience with protocol development tools and techniques.</li>
                        <li style={{ margin: '4px'}}><b>Experienced Input:</b> Learn from experienced protocol developers and innovators who guide you through the development process.</li>
                        <li style={{ margin: '4px'}}><b>Community Collaboration:</b> Build strong connections with fellow open collaborators, sharing knowledge and skills to enhance the rProtocol platform.</li>
                        <li style={{ margin: '4px'}}><b>Collaborative Coding:</b> If you code, work alongside peers on coding projects, developing and refining the COOP<sup>2</sup> specs and platform.</li>
                    </ul>
                    <p className='sessionText' style={{ width: videoW, textAlign:'left' }}>Join us to innovate, develop, and contribute to a cutting-edge platform that drives our community forward.</p>
                    {/* <a href='/sessions?signup=session3'> */}
                        <Card style={{ paddingTop:'1em', paddingBottom:'1em', paddingLeft:'2em', 
                            paddingRight:'2em', backgroundColor:'#FFC400', textAlign: 'center', cursor:'pointer'  }} onClick={()=>{navigate('/sessions/form?session=3', {replace: true })}}>
                            <Typography variant="h1" fontSize='1.1em'><b>Sign Me Up for Protocol Sessions</b></Typography>
                        </Card>
                    {/* </a> */}
                </Box>
            </Box>

            {/* // SESSION 4 */}
            <Box className="sessionContainerTransparent">
                <Box className='quote' style={{ maxWidth: videoW, textAlign:'left' }}>
                    
                    <b>Co-founding Sessions: Collaborate and Create</b><br/>Bring your collaborators together and embark on the journey of founding a Collaborative in a supportive community setting. Build your Collaborative using rProtocols and tools that serve the rCollab Network.
                    <br/><br/>
                    <p className='benefitTitle'>What to Expect:</p>
                    <ul className='sessionText' style={{ width: videoW  - 30, textAlign:'left' }}>
                        <li style={{ margin: '4px'}}><b>Community Building:</b> Engage in activities that foster a sense of community and shared purpose among collaborators.</li>
                        <li style={{ margin: '4px'}}><b>Collaborative Planning:</b>Participate in planning sessions that help you outline the vision and goals for your Collaborative.</li>
                        <li style={{ margin: '4px'}}><b>Practical Implementation:</b>Use rProtocols and other tools to build and launch your Collaborative effectively.</li>
                        <li style={{ margin: '4px'}}><b>Celebratory Support:</b> Complete and celebrate the founding with your peers, marking milestones in your journey.</li>
                        <li style={{ margin: '4px'}}><b>Ongoing Support:</b> Connect with like-minded peers, forming a supportive network that extends beyond the sessions.</li>
                    </ul>
                    <p className='sessionText' style={{ width: videoW, textAlign:'left' }}>Join us to collaborate, co-create, and build a thriving Collaborative that contributes to the rCollab Network.</p>
                    {/* <a href='/sessions-form?signup=session4'> */}
                        <Card style={{ paddingTop:'1em', paddingBottom:'1em', paddingLeft:'2em', paddingRight:'2em', 
                            backgroundColor:'#FFC400', textAlign: 'center', cursor:'pointer' }} onClick={()=>{navigate('/sessions/form?session=4', {replace: true })}}>
                            <Typography variant="h1" fontSize='1.1em'><b>Sign Me Up for Co-founding Sessions</b></Typography>
                        </Card>
                    {/* </a> */}
                </Box>
                <Box m={4} mr={.2} >
                    <img className='sessionPic' src="/Session4.png"></img>
                </Box>
            </Box>
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
