import { Box} from '@mui/material'
import { useParams } from 'react-router-dom';
import { wordCase } from './GlobalFunctions';

export default function SectionDiamond({ section, handleGoto }) {
    const { lang, area } = useParams();

    const label = wordCase(section.replaceAll("-", " "))

    return (
        <Box id={ section } style={{ width:'95%', height:'80px', backgroundColor:'rgba(34, 127, 175, 0.4)',
            marginBottom:"50px", clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}>
            { area !== section && area !== "home" &&
                <Box className="sectionDiamondText" onClick={ () => { handleGoto(`/${ lang }/${ section }`) }}>
                    { label }
                </Box>
            }
        </Box>
    )
}