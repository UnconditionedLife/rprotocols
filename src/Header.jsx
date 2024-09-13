import { useState, useEffect } from 'react'
import { Box, Menu, MenuItem } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import netlifyIdentity from 'netlify-identity-widget'
import { handleUser, getUserName, getUserObject } from './GlobalFunctions';
import { APP_VERSION } from './config';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';


export default function Header() {
    const { lang, area, action, value1, value2 } = useParams();
    const [ path, setPath ] = useState(null)
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);
    const [ loginLabel, setLoginLabel ] = useState( false )
    const [ userName, setUserName ] = useState( "" )
    const [ user, setUser ] = useState( null )
    const [ widgetOpen, setWidgetOpen ] = useState( 'signup' )
    const theSite = import.meta.env.VITE_SITE;
    const appVerNum = APP_VERSION
    const { t } = useTranslation();
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

    useEffect(() => {
        // console.log("EFFECT USER", user)
        setLoginLabel((user === null) ? 'header.login' : 'header.logout')
    }, [ user ])

    // open menu
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    async function handleClose(url){
        if (url === '/Login') {
            // console.log('LOGIN/SIGNUP')
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
                // console.log('Widget closed')
                // if (user === null) {
                //     handleUser(netUser)
                // }
            });
            
        } else if (url === '/Logout') {
            netlifyIdentity.logout();
            netlifyIdentity.on('logout', () => {
                // console.log('Logged out')
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
            setPath(url)
        }
        setAnchorEl(null);
    }

    function handleLang(newLang) {
        // redirect url to new lang
        const newPath = [ newLang, area || '', action || '', value1 || '', value2 || '' ]
          .filter(Boolean) // Remove empty strings or undefined
          .join('/');      // Join parts with "/"
        handleClose(newPath)
    }

    // NAVIGATE TO OTHER PAGES
    const navigate = useNavigate()
    useEffect(() => {
        if (path) navigate(path, {replace: false })
    }, [ path ])

    // console.log("USER", user)
    // console.log("USER NAME", userName)

    if (lang === undefined) return null

    return (
        <Box className='header'>
            <Box display='flex' pl='20px' flexDirection='row' >
                <a href={`/${lang}/home`}><img src="/rManIcon.svg" height="30px" style={{ margin:'10px'}} /></a>
                <Box display='flex' pl='10px' flexDirection='row' 
                    style={{ fontSize:'1rem', fontWeight:600, color:'white', marginTop:'6px', marginLeft:'-10px'}}>
                    BETA <Box style={{ fontSize:'0.8em', fontWeight:400, color:'white', marginTop:'2px', marginLeft:'5px' }}>({ appVerNum })</Box>
                </Box>
            </Box>

            <Box display='flex'  style={{ justifySelf: 'flex-end', cursor:'pointer' }} mt='12px' mr='20px' height='47px' alignContent='center'>
                <Box style={{ fontSize:"0.9em" }} color={'white'} mr={1.5} mt='6px' >{ userName }</Box>
                <LanguageSelector currentLang={ lang } handleLang={ handleLang } />
                <MenuIcon onClick={ handleClick } style={{ marginTop:'3px', color:"white" }}/>
            </Box>

            <Box style={{ marginRight:'20px'}}>
                <Menu id="hamburger" anchorEl={anchorEl} open={open} onClose={ handleClose }>
                    <MenuItem onClick={() => { handleClose(`/${lang}/home`) }}>{ t('home.diamondTitle') }</MenuItem>
                    
                    {/* <MenuItem onClick={() => { handleClose(`/${lang}/studio`) }}>Studio</MenuItem> */}
                    {/* <MenuItem onClick={() => { handleClose('/en/coop2') }}>COOP² Specs</MenuItem> */}
                    
                    <MenuItem onClick={() => { handleClose(`/${lang}/explore-protocols`) }} value>{ t('explore.sectionHead') }</MenuItem>
                    {/* <MenuItem onClick={() => { handleClose('/rcollabs') }}>rCollabs</MenuItem> */}
                    <MenuItem onClick={() => { handleClose(`/${lang}/about-us`) }} value>{ t('about.sectionHead') }</MenuItem>
                    <MenuItem onClick={() => { handleClose(`/${lang}/privacy-protocols`) }} value>{ t('privacy.sectionHead') }</MenuItem>
                    
                    <hr/>
                    
                    <MenuItem onClick={() => { handleClose('/' + t(loginLabel) ) }} value>{ t(loginLabel) }</MenuItem>
                </Menu>
            </Box>
        </Box>
    )
}