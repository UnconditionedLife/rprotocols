import { Fragment } from 'react';
import { Box } from '@mui/material'
import Quote from '../Library/Quote';

export default function AboutUs({ lang }) {

    return (
        <Fragment>
            <h1 className='headline'>About Us</h1>
            <span className='headline' style={{ marginTop:'-2.3em', marginBottom:"-20px"}}><img className='headlineLogo'src="/rCollabsLogo-BlackBg.svg" alt='rCollaboratives Logo'></img></span>

            <Quote quote="Alone we can do so little; together we can do so much." author="Helen Keller"/>
            
            <Box style={{ display:'flex', flexDirection: 'column', justifyContent:'center', alignContent: 'center', marginTop:'0' }}>
                
                <Box className='sessionDescription'>
                    {/* <p className='subheadline' style={{ marginTop:'-35px', marginBottom:'12px' }}>What are Collaboratives and rCollabs?</p> */}
                    <h4 style={{ marginTop:'-35px', marginBottom:'12px', fontSize:"1.6rem" }}>About Us:</h4> 
                    
                    <p className="darkTextShadow">At rCollabs, we are redefining what it means to work and thrive together. Our vision is rooted in the belief that true economic resilience and sustainability come from collaboration, transparency, and shared ownership.</p>
                    <p className="darkTextShadow">We are not just creating businesses; we are fostering a new way of thinking about and practicing collaborative economics—one that places people and communities at the heart of the process. Central to this mission is <b>rProtocols</b>, a non-profit project within rCollabs that develops open-source protocols designed to replace traditional practices, policies, and agreements.</p> 
                    <p className="darkTextShadow">By bringing together diverse groups of individuals and organizations, rCollabs aims to build a global network of interdependent collaboratives that empower everyone involved. Whether you are a founder, funder, or participant, our platform offers the tools and support needed to co-create ventures that serve both individual and collective needs, paving the way for a more inclusive and equitable world.</p>
                    
                    <h4 style={{ marginTop:'40px', marginBottom:'12px', fontSize:"1.6rem" }}>What are Collaboratives?</h4> 
                    <p className="darkTextShadow">Collaboratives are innovative, cooperative organizations designed to operate outside traditional corporate framework. They emphasize collective ownership, self-management, and peer-to-peer collaboration.</p> 
                    <p className="darkTextShadow">rCollabs takes this concept further by creating a network of these collaboratives, integrating advanced technologies and open-source protocols to foster a circular economy.</p>
                    <p className="darkTextShadow">In rCollabs, community funding flows through peer participants, driving operational excellence and magnifying impact within an interdependent ecosystem.</p> 
                    <p className="darkTextShadow">Our goal is to empower individuals to co-create and co-manage ventures, fostering a resilient economic structure that adapts and thrives across diverse service and product areas.</p>

                    <h4 style={{ marginTop:'40px', marginBottom:'12px', fontSize:"1.6rem" }}>Who's Behind rCollabs?</h4>
                    <p className="darkTextShadow">rCollabs is powered by a dedicated team of innovators, entrepreneurs, and community leaders who are passionate about transforming the economic landscape.</p> 
                    <p className="darkTextShadow">Our founders bring a wealth of experience in cooperative business models, digital innovation, and social entrepreneurship. They are united by a vision of a more inclusive and equitable economy, where every participant has a stake in the success and sustainability of the collective.</p>
                    <p className="darkTextShadow">In addition to our core team, rCollabs is supported by the global <b>Radical World</b> and <b>Integrative Law</b> communities. These communities are composed of thought leaders, activists, and legal professionals who are pioneering new ways of thinking about and practicing law and economics. They advocate for systems that prioritize human well-being, social justice, and ecological sustainability. Their insights and expertise play a crucial role in shaping the principles and practices of rCollabs.</p>
                    <p className="darkTextShadow">Together, this diverse coalition of change-makers is committed to providing the tools, resources, and support needed to launch and grow successful collaboratives within the rCollabs network. By leveraging the collective knowledge and experience of our global community, we are building a resilient and adaptable economic ecosystem that champions transparency, fairness, and mutual benefit.</p>

                    <h4 style={{ marginTop:'40px', marginBottom:'12px', fontSize:"1.6rem" }}>Envisioned Impact</h4>
                    <p className="darkTextShadow">At rCollabs, we envision a profound impact on the way economic activity is conducted and experienced globally. Our aim is to revolutionize traditional economic models by fostering a network of collaboratives that operate with transparency, fairness, and mutual benefit at their core.</p> 
                    <p className="darkTextShadow">We believe that by empowering individuals and communities to co-create and co-manage ventures, we can catalyze a more inclusive and equitable economy.</p>
                    <p className="darkTextShadow">Our impact extends beyond economic metrics; it touches lives and transforms communities. By leveraging technology, open-source protocols, and community-driven initiatives, we envision an interconnected economic ecosystem that is resilient and adaptable. This ecosystem will support diverse needs and aspirations, ensuring that value is created and shared equitably among all participants.</p>
                    <p className="darkTextShadow">We see a future where everyone has the opportunity to participate in and benefit from a thriving, collaborative economy. Our work aims to pave the way for a world where economic empowerment and social equity are the foundation of our collective efforts.</p> 
                    <p className="darkTextShadow">Through our initiatives, we aspire to create lasting change that fosters social justice, ecological sustainability, and human well-being, driving forward the vision of a Radical World.</p>

                    <h4 style={{ marginTop:'40px', marginBottom:'12px', fontSize:"1.6rem" }}>Join Us</h4>
                    <p>We invite you to explore the possibilities within the rCollabs network. Whether you are looking to start your own collaborative, support community-driven ventures, or simply learn more about our innovative approach, there is a place for you in our ecosystem. Together, we can build a future where economic empowerment and social equity are at the forefront of our collective efforts.</p>
                </Box>
            </Box>  
        </Fragment>
    )
}
