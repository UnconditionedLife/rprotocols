import { Box } from "@mui/material";
import ForkIcon from '@mui/icons-material/ForkRight';
import AdoptIcon from '@mui/icons-material/FactCheck';
import SupportIcon from '@mui/icons-material/Favorite';
import FollowIcon from '@mui/icons-material/RemoveRedEye';
import aveta from "aveta";
import CountDot from "./CountDot";

export default function StatusBadge(props) {
    const { label, icon, count, color, size } = props;
    
    const statusClass =  (size === 'large') ? 'statusBadgeContainerLarge' : 'statusBadgeContainer'
    const iconClass = (size === 'large') ? 'statusBadgeIconLarge' : 'statusBadgeIcon'
    const textBoxClass = (size === 'large') ? 'statusBadgeTextBoxLarge' : 'statusBadgeTextBox'
    const iconHeight = (size === 'large') ? '18px' : '12px'
    let countText = ( count === undefined ) ? 0 : Number(count)
    countText = (countText === 0) ? "" : aveta(countText, { digits: 3, lowercase: true })

    return (
        
        <Box className={ statusClass } borderColor={ color } marginBottom='0px' marginTop='-1px'>
            { icon === 'Fork' && <ForkIcon className={ iconClass } style={{ height: iconHeight, color: color }} />}
            { icon === 'Adopt' && <AdoptIcon className={ iconClass } style={{ height: iconHeight, color: color }}/>}
            {/* { icon === 'Guide' && <GuideIcon className={ iconClass } style={{ height: iconHeight, color: color }}/>} */}
            { icon === 'Support' && <SupportIcon className={ iconClass } style={{ height: iconHeight, color: color }}/>}
            { icon === 'Follow' && <FollowIcon className={ iconClass } style={{ height: iconHeight, color: color }}/>}
            { label !== '' &&
                <Box className={ textBoxClass } color={ color }>
                    { label }
                </Box>
            }
            <CountDot count={ countText } color={ color } size={ size } />
        </Box>
    )
}