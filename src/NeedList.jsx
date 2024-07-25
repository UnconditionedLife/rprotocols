// import { useLiveQuery, useDocument, useFireproof } from 'use-fireproof'

import { Box, Card, CardActions, Button, TextField, MenuItem, Typography } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

export default function NeedList(props) {
    const { needs, handleEdit, handleSetCurrentPurpose } = props

    return (
        <Box>
            { needs.map((need) => (
                <Card key={need._id} style={{ margin:'8px', padding:'12px', width:'300px', minHeight:'80px', maxHeight:"120" }}>
                    <Typography variant="button" fontSize={"9px"}>
                        { need.contextName } | { need.domainName }<br/>
                    </Typography>
                    <PsychologyAltIcon fontSize='medium' color='primary'/><br/>
                    { (need.deleted) && 
                        <Typography variant="body2" color={"error"}>
                            <span style={{ cursor: "pointer" }} onClick={() => { handleEdit(need, "need") }}>{ need.name }</span> <br/>
                        </Typography>
                    }
                    { (!need.deleted) &&
                        <Typography variant="body2" color={"primary"}>
                            <span style={{ cursor: "pointer" }} onClick={() => { handleEdit(need, "need") }}>XX{ need.name }</span> <br/>
                        </Typography>
                    }
                    <Typography variant="body2" fontSize={"11px"}>
                        { need.description }
                    </Typography>
                    <Typography variant="caption" fontSize={9}>
                        { new Date(need.created).toLocaleString("en-US", { 
                            year: "numeric", month: "long", day: "numeric", 
                            hour: "numeric", minute: "numeric", timeZoneName: "short" }) }
                    </Typography>
                    <CardActions>
                        <Button style={{ fontSize:".65em", padding:"2px", margin:"0" }}
                            onClick={() => { handleSetCurrentPurpose(need._id) }} size="small">View Protocols</Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
    )
}