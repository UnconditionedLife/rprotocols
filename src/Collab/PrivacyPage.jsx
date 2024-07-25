import { useState } from 'react';
import { Box, Card, Button, TextField, MenuItem, Typography } from '@mui/material'
import Header from '../Header';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';
import FeaturedSection from '../FeaturedSection';
import ContactForm from '../ContactForm';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function PrivacyPage(props) {
    const { handleSwitchPublicPage } = props

    const screenW = window.screen.width
    const videoW = ( screenW > 700) ? 700 : 375
    const ratio = 0.5625
    const videoH = videoW * ratio
    
    return (
        <Box className='plantBackground'>    
            <h1 className='headline'>Our Privacy Protocols</h1>
            <span className='headline' style={{ marginTop:'-1.5em'}}><img className='headlineLogo'src="/rCollabsLogo-blackBg.svg" alt='rCollaboratives Logo'></img></span>

            <Box className="quoteContainer">
                <span className='quote'>&quot;Mutual respect is so important because as soon as it disappears in relations between you and the next person, there's trouble.&quot;<br/><strong>Dizzy Gillespie​</strong></span>
            </Box>
            
            <Box style={{ display:'flex', flexDirection: 'column', justifyContent:'center', alignContent: 'center', marginTop:'0' }}>
                
                <Box className='sessionDescription'>
                    <p className='subheadline' style={{ marginTop:'-35px', marginBottom:'12px' }}>Introduction</p>
                    <p>We are committed to protecting and respecting your privacy. This Privacy Protocols page outlines how we collect, use, share, and protect your personal information when you use our services.</p>
                </Box>
                <div style={{ width:'500px', textAlign:'left', alignSelf: 'center', color:'white' }}>
                    <h1>Privacy Protocols (ver. 1.0) <OpenInNewIcon/> </h1>

                    <h2>1. Introduction Protocol (ver. 1.0) <OpenInNewIcon/></h2>
                    <p>We are committed to protecting and respecting your privacy. Our approach to privacy is centered around minimizing the information we collect and ensuring that it is only used for the purposes it was provided. We are transparent about our practices and aim to empower our users to control their personal data. This protocol outlines how we collect, use, share, and protect your personal information when you use our services.</p>

                    <h2>2. Information Collection Protocols </h2>
                    
                    <h3>2.1 User-Provided Information Protocol (ver. 1.0) <OpenInNewIcon/></h3>
                    <p>We only ask for information that is necessary to provide and improve our community services. This includes:</p>
                    <ul>
                        <li><strong>Account Information:</strong> Basic details like your name, username, password, email, phone number, and possible profile image to set up and manage your account.</li>
                        <li><strong>User-Generated Content:</strong> Content you create such as protocols, comments, and images which help personalize your experience.</li>
                        <li><strong>Messages:</strong> Content of messages sent and received, ensuring secure communication.</li>
                        <li><strong>Payment Information:</strong> Details necessary for processing transactions, securely handled and stored.</li>
                        <li><strong>Contacts:</strong> With your permission, we access your contacts to enhance your social experience on our platform.</li>
                    </ul>
                    
                    <h3>2.2 Third-Party Information Collection Protocol (ver. 1.0) <OpenInNewIcon/></h3>
                    <p>We may receive information about you from:</p>
                    <ul>
                        <li><strong>Third-Party Services:</strong> When you link your account with services like Facebook or Google.</li>
                        <li><strong>Affiliates:</strong> Information about your activities on affiliated platforms to enhance your user experience.</li>
                        <li><strong>Public Sources:</strong> Publicly available information to verify your identity and prevent fraud.</li>
                    </ul>
                    
                    <h3>2.3 Automated Information Collection Protocol (ver. 1.0) <OpenInNewIcon/></h3>
                    <p>Automatically collected data helps us understand and improve user interactions:</p>
                    <ul>
                        <li><strong>Usage Information:</strong> Details about your interactions with our platform, such as content viewed and searches performed.</li>
                        <li><strong>Device Information:</strong> Information about your device, including IP address, device identifiers, and operating system.</li>
                        <li><strong>Location Data:</strong> Approximate location data based on your IP address and SIM card.</li>
                        <li><strong>Cookies and Similar Technologies:</strong> Used to track preferences, maintain session states, and gather analytics.</li>
                    </ul>
                    
                    <h2>3. Information Use Protocol (ver. 1.0) <OpenInNewIcon/></h2>
                    <p>We use the information collected to:</p>
                    <ul>
                        <li><strong>Service Delivery:</strong> Ensure our services function correctly and meet your needs.</li>
                        <li><strong>Personalization:</strong> Tailor content and advertisements to your interests.</li>
                        <li><strong>Communication:</strong> Send updates, offers, and important notifications.</li>
                        <li><strong>Security:</strong> Protect against fraud and abuse, and ensure the safety of our platform.</li>
                    </ul>
                    
                    <h2>4. Information Sharing Protocols</h2>
                    
                    <h3>4.1 Service Providers and Partners Protocol (ver. 1.0) <OpenInNewIcon/></h3>
                    <p>We do not sell your information. We only share it with:</p>
                    <ul>
                        <li><strong>Service Providers:</strong> Third parties who assist us in payment processing, customer support, and research under strict confidentiality agreements.</li>
                        <li><strong>Business Partners:</strong> Collaborators who help enhance our services, all bound by our privacy standards.</li>
                    </ul>
                    
                    <h3>4.2 Corporate Group Sharing Protocol (ver. 1.0) <OpenInNewIcon/></h3>
                    <p>Information may be shared within our corporate family to support core services and enhance your experience, always under strict privacy controls.</p>
                    
                    <h3>4.3 Legal Compliance Protocol (ver. 1.0) <OpenInNewIcon/></h3>
                    <p>We comply with legal requirements and may share information when required by law or to protect our rights and safety.</p>
                    
                    <h3>4.4 User Consent Protocol (ver. 1.0) <OpenInNewIcon/></h3>
                    <p>We will share your information with third parties only when you provide explicit consent for specific purposes.</p>
                    
                    <h2>5. User Rights Protocols</h2>
                    
                    <h3>5.1 Access and Correction Protocol (ver. 1.0) <OpenInNewIcon/></h3>
                    <p>You have the right to access and correct your personal data. We provide tools and support to help you manage this information easily.</p>
                    
                    <h3>5.2 Data Deletion Protocol (ver. 1.0) <OpenInNewIcon/></h3>
                    <p>You can request the deletion of your personal data at any time. We ensure your data is removed promptly, respecting your right to privacy.</p>
                    
                    <h3>5.3 Opt-Out Protocol (ver. 1.0) <OpenInNewIcon/></h3>
                    <p>We respect your choices. You can opt-out of targeted advertising and marketing communications through your account settings.</p>
                    
                    <h2>6. Data Security and Retention Protocols</h2>
                    
                    <h3>6.1 Security Measures Protocol (ver. 1.0) <OpenInNewIcon/></h3>
                    <p>We implement security measures to protect your data from unauthorized access, alteration, and disclosure.</p>
                    
                    <h3>6.2 Data Retention Protocol (ver. 1.0) <OpenInNewIcon/></h3>
                    <p>We retain your information only as long as necessary to provide our services and comply with legal obligations. When data is no longer needed, we ensure it is securely deleted.</p>
                    
                    <h2>7. Updates to Privacy Protocols (ver. 1.0) <OpenInNewIcon/></h2>
                    <p>We keep our privacy practices up-to-date. Any changes will be communicated through notifications and updated documents to ensure you are always informed.</p>
                    
                    <h2>8. Community-Driven Protocol Updates (ver. 1.0) <OpenInNewIcon/></h2>
                    <p>Our privacy protocols are open and continuously updated as part of the rProtocols platform. We regularly review and adopt improvements from the broader community to enhance our privacy practices.</p>
                    
                    <h2>9. Contact Information Protocol (ver. 1.0) <OpenInNewIcon/></h2>
                    <p>For any questions or concerns about our privacy practices, you can reach out to us at privacy@radical.world. We are here to help and ensure your privacy is respected.</p>
                </div>
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
