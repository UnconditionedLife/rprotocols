import { Box } from '@mui/material'

export default function HistoryRowView(props) {
    const { field } = props
    
// console.log('field', field)

if ( field === undefined ) return null

    return (
        <Box className='historyGridItem'>
            { field.includes('v.') ? (
                <span style={{ fontFamily: 'monospace' }}>{ field }</span>
            ) : (
                <span>{ field }</span>
            )}
        </Box>
    )
}