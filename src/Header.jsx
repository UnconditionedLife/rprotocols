import { useState, useEffect } from 'react'
import { Box, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import netlifyIdentity from 'netlify-identity-widget'
import { handleUser, getUserName } from './GlobalFunctions';


export default function Header(props) {
    // const { user, handleUser } = props;
    const [ path, setPath ] = useState(null)
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);
    const [ showLogin, setShowLogin ] = useState( false )
    const [ userName, setUserName ] = useState( "" )
    const [ user, setUser ] = useState( "" )
    const [ widgetOpen, setWidgetOpen ] = useState( 'signup' )

    const theSite = import.meta.env.VITE_SITE;

    // const user = globalVars.user
    // const handleUser = handleUser

    const siteProp = (theSite == 'rCollabs') ? 'rCollabs' : 'rProtocols'

    useEffect(() => {
        if (user !== undefined ){
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


    const navigate = useNavigate()
    // const user = netlifyIdentity.currentUser();


    useEffect(() => {
        if (path) navigate(path, {replace: true })
    }, [ path ])

    // open menu
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    async function handleClose(url){
        if (url === '/Login') {
            console.log('SIGNUP')
            netlifyIdentity.open(widgetOpen);
            netlifyIdentity.on('login', user => {
                // console.log('login', user)
                handleUser(user)
                setWidgetOpen('login')
            });

            
            netlifyIdentity.on('error', err => console.error('Error', err));
            netlifyIdentity.on('open', () => console.log('Widget opened'));
            netlifyIdentity.on('close', () => {
                // console.log('Widget closed')
                if (user) {
                    handleUser(user)
                }
            });
            
        } else if (url === '/Logout') {
            netlifyIdentity.logout();
            netlifyIdentity.on('logout', () => {
                // console.log('Logged out')
                setUserName("")
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

    const loginLabel = (user) ? "Logout" : "Login"

    // console.log("USER NAME", userName)

    return (
        <Box className='header'>
            <Box pl='20px' display='flex' flexDirection='row' >
                    <a href='/'><img src="/RadicalPerson.svg" height="30px" style={{ margin:'10px'}}></img></a>
                    <Box style={{ fontSize:'.8em', color:'white', marginTop:'8px'}}>BETA</Box>
            </Box>
            <Box display='flex' onClick={handleClick} style={{ justifySelf: 'flex-end', cursor:'pointer' }} mt='12px' mr='20px' height='47px' alignContent='center'>
                <Box style={{ fontSize:"0.9em" }} color={'white'} mr={1.5} mt='5px' >{ userName }</Box>
                <MenuIcon style={{ color:"white" }}/>
            </Box>
            <Box style={{ marginRight:'20px'}}>
                
                <Menu id="hamburger" anchorEl={anchorEl} open={open} onClose={ handleClose }>

                    <MenuItem onClick={() => { handleClose('/') }}>Home</MenuItem>
                    { (siteProp == 'rProtocols') &&
                       <MenuItem onClick={() => { handleClose('/studio') }}>Studio</MenuItem>
                    }
                    { (siteProp == 'rProtocols') &&
                       <MenuItem onClick={() => { handleClose('/coop2') }}>COOP² Specs</MenuItem>
                    }
                    { (siteProp == 'rCollabs') &&
                       <MenuItem onClick={() => { handleClose('/sessions') }}>Join Sessions</MenuItem>
                    }
                    { (siteProp == 'rCollabs') &&
                        <MenuItem onClick={() => { handleClose('rprotocols.org') }}>rProtocols.org</MenuItem>
                    }
                    {/* <MenuItem onClick={() => { handleClose('/rcollabs') }}>rCollabs</MenuItem> */}
                    <MenuItem onClick={() => { handleClose('/about') }} value>About</MenuItem>
                    <hr/>
                    { (siteProp == 'rProtocols') &&
                        <MenuItem onClick={() => { handleClose('/' + loginLabel ) }} value>{ loginLabel }</MenuItem>
                    }
                </Menu>
            </Box>
        </Box>
    )

}