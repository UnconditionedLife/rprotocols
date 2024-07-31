import { Box } from '@mui/material'

export default function HistoryRowView(props) {
    const { field } = props
    
// console.log('field', field)

if ( field === undefined ) return null

    return (
        <Box className='historyGridItem'>
            { field.includes('v.') ? (
                <b>{ field }</b> 
            ) : (
                <span>{ field }</span> 
            )}
        </Box>
    )
}