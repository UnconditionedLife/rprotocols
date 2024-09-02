import { Fragment } from 'react';
import { Box } from '@mui/material'
import Quote from '../Library/Quote';
import { useTranslation } from 'react-i18next';

export default function AboutUs() {
    const { t } = useTranslation();

    return (
        <Fragment>
            <h1 className='headline'>{ t('about.sectionHead') }</h1>
            <span className='headline' style={{ marginTop:'-2em', marginBottom:"-20px"}}><img className='headlineLogo'src="/rCollabsLogo-BlackBg.svg" alt='rCollaboratives Logo'></img></span>

            <Quote quote={ t('about.kellerQuote') } author={ t('about.kellerAuthor') }/>
            
            <Box style={{ display:'flex', flexDirection: 'column', justifyContent:'center', alignContent: 'center', marginTop:'0', marginBottom:"50px" }}>
                
                <Box className='sessionDescription'>
                    <h4 style={{ marginTop:'-35px', marginBottom:'12px', fontSize:"1.6rem" }}>{ t('about.aboutUsHead') }</h4> 
                    
                    <p className="darkTextShadow">{ t('about.aboutUsP1') }</p>
                    <p className="darkTextShadow">{ t('about.aboutUsP2-1') } <b>{ t('about.aboutUsP2-2b') }</b>{ t('about.aboutUsP2-3') }</p> 
                    <p className="darkTextShadow">{ t('about.aboutUsP3') }</p>
                    
                    <h4 style={{ marginTop:'40px', marginBottom:'12px', fontSize:"1.6rem" }}>{ t('about.collabHead') }</h4> 
                    <p className="darkTextShadow">{ t('about.collabP1') }</p> 
                    <p className="darkTextShadow">{ t('about.collabP2') }</p>
                    <p className="darkTextShadow">{ t('about.collabP3') }</p> 
                    <p className="darkTextShadow">{ t('about.collabP4') }</p>

                    <h4 style={{ marginTop:'40px', marginBottom:'12px', fontSize:"1.6rem" }}>{ t('about.whoCollabHead') }</h4>
                    <p className="darkTextShadow">{ t('about.whoCollabP1') }</p> 
                    <p className="darkTextShadow">{ t('about.whoCollabP2') }</p>
                    <p className="darkTextShadow">{ t('about.whoCollabP3-1') } <b>{ t('about.whoCollabP3-2b') }</b> { t('about.whoCollabP3-3') } <b>{ t('about.whoCollabP3-4b') }</b>{ t('about.whoCollabP3-5') }</p>
                    <p className="darkTextShadow">{ t('about.whoCollabP4') }</p>

                    <h4 style={{ marginTop:'40px', marginBottom:'12px', fontSize:"1.6rem" }}>{ t('about.impactHead') }</h4>
                    <p className="darkTextShadow">{ t('about.impactP1') }</p> 
                    <p className="darkTextShadow">{ t('about.impactP2') }</p>
                    <p className="darkTextShadow">{ t('about.impactP3') }</p>
                    <p className="darkTextShadow">{ t('about.impactP4') }</p> 
                    <p className="darkTextShadow">{ t('about.impactP5') }</p>

                    <h4 style={{ marginTop:'40px', marginBottom:'12px', fontSize:"1.6rem" }}>{ t('about.joinHead') }</h4>
                    <p>{ t('about.joinP1') }</p>
                </Box>
            </Box>  
        </Fragment>
    )
}
