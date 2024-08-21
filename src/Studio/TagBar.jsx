import { Box } from '@mui/material'
import TagIcon from '@mui/icons-material/LocalOffer';

export default function TagBar(props) {
    const { tags } = props

    let tagsArray = []
    if (tags.length > 0 ) {
        tagsArray = tags.split(',')
        tagsArray = tagsArray.map(tag => tag.trim()).filter(tag => tag.length > 0)
    }

    return (
        <Box display='flex' flexDirection='row' width='100%' justifyContent='center' flexWrap='wrap'>
            {/* <Box backgroundColor='lightgrey' width='calc(100% + 40px)' height='12px' marginTop='-20px' marginLeft='-20px' marginBottom='20px'/> */}
            <Box paddingTop="2px" ><TagIcon style={{ fontSize:'1.2rem', color:'gray' }} /></Box>
            { tagsArray.length > 0 && tagsArray.map((tag, i) => (
                <Box key={ i } className='itemTagsBox'>
                    <span>{ tag.toLowerCase() }</span>
                </Box>
            ))}

            { tagsArray.length === 0  &&
                <Box className='itemTagsBox'>
                    <span>NO TAGS</span>
                </Box>
            }

        </Box>
    )
}