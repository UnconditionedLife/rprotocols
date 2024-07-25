import { Box } from "@mui/material";


export default function CountDot(props) {
    const { count, color, size } = props;
    
    let dotClass = 'countDotContainer'
    if (size === 'large')
        dotClass = 'countDotContainerLarge'

    return (
        <Box className={ dotClass } backgroundColor={ color }>
            { count }
        </Box>
    )
}