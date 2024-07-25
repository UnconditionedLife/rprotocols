import { useState } from 'react';
import { Box } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';


export default function Root(props) {
    // const { handleSwitchPublicPage } = props
    // const [ user, setUser ] = useState(  )

    // function handleUser(newUser) {

    //     console.log("SET USER", newUser)
    //     if (newUser !== user) setUser(newUser)
    // } 

    
    return (
        <Box className='siteBodyContainer'>
            <Header />
                <Box paddingTop='50px'>
                    <Outlet />
                </Box>
            <Footer/>
        </Box>
    )
}
