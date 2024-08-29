import { Alert, AlertTitle, Snackbar, IconButton } from '@mui/material'
import { CloseRounded } from '@mui/icons-material';

export default function AlertBar({ snackbarState, alertMessage, setAlertMessage }){

    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal:'center' }}
            open={ snackbarState } onClose={ () => { setAlertMessage({}) }} key={ 'top-center' } >    
            <Alert severity={ alertMessage.severity } sx={{ width:'100%' }}
                action={ <IconButton color="inherit"
                    size="small" onClick={() => { setAlertMessage({}) }} >
                        <CloseRounded fontSize="inherit" />
                        </IconButton>
                    }>
                <AlertTitle>{ alertMessage.title }</AlertTitle>
                { alertMessage.msg }
            </Alert>
        </Snackbar>
    )
}