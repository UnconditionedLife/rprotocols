import { Box} from '@mui/material'
import { useParams } from 'react-router-dom';
import { wordCase } from './GlobalFunctions';
import { useTranslation } from 'react-i18next';

export default function SectionDiamond({ section, handleGoto }) {
    const { lang, area } = useParams();
    const { t } = useTranslation();

    const sec = (section === "home") ? "home" : section.split("-")[0]

    console.log("sec", sec)

    const def = sec === "home" ? "diamondLabel" : "sectionHead"
    const label = sec + "." + def


    console.log("label", label)


    return (
        <Box id={ section } style={{ width:'95%', height:'80px', backgroundColor:'rgba(34, 127, 175, 0.4)',
            marginBottom:"50px", clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}>
            { area !== section && area !== "home" &&
                <Box className="sectionDiamondText" onClick={ () => { handleGoto(`/${ lang }/${ section }`) }}>
                    { t(label)  }
                </Box>
            }
        </Box>
    )
}