import { useState, useEffect } from 'react'
import { Box, InputAdornment, Menu, MenuItem, TextField } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import netlifyIdentity from 'netlify-identity-widget'
import { handleUser, getUserName, getUserObject } from './GlobalFunctions';
import { APP_VERSION } from './config';
import { SearchRounded } from '@mui/icons-material';


export default function Header() {
    const [ path, setPath ] = useState(null)
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);
    const [ loginLabel, setLoginLabel ] = useState( false )
    const [ userName, setUserName ] = useState( "" )
    const [ user, setUser ] = useState( null )
    const [ widgetOpen, setWidgetOpen ] = useState( 'signup' )

    const theSite = import.meta.env.VITE_SITE;
    const appVerNum = APP_VERSION

    const siteProp = (theSite == 'rCollabs') ? 'rCollabs' : 'rProtocols'

    useEffect(() => {
        if (getUserObject !== undefined ){
            netlifyIdentity.init({
                //container: '#netlify-modal', // defaults to document.body
                locale: 'en' // defaults to 'en'
            });
            
            netlifyIdentity.on('init', newUser => {
                handleUser(newUser)
            });
            const netUser = netlifyIdentity.currentUser()

            // console.log('netlifyObject', netUser)

            if (netUser) {
                handleUser(netUser)
                setUser(netUser)
                setUserName(getUserName())
            }
        }
    },[])

    // useEffect(() => {

    //     console.log("SET USER NAME", user)

    //     // if (Object.keys(props).length) {
    //     if (user !== undefined ){
    //         if (user !== "") {
    //             console.log("USER", user)
    //             setUserName(user.user_metadata.full_name)
    //         }
    //     }
    //     // }
    // }, [ user ])

    useEffect(() => {
        console.log("EFFECT USER", user)
        setLoginLabel((user === null) ? "Login" : "Logout")
    }, [ user ])


    const navigate = useNavigate()
    // const user = netlifyIdentity.currentUser();


    useEffect(() => {
        if (path) navigate(path, {replace: false })
    }, [ path, navigate ])

    // open menu
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    async function handleClose(url){
        if (url === '/Login') {
            console.log('LOGIN/SIGNUP')
            netlifyIdentity.open(widgetOpen);
            netlifyIdentity.on('login', netUser => {
                console.log('login', netUser)
                handleUser(netUser)
                setUser(netUser)
                setUserName(netUser.user_metadata.full_name)
                setWidgetOpen('login')
            });

            
            netlifyIdentity.on('error', err => console.error('Error', err));
            netlifyIdentity.on('open', () => console.log('Widget opened'));
            netlifyIdentity.on('close', () => {
                console.log('Widget closed')
                // if (user === null) {
                //     handleUser(netUser)
                // }
            });
            
        } else if (url === '/Logout') {
            netlifyIdentity.logout();
            netlifyIdentity.on('logout', () => {
                console.log('Logged out')
                setUserName("")
                setUser( null )
                handleUser( null )
            });
            // setUserLoggedIn("")

        } else if (url === 'rprotocols.org') {
            window.open(
                "https://rprotocols.org",
                '_blank'
            )
        } else {
            setAnchorEl(null);
            setPath(url)
        }
        setAnchorEl(null);
    }

    console.log("USER", user)

    

    // console.log("USER NAME", userName)
    const searchTerm = 'Life Needs'

    return (
        <Box className='header'>
            <Box display='flex' pl='20px' flexDirection='row' >
                <a href='/en/home'><img src="/rManIcon.svg" height="30px" style={{ margin:'10px'}}></img></a>
                <Box display='flex' pl='10px' flexDirection='row' 
                    style={{ fontSize:'1rem', fontWeight:600, color:'white', marginTop:'6px', marginLeft:'-10px'}}>
                    BETA <Box style={{ fontSize:'0.8em', fontWeight:400, color:'white', marginTop:'2px', marginLeft:'5px' }}>({ appVerNum })</Box>
                </Box>
            </Box>
            {/* <Box alignSelf='center' width="94%" maxWidth='340px' marginTop='-4px' backgroundColor="black">
                <TextField size='small' className='formField' width='90%' maxWidth='300px' 
                    name={ "search" } value={ searchTerm } autoComplete='off'
                    placeholder="Find needs and protocols..."
                    InputProps={{ backgroundColor:'rgba(255, 255, 255, 0.9)', startAdornment: (
                        <InputAdornment position="start">
                            <SearchRounded />
                        </InputAdornment>
                    )}}
                    // onChange={ (e) => { handleSearchTerm(e.target.value) } }
                    // onFocus={ e => { handleSearchTerm(e.target.value) }}
                    />
            </Box> */}
            <Box display='flex' onClick={handleClick} style={{ justifySelf: 'flex-end', cursor:'pointer' }} mt='12px' mr='20px' height='47px' alignContent='center'>
                <Box style={{ fontSize:"0.9em" }} color={'white'} mr={1.5} mt='5px' >{ userName }</Box>
                <MenuIcon style={{ color:"white" }}/>
            </Box>
            <Box style={{ marginRight:'20px'}}>
                <Menu id="hamburger" anchorEl={anchorEl} open={open} onClose={ handleClose }>
                    <MenuItem onClick={() => { handleClose('/') }}>Home</MenuItem>
                    
                    {/* <MenuItem onClick={() => { handleClose(`/${lang}/studio`) }}>Studio</MenuItem> */}
                    {/* { (siteProp == 'rProtocols') &&
                       <MenuItem onClick={() => { handleClose('/en/coop2') }}>COOP² Specs</MenuItem>
                    } */}
                    { (siteProp == 'rCollabs') &&
                        <MenuItem onClick={() => { handleClose('rprotocols.org') }}>rProtocols.org</MenuItem>
                    }
                    <MenuItem onClick={() => { handleClose('/en/explore-protocols') }} value>Explore Protocols</MenuItem>
                    {/* <MenuItem onClick={() => { handleClose('/rcollabs') }}>rCollabs</MenuItem> */}
                    <MenuItem onClick={() => { handleClose('/en/about-us') }} value>About Us</MenuItem>
                    <MenuItem onClick={() => { handleClose('/en/privacy-protocols') }} value>Privacy Protocols</MenuItem>
                    <hr/>
                    { (siteProp == 'rProtocols') &&
                        <MenuItem onClick={() => { handleClose('/' + loginLabel ) }} value>{ loginLabel }</MenuItem>
                    }
                </Menu>
            </Box>
        </Box>
    )
}