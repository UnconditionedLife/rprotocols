import { Box } from "@mui/material"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Accordion(props) {
    const { version, title, show, handleArea } = props

    return (
        <Box width='calc(100% - 20px)' padding='8px'>
            <hr style={{ border: '1px solid #d8ecf3', marginBottom: '-3px', marginTop: '2px' }} />
            <Box width="100%" display='flex' flexDirection='row' justifyContent='space-between' style={{ cursor: 'pointer' }} onClick={() => { handleArea({ version, show }) }}>
                <Box pl={ .5 } mt={ 0.7 }><span className='cardSectionLabel'>{ title }</span></Box>
                <Box pr={ .5 } pt='3px' mb='-12px' style={{ fontWeight:'lighter' }}>
                    { (show == 'none') &&
                        <KeyboardArrowDownIcon fontSize='small' style={{ color:"#9c9c9c" }} />
                    }
                    { (show != 'none') &&
                        <KeyboardArrowUpIcon fontSize='small' style={{ color:"#9c9c9c" }} />
                    }
                </Box>
            </Box>
        </Box>
    )
}