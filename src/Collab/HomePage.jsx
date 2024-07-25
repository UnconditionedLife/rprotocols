import { useState } from 'react';
import { Box, Card, Button, TextField, MenuItem, Typography } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from '../Header';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';
import FeaturedSection from '../FeaturedSection';
import ContactForm from '../ContactForm';
import ResponsiveVideo from '../ResponsiveVideo';
import { useNavigate } from 'react-router-dom';



export default function CollabHomePage(props) {
    const { handleSwitchPublicPage } = props

    const screenW = window.screen.width
    const videoW = ( screenW > 700) ? 700 : 375
    const ratio = 0.5625
    const videoH = videoW * ratio

    const navigate = useNavigate()
    
    return (
        <Box className='plantBackground'>    
            <h1 className='headline'>Collaborative Empowerment</h1>
            <span className='headline'><img className='headlineLogo'src="/rCollabsLogo-blackBg.svg" alt='rCollaboratives Logo'></img></span>
            <span className='subheadline' style={{ marginTop:'-35px' }}><span style={{ fontSize:'0.8em' }}>(Pronounced 'Our Collabs')</span><br/>The Peer-to-Peer Brands Network Driving Mutual Success</span>
            <br/>
            <br/>
            <br/>
            {/* <Box className="video-wrapper">
                <Box className='video-container'> */}
                <div>
                    <iframe width={ videoW } height={ videoH } src="https://www.youtube.com/embed/i5Q6XUgTK-4?si=D4tGw76mYg2BfZK7?modestbranding=1&showinfo=0"
                        aspect-ratio= '16 / 9'
                        title="rCollabs Introduction Video" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen
                        modestbranding='1'
                        showinfo='0'>
                    </iframe>
                </div>
                {/* </Box>
            </Box> */}
            {/* <div className="App" style={{ width: '100%' }}>
                <h1>Responsive YouTube Video</h1>
                <ResponsiveVideo videoId="i5Q6XUgTK-4?si=D4tGw76mYg2BfZK7" /> {/* Replace with your YouTube video ID */}
            {/* </div>  */}

            <Box className="quoteContainer">
                <span className='quote'>&quot;What we have ignored is what citizens can do and the<br/>importance of real involvement from the people involved.&quot;<br/><strong>Elinor Ostrom</strong></span>
            </Box>
            
            <img src="/RadicalPerson.svg" height='90em'></img>

            <span className='sectionTitle'>Benefits</span>
            <Box display='grid' style={{ placeItems: 'center'}}>
                <Box className='benefits'>
                    <Box className='benefit'>
                        <img className='benefitIcon' src="/fast-easy.webp"></img>
                        <span className='benefitTitle'>Faster and Easier Start</span>
                        <Box className='benefitText'>Collaborative organizations can be established more quickly and with fewer bureaucratic hurdles than traditional corporations, allowing for rapid deployment and flexibility.</Box>
                    </Box>
                    <Box className='benefit'>
                        <img className='benefitIcon'src="/people_together.webp"></img>
                        <span className='benefitTitle'>Radically Collaborative Organization</span>
                        <Box className='benefitText'>These organizations emphasize deep collaboration, where all members actively participate in decision-making, fostering a culture of shared responsibility and innovation.</Box>
                    </Box>
                    <Box className='benefit'>
                        <img className='benefitIcon' src="/turnkey2.webp"></img>
                        <span className='benefitTitle'>Turnkey Startup</span>
                        <Box className='benefitText'>Collaboratives offer turnkey solutions, providing entrepreneurs with ready-to-use frameworks, resources, and support systems to launch their ventures effortlessly.</Box>
                    </Box>
                    <Box className='benefit'>
                        <img className='benefitIcon' src="/supplier_network.webp" ></img>
                        <span className='benefitTitle'>Built-in Network of Suppliers (Open)</span>
                        <Box className='benefitText'>Members of a collaborative benefit from an open network of service providers, ensuring access to diverse resources and services without the constraints of proprietary agreements.</Box>
                    </Box>
                    <Box className='benefit'>
                        <img className='benefitIcon' src="/community_funding.webp" ></img>
                        <span className='benefitTitle'>Community Funding Available</span>
                        <Box className='benefitText'>Collaborative models often feature community-based funding mechanisms, such as peer-to-peer lending, enabling easier access to capital and fostering a sense of shared investment.</Box>
                    </Box>
                    <Box className='benefit'>
                        <img className='benefitIcon' src="/coowned_systems.webp" ></img>
                        <span className='benefitTitle'>Co-owned Systems and Technology</span>
                        <Box className='benefitText'>Many technologies and systems within collaboratives are co-owned, ensuring collaborators have a stake in their development and maintenance.</Box>
                    </Box>
                    <Box className='benefit'>
                        <img className='benefitIcon' src="/coowned_network.webp" ></img>
                        <span className='benefitTitle'>Co-owned Organization & Network</span>
                        <span className='benefitText'>The collaborative structure ensures that the organization and its network are co-owned by all members, promoting a sense of unity and shared purpose.</span>
                    </Box>
                    <Box className='benefit'>
                        <img className='benefitIcon' src="/many_brands.webp" ></img>
                        <span className='benefitTitle'>Many Brands to Join & Build</span>
                        <Box className='benefitText'>These organizations emphasize deep collaboration, where all members actively participate in decision-making, fostering a culture of shared responsibility and innovation.</Box>
                    </Box>
                    <Box className='benefit'>
                        <img className='benefitIcon' src="/comanagement.webp" ></img>
                        <span className='benefitTitle'>Co-managed Decision Making</span>
                        <Box className='benefitText'>Implement solutions faster with protocols and practices designed for rapid deployment and scalability.</Box>
                    </Box>
                    <Box className='benefit'>
                        <img className='benefitIcon' src="/help_others.webp" ></img>
                        <span className='benefitTitle'>Ability to Help Others Startup</span>
                        <Box className='benefitText'>These organizations emphasize deep collaboration, where all members actively participate in decision-making, fostering a culture of shared responsibility and innovation.</Box>
                    </Box>
                </Box>
            </Box>
            <Box className="quoteContainer">
                <Box className='quote' style={{ color:'black' }}>"Founded on the principles of private initiative, entrepreneurship, and self-employment, underpinned by the values of democracy, equality, and solidarity, the cooperative movement can help pave the way to a more just and inclusive economic order"​ <br/><strong>Kofi Annan</strong></Box>
            </Box>
            <span className='sectionTitle'>Collaborative Economy</span>

            
            <img className="collabEconomyImage" src="/collab_economy.png" alt='rCollaborative Economy Diagram'></img>
            <span className="collabEconomyText" ><strong>rCollabs</strong> are an integral part of the emerging <strong>Collaborative Economy</strong>, a fully circular system where funding originates from the community and flows through peer participants within various collaboratives, ultimately fueling the broader rCollab Network.<p/>The <strong>rCollab Network</strong> is an ecosystem of technologies and protocols that connect individuals, creating an economic powerhouse greater than the sum of its parts. Through mechanisms such as P2P crowdlending, personal investments, protocols, and various service and ecosystem fees, the flow of funds and resources is optimized to support operational excellence, magnify impact, and and ensure organic expansion.<p/>This dynamic system fosters autonomy and responsibility among participants, reinforcing a robust and interdependent economic structure.</span>

            <Box className='testimonialContainer'>
                <span className='sectionTitle' style={{ color: 'black' }}>Testimonials</span>
                <Box display='grid' style={{ placeItems: 'center', color:'black'}}>
                    <Box className='testimonials'>
                        <Box className='testimonial'>
                            <Box className='testimonialText'>&quot;The idea of a startup that is, from the beginning, a radically human organization is very exciting.&quot;<br/><strong>- Marcial Quintanar (Mexico)</strong> </Box>
                        </Box>
                        <Box className='testimonial'>
                            <Box className='testimonialText'>&quot;It&apos;s amazing to see these co-owned and co-managed companies become the radically new evolution of work.&quot;<br/><strong>- Oscar Calderon (Brazil)</strong> </Box>
                        </Box>
                        <Box className='testimonial'>
                            <Box className='testimonialText'>&quot;The future of work is about living fully, and rCollabs can enable people to truly live and succeed.&quot;<br/><strong>- Doug Breitbart (USA)</strong> </Box>
                        </Box>
                        <Box className='testimonial'>
                            <Box className='testimonialText'>&quot;I&apos;m familiar with many new models of work. rCollabs is one of the most innovative I&apos;ve seen!&quot;<br/><strong>- Tine Bieber (Netherlands)</strong> </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box style={{ display:'flex', flexDirection: 'column', justifyContent:'center', alignContent: 'center', marginTop:'0' }}>
                <Box my='2em' alignSelf={"center"} style={{ display:"flex", flexDirection:"row", cursor:'pointer' }} onClick={()=>{navigate('/sessions', {replace: true })}}>
                    {/* <a href='/sessions'> */}
                        <Card style={{ paddingTop:'1em', paddingBottom:'1em', paddingLeft:'2em', paddingRight:'2em', backgroundColor:'#FFC400' }}>
                            <Typography variant="h1" fontSize='1.4em'><strong>Join a Free<br/>Collaborative Session</strong></Typography>
                        </Card>
                    {/* </a> */}
                </Box>
                <Box className='sessionDescription'>
                    <strong>Join us for our collaborative sessions and become part of the rCollab Network!<br/>We offer four exciting types of sessions:</strong>
                    <ol>
                        <li><strong>Co-learning Sessions:</strong> Dive into collective knowledge-sharing and skill-building.</li>
                        <li><strong>Branding Sessions:</strong> Discover how to create and enhance your brand collaboratively.</li>
                        <li><strong>Protocoling Sessions:</strong> Learn to develop and implement innovative protocols.</li>
                        <li><strong>Co-founding Sessions:</strong> Explore opportunities to co-found and own your collaborative venture.</li>
                    </ol>
                </Box>
                
                <Box className='sessionDescription'
                // style={{ fontSize:'0.8em', width:'50%', maxWidth:'600px', color:"white", alignSelf:'center', marginBottom: '50px', textAlign:'left' }}>
                >
                    These sessions are open to anyone eager to learn and get involved in owning a radically innovative collaborative. Come, be a part of the movement and transform your ideas into reality with the rCollab Network!
                </Box>
            </Box>

            {/* <img className='howTheyWork' src="/how-collaboratives-work.webp"></img> */}
            <Box className="quoteContainer">
                <span className='quote'>&quot;Coming together is a beginning.<br/>Keeping together is progress.<br/>Working together is success.&quot;<br/><strong>Henry Ford</strong></span>
            </Box>
        
            
            <br/>
            <span className='sectionTitle'>FAQ</span>
            <br/>
            <Box display='grid' style={{ placeItems: 'center'}}>
            <Box className="faq">
                <span className="question">1. Why is this better than a normal business?</span>
                <span className="answer">
                    <p>The Collaborative model offers several advantages over traditional business structures:</p>
                    <p><b>Shared Motivation and Benefits:</b> By co-managing and co-owning the organization, participants share in the motivation of the potential and benefits (risks and responsibilities), which can make daunting business challenges more manageable and less stressful.</p>
                    <p><b>Increased Flexibility and Resilience:</b> Collaboratives, by nature, benefit from a diverse pool of ideas and skills, leading to more innovative solutions and a more resilient company model that can quickly adapt to changes or challenges.</p>
                    <p><b>Enhanced Support Network:</b> Each participant of a Collaborative benefits from the collective expertise and networks of their peers, which can accelerate problem-solving and provide significant competitive advantages.</p>
                    <p><b>Scalability:</b> By leveraging a turnkey franchise model, new collaborators can quickly set up their operations based on proven systems and processes, ensuring consistency in quality and service across the network.</p>
                </span>
                <br/>
                <span className="question">2. What makes it faster and easier to start this kind of organization?</span>
                <span className="answer">
                    <p>Starting a Collaborative organization is often faster and easier than launching a traditional business due to several key features inherent in the Collaborative Franchise:</p>
                    <p><b>Turnkey Operations:</b> Collaboratives typically receive a complete, ready-to-use model, including established processes, systems, and sometimes even client bases. This turnkey approach significantly reduces the time and effort required to go from concept to operation.</p>
                    <p><b>Pre-Established Networks:</b> By joining a Collaborative, new members gain instant access to a network of established relationships with suppliers, customers, and service providers. This eliminates much of the legwork involved in building partnerships and clientele from scratch.</p>
                    <p><b>Shared Knowledge and Resources:</b> New operators can tap into the existing network's collective knowledge and resources. This includes not only operational know-how but also shared services such as marketing, accounting, sales, social media, and IT support, which can be costly and time-consuming to develop independently.</p>
                    <p><b>Streamlined Decision-Making:</b> With a collaborative governance model, decision-making is more dynamic and efficient. The collective wisdom of the group helps in making informed decisions quickly, reducing the bureaucratic delays often seen in traditional corporate structures.</p>
                    <p><b>Mentorship and Support:</b> New collaborators receive guidance and support from more experienced members of the network, providing a mentorship advantage that can accelerate the learning curve and help avoid common pitfalls.</p>
                    <p><b>Reduced Financial Burden:</b> The shared investment model of Collaboratives means that the financial burden of starting and operating the business is distributed among all members. This can make it easier to secure financing and manage cash flow, particularly in the early stages of business.</p>
                </span>
                <br/>
                <span className="question">3. Are there specific industries or business types that benefit most from this model?</span>
                <span className="answer">
                    <p>The Collaborative is particularly well-suited to industries where cooperation and shared resources can enhance efficiency and innovation. These include:</p>
                    <p><b>Service Industries:</b> Such as cleaning, gardening, catering, or consulting, where scalability through a shared business model can be quickly achieved.</p>
                    <p><b>Tech Startups:</b> Where rapid innovation and agile development are crucial.</p>
                    <p><b>Local Retail:</b> Benefiting from shared branding and marketing strategies.</p>
                    <p><b>Creative Industries:</b> Including design, marketing, and content creation, where pooling creative talent and resources can lead to better outputs.</p>
                    <p>This model is adaptable and can be customized to fit various needs, making it versatile for a wide range of industry franchises.</p>
                </span>
                <br/>
                <span className="question">4. Can I exit the Collaborative, and if so, how?</span>
                <span className="answer">
                    <p>Exiting a Collaborative is an option that is built into the framework to ensure flexibility:</p> 
                    <p><b>Transfer of Ownership:</b> Collaborators can sell their rights to an existing or new collaborator, subject to the protocols of the founding documents.</p>
                    <p><b>Dissolution Procedures:</b> If a collaborator wishes to leave, specific protocols for dissolution or separation are outlined that protect both the individual's and the remaining Collaborator's interests.</p>
                    <p><b>Continuity Plans:</b> Measures are in place to ensure the business's continuity, maintaining service and operational standards during the transition.</p>
                </span>
                <br/>
                <span className="question">5. How does the Collaborative foster innovation and competitive advantage?</span>
                <span className="answer">
                    <p>The Collaborative model fosters innovation and competitive advantage through:</p>
                    <p>Diverse Perspectives: Bringing together diverse skill sets and perspectives that lead to innovative solutions and creative problem-solving.</p>
                    <p>Shared Knowledge: Continuous learning and sharing of best practices within the Collaborative and network enhance efficiency and effectiveness.</p>
                    <p>Resource Pooling: Access to shared resources, whether financial, knowledge, services, or technological, allows for more significant investment in research and development.</p>
                    <p>Rapid Adaptation: The network's collective intelligence enables quicker response to market changes and consumer demands, keeping the Collaborative relevant.</p>
                    <p>Symbiotic Relationships: Strong interdependencies create a robust ecosystem where each entity supports the others, enhancing stability and growth potential.</p>
                </span>
                </Box>
            </Box>
            <br/>
            <br/>
            <br/>
            <br/>
            <span className='sectionTitle'>CONTACT US</span>
            {/* <span className='benefitTitle'>Want to learn more? Reach out or join one of our regular Founders Calls.</span> */}
            <Box display='grid' style={{ placeItems: 'center', marginBottom: '50px'}}>
                <Box className="form">
                    <ContactForm/>
                </Box>
            </Box>
        </Box>
    )
}
