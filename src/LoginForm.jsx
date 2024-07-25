import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Container, Box, Typography } from '@mui/material';
// import PublicSuffixList from 'publicsuffixlist';
import { dbSaveUserAsync } from './Database';
import dayjs from 'dayjs';

export default function LoginForm() {
    const [open, setOpen] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    //   const psl = new PublicSuffixList();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const domain = email.split("@")[1]
        // const tldArr = domain.split(".")
        // const tld = tldArr[tldArr.length - 1]
        // const validTLD = psl.validateTLD(tld)
        const validDomain = validateDomain(domain)

console.log('VALIDATIONS', validDomain)

    if (validDomain) return re.test(String(email).toLowerCase())
        return false
    };

    const validateDomain = (domain) => {
        const re = /^(?!:\/\/)([a-zA-Z0-9-_]{1,63}\.)*[a-zA-Z]{2,6}$/;
        return re.test(domain);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEmailError('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
        setEmailError('Invalid email address');
        return;
        }
        console.log('Name:', name);
        console.log('Email:', email);

        const now = dayjs().format('YYYY-MM-DDTHH:mm');

        const newUser = {
            name: name,
            email: email,
            userId: email,
            emailValidated: false,
            registrationDate: now
        }
        dbSaveUserAsync(newUser)

        // Here you can add the code to handle form submission, such as sending data to your backend.
        handleClose();
    };

    return (
        <Container maxWidth="sm">
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8,
            }}
        >
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Open Sign Up / Login Form
            </Button> */}
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Sign Up / Login</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!emailError}
                    helperText={emailError}
                />
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button type="submit" color="primary" variant='contained'>
                    Submit
                    </Button>
                </DialogActions>
                </Box>
            </DialogContent>
            </Dialog>
        </Box>
        </Container>
        );
    };
