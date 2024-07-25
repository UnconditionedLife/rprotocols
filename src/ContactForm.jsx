import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', tellMore: '', city: '', country: '' });

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
        <div width={ videoW }>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc5p8aQQyk40Eb-DLb-E-oF2rcEdgsYCGin9TkFPU8G5uyFrw/viewform?embedded=true" width={ videoW } height="1261" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </div>     
    );
}


{/* <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
// <input type="hidden" name="form-name" value="contact" />
<Box m={1.5}>
    <TextField style={{ width:"300px" }} label="Name" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
</Box>
<Box m={1.5}>
    <TextField style={{ width:"300px" }} label="Email" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
</Box>
<Box m={1.5}>
    <TextField style={{ width:"300px" }} label="City" type="city" id="city" name="city" value={formData.city} onChange={handleChange} required />
</Box>
<Box m={1.5}>
    <TextField style={{ width:"300px" }} label="Country" type="country" id="country" name="country" value={formData.country} onChange={handleChange} required />
</Box>
<Box m={1.5} mb={2}>
    <TextField style={{ width:"300px" }} label="Tell Us More" multiline type="tellMore" id="tellMore" name="tellMore" value={formData.tellMore} onChange={handleChange} />
</Box>
<Button type="submit"  m={1}>Send</Button>
</form> */}