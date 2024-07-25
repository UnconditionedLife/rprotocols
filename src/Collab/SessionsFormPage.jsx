import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useSearchParams } from "react-router-dom";

export default function SessoinsForm(props) {
    const { session } = props
    let [searchParams, setSearchParams] = useSearchParams();
    const [formData, setFormData] = useState({ name: '', email: '', session: session, tellMore: '', city: '', country: '', comments:'', brand:'', development:'', cofounders: '' });
    const [ sessionId, setSessionId ] = useState( searchParams.get("session") )

    console.log('session', searchParams.get("session"))

    const screenW = window.screen.width
    const videoW = ( screenW > 700) ? 700 : 325

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can also integrate any frontend validation or handling logic before sending
        console.log(formData); // This is just to check the form data in console, you might want to send this data somewhere
        const form = e.target;
        const data = new FormData(form);
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data).toString()
        })
        .then(() => alert('Form successfully submitted'))
        .catch((error) => alert(error));
    };

    return (
        
            <Box className='plantBackground'>
                <Box display='flex' justifyContent='center' alignItems='center' paddingTop='60px'>
        <Box style={{ display:'flex', flexDirection:'column', color: 'black', backgroundColor: 'white', 
            paddingTop:'30px',paddingLeft:'10px', marginBottom:'100px',
            paddingRight:'10px', paddingBottom:'30px', borderRadius:'20px' }}>
            { (sessionId == '1') && 
                // <Box width='80%' alignSelf='center'>
                //     <p className='sectionTitle' style={{ color: 'black' }}>Co-learning Sessions Sign Up</p>
                //     <span className='benefitTitle'>Congratulations on choosing the Co-learning Sessions! You're on your way to mastering the Collab basics through SOLEs - Self Oriented Learning Experiences. We will contact you soon with more details.</span>
                // </Box>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeceORG67Jm1Uxzv58NhS0nFZ-86NC7pMArmwyHfmwdXcid_A/viewform?embedded=true" width={ videoW } height="1268" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            }
            { (sessionId == '2') && 
                // <Box width='80%' alignSelf='center'>
                //     <p className='sectionTitle' style={{ color: 'black' }}>Branding Sessions Sign Up</p>
                //     <span className='benefitTitle'>Congratulations on selecting the Branding Sessions! Get ready to explore and partner with peers to start your journey as a Collab owner. We will contact you soon with more information.</span>
                // </Box>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdFQMOWs8GnHcCrLwhoPBv9dXgPONKrR2dZgh5L4jm3R9xvkg/viewform?embedded=true" width={ videoW } height="1443" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            }
            { (sessionId == '3') && 
                // <Box width='80%' alignSelf='center'>
                //     <p className='sectionTitle' style={{ color: 'black' }}>Protocol Sessions Sign Up</p>
                //     <span className='benefitTitle'>Congratulations on enrolling in the Protocol Development Sessions! Prepare to collaborate and innovate as we build the rProtocol platform together. We will reach out to you shortly with further details.</span>
                // </Box>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeDQUbAhIjH97sqSJ1quxaLSd93pHwEtjmXNaumEWq7YvBklA/viewform?embedded=true" width={ videoW } height="1372" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            }
            { (sessionId == '4') && 
                // <Box width='80%' alignSelf='center'>
                //     <p className='sectionTitle' style={{ color: 'black' }}>Co-founding Sessions Sign Up</p>
                //     <span className='benefitTitle'>Congratulations on joining the Co-founding Sessions! You're about to embark on an exciting journey to create and build your Collaborative. We will be in touch soon with more information.</span>
                // </Box>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSenW9PxiGEwpg64BKCsnxJH9iAOLnzG4jr5b8oOIjlZLcjvDQ/viewform?embedded=true" width={ videoW } height="1372" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            }

        </Box>
        </Box>
        </Box>
  );
}

{/* <form name="sessions" method="POST" data-netlify="true" onSubmit={ handleSubmit }>
<input type="hidden" name="form-name" value="sessions" />
<Box m={1.5} mt={4}>
    <TextField style={{ width:"300px" }} label="Name" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
</Box>
<Box m={1.5}>
    <TextField style={{ width:"300px" }} label="Email" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
</Box>
<Box m={1.5}>
    <TextField style={{ width:"300px" }} label="City" type="city" id="city" name="city" value={formData.city} onChange={handleChange} required />
</Box>
<Box m={1.5}>
    <TextField style={{ width:"300px" }} label="Country" type="country" id="country" name="country" value={formData.city} onChange={handleChange} required />
</Box>

{ (sessionId == '2') && 
    <Box m={1.5} mb={2}>
        <TextField style={{ width:"300px" }} label="Describe Brand or Industry Interest" multiline type="brand" id="brand" name="brand" value={formData.brand} onChange={handleChange} />
    </Box>
}

{ (sessionId == '3') && 
    <Box m={1.5} mb={2}>
        <TextField style={{ width:"300px" }} label="Describe Development Experience" multiline type="development" id="development" name="development" value={formData.development} onChange={handleChange} />
    </Box>
}

{ (sessionId == '4') && 
    <Box m={1.5} mb={2}>
        <TextField style={{ width:"300px" }} label="Number of Co-founders" multiline type="cofounders" id="cofounders" name="cofounders" value={formData.cofounders} onChange={handleChange} />
    </Box>
}

<Box m={1.5} mb={2}>
    <TextField style={{ width:"300px" }} label="Tell Us More" multiline type="tellMore" id="tellMore" name="tellMore" value={formData.brand} onChange={handleChange} />
</Box>
<Button type="submit"  m={1}>Send</Button>
</form> */}
